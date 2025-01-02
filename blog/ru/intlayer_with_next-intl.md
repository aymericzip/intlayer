# Next.js Интернационализация (i18n) с next-intl и Intlayer

Обе библиотеки next-intl и Intlayer являются открытыми фреймворками интернационализации (i18n), разработанными для приложений на Next.js. Они широко используются для управления переводами, локализацией и переключением языков в программных проектах.

Они делят три основных понятия:

1. **Декларация содержимого**: Метод определения переводимого содержимого вашего приложения.

   - Называется `content declaration file` в Intlayer, что может быть JSON, JS или TS файлом, экспортирующим структурированные данные. Смотрите [документацию Intlayer](https://intlayer.org/fr/doc/concept/content) для получения дополнительной информации.
   - Называется `messages` или `locale messages` в next-intl, обычно в JSON-файлах. Смотрите [документацию next-intl](https://github.com/amannn/next-intl) для получения дополнительной информации.

2. **Утилиты**: Инструменты для создания и интерпретации деклараций содержимого в приложении, такие как `useIntlayer()` или `useLocale()` для Intlayer и `useTranslations()` для next-intl.

3. **Плагины и промежуточные программные обеспечения**: Функции для управления перенаправлением URL, оптимизацией пакетов и многое другое — например, `intlayerMiddleware` для Intlayer или [`createMiddleware`](https://github.com/amannn/next-intl) для next-intl.

## Intlayer против next-intl: Ключевые различия

Для более глубокого анализа того, как Intlayer сравнивается с другими библиотеками i18n для Next.js (такими как next-intl), ознакомьтесь с [статьей в блоге next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/ru/i18next_vs_next-intl_vs_intlayer.md).

## Как генерировать сообщения next-intl с Intlayer

### Почему использовать Intlayer с next-intl?

Файлы декларации содержимого Intlayer, как правило, предлагают лучший опыт разработчика. Они более гибкие и удобные в обслуживании благодаря двум основным преимуществам:

1. **Гибкое размещение**: Вы можете разместить файл декларации содержимого Intlayer где угодно в файловой структуре вашего приложения. Это облегчает переименование или удаление компонентов без оставления неиспользуемых или висячих файлов сообщений.

   Пример структуры файлов:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Файл декларации содержимого
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Файл декларации содержимого
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Файл декларации содержимого
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Файл декларации содержимого
               └── index.jsx
   ```

2. **Централизованные переводы**: Intlayer хранит все переводы в одной декларации содержимого, что гарантирует отсутствие пропущенных переводов. В проектах на TypeScript пропущенные переводы автоматически помечаются как ошибки типов, обеспечивая немедленную обратную связь разработчикам.

### Установка

Чтобы использовать Intlayer и next-intl вместе, установите обе библиотеки:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Конфигурация Intlayer для экспорта сообщений next-intl

> **Примечание:** Экспорт сообщений из Intlayer для next-intl может ввести небольшие различия в структуре. Если возможно, сохраняйте поток только Intlayer или только next-intl для упрощения интеграции. Если вам действительно нужно сгенерировать сообщения next-intl из Intlayer, следуйте приведенным ниже шагам.

Создайте или обновите файл `intlayer.config.ts` (или `.mjs` / `.cjs`) в корне вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Используйте вывод next-intl
    nextIntlMessagesDir: "./intl/messages", // Куда сохранять сообщения next-intl
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Декларация содержимого

Ниже приведены примеры файлов декларации содержимого в нескольких форматах. Intlayer собирает их в файлы сообщений, которые может использовать next-intl.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Создание сообщений для next-intl

Чтобы создать файлы сообщений для next-intl, выполните:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Это создаст ресурсы в директории `./intl/messages` (как указано в `intlayer.config.*`). Ожидаемый вывод:

```bash
.
└── intl
    └── messages
       └── ru
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Каждый файл включает собранные сообщения из всех деклараций содержимого Intlayer. Ключи верхнего уровня обычно соответствуют вашим полям `content.key`.

### Использование next-intl в вашем приложении на Next.js

> Для получения более подробной информации смотрите официальные [документы по использованию next-intl](https://github.com/amannn/next-intl#readme).

1. **Создать промежуточное ПО (по желанию):**  
   Если вы хотите управлять автоматическим определением локали или перенаправлением, используйте [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) от next-intl.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Создать `layout.tsx` или `_app.tsx` для загрузки сообщений:**  
   Если вы используете App Router (Next.js 13+), создайте макет:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const dynamic = 'force-dynamic';

   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Если вы используете Pages Router (Next.js 12 или ниже), загружайте сообщения в `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Получение сообщений на стороне сервера (пример Pages Router):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Использование содержимого в компонентах Next.js

После загрузки сообщений в next-intl вы можете использовать их в своих компонентах с помощью хука `useTranslations()`:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' соответствует ключу содержимого в Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**Вот и всё!** Каждый раз, когда вы обновляете или добавляете новые файлы декларации содержимого Intlayer, повторно выполните команду `intlayer build`, чтобы сгенерировать ваши JSON-сообщения next-intl. next-intl автоматически подберет обновленное содержимое.