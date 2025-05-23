import { useScroll, useSpring, useTransform } from "motion/react";
import ParticlesHero from "./particlesHero";
import React from "react";
import { motion } from "framer-motion";
const planets = [
  { src: "/assets/planets/planet-1.png", top: "15%", left: "12%", axis: "y", range: ["0%", "40%"], size: "200px", mobileSize: "100px" },
  { src: "/assets/planets/planet-2.png", top: "10%", left: "45%", axis: "x", range: ["0%", "-20%"], size: "180px", mobileSize: "90px" },
  { src: "/assets/planets/planet-3.png", top: "20%", left: "75%", axis: "y", range: ["0%", "30%"], size: "210px", mobileSize: "105px" },
  { src: "/assets/planets/planet-4.png", top: "45%", left: "80%", axis: "x", range: ["0%", "15%"], size: "170px", mobileSize: "85px" },
  { src: "/assets/planets/planet-5.png", top: "70%", left: "70%", axis: "y", range: ["0%", "-25%"], size: "190px", mobileSize: "95px" },
  { src: "/assets/planets/planet-6.png", top: "75%", left: "40%", axis: "x", range: ["0%", "18%"], size: "210px", mobileSize: "105px" },
  { src: "/assets/planets/planet-7.png", top: "65%", left: "15%", axis: "y", range: ["0%", "20%"], size: "170px", mobileSize: "85px" },
  { src: "/assets/planets/planet-8.png", top: "40%", left: "5%", axis: "x", range: ["0%", "-10%"], size: "160px", mobileSize: "80px" },
  { src: "/assets/planets/planet-9.png", top: "55%", left: "55%", axis: "y", range: ["0%", "15%"], size: "180px", mobileSize: "90px" },
];

const ParallaxPlanets = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  // const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  // const isMobile = useMediaQuery({ maxWidth: 768 });

  // Individual transform values for each planet
  const planet1Transform = useTransform(x, [0, 0.5], planets[0].range);
  const planet2Transform = useTransform(x, [0, 0.5], planets[1].range);
  const planet3Transform = useTransform(x, [0, 0.5], planets[2].range);
  const planet4Transform = useTransform(x, [0, 0.5], planets[3].range);
  const planet5Transform = useTransform(x, [0, 0.5], planets[4].range);
  const planet6Transform = useTransform(x, [0, 0.5], planets[5].range);
  const planet7Transform = useTransform(x, [0, 0.5], planets[6].range);
  const planet8Transform = useTransform(x, [0, 0.5], planets[7].range);
  const planet9Transform = useTransform(x, [0, 0.5], planets[8].range);

  const planetTransforms = [
    planet1Transform,
    planet2Transform,
    planet3Transform,
    planet4Transform,
    planet5Transform,
    planet6Transform,
    planet7Transform,
    planet8Transform,
    planet9Transform
  ];

  return (
    <section className="absolute inset-0 z-0">
      <motion.img
        src="/assets/planets/space.jpg"
        alt="space"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
        }}
      />
     
      <div className="relative h-screen w-full absolute inset-0 z-10">
        <ParticlesHero
          particleColors={['#062445', '#ffffff']}
          particleCount={200}
          particleSpread={15}
          speed={0.2}
          particleBaseSize={50}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={true}
        />
      </div>

      {/* Astronaut Container */}
      {/* <div className="absolute inset-0 flex items-center justify-center z-50">
        <motion.img
          src="/assets/planets/austronant.png"
          alt="astronaut"
          style={{
            width: isMobile ? "100%" : "32.5%",
            height: "auto",
            y: mountain2Y,
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? "50%" : "-1%",
          }}
          draggable={false}
        />
      </div> */}

      {/* Planets Container */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {planets.map((planet, idx) => (
          <motion.img
            key={planet.src}
            src={planet.src}
            alt={`planet-${idx + 1}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "auto",
              zIndex: 10 + idx,
              pointerEvents: "none",
              ...(planet.axis === "x" ? { x: planetTransforms[idx] } : { y: planetTransforms[idx] }),
            }}
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
};

export default ParallaxPlanets;
