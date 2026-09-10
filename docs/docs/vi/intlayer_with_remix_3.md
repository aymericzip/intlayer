---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn cần đến i18next. Hướng dẫn năm 2026 để xây dựng ứng dụng Remix 3 đa ngôn ngữ (i18n). Dịch bằng các tác tử AI và tối ưu hóa kích thước gói bundle, SEO và hiệu năng."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Tiêu chuẩn Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Tài liệu ban đầu cho Remix 3"
author: aymericzip
---

# Dịch trang web Remix 3 của bạn bằng Intlayer | Quốc tế hóa (i18n)

Hướng dẫn này minh họa cách tích hợp **Intlayer** để quốc tế hóa liền mạch trong các ứng dụng **Remix 3** với định tuyến theo ngôn ngữ, khai báo nội dung an toàn kiểu dữ liệu, mẫu HTML an toàn và hỗ trợ đa môi trường thực thi trên Node.js, Bun, Deno và Cloudflare Workers.

## Remix 3 là gì?

**Remix 3** đại diện cho một bước chuyển đổi kiến trúc cơ bản hướng tới một **framework web có thể kết hợp, độc lập với môi trường chạy (runtime-agnostic) và được xây dựng hoàn toàn dựa trên các tiêu chuẩn web**. Thay vì gắn liền với các công cụ đóng gói cụ thể hoặc API máy chủ độc quyền, Remix 3 được phân phối dưới dạng các gói đơn nhiệm có thể kết hợp:

- **`remix/fetch-router`** (hoặc `remix/router`): Định tuyến nhẹ, tuân thủ tiêu chuẩn dựa trên Fetch API (`Request` và `Response`).
- **`remix/html-template`**: Chuỗi mẫu HTML an toàn với tính năng tự động bảo vệ chống XSS và ghép mảnh.
- **`remix/response/html`**: Các tiện ích phản hồi để phân phối HTML với ngữ nghĩa HTTP tiêu chuẩn.
- **`remix/node-fetch-server`**: Bộ điều hợp máy chủ cho Node.js, hỗ trợ nguyên bản cho Bun, Deno và các môi trường edge.
- **`remix/cookie`**: Phân tích cú pháp và tuần tự hóa cookie an toàn bằng mật mã.

Khi kết hợp với **Intlayer**, bạn sẽ có một hệ thống quốc tế hóa hoàn chỉnh mang lại sự an toàn trong thời gian biên dịch, bản dịch tự động bằng AI, kết xuất phía máy chủ không phát sinh phụ phí và định tuyến ngôn ngữ mượt mà.

## Mục lục

<TOC/>

## Tại sao nên chọn Intlayer thay vì các giải pháp khác?

So với các giải pháp truyền thống như `i18next` hoặc các trình tải bản dịch tùy chỉnh, Intlayer mang lại trải nghiệm nhà phát triển tích hợp được tối ưu hóa cho kiến trúc web hiện đại:

<AccordionGroup>
<Accordion header="Hỗ trợ đầy đủ Remix 3 & Tiêu chuẩn Web">

Intlayer được xây dựng để hoạt động trơn tru với các tiêu chuẩn web (`Request`, `Response`, `Headers` và `URL`). Nó tích hợp dễ dàng vào router Fetch của Remix 3 thông qua middleware nhẹ, trích xuất ngôn ngữ từ đường dẫn URL, cookie hoặc tiêu đề `Accept-Language` mà không ràng buộc bạn vào một runtime cụ thể.

</Accordion>
<Accordion header="Khai báo nội dung an toàn kiểu dữ liệu">

Tạm biệt các khóa JSON lỏng lẻo và các sự cố thiếu khóa khi chạy. Intlayer thực thi kiểm tra TypeScript trên tất cả các ngôn ngữ được khai báo, cảnh báo bạn ngay tại thời điểm xây dựng nếu bản dịch bị thiếu hoặc không hợp lệ.

</Accordion>
<Accordion header="Không phát sinh phụ phí gói bundle trên máy chủ">

