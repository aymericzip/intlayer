---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js 16 i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Next.js 16 đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Phát hành ban đầu"
author: aymericzip
---

# Dịch trang web Next.js 16 của bạn (không có [locale] trong đường dẫn trang) bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Next.js? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Mã" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) trên GitHub.

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `next-intl` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Phạm vi bảo hiểm đầy đủ của Next.js">

Intlayer được tối ưu hóa để hoạt động với **Thành phần máy chủ** nhằm hiển thị hiệu quả và hoàn toàn tương thích với [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Nó không chặn hiển thị tĩnh và cung cấp phần mềm trung gian cũng như tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

> Intlayer tương thích với Next.js 12, 13, 14, 15 và 16. Nếu đang sử dụng Bộ định tuyến trang Next.js, bạn có thể tham khảo [hướng dẫn] này(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Định tuyến ngôn ngữ rất hữu ích cho SEO, kích thước bundle và hiệu suất. Nếu không cần, bạn có thể tham khảo [hướng dẫn] này(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Đối với Next.js 12, 13, 14 và 15 với Bộ định tuyến ứng dụng, hãy tham khảo [hướng dẫn] này (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

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

## Hướng dẫn từng bước để cài đặt Intlayer trong ứng dụng Next.js

<Steps>

<Step number={1} title="Cài đặt phụ thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Gói lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), transpilation, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **next-intlayer**

Gói tích hợp Intlayer với Next.js. Nó cung cấp các context providers và hooks cho việc quốc tế hóa trong Next.js. Ngoài ra, nó bao gồm plugin Next.js để tích hợp Intlayer với [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), cũng như proxy để phát hiện locale ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Dưới đây là cấu trúc cuối cùng mà chúng ta sẽ tạo:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Nếu bạn không muốn routing theo locale, intlayer có thể được sử dụng như một provider / hook đơn giản. Xem [hướng dẫn này](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_no_locale_path.md) để biết thêm chi tiết.

Tạo một tệp cấu hình để xác định các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Các locale khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // hoặc `no-prefix` - Hữu ích cho việc phát hiện trong middleware
  },
};

export default config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL theo ngôn ngữ, chuyển hướng proxy, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều thứ khác. Để xem danh sách đầy đủ các tham số có sẵn, tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Next.js của bạn">

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* các tuỳ chọn cấu hình ở đây */};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` được sử dụng để tích hợp Intlayer với Next.js. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng ở chế độ phát triển. Nó định nghĩa các biến môi trường của Intlayer trong các môi trường [Webpack](https://webpack.js.org/) hoặc [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ngoài ra, nó cung cấp các alias để tối ưu hiệu năng và đảm bảo tương thích với server components.

> Hàm `withIntlayer()` là một hàm promise. Nó cho phép chuẩn bị các từ điển intlayer trước khi build bắt đầu. Nếu bạn muốn sử dụng nó với các plugin khác, bạn có thể await nó. Ví dụ:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Nếu bạn muốn sử dụng nó đồng bộ, bạn có thể sử dụng hàm `withIntlayerSync()`. Ví dụ:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Hàm `withIntlayer()` là một hàm trả về promise. Nó cho phép chuẩn bị các từ điển của intlayer trước khi quá trình build bắt đầu. Nếu bạn muốn sử dụng nó cùng các plugin khác, bạn có thể await nó. Ví dụ:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Nếu bạn muốn sử dụng nó một cách đồng bộ, bạn có thể dùng hàm `withIntlayerSync()`. Ví dụ:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer tự động phát hiện dự án của bạn đang sử dụng **webpack** hay **Turbopack** dựa trên các cờ dòng lệnh `--webpack`, `--turbo`, hoặc `--turbopack`, cũng như phiên bản **Next.js** hiện tại của bạn.
>
> Kể từ `next>=16`, nếu bạn đang sử dụng **Rspack**, bạn phải ép Intlayer sử dụng cấu hình webpack bằng cách tắt Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Định nghĩa các route động theo locale">

Xóa mọi nội dung trong `RootLayout` và thay thế bằng mã sau:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> Một `IntlayerProvider` duy nhất bao phủ cả hai phía của cây: nó cung cấp ngữ cảnh máy chủ được xác định theo yêu cầu được đọc bởi các server hooks, và gắn kết client provider để các client components nhận được cùng một locale.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

 </Tab>
</Tabs>

</Step>

<Step number={5} title="Khai báo nội dung của bạn">

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      vi: "Tiêu đề dự án của tôi",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      vi: "Khám phá nền tảng sáng tạo của chúng tôi được thiết kế để đơn giản hóa quy trình làm việc và tăng năng suất.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      vi: ["đổi mới", "năng suất", "quy trình làm việc", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      vi: ["đổi mới", "năng suất", "luồng công việc", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "vi": "Tiêu đề dự án của tôi",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "vi": "Khám phá nền tảng sáng tạo của chúng tôi được thiết kế để tối ưu hóa quy trình làm việc và tăng năng suất.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "vi": ["đổi mới", "năng suất", "luồng công việc", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        vi: "Bắt đầu bằng cách chỉnh sửa",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "vi": "Bắt đầu bằng cách chỉnh sửa",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định, `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={6} title="Sử dụng Nội dung trong Mã của Bạn">

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** được mount một lần, trong root layout. Nó cung cấp locale cho cả server và client components, vì vậy các trang không còn phải wrap chính mình.
- Khi không có `[locale]` path segment, locale luôn đến từ request — header `x-intlayer-locale` được đặt bởi Intlayer proxy, sau đó là locale cookie — mà các server hooks đọc trực tiếp khi provider chưa chạy.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** được sử dụng để cung cấp locale cho các component phía client. Nó có thể được đặt trong bất kỳ component cha nào, bao gồm cả layout. Tuy nhiên, đặt nó trong layout được khuyến nghị vì Next.js chia sẻ code layout giữa các trang, làm cho nó hiệu quả hơn. Bằng cách sử dụng `IntlayerClientProvider` trong layout, bạn tránh được việc khởi tạo lại nó cho mỗi trang, cải thiện hiệu suất và duy trì một bối cảnh localization nhất quán trong toàn bộ ứng dụng của bạn.
- **`IntlayerServerProvider`** được sử dụng để cung cấp locale cho các server children. Nó không thể được đặt trong layout.

> Layout và page không thể chia sẻ một server context chung vì hệ thống server context dựa trên một data store theo từng request (thông qua cơ chế [React's cache](https://react.dev/reference/react/cache)), khiến mỗi "context" được tạo lại cho các segment khác nhau của ứng dụng. Đặt provider trong một shared layout sẽ phá vỡ sự cô lập này, ngăn chặn việc truyền đạt chính xác các giá trị server context tới các server components của bạn.

 </Tab>
</Tabs>

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` là đường dẫn import đẳng cấu: điều kiện export `react-server` cung cấp cho các server component triển khai ambient-locale, trong khi các client component nhận được triển khai dựa trên context. Cùng một lệnh gọi hoạt động ở cả hai phía.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Tạo khai báo nội dung liên quan

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, ví dụ:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Cấu hình Proxy để phát hiện locale" isOptional={true}>

Thiết lập proxy để phát hiện locale ưu tiên của người dùng:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` được dùng để phát hiện ngôn ngữ ưa thích của người dùng và chuyển hướng họ đến URL phù hợp như được chỉ định trong [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md). Ngoài ra, nó còn cho phép lưu ngôn ngữ ưa thích của người dùng vào cookie.

> Kể từ Intlayer v9, middleware này tuân theo tùy chọn `routing.enableProxy` (`true` theo mặc định). Đặt `routing.enableProxy: false` trong cấu hình của bạn để biến nó thành pass-through mà không cần xóa tệp này. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

> Nếu bạn cần xâu chuỗi nhiều proxy với nhau (ví dụ: `intlayerProxy` cùng với proxy xác thực hoặc proxy tuỳ chỉnh), Intlayer hiện cung cấp một helper gọi là `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Để thay đổi ngôn ngữ nội dung của bạn trong Next.js, cách được khuyến nghị là sử dụng component `Link` để chuyển hướng người dùng đến trang đã được địa phương hóa tương ứng. Component `Link` cho phép prefetch trang, giúp tránh phải tải lại toàn bộ trang.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Tên ngôn ngữ theo chính locale đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Tên ngôn ngữ theo locale hiện tại - ví dụ: Francés khi locale hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Một cách khác là sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này sẽ không cho phép prefetching trang. Xem [tài liệu hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md) để biết thêm chi tiết.

> Tham khảo tài liệu:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Lấy locale hiện tại trong Server Actions" isOptional={true}>

Nếu bạn cần locale hoạt động bên trong một Server Action (ví dụ: để localize emails hoặc chạy logic nhận biết locale), hãy gọi `getLocale` từ `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Làm gì đó với locale
};
```

> Hàm `getLocale` tuân theo chiến lược phân lớp (cascading) để xác định locale của người dùng:
>
> 1. Đầu tiên, nó kiểm tra header của yêu cầu để tìm giá trị locale có thể đã được proxy thiết lập
> 2. Nếu không tìm thấy locale trong header, nó sẽ tìm locale được lưu trong cookie
> 3. Nếu không có cookie, nó sẽ cố gắng phát hiện ngôn ngữ ưa thích của người dùng từ cài đặt trình duyệt
> 4. Trong trường hợp cuối cùng, nó sẽ sử dụng locale mặc định được cấu hình cho ứng dụng
>
> Điều này đảm bảo lựa chọn locale phù hợp nhất dựa trên ngữ cảnh hiện có.

</Step>

<Step number={10} title="Tối ưu kích thước bundle của bạn" isOptional={true}>

Khi sử dụng `next-intlayer`, các từ điển (dictionaries) được bao gồm trong bundle cho mọi trang theo mặc định. Để tối ưu kích thước bundle, Intlayer cung cấp một plugin SWC tùy chọn thay thế một cách thông minh các lần gọi `useIntlayer` bằng các macro. Điều này đảm bảo các từ điển chỉ được đưa vào bundle của những trang thực sự sử dụng chúng.

Để bật tối ưu này, cài đặt gói `@intlayer/swc`. Khi đã cài, `next-intlayer` sẽ tự động phát hiện và sử dụng plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Lưu ý: Tối ưu hóa này chỉ có sẵn cho Next.js 13 trở lên.

> Lưu ý: Gói này không được cài mặc định vì plugin SWC vẫn đang ở giai đoạn thử nghiệm trên Next.js. Điều này có thể thay đổi trong tương lai.

> Lưu ý: Nếu bạn đặt tùy chọn là `importMode: 'dynamic'` hoặc `importMode: 'fetch'` (in the `dictionary` configuration), nó sẽ phụ thuộc vào Suspense, vì vậy bạn phải bao bọc các lệnh gọi `useIntlayer` bằng một boundary `Suspense`. Điều đó có nghĩa là bạn sẽ không thể sử dụng `useIntlayer` trực tiếp ở cấp cao nhất của component Page / Layout.

</Step>

</Steps>

### Theo dõi thay đổi từ điển trên Turbopack

Khi sử dụng Turbopack làm development server với lệnh `next dev`, các thay đổi trong từ điển sẽ không được phát hiện tự động theo mặc định.

Hạn chế này xảy ra vì Turbopack không thể chạy các plugin webpack song song để theo dõi thay đổi trong các tệp nội dung của bạn. Để khắc phục, bạn cần dùng lệnh `intlayer watch` để chạy đồng thời development server và trình quan sát build của Intlayer.

```json5 fileName="package.json"
{
  // ... Cấu hình package.json hiện có của bạn
  "scripts": {
    // ... Cấu hình scripts hiện có của bạn
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Nếu bạn đang sử dụng next-intlayer@<=6.x.x, bạn cần giữ flag `--turbopack` để ứng dụng Next.js 16 hoạt động đúng với Turbopack. Chúng tôi khuyến nghị sử dụng next-intlayer@>=7.x.x để tránh hạn chế này.

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

### Cấu hình Git

Nên bỏ qua các tệp được Intlayer tạo ra. Điều này giúp bạn tránh commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi theo thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước trực tiếp** của nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết chi tiết cách sử dụng extension, tham khảo [tài liệu Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Mở rộng

Để mở rộng, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc externalize nội dung của bạn bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Các giải pháp khác nhau có sẵn để quốc tế hóa ứng dụng Next.js là gì?">

Trường `i18n` của `next.config.js` không áp dụng cho App Router, vì vậy lớp bản địa hóa luôn là một lựa chọn thư viện:

- **`next-intl`**, **`next-i18next` / `i18next`** và **`react-intl`**: Các catalog JSON hoặc ICU được tải theo namespace.
- **`Lingui`**: Được điều khiển bởi trích xuất, với các thông báo ICU được biên dịch tại thời điểm build.
- **`Intlayer`**: Giải pháp tiên tiến nhất. Nội dung được khai báo ở bất kỳ đâu trong cơ sở mã của bạn ([bên cạnh mỗi component hoặc tập trung](https://intlayer.org/blog/per-component-vs-centralized-i18n)) và được biên dịch theo từng component, có kiểu dữ liệu đầy đủ, với tính năng dịch bằng AI, trình soạn thảo trực quan và CMS.

Hướng dẫn này bao gồm thiết lập không có locale trong đường dẫn. Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md) và [bảng so sánh i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md).

</Question>

<Question title="i18n làm tăng kích thước bundle Next.js của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Server Components phân giải nội dung ngay trên server, và compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng. [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ next-intl, next-i18next hoặc i18next mà không cần viết lại các component của mình không?">

Có, theo hai cách. Bạn có thể di chuyển nội dung dần dần bằng [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md) hoặc [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md). Hoặc bạn có thể giữ nguyên API hiện tại: [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp chính xác các API tương tự nhưng chạy trên các từ điển Intlayer.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các component của bạn, trích xuất các chuỗi hiển thị cho người dùng và viết một tệp `.content` bên cạnh mỗi component, nhờ đó bạn xem lại diff thay vì sao chép từng chuỗi vào một catalog.

Đối với quy trình hoàn toàn tự động, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện điều tương tự tại thời điểm build: quét mã nguồn JSX, TSX, Vue và Svelte của bạn trên mỗi thay đổi, tạo từ điển và giữ chúng đồng bộ thông qua hot module replacement, do đó hoàn toàn không có khóa nào phải duy trì thủ công.

Hai giới hạn đáng lưu ý trước khi bạn bật compiler. Nó hoạt động bằng phân tích tĩnh, do đó các chuỗi chỉ tồn tại khi runtime, chẳng hạn như mã lỗi API hoặc các trường CMS, nằm ngoài phạm vi tiếp cận. Và nó phải phân biệt văn bản hiển thị cho người dùng với logic ứng dụng như `className="active"` hoặc mã trạng thái, điều này cần một vài chú thích trong một codebase lớn. [Lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) tránh cả hai điều này bằng cách giữ bạn luôn kiểm soát.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Tại sao tôi muốn phân phối ứng dụng của mình mà không có locale trong URL?">

Bởi vì locale không phải lúc nào cũng là một phần danh tính của trang. Bảng điều khiển đã xác thực, công cụ nội bộ hoặc ứng dụng phía sau đăng nhập không có lý do gì để hiển thị `/fr/` trong mỗi URL: ngôn ngữ là tùy chọn của người dùng, không phải một tài liệu khác biệt. Bỏ tiền tố cũng giữ cho các route, liên kết và số liệu phân tích của bạn nằm trên một tập hợp đường dẫn duy nhất.

</Question>

<Question title="Hậu quả về SEO của việc không có locale trong URL là gì?">

Chúng là có thật, vì vậy hãy lựa chọn một cách cân nhắc. Nếu không có URL riêng biệt cho từng ngôn ngữ, các công cụ tìm kiếm không có trang riêng để lập chỉ mục cho từng locale, `hreflang` không có gì để trỏ tới, và trình thu thập dữ liệu chỉ nhìn thấy ngôn ngữ mà tính năng phát hiện mặc định của bạn phân phối. Điều đó phù hợp với nội dung phía sau đăng nhập vốn không được lập chỉ mục, nhưng không phù hợp với trang web tiếp thị công khai hoặc tài liệu. Nếu lưu lượng truy cập tự nhiên theo từng ngôn ngữ là quan trọng, hãy sử dụng thiết lập có tiền tố trong [hướng dẫn Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md).

</Question>

<Question title="Sự khác biệt giữa chế độ `no-prefix` và `search-params` là gì?">

`"no-prefix"` giữ locale hoàn toàn nằm ngoài URL và phân giải nó từ cookie, tiêu đề hoặc tên miền, vì vậy mọi ngôn ngữ dùng chung một địa chỉ. `"search-params"` đặt nó vào chuỗi truy vấn dưới dạng `/dashboard?locale=fr`, vẫn cung cấp cho mỗi ngôn ngữ một URL riêng biệt, có thể liên kết và đánh dấu trang mà không làm thay đổi cây route của bạn. Ưu tiên `"search-params"` khi bạn muốn các liên kết có thể chia sẻ theo từng ngôn ngữ.

</Question>

<Question title="Vậy locale được phát hiện như thế nào?">

Từ các nguồn được liệt kê trong `routing.storage`, theo mặc định là cookie trước rồi đến tiêu đề `Accept-Language`, và dự phòng về locale mặc định của bạn. Bước 7 thêm proxy áp dụng điều này. Ngôn ngữ mà người dùng chọn rõ ràng sẽ được duy trì, do đó nó tiếp tục tồn tại ở lần truy cập tiếp theo. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Question>

<Question title="Tôi có thể ánh xạ từng ngôn ngữ vào tên miền riêng của nó không?">

Có, và đây là tùy chọn cần cân nhắc khi bạn bỏ tiền tố vì lý do thẩm mỹ nhưng vẫn muốn có SEO. `routing.domains` ánh xạ một locale tới một hostname, do đó tên miền xác định ngôn ngữ, không có tiền tố nào được thêm vào đường dẫn, và mọi ngôn ngữ đều có một URL có thể lập chỉ mục mà `hreflang` có thể trỏ tới.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. CLI phát hiện các bản dịch còn thiếu và điền chúng bằng LLM bạn chọn sử dụng provider và API key của riêng bạn. Flag `--git-diff` giới hạn thao tác ở nội dung đã thay đổi trên branch hiện tại. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
