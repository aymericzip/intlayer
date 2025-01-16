# react-scripts-intlayer: NPM-пакет для использования Intlayer в приложении React Create App

**Intlayer** — это набор пакетов, разработанных специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-scripts-intlayer`** включает команды и плагины `react-scripts-intlayer` для интеграции Intlayer с приложением на основе Create React App. Эти плагины основаны на [craco](https://craco.js.org/) и включают дополнительную конфигурацию для сборщика [Webpack](https://webpack.js.org/).

## Конфигурация

Пакет `react-scripts-intlayer` работает без проблем с пакетом [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) и пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

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

Пакет `react-scripts-intlayer` предоставляет следующие команды CLI:

- `npx react-scripts-intlayer build`: Строит приложение React с конфигурацией Intlayer.
- `npx react-scripts-intlayer start`: Запускает сервер разработки с конфигурацией Intlayer.

### Замените скрипты package.json

Чтобы использовать пакет `react-scripts-intlayer`, вам нужно заменить скрипты `package.json` на следующие команды:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Используйте собственную конфигурацию Webpack

`react-scripts-intlayer` основан на [craco](https://craco.js.org/), который позволяет вам настраивать конфигурацию Webpack. Если вам нужно настроить конфигурацию Webpack, вы также можете реализовать свою собственную настройку на основе плагина intlayer craco. [См. пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Ознакомьтесь с полным руководством Intlayer для React Create App

Intlayer предоставляет множество возможностей, чтобы помочь вам интернационализировать ваше React-приложение. [См. как использовать intlayer с React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).
