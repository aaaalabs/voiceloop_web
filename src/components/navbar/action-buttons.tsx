import React from "react";
import { Button } from "../button";
import { Link } from "next-view-transitions";

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
  <>
    {buttons.map((button, index) => (
      <ActionButton key={index} {...button} />
    ))}
  </>
);
