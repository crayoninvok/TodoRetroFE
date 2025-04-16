// This component will render the animated character sprite
// Import it into your About page component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CharacterSprite() {
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState("right");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lookingAround, setLookingAround] = useState(false);

  useEffect(() => {
    // Animation loop
    const frameInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);

      // Occasionally change direction and trigger looking animation
      if (Math.random() > 0.85) {
        const newDirection = Math.random() > 0.5 ? "right" : "left";
        setDirection(newDirection);

        setPosition((prev) => {
          const step = newDirection === "right" ? 15 : -15;
          const newX = prev.x + step;
          // Keep within boundaries
          if (newX < -80) return { ...prev, x: -80 };
          if (newX > 80) return { ...prev, x: 80 };
          return { ...prev, x: newX };
        });
      }

      // Occasionally look around
      if (Math.random() > 0.9) {
        setLookingAround(true);
        setTimeout(() => setLookingAround(false), 1500);
      }
    }, 200);

    return () => clearInterval(frameInterval);
  }, []);

  return (
    <div className="pixel-character relative h-32 w-full">
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: position.x,
          scaleX: direction === "left" ? -1 : 1,
        }}
      >
        <div
          className={`character-sprite sprite-frame-${frame} ${
            lookingAround ? "looking-around" : ""
          }`}
        >
          <div className="character-hair"></div>
          <div className="character-head"></div>
          <div className="character-body"></div>
          <div className="character-legs"></div>
          {lookingAround && <div className="character-arm-up"></div>}
          <div className="character-shadow"></div>
        </div>
      </motion.div>
    </div>
  );
}
