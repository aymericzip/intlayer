import { render } from '@testing-library/react';
import type { FC } from 'react';
import { describe, expect, test } from 'vitest';
import { TabProvider, useTabContext } from './TabContext';

describe('TabProvider', () => {
  test('keeps its context value stable when it re-renders', () => {
    const contextValues: ReturnType<typeof useTabContext>[] = [];

    const Consumer: FC = () => {
      contextValues.push(useTabContext());
      return null;
    };

    const { rerender } = render(
      <TabProvider>
        <Consumer />
      </TabProvider>
    );

    rerender(
      <TabProvider>
        <Consumer />
      </TabProvider>
    );

    expect(contextValues).toHaveLength(2);
    expect(contextValues[1]).toBe(contextValues[0]);
  });
});
