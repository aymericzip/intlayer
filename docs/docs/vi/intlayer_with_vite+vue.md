---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Cách dịch ứng dụng Vite và Vue của bạn – hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web Vite và Vue của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web Vite và Vue của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng web hiện đại.

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng từ điển khai báo ở cấp độ component.
- **Định vị động metadata**, các route và nội dung.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu tự động tạo, cải thiện tính năng tự động hoàn thành và phát hiện lỗi.
- **Tận hưởng các tính năng nâng cao**, như phát hiện và chuyển đổi locale động.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vite và Vue

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Mã" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-vue-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-vite-vue-template) trên GitHub.

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

- **vue-intlayer**
  Gói tích hợp Intlayer với ứng dụng Vue. Nó cung cấp các context provider và composable cho việc quốc tế hóa trong Vue.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie, và xử lý chuyển hướng URL.

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
      // Các ngôn ngữ khác của bạn
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
      // Các ngôn ngữ khác của bạn
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
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL địa phương hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của bạn, tắt các bản ghi Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Bước 3: Tích hợp Intlayer vào cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các bí danh để tối ưu hóa hiệu suất.

### Bước 4: Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      vi: "Nhấp vào biểu tượng Vite và Vue để tìm hiểu thêm",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es ", vi: "số đếm là " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      vi: "Chỉnh sửa <code>components/HelloWorld.vue</code> và lưu để thử HMR",
    }),
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      vi: "Chỉnh sửa <code>components/HelloWorld.vue</code> và lưu để thử HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe ", vi: "Xem " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
      vi: "bộ khởi động chính thức Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
      vi: "Tìm hiểu thêm về Hỗ trợ IDE cho Vue trong ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
      vi: "Hướng dẫn mở rộng Vue Docs",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      vi: "Nhấp vào biểu tượng Vite và Vue để tìm hiểu thêm",
    }),
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      vi: "Nhấp vào các biểu tượng Vite và Vue để tìm hiểu thêm",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      vi: "số đếm là ",
    }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      vi: "Chỉnh sửa <code>components/HelloWorld.vue</code> và lưu để thử nghiệm HMR",
    }),
    checkOut: t({ en: "Check out ", vi: "Xem " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      vi: "bộ khởi động chính thức Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      vi: "Tìm hiểu thêm về Hỗ trợ IDE cho Vue trong ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      vi: "Hướng dẫn mở rộng Vue Docs",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      vi: "Nhấp vào biểu tượng Vite và Vue để tìm hiểu thêm",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      vi: "Nhấp vào các biểu tượng Vite và Vue để tìm hiểu thêm",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "vi": "số đếm là "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
        "vi": "Chỉnh sửa <code>components/HelloWorld.vue</code> và lưu để thử nghiệm HMR"
      }
    },
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
        "vi": "Xem thử "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite",
        "vi": "bộ khởi đầu chính thức Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el ",
        "vi": "Tìm hiểu thêm về Hỗ trợ IDE cho Vue trong "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide",
        "vi": "Hướng dẫn mở rộng Vue Docs"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "vi": "Nhấp vào biểu tượng Vite và Vue để tìm hiểu thêm"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 5: Sử dụng Intlayer trong Mã của Bạn

Để sử dụng các tính năng quốc tế hóa của Intlayer trong toàn bộ ứng dụng Vue của bạn, trước tiên bạn cần đăng ký thể hiện singleton của Intlayer trong tệp chính của bạn. Bước này rất quan trọng vì nó cung cấp ngữ cảnh quốc tế hóa cho tất cả các thành phần trong ứng dụng của bạn, giúp các bản dịch có thể truy cập được ở bất kỳ đâu trong cây thành phần của bạn.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Tiêm provider ở cấp cao nhất
installIntlayer(app);

