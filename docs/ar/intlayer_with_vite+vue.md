# البدء في التدويل (i18n) مع Intlayer و Vite و Vue

> هذه الحزمة قيد التطوير. انظر [المشكلة](https://github.com/aymericzip/intlayer/issues/113) لمزيد من المعلومات. أظهر اهتمامك بـ Intlayer لـ Vue من خلال الإعجاب بالمشكلة.

<!-- انظر [قالب التطبيق](https://github.com/aymericzip/intlayer-vue-template) على GitHub. -->

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس وصفية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Vue

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer vite-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)، الترجمة، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **vue-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Vue. توفر موفري السياق والمكونات القابلة للتكوين لتدويل Vue.

- **vite-intlayer**
  تتضمن مكون Vite الإضافي لدمج Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى الوسيط لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

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
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف المكون الإضافي intlayer إلى تكوينك.

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

> يتم استخدام المكون الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    officialStarter: t({
      ar: "، البداية الرسمية لـ Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ar: "تعرف على المزيد حول دعم IDE لـ Vue في ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ar: "دليل التوسع في مستندات Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ar: "انقر على شعارات Vite و Vue لمعرفة المزيد",
      en: "Click on the Vite and Vue logos to learn more",
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
    officialStarter: t({
      ar: "البداية الرسمية لـ Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ar: "تعرف على المزيد حول دعم IDE لـ Vue في ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ar: "دليل التوسع في مستندات Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ar: "انقر على شعارات Vite و Vue لمعرفة المزيد",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

---

const { t } = require("intlayer");

/\*_ @type {import('intlayer').Dictionary} _/
const appContent = {
key: "helloworld",
content: {
count: t({ ar: "العدد هو ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
edit: t({
ar: "قم بتعديل <code>components/HelloWorld.vue</code> واحفظ لاختبار HMR",
en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
}),
checkOut: t({ ar: "تحقق من ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
officialStarter: t({
ar: "المشروع الرسمي ل Vue + Vite",
en: "the official Vue + Vite starter",
fr: "le starter officiel Vue + Vite",
es: "el starter oficial Vue + Vite",
}),
learnMore: t({
ar: "تعرف على المزيد حول دعم IDE لـ Vue في ",
en: "Learn more about IDE Support for Vue in the ",
fr: "En savoir plus sur le support IDE pour Vue dans le ",
es: "Aprenda más sobre el soporte IDE para Vue en el ",
}),
vueDocs: t({
ar: "دليل التوسع في مستندات Vue",
en: "Vue Docs Scaling up Guide",
fr: "Vue Docs Scaling up Guide",
es: "Vue Docs Scaling up Guide",
}),
readTheDocs: t({
ar: "انقر على شعارات Vite و Vue لمعرفة المزيد",
en: "Click on the Vite and Vue logos to learn more",
fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
}),
},
};

module.exports = appContent;

````

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
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
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ar": "المشروع الرسمي ل Vue + Vite",
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
        "ar": "دليل التوسع في مستندات Vue",
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
````

> يمكن تعريف إعلانات المحتوى في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). وتطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

لاستخدام ميزات التدويل الخاصة بـ Intlayer في تطبيق Vue الخاص بك، تحتاج أولاً إلى تسجيل مثيل Intlayer الفردي في ملفك الرئيسي. هذه الخطوة ضرورية لأنها توفر سياق التدويل لجميع المكونات في تطبيقك، مما يجعل الترجمات متاحة في أي مكان في شجرة المكونات الخاصة بك.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// قم بحقن المزود في المستوى الأعلى
installIntlayer(app);

// قم بتركيب التطبيق
app.mount("#app");
```

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك عن طريق إنشاء مكون Vue رئيسي واستخدام `useIntlayer`:

```vue fileName="src/HelloWord.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

> إذا كنت تريد استخدام المحتوى الخاص بك في سمة، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الوظيفة باستخدام `.value`، مثل:

> ```html
>
> ```

> <img src="./logo.svg" :alt="content.image.value" />

> ```
>
> ```

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام وظيفة `setLocale` المقدمة من قبل `useLocale`. تتيح لك هذه الوظيفة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

قم بإنشاء مكون للتبديل بين اللغات:

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

// احصل على معلومات اللغة ووظيفة setLocale
const { locale, availableLocales, setLocale } = useLocale();

// تتبع اللغة المحددة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير التحديد
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

ثم، استخدم هذا المكون في App.vue الخاص بك:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // قم بإنشاء ملف إعلان intlayer ذي صلة
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

إضافة التوجيه المحلي في تطبيق Vue تتضمن عادةً استخدام Vue Router مع بادئات اللغة. هذا يجعل المسارات فريدة لكل لغة، وهو مفيد لتحسين محركات البحث وعناوين URL الصديقة لتحسين محركات البحث.

مثال:

```plaintext
- https://example.com/about

- https://example.com/ar/about
- https://example.com/ar/about
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

ثم، قم بإنشاء تكوين للموجه يتعامل مع التوجيه بناءً على اللغة:

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

// الحصول على تكوين التدويل
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * قم بتحديد المسارات مع مسارات محددة للغات وبيانات تعريف.
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

// إنشاء مثيل الموجه
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// إضافة حارس التنقل لمعالجة اللغة
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // إعادة استخدام اللغة المحددة في بيانات تعريف المسار
    client.setLocale(metaLocale);
    next();
  } else {
    // احتياطي: لا توجد لغة في بيانات التعريف، ربما مسار غير مطابق
    // اختياري: معالجة 404 أو إعادة التوجيه إلى اللغة الافتراضية
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> يتم استخدام الاسم لتحديد المسار في الموجه. يجب أن يكون فريدًا عبر جميع المسارات لتجنب التعارضات وضمان التنقل والربط بشكل صحيح.

ثم، قم بتسجيل الموجه في ملف main.js الخاص بك:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// أضف الموجه إلى التطبيق
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

بالتوازي، يمكنك أيضًا استخدام `intLayerMiddlewarePlugin` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا المكون الإضافي بالكشف تلقائيًا عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، سيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة المتصفح للمستخدم. إذا لم يتم الكشف عن لغة، فسيعيد التوجيه إلى اللغة الافتراضية.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتحديث عنوان URL تلقائيًا عندما يغير المستخدم اللغة، يمكنك تعديل مكون `LocaleSwitcher` لاستخدام Vue Router:

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
    // الحصول على المسار الحالي وإنشاء عنوان URL مخصص للغة
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // التنقل إلى المسار المخصص للغة دون إعادة تحميل الصفحة
    router.push(localizedPath);
  },
});

// تتبع اللغة المحددة باستخدام ref
const selectedLocale = ref(locale.value);

// تحديث اللغة عند تغيير الاختيار
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// الحفاظ على selectedLocale متزامنًا مع اللغة العامة
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

نصيحة: لتحسين تحسين محركات البحث وإمكانية الوصول، استخدم العلامات مثل `<a href="/ar/home" hreflang="ar">` للربط بالصفحات المترجمة، كما هو موضح في الخطوة 10. يتيح ذلك لمحركات البحث اكتشاف عناوين URL الخاصة باللغات وفهرستها بشكل صحيح. للحفاظ على سلوك SPA، يمكنك منع التنقل الافتراضي باستخدام @click.prevent، تغيير اللغة باستخدام useLocale، والتنقل برمجيًا باستخدام Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/ar/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>English</span></div>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/ar/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (اختياري) الخطوة 9: تبديل سمات اللغة والاتجاه في HTML

عندما يدعم تطبيقك لغات متعددة، من المهم تحديث سمات `lang` و `dir` في علامة `<html>` لتتطابق مع اللغة الحالية. يضمن ذلك:

- **إمكانية الوصول**: تعتمد قارئات الشاشة والتقنيات المساعدة على السمة `lang` الصحيحة لنطق المحتوى وتفسيره بدقة.
- **عرض النص**: تضمن السمة `dir` (الاتجاه) أن يتم عرض النص بالترتيب الصحيح (مثلًا، من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، وهو أمر ضروري للقراءة.
- **تحسين محركات البحث**: تستخدم محركات البحث السمة `lang` لتحديد لغة صفحتك، مما يساعد في تقديم المحتوى المترجم الصحيح في نتائج البحث.

من خلال تحديث هذه السمات ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * مركب يقوم بتحديث سمات `lang` و `dir` لعنصر HTML <html>
 * بناءً على اللغة الحالية.
 *
 * @example
 * // في ملف App.vue أو مكون عام
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // تحديث سمات HTML عند تغيير اللغة
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // تحديث سمة اللغة
      document.documentElement.lang = newLocale;

      // تعيين اتجاه النص (ltr لمعظم اللغات، rtl للعربية، العبرية، إلخ.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

استخدم هذا المركب في ملف `App.vue` أو مكون عام:

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

### (اختياري) الخطوة 10: إنشاء مكون رابط مخصص مع الترجمة

لضمان أن التنقل في تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة لعناوين URL الداخلية باللغة الحالية. على سبيل المثال، عندما ينقر مستخدم يتحدث الفرنسية على رابط إلى صفحة "حول"، يتم توجيهه إلى `/ar/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المترجمة محركات البحث على فهرسة الصفحات الخاصة باللغات بشكل صحيح وتقديم محتوى للمستخدمين بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط مترجم في جميع أنحاء تطبيقك، تضمن أن التنقل يظل ضمن اللغة الحالية، مما يمنع التبديل غير المتوقع للغة.
- **سهولة الصيانة**: تبسيط منطق الترجمة في مكون واحد يجعل إدارة عناوين URL أسهل، مما يجعل قاعدة التعليمات البرمجية الخاصة بك أسهل في الصيانة والتوسيع مع نمو تطبيقك.

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

// إنشاء رابط مترجم للروابط الداخلية
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

للاستخدام مع Vue Router، قم بإنشاء نسخة خاصة بالموجه:

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

// إنشاء خاصية to مترجمة لـ router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // إذا كانت 'to' كائنًا، قم بترجمة خاصية المسار
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
    <RouterLink to="/">الجذر</RouterLink>
    <RouterLink to="/home">الرئيسية</RouterLink>
    <!-- أخرى -->
    <Link href="/">الجذر</Link>
    <Link href="/home">الرئيسية</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### إعداد TypeScript

يستخدم Intlayer توسيع الوحدات للاستفادة من TypeScript وجعل قاعدة التعليمات البرمجية الخاصة بك أقوى.

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

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [وثائق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### الذهاب أبعد

## للمزيد، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) أو فصل المحتوى الخاص بك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).
