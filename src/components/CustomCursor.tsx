"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

type CursorVariant = "default" | "hover" | "text" | "image";

const CURSOR_CONFIG = {
  size: 28,
  color: "0, 255, 128", // RGB format for reusability
};

const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string | null>(null);

  // Motion values for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });

  // Track mouse position
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  // Handle hover states with delegation
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute("data-cursor");

      if (cursorType) {
        setVariant(cursorType as CursorVariant);
        setLabel(target.getAttribute("data-cursor-label"));
      } else if (target.tagName === "A" || target.tagName === "BUTTON") {
        setVariant("hover");
        setLabel("Click");
      } else if (target.tagName === "IMG") {
        setVariant("image");
        setLabel("View");
      } else if (
        ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
          target.tagName
        )
      ) {
        setVariant("text");
        setLabel(null);
      }
    };

    const handleMouseOut = () => {
      setVariant("default");
      setLabel(null);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: `rgba(${CURSOR_CONFIG.color}, 0.1)`,
      border: `2px solid rgba(${CURSOR_CONFIG.color}, 0.3)`,
      boxShadow: `0 0 15px rgba(${CURSOR_CONFIG.color}, 0.25)`,
      mixBlendMode: "difference",
    },
    hover: {
      scale: 2.3,
      backgroundColor: `rgba(${CURSOR_CONFIG.color}, 0.25)`,
      border: `2px solid rgba(${CURSOR_CONFIG.color}, 0.9)`,
      boxShadow: `
        0 0 25px rgba(${CURSOR_CONFIG.color}, 0.7),
        0 0 45px rgba(${CURSOR_CONFIG.color}, 0.4)
      `,
    },
    text: {
      scale: 1.8,
      backgroundColor: `rgba(${CURSOR_CONFIG.color}, 0.2)`,
      border: `2px solid rgba(${CURSOR_CONFIG.color}, 0.6)`,
      boxShadow: `0 0 20px rgba(${CURSOR_CONFIG.color}, 0.4)`,
    },
    image: {
      scale: 3,
      backgroundColor: `rgba(${CURSOR_CONFIG.color}, 0.15)`,
      border: `2px solid rgba(${CURSOR_CONFIG.color}, 0.7)`,
      boxShadow: `
        0 0 30px rgba(${CURSOR_CONFIG.color}, 0.6),
        0 0 60px rgba(${CURSOR_CONFIG.color}, 0.4)
      `,
    },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center"
        style={{
          translateX: springX,
          translateY: springY,
          width: CURSOR_CONFIG.size,
          height: CURSOR_CONFIG.size,
        }}
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {label && (
          <motion.span
            className="text-[10px] text-white font-medium select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
