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
      className="shadow-derek rounded-3xl border dark:border-[rgb(var(--text-tertiary))] w-full bg-[rgb(var(--background-tertiary))] dark:bg-[rgb(var(--text-tertiary))] overflow-hidden hover:scale-[1.02] transition duration-200"
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
          <div className="h-52 flex items-center justify-center bg-[rgb(var(--background-tertiary))] dark:bg-[rgb(var(--text-tertiary))]">
            <Logo />
          </div>
        )}
      </div>
      <div className="p-4 md:p-8 bg-[rgb(var(--background-tertiary))] dark:bg-[rgb(var(--text-tertiary))]">
        {/* Date and First Topic */}
        <div className="flex items-center space-x-2 text-xs text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))] mb-1">
          <span>{format(new Date(blog.date), "MMM d, yyyy")}</span>
          <span>●</span>
          {blog.topics?.[0] && <span>{blog.topics[0]}</span>}
        </div>
        {/* Blog Title */}
        <p className="text-lg font-bold text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]">
          {blog.title}
        </p>
        {/* Blog Small Description */}
        <p className="text-left text-sm mt-2 text-[rgb(var(--text-secondary))] dark:text-[rgb(var(--background-secondary))] truncate">
          {blog.smallDescription}
        </p>
      </div>
    </Link>
  );
};