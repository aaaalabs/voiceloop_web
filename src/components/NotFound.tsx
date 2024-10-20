import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" passHref>
        <Button
          variant="default"
          size="lg"
          className="text-white bg-black hover:bg-gray-800"
        >
          Go back to homepage
        </Button>
      </Link>
    </div>
  );
}
