---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar a Intlayer desde i18next, next-intl, react-intl, Lingui, vue-i18n y más"
description: "Migra una aplicación existente a Intlayer sin reescribir las llamadas de traducción. Los compat adapters mantienen la API de i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n y ngx-translate."
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

# Migrar a Intlayer desde tu librería i18n actual

Reescribir cada llamada de traducción de una aplicación grande rara vez es una opción. Intlayer ofrece **compat adapters**: packages que exponen la **misma API** que tu librería i18n actual, pero sirven los mensajes desde los diccionarios de Intlayer.

## Cómo funciona

1. **Mantén tu código.** Tus llamadas `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` o `| translate` se quedan como están.
2. **Mantén tus archivos de mensajes.** El [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) (o el [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md)) lee tus archivos existentes y vuelve a escribir las traducciones en ellos.
3. **Cambia el plugin del bundler.** Cada adapter incluye un plugin que hace el build de tus diccionarios y redirige los imports de la librería original hacia el adapter. No hace falta cambiar ningún import.

Obtienes claves tipadas, carga de diccionarios por página, traducción con IA mediante la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md), el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) y el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md). Después puedes pasar a archivos `.content.ts` nativos, un componente a la vez.

> Para entender de dónde vienen estas librerías, lee [la historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md).

## Compat adapters disponibles

| Librería                                                 | Framework  | Adapter                   | Guía de migración                                                                                                                       |
| -------------------------------------------------------- | ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrar desde i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrar desde react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrar desde next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrar desde next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrar desde react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrar desde Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrar desde vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrar desde @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrar desde svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrar desde ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_ngx-translate_to_intlayer.md) |

## Inicio rápido

Sea cual sea tu librería, el primer paso es el mismo. `intlayer init` detecta tu librería i18n actual e instala el adapter correspondiente:

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

Después sigue la guía de migración de tu librería más arriba.

## ¿Empiezas desde cero?

Si tu aplicación todavía no tiene librería i18n, sáltate los adapters y empieza con la API nativa:

- [Intlayer con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)
- [Intlayer con Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- [Intlayer con Vite y Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)
- [Intlayer con Vite y Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md)
- [Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md)
