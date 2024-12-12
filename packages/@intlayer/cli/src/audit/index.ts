import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { getConfiguration, Locales } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { getContentDeclaration } from '../listContentDeclaration';

// Depending on your implementation, you may need the OpenAI API client.
// For instance, you can use `openai` npm package (https://www.npmjs.com/package/openai).

type AuditOptions = {
  files?: string[];
  logPrefix?: string;
  model?: string;
  customPrompt?: string;
  asyncLimit?: number;
  openAiApiKey?: string;
  excludedGlobs?: string[];
};

const projectPath = process.cwd();

/**
 * Reads the content of a file synchronously.
 *
 * @function
 * @param filePath - The relative or absolute path to the target file.
 * @returns The entire contents of the specified file as a UTF-8 encoded string.
 */
const getFileContent = (filePath: string): string => {
  // Read the file content using Node.js fs module.
  const fileContent = readFileSync(filePath, 'utf-8');
  return fileContent;
};

const writeFileContent = (filePath: string, content: string) => {
  writeFileSync(filePath, content);
};

const getAbsolutePath = (filePath: string): string => {
  const absolutePath = join(__dirname, filePath);

  return absolutePath;
};

const FILE_TEMPLATE: Record<string, string> = {
  ts: getFileContent(getAbsolutePath('./TS_FORMAT.md')),
  tsx: getFileContent(getAbsolutePath('./TSX_FORMAT.md')),
  js: getFileContent(getAbsolutePath('./MJS_FORMAT.md')),
  mjs: getFileContent(getAbsolutePath('./MJS_FORMAT.md')),
  cjs: getFileContent(getAbsolutePath('./CJS_FORMAT.md')),
  jsx: getFileContent(getAbsolutePath('./JSX_FORMAT.md')),
  json: getFileContent(getAbsolutePath('./JSON_FORMAT.md')),
};

// The prompt template to send to ChatGPT, requesting an audit of content declaration files.
const CHAT_GPT_PROMPT = getFileContent(getAbsolutePath('./PROMPT.md'));

/**
 * Formats a locale with its full name and returns a string representation.
 *
 * @function
 * @param locale - A locale from the project's configuration (e.g., 'en-US', 'fr-FR').
 * @returns A formatted string combining the locale's name and code. Example: "English (US): en-US".
 */
const formatLocaleWithName = (locale: Locales): string => {
  // getLocaleName returns a human-readable name for the locale.
  const localeName = getLocaleName(locale);

  // Concatenate both the readable name and the locale code.
  return `${locale}: ${localeName}`;
};

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
    const relativePath = relative(projectPath, filePath);
    console.log(`Auditing file: ${relativePath}`);

    // Extract internationalization configuration, including locales and the default locale.
    const { internationalization } = getConfiguration();
    const { defaultLocale, locales } = internationalization;

    // Optionally, you could initialize and configure the OpenAI client here, if you intend to make API calls.
    // Uncomment and configure the following lines if you have `openai` installed and want to call the API:

    const openai = new OpenAI({
      apiKey: options?.openAiApiKey,
    });

    // Read the file's content.
    const fileContent = getFileContent(filePath);
    const splitted = filePath.split('.');
    const fileExtension = splitted[splitted.length - 1];

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt =
      options?.customPrompt ??
      CHAT_GPT_PROMPT.replace('{{filePath}}', filePath)
        .replace(
          '{{defaultLocale}}',
          `{${formatLocaleWithName(defaultLocale)}}`
        )
        .replace(
          '{{otherLocales}}',
          `{${locales.map(formatLocaleWithName).join(', ')}}`
        )
        .replace(
          '{{declarationsContentTemplate}}',
          FILE_TEMPLATE[fileExtension]
        )
        .replace('{{fileContent}}', fileContent);

    // Example of how you might request a completion from ChatGPT:
    const chatCompletion = await openai.chat.completions.create({
      model: options?.model ?? 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
    });

    const newContent = chatCompletion.choices[0].message?.content;

    if (newContent) {
      writeFileContent(filePath, newContent);

      console.log(`${options?.logPrefix ?? ''}File ${relativePath} updated`);
    }

    console.log(
      `${options?.logPrefix ?? ''}${chatCompletion.usage?.total_tokens} tokens used in the request`
    );
  } catch (error) {
    console.error(error);
  }
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
  if (!options?.openAiApiKey) {
    console.error(
      'OpenAI API key is required to audit the content declaration files.'
    );
    return;
  }

  let contentDeclarationFilesList = options?.files;

  if (!contentDeclarationFilesList) {
    // Retrieve all content declaration file paths using a helper function.
    const contentDeclarationFilesPath = getContentDeclaration({
      exclude: options?.excludedGlobs,
    });

    contentDeclarationFilesList = contentDeclarationFilesPath
      .reverse()
      .slice(48);
  }

  const limit = pLimit(options?.asyncLimit ? Number(options?.asyncLimit) : 5); // Limit the number of concurrent requests
  const pushPromises = contentDeclarationFilesList.map((filePath) =>
    limit(() => auditFile(filePath, options))
  );
  await Promise.all(pushPromises);
};
