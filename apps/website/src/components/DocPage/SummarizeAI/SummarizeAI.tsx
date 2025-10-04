'use client';

import { Link, Popover } from '@intlayer/design-system';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { AntropicLogo } from './AntropicLogo';
import { ChatGPTLogo } from './ChatGPTLogo';
import { DeepSeekLogo } from './DeepSeekLogo';
import { GeminiLogo } from './GeminiLogo';
import { GoogleAILogo } from './GoogleAILogo';
import { GrokLogo } from './GrokLogo';
import { MistralLogo } from './MistralLogo';
import { PerplexityLogo } from './PerplexityLogo';

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
    icon: <ChatGPTLogo className="size-4" />,
  },
  {
    name: 'Claude',
    url: `https://claude.ai/new?q=${message}`,
    icon: <AntropicLogo className="size-4" />,
  },
  {
    name: 'DeepSeek',
    // Dont works for now as DeepSeek does not support direct search
    url: `https://chat.deepseek.com/?q=${message}`,
    icon: <DeepSeekLogo className="size-4" />,
  },
  {
    name: 'Google AI mode',
    url: `https://www.google.com/search?udm=50&aep=11&q=${message}`,
    icon: <GoogleAILogo className="size-4" />,
  },
  {
    name: 'Gemini',
    // Dont works for now as Gemini does not support direct search
    url: `https://gemini.google.com/?q=${message}`,
    icon: <GeminiLogo className="size-4" />,
  },
  {
    name: 'Perplexity',
    url: `https://www.perplexity.ai/search/new?q=${message}`,
    icon: <PerplexityLogo className="size-4" />,
  },
  {
    name: 'Mistral',
    url: `https://chat.mistral.ai/chat/?q=${message}`,
    icon: <MistralLogo className="size-4" />,
  },
  {
    name: 'Grok',
    url: ` https://x.com/i/grok?text=${message}`,
    icon: <GrokLogo className="size-4" />,
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
        href={displayedProvider.url}
        label={summarizeLabel({ provider: displayedProvider.name }).value}
        variant="hoverable"
        color="text"
        className="flex p-2"
      >
        {displayedProvider.icon}
      </Link>
      <Popover.Detail
        identifier="summarize"
        className="flex flex-col gap-3 p-3 min-w-50 text-sm"
      >
        <strong>{title}</strong>

        {providers.map((provider) => (
          <Link
            key={provider.name}
            href={provider.url}
            label={summarizeLabel({ provider: provider.name }).value}
            variant="hoverable"
            color="text"
            className="flex flex-row gap-4 items-center p-3"
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
