import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

type HarnessProps = {
  onOpenChange: (open: boolean) => void;
  duration?: number;
};

const Harness = ({ onOpenChange, duration }: HarnessProps) => (
  <ToastProvider duration={duration}>
    <Toast onOpenChange={onOpenChange}>
      <ToastTitle>Saved</ToastTitle>
      <ToastAction>Undo</ToastAction>
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
);

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('closes itself after its duration', () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} duration={1000} />);

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(onOpenChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('pauses its timer while the viewport is hovered', () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <ToastProvider duration={1000}>
        <ToastViewport>
          <Toast onOpenChange={onOpenChange}>
            <ToastTitle>Saved</ToastTitle>
          </Toast>
        </ToastViewport>
      </ToastProvider>
    );
    const viewport = container.querySelector('ol') as HTMLOListElement;

    act(() => {
      vi.advanceTimersByTime(600);
    });
    fireEvent.pointerEnter(viewport);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.pointerLeave(viewport);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('closes from the close button, the action and Escape', () => {
    const onOpenChange = vi.fn();
    const { unmount } = render(
      <Harness onOpenChange={onOpenChange} duration={Infinity} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    unmount();

    const onActionOpenChange = vi.fn();
    const action = render(
      <Harness onOpenChange={onActionOpenChange} duration={Infinity} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onActionOpenChange).toHaveBeenLastCalledWith(false);
    action.unmount();

    const onEscapeOpenChange = vi.fn();
    render(<Harness onOpenChange={onEscapeOpenChange} duration={Infinity} />);
    fireEvent.keyDown(screen.getByRole('listitem'), { key: 'Escape' });
    expect(onEscapeOpenChange).toHaveBeenLastCalledWith(false);
  });
});
