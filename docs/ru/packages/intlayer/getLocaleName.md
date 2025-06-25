---
docName: package__intlayer__getLocaleName
url: /doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции getLocaleName | intlayer
description: Узнайте, как использовать функцию getLocaleName для пакета intlayer
keywords:
  - getLocaleName
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getLocaleName` в `intlayer`

## Описание

Функция `getLocaleName` возвращает локализованное название указанной локали (`targetLocale`) на языке отображаемой локали (`displayLocale`). Если `targetLocale` не указана, возвращается название `displayLocale` на её собственном языке.

## Параметры

- `displayLocale: Locales`

  - **Описание**: Локаль, на языке которой будет отображаться название целевой локали.
  - **Тип**: Enum или строка, представляющая допустимые локали.

- `targetLocale?: Locales`
  - **Описание**: Локаль, название которой нужно локализовать.
  - **Тип**: Необязательный. Enum или строка, представляющая допустимые локали.

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Локализованное название `targetLocale` на языке `displayLocale`, или собственное название `displayLocale`, если `targetLocale` не указана. Если перевод не найден, возвращается `"Unknown locale"`.

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

## Граничные случаи

- **`targetLocale` не указана:**
  - Функция по умолчанию возвращает собственное название `displayLocale`.
- **Отсутствие переводов:**
  - Если в `localeNameTranslations` отсутствует запись для `targetLocale` или конкретной `displayLocale`, функция возвращает `ownLocalesName` или `"Unknown locale"`.
