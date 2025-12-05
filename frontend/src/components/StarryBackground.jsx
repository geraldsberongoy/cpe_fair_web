import React from "react";

const StarryBackground = ({starCount}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layered star fields */}
      <div className="absolute inset-0 opacity-40">
        <div className="stars"></div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="stars" style={{ animationDelay: "-2s" }}></div>
      </div>

      {/* Floating particles / glows */}
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 1; // 1px to 3px
        const opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1
        const duration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5; // staggered animation
        return (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity,
              animation: `float ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          ></div>
        );
      })}

      {/* Floating glow animations (optional) */}
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 1; // 1px to 3px
        const opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1
        const duration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5; // staggered animation
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity,
              animation: `float ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          ></div>
        );
      })}

      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default StarryBackground;
