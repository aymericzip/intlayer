---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Документация пакета react-native-intlayer
description: Поддержка React Native для Intlayer, предоставляющая провайдеры, хуки, полифилы и конфигурацию Metro.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Реэкспорт полного API react-intlayer (хуки, утилиты, подпути format/html/markdown), чтобы приложение React Native зависело только от react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Унифицированная документация для всех экспортов"
author: aymericzip
---

# Пакет react-native-intlayer

Пакет `react-native-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения React Native. Он реэкспортирует полный API `react-intlayer` (хуки и утилиты) с `IntlayerProvider`, адаптированным для React Native, а также полифилы и конфигурацию Metro, необходимые для работы в React Native.

> В приложении React Native импортируйте **всё** из `react-native-intlayer`. Устанавливать или импортировать `react-intlayer` напрямую не нужно.

## Установка

```bash
npm install react-native-intlayer
```

## Экспорты

### Провайдер

| Компонент          | Описание                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Провайдер-компонент, который оборачивает ваше приложение и предоставляет контекст Intlayer. Автоматически применяет необходимые полифилы. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Хуки и утилиты

Они реэкспортируются из `react-intlayer`, поэтому вы можете импортировать их напрямую из `react-native-intlayer`:

| Экспорт                                                                                                           | Описание                                            |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `useIntlayer`                                                                                                     | Доступ к локализованному контенту по ключу словаря. |
| `useLocale`                                                                                                       | Чтение и изменение текущей локали.                  |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Загрузка содержимого словаря различными способами.  |
| `useI18n`                                                                                                         | Совместимый с i18next хук.                          |
| `t`                                                                                                               | Вспомогательная функция для встроенного перевода.   |
| `getIntlayer`, `getDictionary`                                                                                    | Императивные геттеры контента.                      |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Вспомогательные функции для сохранения локали.      |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Полифил

| Функция            | Описание                                                                         |
| ------------------ | -------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Функция, применяющая необходимые полифилы для поддержки Intlayer в React Native. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Полифил применяется автоматически при импорте `IntlayerProvider`. Вызывайте `intlayerPolyfill` вручную только если вам нужны полифилы до монтирования провайдера.

### Форматтеры

Хуки форматирования чисел, дат и другие функции на базе Intl доступны из подпути `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown и HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Конфигурация Metro

Пакет `react-native-intlayer` предоставляет утилиты конфигурации Metro, чтобы гарантировать корректную работу Intlayer с React Native.

| Функция                   | Описание                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Асинхронная функция, которая подготавливает Intlayer и объединяет конфигурацию Metro.       |
| `configMetroIntlayerSync` | Синхронная функция, которая объединяет конфигурацию Metro без подготовки ресурсов Intlayer. |
| `exclusionList`           | Создаёт шаблон RegExp для blockList Metro, чтобы исключать файлы контента из бандла.        |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
