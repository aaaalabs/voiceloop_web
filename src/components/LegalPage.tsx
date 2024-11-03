import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';

interface LegalPageProps {
  title: string;
  content: any;
  lastUpdated?: string;
  version?: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  title,
  content,
  lastUpdated,
  version
}) => {
  const formatDate = (date: string | undefined) => {
    if (!date) return 'Not specified';
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={content} />
      </div>
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        {version && <p>Version: {version}</p>}
        {lastUpdated && <p>Last Updated: {formatDate(lastUpdated)}</p>}
      </div>
    </div>
  );
};
