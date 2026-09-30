import { randomUUID } from 'node:crypto';
import {
  Uri,
  type WebviewView,
  type WebviewViewProvider,
  workspace,
} from 'vscode';
import type { DictionaryTreeDataProvider } from './dictionaryExplorer';

/** Message posted by the search input webview. */
type SearchMessage = { type: 'query'; value: string };

const isSearchMessage = (message: unknown): message is SearchMessage =>
  typeof message === 'object' &&
  message !== null &&
  (message as SearchMessage).type === 'query' &&
  typeof (message as SearchMessage).value === 'string';

/** Escapes a value interpolated into an HTML attribute. */
const escapeHtmlAttribute = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Search bar filtering the dictionaries tree. */
export class SearchBarViewProvider implements WebviewViewProvider {
  constructor(
    private readonly extensionUri: Uri,
    private readonly treeDataProvider: DictionaryTreeDataProvider
  ) {}

  resolveWebviewView(webviewView: WebviewView) {
    const { webview } = webviewView;
    webview.options = { enableScripts: true };

    // Copied next to the bundle by tsdown.config.ts
    const searchInputUri = Uri.joinPath(
      this.extensionUri,
      'dist',
      'searchInput.html'
    );

    workspace.fs.readFile(searchInputUri).then(
      (fileContent) => {
        const nonce = randomUUID().replace(/-/g, '');

        webview.html = new TextDecoder('utf-8')
          .decode(fileContent)
          .replaceAll('{{nonce}}', nonce)
          .replace(
            '{{searchQuery}}',
            escapeHtmlAttribute(this.treeDataProvider.getSearchQuery())
          );
      },
      (error: Error) => {
        console.error('Failed to load searchInput.html', error);
        webview.html = `<p style="color:red">Error loading search bar: ${escapeHtmlAttribute(error.message)}</p>`;
      }
    );

    webview.onDidReceiveMessage((message: unknown) => {
      if (isSearchMessage(message)) {
        this.treeDataProvider.setSearchQuery(message.value);
      }
    });
  }
}
