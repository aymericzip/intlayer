import { h, render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import { useLastDefinedValue } from './useLastDefinedValue';

const container = document.createElement('div');
const renderedValues: (string | undefined)[] = [];

const Probe = ({ value }: { value: string | null | undefined }) => {
  renderedValues.push(useLastDefinedValue(value));
  return null;
};

const renderProbe = (value: string | null | undefined) =>
  act(() => {
    render(h(Probe, { value }), container);
  });

describe('useLastDefinedValue', () => {
  afterEach(() => {
    render(null, container);
    renderedValues.length = 0;
  });

  test('keeps the last value once the source clears', () => {
    renderProbe('first');
    renderProbe(null);
    renderProbe(undefined);

    expect(renderedValues).toEqual(['first', 'first', 'first']);
  });

  test('follows a new value, in the same render', () => {
    renderProbe('first');
    renderProbe('second');

    expect(renderedValues).toEqual(['first', 'second']);
  });

  test('is undefined until a value is set', () => {
    renderProbe(null);

    expect(renderedValues).toEqual([undefined]);
  });
});
