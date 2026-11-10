import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/project.service', () => ({
  getProjectById: vi.fn(),
}));

import { resolveProjectAIOptions } from './getProjectAIOptions';

const AI_CONFIGURATION = {
  provider: 'openai',
  model: 'gpt-5-mini',
  apiKey: 'sk-own-key',
  apiKeyConfigured: true,
} as const;

describe('resolveProjectAIOptions', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns undefined without AI configuration', () => {
    expect(resolveProjectAIOptions(undefined)).toBeUndefined();
  });

  it('returns the AI options without the internal flags', () => {
    expect(
      resolveProjectAIOptions({
        ...AI_CONFIGURATION,
        isOwnAPIKeyEnabled: true,
      } as never)
    ).toEqual({
      provider: 'openai',
      model: 'gpt-5-mini',
      apiKey: 'sk-own-key',
    });
  });

  it('treats a missing switch as enabled', () => {
    expect(resolveProjectAIOptions(AI_CONFIGURATION as never)?.apiKey).toBe(
      'sk-own-key'
    );
  });

  it('drops the project configuration when the own key is disabled', () => {
    expect(
      resolveProjectAIOptions({
        ...AI_CONFIGURATION,
        isOwnAPIKeyEnabled: false,
      } as never)
    ).toBeUndefined();
  });

  it('keeps the own key on self-hosted instances even when disabled', () => {
    vi.stubEnv('SELF_HOSTED', 'true');

    expect(
      resolveProjectAIOptions({
        ...AI_CONFIGURATION,
        isOwnAPIKeyEnabled: false,
      } as never)?.apiKey
    ).toBe('sk-own-key');
  });
});
