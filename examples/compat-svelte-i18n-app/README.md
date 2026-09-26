# svelte-i18n → Intlayer (compat example)

A Vite + Svelte 5 app written with the **svelte-i18n** API (`$_`, `$json`,
`$date`, `$number`, `locale`, `locales`, `init`), running on Intlayer through
[`@intlayer/svelte-i18n`](../../compat/svelte-i18n).

## How it works

- `vite.config.ts` registers `svelteI18nVitePlugin()`, which aliases
  `svelte-i18n` to `@intlayer/svelte-i18n` and adds the Intlayer Vite plugin.
- The message files stay in `src/locales/{locale}/{namespace}.json`. The
  `syncJSON` plugin (`intlayer.config.ts`) turns each file into a dictionary:
  `$_('home.title')` reads the `title` field of the `home` dictionary.
- `src/lib/i18n.ts` keeps the usual `init()` call. No `register()` or
  `addMessages()` is needed: messages come from the compiled dictionaries.
- The `locale` store is shared with `svelte-intlayer`, so `useIntlayer` can be
  adopted component by component.

## Scripts

```sh
bun run dev      # vite dev server
bun run build    # production build (optimize, minify, purge)
bun run preview  # serve the build
bun run check    # svelte-check + tsc
```
