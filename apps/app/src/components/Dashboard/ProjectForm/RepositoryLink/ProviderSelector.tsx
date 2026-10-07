import { Button } from '@intlayer/design-system/button';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import { ChevronDown, ChevronUp, GitBranch } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  DEFAULT_REPOSITORY_PROVIDERS,
  OTHER_REPOSITORY_PROVIDERS,
  PROVIDER_NAMES,
  ProviderLogo,
} from './providers';
import type { RepositoryProvider } from './types';

type ProviderSelectorProps = {
  selectedProvider: RepositoryProvider | null;
  onSelectProvider: (provider: RepositoryProvider) => void;
  isCheckingProvider: boolean;
  disabled?: boolean;
  /**
   * Provider of the project repository (ex: detected from the git remote by
   * the CLI). Only this one is offered until the user asks for more options.
   */
  preferredProvider?: RepositoryProvider;
};

export const ProviderSelector: FC<ProviderSelectorProps> = ({
  selectedProvider,
  onSelectProvider,
  isCheckingProvider,
  disabled,
  preferredProvider,
}) => {
  const content = useIntlayer('repository-link');
  const [isShowingAllProviders, setIsShowingAllProviders] = useState(
    Boolean(
      selectedProvider &&
        !DEFAULT_REPOSITORY_PROVIDERS.includes(
          selectedProvider as (typeof DEFAULT_REPOSITORY_PROVIDERS)[number]
        )
    )
  );

  const isFilteredToPreferred =
    Boolean(preferredProvider) && !isShowingAllProviders;
  const primaryProviders = isFilteredToPreferred
    ? [preferredProvider]
    : DEFAULT_REPOSITORY_PROVIDERS;

  const renderProviderButton = (provider: RepositoryProvider) => {
    const name = PROVIDER_NAMES[provider];
    const isSelected = selectedProvider === provider;
    const isLoading = isCheckingProvider && isSelected;

    return (
      <Button
        key={provider}
        variant={isSelected ? 'default' : 'outline'}
        color="text"
        onClick={() => onSelectProvider(provider)}
        disabled={isCheckingProvider || disabled}
        className="flex size-24 h-auto flex-col items-center gap-2 px-0 py-0"
        roundedSize="lg"
        label={name}
      >
        <Loader className="m-auto mb-2 size-8" isLoading={isLoading}>
          <ProviderLogo
            provider={provider}
            className={cn(
              'm-auto mb-2 size-8',
              isSelected
                ? '[&_path]:fill-text-opposite/60!'
                : '[&_path]:fill-text/60!'
            )}
          />
        </Loader>
        <span className="font-medium">{name}</span>
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-neutral text-sm">
        <GitBranch className="size-5" />
        <span>{content.selectProvider}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-center gap-3">
          {primaryProviders.map(renderProviderButton)}
        </div>

        {isShowingAllProviders && (
          <div className="flex flex-wrap justify-center gap-3">
            {OTHER_REPOSITORY_PROVIDERS.map(renderProviderButton)}
          </div>
        )}
      </div>

      <Button
        variant="link"
        color="text"
        size="sm"
        Icon={isShowingAllProviders ? ChevronUp : ChevronDown}
        className="mx-auto"
        label={
          isShowingAllProviders
            ? content.seeLessOptions.value
            : content.seeMoreOptions.value
        }
        onClick={() => setIsShowingAllProviders((prev) => !prev)}
      >
        {isShowingAllProviders
          ? content.seeLessOptions
          : content.seeMoreOptions}
      </Button>
    </div>
  );
};
