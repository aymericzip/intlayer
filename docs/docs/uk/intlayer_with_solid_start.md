---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку SolidStart. Серверна маршрутизація локалей, hreflang, карта сайту та переклад за допомогою ШІ."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Перекладіть свій вебсайт SolidStart за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">

<iframe title="Найкраще рішення i18n для Vite та Solid? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

 <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо шаблону Intlayer Solid Start"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

Цей посібник охоплює застосунок SolidStart із **серверним рендерингом (SSR)**: виявлення локалі відбувається під час запиту, сторінки рендеряться на сервері відповідною мовою, а сигнали `<html lang>`, `hreflang` та карти сайту, необхідні пошуковим системам, формуються на боці сервера.

## Чому Intlayer замість альтернатив?

У порівнянні з основними рішеннями, такими як `@solid-primitives/i18n` або `i18next`, Intlayer є рішенням зі вбудованими оптимізаціями, такими як:

<AccordionGroup>
<Accordion header="Повне покриття Solid">

Intlayer оптимізовано для ідеальної роботи з Solid, пропонуючи **обмеження контенту на рівні компонентів**, **реактивні переклади** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати величезні файли JSON на свої сторінки, завантажуйте лише необхідний контент. Intlayer допомагає **зменшити розмір бандлу та сторінок до 50%**.

</Accordion>

<Accordion header="Зручність обслуговування">

Обмеження контенту вашого застосунку **спрощує обслуговування** для великомасштабних застосунків. Ви можете дублювати або видаляти окрему папку функціоналу без когнітивного навантаження, пов'язаного з перевіркою всієї кодової бази контенту. Крім того, Intlayer **повністю типізовано**, щоб забезпечити точність вашого контенту.

</Accordion>

<Accordion header="ШІ-агент">

Спільне розміщення контенту **зменшує контекст, необхідний** великим мовним моделям (LLM). Intlayer також постачається з набором інструментів, таких як **CLI** для перевірки відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити досвід розробки (DX) ще зручнішим для ШІ-агентів.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу у вашому CI/CD пайплайні за допомогою обраної LLM за вартістю вашого постачальника ШІ. Intlayer також пропонує **компілятор** для автоматизації вилучення контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) для допомоги у **перекладі у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення величезних файлів JSON до компонентів може призвести до проблем із продуктивністю та реактивністю. Intlayer оптимізує завантаження контенту під час збірки.

</Accordion>

<Accordion header="Масштабування з не-розробниками">

Більше ніж просто рішення i18n, Intlayer надає **[візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) із власною хостинговою платформою** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати багатомовним контентом у **реальному часі**, роблячи співпрацю з перекладачами, копірайтерами та іншими членами команди безперешкодною. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покроковий посібник із налаштування Intlayer у застосунку SolidStart

<Steps>

<Step number={1} title="Встановіть залежності">

Встановіть необхідні пакети за допомогою npm:

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

> Прапор `--interactive` є необов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладу, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  Пакет, який інтегрує Intlayer із застосунком Solid. Він надає провайдери контексту та хуки для інтернаціоналізації Solid.

