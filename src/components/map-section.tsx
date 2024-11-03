"use client";

import { useRef, useEffect, useState } from 'react';
import loadable from '@loadable/component';

const MapFrame = loadable(() => import('./map-frame'), {
  fallback: <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-[20px]" />
});

export const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { 
          rootMargin: '200px' // Start loading when map is 200px from viewport
        }
      );

      observer.observe(mapRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div ref={mapRef} className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] mt-20 relative">
      <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10 pointer-events-none" />
      <div className="relative bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px] overflow-hidden">
        <div className="relative w-full aspect-video">
          {shouldLoad && <MapFrame />}
        </div>
      </div>
    </div>
  );
}; 