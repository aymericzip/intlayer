import { posix } from 'node:path';
import {
  isRenderableContentDeclarationPath,
  renderContentDeclaration,
} from '@intlayer/engine/contentDeclaration';
import type { Dictionary as LocalDictionary } from '@intlayer/types/dictionary';
import { logger } from '@logger';
import { getProviderToken } from '@services/ci.service';
import * as dictionaryService from '@services/dictionary.service';
import { getProjectById } from '@services/project.service';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import type { Types } from 'mongoose';
import type {
  Dictionary,
  DictionarySourceSync,
  DictionarySourceSyncStatus,
} from '@/types/dictionary.types';
import type { Project, RepositoryConnection } from '@/types/project.types';
import { type CommitFileChange, generateCommitMessage } from './commitMessage';
import {
  BranchMovedError,
  BranchUpdateRejectedError,
  type CommitResult,
  type GitRepositoryClient,
  getGitRepositoryClient,
  type RepositoryFile,
} from './gitRepository';

/** Only dictionaries both declared in the codebase and edited in the CMS */
export const SYNCED_DICTIONARY_LOCATION = 'hybrid';

const RECENT_COMMITS_LIMIT = 20;

/** Branch moved under us: retry from its new head this many times */
const MAX_COMMIT_ATTEMPTS = 2;

const SYNC_BRANCH_PREFIX = 'intlayer/cms-sync';

type DictionaryOutcome = {
  dictionaryId: Types.ObjectId | string;
  status: DictionarySourceSyncStatus;
  message?: string;
};

type PreparedChanges = {
  /** Files to commit (content declarations and `file()` sources) */
  files: RepositoryFile[];
  /** Content declaration changes, used to describe the commit */
  fileChanges: CommitFileChange[];
  changedDictionaryIds: string[];
  outcomes: DictionaryOutcome[];
};

/**
 * Whether CMS edits of a dictionary should be committed back to its source.
 */
export const isDictionarySourceSynced = (
  project: Pick<Project, 'repository' | 'webhooks'>,
  dictionary: Pick<Dictionary, 'location' | 'filePath'>
): boolean =>
  Boolean(
    project.repository &&
      project.webhooks?.autoCommitDictionaries &&
      dictionary.location === SYNCED_DICTIONARY_LOCATION &&
      dictionary.filePath
  );

/**
 * Directory of the intlayer config in the repository: dictionaries
 * `filePath` are relative to it.
 */
const getRepositoryBaseDir = (repository: RepositoryConnection): string => {
  const configDirectory = posix.dirname(
    repository.configFilePath.replaceAll('\\', '/')
  );

  return configDirectory === '.' ? '' : configDirectory;
};

/**
 * Resolves a path relative to the intlayer base dir to a repository path.
 * Returns `undefined` for paths escaping the repository.
 */
export const resolveRepositoryPath = (
  baseDir: string,
  relativePath: string
): string | undefined => {
  const resolvedPath = posix.normalize(
    posix.join(baseDir, relativePath.replaceAll('\\', '/'))
  );

  if (
    posix.isAbsolute(resolvedPath) ||
    resolvedPath === '..' ||
    resolvedPath.startsWith('../')
  ) {
    return undefined;
  }

  return resolvedPath;
};

/**
 * Whether the dictionary is in the environment the repository branch tracks:
 * shared dictionaries, or those of the default environment.
 */
const isInDefaultEnvironment = (
  project: Project,
  dictionary: Dictionary
): boolean => {
  if (!dictionary.environmentId) return true;

  const defaultEnvironment = project.environments?.find(
    (environment) => environment.isDefault
  );

  return (
    Boolean(defaultEnvironment) &&
    String(defaultEnvironment?.id) === String(dictionary.environmentId)
  );
};

/**
 * Keeps only what the CMS owns. Fields the CMS does not store (fill, priority,
 * custom fields…) and the `id` written by `intlayer push` are left as they
 * are in the file.
 */
const toSourceDictionary = (dictionary: Dictionary): LocalDictionary => {
  const { key, title, description, tags, content } =
    mapDictionaryToAPI(dictionary);

  return {
    key,
    content,
    ...(title && { title }),
    ...(description && { description }),
    ...(tags && tags.length > 0 && { tags }),
  } as LocalDictionary;
};

