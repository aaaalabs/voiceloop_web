"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useMemo } from "react";

export const Background = () => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  // Colors from our palette
  const colors = useMemo(() => ({
    gradientBackgroundStart: "#F3EDE5",
    gradientBackgroundEnd: "#1D3640",
    firstColor: "233, 184, 147",
    secondColor: "249, 157, 124",
    thirdColor: "163, 166, 146",
    fourthColor: "61, 79, 79",
    fifthColor: "243, 237, 229",
    pointerColor: "233, 184, 147",
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => {
      document.body.style.setProperty(`--${key}`, value);
    });
    document.body.style.setProperty("--size", "100%");
    document.body.style.setProperty("--blending-value", "soft-light");
  }, [colors]);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(c => c + (tgX - c) / 20);
      setCurY(c => c + (tgY - c) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  // Calculate opacity based on scroll position
  const opacity = Math.max(0, Math.min(1, (400 - scrollY) / 300));

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-screen pointer-events-none -z-10"
      style={{ opacity }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {[
          "first",
          "second",
          "third",
          "fourth",
          "fifth"
        ].map((variant, index) => (
          <div
            key={variant}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--${variant}-color),_0.8)_0,_rgba(var(--${variant}-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:${index % 2 ? 'calc(50%-400px)' : 'center_center'}]`,
              `animate-${variant}`,
              `opacity-${index === 3 ? '70' : '100'}`
            )}
          />
        ))}

        <div
          ref={interactiveRef}
          onMouseMove={handleMouseMove}
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
            `opacity-70`
          )}
        />
      </div>
    </div>
  );
};
