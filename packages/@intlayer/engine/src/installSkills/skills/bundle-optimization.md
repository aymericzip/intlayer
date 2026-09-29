---
name: intlayer-bundle-optimization
description: Keeps Intlayer dictionaries small in production bundles (purge, minify, import modes). Use when the user asks to "reduce bundle size", "optimize dictionaries", fix "cannot be purged or minified" / "Opaque field" build warnings, or configure `build.optimize`, `build.purge`, `build.minify` or `importMode`.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  category: productivity
  tags: [i18n, performance, bundle]
  documentation: https://intlayer.org/doc/concept/bundle-optimization
  support: contact@intlayer.org
---

# Intlayer Bundle Optimization

[Doc](https://intlayer.org/doc/concept/bundle-optimization.md)

## Configuration

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // 'static' (default) | 'dynamic' | 'fetch'
  },
  build: {
    optimize: undefined, // auto: enabled in production builds only
    purge: true, // drop fields never read in source code
    minify: true, // rename field keys to short aliases (title → a)
    chunkGrouping: true, // dynamic mode: one dictionary chunk per split boundary
    dictionariesPreload: true, // dynamic mode: fetch content with its chunk
  },
};

export default config;
```

- `purge` and `minify` do nothing when `optimize` is `false`.
- `minify` skips key renaming while `editor.enabled` is `true`, and for `importMode: 'fetch'` dictionaries.
- `importMode: 'dynamic'` ships only the current locale's JSON; it can also be set per dictionary.

## Dictionaries Follow Their Chunk

The build optimization rewrites each `useIntlayer('key')` / `getIntlayer('key')` into a direct import of that dictionary, then empties the global dictionary registry:

- A dictionary is bundled with the component that reads it, so a lazy-loaded route only ships its own content.

With `importMode: 'dynamic'`, `vite-intlayer` adds two more build plugins (build only, not in dev):

- `intlayerChunk` (`build.chunkGrouping`, default `true`) merges the per-dictionary, per-locale chunks by the code-split boundary that uses them (`React.lazy`, split route). Each boundary loads its content in one request per locale. Dictionaries used by several boundaries go to a shared chunk.
- `intlayerPreload` (`build.dictionariesPreload`, default `true`) starts the dictionary fetch when its chunk is loaded, instead of when the component renders, so navigation does not flash a loading state.

Keep dictionaries scoped to their component or page. A dictionary read from many routes ends up in a shared chunk.

## Write Code the Analyzer Can Follow

Purge and minify rely on a static analysis of every `useIntlayer` / `getIntlayer` call. When a read cannot be followed, the build keeps the whole field or dictionary and warns:

- `Dictionary <key> cannot be purged or minified`: the content object escapes.
- `Dictionary <key> partially minified. Opaque field: '<path>'`: a field is read with a dynamic key.

### Read fields by name

```tsx
// ✅ Destructure or use dot access
const { title, description } = useIntlayer("post");
```

### Use `select()` instead of dynamic keys

```tsx
// ❌ Opaque field: 'statuses' is kept whole, keys not minified
const { statuses } = useIntlayer("post");
<p>{statuses[post.status]}</p>;

// ✅ post.content.ts: publishStatus: select({ draft: "…", published: "…" })
const { publishStatus } = useIntlayer("post");
<p>{publishStatus(post.status)}</p>;
```

Same for numbers (`enu()`), booleans (`cond()`) and genders (`gender()`).

### Call `useIntlayer` in each component

```tsx
// ❌ Passing content as a prop: the whole dictionary is kept
const Post = () => {
  const content = useIntlayer("post");
  return <PostFooter content={content} />;
};

// ✅ Each component reads its own fields; the dictionary is loaded once
const PostFooter = () => {
  const { footer } = useIntlayer("post");
  return <footer>{footer}</footer>;
};
```

### Don't let the content object escape

Spreading (`{ ...content }`), iterating (`Object.entries(content)`) or passing it to a helper (`format(content)`) keeps the whole dictionary.

## Accepted Exceptions

Some framework APIs need the content as a value, for example a TanStack Start route that loads it in `loader` and reads it in `head`:

```tsx
loader: async ({ params }) => ({
  content: await getIntlayerAsync("admin-metadata", params.locale),
}),
head: ({ loaderData }) => ({
  meta: [{ title: loaderData?.content.title }],
}),
```

The analyzer cannot follow `loaderData`, so this dictionary stays whole and the warning is expected. Keep such dictionaries dedicated and small (e.g. a `*-metadata` dictionary holding only the page metadata) so the rest of the content is still optimized.

## References

- [Bundle Optimization](https://intlayer.org/doc/concept/bundle-optimization.md)
- [Select](https://intlayer.org/doc/concept/content/select.md)
- [Configuration](https://intlayer.org/doc/concept/configuration.md)
