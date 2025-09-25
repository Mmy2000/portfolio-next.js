"use client";
import type { HeaderProps } from "@/interfaces/page";
import type React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { Button } from "./ui/button";

const HeaderSection: React.FC<HeaderProps> = ({ title, description }) => {
  const router = useRouter();

  // --- Mouse-based parallax setup ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // smooth parallax transforms
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orb1X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const orb2X = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], [40, -40]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 border-b border-border/50 top-o z-10">
      {/* Base background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      {/* Animated floating gradient orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl top-1/3 left-2/3"
        style={{ x: orb2X, y: orb2Y }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      {/* Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-background/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent animate-gradient">
              {title}
            </span>
          </h1>
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Back Button */}
          <motion.div
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
            variant={"outline"}
              onClick={() => router.back()}
              className="hover-glow group/btn bg-transparent dark:hover:text-primary border-primary/40 dark:border-primary/40"
            >
              ← Go Back
            </Button>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-28 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderSection;
