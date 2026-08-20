---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng SolidStart đa ngôn ngữ (i18n). Định tuyến locale được render trên server, hreflang, sitemap và dịch thuật với sự hỗ trợ của AI."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Dịch trang web SolidStart của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Vite và Solid? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

Hướng dẫn này bao gồm một ứng dụng SolidStart **được render trên server (SSR)**: việc phát hiện locale diễn ra theo từng yêu cầu, các trang được render trên server theo đúng ngôn ngữ, và các tín hiệu `<html lang>`, `hreflang` cũng như sitemap mà các công cụ tìm kiếm cần sẽ được phát ra từ phía server.

## Tại sao chọn Intlayer thay vì các giải pháp khác?

So với các giải pháp chính như `@solid-primitives/i18n` hoặc `i18next`, Intlayer là một giải pháp đi kèm với các tối ưu hóa tích hợp sẵn như:

<AccordionGroup>

<Accordion header="Hỗ trợ Solid toàn diện">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Solid bằng cách cung cấp **phạm vi nội dung ở cấp độ thành phần**, **dịch thuật phản ứng (reactive)** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON khổng lồ vào trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Giới hạn phạm vi nội dung của ứng dụng **giúp dễ dàng bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể nhân bản hoặc xóa một thư mục tính năng duy nhất mà không gánh nặng tinh thần phải xem lại toàn bộ mã nguồn nội dung của mình. Ngoài ra, Intlayer được **kiểu hóa hoàn toàn (fully typed)** để đảm bảo độ chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="AI Agent">

Đặt nội dung cùng vị trí **giảm bớt ngữ cảnh cần thiết** cho các Mô hình Ngôn ngữ Lớn (LLM). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch còn thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để giúp trải nghiệm nhà phát triển (DX) trở nên mượt mà hơn nữa cho các AI agent.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí từ nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **bộ biên dịch (compiler)** để tự động hóa việc trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch trong nền**.

</Accordion>

<Accordion header="Hiệu suất">

Việc kết nối các tệp JSON khổng lồ với các thành phần có thể dẫn đến các vấn đề về hiệu suất và tính phản ứng. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

</Accordion>

<Accordion header="Mở rộng quy mô với những người không phải lập trình viên">

Không chỉ là một giải pháp i18n, Intlayer cung cấp một **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) tự host** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ theo **thời gian thực**, giúp việc hợp tác với biên dịch viên, người viết nội dung và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng SolidStart

<Steps>

<Step number={1} title="Cài đặt các gói phụ thuộc">

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

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một AI agent.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói bắt buộc. Ví dụ:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), biên dịch và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  Gói tích hợp Intlayer với ứng dụng Solid. Nó cung cấp các context provider và hook cho quốc tế hóa trong Solid.

- **vite-intlayer**

  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như trình xử lý định tuyến locale để phát hiện locale ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

> `vite-intlayer` ở đây là một mối bận tâm phía server, không chỉ ở thời điểm build: nó cung cấp trình xử lý yêu cầu mà server Nitro của SolidStart chạy. Giữ nó trong `dependencies` là lựa chọn mặc định an toàn — bạn chỉ nên chuyển nó sang `devDependencies` nếu bạn triển khai thư mục `.output` đã được build, nơi Nitro tích hợp trực tiếp trình xử lý đó vào.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo tệp cấu hình để định cấu hình ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
    mode: "prefix-no-default",
  },
};

export default config;
```

Với `prefix-no-default`, locale mặc định được phục vụ từ các URL không có tiền tố:

```plaintext
/            /about          → Tiếng Anh (locale mặc định)
/fr          /fr/about       → Tiếng Pháp
/es          /es/about       → Tiếng Tây Ban Nha
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt nhật ký Intlayer trong console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số khả dụng, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào Cấu hình Vite của bạn">

Thêm plugin Intlayer vào cấu hình của bạn:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Plugin Vite `intlayer()` xây dựng các tệp khai báo nội dung của bạn, theo dõi chúng ở chế độ phát triển và định nghĩa các biến môi trường Intlayer bên trong ứng dụng. Nó cũng cung cấp các alias giúp tối ưu hóa hiệu suất.

### Định tuyến locale đi kèm với plugin