- **vite-intlayer**

  Включає плагін Vite для інтеграції Intlayer із [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також обробник маршрутизації локалей, який виявляє бажану локаль користувача, керує cookie та обробляє перенаправлення URL.

> `vite-intlayer` тут є задачею серверної сторони, а не лише етапу збірки: він надає обробник запитів, який запускає сервер Nitro в SolidStart. Збереження його в `dependencies` є безпечним рішенням за замовчуванням — ви можете перемістити його в `devDependencies` лише якщо ви деплоїте зібрану директорію `.output`, у яку Nitro вбудовує цей обробник.

</Step>

<Step number={2} title="Конфігурація вашого проєкту">

Створіть конфігураційний файл для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

При `prefix-no-default` локаль за замовчуванням обслуговується з URL-адрес без префікса:

```plaintext
/            /about          → Англійська (локаль за замовчуванням)
/fr          /fr/about       → Французька
/es          /es/about       → Іспанська
```

> За допомогою цього конфігураційного файлу ви можете налаштувати локалізовані URL-адреси, перенаправлення middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі тощо. Повний список доступних параметрів дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у вашу конфігурацію Vite">

Додайте плагін Intlayer до вашої конфігурації:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Плагін Vite `intlayer()` збирає ваші файли декларації контенту, відстежує їх у режимі розробки та визначає змінні середовища Intlayer усередині застосунку. Він також надає псевдоніми (aliases), які оптимізують продуктивність.

### Маршрутизація локалей поставляється разом із плагіном

SolidStart працює на [Nitro](https://nitro.build), і `intlayer()` реєструє свій обробник маршрутизації локалей безпосередньо в конвеєрі сервера Nitro (через опцію `routing.enableProxy`, за замовчуванням `true`). Більше нічого підключати не потрібно: на зібраному сервері кожен запит перевіряється до того, як він досягне маршрутизатора, і

- локаль зчитується з префікса URL, потім із cookie `INTLAYER_LOCALE`, потім із заголовка `Accept-Language`;
- URL-адреса без префікса перенаправляється на її локалізований аналог, якщо визначена локаль не є локаллю за замовчуванням (`/` → `/fr`);
- URL-адреса з надлишковим префіксом перенаправляється назад до канонічної форми (`/en/about` → `/about`);
- cookie локалі записується назад у відповідь.

</Step>

<Step number={4} title="Оголосіть свій контент">

Створюйте та керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Особливість SolidStart**: кожен файл `.ts` / `.tsx` у `src/routes` стає маршрутом, а файл `.content.ts` має експорт за замовчуванням, тому він підхоплюється як сторінка. Зберігайте декларації контенту ваших **сторінок** за межами директорії routes (`src/contents/` чудово підходить). Контент **компонентів** може залишатися поруч, оскільки `src/components` не сканується файловим маршрутизатором.

> Ваші декларації контенту можуть бути визначені в будь-якому місці застосунку, якщо вони включені до директорії `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Для отримання детальнішої інформації зверніться до [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Додайте локалізовану маршрутизацію">

Метою цього кроку є надати кожній мові власну URL-адресу, яку індексують пошукові системи.

Перемістіть свої сторінки під **необов'язковий динамічний сегмент**. У файловому маршрутизаторі SolidStart `[[locale]]` компілюється у шаблон шляху `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← макет, який перевіряє сегмент
  [[locale]]/
    index.tsx             → /        та /fr        та /es
    about.tsx             → /about   та /fr/about  та /es/about
  [...404].tsx            → загальний файл для всього іншого
```

Єдина задача файлу макета (layout) — обмежити сегмент налаштованою локаллю:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` розгортає `:locale?` у два шаблони — один із сегментом і один без нього — і пробує їх у порядку спадання специфічності. `matchFilters` — це те, що відрізняє працююче налаштування від заплутаного:

| URL         | Без `matchFilters`                               | З `matchFilters`                           |
| ----------- | ------------------------------------------------ | ------------------------------------------ |
| `/fr/about` | Французька сторінка "Про нас"                    | Французька сторінка "Про нас"              |
| `/about`    | Сторінка "Про нас" (статичний сегмент перемагає) | Сторінка "Про нас"                         |
| `/unknown`  | **Головна сторінка**, тихо, з `locale=unknown`   | Немає збігу → переходить до загального 404 |

> Віддавайте перевагу `[locale]` (обов'язковий) замість `[[locale]]`, якщо ви використовуєте режим маршрутизації `'prefix-all'`, і повністю вилучіть сегмент для `'no-prefix'` або `'search-params'`.

</Step>

<Step number={6} title="Передайте локаль у свій застосунок">

URL-адреса є єдиним джерелом правди для локалі: middleware вже перенаправив запит на локалізований шлях, тому зчитування шляху в кореневому макеті зберігає узгодженість серверного рендерингу та гідратації на боці клієнта і робить так, що кожна навігація на боці клієнта оновлює локаль автоматично.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Сервер рендерить <html> у entry-server.tsx; навігація на боці клієнта
  // між локалями повинна оновлювати атрибути самостійно.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` реагує на свій проп `locale`, тому передачі виклику аксесора `locale()` усередині JSX достатньо — Solid компілює його в гетер, і все дерево повторно рендериться новою мовою під час зміни URL.

</Step>

<Step number={7} title="Встановіть атрибути lang та dir елемента HTML на сервері">

Елемент `<html>` рендериться за допомогою `entry-server.tsx`, за межами `Router`. Замість цього зчитайте локаль із URL запиту:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Пошукові роботи тепер отримують правильну мову з першого байта:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Використовуйте Intlayer у своїх сторінках">

Отримуйте доступ до своїх словників контенту по всьому застосунку:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> У Solid `useIntlayer` повертає реактивний контент (наприклад, `content`). Ви можете звертатися до його властивостей напряму.

> Якщо ви хочете використовувати свій контент у строковому атрибуті (`string`), такому як `alt`, `title`, `href`, `aria-label` тощо, ви можете використовувати значення функції, наприклад:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Вузли контенту не обмежуються простими перекладами. Наприклад, лічильник з множиною:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` вибирає категорію за допомогою `Intl.PluralRules` для активної локалі, тому мови з більше ніж двома формами множини працюють без додаткового коду.

</Step>

<Step number={9} title="Створіть компонент локалізованого посилання">

Створіть власний компонент `Link`, який автоматично додає префікс поточної мови до внутрішніх URL-адрес:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Написання `href="/about"` один раз тепер створює `/about`, `/fr/about` або `/es/about` залежно від активної локалі — без ручного додавання префіксів ніде на ваших сторінках.

</Step>

<Step number={10} title="Створіть компонент перемикача локалей">

Рендеріть перемикач як **справжні посилання (anchors)** замість `<select>`: кожна мова поточної сторінки стає посиланням для індексації, яке можна відкрити в новій вкладці, чого не може забезпечити елемент керування лише на JavaScript.

`getPathWithoutLocale` видаляє сегмент локалі з поточного шляху, а `getLocalizedUrl` відновлює його для цільової локалі, тому посилання слідують вашому режиму маршрутизації без жорсткого кодування будь-чого. Навігація — це те, що змінює відрендерену локаль — маршрут `[[locale]]` отримує її з URL, — тоді як `setLocale` зберігає вибір у cookie `INTLAYER_LOCALE`, щоб наступний візит на URL-адресу без локалі отримував ту саму мову.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Канонічний шлях (без локалі) сторінки, яка відображається в даний момент
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Лише точний збіг, щоб посилання локалі за замовчуванням не позначалося
              // як активне на кожній сторінці
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Гарантує, що кнопка "назад" у браузері повертає на попередню сторінку
              replace
            >
              {/* Мова власною локаллю - наприклад, Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> У Solid `locale` з `useLocale` є **аксесором сигналу**. Використовуйте `locale()` (з дужками), щоб реактивно зчитувати його поточне значення.
>
> `getLocaleName(localeItem)` рендерить кожну мову її власною мовою — `English / Français / Español`. Передайте другий аргумент, щоб перекласти назви мовою, яка відображається в даний момент: `getLocaleName(localeItem, locale())` дає `English / French / Spanish` англійською, `anglais / français / espagnol` французькою.
>
> `<A>` вже встановлює `aria-current="page"` на посиланні, що відповідає поточному URL, тому для цього нічого додавати не потрібно. `replace` зчитується з відрендереного атрибута маршрутизатором: він замінює запис в історії замість додавання нового, тому кнопка "назад" у браузері повертає на сторінку, відвідану до перемикання, а не на ту саму сторінку попередньою мовою.
>
> `dir` та `hreflang` на кожному посиланні забезпечують правильне орієнтування назв мов із написанням справа наліво та повідомляють допоміжним технологіям і пошуковим роботам, на яку мову вказує кожне посилання.
>
> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Сформуйте посилання canonical та hreflang" isOptional={true}>

Аннотації `hreflang` повідомляють пошуковим системам, що `/about`, `/fr/about` та `/es/about` — це одна й та сама сторінка різними мовами. `getMultilingualUrls` отримує їх із канонічного шляху (без локалі), дотримуючись вашого режиму маршрутизації, тому нічого не закомпільовано жорстко:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** Абсолютний URL сторінки, що рендериться. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Відрендеріть це у заголовку документа (head), де доступний URL запиту:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … усередині <head>, поруч з іншими мета-тегами:
<AlternateLinks url={url} />;
```

`GET /fr/about` потім віддає:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Примітка щодо `@solidjs/meta`**: на момент написання, `<Title>` та `<Meta>` з `@solidjs/meta` застосовуються на боці клієнта після гідратації, але **не** виводяться у серверний `<head>` у SolidStart v2. Доки це не буде виправлено вище за течією, рендеріть теги, які пошукові роботи повинні бачити без JavaScript — `canonical`, `hreflang`, і за потреби `title` / `description` — безпосередньо в `entry-server.tsx`, як показано вище.

</Step>

<Step number={12} title="Обробіть незнайдені сторінки (404)" isOptional={true}>

Маршрут-заглушка (splat route) у корені `src/routes` перехоплює кожен шлях, який не збігся із сегментом локалі — включаючи недійсні префікси локалей, відхилені `matchFilters`. Оскільки локаль усе ще надходить з URL через кореневий макет, сторінка 404 відображається мовою відвідувача:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Запит             | Результат                                    |
| ----------------- | -------------------------------------------- |
| `/xx`             | `404` — `xx` не є налаштованою локаллю       |
| `/nonexistent`    | `404` локаллю за замовчуванням               |
| `/fr/nonexistent` | `404` французькою мовою (`Page introuvable`) |

</Step>

<Step number={13} title="Згенеруйте багатомовну карту сайту (sitemap)" isOptional={true}>

Генератор карти сайту Intlayer розгортає кожен шлях у один запис для кожної локалі та з'єднує альтернативи `xhtml:link` між ними, тому маршруту потрібно лише перелічити канонічні шляхи без локалі.

> На відміну от базових генераторів, які видають лише плоскі URL-адреси, Intlayer пов'язує двонаправлені посилання між кожним локалізованим варіантом кожної сторінки, що допомагає пошуковим системам пов'язувати локалізовані URL-адреси та подавати потрібну правильній аудиторії.

SolidStart перетворює файл, що експортує метод HTTP, у маршрут API і видаляє розширення `.ts` зі шляху — тому `src/routes/sitemap.xml.ts` обслуговується за адресою `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> Маршрути API не підтримують необов'язкові параметри, тому зберігайте цей файл у корені `src/routes`, за межами сегмента `[[locale]]`. Карта сайту вже містить кожну локаль.

Ви можете побудувати `robots.txt` таким самим чином за допомогою `getMultilingualUrls`, щоб записи `Disallow` покривали кожне локалізоване написання чутливого шляху:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Отримайте локаль у ваших серверних функціях" isOptional={true}>

Ви можете захотіти отримати доступ до поточної локалі зсередини серверної функції або маршруту API.

У налаштуванні на основі префіксів, такому як це, **URL-адреса є авторитетною**: `getLocaleFromPath` зчитує префікс з URL запиту. `getLocale` — це запасний варіант для запитів, які не несуть префікса локалі — він перевіряє cookie `INTLAYER_LOCALE`, потім заголовок `x-intlayer-locale`, а потім узгоджує `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Отримує cookie із запиту (за замовчуванням: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Отримує заголовок із запиту (за замовчуванням: 'x-intlayer-locale'),
      // повертаючись до узгодження Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Отримайте деякий контент поза компонентом за допомогою getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Не покладайтеся тут лише на `getLocale`: cookie локалі записується лише тоді, коли відвідувач активно змінює мову, тому перший візит на `/fr/...` буде вирішуватися до локалі за замовчуванням.

</Step>

<Step number={15} title="Вилучіть контент ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб спростити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) для перетворення ваших компонентів та вилучення контенту.

Щоб налаштувати його, ви можете додати секцію `compiler` у ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи повинен бути увімкнений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи повинні компоненти зберігатися після перетворення.
     *
     * - Якщо `true`, компілятор перезапише файл компонента на диску. Таким чином, перетворення буде постійним, і компілятор пропустить перетворення для наступного процесу. Таким чином компілятор може перетворити застосунок, а потім його можна буде видалити.
     *
     * - Якщо `false`, компілятор вставить виклик функції `useIntlayer()` у код лише у результатах збірки і залишить базову кодову базу недоторканою. Перетворення буде виконано лише в пам'яті.
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
 <Tab value='Extract command'>

Запустіть екстрактор, щоб перетворити ваші компоненти та вилучити контент

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

> Перемістіть згенеровані файли контенту ваших сторінок за межі `src/routes` після цього з причини, поясненої на кроці 5.

 </Tab>
 <Tab value='Babel compiler'>

> Починаючи з v9, `intlayerCompiler` включено до плагіна `intlayer`. Тому вам не потрібно додавати його вручну.

Оновіть ваш `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Додає плагін компілятора
  ],
});
```

```bash packageManager="npm"
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Або pnpm run dev
```

```bash packageManager="yarn"
yarn build # Або yarn dev
```

```bash packageManager="bun"
bun run build # Або bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Налаштуйте TypeScript">

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript та зробити вашу кодову базу міцнішою.

Переконайтеся, що ваша конфігурація TypeScript включає автозгенеровані типи:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... ваші існуючі конфігурації
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Включити автозгенеровані типи
  ],
}
```

Ключі словника та шляхи до контенту тепер перевіряються під час компіляції:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Перевірка вашого налаштування

Зберіть та запустіть сервер, а потім перевірте, чи ці запити поводяться належним чином:

```bash
npm run build
node .output/server/index.mjs
```

| Запит                                 | Очікувана відповідь                          |
| ------------------------------------- | -------------------------------------------- |
| `GET /`                               | `200` — Англійська мова                      |
| `GET /` з `Accept-Language: fr`       | `302` → `/fr`                                |
| `GET /` з cookie `INTLAYER_LOCALE=es` | `302` → `/es`                                |
| `GET /fr`                             | `200` — Французька мова, `<html lang="fr">`  |
| `GET /fr/about`                       | `200` — Французька сторінка "Про нас"        |
| `GET /en/about`                       | `302` → `/about` (канонічне перенаправлення) |
| `GET /xx`                             | `404`                                        |
| `GET /fr/nonexistent`                 | `404` французькою мовою                      |
| `GET /sitemap.xml`                    | `200` — багатомовна карта сайту XML          |

Рядки, які рендерять сторінку, поводяться ідентично під `vite dev`. Три рядки перенаправлення застосовуються лише до зібраного сервера, якщо ви не зареєструєте обробник як middleware самостійно — дивіться крок 3.

> Запускайте сервер розробки на Node (`vite dev`), а не на Bun (`bun --bun vite dev`): SSR у SolidStart наразі не працює під середовищем виконання Bun із помилкою `Expected a Response object, but received 'NodeResponse'`. Це не пов'язано з Intlayer — це відтворюється на звичайному шаблоні — і впливає лише на сервер розробки, а не на `vite build`.

---

## Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх закоммічування у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Розширення VS Code

Щоб покращити свій досвід розробки з Intlayer, ви можете встановити офіційне **Розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований (inline) перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

---

## Поглиблення

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) або винести свій контент назовні за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Посилання на документацію

- [Документація Intlayer](https://intlayer.org)
- [Документація SolidStart](https://start.solidjs.com)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Декларація контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Solid Start?">

- **`@solid-primitives/i18n`**: простий словник на основі сигналів із обмеженою підтримкою SSR.
- **`Intlayer`**: підтримка SSR та попереднього рендерингу, сегменти маршрутів, сигнали Solid, переклад AI та візуальний редактор.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру бандла Solid Start?">

Значно менше, ніж рішення на основі просторів імен, оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Компілятор часу збирання замінює виклики `useIntlayer` точними записами словника, а [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за локалями, зменшуючи бандл до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з @solid-primitives/i18n або i18next без переписування компонентів?">

Більшою мірою так. Скористайтеся [посібником з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну.

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання: сканує код під час кожної зміни, генерує словники та синхронізує їх із HMR.

Варто знати два обмеження перед увімкненням компілятора. Він працює за допомогою статичного аналізу, тому рядки, які існують лише під час виконання, такі як коди помилок API або поля CMS, залишаються недосяжними. І він повинен відрізняти текст для користувача від логіки додатка, як-от `className="active"` або код статусу, що вимагає кількох анотацій у великій кодовій базі. [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) уникає обох проблем, тримаючи вас у курсі.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Чи працює Intlayer із серверним рендерингом (SSR) у Solid Start?">

Так. Контент вирішується під час SSR, а крок 16 охоплює налаштування попереднього рендерингу для генерації статичного HTML для кожної локалі.

</Question>

<Question title="Чи призводить зміна мови до повторного рендерингу всього додатку?">

Ні. Контент побудований на сигналах Solid, тому зміна мови оновлює лише змінені текстові вузли DOM без перестворення дерева компонентів.

</Question>

<Question title="Як додати канонічні посилання та теги hreflang?">

У файлі карти сайту за допомогою `generateSitemap` або `getMultilingualUrls`, які створюють альтернативні теги `xhtml:link` для пошукових систем.

</Question>

<Question title="Як обробляти сторінки 404 у локалізованих маршрутах?">

Крок 14 описує це. `validatePrefix` перевіряє валідність сегмента мови в URL, завдяки чому невідомі шляхи на зразок `/xx/about` повертають статус 404.

</Question>

<Question title="Чи обов'язково додавати локаль до URL?">

Ні. Налаштування `routing.mode` приймає `"prefix-no-default"` (за замовчуванням), `"prefix-all"`, `"no-prefix"` та `"search-params"`.

</Question>

<Question title="Як отримати локаль у серверній функції?">

У серверних функціях Solid Start функція `getIntlayer` автоматично вирішує локаль із контексту запиту.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) чисел, дат і валют.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
