---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: ترجمة موقعك باستخدام Vite و Vue (i18n)
description: اكتشف كيفية جعل موقعك باستخدام Vite و Vue متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - Vue
  - جافا سكريبت
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
---

# البدء في التدويل (i18n) باستخدام Intlayer و Vite و Vue

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-vite-vue-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Vue

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **vue-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Vue. توفر مزودي السياق والوظائف القابلة لإعادة الاستخدام لتدويل Vue.

- **vite-intlayer**
  يتضمن مكون Vite الإضافي لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط للكشف عن اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه عناوين URL.

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
// تكوين الإعدادات الخاصة بالتدويل
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
// تكوين الإعدادات الخاصة بالتدويل
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

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: أعلن عن محتواك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "قم بتحرير <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
      es: "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
    }),
    checkOut: t({ en: "تحقق من ", fr: "تحقق من ", es: "تحقق من " }),
    officialStarter: t({
      en: ", المبدئ الرسمي لـ Vue + Vite",
      fr: ", المبدئ الرسمي لـ Vue + Vite",
      es: ", المبدئ الرسمي لـ Vue + Vite",
    }),
    learnMore: t({
      en: "تعرف على المزيد حول دعم IDE لـ Vue في ",
      fr: "تعرف على المزيد حول دعم IDE لـ Vue في ",
      es: "تعرف على المزيد حول دعم IDE لـ Vue في ",
    }),
    vueDocs: t({
      en: "دليل توسيع مستندات Vue",
      fr: "دليل توسيع مستندات Vue",
      es: "دليل توسيع مستندات Vue",
    }),
    readTheDocs: t({
      en: "انقر على شعارات Vite و Vue لمعرفة المزيد",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
    count: t({ en: "العدد هو ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "تحقق من ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "المشروع الرسمي لبدء Vue + Vite",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "تعرف على المزيد حول دعم IDE لـ Vue في ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "دليل توسيع وثائق Vue",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "انقر على شعارات Vite و Vue لمعرفة المزيد",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
      ar: "العدد هو ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      ar: "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", ar: "تحقق من " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      ar: "البداية الرسمية لـ Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      ar: "تعرف على المزيد حول دعم IDE لـ Vue في ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      ar: "دليل توسيع مستندات Vue",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      ar: "انقر على شعارات Vite و Vue لمعرفة المزيد",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
        "ar": "العدد هو "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "ar": "حرر <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR"
      }
    },
        "ar": "تحقق من ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ar": "البداية الرسمية لـ Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ar": "تعرف على المزيد حول دعم IDE لـ Vue في ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "دليل توسيع وثائق Vue",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "انقر على شعارات Vite و Vue لمعرفة المزيد",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان داخل تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 5: استخدام Intlayer في كودك

لاستخدام ميزات التدويل في Intlayer عبر تطبيق Vue الخاص بك، تحتاج أولاً إلى تسجيل مثيل Intlayer الفردي في ملفك الرئيسي. هذه الخطوة ضرورية لأنها توفر سياق التدويل لجميع المكونات في تطبيقك، مما يجعل الترجمات متاحة في أي مكان داخل شجرة المكونات الخاصة بك.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// حقن المزود على المستوى الأعلى
installIntlayer(app);

// تركيب التطبيق
app.mount("#app");
```

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك من خلال إنشاء مكون Vue رئيسي واستخدام التركيبات `useIntlayer`:

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

#### الوصول إلى المحتوى في Intlayer

يقدم Intlayer واجهات برمجة تطبيقات مختلفة للوصول إلى المحتوى الخاص بك:

- **صياغة قائمة على المكونات** (موصى بها):
  استخدم الصياغة `<myContent />`، أو `<Component :is="myContent" />` لعرض المحتوى كعقدة Intlayer. هذا يتكامل بسلاسة مع [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و [نظام إدارة المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

- **صياغة قائمة على النص**:
  استخدم `{{ myContent }}` لعرض المحتوى كنص عادي، بدون دعم المحرر المرئي.

- **صياغة HTML الخام**:
  استخدم `<div v-html="myContent" />` لعرض المحتوى كـ HTML خام، بدون دعم محرر بصري.

- **صياغة التفكيك**:
  الدالة القابلة للاستخدام `useIntlayer` تُعيد Proxy يحتوي على المحتوى. يمكن تفكيك هذا البروكسي للوصول إلى المحتوى مع الحفاظ على التفاعل.
  - استخدم `const content = useIntlayer("myContent");` و `{{ content.myContent }}` / `<content.myContent />`.
  - أو استخدم `const { myContent } = useIntlayer("myContent");` و `{{ myContent}}` / `<myContent/>` لتفكيك المحتوى.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة من الدالة القابلة للاستخدام `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

إنشاء مكون للتبديل بين اللغات:

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

// الحصول على معلومات اللغة ودالة setLocale
const { locale, availableLocales, setLocale } = useLocale();

// تتبع اللغة المختارة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير الاختيار
const changeLocale = () => setLocale(selectedLocale.value);

// حافظ على تزامن selectedLocale مع اللغة العالمية
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

ثم، استخدم هذا المكون في ملف App.vue الخاص بك:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // أنشئ ملف إعلان intlayer المرتبط
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

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

عادةً ما يتضمن إضافة التوجيه المحلي في تطبيق Vue استخدام Vue Router مع بادئات اللغة. هذا يجعل مسارات فريدة لكل لغة، وهو مفيد لتحسين محركات البحث (SEO) وعناوين URL الصديقة لمحركات البحث.

مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

أولاً، قم بتثبيت Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

ثم، قم بإنشاء تكوين جهاز التوجيه الذي يتعامل مع التوجيه بناءً على اللغة:

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// الحصول على إعدادات التدويل
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * إعلان المسارات مع مسارات وبيانات وصفية خاصة بكل لغة.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// إنشاء مثيل الراوتر
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// إضافة حارس التنقل لمعالجة اللغة
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // إعادة استخدام اللغة المعرفة في بيانات الراوتر
    client.setLocale(metaLocale);
    next();
  } else {
    // الحالة الافتراضية: لا توجد لغة في البيانات، ربما مسار غير مطابق
    // اختياري: التعامل مع خطأ 404 أو إعادة التوجيه إلى اللغة الافتراضية
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> يُستخدم الاسم لتحديد المسار في جهاز التوجيه. يجب أن يكون فريدًا عبر جميع المسارات لتجنب التعارضات وضمان التنقل والربط الصحيح.

ثم، قم بتسجيل جهاز التوجيه في ملف main.js الخاص بك:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// أضف جهاز التوجيه إلى التطبيق
app.use(router);

// قم بتركيب التطبيق
app.mount("#app");
```

ثم قم بتحديث ملف `App.vue` الخاص بك لعرض مكون RouterView. سيعرض هذا المكون المكون المطابق للمسار الحالي.

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

بالتوازي، يمكنك أيضًا استخدام `intlayerMiddlewarePlugin` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا المكون الإضافي بالكشف تلقائيًا عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، سيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتحديث عنوان URL تلقائيًا عند تغيير المستخدم للغة، يمكنك تعديل مكون `LocaleSwitcher` لاستخدام Vue Router:

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

// الحصول على Vue Router
const router = useRouter();

// الحصول على معلومات اللغة ودالة setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // الحصول على المسار الحالي وإنشاء رابط محلي
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // التنقل إلى المسار المحلي بدون إعادة تحميل الصفحة
    router.push(localizedPath);
  },
});

// تتبع اللغة المختارة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير الاختيار
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// الحفاظ على تزامن selectedLocale مع اللغة العالمية
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

نصيحة: لتحسين تحسين محركات البحث (SEO) وسهولة الوصول، استخدم الوسوم مثل `<a href="/fr/home" hreflang="fr">` للربط بالصفحات المترجمة، كما هو موضح في الخطوة 10. هذا يسمح لمحركات البحث باكتشاف وفهرسة عناوين URL الخاصة بكل لغة بشكل صحيح. للحفاظ على سلوك تطبيق الصفحة الواحدة (SPA)، يمكنك منع التنقل الافتراضي باستخدام @click.prevent، وتغيير اللغة باستخدام useLocale، والتنقل برمجياً باستخدام Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="التبديل إلى الإنجليزية"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>الإنجليزية</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="التبديل إلى الإسبانية"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>الإسبانية</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (اختياري) الخطوة 9: تبديل خصائص اللغة والاتجاه في وسم HTML

عندما يدعم تطبيقك لغات متعددة، من الضروري تحديث خصائص `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية. يضمن ذلك:

- **سهولة الوصول**: تعتمد برامج قراءة الشاشة وتقنيات المساعدة على خاصية `lang` الصحيحة لنطق المحتوى وتفسيره بدقة.
- **عرض النص**: تضمن خاصية `dir` (الاتجاه) عرض النص بالترتيب الصحيح (مثلًا من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، وهو أمر ضروري لسهولة القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث خاصية `lang` لتحديد لغة الصفحة، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

من خلال تحديث هذه الخصائص ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * تركيبة تقوم بتحديث خصائص `lang` و `dir` لعنصر HTML <html>
 * بناءً على اللغة الحالية.
 *
 * @example
 * // في ملف App.vue الخاص بك أو في مكون عام
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // تحديث خصائص HTML كلما تغيرت اللغة
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // تحديث خاصية اللغة
      document.documentElement.lang = newLocale;

      // تعيين اتجاه النص (ltr لمعظم اللغات، rtl للعربية، العبرية، إلخ)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

استخدم هذا الـ composable في ملف `App.vue` الخاص بك أو في مكون عام:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// تطبيق سمات HTML بناءً على اللغة الحالية
useI18nHTMLAttributes();
</script>

<template>
  <!-- قالب التطبيق الخاص بك -->
</template>
```

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن تنقل تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية، بحيث عند نقر مستخدم يتحدث الفرنسية على رابط لصفحة "حول"، يتم توجيهه إلى `/fr/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المترجمة محركات البحث على فهرسة الصفحات الخاصة بكل لغة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط مترجم في جميع أنحاء تطبيقك، تضمن أن التنقل يبقى ضمن اللغة الحالية، مما يمنع التبديل غير المتوقع بين اللغات.
- **قابلية الصيانة**: تركيز منطق الترجمة في مكون واحد يبسط إدارة عناوين URL، مما يجعل قاعدة الشيفرة الخاصة بك أسهل في الصيانة والتوسيع مع نمو تطبيقك.

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

// التحقق مما إذا كان الرابط خارجيًا
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// إنشاء href مترجم للروابط الداخلية
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

لاستخدام Vue Router، قم بإنشاء نسخة مخصصة للراوتر:

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

// إنشاء خاصية to محلية للـ router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // إذا كان 'to' كائنًا، قم بتعريب خاصية المسار
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

استخدم هذه المكونات في تطبيقك:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink to="/home">الصفحة الرئيسية</RouterLink>
    <!-- أخرى -->
    <Link href="/">الرئيسية</Link>
    <Link href="/home">الصفحة الرئيسية</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (اختياري) الخطوة 11: عرض Markdown

يدعم Intlayer عرض محتوى Markdown مباشرة في تطبيق Vue الخاص بك. بشكل افتراضي، يتم التعامل مع Markdown كنص عادي. لتحويل Markdown إلى HTML غني، يمكنك دمج [markdown-it](https://github.com/markdown-it/markdown-it)، وهو محلل Markdown.

هذا مفيد بشكل خاص عندما تتضمن ترجماتك محتوى منسقًا مثل القوائم، الروابط، أو التأكيد.

بشكل افتراضي، يعرض Intlayer Markdown كسلسلة نصية. لكن Intlayer يوفر أيضًا طريقة لتحويل Markdown إلى HTML باستخدام دالة `installIntlayerMarkdown`.

> لرؤية كيفية إعلان محتوى Markdown باستخدام حزمة `intlayer`، راجع [توثيق markdown](https://github.com/aymericzip/intlayer/tree/main/docs/ar/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // السماح بعلامات HTML
  linkify: true, // الربط التلقائي لعناوين URL
  typographer: true, // تفعيل علامات الاقتباس الذكية، والشرطات، إلخ.
});

// إخبار Intlayer باستخدام md.render() كلما احتاج لتحويل Markdown إلى HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

بمجرد التسجيل، يمكنك استخدام بناء الجملة المعتمد على المكونات لعرض محتوى Markdown مباشرة:

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

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أكثر قوة.

![نص بديل](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![نص بديل](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يشمل الأنواع التي تم إنشاؤها تلقائيًا.

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

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التعمق أكثر

للتعمق أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
