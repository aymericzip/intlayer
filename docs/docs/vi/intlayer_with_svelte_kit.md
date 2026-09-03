---
createdAt: 2025-11-20
updatedAt: 2026-06-23
title: "SvelteKit i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng SvelteKit đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web SvelteKit của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-sveltekit-template"
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
<Accordion header="Phủ sóng đầy đủ của SvelteKit">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với SvelteKit bằng cách cung cấp **định tuyến đa ngôn ngữ**, **hỗ trợ SSR** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

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

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng SvelteKit

Xem [Application Template](https://github.com/aymericzip/intlayer-sveltekit-template) trên GitHub.

Để bắt đầu, hãy tạo một dự án SvelteKit mới. Dưới đây là cấu trúc cuối cùng mà chúng ta sẽ tạo:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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

- **intlayer**: Gói i18n cốt lõi.
- **svelte-intlayer**: Cung cấp các context provider và store cho Svelte/SvelteKit.
- **vite-intlayer**: Plugin Vite để tích hợp khai báo nội dung với quá trình build.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một file cấu hình trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Vite của bạn">

Cập nhật `vite.config.ts` của bạn để bao gồm plugin Intlayer. Plugin này xử lý việc transpile các file nội dung của bạn.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // thứ tự quan trọng, Intlayer nên được đặt trước SvelteKit
});
```

</Step>

<Step number={4} title="Khai báo Nội dung của bạn">

Tạo các file khai báo nội dung ở bất kỳ đâu trong thư mục `src` của bạn (ví dụ: `src/lib/content` hoặc cùng thư mục với các component của bạn). Các file này định nghĩa nội dung có thể dịch cho ứng dụng của bạn bằng cách sử dụng hàm `t()` cho từng locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit", // Tiêu đề tiếng Anh
      fr: "Bienvenue sur SvelteKit", // Tiêu đề tiếng Pháp
      es: "Bienvenido a SvelteKit", // Tiêu đề tiếng Tây Ban Nha
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Sử dụng Intlayer trong các Component của bạn">

Bây giờ bạn có thể sử dụng hàm `useIntlayer` trong bất kỳ component Svelte nào. Nó trả về một reactive store tự động cập nhật khi locale thay đổi. Hàm sẽ tự động tôn trọng locale hiện tại (cả trong quá trình SSR và điều hướng client-side).

để truy cập giá trị phản ứng của nó (ví dụ: `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" tương ứng với key đã định nghĩa ở Bước 4
  const content = useIntlayer("hero-section");
</script>

<!-- Hiển thị nội dung dưới dạng nội dung đơn giản  -->
<h1>{$content.title}</h1>
<!-- Để hiển thị nội dung có thể chỉnh sửa bằng trình soạn thảo -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Để render nội dung dưới dạng chuỗi -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Thiết lập routing" isOptional={true}>

Các bước sau đây hướng dẫn cách thiết lập routing dựa trên locale trong SvelteKit. Điều này cho phép URL của bạn bao gồm tiền tố locale (ví dụ: `/en/about`, `/fr/about`) để cải thiện SEO và trải nghiệm người dùng.

```bash
.
└─── src
    ├── app.d.ts                  # Định nghĩa kiểu locale
    ├── hooks.server.ts           # Quản lý routing theo locale
    ├── lib
    │   └── getLocale.ts          # Kiểm tra locale từ header, cookies
    ├── params
    │   └── locale.ts             # Định nghĩa tham số locale
    └── routes
        ├── [[locale=locale]]     # Bao bọc trong nhóm route để đặt locale
        │   ├── +layout.svelte    # Bố cục cục bộ cho route
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Bố cục gốc cho font chữ và kiểu toàn cục
```

</Step>

<Step number={7} title="Xử lý phát hiện locale phía Server">

Trong SvelteKit, server cần biết locale của người dùng để render nội dung chính xác trong SSR. Chúng ta sử dụng `hooks.server.ts` để phát hiện locale từ URL hoặc cookies.

Tạo hoặc chỉnh sửa `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Kiểm tra xem đường dẫn hiện tại đã bắt đầu bằng một locale chưa (ví dụ: /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Nếu KHÔNG có locale trong URL (ví dụ: người dùng truy cập "/"), chuyển hướng họ
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Chuyển hướng tạm thời
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Sau đó, tạo một helper để lấy locale của người dùng từ request event:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Lấy ngôn ngữ của người dùng từ sự kiện request.
 * Hàm này được sử dụng trong hook `handle` tại `src/hooks.server.ts`.
 *
 * Đầu tiên, nó cố gắng lấy ngôn ngữ từ bộ nhớ Intlayer (cookies hoặc header tùy chỉnh).
 * Nếu không tìm thấy ngôn ngữ, nó sẽ dùng phương pháp thương lượng "Accept-Language" của trình duyệt.
 *
 * @param event - Sự kiện request từ SvelteKit
 * @returns Ngôn ngữ của người dùng
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Cố gắng lấy ngôn ngữ từ bộ nhớ Intlayer (Cookies hoặc headers)
  const storedLocale = getLocaleFromStorage({
    // Truy cập cookies của SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Truy cập headers của SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Dự phòng sử dụng đàm phán "Accept-Language" của trình duyệt
  const negotiatorHeaders: Record<string, string> = {};

  // Chuyển đổi đối tượng Headers của SvelteKit thành Record<string, string> thuần
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Kiểm tra locale từ header `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Trả về locale mặc định nếu không tìm thấy kết quả phù hợp
  return defaultLocale;
};
```

> `getLocaleFromStorage` sẽ kiểm tra locale từ header hoặc cookie tùy theo cấu hình của bạn. Xem thêm tại [Cấu hình](https://intlayer.org/doc/concept/configuration) để biết chi tiết.

> Hàm `localeDetector` sẽ xử lý header `Accept-Language` và trả về kết quả phù hợp nhất.

Nếu locale chưa được cấu hình, chúng ta muốn trả về lỗi 404. Để dễ dàng hơn, ta có thể tạo một hàm `match` để kiểm tra xem locale có hợp lệ hay không:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Lưu ý:** Đảm bảo rằng file `src/app.d.ts` của bạn bao gồm định nghĩa locale:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Đối với file `+layout.svelte`, chúng ta có thể xóa hết mọi thứ, chỉ giữ lại nội dung tĩnh, không liên quan đến i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Sau đó, tạo một trang và layout mới trong nhóm `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Sử dụng kiểu Load chung
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Khởi tạo Intlayer với locale lấy từ route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Sử dụng từ điển nội dung layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// Sử dụng từ điển nội dung trang chủ
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="Liên kết quốc tế hóa" isOptional={true}>

