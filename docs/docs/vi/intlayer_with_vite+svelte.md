---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Svelte i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Vite + Svelte đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 5.5.11
    date: 2025-11-19
    changes: "Cập nhật tài liệu"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web Vite và Svelte của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `svelte-i18n` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Bảo hiểm toàn diện">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Svelte bằng cách cung cấp **phạm vi nội dung cấp thành phần**, **bản dịch phản ứng** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

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

## Hướng Dẫn Từng Bước Để Cài Đặt Intlayer Trong Ứng Dụng Vite và Svelte

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-vite-svelte-template) trên GitHub.

<Steps>

<Step number={1} title="Cài Đặt Các Phụ Thuộc">

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
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **svelte-intlayer**
  Gói tích hợp Intlayer với ứng dụng Svelte. Nó cung cấp các context providers và hooks cho việc quốc tế hóa trong Svelte.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một file cấu hình để thiết lập các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Thông qua file cấu hình này, bạn có thể thiết lập các URL có địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Vite của bạn">

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Plugin `intlayer()` của Vite được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các alias để tối ưu hiệu năng.

</Step>

<Step number={4} title="Khai báo Nội dung của bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={5} title="Sử dụng Intlayer trong mã của bạn">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Hiển thị nội dung như nội dung đơn giản -->
<h1>{$content.title}</h1>
<!-- Để hiển thị nội dung có thể chỉnh sửa bằng trình soạn thảo -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Để hiển thị nội dung dưới dạng chuỗi -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>

