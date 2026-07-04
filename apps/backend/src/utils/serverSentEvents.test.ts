import type { FastifyReply } from 'fastify';
import { describe, expect, it, vi } from 'vitest';
import { beginServerSentEventStream } from './serverSentEvents';

const createReplyMock = (
  stagedHeaders: Record<string, string | string[] | number | undefined>
) => {
  const rawSetHeader = vi.fn();
  const rawWrite = vi.fn();
  const rawFlushHeaders = vi.fn();
  const hijack = vi.fn();

  const reply = {
    hijack,
    getHeaders: () => stagedHeaders,
    raw: {
      setHeader: rawSetHeader,
      write: rawWrite,
      flushHeaders: rawFlushHeaders,
    },
  } as unknown as FastifyReply;

  return { reply, rawSetHeader, rawWrite, rawFlushHeaders, hijack };
};

describe('beginServerSentEventStream', () => {
  it('hijacks the reply so Fastify does not send its own response', () => {
    const { reply, hijack } = createReplyMock({});

    beginServerSentEventStream(reply);

    expect(hijack).toHaveBeenCalledOnce();
  });

  it('forwards headers staged on the reply (e.g. CORS) to the raw response', () => {
    const { reply, rawSetHeader } = createReplyMock({
      'access-control-allow-origin': 'http://localhost:3000',
      'access-control-allow-credentials': 'true',
      vary: 'Origin',
    });

    beginServerSentEventStream(reply);

    expect(rawSetHeader).toHaveBeenCalledWith(
      'access-control-allow-origin',
      'http://localhost:3000'
    );
    expect(rawSetHeader).toHaveBeenCalledWith(
      'access-control-allow-credentials',
      'true'
    );
    expect(rawSetHeader).toHaveBeenCalledWith('vary', 'Origin');
  });

  it('skips staged headers whose value is undefined', () => {
    const { reply, rawSetHeader } = createReplyMock({ 'x-empty': undefined });

    beginServerSentEventStream(reply);

    expect(rawSetHeader).not.toHaveBeenCalledWith('x-empty', undefined);
  });

  it('sets the Server-Sent Events headers and opens the stream', () => {
    const { reply, rawSetHeader, rawWrite, rawFlushHeaders } = createReplyMock(
      {}
    );

    beginServerSentEventStream(reply);

    expect(rawSetHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/event-stream;charset=utf-8'
    );
    expect(rawSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'no-cache, no-transform'
    );
    expect(rawSetHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
    expect(rawSetHeader).toHaveBeenCalledWith('X-Accel-Buffering', 'no');
    expect(rawWrite).toHaveBeenCalledWith(':\n\n');
    expect(rawFlushHeaders).toHaveBeenCalledOnce();
  });
});
