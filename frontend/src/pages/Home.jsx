import { ArrowRight, MonitorCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import picture from "../assets/hero_image.png";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const slideInVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideUpVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// ------------------------ Navigation ------------------------
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-md shadow-md dark:bg-gray-800/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <MonitorCog className="text-[#F83002]" size={24} />
            <h1
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-2xl font-bold font-display text-black dark:text-white"
            >
              Co<span className="text-[#F83002]">deC</span>
            </h1>
          </Link>

          <ul className="flex items-center gap-6">
            {[
              "features",
              "Feedback",
              "testimonials",
              "pricing",
              "faq",
            ].map((section) => (
              <motion.li 
                key={section}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById(section)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome,{" "}
                  <span className="font-semibold text-[#F83002]">
                    {user.email.split("@")[0]}
                  </span>
                </span>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded hover:bg-orange-500 text-white bg-blue-600 transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 transition-colors duration-300 relative group"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform group-hover:rotate-180">
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 6.07l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71M12 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800 dark:text-gray-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293a8 8 0 01-10.586-10.586 8 8 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// ------------------------ Hero ------------------------
const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleGetStarted = () => {
    if (user) {
      navigate("/api/create-room");
    } else {
      toast.error("Please log in to continue");
      navigate("/login");
    }
  };

  return (
    <motion.section
      id="hero"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="min-h-[110vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-16 pb-24 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Image */}
        <motion.div 
          variants={slideInVariants}
          className="w-full md:w-1/2 flex justify-center md:justify-start"
        >
          <motion.img
            src={picture}
            alt="Hero"
            loading="lazy"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="max-w-full h-auto transition-transform duration-500"
          />
        </motion.div>
        
        {/* Right Content */}
        <motion.div 
          variants={containerVariants}
          className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-black rounded-full dark:bg-gray-700 dark:text-gray-200"
          >
            Build Faster. Collaborate Better.
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4 font-display leading-tight"
          >
            <span className="block dark:hidden text-black">
              Create Beautiful <br /> Digital Experiences
            </span>
            <span className="hidden dark:block text-white">
              Explore Stunning <br /> Night Interfaces
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl mb-6 max-w-2xl dark:text-gray-300"
          >
            Transform your ideas into reality with our powerful and intuitive
            platform.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
          >
            <motion.span 
              whileHover={{ y: -3 }}
              className="px-4 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full dark:bg-purple-900 dark:text-purple-300"
            >
              Real-Time Collaboration
            </motion.span>
            <motion.span 
              whileHover={{ y: -3 }}
              className="px-4 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full dark:bg-red-900 dark:text-red-300"
            >
              Code with Friends
            </motion.span>
            <motion.span 
              whileHover={{ y: -3 }}
              className="px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full dark:bg-green-900 dark:text-green-300"
            >
              Fast & Secure
            </motion.span>
            <motion.span 
              whileHover={{ y: -3 }}
              className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              Real-Time Sync
            </motion.span>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:shadow-md"
          >
            Get Started
            <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ------------------------ Features ------------------------
const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      title: "Intuitive Design",
      description: "Clean and modern interface that puts user experience first",
      icon: "✨",
    },
    {
      title: "Powerful Tools",
      description: "Advanced features to help you achieve your goals faster",
      icon: "⚡",
    },
    {
      title: "Seamless Integration",
      description: "Works perfectly with your existing workflow and tools",
      icon: "🔗",
    },
  ];

  return (
    <motion.section 
      id="features" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="py-20 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-orange-100 text-orange-700 rounded-full dark:bg-orange-800 dark:text-orange-300">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-display dark:text-white">
            Everything You Need
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
            Our platform provides all the tools and features you need to succeed
          </p>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all dark:bg-gray-800"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ------------------------ Feedback ------------------------
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5001/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      await response.json();
      toast.success("Thank you for your feedback!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      id="Feedback" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 font-display dark:text-white">
            We'd Love Your Feedback
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your input helps us improve our platform
          </p>
        </motion.div>
        <motion.form
          variants={slideUpVariants}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm dark:bg-gray-800"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

// ------------------------ Testimonials ------------------------
const Testimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id="testimonials"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-5xl mx-auto text-center px-4">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-12"
        >
          What Our Users Say
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { quote: '"Amazing tool!"', name: "User 1" },
            { quote: '"Super easy to use!"', name: "User 2" },
            { quote: '"Helped our team a lot."', name: "User 3" },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              variants={slideUpVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <svg
                className="w-8 h-8 text-indigo-500 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 17h3l2-5V7H7v5h2v5zm7 0h3l2-5V7h-5v5h2v5z" />
              </svg>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-2">
                {testimonial.quote}
              </p>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                - {testimonial.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ------------------------ Pricing ------------------------
const Pricing = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const stripePromise = loadStripe("pk_test_51Qir0GSAr3AIYJYDvsWQeUu1nqEzqEWY5HYBkWxeijRYjVzw02BMpWy3j1xQbN5WYVyZi8FUZT6NIav7WiP9Q5Fp005ZV3WYa6");

  const handleCheckout = async (plan) => {
    if (plan === "Free") {
      toast.success("Free plan selected! No payment required.");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5001/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();
      const stripe = await stripePromise;
      
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error("Payment failed: " + error.message);
    }
  };

  return (
    <motion.section 
      id="pricing" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-12"
        >
          Simple & Transparent Pricing (INR)
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              plan: "Free",
              price: 0,
              features: ["1 Room", "Basic Support"],
              description: "Perfect for individuals"
            },
            {
              plan: "Pro",
              price: 799,
              features: ["Unlimited Rooms", "Priority Support", "Advanced Tools"],
              popular: true,
              description: "For professional developers"
            },
            {
              plan: "Team",
              price: 2499,
              features: ["Unlimited Rooms", "Team Collaboration", "Analytics Dashboard", "Admin Controls"],
              description: "Best for teams & organizations"
            },
          ].map((tier, i) => (
            <motion.div
              key={i}
              variants={slideUpVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md transition hover:shadow-xl flex flex-col justify-between ${
                tier.popular ? "border-4 border-indigo-500 transform scale-[1.02]" : ""
              }`}
            >
              {tier.popular && (
                <motion.span 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold"
                >
                  Popular
                </motion.span>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {tier.plan}
                </h3>

                <div className="mb-4">
                  <p className="text-4xl font-bold mb-1 text-indigo-600 dark:text-indigo-400">
                    ₹{tier.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /mo</span>
                  </p>
                  {tier.price > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      + GST as applicable
                    </p>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tier.description}
                </p>

                <ul className="text-left space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={() => handleCheckout(tier.plan)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-auto w-full py-3 rounded-lg transition font-medium ${
                  tier.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                }`}
              >
                {tier.price === 0 ? "Get Started" : "Subscribe Now"}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center text-gray-600 dark:text-gray-300"
        >
          <p>All prices in Indian Rupees (INR). Enterprise plans available.</p>
          <p className="mt-2 text-sm">
            Need help choosing? <button onClick={() =>
                  document
                    .getElementById("Feedback")
                    ?.scrollIntoView({ behavior: "smooth" })
                } className="text-indigo-600 hover:underline">Contact us</button>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ------------------------ FAQ ------------------------
const FAQ = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      id="faq" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="py-20 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          className="space-y-6"
        >
          {[
            {
              q: "Is it free to use?",
              a: "Yes, we offer a free tier for all users.",
            },
            {
              q: "Can I invite friends?",
              a: "Absolutely! Collaboration is at the core of our platform.",
            },
            {
              q: "Is my code safe?",
              a: "Yes, all sessions are encrypted and secure.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideUpVariants}
              whileHover={{ x: 5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.q}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ------------------------ CTA ------------------------
const CTA = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleGetStarted = () => {
    if (user) {
      navigate("/api/create-room");
    } else {
      toast.error("Please log in to continue");
      navigate("/login");
    }
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="py-20 bg-gradient-to-r from-white via-blue-100 to-orange-100 dark:from-black dark:via-gray-900 dark:to-orange-900 transition-colors"
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight"
        >
          🚀 Ready to Code Together?
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
        >
          Build real-time collaborative coding experiences with your team —
          fast, easy, and powerful.
        </motion.p>
        <motion.button
          variants={itemVariants}
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
          animate={{
            scale: [1, 1.05, 1],
            transition: { repeat: Infinity, duration: 2 }
          }}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
          </svg>
          Start Coding
        </motion.button>
      </div>
    </motion.section>
  );
};

// ------------------------ Footer ------------------------
const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white py-12 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <MonitorCog className="text-white" size={28} />
          </div>
          <p className="text-xl font-semibold mb-4">
            Code <span className="text-orange-400">Together</span>, Create{" "}
            <span className="text-orange-400">Together</span>
          </p>
          <p className="text-gray-400 text-sm dark:text-gray-300">
            &copy; {new Date().getFullYear()} CCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ------------------------ Home ------------------------
const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <FeedbackForm />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;

