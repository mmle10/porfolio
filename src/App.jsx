import "./index.css";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experiences from "./sections/Experiences";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import Testimonial from "./sections/Testimonials";
import { useState } from "react";

function App() {
  const [currentBackground, setCurrentBackground] = useState("planets");

  const handleBackgroundChange = (value) => {
    setCurrentBackground(value);
  };

  return (
    <>
      <Navbar
        onBackgroundChange={handleBackgroundChange}
        currentBackground={currentBackground}
      />
      <Hero currentBackground={currentBackground} />
      <div className="container mx-auto max-w-8xl">
        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
