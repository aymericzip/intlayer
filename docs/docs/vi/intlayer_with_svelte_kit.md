---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: Cách dịch ứng dụng SvelteKit của bạn – hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web SvelteKit của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó bằng cách sử dụng Server-Side Rendering (SSR).
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
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: Khởi tạo lịch sử
---

# Dịch trang web SvelteKit của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Nó hoạt động liền mạch với khả năng Server-Side Rendering (SSR) của **SvelteKit**.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Định vị hóa động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động.
- **Tận dụng SSR của SvelteKit** để quốc tế hóa thân thiện với SEO.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

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

### Bước 2: Cấu hình dự án của bạn

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

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Cập nhật `vite.config.ts` của bạn để bao gồm plugin Intlayer. Plugin này xử lý việc transpile các file nội dung của bạn.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // thứ tự quan trọng, Intlayer nên được đặt trước SvelteKit
});
```

### Bước 4: Khai báo Nội dung của bạn

Tạo các file khai báo nội dung ở bất kỳ đâu trong thư mục `src` của bạn (ví dụ: `src/lib/content` hoặc cùng thư mục với các component của bạn). Các file này định nghĩa nội dung có thể dịch cho ứng dụng của bạn bằng cách sử dụng hàm `t()` cho từng locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Bước 5: Sử dụng Intlayer trong các Component của bạn

Bây giờ bạn có thể sử dụng hàm `useIntlayer` trong bất kỳ component Svelte nào. Hàm này trả về một store phản ứng tự động cập nhật khi locale thay đổi. Hàm sẽ tự động tuân theo locale hiện tại (cả trong SSR và điều hướng phía client).

> **Lưu ý:** `useIntlayer` trả về một store của Svelte, vì vậy bạn cần sử dụng tiền tố `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Cách dịch ứng dụng SvelteKit của bạn – hướng dẫn i18n 2025
> description: Khám phá cách làm cho trang web SvelteKit của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó bằng cách sử dụng Server-Side Rendering (SSR).
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Khởi tạo lịch sử

---

# Dịch trang web SvelteKit của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại. Nó hoạt động liền mạch với khả năng Server-Side Rendering (SSR) của **SvelteKit**.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Định vị hóa động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tạo tự động.
- **Tận dụng SSR của SvelteKit** để quốc tế hóa thân thiện với SEO.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng SvelteKit

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

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

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

### Bước 2: Cấu hình dự án của bạn

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

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Cập nhật `vite.config.ts` của bạn để bao gồm plugin Intlayer. Plugin này xử lý việc transpile các file nội dung của bạn.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // thứ tự quan trọng, Intlayer nên được đặt trước SvelteKit
});
```

### Bước 4: Khai báo Nội dung của bạn

Tạo các file khai báo nội dung ở bất kỳ đâu trong thư mục `src` của bạn (ví dụ: `src/lib/content` hoặc cùng thư mục với các component của bạn). Các file này định nghĩa nội dung có thể dịch cho ứng dụng của bạn bằng cách sử dụng hàm `t()` cho từng locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Bước 5: Sử dụng Intlayer trong các Component của bạn

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
<h1><svelte:component this={$content.title} /></h1>
<!-- Để render nội dung dưới dạng chuỗi -->
<div aria-label={$content.title.value}></div>
```

### (Tùy chọn) Bước 6: Thiết lập routing

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

### Bước 7: Xử lý phát hiện locale phía Server (Hooks)

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

> `getLocaleFromStorage` sẽ kiểm tra locale từ header hoặc cookie tùy theo cấu hình của bạn. Xem thêm tại [Cấu hình](https://intlayer.org/doc/configuration) để biết chi tiết.

> Hàm `localeDetector` sẽ xử lý header `Accept-Language` và trả về kết quả phù hợp nhất.

Nếu locale chưa được cấu hình, chúng ta muốn trả về lỗi 404. Để dễ dàng hơn, ta có thể tạo một hàm `match` để kiểm tra xem locale có hợp lệ hay không:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
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
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Sử dụng kiểu Load chung
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Khởi tạo Intlayer với locale lấy từ route
	setupIntlayer(data.locale);

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
	import { useIntlayer } from 'svelte-intlayer';

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

### (Tùy chọn) Bước 8: Liên kết quốc tế hóa

Để tối ưu SEO, nên thêm tiền tố locale vào các route của bạn (ví dụ: `/en/about`, `/fr/about`). Thành phần này tự động thêm tiền tố locale hiện tại vào bất kỳ liên kết nào.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

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

### (Tùy chọn) Bước 9: Bộ chuyển đổi ngôn ngữ

Để cho phép người dùng chuyển đổi ngôn ngữ, cập nhật URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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

### (Tùy chọn) Bước 10: Thêm proxy backend

Để thêm proxy backend vào ứng dụng SvelteKit của bạn, bạn có thể sử dụng hàm `intlayerProxy` được cung cấp bởi plugin `vite-intlayer`. Plugin này sẽ tự động phát hiện locale tốt nhất cho người dùng dựa trên URL, cookie và sở thích ngôn ngữ trình duyệt.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Tùy chọn) Bước 11: Thiết lập trình chỉnh sửa intlayer / CMS

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
  <svelte:component this={$content.component} />
</div>
```

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
