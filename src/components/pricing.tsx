"use client";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { tiers } from "@/constants/tier";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

export function Pricing() {
  const [active, setActive] = useState("monthly");
  const tabs = [
    { name: "Monthly", value: "monthly" },
    { name: "Yearly", value: "yearly" },
  ];

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "bg-[#F3EDE5] dark:bg-[#3D4F4F] ring-2 ring-[#E9B893]"
                : "bg-[#F3EDE5] dark:bg-[#3D4F4F] ring-1 ring-[#A3A692]",
              "rounded-3xl p-8 xl:p-10"
            )}
          >
            <div className="">
              <h3
                id={tier.id}
                className={cn(
                  tier.featured
                    ? "text-white"
                    : "text-muted dark:text-muted-dark",
                  "text-base font-semibold leading-7"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4">
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  key={active}
                  className={cn(
                    "text-4xl font-bold tracking-tight  inline-block",
                    tier.featured
                      ? "text-white"
                      : "text-neutral-900 dark:text-neutral-200"
                  )}
                >
                  {active === "monthly" ? tier.priceMonthly : tier.priceYearly}
                </motion.span>
              </p>
              <p
                className={cn(
                  tier.featured
                    ? "text-neutral-300"
                    : "text-neutral-600 dark:text-neutral-300",
                  "mt-6 text-sm leading-7  h-12 md:h-12 xl:h-12"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={cn(
                  tier.featured
                    ? "text-neutral-300"
                    : "text-neutral-600 dark:text-neutral-300",
                  "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <IconCircleCheckFilled
                      className={cn(
                        tier.featured
                          ? "text-white"
                          : "text-muted dark:text-muted-dark",
                        "h-6 w-5 flex-none"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Button
                onClick={tier.onClick}
                aria-describedby={tier.id}
                className={cn(
                  tier.featured
                    ? "bg-white text-black shadow-sm hover:bg-white/90 focus-visible:outline-white"
                    : "",
                  "mt-8 rounded-full py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 block w-full"
                )}
              >
                {tier.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
