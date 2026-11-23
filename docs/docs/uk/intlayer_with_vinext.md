---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Повний посібник з перекладу вашого застосунку Next.js на Vite"
description: "Налаштуйте Intlayer з vinext, API Next.js поверх Vite: маршрутизація за мовою через proxy.ts, Server і Client Components, локалізовані метадані, sitemap та розгортання на Cloudflare Workers."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Початкова історія"
author: aymericzip
---

# Перекладіть свій сайт на vinext за допомогою Intlayer

[vinext](https://github.com/cloudflare/vinext) заново реалізує API Next.js поверх Vite. Ваш каталог `app/`, імпорти `next/*` і `proxy.ts` продовжують працювати, але збірка виконується через Vite замість Turbopack або webpack.

Intlayer вбудовується в цю схему двома пакетами: `next-intlayer` для хуків, провайдерів і проксі, які ваші компоненти вже використовують у Next.js, та `vite-intlayer` для збірки (компіляція словників, watch і оптимізація бандла).

> Використовуєте Next.js з його власним тулчейном? Дотримуйтеся натомість [посібника з Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md).

- [Посібник з Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)

## Зміст

<TOC/>

## Чому Intlayer, а не альтернативи?

Порівняно з рішеннями на кшталт `next-intl` чи `i18next`, Intlayer має вбудовані оптимізації:

<AccordionGroup>
<Accordion header="Створено для API Next.js, на Vite">

Той самий код `next-intlayer` працює і в Next.js, і у vinext. Server Components отримують контент на сервері, Client Components читають його через провайдер, а маршрутизація за мовою виконується з вашого `proxy.ts`. Перехід між двома тулчейнами не торкається ваших компонентів.

</Accordion>
<Accordion header="Розмір бандла">

Замість завантаження величезних JSON-файлів на сторінки ви завантажуєте лише потрібний контент. Плагін Vite замінює кожен виклик `useIntlayer` записами, які компонент справді використовує, що **зменшує розмір бандла і сторінок до 50 %**.

</Accordion>
<Accordion header="Зручність супроводу">

Розділення контенту за компонентами **спрощує супровід** великих застосунків. Ви можете дублювати або видаляти теку функції, не переглядаючи всю кодову базу контенту, а Intlayer **повністю типізований**, щоб контент залишався коректним.

</Accordion>
<Accordion header="ШІ-агент">

Зберігання контенту поруч із компонентом **зменшує контекст**, потрібний LLM. Intlayer постачається з **CLI** для виявлення відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP-сервером](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)
- [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)

</Accordion>
<Accordion header="Автоматизація">

Перекладайте у своєму CI/CD-пайплайні за допомогою LLM на ваш вибір, за рахунок вашого ШІ-провайдера. Intlayer також пропонує **компілятор** для автоматичного витягування контенту та [вебплатформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) для **перекладу у фоновому режимі**.

- [Вебплатформа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

</Accordion>
<Accordion header="Масштабування разом з не-розробниками">

Intlayer надає **[візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) для самостійного хостингу** та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)** для керування багатомовним контентом у **реальному часі** разом із перекладачами та копірайтерами. Контент можна зберігати локально та/або віддалено.

