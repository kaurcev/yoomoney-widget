import React, { useRef, FormEvent } from 'react';
import { YoomoneyProps } from './types';
import logoWhite from './img/iomoney_white.svg';
import logoBlack from './img/iomoney_black.svg';
import { fontStyles } from './fontStyles';

export const Yoomoney: React.FC<YoomoneyProps> = ({
  receiver,
  label = '',
  successURL = '',
  defaultSum = 50,
  minSum = 10,
  className = '',
  logo = 'black',
  logoAlign = 'center',
  formStyle = {},
  inputStyle = {},
  buttonStyle = {}
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const baseFormStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '20px',
    maxWidth: '400px',
    borderRadius: '28px',
    boxShadow: '0 0 10px 0 #91aeff4f',
    boxSizing: 'border-box',
    fontFamily: "'Factor IO', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    width: '100%',
    ...formStyle
  };

  const baseInputStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '2px solid transparent',
    background: '#f2f4f8',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '16px',
    maxWidth: '100%',
    ...inputStyle
  };

  const baseButtonStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '2px solid transparent',
    background: '#702ff4',
    color: '#fff',
    borderRadius: '500px',
    width: '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '16px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    ...buttonStyle
  };

  const logoContainerStyle: React.CSSProperties = {
    textAlign: logoAlign as 'left' | 'center' | 'right',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: '1 1 auto',
    minWidth: 0,
    boxSizing: 'border-box'
  };

  const duoContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formRef.current) return;

    const createHiddenField = (name: string, value: string) => {
      const field = document.createElement('input');
      field.type = 'hidden';
      field.name = name;
      field.value = value;
      formRef.current?.appendChild(field);
    };

    createHiddenField('receiver', receiver);
    createHiddenField('quickpay-form', 'button');

    if (label) {
      createHiddenField('label', label);
    }

    if (successURL) {
      createHiddenField('successURL', successURL);
    }

    formRef.current.submit();
  };

  const logoSrc = logo === 'white' ? logoWhite : logoBlack;

  return (
    <>
      <style>{fontStyles}</style>
      <form
        ref={formRef}
        className={`yoomoney-widget pay ${className}`}
        method="POST"
        action="https://yoomoney.ru/quickpay/confirm"
        onSubmit={handleSubmit}
        style={baseFormStyle}
      >
        <div className="yoomoney-logo" style={logoContainerStyle}>
          <img 
            src={logoSrc} 
            alt="YooMoney" 
            width={120}
            height={40}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <p className="mini" style={{ 
          margin: '0 0 12px 0', 
          fontSize: '14px', 
          color: '#666',
          fontWeight: 400,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          Сумма пополнения (От {minSum}₽)
        </p>
        
        <input
          type="number"
          name="sum"
          required
          min={minSum}
          defaultValue={defaultSum}
          data-type="number"
          style={baseInputStyle}
        />
        
        <h4 style={{ 
          margin: '20px 0 12px 0', 
          fontSize: '16px',
          fontWeight: 500,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          Способ пополнения
        </h4>
        
        <div className="duo" style={duoContainerStyle}>
          <label style={labelStyle}>
            <input 
              type="radio" 
              name="paymentType" 
              value="PC" 
              defaultChecked 
            />
            ЮMoney
          </label>
          <label style={labelStyle}>
            <input type="radio" name="paymentType" value="AC" />
            Банковская карта
          </label>
        </div>
        
        <button type="submit" style={baseButtonStyle}>
          Пополнить
        </button>
      </form>
    </>
  );
};