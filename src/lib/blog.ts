import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export type Blog = {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  content: any;
  author: {
    name: string;
    src: any;
  };
  _createdAt: string;
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
