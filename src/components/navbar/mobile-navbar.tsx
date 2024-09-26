"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import React, { useState, useEffect } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Button } from "../button";
import { Logo } from "../Logo";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ModeToggle } from "../mode-toggle";
import { ActionButtons } from "./action-buttons";

type Props = {
  navItems: {
    link: string;
    title: string;
    target?: "_blank";
  }[];
  actionButtons: {
    title: string;
    href: string;
    variant?: "default" | "simple";
  }[];
};

export const MobileNavbar = ({ navItems, actionButtons }: Props) => {
  const [open, setOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  return (
    <div
      className={cn(
        "flex justify-between bg-white dark:bg-neutral-900 items-center w-full rounded-full px-2.5 py-1.5 transition duration-200",
        showBackground &&
          "bg-neutral-50 dark:bg-neutral-900 shadow-[0px_-2px_0px_0px_var(--neutral-100),0px_2px_0px_0px_var(--neutral-100)] dark:shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
      )}
    >
      <Logo />
      <IoIosMenu
        className="text-black dark:text-white h-6 w-6"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-start justify-start space-y-10 text-xl text-zinc-600 transition-all duration-200 ease-in-out"
          style={{ height: `${windowHeight}px`, width: "100%" }}
        >
          <div className="flex items-center justify-between w-full px-5">
            <Logo />
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <IoIosClose
                className="h-8 w-8 text-black dark:text-white"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[14px] px-8 w-full">
            {navItems.map((navItem: any, idx: number) => (
              <React.Fragment key={`navitem-${idx}`}>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map(
                      (childNavItem: any, childIdx: number) => (
                        <Link
                          key={`childlink-${childIdx}`}
                          href={childNavItem.link}
                          onClick={() => setOpen(false)}
                          className="relative max-w-full text-left text-2xl"
                        >
                          <span className="block text-black dark:text-white">
                            {childNavItem.title}
                          </span>
                        </Link>
                      )
                    )}
                  </>
                ) : (
                  <Link
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className="relative w-full"
                  >
                    <span className="block text-[26px] text-black dark:text-white">
                      {navItem.title}
                    </span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row w-full items-start gap-2.5 px-8 py-4">
            <ActionButtons buttons={actionButtons} />
          </div>
        </div>
      )}
    </div>
  );
};
