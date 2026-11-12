import { describe, expect, it } from 'vitest';
import { getEditorFrameHtml, getEditorStatusHtml } from './getEditorPanelHtml';

const EDITOR_URL = 'http://localhost:8000';

describe('getEditorStatusHtml', () => {
  it('explains how to enable a disabled editor', () => {
    const html = getEditorStatusHtml(EDITOR_URL, 'disabled');

    expect(html).toContain('The visual editor is disabled for this project');
    expect(html).toContain("enabled: process.env.NODE_ENV !== 'production'");
    expect(html).toContain('data-action="openConfiguration"');
    expect(html).toContain('data-action="openDocumentation"');
  });

  it('shows the escaped server output when the start failed', () => {
    const html = getEditorStatusHtml(EDITOR_URL, 'failed', [
      'Error: <port> in use',
    ]);

    expect(html).toContain('Error: &lt;port&gt; in use');
    expect(html).toContain('data-action="retry"');
  });

  it('offers no retry while starting', () => {
    const html = getEditorStatusHtml(EDITOR_URL, 'starting');

    expect(html).not.toContain('data-action="retry"');
    expect(html).toContain('data-action="showLogs"');
    expect(html).toContain('class="spinner"');
    expect(html).toContain('<pre class="output" hidden></pre>');
    expect(html).toContain("'startingOutput'");
  });

  it('shows no spinner once the start failed', () => {
    const html = getEditorStatusHtml(EDITOR_URL, 'failed');

    expect(html).not.toContain('class="spinner"');
  });
});

describe('getEditorFrameHtml', () => {
  it('only allows framing the editor origin', () => {
    const html = getEditorFrameHtml('http://localhost:8000/some/path');

    expect(html).toContain('frame-src http://localhost:8000;');
    expect(html).toContain('const editorOrigin = "http://localhost:8000"');
  });

  it('frames the editor with its browser bar enabled', () => {
    const html = getEditorFrameHtml('http://localhost:8000/some/path?a=1');

    expect(html).toContain(
      'src="http://localhost:8000/some/path?a=1&amp;browser=true"'
    );
  });

  it('zooms the editor out to 80%, filling the pane', () => {
    const html = getEditorFrameHtml(EDITOR_URL);

    expect(html).toContain('width: 125%; height: 125%;');
    expect(html).toContain('transform: scale(0.8);');
  });

  it('passes the IDE theme to the editor and relays its changes', () => {
    const html = getEditorFrameHtml(EDITOR_URL, undefined, 'dark');

    expect(html).toContain('browser=true&amp;theme=dark"');
    expect(html).toContain('INTLAYER_HOST_THEME_CHANGED');
  });

  it('offers to start the application, hidden until it is stopped', () => {
    const html = getEditorFrameHtml(EDITOR_URL, 'http://localhost:3000');

    expect(html).toContain('<div class="banner" hidden>');
    expect(html).toContain('not running at http://localhost:3000');
    expect(html).toContain('data-action="startApplication"');
  });
});
