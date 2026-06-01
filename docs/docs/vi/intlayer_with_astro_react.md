---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: Astro + React i18n - Hướng dẫn đầy đủ để dịch Astro + React
description: Giải pháp tốt nhất cho kích thước bundle, SEO, hiệu suất & khả năng bảo trì. Làm cho Astro and React trang web của bạn đa ngôn ngữ vào năm 2026, dịch thuật LLM, Agent Skills & MCP.
keywords:
  - đa ngôn ngữ
  - tài liệu
  - Intlayer
  - Astro
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - react
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Cập nhật tích hợp Astro, cấu hình và cách sử dụng"
---

# Dịch trang web Astro + React của bạn với Intlayer | Đa ngôn ngữ (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách đa ngôn ngữ hóa ứng dụng của bạn với Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `astro-i18n` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Bảo hiểm đầy đủ của Astro">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Astro bằng cách cung cấp **định tuyến đa ngôn ngữ**, **sơ đồ trang web** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

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

## Hướng dẫn từng bước để cấu hình Intlayer trong Astro + React

Xem [mẫu ứng dụng](https://github.com/aymericzip/intlayer-astro-template) trên GitHub.

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

bun x intlayer init
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ i18n để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **astro-intlayer**
  Plugin tích hợp Astro để kết nối Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production); nó cũng bao gồm middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

- **react**, **react-dom**
  Các gói React cốt lõi được sử dụng để render các thành phần React trong trình duyệt.

- **react-intlayer**
  Gói để tích hợp Intlayer vào các ứng dụng React. Nó cung cấp `IntlayerProvider` cùng với các hook `useIntlayer` và `useLocale` cho đa ngôn ngữ trong React.

- **@astrojs/react**
  Tích hợp chính thức của Astro cho phép sử dụng các React component islands.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một file cấu hình để xác định các ngôn ngữ của ứng dụng:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.VIETNAMESE,
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Thông qua file cấu hình này, bạn có thể thiết lập các URL bản địa hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt log Intlayer trong console, v.v. Để biết danh sách đầy đủ các tham số có sẵn, hãy xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Astro của bạn">

Thêm plugin `intlayer` vào cấu hình Astro và tích hợp React của bạn.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), react()],
});
```

> Plugin tích hợp `intlayer()` được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc tạo các file khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer bên trong ứng dụng Astro và cung cấp các alias để tối ưu hóa hiệu suất.

> Tích hợp `react()` cho phép sử dụng các React component islands thông qua `client:only="react"`.

</Step>

<Step number={4} title="Khai báo nội dung của bạn">

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      vi: "Xin chào thế giới",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn, miễn là chúng nằm trong `contentDir` (mặc định là `./src`) và khớp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm thông tin, hãy xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={5} title="Sử dụng nội dung trong Astro">

Bạn có thể sử dụng các từ điển trực tiếp trong các file `.astro` bằng cách sử dụng các hàm hỗ trợ cốt lõi được xuất từ `intlayer`. Bạn cũng nên thêm metadata cho SEO (như hreflang và liên kết canonical) vào mỗi trang và giới thiệu một React island cho nội dung tương tác phía client.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { ReactIsland } from "../../components/react/ReactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Liên kết Canonical: Thông báo cho các công cụ tìm kiếm về phiên bản chính của trang này -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Thông báo cho Google về tất cả các phiên bản đã bản địa hóa -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Tùy chọn dự phòng khi ngôn ngữ không khớp với ngôn ngữ của người dùng -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- React island render tất cả các nội dung tương tác, bao gồm cả bộ chuyển đổi ngôn ngữ -->
    <ReactIsland locale={locale} client:only="react" />
  </body>
</html>
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `chuỗi`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v. b., bạn có thể sử dụng giá trị của hàm, như:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Lưu ý về thiết lập định tuyến:**
> Cấu trúc thư mục bạn sử dụng phụ thuộc vào cài đặt `middleware.routing` trong `intlayer.config.ts`:
>
> - **`prefix-no-default` (mặc định):** Giữ ngôn ngữ mặc định ở root (không có tiền tố) và thêm tiền tố cho các ngôn ngữ khác. Sử dụng `[...locale]` để bao gồm tất cả các trường hợp.
> - **`prefix-all`:** Tất cả các URL đều có tiền tố ngôn ngữ. Bạn có thể sử dụng `[locale]` tiêu chuẩn nếu không cần xử lý root riêng biệt.
> - **`search-param` hoặc `no-prefix`:** Không yêu cầu các thư mục ngôn ngữ. Ngôn ngữ được quản lý qua tham số truy vấn hoặc cookie.

</Step>

<Step number={6} title="Tạo một React Island Component">

Tạo một thành phần island bao bọc ứng dụng React của bạn và nhận ngôn ngữ được máy chủ phát hiện:

```tsx fileName="src/components/react/ReactIsland.tsx"
/** @jsxImportSource react */
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { type LocalesValues } from "intlayer";
import { LocaleSwitcher } from "./LocaleSwitcher";

