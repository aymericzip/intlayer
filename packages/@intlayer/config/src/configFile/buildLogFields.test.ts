import { describe, expect, it } from 'vitest';
import { getAppLogger } from '../logger';
import { buildLogFields } from './buildBrowserConfiguration';

/** Mimics pino (`fastify.log`), whose methods read their state from `this`. */
class ThisBoundLogger {
  #messages: unknown[][] = [];

  get messages(): unknown[][] {
    return this.#messages;
  }

  error(...content: unknown[]): void {
    this.#messages.push(content);
  }
}

describe('buildLogFields', () => {
  it('should keep custom log functions bound to their owner', () => {
    const ownerLogger = new ThisBoundLogger();
    const log = buildLogFields({ prefix: '' }, ownerLogger);

    // `getAppLogger` spreads the log config, detaching the methods
    getAppLogger({ log })('Something failed', { level: 'error' });

    expect(ownerLogger.messages).toEqual([['Something failed']]);
  });

  it('should leave missing log functions undefined', () => {
    const log = buildLogFields(undefined, new ThisBoundLogger());

    expect(log.warn).toBeUndefined();
    expect(log.info).toBeUndefined();
  });
});
