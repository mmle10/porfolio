import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = ({ setShowParallaxPlanets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState("planets"); // Default to planets

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBackgroundChange = (e) => {
    console.log("handleBackgroundChange", e);
    const value = e.target.value;
    setBackground(value);
    setShowParallaxPlanets(value === "planets");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-white text-xl font-bold hover:text-gray-300 transition-colors"
            >
              LM
            </button>
          </div>

          {/* Background Selector */}
          <div className="flex items-center gap-4">
            {/* <select
              value={background}
              onChange={handleBackgroundChange}
              className="bg-black/40 text-white border border-white/20 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <option value="planets">Planets</option>
              <option value="mountains">Mountains</option>
              <option value="forest">Forest</option>
            </select> */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </button>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-sm">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-white hover:text-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Contact
              </button>
              <div className="flex space-x-4 px-3 py-2">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 