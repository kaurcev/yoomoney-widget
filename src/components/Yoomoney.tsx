import { useRef, type FormEvent } from 'react';
import logoBlack from '../img/iomoney_black.svg';
import logoWhite from '../img/iomoney_white.svg';
import { cx } from '../utils/cx';
import type { PaymentMethod, YoomoneyBaseProps } from '../types';

const DEFAULT_METHODS: PaymentMethod[] = [
  { value: 'PC', label: 'ЮMoney', defaultChecked: true },
  { value: 'AC', label: 'Банковская карта' },
];

export const Yoomoney: React.FC<YoomoneyBaseProps> = ({
  receiver,
  label = '',
  successURL = '',
  defaultSum = 50,
  minSum = 10,
  logo = 'black',
  logoAlign = 'center',
  className,
  classNames = {},
  sumLabel,
  methodTitle = 'Способ пополнения',
  submitText = 'Пополнить',
  paymentMethods = DEFAULT_METHODS,
  renderLogo,
  formStyle,
  inputStyle,
  buttonStyle,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const add = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    add('receiver', receiver);
    add('quickpay-form', 'button');
    if (label) add('label', label);
    if (successURL) add('successURL', successURL);

    form.submit();
  };

  const src = logo === 'white' ? logoWhite : logoBlack;

  return (
    <form
      ref={formRef}
      method="POST"
      action="https://yoomoney.ru/quickpay/confirm"
      onSubmit={handleSubmit}
      className={cx('yw-form', className, classNames.form)}
      style={formStyle}
    >
      <div className={cx('yw-form__logo', `yw-form__logo--${logoAlign}`, classNames.logo)}>
        {renderLogo ? (
          renderLogo(src, 'YooMoney')
        ) : (
          <img src={src} alt="YooMoney" width={120} height={40} />
        )}
      </div>

      <label className={cx('yw-form__label', classNames.label)}>
        {sumLabel ?? `Сумма пополнения (От ${minSum}₽)`}
      </label>

      <input
        type="number"
        name="sum"
        required
        min={minSum}
        defaultValue={defaultSum}
        className={cx('yw-form__input', classNames.input)}
        style={inputStyle}
      />

      {methodTitle && (
        <h4 className={cx('yw-form__section-title', classNames.sectionTitle)}>{methodTitle}</h4>
      )}

      <div className={cx('yw-form__radios', classNames.radios)}>
        {paymentMethods.map((m) => (
          <label key={m.value} className={cx('yw-form__radio', classNames.radio)}>
            <input
              type="radio"
              name="paymentType"
              value={m.value}
              defaultChecked={m.defaultChecked}
            />
            {m.label}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className={cx('yw-form__submit', classNames.submit)}
        style={buttonStyle}
      >
        {submitText}
      </button>
    </form>
  );
};