> Nếu ứng dụng của bạn đã tồn tại, bạn có thể sử dụng [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) kết hợp với [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi hàng nghìn component chỉ trong một giây.
```

> Nếu ứng dụng của bạn đã tồn tại, bạn có thể sử dụng [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md), cũng như [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md), để biến đổi hàng nghìn component chỉ trong một giây.

</Step>

<Step number={6} title="Thay đổi ngôn ngữ của nội dung" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// Lấy thông tin locale và hàm setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Xử lý thay đổi locale
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={7} title="Hiển thị Markdown" isOptional={true}>

Intlayer hỗ trợ hiển thị nội dung Markdown trực tiếp trong ứng dụng Svelte của bạn. Theo mặc định, Markdown được xử lý như văn bản thuần túy. Để chuyển đổi Markdown thành HTML phong phú, bạn có thể tích hợp `@humanspeak/svelte-markdown` hoặc một trình phân tích markdown khác.

> Để xem cách khai báo nội dung markdown sử dụng gói `intlayer`, xem tài liệu [markdown doc](https://github.com/aymericzip/intlayer/tree/main/docs/vi/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // hiển thị nội dung markdown dưới dạng chuỗi
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Bạn cũng có thể truy cập dữ liệu front-matter của markdown bằng cách sử dụng thuộc tính `content.markdownContent.metadata.xxx`.

</Step>

<Step number={8} title="Thiết lập trình chỉnh sửa intlayer / CMS" isOptional={true}>

Để thiết lập trình chỉnh sửa intlayer, bạn phải làm theo [tài liệu trình chỉnh sửa intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Để thiết lập CMS intlayer, bạn phải làm theo [tài liệu CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

</Step>

<Step number={7} title="Thêm định tuyến có bản địa hóa vào ứng dụng của bạn" isOptional={true}>

Để xử lý định tuyến có bản địa hóa trong ứng dụng Svelte của bạn, bạn có thể sử dụng `svelte-spa-router` cùng với `localeFlatMap` của Intlayer để tạo các tuyến đường cho từng ngôn ngữ.

Trước tiên, cài đặt `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Sau đó, tạo một file `Router.svelte` để định nghĩa các tuyến đường của bạn:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Cập nhật file `main.ts` của bạn để mount component `Router` thay vì `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Cuối cùng, cập nhật `App.svelte` của bạn để nhận prop `locale` và sử dụng nó với `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher từ './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... phần còn lại của ứng dụng của bạn ... -->
</main>
```

#### Cấu hình Routing phía Server (Tùy chọn)

Song song với đó, bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server cho ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên sở thích ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

> Kể từ Intlayer v9, `intlayerProxy()` được gộp trực tiếp vào plugin `intlayer()` và được bật theo mặc định thông qua option `routing.enableProxy` (`true` theo mặc định). Đăng ký nó riêng biệt như được hiển thị bên dưới hiện là tùy chọn — nó được giữ lại để tương thích ngược và cho các thiết lập cần kiểm soát thứ tự plugin. Đặt `routing.enableProxy: false` để chọn không tham gia. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="Thay đổi URL khi thay đổi ngôn ngữ" isOptional={true}>

Để cho phép người dùng chuyển đổi ngôn ngữ và cập nhật URL tương ứng, bạn có thể tạo một component `LocaleSwitcher`. Component này sẽ sử dụng `getLocalizedUrl` từ `intlayer` và `push` từ `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Lấy thông tin ngôn ngữ
const { locale, availableLocales } = useLocale();

// Xử lý thay đổi ngôn ngữ
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={9} title="Các Liên Kết Quốc Tế Hóa" isOptional={true}>

Để tối ưu SEO, nên thêm tiền tố locale vào các routes của bạn (ví dụ: `/about`, `/fr/about`).

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  export let href = "";
  const { locale } = useLocale();

  // Trợ giúp để thêm tiền tố URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
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

### (Tuỳ chọn) Sitemap và robots.txt (sinh lúc build)

Intlayer cung cấp `generateSitemap` và `getMultilingualUrls` để định dạng `sitemap.xml` đa ngôn ngữ và `robots.txt` cho crawler rồi tự ghi vào `public/`. Thường chạy một script Node nhỏ **trước** Vite (ví dụ hook npm `predev` / `prebuild`).

#### Sitemap

Trình tạo sitemap của Intlayer tôn trọng cấu hình locale và thêm metadata cho crawler.

> Sitemap hỗ trợ không gian tên `xhtml:link` (hreflang). Thay vì chỉ liệt kê URL phẳng, Intlayer nối hai chiều mọi bản địa phương của từng trang (ví dụ `/about`, `/fr/about` hoặc `/about?lang=fr` tùy chế độ routing).

#### Robots.txt

Dùng `getMultilingualUrls` để quy tắc `Disallow` áp dụng cho mọi biến thể URL của đường dẫn nhạy cảm.

#### 1. Thêm `generate-seo.mjs` ở thư mục gốc dự án

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Cần cài `intlayer` để script import. Môi trường production đặt `SITE_URL` (ví dụ trong CI).

> Nên dùng `generate-seo.mjs` cho ESM của Node. Nếu dùng `generate-seo.js`, đặt `"type": "module"` trong `package.json` hoặc bật ESM tương đương.

#### 2. Chạy script trước Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Chỉnh lệnh nếu dùng pnpm hoặc yarn. Có thể gọi từ CI hoặc bước pipeline khác.

### Cấu hình Git

Khuyến nghị nên bỏ qua các file được tạo ra bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào file `.gitignore` của bạn:

```bash
# Bỏ qua các file được tạo ra bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Vite và Svelte?">

Vite không có định kiến nào về i18n, vì vậy các tùy chọn thuộc hệ sinh thái Svelte:

- **`svelte-i18n`** hoặc **`typesafe-i18n`**: các giải pháp dựa trên store của Svelte.
- **`Intlayer`**: khai báo cạnh component, biên dịch thời điểm build, tính phản ứng Svelte đầy đủ và dịch thuật AI.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle Svelte của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng, và [từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ svelte-i18n hoặc typesafe-i18n mà không cần viết lại component không?">

Phần lớn là có. Làm theo [hướng dẫn di chuyển Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/svelte-i18n.md).

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công.

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

<Question title="Làm cách nào để sử dụng nội dung dịch bên trong component Svelte?">

Gọi `useIntlayer` trong component của bạn. Giá trị có tính phản ứng, vì vậy việc thay đổi ngôn ngữ sẽ cập nhật component mà không cần tải lại trang.

</Question>

<Question title="Intlayer có hoạt động với dev server Vite và HMR không?">

Có. Plugin Vite theo dõi các tệp `.content.ts` của bạn và biên dịch lại từ điển ngay khi bạn lưu tệp, nhờ đó các thay đổi xuất hiện tức thì mà không cần khởi động lại dev server.

</Question>

<Question title="Làm cách nào để thiết lập định tuyến được bản địa hóa?">

Các bước trong hướng dẫn này trình bày về các tuyến đường được bản địa hóa và cập nhật URL khi ngôn ngữ thay đổi. `routing.mode` kiểm soát lược đồ URL: `"prefix-no-default"` (mặc định: `/about` và `/vi/about`), `"prefix-all"`, `"no-prefix"`, hoặc `"search-params"`. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Question>

<Question title="Làm cách nào để hỗ trợ các ngôn ngữ viết từ phải sang trái như tiếng Ả Rập hoặc tiếng Do Thái?">

`getHTMLTextDir` trả về `ltr`, `rtl`, hoặc `auto` cho một locale nhất định, nhờ đó bạn có thể gắn `lang` và `dir` trên phần tử gốc từ locale đang hoạt động và để các thuộc tính logic CSS xử lý phần còn lại.

</Question>

<Question title="Làm cách nào để quản lý metadata SEO trong ứng dụng Vite render phía client?">

Đặt thuộc tính `lang` và `dir` trên thẻ `html` từ locale hoạt động, và sử dụng `getMultilingualUrls` để xuất bản các liên kết `hreflang` thay thế cho mỗi locale đã khai báo. Đối với các trang cần lập chỉ mục đáng tin cậy, hãy cân nhắc prerender hoặc SSR.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. Lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn sử dụng provider và API key của riêng bạn, và `--git-diff` giới hạn thao tác ở các tệp đã thay đổi. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

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
