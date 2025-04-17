"use client";

import { useEffect } from "react";

const BackgroundEffects = () => {
  // Create animated particles on mount
  useEffect(() => {
    const createParticles = () => {
      const container = document.getElementById("particles-container");
      if (!container) return;

      // Clear existing particles
      container.innerHTML = "";

      const particleCount = window.innerWidth < 768 ? 40 : 80;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;

        // Random animation duration
        const duration = Math.random() * 40 + 10;
        particle.style.animation = `floatParticle ${duration}s linear infinite`;

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;

        // Random color
        const hue = Math.random() * 60 + 240; // Blue to purple range
        particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.7)`;

        container.appendChild(particle);
      }
    };

    createParticles();

    // Recreate on resize
    window.addEventListener("resize", createParticles);
    return () => {
      window.removeEventListener("resize", createParticles);
    };
  }, []);

  return (
    <>
      {/* Background effects */}
      <div className="fixed inset-0 bg-dark-purple/90 z-0"></div>

      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -inset-[100px] opacity-30 bg-grid-pattern"></div>

        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-radial from-blue/30 via-transparent to-transparent opacity-30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-pink/30 via-transparent to-transparent opacity-30 blur-3xl"></div>
      </div>

      {/* Particles container */}
      <div
        id="particles-container"
        className="fixed inset-0 z-0 pointer-events-none"
      ></div>

      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, 10px);
          }
          50% {
            transform: translate(0, 20px);
          }
          75% {
            transform: translate(-10px, 10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          pointer-events: none;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle at center,
            var(--tw-gradient-from),
            var(--tw-gradient-via),
            var(--tw-gradient-to)
          );
        }
      `}</style>
    </>
  );
};

export default BackgroundEffects;
