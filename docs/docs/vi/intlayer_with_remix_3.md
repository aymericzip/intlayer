---
createdAt: 2026-09-09
updatedAt: 2026-09-19
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "Sử dụng middleware và hook remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Tài liệu ban đầu cho Remix 3"
author: aymericzip
---

# Dịch trang web Remix 3 của bạn bằng Intlayer | Quốc tế hóa (i18n)

Hướng dẫn này minh họa cách tích hợp **Intlayer** để quốc tế hóa liền mạch trong các ứng dụng **Remix 3** với định tuyến theo ngôn ngữ, khai báo nội dung an toàn kiểu dữ liệu, các thành phần JSX kết xuất phía máy chủ và hỗ trợ đa môi trường thực thi trên Node.js, Bun, Deno và Cloudflare Workers.

## Remix 3 là gì?

**Remix 3** đại diện cho một bước chuyển đổi kiến trúc cơ bản hướng tới một **framework web có thể kết hợp, độc lập với môi trường chạy (runtime-agnostic) và được xây dựng hoàn toàn dựa trên các tiêu chuẩn web**. Thay vì gắn liền với các công cụ đóng gói cụ thể hoặc API máy chủ độc quyền, Remix 3 được phân phối dưới dạng các gói đơn nhiệm có thể kết hợp:

- **`remix/fetch-router`** (hoặc `remix/router`): Định tuyến nhẹ, tuân thủ tiêu chuẩn dựa trên Fetch API (`Request` và `Response`).
- **`remix/ui`**: Mô hình thành phần JSX (`jsxImportSource: "remix/ui"`). Một thành phần là một hàm thiết lập (setup function) trả về một hàm kết xuất (render function), nhận props qua một handle có định kiểu.
- **`remix/middleware/render`**: Cài đặt `context.render(<Page />)` trên mỗi yêu cầu, truyền phát (streaming) cây JSX sang một `Response` HTML.
- **`remix/node-fetch-server`**: Bộ điều hợp máy chủ cho Node.js, hỗ trợ nguyên bản cho Bun, Deno và các môi trường edge.
- **`remix/cookie`**: Phân tích cú pháp và tuần tự hóa cookie được ký bằng mật mã.

Kết hợp với **Intlayer** và gói **`remix-intlayer`**, một middleware ngôn ngữ cùng các hook `useIntlayer` / `useDictionary` / `useLocale` tương tự như `react-intlayer`, được liên kết với ngữ cảnh yêu cầu Remix, bạn sẽ có một hệ thống quốc tế hóa hoàn chỉnh mang lại sự an toàn kiểu tại thời điểm biên dịch, bản dịch AI tự động, kết xuất máy chủ không tốn chi phí và định tuyến ngôn ngữ mượt mà.

## Mục lục

<TOC/>

## Tại sao nên chọn Intlayer thay vì các giải pháp khác?

So với các giải pháp truyền thống như `i18next` hoặc các trình tải bản dịch tùy chỉnh, Intlayer mang lại trải nghiệm nhà phát triển tích hợp được tối ưu hóa cho kiến trúc web hiện đại:

<AccordionGroup>
<Accordion header="Hỗ trợ đầy đủ Remix 3 & Tiêu chuẩn Web">

Intlayer được xây dựng để hoạt động liền mạch với các tiêu chuẩn web (`Request`, `Response`, `Headers` và `URL`). `remix-intlayer` cắm vào bộ định tuyến Fetch của Remix 3 dưới dạng một middleware nhẹ, trích xuất ngôn ngữ từ đường dẫn URL, cookie hoặc tiêu đề `Accept-Language` và hiển thị nó cho phần còn lại của yêu cầu, trình xử lý, chế độ xem và thành phần `remix/ui`, mà không cần truyền thủ công hay ràng buộc bạn vào một runtime cụ thể.

</Accordion>
<Accordion header="Khai báo nội dung an toàn kiểu dữ liệu">

Tạm biệt các khóa JSON lỏng lẻo và các sự cố thiếu khóa khi chạy. Intlayer thực thi kiểm tra TypeScript trên tất cả các ngôn ngữ được khai báo, cảnh báo bạn ngay tại thời điểm xây dựng nếu bản dịch bị thiếu hoặc không hợp lệ.

</Accordion>
<Accordion header="Không phát sinh phụ phí gói bundle trên máy chủ">

Khi sử dụng các thành phần JSX kết xuất phía máy chủ của Remix 3, chỉ văn bản đã phân giải cho ngôn ngữ được yêu cầu mới được ghi vào luồng xuất. Các thành phần chạy hoàn toàn trên máy chủ trừ khi bạn cấu hình rõ ràng việc hydrat hóa phía máy khách thông qua `clientEntry`. Theo mặc định, không có danh mục dịch hay môi trường chạy hydrat hóa nào được gửi tới máy khách.

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

Cài đặt `intlayer`, `remix-intlayer` và `remix` (phiên bản 3) bằng trình quản lý gói ưa thích của bạn:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Công cụ quốc tế hóa cốt lõi cung cấp quản lý cấu hình, khai báo từ điển (`t()`, `Dictionary`), các công cụ CLI và trình thông dịch lúc chạy.
- **`remix-intlayer`**: Tích hợp Remix 3: middleware bộ định tuyến `intlayer()` phân giải ngôn ngữ của mỗi yêu cầu, và các hook `useIntlayer`, `useDictionary` và `useLocale` đọc ngôn ngữ đó ở bất kỳ vị trí nào phía sau.
- **`remix`**: Gói khung thống nhất Remix 3 xuất ra `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` và `remix/node-fetch-server`.

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
<Step number={5} title="Thêm Middleware Intlayer">

