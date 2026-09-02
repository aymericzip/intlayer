import { findChildren } from '@tiptap/core';
import { CodeBlock, type CodeBlockOptions } from '@tiptap/extension-code-block';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import {
  type BundledLanguage,
  type BundledTheme,
  bundledLanguages,
  bundledThemes,
  getSingletonHighlighter,
  type Highlighter,
} from '../../../IDE/shikiBundle';

export interface CodeBlockShikiOptions extends CodeBlockOptions {
  defaultLanguage: BundledLanguage | null;
  defaultTheme: BundledTheme | string;
  themes?: {
    light: BundledTheme;
    dark: BundledTheme;
  } | null;
}

const formatStyles = (styles: Record<string, string>): string =>
  Object.entries(styles)
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(';');

let sharedHighlighter: Highlighter | null = null;
const loadingLangs = new Set<string>();
const loadingThemes = new Set<string>();

const renderDecorations = ({
  doc,
  name,
  defaultLanguage,
  defaultTheme,
  themes,
  highlighter,
}: {
  doc: ProseMirrorNode;
  name: string;
  defaultLanguage?: BundledLanguage | null;
  defaultTheme: BundledTheme | string;
  themes?: { light: BundledTheme; dark: BundledTheme } | null;
  highlighter: Highlighter | null;
}): DecorationSet => {
  if (!highlighter) {
    return DecorationSet.empty;
  }

  const decorations: Decoration[] = [];
  const loadedLangs = highlighter.getLoadedLanguages();
  const loadedThemes = highlighter.getLoadedThemes();

  const resolveTheme = (themeName: string) =>
    loadedThemes.includes(themeName)
      ? themeName
      : (loadedThemes[0] ?? 'github-light');

  findChildren(doc, (node) => node.type.name === name).forEach((block) => {
    let from = block.pos + 1;
    let language = (block.node.attrs.language || defaultLanguage) as string;
    const blockTheme = (block.node.attrs.theme || defaultTheme) as string;
    const lightTheme = (block.node.attrs.themes?.light ||
      themes?.light ||
      blockTheme) as string;
    const darkTheme = (block.node.attrs.themes?.dark ||
      themes?.dark ||
      blockTheme) as string;

    if (!loadedLangs.includes(language)) {
      language = 'plaintext';
    }

    if (themes) {
      const tokensResult = highlighter.codeToTokens(block.node.textContent, {
        lang: language as BundledLanguage,
        themes: {
          light: resolveTheme(lightTheme),
          dark: resolveTheme(darkTheme),
        },
      });

      const preStyles: Record<string, string> = {};
      if (tokensResult.bg) preStyles['background-color'] = tokensResult.bg;
      if (tokensResult.fg) preStyles.color = tokensResult.fg;

      decorations.push(
        Decoration.node(block.pos, block.pos + block.node.nodeSize, {
          style: formatStyles(preStyles),
          class: 'shiki',
        })
      );

      for (const line of tokensResult.tokens) {
        for (const token of line) {
          const to = from + token.content.length;
          const style = formatStyles(
            (token.htmlStyle as Record<string, string>) || {}
          );
          decorations.push(Decoration.inline(from, to, { style }));
          from = to;
        }
        from += 1;
      }
    } else {
      const activeTheme = resolveTheme(blockTheme);
      const tokensResult = highlighter.codeToTokens(block.node.textContent, {
        lang: language as BundledLanguage,
        theme: activeTheme,
      });

      const themeObj = highlighter.getTheme(activeTheme);
      decorations.push(
        Decoration.node(block.pos, block.pos + block.node.nodeSize, {
          style: formatStyles({ 'background-color': themeObj.bg }),
          class: 'shiki',
        })
      );

      for (const line of tokensResult.tokens) {
        for (const token of line) {
          const to = from + token.content.length;
          const style = formatStyles({ color: token.color || 'inherit' });
          decorations.push(Decoration.inline(from, to, { style }));
          from = to;
        }
        from += 1;
      }
    }
  });

  return DecorationSet.create(doc, decorations);
};

