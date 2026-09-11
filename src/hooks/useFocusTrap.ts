import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isVisible = (el: HTMLElement): boolean => {
  if (el.hasAttribute('hidden')) return false;
  if (el.hasAttribute('inert')) return false;
  if (el.closest('[aria-hidden="true"]')) return false;
  const style = window.getComputedStyle(el);
  if (style.display === 'none') return false;
  if (style.visibility === 'hidden') return false;
  return true;
};

const getFocusable = (root: HTMLElement): HTMLElement[] => {
  const nodes = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  return Array.from(nodes).filter(isVisible);
};

export const useFocusTrap = <T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean,
) => {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const focusable = getFocusable(container);
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        container.setAttribute('tabindex', '-1');
        container.focus();
      }
    };

    // setTimeout(0) — дожидаемся монтирования portal в DOM
    const timeoutId = setTimeout(focusFirst, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !container.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, active]);
};
