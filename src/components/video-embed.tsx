import Video from 'next-video';
import connect from '@v/connect.mp4';
import placerholder_video from '@v/placerholder_video.mp4';

// Map of available videos
const videos = {
  'connect.mp4': connect,
  'placerholder_video.mp4': placerholder_video,
  // Add other videos here as they're added to your project
} as const;

type VideoKey = keyof typeof videos;

export const VideoEmbed = ({ value }: { value: { videoFile: string; caption?: string } }) => {
  // Type guard to ensure videoFile is a valid key
  const videoFile = value.videoFile as VideoKey;
  const video = videos[videoFile];

  if (!video) {
    console.warn(`Video file "${videoFile}" not found in videos map`);
    return null;
  }

  return (
    <div className="my-8">
      <Video 
        src={video}
        className="w-full rounded-lg"
        controls
      />
      {value.caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
      )}
    </div>
  );
};

// PortableText components configuration
export const portableTextComponents = {
  types: {
    videoEmbed: VideoEmbed,
    // ... other type components
  }
}; 