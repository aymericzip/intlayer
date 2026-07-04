import type { FastifyReply } from 'fastify';

/**
 * Switches a Fastify reply into a raw Server-Sent Events stream.
 *
 * Writing to `reply.raw` bypasses Fastify's reply lifecycle, so headers staged
 * on the reply by plugins (e.g. the CORS headers added by `@fastify/cors` in
 * its `onRequest` hook) would never reach the wire. Without the
 * `Access-Control-Allow-Origin` header the browser rejects the cross-origin
 * `EventSource` connection (dashboard and API live on different origins), and
 * no event is ever delivered. This helper forwards those staged headers onto
 * the raw response, sets the SSE headers, hijacks the reply so Fastify does
 * not attempt to send its own response once the handler resolves, and flushes
 * the headers with an initial keep-alive comment.
 *
 * @param reply - The Fastify reply to convert into an SSE stream.
 */
export const beginServerSentEventStream = (reply: FastifyReply): void => {
  // Take over the response: the handler resolves without reply.send()
  reply.hijack();

  // Forward headers staged on the Fastify reply (CORS, etc.)
  for (const [headerName, headerValue] of Object.entries(reply.getHeaders())) {
    if (headerValue !== undefined) {
      reply.raw.setHeader(headerName, headerValue);
    }
  }

  reply.raw.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial comment to open the connection and flush headers
  reply.raw.write(':\n\n');
  reply.raw.flushHeaders?.();
};
