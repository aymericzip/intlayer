import { act, renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { useIframePointerEventsShield } from './useIframePointerEventsShield';

afterEach(() => {
  for (const iframe of Array.from(document.querySelectorAll('iframe'))) {
    iframe.remove();
  }
});

describe('useIframePointerEventsShield', () => {
  it('restores original pointer-events when disable is called twice on the same instance followed by one restore', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = 'auto';
    document.body.appendChild(iframe);

    const { result } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      result.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // Duplicate call on the same instance should be ignored
    act(() => {
      result.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // A single restore should release the claim and restore the style
    act(() => {
      result.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');
  });

  it('handles unstarted restore and repeated restore safely without affecting styles or other instances', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = 'auto';
    document.body.appendChild(iframe);

    const { result: hookA } = renderHook(() => useIframePointerEventsShield());
    const { result: hookB } = renderHook(() => useIframePointerEventsShield());

    // 1. Unstarted restore on hookA
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');

    // 2. hookB disables pointer events
    act(() => {
      hookB.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // 3. Unstarted restore on hookA while hookB is active should not disturb hookB
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // 4. hookB restores
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');

    // 5. Repeated restore on hookB is a safe no-op
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');
  });

  it('keeps iframe shielded when A and B disable and A restores first, asserting intermediate state', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = '';
    document.body.appendChild(iframe);

    const { result: hookA } = renderHook(() => useIframePointerEventsShield());
    const { result: hookB } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      hookA.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    act(() => {
      hookB.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // A restores first
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    // Intermediate assertion: B is still holding the shield claim!
    expect(iframe.style.pointerEvents).toBe('none');

    // B restores
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('');
  });

  it('keeps iframe shielded when A and B disable and B restores first (independent of release order)', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = 'visible';
    document.body.appendChild(iframe);

    const { result: hookA } = renderHook(() => useIframePointerEventsShield());
    const { result: hookB } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      hookA.current.disableIframePointerEvents();
    });
    act(() => {
      hookB.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // B restores first
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    // Intermediate assertion: A is still holding the shield claim!
    expect(iframe.style.pointerEvents).toBe('none');

    // A restores
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('visible');
  });

  it('does not overwrite original value or restore prematurely when A releases and re-acquires while B still holds', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = 'auto';
    document.body.appendChild(iframe);

    const { result: hookA } = renderHook(() => useIframePointerEventsShield());
    const { result: hookB } = renderHook(() => useIframePointerEventsShield());

    // A and B both acquire
    act(() => {
      hookA.current.disableIframePointerEvents();
    });
    act(() => {
      hookB.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // A releases; B still holds
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // A re-acquires while B still holds (at this moment, iframe style is 'none')
    act(() => {
      hookA.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // B releases; A still holds (intermediate assertion)
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // A releases; should restore the original value ('auto'), NOT 'none'
    act(() => {
      hookA.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');
  });

  it('keeps shield active when A unmounts while B is active, and restores when B ends', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = '';
    document.body.appendChild(iframe);

    // A hook wrapper that cleans up on unmount
    const { result: hookA, unmount: unmountA } = renderHook(() => {
      const shield = useIframePointerEventsShield();
      useEffect(() => {
        return () => shield.restoreIframePointerEvents();
      }, [shield.restoreIframePointerEvents]);
      return shield;
    });

    const { result: hookB } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      hookA.current.disableIframePointerEvents();
    });
    act(() => {
      hookB.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // Unmount A
    unmountA();
    // Intermediate assertion: B is still active, so iframe must stay shielded
    expect(iframe.style.pointerEvents).toBe('none');

    // B ends
    act(() => {
      hookB.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('');
  });

  it('accurately restores different initial pointer-events values ("", "auto", "none")', () => {
    const iframeEmpty = document.createElement('iframe');
    const iframeAuto = document.createElement('iframe');
    iframeAuto.style.pointerEvents = 'auto';
    const iframeNone = document.createElement('iframe');
    iframeNone.style.pointerEvents = 'none';

    document.body.appendChild(iframeEmpty);
    document.body.appendChild(iframeAuto);
    document.body.appendChild(iframeNone);

    const { result } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      result.current.disableIframePointerEvents();
    });

    expect(iframeEmpty.style.pointerEvents).toBe('none');
    expect(iframeAuto.style.pointerEvents).toBe('none');
    expect(iframeNone.style.pointerEvents).toBe('none');

    act(() => {
      result.current.restoreIframePointerEvents();
    });

    expect(iframeEmpty.style.pointerEvents).toBe('');
    expect(iframeAuto.style.pointerEvents).toBe('auto');
    expect(iframeNone.style.pointerEvents).toBe('none');
  });

  it('captures updated external styles when starting a new drag round after a complete restore', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const { result } = renderHook(() => useIframePointerEventsShield());

    // Round 1
    act(() => {
      result.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');
    act(() => {
      result.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('');

    // External modification between rounds
    iframe.style.pointerEvents = 'auto';

    // Round 2
    act(() => {
      result.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');
    act(() => {
      result.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');
  });

  it('handles iframe removal from DOM during shield cleanly without leaving stale state', () => {
    const iframe = document.createElement('iframe');
    iframe.style.pointerEvents = 'auto';
    document.body.appendChild(iframe);

    const { result } = renderHook(() => useIframePointerEventsShield());

    act(() => {
      result.current.disableIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('none');

    // Iframe is detached from DOM mid-interaction
    iframe.remove();
    expect(document.querySelector('iframe')).toBeNull();

    // Restore should still process the captured iframe and reset its style
    act(() => {
      result.current.restoreIframePointerEvents();
    });
    expect(iframe.style.pointerEvents).toBe('auto');

    // Safe to start another interaction afterwards
    act(() => {
      result.current.disableIframePointerEvents();
    });
    act(() => {
      result.current.restoreIframePointerEvents();
    });
  });

  it('handles drag interactions gracefully when no iframes exist in the document', () => {
    const { result } = renderHook(() => useIframePointerEventsShield());

    expect(() => {
      act(() => {
        result.current.disableIframePointerEvents();
        result.current.disableIframePointerEvents(); // duplicate call
        result.current.restoreIframePointerEvents();
        result.current.restoreIframePointerEvents(); // duplicate restore
      });
    }).not.toThrow();
  });
});
