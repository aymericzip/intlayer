---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: "Як перекласти ваш додаток на Vite та Svelte — посібник i18n 2026"
description: "Дізнайтеся, як зробити ваш вебсайт на Vite та Svelte багатомовним. Дотримуйтеся документації, щоб інтернаціоналізувати (i18n) і перекласти його."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.11
    date: 2025-11-19
    changes: Оновлено документацію
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Перекладіть ваш вебсайт на Vite та Svelte за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна open-source бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки багатомовності в сучасних вебдодатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані, маршрути й вміст.**
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Скористатися розширеними можливостями**, такими як динамічне визначення та перемикання локалі.

---

## Покрокове керівництво зі встановлення Intlayer у Vite та Svelte додаток

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Перегляньте [Application Template](https://github.com/aymericzip/intlayer-vite-svelte-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти для інтернаціоналізації: управління конфігурацією, переклади, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцію та [CLI-команди](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **svelte-intlayer**
  Пакет, який інтегрує Intlayer у Svelte-додаток. Він надає провайдери контексту та хуки для інтернаціоналізації у Svelte.

- **vite-intlayer**
  Містить плагін Vite для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для виявлення переважної мови користувача, керування cookies та обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проєкту

Створіть конфігураційний файл для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у конфігурацію Vite

Додайте плагін intlayer до вашої конфігурації.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// Документація конфігурації: https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у Vite-додатку. Додатково він надаєаліаси (aliases) для оптимізації продуктивності.

### Крок 4: Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт, світ",
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */ // Тип: Dictionary з intlayer
const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт, світ",
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */ // Тип: Dictionary з intlayer
const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт, світ",
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Привіт, світ",
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, за умови, що вони знаходяться в директорії `contentDir` (за замовчуванням `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для докладнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Відобразити вміст як простий контент -->
<h1>{$content.title}</h1>
<!-- Зробити вміст редагованим за допомогою редактора -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Відобразити вміст як рядок -->
<div aria-label={$content.title.value}></div>
```

### (Необов'язково) Крок 6: Змініть мову вашого вмісту

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Отримати інформацію про локаль та функцію setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Обробка зміни локалі
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Необов'язково) Крок 7: Відображення Markdown

Intlayer підтримує рендеринг вмісту в Markdown безпосередньо у вашому Svelte-застосунку. За замовчуванням Markdown розглядається як звичайний текст. Щоб перетворити Markdown у багате HTML-представлення, ви можете інтегрувати `@humanspeak/svelte-markdown` або інший Markdown-парсер.

> Щоб дізнатися, як оголосити markdown-контент за допомогою пакета `intlayer`, див. [документацію з markdown](https://github.com/aymericzip/intlayer/tree/main/docs/uk/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // відобразити вміст markdown як рядок
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Ви також можете отримати доступ до даних front-matter вашого markdown за допомогою властивості `content.markdownContent.metadata.xxx`.

### (Необов'язково) Крок 8: Налаштування intlayer editor / CMS

Щоб налаштувати intlayer editor, дотримуйтесь [документації intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Щоб налаштувати intlayer CMS, дотримуйтесь [документації intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

Паралельно, у вашому Svelte-застосунку потрібно додати наступний рядок у layout або в корені застосунку:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Необов'язково) Крок 7: Додайте локалізований Routing у ваш застосунок

Щоб обробляти локалізовану маршрутизацію в Svelte-застосунку, ви можете використовувати `svelte-spa-router` разом з `localeFlatMap` від Intlayer для генерації маршрутів для кожної локалі.

Спочатку встановіть `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Then, create a `Router.svelte` file to define your routes:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Update your `main.ts` to mount the `Router` component instead of `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Нарешті, оновіть ваш `App.svelte`, щоб приймати проп `locale` і використовувати його з `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... решта вашого додатка ... -->
</main>
```

#### Налаштування маршрутизації на стороні сервера (необов'язково)

Паралельно ви також можете використати `intlayerProxy` для додавання маршрутизації на стороні сервера до вашого застосунку. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie для локалі. Якщо локаль не вказана, плагін обере найвідповіднішу локаль на основі налаштувань мови браузера користувача. Якщо локаль не буде виявлена, плагін виконає перенаправлення на локаль за замовчуванням.

> Зауважте, що для використання `intlayerProxy` в production потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ - конфігурація Vite
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ - конфігурація Vite
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/ - конфігурація Vite
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Необов'язково) Крок 8: Зміна URL при зміні локалі

Щоб дозволити користувачам змінювати мову й відповідно оновлювати URL, ви можете створити компонент `LocaleSwitcher`. Цей компонент використовуватиме `getLocalizedUrl` з `intlayer` та `push` із `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Отримати інформацію про локаль
const { locale, availableLocales } = useLocale();

// Обробка зміни локалі
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Необов'язково) Крок 9: Інтернаціоналізовані посилання

Для SEO рекомендується додавати префікс локалі до ваших маршрутів (наприклад, `/about`, `/fr/about`).

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  export let href = "";
  const { locale } = useLocale();

  // Helper to prefix URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту до вашого Git-репозиторію.

Для цього можна додати наступні інструкції до файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автозаповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для швидкого створення й оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до документації [розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Розширені можливості

Щоб рухатися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент у зовнішню систему за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
