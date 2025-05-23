import { motion } from "motion/react";

const Card = ({ style, text, image, containerRef }) => {
  // Generate random values for each card's animation
  const randomX1 = Math.random() * 20 - 10;
  const randomX2 = Math.random() * 20 - 10;
  const randomY1 = Math.random() * 20 - 10;
  const randomY2 = Math.random() * 20 - 10;
  const randomDuration = 3 + Math.random() * 4; // Random duration between 3-7 seconds

  return image && !text ? (
    <motion.img
      className="absolute w-10 lg:w-13 cursor-grab"
      src={image}
      style={style}
      // whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      animate={{
        x: [0, randomX1, randomX2, 0],
        y: [0, randomY1, randomY2, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
      whileDrag={{ scale: 1.1 }}
    />
  ) : (
    <motion.div
      className="absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      animate={{
        x: [0, randomX1, randomX2, 0],
        y: [0, randomY1, randomY2, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
      whileDrag={{ scale: 1.1 }}
    >
      {text}
    </motion.div>
  );
};

export default Card;
