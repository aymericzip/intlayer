---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Як перекласти ваш додаток на Vite і Vue – посібник з i18n 2026
description: Дізнайтеся, як зробити свій вебсайт на Vite і Vue багатомовним. Дотримуйтеся документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація (i18n)
  - Документація
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Add init command
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Перекладіть свій вебсайт на Vite і Vue за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки багатомовності в сучасних веб-додатках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автоматично згенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Отримати переваги від розширених можливостей**, таких як динамічне визначення локалі та перемикання.

---

## Покроковий посібник з налаштування Intlayer у Vite і Vue додатку

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Найкраще i18n-рішення для Vite і Vue? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-vue-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Див. [Application Template](https://github.com/aymericzip/intlayer-vite-vue-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети, використовуючи один із наведених пакетних менеджерів:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладу, [декларування контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **vue-intlayer**
  Пакет, який інтегрує Intlayer із Vue-додатком. Надає провайдери контексту та composables для інтернаціоналізації у Vue.

- **vite-intlayer**
  Містить Vite-плагін для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для виявлення преференційної локалі користувача, керування кукі та обробки перенаправлень URL.

### Крок 2: Налаштування вашого проєкту

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваші інші локалі
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
      // Ваші інші локалі
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
      // Ваші інші locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, відключити логи Intlayer у консолі та інше. Повний перелік доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer до вашої конфігурації.

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

// Документація конфігурації: https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// Документація конфігурації: https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відслідковує їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає aliases для оптимізації продуктивності.

### Крок 4: Оголосіть свій контент

Створіть і керуйте деклараціями контенту для збереження перекладів:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      uk: "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб перевірити HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      uk: "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб протестувати HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      uk: "Ознайомтеся з ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      uk: ", офіційним стартером Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      uk: "Дізнайтеся більше про підтримку IDE для Vue в ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      uk: "Керівництво Vue Docs — Scaling up",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      uk: "Натисніть на логотипи Vite та Vue, щоб дізнатися більше",
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
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      uk: "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб перевірити HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      uk: "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб перевірити HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      uk: "Ознайомтеся з ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      uk: "офіційним стартовим шаблоном Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      uk: "Дізнайтеся більше про підтримку IDE для Vue в ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      uk: "Vue Docs Scaling up Guide",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      uk: "Натисніть на логотипи Vite та Vue, щоб дізнатися більше",
      en: "Click on the Vite and Vue logos to learn more",
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
      uk: "кількість: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      uk: "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб перевірити HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      uk: "Ознайомтеся з ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      uk: "офіційний starter Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      uk: "Дізнайтеся більше про підтримку IDE для Vue в ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      uk: "Керівництво зі масштабування (Vue Docs)",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      uk: "Натисніть на логотипи Vite і Vue, щоб дізнатися більше",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      uk: "Натисніть на логотипи Vite і Vue, щоб дізнатися більше",
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
        "uk": "кількість ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "uk": "Редагуйте <code>components/HelloWorld.vue</code> і збережіть, щоб протестувати HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "uk": "Перегляньте ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "uk": "офіційний starter Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "uk": "Дізнайтеся більше про підтримку IDE для Vue у ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "uk": "Посібник зі масштабування документації Vue",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "uk": "Натисніть на логотипи Vite та Vue, щоб дізнатися більше",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, щойно вони будуть додані до директорії `contentDir` (за замовчуванням, `./src`). Та мають відповідати розширенню файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації див. [документацію щодо файлу декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Щоб використовувати можливості інтернаціоналізації Intlayer у всьому вашому Vue-застосунку, спочатку потрібно зареєструвати singleton-екземпляр Intlayer у вашому файлі main. Цей крок є критично важливим, оскільки він надає контекст інтернаціоналізації всім компонентам вашого застосунку, роблячи переклади доступними в будь-якій частині дерева компонентів.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Зареєструвати провайдера на верхньому рівні
installIntlayer(app);

// Змонтувати застосунок
app.mount("#app");
```

Отримуйте доступ до своїх словників вмісту в усьому застосунку, створивши головний Vue-компонент і використовуючи composables `useIntlayer`:

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

#### Доступ до вмісту в Intlayer

Intlayer пропонує різні API для доступу до вашого вмісту:

- **Синтаксис на основі компонентів** (рекомендується):
  Використовуйте `<myContent />` або `<Component :is="myContent" />`, щоб відобразити вміст як Intlayer Node. Це безшовно інтегрується з [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

- **Синтаксис рядка**:
  Використовуйте `{{ myContent }}`, щоб відобразити вміст як простий текст, без підтримки Візуального редактора.

- **Сирий HTML-синтаксис**:
  Використовуйте `<div v-html="myContent" />` щоб відобразити вміст як необроблений HTML, без підтримки Visual Editor.

- **Синтаксис деструктуризації**:
  Композиція `useIntlayer` повертає Proxy з вмістом. Цей proxy можна деструктурувати, щоб отримати доступ до вмісту, зберігаючи реактивність.
  - Використовуйте `const content = useIntlayer("myContent");` та `{{ content.myContent }}` / `<content.myContent />`.
  - Або використовуйте `const { myContent } = useIntlayer("myContent");` та `{{ myContent}}` / `<myContent/>` щоб деструктурувати вміст.

### (Необов'язково) Крок 6: Змініть мову вашого вмісту

Щоб змінити мову вмісту, ви можете використати функцію `setLocale`, яку надає композиція `useLocale`. Ця функція дозволяє встановити локаль застосунку та відповідно оновити вміст.

Створіть компонент для перемикання між мовами:

```vue fileName="src/components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName } from "intlayer";
import { ref, watch } from "vue";
import { useLocale } from "vue-intlayer";

// Отримати інформацію про локаль та функцію setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Відстежувати вибрану локаль за допомогою ref
const selectedLocale = ref(locale.value);

// Оновлювати локаль при зміні вибору
const changeLocale = () => setLocale(selectedLocale.value);

// Підтримувати selectedLocale синхронною зі глобальною локаллю
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>

<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>
```

Потім використайте цей компонент у вашому App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Створіть пов'язаний файл декларації intlayer
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

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого застосунку

Додавання локалізованої маршрутизації в додатку на Vue зазвичай передбачає використання Vue Router з префіксами локалі. Це створює унікальні маршрути для кожної мови, що корисно для SEO і для отримання SEO-дружніх URL.

Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Спочатку встановіть Vue Router:

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

Потім створіть конфігурацію роутера, яка обробляє маршрутизацію на основі локалі:

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
 * Оголосіть маршрути зі шляхами, специфічними для локалі, та метаданими.
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

// Створіть екземпляр роутера
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Додайте навігаційний guard для обробки локалі
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Використовуємо локаль, визначену в meta маршруту
  client.setLocale(metaLocale);
  next();
});
```

> Ім'я використовується для ідентифікації маршруту в роутері. Воно має бути унікальним серед усіх маршрутів, щоб уникнути конфліктів та забезпечити коректну навігацію й лінкування.

Потім зареєструйте роутер у файлі main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Додайте роутер до додатку
app.use(router);

// Монтуємо додаток
app.mount("#app");
```

Далі оновіть файл `App.vue`, щоб відрендерити компонент RouterView. Цей компонент відобразить компонент, що відповідає поточному маршруту.

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

Паралельно ви також можете використовувати `intlayerProxy` для додавання серверної маршрутизації до вашого додатку. Цей плагін автоматично визначає поточну локаль на основі URL і встановлює відповідний cookie локалі. Якщо локаль не вказана, плагін визначатиме найбільш підходящу локаль на основі налаштувань мови браузера користувача. Якщо локаль не виявлена, він перенаправить на локаль за замовчуванням.

> Зверніть увагу, що для використання `intlayerProxy` у production потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

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

// https://vitejs.dev/config/ — документація Vite
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/ — документація Vite
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerProxy()],
});
```

### (Необов'язково) Крок 8: Змінювати URL при зміні локалі

Щоб автоматично оновлювати URL при зміні мови користувачем, ви можете змінити компонент `LocaleSwitcher`, щоб він використовував Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
<script setup lang="ts">
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { ref, watch } from "vue";
import { useLocale } from "vue-intlayer";
import { useRouter } from "vue-router";

// Отримати Vue Router
const router = useRouter();

// Отримати інформацію про локаль та функцію setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Отримати поточний маршрут та створити локалізований URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Перехід на локалізований маршрут без перезавантаження сторінки
    router.push(localizedPath);
  },
});

