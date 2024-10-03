"use client";
import { Logo } from "./Logo";
export function SignupForm() {
  return (
    <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-md">
        <div>
          <div className="flex">
            <Logo />
          </div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
            Sign up for an account
          </h2>
        </div>

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
