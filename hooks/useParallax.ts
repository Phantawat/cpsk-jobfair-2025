import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number; // 0-1, where 0.5 is half scroll speed
  offset?: number; // Initial offset in pixels
}

export const useParallax = (
  options: UseParallaxOptions = {}
): [React.RefObject<HTMLDivElement>, { offsetY: number }] => {
  const { speed = 0.5, offset = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(offset);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      // Calculate scroll position relative to element visibility
      const element = ref.current.getBoundingClientRect();
      const elementTop = element.top;
      const windowHeight = window.innerHeight;

      // Only calculate parallax if element is in viewport
      if (elementTop < windowHeight && elementTop + element.height > 0) {
        const distanceFromTop = window.scrollY + elementTop;
        const parallax = (window.scrollY - (distanceFromTop - windowHeight / 2)) * speed;
        setOffsetY(offset + parallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return [ref, { offsetY }];
};
