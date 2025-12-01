export interface YoomoneyProps {
  receiver: string;
  label?: string;
  successURL?: string;
  defaultSum?: number;
  minSum?: number;
  className?: string;
  logo?: 'black' | 'white';
  logoAlign?: 'left' | 'center' | 'right';
  formStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

export interface YoomoneyModalProps extends YoomoneyProps {
  buttonText?: string;
  modalTitle?: string;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  modalStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  buttonClassName?: string;
}

export interface YoomoneyPanelProps extends YoomoneyProps {
  isOpen?: boolean;
  panelTitle?: string;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  panelStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  showCloseButton?: boolean;
}