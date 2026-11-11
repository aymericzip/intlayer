// @vitest-environment node
import Fastify from 'fastify';
import { describe, expect, it, vi } from 'vitest';

const { appLoggerMock } = vi.hoisted(() => ({ appLoggerMock: vi.fn() }));

vi.mock('@intlayer/config/node', () => ({ getConfiguration: () => ({}) }));
vi.mock('@intlayer/config/logger', () => ({
  getAppLogger: () => appLoggerMock,
}));

const { logClientEvent, sanitizeClientLogMessage, MAX_CLIENT_LOG_LENGTH } =
  await import('./clientLog.controller');

const createApp = () => {
  const app = Fastify();
  app.post('/', logClientEvent);
  return app;
};

describe('logClientEvent', () => {
  it('prints the message at the reported level', async () => {
    const response = await createApp().inject({
      method: 'POST',
      url: '/',
      payload: { level: 'error', message: 'Application unreachable' },
    });

    expect(response.statusCode).toBe(204);
    expect(appLoggerMock).toHaveBeenCalledWith('Application unreachable', {
      level: 'error',
    });
  });

  it('rejects an unknown level or a missing message', async () => {
    const unknownLevelResponse = await createApp().inject({
      method: 'POST',
      url: '/',
      payload: { level: 'fatal', message: 'boom' },
    });
    const missingMessageResponse = await createApp().inject({
      method: 'POST',
      url: '/',
      payload: { level: 'error' },
    });

    expect(unknownLevelResponse.statusCode).toBe(400);
    expect(missingMessageResponse.statusCode).toBe(400);
    expect(appLoggerMock).not.toHaveBeenCalled();
  });
});

describe('sanitizeClientLogMessage', () => {
  it('strips control characters such as ANSI escapes', () => {
    expect(sanitizeClientLogMessage('\u001B[2Jcleared\u0007')).toBe(
      '[2Jcleared'
    );
  });

  it('caps the message length', () => {
    const sanitizedMessage = sanitizeClientLogMessage(
      'a'.repeat(MAX_CLIENT_LOG_LENGTH + 10)
    );

    expect(sanitizedMessage).toHaveLength(MAX_CLIENT_LOG_LENGTH + 1);
  });
});