Khi sử dụng các mẫu HTML kết xuất phía máy chủ của Remix 3 (`remix/html-template`), chỉ văn bản đã phân giải cho ngôn ngữ được yêu cầu mới được đưa vào luồng xuất. Không cần các gói hydrat hóa phía máy khách hoặc các danh mục dịch cồng kềnh trừ khi được yêu cầu rõ ràng.

</Accordion>
<Accordion header="Sẵn sàng cho AI Agent & Tự động hóa">

Intlayer sắp xếp các khai báo nội dung (`.content.ts`) cùng với logic định tuyến của bạn, giảm ngữ cảnh mã thông báo (token) cần thiết cho các Mô hình Ngôn ngữ Lớn (LLM). Các lệnh CLI tích hợp như `intlayer fill` và `intlayer test` cho phép bạn tự động hóa việc dịch trong các quy trình CI/CD với chi phí trực tiếp từ nhà cung cấp AI của bạn.

</Accordion>
<Accordion header="Trình biên tập trực quan & Tích hợp CMS">

Vượt ra ngoài quy trình làm việc ưu tiên mã nguồn, Intlayer cung cấp một [Trình biên tập trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) tự lưu trữ và một [CMS từ xa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), cho phép các biên tập viên và dịch giả cập nhật nội dung mà không cần triển khai lại mã.

</Accordion>
</AccordionGroup>

## Hướng dẫn từng bước

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản thử nghiệm CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản xem trước" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản thử nghiệm mẫu Intlayer Remix 3"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-remix-3-template) trên GitHub.

<Steps>
<Step number={1} title="Cài đặt các gói phụ thuộc">

Cài đặt `intlayer` và `remix` (phiên bản 3) bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Công cụ quốc tế hóa cốt lõi cung cấp quản lý cấu hình, khai báo từ điển (`t()`, `Dictionary`), các công cụ CLI và trình thông dịch lúc chạy.
- **`remix`**: Gói khung thống nhất Remix 3 xuất ra `remix/router`, `remix/routes`, `remix/html-template` và `remix/node-fetch-server`.

</Step>
<Step number={2} title="Cấu hình Intlayer">

Tạo tệp `intlayer.config.ts` trong thư mục gốc của dự án để khai báo các ngôn ngữ được hỗ trợ và cài đặt quốc tế hóa:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.VIETNAMESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.VIETNAMESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.VIETNAMESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Để biết thêm các tùy chọn cấu hình bổ sung, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>
<Step number={3} title="Khai báo nội dung đa ngôn ngữ">

