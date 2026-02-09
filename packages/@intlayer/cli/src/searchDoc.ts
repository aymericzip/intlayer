import { getSearchAPI } from '@intlayer/api';
import {
  colorizeKey,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';

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

    const chunks = response.data;

    appLogger(`Found ${colorizeNumber(chunks.length)} relevant chunks:`);

    chunks.forEach((chunk: any) => {
      appLogger('---');
      appLogger(`${colorizeKey('File')}: ${chunk.fileKey}`);
      appLogger(`${colorizeKey('Title')}: ${chunk.docName}`);
      appLogger(`${colorizeKey('URL')}: ${chunk.docUrl}`);
      appLogger(`${colorizeKey('Chunk')}: ${chunk.chunkNumber}`);
      appLogger(`${colorizeKey('Content')}:`);
      appLogger(chunk.content);
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    appLogger(`Search failed: ${errorMessage}`, { level: 'error' });
  }
};
