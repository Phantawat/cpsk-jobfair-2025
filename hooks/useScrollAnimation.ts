import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ScrollAnimationState {
  isVisible: boolean;
  hasBeenVisible: boolean;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): [React.RefObject<HTMLDivElement>, ScrollAnimationState] => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollAnimationState>({
    isVisible: false,
    hasBeenVisible: false,
  });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        setState((prevState) => ({
          isVisible,
          hasBeenVisible: prevState.hasBeenVisible || isVisible,
        }));

        // Stop observing if triggerOnce is true and element is visible
        if (triggerOnce && isVisible) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, state];
};