const createShikiPlugin = ({
  name,
  defaultLanguage,
  defaultTheme,
  themes,
}: {
  name: string;
  defaultLanguage?: BundledLanguage | null;
  defaultTheme: BundledTheme | string;
  themes?: { light: BundledTheme; dark: BundledTheme } | null;
}) => {
  const loadMissing = async (doc: ProseMirrorNode): Promise<boolean> => {
    if (!sharedHighlighter) return false;
    const blocks = findChildren(doc, (node) => node.type.name === name);
    const loadedLangs = sharedHighlighter.getLoadedLanguages();
    const loadedThemes = sharedHighlighter.getLoadedThemes();

    const langsToLoad = new Set<string>();
    const themesToLoad = new Set<string>();

    for (const block of blocks) {
      const lang = block.node.attrs.language || defaultLanguage;
      if (
        lang &&
        !loadedLangs.includes(lang) &&
        lang in bundledLanguages &&
        !loadingLangs.has(lang)
      ) {
        langsToLoad.add(lang);
      }

      if (themes) {
        const light = block.node.attrs.themes?.light || themes.light;
        const dark = block.node.attrs.themes?.dark || themes.dark;
        if (
          light &&
          !loadedThemes.includes(light) &&
          light in bundledThemes &&
          !loadingThemes.has(light)
        ) {
          themesToLoad.add(light);
        }
        if (
          dark &&
          !loadedThemes.includes(dark) &&
          dark in bundledThemes &&
          !loadingThemes.has(dark)
        ) {
          themesToLoad.add(dark);
        }
      } else {
        const theme = block.node.attrs.theme || defaultTheme;
        if (
          theme &&
          !loadedThemes.includes(theme) &&
          theme in bundledThemes &&
          !loadingThemes.has(theme)
        ) {
          themesToLoad.add(theme);
        }
      }
    }

    if (langsToLoad.size === 0 && themesToLoad.size === 0) return false;

    for (const l of langsToLoad) {
      loadingLangs.add(l);
    }
    for (const t of themesToLoad) {
      loadingThemes.add(t);
    }

    try {
      await Promise.all([
        ...Array.from(langsToLoad).map((l) =>
          sharedHighlighter!.loadLanguage(l as BundledLanguage)
        ),
        ...Array.from(themesToLoad).map((t) =>
          sharedHighlighter!.loadTheme(t as BundledTheme)
        ),
      ]);
      return true;
    } finally {
      for (const l of langsToLoad) {
        loadingLangs.delete(l);
      }
      for (const t of themesToLoad) {
        loadingThemes.delete(t);
      }
    }
  };

  const plugin: Plugin = new Plugin({
    key: new PluginKey('shiki'),
    view(editorView) {
      let isDestroyed = false;

      const init = async () => {
        if (!sharedHighlighter) {
          sharedHighlighter = await getSingletonHighlighter();
        }
        if (isDestroyed) return;
        await loadMissing(editorView.state.doc);
        if (isDestroyed) return;
        editorView.dispatch(
          editorView.state.tr.setMeta('shikiPluginForceDecoration', true)
        );
      };

      init();

      return {
        update(view) {
          loadMissing(view.state.doc).then((hasLoadedNew) => {
            if (hasLoadedNew && !isDestroyed) {
              view.dispatch(
                view.state.tr.setMeta('shikiPluginForceDecoration', true)
              );
            }
          });
        },
        destroy() {
          isDestroyed = true;
        },
      };
    },
    state: {
      init: (_, { doc }) =>
        renderDecorations({
          doc,
          name,
          defaultLanguage,
          defaultTheme,
          themes,
          highlighter: sharedHighlighter,
        }),
      apply: (tr, decorationSet, oldState, newState) => {
        const oldHead = oldState.selection.$head.parent.type.name;
        const newHead = newState.selection.$head.parent.type.name;
        const oldBlocks = findChildren(
          oldState.doc,
          (node) => node.type.name === name
        );
        const newBlocks = findChildren(
          newState.doc,
          (node) => node.type.name === name
        );

        const docChanged =
          tr.docChanged &&
          ([oldHead, newHead].includes(name) ||
            oldBlocks.length !== newBlocks.length ||
            tr.steps.some((step) => {
              // @ts-expect-error step boundaries
              const { from, to } = step;
              return (
                from !== undefined &&
                to !== undefined &&
                oldBlocks.some(
                  (block) =>
                    block.pos >= from && block.pos + block.node.nodeSize <= to
                )
              );
            }));

        if (tr.getMeta('shikiPluginForceDecoration') || docChanged) {
          return renderDecorations({
            doc: tr.doc,
            name,
            defaultLanguage,
            defaultTheme,
            themes,
            highlighter: sharedHighlighter,
          });
        }

        return decorationSet.map(tr.mapping, tr.doc);
      },
    },
    props: {
      decorations(state) {
        return plugin.getState(state);
      },
    },
  });

  return plugin;
};

export const CodeBlockShiki = CodeBlock.extend<CodeBlockShikiOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
      defaultTheme: 'github-light',
      themes: null,
    };
  },

  // @ts-expect-error tiptap-markdown integration property
  markdownTokenName: 'code',

  parseMarkdown(rawNode: any, builder: any) {
    if (
      rawNode.raw?.startsWith('```') === false &&
      rawNode.raw?.startsWith('~~~') === false &&
      rawNode.codeBlockStyle !== 'indented'
    ) {
      return [];
    }
    return builder.createNode(
      'codeBlock',
      { language: rawNode.lang || null },
      rawNode.text ? [builder.createTextNode(rawNode.text)] : []
    );
  },

  renderMarkdown(node: any, builder: any) {
    const lang = node.attrs?.language || '';
    return node.content
      ? [`\`\`\`${lang}`, builder.renderChildren(node.content), '```'].join(
          '\n'
        )
      : `\`\`\`${lang}\n\n\`\`\``;
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      createShikiPlugin({
        name: this.name,
        defaultLanguage: this.options.defaultLanguage,
        defaultTheme: this.options.defaultTheme,
        themes: this.options.themes,
      }),
    ];
  },
});
