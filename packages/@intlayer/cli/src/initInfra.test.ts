import { afterEach, describe, expect, it, vi } from 'vitest';
import { INFRA_MODES, initInfra, parseInfraMode } from './initInfra';

const spawnMock = vi.hoisted(() => vi.fn());

vi.mock('node:child_process', () => ({ spawn: spawnMock }));

const isInteractiveTerminalMock = vi.hoisted(() => vi.fn(() => true));
vi.mock('./utils/isInteractiveTerminal', () => ({
  isInteractiveTerminal: isInteractiveTerminalMock,
}));

describe('parseInfraMode', () => {
  it('accepts every known mode', () => {
    for (const mode of INFRA_MODES) {
      expect(parseInfraMode(mode)).toBe(mode);
    }
  });

  it('rejects an unknown mode with the list of valid ones', () => {
    expect(() => parseInfraMode('kubernetes')).toThrow(
      'Unknown infra mode "kubernetes". Expected one of: desktop, docker, compose'
    );
  });
});

describe('initInfra', () => {
  const originalFetch = globalThis.fetch;
  const originalExitCode = process.exitCode;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.exitCode = originalExitCode;
    vi.restoreAllMocks();
  });

  it('fails without running anything when the installer cannot be downloaded', async () => {
    globalThis.fetch = vi.fn(
      async () =>
        new Response('nope', { status: 503, statusText: 'Unavailable' })
    ) as typeof fetch;
    await initInfra({ mode: 'docker', scriptUrl: 'https://example.test/x.sh' });

    expect(process.exitCode).toBe(1);
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it('requires a mode when there is no terminal to show the menu', async () => {
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as typeof fetch;
    isInteractiveTerminalMock.mockReturnValueOnce(false);

    await initInfra();

    expect(process.exitCode).toBe(1);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(spawnMock).not.toHaveBeenCalled();
  });
});
