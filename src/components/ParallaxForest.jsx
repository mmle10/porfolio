import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxForest = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  
  // Different parallax effects for each layer
  const forest3Y = useTransform(x, [0, 0.5], ["0%", "60%"]);
  const forest2Y = useTransform(x, [0, 0.5], ["0%", "40%"]);
  const forest1Y = useTransform(x, [0, 0.5], ["0%", "20%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Mountains */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/forest/background_mountains.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Forest Layer 2 (Middle) */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/forest/mid_forest.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: forest2Y,
          }}
        />
        {/* Forest Layer 1 (Foreground) */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/forest/foreground_trees.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: forest1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxForest; 