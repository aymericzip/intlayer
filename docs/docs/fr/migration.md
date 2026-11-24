---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrer vers Intlayer depuis i18next, next-intl, react-intl, Lingui, vue-i18n et plus"
description: "Migrez une application existante vers Intlayer sans réécrire vos appels de traduction. Les compat adapters conservent l'API de i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n et ngx-translate."
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

# Migrer vers Intlayer depuis votre bibliothèque i18n actuelle

Réécrire chaque appel de traduction d'une grosse application est rarement envisageable. Intlayer fournit des **compat adapters** : des packages qui exposent la **même API** que votre bibliothèque i18n actuelle, mais qui servent les messages depuis les dictionnaires Intlayer.

## Comment ça marche

1. **Gardez votre code.** Vos appels `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` ou `| translate` restent tels quels.
2. **Gardez vos fichiers de messages.** Le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) (ou le [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md)) lit vos fichiers existants et y réécrit les traductions.
3. **Remplacez le plugin du bundler.** Chaque adapter fournit un plugin qui build vos dictionnaires et redirige les imports de la bibliothèque d'origine vers l'adapter. Aucun import à modifier.

Vous obtenez des clés typées, un chargement des dictionnaires par page, la traduction par IA via la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md), l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md). Vous pouvez ensuite passer aux fichiers `.content.ts` natifs, un composant à la fois.

> Pour comprendre d'où viennent ces bibliothèques, lisez [l'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md).

## Compat adapters disponibles

| Bibliothèque                                             | Framework  | Adapter                   | Guide de migration                                                                                                                       |
| -------------------------------------------------------- | ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrer depuis i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrer depuis react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrer depuis next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrer depuis next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrer depuis react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrer depuis Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrer depuis vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrer depuis @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrer depuis svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrer depuis ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_ngx-translate_to_intlayer.md) |

## Démarrage rapide

Quelle que soit votre bibliothèque, la première étape est la même. `intlayer init` détecte votre bibliothèque i18n actuelle et installe l'adapter correspondant :

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

Suivez ensuite le guide de migration de votre bibliothèque ci-dessus.

## Vous partez de zéro ?

Si votre application n'a pas encore de bibliothèque i18n, ignorez les adapters et commencez avec l'API native :

- [Intlayer avec Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)
- [Intlayer avec Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md)
- [Intlayer avec Vite et Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+vue.md)
- [Intlayer avec Vite et Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+svelte.md)
- [Intlayer avec Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_angular_21.md)
