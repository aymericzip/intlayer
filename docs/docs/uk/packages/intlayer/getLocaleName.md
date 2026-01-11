---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції getLocaleName | intlayer
description: Дивіться, як використовувати функцію getLocaleName у пакеті intlayer
keywords:
  - getLocaleName
  - локалізація
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Додано поліфіли для React Native та старіших середовищ
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getLocaleName` у `intlayer`

## Опис

Функція `getLocaleName` повертає локалізовану назву заданої локалі (`targetLocale`) мовою відображення (`displayLocale`). Якщо `targetLocale` не вказано, вона повертає назву `displayLocale` його власною мовою.

## Параметри

- `displayLocale: Locales`
  - **Опис**: Локаль, якою буде відображено назву цільової локалі.
  - **Тип**: Enum або рядок, що представляє допустимі локалі.

- `targetLocale?: Locales`
  - **Опис**: Локаль, назву якої потрібно локалізувати.
  - **Тип**: Необов'язковий. Enum або рядок, що представляє допустимі локалі.

## Повертає

- **Тип**: `string`
- **Опис**: Локалізована назва `targetLocale` мовою `displayLocale`, або власна назва `displayLocale`, якщо `targetLocale` не вказано. Якщо переклад не знайдено, функція повертає "Unknown locale".

## Приклад використання

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Вивід: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вивід: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вивід: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вивід: "English"

getLocaleName(Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вивід: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вивід: "French"

getLocaleName(Locales.CHINESE); // Вивід: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вивід: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вивід: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вивід: "Chinese"

getLocaleName("unknown-locale"); // Вивід: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Вивід: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вивід: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вивід: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вивід: "English"

getLocaleName(Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вивід: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вивід: "French"

getLocaleName(Locales.CHINESE); // Вивід: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вивід: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вивід: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вивід: "Chinese"

getLocaleName("unknown-locale"); // Вивід: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Вивід: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вивід: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вивід: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вивід: "English"

getLocaleName(Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вивід: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вивід: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вивід: "French"

getLocaleName(Locales.CHINESE); // Вивід: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вивід: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вивід: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вивід: "Chinese"

getLocaleName("unknown-locale"); // Вивід: "Unknown locale"
```

## Крайні випадки

- **Не вказано `targetLocale`:**
  - Функція за замовчуванням повертає власну назву `displayLocale`.
- **Відсутні переклади:**
  - Якщо `localeNameTranslations` не містить запису для `targetLocale` або конкретного `displayLocale`, функція використовує `ownLocalesName` або повертає `"Unknown locale"`.

## Поліфіли для React Native та старіших середовищ

Функція `getLocaleName` покладається на API `Intl.DisplayNames`, який недоступний у React Native або старіших JavaScript-середовищах. Якщо ви використовуєте `getLocaleName` у таких середовищах, потрібно додати поліфіли.

Імпортуйте поліфіли на початку вашого застосунку, бажано в точці входу (наприклад, `index.js`, `App.tsx`, або `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Для детальнішої інформації див. [документацію поліфілів FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
