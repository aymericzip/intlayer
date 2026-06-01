---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: Vite + Svelte i18n - Повний посібник з перекладу Svelte
description: Найкраще рішення для розміру бандлу, SEO, продуктивності & підтримуваності. Зробіть Vite and Svelte застосунок багатомовним у 2026, переклад LLM, Agent Skills & MCP.
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
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.11
    date: 2025-11-19
    changes: "Оновлено документацію"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
---

# Перекладіть ваш вебсайт на Vite та Svelte за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `svelte-i18n` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>
<Accordion header="Повна підтримка Svelte">

Intlayer оптимізовано для ідеальної роботи зі Svelte, пропонуючи **визначення вмісту на рівні компонентів**, **реактивні переклади** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>
<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>
<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>
<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>
<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>
<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>
<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покрокове керівництво зі встановлення Intlayer у Vite та Svelte додаток

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Перегляньте [Application Template](https://github.com/aymericzip/intlayer-vite-svelte-template) на GitHub.

<Steps>

<Step number={1} title="Встановлення залежностей">

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
bun x intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти для інтернаціоналізації: управління конфігурацією, переклади, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцію та [CLI-команди](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **svelte-intlayer**
  Пакет, який інтегрує Intlayer у Svelte-додаток. Він надає провайдери контексту та хуки для інтернаціоналізації у Svelte.

- **vite-intlayer**
  Містить плагін Vite для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для виявлення переважної мови користувача, керування cookies та обробки перенаправлень URL.

</Step>

<Step number={2} title="Конфігурація вашого проєкту">

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

</Step>

<Step number={3} title="Інтеграція Intlayer у конфігурацію Vite">

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

</Step>

<Step number={4} title="Оголосіть свій контент">

Створюйте та керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, за умови, що вони знаходяться в директорії `contentDir` (за замовчуванням `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для докладнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={5} title="Використання Intlayer у вашому коді">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Відобразити вміст як простий контент -->
<h1>{$content.title}</h1>
<!-- Зробити вміст редагованим за допомогою редактора -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Відобразити вміст як рядок -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>

> Якщо ваш застосунок уже існує, ви можете скористатися [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) у поєднанні з [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб перетворити тисячі компонентів за одну секунду.
```

</Step>

<Step number={6} title="Змініть мову вашого вмісту" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={7} title="Відображення Markdown" isOptional={true}>

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

</Step>

<Step number={8} title="Налаштування intlayer editor / CMS" isOptional={true}>

Щоб налаштувати intlayer editor, дотримуйтесь [документації intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Щоб налаштувати intlayer CMS, дотримуйтесь [документації intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

</Step>

<Step number={7} title="Додайте локалізований Routing у ваш застосунок" isOptional={true}>

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
import { useIntlayer } from "svelte-intlayer";
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

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ - конфігурація Vite
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    svelte(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="Зміна URL при зміні локалі" isOptional={true}>

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

</Step>

<Step number={9} title="Інтернаціоналізовані посилання" isOptional={true}>

Для SEO рекомендується додавати префікс локалі до ваших маршрутів (наприклад, `/about`, `/fr/about`).

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

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

```bash
#  Ігнорувати файли, згенеровані Intlayer
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

</Step>

<Step number={1} title="Витягніть вміст ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб спростити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для перетворення ваших компонентів і витягування вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інша частина вашої конфігурації
  compiler: {
    /**
     * Вказує, чи повинен бути включений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи повинні компоненти зберігатися після перетворення. Таким чином, компілятор можна запустити лише один раз для перетворення програми, а потім видалити.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда витягування'>

Запустіть екстрактор для перетворення компонентів і витягування вмісту

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Компілятор Babel'>

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Додає плагін компілятора
  ],
});
```

```bash packageManager="npm"
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

### (Опційно) Sitemap і robots.txt (генерація під час збірки)

Intlayer надає `generateSitemap` і `getMultilingualUrls` - утиліти для формування багатомовних `sitemap.xml` і `robots.txt` для краулерів та автоматичного запису в `public/`. Зазвичай запускають невеликий Node-скрипт **перед** Vite (наприклад, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap враховує локалі й додає метадані для краулерів.

> Підтримується простір імен `xhtml:link` (hreflang). Замість плоского списку URL Intlayer пов’язує всі мовні версії сторінки в обидва боки (наприклад `/about`, `/fr/about` або `/about?lang=fr` залежно від режиму маршрутизації).

#### Robots.txt

Використовуйте `getMultilingualUrls`, щоб правила `Disallow` покривали всі локалізовані варіанти шляхів.

#### 1. Файл `generate-seo.mjs` у корені проєкту

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Пакет `intlayer` має бути встановлений. У продакшені задайте `SITE_URL` у середовищі (наприклад у CI).

> Для Node ESM краще `generate-seo.mjs`. Для `generate-seo.js` додайте `"type": "module"` у `package.json` або ввімкніть ESM інакше.

#### 2. Запуск скрипта перед Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Підлаштуйте команди для pnpm або yarn. Можна викликати скрипт із CI.

### Розширені можливості

Щоб рухатися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент у зовнішню систему за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

</Step>

</Steps>
