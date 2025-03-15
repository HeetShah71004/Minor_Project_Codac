import axios from "axios";
const editor = (io) => {
  const rooms = new Map();

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    let currentRoom = null;
    let currentUser = null;

    // Join a room
    socket.on("join", ({ roomId, userName }) => {
      if (currentRoom) {
        socket.leave(currentRoom);
        rooms.get(currentRoom).delete(currentUser);
        io.to(currentRoom).emit(
          "userJoined",
          Array.from(rooms.get(currentRoom))
        );
      }

      currentRoom = roomId;
      currentUser = userName;

      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId).add(userName);

      io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom)));

      // 🔥 Emit toast message when a user joins
      io.to(roomId).emit("toastMessage", {
        type: "success",
        message: `${userName} joined the room!`,
      });
    });

    // Code changes
    socket.on("codeChange", ({ roomId, code }) => {
      socket.to(roomId).emit("codeUpdate", code);
    });

    // Leave a room
    socket.on("leaveRoom", () => {
      if (currentRoom && currentUser) {
        rooms.get(currentRoom).delete(currentUser);
        io.to(currentRoom).emit(
          "userJoined",
          Array.from(rooms.get(currentRoom))
        );

        // 🔥 Emit toast message when a user leaves
        io.to(currentRoom).emit("toastMessage", {
          type: "warning",
          message: `${currentUser} left the room!`,
        });

        socket.leave(currentRoom);

        currentRoom = null;
        currentUser = null;
      }
    });

    // Typing events
    socket.on("typing", ({ roomId, userName }) => {
      socket.to(roomId).emit("userTyping", userName);
    });

    // Language changes
    socket.on("languageChange", ({ roomId, language }) => {
      io.to(roomId).emit("languageUpdate", language);
      io.to(roomId).emit("toastMessage", {
        type: "info",
        message: `Language changed to ${language}`,
      });
    });

    // Compile code
    socket.on(
      "compileCode",
      async ({ code, roomId, language, version, userInput }) => {
        if (rooms.has(roomId)) {
          const room = rooms.get(roomId);
          try {
            const response = await axios.post(
              "https://emkc.org/api/v2/piston/execute",
              {
                language,
                version,
                files: [
                  {
                    content: code,
                  },
                ],
                stdin: userInput, // Pass user input
              }
            );

            room.output = response.data.run.output;
            io.to(roomId).emit("codeResponse", response.data);
            // io.to(roomId).emit("codeResponse", response.data).select("-stdin");
            // 🔥 Emit toast message on successful compilation
            io.to(roomId).emit("toastMessage", {
              type: "success",
              message: "Code compiled successfully!",
            });
          } catch (error) {
            console.error("Error during code compilation:", error);
            io.to(roomId).emit("codeError", "Failed to compile code.");
            // 🔥 Emit toast message for compilation error
            io.to(roomId).emit("toastMessage", {
              type: "error",
              message: "Compilation failed!",
            });
          }
        }
      }
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      if (currentRoom && currentUser) {
        rooms.get(currentRoom).delete(currentUser);
        io.to(currentRoom).emit(
          "userJoined",
          Array.from(rooms.get(currentRoom))
        );
        // 🔥 Emit toast message when a user disconnects
        io.to(currentRoom).emit("toastMessage", {
          type: "warning",
          message: `${currentUser} disconnected!`,
        });
      }
      console.log("User Disconnected");
    });
  });
};

export default editor;
