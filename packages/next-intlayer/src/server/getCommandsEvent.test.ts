// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCommandsEvent } from './withIntlayer';

describe('getCommandsEvent', () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
    vi.unstubAllEnvs();
  });

  /** A custom server: `node server.js` from a script named `start:dev`. */
  const simulateCustomServer = () => {
    process.argv = ['node', 'server.js'];
    vi.stubEnv('npm_lifecycle_event', 'start:dev');
    vi.stubEnv('npm_lifecycle_script', 'node server.js');
  };

  it('detects no command for a custom server', () => {
    simulateCustomServer();

    expect(getCommandsEvent()).toEqual({
      isDevCommand: false,
      isBuildCommand: false,
      isStartCommand: false,
    });
  });

  it.each([
    [
      'dev',
      { isDevCommand: true, isBuildCommand: false, isStartCommand: false },
    ],
    [
      'build',
      { isDevCommand: false, isBuildCommand: true, isStartCommand: false },
    ],
    [
      'start',
      { isDevCommand: false, isBuildCommand: false, isStartCommand: true },
    ],
  ] as const)('uses the explicit %s command', (command, expected) => {
    simulateCustomServer();

    expect(getCommandsEvent(command)).toEqual(expected);
  });

  it('lets the explicit command win over the detected one', () => {
    process.argv = ['node', 'next', 'dev'];

    expect(getCommandsEvent('start').isDevCommand).toBe(false);
  });

  it('still detects `next dev` without an explicit command', () => {
    process.argv = ['node', 'next', 'dev'];

    expect(getCommandsEvent().isDevCommand).toBe(true);
  });
});
