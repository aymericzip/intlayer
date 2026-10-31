import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { WithResizer } from './index';

const getHandle = (container: HTMLElement): HTMLElement => {
  const slider = container.querySelector('[role="slider"]');
  if (!slider?.lastElementChild) throw new Error('resize handle not found');
  return slider.lastElementChild as HTMLElement;
};

afterEach(() => {
  for (const iframe of Array.from(document.querySelectorAll('iframe'))) {
    iframe.remove();
  }
});

describe('WithResizer', () => {
  it('disables pointer events on iframes while dragging and restores them on release', () => {
    // Iframes swallow pointer events once the cursor crosses them, which used
    // to freeze the drag and lose the release over the iframe (#524).
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const styledIframe = document.createElement('iframe');
    styledIframe.style.pointerEvents = 'auto';
    document.body.appendChild(styledIframe);

    const { container } = render(
      <WithResizer initialWidth={300}>
        <div>panel</div>
      </WithResizer>
    );

    fireEvent.mouseDown(getHandle(container), { clientX: 300 });

    expect(iframe.style.pointerEvents).toBe('none');
    expect(styledIframe.style.pointerEvents).toBe('none');

    fireEvent.mouseUp(window);

    expect(iframe.style.pointerEvents).toBe('');
    expect(styledIframe.style.pointerEvents).toBe('auto');
  });

  it('restores iframe pointer events when unmounted mid-drag', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const { container, unmount } = render(
      <WithResizer initialWidth={300}>
        <div>panel</div>
      </WithResizer>
    );

    fireEvent.mouseDown(getHandle(container), { clientX: 300 });
    expect(iframe.style.pointerEvents).toBe('none');

    unmount();
    expect(iframe.style.pointerEvents).toBe('');
  });
});
