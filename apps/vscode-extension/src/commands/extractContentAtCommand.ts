import { dirname } from 'node:path';
import {
  detectPackageName,
  type ExtractableContent,
  extractContent,
} from '@intlayer/babel';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import {
  EndOfLine,
  Position,
  Range,
  type TextDocument,
  Uri,
  WorkspaceEdit,
  window,
  workspace,
} from 'vscode';
import { detectDocumentContent } from '../utils/detectDocumentContent';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getMinimalReplacement } from '../utils/getMinimalReplacement';
import { getCachedConfig } from '../utils/intlayerCache';

export const EXTRACT_CONTENT_COMMAND = 'intlayer.extractContentAt';
export const IGNORE_CONTENT_COMMAND = 'intlayer.ignoreContentAt';

/** Comment marking the next line as excluded from extraction. */
const IGNORE_NEXT_LINE_DIRECTIVE = 'intlayer-ignore-next-line';

/** The string a hint was created for, as passed to its commands. */
export type ExtractableContentReference = {
  uri: string;
  start: number;
  text: string;
};

/**
 * The string a hint points to, re-detected in the current document: offsets
 * shift as the user types, so the closest string with the same text wins.
 */
const locateContent = async (
  reference: ExtractableContentReference
): Promise<{
  document: TextDocument;
  content: ExtractableContent;
} | null> => {
  const document = await workspace.openTextDocument(Uri.parse(reference.uri));
  const candidates = (await detectDocumentContent(document)).filter(
    (content) => content.text === reference.text
  );

  const content = candidates.reduce<ExtractableContent | null>(
    (closest, candidate) =>
      !closest ||
      Math.abs(candidate.start - reference.start) <
        Math.abs(closest.start - reference.start)
        ? candidate
        : closest,
    null
  );

  if (!content) {
    window.showWarningMessage(
      `Intlayer: "${reference.text}" is no longer extractable in this file.`
    );
    return null;
  }

  return { document, content };
};

/**
 * Move one hardcoded string to the component's content declaration file and
 * replace it with its dictionary field. The component is edited in the
 * editor buffer (undoable); the content file is written and rebuilt.
 */
export const extractContentAtCommand = async (
  reference: ExtractableContentReference
): Promise<void> => {
  const located = await locateContent(reference);

  if (!located) return;

  const { document, content } = located;
  const filePath = document.uri.fsPath;
  const projectDir = findProjectRoot(dirname(filePath));

  if (!projectDir) return;

  const configuration = await getCachedConfig(projectDir);

  if (!configuration.compiler?.output) {
    window.showErrorMessage(
      `Intlayer: add a 'compiler.output' to your configuration to choose where extracted content is written.`
    );
    return;
  }

  const sourceText = document.getText();
  const sourceVersion = document.version;

  try {
    const result = await extractContent(
      filePath,
      detectPackageName(configuration.system.baseDir),
      {
        configuration,
        unmergedDictionaries: getUnmergedDictionaries(configuration),
        code: sourceText,
        selection: { start: content.start, end: content.end },
        // The component is edited in the buffer below, not written to disk
        declarationOnly: true,
      }
    );

    if (!result?.transformedCode) {
      window.showWarningMessage(
        `Intlayer: nothing was extracted for "${content.text}".`
      );
      return;
    }

    if (document.version !== sourceVersion) {
      window.showWarningMessage(
        `Intlayer: the file changed during the extraction. "${content.text}" was added to the content file; run the extraction again to update the component.`
      );
      return;
    }

    const replacement = getMinimalReplacement(
      sourceText,
      result.transformedCode
    );
    const edit = new WorkspaceEdit();

    edit.replace(
      document.uri,
      new Range(
        document.positionAt(replacement.start),
        document.positionAt(replacement.end)
      ),
      replacement.text
    );
    await workspace.applyEdit(edit);

    const dictionaryKeys = Object.keys(result.extractedContentMap).join(', ');

    window.setStatusBarMessage(
      `Intlayer: "${content.text}" moved to dictionary "${dictionaryKeys}"`,
      4000
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    window.showErrorMessage(`Intlayer: extraction failed — ${message}`);
  }
};

/**
 * Exclude a hardcoded string from extraction with an
 * `intlayer-ignore-next-line` comment on the line above it, in the comment
 * syntax valid there (`{/* … *\/}` among JSX children).
 */
export const ignoreContentAtCommand = async (
  reference: ExtractableContentReference
): Promise<void> => {
  const located = await locateContent(reference);

  if (!located) return;

  const { document, content } = located;
  const line = document.positionAt(content.ignoreOffset).line;
  const indentation = /^\s*/.exec(document.lineAt(line).text)?.[0] ?? '';
  const comment =
    content.ignoreCommentStyle === 'jsx'
      ? `{/* ${IGNORE_NEXT_LINE_DIRECTIVE} */}`
      : `// ${IGNORE_NEXT_LINE_DIRECTIVE}`;
  const lineBreak = document.eol === EndOfLine.CRLF ? '\r\n' : '\n';

  const edit = new WorkspaceEdit();

  edit.insert(
    document.uri,
    new Position(line, 0),
    `${indentation}${comment}${lineBreak}`
  );
  await workspace.applyEdit(edit);
};
