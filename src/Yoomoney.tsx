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
  formStyle = {},
  inputStyle = {},
  buttonStyle = {}
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const baseFormStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '28px',
    boxShadow: '0 0 10px 0 #91aeff4f',
    boxSizing: 'border-box',
    fontFamily: "'Factor IO', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ...formStyle
  };

  const baseInputStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: '2px solid transparent',
    background: '#f2f4f8',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '16px',
    ...inputStyle
  };

  const baseButtonStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: '2px solid transparent',
    background: '#702ff4',
    color: '#fff',
    borderRadius: '500px',
    width: '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '16px',
    ...buttonStyle
  };

  const logoContainerStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: '15px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const duoContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    justifyContent: 'space-between'
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
          />
        </div>

        <p className="mini" style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          color: '#666',
          fontWeight: 400 
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
          margin: '15px 0 10px 0', 
          fontSize: '16px',
          fontWeight: 500 
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