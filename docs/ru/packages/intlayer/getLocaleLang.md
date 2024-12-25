# Документация: Функция `getLocaleLang` в `intlayer`

## Описание:

Функция `getLocaleLang` извлекает код языка из строки локали. Она поддерживает локали с или без кодов стран. Если локаль не задана, по умолчанию возвращается пустая строка.

## Параметры:

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), из которой извлекается код языка.
  - **Тип**: `Locales` (необязательный)

## Возвращает:

- **Тип**: `string`
- **Описание**: Код языка, извлеченный из локали. Если локаль не предоставлена, возвращается пустая строка (`''`).

## Пример использования:

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

## Граничные случаи:

- **Не указана локаль:**

  - Функция возвращает пустую строку, когда `locale` равен `undefined`.

- **Неверные строки локалей:**
  - Если `locale` не соответствует формату `language-country` (например, `Locales.ENGLISH-US`), функция безопасно возвращает часть до `'-'` или всю строку, если `'-'` отсутствует.
