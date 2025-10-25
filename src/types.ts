export interface YoomoneyProps {
  receiver: string;
  label?: string;
  successURL?: string;
  defaultSum?: number;
  minSum?: number;
  className?: string;
  logo?: 'black' | 'white';
  formStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}