import { describe, expect, test } from 'vitest';
import {
  getToastStackLayout,
  TOAST_STACK_GAP,
  TOAST_STACK_PEEK,
} from './toastStack';

describe('getToastStackLayout', () => {
  test('stacks open toasts newest first', () => {
    const layout = getToastStackLayout(
      [{ id: 'c' }, { id: 'b' }, { id: 'a' }],
      {
        a: 40,
        b: 60,
        c: 80,
      }
    );

    expect(layout.positions).toEqual({
      c: { index: 0, expandedOffset: 0, frontHeight: 80 },
      b: { index: 1, expandedOffset: 80 + TOAST_STACK_GAP, frontHeight: 80 },
      a: {
        index: 2,
        expandedOffset: 80 + 60 + 2 * TOAST_STACK_GAP,
        frontHeight: 80,
      },
    });
    expect(layout.collapsedHeight).toBe(80 + 2 * TOAST_STACK_PEEK);
    expect(layout.expandedHeight).toBe(80 + 60 + 40 + 2 * TOAST_STACK_GAP);
  });

  test('gives no room to closed toasts', () => {
    const layout = getToastStackLayout(
      [{ id: 'b', open: false }, { id: 'a' }],
      { a: 40, b: 60 }
    );

    expect(layout.positions.b).toEqual({
      index: 0,
      expandedOffset: 0,
      frontHeight: 40,
    });
    expect(layout.positions.a?.index).toBe(0);
    expect(layout.collapsedHeight).toBe(40);
    expect(layout.expandedHeight).toBe(40);
  });

  test('leaves toasts past the visible count out of the height', () => {
    const layout = getToastStackLayout(
      [{ id: 'd' }, { id: 'c' }, { id: 'b' }, { id: 'a' }],
      { a: 10, b: 10, c: 10, d: 10 }
    );

    expect(layout.positions.a?.index).toBe(3);
    expect(layout.collapsedHeight).toBe(10 + 2 * TOAST_STACK_PEEK);
    expect(layout.expandedHeight).toBe(30 + 2 * TOAST_STACK_GAP);
  });

  test('is empty without open toasts', () => {
    const layout = getToastStackLayout([{ id: 'a', open: false }], { a: 40 });

    expect(layout.collapsedHeight).toBe(0);
    expect(layout.expandedHeight).toBe(0);
  });
});
