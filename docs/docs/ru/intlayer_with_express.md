---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Переведите свой Express бэкэнд (i18n)
description: Узнайте, как сделать ваш backend vite многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Express
  - JavaScript
  - Бэкэнд
---

# Начало работы с интернационализацией (i18n) с Intlayer и Express

`express-intlayer` , это мощное промежуточное программное обеспечение для интернационализации (i18n) приложений Express, разработанное для того, чтобы сделать ваши серверные службы доступными по всему миру, предоставляя локализованные ответы на основе предпочтений клиента.

## Зачем интернационализировать ваш сервер?

Интернационализация вашего сервера необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей с разным языковым фоном.

### Практические случаи использования

- **Отображение ошибок сервера на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень разочарования. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах интерфейса, таких как всплывающие уведомления или модальные окна.

- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация обеспечивает возможность предоставления этого контента на нескольких языках. Это важно для платформ, таких как сайты электронной коммерции или системы управления контентом, которые должны отображать описания товаров, статьи и другой контент на языке, предпочтительном для пользователя.

- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочтительном языке пользователя может улучшить взаимодействие и удержание. Этот персонализированный подход делает уведомления более актуальными и действенными.

- **Другие виды коммуникации**: Любая форма коммуникации с сервера, такая как SMS-сообщения, системные оповещения или обновления интерфейса пользователя, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя сервер, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что делает это ключевым шагом в масштабировании ваших услуг по всему миру.

## Начало работы

### Установка

Чтобы начать использовать `express-intlayer`, установите пакет с помощью npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Настройка

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корневом каталоге вашего проекта:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Настройка приложения Express

Настройте ваше приложение Express для использования `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
// Импортируем необходимые модули
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Загружаем обработчик запросов интернационализации
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
// Импортируем необходимые модули
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Загружаем обработчик запросов интернационализации
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
// Импортируем необходимые модули
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Загружаем обработчик запросов интернационализации
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для приложений React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для приложений Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для приложений Vite

Он также беспрепятственно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или cookies:

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

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language`, чтобы определить предпочтительный язык клиента.

> Для получения дополнительной информации о конфигурации и расширенных темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`express-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, снижая риск отсутствия переводов и улучшая поддерживаемость.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что автоматически сгенерированные типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включите автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их добавления в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```
