---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Документація хуку useLocale | solid-intlayer"
description: "Дізнайтеся, як використовувати хук useLocale у пакеті solid-intlayer"
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
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
    changes: "Уніфікована документація для всіх експортів"
---

# Документація хуку useLocale

Хук `useLocale` дозволяє керувати поточною локаллю у вашому додатку на Solid. Він надає доступ до поточної локалі (як accessor), локалі за замовчуванням, списку доступних локалей та функції для оновлення локалі.

## Використання

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

## Опис

Хук повертає об'єкт з такими властивостями:

1. **locale**: Solid accessor (`() => string`), який повертає поточну локаль.
2. **defaultLocale**: локаль за замовчуванням, визначена у вашому `intlayer.config.ts`.
3. **availableLocales**: масив усіх локалей, які підтримуються вашим застосунком.
4. **setLocale**: функція для оновлення локалі застосунку. Також обробляє збереження (cookies/local storage), якщо це увімкнено.

## Параметри

- **props** (необов'язково):
  - **onLocaleChange**: Callback-функція, яка викликається щоразу, коли змінюється locale.
  - **isCookieEnabled**: Чи зберігати locale в cookie.