// Gắn ứng dụng
app.mount("#app");
```

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng bằng cách tạo một thành phần Vue chính và sử dụng các composable `useIntlayer`:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Truy cập Nội dung trong Intlayer

Intlayer cung cấp các API khác nhau để truy cập nội dung của bạn:

- **Cú pháp dựa trên Component** (khuyến nghị):
  Sử dụng cú pháp `<myContent />`, hoặc `<Component :is="myContent" />` để render nội dung dưới dạng một Node của Intlayer. Điều này tích hợp liền mạch với [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

- **Cú pháp dựa trên chuỗi**:
  Sử dụng `{{ myContent }}` để render nội dung dưới dạng văn bản thuần, không hỗ trợ Visual Editor.

- **Cú pháp HTML thô**:
  Sử dụng `<div v-html="myContent" />` để hiển thị nội dung dưới dạng HTML thô, không hỗ trợ Visual Editor.

- **Cú pháp phân rã (Destructuration syntax)**:
  Composable `useIntlayer` trả về một Proxy chứa nội dung. Proxy này có thể được phân rã để truy cập nội dung trong khi vẫn giữ được tính phản ứng.
  - Sử dụng `const content = useIntlayer("myContent");` và `{{ content.myContent }}` / `<content.myContent />`.
  - Hoặc sử dụng `const { myContent } = useIntlayer("myContent");` và `{{ myContent}}` / `<myContent/>` để phân rã nội dung.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi composable `useLocale`. Hàm này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

Tạo một component để chuyển đổi giữa các ngôn ngữ:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Lấy thông tin locale và hàm setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Theo dõi locale được chọn bằng ref
const selectedLocale = ref(locale.value);

// Cập nhật locale khi lựa chọn thay đổi
const changeLocale = () => setLocale(selectedLocale.value);

// Giữ cho selectedLocale đồng bộ với locale toàn cục
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Sau đó, sử dụng component này trong App.vue của bạn:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Tạo file khai báo intlayer liên quan
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

### (Tùy chọn) Bước 7: Thêm định tuyến có địa phương hóa vào ứng dụng của bạn

Thêm định tuyến có địa phương hóa trong ứng dụng Vue thường liên quan đến việc sử dụng Vue Router với tiền tố locale. Điều này tạo ra các tuyến đường riêng biệt cho mỗi ngôn ngữ, rất hữu ích cho SEO và URL thân thiện với SEO.

Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Trước tiên, cài đặt Vue Router:

```bash packageManager="npm"
npm install vue-router
```

```bash packageManager="pnpm"
pnpm add vue-router
```

```bash packageManager="yarn"
yarn add vue-router
```

Sau đó, tạo một cấu hình router xử lý định tuyến dựa trên ngôn ngữ:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * Khai báo các route với đường dẫn và metadata theo từng ngôn ngữ.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// Tạo instance router
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Thêm navigation guard để xử lý locale
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Tái sử dụng locale đã định nghĩa trong meta của route
  client.setLocale(metaLocale);
  next();
});
```

> Tên được sử dụng để nhận diện route trong router. Nó nên là duy nhất trên tất cả các route để tránh xung đột và đảm bảo điều hướng cũng như liên kết chính xác.

Sau đó, đăng ký router trong file main.js của bạn:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Thêm router vào ứng dụng
app.use(router);

// Gắn ứng dụng lên DOM
app.mount("#app");
```

Sau đó cập nhật file `App.vue` của bạn để render component RouterView. Component này sẽ hiển thị component phù hợp với route hiện tại.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Song song đó, bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server vào ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên sở thích ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng về locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

### (Tùy chọn) Bước 8: Thay đổi URL khi thay đổi locale

Để tự động cập nhật URL khi người dùng thay đổi ngôn ngữ, bạn có thể sửa đổi component `LocaleSwitcher` để sử dụng Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Lấy Vue Router
const router = useRouter();

// Lấy thông tin locale và hàm setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Lấy route hiện tại và tạo URL đã được địa phương hóa
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Điều hướng đến route đã được địa phương hóa mà không tải lại trang
    router.push(localizedPath);
  },
});

// Theo dõi locale được chọn với một ref
const selectedLocale = ref(locale.value);

// Cập nhật locale khi lựa chọn thay đổi
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Giữ cho selectedLocale đồng bộ với locale toàn cục
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Mẹo: Để cải thiện SEO và khả năng truy cập, hãy sử dụng thẻ như `<a href="/fr/home" hreflang="fr">` để liên kết đến các trang đã được địa phương hóa, như được trình bày trong Bước 10. Điều này cho phép các công cụ tìm kiếm phát hiện và lập chỉ mục các URL theo ngôn ngữ một cách chính xác. Để giữ nguyên hành vi SPA, bạn có thể ngăn chặn điều hướng mặc định với @click.prevent, thay đổi locale bằng useLocale, và điều hướng chương trình bằng Vue Router.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Chuyển sang tiếng Anh"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Tiếng Anh</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Chuyển sang tiếng Tây Ban Nha"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Tiếng Tây Ban Nha</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Tùy chọn) Bước 9: Chuyển đổi thuộc tính Ngôn ngữ và Hướng của thẻ HTML

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để phù hợp với locale hiện tại là rất quan trọng. Việc này đảm bảo:

- **Khả năng truy cập**: Các trình đọc màn hình và công nghệ hỗ trợ dựa vào thuộc tính `lang` chính xác để phát âm và hiểu nội dung một cách chính xác.
- **Hiển thị văn bản**: Thuộc tính `dir` (hướng) đảm bảo văn bản được hiển thị theo đúng thứ tự (ví dụ: từ trái sang phải cho tiếng Anh, từ phải sang trái cho tiếng Ả Rập hoặc tiếng Do Thái), điều này rất cần thiết cho khả năng đọc.
- **SEO**: Các công cụ tìm kiếm sử dụng thuộc tính `lang` để xác định ngôn ngữ của trang, giúp cung cấp nội dung địa phương hóa phù hợp trong kết quả tìm kiếm.

Bằng cách cập nhật các thuộc tính này một cách động khi locale thay đổi, bạn đảm bảo trải nghiệm nhất quán và dễ tiếp cận cho người dùng trên tất cả các ngôn ngữ được hỗ trợ.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html>
 * dựa trên locale hiện tại.
 *
 * @example
 * // Trong App.vue hoặc một component toàn cục
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Cập nhật các thuộc tính HTML mỗi khi locale thay đổi
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Cập nhật thuộc tính ngôn ngữ
      document.documentElement.lang = newLocale;

      // Đặt hướng văn bản (ltr cho hầu hết các ngôn ngữ, rtl cho tiếng Ả Rập, Do Thái, v.v.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Sử dụng composable này trong `App.vue` hoặc một component toàn cục của bạn:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Áp dụng các thuộc tính HTML dựa trên locale hiện tại
useI18nHTMLAttributes();
</script>

<template>
  <!-- Mẫu ứng dụng của bạn -->
</template>
```

