import type { CSSProperties, ReactNode } from 'react';

export type LogoAlign = 'left' | 'center' | 'right';
export type LogoVariant = 'black' | 'white';

export interface PaymentMethod {
  value: string;
  label: string;
  defaultChecked?: boolean;
}

/** Классы-слоты для базовой формы */
export interface YoomoneyClassNames {
  form?: string;
  logo?: string;
  label?: string;
  input?: string;
  sectionTitle?: string;
  radios?: string;
  radio?: string;
  submit?: string;
}

export interface YoomoneyBaseProps {
  receiver: string;
  label?: string;
  successURL?: string;
  defaultSum?: number;
  minSum?: number;
  logo?: LogoVariant;
  logoAlign?: LogoAlign;

  // Кастомизация разметки
  className?: string;
  classNames?: YoomoneyClassNames;

  // Тексты (чтобы не хардкодить в JS)
  sumLabel?: string;
  methodTitle?: string | null;
  submitText?: string;
  paymentMethods?: PaymentMethod[];

  // Кастомный рендер лого
  renderLogo?: (src: string, alt: string) => ReactNode;

  // Escape hatches (без дефолтов)
  formStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
}

export interface YoomoneyModalClassNames extends YoomoneyClassNames {
  trigger?: string;
  overlay?: string;
  modal?: string;
  title?: string;
  close?: string;
}

export interface YoomoneyModalProps extends Omit<YoomoneyBaseProps, 'classNames'> {
  classNames?: YoomoneyModalClassNames;

  buttonText?: string;
  modalTitle?: string;
  onOpen?: () => void;
  onClose?: () => void;

  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  usePortal?: boolean;
  showCloseButton?: boolean;
  trapFocus?: boolean;

  overlayStyle?: CSSProperties;
  modalStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  buttonClassName?: string;
}

export interface YoomoneyPanelClassNames extends YoomoneyClassNames {
  overlay?: string;
  panel?: string;
  title?: string;
  close?: string;
  body?: string;
}

export interface YoomoneyPanelProps extends Omit<YoomoneyBaseProps, 'classNames'> {
  classNames?: YoomoneyPanelClassNames;

  isOpen?: boolean;
  panelTitle?: string;
  onClose?: () => void;

  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  usePortal?: boolean;
  showCloseButton?: boolean;
  trapFocus?: boolean;

  overlayStyle?: CSSProperties;
  panelStyle?: CSSProperties;
}
