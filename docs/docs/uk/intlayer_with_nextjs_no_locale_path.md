---
createdAt: 2026-01-10
updatedAt: 2026-05-31
title: "Next.js 16 i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Next.js 16. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Початковий випуск"
---

# Перекладіть ваш сайт Next.js 16 (без [locale] у шляху сторінки) за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще i18n-рішення для Next.js? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `next-intl` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка Next.js">

Intlayer оптимізовано для роботи з **компонентами сервера** для ефективного відтворення та повністю сумісно з [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Він не блокує статичний рендеринг і пропонує проміжне програмне забезпечення, а також усі функції, необхідні для інтернаціоналізації масштабування (i18n).

> Intlayer сумісний із Next.js 12, 13, 14, 15 і 16. Якщо ви використовуєте маршрутизатор сторінок Next.js, ви можете переглянути цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Локальна маршрутизація корисна для SEO, розміру пакета та продуктивності. Якщо він вам не потрібен, ви можете звернутися до цього [посібника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Щодо Next.js 12, 13, 14 і 15 із маршрутизатором програм див. цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

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

## Покроковий посібник зі встановлення Intlayer у застосунку Next.js

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun x intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

Пакет, який інтегрує Intlayer з Next.js. Він надає провайдери контексту та хуки для інтернаціоналізації в Next.js. Крім того, він включає плагін для Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також proxy для визначення переважної локалі користувача, керування cookie та обробки перенаправлень URL.

</Step>

<Step number={2} title="Налаштуйте ваш проєкт">

Ось фінальна структура, яку ми створимо:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Якщо ви не хочете маршрутизацію за локалями, intlayer можна використовувати як простий provider / hook. Дивіться [цей посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_no_locale_path.md) для детальнішої інформації.

Створіть конфігураційний файл для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  routing: {
    mode: "search-params", // або `no-prefix` - Корисно для виявлення в middleware
  },
};

export default config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через проксі, назви cookie, розташування та розширення декларацій вашого контенту, відключити логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у конфігурацію Next.js">

Налаштуйте ваш Next.js для використання Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* опції конфігурації тут */
};

export default withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує побудову файлів декларацій вмісту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Додатково він надає aliases для оптимізації продуктивності та забезпечує сумісність із server components.
>
> Функція `withIntlayer()` повертає Promise. Вона дозволяє підготувати словники Intlayer перед початком збірки. Якщо ви хочете використовувати її разом з іншими плагінами, ви можете дочекатися її виконання за допомогою await. Приклад:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Якщо ви хочете використовувати його синхронно, ви можете використати функцію `withIntlayerSync()`. Приклад:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer автоматично визначає, чи ваш проєкт використовує **webpack** чи **Turbopack** на основі прапорів командного рядка `--webpack`, `--turbo`, або `--turbopack`, а також вашої поточної версії **Next.js**.
>
> Оскільки `next>=16`, якщо ви використовуєте **Rspack**, ви повинні явно змусити Intlayer використовувати конфігурацію webpack, вимкнувши Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Визначте динамічні маршрути локалей">

Видаліть усе з `RootLayout` і замініть на наступний код:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="Оголосіть свій контент">

