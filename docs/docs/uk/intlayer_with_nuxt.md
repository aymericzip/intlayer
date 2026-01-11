---
createdAt: 2025-06-18
updatedAt: 2025-12-30
title: Як перекласти ваш додаток Nuxt та Vue — посібник i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Nuxt і Vue багатомовним. Керуйтесь документацією, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.3.13
    date: 2025-12-08
    changes: Непотрібна конфігурація TypeScript
  - version: 7.3.11
    date: 2025-12-07
    changes: Оновлено LocaleSwitcher, SEO, метадані
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть ваш Nuxt і Vue вебсайт за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки багатомовності в сучасних вебдодатках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автоматично згенерованих типів, що покращує автозаповнення та виявлення помилок.
- **Отримати переваги від розширених функцій**, таких як динамічне виявлення локалі та перемикання.

---

## Покроковий посібник налаштування Intlayer у Nuxt-застосунку

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Як перекласти ваш Nuxt і Vue додаток за допомогою Intlayer? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Перегляньте репозиторій Application Template на GitHub: https://github.com/aymericzip/intlayer-nuxt-4-template

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою відповідного пакетного менеджера:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bunx intlayer init
```

- **intlayer**

  Базовий пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **vue-intlayer**
  Пакет, який інтегрує Intlayer у Vue-застосунок. Він надає composables для Vue-компонентів.

- **nuxt-intlayer**
  Nuxt-модуль, який інтегрує Intlayer у Nuxt-застосунки. Він забезпечує автоматичне налаштування, middleware для виявлення локалі, керування cookie та перенаправлення URL.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL, перенаправлення через middleware, імена cookie, розташування та розширення ваших декларацій контенту, відключити логи Intlayer у консолі та інше. Для повного переліку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Nuxt

Додайте модуль intlayer до вашої конфігурації Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Your existing Nuxt configuration
  modules: ["nuxt-intlayer"],
});
```

> Модуль `nuxt-intlayer` автоматично керує інтеграцією Intlayer з Nuxt. Він налаштовує побудову декларацій контенту, відстежує файли в режимі розробки, надає middleware для виявлення локалі та керує локалізованим маршрутизуванням.

### Крок 4: Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для збереження перекладів:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      uk: "Привіт, світ",
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      uk: "Ласкаво просимо | Мій додаток",
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      uk: "Дізнайтеся про багатомовну домашню сторінку вашого Nuxt-додатка, що працює на Intlayer.",
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Оголошення вашого контенту можуть бути визначені будь-де у вашому застосунку, за умови, що вони знаходяться в директорії `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації див. [документацію щодо оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Отримуйте доступ до ваших словників контенту в усьому Nuxt-застосунку за допомогою композиції `useIntlayer`:

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

#### Доступ до контенту в Intlayer

Intlayer пропонує різні API для доступу до вашого контенту:

- **Компонентний синтаксис** (рекомендується):
  Використовуйте синтаксис `<myContent />` або `<Component :is="myContent" />` для рендерингу контенту як вузла Intlayer. Це безшовно інтегрується з [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

- **Строковий синтаксис**:
  Використовуйте `{{ myContent }}` щоб вивести контент як простий текст, без підтримки Visual Editor.

- **Синтаксис сирого HTML**:
  Використовуйте `<div v-html="myContent" />` щоб рендерити контент як сирий HTML, без підтримки Visual Editor.

- **Синтаксис деструктуризації**:
  Composable `useIntlayer` повертає Proxy з контентом. Цей Proxy можна деструктурувати, щоб отримати доступ до контенту, зберігаючи реактивність.
- Використовуйте `const content = useIntlayer("myContent");` і `{{ content.myContent }}` / `<content.myContent />`.
- Або використовуйте `const { myContent } = useIntlayer("myContent");` і `{{ myContent}}` / `<myContent/>`, щоб деструктурувати контент.

### (Опціонально) Крок 6: Змінити мову вашого контенту

Щоб змінити мову вашого контенту, ви можете використовувати функцію `setLocale`, яку надає composable `useLocale`. Ця функція дозволяє встановити локаль додатка та відповідно оновити контент.

Створіть компонент для перемикання мов, використовуючи `NuxtLink`. **Використання посилань замість кнопок для перемикання локалі — найкраща практика для SEO та виявлення сторінок**, оскільки це дозволяє пошуковим системам обходити та індексувати всі локалізовані версії ваших сторінок:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt auto-imports useRoute
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

> Використання `NuxtLink` з правильними атрибутами `href` (через `getLocalizedUrl`) гарантує, що пошукові системи зможуть виявити всі мовні варіанти ваших сторінок. Це переважніше за перемикання локалі, реалізоване лише на JavaScript, яке може не відстежуватися пошуковими роботами.

Потім налаштуйте ваш `app.vue` для використання layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (Необов'язково) Крок 6b: Створіть layout з навігацією

Nuxt layouts дозволяють визначити спільну структуру для ваших сторінок. Створіть default layout, який включає locale switcher та навігацію:

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

    <Links href="/">Головна</Links>
    <Links href="/about">Про нас</Links>
  </div>
</template>
```

