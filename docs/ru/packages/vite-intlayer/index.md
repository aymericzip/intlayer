# vite-intlayer: Пакет NPM для интернационализации (i18n) приложения Vite

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `vite-intlayer`** позволяет интернационализировать ваше приложение Vite. Он включает плагин Vite для настройки конфигурации через переменные окружения в [сборщике Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Также он предоставляет middleware для определения предпочтительного языка пользователя и перенаправления пользователя на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Почему важно интернационализировать ваше приложение Vite?

Интернационализация вашего приложения Vite необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

## Конфигурация

Пакет `vite-intlayer` работает без проблем с [`react-intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) и [`intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Пример использования

Посмотрите пример того, как включить плагины в вашу конфигурацию Vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов декларации контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

> Плагин `intLayerMiddlewarePlugin()` добавляет маршрутизацию на стороне сервера в ваше приложение. Этот плагин автоматически определяет текущую локаль на основе URL и устанавливает соответствующий cookie локали. Если локаль не указана, плагин определяет наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, он перенаправляет на локаль по умолчанию.

## Освоение интернационализации вашего приложения Vite

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение Vite.

**Чтобы узнать больше об этих функциях, обратитесь к [Руководству по интернационализации (i18n) React с Intlayer и Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md) для приложений Vite и React.**
