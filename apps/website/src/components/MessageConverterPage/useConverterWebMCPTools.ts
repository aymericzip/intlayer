import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { DIALECT_OPTIONS, DIALECTS } from './constants';
import {
  convertMessage,
  evaluateMessagePreview,
  parseTestVariables,
} from './converterUtils';
import type { MessageDialect } from './types';

type VariableValue = string | number | boolean;

type ConvertMessageInput = {
  input: string;
  sourceDialect: MessageDialect;
  targetDialect: MessageDialect;
  variables?: Record<string, VariableValue>;
  locale?: string;
};

type ConverterEditorState = {
  inputContent: string;
  sourceDialect: MessageDialect;
  targetDialect: MessageDialect;
  testVariables: Record<string, string>;
  testLocale: LocalesValues;
};

type ConversionRequest = {
  input: string;
  source: MessageDialect;
  target: MessageDialect;
  variables: Record<string, string>;
  locale?: LocalesValues;
};

type UseConverterWebMCPToolsOptions = ConverterEditorState & {
  /** Pushes an agent-provided conversion into the editor so the user sees it. */
  applyConversion: (request: ConversionRequest) => void;
};

const toTestVariables = (
  variables: Record<string, VariableValue>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [key, String(value)])
  );

const isMessageDialect = (value: string): value is MessageDialect =>
  DIALECT_OPTIONS.includes(value as MessageDialect);

/** What the page shows for a conversion: output, Intlayer declarations, preview. */
const describeConversion = ({
  inputContent,
  sourceDialect,
  targetDialect,
  testVariables,
  testLocale,
}: ConverterEditorState) => {
  const conversion = convertMessage(inputContent, sourceDialect, targetDialect);
  const preview = inputContent.trim()
    ? evaluateMessagePreview(
        inputContent,
        parseTestVariables(testVariables),
        testLocale,
        sourceDialect
      )
    : '';

  return {
    input: inputContent,
    sourceDialect,
    targetDialect,
    variables: testVariables,
    locale: testLocale,
    success: conversion.success,
    error: conversion.error,
    output: conversion.output,
    intlayerContentDeclaration: conversion.contentDeclaration,
    intlayerContentJson: conversion.contentJsonDeclaration,
    preview,
  };
};

const DIALECT_SUMMARY = DIALECT_OPTIONS.map(
  (dialect) => `\`${dialect}\` (${DIALECTS[dialect].name})`
).join(', ');

/**
 * WebMCP tools of the message converter page: one that runs a conversion in
 * the editor and returns its output, one that reads the editor back.
 */
export const useConverterWebMCPTools = ({
  applyConversion,
  ...editorState
}: UseConverterWebMCPToolsOptions): AnyWebMCPTool[] => {
  const convertI18nMessage: AnyWebMCPTool = {
    name: 'convert_i18n_message',
    description: `Convert a translation message between i18n formats using the converter on this page, and return the converted output plus the equivalent Intlayer content declaration. Supported dialects: ${DIALECT_SUMMARY}.`,
    inputSchema: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          description:
            'The message to convert, in the source dialect. Gettext PO input is a JSON object with msgid / msgid_plural / msgstr.',
        },
        sourceDialect: { type: 'string', enum: DIALECT_OPTIONS },
        targetDialect: { type: 'string', enum: DIALECT_OPTIONS },
        variables: {
          type: 'object',
          description:
            'Values for the variables the message interpolates, used for the rendered preview.',
          additionalProperties: { type: ['string', 'number', 'boolean'] },
        },
        locale: {
          type: 'string',
          description:
            'Locale used to render the preview (default: the current test locale).',
        },
      },
      required: ['input', 'sourceDialect', 'targetDialect'],
      additionalProperties: false,
    },
    execute: ({
      input,
      sourceDialect,
      targetDialect,
      variables = {},
      locale,
    }: ConvertMessageInput) => {
      if (
        !isMessageDialect(sourceDialect) ||
        !isMessageDialect(targetDialect)
      ) {
        return `Unknown dialect. Use one of: ${DIALECT_OPTIONS.join(', ')}.`;
      }

      const nextVariables = {
        ...editorState.testVariables,
        ...toTestVariables(variables),
      };
      const nextLocale =
        (locale as LocalesValues | undefined) ?? editorState.testLocale;

      applyConversion({
        input,
        source: sourceDialect,
        target: targetDialect,
        variables: nextVariables,
        locale: locale as LocalesValues | undefined,
      });

      return describeConversion({
        inputContent: input,
        sourceDialect,
        targetDialect,
        testVariables: nextVariables,
        testLocale: nextLocale,
      });
    },
  };

  const getConverterState: AnyWebMCPTool = {
    name: 'get_message_converter_state',
    description:
      'Read the message currently loaded in the converter on this page, with its source and target dialects, converted output, test variables and rendered preview.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => describeConversion(editorState),
  };

  return [convertI18nMessage, getConverterState];
};
