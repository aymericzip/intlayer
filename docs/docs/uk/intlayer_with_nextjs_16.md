---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 16 i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Next.js 16. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додати команду init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Додано згадку про `x-default` в об'єкті `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть ваш вебсайт на Next.js 16 за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще i18n-рішення для Next.js? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон програми](https://github.com/aymericzip/intlayer-next-16-template) на GitHub.

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

## Покроковий посібник із налаштування Intlayer у додатку Next.js

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Пакет, який інтегрує Intlayer з Next.js. Він надає провайдери контексту та хуки для інтернаціоналізації в Next.js. Крім того, він включає плагін Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також проксі для визначення пріоритетної локалі користувача, керування файлами cookie та обробки перенаправлення URL.

</Step>

<Step number={2} title="Налаштуйте свій проєкт">

Ось остаточна структура, яку ми створимо:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Локальний макет для провайдера Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Кореневий макет для стилів та глобальних провайдерів
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
├── package.json
└── tsconfig.json
```

> Якщо ви не хочете використовувати роутинг на основі локалі, intlayer можна використовувати як простий провайдер / хук. Дивіться [цей посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_no_locale_path.md) для отримання детальнішої інформації.

Створіть файл конфігурації для налаштування мов вашого додатка:

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
};

export default config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через проксі, назви файлів cookie, розташування та розширення декларацій вашого контенту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів можна знайти в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у конфігурацію Next.js">

Налаштуйте Next.js для використання Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметри конфігурації тут */
};

export default withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує створення файлів декларації контенту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Крім того, він надає аліаси для оптимізації продуктивності та забезпечує сумісність із серверними компонентами.

> Функція `withIntlayer()` повертає Promise. Вона дозволяє підготувати словники Intlayer перед початком збірки. Якщо ви хочете використовувати її з іншими плагінами, ви можете застосувати `await`. Приклад:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Якщо ви хочете використовувати її синхронно, ви можете скористатися функцією `withIntlayerSync()`. Приклад:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer автоматично визначає, чи використовує ваш проєкт **webpack** чи **Turbopack**, на основі прапорів командного рядка `--webpack`, `--turbo` або `--turbopack`, а також вашої поточної версії **Next.js**.
>
> Починаючи з `next>=16`, якщо ви використовуєте **Rspack**, ви повинні явно змусити Intlayer використовувати конфігурацію webpack, вимкнувши Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Визначте динамічні маршрути локалей">

Видаліть усе з `RootLayout` і замініть його наступним кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Ви все ще можете обгорнути дочірні елементи іншими провайдерами, наприклад `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

export default RootLayout;
```

> Залишення компонента `RootLayout` порожнім дозволяє встановити атрибути [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) та [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тегу `<html>`.

Щоб реалізувати динамічну маршрутизацію, вкажіть шлях для локалі, додавши новий макет у вашу директорію `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Сегмент шляху `[locale]` використовується для визначення локалі. Приклад: `/en-US/about` посилатиметься на `en-US`, а `/fr/about`, на `fr`.

> На цьому етапі ви зіткнетеся з помилкою: `Error: Missing <html> and <body> tags in the root layout.`. Це очікувано, оскільки файл `/app/page.tsx` більше не використовується і його можна видалити. Замість цього сегмент шляху `[locale]` активує сторінку `/app/[locale]/page.tsx`. Отже, сторінки будуть доступні за такими шляхами, як `/en`, `/fr`, `/es` у вашому браузері. Щоб встановити локаль за замовчуванням як кореневу сторінку, зверніться до налаштування `proxy` на кроці 7.

Потім реалізуйте функцію `generateStaticParams` у макеті вашого додатка.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Решта коду*/
};

