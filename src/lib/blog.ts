import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type VideoEmbed = {
  _type: 'videoEmbed';
  videoFile: string;
  caption?: string;
};

type BlockContent = {
  _type: 'block';
  // ... other block properties
};

export type Blog = {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  content: Array<BlockContent | VideoEmbed>;
  author: {
    name: string;
    src: any;
  };
  _createdAt: string;
  date: string;
  readTime: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  topics: string[];
  relatedLinks?: { title: string; url: string }[];
};

export const client = createClient({
  projectId: "hcqkmtjj",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

export interface BlogWithSlug {
  title: string;
  currentSlug: string;
  smallDescription: string;
  image?: { _type: string; asset: { _ref: string } };
  date: string;
  readTime: number;
  topics: string[];
  content: Array<BlockContent | VideoEmbed>;
  relatedLinks?: { title: string; url: string }[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}