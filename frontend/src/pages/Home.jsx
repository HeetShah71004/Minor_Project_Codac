import { ArrowRight, MonitorCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="font-display font-bold text-xl flex items-center gap-2"
          >
            <MonitorCog />
            <h1 className="text-2xl font-bold">
              Co<span className="text-[#F83002]">dac</span>
            </h1>
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-32 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-gray-100 rounded-full animate-fade-in">
          Introducing Our Platform
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
          Create Beautiful
          <br />
          Digital Experiences
        </h1>
        <p
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Transform your ideas into reality with our powerful and intuitive
          platform
        </p>
        <Link
          to="/api/create-room"
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors animate-fade-up hover:scale-105 hover:shadow-md"
          style={{ animationDelay: "0.3s" }}
        >
          Get Started
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Intuitive Design",
      description: "Clean and modern interface that puts user experience first",
    },
    {
      title: "Powerful Tools",
      description: "Advanced features to help you achieve your goals faster",
    },
    {
      title: "Seamless Integration",
      description: "Works perfectly with your existing workflow and tools",
    },
  ];
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-gray-100 rounded-full">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to succeed
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="col">
          <div className="col-md-4">
            <p>
              Code <b>Together</b>, Create <b>Together</b>
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 CCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
