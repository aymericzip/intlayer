import type { ExtractableContent } from '@intlayer/babel';
import {
  type CancellationToken,
  type Disposable,
  EventEmitter,
  InlayHint,
  InlayHintLabelPart,
  type InlayHintsProvider,
  languages,
  type Range,
  type TextDocument,
  workspace,
} from 'vscode';
import {
  EXTRACT_CONTENT_COMMAND,
  type ExtractableContentReference,
  IGNORE_CONTENT_COMMAND,
} from '../commands/extractContentAtCommand';
import {
  onDidChangeConfiguration,
  onDidChangeDictionaries,
} from '../utils/cacheInvalidation';
import { detectDocumentContent } from '../utils/detectDocumentContent';

/** Setting turning the end-of-line extract / ignore hints on or off. */
export const EXTRACT_HINTS_SETTING = 'intlayer.extractHints.enabled';

/** Longest text quoted in a hint label when a line holds several strings. */
const LABEL_TEXT_LENGTH = 24;

const truncate = (text: string): string =>
  text.length > LABEL_TEXT_LENGTH
    ? `${text.slice(0, LABEL_TEXT_LENGTH)}…`
    : text;

/** Hint label: `Extract · Ignore`, prefixed by the text when ambiguous. */
const createHintLabel = (
  document: TextDocument,
  content: ExtractableContent,
  isLineShared: boolean
): InlayHintLabelPart[] => {
  const reference: ExtractableContentReference = {
    uri: document.uri.toString(),
    start: content.start,
    text: content.text,
  };

  const extractPart = new InlayHintLabelPart(
    isLineShared ? `Extract "${truncate(content.text)}"` : 'Extract'
  );
  extractPart.tooltip = `Move "${content.text}" to the component's content declaration file`;
  extractPart.command = {
    title: 'Extract',
    command: EXTRACT_CONTENT_COMMAND,
    arguments: [reference],
  };

  const ignorePart = new InlayHintLabelPart('Ignore');
  ignorePart.tooltip =
    'Add an `intlayer-ignore-next-line` comment: the compiler and linter skip this line';
  ignorePart.command = {
    title: 'Ignore',
    command: IGNORE_CONTENT_COMMAND,
    arguments: [reference],
  };

  return [
    new InlayHintLabelPart('⇢ '),
    extractPart,
    new InlayHintLabelPart(' · '),
    ignorePart,
  ];
};

const createProvider = (
  onDidChangeInlayHints: InlayHintsProvider['onDidChangeInlayHints']
): InlayHintsProvider => ({
  onDidChangeInlayHints,
  provideInlayHints: async (
    document: TextDocument,
    range: Range,
    token: CancellationToken
  ): Promise<InlayHint[]> => {
    if (!workspace.getConfiguration().get<boolean>(EXTRACT_HINTS_SETTING)) {
      return [];
    }

    let detected: ExtractableContent[];

    try {
      detected = await detectDocumentContent(document);
    } catch (error) {
      // Configuration being edited, unparsable file: no hints this time
      console.warn('Intlayer: extractable content detection failed', error);
      return [];
    }

    if (token.isCancellationRequested) return [];

    const contentByLine = new Map<number, ExtractableContent[]>();

    for (const content of detected) {
      const line = document.positionAt(content.ignoreOffset).line;

      if (line < range.start.line || line > range.end.line) continue;

      contentByLine.set(line, [...(contentByLine.get(line) ?? []), content]);
    }

    return [...contentByLine].flatMap(([line, lineContent]) => {
      const lineEnd = document.lineAt(line).range.end;

      return lineContent.map((content) => {
        const hint = new InlayHint(
          lineEnd,
          createHintLabel(document, content, lineContent.length > 1)
        );
        hint.paddingLeft = true;

        return hint;
      });
    });
  },
});

/** End-of-line `Extract · Ignore` hints on the hardcoded strings of components. */
export const intlayerExtractInlayHintsProvider = (): Disposable[] => {
  const changeEmitter = new EventEmitter<void>();
  const refresh = () => changeEmitter.fire();

  return [
    changeEmitter,
    languages.registerInlayHintsProvider(
      [
        { language: 'typescriptreact', scheme: 'file' },
        { language: 'javascriptreact', scheme: 'file' },
      ],
      createProvider(changeEmitter.event)
    ),
    onDidChangeConfiguration(refresh),
    onDidChangeDictionaries(refresh),
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(EXTRACT_HINTS_SETTING)) refresh();
    }),
  ];
};
