"use client";

import loadable from "@loadable/component";
import { useRef, useEffect } from "react";
import { Button } from "./button";

// Separate Fillout initialization into its own component
const FilloutScript = loadable(() => import("./fillout-script"), {
  ssr: false,
  fallback: null,
});

export const FilloutButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Preload when button is visible
            FilloutScript.preload();
          }
        },
        { rootMargin: "100px" }, // Start loading when button is 100px from viewport
      );

      observer.observe(buttonRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        as="a"
        href="#"
        className="fillout-popup-button"
        data-fillout-id="xearkoux1Xus"
        data-fillout-embed-type="popup"
        data-fillout-dynamic-resize
        data-fillout-inherit-parameters
        data-fillout-popup-size="medium"
      >
        Book a Demo
      </Button>
      <FilloutScript />
    </>
  );
};