function App() {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
}

export function ReactIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <App />
    </IntlayerProvider>
  );
}
```

> Prop `locale` được truyền từ trang Astro (phát hiện phía máy chủ) đến `IntlayerProvider`, đóng vai trò là ngôn ngữ ban đầu cho tất cả các React hooks bên trong cây thành phần.

</Step>

<Step number={7} title="Thêm bộ chuyển đổi ngôn ngữ">

Tạo một thành phần React `LocaleSwitcher` để đọc các ngôn ngữ có sẵn và điều hướng đến URL bản địa hóa khi người dùng chọn ngôn ngữ mới:

```tsx fileName="src/components/react/LocaleSwitcher.tsx"
/** @jsxImportSource react */
import { useLocale } from "react-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

export function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Điều hướng đến URL bản địa hóa khi thay đổi ngôn ngữ
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div className="locale-switcher">
      <span className="switcher-label">Thay đổi ngôn ngữ:</span>
      <div className="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            className={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span className="ls-own-name">{getLocaleName(localeItem)}</span>
            <span className="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

> **Lưu ý về tính bền vững:**
> Việc sử dụng `onLocaleChange` để chuyển hướng qua `window.location.href` đảm bảo rằng một URL ngôn ngữ mới có tiền tố sẽ được truy cập. Điều này cho phép middleware Intlayer thiết lập cookie ngôn ngữ và ghi nhớ lựa chọn của người dùng cho các lần truy cập sau.

> `LocaleSwitcher` phải được render bên trong `IntlayerProvider` - sử dụng nó trong thành phần island của bạn (như được hiển thị ở Bước 6).

</Step>

<Step number={7} title="Sitemap và Robots.txt">

Intlayer cung cấp các tiện ích để tự động tạo sơ đồ trang web (sitemap) bản địa hóa và file robots.txt của bạn.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

Tạo `src/pages/sitemap.xml.ts` để tạo sơ đồ trang web bao gồm tất cả các route bản địa hóa của bạn.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Tạo `src/pages/robots.txt.ts` để kiểm soát hoạt động thu thập thông tin của các công cụ tìm kiếm.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={1} title="Trích xuất nội dung các thành phần của bạn" isOptional={true}>

Nếu bạn có một cơ sở mã hiện có, việc chuyển đổi hàng nghìn tệp có thể tốn nhiều thời gian.

Để đơn giản hóa quy trình này, Intlayer đề xuất một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [trình trích xuất](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các thành phần của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` vào tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Phần còn lại của cấu hình
  compiler: {
    /**
     * Cho biết trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Xác định đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết các thành phần có nên được lưu sau khi chuyển đổi hay không. Bằng cách đó, trình biên dịch có thể được chạy chỉ một lần để chuyển đổi ứng dụng, sau đó có thể được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Lệnh trích xuất'>

Chạy trình trích xuất để chuyển đổi các thành phần và trích xuất nội dung

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Trình biên dịch Babel'>

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Thêm plugin trình biên dịch
  ],
});
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

### Cấu hình TypeScript

Intlayer sử dụng cơ chế mở rộng module (module augmentation) để tận dụng TypeScript, làm cho cơ sở mã của bạn mạnh mẽ hơn.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu dữ liệu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyên bạn nên bỏ qua các file được tạo bởi Intlayer. Điều này ngăn chúng được commit vào kho lưu trữ Git của bạn.

Để làm điều đó, hãy thêm các hướng dẫn sau vào file `.gitignore` của bạn:

```bash
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **tiện ích mở rộng Intlayer chính thức cho VS Code**.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này sẽ cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước trực tiếp** nội dung đã dịch.
- **Các hành động nhanh** để tạo và cập nhật bản dịch dễ dàng.

Để biết thêm thông tin về cách sử dụng tiện ích này, hãy xem [tài liệu tiện ích VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tìm hiểu sâu hơn

Nếu bạn muốn tìm hiểu thêm, bạn cũng có thể triển khai [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để quản lý nội dung bên ngoài.
