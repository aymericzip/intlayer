---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Cách dịch ứng dụng Nuxt và Vue của bạn – Hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web Nuxt và Vue của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: Cập nhật LocaleSwitcher, SEO, metadata
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Nuxt và Vue của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Quản lý bản dịch dễ dàng** bằng cách sử dụng từ điển khai báo ở cấp độ component.
- **Địa phương hóa động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu tự động tạo, cải thiện việc tự động hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Nuxt

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Cách dịch ứng dụng Nuxt và Vue của bạn bằng Intlayer? Khám phá Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Mã nguồn" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Xem [Application Template](https://github.com/aymericzip/intlayer-nuxt-4-template) trên GitHub.

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **vue-intlayer**
  Gói tích hợp Intlayer với ứng dụng Vue. Nó cung cấp các composables cho các component Vue.

- **nuxt-intlayer**
  Mô-đun Nuxt tích hợp Intlayer với các ứng dụng Nuxt. Nó cung cấp thiết lập tự động, middleware để phát hiện locale, quản lý cookie, và chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một file cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

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
      // Các locale khác của bạn
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
      // Các locale khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Nuxt của bạn

Thêm module intlayer vào cấu hình Nuxt của bạn:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Cấu hình Nuxt hiện có của bạn
  modules: ["nuxt-intlayer"],
});
```

> Module `nuxt-intlayer` tự động xử lý việc tích hợp Intlayer với Nuxt. Nó thiết lập việc xây dựng khai báo nội dung, giám sát các tệp trong chế độ phát triển, cung cấp middleware để phát hiện locale, và quản lý định tuyến theo locale.

### Bước 4: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong Mã của Bạn

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng Nuxt bằng cách sử dụng composable `useIntlayer`:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Truy cập nội dung trong Intlayer

Intlayer cung cấp các API khác nhau để truy cập nội dung của bạn:

- **Cú pháp dựa trên component** (khuyến nghị):
  Sử dụng cú pháp `<myContent />`, hoặc `<Component :is="myContent" />` để hiển thị nội dung dưới dạng một Intlayer Node. Điều này tích hợp liền mạch với [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

- **Cú pháp dựa trên chuỗi**:
  Sử dụng `{{ myContent }}` để hiển thị nội dung dưới dạng văn bản thuần, không hỗ trợ Visual Editor.

- **Cú pháp HTML thô**:
  Sử dụng `<div v-html="myContent" />` để hiển thị nội dung dưới dạng HTML thô, không hỗ trợ Visual Editor.

- **Cú pháp phân rã (Destructuration)**:
  Composable `useIntlayer` trả về một Proxy chứa nội dung. Proxy này có thể được phân rã để truy cập nội dung trong khi vẫn giữ được tính phản ứng.
  - Sử dụng `const content = useIntlayer("myContent");` và `{{ content.myContent }}` / `<content.myContent />`.
  - Hoặc sử dụng `const { myContent } = useIntlayer("myContent");` và `{{ myContent}}` / `<myContent/>` để phân rã nội dung.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi composable `useLocale`. Hàm này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

Tạo một component để chuyển đổi giữa các ngôn ngữ sử dụng `NuxtLink`. **Sử dụng các liên kết thay vì nút bấm để chuyển đổi locale là một thực hành tốt cho SEO và khả năng khám phá trang**, vì nó cho phép các công cụ tìm kiếm thu thập dữ liệu và lập chỉ mục tất cả các phiên bản địa phương hóa của trang của bạn:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt tự động import useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> Việc sử dụng `NuxtLink` với các thuộc tính `href` đúng cách (thông qua `getLocalizedUrl`) đảm bảo rằng các công cụ tìm kiếm có thể khám phá tất cả các biến thể ngôn ngữ của trang của bạn. Điều này ưu việt hơn so với việc chuyển đổi ngôn ngữ chỉ bằng JavaScript, mà các trình thu thập dữ liệu của công cụ tìm kiếm có thể không theo dõi được.

Sau đó, thiết lập `app.vue` của bạn để sử dụng layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (Tùy chọn) Bước 6b: Tạo một Layout với Điều hướng

Layouts của Nuxt cho phép bạn định nghĩa một cấu trúc chung cho các trang của bạn. Tạo một layout mặc định bao gồm bộ chuyển đổi ngôn ngữ và điều hướng:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Trang chủ</Links>
    <Links href="/about">Giới thiệu</Links>
  </div>
</template>
```

Thành phần `Links` (được hiển thị bên dưới) đảm bảo rằng các liên kết điều hướng nội bộ được tự động địa phương hóa.