SolidStart chạy trên [Nitro](https://nitro.build), và `intlayer()` đăng ký trình xử lý định tuyến locale của nó trực tiếp vào đường ống server của Nitro (bằng tùy chọn `routing.enableProxy`, mặc định là `true`). Không cần kết nối thêm điều gì: trên server đã build, mọi yêu cầu đều được kiểm tra trước khi đến được router, và

- locale được đọc từ tiền tố URL, sau đó đến cookie `INTLAYER_LOCALE`, rồi đến header `Accept-Language`;
- URL không có tiền tố sẽ được chuyển hướng đến bản tương ứng được địa phương hóa khi locale được xác định không phải là locale mặc định (`/` → `/fr`);
- URL có tiền tố dư thừa sẽ được chuyển hướng trở lại dạng chuẩn của nó (`/en/about` → `/about`);
- cookie locale được ghi lại vào response.

</Step>

<Step number={4} title="Khai báo Nội dung của bạn">

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ bản dịch:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Lưu ý đặc thù của SolidStart**: mọi tệp `.ts` / `.tsx` dưới `src/routes` đều trở thành một route, và tệp `.content.ts` có một export mặc định, nên nó sẽ bị nhận diện là một trang. Giữ các khai báo nội dung của **trang** ngoài thư mục routes (`src/contents/` hoạt động tốt). Nội dung của **thành phần (component)** có thể giữ cùng vị trí, vì `src/components` không bị quét bởi router dựa trên hệ thống tệp.

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng nằm trong thư mục `contentDir` (mặc định là `./src`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Thêm định tuyến được địa phương hóa">

Mục tiêu của bước này là cung cấp cho mỗi ngôn ngữ URL riêng, giúp các công cụ tìm kiếm lập chỉ mục.

Di chuyển các trang của bạn vào dưới một **segment động tùy chọn**. Trong router dựa trên hệ thống tệp của SolidStart, `[[locale]]` sẽ biên dịch thành mẫu đường dẫn `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← layout xác thực segment
  [[locale]]/
    index.tsx             → /        và /fr        và /es
    about.tsx             → /about   và /fr/about  và /es/about
  [...404].tsx            → bắt tất cả các trường hợp khác
```

Nhiệm vụ duy nhất của tệp layout là giới hạn segment vào locale đã được cấu hình:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` mở rộng `:locale?` thành hai mẫu — một có segment và một không — và thử chúng theo thứ tự độ ưu tiên giảm dần. `matchFilters` là yếu tố tạo nên sự khác biệt giữa thiết lập hoạt động tốt và thiết lập gây nhầm lẫn:

| URL         | Không có `matchFilters`                                 | Có `matchFilters`                             |
| ----------- | ------------------------------------------------------- | --------------------------------------------- |
| `/fr/about` | Trang giới thiệu tiếng Pháp                             | Trang giới thiệu tiếng Pháp                   |
| `/about`    | Trang giới thiệu (segment tĩnh thắng)                   | Trang giới thiệu                              |
| `/unknown`  | **Trang chủ**, một cách thầm lặng, với `locale=unknown` | Không khớp → chuyển sang trang 404 bắt tất cả |

> Ưu tiên `[locale]` (bắt buộc) hơn `[[locale]]` nếu bạn sử dụng chế độ định tuyến `'prefix-all'`, và loại bỏ hoàn toàn segment cho `'no-prefix'` hoặc `'search-params'`.

</Step>

<Step number={6} title="Cung cấp locale cho ứng dụng của bạn">

URL là nguồn sự thật duy nhất cho locale: middleware đã chuyển hướng yêu cầu đến đường dẫn được địa phương hóa, vì vậy việc đọc đường dẫn trong root layout giữ cho việc render trên server và hydration trên client đồng bộ, đồng thời làm cho mọi điều hướng phía client tự động cập nhật locale.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Server render <html> trong entry-server.tsx; điều hướng phía client
  // giữa các locale phải tự cập nhật các thuộc tính.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` phản ứng với prop `locale` của nó, vì vậy việc truyền cuộc gọi accessor `locale()` bên trong JSX là đủ — Solid biên dịch nó thành một getter, và toàn bộ cây component sẽ render lại theo ngôn ngữ mới khi URL thay đổi.

</Step>

<Step number={7} title="Thiết lập thuộc tính lang và dir cho HTML trên server">

Thẻ `<html>` được render bởi `entry-server.tsx`, nằm ngoài `Router`. Thay vào đó, hãy đọc locale từ URL của yêu cầu:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Bây giờ, các trình thu thập thông tin (crawlers) nhận được đúng ngôn ngữ ngay từ byte đầu tiên:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Sử dụng Intlayer trong các Trang của bạn">

Truy cập các từ điển nội dung trong toàn bộ ứng dụng của bạn:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Trong Solid, `useIntlayer` trả về nội dung phản ứng (ví dụ: `content`). Bạn có thể truy cập các thuộc tính của nó trực tiếp.

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính kiểu `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn có thể sử dụng giá trị của hàm, như:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Các nút nội dung không chỉ giới hạn ở các bản dịch đơn thuần. Ví dụ, một bộ đếm số nhiều:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` lựa chọn danh mục thông qua `Intl.PluralRules` cho locale đang hoạt động, do đó các ngôn ngữ có nhiều hơn hai dạng số nhiều vẫn hoạt động mà không cần thêm code.

</Step>

<Step number={9} title="Tạo Thành phần Link được Địa phương hóa">

Tạo một thành phần `Link` tùy chỉnh tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Việc viết `href="/about"` một lần giờ đây sẽ tạo ra `/about`, `/fr/about` hoặc `/es/about` tùy thuộc vào locale đang hoạt động — không cần thêm tiền tố thủ công ở bất kỳ đâu trên các trang của bạn.

</Step>

<Step number={10} title="Tạo Thành phần Chuyển đổi Locale">

Render bộ chuyển đổi dưới dạng **thẻ anchor thực sự** thay vì `<select>`: mỗi ngôn ngữ của trang hiện tại trở thành một liên kết có thể thu thập thông tin và có thể mở trong thẻ mới, điều mà trình điều khiển chỉ bằng JavaScript không thể cung cấp.

`getPathWithoutLocale` loại bỏ segment locale khỏi đường dẫn hiện tại, và `getLocalizedUrl` xây dựng lại nó cho locale đích, để các liên kết tuân theo chế độ định tuyến của bạn mà không cần hard-code bất kỳ điều gì. Việc điều hướng là thứ thay đổi locale được render — route `[[locale]]` suy ra locale từ URL — trong khi `setLocale` lưu lựa chọn vào cookie `INTLAYER_LOCALE` để lần truy cập sau vào URL không có locale sẽ giải quyết về cùng một ngôn ngữ.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Đường dẫn chuẩn (không có locale) của trang đang hiển thị
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Chỉ khớp chính xác, để liên kết locale mặc định không bị đánh dấu
              // hoạt động trên mọi trang
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Đảm bảo nút "quay lại" của trình duyệt trở về trang trước đó
              replace
            >
              {/* Ngôn ngữ theo locale của chính nó - ví dụ: Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Trong Solid, `locale` từ `useLocale` là một **signal accessor**. Sử dụng `locale()` (có dấu ngoặc đơn) để đọc giá trị hiện tại của nó một cách phản ứng.
>
> `getLocaleName(localeItem)` render mỗi ngôn ngữ bằng chính ngôn ngữ đó — `English / Français / Español`. Truyền tham số thứ hai để dịch tên ngôn ngữ sang ngôn ngữ đang hiển thị: `getLocaleName(localeItem, locale())` trả về `English / French / Spanish` bằng tiếng Anh, `anglais / français / espagnol` bằng tiếng Pháp.
>
> `<A>` đã tự động thiết lập `aria-current="page"` trên liên kết khớp với URL hiện tại, nên không cần thêm gì cho việc đó. `replace` được đọc từ thuộc tính được render bởi router: nó thay thế mục lịch sử thay vì đẩy thêm một mục mới, để nút "quay lại" của trình duyệt trở về trang đã truy cập trước khi chuyển đổi thay vì trở về cùng trang đó ở ngôn ngữ trước.
>
> `dir` và `hreflang` trên mỗi liên kết giữ cho tên ngôn ngữ viết từ phải sang trái được định hướng đúng và báo cho các công cụ hỗ trợ cũng như trình thu thập thông tin biết mỗi liên kết trỏ đến ngôn ngữ nào.
>
> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Phát ra các liên kết canonical và hreflang" isOptional={true}>

Các chú thích `hreflang` báo cho các công cụ tìm kiếm biết rằng `/about`, `/fr/about` và `/es/about` là cùng một trang ở các ngôn ngữ khác nhau. `getMultilingualUrls` suy ra chúng từ đường dẫn chuẩn (không có locale), tuân theo chế độ định tuyến của bạn, nên không có gì bị hard-code:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** URL tuyệt đối của trang đang được render. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Render nó trong thẻ head của tài liệu, nơi URL yêu cầu khả dụng:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … bên trong <head>, bên cạnh các thẻ meta khác:
<AlternateLinks url={url} />;
```

`GET /fr/about` sau đó sẽ trả về:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Lưu ý về `@solidjs/meta`**: tại thời điểm viết bài, `<Title>` và `<Meta>` từ `@solidjs/meta` được áp dụng ở phía client sau khi hydration nhưng **không** được phát vào `<head>` được render trên server trong SolidStart v2. Cho đến khi điều đó được khắc phục ở phía thượng nguồn, hãy render các thẻ mà trình thu thập thông tin phải thấy mà không cần JavaScript — `canonical`, `hreflang`, và nếu cần `title` / `description` — trực tiếp trong `entry-server.tsx`, như hiển thị ở trên.

</Step>

<Step number={12} title="Quản lý trang không tìm thấy (404)" isOptional={true}>

Một splat route ở thư mục gốc của `src/routes` sẽ bắt mọi đường dẫn mà segment locale không khớp — bao gồm các tiền tố locale không hợp lệ bị từ chối bởi `matchFilters`. Vì locale vẫn đến từ URL thông qua root layout, trang 404 sẽ hiển thị bằng ngôn ngữ của người truy cập:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Yêu cầu           | Kết quả                                       |
| ----------------- | --------------------------------------------- |
| `/xx`             | `404` — `xx` không phải là locale đã cấu hình |
| `/nonexistent`    | `404` theo locale mặc định                    |
| `/fr/nonexistent` | `404` bằng tiếng Pháp (`Page introuvable`)    |

</Step>

<Step number={13} title="Tạo sitemap đa ngôn ngữ" isOptional={true}>

Trình tạo sitemap của Intlayer mở rộng mỗi đường dẫn thành một mục nhập cho mỗi locale và kết nối các liên kết luân phiên `xhtml:link` giữa chúng, do đó route chỉ cần liệt kê các đường dẫn chuẩn không có locale.

> Không giống như các trình tạo cơ bản chỉ phát ra các URL phẳng, Intlayer kết nối các liên kết hai chiều giữa mọi biến thể địa phương hóa của mỗi trang, giúp các công cụ tìm kiếm liên kết các URL địa phương hóa và phục vụ đúng URL cho đúng đối tượng.

SolidStart chuyển đổi một tệp xuất ra phương thức HTTP thành một API route và loại bỏ phần mở rộng `.ts` khỏi đường dẫn — do đó `src/routes/sitemap.xml.ts` được phục vụ tại `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Các API route không hỗ trợ các tham số tùy chọn, vì vậy hãy giữ tệp này ở thư mục gốc của `src/routes`, bên ngoài segment `[[locale]]`. Sitemap đã chứa mọi locale.

Bạn có thể xây dựng `robots.txt` theo cách tương tự với `getMultilingualUrls`, để các mục `Disallow` bao phủ mọi cách viết địa phương hóa của đường dẫn nhạy cảm:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Lấy locale trong các hàm server của bạn" isOptional={true}>

Bạn có thể muốn truy cập locale hiện tại từ bên trong một hàm server hoặc một API route.

Trong một thiết lập dựa trên tiền tố như thế này, **URL có thẩm quyền quyết định**: `getLocaleFromPath` đọc tiền tố từ URL yêu cầu. `getLocale` là phương án dự phòng cho các yêu cầu không mang tiền tố locale — nó kiểm tra cookie `INTLAYER_LOCALE`, sau đó đến header `x-intlayer-locale`, sau đó thương lượng `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Lấy cookie từ yêu cầu (mặc định: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Lấy header từ yêu cầu (mặc định: 'x-intlayer-locale'),
      // chuyển sang thương lượng Accept-Language nếu cần
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Truy xuất một số nội dung ngoài thành phần bằng getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Đừng chỉ dựa vào `getLocale` ở đây: cookie locale chỉ được ghi sau khi người truy cập chủ động chuyển đổi ngôn ngữ, vì vậy lần truy cập đầu tiên vào `/fr/...` sẽ giải quyết về locale mặc định.

</Step>

<Step number={15} title="Trích xuất nội dung của các thành phần" isOptional={true}>

Nếu bạn có một codebase hiện có, việc chuyển đổi hàng nghìn tệp có thể tốn thời gian.

Để dễ dàng hóa quá trình này, Intlayer đề xuất một [bộ biên dịch (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [bộ trích xuất (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) để chuyển đổi các thành phần của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` vào tệp `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Phần còn lại trong cấu hình của bạn
  compiler: {
    /**
     * Cho biết bộ biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Định nghĩa đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết các thành phần có nên được lưu sau khi chuyển đổi hay không.
     *
     * - Nếu `true`, bộ biên dịch sẽ ghi đè tệp thành phần trên đĩa. Do đó, việc chuyển đổi sẽ là vĩnh viễn và bộ biên dịch sẽ bỏ qua việc chuyển đổi cho trình xử lý tiếp theo. Bằng cách đó, bộ biên dịch có thể chuyển đổi ứng dụng, sau đó có thể loại bỏ nó.
     *
     * - Nếu `false`, bộ biên dịch sẽ chèn cuộc gọi hàm `useIntlayer()` vào code trong kết quả build và giữ nguyên codebase gốc. Việc chuyển đổi chỉ được thực hiện trong bộ nhớ.
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
 <Tab value='Extract command'>

Chạy bộ trích xuất để chuyển đổi các thành phần và trích xuất nội dung

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

> Di chuyển các tệp nội dung đã tạo của các trang ra khỏi `src/routes` sau đó, vì lý do đã giải thích ở bước 5.

 </Tab>
 <Tab value='Babel compiler'>

> Kể từ v9, `intlayerCompiler` được bao gồm trong plugin `intlayer`. Vì vậy bạn không cần thêm nó thủ công.

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Thêm plugin bộ biên dịch
  ],
});
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Hoặc pnpm run dev
```

```bash packageManager="yarn"
yarn build # Hoặc yarn dev
```

```bash packageManager="bun"
bun run build # Hoặc bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Cấu hình TypeScript">

Intlayer sử dụng module augmentation để tận dụng lợi ích của TypeScript và giúp codebase của bạn mạnh mẽ hơn.

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... các cấu hình hiện có của bạn
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tự động tạo
  ],
}
```

Các khóa từ điển và đường dẫn nội dung hiện được kiểm tra tại thời điểm biên dịch:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Xác minh thiết lập của bạn

Build và khởi chạy server, sau đó kiểm tra xem các yêu cầu này có hoạt động như mong đợi hay không:

```bash
npm run build
node .output/server/index.mjs
```

| Yêu cầu                                 | Phản hồi mong đợi                      |
| --------------------------------------- | -------------------------------------- |
| `GET /`                                 | `200` — Tiếng Anh                      |
| `GET /` với `Accept-Language: fr`       | `302` → `/fr`                          |
| `GET /` với cookie `INTLAYER_LOCALE=es` | `302` → `/es`                          |
| `GET /fr`                               | `200` — Tiếng Pháp, `<html lang="fr">` |
| `GET /fr/about`                         | `200` — Trang giới thiệu tiếng Pháp    |
| `GET /en/about`                         | `302` → `/about` (chuyển hướng chuẩn)  |
| `GET /xx`                               | `404`                                  |
| `GET /fr/nonexistent`                   | `404` bằng tiếng Pháp                  |
| `GET /sitemap.xml`                      | `200` — sitemap XML đa ngôn ngữ        |

Các hàng render một trang hoạt động tương tự dưới `vite dev`. Ba hàng chuyển hướng chỉ áp dụng cho server đã build trừ khi bạn tự đăng ký trình xử lý dưới dạng một middleware — xem bước 3.

> Chạy dev server trên Node (`vite dev`) thay vì trên Bun (`bun --bun vite dev`): SSR của SolidStart hiện tại thất bại dưới Bun runtime với `Expected a Response object, but received 'NodeResponse'`. Điều này không liên quan đến Intlayer — nó lặp lại trên template thông thường — và chỉ ảnh hưởng đến dev server, không ảnh hưởng đến `vite build`.

---

## Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---

## Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa bản dịch.
- **Phát hiện lỗi theo thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước trực tiếp (inline)** nội dung đã dịch.
- **Thao tác nhanh** để dễ dàng tạo và cập nhật các bản dịch.

---

## Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) hoặc xuất nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Tài liệu tham khảo

- [Tài liệu Intlayer](https://intlayer.org)
- [Tài liệu SolidStart](https://start.solidjs.com)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Khai báo Nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
