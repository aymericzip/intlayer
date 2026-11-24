---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar para o Intlayer a partir de i18next, next-intl, react-intl, Lingui, vue-i18n e outros"
description: "Migre uma aplicação existente para o Intlayer sem reescrever as chamadas de tradução. Os compat adapters mantêm a API de i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n e ngx-translate."
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

# Migrar para o Intlayer a partir da sua biblioteca i18n atual

Reescrever cada chamada de tradução de uma aplicação grande raramente é uma opção. O Intlayer oferece **compat adapters**: packages que expõem a **mesma API** da sua biblioteca i18n atual, mas servem as mensagens a partir dos dicionários do Intlayer.

## Como funciona

1. **Mantenha o seu código.** As suas chamadas `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` ou `| translate` continuam como estão.
2. **Mantenha os seus arquivos de mensagens.** O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) (ou o [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md)) lê os seus arquivos existentes e escreve as traduções de volta neles.
3. **Troque o plugin do bundler.** Cada adapter inclui um plugin que faz o build dos seus dicionários e redireciona os imports da biblioteca original para o adapter. Nenhum import precisa ser alterado.

Você ganha chaves tipadas, carregamento de dicionários por página, tradução com IA pela [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md), o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) e o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md). Depois, pode passar para arquivos `.content.ts` nativos, um componente de cada vez.

> Para entender de onde vêm essas bibliotecas, leia [a história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md).

## Compat adapters disponíveis

| Biblioteca                                               | Framework  | Adapter                   | Guia de migração                                                                                                                     |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrar de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrar de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrar de next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrar de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrar de react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrar de Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrar de vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrar de @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrar de svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrar de ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_ngx-translate_to_intlayer.md) |

## Início rápido

Seja qual for a sua biblioteca, o primeiro passo é o mesmo. `intlayer init` detecta a sua biblioteca i18n atual e instala o adapter correspondente:

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

Depois, siga o guia de migração da sua biblioteca acima.

## Começando do zero?

Se a sua aplicação ainda não tem uma biblioteca i18n, ignore os adapters e comece com a API nativa:

- [Intlayer com Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)
- [Intlayer com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- [Intlayer com Vite e Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)
- [Intlayer com Vite e Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+svelte.md)
- [Intlayer com Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_angular_21.md)
