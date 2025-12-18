---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: كيفية ترجمة تطبيق Nuxt و Vue الخاص بك – دليل i18n 2025
description: اكتشف كيفية جعل موقع Nuxt و Vue الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Nuxt
  - Vue
  - جافا سكريبت
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: تحديث LocaleSwitcher، SEO، البيانات الوصفية
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# ترجمة موقع Nuxt و Vue الخاص بك باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تصريحية على مستوى المكونات.
- **تدويل البيانات الوصفية والمسارات والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Nuxt

<Tab defaultTab="video">
  <TabItem label="فيديو" value="video">
  
<iframe title="كيفية ترجمة تطبيق Nuxt و Vue الخاص بك باستخدام Intlayer؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="كود" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض توضيحي في CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-nuxt-4-template) على GitHub.

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **vue-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Vue. تحتوي على composables لمكونات Vue.

- **nuxt-intlayer**
  وحدة Nuxt التي تدمج Intlayer مع تطبيقات Nuxt. توفر إعدادًا تلقائيًا، وmiddleware لاكتشاف اللغة، وإدارة الكوكيز، وإعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
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
      // لغات أخرى خاصة بك
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
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء الكوكيز، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Nuxt الخاص بك

أضف وحدة intlayer إلى تكوين Nuxt الخاص بك:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... تكوين Nuxt الحالي الخاص بك
  modules: ["nuxt-intlayer"],
});
```

> تقوم وحدة `nuxt-intlayer` تلقائيًا بالتعامل مع دمج Intlayer مع Nuxt. فهي تقوم بإعداد بناء إعلان المحتوى، ومراقبة الملفات في وضع التطوير، وتوفير middleware لاكتشاف اللغة، وإدارة التوجيه المحلي.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 5: استخدام Intlayer في كودك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيق Nuxt الخاص بك باستخدام الـ `useIntlayer` composable:

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
    >، <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### الوصول إلى المحتوى في Intlayer

يقدم Intlayer واجهات برمجة تطبيقات مختلفة للوصول إلى المحتوى الخاص بك:

- **بناء الجملة المعتمد على المكونات** (موصى به):
  استخدم بناء الجملة `<myContent />`، أو `<Component :is="myContent" />` لعرض المحتوى كعقدة Intlayer. هذا يتكامل بسلاسة مع [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

- **بناء الجملة المعتمد على النص**:
  استخدم `{{ myContent }}` لعرض المحتوى كنص عادي، بدون دعم المحرر المرئي.

- **بناء جملة HTML الخام**:
  استخدم `<div v-html="myContent" />` لعرض المحتوى كـ HTML خام، بدون دعم المحرر المرئي.

- **بناء جملة التفكيك**:
  الدالة القابلة للاستخدام `useIntlayer` تُرجع Proxy يحتوي على المحتوى. يمكن تفكيك هذا البروكسي للوصول إلى المحتوى مع الحفاظ على التفاعلية.
  - استخدم `const content = useIntlayer("myContent");` و `{{ content.myContent }}` / `<content.myContent />`.
  - أو استخدم `const { myContent } = useIntlayer("myContent");` و `{{ myContent}}` / `<myContent/>` لتفكيك المحتوى.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة من الدالة القابلة للاستخدام `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

قم بإنشاء مكون للتبديل بين اللغات باستخدام `NuxtLink`. **استخدام الروابط بدلاً من الأزرار للتبديل بين اللغات هو أفضل ممارسة لتحسين محركات البحث وقابلية اكتشاف الصفحات**، حيث يسمح لمحركات البحث بفهرسة جميع النسخ المحلية من صفحاتك:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt يقوم بالاستيراد التلقائي لـ useRoute
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

> استخدام `NuxtLink` مع سمات `href` الصحيحة (عبر `getLocalizedUrl`) يضمن أن محركات البحث يمكنها اكتشاف جميع النسخ اللغوية لصفحاتك. هذا أفضل من التبديل بين اللغات باستخدام جافا سكريبت فقط، والذي قد لا تتبعه عناكب محركات البحث.

بعد ذلك، قم بإعداد ملف `app.vue` لاستخدام التخطيطات:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (اختياري) الخطوة 6ب: إنشاء تخطيط مع التنقل

تسمح تخطيطات Nuxt بتعريف هيكل مشترك لصفحاتك. قم بإنشاء تخطيط افتراضي يتضمن مفتاح تبديل اللغة والتنقل:

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

    <Links href="/">الرئيسية</Links>
    <Links href="/about">حول</Links>
  </div>
