# @intlayer/chokidar: NPM Пакет для сканирования и создания файлов деклараций Intlayer в словари

**Intlayer** , это набор пакетов, специально разработанных для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/chokidar`** используется для сканирования и создания файлов деклараций Intlayer в словари с использованием [chokidar](https://github.com/paulmillr/chokidar) и в соответствии с [конфигурацией Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Создание словарей Intlayer

watch({ persistent: true }); // Отслеживание изменений в конфигурационных файлах
```

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
