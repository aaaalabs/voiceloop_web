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