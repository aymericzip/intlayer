import { lookup as dnsLookup } from 'node:dns/promises';
import net from 'node:net';

/**
 * Whether an IP address is private, loopback, link-local, unspecified or
 * otherwise not publicly routable. Covers IPv4 and IPv6.
 */
export const isPrivateOrReservedIp = (ip: string): boolean => {
  if (net.isIPv4(ip)) {
    const [firstOctet = 0, secondOctet = 0] = ip.split('.').map(Number);
    return (
      firstOctet === 0 || // "this" network
      firstOctet === 10 || // private
      firstOctet === 127 || // loopback
      (firstOctet === 100 && secondOctet >= 64 && secondOctet <= 127) || // CGNAT
      (firstOctet === 169 && secondOctet === 254) || // link-local / cloud metadata
      (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) || // private
      (firstOctet === 192 && secondOctet === 168) || // private
      firstOctet >= 224 // multicast & reserved
    );
  }

  if (net.isIPv6(ip)) {
    const normalizedIp = ip.toLowerCase();
    const ipv4Mapped = normalizedIp.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (ipv4Mapped?.[1]) return isPrivateOrReservedIp(ipv4Mapped[1]);
    return (
      normalizedIp === '::' || // unspecified
      normalizedIp === '::1' || // loopback
      /^f[cd]/.test(normalizedIp) || // unique local fc00::/7
      /^fe[89ab]/.test(normalizedIp) || // link-local fe80::/10
      normalizedIp.startsWith('ff') // multicast
    );
  }

  // Unknown format — treat as unsafe
  return true;
};

/**
 * Whether a URL is safe for the server to request: `http(s)` only, and every
 * address its hostname resolves to is public (SSRF prevention).
 */
export const isPublicHttpUrl = async (url: string): Promise<boolean> => {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return false;
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return false;
  }

  const hostname = parsedUrl.hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(hostname)) return !isPrivateOrReservedIp(hostname);

  try {
    const addresses = await dnsLookup(hostname, { all: true });
    return (
      addresses.length > 0 &&
      addresses.every(({ address }) => !isPrivateOrReservedIp(address))
    );
  } catch {
    return false;
  }
};
