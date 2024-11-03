import { client } from './blog';

export async function getLegalDocument(slug: string) {
  try {
    const query = `*[_type == "legal" && slug.current == $slug][0] {
      title,
      content,
      lastUpdated,
      version
    }`;

    const document = await client.fetch(query, { slug });
    return document;
  } catch (error) {
    console.error('Error fetching legal document:', error);
    return null;
  }
} 