</template>
```

مكون `Links` (الموضح أدناه) يضمن أن روابط التنقل الداخلية تتم ترجمتها تلقائيًا.

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

يتولى Nuxt تلقائيًا التعامل مع التوجيه المحلي عند استخدام وحدة `nuxt-intlayer`. هذا ينشئ مسارات لكل لغة تلقائيًا بناءً على هيكل دليل الصفحات الخاص بك.

مثال:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

لإنشاء صفحات محلية، ببساطة قم بإنشاء ملفات Vue الخاصة بك في دليل `pages/`. فيما يلي مثالان لصفحات:

**صفحة الرئيسية (`pages/index.vue`):**

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

**صفحة حول (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // استخدم .raw للوصول إلى النص الأساسي
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // استخدم .raw للوصول إلى النص الأساسي
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> ملاحظة: يتم استيراد `useHead` تلقائيًا في Nuxt. يمكنك الوصول إلى قيم المحتوى باستخدام `.value` (تفاعلي) أو `.raw` (نص بدائي) حسب حاجتك.

سيقوم موديل `nuxt-intlayer` تلقائيًا بـ:

- اكتشاف اللغة المفضلة للمستخدم
- التعامل مع تبديل اللغة عبر عنوان URL
- تعيين الخاصية المناسبة `<html lang="">`
- إدارة ملفات تعريف الارتباط الخاصة باللغة
- إعادة توجيه المستخدمين إلى عنوان URL المحلي المناسب

### (اختياري) الخطوة 8: إنشاء مكون رابط محلي اللغة

لضمان أن تنقل تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون مخصص `Links`. يقوم هذا المكون تلقائيًا بإضافة بادئة للروابط الداخلية باستخدام اللغة الحالية، وهو أمر ضروري لـ **تحسين محركات البحث (SEO) وقابلية اكتشاف الصفحات**.

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

// حساب المسار النهائي
const finalPath = computed(() => {
  // 1. التحقق مما إذا كانت الرابط خارجي
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. إذا كان خارجيًا، إرجاعه كما هو (NuxtLink يتولى توليد وسم <a>)
  if (isExternal) return props.href;

  // 3. إذا كان الرابط داخليًا، قم بتعريب الـ URL
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

ثم استخدم هذا المكون في جميع أنحاء تطبيقك:

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

    <Links href="/">الرئيسية</Links>
    <Links href="/about">حول</Links>
  </div>
</template>
```

> باستخدام `NuxtLink` مع المسارات المترجمة، تضمن أن:
>
> - محركات البحث يمكنها الزحف وفهرسة جميع إصدارات لغات صفحاتك
> - يمكن للمستخدمين مشاركة عناوين URL المترجمة مباشرة
> - يعمل سجل المتصفح بشكل صحيح مع عناوين URL التي تحتوي على بادئة اللغة

### (اختياري) الخطوة 9: التعامل مع البيانات الوصفية وتحسين محركات البحث (SEO)

يوفر Nuxt قدرات ممتازة لتحسين محركات البحث عبر الـ `useHead` composable (يتم استيراده تلقائيًا). يمكنك استخدام Intlayer للتعامل مع البيانات الوصفية المترجمة باستخدام accessor `.raw` أو `.value` للحصول على القيمة النصية الأولية:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// يتم استيراد useHead تلقائيًا في Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // استخدم .raw للوصول إلى القيمة النصية الأولية
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // استخدم .raw للوصول إلى القيمة النصية الأولية
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> بدلاً من ذلك، يمكنك استخدام الدالة `import { getIntlayer } from "intlayer"` للحصول على المحتوى بدون تفاعل Vue.

> **الوصول إلى قيم المحتوى:**
>
> - استخدم `.raw` للحصول على القيمة النصية الأولية (غير تفاعلية)
> - استخدم `.value` للحصول على القيمة التفاعلية
> - استخدم بناء جملة المكون `<content.key />` لدعم محرر المرئيات

قم بإنشاء إعلان المحتوى المقابل:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
      ar: "معلومات عنا - شركتي",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      ar: "تعرف أكثر على شركتنا ومهمتنا",
    }),
    title: t({
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
      ar: "معلومات عنا",
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
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "تعرف أكثر على شركتنا ومهمتنا",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "معلومات عنا",
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
      en: "معلومات عنا - شركتي",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "تعرف أكثر على شركتنا ورسالتنا",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "معلومات عنا",
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
        "en": "معلومات عنا - شركتي",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "تعرف أكثر على شركتنا ورسالتنا",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "معلومات عنا",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات مدمجة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التعمق أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو تعريض محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
