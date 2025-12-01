import React, { useEffect } from 'react';
import { Yoomoney } from './Yoomoney';
import { YoomoneyPanelProps } from './types';
import { fontStyles } from './fontStyles';

export const YoomoneyPanel: React.FC<YoomoneyPanelProps> = ({
  isOpen = false,
  panelTitle = 'Оплата',
  onClose,
  closeOnOverlayClick = true,
  panelStyle = {},
  overlayStyle = {},
  showCloseButton = true,
  ...yoomoneyProps
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose?.();
    }
  };

  const defaultOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    transition: 'opacity 0.3s ease',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    ...overlayStyle
  };

  const defaultPanelStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    width: '400px',
    maxWidth: '90%',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden', // Убираем горизонтальный скролл
    padding: '24px',
    boxSizing: 'border-box',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    ...panelStyle
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
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
    transition: 'background-color 0.2s',
    zIndex: 2
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 24px 0',
    paddingRight: showCloseButton ? '40px' : '0',
    width: '100%',
    boxSizing: 'border-box'
  };

  const formContainerStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  };

  return (
    <>
      <style>{fontStyles}</style>
      <div
        className="yoomoney-panel-overlay"
        style={defaultOverlayStyle}
        onClick={handleOverlayClick}
      >
        <div className="yoomoney-panel-content" style={defaultPanelStyle}>
          {showCloseButton && (
            <button
              className="yoomoney-panel-close"
              onClick={onClose}
              style={closeButtonStyle}
              aria-label="Закрыть"
            >
              ×
            </button>
          )}
          
          {panelTitle && <h2 style={titleStyle}>{panelTitle}</h2>}
          
          <div style={formContainerStyle}>
            <Yoomoney
              {...yoomoneyProps}
              logoAlign="left"
              formStyle={{
                maxWidth: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                padding: '0',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
                ...yoomoneyProps.formStyle
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};