---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Nuxt i18n - Полное руководство по переводу Nuxt
description: Лучшее решение для размера бандла, SEO, производительности & поддерживаемости. Сделайте Nuxt and Vue сайт многоязычным в 2026, перевод LLM, Agent Skills & MCP.
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

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[навыки агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

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
bun x intlayer init
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

> Ваши декларации контента могут быть определены в любом месте вашего приложения, при условии, что они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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

</Steps>

### (Необязательно) Шаг 6b: Создайте Layout с навигацией

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
