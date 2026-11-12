import type { AIConfig, AIOptions } from '@intlayer/ai';
import { logger } from '@logger';
import {
  consumeAICredits,
  hasRemainingAICredits,
} from '@services/aiCredit.service';
import {
  type AICreditFeature,
  getAIModelIdentity,
  isUsingPlatformAIKey,
} from '@utils/aiCredits';
import { GenericError } from '@utils/errors';
import { isSelfHosted } from '@utils/isSelfHosted';

/** Who an AI call is recorded for, and whether it is billed in credits. */
export type AICreditMeter = {
  organizationId: string;
  projectId?: string;
  userId?: string;
  feature: AICreditFeature;
  /** `true` when the call runs on Intlayer's key and draws from the credits. */
  isBilled: boolean;
};

type IdentifiedEntity = { id: unknown } | null | undefined;

export type ResolveAICreditMeterParams = {
  organization?: IdentifiedEntity;
  project?: (IdentifiedEntity & { organizationId?: unknown }) | null;
  user?: IdentifiedEntity;
  feature: AICreditFeature;
  /** AI option sources, lowest precedence first (as passed to `getAIConfig`). */
  aiOptionSources: readonly (AIOptions | undefined)[];
};

/**
 * Self-hosted instances never lend a server-side AI key: every AI call must
 * run on the project's (or caller's) own AI configuration.
 *
 * @throws `AI_CONFIGURATION_REQUIRED` when self-hosted and no own key is set.
 */
export const assertSelfHostedAIConfiguration = (
  aiOptionSources: readonly (AIOptions | undefined)[]
): void => {
  if (isSelfHosted() && isUsingPlatformAIKey(aiOptionSources)) {
    throw new GenericError('AI_CONFIGURATION_REQUIRED');
  }
};

/**
 * Returns the meter recording an AI call, or `null` when there is no
 * organization to record it for. Self-hosted, bring-your-own-key and local
 * provider calls are recorded but not billed.
 */
export const resolveAICreditMeter = ({
  organization,
  project,
  user,
  feature,
  aiOptionSources,
}: ResolveAICreditMeterParams): AICreditMeter | null => {
  const organizationId = organization?.id ?? project?.organizationId;
  if (!organizationId) return null;

  return {
    organizationId: String(organizationId),
    projectId: project?.id ? String(project.id) : undefined,
    userId: user?.id ? String(user.id) : undefined,
    feature,
    isBilled: !isSelfHosted() && isUsingPlatformAIKey(aiOptionSources),
  };
};

/**
 * Throws `AI_CREDITS_EXHAUSTED` when the metered organization has no credit left.
 */
export const assertAICreditsAvailable = async (
  meter: AICreditMeter | null
): Promise<void> => {
  if (!meter?.isBilled) return;

  if (!(await hasRemainingAICredits(meter.organizationId))) {
    throw new GenericError('AI_CREDITS_EXHAUSTED', {
      organizationId: meter.organizationId,
    });
  }
};

/**
 * Gate to run before an AI call: enforces the self-hosted own-key rule and the
 * credit balance, then returns the meter to bill (or `null` when free).
 *
 * @throws `AI_CONFIGURATION_REQUIRED` or `AI_CREDITS_EXHAUSTED`.
 */
export const prepareAICreditMeter = async (
  params: ResolveAICreditMeterParams
): Promise<AICreditMeter | null> => {
  assertSelfHostedAIConfiguration(params.aiOptionSources);

  const meter = resolveAICreditMeter(params);
  await assertAICreditsAvailable(meter);

  return meter;
};

/**
 * Records the tokens of a completed AI call, with the provider and model it
 * ran on, and bills them when the meter is billed. Never throws: a billing
 * failure must not fail a request whose AI work is already done.
 */
export const chargeAICredits = async (
  meter: AICreditMeter | null,
  tokens: number | undefined,
  aiConfig?: Pick<AIConfig, 'model'>
): Promise<void> => {
  if (!meter || !tokens) return;

  try {
    await consumeAICredits({
      ...meter,
      ...getAIModelIdentity(aiConfig),
      tokens,
    });
  } catch (error) {
    logger.error('Failed to bill AI credits', { meter, tokens, error });
  }
};
