# ngx-translate → Intlayer (compat example)

An Angular 22 app written with the **ngx-translate** API (`TranslatePipe`,
`TranslateDirective`, `TranslateService`, `translate()` signal,
`provideTranslateService`), running on Intlayer through
[`@intlayer/ngx-translate`](../../compat/ngx-translate).

## How it works

- `angular.json` uses `@angular-builders/custom-esbuild` with
  `esbuild.plugins.ts`, which registers `ngxTranslateEsbuildPlugin()`: it
  resolves `@ngx-translate/core` to `@intlayer/ngx-translate` and adds the
  Intlayer build integration.
- `app.config.ts` keeps `provideTranslateService()`. No `TranslateHttpLoader`
  is needed: messages come from the compiled dictionaries.
- The message files stay in `src/i18n/{locale}/{namespace}.json`
  (`{{ param }}` placeholders). The `syncJSON` plugin turns each file into a
  dictionary: `'home.title' | translate` reads the `title` field of the `home`
  dictionary.
- `esbuild.plugins.ts` also contains a small `dedupe-angular` plugin. It is
  only needed inside this monorepo, where workspace packages are symlinked
  with their own `@angular/*` copies.

## Scripts

```sh
bun --bun ng serve   # dev server
bun --bun ng build   # production build (optimize, minify, purge)
```

The Angular CLI requires Node.js ≥ 22.22.3; `bun --bun` runs it with Bun.
