---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "i18next, next-intl, react-intl, Lingui, vue-i18n ve diğerlerinden Intlayer'a geçiş"
description: "Mevcut bir uygulamayı çeviri çağrılarını yeniden yazmadan Intlayer'a taşıyın. Compat adapter'lar i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n ve ngx-translate API'sini korur."
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

# Mevcut i18n kütüphanenizden Intlayer'a geçiş

Büyük bir uygulamadaki her çeviri çağrısını yeniden yazmak nadiren mümkündür. Intlayer **compat adapter'lar** sunar: mevcut i18n kütüphanenizle **aynı API'yi** sunan, ancak mesajları Intlayer sözlüklerinden sağlayan package'lar.

## Nasıl çalışır

1. **Kodunuzu koruyun.** `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` veya `| translate` çağrılarınız olduğu gibi kalır.
2. **Mesaj dosyalarınızı koruyun.** [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) (veya [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md)) mevcut dosyalarınızı okur ve çevirileri geri yazar.
3. **Bundler plugin'ini değiştirin.** Her adapter, sözlüklerinizi build eden ve orijinal kütüphanenin import'larını adapter'a yönlendiren bir plugin ile gelir. Hiçbir import'u değiştirmeniz gerekmez.

Tipli anahtarlar, sayfa başına sözlük yükleme, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) üzerinden yapay zeka ile çeviri, [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) elde edersiniz. Ardından her seferinde bir bileşen olmak üzere yerel `.content.ts` dosyalarına geçebilirsiniz.

> Bu kütüphanelerin nereden geldiğini anlamak için [JavaScript i18n tarihini](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) okuyun.

## Mevcut compat adapter'lar

| Kütüphane                                                | Framework  | Adapter                   | Geçiş rehberi                                                                                                                     |
| -------------------------------------------------------- | ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Geçiş: i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Geçiş: react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Geçiş: next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Geçiş: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Geçiş: react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Geçiş: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Geçiş: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Geçiş: @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Geçiş: svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Geçiş: ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_ngx-translate_to_intlayer.md) |

## Hızlı başlangıç

Kütüphaneniz ne olursa olsun ilk adım aynıdır. `intlayer init` mevcut i18n kütüphanenizi algılar ve uygun adapter'ı kurar:

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

Ardından yukarıdaki listeden kütüphanenizin geçiş rehberini izleyin.

## Sıfırdan mı başlıyorsunuz?

Uygulamanızda henüz bir i18n kütüphanesi yoksa adapter'ları atlayın ve yerel API ile başlayın:

- [Next.js ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)
- [Vite ve React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- [Vite ve Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)
- [Vite ve Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)
- [Angular ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)
