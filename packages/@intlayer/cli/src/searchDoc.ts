import { getSearchAPI } from '@intlayer/api';
import {
  colorizeKey,
  colorizeNumber,
  getAppLogger,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { logConfigDetails } from '@intlayer/engine/cli';

/** A documentation chunk returned by the search endpoint with `returnContent`. */
type SearchDocChunk = Exclude<
  NonNullable<
    Awaited<ReturnType<ReturnType<typeof getSearchAPI>['searchDoc']>>['data']
  >,
  string[]
>[number];

interface SearchDocOptions {
  query: string;
  limit?: number;
  configOptions?: GetConfigurationOptions;
}

export const searchDoc = async ({
  query,
  limit = 10,
  configOptions,
}: SearchDocOptions) => {
  const config = getConfiguration(configOptions);
  logConfigDetails(configOptions);

  const appLogger = getAppLogger(config);

  try {
    const { searchDoc } = getSearchAPI(undefined, config);
    const response = await searchDoc({
      input: query,
      limit: limit.toString(),
      returnContent: 'true',
    });

    if (!response.data || !Array.isArray(response.data)) {
      appLogger('No relevant chunks found.');
      return;
    }

    // Ranked by relevance, weighted by the `priority` front matter of each doc
    const chunks = response.data as SearchDocChunk[];

    appLogger(`Found ${colorizeNumber(chunks.length)} relevant chunks:`);

    chunks.forEach((chunk) => {
      appLogger('---');
      appLogger(`${colorizeKey('File')}: ${chunk.fileKey}`);
      appLogger(`${colorizeKey('Title')}: ${chunk.docName}`);
      appLogger(`${colorizeKey('URL')}: ${chunk.docUrl}`);
      appLogger(`${colorizeKey('Chunk')}: ${chunk.chunkNumber}`);
      if (chunk.priority !== undefined) {
        appLogger(
          `${colorizeKey('Priority')}: ${colorizeNumber(chunk.priority)}`
        );
      }
      appLogger(`${colorizeKey('Content')}:`);
      appLogger(chunk.content);
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    appLogger(`Search failed: ${errorMessage}`, { level: 'error' });
  }
};
