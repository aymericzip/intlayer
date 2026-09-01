---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Nuxt đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
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
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Cập nhật LocaleSwitcher, SEO, metadata"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web Nuxt và Vue của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `@nuxtjs/i18n` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Bảo hiểm đầy đủ của Nuxt">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Nuxt bằng cách cung cấp **định tuyến đa ngôn ngữ**, **phần mềm trung gian để phát hiện ngôn ngữ**, **sơ đồ trang web** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

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

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Nuxt

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Cách dịch ứng dụng Nuxt và Vue của bạn bằng Intlayer? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Application Template](https://github.com/aymericzip/intlayer-nuxt-4-template) trên GitHub.

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

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

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và các [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **vue-intlayer**
  Gói tích hợp Intlayer với ứng dụng Vue. Nó cung cấp các composables cho các component Vue.

- **nuxt-intlayer**
  Mô-đun Nuxt tích hợp Intlayer với các ứng dụng Nuxt. Nó cung cấp thiết lập tự động, middleware để phát hiện locale, quản lý cookie, và chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một file cấu hình để cấu hình các ngôn ngữ của ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Nuxt của bạn">

Thêm module intlayer vào cấu hình Nuxt của bạn:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Cấu hình Nuxt hiện có của bạn
  modules: ["nuxt-intlayer"],
});
```

> Module `nuxt-intlayer` tự động xử lý việc tích hợp Intlayer với Nuxt. Nó thiết lập việc xây dựng khai báo nội dung, giám sát các tệp trong chế độ phát triển, cung cấp middleware để phát hiện locale, và quản lý định tuyến theo locale.

</Step>

<Step number={4} title="Khai báo Nội dung của Bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={5} title="Sử dụng Intlayer trong Mã của Bạn">

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

</Step>

<Step number={6} title="Thay đổi ngôn ngữ của nội dung" isOptional={true}>

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

</Step>

<Step number={7} title="Thêm định tuyến địa phương hóa vào ứng dụng của bạn" isOptional={true}>

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
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
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

</Step>

<Step number={8} title="Tạo một Component Liên kết Địa phương hóa" isOptional={true}>

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

</Step>

<Step number={9} title="Xử lý Metadata và SEO" isOptional={true}>

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number="6b" title="Tạo một Layout với Navigation" isOptional={true}>

Nuxt layouts cho phép bạn xác định một cấu trúc chung cho các trang của mình. Tạo một layout mặc định bao gồm bộ chuyển đổi locale và điều hướng:

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

Thành phần `Links` (được hiển thị dưới đây) đảm bảo rằng các liên kết điều hướng nội bộ được tự động bản địa hóa.

</Step>

</Steps>

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

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Nuxt?">

Hai lựa chọn thực tế:

- **`@nuxtjs/i18n`**: module tiêu chuẩn dựa trên `vue-i18n`.
- **`Intlayer`**: tree-shaking tự động, kiểu dữ liệu TypeScript đầy đủ, AI dịch thuật, visual editor và CMS.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle Nuxt của tôi bao nhiêu?">

Ít hơn đáng kể so với các giải pháp dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng, và [từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale, giảm kích thước bundle tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ @nuxtjs/i18n hoặc vue-i18n mà không cần viết lại component không?">

Có. Làm theo [hướng dẫn di chuyển @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_vue-i18n_to_intlayer.md) hoặc sử dụng adapter tương thích.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build và tạo từ điển trên mỗi thay đổi.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Intlayer có hoạt động với server side rendering và tạo tĩnh trong Nuxt không?">

Có. Nội dung được phân giải tại thời điểm SSR và trong quá trình `nuxt generate`, do đó các trang được tạo ra chứa mã HTML đã dịch hoàn chỉnh.

</Question>

<Question title="Tôi có bắt buộc phải đưa locale vào URL không?">

Không. `routing.mode` chấp nhận `"prefix-no-default"`, `"prefix-all"`, `"no-prefix"`, và `"search-params"`.

</Question>

<Question title="Làm cách nào để quản lý metadata SEO và thẻ hreflang trong Nuxt?">

Bước 9 giải thích điều này. Metadata `useHead` được trích xuất từ từ điển và `getMultilingualUrls` tạo các thẻ `hreflang` cho các công cụ tìm kiếm.

</Question>

<Question title="Làm cách nào để tạo bộ chuyển đổi ngôn ngữ giữ nguyên trang hiện tại?">

Sử dụng `useLocale` cho ngôn ngữ hoạt động và component liên kết được bản địa hóa từ bước 8.

</Question>

<Question title="Làm cách nào để tự động dịch ứng dụng Nuxt bằng AI?">

Chạy `npx intlayer fill`. Công cụ này phát hiện các chuỗi còn thiếu và điền chúng bằng LLM bạn chọn. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text trong template Vue không?">

Có: [dạng số nhiều](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung theo giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), và [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md).

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
