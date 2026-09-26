---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: Документация пакета vite-intlayer
description: Плагин Vite для Intlayer, обеспечивающий псевдонимы словарей и наблюдатели.
keywords:
  - vite-intlayer
  - vite
  - плагин
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Обновлен индекс экспортов – прокси и компилятор теперь объединены в intlayer(); добавлена документация intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Унифицированная документация для всех экспортов"
author: aymericzip
---

# Пакет vite-intlayer

Пакет `vite-intlayer` предоставляет плагин для Vite, который интегрирует Intlayer в ваше приложение на основе Vite.

## Установка

```bash
npm install vite-intlayer
```

## Экспорты

### Плагин

Импорт:

```tsx
import "vite-intlayer";
```

| Функция                    | Описание                                                                                                                                                                      | Связанная документация                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Основной плагин Vite. Подготавливает словари, настраивает псевдонимы, запускает наблюдатели сервера разработки и (с v9) объединяет прокси и компилятор.                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Устарело**) Псевдоним для `intlayer`.                                                                                                                                      | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Устарело**) Псевдоним для `intlayer`.                                                                                                                                      | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Плагин промежуточного ПО для маршрутизации локалей (обнаружение, перенаправление, перезапись). С v9 встроен в `intlayer()` – регистрируйте отдельно только при необходимости. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Устарело**) Псевдоним для `intlayerProxy`.                                                                                                                                 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Устарело**) Псевдоним для `intlayerProxy`.                                                                                                                                 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Извлекает встроенные объявления содержимого из компонентов и записывает их в словари. С v9 встроен в `intlayer()`.                                                            | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Удаляет неиспользуемые поля словарей из производственной сборки с помощью tree-shaking.                                                                                       | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Минифицирует скомпилированные JSON-файлы словарей и при необходимости сокращает имена полей.                                                                                  | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerMinify.md)     |

### Утилиты

| Export                       | Description                                                                                             | Related Doc                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Возвращает фреймворк-независимый Node.js `(req, res, next)` middleware с логикой маршрутизации локалей. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerProxy.md) |

### Типы

| Export                       | Описание                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Опции, принимаемые функцией `intlayer()`. Расширяет `GetConfigurationOptions` с помощью `compatCallers` и `proxy`.    |
| `IntlayerProxyPluginOptions` | Опции, принимаемые функциями `intlayerProxy()` и `createIntlayerProxyHandler()`. Включает `ignore` и `configOptions`. |
| `IntlayerCompilerOptions`    | Опции, принимаемые функцией `intlayerCompiler()`. Включает `configOptions` и `compilerConfig`.                        |
| `CompatCallerConfig`         | Переэкспорт из `@intlayer/babel`. Описывает паттерн compat-adapter caller для анализа использования полей.            |
