import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { YoomoneyModal } from '../components/YoomoneyModal';

const openModal = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /Оплатить/i }));
};

describe('YoomoneyModal', () => {
  it('рендерит кнопку открытия со стандартным текстом', () => {
    render(<YoomoneyModal receiver="x" />);
    expect(screen.getByRole('button', { name: 'Оплатить' })).toBeInTheDocument();
  });

  it('открывает диалог по клику на кнопку', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" />);
    await openModal(user);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('рендерит заголовок модалки', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" modalTitle="Оплата заказа" />);
    await openModal(user);
    expect(screen.getByText('Оплата заказа')).toBeInTheDocument();
  });

  it('вызывает onOpen при открытии', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<YoomoneyModal receiver="x" onOpen={onOpen} />);
    await openModal(user);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('закрывается по Escape и вызывает onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyModal receiver="x" onClose={onClose} />);
    await openModal(user);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('не закрывается по Escape при closeOnEscape=false', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" closeOnEscape={false} />);
    await openModal(user);
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('закрывается по клику на оверлей', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyModal receiver="x" onClose={onClose} />);
    await openModal(user);

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);

    expect(onClose).toHaveBeenCalled();
  });

  it('не закрывается по клику на оверлей при closeOnOverlayClick=false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyModal receiver="x" closeOnOverlayClick={false} onClose={onClose} />);
    await openModal(user);

    await user.click(screen.getByRole('dialog'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('закрывается по клику на кнопку закрытия', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<YoomoneyModal receiver="x" onClose={onClose} />);
    await openModal(user);

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));

    expect(onClose).toHaveBeenCalled();
  });

  it('скрывает кнопку закрытия при showCloseButton=false', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" showCloseButton={false} />);
    await openModal(user);
    expect(screen.queryByRole('button', { name: 'Закрыть' })).not.toBeInTheDocument();
  });

  it('рендерится в portal, привязанный к body', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" />);
    await openModal(user);

    const portals = document.querySelectorAll('[data-yw-portal]');
    expect(portals.length).toBeGreaterThan(0);
  });

  it('блокирует скролл body при открытии', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" />);
    await openModal(user);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('удерживает фокус внутри диалога при открытии', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" />);

    const trigger = screen.getByRole('button', { name: 'Оплатить' });
    await user.click(trigger);

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  it('возвращает фокус на кнопку открытия после закрытия', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" />);

    const trigger = screen.getByRole('button', { name: 'Оплатить' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('не удерживает фокус при trapFocus=false', async () => {
    const user = userEvent.setup();
    render(<YoomoneyModal receiver="x" trapFocus={false} />);

    const trigger = screen.getByRole('button', { name: 'Оплатить' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(false);
  });
});
