# @intlayer/config: NPM Пакет для получения конфигурации Intlayer

**Intlayer** — это набор пакетов, специально разработанных для разработчиков JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/config`** — это NPM пакет, который позволяет получить конфигурацию Intlayer и определить переменные окружения, связанные с текущей средой.

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

> Эта функция использует пакеты `fs` и будет работать только на стороне сервера.

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

> Эта функция не вернет ничего, если переменные окружения не определены.

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

> См. [Документацию по конфигурации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения более подробной информации.

2. Определите переменные окружения.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Форматирование всех значений конфигурации как переменных окружения
const env = formatEnvVariable();

// Установка каждой отформатированной переменной окружения в process.env
Object.assign(process.env, env);
```

3. Импортируйте файл конфигурации.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
