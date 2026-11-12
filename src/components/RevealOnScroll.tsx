import React, { useEffect, useRef, useState } from 'react';
import { shouldTriggerReveal, getRevealClasses } from '../utils/flowpilotLogic';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: 0 | 75 | 150 | 225 | 300;
  threshold?: number;
}

const DELAY_CLASS_MAP: Record<number, string> = {
  0: '',
  75: 'delay-75',
  150: 'delay-150',
  225: 'delay-200',
  300: 'delay-300',
};

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Respect reduced motion preference or environments without IntersectionObserver
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsVisible((prev) => {
            const next = shouldTriggerReveal(
              {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
              },
              prev,
              threshold
            );
            if (next) {
              observer.unobserve(entry.target);
            }
            return next;
          });
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const revealClasses = getRevealClasses(isVisible);
  const delayClass = DELAY_CLASS_MAP[delayMs] || '';

  return (
    <div
      ref={containerRef}
      data-reveal-state={isVisible ? 'visible' : 'hidden'}
      className={`${revealClasses} ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
};
