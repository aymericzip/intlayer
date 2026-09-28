import type {
  CancellationToken,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
} from 'vscode';
import { Uri, workspace } from 'vscode';
import type { DictionaryTreeDataProvider } from './dictionaryExplorer';

export class SearchBarViewProvider implements WebviewViewProvider {
  // 1. Accept extensionUri in constructor
  constructor(
    private readonly extensionUri: Uri,
    private readonly treeDataProvider: DictionaryTreeDataProvider
  ) {}

  resolveWebviewView(
    webviewView: WebviewView,
    _context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    const webview = webviewView.webview;
    webview.options = { enableScripts: true };

    // Resolve path relative to extension root
    // Note: Ensure your build script copies this file to the matching path in dist/
    // or adjust this path to where your assets live (e.g., "resources/searchInput.html")
    const searchInputUri = Uri.joinPath(
      this.extensionUri,
      'dist',
      'searchInput.html'
    );

    // 3. Read file asynchronously using VS Code FS
    workspace.fs.readFile(searchInputUri).then(
      (uint8Array) => {
        const htmlContent = new TextDecoder('utf-8').decode(uint8Array);

        webview.html = htmlContent.replace(
          '{{searchQuery}}',
          this.treeDataProvider.getSearchQuery().replace(/"/g, '&quot;')
        );
      },
      (error) => {
        console.error('Failed to load searchInput.html', error);
        webview.html = `<p style="color:red">Error loading search bar: ${error.message}</p>`;
      }
    );

    webview.onDidReceiveMessage((msg) => {
      if (msg?.type === 'query') {
        const v = typeof msg.value === 'string' ? msg.value : '';
        this.treeDataProvider.setSearchQuery(v);
        return;
      }
      if (msg?.type === 'refresh') {
        this.treeDataProvider.refresh();
        return;
      }
    });
  }
}
