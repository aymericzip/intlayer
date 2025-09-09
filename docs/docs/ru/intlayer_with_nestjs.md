---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Перевод вашего бэкенда на Nest (i18n)
description: Узнайте, как сделать ваш vite бэкенд многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - NestJS
  - JavaScript
  - Бэкенд
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
---

# Начало работы с интернационализацией (i18n) с Intlayer и NestJS

`express-intlayer` — это мощный middleware для интернационализации (i18n) в приложениях на Express, разработанный для того, чтобы сделать ваши бэкенд-сервисы доступными по всему миру, предоставляя локализованные ответы в зависимости от предпочтений клиента. Поскольку NestJS построен поверх Express, вы можете без проблем интегрировать `express-intlayer` в ваши приложения на NestJS для эффективной работы с многоязычным контентом.

## Зачем интернационализировать ваш бэкенд?

Интернационализация вашего бэкенда необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

### Практические случаи использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда возникает ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает уровень разочарования. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться во фронтенд-компонентах, таких как тосты или модальные окна.

- **Получение многоязычного контента**: Для приложений, которые извлекают контент из базы данных, интернационализация гарантирует возможность предоставления этого контента на нескольких языках. Это критично для платформ, таких как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на предпочитаемом пользователем языке.

- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочитаемом пользователем языке может улучшить взаимодействие и удержание. Такой персональный подход делает уведомления более релевантными и действенными.

- **Другие виды коммуникаций**: Любая форма коммуникации с бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что делает этот шаг ключевым для масштабирования ваших сервисов по всему миру.

## Начало работы

### Создание нового проекта NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

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

### Настройка tsconfig.json

Чтобы использовать Intlayer с TypeScript, убедитесь, что ваш файл `tsconfig.json` настроен для поддержки ES-модулей. Для этого установите параметры `module` и `moduleResolution` в значение `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... другие параметры
  },
}
```

### Настройка

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // поддерживаемые локали
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация интернационализации
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Поддерживаемые локали
    defaultLocale: Locales.ENGLISH, // Локаль по умолчанию
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация интернационализации
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Поддерживаемые локали
    defaultLocale: Locales.ENGLISH, // Локаль по умолчанию
  },
};

module.exports = config;
```

### Объявление вашего контента

Создайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии, что они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](/doc/concept/content).

### Настройка промежуточного ПО Express

Интегрируйте промежуточное ПО `express-intlayer` в ваше приложение NestJS для обработки интернационализации:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Применить ко всем маршрутам
  }
}
```

### Использование переводов в ваших сервисах или контроллерах

Теперь вы можете использовать функцию `getIntlayer` для доступа к переводам в ваших сервисах или контроллерах:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Получить приветствие из переводов
  }
}
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](/doc/packages/react-intlayer) для приложений на React
- [`next-intlayer`](/doc/packages/next-intlayer) для приложений на Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) для приложений на Vite

Он также без проблем работает с любыми решениями для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или куки:

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

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

> Для получения дополнительной информации о конфигурации и продвинутых темах посетите нашу [документацию](/doc/concept/configuration).

### Настройка TypeScript

`express-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, снижая риск отсутствия переводов и повышая удобство сопровождения.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что автогенерируемые типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  include: [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного содержимого.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

## История документации

| Версия | Дата       | Изменения                  |
| ------ | ---------- | -------------------------- |
| 5.8.0  | 2025-09-09 | Начальная версия документа |