### (Tùy chọn) Bước 10: Tạo một Component Link Đa ngôn ngữ

Để đảm bảo rằng điều hướng của ứng dụng của bạn tuân thủ ngôn ngữ hiện tại, bạn có thể tạo một component `Link` tùy chỉnh. Component này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ. Ví dụ, khi một người dùng nói tiếng Pháp nhấp vào liên kết đến trang "About", họ sẽ được chuyển hướng đến `/fr/about` thay vì `/about`.

Hành vi này hữu ích vì một số lý do:

- **SEO và Trải nghiệm người dùng**: URL được địa phương hóa giúp các công cụ tìm kiếm lập chỉ mục chính xác các trang theo ngôn ngữ và cung cấp nội dung phù hợp với ngôn ngữ ưu tiên của người dùng.
- **Tính nhất quán**: Bằng cách sử dụng liên kết địa phương hóa trong toàn bộ ứng dụng của bạn, bạn đảm bảo rằng điều hướng luôn giữ trong ngôn ngữ hiện tại, ngăn chặn việc chuyển đổi ngôn ngữ không mong muốn.
  /// **Khả năng bảo trì**: Tập trung logic địa phương hóa trong một thành phần duy nhất giúp đơn giản hóa việc quản lý URL, làm cho codebase của bạn dễ bảo trì và mở rộng khi ứng dụng phát triển.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Kiểm tra xem liên kết có phải là liên kết bên ngoài không
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Tạo href đã được địa phương hóa cho các liên kết nội bộ
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Để sử dụng với Vue Router, tạo một phiên bản dành riêng cho router:

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Tạo thuộc tính to đã được địa phương hóa cho router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Nếu 'to' là một đối tượng, địa phương hóa thuộc tính path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Sử dụng các component này trong ứng dụng của bạn:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Gốc</RouterLink>
    <RouterLink to="/home">Trang chủ</RouterLink>
    <!-- Khác -->
    <Link href="/">Gốc</Link>
    <Link href="/home">Trang chủ</Link>
  </div>
</template>

<script setup lang="ts">
import Link từ "@components/Link.vue";
import RouterLink từ "@components/RouterLink.vue";
</script>
```

### (Tùy chọn) Bước 11: Kết xuất Markdown

Intlayer hỗ trợ hiển thị nội dung Markdown trực tiếp trong ứng dụng Vue của bạn. Theo mặc định, Markdown được xử lý như văn bản thuần túy. Để chuyển đổi Markdown thành HTML phong phú, bạn có thể tích hợp [markdown-it](https://github.com/markdown-it/markdown-it), một trình phân tích cú pháp Markdown.

Điều này đặc biệt hữu ích khi bản dịch của bạn bao gồm các nội dung có định dạng như danh sách, liên kết hoặc nhấn mạnh.

Theo mặc định, Intlayer hiển thị markdown dưới dạng chuỗi. Nhưng Intlayer cũng cung cấp một cách để hiển thị markdown thành HTML bằng cách sử dụng hàm `installIntlayerMarkdown`.

> Để xem cách khai báo nội dung markdown sử dụng gói `intlayer`, xem tài liệu [markdown doc](https://github.com/aymericzip/intlayer/tree/main/docs/vi/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // cho phép thẻ HTML
  linkify: true, // tự động liên kết URL
  typographer: true, // bật dấu ngoặc thông minh, dấu gạch nối, v.v.
});

// Yêu cầu Intlayer sử dụng md.render() mỗi khi cần chuyển markdown thành HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Sau khi đăng ký, bạn có thể sử dụng cú pháp dựa trên component để hiển thị nội dung Markdown trực tiếp:

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
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

Nên bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng extension, hãy tham khảo [tài liệu Extension VS Code của Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra bên ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

---
