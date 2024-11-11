import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - voiceloop",
  description:
    "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
  openGraph: {
    images: ["https://ik.imagekit.io/libralab/VoiceLoop/social"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
