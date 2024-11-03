export function SpotifyEmbed({ value }: { 
  value: { 
    url: string;
    type: string;
    theme: string;
  } 
}) {
  const embedUrl = value.url.replace('spotify.com', 'spotify.com/embed');
  
  return (
    <div className="my-8">
      <iframe
        src={embedUrl}
        width="100%"
        height={value.type === 'track' ? '152' : '380'}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
        style={{ 
          colorScheme: value.theme === 'dark' ? 'dark' : 'light'
        }}
      />
    </div>
  );
} 