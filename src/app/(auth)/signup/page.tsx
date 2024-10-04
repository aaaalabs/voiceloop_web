import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Everything AI",
  description:
    "Everything AI is a platform that provides a wide range of AI tools and services to help you stay on top of your business. Generate images, text and everything else that you need to get your business off the ground.",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

export default function SignupPage() {
  return (
    <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-md">
        <div className="mt-10">
          <div
            style={{ width: "100%", height: "500px" }}
            data-fillout-id="79oPkgvSZGus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          ></div>
        </div>
      </div>
    </div>
  );
}
