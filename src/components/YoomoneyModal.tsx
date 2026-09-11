import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { usePortal } from '../hooks/usePortal';
import { cx } from '../utils/cx';
import { Yoomoney } from './Yoomoney';
import type { YoomoneyModalProps } from '../types';

export const YoomoneyModal: React.FC<YoomoneyModalProps> = ({
  buttonText = 'Оплатить',
  modalTitle = 'Пополнение счета',
  onOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockBodyScroll = true,
  usePortal: portalEnabled = true,
  showCloseButton = true,
  trapFocus = true,
  classNames = {},
  overlayStyle,
  modalStyle,
  buttonStyle,
  buttonClassName,
  ...formProps
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const container = usePortal(portalEnabled && open);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    onOpen?.();
  }, [onOpen]);

  useEscapeKey(open && closeOnEscape, handleClose);
  useLockBodyScroll(open && lockBodyScroll);
  // `!!container` гарантирует, что focus trap стартует после монтирования portal
  useFocusTrap(modalRef, open && trapFocus && !!container);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) handleClose();
  };

  const modalNode = open ? (
    <div
      className={cx('yw-overlay', 'yw-overlay--center', classNames.overlay)}
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className={cx('yw-modal', classNames.modal)} style={modalStyle}>
        {showCloseButton && (
          <button
            type="button"
            className={cx('yw-close', classNames.close)}
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        )}

        {modalTitle && <h3 className={cx('yw-modal__title', classNames.title)}>{modalTitle}</h3>}

        <Yoomoney {...formProps} logoAlign="left" classNames={classNames} />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        className={cx('yw-trigger', buttonClassName, classNames.trigger)}
        onClick={handleOpen}
        style={buttonStyle}
      >
        {buttonText}
      </button>

      {portalEnabled && container ? createPortal(modalNode, container) : modalNode}
    </>
  );
};
