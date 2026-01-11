---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: Як перекласти свій додаток SvelteKit – керівництво з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на SvelteKit багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його з використанням Server-Side Rendering (SSR).
keywords:
  - Інтернаціоналізація (i18n)
  - Документація
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
    changes: Додано команду init
  - version: 7.1.10
    date: 2025-11-20
    changes: Ініціалізація історії
---

# Перекладіть свій сайт на SvelteKit із Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна, відкрита бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки кількох мов у сучасних вебзастосунках. Вона безшовно працює з можливостями Server-Side Rendering (SSR) у **SvelteKit**.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами**, використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів.
- **Використовувати SSR SvelteKit** для SEO‑дружньої інтернаціоналізації.

---

## Покроковий посібник із налаштування Intlayer у застосунку SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Див. [Шаблон застосунку](https://github.com/aymericzip/intlayer-sveltekit-template) на GitHub.

Щоб почати, створіть новий проєкт SvelteKit. Ось кінцева структура, яку ми створимо:

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

- **intlayer**: Основний пакет i18n.
- **svelte-intlayer**: Надає провайдери контексту та stores для Svelte/SvelteKit.
- **vite-intlayer**: Плагін Vite для інтеграції декларацій контенту в процес збірки.

### Крок 2: Налаштування вашого проєкту

Створіть файл конфігурації в корені вашого проєкту:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Крок 3: Інтеграція Intlayer у вашу Vite конфігурацію

Оновіть ваш `vite.config.ts`, щоб додати плагін Intlayer. Цей плагін обробляє транспіляцію ваших файлів вмісту.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // порядок важливий: Intlayer має стояти перед SvelteKit
});
```

### Крок 4: Оголосіть ваш вміст

Створюйте файли декларацій контенту в будь-якому місці вашої папки `src` (наприклад, `src/lib/content` або поруч із компонентами). Ці файли визначають перекладний контент для вашого застосунку, використовуючи функцію `t()` для кожної локалі.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      uk: "Ласкаво просимо в SvelteKit",
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Крок 5: Використання Intlayer у ваших компонентах

Тепер ви можете використовувати функцію `useIntlayer` у будь-якому Svelte-компоненті. Вона повертає реактивний store, який автоматично оновлюється при зміні локалі. Функція автоматично враховує поточну локаль (як під час SSR, так і під час навігації на боці клієнта).

> **Примітка:** `useIntlayer` повертає Svelte-store, тому потрібно використовувати префікс `$` для доступу до його реактивного значення (наприклад, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" відповідає ключу, визначеному в кроці 4
  const content = useIntlayer("hero-section");
</script>

<!-- Відобразити контент у простому вигляді -->
<h1>{$content.title}</h1>
<!-- Щоб зробити контент редагованим за допомогою редактора -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Щоб відобразити вміст як рядок -->
<div aria-label={$content.title.value}></div>
```

### (Необов'язково) Крок 6: Налаштування маршрутизації

Нижче наведено кроки для налаштування маршрутизації на основі локалі в SvelteKit. Це дозволяє додавати префікс локалі до ваших URL (наприклад, `/en/about`, `/fr/about`) для кращого SEO та зручності користувача.

```bash
.
└─── src
    ├── app.d.ts                  # Визначте тип локалі
    ├── hooks.server.ts           # Керує маршрутизацією локалей
    ├── lib
    │   └── getLocale.ts          # Перевіряє локаль у заголовках та cookie
    ├── params
    │   └── locale.ts             # Визначає параметр локалі
    └── routes
        ├── [[locale=locale]]     # Обгорнути в групу маршрутів для встановлення локалі
        │   ├── +layout.svelte    # Локальний layout для маршруту
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Root layout для шрифтів і глобальних стилів
```

### Крок 7: Обробка визначення локалі на сервері (Hooks)

У SvelteKit сервер повинен знати локаль користувача, щоб відрендерити правильний вміст під час SSR. Ми використовуємо `hooks.server.ts` для виявлення локалі з URL або cookies.