Remix 3 cung cấp quy trình middleware có thể kết hợp thông qua `createRouter({ middleware: [...] })`.

`remix-intlayer` cung cấp middleware `intlayer()`. Đối với mỗi yêu cầu đến, nó phân giải ngôn ngữ bằng cách sử dụng:

1. URL, trong mọi chế độ định tuyến ngoại trừ `no-prefix`: tiền tố đường dẫn (ví dụ `/vi` hoặc `/en`) hoặc tham số tìm kiếm `?locale=`.
2. Ngôn ngữ được lưu bởi máy khách: cookie lưu trữ (`INTLAYER_LOCALE`) hoặc tiêu đề tùy chỉnh (`x-intlayer-locale`).
3. Thương lượng `Accept-Language` tiêu chuẩn, dự phòng về `defaultLocale` đã định cấu hình của bạn.

Kết quả được lưu trữ trong ngữ cảnh yêu cầu Remix dưới dạng `context.intlayer` (hoặc `context.get(Intlayer)`), cùng với `locale`, `defaultLocale` và `availableLocales`. Middleware sau đó chạy phần còn lại của yêu cầu bên trong phạm vi `AsyncLocalStorage` được liên kết với ngữ cảnh đó, cho phép các hook của gói đọc ngôn ngữ mà không cần đối số, trong các trình xử lý tuyến đường, chế độ xem cũng như các thành phần `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Bất cứ nơi nào phía sau middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` hoặc `useIntlayer("faq", { item: 2 })` ghi đè ngôn ngữ yêu cầu cho một lệnh gọi, và `useDictionary(homeContent)` đọc từ điển đã nhập thay vì một khóa. Bên ngoài một yêu cầu, các hook sẽ quay về ngôn ngữ mặc định.

> Middleware cũng chuẩn bị các từ điển Intlayer khi máy chủ khởi động, do đó việc thiếu `intlayer build` sẽ không để lại sổ đăng ký trống rỗng.

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
<Step number={7} title="Kết xuất các trang được bản địa hóa bằng JSX">

Remix 3 sử dụng `remix/ui` cho các thành phần JSX. Một thành phần là một **hàm thiết lập (setup function)** trả về một **hàm kết xuất (render function)**. Props được truyền qua một `handle` có định kiểu (ví dụ: `handle.props.locale`):

Bắt đầu với một khung `Document` dùng chung thiết lập các thuộc tính `<html lang="..." dir="...">` từ ngôn ngữ được phân giải bởi middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Sau đó tạo trang chủ. Nó đọc từ điển bản địa hóa bằng `useIntlayer` và hiển thị bộ chuyển đổi ngôn ngữ:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX không phải là React: `class` được viết nguyên trạng (`className` cũng được chấp nhận), và việc kết xuất lại được kích hoạt rõ ràng bằng `handle.update()`. Các giá trị nội suy được thoát tự động. Các hook Intlayer là các hàm thông thường đọc phạm vi yêu cầu, vì vậy chúng có thể được gọi từ hàm setup hoặc hàm render.

</Step>
<Step number={8} title="Kết nối router và máy chủ">

Tạo `src/router.tsx` để đăng ký middleware và định nghĩa các hành động định tuyến. Sử dụng `remix/middleware/render` để cài đặt trình trợ giúp `context.render()`, và truyền trực tiếp thành phần JSX của bạn:

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` chấp nhận một `ResponseInit` tùy chọn làm đối số thứ hai, ví dụ: `context.render(<NotFoundPage />, { status: 404 })`. Ngôn ngữ đã phân giải vẫn có thể truy cập được từ trình xử lý dưới dạng `context.intlayer.locale`, chẳng hạn để tạo tải trọng `Response.json`.

Bây giờ hãy kết nối `src/server.ts` bằng cách sử dụng `remix/node-fetch-server` cho Node.js (hoặc xuất trình xử lý `fetch` trực tiếp cho Bun, Deno, hoặc Cloudflare Workers):

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Máy chủ HTTP Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${PORT}`);
});

// Xuất cho Bun / Deno / Cloudflare Workers
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

Cấu hình `tsconfig.json` để trỏ JSX đến runtime `remix/ui` và bao gồm các kiểu `.intlayer` đã tạo:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` là yếu tố giúp `<HomePage />` phân giải thành hàm `createElement` của Remix thay vì của React. Không có runtime React nào được tải.

## Kết luận

Với Remix 3 và Intlayer, bạn sở hữu một ngăn xếp công nghệ tinh gọn, được định kiểu hoàn chỉnh và có khả năng di chuyển linh hoạt trên nhiều môi trường chạy tuân thủ các tiêu chuẩn web mở. Ứng dụng của bạn có thể mở rộng dễ dàng từ các trang tiếp thị bản địa hóa đơn giản đến các dịch vụ kết xuất tại vùng biên (edge) phân tán trên toàn cầu.
