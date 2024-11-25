import React from "react";
import { Button } from "../button";
import { Link } from "next-view-transitions";
import { cn } from "../../lib/utils";

type ActionButtonProps = {
  title: string;
  href: string;
  variant?: "default" | "simple";
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  href,
  variant = "default",
}) => (
  <Button variant={variant} as={Link} href={href}>
    {title}
  </Button>
);

type ActionButtonsProps = {
  buttons: ActionButtonProps[];
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => (
  <div className="flex items-center gap-2">
    {buttons.map((button) =>
      button.variant === "simple" ? (
        <Link
          key={button.href}
          href={button.href}
          className={cn(
            "relative z-10 text-sm md:text-sm font-medium rounded-full px-4 py-2",
            "flex items-center justify-center transition duration-200",
            "bg-transparent border border-transparent",
            "text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]",
            "hover:bg-[rgb(var(--background-secondary))] dark:hover:bg-[rgb(var(--text-secondary))]",
            "hover:text-[rgb(var(--text-primary))] dark:hover:text-[rgb(var(--background-primary))]"
          )}
        >
          {button.title}
        </Link>
      ) : (
        <ActionButton key={button.href} {...button} />
      )
    )}
  </div>
);
