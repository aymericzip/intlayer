# Начало работы с интернационализацией (i18n) с Intlayer, Vite и Vue

> Этот пакет находится в разработке. См. [вопрос](https://github.com/aymericzip/intlayer/issues/113) для получения дополнительной информации. Проявите интерес к Intlayer для Vue, поставив лайк вопросу.

<!-- См. [Шаблон приложения](https://github.com/aymericzip/intlayer-vue-template) на GitHub. -->

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека с открытым исходным кодом для интернационализации (i18n), разработанная для упрощения поддержки нескольких языков в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерацией типов, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и Vue

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлениями контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **vue-intlayer**
  Пакет, интегрирующий Intlayer с приложением Vue. Он предоставляет провайдеры контекста и композиции для интернационализации Vue.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправления URL.

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

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправление middleware, имена cookies, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

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

> Плагин `intlayerPlugin()` для Vite используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов объявлений контента и их мониторинг в режиме разработки. Он определяет переменные среды Intlayer в приложении Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявление вашего контента

Создайте и управляйте вашими объявлениями контента для хранения переводов:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ru: "Редактируйте <code>components/HelloWorld.vue</code> и сохраните для тестирования HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ru: "Проверьте ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ru: ", официальный стартер Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
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
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      ru: "Редактируйте <code>components/HelloWorld.vue</code> и сохраните для тестирования HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      ru: "Проверьте ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      ru: "официальный стартер Vue + Vite",
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
    }),
  },
};

export default helloWorldContent;
```

const { t } = require("intlayer");

/\*_ @type {import('intlayer').Dictionary} _/
const appContent = {
key: "helloworld",
content: {
count: t({ ru: "счет равен ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
edit: t({
ru: "Редактируйте <code>components/HelloWorld.vue</code> и сохраните для тестирования HMR",
en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
}),
checkOut: t({ ru: "Проверьте ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
officialStarter: t({
ru: "официальный стартер Vue + Vite",
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
        "ru": "счет равен ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ru": "Редактируйте <code>components/HelloWorld.vue</code> и сохраните для тестирования HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "ru": "Проверьте ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "ru": "официальный стартер Vue + Vite",
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
        "ru": "Руководство по масштабированию Vue Docs",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ru": "Нажмите на логотипы Vite и Vue, чтобы узнать больше",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
````

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`) и соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

### Шаг 5: Используйте Intlayer в вашем коде

Чтобы использовать функции интернационализации Intlayer в вашем приложении Vue, сначала необходимо зарегистрировать экземпляр Intlayer singleton в вашем основном файле. Этот шаг важен, так как он предоставляет контекст интернационализации всем компонентам вашего приложения, делая переводы доступными в любом месте дерева компонентов.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Внедрите провайдер на верхнем уровне
installIntlayer(app);

// Монтируйте приложение
app.mount("#app");
```

Получите доступ к вашим словарям контента по всему приложению, создавая основной компонент Vue и используя композиции `useIntlayer`:

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

#### Доступ к содержимому в Intlayer Intlayer предлагает различные API для

доступа к вашему содержимому: - **Синтаксис на основе компонентов**
(рекомендуется): Используйте синтаксис `<myContent />` или `<Component :is="myContent" />` для отображения содержимого как узла Intlayer. Это легко интегрируется с
[Визуальным редактором](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md)
и [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md).

- **Синтаксис на основе строк**: Используйте `{{ myContent }}` для рендеринга
  содержимого как обычного текста без поддержки Визуального редактора.
- **Синтаксис необработанного HTML**: Используйте `<div v-html="myContent" />` для рендеринга содержимого как необработанного HTML без поддержки Визуального
  редактора.
- **Синтаксис деструктуризации**: `useIntlayer` composable возвращает
  прокси с содержимым. Этот прокси можно деструктурировать для доступа к
  содержимому с сохранением реактивности.
  - Используйте `const content = useIntlayer("myContent");` и `{{ content.myContent }}` / `<content.myContent />`.
  - Или используйте `const { myContent } = useIntlayer("myContent");` и `{{ myContent }}` / `<myContent />` для деструктуризации содержимого.

### (Необязательно) Шаг 6: Изменение языка

вашего контента Чтобы изменить язык вашего контента, вы можете использовать
функцию `setLocale`, предоставляемую `useLocale` composable. Эта функция
позволяет установить локаль приложения и соответствующим образом обновить
контент. Создайте компонент для переключения между языками:

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

// Получите информацию о локали и функцию setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Отслеживайте выбранную локаль с помощью ref
const selectedLocale = ref(locale.value);

// Обновите локаль при изменении выбора
const changeLocale = () => setLocale(selectedLocale.value);

// Синхронизируйте selectedLocale с глобальной локалью
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

const content = useIntlayer("app"); // Создайте соответствующий файл декларации intlayer
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

### (Необязательно) Шаг 7: Добавьте локализованные маршруты в ваше приложение

Добавление локализованных маршрутов в приложение Vue обычно включает использование Vue Router с префиксами локалей. Это создает уникальные маршруты для каждого языка, что полезно для SEO и дружественных к SEO URL-адресов.

Пример:

```plaintext
- https://example.com/about
- https://example.com/ru/about
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

