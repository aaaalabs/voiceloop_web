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

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

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
