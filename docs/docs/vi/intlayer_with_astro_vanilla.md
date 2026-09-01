---
createdAt: 2026-04-24
updatedAt: 2026-06-23
title: "Astro + Vanilla JS i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Astro + Vanilla JS đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - đa ngôn ngữ
  - tài liệu
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Tài liệu ban đầu cho Astro + Vanilla JS"
author: aymericzip
---

# Dịch trang web Astro + Vanilla JS của bạn với Intlayer | Đa ngôn ngữ (i18n)

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

## Hướng dẫn từng bước để cấu hình Intlayer trong Astro + Vanilla JS

Xem [mẫu ứng dụng](https://github.com/aymericzip/intlayer-astro-template) trên GitHub.

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

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
npm install intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ i18n để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **astro-intlayer**
  Plugin tích hợp Astro để kết nối Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production); nó cũng bao gồm middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

- **vanilla-intlayer**
  Gói để tích hợp Intlayer vào các ứng dụng Vanilla JavaScript / TypeScript. Nó cung cấp singleton Pub/Sub (`IntlayerClient`) và các hàm hỗ trợ dựa trên callback (`useIntlayer`, `useLocale`, v.v.) để bất kỳ phần nào trong `<script>` Astro của bạn cũng có thể phản ứng với các thay đổi ngôn ngữ mà không cần framework UI.

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

Thêm plugin `intlayer` vào cấu hình Astro của bạn. Không cần tích hợp thêm framework UI nào cho Vanilla JS.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Plugin tích hợp `intlayer()` được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc tạo các file khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer bên trong ứng dụng Astro và cung cấp các alias để tối ưu hóa hiệu suất.

</Step>

<Step number={4} title="Khai báo nội dung của bạn">

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      vi: "Xin chào thế giới",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      vi: "Chào mừng bạn đến với trang web Astro đa ngôn ngữ của tôi.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      vi: "Thay đổi ngôn ngữ:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn, miễn là chúng nằm trong `contentDir` (mặc định là `./src`) và khớp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm thông tin, hãy xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={5} title="Sử dụng nội dung trong Astro">

Với Vanilla JS, tất cả các quá trình render phía máy chủ (SSR) diễn ra trực tiếp trong các file `.astro` bằng cách sử dụng `getIntlayer`. Sau đó, ở phía client, khối `<script>` khởi tạo thư viện `vanilla-intlayer` để cho phép chuyển đổi ngôn ngữ.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Liên kết Canonical -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Liên kết Hreflang -->
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
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

<Step number={6} title="Thêm bộ chuyển đổi ngôn ngữ">

Trong Astro với Vanilla JS, bộ chuyển đổi ngôn ngữ được tạo trên máy chủ dưới dạng các liên kết thông thường và được kích hoạt ở phía client thông qua khối `<script>`. Khi người dùng nhấp vào liên kết ngôn ngữ, `vanilla-intlayer` sẽ thiết lập cookie ngôn ngữ thông qua `setLocale` trước khi điều hướng đến URL bản địa hóa.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- Bao gồm mã nguồn phía máy chủ từ Bước 5 tại đây -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Khởi tạo Intlayer ở client với ngôn ngữ lấy từ đường dẫn hiện tại
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Gắn sự kiện nhấp chuột cho các liên kết chuyển đổi ngôn ngữ
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Lưu ý về tính bền vững:**
> `installIntlayer` khởi tạo singleton Intlayer với ngôn ngữ được định nghĩa bởi máy chủ. `useLocale` cùng với `onLocaleChange` đảm bảo cookie ngôn ngữ được thiết lập trước khi chuyển hướng thông qua middleware, cho phép ghi nhớ tùy chọn ngôn ngữ của người dùng cho các lần truy cập sau.

