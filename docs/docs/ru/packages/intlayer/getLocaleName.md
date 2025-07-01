---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getLocaleName | intlayer
description: Узнайте, как использовать функцию getLocaleName для пакета intlayer
keywords:
  - getLocaleName
  - перевод
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
---

# Документация: функция `getLocaleName` в `intlayer`

## Описание

Функция `getLocaleName` возвращает локализованное название заданной локали (`targetLocale`) на языке отображения (`displayLocale`). Если `targetLocale` не указан, функция возвращает название `displayLocale` на его собственном языке.

## Параметры

- `displayLocale: Locales`

  - **Описание**: Локаль, на языке которой будет отображаться название целевой локали.
  - **Тип**: Enum или строка, представляющая допустимые локали.

- `targetLocale?: Locales`
  - **Описание**: Локаль, название которой нужно локализовать.
  - **Тип**: Необязательный параметр. Enum или строка, представляющая допустимые локали.

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Локализованное название `targetLocale` на языке `displayLocale`, или собственное название `displayLocale`, если `targetLocale` не указан. Если перевод не найден, возвращается `"Unknown locale"`.

## Пример использования

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Вывод: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вывод: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вывод: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вывод: "English"

getLocaleName(Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вывод: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вывод: "French"

getLocaleName(Locales.CHINESE); // Вывод: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вывод: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вывод: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вывод: "Chinese"

getLocaleName("unknown-locale"); // Вывод: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Вывод: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вывод: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вывод: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вывод: "English"

getLocaleName(Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вывод: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вывод: "French"

getLocaleName(Locales.CHINESE); // Вывод: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вывод: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вывод: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вывод: "Chinese"

getLocaleName("unknown-locale"); // Вывод: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Вывод: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Вывод: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Вывод: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Вывод: "English"

getLocaleName(Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Вывод: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Вывод: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Вывод: "French"

getLocaleName(Locales.CHINESE); // Вывод: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Вывод: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Вывод: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Вывод: "Chinese"

getLocaleName("unknown-locale"); // Вывод: "Unknown locale"
```

## Крайние случаи

- **Если `targetLocale` не указан:**
  - Функция по умолчанию возвращает собственное имя `displayLocale`.
- **Отсутствие переводов:**
  - Если `localeNameTranslations` не содержит записи для `targetLocale` или конкретного `displayLocale`, функция возвращает `ownLocalesName` или `"Unknown locale"`.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
