# @intlayer/chokidar: NPM пакет для сканирования и создания файлов деклараций Intlayer в словари

**Intlayer** - это набор пакетов, разработанный специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/chokidar`** используется для сканирования и создания файлов деклараций Intlayer в словари с использованием [chokidar](https://github.com/paulmillr/chokidar) и в соответствии с [конфигурацией Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Использование

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Создание словарей Intlayer

// Или

watch({ persistent: true }); // Режим наблюдения
```

## Установка

Установите необходимый пакет, используя ваш предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
