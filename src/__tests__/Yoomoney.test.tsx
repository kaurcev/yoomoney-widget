import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Yoomoney } from '../components/Yoomoney';

describe('Yoomoney', () => {
  beforeEach(() => {
    vi.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('рендерит значения по умолчанию', () => {
    render(<Yoomoney receiver="4100111111111111" />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.min).toBe('10');
    expect(input.value).toBe('50');
  });

  it('применяет кастомные minSum и defaultSum', () => {
    render(<Yoomoney receiver="x" minSum={100} defaultSum={500} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.min).toBe('100');
    expect(input.value).toBe('500');
  });

  it('показывает стандартный текст про сумму', () => {
    render(<Yoomoney receiver="x" minSum={25} />);
    expect(screen.getByText('Сумма пополнения (От 25₽)')).toBeInTheDocument();
  });

  it('показывает кастомный текст про сумму', () => {
    render(<Yoomoney receiver="x" sumLabel="Введите сумму" />);
    expect(screen.getByText('Введите сумму')).toBeInTheDocument();
  });

  it('рендерит методы оплаты по умолчанию', () => {
    render(<Yoomoney receiver="x" />);
    expect(screen.getByText('ЮMoney')).toBeInTheDocument();
    expect(screen.getByText('Банковская карта')).toBeInTheDocument();
  });

  it('рендерит кастомные методы оплаты', () => {
    render(
      <Yoomoney
        receiver="x"
        paymentMethods={[
          { value: 'AC', label: 'Карта', defaultChecked: true },
          { value: 'PC', label: 'Кошелёк' },
        ]}
      />,
    );
    expect(screen.getByText('Карта')).toBeInTheDocument();
    expect(screen.getByText('Кошелёк')).toBeInTheDocument();
    expect(screen.queryByText('ЮMoney')).not.toBeInTheDocument();
  });

  it('скрывает заголовок методов при methodTitle=null', () => {
    render(<Yoomoney receiver="x" methodTitle={null} />);
    expect(screen.queryByText('Способ пополнения')).not.toBeInTheDocument();
  });

  it('рендерит кнопку с кастомным текстом', () => {
    render(<Yoomoney receiver="x" submitText="Оплатить заказ" />);
    expect(screen.getByRole('button', { name: 'Оплатить заказ' })).toBeInTheDocument();
  });

  it('применяет classNames ко всем слотам', () => {
    render(
      <Yoomoney
        receiver="x"
        classNames={{
          form: 'my-form',
          logo: 'my-logo',
          input: 'my-input',
          submit: 'my-submit',
          label: 'my-label',
        }}
      />,
    );
    expect(document.querySelector('.my-form')).toBeInTheDocument();
    expect(document.querySelector('.my-logo')).toBeInTheDocument();
    expect(document.querySelector('.my-input')).toBeInTheDocument();
    expect(document.querySelector('.my-submit')).toBeInTheDocument();
    expect(document.querySelector('.my-label')).toBeInTheDocument();
  });

  it('добавляет скрытые поля при отправке формы', () => {
    const { container } = render(
      <Yoomoney
        receiver="4100111111111111"
        label="test-label"
        successURL="https://example.com/success"
      />,
    );
    const form = container.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    const fields = Array.from(form.querySelectorAll('input[type="hidden"]'));
    const map: Record<string, string> = {};
    fields.forEach((f) => {
      map[(f as HTMLInputElement).name] = (f as HTMLInputElement).value;
    });

    expect(map.receiver).toBe('4100111111111111');
    expect(map['quickpay-form']).toBe('button');
    expect(map.label).toBe('test-label');
    expect(map.successURL).toBe('https://example.com/success');
  });

  it('не добавляет скрытые поля label/successURL, если они пустые', () => {
    const { container } = render(<Yoomoney receiver="x" />);
    const form = container.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    const names = Array.from(form.querySelectorAll('input[type="hidden"]')).map(
      (f) => (f as HTMLInputElement).name,
    );
    expect(names).toContain('receiver');
    expect(names).toContain('quickpay-form');
    expect(names).not.toContain('label');
    expect(names).not.toContain('successURL');
  });

  it('вызывает form.submit() после добавления скрытых полей', () => {
    const { container } = render(<Yoomoney receiver="x" />);
    const form = container.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);
    expect(HTMLFormElement.prototype.submit).toHaveBeenCalledTimes(1);
  });

  it('использует кастомный renderLogo', () => {
    render(
      <Yoomoney receiver="x" renderLogo={() => <span data-testid="custom-logo">Logo</span>} />,
    );
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
  });

  it('использует стандартный img для лого', () => {
    render(<Yoomoney receiver="x" />);
    const img = screen.getByAltText('YooMoney') as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
  });
});
