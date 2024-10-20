import React from 'react';

interface LegalPageProps {
  title: string;
  content: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">{title}</h1>
      <div className="max-w-2xl text-center text-gray-700 dark:text-gray-300">
        {content}
      </div>
    </div>
  );
};