const loadDictionaries = async (
  dictionaryIds: string[]
): Promise<Dictionary[]> => {
  const results = await Promise.allSettled(
    dictionaryIds.map((dictionaryId) =>
      dictionaryService.getDictionaryById(dictionaryId)
    )
  );

  return results.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
};

/**
 * Renders the new source of every dictionary file and keeps the ones that
 * differ from the branch.
 */
const prepareChanges = async (
  repository: RepositoryConnection,
  client: GitRepositoryClient,
  dictionaries: Dictionary[]
): Promise<PreparedChanges> => {
  const baseDir = getRepositoryBaseDir(repository);
  const filesByPath = new Map<string, RepositoryFile>();
  const prepared: PreparedChanges = {
    files: [],
    fileChanges: [],
    changedDictionaryIds: [],
    outcomes: [],
  };

  for (const dictionary of dictionaries) {
    const dictionaryId = dictionary.id;
    const filePath = dictionary.filePath ?? '';
    const repositoryPath = resolveRepositoryPath(baseDir, filePath);

    if (!isRenderableContentDeclarationPath(filePath) || !repositoryPath) {
      prepared.outcomes.push({
        dictionaryId,
        status: 'unsupported',
        message: `"${filePath}" cannot be written from the CMS`,
      });
      continue;
    }

    const currentFileContent = await client.readFile(
      repositoryPath,
      repository.branch
    );

    if (currentFileContent === null) {
      prepared.outcomes.push({
        dictionaryId,
        status: 'file-not-found',
        message: `"${repositoryPath}" does not exist on "${repository.branch}"`,
      });
      continue;
    }

    const rendered = await renderContentDeclaration(
      toSourceDictionary(dictionary),
      { filePath, fileContent: currentFileContent }
    );

    if (!rendered) {
      prepared.outcomes.push({ dictionaryId, status: 'unsupported' });
      continue;
    }

    const changedFiles: RepositoryFile[] = [];

    if (rendered.fileContent !== currentFileContent) {
      changedFiles.push({
        path: repositoryPath,
        content: rendered.fileContent,
      });
      prepared.fileChanges.push({
        dictionaryKey: dictionary.key,
        path: repositoryPath,
        previousContent: currentFileContent,
        nextContent: rendered.fileContent,
      });
    }

    for (const [externalPath, externalContent] of Object.entries(
      rendered.externalFiles
    )) {
      const externalRepositoryPath = resolveRepositoryPath(
        baseDir,
        externalPath
      );

      if (!externalRepositoryPath) continue;

      const currentExternalContent = await client.readFile(
        externalRepositoryPath,
        repository.branch
      );

      if (currentExternalContent !== externalContent) {
        changedFiles.push({
          path: externalRepositoryPath,
          content: externalContent,
          isNewFile: currentExternalContent === null,
        });
      }
    }

    for (const changedFile of changedFiles) {
      filesByPath.set(changedFile.path, changedFile);
    }

    if (changedFiles.length > 0) {
      prepared.changedDictionaryIds.push(String(dictionaryId));
    } else {
      prepared.outcomes.push({ dictionaryId, status: 'up-to-date' });
    }
  }

  prepared.files = [...filesByPath.values()];

  return prepared;
};

const buildCommitBody = (dictionaryKeys: string[]): string =>
  [
    'Edited in the Intlayer CMS:',
    ...[...new Set(dictionaryKeys)].map(
      (dictionaryKey) => `- ${dictionaryKey}`
    ),
  ].join('\n');

type CommitOutcome = {
  status: 'committed' | 'pull-request';
  commit: CommitResult;
  url: string;
};

/**
 * Commits on the tracked branch. When the provider refuses (protected branch),
 * commits on a dedicated branch and opens a pull request instead.
 */
