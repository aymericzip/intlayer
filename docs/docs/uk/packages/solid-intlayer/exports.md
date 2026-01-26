---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета solid-intlayer
description: Спеціальна інтеграція Intlayer для Solid, що надає провайдери та хуки для Solid-застосунків.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет solid-intlayer

Пакет `solid-intlayer` надає необхідні інструменти для інтеграції Intlayer у Solid-застосунки. Він включає провайдери та хуки для роботи з багатомовним контентом.

## Встановлення

```bash
npm install solid-intlayer
```

## Експорти

### Провайдер

Імпорт:

```tsx
import "solid-intlayer";
```

| Компонент          | Опис                                                                   | Пов'язаний документ                                                                                                           |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Головний провайдер, що обгортає ваш додаток і надає контекст Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/IntlayerProvider.md) |

### Хуки

Імпорт:

```tsx
import "solid-intlayer";
```

| Хук                    | Опис                                                                                                               | Пов'язаний документ                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Базується на `useDictionary`, але вбудовує оптимізовану версію словника зі згенерованої декларації.                | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Обробляє об'єкти, що виглядають як словники (ключ, вміст). Обробляє переклади `t()`, перерахування тощо.           | -                                                                                                                       |
| `useDictionaryAsync`   | Те саме, що `useDictionary`, але працює з асинхронними словниками.                                                 | -                                                                                                                       |
| `useDictionaryDynamic` | Те саме, що `useDictionary`, але працює з динамічними словниками.                                                  | -                                                                                                                       |
| `useLocale`            | Повертає поточну локаль та функцію для її встановлення.                                                            | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Клієнтський хук для керування перенаписами URL. Автоматично оновлює URL, якщо існує локалізоване правило перепису. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Повертає об'єкт Intl для поточної локалі.                                                                          | -                                                                                                                       |
| `useLoadDynamic`       | Hook для завантаження динамічних словників.                                                                        | -                                                                                                                       |
| `t`                    | Вибирає вміст залежно від поточної locale.                                                                         | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)                  |

### Компоненти

Імпорт:

```tsx
import "solid-intlayer";
```

| Компонент          | Опис                                     |
| ------------------ | ---------------------------------------- |
| `MarkdownProvider` | Провайдер контексту рендерингу markdown. |
