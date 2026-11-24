---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Di chuyển sang Intlayer từ i18next, next-intl, react-intl, Lingui, vue-i18n và nhiều thư viện khác"
description: "Chuyển một ứng dụng hiện có sang Intlayer mà không cần viết lại các lời gọi dịch. Các compat adapter giữ nguyên API của i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n và ngx-translate."
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

# Di chuyển sang Intlayer từ thư viện i18n hiện tại của bạn

Viết lại mọi lời gọi dịch của một ứng dụng lớn hiếm khi khả thi. Intlayer cung cấp các **compat adapter**: những package có **cùng API** với thư viện i18n hiện tại của bạn, nhưng phục vụ thông điệp từ các từ điển Intlayer.

## Cách hoạt động

1. **Giữ nguyên code.** Các lời gọi `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` hoặc `| translate` vẫn giữ nguyên.
2. **Giữ nguyên các file thông điệp.** [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) (hoặc [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md)) đọc các file hiện có của bạn và ghi bản dịch ngược lại vào đó.
3. **Thay plugin của bundler.** Mỗi adapter đi kèm một plugin build các từ điển của bạn và chuyển hướng import của thư viện gốc sang adapter. Không cần thay đổi import nào.

Bạn có các key được định kiểu, tải từ điển theo từng trang, dịch bằng AI qua [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md), [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md). Sau đó bạn có thể chuyển sang các file `.content.ts` gốc, từng component một.

> Để hiểu các thư viện này đến từ đâu, hãy đọc [lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md).

## Các compat adapter có sẵn

| Thư viện                                                 | Framework  | Adapter                   | Hướng dẫn di chuyển                                                                                                                     |
| -------------------------------------------------------- | ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Di chuyển từ react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Di chuyển từ next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Di chuyển từ next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Di chuyển từ react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Di chuyển từ Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Di chuyển từ vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Di chuyển từ @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Di chuyển từ svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Di chuyển từ ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_ngx-translate_to_intlayer.md) |

## Bắt đầu nhanh

Dù bạn dùng thư viện nào, bước đầu tiên đều giống nhau. `intlayer init` phát hiện thư viện i18n hiện tại và cài adapter tương ứng:

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

Sau đó hãy làm theo hướng dẫn di chuyển cho thư viện của bạn ở trên.

## Bắt đầu từ đầu?

Nếu ứng dụng của bạn chưa có thư viện i18n, hãy bỏ qua các adapter và bắt đầu với API gốc:

- [Intlayer với Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)
- [Intlayer với Vite và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- [Intlayer với Vite và Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)
- [Intlayer với Vite và Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md)
- [Intlayer với Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md)
