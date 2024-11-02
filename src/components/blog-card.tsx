import { Link } from "next-view-transitions";
import React from "react";
import { BlurImage } from "./blur-image";
import { Logo } from "./Logo";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Blog, urlFor } from "@/lib/blog";

export const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.02] transition duration-200"
      href={`/blog/${blog.currentSlug}`}
    >
      {blog.titleImage ? (
        <BlurImage
          src={urlFor(blog.titleImage).url() || ""}
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
      <div className="p-4 md:p-8 bg-white dark:bg-neutral-900">
        {/* Blog Title */}
        <p className="text-lg font-bold mb-4">
          <Balancer>{blog.title}</Balancer>
        </p>
        {/* Blog Small Description */}
        <p className="text-left text-sm mt-2 text-muted truncate">
          {blog.smallDescription}
        </p>
      </div>
    </Link>
  );
};