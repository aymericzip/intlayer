# Документация: Функция `getLocaleLang` в `intlayer`

## Описание

Функция `getLocaleLang` извлекает код языка из строки локали. Она поддерживает локали с кодами стран и без них. Если локаль не указана, по умолчанию возвращается пустая строка.

## Параметры

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), из которой извлекается код языка.
  - **Тип**: `Locales` (опционально)

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Код языка, извлеченный из локали. Если локаль не указана, возвращается пустая строка (`''`).

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
getLocaleLang(Locales.FRENCH); // Вывод: "fr"
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

  - Функция возвращает пустую строку, если `locale` имеет значение `undefined`.

- **Некорректные строки локали:**
  - Если `locale` не соответствует формату `language-country` (например, `Locales.ENGLISH-US`), функция безопасно возвращает часть до `'-'` или всю строку, если `'-'` отсутствует.

[Документация на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/ru/getLocaleLang.md)
