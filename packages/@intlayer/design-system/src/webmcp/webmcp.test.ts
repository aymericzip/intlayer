import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createRemoteMcpTools,
  formatRemoteMcpResult,
} from './createRemoteMcpTools';
import { getModelContext } from './getModelContext';
import { registerWebMCPTools } from './registerWebMCPTools';
import type { ModelContext, ModelContextHost, WebMCPTool } from './types';

const navigatorHost = navigator as Navigator & ModelContextHost;
const documentHost = document as Document & ModelContextHost;

const createModelContext = (
  overrides: Partial<ModelContext> = {}
): ModelContext => ({
  registerTool: vi.fn(),
  unregisterTool: vi.fn(),
  ...overrides,
});

const echoTool: WebMCPTool<{ text: string }> = {
  name: 'echo',
  description: 'Echoes its input',
  inputSchema: { type: 'object', properties: { text: { type: 'string' } } },
  execute: async ({ text }) => text,
};

afterEach(() => {
  navigatorHost.modelContextTesting = undefined;
  navigatorHost.modelContext = undefined;
  documentHost.modelContext = undefined;
  vi.restoreAllMocks();
});

describe('getModelContext', () => {
  it('returns null when no entry point exists', () => {
    expect(getModelContext()).toBeNull();
  });

  it('prefers the testing entry point, then navigator, then document', () => {
    const testing = createModelContext();
    const production = createModelContext();
    const draft = createModelContext();

    documentHost.modelContext = draft;
    expect(getModelContext()).toBe(draft);

    navigatorHost.modelContext = production;
    expect(getModelContext()).toBe(production);

    navigatorHost.modelContextTesting = testing;
    expect(getModelContext()).toBe(testing);
  });

  it('skips an entry point that cannot register tools', () => {
    const production = createModelContext();

    // The testing API of some builds only lists and executes tools.
    navigatorHost.modelContextTesting = {} as ModelContext;
    navigatorHost.modelContext = production;

    expect(getModelContext()).toBe(production);
  });
});

describe('registerWebMCPTools', () => {
  it('is a no-op without a model context', () => {
    const unregister = registerWebMCPTools([echoTool as WebMCPTool<never>]);

    expect(unregister).toBeTypeOf('function');
    expect(() => unregister()).not.toThrow();
  });

  it('registers each tool with an abort signal and unregisters by name', () => {
    const modelContext = createModelContext();

    const unregister = registerWebMCPTools(
      [echoTool as WebMCPTool<never>],
      modelContext
    );

    expect(modelContext.registerTool).toHaveBeenCalledTimes(1);
    const [registered, options] = vi.mocked(modelContext.registerTool!).mock
      .calls[0]!;
    expect(registered.name).toBe('echo');
    expect(options?.signal).toBeInstanceOf(AbortSignal);
    expect(options?.signal?.aborted).toBe(false);

    unregister();

    expect(options?.signal?.aborted).toBe(true);
    expect(modelContext.unregisterTool).toHaveBeenCalledWith('echo');
  });

  it('turns a throwing execute into an error message for the agent', async () => {
    const modelContext = createModelContext();
    const failingTool: WebMCPTool<Record<string, never>> = {
      name: 'fail',
      description: 'Always throws',
      execute: async () => {
        throw new Error('boom');
      },
    };

    registerWebMCPTools([failingTool as WebMCPTool<never>], modelContext);

    const [registered] = vi.mocked(modelContext.registerTool!).mock.calls[0]!;

    await expect(registered.execute({} as never)).resolves.toBe(
      'Tool "fail" failed: boom'
    );
  });

  it('keeps registering the remaining tools when one registration throws', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const modelContext = createModelContext({
      registerTool: vi.fn((tool: WebMCPTool<never>) => {
        if (tool.name === 'echo') throw new Error('duplicate');
      }),
    });
    const secondTool: WebMCPTool<never> = { ...echoTool, name: 'second' };

    const unregister = registerWebMCPTools(
      [echoTool as WebMCPTool<never>, secondTool],
      modelContext
    );
    unregister();

    expect(modelContext.unregisterTool).toHaveBeenCalledTimes(1);
    expect(modelContext.unregisterTool).toHaveBeenCalledWith('second');
  });
});

describe('formatRemoteMcpResult', () => {
  it('joins text content entries', () => {
    expect(
      formatRemoteMcpResult({
        content: [
          { type: 'text', text: 'first' },
          { type: 'image' },
          { type: 'text', text: 'second' },
        ],
      })
    ).toBe('first\n\nsecond');
  });

  it('flags tool-level errors', () => {
    expect(
      formatRemoteMcpResult({
        isError: true,
        content: [{ type: 'text', text: 'not found' }],
      })
    ).toBe('Error: not found');
  });
});

describe('createRemoteMcpTools', () => {
  const jsonResponse = (body: unknown): Response =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  it('wraps read-only remote tools and forwards calls', async () => {
    const fetchMock = vi.fn(
      async (_url: string | URL | Request, init?: RequestInit) => {
        const request = JSON.parse(String(init?.body)) as {
          method: string;
          params?: { name: string; arguments: Record<string, unknown> };
        };

        if (request.method === 'tools/list') {
          return jsonResponse({
            jsonrpc: '2.0',
            id: 1,
            result: {
              tools: [
                {
                  name: 'fetch-doc-chunks',
                  description: 'Search the docs',
                  inputSchema: { type: 'object', properties: {} },
                  annotations: { readOnlyHint: true },
                },
                {
                  name: 'intlayer-dictionaries-push',
                  description: 'Needs credentials',
                  inputSchema: { type: 'object', properties: {} },
                },
              ],
            },
          });
        }

        return jsonResponse({
          jsonrpc: '2.0',
          id: 1,
          result: {
            content: [
              {
                type: 'text',
                text: `called ${request.params?.name} with ${JSON.stringify(request.params?.arguments)}`,
              },
            ],
          },
        });
      }
    );

    const tools = await createRemoteMcpTools({
      serverUrl: 'https://mcp.example',
      namePrefix: 'intlayer_',
      fetch: fetchMock as unknown as typeof fetch,
    });

    expect(tools.map((tool) => tool.name)).toEqual([
      'intlayer_fetch-doc-chunks',
    ]);

    await expect(tools[0]!.execute({ query: 'cms' } as never)).resolves.toBe(
      'called fetch-doc-chunks with {"query":"cms"}'
    );
  });

  it('surfaces JSON-RPC errors', async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({
        jsonrpc: '2.0',
        id: 1,
        error: { code: -32601, message: 'Method not found' },
      })
    );

    await expect(
      createRemoteMcpTools({
        serverUrl: 'https://mcp.example',
        fetch: fetchMock as unknown as typeof fetch,
      })
    ).rejects.toThrow('Method not found');
  });
});
