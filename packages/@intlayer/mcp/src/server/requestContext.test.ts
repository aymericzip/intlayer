import { describe, expect, it } from 'vitest';
import { getRequestContextFromHeaders } from './requestContext';

describe('getRequestContextFromHeaders', () => {
  it('reads a bearer token', () => {
    expect(
      getRequestContextFromHeaders({ authorization: 'Bearer  abc123 ' })
    ).toEqual({ accessToken: 'abc123' });
  });

  it('reads the client credential pair', () => {
    expect(
      getRequestContextFromHeaders({
        'x-intlayer-client-id': 'id',
        'x-intlayer-client-secret': ['secret', 'ignored'],
      })
    ).toEqual({ credentials: { clientId: 'id', clientSecret: 'secret' } });
  });

  it('ignores an incomplete pair and non-bearer schemes', () => {
    expect(
      getRequestContextFromHeaders({
        authorization: 'Basic abc',
        'x-intlayer-client-id': 'id',
      })
    ).toEqual({});
  });
});
