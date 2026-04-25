---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vue i18n - Cách dịch ứng dụng Astro + Vue vào năm 2026
description: Tìm hiểu cách thêm đa ngôn ngữ (i18n) vào trang web Astro + Vue của bạn bằng Intlayer. Làm theo hướng dẫn này để trang web của bạn có thể sử dụng nhiều ngôn ngữ.
keywords:
  - đa ngôn ngữ
  - tài liệu
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Tài liệu ban đầu cho Astro + Vue"
---

# Dịch trang web Astro + Vue của bạn với Intlayer | Đa ngôn ngữ (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện đa ngôn ngữ (i18n) mã nguồn mở sáng tạo được thiết kế để đơn giản hóa việc hỗ trợ nhiều ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng**: Sử dụng các từ điển khai báo ở cấp độ thành phần.
- **Bản địa hóa động các metadata, route và nội dung**.
- **Đảm bảo hỗ trợ TypeScript**: Với các kiểu dữ liệu được tạo tự động để tự động hoàn thành và phát hiện lỗi tốt hơn.
- **Tận dụng các tính năng nâng cao**: Như phát hiện ngôn ngữ động và chuyển đổi ngôn ngữ.

---

## Hướng dẫn từng bước để cấu hình Intlayer trong Astro + Vue

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
npm install intlayer astro-intlayer vue vue-intlayer @astrojs/vue

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

bun x intlayer init
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ i18n để quản lý cấu hình, bản dịch, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **astro-intlayer**
  Plugin tích hợp Astro để kết nối Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production); nó cũng bao gồm middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

- **vue**
  Gói Vue cốt lõi.

- **vue-intlayer**
  Gói để tích hợp Intlayer vào các ứng dụng Vue. Nó cung cấp `installIntlayer` cũng như các composable `useIntlayer` và `useLocale` cho đa ngôn ngữ trong Vue.

- **@astrojs/vue**
  Tích hợp chính thức của Astro cho phép sử dụng các Vue component islands.

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

Thêm plugin `intlayer` vào cấu hình Astro và tích hợp Vue của bạn.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), vue()],
});
```

> Plugin tích hợp `intlayer()` được sử dụng để tích hợp Intlayer với Astro. Nó đảm bảo việc tạo các file khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó xác định các biến môi trường Intlayer bên trong ứng dụng Astro và cung cấp các alias để tối ưu hóa hiệu suất.

> Tích hợp `vue()` cho phép sử dụng các Vue component islands thông qua `client:only="vue"`.

### Bước 4: Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

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

### Bước 5: Sử dụng nội dung trong Astro

Bạn có thể sử dụng các từ điển trực tiếp trong các file `.astro` bằng cách sử dụng các hàm hỗ trợ cốt lõi được xuất từ `intlayer`. Bạn cũng nên thêm metadata cho SEO (như hreflang và liên kết canonical) vào mỗi trang và giới thiệu một Vue island cho nội dung tương tác phía client.

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
import VueIsland from "../../components/vue/VueIsland.vue";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
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
    <!-- Vue island render tất cả các nội dung tương tác, bao gồm cả bộ chuyển đổi ngôn ngữ -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **Lưu ý về thiết lập định tuyến:**
> Cấu trúc thư mục bạn sử dụng phụ thuộc vào cài đặt `middleware.routing` trong `intlayer.config.ts`:
>
> - **`prefix-no-default` (mặc định):** Giữ ngôn ngữ mặc định ở root (không có tiền tố) và thêm tiền tố cho các ngôn ngữ khác. Sử dụng `[...locale]` để bao gồm tất cả các trường hợp.
> - **`prefix-all`:** Tất cả các URL đều có tiền tố ngôn ngữ. Bạn có thể sử dụng `[locale]` tiêu chuẩn nếu không cần xử lý root riêng biệt.
> - **`search-param` hoặc `no-prefix`:** Không yêu cầu các thư mục ngôn ngữ. Ngôn ngữ được quản lý qua tham số truy vấn hoặc cookie.

### Bước 6: Tạo một Vue Island Component

Tạo một thành phần island bao bọc ứng dụng Vue của bạn và nhận ngôn ngữ được máy chủ phát hiện. Bạn phải gọi `installIntlayer` để đăng ký plugin Intlayer vào instance Vue trước khi sử dụng bất kỳ composable nào.

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;
if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const { title } = useIntlayer("app");
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- Bộ chuyển đổi ngôn ngữ được render trực tiếp trong template island -->
    <div class="locale-switcher">
      <span class="switcher-label">Thay đổi ngôn ngữ:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          :disabled="localeItem === currentLocale"
          @click="setLocale(localeItem)"
        >
          <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
          <span class="ls-current-name">{{
            getLocaleName(localeItem, currentLocale)
          }}</span>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
```

> Prop `locale` được truyền từ trang Astro (phát hiện phía máy chủ) và được sử dụng để khởi tạo `installIntlayer`, thiết lập ngôn ngữ ban đầu cho tất cả các composable bên trong cây thành phần.

### Bước 7: Thêm bộ chuyển đổi ngôn ngữ

Chức năng chuyển đổi ngôn ngữ được tích hợp trực tiếp vào template của Vue island (xem Bước 6 ở trên). Nó sử dụng composable `useLocale` từ `vue-intlayer` và điều hướng đến URL bản địa hóa khi người dùng chọn ngôn ngữ mới:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// Giả sử logic props/setup ứng dụng giống như Bước 6...

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    // Điều hướng đến URL bản địa hóa khi thay đổi ngôn ngữ
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});
</script>

<template>
  <div class="locale-switcher">
    <span class="switcher-label">Thay đổi ngôn ngữ:</span>
    <div class="locale-buttons">
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem"
        :class="['locale-btn', { active: localeItem === currentLocale }]"
        :disabled="localeItem === currentLocale"
        @click="setLocale(localeItem)"
      >
        <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
        <span class="ls-current-name">{{
          getLocaleName(localeItem, currentLocale)
        }}</span>
        <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
```

> **Lưu ý về tính bền vững:**
> Việc sử dụng `onLocaleChange` để chuyển hướng qua `window.location.href` đảm bảo rằng một URL ngôn ngữ mới có tiền tố sẽ được truy cập. Điều này cho phép middleware Intlayer thiết lập cookie ngôn ngữ và ghi nhớ lựa chọn của người dùng cho các lần truy cập sau.

### Bước 7: Sitemap và Robots.txt

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
