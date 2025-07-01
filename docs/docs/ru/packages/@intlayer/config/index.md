---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Управление конфигурацией для Intlayer
description: NPM пакет для получения конфигурации Intlayer и определения переменных окружения для настроек интернационализации в разных средах.
keywords:
  - intlayer
  - конфигурация
  - окружение
  - настройки
  - i18n
  - JavaScript
  - NPM
  - переменные
---

# @intlayer/config: NPM пакет для получения конфигурации Intlayer

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/config`** — это NPM-пакет, который позволяет получить конфигурацию Intlayer и определить переменные окружения, связанные с текущей средой.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Использование

### Чтение конфигурации Intlayer с использованием файловой системы

Пример:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Вывод:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Эта функция использует пакет `fs` и будет работать только на стороне сервера.

### Чтение конфигурации Intlayer с использованием переменных окружения

Пример:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Вывод:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Эта функция не вернёт ничего, если переменные окружения не определены.

### Определение переменных окружения

1. Создайте файл конфигурации.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> См. [документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для получения дополнительной информации.

2. Определите переменные окружения.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Форматируем все значения конфигурации как переменные окружения
const env = formatEnvVariable();

// Устанавливаем каждую отформатированную переменную окружения в process.env
Object.assign(process.env, env);
```

3. Импортируйте файл конфигурации.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
