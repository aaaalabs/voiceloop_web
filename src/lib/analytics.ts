import { track as vercelTrack } from '@vercel/analytics';

export const Analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    vercelTrack(event, properties);
  }
}; 