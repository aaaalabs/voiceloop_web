import "../globals.css";
import type { Metadata } from "next";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
// import { GeistSans } from "geist/font/sans";
// import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "voiceloop | amplify what matters",
  description:
    "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
  openGraph: {
    images: ["/social.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
