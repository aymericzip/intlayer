import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

/**
 * `renderIntlayerNode` is where the plugin hands off the Svelte component that
 * will actually render the markdown. Capturing its arguments shows whether a
 * renderer was resolved, or whether the node fell back to raw text because the
 * lazily imported chunk had not landed yet.
 */
const capturedRenderArguments: { component: unknown; value: unknown }[] =
  vi.hoisted(() => []);

vi.mock('./renderIntlayerNode', () => ({
  renderIntlayerNode: (args: { component: unknown; value: unknown }) => {
    capturedRenderArguments.push(args);

    const node = () => undefined;

    Object.defineProperty(node, 'value', { value: args.value });

    return node;
  },
}));

/**
 * Runs the markdown string plugin against a raw markdown source and reports the
 * component it selected for rendering.
 */
const resolveMarkdownRenderer = async (): Promise<unknown> => {
  const { markdownStringPlugin } = await import('./plugins');

  capturedRenderArguments.length = 0;

  markdownStringPlugin.transform!(
    'Some **bold** text',
    { dictionaryKey: 'markdown-lazy', keyPath: [] } as any,
    (() => ({})) as any
  );

  // The plugin hands over a promise so a not-yet-loaded chunk is awaited rather
  // than snapshotted as `null`.
  return await Promise.resolve(capturedRenderArguments.at(-1)?.component);
};

describe('markdown renderer lazy-loading', () => {
  it('resolves a renderer once the lazily imported chunk has landed', async () => {
    vi.resetModules();

    await import('./plugins');
    // Let the module-scope dynamic imports settle before interpreting.
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(await resolveMarkdownRenderer()).toBeTruthy();
  });

  it('resolves a renderer even when interpreted before the chunk lands', async () => {
    vi.resetModules();

    // No await here: this mirrors a dictionary read during the first synchronous
    // render pass, while the markdown chunk is still in flight.
    expect(await resolveMarkdownRenderer()).toBeTruthy();
  });
});
