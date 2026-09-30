import { type Disposable, type TextEditor, window, workspace } from 'vscode';

/**
 * Run `update` on the active editor — debounced — when it opens, changes
 * editor, or its document is edited.
 *
 * @returns The listeners, plus a `trigger` to schedule an update on demand.
 */
export const watchActiveEditor = (
  update: (editor: TextEditor) => unknown,
  debounceDelay: number
): { disposables: Disposable[]; trigger: () => void } => {
  let timeout: NodeJS.Timeout | undefined;

  const trigger = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const activeEditor = window.activeTextEditor;

      if (activeEditor) void update(activeEditor);
    }, debounceDelay);
  };

  if (window.activeTextEditor) trigger();

  return {
    trigger,
    disposables: [
      window.onDidChangeActiveTextEditor((editor) => {
        if (editor) trigger();
      }),
      workspace.onDidChangeTextDocument((event) => {
        if (event.document === window.activeTextEditor?.document) trigger();
      }),
      { dispose: () => clearTimeout(timeout) },
    ],
  };
};
