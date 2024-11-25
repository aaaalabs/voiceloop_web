"use client";

import { BlogWithSlug } from "@/lib/blog";
import { IconArrowLeft } from "@tabler/icons-react";
import { Container } from "./container";
import Image from "next/image";
import { Logo } from "./Logo";
import Link from "next/link";
import { format } from "date-fns";
import Head from "next/head";
import { urlFor } from "@/lib/blog"; // Ensure this path matches your project structure

type TableContent = {
  _type: 'table';
  rows: Array<{
    cells: string[];
  }>;
  caption?: string;
};

type HorizontalRuleContent = {
  _type: 'horizontalRule';
  style: 'solid' | 'dashed' | 'dotted';
  spacing: 'sm' | 'md' | 'lg';
};

type BlockContent = {
  _type: 'block';
  // ... existing block properties
} | TableContent | HorizontalRuleContent;

// Blog layout component
export function BlogLayout({
  blog,
  children,
}: {
  blog: BlogWithSlug;
  children: React.ReactNode;
}) {
  const components = {
    types: {
      // ... existing components ...
      table: ({ value }) => (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {value.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {value.caption && (
            <p className="mt-2 text-sm text-center text-gray-500">
              {value.caption}
            </p>
          )}
        </div>
      ),
      horizontalRule: ({ value }) => {
        const spacing = {
          sm: 'my-4',
          md: 'my-8',
          lg: 'my-12'
        }[value.spacing];
        
        const style = {
          solid: 'border-solid',
          dashed: 'border-dashed',
          dotted: 'border-dotted'
        }[value.style];

        return (
          <hr 
            className={`
              ${spacing} 
              ${style} 
              border-t 
              border-gray-200 
              dark:border-gray-700
            `}
          />
        );
      }
    }
  };

  return (
    <>
      {/* SEO Meta Information */}
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.smallDescription} />
        <meta name="keywords" content={blog.keywords?.join(", ")} />
      </Head>

      {/* Main Blog Container */}
      <Container className="mt-16 lg:mt-32">
        
        {/* Back Button */}
        <div className="flex justify-between items-center px-2 py-8">
          <Link href="/blog" className="flex space-x-2 items-center">
            <IconArrowLeft className="w-4 h-4 text-muted dark:text-muted-dark" />
            <span className="text-sm text-muted dark:text-muted-dark">Back</span>
          </Link>
        </div>
        
        {/* Blog Topics as Badges */}
        <div className="flex space-x-2 mb-4">
          {blog.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs font-semibold border border-neutral-300 dark:border-neutral-700 rounded-full px-3 py-1 text-muted dark:text-muted-dark"
            >
              {topic}
            </span>
          ))}
        </div>
        
        {/* Blog Title */}
        <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl">
          {blog.title}
        </h1>

        {/* Date and Read Time */}
        <div className="mt-2 flex items-center space-x-2 text-base text-muted dark:text-muted-dark">
          <time dateTime={blog.date}>
            {format(new Date(blog.date), "dd MMM yyyy")}
          </time>
          <span>●</span>
          <span>{blog.readTime} min read</span>
        </div>

        {/* Blog Image */}
        <div className="mt-8 max-w-4xl mx-auto">
          {blog.image ? (
            <Image
              src={urlFor(blog.image)
                .width(800)
                .height(800)
                .quality(80)
                .format("webp")
                .url() || "/placeholder-image.jpg"}
              height="800"
              width="800"
              className="h-40 md:h-96 w-full aspect-square object-cover rounded-3xl"
              alt={blog.title}
            />
          ) : (
            <div className="h-40 md:h-96 w-full aspect-square rounded-3xl shadow-derek bg-[rgb(var(--background-tertiary))] dark:bg-neutral-900 flex items-center justify-center">
              <Logo />
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article className="pb-8">
              <div className="mt-8 prose prose-sm dark:prose-invert" data-mdx-content>
                {children}
              </div>
            </article>
          </div>
        </div>

        {/* Related Links */}
        {blog.relatedLinks && blog.relatedLinks.length > 0 && (
          <div className="mt-12 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Related Links</h2>
            <ul className="space-y-2">
              {blog.relatedLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </>
  );
}