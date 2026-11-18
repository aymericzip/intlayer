import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { getCommandScore } from '../components/Command/getCommandScore';
import { composeRefs } from './composeRefs';
import { getTypeaheadMatch } from './getTypeaheadMatch';

describe('composeRefs', () => {
  test('assigns object and callback refs, then clears them', () => {
    const objectRef = createRef<HTMLDivElement>();
    const callbackRef = vi.fn();
    const element = document.createElement('div');

    const cleanup = composeRefs(objectRef, callbackRef, undefined)(element);

    expect(objectRef.current).toBe(element);
    expect(callbackRef).toHaveBeenCalledWith(element);

    cleanup?.();

    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  test('runs React 19 ref cleanups instead of calling with null', () => {
    const refCleanup = vi.fn();
    const callbackRef = vi.fn(() => refCleanup);

    composeRefs(callbackRef)(document.createElement('div'))?.();

    expect(refCleanup).toHaveBeenCalledOnce();
    expect(callbackRef).toHaveBeenCalledOnce();
  });
});

describe('getTypeaheadMatch', () => {
  const options = ['Apple', 'Banana', 'Blueberry', 'Cherry'];

  test('finds the first option starting with the search', () => {
    expect(getTypeaheadMatch(options, 'ch', -1)).toBe(3);
  });

  test('cycles through options when repeating a character', () => {
    expect(getTypeaheadMatch(options, 'b', -1)).toBe(1);
    expect(getTypeaheadMatch(options, 'bb', 1)).toBe(2);
    expect(getTypeaheadMatch(options, 'bbb', 2)).toBe(1);
  });

  test('keeps the current option while it still matches', () => {
    expect(getTypeaheadMatch(options, 'blu', 2)).toBe(2);
  });

  test('returns -1 without a match', () => {
    expect(getTypeaheadMatch(options, 'z', 0)).toBe(-1);
    expect(getTypeaheadMatch([], 'a', -1)).toBe(-1);
  });
});

describe('getCommandScore', () => {
  test('ranks exact > prefix > word prefix > substring > subsequence', () => {
    expect(getCommandScore('Heading', 'heading')).toBe(1);
    expect(getCommandScore('Heading 1', 'head')).toBe(0.9);
    expect(getCommandScore('Make shorter', 'short')).toBe(0.8);
    expect(getCommandScore('Bullet list', 'ullet')).toBe(0.6);
    expect(getCommandScore('Fix grammar', 'fxg')).toBe(0.3);
    expect(getCommandScore('Fix grammar', 'zzz')).toBe(0);
  });

  test('matches keywords and treats an empty search as a match', () => {
    expect(getCommandScore('Text', 'paragraph', ['paragraph'])).toBe(1);
    expect(getCommandScore('Text', '  ')).toBe(1);
  });
});
