---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: Как перевести ваше приложение SvelteKit – руководство по i18n 2026
description: Узнайте, как сделать ваш сайт на SvelteKit многоязычным. Следуйте документации по интернационализации (i18n) и переводу с использованием серверного рендеринга (SSR).
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Добавить команду init
  - version: 7.1.10
    date: 2025-11-20
    changes: Инициализация истории
---

# Перевод вашего сайта на SvelteKit с помощью Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная, с открытым исходным кодом библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях. Она отлично интегрируется с возможностями серверного рендеринга (SSR) в **SvelteKit**.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов.
- **Использовать SSR SvelteKit** для SEO-оптимизированной интернационализации.

---

## Пошаговое руководство по настройке Intlayer в приложении SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Для начала создайте новый проект SvelteKit. Вот итоговая структура, которую мы создадим:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

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

- **intlayer**: Основной пакет для i18n.
- **svelte-intlayer**: Предоставляет провайдеры контекста и сторы для Svelte/SvelteKit.
- **vite-intlayer**: Плагин Vite для интеграции деклараций контента в процесс сборки.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации в корне вашего проекта:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // локали, поддерживаемые в проекте
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

Обновите ваш файл `vite.config.ts`, чтобы включить плагин Intlayer. Этот плагин отвечает за транспиляцию ваших файлов с контентом.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // порядок важен, Intlayer должен быть размещён перед SvelteKit
});
```

### Шаг 4: Объявите ваш контент

Создайте файлы объявления контента в любом месте внутри папки `src` (например, `src/lib/content` или рядом с вашими компонентами). Эти файлы определяют переводимый контент для вашего приложения с использованием функции `t()` для каждой локали.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit", // приветствие на английском
      fr: "Bienvenue sur SvelteKit", // приветствие на французском
      es: "Bienvenido a SvelteKit", // приветствие на испанском
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Шаг 5: Используйте Intlayer в ваших компонентах

Теперь вы можете использовать функцию `useIntlayer` в любом Svelte-компоненте. Она возвращает реактивный store, который автоматически обновляется при изменении локали. Функция автоматически учитывает текущую локаль (как во время SSR, так и при навигации на клиенте).

> **Примечание:** `useIntlayer` возвращает Svelte store, поэтому для доступа к его реактивному значению нужно использовать префикс `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Как перевести ваше приложение SvelteKit – руководство по i18n 2025
> description: Узнайте, как сделать ваш сайт на SvelteKit многоязычным. Следуйте документации по интернационализации (i18n) и переводу с использованием серверного рендеринга (SSR).
> keywords:

- Интернационализация
- Документация
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Инициализация истории

---

# Перевод вашего сайта на SvelteKit с помощью Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная, с открытым исходным кодом библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях. Она отлично интегрируется с возможностями серверного рендеринга (SSR) в **SvelteKit**.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов.
- **Использовать SSR SvelteKit** для SEO-оптимизированной интернационализации.

---

## Пошаговое руководство по настройке Intlayer в приложении SvelteKit

Для начала создайте новый проект SvelteKit. Вот итоговая структура, которую мы создадим:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

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

- **intlayer**: Основной пакет для i18n.
- **svelte-intlayer**: Предоставляет провайдеры контекста и сторы для Svelte/SvelteKit.
- **vite-intlayer**: Плагин Vite для интеграции деклараций контента в процесс сборки.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации в корне вашего проекта:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // локали, поддерживаемые в проекте
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

Обновите ваш файл `vite.config.ts`, чтобы включить плагин Intlayer. Этот плагин отвечает за транспиляцию ваших файлов с контентом.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // порядок важен, Intlayer должен быть размещён перед SvelteKit
});
```

### Шаг 4: Объявите ваш контент

Создайте файлы объявления контента в любом месте внутри папки `src` (например, `src/lib/content` или рядом с вашими компонентами). Эти файлы определяют переводимый контент для вашего приложения с использованием функции `t()` для каждой локали.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit", // приветствие на английском
      fr: "Bienvenue sur SvelteKit", // приветствие на французском
      es: "Bienvenido a SvelteKit", // приветствие на испанском
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Шаг 5: Используйте Intlayer в ваших компонентах

(например, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" соответствует ключу, определённому на Шаге 4
  const content = useIntlayer("hero-section");
</script>

<!-- Отобразить контент как простой текст -->
<h1>{$content.title}</h1>
<!-- Чтобы отобразить контент с возможностью редактирования через редактор -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Для отображения содержимого в виде строки -->
<div aria-label={$content.title.value}></div>
```

### (Необязательно) Шаг 6: Настройка маршрутизации

