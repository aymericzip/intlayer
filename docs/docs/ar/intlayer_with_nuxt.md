---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: ترجمة موقعك على Nuxt و Vue (i18n)
description: اكتشف كيفية جعل موقعك على Nuxt و Vue متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
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
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-template
---

# البدء في التدويل (i18n) باستخدام Intlayer و Nuxt

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-nuxt-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Nuxt

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **vue-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Vue. توفر التركيبات القابلة للاستخدام لمكونات Vue.

- **nuxt-intlayer**
  وحدة Nuxt التي تدمج Intlayer مع تطبيقات Nuxt. توفر إعدادًا تلقائيًا، ووسيطًا لاكتشاف اللغة، وإدارة ملفات تعريف الارتباط، وإعادة توجيه عناوين URL.

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
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."], // لأن Intlayer بشكل افتراضي سيراقب ملفات إعلان المحتوى من مجلد `./src`
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
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
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
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Nuxt الخاص بك

أضف وحدة intlayer إلى تكوين Nuxt الخاص بك:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... تكوين Nuxt الحالي الخاص بك
  modules: ["nuxt-intlayer"],
});
```

> تقوم وحدة `nuxt-intlayer` تلقائيًا بالتعامل مع دمج Intlayer مع Nuxt. فهي تقوم بإعداد بناء إعلان المحتوى، ومراقبة الملفات في وضع التطوير، وتوفير وسيط للكشف عن اللغة، وإدارة التوجيه المحلي.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    checkOut: t({
      ar: "تحقق من ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ar: "توثيق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ar: "تعرف أكثر على Nuxt في ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ar: "توثيق Nuxt",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ar: "انقر على شعار Nuxt لمعرفة المزيد",
      en: "Click on the Nuxt logo to learn more",
      ar: "انقر على شعار Nuxt لمعرفة المزيد",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ar: "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ar: "تحقق من ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ar: "توثيق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ar: "تعرف أكثر على Nuxt في ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ar: "توثيق Nuxt",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      ar: "انقر على شعار Nuxt لمعرفة المزيد",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ar: "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ar: "اطلع على ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      ar: "توثيق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "وثائق Nuxt Intlayer",
    }),
    learnMore: t({
      en: "تعرف أكثر على Nuxt في ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "وثائق Nuxt",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "انقر على شعار Nuxt لمعرفة المزيد",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "ar": "العدد هو ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ar": "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ar": "اطلع على ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "ar": "توثيق Nuxt Intlayer",
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ar": "تعرف على المزيد حول Nuxt في ",
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "توثيق Nuxt",
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "انقر على شعار Nuxt لمعرفة المزيد",
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما أنها مدرجة في دليل `contentDir` (افتراضيًا، `./src`). وتتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 5: استخدام Intlayer في كودك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيق Nuxt الخاص بك باستخدام الدالة القابلة للاستخدام `useIntlayer`:

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

#### الوصول إلى المحتوى في Intlayer

يقدم Intlayer واجهات برمجة تطبيقات مختلفة للوصول إلى المحتوى الخاص بك:

- **صياغة قائمة على المكونات** (موصى بها):
  استخدم الصياغة `<myContent />`، أو `<Component :is="myContent" />` لعرض المحتوى كعقدة في Intlayer. هذا يتكامل بسلاسة مع [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

- **صياغة قائمة على النص**:
  استخدم `{{ myContent }}` لعرض المحتوى كنص عادي، بدون دعم المحرر المرئي.

- **صياغة HTML الخام**:
  استخدم `<div v-html="myContent" />` لعرض المحتوى كـ HTML خام، بدون دعم المحرر المرئي.

- **صياغة التفكيك**:
  يقوم الـ composable `useIntlayer` بإرجاع Proxy يحتوي على المحتوى. يمكن تفكيك هذا البروكسي للوصول إلى المحتوى مع الحفاظ على التفاعلية.
- استخدم `const content = useIntlayer("myContent");` و `{{ content.myContent }}` / `<content.myContent />`.
- أو استخدم `const { myContent } = useIntlayer("myContent");` و `{{ myContent}}` / `<myContent/>` لتفكيك المحتوى.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة من الـ composable `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

أنشئ مكونًا للتبديل بين اللغات:

```vue fileName="components/LocaleSwitcher.vue"
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

// الحصول على معلومات اللغة ودالة setLocale
const { locale, availableLocales, setLocale } = useLocale();

// تتبع اللغة المختارة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير الاختيار
const changeLocale = () => setLocale(selectedLocale.value);

// الحفاظ على تزامن selectedLocale مع اللغة العالمية
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

ثم، استخدم هذا المكون في صفحاتك أو تخطيطك:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // إنشاء ملف إعلان intlayer ذي الصلة
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

يتولى Nuxt تلقائيًا التعامل مع التوجيه المحلي عند استخدام وحدة `nuxt-intlayer`. حيث يقوم هذا بإنشاء مسارات لكل لغة تلقائيًا بناءً على هيكل دليل الصفحات الخاص بك.

مثال:

```plaintext
pages/
├── index.vue          → /، /fr، /es
├── about.vue          → /about، /fr/about، /es/about
└── contact/
    └── index.vue      → /contact، /fr/contact، /es/contact
```

لإنشاء صفحة محلية، ببساطة قم بإنشاء ملفات Vue الخاصة بك في دليل `pages/`:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

ستقوم وحدة `nuxt-intlayer` تلقائيًا بـ:

- اكتشاف اللغة المفضلة للمستخدم
- التعامل مع تبديل اللغة عبر عنوان URL
- تعيين الخاصية المناسبة `<html lang="">`
- إدارة ملفات تعريف الارتباط الخاصة باللغة
- إعادة توجيه المستخدمين إلى عنوان URL المحلي المناسب

### (اختياري) الخطوة 8: إنشاء مكون رابط محلي

لضمان أن تنقل تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون مخصص باسم `LocalizedLink`. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية.

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// التحقق مما إذا كان الرابط خارجيًا
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// إنشاء href محلي للروابط الداخلية
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

ثم استخدم هذا المكون في جميع أنحاء تطبيقك:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>
    <LocalizedLink to="/contact">
      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (اختياري) الخطوة 9: التعامل مع البيانات الوصفية وتحسين محركات البحث (SEO)

يوفر Nuxt قدرات ممتازة لتحسين محركات البحث. يمكنك استخدام Intlayer للتعامل مع البيانات الوصفية المحلية:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

إنشاء إعلان المحتوى المقابل:

```ts fileName="pages/about-meta.content.ts"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ar: "معلومات عنا - شركتي",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ar: "تعرف على المزيد عن شركتنا ورسالتنا",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      ar: "معلومات عنا - شركتي",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      ar: "تعرف على المزيد عن شركتنا ورسالتنا",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      ar: "معلومات عنا - شركتي",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      ar: "تعرف أكثر على شركتنا ورسالتنا",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "zh": "关于我们 - 我的公司",
        "ar": "معلومات عنا - شركتي",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "ar": "تعرف على المزيد حول شركتنا ورسالتنا",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
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
- **الكشف عن الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
