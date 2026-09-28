import { describe, expect, it } from 'vitest';
import {
  getProcessChainCommands,
  parseProcessTable,
} from './getProcessChainCommands';

describe('parseProcessTable', () => {
  it('reads pid, parent pid and the full command line', () => {
    const processes = parseProcessTable(
      [
        '    1     0 /sbin/launchd',
        '  812     1 node /app/node_modules/.bin/nodemon src/index.ts',
        '  813   812 node src/index.ts --port 3000',
        '',
        'garbage line',
      ].join('\n')
    );

    expect(processes.size).toBe(3);
    expect(processes.get(813)).toEqual({
      parentPid: 812,
      command: 'node src/index.ts --port 3000',
    });
    expect(processes.get(812)?.command).toBe(
      'node /app/node_modules/.bin/nodemon src/index.ts'
    );
  });
});

describe('getProcessChainCommands', () => {
  it('never throws, and never walks past maxDepth', async () => {
    const commands = await getProcessChainCommands(2);

    expect(Array.isArray(commands)).toBe(true);
    expect(commands.length).toBeLessThanOrEqual(2);
  });
});
