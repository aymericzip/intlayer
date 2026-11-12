import type {
  AICreditBalance,
  AICreditFeature,
} from '@intlayer/backend-contract/ai';
import { useGetAICredits } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { H3 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_AI_Usage_Path } from '@intlayer/design-system/routes';
import { BarChart3, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useNumber } from 'react-intlayer/format';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { AICreditGauge } from './AICreditGauge';
import { AIModelUsageList } from './AIModelUsageList';
import {
  AIUsageSection,
  PersonalAIUsageSection,
  useProjectOwnAIKey,
} from './AIUsageSections';

type FeatureUsageListProps = {
  balance: AICreditBalance;
};

const FeatureUsageList: FC<FeatureUsageListProps> = ({ balance }) => {
  const { breakdownTitle, noUsage, requests, features } = useIntlayer(
    'organization-ai-credits'
  );
  const formatNumber = useNumber();

  if (balance.usageByFeature.length === 0) {
    return <p className="text-sm text-neutral">{noUsage}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-text">{breakdownTitle}</h4>
      <ul className="flex flex-col gap-2">
        {balance.usageByFeature.map((featureUsage) => {
          const featureShare =
            balance.usedCredits > 0
              ? featureUsage.credits / balance.usedCredits
              : 0;

          return (
            <li key={featureUsage.feature} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-text">
                  {features[featureUsage.feature as AICreditFeature]}
                </span>
                <span className="flex items-center gap-2 text-neutral">
                  <span>
                    {requests({
                      count: formatNumber(featureUsage.requestCount),
                    })}
                  </span>
                  <span className="font-semibold text-text">
                    {formatNumber(featureUsage.credits)}
                  </span>
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
                <div
                  className="h-full min-w-1 rounded-full bg-text/60"
                  style={{ width: `${Math.round(featureShare * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * AI usage of the session organization: the plan credits (gauge, reset date,
 * per-feature breakdown) and the project's own AI key ("Personal usage").
 */
export const AICredits: FC = () => {
  const { title, ownKeyNote, usageDetailsButton } = useIntlayer(
    'organization-ai-credits'
  );
  const { planTitle } = useIntlayer('ai-usage-sections');
  const { data: aiCreditsResponse, isPending } = useGetAICredits();
  const ownAIKey = useProjectOwnAIKey();
  const formatNumber = useNumber();
  const navigate = useLocalizedNavigate();

  const balance = aiCreditsResponse?.data;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center gap-2">
        <Sparkles className="size-5" />
        <H3 className="mb-0">{title}</H3>
      </div>

      {isPending && <Loader className="mx-auto size-5" />}

      {balance?.hasCreditAllowance && (
        <AIUsageSection title={planTitle}>
          <AICreditGauge balance={balance} />

          <FeatureUsageList balance={balance} />

          <AIModelUsageList balance={balance} keyFilter="intlayer" />

          <p className="text-xs text-neutral">
            {ownKeyNote({ tokens: formatNumber(balance.tokensPerCredit) })}
          </p>

          <Button
            label={usageDetailsButton.label.value}
            color="text"
            variant="outline"
            Icon={BarChart3}
            onClick={() => navigate({ to: App_Dashboard_AI_Usage_Path })}
          >
            {usageDetailsButton.text}
          </Button>
        </AIUsageSection>
      )}

      {balance && (ownAIKey.hasOwnKey || !balance.hasCreditAllowance) && (
        <PersonalAIUsageSection
          balance={balance}
          isToggleVisible={balance.hasCreditAllowance && ownAIKey.hasOwnKey}
          ownAIKey={ownAIKey}
        />
      )}
    </div>
  );
};
