import { beforeEach, describe, expect, it, vi } from 'vitest';

const { analyticsAPI } = vi.hoisted(() => ({
  analyticsAPI: {
    getSchema: vi.fn(),
    runReport: vi.fn(),
    runRealtimeReport: vi.fn(),
    getAnnotations: vi.fn(),
    getPageFlow: vi.fn(),
    getExperimentResults: vi.fn(),
  },
}));

// server.ts reads its package.json through a dist-relative path at import.
vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs')>();

  return {
    ...actual,
    readFileSync: ((path: string, ...rest: unknown[]) =>
      String(path).endsWith('package.json')
        ? '{"version":"0.0.0"}'
        : (actual.readFileSync as (...args: unknown[]) => unknown)(
            path,
            ...rest
          )) as typeof actual.readFileSync,
  };
});

vi.mock('./apiAuth', () => ({
  getAuthenticatedAPI: async () => ({ analytics: analyticsAPI }),
}));

import { McpServer } from '../server/server';
import { COMPATIBILITY_TABLE, loadAnalyticsTools } from './analytics';

const createServer = () => {
  const server = new McpServer({ name: 'test', version: '0.0.0' });
  loadAnalyticsTools(server);
  return server;
};

const listTools = async (server: McpServer) =>
  (await server.handleMessage({ jsonrpc: '2.0', id: 1, method: 'tools/list' }))
    .result.tools as {
    name: string;
    description: string;
    inputSchema: { properties: Record<string, any>; required?: string[] };
    annotations?: Record<string, unknown>;
  }[];

const callTool = async (
  server: McpServer,
  name: string,
  args: Record<string, unknown>
) =>
  (
    await server.handleMessage({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: { name, arguments: args },
    })
  ).result as { content: { text: string }[]; isError?: boolean };

beforeEach(() => {
  for (const method of Object.values(analyticsAPI)) {
    method.mockResolvedValue({ data: { ok: true } });
  }
});

describe('loadAnalyticsTools', () => {
  it('registers read-only tools with real input schemas', async () => {
    const tools = await listTools(createServer());

    expect(tools.map(({ name }) => name)).toEqual([
      'intlayer-analytics-get-schema',
      'intlayer-analytics-run-report',
      'intlayer-analytics-run-realtime-report',
      'intlayer-analytics-list-annotations',
      'intlayer-analytics-page-flow',
      'intlayer-analytics-experiment',
    ]);

    for (const tool of tools) {
      expect(tool.annotations).toMatchObject({ readOnlyHint: true });
    }

    const runReport = tools.find(
      ({ name }) => name === 'intlayer-analytics-run-report'
    )!;

    // A failed schema conversion silently falls back to `{ properties: {} }`.
    expect(runReport.inputSchema.required).toEqual(['dateRanges', 'metrics']);
    expect(runReport.inputSchema.properties.metrics.items.enum).toContain(
      'activeUsers'
    );
    expect(
      runReport.inputSchema.properties.dimensionFilters.items.properties
        .operator.enum
    ).toContain('beginsWith');
  });

  it('keeps descriptions short enough for a tool listing', async () => {
    const tools = await listTools(createServer());
    const listingSize = JSON.stringify(tools).length;

    expect(listingSize).toBeLessThan(16_000);
    expect(
      tools.find(({ name }) => name === 'intlayer-analytics-run-report')!
        .description
    ).toContain(COMPATIBILITY_TABLE);
  });

  it('forwards the report request without the credentials', async () => {
    const server = createServer();
    const report = {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: ['locale'],
      metrics: ['pageViews'],
    };

    const result = await callTool(server, 'intlayer-analytics-run-report', {
      ...report,
      clientId: 'id',
      clientSecret: 'secret',
    });

    expect(analyticsAPI.runReport).toHaveBeenCalledWith(report);
    expect(result.content[0]?.text).toBe('{"ok":true}');
  });

  it('reports backend validation errors to the model', async () => {
    analyticsAPI.runReport.mockRejectedValue(
      new Error('Metric "activeUsers" cannot be broken down by "pagePath"')
    );

    const result = await callTool(
      createServer(),
      'intlayer-analytics-run-report',
      {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: ['pagePath'],
        metrics: ['activeUsers'],
      }
    );

    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toContain('cannot be broken down');
  });

  it('applies tool defaults for page flow', async () => {
    await callTool(createServer(), 'intlayer-analytics-page-flow', {});

    expect(analyticsAPI.getPageFlow).toHaveBeenCalledWith('30d', '/');
  });
});
