---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация хука useLocale | solid-intlayer
description: Узнайте, как использовать хук useLocale в пакете solid-intlayer
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Объединённая документация для всех экспортов
---

# Документация хука useLocale

Хук `useLocale` позволяет управлять текущей локалью в вашем приложении на Solid. Он предоставляет доступ к текущей локали (в виде accessor), локали по умолчанию, списку доступных локалей и функции для обновления локали.

## Использование

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Описание

Хук возвращает объект со следующими свойствами:

1. **locale**: Аксессор Solid (`() => string`), возвращающий текущую локаль.
2. **defaultLocale**: Локаль по умолчанию, определённая в вашем `intlayer.config.ts`.
3. **availableLocales**: Массив всех локалей, поддерживаемых вашим приложением.
4. **setLocale**: Функция для обновления локали приложения. Также обрабатывает сохранение (cookies/local storage), если включено.

## Параметры

- **props** (опционально):
  - **onLocaleChange**: Функция обратного вызова, вызываемая при каждом изменении локали.
  - **isCookieEnabled**: Флаг, указывающий, нужно ли сохранять локаль в cookie.
