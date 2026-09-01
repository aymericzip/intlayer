---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Nuxt i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Nuxt. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Обновление LocaleSwitcher, SEO, метаданных"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Перевод вашего сайта на Nuxt и Vue с использованием Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как @nuxtjs/i18n или i18next, Intlayer — это решение со встроенными оптимизациями, такими как:

<AccordionGroup>
<Accordion header="Полное покрытие Nuxt">

Intlayer оптимизирован для идеальной работы с Nuxt, предлагая **многоязычную маршрутизацию**, **промежуточное программное обеспечение для определения локали**, **карту сайта** и все функции, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer — это больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по настройке Intlayer в приложении Nuxt

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Как перевести ваше приложение Nuxt и Vue с помощью Intlayer? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демонстрация CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-nuxt-4-template) на GitHub.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

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

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **vue-intlayer**
  Пакет, который интегрирует Intlayer с приложением Vue. Он содержит composables для Vue-компонентов.

- **nuxt-intlayer**
  Модуль Nuxt, который интегрирует Intlayer с приложениями Nuxt. Он обеспечивает автоматическую настройку, middleware для определения локали, управление cookie и перенаправление URL.

</Step>

<Step number={2} title="Конфигурация вашего проекта">

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Через этот конфигурационный файл вы можете настроить локализованные URL, перенаправление через middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в вашу конфигурацию Nuxt">

Добавьте модуль intlayer в вашу конфигурацию Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Ваша существующая конфигурация Nuxt
  modules: ["nuxt-intlayer"],
});
```

> Модуль `nuxt-intlayer` автоматически обрабатывает интеграцию Intlayer с Nuxt. Он настраивает построение деклараций контента, отслеживает файлы в режиме разработки, предоставляет middleware для определения локали и управляет локализованной маршрутизацией.

</Step>

<Step number={4} title="Объявите ваш контент">

Создайте и управляйте вашими декларациями контента для хранения переводов:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Ваши декларации контента могут быть определены в любом месте вашего приложения, при условии, что они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={5} title="Использование Intlayer в вашем коде">

Получайте доступ к вашим словарям контента по всему приложению Nuxt, используя композицию `useIntlayer`:

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

#### Доступ к контенту в Intlayer

Intlayer предлагает различные API для доступа к вашему контенту:

- **Синтаксис на основе компонентов** (рекомендуется):
  Используйте синтаксис `<myContent />` или `<Component :is="myContent" />` для рендеринга контента как узла Intlayer. Это обеспечивает бесшовную интеграцию с [Визуальным редактором](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) и [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

- **Синтаксис на основе строк**:
  Используйте `{{ myContent }}`, чтобы отобразить контент как простой текст, без поддержки Визуального редактора.

- **Синтаксис сырого HTML**:
  Используйте `<div v-html="myContent" />`, чтобы отобразить контент как сырой HTML, без поддержки Визуального редактора.

- **Синтаксис деструктуризации**:
  Композиция `useIntlayer` возвращает Proxy с контентом. Этот прокси можно деструктурировать для доступа к контенту, сохраняя реактивность.
  - Используйте `const content = useIntlayer("myContent");` и `{{ content.myContent }}` / `<content.myContent />`.
  - Или используйте `const { myContent } = useIntlayer("myContent");` и `{{ myContent}}` / `<myContent/>` для деструктуризации контента.

</Step>

<Step number={6} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую композаблом `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответственно.

Создайте компонент для переключения между языками с помощью `NuxtLink`. **Использование ссылок вместо кнопок для переключения локали, это лучшая практика для SEO и обнаруживаемости страниц**, так как это позволяет поисковым системам сканировать и индексировать все локализованные версии ваших страниц:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt автоматически импортирует useRoute
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

> Использование `NuxtLink` с правильными атрибутами `href` (через `getLocalizedUrl`) гарантирует, что поисковые системы смогут обнаружить все языковые варианты ваших страниц. Это предпочтительнее, чем переключение локали только с помощью JavaScript, которое поисковые роботы могут не распознать.

Затем настройте ваш `app.vue` для использования layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Добавьте локализованный роутинг в ваше приложение" isOptional={true}>

Nuxt автоматически обрабатывает локализованный роутинг при использовании модуля `nuxt-intlayer`. Это создает маршруты для каждого языка автоматически на основе структуры вашего каталога страниц.

Пример:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Чтобы создать локализованные страницы, просто создайте ваши Vue-файлы в директории `pages/`. Вот два примера страниц:

**Главная страница (`pages/index.vue`):**

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

