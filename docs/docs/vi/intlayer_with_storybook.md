---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Cách thiết lập Intlayer với Storybook
description: Tìm hiểu cách làm cho hệ thống thiết kế của bạn đa ngôn ngữ bằng cách sử dụng Intlayer với Storybook — biên dịch các khai báo nội dung, thêm trình chuyển đổi ngôn ngữ và xem trước các thành phần của bạn bằng bất kỳ ngôn ngữ nào.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: Init doc
---

# Intlayer với Storybook

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Nó hoạt động ở **cấp độ thành phần** — mỗi thành phần sở hữu các khai báo nội dung riêng — giữ cho các bản dịch được đặt cùng với mã nguồn sử dụng chúng.

Với Intlayer, bạn có thể:

- **Quản lý các bản dịch một cách khai báo** với các tệp nội dung trên từng thành phần.
- **Hỗ trợ đầy đủ TypeScript** thông qua các kiểu dữ liệu được tạo tự động và tính năng tự động hoàn thành của IDE.
- **Chuyển đổi ngôn ngữ khi đang chạy** mà không cần tải lại trang.
- **Tự động dịch** với các tích hợp nhà cung cấp AI được tích hợp sẵn.

---

## Tại sao nên sử dụng Intlayer với Storybook?

Storybook là công cụ tiêu chuẩn trong ngành để phát triển và lập tài liệu cho các thành phần UI một cách độc lập. Việc kết hợp nó với Intlayer cho phép bạn:

- **Xem trước mọi ngôn ngữ** trực tiếp bên trong canvas của Storybook bằng trình chuyển đổi trên thanh công cụ.
- **Phát hiện các bản dịch còn thiếu** trước khi chúng được đưa vào sản xuất.
- **Lập tài liệu cho các thành phần đa ngôn ngữ** với nội dung thực tế, an toàn về kiểu dữ liệu thay vì các chuỗi được mã hóa cứng.

---

## Thiết lập từng bước

<Tabs>
<Tab value="Vite Setup">

### Bước 1: Cài đặt các phụ thuộc

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Gói              | Vai trò                                                       |
| ---------------- | ------------------------------------------------------------- |
| `intlayer`       | Cốt lõi — cấu hình, biên dịch nội dung, CLI                   |
| `react-intlayer` | Liên kết React — `IntlayerProvider`, hook `useIntlayer`       |
| `vite-intlayer`  | Plugin Vite — theo dõi và biên dịch các tệp khai báo nội dung |

---

### Bước 2: Tạo cấu hình Intlayer

Tạo `intlayer.config.ts` tại thư mục gốc của dự án (hoặc bên trong gói hệ thống thiết kế của bạn):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // thêm các ngôn ngữ khác nếu cần
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // nơi chứa các tệp *.content.ts của bạn
  },
};

export default config;
```

> Để xem danh sách đầy đủ các tùy chọn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

---

### Bước 3: Thêm Plugin Vite vào Storybook

Hook `viteFinal` của Storybook cho phép bạn mở rộng cấu hình Vite nội bộ. Nhập và thêm plugin `intlayer()` tại đó:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …các addon khác
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

Plugin `intlayer()` theo dõi các tệp `*.content.ts` của bạn và tự động xây dựng lại các từ điển bất cứ khi nào chúng thay đổi trong quá trình phát triển trên Storybook.

---

### Bước 4: Thêm Decorator `IntlayerProvider` và Thanh công cụ Ngôn ngữ

Tệp `preview` của Storybook là nơi thích hợp để bao bọc mọi câu chuyện với `IntlayerProvider` và hiển thị trình chuyển đổi ngôn ngữ trên thanh công cụ:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Bao bọc mọi câu chuyện bên trong IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Hiển thị trình chuyển đổi ngôn ngữ trên thanh công cụ Storybook
  globalTypes: {
    locale: {
      description: "Ngôn ngữ đang kích hoạt",
      defaultValue: "en",
      toolbar: {
        title: "Ngôn ngữ",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Các giá trị `locale` phải khớp với các ngôn ngữ được khai báo trong `intlayer.config.ts` của bạn.

</Tab>
<Tab value="Webpack Setup">

### Bước 1: Cài đặt các phụ thuộc

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Bước 2: Tạo cấu hình Intlayer

Tạo `intlayer.config.ts` tại thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Bước 3: Cấu hình Webpack của Storybook

Đối với các thiết lập Storybook dựa trên Webpack (ví dụ: `@storybook/react-webpack5`), hãy mở rộng cấu hình webpack thông qua `webpackFinal` để thêm các alias và loader của Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Bước 4: Thêm Decorator `IntlayerProvider` và Thanh công cụ Ngôn ngữ

Tương tự như thiết lập Vite — thêm decorator và kiểu ngôn ngữ toàn cục trong tệp `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Ngôn ngữ đang kích hoạt",
      defaultValue: "en",
      toolbar: {
        title: "Ngôn ngữ",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## Khai báo nội dung

Tạo tệp `*.content.ts` bên cạnh mỗi thành phần. Intlayer sẽ tự động nhận diện nó trong quá trình biên dịch.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Để biết thêm các định dạng khai báo nội dung và tính năng khác, hãy xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

---

## Sử dụng `useIntlayer` trong một thành phần

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Sao chép
    </button>
  );
};
```

`useIntlayer` trả về từ điển đã biên dịch cho ngôn ngữ hiện tại được cung cấp bởi `IntlayerProvider` gần nhất. Việc chuyển đổi ngôn ngữ trên thanh công cụ Storybook sẽ tự động hiển thị lại câu chuyện với các bản dịch đã cập nhật.

---

## Viết các câu chuyện (Story) cho các thành phần đa ngôn ngữ

Với decorator `IntlayerProvider` đã được thiết lập, các câu chuyện của bạn sẽ hoạt động chính xác như trước đây. Thanh công cụ ngôn ngữ kiểm soát ngôn ngữ đang hoạt động cho toàn bộ canvas:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Câu chuyện mặc định — chuyển đổi ngôn ngữ trên thanh công cụ để xem trước các bản dịch. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Hiển thị nút bên trong một khối mã, một trường hợp sử dụng thực tế phổ biến. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Mỗi câu chuyện kế thừa biến toàn cục `locale` từ thanh công cụ, vì vậy bạn có thể xác minh mọi ngôn ngữ mà không cần thay đổi bất kỳ mã nguồn câu chuyện nào.

---

## Kiểm thử các bản dịch trong các câu chuyện

Sử dụng các hàm `play` của Storybook để khẳng định rằng văn bản được dịch chính xác được hiển thị cho một ngôn ngữ nhất định:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Xác minh nút có tên dễ tiếp cận không trống
    await expect(button).toHaveAccessibleName();
    // Xác minh nút không bị vô hiệu hóa
    await expect(button).not.toBeDisabled();
    // Xác minh khả năng tiếp cận bằng bàn phím
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Tài nguyên bổ sung

- [Tài liệu cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)
- [Tài liệu Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu Storybook](https://storybook.js.org/docs)
