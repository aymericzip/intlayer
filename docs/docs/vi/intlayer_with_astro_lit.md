---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - Cách dịch ứng dụng Astro + Lit vào năm 2026
description: Tìm hiểu cách thêm đa ngôn ngữ (i18n) vào trang web Astro + Lit của bạn bằng Intlayer. Làm theo hướng dẫn này để trang web của bạn có thể sử dụng nhiều ngôn ngữ.
keywords:
  - đa ngôn ngữ
  - tài liệu
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Tài liệu ban đầu cho Astro + Lit"
---

# Dịch trang web Astro + Lit của bạn với Intlayer | Đa ngôn ngữ (i18n)

## Intlayer là gì?

**Intlayer** là một thư viện đa ngôn ngữ (i18n) mã nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ nhiều ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng**: Sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động các metadata, route và nội dung**.
- **Đảm bảo hỗ trợ TypeScript**: Với các kiểu dữ liệu được tạo tự động để tự động hoàn thành và phát hiện lỗi tốt hơn.
- **Tận dụng các tính năng nâng cao**: Như phát hiện ngôn ngữ động và chuyển đổi ngôn ngữ.

---

## Hướng dẫn từng bước để cấu hình Intlayer trong Astro + Lit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách đa ngôn ngữ hóa ứng dụng của bạn với Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [mẫu ứng dụng](https://github.com/aymericzip/intlayer-astro-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ i18n để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **astro-intlayer**
  Plugin tích hợp Astro để kết nối Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production); nó cũng bao gồm middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

- **lit**
  Gói Lit cốt lõi để xây dựng các Web Components nhanh và nhẹ.

- **lit-intlayer**
  Gói để tích hợp Intlayer vào các ứng dụng Lit. Nó cung cấp các hook dựa trên `ReactiveController` (`useIntlayer`, `useLocale`, v.v.) để tự động thông báo cho LitElement render lại khi ngôn ngữ thay đổi.

- **@astrojs/lit**
  Tích hợp chính thức của Astro cho phép sử dụng các Lit custom elements bên trong các trang Astro.

### Bước 2: Cấu hình dự án của bạn

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

### Bước 3: Tích hợp Intlayer vào cấu hình Astro của bạn

Thêm plugin `intlayer` vào cấu hình Astro và tích hợp Lit của bạn.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Plugin tích hợp `intlayer()` được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc tạo các file khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer bên trong ứng dụng Astro và cung cấp các alias để tối ưu hóa hiệu suất.

> Tích hợp `lit()` cho phép sử dụng các Lit custom elements bên trong các trang Astro.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      vi: "Xin chào thế giới",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      vi: "Chào mừng bạn đến với trang web Astro + Lit đa ngôn ngữ của tôi.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Các khai báo nội dung có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn, miễn là chúng nằm trong `contentDir` (mặc định là `./src`) và khớp với phần mở rộng của file khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm thông tin, hãy xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng nội dung trong Astro

Bạn có thể sử dụng các từ điển trực tiếp trong các file `.astro` bằng cách sử dụng các hàm hỗ trợ cốt lõi được xuất từ `intlayer`. Bạn cũng nên thêm metadata cho SEO (như hreflang và liên kết canonical) vào mỗi trang. Các Lit custom elements được nhập qua khối `<script>` phía client và được đặt trong body.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
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
    <!-- Lit custom element — nhận ngôn ngữ được phát hiện bởi máy chủ dưới dạng thuộc tính -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **Lưu ý về thiết lập định tuyến:**
> Cấu trúc thư mục bạn sử dụng phụ thuộc vào cài đặt `middleware.routing` trong `intlayer.config.ts`:
>
> - **`prefix-no-default` (mặc định):** Giữ ngôn ngữ mặc định ở root (không có tiền tố) và thêm tiền tố cho các ngôn ngữ khác. Sử dụng `[...locale]` để bao gồm tất cả các trường hợp.
> - **`prefix-all`:** Tất cả các URL đều có tiền tố ngôn ngữ. Bạn có thể sử dụng `[locale]` tiêu chuẩn nếu không cần xử lý root riêng biệt.
> - **`search-param` hoặc `no-prefix`:** Không yêu cầu các thư mục ngôn ngữ. Ngôn ngữ được quản lý qua tham số truy vấn hoặc cookie.

### Bước 6: Tạo một Lit Custom Element

Tạo một Lit custom element. Gọi `installIntlayer` trong `connectedCallback` bằng cách sử dụng thuộc tính `locale` dựa trên máy chủ để khởi tạo singleton quản lý bản dịch ở phía client.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Khởi tạo với ngôn ngữ được máy chủ phát hiện
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Bộ chuyển đổi ngôn ngữ render bên trong LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Thay đổi ngôn ngữ:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> Thuộc tính `locale` được truyền từ trang Astro (phát hiện phía máy chủ) và được sử dụng trong `connectedCallback` để khởi động `installIntlayer`, thiết lập ngôn ngữ ban đầu cho tất cả các `ReactiveController` hook bên trong thành phần.

> `useIntlayer` được đăng ký như một `ReactiveController`. Nó sẽ tự động yêu cầu thành phần render lại khi ngôn ngữ thay đổi, do đó không cần thêm logic đăng ký (subscription) nào.

### Bước 7: Thêm bộ chuyển đổi ngôn ngữ

Chức năng chuyển đổi ngôn ngữ được tích hợp trực tiếp vào phương thức `render()` của Lit custom element (xem Bước 6 ở trên). Nó sử dụng `useLocale` từ `lit-intlayer` và điều hướng đến URL bản địa hóa khi người dùng chọn ngôn ngữ mới:

```typescript fileName="src/components/lit/LitDemo.ts"
// Bên trong lớp LitElement, sau khi thiết lập useLocale từ Bước 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Điều hướng đến URL bản địa hóa khi thay đổi ngôn ngữ
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Thay đổi ngôn ngữ:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Lưu ý về tính phản ứng trong Lit:**
> `useLocale` trả về một `ReactiveController`. Khi `setLocale` được gọi, controller sẽ tự động yêu cầu một bản cập nhật render, cập nhật trạng thái của các nút mà không cần thao tác DOM thủ công.

> **Lưu ý về tính bền vững:**
> Việc sử dụng `onLocaleChange` để chuyển hướng qua `window.location.href` đảm bảo rằng một URL ngôn ngữ mới sẽ được truy cập. Điều này cho phép middleware Intlayer thiết lập cookie ngôn ngữ và ghi nhớ lựa chọn của người dùng cho các lần truy cập sau.

### Bước 8: Sitemap và Robots.txt

Intlayer cung cấp các tiện ích để tự động tạo sơ đồ trang web (sitemap) bản địa hóa và file robots.txt của bạn.

#### Sitemap

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Cấu hình TypeScript

Intlayer sử dụng cơ chế mở rộng module (module augmentation) để tận dụng TypeScript, làm cho cơ sở mã của bạn mạnh mẽ hơn. Nếu bạn đang sử dụng cú pháp decorators, hãy đảm bảo rằng bạn đã bật `experimentalDecorators` trong compiler options.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu dữ liệu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Bắt buộc để hỗ trợ decorators trong Lit
  },
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
