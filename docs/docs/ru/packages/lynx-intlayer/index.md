---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Документация пакета | lynx-intlayer
description: Узнайте, как использовать пакет lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# lynx-intlayer: Интернационализация (i18n) приложения Lynx

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `lynx-intlayer`** позволяет интернационализировать ваше приложение на Vite. В него включён плагин Metro, который настраивает конфигурацию через переменные окружения для [сборщика Lynx](https://lynxjs.org/index.html).

## Зачем интернационализировать ваше приложение Lynx?

Интернационализация вашего приложения Lynx необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

## Конфигурация

Пакет `lynx-intlayer` отлично работает вместе с пакетом [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

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

Пример того, как включить плагины в вашу конфигурацию vite.

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

## Освоение интернационализации вашего приложения на Vite

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение на Vite.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [React Internationalization (i18n) с Intlayer и Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_lynx+react.md) для приложения Lynx.**

## Узнайте больше об Intlayer

- [Веб-сайт Intlayer](https://intlayer.org)
- [Документация Intlayer](https://intlayer.org/doc)
- [GitHub Intlayer](https://github.com/aymericzip/intlayer)

- [Задайте свои вопросы нашей умной документации](https://intlayer.org/doc/chat)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