Để tối ưu SEO, nên thêm tiền tố locale vào các route của bạn (ví dụ: `/en/about`, `/fr/about`). Thành phần này tự động thêm tiền tố locale hiện tại vào bất kỳ liên kết nào.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Trợ giúp thêm tiền tố URL với locale hiện tại
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Nếu bạn sử dụng `goto` từ SvelteKit, bạn có thể dùng cùng logic với `getLocalizedUrl` để điều hướng đến URL đã được địa phương hóa:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Điều hướng đến /en/about hoặc /fr/about tùy theo locale
```

</Step>

<Step number={9} title="Bộ chuyển đổi ngôn ngữ" isOptional={true}>

Để cho phép người dùng chuyển đổi ngôn ngữ, cập nhật URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Sẽ đặt locale trong store và kích hoạt onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="Thêm proxy backend" isOptional={true}>

Để thêm proxy backend vào ứng dụng SvelteKit của bạn, bạn có thể sử dụng hàm `intlayerProxy` được cung cấp bởi plugin `vite-intlayer`. Plugin này sẽ tự động phát hiện locale tốt nhất cho người dùng dựa trên URL, cookie và sở thích ngôn ngữ trình duyệt.

> Kể từ Intlayer v9, `intlayerProxy()` được bundled trực tiếp vào plugin `intlayer()` và được bật mặc định thông qua tùy chọn `routing.enableProxy` (`true` theo mặc định). Đăng ký nó riêng biệt như hình dưới đây bây giờ là tùy chọn — nó được giữ lại để tương thích ngược và cho các thiết lập cần kiểm soát thứ tự plugin. Đặt `routing.enableProxy: false` để loại bỏ. Xem [ghi chú phát hành v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Thiết lập trình chỉnh sửa intlayer / CMS" isOptional={true}>

Để thiết lập trình chỉnh sửa intlayer, bạn phải làm theo [tài liệu trình chỉnh sửa intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

Để thiết lập CMS intlayer, bạn phải làm theo [tài liệu CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

Để có thể hiển thị bộ chọn trình chỉnh sửa intlayer, bạn sẽ phải sử dụng cú pháp component trong nội dung intlayer của mình.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Hiển thị nội dung như nội dung đơn giản -->
  <h1>{$content.title}</h1>

  <!-- Hiển thị nội dung như một component (bắt buộc bởi trình chỉnh sửa) -->
  {@const Component = $content.component}<Component />
</div>
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

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer.

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

---

### Đi xa hơn

- **Trình chỉnh sửa trực quan**: Tích hợp [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) để chỉnh sửa bản dịch trực tiếp từ giao diện người dùng.
- **CMS**: Đưa việc quản lý nội dung của bạn ra bên ngoài bằng cách sử dụng [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng SvelteKit?">

- **`svelte-i18n`** và **`typesafe-i18n`**: các catalog dựa trên store.
- **`Paraglide`**: compiler tin nhắn.
- **`Intlayer`**: khai báo cạnh component, hỗ trợ SSR và SSG, tính phản ứng Svelte đầy đủ và dịch thuật AI.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle SvelteKit của tôi bao nhiêu?">

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

<Question title="Intlayer có hoạt động với server side rendering và prerender trong SvelteKit không?">

Có. Bước 7 giải thích việc phát hiện ngôn ngữ phía server trong `hooks.server.ts`, nhờ đó HTML đầu tiên được gửi tới client đã được dịch hoàn chỉnh.

</Question>

<Question title="Làm cách nào để thiết lập các tuyến đường và liên kết được bản địa hóa?">

Các bước 6 và 8 giải thích điều này. Phân đoạn `[locale]` trong cây tuyến đường và hàm `getLocalizedUrl` giữ điều hướng trong ngôn ngữ đang hoạt động.

</Question>

<Question title="Làm cách nào để tạo bộ chuyển đổi ngôn ngữ trong Svelte?">

Bước 9 minh họa component. `useLocale` cung cấp ngôn ngữ hoạt động, danh sách ngôn ngữ và hàm setter để chuyển đổi đồng thời lưu tùy chọn.

</Question>

<Question title="Làm cách nào để tự động dịch ứng dụng SvelteKit bằng AI?">

Chạy `npx intlayer fill`. Công cụ này phát hiện các chuỗi còn thiếu và điền chúng bằng LLM bạn chọn. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md).

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
