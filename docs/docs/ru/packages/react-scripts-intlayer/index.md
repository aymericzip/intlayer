---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация пакета | react-scripts-intlayer
description: Узнайте, как использовать пакет react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# react-scripts-intlayer: NPM Пакет для использования Intlayer в приложении React Create App

**Intlayer** , это набор пакетов, разработанных специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-scripts-intlayer`** включает команды и плагины `react-scripts-intlayer` для интеграции Intlayer с приложением на основе Create React App. Эти плагины основаны на [craco](https://craco.js.org/) и включают дополнительную конфигурацию для сборщика [Webpack](https://webpack.js.org/).

## Конфигурация

Пакет `react-scripts-intlayer` работает без проблем с [`react-intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и [`intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

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

### CLI Команды

Пакет `react-scripts-intlayer` предоставляет следующие CLI команды:

- `npx react-scripts-intlayer build`: Собирает React приложение с конфигурацией Intlayer.
- `npx react-scripts-intlayer start`: Запускает сервер разработки с конфигурацией Intlayer.

### Замена скриптов в package.json

Чтобы использовать пакет `react-scripts-intlayer`, вам нужно заменить скрипты в `package.json` следующими командами:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Использование пользовательской конфигурации Webpack

`react-scripts-intlayer` основан на [craco](https://craco.js.org/), что позволяет вам настраивать конфигурацию Webpack.
Если вам нужно настроить конфигурацию Webpack, вы также можете реализовать собственную настройку на основе плагина intlayer craco. [Смотрите пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Прочитайте полный гид по Intlayer для React Create App

Intlayer предоставляет множество функций, чтобы помочь вам интернационализировать ваше React приложение.
[Смотрите, как использовать intlayer с React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).
