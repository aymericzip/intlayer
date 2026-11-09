import type { AICreditBalance } from '@intlayer/backend-contract/ai';
import { Badge } from '@intlayer/design-system/badge';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useNumber } from 'react-intlayer/format';

type AIModelUsageListProps = {
  balance: AICreditBalance;
};

/**
 * Tokens consumed this month per provider and model, the organization's own
 * AI key included. Renders nothing before the first AI call.
 */
export const AIModelUsageList: FC<AIModelUsageListProps> = ({ balance }) => {
  const { title, ownKey, intlayerKey, unknown, tokens, requests } =
    useIntlayer('ai-model-usage');
  const formatNumber = useNumber();

  if (balance.usageByModel.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-text">{title}</h4>
      <ul className="flex flex-col gap-2">
        {balance.usageByModel.map((modelUsage) => (
          <li
            key={`${modelUsage.provider}-${modelUsage.model}-${modelUsage.isOwnKey}`}
            className="flex flex-col gap-0.5 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate font-mono text-text" dir="ltr">
                {modelUsage.provider ?? unknown}
                {' / '}
                {modelUsage.model ?? unknown}
              </span>
              <Badge
                variant="outline"
                color={modelUsage.isOwnKey ? 'text' : 'neutral'}
                className="shrink-0"
              >
                {modelUsage.isOwnKey ? ownKey : intlayerKey}
              </Badge>
            </div>
            <span className="text-neutral">
              {tokens({ count: formatNumber(modelUsage.tokens) })}
              {' · '}
              {requests({ count: formatNumber(modelUsage.requestCount) })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
