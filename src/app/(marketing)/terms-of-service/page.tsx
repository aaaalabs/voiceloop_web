import { LegalPage } from '@/components/LegalPage';
import { getLegalDocument } from '@/lib/legal';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export default async function TermsOfServicePage() {
  const legal = await getLegalDocument('terms-of-service');
  
  if (!legal) {
    notFound();
  }
  
  return (
    <LegalPage
      title={legal.title}
      content={<PortableText value={legal.content} />}
      lastUpdated={legal.lastUpdated}
      version={legal.version}
    />
  );
}
