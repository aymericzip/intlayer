import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { intlayerAPI } from '@intlayer/api';
import {
  getConfiguration,
  GetConfigurationOptions,
  logger,
} from '@intlayer/config';
import pLimit from 'p-limit';
import { getContentDeclaration } from './listContentDeclaration';

// Depending on your implementation, you may need the OpenAI API client.
// For instance, you can use `openai` npm package (https://www.npmjs.com/package/openai).

type AuditOptions = {
  files?: string[];
  model?: string;
  customPrompt?: string;
  asyncLimit?: number;
  openAiApiKey?: string;
  excludedGlobs?: string[];
  headers?: Record<string, string>;
  logPrefix?: string;
} & GetConfigurationOptions;

const projectPath = process.cwd();

/**
 * Audits a content declaration file by constructing a prompt for ChatGPT.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies. It prints the prompt for each file,
 * and could be adapted to send requests to the ChatGPT model.
 *
 * @async
 * @function
 * @param filePath - The relative or absolute path to the target file.
 * @param options - Optional configuration for the audit process.
 * @returns This function returns a Promise that resolves once the audit is complete.
 */
export const auditFile = async (filePath: string, options?: AuditOptions) => {
  try {
    const { defaultLocale, locales } = getConfiguration().internationalization;

    const relativePath = relative(projectPath, filePath);
    logger(`Auditing file: ${relativePath}`, {
      config: {
        prefix: options?.logPrefix,
      },
    });

    // Read the file's content.
    const fileContent = readFileSync(filePath, 'utf-8');

    // Example of how you might request a completion from ChatGPT:
    const auditFileResult = await intlayerAPI.ai.auditContentDeclaration(
      {
        fileContent,
        filePath,
        locales,
        defaultLocale,
        model: options?.model,
        openAiApiKey: options?.openAiApiKey,
        customPrompt: options?.customPrompt,
      },
      {
        headers: options?.headers,
      }
    );

    if (!auditFileResult.data) {
      throw new Error('Audit failed');
    }

    writeFileSync(filePath, auditFileResult.data.fileContent);

    logger(`File ${relativePath} updated`, {
      config: {
        prefix: options?.logPrefix,
      },
    });

    logger(`${auditFileResult.data.tokenUsed} tokens used in the request`, {
      config: {
        prefix: options?.logPrefix,
      },
    });
  } catch (error) {
    logger(error, {
      level: 'error',
      config: {
        prefix: options?.logPrefix,
      },
    });
  }
};

const getAbsolutePath = (filePath: string): string => {
  if (filePath.startsWith('.')) {
    const absolutePath = join(process.cwd(), filePath);

    return absolutePath;
  }
  return filePath;
};

/**
 * Audits the content declaration files by constructing a prompt for ChatGPT.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies. It prints the prompt for each file,
 * and could be adapted to send requests to the ChatGPT model.
 *
 * @async
 * @function
 * @param options - Optional configuration for the audit process.
 * @returns This function returns a Promise that resolves once the audit is complete.
 */
export const audit = async (options: AuditOptions) => {
  const { clientId, clientSecret } = getConfiguration(options).editor;
  let headers: Record<string, string> = {};

  if (clientId && clientSecret) {
    const oAuth2TokenResult = await intlayerAPI.auth.getOAuth2AccessToken();

    const oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;

    headers = { Authorization: `Bearer ${oAuth2AccessToken}` };
  } else if (!options?.openAiApiKey) {
    throw new Error(
      'Missing OAuth2 client ID or client secret. To get access token go to https://intlayer.org/dashboard/project. You can also provide your own OpenAI API key to audit the content declaration files. For that you need to provide the --openAiApiKey option.'
    );
  }

  let contentDeclarationFilesList = options?.files?.map(getAbsolutePath);

  if (!contentDeclarationFilesList) {
    // Retrieve all content declaration file paths using a helper function.
    const contentDeclarationFilesPath = getContentDeclaration({
      exclude: options?.excludedGlobs,
    });

    contentDeclarationFilesList = contentDeclarationFilesPath;
  }

  const limit = pLimit(options?.asyncLimit ? Number(options?.asyncLimit) : 5); // Limit the number of concurrent requests
  const pushPromises = contentDeclarationFilesList.map((filePath) =>
    limit(() => auditFile(filePath, { ...options, headers }))
  );
  await Promise.all(pushPromises);
};
