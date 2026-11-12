import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HeightResizer } from './index';

afterEach(() => {
  for (const iframe of Array.from(document.querySelectorAll('iframe'))) {
    iframe.remove();
  }
});

describe('HeightResizer', () => {
  it('disables pointer events on iframes while dragging and restores them on release', () => {
    // Same iframe-swallows-pointer-events issue as WithResizer (#524).
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    render(
      <HeightResizer initialHeight={200}>
        <div>content</div>
      </HeightResizer>
    );

    fireEvent.mouseDown(screen.getByRole('slider'), { clientY: 100 });
    expect(iframe.style.pointerEvents).toBe('none');

    fireEvent.mouseUp(window);
    expect(iframe.style.pointerEvents).toBe('');
  });

  it('restores iframe pointer events when unmounted mid-drag', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const { unmount } = render(
      <HeightResizer initialHeight={200}>
        <div>content</div>
      </HeightResizer>
    );

    fireEvent.mouseDown(screen.getByRole('slider'), { clientY: 100 });
    expect(iframe.style.pointerEvents).toBe('none');

    unmount();
    expect(iframe.style.pointerEvents).toBe('');
  });
});