Створюйте та керуйте деклараціями контенту для збереження перекладів:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      uk: "Назва мого проєкту",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      uk: "Відкрийте для себе нашу інноваційну платформу, розроблену для оптимізації робочого процесу та підвищення продуктивності.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      uk: ["інновації", "продуктивність", "робочий процес", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      uk: ["інновації", "продуктивність", "робочий процес", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Назва мого проєкту",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "uk": "Відкрийте для себе нашу інноваційну платформу, створену для оптимізації вашого робочого процесу та підвищення продуктивності.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть з редагування",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "uk": "Почніть з редагування",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, як тільки вони будуть додані до директорії `contentDir` (за замовчуванням `./src`). І вони повинні відповідати розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для докладнішої інформації див. [документацію щодо декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={6} title="Використання вмісту у вашому коді">

Отримуйте доступ до ваших словників вмісту по всьому додатку:

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** використовується для надання локалі компонентам на стороні клієнта. Його можна розмістити в будь-якому батьківському компоненті, включно з layout. Однак рекомендовано розміщувати його в layout, оскільки Next.js спільно використовує код layout між сторінками, що робить це ефективнішим. Використовуючи `IntlayerClientProvider` у layout, ви уникаєте повторної ініціалізації для кожної сторінки, покращуєте продуктивність і підтримуєте послідовний контекст локалізації в усьому застосунку.
- **`IntlayerServerProvider`** використовується для надання локалі дочірнім серверним компонентам. Його не можна встановлювати в layout.

  > Layout і сторінка не можуть ділитись загальним server context, оскільки система server context базується на сховищі даних для кожного запиту (через механізм [React's cache](https://react.dev/reference/react/cache)), внаслідок чого кожен «context» створюється заново для різних сегментів застосунку. Розміщення провайдера в спільному layout порушить цю ізоляцію та перешкоджатиме правильній передачі значень server context вашим server компонентам.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Створити декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Створити декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Якщо ви хочете використовувати ваш контент у рядковому атрибуті, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, наприклад:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Налаштування проксі для визначення локалі" isOptional={true}>

Налаштуйте проксі для визначення преференованої локалі користувача:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Проксі `intlayerProxy` використовується для визначення преферованої локалі користувача та перенаправлення його на відповідну URL-адресу, як зазначено в [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Крім того, воно дозволяє зберігати преферовану локаль користувача в cookie.

> Якщо потрібно з'єднати кілька проксі разом (наприклад, `intlayerProxy` з авторизацією або власними проксі), Intlayer тепер надає допоміжну функцію `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Змініть мову вашого контенту" isOptional={true}>

Щоб змінити мову вашого контенту в Next.js, рекомендований спосіб, використовувати компонент Link для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент Link забезпечує prefetch сторінки, що допомагає уникнути повного перезавантаження сторінки.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Локаль, напр., FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі, напр., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова в поточній локалі, напр., Francés коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською, наприклад, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативний спосіб, використати функцію `setLocale`, яку надає хук `useLocale`. Ця функція не дозволяє виконувати prefetch сторінки. Детальніше див. документацію хуку [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md).

> Посилання на документацію:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Отримати поточну локаль у Server Actions" isOptional={true}>

Якщо вам потрібна активна локаль всередині Server Action (наприклад, для локалізації електронних листів або виконання логіки, що залежить від локалі), викличте `getLocale` з `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Виконайте необхідні дії з локаллю
};
```

> Функція `getLocale` використовує каскадну стратегію для визначення локалі користувача:
>
> 1. Спочатку вона перевіряє заголовки запиту на наявність значення локалі, яке могло бути встановлене проксі
> 2. Якщо локаль не знайдена в заголовках, вона шукає локаль, збережену в cookies
> 3. Якщо cookie не знайдено, вона намагається визначити бажану мову користувача з налаштувань браузера
> 4. Як останній варіант, вона повертається до локалі за замовчуванням, налаштованої в застосунку
>
> Це гарантує, що вибирається найбільш відповідна локаль на основі доступного контексту.

</Step>

<Step number={10} title="Оптимізуйте розмір бандла" isOptional={true}>

При використанні `next-intlayer` словники за замовчуванням включаються в бандл для кожної сторінки. Щоб оптимізувати розмір бандла, Intlayer надає необов'язковий SWC-плагін, який інтелектуально замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включатимуться лише в бандли сторінок, які їх фактично використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і використає плагін:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Примітка: Ця оптимізація доступна лише для Next.js 13 і новіших версій.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни в Next.js все ще є експериментальними. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію як `importMode: 'dynamic'` або `importMode: 'fetch'` (in the `dictionary` configuration), це залежатиме від Suspense, тож вам доведеться обгорнути виклики `useIntlayer` у межі `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні вашого компонента Page або Layout.
> </Step>

</Steps>

### Стеження за змінами словників у Turbopack

При використанні Turbopack як сервера розробки з командою `next dev`, зміни в словниках за замовчуванням не будуть виявлятися автоматично.

Це обмеження виникає через те, що Turbopack не може запускати плагіни webpack паралельно, щоб відстежувати зміни у ваших файлах контенту. Щоб обійти це, потрібно використовувати команду `intlayer watch`, щоб одночасно запускати сервер розробки та спостерігача складання Intlayer.

```json5 fileName="package.json"
{
  // ... Ваші існуючі конфігурації package.json
  "scripts": {
    // ... Ваші існуючі налаштування скриптів
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Якщо ви використовуєте next-intlayer@<=6.x.x, потрібно зберегти прапорець `--turbopack`, щоб додаток Next.js 16 працював правильно з Turbopack. Ми рекомендуємо використовувати next-intlayer@>=7.x.x, щоб уникнути цього обмеження.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зміцнити вашу codebase.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автозгенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого Git-репозиторію.

Для цього можна додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Розширені можливості

Щоб розширити можливості, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
