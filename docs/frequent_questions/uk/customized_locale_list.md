---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Як налаштувати список локалей?
description: Дізнайтеся, як налаштувати список локалей.
keywords:
  - локалі
  - список
  - intlayer
  - конфігурація
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - локаль
  - список
slugs:
  - frequent-questions
  - customized-locale-list
---

# Чи можна заблокувати певну мову, наприклад англійську? Я додаю англійську у свої словники, але поки не хочу, щоб англійська була доступна на сайті

Так, ви можете заблокувати певну мову, наприклад англійську, використавши опцію `availableLocales` у конфігурації Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

або

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Ця конфігурація змінить типи вашої функції `t()` так, щоб вони включали лише доступні локалі.

Опція availableLocales є необов'язковою — якщо ви її не вкажете, будуть доступні всі локалі.

Увага: усі локалі, включені в опцію `availableLocales`, повинні бути також включені в опцію `locales`.

Зауважте, що якщо ви використовуєте хук `useLocale`, опція `availableLocales` буде використана для встановлення доступу до списку локалей.

```ts
import { useLocale } from "react-intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // Виведе: [Locales.FRENCH, Locales.SPANISH]
```
