import { Hover, type HoverProvider, MarkdownString } from 'vscode';
import {
  createRenameDictionaryKeyCommandUri,
  RENAME_DICTIONARY_KEY_COMMAND,
} from '../commands/renameDictionaryKeyCommand';
import { findDictionaryKeyAtPosition } from '../utils/dictionaryKeyOccurrences';

/**
 * Hover on a dictionary key (`useIntlayer('key')`, a content file's `key`, a
 * `nest('key')`): a link renaming it everywhere. The key's content preview
 * comes from the other hover providers.
 */
export const dictionaryKeyRenameHoverProvider: HoverProvider = {
  provideHover: async (document, position) => {
    const target = await findDictionaryKeyAtPosition(document, position);

    if (!target) return null;

    const { dictionaryKey, projectDir } = target;
    const markdown = new MarkdownString(
      `[$(edit) Rename key](${createRenameDictionaryKeyCommandUri({
        dictionaryKey,
        projectDir,
      })} "Rename \`${dictionaryKey}\` in its content files and every usage, then rebuild") (Ctrl+R)`,
      true
    );

    // Only this command may run from the link
    markdown.isTrusted = { enabledCommands: [RENAME_DICTIONARY_KEY_COMMAND] };

    return new Hover(markdown, target.range);
  },
};
