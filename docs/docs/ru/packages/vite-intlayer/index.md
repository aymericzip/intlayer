---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | vite-intlayer
description: Узнайте, как использовать пакет vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: NPM пакет для интернационализации (i18n) приложения на Vite

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `vite-intlayer`** позволяет интернационализировать ваше приложение на Vite. Он включает плагин Vite для настройки конфигурации через переменные окружения в [сборщике Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Также он предоставляет middleware для определения предпочтительной локали пользователя и перенаправления пользователя на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Зачем интернационализировать ваше приложение на Vite?

Интернационализация вашего приложения на Vite необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

## Конфигурация

Пакет `vite-intlayer` работает безупречно с пакетом [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

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

Пример того, как включить плагины в вашу конфигурацию vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и их мониторинг в режиме разработки. Определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, предоставляет алиасы для оптимизации производительности.

> Плагин `intLayerMiddlewarePlugin()` добавляет маршрутизацию на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующее cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, будет выполнено перенаправление на локаль по умолчанию.

## Освоение интернационализации вашего приложения Vite

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение на Vite.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [React Internationalization (i18n) с Intlayer, Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md) для приложений на Vite и React.**

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
