# Начало работы с интернационализацией (i18n) с Intlayer и Express

`express-intlayer` — это мощное программное обеспечение для интернационализации (i18n) для приложений Express, предназначенное для того, чтобы сделать ваши серверные услуги глобально доступными, предоставляя локализованные ответы на основе предпочтений клиента.

## Почему нужно интернационализировать ваш бэкенд?

Интернационализация вашего бэкенда необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых групп.

### Практические примеры использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень раздражения. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как оповещения или модальные окна.

- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы можете предоставлять этот контент на нескольких языках. Это важно для платформ, таких как сайты электронной торговли или системы управления контентом, которые должны отображать описания продуктов, статьи и другой контент на языке, предпочитаемом пользователем.

- **Отправка многоязычных электронных писем**: Будь то транзакционные электронные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить уровень вовлеченности и эффективности.

- **Многоязычные пуш-уведомления**: Для мобильных приложений отправка пуш-уведомлений на предпочитаемом языке пользователя может увеличить взаимодействие и удержание. Этот личный подход может сделать уведомления более актуальными и действенными.

- **Другие коммуникации**: Любая форма связи с бэкендом, такая как СМС сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от того, что она ведется на языке пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только учитывает культурные различия, но и лучше соответствует потребностям мирового рынка, что является ключевым шагом в масштабировании ваших услуг по всему миру.

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

Настройте параметры интернационализации, создав `intlayer.config.ts` в корне вашего проекта:

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
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Загружаем обработчик международных запросов
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Пример возвращённого контента на английском языке",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем на порту 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Загружаем обработчик международных запросов
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Пример возвращённого контента на английском языке",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем на порту 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Загружаем обработчик международных запросов
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Пример возвращённого контента на английском языке",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Запуск сервера
app.listen(3000, () => console.log(`Слушаем на порту 3000`));
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) для приложений React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/index.md) для приложений Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/vite-intlayer/index.md) для приложений Vite

Он также работает без проблем с любым решением по интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или куки:

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

> Для получения дополнительной информации о конфигурации и сложных темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Работает на TypeScript

`express-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, что снижает риск отсутствия переводов и улучшает поддерживаемость.

> Убедитесь, что сгенерированные типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.
