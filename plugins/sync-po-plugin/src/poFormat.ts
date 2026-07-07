import type { FormatCodec } from '@intlayer/engine/syncPluginKit';

const unescapePO = (str: string): string =>
  str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

const escapePO = (str: string): string =>
  str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r');

/**
 * Parse a PO file string into a flat msgid → msgstr record.
 * Skips the PO header (msgid ""), comment lines, and plural/context keywords.
 */
export const parsePO = (fileContent: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const lines = fileContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n');

  let msgid = '';
  let msgstr = '';
  let currentField: 'msgid' | 'msgstr' | null = null;

  const finalize = () => {
    if (msgid !== '') {
      result[msgid] = msgstr;
    }
    msgid = '';
    msgstr = '';
    currentField = null;
  };

  for (const line of lines) {
    // Skip all comment types (#, #., #:, #,, #|)
    if (line.startsWith('#')) continue;

    if (line.trim() === '') {
      finalize();
      continue;
    }

    const msgidMatch = line.match(/^msgid\s+"((?:[^"\\]|\\.)*)"$/);
    if (msgidMatch?.[1]) {
      // Starting a new entry — finalize the previous one first
      finalize();
      msgid = unescapePO(msgidMatch[1]);
      currentField = 'msgid';
      continue;
    }

    const msgstrMatch = line.match(/^msgstr\s+"((?:[^"\\]|\\.)*)"$/);
    if (msgstrMatch?.[1]) {
      msgstr = unescapePO(msgstrMatch[1]);
      currentField = 'msgstr';
      continue;
    }

    // Continuation line: `"..."` appends to the current keyword's value
    const contMatch = line.match(/^"((?:[^"\\]|\\.)*)"$/);
    if (contMatch?.[1]) {
      if (currentField === 'msgid') {
        msgid += unescapePO(contMatch[1]);
      } else if (currentField === 'msgstr') {
        msgstr += unescapePO(contMatch[1]);
      }
      continue;
    }

    // Other keywords (msgid_plural, msgstr[n], msgctxt) — not supported; reset field
    currentField = null;
  }

  // Finalize the last entry in the file (no trailing blank line needed)
  finalize();

  return result;
};

/**
 * Serialize a flat key → value record to PO file format.
 * Non-string values are silently skipped.
 */
export const serializePO = (
  content: Record<string, unknown>,
  locale?: string
): string => {
  const lines: string[] = [];

  // PO header entry
  lines.push('msgid ""');
  lines.push('msgstr ""');
  lines.push('"Content-Type: text/plain; charset=UTF-8\\n"');
  lines.push('"Content-Transfer-Encoding: 8bit\\n"');
  if (locale) {
    lines.push(`"Language: ${locale}\\n"`);
  }
  lines.push('"MIME-Version: 1.0\\n"');
  lines.push('');

  for (const [msgid, msgstr] of Object.entries(content)) {
    if (typeof msgstr !== 'string') continue;

    lines.push(`msgid "${escapePO(msgid)}"`);
    lines.push(`msgstr "${escapePO(msgstr)}"`);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
};

/**
 * PO payload codec bridging {@link parsePO} / {@link serializePO} to the
 * sync-plugin kit.
 */
export const poCodec: FormatCodec = {
  parse: parsePO,
  serialize: (content, { locale }) => serializePO(content, locale),
};
