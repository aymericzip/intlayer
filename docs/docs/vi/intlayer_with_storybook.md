---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Storybook đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer với Storybook

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `storybook-react-i18next` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>

<Accordion header="Giới thiệu đầy đủ về Truyện">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Storybook bằng cách cung cấp **trình trang trí câu chuyện đa ngôn ngữ**, **chuyển đổi ngôn ngữ** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n) trên hệ thống thiết kế của bạn.

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

</Accordion>

<Accordion header="Mở rộng quy mô không có nhà phát triển">

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

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

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

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
| `intlayer`       | Cốt lõi - cấu hình, biên dịch nội dung, CLI                   |
| `react-intlayer` | Liên kết React - `IntlayerProvider`, hook `useIntlayer`       |
| `vite-intlayer`  | Plugin Vite - theo dõi và biên dịch các tệp khai báo nội dung |

---

</Step>

<Step number={2} title="Tạo cấu hình Intlayer">

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

</Step>

<Step number={3} title="Thêm Plugin Vite vào Storybook">

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

</Step>

<Step number={4} title="Thêm Decorator `IntlayerProvider` và Thanh công cụ Ngôn ngữ">

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

</Step>

<Step number={1} title="Cài đặt các phụ thuộc">

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

</Step>

<Step number={2} title="Tạo cấu hình Intlayer">

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

</Step>

<Step number={3} title="Cấu hình Webpack của Storybook">

Đối với các thiết lập Storybook dựa trên Webpack (ví dụ: `@storybook/react-webpack5`), hãy mở rộng cấu hình webpack thông qua `webpackFinal` để thêm các alias và loader của Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

</Step>

<Step number={4} title="Thêm Decorator `IntlayerProvider` và Thanh công cụ Ngôn ngữ">

Tương tự như thiết lập Vite - thêm decorator và kiểu ngôn ngữ toàn cục trong tệp `.storybook/preview.tsx`:

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

</Step>

</Steps>

## Khai báo nội dung

Tạo tệp `*.content.ts` bên cạnh mỗi thành phần. Intlayer sẽ tự động nhận diện nó trong quá trình biên dịch.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

/** Câu chuyện mặc định - chuyển đổi ngôn ngữ trên thanh công cụ để xem trước các bản dịch. */
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
