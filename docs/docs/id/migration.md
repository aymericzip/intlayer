---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrasi ke Intlayer dari i18next, next-intl, react-intl, Lingui, vue-i18n, dan lainnya"
description: "Pindahkan aplikasi yang sudah ada ke Intlayer tanpa menulis ulang pemanggilan terjemahan. Compat adapter mempertahankan API i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n, dan ngx-translate."
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

# Migrasi ke Intlayer dari library i18n Anda saat ini

Menulis ulang setiap pemanggilan terjemahan di aplikasi besar jarang menjadi pilihan. Intlayer menyediakan **compat adapter**: package yang mengekspos **API yang sama** dengan library i18n Anda saat ini, tetapi menyajikan pesan dari kamus Intlayer.

## Cara kerjanya

1. **Pertahankan kode Anda.** Pemanggilan `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_`, atau `| translate` tetap seperti semula.
2. **Pertahankan file pesan Anda.** [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) (atau [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md)) membaca file Anda yang sudah ada dan menulis kembali terjemahan ke dalamnya.
3. **Ganti plugin bundler.** Setiap adapter menyertakan plugin yang mem-build kamus Anda dan mengarahkan import dari library asli ke adapter. Tidak perlu mengubah import apa pun.

Anda mendapatkan key bertipe, pemuatan kamus per halaman, terjemahan AI melalui [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md), [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), dan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md). Setelah itu Anda dapat beralih ke file `.content.ts` native, satu komponen demi satu komponen.

> Untuk memahami asal-usul library ini, baca [sejarah i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md).

## Compat adapter yang tersedia

| Library                                                  | Framework  | Adapter                   | Panduan migrasi                                                                                                                         |
| -------------------------------------------------------- | ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrasi dari i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrasi dari react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrasi dari next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrasi dari next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrasi dari react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrasi dari Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrasi dari vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrasi dari @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrasi dari svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrasi dari ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_ngx-translate_to_intlayer.md) |

## Mulai cepat

Apa pun library Anda, langkah pertamanya sama. `intlayer init` mendeteksi library i18n Anda saat ini dan menginstal adapter yang sesuai:

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

Lalu ikuti panduan migrasi untuk library Anda di atas.

## Mulai dari nol?

Jika aplikasi Anda belum memiliki library i18n, lewati adapter dan mulailah dengan API native:

- [Intlayer dengan Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)
- [Intlayer dengan Vite dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- [Intlayer dengan Vite dan Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)
- [Intlayer dengan Vite dan Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md)
- [Intlayer dengan Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md)
