# @intlayer/webpack: NPM Пакет для использования плагина Intlayer Webpack в вашем приложении

**Intlayer** — это набор пакетов, разработанный специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/webpack`** используется для предоставления конфигурации Webpack, чтобы облегчить работу с приложением на основе Webpack с Intlayer. Пакет также предоставляет плагин для добавления в существующее приложение Webpack.

## Использование

```ts
import { IntLayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntLayerPlugin({
      // Опции
    }),
  ],
};
```

## Установка

Установите необходимый пакет, используя ваш предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
