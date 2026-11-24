---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Di chuyển từ svelte-i18n sang Intlayer"
description: "Di chuyển ứng dụng Svelte hoặc SvelteKit từ svelte-i18n sang Intlayer từng bước. Giữ cho các store $_, $date và $number tiếp tục hoạt động với compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Di chuyển từ svelte-i18n sang Intlayer

## Tại sao nên chuyển từ svelte-i18n sang Intlayer?

<AccordionGroup>
<Accordion header="Kích thước bundle">

svelte-i18n đăng ký toàn bộ file locale khi khởi động. Intlayer chỉ gửi các từ điển mà mỗi trang sử dụng, giúp **giảm kích thước bundle và trang tới 50%**.

</Accordion>
<Accordion header="Khả năng bảo trì">

Các key **được định kiểu** theo từ điển của bạn: key không hợp lệ sẽ lỗi khi build. Nội dung có thể đặt cạnh các component sử dụng nó.

</Accordion>
<Accordion header="AI Agent">

Nội dung đặt cạnh component **giảm ngữ cảnh cần thiết** cho LLM. Intlayer cung cấp **CLI** để kiểm tra bản dịch còn thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**.

</Accordion>
<Accordion header="Tự động hóa">

Dịch các thông điệp còn thiếu trong pipeline CI/CD bằng LLM bạn chọn, hoặc chạy nền với [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

</Accordion>
<Accordion header="Mở rộng cùng người không phải lập trình viên">

Intlayer cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)** tự host và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để người dịch và copywriter chỉnh sửa nội dung theo thời gian thực.

</Accordion>
</AccordionGroup>

> Để hiểu các thư viện này đến từ đâu, hãy đọc [lịch sử i18n trong JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md).

## Chiến lược di chuyển

1. **Compat adapter (khuyến nghị cho ứng dụng hiện có)**: cài `@intlayer/svelte-i18n`. Package này cung cấp cùng API với `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) và phục vụ thông điệp từ các từ điển Intlayer. ICU MessageFormat hoạt động như trước.
2. **Di chuyển hoàn toàn**: thay dần các store svelte-i18n bằng `useIntlayer` từ `svelte-intlayer` và các file `.content.ts` đặt cạnh component.

## Mục lục

<TOC/>

## Di chuyển nhanh

<Steps>
<Step number={1} title="Cài đặt dependency">

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

> Flag `--interactive` là tùy chọn. Hãy dùng `intlayer-cli init` nếu bạn là AI agent.

Lệnh này phát hiện môi trường của bạn và cài các package cần thiết, ví dụ:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Giữ `svelte-i18n` đã cài: nó cung cấp kiểu TypeScript.

</Step>
<Step number={2} title="Cấu hình Intlayer">

Trỏ plugin `syncJSON` tới các file thông điệp hiện có. Với một file cho mỗi namespace (`src/locales/en/home.json`), mỗi file trở thành một từ điển:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` được phân giải thành trường `title` của từ điển `home`. Nếu bạn dùng một file cho mỗi locale (`src/locales/en.json`) với các namespace lồng nhau, hãy dùng `source: ({ locale }) => \`./src/locales/${locale}.json\`` thay thế: mỗi key cấp cao nhất trở thành một từ điển.

</Step>
<Step number={3} title="Thêm plugin Vite">

`svelteI18nVitePlugin()` chạy build Intlayer và tạo alias `svelte-i18n` sang `@intlayer/svelte-i18n`, không cần thay đổi file nguồn.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Với SvelteKit, hãy thêm `svelteI18nVitePlugin()` sau `sveltekit()` trong cùng mảng `plugins`.

</Step>
<Step number={4} title="Đơn giản hóa thiết lập i18n">

Giữ `init()`, nhưng xóa `register()` và `addMessages()`: thông điệp đến từ các từ điển Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Các component của bạn tiếp tục hoạt động mà không cần thay đổi:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Gán `$locale = 'fr'` sẽ đổi ngôn ngữ cho cả các store svelte-i18n lẫn `useIntlayer`.

## Di chuyển hoàn toàn

<Steps>
<Step number={5} title="Đổi tên import tường minh (tùy chọn)" isOptional={true}>

Plugin Vite đã xử lý alias. Để thể hiện dependency một cách tường minh:

| Trước                                        | Sau                                                    |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Chuyển nội dung sang file .content.ts" isOptional={true}>

Các component mới có thể dùng nội dung Intlayer gốc, song song với các lời gọi svelte-i18n hiện có:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="Bật dịch bằng AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Các bản dịch được điền sẽ ghi ngược lại vào các file JSON của bạn. Xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để cấu hình AI.

</Step>
</Steps>

## Những gì có thể xóa sau khi di chuyển

| File / mẫu                                 | Lý do không còn cần                               |
| ------------------------------------------ | ------------------------------------------------- |
| Các lời gọi `register()` / `addMessages()` | Từ điển được Intlayer biên dịch và tải.           |
| `waitLocale()` trước khi render            | Thông điệp có sẵn ngay khi locale được thiết lập. |

## Cấu hình TypeScript

Thêm các kiểu được sinh ra vào `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Cấu hình Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)
- [Intlayer với Vite và Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md)
- [Intlayer với SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_svelte_kit.md)
- [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
