import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/aiCredit.service', () => ({
  hasRemainingAICredits: vi.fn(async () => true),
  consumeAICredits: vi.fn(async () => {}),
}));

vi.mock('@logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import {
  consumeAICredits,
  hasRemainingAICredits,
} from '@services/aiCredit.service';
import { chargeAICredits, prepareAICreditMeter } from './aiCreditMetering';

const mockHasRemainingAICredits = hasRemainingAICredits as ReturnType<
  typeof vi.fn
>;
const mockConsumeAICredits = consumeAICredits as ReturnType<typeof vi.fn>;

const ORGANIZATION = { id: 'org-1' };
const PROJECT = { id: 'project-1', organizationId: 'org-1' };
const USER = { id: 'user-1' };

describe('prepareAICreditMeter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHasRemainingAICredits.mockResolvedValue(true);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns a meter for calls running on the platform key', async () => {
    const meter = await prepareAICreditMeter({
      organization: ORGANIZATION,
      project: PROJECT,
      user: USER,
      feature: 'chat',
      aiOptionSources: [undefined],
    });

    expect(meter).toEqual({
      organizationId: 'org-1',
      projectId: 'project-1',
      userId: 'user-1',
      feature: 'chat',
      isBilled: true,
    });
  });

  it('falls back to the project organization', async () => {
    const meter = await prepareAICreditMeter({
      project: PROJECT,
      feature: 'translation',
      aiOptionSources: [],
    });

    expect(meter?.organizationId).toBe('org-1');
  });

  it('records but does not bill calls carrying their own API key', async () => {
    const meter = await prepareAICreditMeter({
      organization: ORGANIZATION,
      feature: 'chat',
      aiOptionSources: [{ apiKey: 'sk-own-key' }],
    });

    expect(meter).toEqual({
      organizationId: 'org-1',
      projectId: undefined,
      userId: undefined,
      feature: 'chat',
      isBilled: false,
    });
    expect(mockHasRemainingAICredits).not.toHaveBeenCalled();
  });

  it('returns no meter without an organization', async () => {
    const meter = await prepareAICreditMeter({
      feature: 'chat',
      aiOptionSources: [],
    });

    expect(meter).toBeNull();
  });

  it('rejects metered calls once credits are exhausted', async () => {
    mockHasRemainingAICredits.mockResolvedValue(false);

    await expect(
      prepareAICreditMeter({
        organization: ORGANIZATION,
        feature: 'chat',
        aiOptionSources: [],
      })
    ).rejects.toMatchObject({ errorKey: 'AI_CREDITS_EXHAUSTED' });
  });

  describe('self-hosted', () => {
    beforeEach(() => {
      vi.stubEnv('SELF_HOSTED', 'true');
    });

    it('requires an own AI configuration', async () => {
      await expect(
        prepareAICreditMeter({
          organization: ORGANIZATION,
          feature: 'chat',
          aiOptionSources: [{ provider: 'openai' as never }],
        })
      ).rejects.toMatchObject({ errorKey: 'AI_CONFIGURATION_REQUIRED' });
    });

    it('never bills calls running on an own key', async () => {
      const meter = await prepareAICreditMeter({
        organization: ORGANIZATION,
        feature: 'chat',
        aiOptionSources: [{ apiKey: 'sk-own-key' }],
      });

      expect(meter?.isBilled).toBe(false);
      expect(mockHasRemainingAICredits).not.toHaveBeenCalled();
    });
  });
});

describe('chargeAICredits', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('bills the tokens of a metered call', async () => {
    await chargeAICredits(
      { organizationId: 'org-1', feature: 'chat', isBilled: true },
      1_200
    );

    expect(mockConsumeAICredits).toHaveBeenCalledWith({
      organizationId: 'org-1',
      feature: 'chat',
      isBilled: true,
      tokens: 1_200,
    });
  });

  it('records the provider and model the call ran on', async () => {
    await chargeAICredits(
      { organizationId: 'org-1', feature: 'chat', isBilled: false },
      300,
      { model: 'gpt-4o-mini' }
    );

    expect(mockConsumeAICredits).toHaveBeenCalledWith({
      organizationId: 'org-1',
      feature: 'chat',
      isBilled: false,
      model: 'gpt-4o-mini',
      tokens: 300,
    });
  });

  it('skips free calls and swallows billing failures', async () => {
    await chargeAICredits(null, 1_200);
    expect(mockConsumeAICredits).not.toHaveBeenCalled();

    mockConsumeAICredits.mockRejectedValueOnce(new Error('db down'));
    await expect(
      chargeAICredits(
        { organizationId: 'org-1', feature: 'chat', isBilled: true },
        10
      )
    ).resolves.toBeUndefined();
  });
});
