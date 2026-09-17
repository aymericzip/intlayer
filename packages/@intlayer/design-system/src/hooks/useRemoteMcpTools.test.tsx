import { render, waitFor } from '@testing-library/react';
import type { FC } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Mcp_Root } from '../routes';
import type { ModelContextHost, WebMCPTool } from '../webmcp/types';
import { useRemoteMcpTools } from './useRemoteMcpTools';

const navigatorHost = navigator as Navigator & ModelContextHost;

const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const toolsListResponse = jsonResponse({
  jsonrpc: '2.0',
  id: 1,
  result: {
    tools: [
      {
        name: 'fetch-doc-chunks',
        description: 'Search the docs',
        annotations: { readOnlyHint: true },
      },
      {
        name: 'get-doc-by-slug',
        description: 'Read a doc',
        annotations: { readOnlyHint: true },
      },
      {
        name: 'list-doc-slugs',
        description: 'Not mirrored',
        annotations: { readOnlyHint: true },
      },
    ],
  },
});

/** Mounts the hook and reports every tool list it returned. */
const renderHook = (
  ...args: Parameters<typeof useRemoteMcpTools>
): { getTools: () => WebMCPTool[] } => {
  let tools: WebMCPTool[] = [];
  const Page: FC = () => {
    tools = useRemoteMcpTools(...args);
    return null;
  };
  render(<Page />);
  return { getTools: () => tools };
};

afterEach(() => {
  navigatorHost.modelContext = undefined;
  vi.restoreAllMocks();
});

describe('useRemoteMcpTools', () => {
  it('skips discovery when the browser has no agent', () => {
    const fetchMock = vi.fn();

    const { getTools } = renderHook({ fetch: fetchMock });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(getTools()).toEqual([]);
  });

  it('bridges the Intlayer doc tools under camelCase names by default', async () => {
    navigatorHost.modelContext = {
      registerTool: vi.fn(),
      unregisterTool: vi.fn(),
    };
    const fetchMock = vi.fn(async (_url: string | URL | Request) =>
      toolsListResponse.clone()
    );

    const { getTools } = renderHook({
      fetch: fetchMock as unknown as typeof fetch,
    });

    await waitFor(() =>
      expect(getTools().map((tool) => tool.name)).toEqual([
        'fetchDocChunks',
        'getDocBySlug',
      ])
    );
    expect(fetchMock.mock.calls[0]?.[0]).toBe(Mcp_Root);
  });

  it('warns instead of throwing when the server is unreachable', async () => {
    navigatorHost.modelContext = {
      registerTool: vi.fn(),
      unregisterTool: vi.fn(),
    };
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn(async () => {
      throw new Error('offline');
    });

    const { getTools } = renderHook({
      serverUrl: 'https://mcp.example',
      fetch: fetchMock as unknown as typeof fetch,
    });

    await waitFor(() => expect(warn).toHaveBeenCalledOnce());
    expect(warn.mock.calls[0]?.[0]).toContain('https://mcp.example');
    expect(getTools()).toEqual([]);
  });
});
