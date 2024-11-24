"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const GradientButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    containerClassName?: string;
    className?: string;
  }
>(({ className, children, containerClassName, ...props }, ref) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xSpring = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const ySpring = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const top = useTransform(ySpring, [-1, 1], ["45%", "55%"]);
  const left = useTransform(xSpring, [-1, 1], ["45%", "55%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group/button relative overflow-hidden rounded-full",
        containerClassName
      )}
    >
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ 
          backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, #3D4F4F, #3D4F4F)",
          backgroundSize: "100%",
        }}
      />
      <button
        ref={ref}
        className={cn(
          "relative w-full transition-all duration-200",
          "text-xl px-8 sm:px-14 py-5 sm:py-6 font-medium",
          "bg-black dark:bg-white rounded-full",
          "text-white dark:text-black",
          "group-hover/button:bg-opacity-0 dark:group-hover/button:bg-opacity-0",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
});

GradientButton.displayName = "GradientButton";