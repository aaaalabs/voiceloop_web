import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { client, Blog } from "@/lib/blog";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { BlurImage } from "@/components/blur-image";
import { urlFor } from "@/lib/blog";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

async function getData(slug: string): Promise<Blog> {
  const query = `
  *[_type == "blog" && slug.current == $slug][0] {
    title,
    content[] {
      ...,
      _type == "videoEmbed" => {
        _type,
        videoFile,
        caption
      }
    },
    titleImage,
    author->{
      name,
      src
    },
    _createdAt,
    date,
    readTime,
    topics,
    smallDescription,
    metaTitle,
    metaDescription,
    keywords,
    relatedLinks
  }`;

  const data = await client.fetch(query, { slug });

  if (!data) {
    notFound();
  }

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getData(params.slug);

  return {
    title: `${blog.title} | voiceloop`,
    description: blog.smallDescription,
    openGraph: {
      images: [urlFor(blog.titleImage).url() || ""],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getData(params.slug);

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40 w-full max-w-3xl">
          <Heading as="h1" className="text-center mb-8">
            {blog.title}
          </Heading>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="text-center">
              <p className="text-sm text-muted">
                {new Date(blog._createdAt).toLocaleDateString()} • {blog.readTime} min read
              </p>
            </div>
          </div>
          {blog.titleImage && (
            <BlurImage
              src={urlFor(blog.titleImage).url() || ""}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg mb-8 w-full"
            />
          )}
          <div className="prose prose-xl dark:prose-invert max-w-none">
            <PortableText value={blog.content} />
          </div>
        </div>
      </Container>
    </div>
  );
}
