import { useState } from "react";
import Navbar from "./Navbar";
import ParallaxBackground from "./ParallaxBackground";
import ParallaxPlanets from "./ParallaxPlanets";
import ParallaxForest from "./ParallaxForest";

const Hero = () => {
  const [background, setBackground] = useState("planets");

  const handleBackgroundChange = (value) => {
    setBackground(value);
  };

  const renderBackground = () => {
    switch (background) {
      case "mountains":
        return <ParallaxBackground />;
      case "planets":
        return <ParallaxPlanets />;
      case "forest":
        return <ParallaxForest />;
      default:
        return <ParallaxPlanets />;
    }
  };

  return (
    <div className="relative h-screen">
      {renderBackground()}
      <Navbar onBackgroundChange={handleBackgroundChange} currentBackground={background} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Frontend Developer & UI/UX Enthusiast
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero; 