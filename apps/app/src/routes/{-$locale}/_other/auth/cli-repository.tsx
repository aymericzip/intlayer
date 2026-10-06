import { createFileRoute } from '@tanstack/react-router';
import { CliRepositoryFlow } from '#components/Auth/CliRepository/CliRepositoryFlow';
import { REPOSITORY_PROVIDERS } from '#components/Dashboard/ProjectForm/RepositoryLink/providers';
import type {
  DetectedRepository,
  RepositoryProvider,
} from '#components/Dashboard/ProjectForm/RepositoryLink/types';

/**
 * Reads a search param as a string. The router JSON-parses values, so an
 * owner such as `123` arrives as a number.
 */
const readSearchString = (value: unknown): string | undefined =>
  typeof value === 'string'
    ? value
    : typeof value === 'number'
      ? String(value)
      : undefined;

const isRepositoryProvider = (value: unknown): value is RepositoryProvider =>
  (REPOSITORY_PROVIDERS as readonly unknown[]).includes(value);

/** Repository detected by the CLI, when it sent a complete one. */
const readDetectedRepository = (
  search: Record<string, unknown>
): DetectedRepository | undefined => {
  const provider = search.repositoryProvider;
  const owner = readSearchString(search.repositoryOwner);
  const repository = readSearchString(search.repositoryName);

  if (!isRepositoryProvider(provider) || !owner || !repository) {
    return undefined;
  }

  return {
    provider,
    owner,
    repository,
    branch: readSearchString(search.repositoryBranch),
    configFilePath: readSearchString(search.repositoryConfigPath),
    instanceUrl: readSearchString(search.repositoryInstanceUrl),
  };
};

export const Route = createFileRoute('/{-$locale}/_other/auth/cli-repository')({
  validateSearch: (search: Record<string, unknown>) => ({
    port: readSearchString(search.port),
    state: readSearchString(search.state),
    detectedRepository: readDetectedRepository(search),
  }),
  component: CliRepositoryPage,
});

function CliRepositoryPage() {
  const { port, state, detectedRepository } = Route.useSearch();

  return (
    <CliRepositoryFlow
      port={port}
      state={state}
      detectedRepository={detectedRepository}
    />
  );
}
