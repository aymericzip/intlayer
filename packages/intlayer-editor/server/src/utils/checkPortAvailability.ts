import net from 'node:net';

/**
 * Resolves `false` when `port` is already bound on `host`.
 *
 * Probe the same host the server listens on: on macOS an IPv6 `::` probe
 * succeeds even when `0.0.0.0:port` is taken.
 */
export const checkPortAvailability = (
  port: number,
  host = '0.0.0.0'
): Promise<boolean> =>
  new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (error: NodeJS.ErrnoException) => {
      resolve(error.code !== 'EADDRINUSE');
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port, host);
  });

/**
 * Loopback hosts probed besides the listening one: a server bound to a single
 * loopback address (e.g. a dev server on `::1`) would shadow the editor for
 * `localhost` while leaving `0.0.0.0` free.
 */
const LOOPBACK_HOSTS = ['127.0.0.1', '::1'] as const;

/**
 * First port from `startPort` free on `host` and on the loopback addresses,
 * trying the next ones in order.
 *
 * @returns The port, or `undefined` when the `attempts` ports are all taken.
 */
export const findAvailablePort = async (
  startPort: number,
  host = '0.0.0.0',
  attempts = 20
): Promise<number | undefined> => {
  for (let port = startPort; port < startPort + attempts; port++) {
    let isAvailable = true;

    for (const probedHost of [host, ...LOOPBACK_HOSTS]) {
      isAvailable = await checkPortAvailability(port, probedHost);
      if (!isAvailable) break;
    }

    if (isAvailable) return port;
  }

  return undefined;
};