- [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [Повноцінна CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Покроковий посібник із налаштування Intlayer у застосунку vinext

<Steps>
<Step number={1} title="Встановіть залежності">

Почніть із робочого проєкту vinext. Щоб створити його, виконайте `npm create vinext-app@latest`. Щоб перенести наявний застосунок Next.js, виконайте `npx vinext init`.

Потім встановіть Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Основний пакет з інструментами інтернаціоналізації: керування конфігурацією, переклад, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляція та [команди CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Надає провайдери, хуки та проксі для API Next.js. vinext спрямовує `next/navigation`, `next/headers` і `next/server` на власні реалізації, тому `next-intlayer` працює без змін.

- **vite-intlayer**

  Плагін Vite, який збирає ваші оголошення контенту, відстежує їх у режимі розробки та оптимізує словники в продакшн-бандлі. Він замінює плагін Next.js `withIntlayer()`, який vinext не запускає.

</Step>
<Step number={2} title="Налаштуйте проєкт">

Виберіть, чи має застосунок використовувати локалізовані шляхи URL (наприклад, `/en/about`, `/fr/about`), чи віддавати контент без сегмента мови в шляху (наприклад, `/about`, визначаючи мову за cookie, заголовками або параметрами запиту).

<Tabs group="routing-mode">
<Tab label="Зі шляхом мови" value="with-locale-path">

### Архітектура

Усі локалізовані сторінки вкладені в динамічний сегмент `[locale]`. Це рекомендовано для SEO та статичного рендерингу, бо кожна мова має власний URL:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Конфігурація

Створіть файл `intlayer.config.ts`, щоб оголосити підтримувані мови:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Без шляху мови" value="without-locale-path">

### Архітектура

У маршрутах немає сегмента `[locale]`. Усі сторінки розташовані безпосередньо в `src/app/`, а мова береться з cookie, заголовків або параметрів запиту. Це підходить для дашбордів і застосунків з автентифікацією:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Конфігурація

Встановіть `routing.mode` у значення `"search-params"` (наприклад, `/about?locale=fr`) або `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Цей файл також задає перенаправлення проксі, імена cookie, розташування та розширення ваших оголошень контенту, логи й інше. Повний перелік дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [Документація з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Step>
<Step number={3} title="Інтегруйте Intlayer у конфігурацію Vite">

Додайте плагін `intlayer()` поруч із `vinext()` у `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Плагін `intlayer()` збирає ваші словники до початку збірки, відстежує файли контенту в режимі розробки та налаштовує аліаси й оптимізації, які `next-intlayer` використовує в середовищах RSC, SSR і клієнта.

> `intlayer()` також постачається з middleware маршрутизації за мовою для dev-сервера Vite. У vinext цю роботу вже виконує `src/proxy.ts`, і в розробці, і в продакшн-рантаймі, тому опція `ignore` вимикає middleware Vite, щоб не маршрутизувати кожен запит двічі.

> Не додавайте `withIntlayer()` у `next.config.ts`. vinext читає `next.config.ts` для опцій на кшталт `redirects`, `rewrites` і `headers`, але не запускає плагіни webpack чи Turbopack.

Якщо ви розгортаєте на Cloudflare Workers, залиште плагін `cloudflare()`, створений командою `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Визначте динамічні маршрути мови">

<Tabs group="routing-mode">
<Tab label="Зі шляхом мови" value="with-locale-path">

Видаліть увесь вміст `RootLayout` і замініть його наведеним нижче кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Якщо залишити `RootLayout` порожнім, layout мови зможе задати атрибути [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) і [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Додайте layout у каталог `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Один `IntlayerProvider` охоплює обидві половини дерева: він передає мову в Server Components і монтує клієнтський провайдер, щоб Client Components отримували ту саму мову.

> Сегмент `[locale]` містить мову: `/en-US/about` розв'язується в `en-US`, `/fr/about` у `fr`. Попередній `src/app/page.tsx` більше не використовується і його можна видалити. Проксі (крок 7) віддає мову за замовчуванням у корені.

> `generateStaticParams` змушує vinext пререндерити кожну сторінку для кожної мови. vinext також застосовує `dynamicParams`, тому невідома мова повертає 404, якщо встановити `export const dynamicParams = false`.

</Tab>
<Tab label="Без шляху мови" value="without-locale-path">

Каталогу `[locale]` немає. Налаштуйте `src/app/layout.tsx` так, щоб він читав мову із запиту та обгортав застосунок у `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Оголосіть свій контент">

Створіть оголошення контенту для зберігання перекладів:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть із редагування",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "uk": "Почніть із редагування",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Оголошення контенту можуть розташовуватися будь-де в каталозі `contentDir` (за замовчуванням `./src`), якщо вони відповідають розширенню оголошень контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Докладніше дивіться в [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

- [Документація з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

</Step>
<Step number={6} title="Використовуйте контент у коді">

Отримуйте доступ до словників з будь-якого компонента:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` ізоморфний: умова експорту `react-server`, яку vinext застосовує до свого середовища RSC, дає Server Components серверну реалізацію, а Client Components отримують реалізацію на основі контексту. Той самий виклик працює з обох боків.

> Щоб використати контент в атрибуті типу `string`, наприклад `alt`, `title`, `href` або `aria-label`, прочитайте його значення:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Докладніше в [документації `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

- [Документація `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md)

> Якщо ваш застосунок уже існує, [компілятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) і [команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) перетворюють тисячі компонентів за секунду.

- [Компілятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)
- [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)

</Step>
<Step number={7} title="Налаштуйте проксі для визначення мови">

vinext запускає `proxy.ts` (і `middleware.ts`) так само, як Next.js 16, у розробці та в продакшені, зокрема на Cloudflare Workers. Експортуйте проксі Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` визначає бажану мову користувача, перенаправляє на відповідний URL згідно з [конфігурацією](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) і зберігає мову в cookie. Він також передає мову в `getLocale()` та серверні хуки, тому залиште його навіть з архітектурою без шляху мови.

- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

> Щоб об'єднати кілька проксі в ланцюжок (наприклад, `intlayerProxy` з автентифікацією), використовуйте `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Інтернаціоналізація метаданих" isOptional={true}>

vinext підтримує API Metadata. Використовуйте `generateMetadata` разом із `getIntlayer`, щоб перекладати метадані сторінок:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Мій застосунок vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      uk: "Застосунок Next.js, що працює на Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> Функція `getIntlayer`, імпортована з `intlayer`, повертає необроблені значення, готові для об'єкта метаданих. Версія з `next-intlayer` обгортає їх для візуального редактора.

</Step>
<Step number={9} title="Інтернаціоналізація sitemap.xml і robots.txt" isOptional={true}>

`sitemap.ts` і `robots.ts` працюють так само, як у Next.js. Використовуйте `getMultilingualUrls`, щоб перелічити кожен локалізований URL:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Змініть мову контенту" isOptional={true}>

Використовуйте `next/link` для переходу на локалізовану сторінку. vinext зберігає клієнтську навігацію та prefetching, тому перемикання відбувається без повного перезавантаження:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Посилання на документацію:
>
> - [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [Функція `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [Функція `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [Функція `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Створення компонента локалізованого посилання" isOptional={true}>

Власний компонент `Link` додає до внутрішніх URL префікс поточної мови, тож французький користувач, який натискає `/about`, потрапляє на `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Отримання поточної мови в Server Actions" isOptional={true}>

Викличте `getLocale` з `next-intlayer/server` усередині Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` читає мову, встановлену проксі в заголовках запиту, потім cookie мови, потім заголовок `Accept-Language` браузера, і зрештою повертається до мови за замовчуванням.

</Step>
<Step number={13} title="Розгортання на Cloudflare Workers" isOptional={true}>

Intlayer компілює словники в бандл під час збірки, тому під час виконання нічого не читає файлову систему, а застосунок працює у workerd як є. Зберіть і розгорніть через CLI vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Щоб розгорнути деінде (Vercel, Netlify, AWS, Node.js), додайте плагін Vite [Nitro](https://v3.nitro.build/) поруч із `vinext()` або встановіть `output: "standalone"` у `next.config.ts`. Налаштування Intlayer не змінюється.

</Step>
<Step number={14} title="Витягування контенту з компонентів" isOptional={true}>

В наявній кодовій базі Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) і [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб переносити захардкоджені рядки в оголошення контенту.

- [Компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)
- [Екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)

Увімкніть компілятор у `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Запустіть екстрактор, щоб перетворити компоненти та витягти контент:

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
 <Tab value='Vite compiler'>

Плагін Vite `intlayer()` містить компілятор. Щойно задано `compiler.enabled`, запускайте dev-сервер або збірку як зазвичай:

```bash packageManager="npm"
npm run build # Or npm run dev
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
</Step>

</Steps>

### Налаштуйте TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб типізувати ключі та значення контенту.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Додайте згенеровані типи до конфігурації TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Конфігурація Git

Ігноруйте файли, згенеровані Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Розширення VS Code

Встановіть офіційне **[розширення Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** для автодоповнення ключів, помилок про відсутні переклади, вбудованих попередніх переглядів і швидких дій. Дивіться [документацію розширення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [Документація розширення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Що далі

Додайте [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винесіть контент назовні за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

- [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

## Поширені запитання

<FAQ>

<Question title="Що таке vinext?">

vinext це open source плагін Vite, який підтримує Cloudflare і заново реалізує публічне API Next.js: App Router і Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers та модулі `next/*`. Ваш код Next.js виконується на Vite і нативно розгортається на Cloudflare Workers або на інших платформах через Nitro.

</Question>
<Question title="Що змінюється порівняно з налаштуванням Next.js?">

Лише інтеграція зі збіркою. У Next.js `withIntlayer()` обгортає `next.config.ts`. У vinext натомість плагін `intlayer()` з `vite-intlayer` додається до `vite.config.ts`. Провайдери, хуки, `proxy.ts`, метадані та код sitemap залишаються такими самими, тож для всього, що не описано на цій сторінці, можна дотримуватися [посібника з Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md).

- [Посібник з Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)

</Question>
<Question title="Чи потрібні конфігурація i18n Next.js або плагін SWC?">

Ні. Поле `i18n` у `next.config.ts` у vinext охоплює лише префікси мови Pages Router, а Intlayer виконує власну маршрутизацію через `proxy.ts`. Плагін `@intlayer/swc` також не потрібен: плагін Vite вже замінює виклики `useIntlayer`, тож кожна сторінка отримує лише ті словники, які використовує. Дивіться [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

- [Оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)

</Question>
<Question title="Чи потрібен `intlayer watch` у режимі розробки?">

Ні. Плагін Vite `intlayer()` запускає відстеження контенту разом із `vite dev`, а редагування контенту гаряче оновлює лише ті компоненти, що читають змінений словник.

</Question>
<Question title="Чи можна перейти з `next-intl` або `i18next`, не переписуючи компоненти?">

Так. Дотримуйтеся [посібника з міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md) або [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md), або збережіть поточне API за допомогою [адаптерів сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md), які надають API `next-intl`, `react-i18next` і `react-intl` поверх словників Intlayer.

- [Посібник з міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md)
- [Посібник з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md)
- [Адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Question>
<Question title="Чи потрібно вказувати мову в URL, як-от /fr/about?">

Ні. `routing.mode` приймає:

- `"prefix-no-default"` (за замовчуванням): `/about` для мови за замовчуванням, `/fr/about` для решти.
- `"prefix-all"`: кожна мова має префікс, `/en/about` і `/fr/about`.
- `"no-prefix"`: мови в шляху немає, її визначають за cookie або заголовком.
- `"search-params"`: `/about?locale=fr`.

Дивіться [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) та архітектуру без шляху мови на кроці 2.

- [Довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Question>
<Question title="Як автоматично перекласти застосунок за допомогою ШІ?">

Виконайте `npx intlayer fill`. CLI виявляє відсутні переклади й заповнює їх за допомогою LLM на ваш вибір, через вашого провайдера та ваш API-ключ. Дивіться [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію з CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

- [Команда fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)
- [Інтеграція з CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md)

</Question>
<Question title="Як виявити відсутні переклади перед випуском?">

Запускайте `npx intlayer test` у CI. Збірка падає, коли в оголошеній мові бракує контенту. [Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md) показує ті самі помилки під час введення, а [плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md) позначає захардкоджені рядки.

- [Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- [Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)

</Question>
<Question title="Чи Intlayer безкоштовний і з відкритим кодом?">

Так. Intlayer має відкритий код за ліцензією Apache 2.0, а бібліотека, CLI, візуальний редактор і компілятор безкоштовні, зокрема для комерційного використання. Розміщена CMS це необов'язковий платний сервіс, і її також можна [розгорнути самостійно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

- [Самостійний хостинг](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

</Question>

</FAQ>
