import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "voiceloop | amplify what matters",
  description:
    "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
  openGraph: {
    images: ["/social.webp"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
