"use client";
// import { Metadata } from "next";
import { FilloutStandardEmbed } from "@fillout/react";
import "@fillout/react/style.css";

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
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-[600px] sm:mt-0 lg:mt-20">
        <FilloutStandardEmbed filloutId="79oPkgvSZGus" dynamicResize={true} />
      </div>
    </div>
  );
}
