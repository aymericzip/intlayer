---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getLocaleLang | intlayer
description: Узнайте, как использовать функцию getLocaleLang в пакете intlayer
keywords:
  - getLocaleLang
  - перевод
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# Документация: функция `getLocaleLang` в `intlayer`

## Описание

Функция `getLocaleLang` извлекает код языка из строки локали. Она поддерживает локали как с кодами стран, так и без них. Если локаль не указана, по умолчанию возвращается пустая строка.

## Параметры

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), из которой извлекается код языка.
  - **Тип**: `Locales` (необязательно)

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Код языка, извлечённый из локали. Если локаль не указана, возвращается пустая строка (`''`).

## Пример использования

### Извлечение кодов языков:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вывод: "en"
getLocaleLang(Locales.ENGLISH); // Вывод: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вывод: "fr"
getLocaleLang(Locales.FRENCH); // Вывод: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вывод: "en"
getLocaleLang(Locales.ENGLISH); // Вывод: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вывод: "fr"
getLocaleLang(Locales.FRENCH); // Вывод: "фр"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вывод: "en"
getLocaleLang(Locales.ENGLISH); // Вывод: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вывод: "fr"
getLocaleLang(Locales.FRENCH); // Вывод: "fr"
```

## Особые случаи

- **Локаль не указана:**

  - Функция возвращает пустую строку, если `locale` равно `undefined`.

- **Некорректные строки локали:**
  - Если `locale` не соответствует формату `язык-страна` (например, `Locales.ENGLISH-US`), функция безопасно возвращает часть до `'-'` или всю строку, если `'-'` отсутствует.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
