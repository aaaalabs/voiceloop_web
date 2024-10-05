"use client";
// import { Metadata } from "next";
import { FilloutStandardEmbed } from "@fillout/react";
import "@fillout/react/style.css";
import { Logo } from "@/components/Logo";

// const metadata: Metadata = {
//   title: "Signup - Everything AI",
//   description:
//     "Everything AI is a platform that provides a wide range of AI tools and services to help you stay on top of your business. Generate images, text and everything else that you need to get your business off the ground.",
//   openGraph: {
//     images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
//   },
// };

export default function SignupPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center">
          Sign up for an account
        </h2>
      </div>
      <div className="w-full h-[600px] sm:mt-0 lg:mt-4">
        <FilloutStandardEmbed filloutId="79oPkgvSZGus" dynamicResize={true} />
      </div>
    </div>
  );
}
