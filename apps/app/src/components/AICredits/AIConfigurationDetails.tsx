import { useSession } from '@intlayer/design-system/api';
import { AiProviders } from '@intlayer/types/config';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';

/** Number of trailing key characters left visible once masked. */
const VISIBLE_KEY_SUFFIX_LENGTH = 4;

/**
 * Hides an API key behind asterisks, keeping only its last characters.
 * The session key is already masked server-side; this never shows its prefix.
 */
export const maskAPIKey = (apiKey: string): string =>
  `********${apiKey.length > 12 ? apiKey.slice(-VISIBLE_KEY_SUFFIX_LENGTH) : ''}`;

type DetailRowProps = {
  label: ReactNode;
  value: ReactNode;
};

const DetailRow: FC<DetailRowProps> = ({ label, value }) => (
  <div className="flex items-center justify-between gap-3 text-xs">
    <dt className="shrink-0 text-neutral">{label}</dt>
    <dd className="min-w-0 truncate font-mono text-text" dir="ltr">
      {value}
    </dd>
  </div>
);

/**
 * AI configuration of the session project: provider, model, masked API key
 * and, for OpenRouter, its base URL. Falls back to Intlayer's default key.
 */
export const AIConfigurationDetails: FC = () => {
  const { session } = useSession();
  const {
    title,
    provider,
    model,
    apiKey,
    baseURL,
    openRouter,
    intlayerDefault,
    defaultModel,
    notSet,
  } = useIntlayer('ai-configuration-details');

  const aiConfiguration = session?.project?.configuration?.ai;
  const isOpenRouter = aiConfiguration?.provider === AiProviders.OPENROUTER;
  const hasOwnKey = Boolean(aiConfiguration?.apiKey);

  const providerLabel = isOpenRouter
    ? openRouter
    : (aiConfiguration?.provider ?? intlayerDefault);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-text">{title}</h4>
      <dl className="flex flex-col gap-1">
        <DetailRow label={provider} value={providerLabel} />
        <DetailRow
          label={model}
          value={aiConfiguration?.model || defaultModel}
        />
        <DetailRow
          label={apiKey}
          value={hasOwnKey ? maskAPIKey(aiConfiguration?.apiKey ?? '') : notSet}
        />
        {isOpenRouter && aiConfiguration?.baseURL && (
          <DetailRow label={baseURL} value={aiConfiguration.baseURL} />
        )}
      </dl>
    </div>
  );
};
