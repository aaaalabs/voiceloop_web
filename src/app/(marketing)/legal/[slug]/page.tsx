import { LegalPage } from '@/components/LegalPage';
import { getLegalDocument } from '@/lib/legal';
import { notFound } from 'next/navigation';

export default async function LegalDocumentPage({
  params
}: {
  params: { slug: string }
}) {
  const legal = await getLegalDocument(params.slug);
  
  if (!legal) {
    console.log(`Legal document not found for slug: ${params.slug}`);
    notFound();
  }

  return (
    <LegalPage
      title={legal.title}
      content={legal.content}
      lastUpdated={legal.lastUpdated}
      version={legal.version}
    />
  );
}

// Add error handling
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ')} - voiceloop`,
  };
} 