---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Zu Intlayer migrieren von i18next, next-intl, react-intl, Lingui, vue-i18n und mehr"
description: "Migriere eine bestehende App zu Intlayer, ohne Übersetzungsaufrufe neu zu schreiben. Compat Adapter behalten die API von i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n und ngx-translate bei."
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Von deiner aktuellen i18n-Bibliothek zu Intlayer migrieren

Jeden Übersetzungsaufruf einer großen App neu zu schreiben, ist selten eine Option. Intlayer bietet **Compat Adapter**: Packages, die **dieselbe API** wie deine aktuelle i18n-Bibliothek bereitstellen, die Nachrichten aber aus Intlayer-Dictionaries liefern.

## So funktioniert es

1. **Behalte deinen Code.** Deine Aufrufe von `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` oder `| translate` bleiben unverändert.
2. **Behalte deine Nachrichtendateien.** Das [Sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) (oder das [Sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md)) liest deine bestehenden Dateien und schreibt Übersetzungen dorthin zurück.
3. **Tausche das Bundler-Plugin aus.** Jeder Adapter liefert ein Plugin, das deine Dictionaries baut und Imports der ursprünglichen Bibliothek auf den Adapter umleitet. Es sind keine Import-Änderungen nötig.

Du erhältst typisierte Keys, Dictionary-Loading pro Seite, KI-Übersetzung über die [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md), den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md). Danach kannst du Komponente für Komponente auf native `.content.ts`-Dateien umsteigen.

> Um zu verstehen, woher diese Bibliotheken kommen, lies [die Geschichte von JavaScript-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md).

## Verfügbare Compat Adapter

| Bibliothek                                               | Framework  | Adapter                   | Migrationsleitfaden                                                                                                                      |
| -------------------------------------------------------- | ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migration von i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migration von react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migration von next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migration von next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migration von react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migration von Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migration von vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migration von @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migration von svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migration von ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_ngx-translate_to_intlayer.md) |

## Schnellstart

Unabhängig von deiner Bibliothek ist der erste Schritt immer derselbe. `intlayer init` erkennt deine aktuelle i18n-Bibliothek und installiert den passenden Adapter:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Folge danach dem Migrationsleitfaden deiner Bibliothek oben.

## Du startest bei null?

Wenn deine App noch keine i18n-Bibliothek hat, überspringe die Adapter und beginne mit der nativen API:

- [Intlayer mit Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)
- [Intlayer mit Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- [Intlayer mit Vite und Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)
- [Intlayer mit Vite und Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)
- [Intlayer mit Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_angular_21.md)
