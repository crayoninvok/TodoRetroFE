"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const features = [
    {
      icon: "⚡",
      title: "Task Management",
      description:
        "Create and manage tasks with an intuitive arcade-inspired interface",
    },
    {
      icon: "🎮",
      title: "Progress Tracking",
      description:
        "Level up your productivity by marking tasks complete and tracking your streaks",
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description:
        "Unlock achievements as you complete more tasks and build your combo chain",
    },
    {
      icon: "💾",
      title: "Persistent Storage",
      description:
        "Your high scores and progress are saved automatically with localStorage",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "Play on any device with a fully responsive arcade experience",
    },
  ];

  const technologies = [
    { name: "Next.js 14", color: "blue" },
    { name: "TypeScript", color: "blue" },
    { name: "Framer Motion", color: "pink" },
    { name: "Tailwind CSS", color: "pink" },
    { name: "AOS Animation", color: "yellow" },
    { name: "React Hooks", color: "yellow" },
  ];

  return (
    <main className="pt-24 pb-16 relative overflow-hidden">
      {/* Retro scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-scanlines opacity-10"></div>

      {/* Top decorative line */}
      <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue via-pink to-yellow opacity-70"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto"
        >
          {/* About Header */}
          <motion.div
            variants={item}
            className="arcade-screen text-center p-8 mb-12 relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-pink via-yellow to-blue absolute top-0 left-0"
            />

            <h1 className="text-5xl font-bold pixel-text text-yellow mb-4">
              ABOUT SPEKTRA
            </h1>

            <div className="text-xl retro-text text-light-gray relative">
              <motion.span
                className="text-2xl inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                🕹️
              </motion.span>{" "}
              A NEXT-GEN TASK MANAGEMENT ARCADE
            </div>
          </motion.div>

          {/* Developer Bio Section with GIF Animation */}
          <motion.div
            variants={item}
            className="arcade-screen mb-12 p-8 relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

            <h2 className="text-2xl font-bold pixel-text text-pink mb-6 flex items-center">
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mr-2"
              >
                👾
              </motion.span>
              DEVELOPER PROFILE
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Profile Photo & Character */}
              <div className="w-full md:w-1/3 relative flex flex-col items-center">
                <div className="mb-6 relative">
                  {/* Profile photo with arcade frame */}
                  <div className="w-40 h-40 border-4 border-yellow relative rounded-lg overflow-hidden arcade-display mx-auto">
                    <Image
                      src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743710304/b922269c-26b9-4551-b336-e40f45c8a57c_xzsxtw.jpg"
                      alt="Developer"
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                    {/* Glitch effect */}
                    <div className="absolute inset-0 glitch-effect"></div>
                  </div>
                </div>

                {/* Animated GIF character in synthwave environment */}
                {/* Animated GIF character in synthwave environment */}
                <div
                  className="arcade-screen relative w-full overflow-hidden"
                  style={{ height: "120px" }}
                >
                  <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/swg.gif"
                      alt="Character Animation"
                      width={200}
                      height={120}
                      className="pixelated-image object-cover"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Synthwave ground effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-pink/20 to-transparent"></div>
                </div>
              </div>

              {/* Bio Text */}
              <div className="w-full md:w-2/3 text-light-gray retro-text space-y-4">
                <div className="arcade-display py-1 px-3 bg-black bg-opacity-40 border border-blue inline-block mb-2">
                  <span className="text-yellow font-mono text-sm">
                    PLAYER ONE
                  </span>
                </div>

                <p>
                  Hello! I&apos;m the developer behind Spektra, blending my
                  passion for both productivity tools and retro gaming
                  aesthetics. With a background in web development and a love
                  for the vibrant synthwave culture, I created this project to
                  transform mundane task management into something visually
                  engaging and fun.
                </p>

                <p>
                  My goal was to capture the nostalgic energy of 90s arcade
                  games while delivering a genuinely useful application that
                  helps users stay organized. The neon colors, pixel art, and
                  arcade-inspired interface are all designed to make
                  productivity feel less like work and more like play.
                </p>

                <div className="arcade-display py-1 px-2 bg-black bg-opacity-40 border border-pink inline-block">
                  <span className="text-yellow font-mono text-sm blink">
                    HIGH SCORE HOLDER
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            variants={item}
            className="arcade-screen mb-12 p-8 relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>
            <h2 className="text-2xl font-bold pixel-text text-yellow mb-4 flex items-center">
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mr-2"
              >
                🚀
              </motion.span>
              MISSION LOG
            </h2>

            <div className="space-y-4 retro-text">
              <p className="text-light-gray">
                Spektra represents a fusion of productivity and nostalgia,
                designed for those who appreciate both efficiency and
                aesthetics. The name &quot;Spektra&quot; embodies the vibrant
                spectrum of colors and energy that defines the retro-futuristic
                synthwave universe.
              </p>

              <p className="text-light-gray">
                Our mission is to transform mundane task management into an
                engaging arcade experience where productivity becomes play and
                organization feels like beating the high score.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={item}
            className="arcade-screen mb-12 p-8 relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>
            <h2 className="text-2xl font-bold pixel-text text-blue mb-4 flex items-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mr-2"
              >
                💻
              </motion.span>
              TECH STACK
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`arcade-display py-2 px-4 bg-black bg-opacity-40 border border-${tech.color} rounded text-center`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px var(--${tech.color})`,
                    y: -5,
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className={`text-${tech.color} font-mono`}>
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-light-gray retro-text">
              Built with cutting-edge web technologies, Spektra combines modern
              development practices with retro aesthetics. The application
              leverages the power of Next.js 14 for optimal performance and
              TypeScript for type safety, while Framer Motion and AOS bring the
              synthwave visuals to life with fluid animations.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={item} className="mb-12">
            <h2 className="text-2xl font-bold pixel-text text-pink mb-6 text-center">
              POWER-UPS & ABILITIES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="arcade-screen p-6 relative overflow-hidden h-full"
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  {/* CRT screen effect */}
                  <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10"></div>

                  <div className="h-1 w-full bg-gradient-to-r from-pink to-blue mb-4" />

                  <h3 className="text-xl font-bold text-white mb-3 flex items-center pixel-text">
                    <motion.span
                      animate={{
                        y: index % 2 === 0 ? [0, -5, 0] : [0, 5, 0],
                        rotate: index % 3 === 0 ? [0, 10, 0] : [0, 0, 0],
                        scale: index % 4 === 0 ? [1, 1.2, 1] : [1, 1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block mr-2 text-2xl"
                    >
                      {feature.icon}
                    </motion.span>
                    {feature.title}
                  </h3>

                  <p className="text-light-gray retro-text">
                    {feature.description}
                  </p>

                  {/* Joystick icon */}
                  <motion.div
                    className="absolute bottom-3 right-3 opacity-20"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🕹️
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={item}
            className="arcade-screen text-center p-8 relative overflow-hidden"
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

            <div className="relative z-10">
              <div className="text-4xl font-bold pixel-text text-yellow mb-4 animate-glow">
                READY PLAYER ONE
              </div>

              <p className="text-xl mb-8 text-light-gray retro-text">
                Your productivity adventure awaits! Press start to begin.
              </p>

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
                  className="arcade-button button button-accent px-8 py-3 text-lg"
                >
                  PRESS START
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for special retro effects */}
      <style jsx>{`
        .glitch-effect {
          background: linear-gradient(
            transparent 0%,
            rgba(32, 8, 64, 0.2) 2%,
            transparent 3%,
            rgba(32, 8, 64, 0.2) 3%
          );
          background-size: 100% 20px;
          animation: glitch 2s infinite linear;
          pointer-events: none;
        }

        @keyframes glitch {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 500px;
          }
        }

        .blink {
          animation: blink 1s steps(1) infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .pixel-character {
          background-color: rgba(25, 9, 32, 0.2);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          position: relative;
        }

        .pixelated-image {
          image-rendering: pixelated;
        }

        .synthwave-ground {
          position: relative;
          overflow: hidden;
        }

        .synthwave-ground:before {
          content: "";
          position: absolute;
          bottom: 6px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(237, 46, 165, 0.8),
            transparent
          );
        }

        .synthwave-ground:after {
          content: "";
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(97, 114, 197, 0.5),
            transparent
          );
        }
      `}</style>
    </main>
  );
}
