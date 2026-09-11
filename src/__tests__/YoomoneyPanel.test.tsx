import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { YoomoneyPanel } from '../components/YoomoneyPanel';

describe('YoomoneyPanel', () => {
  it('рендерит оверлей с модификатором --closed при isOpen=false', () => {
    render(<YoomoneyPanel receiver="x" isOpen={false} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('yw-overlay--closed');
  });

  it('рендерит открытую панель с классом --open при isOpen=true', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveClass('yw-overlay--closed');

    const panel = dialog.querySelector('.yw-panel');
    expect(panel).not.toBeNull();
    expect(panel).toHaveClass('yw-panel--open');
  });

  it('имеет role=dialog и aria-modal', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('рендерит заголовок панели', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} panelTitle="Оплата заказа" />);
    expect(screen.getByText('Оплата заказа')).toBeInTheDocument();
  });

  it('скрывает заголовок при пустом panelTitle', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} panelTitle="" />);
    expect(screen.queryByText('Оплата')).not.toBeInTheDocument();
  });

  it('вызывает onClose по Escape, когда панель открыта', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyPanel receiver="x" isOpen={true} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClose по Escape при isOpen=false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyPanel receiver="x" isOpen={false} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('не вызывает onClose по Escape при closeOnEscape=false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyPanel receiver="x" isOpen={true} closeOnEscape={false} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('вызывает onClose по клику на кнопку закрытия', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyPanel receiver="x" isOpen={true} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('скрывает кнопку закрытия при showCloseButton=false', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} showCloseButton={false} />);
    expect(screen.queryByRole('button', { name: 'Закрыть' })).not.toBeInTheDocument();
  });

  it('рендерится в portal при isOpen=true', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} />);
    const portals = document.querySelectorAll('[data-yw-portal]');
    expect(portals.length).toBeGreaterThan(0);
  });

  it('блокирует скролл body при открытии', () => {
    render(<YoomoneyPanel receiver="x" isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });
});
