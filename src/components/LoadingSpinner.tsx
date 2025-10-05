"use client";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary"></div>

        {/* Pulsing inner dot */}
        <motion.div
          className="absolute inset-3 rounded-full bg-primary/80"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
