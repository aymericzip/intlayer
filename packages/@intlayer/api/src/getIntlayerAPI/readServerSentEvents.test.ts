import { describe, expect, it } from 'vitest';
import {
  readServerSentEvents,
  ServerSentEventError,
} from './readServerSentEvents';

/** Builds a streamed `Response` whose body is emitted in the given chunks. */
const createStreamResponse = (chunks: string[]): Response => {
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream<Uint8Array>({
      start: (controller) => {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    })
  );
};

describe('readServerSentEvents', () => {
  it('forwards data payloads and ignores comments', async () => {
    const received: unknown[] = [];

    await readServerSentEvents(
      createStreamResponse([
        ': connected\n\n',
        'data: {"chunk":"Hel',
        'lo"}\n\ndata: {"done":true}\n\n',
      ]),
      (data) => received.push(data)
    );

    expect(received).toEqual([{ chunk: 'Hello' }, { done: true }]);
  });

  it('throws the error event payload', async () => {
    const errorPayload = {
      code: 'AI_AUTH_ERROR',
      title: 'AI Configuration Error',
      message: 'invalid x-api-key',
    };
    const received: unknown[] = [];

    const readPromise = readServerSentEvents(
      createStreamResponse([
        ': connected\n\n',
        'data: {"chunk":"partial"}\n\n',
        `event: error\ndata: ${JSON.stringify(errorPayload)}\n\n`,
      ]),
      (data) => received.push(data)
    );

    await expect(readPromise).rejects.toBeInstanceOf(ServerSentEventError);
    await expect(readPromise).rejects.toMatchObject({
      payload: errorPayload,
      message: JSON.stringify(errorPayload),
    });
    expect(received).toEqual([{ chunk: 'partial' }]);
  });

  it('resets the event type after a blank line', async () => {
    const received: unknown[] = [];

    await readServerSentEvents(
      createStreamResponse([
        'event: ping\ndata: {"ignored":false}\n\n',
        'data: {"chunk":"after"}\n\n',
      ]),
      (data) => received.push(data)
    );

    expect(received).toEqual([{ ignored: false }, { chunk: 'after' }]);
  });

  it('throws on a non-JSON error payload', async () => {
    await expect(
      readServerSentEvents(
        createStreamResponse(['event: error\ndata: boom\n\n']),
        () => undefined
      )
    ).rejects.toMatchObject({ payload: { message: 'boom' } });
  });

  it('handles CRLF line endings', async () => {
    await expect(
      readServerSentEvents(
        createStreamResponse(['event: error\r\ndata: {"code":"X"}\r\n\r\n']),
        () => undefined
      )
    ).rejects.toMatchObject({ payload: { code: 'X' } });
  });
});
