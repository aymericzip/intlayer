import { describe, expect, it } from 'vitest';
import { isPrivateOrReservedIp, isPublicHttpUrl } from './isPublicUrl';

describe('isPrivateOrReservedIp', () => {
  it.each([
    '127.0.0.1',
    '10.1.2.3',
    '172.20.0.1',
    '192.168.1.1',
    '169.254.169.254',
    '100.64.0.1',
    '0.0.0.0',
    '::1',
    '::',
    'fd00::1',
    'fe80::1',
    '::ffff:127.0.0.1',
  ])('blocks %s', (ip) => {
    expect(isPrivateOrReservedIp(ip)).toBe(true);
  });

  it.each(['8.8.8.8', '172.32.0.1', '2606:4700::1111'])('allows %s', (ip) => {
    expect(isPrivateOrReservedIp(ip)).toBe(false);
  });
});

describe('isPublicHttpUrl', () => {
  it('rejects non-http schemes and private IP literals without DNS', async () => {
    expect(await isPublicHttpUrl('file:///etc/passwd')).toBe(false);
    expect(await isPublicHttpUrl('http://127.0.0.1:3000/')).toBe(false);
    expect(await isPublicHttpUrl('http://[::1]/')).toBe(false);
    expect(await isPublicHttpUrl('not a url')).toBe(false);
    expect(await isPublicHttpUrl('https://8.8.8.8/')).toBe(true);
  });
});
