"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [showPixelOverlay, setShowPixelOverlay] = useState(true);
  const [score, setScore] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
    });

    // Hide pixel overlay after initial animation
    const timer = setTimeout(() => {
      setShowPixelOverlay(false);
    }, 2500);

    // Auto-increment score like an arcade game
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 10);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(scoreInterval);
    };
  }, []);

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(250, 208, 9, 0.7)",
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  // Pixel letters for "FRAUD" arcade logo
  const letters = "FRAUD";

  return (
    <main className="pt-24 pb-12 relative overflow-hidden">
      {/* Retro scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-scanlines opacity-10"></div>

      {/* Pixel startup animation */}
      {showPixelOverlay && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div
            initial={{ scale: 3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="pixel-text text-4xl md:text-6xl text-yellow font-bold"
          >
            FRAUD
          </motion.div>
        </motion.div>
      )}

      {/* Arcade cabinet frame */}
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 left-4 right-4 h-6 bg-gradient-to-r from-blue via-pink to-yellow opacity-70 rounded-t-lg"></div>

        {/* Score counter */}
        <div className="flex justify-between items-center mb-8">
          <div className="arcade-display py-1 px-3 bg-black border-2 border-pink rounded">
            <div className="text-yellow font-mono text-lg tracking-widest animate-pulse">
              SCORE: {score.toString().padStart(6, "0")}
            </div>
          </div>

          <div className="arcade-display py-1 px-3 bg-black border-2 border-pink rounded">
            <div className="text-yellow font-mono text-lg tracking-widest">
              HI-SCORE: 999999
            </div>
          </div>
        </div>

        {/* Main content */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 relative"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Arcade style logo with pixel art aesthetic */}
          <motion.div className="mb-8 relative arcade-logo" variants={item}>
            <div className="grid grid-flow-col gap-1">
              {letters.split("").map((letter, index) => (
                <motion.div
                  key={index}
                  className="pixel-text text-5xl md:text-7xl font-bold text-yellow"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    y: -10,
                    color: [
                      "#FAD009",
                      "#FA8057",
                      "#ED2EA5",
                      "#6172C5",
                      "#FAD009",
                    ],
                    transition: {
                      y: { type: "spring", stiffness: 300 },
                      color: { duration: 1, repeat: Infinity },
                    },
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-yellow via-orange to-pink"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Insert coin animation */}
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 font-mono text-white tracking-wider"
          >
            - INSERT COIN TO CONTINUE -
          </motion.div>

          <motion.p
            className="text-xl mb-8 max-w-2xl retro-text"
            variants={item}
          >
            A stylish and intuitive task management app with retro arcade vibes
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={item}
          >
            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tasks"
                className="arcade-button button button-accent px-8 py-3 text-lg"
              >
                PRESS START
              </Link>
            </motion.div>

            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="arcade-button button button-secondary px-8 py-3 text-lg"
              >
                HOW TO PLAY
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature cards as arcade game screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "ORGANIZE",
              color: "yellow",
              icon: "⚡",
              animation: { rotate: [0, 15, 0] },
              content:
                "Keep track of your tasks like high scores. Organize them with combo multipliers!",
            },
            {
              title: "TRACK",
              color: "pink",
              icon: "🎮",
              animation: { scale: [1, 1.2, 1] },
              content:
                "Level up your productivity. Watch your progress bar fill as you complete more tasks!",
            },
            {
              title: "ACHIEVE",
              color: "blue",
              icon: "🏆",
              animation: { y: [0, -5, 0] },
              content:
                "Unlock achievements and build your streak. Don't break the combo chain!",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="arcade-screen card overflow-hidden relative"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              {/* CRT screen effect */}
              <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

              {/* Screen glow */}
              <div
                className={`absolute inset-0 bg-${feature.color}/5 pointer-events-none`}
              ></div>

              <div className={`h-1 w-full bg-${feature.color} mb-6`} />
              <h2
                className={`text-2xl font-bold mb-4 text-${feature.color} inline-flex items-center pixel-text`}
              >
                <motion.span
                  animate={feature.animation}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block mr-2"
                >
                  {feature.icon}
                </motion.span>
                {feature.title}
              </h2>
              <p className="text-light-gray retro-text">{feature.content}</p>

              {/* Arcade joystick icon */}
              <motion.div
                className="absolute bottom-3 right-3 opacity-30"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🕹️
              </motion.div>
            </div>
          ))}
        </div>

        {/* Game over / Call to action */}
        <motion.div
          className="arcade-screen card text-center p-8 relative overflow-hidden mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* CRT effect */}
          <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink/10 to-blue/10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <div className="text-6xl text-center font-bold pixel-text text-yellow mb-2">
              GAME ON!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text relative inline-block">
              Ready to level up your productivity?
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-yellow via-pink to-blue"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h2>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(237, 46, 165, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/tasks"
              className="arcade-button button px-8 py-3 text-lg"
            >
              INSERT COIN
            </Link>
          </motion.div>
        </motion.div>

        {/* Controls legend */}
        <div
          className="arcade-controls bg-dark-purple/30 rounded-lg p-4 mb-16 border border-white/10"
          data-aos="fade-up"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            CONTROLS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-light-gray">
            <div className="flex items-center gap-2">
              <span className="key-cap">A</span>
              <span>Add Task</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="key-cap">S</span>
              <span>Sort Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="key-cap">D</span>
              <span>Delete Task</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="key-cap">C</span>
              <span>Complete Task</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for arcade elements */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .pixel-text {
          font-family: var(--font-orbitron);
          letter-spacing: 0.05em;
          text-shadow: 0 0 5px currentColor, 0 0 10px rgba(255, 255, 255, 0.3);
          font-weight: 900;
        }

        .retro-text {
          font-family: var(--font-inter);
          letter-spacing: 0.05em;
        }

        .arcade-logo {
          filter: drop-shadow(0 0 10px rgba(237, 46, 165, 0.5));
        }

        .arcade-button {
          box-shadow: 0 0 5px currentColor;
          text-shadow: 0 0 5px currentColor;
          text-transform: uppercase;
          font-family: var(--font-orbitron);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .arcade-screen {
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(237, 46, 165, 0.3);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .arcade-display {
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
        }

        .bg-scanlines {
          background-image: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
        }

        .key-cap {
          display: inline-block;
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-weight: bold;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </main>
  );
}
