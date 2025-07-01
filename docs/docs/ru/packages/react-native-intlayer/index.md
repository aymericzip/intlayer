---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Документация пакета | react-native-intlayer
description: Узнайте, как использовать пакет react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# react-native-intlayer: Интернационализация (i18n) приложения React Native

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-native-intlayer`** позволяет интернационализировать ваше приложение Vite. В него включён плагин Metro, который настраивает конфигурацию через переменные окружения в [Metro bundлере](https://docs.expo.dev/guides/customizing-metro/).

## Почему стоит интернационализировать ваше приложение React Native?

Интернационализация вашего приложения React Native необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым происхождением.

## Конфигурация

Пакет `react-native-intlayer` отлично работает вместе с пакетом [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) и пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Пример использования

Пример того, как включить плагины в вашу конфигурацию vite.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Освоение интернационализации вашего приложения Vite

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение на Vite.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [Интернационализация React (i18n) с Intlayer и React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_react_native+expo.md) для приложений React Native.**

## Узнайте больше об Intlayer

- [Веб-сайт Intlayer](https://intlayer.org)
- [Документация Intlayer](https://intlayer.org/doc)
- [GitHub Intlayer](https://github.com/aymericzip/intlayer)

- [Задайте ваши вопросы нашей умной документации](https://intlayer.org/docchat)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
