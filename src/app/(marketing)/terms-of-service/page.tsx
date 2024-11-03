import { LegalPage } from '@/components/LegalPage';
import { getLegalDocument } from '@/lib/legal';
import { PortableText } from '@portabletext/react';

export default async function TermsOfServicePage() {
  const legal = await getLegalDocument('terms-of-service');
  
  return (
    <LegalPage
      title={legal.title}
      content={<PortableText value={legal.content} />}
      lastUpdated={legal.lastUpdated}
      version={legal.version}
    />
  );
}
