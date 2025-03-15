import "./App.css";
import { Routes, Route } from "react-router-dom";
import Editor1 from "./Editor";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<Editor1 />} />
        <Route path="/editor" element={<Editor1 />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
