---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Перетворення існуючого додатка Next.js на багатомовний додаток (посібник i18n 2026)
description: Дізнайтеся, як зробити ваш існуючий додаток Next.js багатомовним за допомогою Intlayer Compiler. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти ваш додаток за допомогою ШІ.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Компілятор
  - ШІ
slugs:
  - doc
  - налаштування
  - nextjs
  - компілятор
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Перший випуск
---

# Як зробити багатомовним (i18n) існуючий додаток Next.js (посібник i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">

<iframe title="Найкраще рішення i18n для Next.js? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox Демо - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ознайомтеся з [Шаблоном додатку](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Зміст

<TOC/>

## Чому інтернаціоналізація існуючого додатку є складною?

Якщо ви коли-небудь намагалися додати кілька мов до програми, яка була створена лише для однієї, ви знаєте про всі труднощі. Це не просто "важко" - це виснажливо. Вам доводиться переглядати кожен файл, знаходити кожен рядок тексту та переміщувати їх у спеціальні файли словників (dictionaries).

Потім настає найризикованіша частина: заміна всього цього тексту на хуки коду без пошкодження макета чи логіки. Це робота, яка призупиняє розробку нових функцій на тижні й здається нескінченним рефакторингом.

## Що таке Intlayer Compiler?

**Intlayer Compiler** (Компілятор Intlayer) був створений, щоб обійти цю ручну роботу. Замість того, щоб змушувати вас вручну витягувати рядки, компілятор робить це за вас. Він сканує ваш код, знаходить текст та використовує ШІ, щоб генерувати словники у фоновому режимі.
Потім він змінює ваш вихідний код під час етапу збірки, щоб впровадити необхідні i18n хуки. По суті, ви продовжуєте писати свій додаток, ніби пишете однією мовою, а компілятор автоматично обробляє багатомовне перетворення на рівні ядра.

> Документація компілятора: https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md

### Обмеження

Оскільки компілятор виконує аналіз коду і його трансформацію (впровадження хуків та генерування словників) під час **часу збірки**, він може **уповільнити час збірки** вашого додатку.

Щоб обмежити цей вплив під час активної розробки (dev mode), ви можете налаштувати компілятор на роботу у режимі [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) або відключити його, коли в ньому немає потреби.

---

## Покрокова інструкція з налаштування Intlayer в додатку Next.js

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою бажаного менеджера пакетів:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, що забезпечує інструменти інтернаціоналізації для управління конфігурацією, перекладом, [декларацією контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцією та [CLI командами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Пакет, що інтегрує Intlayer з Next.js. Він надає контекст-провайдери та хуки для інтернаціоналізації Next.js. Крім того, він включає плагін Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також прошарок (middleware) для виявлення бажаної мови користувача, управління файлами cookie та обробки перенаправлення URL.

### Крок 2: Налаштування вашого проєкту

Створіть конфігураційний файл, щоб визначити мови вашого додатку:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.UKRAINIAN],
    defaultLocale: Locales.UKRAINIAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Можна встановити в 'build-only' для обмеження впливу в режимі dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Немає префікса компіляції, за замовчуванням "comp-"
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Це приклад простого додатку карти",
  },
};

export default config;
```

> **Примітка**: Переконайтеся, що ви встановили `OPEN_AI_API_KEY` у ваших змінних середовища.

> За допомогою цього конфігураційного файлу ви можете налаштувати локалізовані URL-адреси, проксі-перенаправлення, мапінг файлів cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer в консолі та багато іншого. Для ознайомлення з повним списком доступних параметрів, перегляньте [документацію до конфігурацій](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer до вашої конфігурації Next.js

Налаштуйте ваш Next.js для використання Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Тут можуть бути ваші інші налаштування Next.js */
};

export default withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer із Next.js. Він забезпечує побудову файлів словників і слідкує за ними у режимі dev. Він визначає змінні середовища Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Більше того, він надає псевдоніми для оптимізації продуктивності та повноцінно працює із Серверними Компонентами.

### Налаштування Babel

Компілятор Intlayer вимагає Babel для витягування та оптимізації вашого контенту. Оновіть ваш `babel.config.js` (або `babel.config.json`), щоб додати плагіни Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Крок 4: Виявлення мови на ваших сторінках

Очистіть контент `RootLayout` та замініть його прикладом нижче:

```tsx fileName="src/app/layout.tsx"
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