Затем создайте конфигурацию маршрутизатора, которая обрабатывает маршрутизацию на основе локали:

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
 * Объявите маршруты с путями и метаданными, специфичными для локали.
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

// Создайте экземпляр маршрутизатора
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Добавьте защиту навигации для обработки локали
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Повторное использование локали, определенной в мета-данных маршрута
    client.setLocale(metaLocale);
    next();
  } else {
    // Резервный вариант: локаль отсутствует в мета-данных, возможно, маршрут не совпадает
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

> Имя используется для идентификации маршрута в маршрутизаторе. Оно должно быть уникальным для всех маршрутов, чтобы избежать конфликтов и обеспечить правильную навигацию и связывание.

Затем зарегистрируйте маршрутизатор в вашем файле main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Добавьте маршрутизатор в приложение
app.use(router);

// Монтируйте приложение
app.mount("#app");
```

Затем обновите ваш файл `App.vue`, чтобы отобразить компонент RouterView. Этот компонент будет отображать совпадающий компонент для текущего маршрута.

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

Параллельно вы также можете использовать `intLayerMiddlewarePlugin`, чтобы добавить маршрутизацию на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующий cookie локали. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, произойдет перенаправление на локаль по умолчанию.

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

// Получить Vue Router
const router = useRouter();

// Получить информацию о локали и функцию setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Получить текущий маршрут и создать локализованный URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Перейти к локализованному маршруту без перезагрузки страницы
    router.push(localizedPath);
  },
});

// Отслеживать выбранную локаль с помощью ref
const selectedLocale = ref(locale.value);

// Обновить локаль при изменении выбора
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Синхронизировать selectedLocale с глобальной локалью
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Совет: Для лучшей SEO и доступности используйте теги, такие как `<a href="/fr/home" hreflang="fr">`, чтобы ссылаться на локализованные страницы, как показано в Шаге 10. Это позволяет поисковым системам правильно обнаруживать и индексировать URL для конкретных языков. Чтобы сохранить поведение SPA, вы можете предотвратить стандартную навигацию с помощью @click.prevent, изменить локаль с помощью useLocale и программно перейти с использованием Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Переключиться на английский"
      target="_self"
      aria-current="page"
      href="/ru/doc/get-started"
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
      aria-label="Переключиться на испанский"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления HTML

Когда ваше приложение поддерживает несколько языков, важно обновлять атрибуты `lang` и `dir` тега `<html>` в соответствии с текущей локалью. Это обеспечивает:

- **Доступность**: Читалки экрана и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для читаемости.
- **SEO**: Поисковые системы используют атрибут `lang`, чтобы определить язык вашей страницы, помогая предоставлять правильный локализованный контент в результатах поиска.

Обновляя эти атрибуты динамически при смене локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Компонент, который обновляет атрибуты `lang` и `dir` элемента HTML <html>
 * на основе текущей локали.
 *
 * @example
 * // В вашем App.vue или глобальном компоненте
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // Обновление атрибутов HTML при изменении локали
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Обновление атрибута языка
      document.documentElement.lang = newLocale;

      // Установка направления текста (ltr для большинства языков, rtl для арабского, иврита и т.д.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

Используйте этот компонент в вашем `App.vue` или глобальном компоненте:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Применение атрибутов HTML на основе текущей локали
useI18nHTMLAttributes();
</script>

<template>
  <!-- Шаблон вашего приложения -->
</template>
```

### (Опционально) Шаг 10: Создание локализованного компонента ссылки

Чтобы обеспечить, что навигация вашего приложения учитывает текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс к внутренним URL с текущим языком. Например, когда пользователь, говорящий на французском, нажимает на ссылку на страницу "О нас", он будет перенаправлен на `/fr/about` вместо `/about`.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Последовательность**: Используя локализованную ссылку по всему приложению, вы гарантируете, что навигация остается в текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

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

// Проверка, является ли ссылка внешней
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Создание локализованного href для внутренних ссылок
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Для использования с Vue Router создайте версию, специфичную для маршрутизатора:

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

// Создание локализованного свойства to для router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Если 'to' является объектом, локализуем свойство path
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
    <!-- Vue router -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Другие -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### Настройка TypeScript

Intlayer использует расширение модулей для получения преимуществ TypeScript и делает ваш код более надежным.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включение автоматически сгенерированных типов
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их добавления в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Инлайн-просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Дальнейшие шаги

## Чтобы углубиться, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с использованием [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md).