Компонент `Links` (показаний нижче) забезпечує автоматичну локалізацію внутрішніх навігаційних посилань.

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого застосунку

Nuxt автоматично налаштовує локалізовану маршрутизацію при використанні модуля `nuxt-intlayer`. Це створює маршрути для кожної мови автоматично на основі структури каталогу pages.

Приклад:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Щоб створити локалізовані сторінки, просто створіть ваші Vue-файли в директорії `pages/`. Ось два приклади сторінок:

**Головна сторінка (`pages/index.vue`):**

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

**Сторінка About (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Використовуйте .raw для доступу до примітивного рядка
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Використовуйте .raw для доступу до примітивного рядка
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Примітка: `useHead` автоматично імпортується в Nuxt. Ви можете отримувати значення контенту, використовуючи або `.value` (реактивно), або `.raw` (примітивний рядок), залежно від ваших потреб.

Модуль `nuxt-intlayer` автоматично:

- Визначає переважну локаль користувача
- Керує переключенням локалі через URL
- Встановлює відповідний атрибут `<html lang="">`
- Керує cookie локалі
- Перенаправляє користувачів на відповідний локалізований URL

### (Необов'язковий) Крок 8: Створення локалізованого компонента посилань

Щоб гарантувати, що навігація вашого застосунку відповідає поточній локалі, ви можете створити власний компонент `Links`. Цей компонент автоматично додає префікс із поточною мовою до внутрішніх URL-адрес, що важливо для **SEO та видимості сторінок у пошукових системах**.

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

// Обчислення фінального шляху
const finalPath = computed(() => {
  // 1. Перевірте, чи є посилання зовнішнім
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Якщо зовнішній — повернути як є (NuxtLink генерує тег <a>)
  if (isExternal) return props.href;

  // 3. Якщо внутрішній — локалізувати URL
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

Потім використайте цей компонент у всьому вашому застосунку:

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

    <Links href="/">Головна</Links>
    <Links href="/about">Про нас</Links>
  </div>
</template>
```

> Використовуючи `NuxtLink` з локалізованими шляхами, ви гарантуєте, що:
>
> - Пошукові системи можуть обходити та індексувати всі мовні версії ваших сторінок
> - Користувачі можуть безпосередньо ділитися локалізованими URL-адресами
> - Історія браузера коректно працює з URL-адресами, що мають префікс локалі

### (За бажанням) Крок 9: Обробка метаданих та SEO

Nuxt надає потужні можливості для SEO через композицію `useHead` (автоматично імпортується). Ви можете використовувати Intlayer для обробки локалізованих метаданих, використовуючи доступники `.raw` або `.value` для отримання примітивного рядкового значення:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead автоматично імпортується в Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Використовуйте .raw для отримання примітивного рядкового значення
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Використовуйте .raw для отримання примітивного рядкового значення
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Альтернативно, ви можете використовувати функцію `import { getIntlayer } from "intlayer"` щоб отримати контент без реактивності Vue.

> **Доступ до значень контенту:**
>
> - Використовуйте `.raw` щоб отримати примітивне рядкове значення (нереактивне)
> - Використовуйте `.value` щоб отримати реактивне значення
> - Використовуйте синтаксис компонента `<content.key />` для підтримки Visual Editor

Створіть відповідну декларацію контенту:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      uk: "Про нас - Моя компанія",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      uk: "Дізнайтеся більше про нашу компанію та нашу місію",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y vuestra misión",
    }),
    title: t({
      uk: "Про нас",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
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
      uk: "Про нас - Моя компанія",
      uk: "Про нас - Моя компанія",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      uk: "Дізнайтеся більше про нашу компанію та нашу місію",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y vuestra misión",
    }),
    title: t({
      uk: "Про нас",
      en: "About Us",
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
      uk: "Про нас - Моя компанія",
      en: "About Us - My Company",
      uk: "Про нас - Моя компанія",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      uk: "Дізнайтеся більше про нашу компанію та її місію",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y vuestra misión",
    }),
    title: t({
      uk: "Про нас",
      en: "About Us",
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
        "uk": "Про нас - Моя компанія",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "uk": "Про нас - Моя компанія",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "uk": "Дізнайтеся більше про нашу компанію та нашу місію",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Про нас",
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту в ваш репозиторій Git.

Для цього ви можете додати такі інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігноруйте файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне розширення Intlayer для VS Code.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автозавершення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для швидкого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Далі

Щоб просунутися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
