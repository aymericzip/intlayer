# @intlayer/webpack: NPM Пакет для использования Intlayer Webpack Plugin в вашем приложении

**Intlayer** , это набор пакетов, специально разработанных для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, Vue и Express.js.

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

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
