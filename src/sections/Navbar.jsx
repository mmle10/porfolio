import { useState } from "react";
import { motion } from "framer-motion";
import CustomSelect from "../components/CustomSelect";

function Navigation({ onBackgroundChange, currentBackground, setIsOpen }) {
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
      <li>
        <button 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, "home")}
        >
          Home
        </button>
      </li>
      <li>
        <button 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, "about")}
        >
          About
        </button>
      </li>
      <li>
        <button 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, "projects")}
        >
          Projects
        </button>
      </li>
      <li>
        <button 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, "experiences")}
        >
          Experiences
        </button>
      </li>
    
      <li>
        <button 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, "contact")}
        >
          Contact
        </button>
      </li>
      <li>
        <CustomSelect 
          onChange={onBackgroundChange}
          defaultValue={{ value: currentBackground, label: currentBackground.charAt(0).toUpperCase() + currentBackground.slice(1) }}
        />
      </li>
    </ul>
  );
}

const Navbar = ({ onBackgroundChange, currentBackground }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 top-0 z-60 w-full backdrop-blur-lg bg-primary/30">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("home");
              if (element) {
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">
            Mmle
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden">
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:block">
            <Navigation 
              onBackgroundChange={onBackgroundChange} 
              currentBackground={currentBackground}
              setIsOpen={setIsOpen}
            />
          </nav>
        </div>
      {isOpen && (
        <motion.div
          className="block sm:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}>
          <nav className="py-4 border-t border-royal/10">
            <Navigation 
              onBackgroundChange={onBackgroundChange} 
              currentBackground={currentBackground}
              setIsOpen={setIsOpen}
            />
          </nav>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default Navbar;
