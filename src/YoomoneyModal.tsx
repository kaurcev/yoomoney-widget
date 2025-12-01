import React, { useState } from 'react';
import { Yoomoney } from './Yoomoney';
import { YoomoneyModalProps } from './types';
import { fontStyles } from './fontStyles';

export const YoomoneyModal: React.FC<YoomoneyModalProps> = ({
  buttonText = 'Оплатить',
  modalTitle = 'Пополнение счета',
  onOpen,
  onClose,
  closeOnOverlayClick = true,
  modalStyle = {},
  overlayStyle = {},
  buttonStyle = {},
  buttonClassName = '',
  ...yoomoneyProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      handleClose();
    }
  };

  const defaultOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    ...overlayStyle
  };

  const defaultModalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '440px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    ...modalStyle
  };

  const defaultButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: '#702ff4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: "'Factor IO', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ...buttonStyle
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#666',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 20px 0',
    width: '100%'
  };

  return (
    <>
      <style>{fontStyles}</style>
      <button
        className={`yoomoney-modal-button ${buttonClassName}`}
        onClick={handleOpen}
        style={defaultButtonStyle}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div
          className="yoomoney-modal-overlay"
          style={defaultOverlayStyle}
          onClick={handleOverlayClick}
        >
          <div className="yoomoney-modal-content" style={defaultModalStyle}>
            <button
              className="yoomoney-modal-close"
              onClick={handleClose}
              style={closeButtonStyle}
              aria-label="Закрыть"
            >
              ×
            </button>
            
            {modalTitle && <h3 style={titleStyle}>{modalTitle}</h3>}
            
            <Yoomoney
              {...yoomoneyProps}
              logoAlign="left"
              formStyle={{
                maxWidth: '100%',
                backgroundColor: 'transparent',
                padding: '0',
                boxShadow: 'none',
                ...yoomoneyProps.formStyle
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};