export default LocaleLayout;
```

> `generateStaticParams` гарантує, що ваш додаток попередньо збирає необхідні сторінки для всіх локалей, зменшуючи обчислення під час виконання та покращуючи взаємодію з користувачем. Для отримання додаткової інформації зверніться до [документації Next.js щодо generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer працює з `export const dynamic = 'force-static';`, щоб забезпечити попередню збірку сторінок для всіх локалей.

</Step>

<Step number={5} title="Оголосіть свій контент">

Створюйте декларації контенту та керуйте ними для зберігання перекладів:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням, `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткової інформації зверніться до [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={6} title="Використовуйте контент у своєму коді">

Отримуйте доступ до ваших словників контенту по всьому додатку:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`** використовується для надання локалі клієнтським компонентам. Його можна розмістити в будь-якому батьківському компоненті, включаючи макет. Однак рекомендується розміщувати його в макеті, оскільки Next.js спільно використовує код макета між сторінками, що робить його ефективнішим. Використовуючи `IntlayerClientProvider` у макеті, ви уникаєте повторної ініціалізації для кожної сторінки, підвищуючи продуктивність і підтримуючи послідовний контекст локалізації у всьому додатку.
- **`IntlayerServerProvider`** використовується для надання локалі серверним дочірнім компонентам. Його не можна встановити в макеті.

  > Макет і сторінка не можуть ділити загальний серверний контекст, оскільки система серверного контексту базується на сховищі даних для кожного запиту (через механізм [кешування React](https://react.dev/reference/react/cache)), що призводить до повторного створення кожного "контексту" для різних сегментів додатка. Розміщення провайдера в спільному макеті порушить цю ізоляцію, запобігаючи правильному поширенню значень серверного контексту до ваших серверних компонентів.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Створіть відповідну декларацію контенту

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
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Створіть відповідну декларацію контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Якщо ви хочете використовувати свій контент у рядковому атрибуті, такому як `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, наприклад:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

> Якщо ваш застосунок уже існує, ви можете скористатися [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) у поєднанні з [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб перетворити тисячі компонентів за одну секунду.

</Step>

<Step number={7} title="Налаштуйте проксі для виявлення локалі" isOptional={true}>

Налаштуйте проксі для виявлення бажаної локалі користувача:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` використовується для виявлення бажаної локалі користувача та перенаправлення його на відповідний URL, як зазначено в [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Крім того, він дозволяє зберігати бажану локаль користувача у файлі cookie.

> Якщо вам потрібно об'єднати кілька проксі разом (наприклад, `intlayerProxy` з аутентифікацією або кастомними проксі), Intlayer тепер надає помічника під назвою `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Інтернаціоналізація ваших метаданих" isOptional={true}>

У випадку, якщо ви хочете інтернаціоналізувати свої метадані, наприклад заголовок вашої сторінки, ви можете скористатися функцією `generateMetadata`, наданою Next.js. Всередині ви можете отримати контент за допомогою функції `getIntlayer`, щоб перекласти ваші метадані.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * Генерує об'єкт, що містить усі URL-адреси для кожної локалі.
   *
   * Приклад:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Повертає
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

// ... Решта коду
````

> Зверніть увагу, що функція `getIntlayer`, імпортована з `next-intlayer`, повертає ваш контент, загорнутий в `IntlayerNode`, що дозволяє інтеграцію з візуальним редактором. На відміну від неї, функція `getIntlayer`, імпортована з `intlayer`, повертає ваш контент безпосередньо без додаткових властивостей.

Як варіант, ви можете скористатися функцією `getTranslation` для оголошення своїх метаданих. Однак для автоматизації перекладу метаданих та подальшої екстерналізації контенту рекомендується використовувати файли декларації контенту.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Решта коду
```

> Дізнайтеся більше про оптимізацію метаданих [в офіційній документації Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Інтернаціоналізація ваших sitemap.xml та robots.txt" isOptional={true}>

Щоб інтернаціоналізувати ваші `sitemap.xml` та `robots.txt`, ви можете скористатися функцією `getMultilingualUrls`, наданою Intlayer. Ця функція дозволяє генерувати багатомовні URL-адреси для вашої карти сайту.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

> Дізнайтеся більше про оптимізацію карти сайту [в офіційній документації Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Дізнайтеся більше про оптимізацію robots.txt [в офіційній документації Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Зміна мови вашого контенту" isOptional={true}>

Щоб змінити мову вашого контенту в Next.js, рекомендованим способом є використання компонента `Link` для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент `Link` дозволяє попередньо завантажувати сторінку, що допомагає уникнути повного перезавантаження сторінки.

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
            replace // Це гарантує, що кнопка "назад" у браузері перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль - наприклад, FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у її власній локалі - наприклад, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі - наприклад, Francés, якщо поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською - наприклад, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативним способом є використання функції `setLocale`, наданої хуком `useLocale`. Ця функція не дозволяє попередньо завантажувати сторінку. Дивіться [документацію хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md) для отримання детальнішої інформації.

> Ви також можете встановити функцію в опції `onLocaleChange`, щоб викликати кастомну функцію при зміні локалі.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Решта коду

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Переключити на французьку
  </button>
);
```

> Посилання на документацію:
>
> - [хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [хук `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [хук `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [хук `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [атрибут `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Створення локалізованого компонента Link" isOptional={true}>

Щоб навигація вашого додатка відповідала поточній локалі, ви можете створити кастомний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес. Наприклад, коли франкомовний користувач натискає на посилання на сторінку "Про нас", він перенаправляється на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та досвід користувача**: Локалізовані URL-адреси допомагають пошуковим системам правильно індексувати сторінки на певних мовах і надають користувачам контент на їхній улюбленій мові.
- **Послідовність**: Використовуючи локалізоване посилання у всьому додатку, ви гарантуєте, що навігація залишається в межах поточної локалі, запобігаючи несподіваним змінам мови.
- **Підтримка**: Централізація логіки локалізації в одному компоненті спрощує керування URL-адресами, роблячи ваш код легшим для підтримки та розширення в міру зростання додатка.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Допоміжна функція для перевірки, чи є дана URL-адреса зовнішньою.
 * Якщо URL-адреса починається з http:// або https://, вона вважається зовнішньою.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишається в контексті тієї ж локалі.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і вказано валідний href, отримуємо локалізований URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL-адреса зовнішньою. Зовнішні посилання залишаються без змін, оскільки вони не потребують локалізації.

- **Отримання поточної локалі**:  
  Хук `useLocale` надає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL-адреси**:  
  Для внутрішніх посилань (тобто не зовнішніх) використовується `getLocalizedUrl` для автоматичного додавання префікса поточної локалі до URL. Це означає, що якщо ваш користувач перебуває на французькій версії сайту, передача `/about` як `href` перетворить його на `/fr/about`.

- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованим URL, забезпечуючи відповідність навігації локалі.

Інтегруючи цей компонент `Link` у весь додаток, ви підтримуєте узгоджений та чутливий до мови інтерфейс користувача, а також отримуєте переваги від покращеного SEO та зручності використання.

</Step>

<Step number={12} title="Отримання поточної локалі в Server Actions" isOptional={true}>

Якщо вам потрібна активна локаль всередині Server Action (наприклад, для локалізації електронних листів або запуску логіки, залежної від локалі), викличте `getLocale` з `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Зробіть щось із локаллю
};
```

> Функція `getLocale` використовує каскадну стратегію для визначення локалі користувача:
>
> 1. Спочатку вона перевіряє заголовки запиту на наявність значення локалі, яке могло бути встановлено проксі.
> 2. Якщо локаль не знайдена в заголовках, вона шукає локаль, збережену у файлах cookie.
> 3. Якщо файли cookie не знайдені, вона намагається визначити улюблену мову користувача за налаштуваннями його браузера.
> 4. В останню чергу вона повертається до налаштованої в додатку локалі за замовчуванням.
>
> Це гарантує вибір найбільш підходящої локалі на основі доступного контексту.

</Step>

<Step number={13} title="Оптимізація розміру вашого бандла" isOptional={true}>

При використанні `next-intlayer` словники за замовчуванням включаються в бандл для кожної сторінки. Для оптимізації розміру бандла Intlayer надає додатковий плагін SWC, який інтелектуально замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включаються в бандли тільки для тих сторінок, які їх дійсно використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і почне використовувати плагін:

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

> Примітка: Ця оптимізація доступна тільки для Next.js 13 і вище.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки плагіни SWC все ще є експериментальними в Next.js. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію `importMode: 'dynamic'` або `importMode: 'fetch'` (у конфігурації `dictionary`), вона буде покладатися на Suspense, тому вам доведеться обгорнути ваші виклики `useIntlayer` в межу `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні вашого компонента Page / Layout.
> </Step>

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

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Витягування вмісту з компонентів у словники
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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
</Step>

</Steps>

### Відстеження змін словників у Turbopack

При використанні Turbopack як сервера розробки за допомогою команди `next dev` зміни в словниках за замовчуванням не будуть виявлятися автоматично.

Це обмеження виникає через те, що Turbopack не може запускати плагіни webpack паралельно для моніторингу змін у ваших файлах контенту. Щоб обійти це, вам потрібно буде використовувати команду `intlayer watch`, щоб одночасно запустити сервер розробки та спостерігач за збіркою Intlayer.

```json5 fileName="package.json"
{
  // ... Ваші існуючі конфігурації package.json
  "scripts": {
    // ... Ваші існуючі конфігурації скриптів
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Якщо ви використовуєте next-intlayer@<=6.x.x, вам потрібно залишити прапор `--turbopack`, щоб додаток Next.js 16 коректно працював із Turbopack. Ми рекомендуємо використовувати next-intlayer@>=7.x.x, щоб уникнути цього обмеження.

### Налаштування TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript і зробити вашу кодову базу надійнішою.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, створені Intlayer. Це дозволяє уникнути їх коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції у ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Більш детальну інформацію про те, як користуватися розширенням, можна знайти в [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Йдіть далі

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або екстерналізувати ваш контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
