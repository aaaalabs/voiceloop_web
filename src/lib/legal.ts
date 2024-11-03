import { client } from './blog';

export async function getLegalDocument(slug: string) {
  try {
    const query = `*[_type == "legal" && slug.current == $slug][0] {
      title,
      "content": content[] {
        ...,
        _type == "block" => {
          ...,
          markDefs[] {
            ...,
            _type == "link" => {
              ...,
              href
            }
          }
        }
      },
      lastUpdated,
      version
    }`;

    const document = await client.fetch(query, { slug });
    
    if (!document) {
      console.log(`No document found for slug: ${slug}`);
      return null;
    }
    
    return document;
  } catch (error) {
    console.error('Error fetching legal document:', error);
    return null;
  }
} 