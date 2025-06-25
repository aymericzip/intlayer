---
docName: intlayer_with_nuxt
url: https://intlayer.org/doc/environment/nuxt-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nuxt.md
createdAt: 2025-06-18
updatedAt: 2025-06-18
title: ترجم موقعك الإلكتروني Nuxt و Vue (i18n)
description: اكتشف كيفية جعل موقعك الإلكتروني باستخدام Nuxt وVue متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
---

# البدء في التدويل (i18n) باستخدام Intlayer و Nuxt

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-nuxt-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة مفتوحة المصدر مبتكرة للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية، المسارات، والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Nuxt

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم الضرورية باستخدام npm:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)، الترجمة، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **vue-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Vue. توفر الأدوات القابلة للاستخدام مع مكونات Vue.

- **nuxt-intlayer**
  الوحدة الخاصة بـ Nuxt التي تدمج Intlayer مع تطبيقات Nuxt. توفر الإعداد التلقائي، الوسيط لاكتشاف اللغة، إدارة الكوكيز، وإعادة التوجيه لعناوين URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد لغات تطبيقك:

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
    contentDir: ["."],
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

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، إعادة التوجيه عبر الوسيط، أسماء الكوكيز، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Nuxt الخاص بك

أضف وحدة intlayer إلى تكوين Nuxt الخاص بك:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... تكوين Nuxt الحالي الخاص بك
  modules: ["nuxt-intlayer"],
});
```

> تقوم وحدة `nuxt-intlayer` تلقائيًا بمعالجة دمج Intlayer مع Nuxt. تقوم بإعداد بناء إعلان المحتوى، مراقبة الملفات في وضع التطوير، توفير الوسيط لاكتشاف اللغة، وإدارة التوجيه المحلي.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
      ar: "قم بتحرير <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
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
      ar: "وثائق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ar: "تعرف على المزيد حول Nuxt في ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ar: "وثائق Nuxt",
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
      ar: "قم بتحرير <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
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
      ar: "وثائق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ar: "تعرف على المزيد حول Nuxt في ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ar: "وثائق Nuxt",
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
      ar: "قم بتحرير <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
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
      ar: "وثائق Nuxt Intlayer",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      ar: "تعرف على المزيد حول Nuxt في ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      ar: "وثائق Nuxt",
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

module.exports = helloWorldContent;
```

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
"ar": "قم بتعديل <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
"en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
"fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
"es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
}
},
"checkOut": {
"nodeType": "translation",
"translation": {
"ar": "تحقق من ",
"en": "Check out ",
"fr": "Vérifiez ",
"es": "Compruebe "
}
},
"nuxtIntlayer": {
"nodeType": "translation",
"translation": {
"ar": "وثائق Nuxt Intlayer",
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
"ar": "وثائق Nuxt",
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

````

> يمكن تعريف إعلانات المحتوى في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيق Nuxt باستخدام المكون `useIntlayer`:

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
````

#### الوصول إلى المحتوى في Intlayer

يوفر Intlayer طريقتين للوصول إلى المحتوى الخاص بك:

- **صيغة تعتمد على المكونات** (موصى بها):
  استخدم صيغة `<myContent />` أو `<Component :is="myContent" />` لعرض المحتوى كعقدة Intlayer. يتكامل هذا بسلاسة مع [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) و[نظام إدارة المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).

- **صيغة تعتمد على النصوص**:
  استخدم `{{ myContent }}` لعرض المحتوى كنص عادي، بدون دعم المحرر المرئي.

- **صيغة HTML الخام**:
  استخدم `<div v-html="myContent" />` لعرض المحتوى كـ HTML خام، بدون دعم المحرر المرئي.

- **صيغة التفكيك**:
  يقوم المكون `useIntlayer` بإرجاع Proxy مع المحتوى. يمكن تفكيك هذا الوكيل للوصول إلى المحتوى مع الحفاظ على التفاعلية.
  - استخدم `const content = useIntlayer("myContent");` و `{{ content.myContent }}` / `<content.myContent />`.
  - أو استخدم `const { myContent } = useIntlayer("myContent");` و `{{ myContent }}` / `<myContent/>` لتفكيك المحتوى.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام وظيفة `setLocale` التي يوفرها المكون `useLocale`. تتيح لك هذه الوظيفة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

قم بإنشاء مكون للتبديل بين اللغات:

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

// الحصول على معلومات اللغة ووظيفة setLocale
const { locale, availableLocales, setLocale } = useLocale();

// تتبع اللغة المحددة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير الاختيار
const changeLocale = () => setLocale(selectedLocale.value);

// الحفاظ على تزامن selectedLocale مع اللغة العامة
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

ثم استخدم هذا المكون في صفحاتك أو التخطيطات:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // إنشاء ملف إعلان intlayer ذو صلة
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

يتعامل Nuxt تلقائيًا مع التوجيه المحلي عند استخدام وحدة `nuxt-intlayer`. يتم إنشاء مسارات لكل لغة تلقائيًا بناءً على بنية دليل الصفحات الخاص بك.

مثال:

```plaintext
pages/
├── index.vue          → /, /ar, /fr, /es
├── about.vue          → /about, /ar/about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /ar/contact, /fr/contact, /es/contact
```

لإنشاء صفحة محلية، قم ببساطة بإنشاء ملفات Vue الخاصة بك في دليل `pages/`:

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
- تعيين السمة المناسبة `<html lang="">`
- إدارة ملفات تعريف الارتباط الخاصة باللغة
- إعادة توجيه المستخدمين إلى عنوان URL المحلي المناسب

### (اختياري) الخطوة 8: إنشاء مكون رابط محلي

لضمان أن التنقل في تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `LocalizedLink` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة لعناوين URL الداخلية باللغة الحالية.

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

// تحقق إذا كان الرابط خارجيًا
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// إنشاء رابط محلي للروابط الداخلية
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

    <LocalizedLink to="/ar/contact">
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

يوفر Nuxt إمكانيات ممتازة لتحسين محركات البحث. يمكنك استخدام Intlayer للتعامل مع البيانات الوصفية المترجمة:

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

قم بإنشاء إعلان المحتوى المقابل:

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      ar: "من نحن - شركتنا",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ar: "تعرف على المزيد عن شركتنا ومهمتنا",
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
      ar: "من نحن - شركتنا",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ar: "تعرف على المزيد عن شركتنا ومهمتنا",
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
      ar: "من نحن - شركتنا",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      ar: "تعرف على المزيد عن شركتنا ومهمتنا",
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
        "ar": "من نحن - شركتنا",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "ar": "تعرف على المزيد عن شركتنا ومهمتنا",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### إعداد TypeScript

يستخدم Intlayer توسيع الوحدة للحصول على فوائد TypeScript وجعل قاعدة التعليمات البرمجية الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن إعدادات TypeScript الخاصة بك تتضمن الأنواع التي يتم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الحالية الخاصة بك
  "include": [
    // ... إعدادات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي يتم إنشاؤها تلقائيًا
  ],
}
```

### إعداد Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[تثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مدمجة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [وثائق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### الذهاب إلى أبعد من ذلك

## للمزيد، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) أو نقل المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).
