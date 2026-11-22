import { type FC, useLayoutEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ConfigImportFlow } from '../Config/ConfigImportFlow';
import { REPOSITORY_PROVIDERS } from '../RepositoryLink/providers';
import { ProviderSelector } from '../RepositoryLink/ProviderSelector';
import type { RepositoryProvider } from '../RepositoryLink/types';

type GitImportPromptProps = {
  /** `create`: no project yet, the import creates it. `connect`: link the active project. */
  mode: 'create' | 'connect';
};

/**
 * Provider picker opening the repository import: pick a repository, its
 * `intlayer.config` is detected and loaded (creating the project if needed).
 */
export const GitImportPrompt: FC<GitImportPromptProps> = ({ mode }) => {
  const content = useIntlayer('git-import-prompt');
  const [importProvider, setImportProvider] =
    useState<RepositoryProvider | null>(null);

  // Back from the provider OAuth consent (`?github_linked=true`): reopen the
  // import. Layout effect so it reads the flag before the flow strips it.
  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const linkedProvider = REPOSITORY_PROVIDERS.find((provider) =>
      searchParams.has(`${provider}_linked`)
    );

    // oxlint-disable-next-line react/set-state-in-effect -- reads the URL once on mount (client only)
    if (linkedProvider) setImportProvider(linkedProvider);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <strong className="text-base">{content[mode].title}</strong>
        <span className="text-sm text-neutral">
          {content[mode].description}
        </span>
      </div>

      <ProviderSelector
        selectedProvider={importProvider}
        onSelectProvider={setImportProvider}
        isCheckingProvider={false}
      />

      <ConfigImportFlow
        isOpen={importProvider !== null}
        initialProvider={importProvider}
        onClose={() => setImportProvider(null)}
      />
    </div>
  );
};
