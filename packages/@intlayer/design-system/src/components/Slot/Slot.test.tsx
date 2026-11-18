import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Slot } from './Slot';

describe('Slot', () => {
  test('merges props into its child, the child winning on conflicts', () => {
    render(
      <Slot id="slot-id" aria-label="from slot" className="slot">
        <button type="button" aria-label="from child" className="child">
          Press
        </button>
      </Slot>
    );

    const button = screen.getByRole('button');

    expect(button.id).toBe('slot-id');
    expect(button.getAttribute('aria-label')).toBe('from child');
    expect(button.className).toBe('slot child');
  });

  test('runs both event handlers, child first', () => {
    const calls: string[] = [];

    render(
      <Slot onClick={() => calls.push('slot')}>
        <button type="button" onClick={() => calls.push('child')}>
          Press
        </button>
      </Slot>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(calls).toEqual(['child', 'slot']);
  });

  test('forwards both refs to the child element', () => {
    const slotRef = createRef<HTMLElement>();
    const childRef = vi.fn();

    render(
      <Slot ref={slotRef}>
        <input ref={childRef} />
      </Slot>
    );

    expect(slotRef.current?.tagName).toBe('INPUT');
    expect(childRef).toHaveBeenCalledWith(slotRef.current);
  });
});
