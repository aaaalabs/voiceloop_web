export function YouTubeEmbed({ value }: { 
  value: { 
    url: string;
    caption?: string;
    aspectRatio: string;
  } 
}) {
  // Extract video ID from URL
  const videoId = value.url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/)?.[1];

  if (!videoId) {
    console.warn('Invalid YouTube URL:', value.url);
    return null;
  }

  const aspectRatioClass = value.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square';

  return (
    <div className="my-8">
      <div className={`w-full ${aspectRatioClass} rounded-lg overflow-hidden`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      {value.caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
      )}
    </div>
  );
} 