### (Tùy chọn) Bước 7: Thêm định tuyến địa phương hóa vào ứng dụng của bạn

Nuxt tự động xử lý định tuyến địa phương hóa khi sử dụng module `nuxt-intlayer`. Điều này tạo các tuyến đường cho mỗi ngôn ngữ tự động dựa trên cấu trúc thư mục trang của bạn.

Ví dụ:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Để tạo các trang được địa phương hóa, chỉ cần tạo các file Vue của bạn trong thư mục `pages/`. Dưới đây là hai ví dụ về các trang:

**Trang chủ (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.value,
  meta: [
    {
      name: "description",
      content: content.metaDescription.value,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Trang Giới thiệu (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Sử dụng .raw để truy cập chuỗi nguyên thủy
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Sử dụng .raw để truy cập chuỗi nguyên thủy
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Lưu ý: `useHead` được tự động import trong Nuxt. Bạn có thể truy cập giá trị nội dung bằng cách sử dụng `.value` (phản ứng) hoặc `.raw` (chuỗi nguyên thủy) tùy theo nhu cầu của bạn.

Module `nuxt-intlayer` sẽ tự động:

- Phát hiện ngôn ngữ ưu tiên của người dùng
- Xử lý chuyển đổi ngôn ngữ qua URL
- Thiết lập thuộc tính `<html lang="">` phù hợp
- Quản lý cookie ngôn ngữ
- Chuyển hướng người dùng đến URL địa phương hóa phù hợp

### (Tùy chọn) Bước 8: Tạo một Component Liên kết Địa phương hóa

Để đảm bảo điều hướng trong ứng dụng của bạn tuân thủ ngôn ngữ hiện tại, bạn có thể tạo một component `Links` tùy chỉnh. Component này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ, điều này rất quan trọng cho **SEO và khả năng tìm thấy trang**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Tính toán đường dẫn cuối cùng
const finalPath = computed(() => {
  // 1. Kiểm tra xem liên kết có phải là liên kết ngoài không
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Nếu là liên kết ngoài, trả về nguyên trạng (NuxtLink xử lý việc tạo thẻ <a>)
  if (isExternal) return props.href;

  // 3. Nếu là liên kết nội bộ, địa phương hóa URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Sau đó sử dụng component này trong toàn bộ ứng dụng của bạn:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Trang chủ</Links>
    <Links href="/about">Giới thiệu</Links>
  </div>
</template>
```

> Bằng cách sử dụng `NuxtLink` với các đường dẫn đã được địa phương hóa, bạn đảm bảo rằng:
>
> - Các công cụ tìm kiếm có thể thu thập dữ liệu và lập chỉ mục tất cả các phiên bản ngôn ngữ của trang của bạn
> - Người dùng có thể chia sẻ trực tiếp các URL đã được địa phương hóa
> - Lịch sử trình duyệt hoạt động chính xác với các URL có tiền tố ngôn ngữ

### (Tùy chọn) Bước 9: Xử lý Metadata và SEO

Nuxt cung cấp khả năng SEO tuyệt vời thông qua composable `useHead` (tự động import). Bạn có thể sử dụng Intlayer để xử lý metadata đã được địa phương hóa bằng cách sử dụng accessor `.raw` hoặc `.value` để lấy giá trị chuỗi nguyên thủy:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead được tự động import trong Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Sử dụng .raw để truy cập giá trị chuỗi nguyên thủy
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Sử dụng .raw để truy cập chuỗi nguyên thủy
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Ngoài ra, bạn có thể sử dụng hàm `import { getIntlayer } from "intlayer"` để lấy nội dung mà không cần phản ứng của Vue.

> **Truy cập giá trị nội dung:**
>
> - Sử dụng `.raw` để lấy giá trị chuỗi nguyên thủy (không phản ứng)
> - Sử dụng `.value` để lấy giá trị phản ứng
> - Sử dụng cú pháp component `<content.key />` để hỗ trợ Visual Editor

Tạo khai báo nội dung tương ứng:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Về Chúng Tôi - Công Ty Tôi",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Tìm hiểu thêm về công ty và sứ mệnh của chúng tôi",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Về Chúng Tôi",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Về Chúng Tôi - Công Ty Tôi",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Tìm hiểu thêm về công ty và sứ mệnh của chúng tôi",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Về Chúng Tôi",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Về Chúng Tôi - Công Ty Tôi",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Tìm hiểu thêm về công ty và sứ mệnh của chúng tôi",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Về Chúng Tôi",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

module.exports = aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "Về Chúng Tôi - Công Ty Tôi",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Tìm hiểu thêm về công ty và sứ mệnh của chúng tôi",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Về Chúng Tôi",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để đi xa hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).
