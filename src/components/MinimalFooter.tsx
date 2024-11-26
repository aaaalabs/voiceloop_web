import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";
import { links, content, legal, socials } from "@/constants/footer_links";

export const MinimalFooter = () => {
  return (
    <footer className="bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--text-primary))] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center text-sm text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]">
          <div className="max-w-7xl mx-auto text-sm text-neutral-500 dark:text-neutral-400 flex sm:flex-row flex-col justify-between items-start">
            <div>
              <div className="mr-4 md:flex mb-4">
                <Logo />
              </div>
              <div className="text-left">Copyright &copy; {new Date().getFullYear()} Libra Innovation GmbH</div>
              <div className="mt-2 text-left">All rights reserved</div>
            </div>
            <div className="grid grid-cols-4 gap-10 items-start mt-10 md:mt-0">
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {content.map((link) => (
                  <Link
                    key={link.name}
                    className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {legal.map((link) => (
                  <Link
                    key={link.name}
                    className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {socials.map((link) => (
                  <Link
                    key={link.name}
                    className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 