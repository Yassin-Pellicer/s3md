import { useEffect, useRef } from 'react';

export const hooks = (deps: any[] = []) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }, deps);

  return scrollContainerRef;
};
