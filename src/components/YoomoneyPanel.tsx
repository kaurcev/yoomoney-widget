import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { usePortal } from '../hooks/usePortal';
import { cx } from '../utils/cx';
import { Yoomoney } from './Yoomoney';
import type { YoomoneyPanelProps } from '../types';

export const YoomoneyPanel: React.FC<YoomoneyPanelProps> = ({
  isOpen = false,
  panelTitle = 'Оплата',
  onClose,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockBodyScroll = true,
  usePortal: portalEnabled = true,
  showCloseButton = true,
  trapFocus = true,
  classNames = {},
  overlayStyle,
  panelStyle,
  ...formProps
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const container = usePortal(portalEnabled && isOpen);

  useEscapeKey(isOpen && closeOnEscape, onClose);
  useLockBodyScroll(isOpen && lockBodyScroll);
  // `!!container` гарантирует, что focus trap стартует после монтирования portal
  useFocusTrap(panelRef, isOpen && trapFocus && !!container);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) onClose?.();
  };

  const panelNode = (
    <div
      className={cx(
        'yw-overlay',
        'yw-overlay--right',
        !isOpen && 'yw-overlay--closed',
        classNames.overlay,
      )}
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={cx('yw-panel', isOpen && 'yw-panel--open', classNames.panel)}
        style={panelStyle}
      >
        {showCloseButton && (
          <button
            type="button"
            className={cx('yw-close', classNames.close)}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        )}

        {panelTitle && <h2 className={cx('yw-panel__title', classNames.title)}>{panelTitle}</h2>}

        <div className={cx('yw-panel__body', classNames.body)}>
          <Yoomoney {...formProps} logoAlign="left" classNames={classNames} />
        </div>
      </div>
    </div>
  );

  return portalEnabled && container ? createPortal(panelNode, container) : panelNode;
};
