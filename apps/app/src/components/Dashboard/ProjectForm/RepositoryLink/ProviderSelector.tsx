'use client';

import { BitbucketLogo } from '@components/logos/BitbucketLogo';
import { GithubLogo } from '@components/logos/GithubLogo';
import { GitLabLogo } from '@components/logos/GitLabLogo';
import { Button, Loader } from '@intlayer/design-system';
import { GitBranch } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { cn } from '@/utils/cn';
import type { RepositoryProvider } from './types';

type ProviderSelectorProps = {
  selectedProvider: RepositoryProvider | null;
  onSelectProvider: (provider: RepositoryProvider) => void;
  isCheckingProvider: boolean;
};

export const ProviderSelector: FC<ProviderSelectorProps> = ({
  selectedProvider,
  onSelectProvider,
  isCheckingProvider,
}) => {
  const content = useIntlayer('repository-link');
  const providers: RepositoryProvider[] = ['github', 'gitlab', 'bitbucket'];

  const PROVIDER_CONFIG = {
    github: {
      name: content.providers.github.name,
      Logo: GithubLogo,
      description: content.providers.github.description,
    },
    gitlab: {
      name: content.providers.gitlab.name,
      Logo: GitLabLogo,
      description: content.providers.gitlab.description,
    },
    bitbucket: {
      name: content.providers.bitbucket.name,
      Logo: BitbucketLogo,
      description: content.providers.bitbucket.description,
    },
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-neutral text-sm">
        <GitBranch className="size-4" />
        <span>{content.selectProvider}</span>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {providers.map((provider) => {
          const config = PROVIDER_CONFIG[provider];
          const isSelected = selectedProvider === provider;
          const isLoading = isCheckingProvider && isSelected;

          return (
            <Button
              key={provider}
              variant={isSelected ? 'default' : 'outline'}
              color="text"
              onClick={() => onSelectProvider(provider)}
              disabled={isCheckingProvider}
              className="flex size-24 h-auto flex-col items-center gap-2 px-0 py-0"
              roundedSize="lg"
              label={config.name}
            >
              <Loader className="m-auto mb-2 size-8" isLoading={isLoading}>
                <config.Logo
                  className={cn(
                    'm-auto mb-2 size-8',
                    isSelected
                      ? '[&_path]:fill-text-opposite/60!'
                      : '[&_path]:fill-text/60!'
                  )}
                />
              </Loader>
              <span className="font-medium">{config.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
