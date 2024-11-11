"use client";
// import { Metadata } from "next";
import { Logo } from "@/components/Logo";

// const metadata: Metadata = {
//   title: "Signup - voiceloop | amplify what matters",
//   description:
//     "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
//   openGraph: {
//     images: ["https://ik.imagekit.io/libralab/VoiceLoop/social"],
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

      </div>
    </div>
  );
}
