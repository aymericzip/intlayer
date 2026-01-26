---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета intlayer
description: Ядро Intlayer, предоставляющее базовые функции и типы для интернационализации.
keywords:
  - intlayer
  - ядро
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Унифицированная документация для всех экспортов
---

# Пакет intlayer

Пакет `intlayer` — это основная библиотека экосистемы Intlayer. Он предоставляет необходимые функции, типы и утилиты для управления многоязычным контентом в приложениях на JavaScript и TypeScript.

## Установка

```bash
npm install intlayer
```

## Экспорт

### Конфигурация

Импорт:

```tsx
import "intlayer";
```

| Переменная         | Тип                    | Описание                                                                                          | Связанный документ                                                                                                      |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Объект конфигурации Intlayer.                                                                     | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Возвращает объект конфигурации Intlayer. (**Устарело**: используйте `configuration` вместо этого) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Список всех поддерживаемых локалей.                                                               | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Список всех обязательных локалей.                                                                 | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Локаль по умолчанию.                                                                              | -                                                                                                                       |

### Типы

Импорт:

```tsx
import "intlayer";
```

| Тип                   | Описание                                                     |
| --------------------- | ------------------------------------------------------------ |
| `Dictionary`          | Тип словаря, используемый для определения структуры словаря. |
| `DeclarationContent`  | (**Устарело**) Используйте `Dictionary<T>` вместо этого.     |
| `IntlayerConfig`      | Тип, определяющий конфигурацию Intlayer.                     |
| `ContentNode`         | Узел в содержимом словаря.                                   |
| `Locale`              | Тип, представляющий локаль.                                  |
| `LocalesValues`       | Возможные значения для локали.                               |
| `StrictModeLocaleMap` | Map локалей со строгой проверкой типов.                      |

### Функции контента

Импорт:

```tsx
import "intlayer";
```

| Функция                  | Тип        | Описание                                                                                                            | Связанный документ                                                                                     |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Выбирает контент в зависимости от текущей локали.                                                                   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Выбирает контент в зависимости от количества.                                                                       | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Выбирает контент в зависимости от булевого условия.                                                                 | [условие](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/condition.md)       |
| `gender`                 | `Function` | Выбирает контент в зависимости от пола.                                                                             | [пол](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md)              |
| `insert`                 | `Function` | Вставляет значения в строку контента.                                                                               | [вставка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md)       |
| `nest` / `getNesting`    | `Function` | Вкладывает другой словарь.                                                                                          | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/nesting.md)         |
| `md`                     | `Function` | Обрабатывает markdown-контент.                                                                                      | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md)       |
| `html`                   | `Function` | Обрабатывает HTML-контент.                                                                                          | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/html.md)               |
| `file`                   | `Function` | Обрабатывает содержимое файла.                                                                                      | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/file.md)               |
| `getDictionary`          | `Function` | Обрабатывает объекты, похожие на словари (ключ, содержимое). Обрабатывает переводы `t()`, перечисления и т.д.       | -                                                                                                      |
| `getIntlayer`            | `Function` | Основано на `getDictionary`, но внедряет оптимизированную версию словаря из сгенерированного декларационного файла. | -                                                                                                      |

### Утилиты локализации

Импорт:

```tsx
import "intlayer";
```

| Функция                | Тип        | Описание                                        | Связанная документация                                                                                                          |
| ---------------------- | ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Определяет локаль по строке или по пути.        | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Возвращает языковую часть локали.               | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Возвращает отображаемое имя локали.             | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Преобразует канонический путь в локализованный. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Преобразует локализованный путь в канонический. | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Генерирует локализованный URL.                  | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Генерирует URL для всех поддерживаемых локалей. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Удаляет префикс локали из пути.                 | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Получает префикс локали из пути.                | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Определяет направление текста (LTR/RTL).        | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Проверяет префикс локали.                       | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/validatePrefix.md)             |

### Утилиты браузера

Импорт:

```tsx
import "intlayer";
```

| Функция                | Тип        | Описание                                     |
| ---------------------- | ---------- | -------------------------------------------- |
| `getBrowserLocale`     | `Function` | Определяет предпочтительную локаль браузера. |
| `getCookie`            | `Function` | Получает значение cookie.                    |
| `getLocaleFromStorage` | `Function` | Получает локаль из хранилища.                |
| `setLocaleInStorage`   | `Function` | Сохраняет локаль в хранилище.                |

### Форматтеры

Импорт:

```tsx
import "intlayer";
```

| Функция        | Описание                              |
| -------------- | ------------------------------------- |
| `number`       | Форматирует число.                    |
| `currency`     | Форматирует значение валюты.          |
| `percentage`   | Форматирует процент.                  |
| `compact`      | Форматирует число в компактной форме. |
| `date`         | Форматирует дату.                     |
| `relativeTime` | Форматирует относительное время.      |
| `units`        | Форматирует значение с единицами.     |
| `Intl`         | Стандартный объект Intl.              |
