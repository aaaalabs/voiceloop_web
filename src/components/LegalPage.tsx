import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';

interface LegalPageProps {
  title: string;
  content: any;
  lastUpdated: string;
  version: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  title,
  content,
  lastUpdated,
  version
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={content} />
      </div>
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>Version: {version}</p>
        <p>Last Updated: {format(new Date(lastUpdated), 'MMMM d, yyyy')}</p>
      </div>
    </div>
  );
};
