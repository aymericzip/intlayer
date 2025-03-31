**Intlayer** , это набор пакетов, специально разработанных для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-native-intlayer`** позволяет интернационализировать ваше приложение Vite. Он включает плагин Metro для настройки конфигурации через переменные окружения в [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## Зачем интернационализировать ваше приложение React Native?

Интернационализация вашего приложения React Native необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей из разных языковых сообществ.

## Конфигурация

Пакет `react-native-intlayer` работает без проблем с [`react-intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md) и [`intlayer` пакетом](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). Ознакомьтесь с соответствующей документацией для получения дополнительной информации.

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

Посмотрите пример того, как включить плагины в вашу конфигурацию Vite.

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

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение Vite.

**Чтобы узнать больше об этих функциях, обратитесь к [Руководству по интернационализации (i18n) React с Intlayer и React Native](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_react_native+expo.md) для приложения React Native.**

## Узнайте больше о Intlayer

- [Сайт Intlayer](https://intlayer.org)
- [Документация Intlayer](https://intlayer.org/docs)
- [GitHub Intlayer](https://github.com/aymericzip/intlayer)

- [Задайте свои вопросы нашей умной документации](https://intlayer.org/docs/chat)
