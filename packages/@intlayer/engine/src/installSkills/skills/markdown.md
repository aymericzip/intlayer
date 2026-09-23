---
name: intlayer-markdown
description: Declares and renders Markdown / rich text content with Intlayer (md(), .content.md files, MDX components, MarkdownProvider, SSR parsing). Use when the user asks to "add markdown content", "render rich text", "customize markdown components", or "render a markdown string".
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, markdown, mdx, rich-text]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Markdown

## Declaring Markdown Content

```typescript
import { file, md, t, type Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    // Explicit markdown
    intro: md("## My title \n\nLorem Ipsum"),
    // Per-locale external files
    article: t({
      en: md(file("./article.en.md")),
      fr: md(file("./article.fr.md")),
    }),
  },
} satisfies Dictionary;

export default content;
```

Other ways to declare it:

- **`.content.md` files** (since v8.10): a Markdown file with `key` (and optional `locale`) in its front-matter, e.g. `article.en.content.md`, `article.fr.content.md`.
- **Automatic detection**: set `contentAutoTransformation: true` (per dictionary or globally in `intlayer.config.ts`) and plain strings containing Markdown syntax are transformed.

## Rendering via `useIntlayer`

An `md` node renders directly as the framework's native output (JSX, VNode, HTML string). MDX is supported: component names used in the Markdown resolve against the `components` map.

```tsx
const { intro } = useIntlayer("app");

<div>{intro}</div>; // Rendered markdown
intro.use({ h1: (props) => <h1 className="title" {...props} /> }); // Local override
intro.value; // Raw markdown string
intro.metadata.title; // Parsed front-matter
```

Priority: `.use()` > global provider > default renderer.

## Global Configuration

Set default `components` and options once for the whole app:

| Framework                             | Global configuration                                                  |
| ------------------------------------- | --------------------------------------------------------------------- |
| React, Next.js, Preact, Solid, Svelte | `MarkdownProvider` from `<package>/markdown`                          |
| Vue                                   | `app.use(intlayerMarkdown, options)` from `vue-intlayer/markdown`     |
| Angular                               | `createIntlayerMarkdownProvider(options)` in `ApplicationConfig`      |
| Astro                                 | `installIntlayerMarkdown(options)` in the middleware and a `<script>` |
| Lit, Vanilla                          | `installIntlayerMarkdown()` next to `installIntlayer()`               |

## Rendering Raw Markdown Strings

For Markdown that does not come from a dictionary, use the helpers from `<package>/markdown`: `<MarkdownRenderer />`, `useMarkdownRenderer()` and `renderMarkdown()`. They accept raw strings only, not `useIntlayer` nodes.

## Performance

- **Suspense (React)**: the parser (~55kb) is loaded lazily. Wrap components rendering Markdown in a `<Suspense>` boundary, otherwise React suspends at the root.
- **SSR**: call `parseMarkdown()` on the server and pass the serializable AST to the client; every rendering helper accepts it, so the browser skips parsing.

## Options

Accepted by the global configuration and the helpers: `forceBlock`, `forceInline`, `tagfilter` (default `true`, strips dangerous HTML), `preserveFrontmatter`, `components`, `wrapper`, `renderMarkdown`.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Concepts

- [Markdown](https://intlayer.org/doc/concept/content/markdown.md)
- [HTML](https://intlayer.org/doc/concept/content/html.md)
- [File](https://intlayer.org/doc/concept/content/file.md)

### Packages

- [React Intlayer MarkdownRenderer](https://intlayer.org/doc/packages/react-intlayer/MarkdownRenderer.md)