Khai báo nội dung đã dịch của bạn trong tệp `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      vi: "Chào mừng bạn đến với Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      vi: "Một ứng dụng theo tiêu chuẩn web, có thể kết hợp với tính năng i18n nguyên bản.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      vi: "Đổi ngôn ngữ:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer cũng hỗ trợ các định dạng JSON, YAML và CommonJS. Xem [Tài liệu Khai báo Nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>
<Step number={4} title="Xây dựng từ điển Intlayer">

Biên dịch các định nghĩa từ điển để tạo các kiểu TypeScript và sổ đăng ký runtime:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Thao tác này sẽ biên dịch nội dung của bạn vào thư mục tạo phẩm `.intlayer`, cho phép tự động hoàn thành TypeScript đầy đủ và tra cứu từ điển nhanh chóng.

</Step>
<Step number={5} title="Triển khai Middleware Intlayer">

Remix 3 cung cấp một đường ống middleware có thể kết hợp thông qua `createRouter({ middleware: [...] })`.

Tạo một middleware Intlayer để giải quyết ngôn ngữ của mỗi yêu cầu gửi đến theo thứ tự ưu tiên:

1. Tiền tố đường dẫn URL thông qua `getLocaleFromPath` (ví dụ: `/vi` hoặc `/fr`).
2. Trợ giúp `getLocale` của Intlayer, tự động đàm phán qua cookie lưu trữ (`INTLAYER_LOCALE`), tiêu đề tùy chỉnh (`x-intlayer-locale`), tiêu đề `Accept-Language` tiêu chuẩn và `defaultLocale` của bạn.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Khóa ngữ cảnh an toàn kiểu để lấy ngôn ngữ đã giải quyết từ Remix 3 RequestContext.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer cho Remix 3.
 *
 * Giải quyết ngôn ngữ yêu cầu theo thứ tự ưu tiên:
 * 1. Tiền tố đường dẫn URL (ví dụ: `/vi/...`) qua `getLocaleFromPath`
 * 2. Đàm phán tiêu đề & lưu trữ qua `getLocale` (cookie, tiêu đề tùy chỉnh, Accept-Language, fallback defaultLocale)
 *
 * Đính kèm ngôn ngữ đã giải quyết vào Remix 3 RequestContext.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Phát hiện đường dẫn (/vi/about -> "vi", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Đính kèm ngôn ngữ đã giải quyết vào ngữ cảnh yêu cầu Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Đính kèm ngôn ngữ đã giải quyết vào ngữ cảnh yêu cầu Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Xác định các tuyến an toàn kiểu">

Xác định các tuyến ứng dụng của bạn bằng `route()` từ `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Tuyến đường mặc định của ngôn ngữ
  home: "/",

  // Tuyến đường được bản địa hóa với đoạn động :locale
  localizedHome: "/:locale",
});
```

Việc sử dụng `route()` giúp bạn tạo URL an toàn về mặt kiểu dữ liệu trong toàn bộ ứng dụng của mình:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "vi" }); // "/vi"
```

</Step>
<Step number={7} title="Hiển thị các mẫu HTML đã được bản địa hóa">

Remix 3 sử dụng `remix/html-template` để tạo HTML an toàn và tự động thoát chuỗi nguy hiểm. Tạo một hàm hiển thị để trích xuất từ điển đã dịch bằng `getIntlayer`, thiết lập các thuộc tính `<html lang="..." dir="...">` và hiển thị bộ chọn ngôn ngữ:

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="Kết nối ứng dụng máy chủ">

Kết nối router, middleware và các hành động định tuyến lại với nhau trong `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Khởi tạo router với middleware Intlayer
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Ánh xạ các trình xử lý tuyến đường
router.map(routes, {
  actions: {
    // Tuyến ngôn ngữ mặc định
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Tuyến ngôn ngữ được bản địa hóa
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. Khởi động máy chủ
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${PORT}`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Kiểm tra và tự động điền bản dịch">

Intlayer cung cấp một CLI để kiểm tra các bản dịch còn thiếu và tự động điền chúng bằng AI:

```bash packageManager="npm"
# Kiểm tra các bản dịch còn thiếu
npx intlayer test

# Tự động điền các bản dịch còn thiếu bằng AI
npx intlayer fill
```

```bash packageManager="pnpm"
# Kiểm tra các bản dịch còn thiếu
pnpm dlx intlayer test

# Tự động điền các bản dịch còn thiếu bằng AI
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Kiểm tra các bản dịch còn thiếu
yarn dlx intlayer test

# Tự động điền các bản dịch còn thiếu bằng AI
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Kiểm tra các bản dịch còn thiếu
bun x intlayer test

# Tự động điền các bản dịch còn thiếu bằng AI
bun x intlayer fill
```

</Step>
</Steps>

## Cấu hình TypeScript

Đảm bảo rằng `tsconfig.json` của bạn bao gồm các loại `.intlayer` đã tạo:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## Kết luận

Với Remix 3 và Intlayer, bạn sở hữu một ngăn xếp công nghệ tinh gọn, được định kiểu hoàn chỉnh và có khả năng di chuyển linh hoạt trên nhiều môi trường chạy tuân thủ các tiêu chuẩn web mở. Ứng dụng của bạn có thể mở rộng dễ dàng từ các trang tiếp thị bản địa hóa đơn giản đến các dịch vụ kết xuất tại vùng biên (edge) phân tán trên toàn cầu.
