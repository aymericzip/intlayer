---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Di chuyển từ react-intl (FormatJS) sang Intlayer"
description: "Di chuyển ứng dụng React từ react-intl sang Intlayer từng bước. Giữ cho useIntl, FormattedMessage và mọi component Formatted* tiếp tục hoạt động với compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Di chuyển từ react-intl (FormatJS) sang Intlayer

## Tại sao nên chuyển từ react-intl sang Intlayer?

<AccordionGroup>
<Accordion header="Kích thước bundle">

Với react-intl, mọi thông điệp của locale được truyền vào `IntlProvider`, nên mỗi trang mang theo toàn bộ catalog. Intlayer chỉ gửi các từ điển mà mỗi trang sử dụng, giúp **giảm kích thước bundle và trang tới 50%**.

</Accordion>
<Accordion header="Khả năng bảo trì">

Id thông điệp **được định kiểu** theo từ điển của bạn: id không hợp lệ sẽ lỗi khi build. Nội dung có thể đặt cạnh các component sử dụng nó.

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

1. **Compat adapter (khuyến nghị cho ứng dụng hiện có)**: cài `@intlayer/react-intl`. Package này cung cấp cùng API với `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) và phục vụ thông điệp từ các từ điển Intlayer. ICU MessageFormat, số nhiều, select và thẻ rich text hoạt động như trước.
2. **Di chuyển hoàn toàn**: thay dần các lời gọi react-intl bằng `useIntlayer` và các file `.content.ts` đặt cạnh component.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Giữ `react-intl` đã cài: nó cung cấp kiểu TypeScript.

</Step>
<Step number={2} title="Cấu hình Intlayer">

Trỏ plugin `syncJSON` tới các file thông điệp hiện có. Catalog react-intl là các map phẳng gồm id có dấu chấm:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Phân đoạn đầu tiên của mỗi id (`home`) trở thành một từ điển Intlayer, nên mỗi trang chỉ tải các từ điển nó dùng. Khi Intlayer ghi ngược bản dịch, file vẫn giữ cấu trúc phẳng.

</Step>
<Step number={3} title="Thêm plugin Vite">

`reactIntlVitePlugin()` chạy build Intlayer và tạo alias `react-intl` sang `@intlayer/react-intl`, không cần thay đổi file nguồn.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Dùng bundler khác? Đổi tên import thành `@intlayer/react-intl` (xem bước 5) và dùng plugin Intlayer cho bundler của bạn, ví dụ `withIntlayer` từ `next-intlayer` cho Next.js.

</Step>
<Step number={4} title="Ngừng truyền thông điệp vào IntlProvider">

`IntlProvider` vẫn hoạt động, nhưng thông điệp giờ được Intlayer tải. Hãy xóa prop `messages` và import catalog:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Nếu `messages` vẫn được truyền vào, nó sẽ bị bỏ qua và một cảnh báo hiển thị khi phát triển.

</Step>
</Steps>

Các component của bạn tiếp tục hoạt động mà không cần thay đổi, với id được định kiểu:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Di chuyển hoàn toàn

<Steps>
<Step number={5} title="Đổi tên import tường minh (tùy chọn)" isOptional={true}>

Plugin Vite đã xử lý alias. Để thể hiện dependency một cách tường minh:

| Trước                                           | Sau                                                       |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Chuyển nội dung sang file .content.ts" isOptional={true}>

Các component mới có thể dùng nội dung Intlayer gốc, song song với các lời gọi react-intl hiện có:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Các bản dịch được điền sẽ ghi ngược lại vào các file JSON của bạn. Xem [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để cấu hình AI.

</Step>
</Steps>

## Những gì có thể xóa sau khi di chuyển

| File / mẫu                           | Lý do không còn cần                                              |
| ------------------------------------ | ---------------------------------------------------------------- |
| Prop `messages` và việc tải catalog  | Từ điển được Intlayer biên dịch và tải.                          |
| Bước `formatjs compile`              | Intlayer phân tích thông điệp ICU trực tiếp từ file JSON.        |
| Sinh id bằng `babel-plugin-formatjs` | Dùng id tường minh có dấu chấm để mỗi id ánh xạ tới một từ điển. |

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

- [Compat adapter react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)
- [Intlayer với Vite và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- [Di chuyển từ react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-i18next_to_intlayer.md)
- [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
