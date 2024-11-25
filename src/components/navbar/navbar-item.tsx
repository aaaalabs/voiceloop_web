"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: "_blank";
};

export function NavBarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md",
        "text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]",
        "hover:bg-[rgb(var(--background-secondary))] dark:hover:bg-[rgb(var(--text-secondary))]",
        "hover:text-[rgb(var(--text-primary))] dark:hover:text-[rgb(var(--background-primary))]",
        (active || pathname?.includes(href)) &&
          "bg-[rgb(var(--background-secondary))] dark:bg-[rgb(var(--text-secondary))] text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  );
}
