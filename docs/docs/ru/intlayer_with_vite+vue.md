---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Перевод вашего сайта на Vite и Vue (i18n)
description: Узнайте, как сделать ваш сайт на Vite и Vue многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
---

# Начало работы с интернационализацией (i18n) с Intlayer, Vite и Vue

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-vite-vue-template) на GitHub.

## Что такое Intlayer?

**Intlayer** — это инновационная, с открытым исходным кодом библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Vue

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Основной пакет, который предоставляет инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **vue-intlayer**
  Пакет, который интегрирует Intlayer с приложением на Vue. Он предоставляет провайдеры контекста и композиции для интернационализации Vue.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация для интернационализации
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация для интернационализации
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление через middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

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

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов деклараций контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите Ваш Контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> и сохраните, чтобы протестировать HMR",
      es: "Edita <code>components/HelloWorld.vue</code> и guarda para probar HMR",
    }),
    checkOut: t({ en: "Посмотрите ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", официальный стартовый шаблон Vue + Vite",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Узнайте больше о поддержке IDE для Vue в ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Руководство по масштабированию Vue Docs",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Нажмите на логотипы Vite и Vue, чтобы узнать больше",
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
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Посмотрите ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "официальный стартовый шаблон Vue + Vite",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Узнайте больше о поддержке IDE для Vue в ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Руководство по масштабированию Vue Docs",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Нажмите на логотипы Vite и Vue, чтобы узнать больше",
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
      ru: "счётчик равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ru: "Отредактируйте <code>components/HelloWorld.vue</code> и сохраните, чтобы проверить HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ru: "Посмотрите ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ru: "официальный стартовый шаблон Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      ru: "Узнайте больше о поддержке IDE для Vue в ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      ru: "Руководство по масштабированию Vue Docs",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      ru: "Нажмите на логотипы Vite и Vue, чтобы узнать больше",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
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
        "ru": "счёт равен "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "ru": "Отредактируйте <code>components/HelloWorld.vue</code> и сохраните, чтобы протестировать HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
        "es": "Редактируйте <code>components/HelloWorld.vue</code> и сохраняйте, чтобы протестировать HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ru": "Ознакомьтесь с ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ru": "официальным стартовым шаблоном Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "ru": "Узнайте больше о поддержке IDE для Vue в ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "ru": "Руководство по масштабированию Vue Docs",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "ru": "Нажмите на логотипы Vite и Vue, чтобы узнать больше",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они будут включены в каталог `contentDir` (по умолчанию, `./src`). И соответствовать расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 5: Использование Intlayer в вашем коде

Чтобы использовать функции интернационализации Intlayer во всём вашем приложении на Vue, сначала необходимо зарегистрировать синглтон-экземпляр Intlayer в вашем основном файле. Этот шаг важен, так как он предоставляет контекст интернационализации для всех компонентов вашего приложения, делая переводы доступными в любом месте дерева компонентов.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Внедряем провайдер на верхнем уровне
installIntlayer(app);

// Монтируем приложение
app.mount("#app");
```

Получайте доступ к вашим словарям контента по всему приложению, создавая основной Vue-компонент и используя композиции `useIntlayer`:

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

#### Доступ к содержимому в Intlayer

Intlayer предлагает различные API для доступа к вашему содержимому:

- **Синтаксис на основе компонентов** (рекомендуется):
  Используйте синтаксис `<myContent />` или `<Component :is="myContent" />` для отображения содержимого как узла Intlayer. Это обеспечивает бесшовную интеграцию с [Визуальным редактором](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) и [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

- **Синтаксис на основе строк**:
  Используйте `{{ myContent }}` для отображения содержимого в виде обычного текста, без поддержки Визуального редактора.

- **Синтаксис с необработанным HTML**:
  Используйте `<div v-html="myContent" />` для отображения содержимого в виде необработанного HTML, без поддержки Визуального Редактора.

- **Синтаксис деструктуризации**:
  Композиция `useIntlayer` возвращает Proxy с содержимым. Этот прокси можно деструктурировать для доступа к содержимому, сохраняя реактивность.
  - Используйте `const content = useIntlayer("myContent");` и `{{ content.myContent }}` / `<content.myContent />`.
  - Или используйте `const { myContent } = useIntlayer("myContent");` и `{{ myContent }}` / `<myContent/>` для деструктуризации содержимого.

### (Необязательно) Шаг 6: Изменение языка вашего содержимого

Для изменения языка вашего содержимого вы можете использовать функцию `setLocale`, предоставляемую композицией `useLocale`. Эта функция позволяет установить локаль приложения и обновить содержимое соответственно.

Создайте компонент для переключения между языками:

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

// Получаем информацию о локали и функцию setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Отслеживаем выбранную локаль с помощью ref
const selectedLocale = ref(locale.value);

// Обновляем локаль при изменении выбора
const changeLocale = () => setLocale(selectedLocale.value);

// Синхронизируем selectedLocale с глобальной локалью
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Затем используйте этот компонент в вашем App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Создайте связанный файл декларации intlayer
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

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Добавление локализованной маршрутизации в приложение Vue обычно включает использование Vue Router с префиксами локали. Это создает уникальные маршруты для каждого языка, что полезно для SEO и удобных для SEO URL.

Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Сначала установите Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Затем создайте конфигурацию роутера, которая обрабатывает маршрутизацию на основе локали:

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

// Получить конфигурацию интернационализации
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Объявить маршруты с путями и метаданными, специфичными для локали.
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

// Создаём экземпляр роутера
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Добавляем навигационный гвард для обработки локали
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Используем локаль, определённую в метаданных маршрута
    client.setLocale(metaLocale);
    next();
  } else {
    // Запасной вариант: локаль в метаданных отсутствует, возможно, маршрут не найден
    // Необязательно: обработка 404 или перенаправление на локаль по умолчанию
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Имя используется для идентификации маршрута в роутере. Оно должно быть уникальным среди всех маршрутов, чтобы избежать конфликтов и обеспечить корректную навигацию и связывание.

Затем зарегистрируйте роутер в вашем файле main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Добавляем роутер в приложение
app.use(router);

// Монтируем приложение
app.mount("#app");
```

Затем обновите ваш файл `App.vue`, чтобы отобразить компонент RouterView. Этот компонент будет отображать соответствующий компонент для текущего маршрута.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue"; // Импорт переключателя локали
</script>

<template>
  <nav>
    <LocaleSwitcher />
    <!-- Компонент переключения локали -->
  </nav>
  <RouterView />
  <!-- Отображение компонента, соответствующего текущему маршруту -->
</template>
```

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующий cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не будет обнаружена, произойдет перенаправление на локаль по умолчанию.

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
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Необязательно) Шаг 8: Изменение URL при смене локали

Чтобы автоматически обновлять URL при смене языка пользователем, вы можете изменить компонент `LocaleSwitcher`, чтобы использовать Vue Router:

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

// Получаем Vue Router
const router = useRouter();

// Получаем информацию о локали и функцию setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Получаем текущий маршрут и создаём локализованный URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Переходим на локализованный маршрут без перезагрузки страницы
    router.push(localizedPath);
  },
});

// Отслеживаем выбранную локаль с помощью ref
const selectedLocale = ref(locale.value);

// Обновление локали при изменении выбора
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Синхронизация selectedLocale с глобальной локалью
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Совет: Для лучшей SEO и доступности используйте теги вида `<a href="/fr/home" hreflang="fr">` для ссылок на локализованные страницы, как показано в Шаге 10. Это позволяет поисковым системам правильно обнаруживать и индексировать URL-адреса, специфичные для языка. Чтобы сохранить поведение SPA, вы можете предотвратить стандартную навигацию с помощью @click.prevent, изменить локаль с помощью useLocale и программно перейти с помощью Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Переключиться на английский"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Английский</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Переключиться на испанский"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Испанский</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления в HTML

Когда ваше приложение поддерживает несколько языков, крайне важно обновлять атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали. Это обеспечивает:

- **Доступность**: Программы чтения с экрана и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации содержимого.
- **Отображение текста**: Атрибут `dir` (направление) обеспечивает правильный порядок отображения текста (например, слева направо для английского, справа налево для арабского или иврита), что важно для удобочитаемости.
- **SEO**: Поисковые системы используют атрибут `lang` для определения языка вашей страницы, помогая показывать правильный локализованный контент в результатах поиска.

Обновляя эти атрибуты динамически при смене локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Композиция, которая обновляет атрибуты `lang` и `dir` элемента HTML <html>
 * в зависимости от текущей локали.
 *
 * @example
 * // В вашем App.vue или глобальном компоненте
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Обновляем атрибуты HTML при изменении локали
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Обновляем атрибут языка
      document.documentElement.lang = newLocale;

      // Устанавливаем направление текста (ltr для большинства языков, rtl для арабского, иврита и т.д.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Используйте этот композиционный метод в вашем `App.vue` или глобальном компоненте:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Применяем атрибуты HTML в зависимости от текущей локали
useI18nHTMLAttributes();
</script>

<template>
  <!-- Шаблон вашего приложения -->
</template>
```

### (Необязательно) Шаг 10: Создание локализованного компонента Link

Чтобы обеспечить навигацию вашего приложения с учётом текущей локали, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL, например, когда франкоязычный пользователь нажимает на ссылку на страницу "О нас", его перенаправляет на `/fr/about` вместо `/about`.

Такое поведение полезно по нескольким причинам:

- **SEO и удобство для пользователя**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставляют пользователям контент на предпочитаемом языке.
- **Последовательность**: Используя локализованные ссылки по всему приложению, вы гарантируете, что навигация остаётся в рамках текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

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

// Проверяем, является ли ссылка внешней
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Создаем локализованный href для внутренних ссылок
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Для использования с Vue Router создайте версию, специфичную для роутера:

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

// Создаём локализованное свойство to для router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Если 'to' является объектом, локализуйте свойство path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Используйте эти компоненты в вашем приложении:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Корень</RouterLink>
    <RouterLink to="/home">Главная</RouterLink>
    <!-- Другие -->
    <Link href="/">Корень</Link>
    <Link href="/home">Главная</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Необязательно) Шаг 11: Рендеринг Markdown

Intlayer поддерживает рендеринг Markdown-контента непосредственно в вашем Vue-приложении. По умолчанию Markdown обрабатывается как простой текст. Чтобы преобразовать Markdown в насыщенный HTML, вы можете интегрировать [markdown-it](https://github.com/markdown-it/markdown-it) — парсер Markdown.

Это особенно полезно, когда ваши переводы содержат форматированный контент, такой как списки, ссылки или выделения.

По умолчанию Intlayer рендерит markdown как строку. Но Intlayer также предоставляет способ рендерить markdown в HTML с помощью функции `installIntlayerMarkdown`.

> Чтобы узнать, как объявлять markdown-контент с использованием пакета `intlayer`, смотрите [документацию по markdown](https://github.com/aymericzip/intlayer/tree/main/docs/ru/dictionary/markdown.md).

```ts filename="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // разрешить HTML-теги
  linkify: true, // автоматически преобразовывать URL в ссылки
  typographer: true, // включить умные кавычки, тире и т.д.
});

// Сообщаем Intlayer использовать md.render() всякий раз, когда нужно преобразовать markdown в HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

После регистрации вы можете использовать синтаксис на основе компонентов для прямого отображения содержимого Markdown:

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

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать ваш код более надежным.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