### Крок 5: Декларування вашого контенту (Автоматично)

З увімкненим компілятором вам **більше не потрібно** декларувати словники контенту вручну (наприклад, файли `.content.ts`).

Натомість, ви просто пишете ваш контент як захардкоджені рядки у вашому коді. Intlayer просканує вихідний код, згенерує переклади за допомогою налаштованого ШІ-провайдера і автоматично замінить ці рядки на локалізований контент під час етапу компіляції збірки. Все це повністю автоматизовано.

Просто пишіть ваші компоненти з захардкодженими рядками у вашій мові за замовчуванням і дозвольте Intlayer Compiler зробити все інше.

Приклад того, як виглядатиме ваша `page.tsx`:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Почніть з редагування цього!</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      uk: {
        getStartedByEditingThis: "Почніть з редагування цього!",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** використовується для розповсюдження мови до клієнтських компонентів-нащадків.
- Водночас **`IntlayerServerProvider`** використовується для забезпечення мови серверним компонентам-нащадкам.

### (Опціонально) Крок 7: Заповнення відсутніх перекладів

Intlayer надає CLI-інструмент, щоб допомогти вам заповнити відсутні переклади. Ви можете використовувати команду `intlayer` для перевірки та заповнення відсутніх перекладів із вашого коду.

```bash
npx intlayer test         # Перевірити наявність відсутніх перекладів
```

```bash
npx intlayer fill         # Заповнити відсутні переклади
```

### (Необов'язково) Крок 8: Middleware для проксі-маршрутизації мов

Якщо ви хочете автоматично перенаправляти користувачів на їхню улюблену мову, налаштуйте проксі middleware:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` використовується для виявлення обраної мови користувача та його перенаправлення на відповідну URL-адресу, як це визначено у [файлі конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Крім того, це дозволяє зберігати бажану мову користувача у cookie.

### (Необов'язково) Крок 9: Зміна мови контенту

Найбільш рекомендований спосіб зміни мови контенту в Next.js — використання компонента `Link` для направлення користувача на маршрут з відповідною мовою. Це використовує функцію prefetch фреймворку Next.js і дозволяє уникнути жорсткого перезавантаження сторінки.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* Мова - наприклад: UK */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови її власною мовою - наприклад: Українська */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови поточною обраною мовою - наприклад: Francés (якщо обрана іспанська) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською - наприклад: Ukrainian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативним варіантом є використання функції `setLocale`, яка надається хуком `useLocale`. Ця функція не підтримує prefetch сторінок. Більше деталей дивіться у [документації до хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md).

### (Необов'язково) Крок 10: Оптимізація розміру Bundle

При використанні `next-intlayer`, словники за замовчуванням включаються в bundle для кожної сторінки. Для оптимізації розміру bundle Intlayer надає опціональний SWC-плагін, який інтелектуально замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включаються лише в bundle тих сторінок, які їх дійсно використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і використовуватиме плагін:

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

> Примітка: Ця оптимізація доступна лише для Next.js 13 і вище.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни все ще експериментальні в Next.js. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановили опцію (у конфігурації словника) `importMode: 'dynamic'` або `importMode: 'fetch'`, вона залежатиме від Suspense, тому вам потрібно буде обгорнути виклики `useIntlayer` у межу `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні ваших компонентів Сторінки / Layout.

### Конфігурація TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб скористатися перевагами TypeScript і зробити вашу базу коду міцнішою.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що конфігурація TypeScript включає автоматично згенеровані типи.

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

Рекомендовано ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх завантаження до вашого Git-репозиторію.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Для покращення досвіду розробки з Intlayer ви можете встановити **офіційне розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії (Quick actions)** для легкого створення та оновлення перекладів.

Прочитайте [документацію до розширення VS Code Intlayer](https://intlayer.org/doc/vs-code-extension) для отримання детальних інструкцій щодо використання розширення.

### Йдемо далі

Для подальшого розвитку ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент назовні за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