// Відстежувати вибрану локаль за допомогою ref
const selectedLocale = ref(locale.value);

// Оновити локаль, коли змінюється вибір
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Узгоджувати selectedLocale з глобальною локаллю
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>

<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>
```

Порада: Для кращого SEO та доступності використовуйте теги на кшталт `<a href="/fr/home" hreflang="fr">` для посилань на локалізовані сторінки, як показано в Кроці 10. Це дозволяє пошуковим системам виявляти та індексувати URL-адреси для певних мов коректно. Щоб зберегти поведінку SPA, ви можете запобігти стандартній навігації за допомогою @click.prevent, змінити локаль за допомогою useLocale і програмно переходити за допомогою Vue Router.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Переключити на англійську"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Англійська</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Іспанська</span>
        <span>Іспанська</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Необов'язково) Крок 9: Змінити атрибути мови та напрямку в HTML

Коли ваш додаток підтримує кілька мов, дуже важливо оновлювати атрибути `lang` і `dir` тегу `<html>` відповідно до поточної локалі. Це гарантує:

- **Доступність**: програми для читання з екрана та допоміжні технології покладаються на правильний атрибут `lang`, щоб правильно вимовляти та інтерпретувати вміст.
- **Відображення тексту**: атрибут `dir` (напрям) гарантує, що текст відображається в правильному порядку (наприклад, зліва направо для англійської, справа наліво для арабської чи івриту), що є критично важливим для читабельності.
- **SEO**: Пошукові системи використовують атрибут `lang` для визначення мови вашої сторінки, що допомагає показувати відповідний локалізований контент у результатах пошуку.

Оновлюючи ці атрибути динамічно при зміні локалі, ви гарантуєте узгоджений та доступний досвід для користувачів на всіх підтримуваних мовах.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable, який оновлює атрибути `lang` та `dir` елементу <html>
 * на основі поточної локалі.
 *
 * @example
 * // У вашому App.vue або глобальному компоненті
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Оновлює атрибути HTML щоразу при зміні локалі
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Оновити атрибут мови
      document.documentElement.lang = newLocale;

      // Встановити напрямок тексту (ltr для більшості мов, rtl для арабської, івриту тощо.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Використайте цей composable у вашому `App.vue` або в глобальному компоненті:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Застосувати атрибути HTML відповідно до поточної локалі
useI18nHTMLAttributes();
</script>

<template>
  <!-- Ваш шаблон додатка -->
</template>
```

