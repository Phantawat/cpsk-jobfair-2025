import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-in' | 'zoom-in';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, triggerOnce]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return isVisible ? 'animate-scroll-fade-up' : 'opacity-0 translate-y-8';
      case 'fade-down':
        return isVisible ? 'animate-scroll-fade-down' : 'opacity-0 -translate-y-8';
      case 'fade-left':
        return isVisible ? 'animate-scroll-fade-left' : 'opacity-0 translate-x-8';
      case 'fade-right':
        return isVisible ? 'animate-scroll-fade-right' : 'opacity-0 -translate-x-8';
      case 'fade-in':
        return isVisible ? 'animate-scroll-fade-in' : 'opacity-0';
      case 'scale-in':
        return isVisible ? 'animate-scroll-scale-in' : 'opacity-0 scale-90';
      case 'zoom-in':
        return isVisible ? 'animate-scroll-zoom-in' : 'opacity-0 scale-75';
      default:
        return isVisible ? 'animate-scroll-fade-up' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
