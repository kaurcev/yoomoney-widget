import { useEffect, useState } from 'react';

export const usePortal = (enabled: boolean): HTMLElement | null => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      setContainer(null);
      return;
    }
    const el = document.createElement('div');
    el.dataset.ywPortal = '';
    document.body.appendChild(el);
    setContainer(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [enabled]);

  return container;
};