const commitChanges = async (
  client: GitRepositoryClient,
  repository: RepositoryConnection,
  files: RepositoryFile[],
  message: string
): Promise<CommitOutcome> => {
  try {
    const commit = await client.commitFiles({
      files,
      message,
      branch: repository.branch,
    });

    return { status: 'committed', commit, url: commit.url };
  } catch (error) {
    if (!(error instanceof BranchUpdateRejectedError)) throw error;

    logger.info(
      `Direct commit to "${repository.branch}" refused, opening a pull request instead`
    );

    const syncBranch = `${SYNC_BRANCH_PREFIX}-${Date.now()}`;
    const commit = await client.commitFiles({
      files,
      message,
      branch: syncBranch,
      startBranch: repository.branch,
    });
    const [subject, ...bodyLines] = message.split('\n');
    const pullRequest = await client.createPullRequest({
      sourceBranch: syncBranch,
      targetBranch: repository.branch,
      title: subject ?? message,
      description: bodyLines.join('\n').trim(),
    });

    return { status: 'pull-request', commit, url: pullRequest.url };
  }
};

const recordOutcomes = async (outcomes: DictionaryOutcome[]): Promise<void> => {
  const syncedAt = new Date();

  await Promise.all(
    outcomes.map(({ dictionaryId, status, message }) =>
      dictionaryService.setDictionariesSourceSync([dictionaryId], {
        status,
        syncedAt,
        ...(message && { message }),
      })
    )
  );
};

export type SyncDictionariesToSourceOptions = {
  projectId: string;
  dictionaryIds: string[];
  /** User whose git provider login is used when the repository has no token */
  userId?: string;
};

/**
 * Writes the CMS content of `hybrid` dictionaries back to their `.content`
 * file in the connected repository, in a single commit.
 */
export const syncDictionariesToSource = async ({
  projectId,
  dictionaryIds,
  userId,
}: SyncDictionariesToSourceOptions): Promise<void> => {
  const project: Project = await getProjectById(projectId);
  const { repository } = project;

  if (!repository || !project.webhooks?.autoCommitDictionaries) return;

  const dictionaries = (await loadDictionaries(dictionaryIds)).filter(
    (dictionary) =>
      isDictionarySourceSynced(project, dictionary) &&
      isInDefaultEnvironment(project, dictionary)
  );

  if (dictionaries.length === 0) return;

  const accessToken = await getProviderToken(project.id, repository, userId);

  if (!accessToken) {
    await recordOutcomes(
      dictionaries.map((dictionary) => ({
        dictionaryId: dictionary.id,
        status: 'error',
        message: `No ${repository.provider} token available, reconnect the repository`,
      }))
    );
    return;
  }

  const client = getGitRepositoryClient(repository, accessToken);

  for (let attempt = 1; attempt <= MAX_COMMIT_ATTEMPTS; attempt++) {
    try {
      const prepared = await prepareChanges(repository, client, dictionaries);

      await recordOutcomes(prepared.outcomes);

      if (prepared.files.length === 0) return;

      const recentSubjects = await client
        .listRecentCommitMessages(repository.branch, RECENT_COMMITS_LIMIT)
        .catch(() => [] as string[]);

      const subject = await generateCommitMessage({
        project,
        changes: prepared.fileChanges,
        recentSubjects,
      });
      const message = `${subject}\n\n${buildCommitBody(
        prepared.fileChanges.map((change) => change.dictionaryKey)
      )}`;

      const outcome = await commitChanges(
        client,
        repository,
        prepared.files,
        message
      );

      const sourceSync: DictionarySourceSync = {
        status: outcome.status,
        url: outcome.url,
        commitSha: outcome.commit.sha,
        message: subject,
        syncedAt: new Date(),
      };

      await dictionaryService.setDictionariesSourceSync(
        prepared.changedDictionaryIds,
        sourceSync
      );

      logger.info(
        `Committed ${prepared.files.length} file(s) of project ${projectId}: ${outcome.url}`
      );
      return;
    } catch (error) {
      if (error instanceof BranchMovedError && attempt < MAX_COMMIT_ATTEMPTS) {
        continue;
      }

      logger.error(
        `Failed to commit dictionaries of project ${projectId}`,
        error
      );

      await recordOutcomes(
        dictionaries.map((dictionary) => ({
          dictionaryId: dictionary.id,
          status: 'error',
          message: (error as Error).message,
        }))
      );
      return;
    }
  }
};
