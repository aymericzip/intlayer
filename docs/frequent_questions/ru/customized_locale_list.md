---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Как настроить список локалей?
description: Узнайте, как настроить список локалей.
keywords:
  - локали
  - список
  - intlayer
  - конфигурация
  - availableLocales
  - defaultLocale
  - useLocale
  - хук
  - локаль
  - список
slugs:
  - frequent-questions
  - customized-locale-list
---

# Можно ли заблокировать определённый язык, например английский? Я добавляю английский в свои словари, но пока не хочу, чтобы английский был доступен на сайте

Да, вы можете заблокировать определённый язык, например английский, используя опцию `availableLocales` в конфигурации Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

или

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Эта конфигурация изменит типы вашей функции `t()`, чтобы включать только доступные локали.

Опция availableLocales является необязательной, если вы её не укажете, будут доступны все локали.

Будьте внимательны, все локали, включённые в опцию `availableLocales`, должны быть включены в опцию `locales`.

Обратите внимание, что если вы используете хук `useLocale`, опция `availableLocales` будет использоваться для установки доступа к списку локалей.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
