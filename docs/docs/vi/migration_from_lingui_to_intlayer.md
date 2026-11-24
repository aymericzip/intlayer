---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Di chuyển từ Lingui sang Intlayer"
description: "Di chuyển ứng dụng React từ Lingui sang Intlayer từng bước. Giữ cho macro Lingui, useLingui và <Trans> tiếp tục hoạt động với compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Di chuyển từ Lingui sang Intlayer

## Tại sao nên chuyển từ Lingui sang Intlayer?

<AccordionGroup>
<Accordion header="Kích thước bundle">

Lingui tải một catalog đã biên dịch cho mỗi locale, chứa mọi thông điệp của ứng dụng. Intlayer chia nội dung theo từ điển và chỉ gửi những gì mỗi trang sử dụng, giúp **giảm kích thước bundle và trang tới 50%**.

</Accordion>
<Accordion header="Khả năng bảo trì">

Từ điển Intlayer **được định kiểu hoàn toàn** và có thể đặt cạnh các component sử dụng chúng. Không còn bước `extract` / `compile` phải nhớ: các từ điển được build bởi plugin của bundler.

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

1. **Compat adapter (khuyến nghị cho ứng dụng hiện có)**: cài `@intlayer/lingui`. Package này cung cấp cùng API với `@lingui/core` và `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) và phục vụ thông điệp từ các từ điển Intlayer. Các macro của bạn (`` t`…` ``, `<Trans>`, `msg`, `plural`) vẫn biên dịch y như trước.
2. **Di chuyển hoàn toàn**: thay dần các lời gọi Lingui bằng `useIntlayer` và các file `.content.ts` đặt cạnh component.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Giữ nguyên `@lingui/core`, `@lingui/react` và plugin macro (`@lingui/babel-plugin-lingui-macro` hoặc `@lingui/swc-plugin`). Macro vẫn chạy, và các package Lingui cung cấp kiểu TypeScript.

</Step>
<Step number={2} title="Cấu hình Intlayer">

Intlayer đọc các catalog Lingui như nguồn dữ liệu chuẩn. Với cấu trúc mặc định của Lingui (`src/locales/{locale}/messages.po`), hãy trỏ plugin `syncPO` tới chúng:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Dùng catalog JSON">

Với `@lingui/format-json`, hãy dùng `syncJSON` với định dạng ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Hãy dùng id thông điệp tường minh (`t({ id: "hero.title", message: "Welcome" })` hoặc `<Trans id="hero.title">`). Các id được sinh từ văn bản nguồn sẽ không được tra trong catalog.

</Step>
<Step number={3} title="Thay plugin Vite của Lingui">

Thay `@lingui/vite-plugin` bằng `@intlayer/lingui/plugin`. Binding vẫn là `lingui()`: plugin chạy build Intlayer và tạo alias `@lingui/core` và `@lingui/react` sang `@intlayer/lingui`, không cần thay đổi file nguồn.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Giữ plugin macro trong plugin React (Babel hoặc `@lingui/swc-plugin`), để macro được biên dịch thành lời gọi `i18n._()` trước khi Intlayer xử lý.

</Step>
</Steps>

Các component của bạn tiếp tục hoạt động mà không cần thay đổi:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Việc đổi locale vẫn thông qua `i18n.activate(locale)`, cập nhật mọi nơi dùng `useLingui()`.

## Di chuyển hoàn toàn

<Steps>
<Step number={4} title="Bỏ việc tải catalog lúc runtime" isOptional={true}>

Thông điệp giờ đến từ các từ điển Intlayer được biên dịch lúc build. Các lời gọi `i18n.load()` / `i18n.loadAndActivate()` chỉ đóng vai trò fallback và hiển thị cảnh báo khi phát triển. Hãy thay chúng bằng `i18n.activate(locale)` và bỏ bước `lingui compile`. Giữ `lingui extract` để thu thập id thông điệp mới.

</Step>
<Step number={5} title="Đổi tên import tường minh (tùy chọn)" isOptional={true}>

Plugin Vite đã xử lý alias. Để thể hiện dependency một cách tường minh:

| Trước                                              | Sau                                                   |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Chuyển nội dung sang file .content.ts" isOptional={true}>

Các component mới có thể dùng nội dung Intlayer gốc, song song với các lời gọi Lingui hiện có:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

Các bản dịch được điền sẽ ghi ngược lại vào catalog Lingui của bạn. Xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để cấu hình AI.

</Step>
</Steps>

## Những gì có thể xóa sau khi di chuyển

| File / mẫu                                     | Lý do không còn cần                                     |
| ---------------------------------------------- | ------------------------------------------------------- |
| `i18n.load()` / import catalog động            | Từ điển được Intlayer biên dịch và tải.                 |
| `lingui compile` và catalog `.js` đã biên dịch | Intlayer build từ điển trực tiếp từ catalog của bạn.    |
| `@lingui/vite-plugin`                          | Được thay bằng `lingui()` từ `@intlayer/lingui/plugin`. |

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

- [Compat adapter Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md)
- [Intlayer với Vite và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
