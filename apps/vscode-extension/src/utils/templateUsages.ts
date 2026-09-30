import { collectMessageUsages, type MessageUsage } from '@intlayer/lsp/utils';

/** Single-file components whose template is blanked out of the script text. */
export const TEMPLATE_EXTENSIONS = new Set(['.vue', '.svelte']);

/**
 * A call with a string-literal first argument: `t('home.title')`,
 * `$_("home.title")`, `$t('home.title')`, `i18n.global.t('home.title')`.
 */
const TEMPLATE_CALL_PATTERN =
  /[$A-Za-z_][\w$]*(?:\.[$A-Za-z_][\w$]*)*\s*\(\s*(['"`])(?:(?!\1)[^\\\r\n])+\1/g;

/** A template call copied into the synthetic script. */
type TemplateCall = {
  /** Offset of the call in the original file. */
  originalStart: number;
  /** Offset of the copy in the synthetic script. */
  syntheticStart: number;
  length: number;
};

/**
 * Resolve the translation calls written in an SFC template
 * (`{{ t('a.b') }}`, `{$_('a.b')}`), which the script-only AST never sees.
 *
 * Every call is appended to the extracted script and the result analysed in a
 * single parse, so the script's own bindings (`const { t } = useI18n()`,
 * `import { _ } from 'svelte-i18n'`) resolve them exactly as they would calls
 * written in the script.
 *
 * @param fileContent - The whole SFC text.
 * @param scriptContent - Its script blocks, template blanked (same offsets).
 * @param range - Restrict the scan to `[start, end)` of `fileContent`.
 * @returns Usages with offsets in `fileContent`.
 */
export const collectTemplateCallUsages = (
  fileContent: string,
  scriptContent: string,
  range: { start: number; end: number } = {
    start: 0,
    end: fileContent.length,
  }
): MessageUsage[] => {
  let syntheticText = `${scriptContent}\n;`;
  const calls: TemplateCall[] = [];

  for (const match of fileContent
    .slice(range.start, range.end)
    .matchAll(TEMPLATE_CALL_PATTERN)) {
    const originalStart = range.start + match.index;

    // Calls inside a <script> block are already in the script analysis.
    if (scriptContent[originalStart] !== ' ') continue;

    calls.push({
      originalStart,
      syntheticStart: syntheticText.length,
      length: match[0].length,
    });
    syntheticText += `${match[0]});\n`;
  }

  if (calls.length === 0) return [];

  const usages: MessageUsage[] = [];

  for (const usage of collectMessageUsages(syntheticText)) {
    const call = calls.find(
      (candidate) =>
        usage.start >= candidate.syntheticStart &&
        usage.start < candidate.syntheticStart + candidate.length
    );

    if (!call) continue;

    const shift = call.originalStart - call.syntheticStart;

    usages.push({
      ...usage,
      start: usage.start + shift,
      // The appended `)` is not part of the original text.
      end: Math.min(usage.end, call.syntheticStart + call.length) + shift,
      fieldSpans: undefined,
    });
  }

  return usages;
};

/**
 * The template call usage at `offset`, scanning only the offset's line.
 */
export const findTemplateCallUsageAtOffset = (
  fileContent: string,
  scriptContent: string,
  offset: number
): MessageUsage | null => {
  const lineStart = fileContent.lastIndexOf('\n', offset - 1) + 1;
  const lineEndIndex = fileContent.indexOf('\n', offset);
  const lineEnd = lineEndIndex === -1 ? fileContent.length : lineEndIndex;

  return (
    collectTemplateCallUsages(fileContent, scriptContent, {
      start: lineStart,
      end: lineEnd,
    }).find((usage) => offset >= usage.start && offset <= usage.end) ?? null
  );
};
