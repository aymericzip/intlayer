---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета intlayer
description: Ядровий пакет Intlayer, що надає базові функції та типи для інтернаціоналізації.
keywords:
  - intlayer
  - ядро
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет intlayer

Пакет `intlayer`, це основна бібліотека екосистеми Intlayer. Він надає необхідні функції, типи та утиліти для керування багатомовним контентом у застосунках на JavaScript та TypeScript.

## Встановлення

```bash
npm install intlayer
```

## Експорти

### Конфігурація

Імпорт:

```tsx
import "intlayer";
```

| Змінна             | Тип                    | Опис                                                                                              | Пов'язаний документ                                                                                                     |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Об'єкт конфігурації Intlayer.                                                                     | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Повертає об'єкт конфігурації Intlayer. (**Deprecated**: Використовуйте `configuration` натомість) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Список усіх підтримуваних локалей.                                                                | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Список усіх обов'язкових локалей.                                                                 | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Локаль за замовчуванням.                                                                          | -                                                                                                                       |

### Типи

Імпорт:

```tsx
import "intlayer";
```

| Тип                   | Опис                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| `Dictionary`          | Тип словника, що використовується для визначення структури словника. |
| `DeclarationContent`  | (**Deprecated**) Використовуйте `Dictionary<T>` натомість.           |
| `IntlayerConfig`      | Тип, який визначає конфігурацію Intlayer.                            |
| `ContentNode`         | Вузол у вмісті словника.                                             |
| `Locale`              | Тип, який представляє локаль.                                        |
| `LocalesValues`       | Можливі значення для локалі.                                         |
| `StrictModeLocaleMap` | Мапа локалей зі строгою перевіркою типів.                            |

### Функції вмісту

Імпорт:

```tsx
import "intlayer";
```

| Функція                  | Тип        | Опис                                                                                                     | Пов'язаний документ                                                                                      |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | Вибирає вміст залежно від поточної локалі.                                                               | [переклад](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)      |
| `enu` / `getEnumeration` | `Function` | Вибирає вміст залежно від кількості.                                                                     | [перерахування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Вибирає контент на основі булевої умови.                                                                 | [умова](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/condition.md)           |
| `gender`                 | `Function` | Вибирає контент на основі гендера.                                                                       | [гендер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md)             |
| `insert`                 | `Function` | Вставляє значення у рядок контенту.                                                                      | [вставлення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)      |
| `nest` / `getNesting`    | `Function` | Вкладає інший словник.                                                                                   | [вкладення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/nesting.md)         |
| `md`                     | `Function` | Обробляє вміст у форматі Markdown.                                                                       | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)         |
| `html`                   | `Function` | Обробляє HTML-вміст.                                                                                     | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/html.md)                 |
| `file`                   | `Function` | Обробляє вміст файлу.                                                                                    | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file.md)                 |
| `getDictionary`          | `Function` | Обробляє об'єкти, які виглядають як словники (ключ, вміст). Обробляє переклади `t()`, enumerations тощо. | -                                                                                                        |
| `getIntlayer`            | `Function` | Базується на `getDictionary`, але вставляє оптимізовану версію словника зі згенерованої декларації.      | -                                                                                                        |

### Локалізаційні утиліти

Імпорт:

```tsx
import "intlayer";
```

| Функція                | Тип        | Опис                                               | Пов'язана документація                                                                                                          |
| ---------------------- | ---------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Визначає локаль зі рядка або шляху.                | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Отримує мовну частину локалі.                      | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Отримує відображувану назву локалі.                | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Перетворює канонічний шлях на локалізований.       | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Перетворює локалізований шлях на канонічний.       | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Генерує локалізований URL.                         | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Генерує URL-адреси для всіх підтримуваних локалей. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Видаляє префікс локалі з шляху.                    | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Отримує префікс локалі з шляху.                    | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Отримує напрямок тексту (LTR/RTL).                 | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Перевіряє префікс локалі.                          | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/validatePrefix.md)             |

### Браузерні утиліти

Імпорт:

```tsx
import "intlayer";
```

| Функція                | Тип        | Опис                                 |
| ---------------------- | ---------- | ------------------------------------ |
| `getBrowserLocale`     | `Function` | Визначає переважний locale браузера. |
| `getCookie`            | `Function` | Отримує значення cookie.             |
| `getLocaleFromStorage` | `Function` | Отримує locale зі сховища.           |
| `setLocaleInStorage`   | `Function` | Зберігає locale в сховище.           |

### Форматери

Імпорт:

```tsx
import "intlayer";
```

| Функція        | Опис                                  |
| -------------- | ------------------------------------- |
| `number`       | Форматує число.                       |
| `currency`     | Форматує валютне значення.            |
| `percentage`   | Форматує відсоток.                    |
| `compact`      | Форматує число у компактному вигляді. |
| `date`         | Форматує дату.                        |
| `relativeTime` | Форматує відносний час.               |
| `units`        | Форматує значення з одиницями виміру. |
| `Intl`         | Стандартний об'єкт Intl.              |
