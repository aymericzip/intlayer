'use client';

import { usePersistedStore } from '@intlayer/design-system/hooks';
import { Popover } from '@intlayer/design-system/popover';
import { TechLogo, TechLogoName } from '@intlayer/design-system/tech-logo';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

type SummarizeAIProps = {
  url: string;
};

type Provider = {
  name: string;
  url: string;
  icon: ReactNode;
};

const getProviders = (message: string): Provider[] => [
  {
    name: 'ChatGPT',
    url: `https://chatgpt.com/?q=${message}`,
    icon: <TechLogo name={TechLogoName.ChatGPT} className="size-4" />,
  },
  {
    name: 'Claude',
    url: `https://claude.ai/new?q=${message}`,
    icon: <TechLogo name={TechLogoName.Anthropic} className="size-4" />,
  },
  {
    name: 'DeepSeek',
    // Dont works for now as DeepSeek does not support direct search
    url: `https://chat.deepseek.com/?q=${message}`,
    icon: <TechLogo name={TechLogoName.DeepSeek} className="size-4" />,
  },
  {
    name: 'Google AI mode',
    url: `https://www.google.com/search?udm=50&aep=11&q=${message}`,
    icon: <TechLogo name={TechLogoName.GoogleAI} className="size-4" />,
  },
  {
    name: 'Gemini',
    // Dont works for now as Gemini does not support direct search
    url: `https://gemini.google.com/?q=${message}`,
    icon: <TechLogo name={TechLogoName.Gemini} className="size-4" />,
  },
  {
    name: 'Perplexity',
    url: `https://www.perplexity.ai/search/new?q=${message}`,
    icon: <TechLogo name={TechLogoName.Perplexity} className="size-4" />,
  },
  {
    name: 'Mistral',
    url: `https://chat.mistral.ai/chat/?q=${message}`,
    icon: <TechLogo name={TechLogoName.Mistral} className="size-4" />,
  },
  {
    name: 'Grok',
    url: ` https://x.com/i/grok?text=${message}`,
    icon: <TechLogo name={TechLogoName.Grok} className="size-4" />,
  },
];

export const SummarizeAI: FC<SummarizeAIProps> = ({ url }) => {
  const { title, description, summarizeLabel, summarizeMessage } =
    useIntlayer('summarize-ai');

  const message = summarizeMessage({ url: `${url}.md` });
  const providers = getProviders(message.value);

  const baseProvider = providers[0];
  const [selectedProviderName, setSelectedProviderName] = usePersistedStore<
    ReturnType<typeof getProviders>[number]['name']
  >('selected-provider', 'ChatGPT');

  const selectedProvider: Provider | undefined = providers.find(
    (provider) => provider.name === selectedProviderName
  );

  const displayedProvider = selectedProvider ?? baseProvider;

  return (
    <Popover identifier="summarize">
      <Link
        to={displayedProvider.url}
        label={summarizeLabel({ provider: displayedProvider.name }).value}
        variant="hoverable"
        color="text"
        className="flex p-2"
      >
        {displayedProvider.icon}
      </Link>
      <Popover.Detail
        identifier="summarize"
        className="flex min-w-50 flex-col gap-3 p-3 text-sm"
      >
        <strong>{title}</strong>

        {providers.map((provider) => (
          <Link
            key={provider.name}
            to={provider.url}
            label={summarizeLabel({ provider: provider.name }).value}
            variant="hoverable"
            color="text"
            className="flex flex-row items-center gap-4 p-3"
            onClick={() => setSelectedProviderName(provider.name)}
          >
            {provider.icon}
            {provider.name}
          </Link>
        ))}

        <p className="text-neutral">{description}</p>
      </Popover.Detail>
    </Popover>
  );
};