Следующие шаги показывают, как настроить маршрутизацию на основе локали в SvelteKit. Это позволяет вашим URL включать префикс локали (например, `/en/about`, `/fr/about`) для улучшения SEO и удобства пользователей.

```bash
.
└─── src
    ├── app.d.ts                  # Определение типа локали
    ├── hooks.server.ts           # Управление маршрутизацией локали
    ├── lib
    │   └── getLocale.ts          # Проверка локали из заголовка, cookies
    ├── params
    │   └── locale.ts             # Определение параметра локали
    └── routes
        ├── [[locale=locale]]     # Обертка в группу маршрутов для установки локали
        │   ├── +layout.svelte    # Локальный layout для маршрута
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Корневой layout для шрифтов и глобальных стилей
```

### Шаг 7: Обработка определения локали на стороне сервера (Hooks)

В SvelteKit сервер должен знать локаль пользователя, чтобы отобразить правильный контент во время SSR. Мы используем `hooks.server.ts` для определения локали из URL или cookies.

Создайте или измените файл `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Проверяем, начинается ли текущий путь с локали (например, /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Если локаль отсутствует в URL (например, пользователь заходит на "/"), перенаправляем его
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Временное перенаправление
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Затем создайте помощник для получения локали пользователя из события запроса:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Получить локаль пользователя из события запроса.
 * Эта функция используется в хуке `handle` в `src/hooks.server.ts`.
 *
 * Сначала пытается получить локаль из хранилища Intlayer (cookies или пользовательские заголовки).
 * Если локаль не найдена, используется fallback на браузерное определение через "Accept-Language".
 *
 * @param event - Событие запроса из SvelteKit
 * @returns Локаль пользователя
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Попытка получить локаль из хранилища Intlayer (Cookies или заголовки)
  const storedLocale = getLocaleFromStorage({
    // Доступ к cookies в SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Доступ к заголовкам в SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Запасной вариант: определение локали через браузерный заголовок "Accept-Language"
  const negotiatorHeaders: Record<string, string> = {};

  // Преобразование объекта Headers из SvelteKit в простой Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Проверка локали из заголовка `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Возврат локали по умолчанию, если совпадений не найдено
  return defaultLocale;
};
```

> `getLocaleFromStorage` будет проверять локаль из заголовка или cookie в зависимости от вашей конфигурации. Подробнее смотрите в разделе [Configuration](https://intlayer.org/doc/configuration).

> Функция `localeDetector` обрабатывает заголовок `Accept-Language` и возвращает наилучшее совпадение.

Если локаль не настроена, мы хотим возвращать ошибку 404. Чтобы упростить это, можно создать функцию `match` для проверки валидности локали:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Примечание:** Убедитесь, что в вашем файле `src/app.d.ts` определена локаль:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Для файла `+layout.svelte` мы можем удалить всё, чтобы оставить только статический контент, не связанный с i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Затем создайте новую страницу и layout в группе `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Используем универсальный тип Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Инициализация Intlayer с локалью из маршрута
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Использование словаря контента для layout
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Использование словаря контента для домашней страницы
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Необязательно) Шаг 8: Интернационализированные ссылки

Для SEO рекомендуется добавлять префикс локали к вашим маршрутам (например, `/en/about`, `/fr/about`). Этот компонент автоматически добавляет префикс текущей локали ко всем ссылкам.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Помощник для добавления префикса локали к URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Если вы используете `goto` из SvelteKit, вы можете применить ту же логику с `getLocalizedUrl` для перехода по локализованному URL:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Переходит на /en/about или /fr/about в зависимости от локали
```

### (Необязательно) Шаг 9: Переключатель языка

Чтобы позволить пользователям переключать языки, обновляйте URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Установит локаль в хранилище и вызовет onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Необязательно) Шаг 10: Добавить backend proxy

Чтобы добавить backend proxy в ваше приложение SvelteKit, вы можете использовать функцию `intlayerProxy`, предоставляемую плагином `vite-intlayer`. Этот плагин автоматически определит лучшую локаль для пользователя на основе URL, cookies и предпочтений языка браузера.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Необязательно) Шаг 11: Настройка редактора / CMS intlayer

Для настройки редактора intlayer необходимо следовать [документации редактора intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

Для настройки CMS intlayer необходимо следовать [документации CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

Чтобы иметь возможность визуализировать селектор редактора intlayer, вам нужно использовать синтаксис компонента в вашем контенте intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Отобразить контент как простой контент -->
  <h1>{$content.title}</h1>

  <!-- Отобразить контент как компонент (требуется редактором) -->
  <svelte:component this={$content.component} />
</div>
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer.

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

### Дальнейшие шаги

- **Визуальный редактор**: Интегрируйте [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), чтобы редактировать переводы напрямую из пользовательского интерфейса.
- **CMS**: Вынесите управление контентом с помощью [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
