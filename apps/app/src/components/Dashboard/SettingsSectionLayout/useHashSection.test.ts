// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useHashSection } from './useHashSection';

const SECTION_IDS = ['general', 'members', 'danger-zone'] as const;

describe('useHashSection', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('defaults to the first section without a hash', () => {
    const { result } = renderHook(() => useHashSection(SECTION_IDS));

    expect(result.current[0]).toBe('general');
  });

  it('reads a valid section from the hash', () => {
    window.history.replaceState(null, '', '/#members');

    const { result } = renderHook(() => useHashSection(SECTION_IDS));

    expect(result.current[0]).toBe('members');
  });

  it('falls back to the first section for an unknown hash', () => {
    window.history.replaceState(null, '', '/#unknown');

    const { result } = renderHook(() => useHashSection(SECTION_IDS));

    expect(result.current[0]).toBe('general');
  });

  it('writes the hash without pushing a history entry', () => {
    const { result } = renderHook(() => useHashSection(SECTION_IDS));
    const historyLength = window.history.length;

    act(() => result.current[1]('danger-zone'));

    expect(result.current[0]).toBe('danger-zone');
    expect(window.location.hash).toBe('#danger-zone');
    expect(window.history.length).toBe(historyLength);
  });
});
