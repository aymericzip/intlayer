/**
 * Error raised when the server emits an `event: error` frame mid-stream.
 * `message` is the serialized payload, matching the `fetcher` convention so
 * callers can match backend error codes with `error.message.includes(code)`.
 */
export class ServerSentEventError<
  Payload = Record<string, unknown>,
> extends Error {
  readonly payload: Payload;

  constructor(payload: Payload) {
    super(JSON.stringify(payload));
    this.name = 'ServerSentEventError';
    this.payload = payload;
  }
}

/**
 * Reads a `text/event-stream` response and calls `onData` with each parsed
 * `data:` payload of the default event type.
 *
 * Throws a {@link ServerSentEventError} as soon as an `event: error` frame is
 * received, so stream failures reject the caller instead of resolving silently.
 */
export const readServerSentEvents = async <Data>(
  response: Response,
  onData: (data: Data) => void
): Promise<void> => {
  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error('No reader available');
  }

  const decoder = new TextDecoder();
  let buffer = '';
  let currentEventName = 'message';

  const handleLine = (line: string): void => {
    // A blank line terminates the current event: reset its type
    if (line === '') {
      currentEventName = 'message';
      return;
    }

    if (line.startsWith('event:')) {
      currentEventName = line.slice('event:'.length).trim();
      return;
    }

    if (!line.startsWith('data:')) return;

    const rawData = line.slice('data:'.length).trimStart();

    let parsedData: unknown;

    try {
      parsedData = JSON.parse(rawData);
    } catch {
      if (currentEventName === 'error') {
        throw new ServerSentEventError({ message: rawData });
      }

      console.error('Failed to parse SSE data:', rawData);
      return;
    }

    if (currentEventName === 'error') {
      throw new ServerSentEventError(parsedData);
    }

    onData(parsedData as Data);
  };

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        handleLine(line.replace(/\r$/, ''));
      }
    }

    buffer += decoder.decode();

    if (buffer !== '') {
      handleLine(buffer.replace(/\r$/, ''));
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  }
};
