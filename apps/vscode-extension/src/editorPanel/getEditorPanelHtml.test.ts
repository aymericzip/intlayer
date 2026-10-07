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
  });
});

describe('getEditorFrameHtml', () => {
  it('only allows framing the editor origin', () => {
    const html = getEditorFrameHtml('http://localhost:8000/some/path');

    expect(html).toContain('frame-src http://localhost:8000;');
    expect(html).toContain('const editorOrigin = "http://localhost:8000"');
  });

  it('offers to start the application, hidden until it is stopped', () => {
    const html = getEditorFrameHtml(EDITOR_URL, 'http://localhost:3000');

    expect(html).toContain('<div class="banner" hidden>');
    expect(html).toContain('not running at http://localhost:3000');
    expect(html).toContain('data-action="startApplication"');
  });
});
