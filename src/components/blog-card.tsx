import { Link } from "next-view-transitions";
import React from "react";
import { BlurImage } from "./blur-image";
import { Logo } from "./Logo";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Blog, urlFor } from "@/lib/blog";
import { format } from "date-fns";

export const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      className="shadow-derek rounded-3xl border dark:border-[#3D4F4F] w-full bg-[#F3EDE5] dark:bg-[#3D4F4F] overflow-hidden hover:scale-[1.02] transition duration-200"
      href={`/blog/${blog.currentSlug}`}
    >
      {/* Image section */}
      <div className="relative">
        {blog.titleImage ? (
          <BlurImage
            src={urlFor(blog.titleImage)?.url() || ""}
            alt={blog.title}
            height="800"
            width="800"
            className="h-52 object-cover object-top w-full"
          />
        ) : (
          <div className="h-52 flex items-center justify-center bg-white dark:bg-neutral-900">
            <Logo />
          </div>
        )}
      </div>
      <div className="p-4 md:p-8 bg-white dark:bg-neutral-900">
        {/* Date and First Topic */}
        <div className="flex items-center space-x-2 text-xs text-[#1d333b] mb-1">
          <span>{format(new Date(blog.date), "MMM d, yyyy")}</span>
          <span>●</span>
          {blog.topics?.[0] && <span>{blog.topics[0]}</span>}
        </div>
        {/* Blog Title */}
        <p className="text-lg font-bold">{blog.title}</p>
        {/* Blog Small Description */}
        <p className="text-left text-sm mt-2 text-muted truncate">
          {blog.smallDescription}
        </p>
      </div>
    </Link>
  );
};