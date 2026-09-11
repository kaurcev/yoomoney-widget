import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { useFocusTrap } from '../hooks/useFocusTrap';

const Trap = ({ initiallyOpen = false }: { initiallyOpen?: boolean }) => {
  const [open, setOpen] = useState(initiallyOpen);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open);

  return (
    <div>
      <button onClick={() => setOpen(true)}>открыть</button>
      {open && (
        <div ref={ref} data-testid="trap">
          <button>первый</button>
          <button>средний</button>
          <button>предпоследний</button>
          <button onClick={() => setOpen(false)}>последний</button>
        </div>
      )}
    </div>
  );
};

describe('useFocusTrap', () => {
  it('фокусирует первый элемент при открытии', async () => {
    const user = userEvent.setup();
    render(<Trap />);

    await user.click(screen.getByText('открыть'));

    await waitFor(() => {
      expect(screen.getByText('первый')).toHaveFocus();
    });
  });

  it('переходит с последнего элемента на первый по Tab', async () => {
    const user = userEvent.setup();
    render(<Trap initiallyOpen />);

    await waitFor(() => {
      expect(screen.getByText('первый')).toHaveFocus();
    });

    // Фокусируем настоящий последний focusable-элемент (не по тексту, а по позиции)
    screen.getByText('последний').focus();
    await user.keyboard('{Tab}');

    expect(screen.getByText('первый')).toHaveFocus();
  });

  it('переходит с первого элемента на последний по Shift+Tab', async () => {
    const user = userEvent.setup();
    render(<Trap initiallyOpen />);

    await waitFor(() => {
      expect(screen.getByText('первый')).toHaveFocus();
    });

    await user.keyboard('{Shift>}{Tab}{/Shift}');

    expect(screen.getByText('последний')).toHaveFocus();
  });

  it('возвращает фокус на кнопку открытия после закрытия', async () => {
    const user = userEvent.setup();
    render(<Trap />);

    const trigger = screen.getByText('открыть');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('первый')).toHaveFocus();
    });

    await user.click(screen.getByText('последний'));

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('ничего не делает, когда неактивен', () => {
    render(<Trap />);
    expect(screen.queryByTestId('trap')).not.toBeInTheDocument();
  });
});
