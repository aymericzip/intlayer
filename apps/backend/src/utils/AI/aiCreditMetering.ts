import type { AIOptions } from '@intlayer/ai';
import { logger } from '@logger';
import {
  consumeAICredits,
  hasRemainingAICredits,
} from '@services/aiCredit.service';
import { type AICreditFeature, isUsingPlatformAIKey } from '@utils/aiCredits';
import { GenericError } from '@utils/errors';
import { isSelfHosted } from '@utils/isSelfHosted';

/** Who a metered AI call is billed to. */
export type AICreditMeter = {
  organizationId: string;
  projectId?: string;
  userId?: string;
  feature: AICreditFeature;
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
 * Returns the meter to bill an AI call to, or `null` when the call is free:
 * self-hosted deployment, a bring-your-own-key / local provider, or no
 * organization to bill.
 */
export const resolveAICreditMeter = ({
  organization,
  project,
  user,
  feature,
  aiOptionSources,
}: ResolveAICreditMeterParams): AICreditMeter | null => {
  if (isSelfHosted()) return null;
  if (!isUsingPlatformAIKey(aiOptionSources)) return null;

  const organizationId = organization?.id ?? project?.organizationId;
  if (!organizationId) return null;

  return {
    organizationId: String(organizationId),
    projectId: project?.id ? String(project.id) : undefined,
    userId: user?.id ? String(user.id) : undefined,
    feature,
  };
};

/**
 * Throws `AI_CREDITS_EXHAUSTED` when the metered organization has no credit left.
 */
export const assertAICreditsAvailable = async (
  meter: AICreditMeter | null
): Promise<void> => {
  if (!meter) return;

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
 * Bills the tokens of a completed AI call. Never throws: a billing failure
 * must not fail a request whose AI work is already done.
 */
export const chargeAICredits = async (
  meter: AICreditMeter | null,
  tokens: number | undefined
): Promise<void> => {
  if (!meter || !tokens) return;

  try {
    await consumeAICredits({ ...meter, tokens });
  } catch (error) {
    logger.error('Failed to bill AI credits', { meter, tokens, error });
  }
};
