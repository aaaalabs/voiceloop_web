import { Background } from "@/components/background";
import { Metadata } from "next";
import { FeaturedTestimonials } from "@/components/featured-testimonials";
import { cn } from "@/lib/utils";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { ContactForm } from "@/components/contact";
import { getCurrentKpis, getTestimonials } from "@/db";

// export const metadata: Metadata = {
//   title: "Contact Us - voiceloop.io",
//   description:
//     "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
//   openGraph: {
//     images: ["https://ik.imagekit.io/libralab/VoiceLoop/social"],
//   },
// };

export default async function ContactPage() {
  const testimonials = await getTestimonials();
  const currentKpis = await getCurrentKpis();

  return (
    <div className="relative overflow-hidden py-20 md:py-0 px-4 md:px-20 bg-gray-50 dark:bg-black">
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
        <Background />
        <ContactForm />
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-900 overflow-hidden bg-gray-50 dark:bg-black items-center justify-center">
          <div className="max-w-sm mx-auto">
            <FeaturedTestimonials testimonials={testimonials} />
            <p
              className={cn(
                "font-semibold text-xl text-center dark:text-muted-dark text-muted"
              )}
            >
              {currentKpis?.members ? (
                <span>
                  Voiceloop is used by {currentKpis?.members} community members
                </span>
              ) : (
                <span>
                  Voiceloop is used by community members around the world
                </span>
              )}
            </p>
            <p
              className={cn(
                "font-normal text-base text-center text-neutral-500 dark:text-neutral-200 mt-8"
              )}
            >
              VoiceLoop revolutionizes engagement with AI-powered insights and
              time-saving tools. Boost retention and authentic connections.
            </p>
          </div>
          <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
          <HorizontalGradient className="-right-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
          <HorizontalGradient className="-left-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
        </div>
      </div>
    </div>
  );
}
