import { describe, expect, it } from 'vitest';
import {
  getSkipOption,
  getSkippedMessage,
  isSkipAnswer,
  SKIP_VALUE,
} from './skipStep';

describe('skipStep', () => {
  it('builds a skip entry pointing to the step command', () => {
    expect(getSkipOption('intlayer init ai')).toEqual({
      value: SKIP_VALUE,
      label: 'Skip for now',
      hint: 'run `intlayer init ai` later',
    });
  });

  it('tells how to run the skipped step later', () => {
    expect(getSkippedMessage('MCP server', 'intlayer init mcp')).toBe(
      'MCP server skipped. Run `intlayer init mcp` to set it up later.'
    );
  });

  it('treats the skip entry and a cancelled prompt as a skip', () => {
    expect(isSkipAnswer(SKIP_VALUE)).toBe(true);
    expect(isSkipAnswer(Symbol('clack:cancel'))).toBe(true);
    expect(isSkipAnswer('stdio')).toBe(false);
    expect(isSkipAnswer('')).toBe(false);
  });
});