> **Lưu ý về Progressive Enhancement:**
> Các liên kết trong bộ chuyển đổi ngôn ngữ sẽ hoạt động như mã `<a>` tiêu chuẩn ngay cả khi không có JavaScript. Khi có JavaScript, lệnh gọi `setLocale` sẽ cập nhật cookie trước khi chuyển hướng, đảm bảo middleware xử lý đúng lựa chọn ngôn ngữ.

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa trang Astro không dùng framework UI?">

Tùy chọn `i18n` tích hợp của Astro quản lý tiền tố đường dẫn, nhưng để việc quản lý nội dung cho bạn:

- **Các đối tượng từ điển thủ công**: các đối tượng JSON/TS đơn giản được nhập trên từng trang: không có kiểm tra kiểu, quy tắc số nhiều hay công cụ kiểm tra.
- **`Intlayer`**: nội dung được khai báo cạnh component ([cục bộ hoặc tập trung](https://intlayer.org/blog/per-component-vs-centralized-i18n)), biên dịch lúc build, kiểm tra trong CI, hỗ trợ dịch thuật AI và visual editor.

Khi không dùng framework UI, bạn muốn tránh việc tải thư viện i18n ở runtime, và Intlayer giải quyết nội dung tại thời điểm build để trang tĩnh Astro chứa mã HTML hoàn chỉnh mà không kèm theo từ điển thừa. Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle Astro của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Các trang Astro được hiển thị tại thời điểm build, do đó chỉ có HTML đã dịch được gửi đi mà không kèm theo từ điển; chỉ các đảo (island) tương tác mới nhận từ điển. [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia nội dung theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ i18next hoặc các từ điển thủ công mà không cần viết lại component không?">

Phần lớn là có. Làm theo [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Bước 15 của hướng dẫn này mô tả chi tiết.

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build: quét mã nguồn trên mỗi thay đổi, tạo từ điển và đồng bộ hóa với HMR.

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

<Question title="Tôi có cần JavaScript trên trang để các bản dịch hoạt động không?">

Không. Các trang Astro được render tại thời điểm build và Intlayer giải quyết nội dung trong quá trình render đó, do đó HTML được tạo ra đã chứa sẵn văn bản dịch. Gói `vanilla-intlayer` chỉ cần thiết cho những phần bạn muốn tạo tương tác trong trình duyệt.

</Question>

<Question title="Tôi có thể thêm các đảo tương tác sau này mà không cần thay đổi nội dung không?">

Có, đó là mục tiêu chính của một lớp nội dung duy nhất. Cùng một khai báo được đọc bởi `astro-intlayer` trên trang và bởi các framework binding khi bạn thêm đảo, cho dù là [React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_react.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_vue.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_svelte.md), [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_solid.md), [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_preact.md), hay [Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_astro_lit.md).

</Question>

<Question title="Làm cách nào để thiết lập định tuyến được bản địa hóa và bộ chuyển đổi ngôn ngữ?">

Các bước 6 và 7 của hướng dẫn này giải thích điều đó. `routing.mode` kiểm soát xem ngôn ngữ mặc định có tiền tố (`"prefix-no-default"`), tất cả ngôn ngữ đều có tiền tố (`"prefix-all"`), hay ngôn ngữ độc lập với đường dẫn (`"no-prefix"`). `getLocalizedUrl` chuyển đổi đường dẫn hiện tại sang ngôn ngữ đích mà vẫn giữ người truy cập ở nguyên trang đó.

</Question>

<Question title="Làm cách nào để tạo sitemap được bản địa hóa và thẻ hreflang?">

Bước 8 hướng dẫn cấu hình `sitemap.xml` và `robots.txt`. Hàm `getMultilingualUrls` tạo các liên kết thay thế cho mỗi locale đã khai báo, bao gồm cả `x-default`, giúp công cụ tìm kiếm lập chỉ mục chính xác.

</Question>

<Question title="Làm cách nào tôi có thể dịch trang web tự động bằng AI?">

Chạy `npx intlayer fill`. Lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn sử dụng provider và API key của riêng bạn, và `--git-diff` giới hạn thao tác ở các tệp đã thay đổi. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
