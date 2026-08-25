import { afterEach, describe, expect, it } from 'vitest';
import { getEditorClientSecret } from './secrets';
import { getEditorClientSecret as getBrowserClientSecret } from './secrets.browser';

describe('built secrets', () => {
  afterEach(() => {
    delete process.env.INTLAYER_CLIENT_SECRET;
  });

  it('supplies the client secret on the server', () => {
    process.env.INTLAYER_CLIENT_SECRET = 'confidential_client_secret';

    expect(getEditorClientSecret()).toBe('confidential_client_secret');
  });

  it('returns undefined when the environment carries no secret', () => {
    expect(getEditorClientSecret()).toBeUndefined();
  });

  it('never exposes the secret through the browser stub', () => {
    process.env.INTLAYER_CLIENT_SECRET = 'confidential_client_secret';

    // The `browser` export condition selects this implementation, so a client
    // bundle resolves the accessor to a function that can never return a value.
    expect(getBrowserClientSecret()).toBeUndefined();
  });
});
