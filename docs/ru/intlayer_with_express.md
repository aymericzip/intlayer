# Начало работы с интернационализацией (i18n) с Intlayer и Express

`express-intlayer` — это мощное программное обеспечение для интернационализации (i18n), предназначенное для приложений Express, которое позволяет сделать ваши серверные службы глобально доступными, предоставляя локализованные ответы в зависимости от предпочтений клиента.

## Почему интернационализировать свой бэкэнд?

Интернационализация вашего бэкэнда жизненно важна для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставить контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых групп.

### Практические примеры использования

- **Отображение ошибок бэкэнда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень разочарования. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как тосты или модальные окна.

- **Получение многоязычного контента**: Для приложений, которые извлекают контент из базы данных, интернационализация гарантирует, что вы можете представить этот контент на нескольких языках. Это крайне необходимо для платформ, таких как интернет-магазины или системы управления контентом, которые должны отображать описания продуктов, статьи и другой контент на предпочитаемом пользователем языке.

- **Отправка многоязычных электронных писем**: Будь то транзакционные электронные письма, маркетинговые компании или уведомления, отправка писем на языке получателя может значительно увеличить вовлеченность и эффективность.

- **Многоязычные пуш-уведомления**: Для мобильных приложений отправка пуш-уведомлений на предпочитаемом языке пользователя может улучшить взаимодействие и удержание. Этот личный подход может сделать уведомления более актуальными и привлекательными.

- **Другие виды коммуникации**: Любая форма связи с бэкэндом, такая как SMS сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, что обеспечивает ясность и улучшает общий пользовательский опыт.

Интернационализируя бэкэнд, ваше приложение не только уважает культурные различия, но и лучше соответствует требованиям глобального рынка, что является ключевым шагом к расширению ваших услуг по всему миру.

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

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.RUSSIAN,
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
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.RUSSIAN,
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
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.RUSSIAN,
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

// Загружаем обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Пример возвращенного контента на русском",
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

// Загружаем обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Пример возвращенного контента на русском",
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

// Загружаем обработчик запросов интернационализации
app.use(intlayer());

// Маршруты
app.get("/", (_req, res) => {
  res.send(
    t({
      ru: "Пример возвращенного контента на русском",
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

- `react-intlayer` для приложений React
- `next-intlayer` для приложений Next.js

Он также работает без проблем с любой системой интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или куки:

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

> Для получения дополнительной информации о конфигурации и расширенных темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Основывается на TypeScript

`express-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, уменьшая риск отсутствия переводов и улучшая поддерживаемость.

> Убедитесь, что сгенерированные типы (по умолчанию по адресу ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.
