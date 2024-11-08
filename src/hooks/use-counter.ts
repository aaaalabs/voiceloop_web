import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';

export function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        setCount(end);
        return;
      }

      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [end, duration, inView, shouldReduceMotion]);

  return { count, ref };
} 