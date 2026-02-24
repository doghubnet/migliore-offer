'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    AOS?: { init: (opts: Record<string, unknown>) => void };
  }
}

export default function AOSInit() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-aos]'));
    let observer: IntersectionObserver | undefined;

    const runFallback = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
          });
        },
        { threshold: 0.15 }
      );
      nodes.forEach((el) => observer?.observe(el));
    };

    const tryInitAOS = () => {
      if (window.AOS?.init) {
        window.AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
        return true;
      }
      return false;
    };

    if (!tryInitAOS()) {
      const timer = window.setTimeout(() => {
        if (!tryInitAOS()) runFallback();
      }, 400);
      return () => {
        window.clearTimeout(timer);
        observer?.disconnect();
      };
    }

    return () => observer?.disconnect();
  }, []);

  return null;
}