**Страница "О нас" (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Используйте .raw для доступа к примитивной строке
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Используйте .raw для доступа к примитивной строке
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Примечание: `useHead` автоматически импортируется в Nuxt. Вы можете получать доступ к значениям контента, используя либо `.value` (реактивный), либо `.raw` (примитивная строка), в зависимости от ваших потребностей.

Модуль `nuxt-intlayer` автоматически:

- Определяет предпочитаемую локаль пользователя
- Обрабатывает переключение локали через URL
- Устанавливает соответствующий атрибут `<html lang="">`
- Управляет куки локали
- Перенаправляет пользователей на соответствующий локализованный URL

</Step>

<Step number={8} title="Создание локализованного компонента ссылок" isOptional={true}>

Чтобы навигация вашего приложения учитывала текущую локаль, вы можете создать пользовательский компонент `Links`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL, что важно для **SEO и обнаруживаемости страниц**.

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

// Вычисляем итоговый путь
const finalPath = computed(() => {
  // 1. Проверяем, является ли ссылка внешней
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Если внешняя, возвращаем как есть (NuxtLink обрабатывает генерацию тега <a>)
  if (isExternal) return props.href;

  // 3. Если ссылка внутренняя, локализуем URL
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

Затем используйте этот компонент по всему вашему приложению:

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

    <Links href="/">Главная</Links>
    <Links href="/about">О нас</Links>
  </div>
</template>
```

> Используя `NuxtLink` с локализованными путями, вы обеспечиваете:
>
> - Поисковые системы могут сканировать и индексировать все языковые версии ваших страниц
> - Пользователи могут напрямую делиться локализованными URL
> - История браузера корректно работает с URL, содержащими префикс локали

</Step>

<Step number={9} title="Работа с метаданными и SEO" isOptional={true}>

Nuxt предоставляет отличные возможности для SEO через композицию `useHead` (автоматически импортируется). Вы можете использовать Intlayer для обработки локализованных метаданных, используя аксессоры `.raw` или `.value` для получения примитивного строкового значения:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead автоматически импортируется в Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Используйте .raw для доступа к примитивной строке
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Используйте .raw для доступа к примитивной строке
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> В качестве альтернативы, вы можете использовать функцию `import { getIntlayer } from "intlayer"`, чтобы получить контент без реактивности Vue.

> **Доступ к значениям контента:**
>
> - Используйте `.raw` для получения примитивного строкового значения (не реактивного)
> - Используйте `.value` для получения реактивного значения
> - Используйте синтаксис компонента `<content.key />` для поддержки Визуального Редактора

Создайте соответствующее объявление контента:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Узнайте больше о нашей компании и нашей миссии",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "О нас",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "ru": "О нас - Моя компания"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Узнайте больше о нашей компании и нашей миссии",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "О нас",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Создайте Layout с навигацией" isOptional={true}>

Layouts в Nuxt позволяют определить общую структуру для ваших страниц. Создайте layout по умолчанию, который включает переключатель локали и навигацию:

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

    <Links href="/">Главная</Links>
    <Links href="/about">О нас</Links>
  </div>
</template>
```

Компонент `Links` (показан ниже) гарантирует, что внутренние навигационные ссылки автоматически локализуются.

</Step>

</Steps>

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное расширение **Intlayer VS Code Extension**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Продвинуться дальше

Чтобы продвинуться дальше, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент, используя [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Nuxt?">

Два реалистичных варианта:

- **`@nuxtjs/i18n`**: устоявшийся модуль, построенный на `vue-i18n`, с файлами локалей, загружаемыми для каждой страницы, и большой поверхностью конфигурации.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный во время сборки, полностью типизированный, с маршрутизацией с учётом локали, ИИ-переводом, визуальным редактором и CMS.

Разница - в том, где живёт контент. `@nuxtjs/i18n` централизует его в файлах `locales/*.json`, тогда как Intlayer со-размещает его с компонентом, который его отображает, поэтому страница поставляет только те записи, которые использует, а папку функции можно переместить или удалить целиком. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего Nuxt?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md).

</Question>

<Question title="Могу ли я мигрировать с `@nuxtjs/i18n` или `vue-i18n`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_nuxtjs_i18n_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `vue-i18n`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов - нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Работает ли Intlayer с серверным рендерингом и статической генерацией Nuxt?">

Да. Контент разрешается во время SSR и во время `nuxt generate`, поэтому предварительно отрендеренные страницы содержат переведённую разметку, а не загружают каталог на клиенте. Модуль `nuxt-intlayer` подключает провайдер и определение локали за вас.

</Question>

<Question title="Должен ли я помещать локаль в URL?">

Нет. `routing.mode` принимает `"prefix-no-default"` (по умолчанию, `/about` и `/fr/about`), `"prefix-all"`, `"no-prefix"` и `"search-params"`, а `routing.domains` сопоставляет каждую локаль с её собственным доменом. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как обрабатывать SEO-метаданные и теги hreflang в Nuxt?">

Шаг 9 этого руководства охватывает это. Локализованные метаданные `useHead` берутся из ваших словарей, а `getMultilingualUrls` строит альтернативы `hreflang` для каждой объявленной локали, включая `x-default`, что также питает локализованную карту сайта.

</Question>

<Question title="Как создать переключатель локали, который сохраняет текущую страницу?">

Используйте `useLocale` для активной и доступных локалей и локализованный компонент ссылки из шага 8, чтобы навигация оставалась на текущем языке. `getLocalizedUrl` переписывает текущий путь на целевую локаль, поэтому переключение языка оставляет читателя на том же маршруте.

</Question>

<Question title="Как автоматически перевести приложение Nuxt с помощью ИИ?">

Запустите `npx intlayer fill`. Недостающие переводы заполняются с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст в шаблонах Vue?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
