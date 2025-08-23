---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | react-scripts-intlayer
description: Узнайте, как использовать пакет react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer: NPM-пакет для использования Intlayer в приложении React Create App

**Intlayer** - это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-scripts-intlayer`** включает команды и плагины `react-scripts-intlayer` для интеграции Intlayer с приложением на базе Create React App. Эти плагины основаны на [craco](https://craco.js.org/) и содержат дополнительную конфигурацию для сборщика [Webpack](https://webpack.js.org/).

## Конфигурация

Пакет `react-scripts-intlayer` отлично работает вместе с пакетом [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Использование

### CLI команды

Пакет `react-scripts-intlayer` предоставляет следующие CLI команды:

- `npx react-scripts-intlayer build`: Собирает React-приложение с конфигурацией Intlayer.
- `npx react-scripts-intlayer start`: Запускает сервер разработки с конфигурацией Intlayer.

### Замена скриптов в package.json

Чтобы использовать пакет `react-scripts-intlayer`, необходимо заменить скрипты в `package.json` следующими командами:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Использование пользовательской конфигурации Webpack

`react-scripts-intlayer` основан на [craco](https://craco.js.org/), который позволяет настраивать конфигурацию Webpack.
Если вам нужно настроить конфигурацию Webpack, вы также можете реализовать собственную настройку на основе плагина intlayer для craco. [См. пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Полное руководство по Intlayer для React Create App

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше React-приложение.
[Узнайте, как использовать intlayer с React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
