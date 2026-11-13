import { describe, expect, it } from 'vitest';
import {
  extractOAuthCallbackError,
  hasRequiredScopes,
} from './oAuthCallbackError';

describe('extractOAuthCallbackError', () => {
  it('returns null when the URL carries no error', () => {
    expect(
      extractOAuthCallbackError('https://app.intlayer.org/auth/login')
    ).toBeNull();
  });

  it('reads the error and strips it from the URL', () => {
    expect(
      extractOAuthCallbackError(
        'https://app.intlayer.org/auth/login?redirect_url=%2Fprojects&error=account_not_linked&error_description=Nope'
      )
    ).toEqual({
      code: 'account_not_linked',
      description: 'Nope',
      cleanedUrl:
        'https://app.intlayer.org/auth/login?redirect_url=%2Fprojects',
    });
  });

  it('keeps the other parameters of a link callback', () => {
    expect(
      extractOAuthCallbackError(
        'https://app.intlayer.org/projects?github_linked=true&error=email_does_not_match'
      )
    ).toEqual({
      code: 'email_does_not_match',
      description: null,
      cleanedUrl: 'https://app.intlayer.org/projects?github_linked=true',
    });
  });
});

describe('hasRequiredScopes', () => {
  it('accepts an account granted every required scope', () => {
    expect(
      hasRequiredScopes(['repo'], ['read:user', 'user:email', 'repo'])
    ).toBe(true);
  });

  it('rejects a sign-in only account', () => {
    expect(hasRequiredScopes(['repo'], ['read:user', 'user:email'])).toBe(
      false
    );
  });

  it('rejects an account without stored scopes', () => {
    expect(hasRequiredScopes(['repo'])).toBe(false);
  });

  it('accepts anything when nothing is required', () => {
    expect(hasRequiredScopes([])).toBe(true);
  });
});
