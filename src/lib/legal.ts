import { client } from './blog';

export async function getLegalDocument(slug: string) {
  const query = `*[_type == "legal" && slug.current == $slug][0] {
    title,
    content,
    lastUpdated,
    version
  }`;

  const document = await client.fetch(query, { slug });
  return document;
} 