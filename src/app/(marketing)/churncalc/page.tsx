import { Container } from "@/components/container";
import { ChurnCalculator } from "@/components/churn-calculator";

export const metadata = {
  title: "Churn Calculator - voiceloop | amplify what matters",
  description: "Calculate the impact of reducing churn on your community's revenue and growth.",
  openGraph: {
    images: ["https://ik.imagekit.io/libralab/VoiceLoop/social"],
  },
};

export default function ChurnCalcPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0 bg-[#F2E2CE] dark:bg-[#1D3640]">
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-4">
            Community Churn Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
            See how reducing churn can dramatically impact your community&apos;s growth and revenue
          </p>
        </div>
        <ChurnCalculator />
      </Container>
    </div>
  );
} 