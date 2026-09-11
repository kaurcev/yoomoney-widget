import { useEffect } from 'react';

export const useEscapeKey = (active: boolean, handler?: () => void) => {
  useEffect(() => {
    if (!active || !handler) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
};
