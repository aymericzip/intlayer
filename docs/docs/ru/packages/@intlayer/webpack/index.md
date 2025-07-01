---
docName: package__@intlayer_webpack
url: https://intlayer.org/doc/package/@intlayer_webpack
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/@intlayer/webpack/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Плагин Webpack для Intlayer i18n
description: Пакет NPM, предоставляющий конфигурацию Webpack и плагин для бесшовной интеграции интернационализации Intlayer с приложениями на основе Webpack.
keywords:
  - intlayer
  - webpack
  - плагин
  - конфигурация
  - i18n
  - JavaScript
  - NPM
  - сборщик
---

# @intlayer/webpack: Пакет NPM для использования плагина Intlayer Webpack в вашем приложении

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/webpack`** используется для предоставления конфигурации Webpack, чтобы упростить работу с приложением на основе Webpack с Intlayer. Пакет также предоставляет плагин для добавления в существующее приложение Webpack.

## Использование

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Опции
    }),
  ],
};
```

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
