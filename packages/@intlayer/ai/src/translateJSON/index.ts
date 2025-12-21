import { readAsset } from 'utils:asset';
import { getLocaleName } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';
import { generateObject } from 'ai';
import { z } from 'zod';
import { type AIConfig, type AIOptions, AIProvider } from '../aiSdk';

type Tag = {
  key: string;
  description?: string;
};

export type TranslateJSONOptions<T = JSON> = {
  entryFileContent: T;
  presetOutputContent: Partial<T>;
  dictionaryDescription?: string;
  entryLocale: Locale;
  outputLocale: Locale;
  tags?: Tag[];
  aiConfig: AIConfig;
  mode: 'complete' | 'review';
  applicationContext?: string;
};

export type TranslateJSONResultData<T = JSON> = {
  fileContent: T;
  tokenUsed: number;
};

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: 'gpt-5-mini',
};

/**
 * Format a locale with its name.
 *
 * @param locale - The locale to format.
 * @returns A string in the format "locale: name", e.g. "en: English".
 */
const formatLocaleWithName = (locale: Locale): string =>
  `${locale}: ${getLocaleName(locale, Locales.ENGLISH)}`;

/**
 * Formats tag instructions for the AI prompt.
 * Creates a string with all available tags and their descriptions.
 *
 * @param tags - The list of tags to format.
 * @returns A formatted string with tag instructions.
 */
const formatTagInstructions = (tags: Tag[]): string => {
  if (!tags || tags.length === 0) {
    return '';
  }

  // Prepare the tag instructions.
  return `Based on the dictionary content, identify specific tags from the list below that would be relevant:
  
${tags.map(({ key, description }) => `- ${key}: ${description}`).join('\n\n')}`;
};

const getModeInstructions = (mode: 'complete' | 'review'): string => {
  if (mode === 'complete') {
    return 'Mode: "Complete" - Enrich the preset content with the missing keys and values in the output locale. Do not update existing keys. Everything should be returned in the output.';
  }

  return 'Mode: "Review" - Fill missing content and review existing keys from the preset content. If a key from the entry is missing in the output, it must be translated to the target language and added. If you detect misspelled content, or content that should be reformulated, correct it. If a translation is not coherent with the desired language, translate it.';
};

const jsonToZod = (content: any): z.ZodTypeAny => {
  // Base case: content is a string (the translation target)
  if (typeof content === 'string') {
    return z.string();
  }

  // Base cases: primitives often preserved in i18n files (e.g. strict numbers/booleans)
  if (typeof content === 'number') {
    return z.number();
  }
  if (typeof content === 'boolean') {
    return z.boolean();
  }

  // Recursive case: Array
  if (Array.isArray(content)) {
    // If array is empty, we assume array of strings as default for i18n
    if (content.length === 0) {
      return z.array(z.string());
    }
    // We assume all items in the array share the structure of the first item
    return z.array(jsonToZod(content[0]));
  }

  // Recursive case: Object
  if (typeof content === 'object' && content !== null) {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const key in content) {
      shape[key] = jsonToZod(content[key]);
    }
    return z.object(shape);
  }

  // Fallback
  return z.any();
};

/**
 * TranslateJSONs a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const translateJSON = async <T>({
  entryFileContent,
  presetOutputContent,
  dictionaryDescription,
  aiConfig,
  entryLocale,
  outputLocale,
  tags,
  mode,
  applicationContext,
}: TranslateJSONOptions<T>): Promise<
  TranslateJSONResultData<T> | undefined
> => {
  const promptFile = readAsset('./PROMPT.md');

  const formattedEntryLocale = formatLocaleWithName(entryLocale);
  const formattedOutputLocale = formatLocaleWithName(outputLocale);

  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = promptFile
    .replace('{{entryLocale}}', formattedEntryLocale)
    .replace('{{outputLocale}}', formattedOutputLocale)
    .replace('{{presetOutputContent}}', JSON.stringify(presetOutputContent))
    .replace('{{dictionaryDescription}}', dictionaryDescription ?? '')
    .replace('{{applicationContext}}', applicationContext ?? '')
    .replace('{{tagsInstructions}}', formatTagInstructions(tags ?? []))
    .replace('{{modeInstructions}}', getModeInstructions(mode));

  // Use the AI SDK to generate the completion
  const { object, usage } = await generateObject({
    ...aiConfig,
    schema: jsonToZod(entryFileContent),
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        // KEY CHANGE: Explicitly repeating instructions in the user message
        content: [
          `# Translation Request`,
          `Please translate the following JSON content.`,
          `- **From:** ${formattedEntryLocale}`,
          `- **To:** ${formattedOutputLocale}`,
          ``,
          `## Entry Content:`,
          JSON.stringify(entryFileContent),
        ].join('\n'),
      },
    ],
  });

  return {
    fileContent: object as T,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