Створіть або змініть `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Перевіряємо, чи поточний шлях вже починається з локалі (наприклад, /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Якщо в URL немає локалі (наприклад, користувач відвідує "/"), перенаправляємо його
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Тимчасове перенаправлення
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Потім створіть допоміжну функцію для отримання локалі користувача з події запиту:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Отримати локаль користувача з події запиту.
 * Ця функція використовується в хуку `handle` у `src/hooks.server.ts`.
 *
 * Спочатку вона намагається отримати локаль із сховища Intlayer (кукі або користувацькі заголовки).
 * Якщо локаль не знайдено, відбувається відкат до переговору браузера через заголовок `Accept-Language`.
 *
 * @param event - подія запиту від SvelteKit
 * @returns локаль користувача
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Спроба отримати локаль зі сховища Intlayer (кукі або заголовки)
  const storedLocale = getLocaleFromStorage({
    // Доступ до cookie SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Доступ до заголовків SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Відкат до погодження браузера по заголовку "Accept-Language"
  const negotiatorHeaders: Record<string, string> = {};

  // Перетворити об'єкт Headers SvelteKit у простий Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Перевірити локаль із заголовка `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Повернути локаль за замовчуванням, якщо відповідність не знайдено
  return defaultLocale;
};
```

> `getLocaleFromStorage` перевірятиме локаль у заголовку або cookie залежно від вашої конфігурації. Див. розділ [Configuration](https://intlayer.org/doc/configuration) для детальнішої інформації.

> Функція `localeDetector` обробляє заголовок `Accept-Language` і повертає найкраще співпадіння.

Якщо локаль не налаштована, ми хочемо повернути помилку 404. Щоб спростити це, ми можемо створити функцію `match`, яка перевіряє, чи є локаль валідною:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Примітка:** Переконайтеся, що у вашому `src/app.d.ts` міститься визначення локалі:
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

Для файлу `+layout.svelte` ми можемо видалити все, залишивши лише статичний вміст, не пов'язаний із i18n:

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

Потім створіть нову сторінку та layout у групі `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Використовуйте загальний тип Load
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

	// Ініціалізує Intlayer з локаллю з маршруту
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Використовує словник вмісту layout
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

	// Використовувати словник контенту для home
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

### (Необов'язково) Крок 8: Інтернаціоналізовані посилання

Для SEO рекомендується додавати префікс локалі до маршрутів (наприклад, `/en/about`, `/fr/about`). Цей компонент автоматично додає префікс поточної локалі до будь-якого посилання.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Допоміжна функція для додавання префікса локалі до URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Якщо ви використовуєте `goto` з SvelteKit, ви можете застосувати ту саму логіку з `getLocalizedUrl`, щоб перейти на локалізований URL:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Переходить на /en/about або /fr/about залежно від локалі
```

### (Необов'язково) Крок 9: Перемикач мови

Щоб дозволити користувачам переключати мову, оновіть URL.

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
          setLocale(localeEl); // Встановить локаль у store та викличе onLocaleChange
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

### (Необов'язково) Крок 10: Додати backend proxy

Щоб додати backend proxy до вашого застосунку SvelteKit, ви можете використати функцію `intlayerProxy`, що надається плагіном `vite-intlayer`. Цей плагін автоматично визначатиме найкращу локаль для користувача на основі URL, cookies та мовних налаштувань браузера.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Необов'язково) Крок 11: Налаштування редактора intlayer / CMS

Щоб налаштувати редактор intlayer, дотримуйтесь [документації редактора intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Щоб налаштувати CMS intlayer, дотримуйтесь [документації CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

Щоб мати змогу візуалізувати селектор редактора intlayer, потрібно використовувати синтаксис компонента у вашому контенті intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Відобразити вміст як простий контент -->
  <h1>{$content.title}</h1>

  <!-- Відобразити вміст як компонент (вимагається редактором) -->
  <svelte:component this={$content.component} />
</div>
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer.

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

### Далі

- **Visual Editor**: Інтегруйте [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), щоб редагувати переклади безпосередньо з UI.
- **CMS**: Виносьте керування вмістом назовні, використовуючи [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