### (Необов'язково) Крок 10: Створення локалізованого компонента `Link`

Щоб гарантувати, що навігація вашого додатка поважає поточну локаль, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес. Наприклад, коли франкомовний користувач натискає на посилання на сторінку "About", його перенаправляє на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO and User Experience**: Локалізовані URL-адреси допомагають пошуковим системам правильно індексувати сторінки для конкретних мов і надавати користувачам контент їхньою мовою.
- **Послідовність**: Використовуючи локалізоване посилання в усьому застосунку, ви гарантуєте, що навігація залишатиметься в поточній локалі, запобігаючи несподіваним змінам мови.
- **Зручність підтримки**: Централізація логіки локалізації в одному компоненті спрощує управління URL-адресами, роблячи вашу кодову базу легшою для підтримки та розширення в міру зростання застосунку.

```vue fileName="src/components/Link.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { computed } from "vue";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Перевірити, чи є посилання зовнішнім
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Створити локалізований href для внутрішніх посилань
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>

<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>
```

Для використання з Vue Router створіть версію, специфічну для роутера:

```vue fileName="src/components/RouterLink.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { computed } from "vue";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Створити локалізований to-prop для router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Якщо 'to' є об'єктом, локалізуйте властивість path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>

<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>
```

Використовуйте ці компоненти у вашому застосунку:

```vue fileName="src/App.vue"
<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>

<template>
  <div>
    <!-- Маршрутизатор Vue -->
    <RouterLink to="/">Корінь</RouterLink>
    <RouterLink to="/home">Головна</RouterLink>
    <!-- Інше -->
    <Link href="/">Корінь</Link>
    <Link href="/home">Головна</Link>
  </div>
</template>
```

### (Необов'язково) Крок 11: Відображення Markdown

Intlayer підтримує відображення вмісту Markdown безпосередньо у вашому Vue-додатку. За замовчуванням Markdown обробляється як звичайний текст. Щоб перетворити Markdown на структурований HTML, можна інтегрувати [markdown-it](https://github.com/markdown-it/markdown-it) — парсер Markdown.

Це особливо корисно, коли ваші переклади містять форматований контент, наприклад списки, посилання або виділення.

За замовчуванням Intlayer рендерить Markdown як рядок. Але Intlayer також надає спосіб рендерити Markdown у HTML за допомогою функції `installIntlayerMarkdown`.

> Щоб побачити, як оголосити вміст Markdown з використанням пакета `intlayer`, див. [документацію з Markdown](https://github.com/aymericzip/intlayer/tree/main/docs/uk/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // дозволити HTML-теги
  linkify: true, // автоматично робити посилання з URL
  typographer: true, // ввімкнути "розумні" лапки, тире тощо.
});

// Скажіть Intlayer використовувати md.render(), коли потрібно перетворити Markdown у HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Після реєстрації ви можете використовувати компонентний синтаксис, щоб відображати вміст Markdown безпосередньо:

```vue
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>

<template>
  <div>
    <myMarkdownContent />
  </div>
</template>
```

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб скористатися перевагами TypeScript і зробити ваш codebase більш надійним.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, які генерує Intlayer. Це дозволить уникнути їх коміту у ваш Git-репозиторій.

Для цього можна додати такі інструкції до вашого файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для зручного створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Щоб піти далі

Щоб рухатися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
