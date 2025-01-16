# vite-intlayer: NPM пакет для интернационализации (i18n) Vite приложения

**Intlayer** - это набор пакетов, разработанный специально для JavaScript разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `vite-intlayer`** позволяет вам интернационализировать ваше Vite приложение. Он включает плагин Vite для установки конфигурации через переменные окружения в [Vite сборщик](https://vitejs.dev/guide/why.html#why-bundle-for-production). Он также предоставляет промежуточное ПО для определения предпочтительного языка пользователя и перенаправления пользователя на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Почему интернационализировать ваше Vite приложение?

Интернационализация вашего Vite приложения крайне важна для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых групп.

## Конфигурация

Пакет `vite-intlayer` работает без проблем с [`react-intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) и [`intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет, используя ваш предпочитаемый менеджер пакетов:

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

Смотрите пример того, как включить плагины в вашу конфигурацию vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Плагин `intlayerPlugin()` Vite используется для интеграции Intlayer с Vite. Он обеспечивает построение файлов деклараций контента и следит за ними в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет псевдонимы для оптимизации производительности.

> Плагин `intLayerMiddlewarePlugin()` добавляет маршрутизацию на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующийcookie локали. Если локаль не указана, плагин определит наиболее подходящую локаль на основе предпочтений языка браузера пользователя. Если локаль не обнаружена, будет выполнено перенаправление на локаль по умолчанию.

## Освоение интернационализации вашего Vite приложения

Intlayer предоставляет множество функций, чтобы помочь вам интернационализировать ваше Vite приложение.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [Интернационализация (i18n) React с Intlayer и Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md) для Vite и React приложения.**
