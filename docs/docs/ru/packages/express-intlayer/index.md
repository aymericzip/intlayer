---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация пакета | express-intlayer
description: Узнайте, как использовать пакет express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: JavaScript Пакет для интернационализации (i18n) приложения Express.js

**Intlayer** , это набор пакетов, специально разработанных для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `express-intlayer`** позволяет интернационализировать ваше приложение Express.js. Он предоставляет middleware для определения предпочтительного языка пользователя и возвращает соответствующий словарь для пользователя.

## Зачем интернационализировать ваш бэкенд?

Интернационализация вашего бэкенда необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

### Практические примеры использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень разочарования. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как тосты или модальные окна.

- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы можете предоставлять этот контент на нескольких языках. Это важно для таких платформ, как сайты электронной коммерции или системы управления контентом, которые должны отображать описания продуктов, статьи и другой контент на языке, предпочитаемом пользователем.

- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочтительном языке пользователя может повысить взаимодействие и удержание. Этот персонализированный подход делает уведомления более релевантными и действенными.

- **Другие виды коммуникации**: Любая форма коммуникации с бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что делает это ключевым шагом в масштабировании ваших услуг по всему миру.

## Почему стоит интегрировать Intlayer?

- **Среда с типобезопасностью**: Используйте TypeScript, чтобы гарантировать, что все ваши определения контента точны и не содержат ошибок.

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Настройка Intlayer

Intlayer предоставляет файл конфигурации для настройки вашего проекта. Разместите этот файл в корневой директории вашего проекта.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
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
};

module.exports = config;
```

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Пример использования

Настройте ваше приложение Express для использования `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
// Импорт библиотек
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      ru: "Пример возвращаемого контента на русском",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
// Импорт библиотек
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      ru: "Пример возвращаемого контента на русском",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
// Импорт библиотек
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Загрузка обработчика запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      ru: "Пример возвращаемого контента на русском",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем порт 3000`));
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для React приложений
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для Next.js приложений
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для Vite приложений

Он также бесшовно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить middleware для определения языка через заголовки или cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

## Функции, предоставляемые пакетом `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru-GB/packages/express-intlayer/t.md)
