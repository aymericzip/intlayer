import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  convertMessage,
  evaluateMessagePreview,
  parseTestVariables,
} from '../MessageConverterPage/converterUtils';
import type { FormatterDialect } from './types';
import { validateMessageSyntax } from './validation';

/** `vue-i18n` → `VueI18n`, for camelCase tool names. */
const DIALECT_TOOL_SEGMENTS: Record<FormatterDialect, string> = {
  intlayer: 'Intlayer',
  icu: 'Icu',
  i18next: 'I18next',
  'vue-i18n': 'VueI18n',
  po: 'Po',
};

const DIALECT_LABELS: Record<FormatterDialect, string> = {
  intlayer: 'Intlayer',
  icu: 'ICU MessageFormat',
  i18next: 'i18next',
  'vue-i18n': 'Vue I18n',
  po: 'Gettext PO',
};

/** Test variable values as the agent may send them. */
export type FormatterVariableValue = string | number | boolean;

type FormatMessageInput = {
  message: string;
  variables?: Record<string, FormatterVariableValue>;
  locale?: string;
};

type FormatterEditorState = {
  messageContent: string;
  testVariables: Record<string, string>;
  testLocale: LocalesValues;
};

type UseFormatterWebMCPToolsOptions = FormatterEditorState & {
  dialect: FormatterDialect;
  /** Pushes an agent-provided message into the editor so the user sees it. */
  applyMessage: (
    message: string,
    variables: Record<string, string>,
    locale?: LocalesValues
  ) => void;
};

const toTestVariables = (
  variables: Record<string, FormatterVariableValue>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [key, String(value)])
  );

/** What the page shows for a message: validation, rendering and Intlayer output. */
const describeMessage = (
  dialect: FormatterDialect,
  { messageContent, testVariables, testLocale }: FormatterEditorState
) => {
  const validation = validateMessageSyntax(messageContent, dialect);
  const preview = messageContent.trim()
    ? evaluateMessagePreview(
        messageContent,
        parseTestVariables(testVariables),
        testLocale,
        dialect
      )
    : '';
  const intlayerConversion = convertMessage(
    messageContent,
    dialect,
    'intlayer'
  );

  return {
    dialect,
    message: messageContent,
    variables: testVariables,
    locale: testLocale,
    isValid: validation.isValid,
    errorMessage: validation.errorMessage,
    warningMessage: validation.warningMessage,
    preview,
    intlayerContentDeclaration: intlayerConversion.contentDeclaration,
    intlayerConversionError: intlayerConversion.error,
  };
};

/**
 * WebMCP tools of a message formatter page: one that loads a message into the
 * editor and reports how it renders, one that reads the editor back.
 */
export const useFormatterWebMCPTools = ({
  dialect,
  messageContent,
  testVariables,
  testLocale,
  applyMessage,
}: UseFormatterWebMCPToolsOptions): AnyWebMCPTool[] => {
  const label = DIALECT_LABELS[dialect];
  const toolSegment = DIALECT_TOOL_SEGMENTS[dialect];

  const formatMessage: AnyWebMCPTool = {
    name: `format${toolSegment}Message`,
    description: `Load a ${label} message into the formatter on this page, set its test variables and locale, and return the syntax validation, the rendered preview and the equivalent Intlayer content declaration.`,
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: `The ${label} message to format.`,
        },
        variables: {
          type: 'object',
          description:
            'Values for the variables the message interpolates, keyed by name.',
          additionalProperties: {
            type: ['string', 'number', 'boolean'],
          },
        },
        locale: {
          type: 'string',
          description:
            'Locale used to render plurals, numbers and dates (default: the current test locale).',
        },
      },
      required: ['message'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: ({ message, variables = {}, locale }: FormatMessageInput) => {
      const nextVariables = { ...testVariables, ...toTestVariables(variables) };
      const nextLocale = (locale as LocalesValues | undefined) ?? testLocale;

      applyMessage(message, nextVariables, locale as LocalesValues | undefined);

      return describeMessage(dialect, {
        messageContent: message,
        testVariables: nextVariables,
        testLocale: nextLocale,
      });
    },
  };

  const getFormatterState: AnyWebMCPTool = {
    name: `get${toolSegment}FormatterState`,
    description: `Read the ${label} message currently in the formatter on this page, with its test variables, locale, validation result and rendered preview.`,
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () =>
      describeMessage(dialect, { messageContent, testVariables, testLocale }),
  };

  return [formatMessage, getFormatterState];
};
