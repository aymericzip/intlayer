---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Документация пакета | lynx-intlayer
description: Узнайте, как использовать пакет lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

**Intlayer** , это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `lynx-intlayer`** позволяет интернационализировать ваше приложение Vite. Он включает плагин Metro для настройки конфигурации через переменные окружения в [Lynx bundler](https://lynxjs.org/index.html).

## Зачем интернационализировать ваше приложение Lynx?

Интернационализация вашего приложения Lynx необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых сообществ.

## Конфигурация

Пакет `lynx-intlayer` работает без проблем с [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет с помощью вашего предпочтительного менеджера пакетов:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Пример использования

Посмотрите пример того, как включить плагины в вашу конфигурацию vite.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... другие плагины
    pluginIntlayerLynx(),
  ],
});
```

## Освоение интернационализации вашего приложения Vite

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение Vite.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [React Internationalization (i18n) с Intlayer и Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_lynx+react.md) для приложения Lynx.**

## Узнайте больше о Intlayer

- [Сайт Intlayer](https://intlayer.org)
- [Документация Intlayer](https://intlayer.org/doc)
- [Intlayer на GitHub](https://github.com/aymericzip/intlayer)

- [Задайте свои вопросы нашей умной документации](https://intlayer.org/docchat)
