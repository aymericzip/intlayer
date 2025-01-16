# express-intlayer: JavaScript пакет для интернационализации (i18n) приложения на Express.js

**Intlayer** — это набор пакетов, разработанных специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `express-intlayer`** позволяет вам интернационализировать ваше приложение на Express.js. Он предоставляет промежуточное ПО для определения предпочитаемой локали пользователя и возвращает соответствующий словарь для пользователя.

## Почему интернационализировать ваш бэкенд?

Интернационализация вашего бэкенда имеет важное значение для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых групп.

### Практические примеры использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень раздражения. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в интерфейсных компонентах, таких как уведомления или модальные окна.

- **Получение многоязычного контента**: Для приложений, подтягивающих контент из базы данных, интернационализация обеспечивает возможность предоставления этого контента на нескольких языках. Это особенно важно для таких платформ, как сайты электронной торговли или системы управления контентом, которые должны отображать описания продуктов, статьи и другой контент на языке, предпочтительном для пользователя.

- **Отправка многоязычных электронных писем**: Будь то транзакционные электронные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочитаемом языке пользователя может улучшить взаимодействие и удержание. Этот персонализированный подход может сделать уведомления более актуальными и действенными.

- **Другие коммуникации**: Любая форма коммуникации с бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от того, что осуществляется на языке пользователя, что обеспечивает ясность и улучшает общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что является ключевым шагом в масштабировании ваших услуг по всему миру.

## Почему стоит интегрировать Intlayer?

- **Типобезопасная среда**: Используйте TypeScript, чтобы гарантировать, что все ваши определения контента точны и безошибочны.

## Установка

Установите необходимый пакет с помощью вашего предпочтительного менеджера пакетов:

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

Intlayer предоставляет файл конфигурации для настройки вашего проекта. Поместите этот файл в корень вашего проекта.

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

> Для полноценного списка доступных параметров обратитесь к [документации конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Пример использования

Настройте ваше приложение Express для использования `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Загрузите обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Запустить сервер
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Загрузите обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Запустить сервер
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Загрузите обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Запустить сервер
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) для приложений на React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/index.md) для приложений на Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/vite-intlayer/index.md) для приложений на Vite

Он также бесшовно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или куки:

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

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language`, чтобы определить предпочитаемый язык клиента.

## Функции, предоставляемые пакетом `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/express-intlayer/t.md)
