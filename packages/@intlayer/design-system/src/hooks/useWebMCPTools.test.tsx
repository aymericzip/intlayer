import { render } from '@testing-library/react';
import type { FC } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  ModelContext,
  ModelContextHost,
  WebMCPTool,
} from '../webmcp/types';
import { useWebMCPTools } from './useWebMCPTools';

const navigatorHost = navigator as Navigator & ModelContextHost;

const installModelContext = (): ModelContext => {
  const modelContext: ModelContext = {
    registerTool: vi.fn(),
    unregisterTool: vi.fn(),
  };
  navigatorHost.modelContext = modelContext;
  return modelContext;
};

const getRegisteredTool = (modelContext: ModelContext, index = 0) =>
  vi.mocked(modelContext.registerTool!).mock.calls[index]![0];

afterEach(() => {
  navigatorHost.modelContext = undefined;
});

describe('useWebMCPTools', () => {
  it('registers on mount and unregisters on unmount', () => {
    const modelContext = installModelContext();
    const Page: FC = () => {
      useWebMCPTools([
        { name: 'ping', description: 'Ping', execute: () => 'pong' },
      ]);
      return null;
    };

    const { unmount } = render(<Page />);

    expect(modelContext.registerTool).toHaveBeenCalledTimes(1);
    expect(getRegisteredTool(modelContext).name).toBe('ping');

    unmount();

    expect(modelContext.unregisterTool).toHaveBeenCalledWith('ping');
  });

  it('routes calls to the latest execute without re-registering', async () => {
    const modelContext = installModelContext();
    const Page: FC<{ value: string }> = ({ value }) => {
      const tool: WebMCPTool<Record<string, never>> = {
        name: 'read_value',
        description: 'Reads the prop',
        execute: () => value,
      };
      useWebMCPTools([tool]);
      return null;
    };

    const { rerender } = render(<Page value="first" />);
    rerender(<Page value="second" />);

    expect(modelContext.registerTool).toHaveBeenCalledTimes(1);
    await expect(
      getRegisteredTool(modelContext).execute({} as never)
    ).resolves.toBe('second');
  });

  it('re-registers when the tool set changes', () => {
    const modelContext = installModelContext();
    const Page: FC<{ name: string }> = ({ name }) => {
      useWebMCPTools([{ name, description: 'Tool', execute: () => '' }]);
      return null;
    };

    const { rerender } = render(<Page name="alpha" />);
    rerender(<Page name="beta" />);

    expect(modelContext.unregisterTool).toHaveBeenCalledWith('alpha');
    expect(modelContext.registerTool).toHaveBeenCalledTimes(2);
    expect(getRegisteredTool(modelContext, 1).name).toBe('beta');
  });
});
