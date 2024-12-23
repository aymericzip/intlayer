# Документация: `getLocaleLang` Функция в `intlayer`

## Описание:

Функция `getLocaleLang` извлекает код языка из строки локали. Она поддерживает локали с кодами стран или без них. Если локаль не предоставлена, по умолчанию возвращается пустая строка.

## Параметры:

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), из которой извлекается код языка.
  - **Тип**: `Locales` (необязательно)

## Возвращает:

- **Тип**: `string`
- **Описание**: Код языка, извлеченный из локали. Если локаль не предоставлена, возвращает пустую строку (`''`).

## Пример Использования:

### Извлечение Кодами Языков:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вывод: "en"
getLocaleLang(Locales.ENGLISH); // Вывод: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вывод: "fr"
getLocaleLang(Locales.FRENCH); // Вывод: "fr"
```

## Граничные Случаи:

- **Локаль Не Предоставлена:**

  - Функция возвращает пустую строку, когда `locale` равно `undefined`.

- **Неправильные Строки Локали:**
  - Если `locale` не соответствует формату `язык-страна` (например, `Locales.ENGLISH-US`), функция безопасно возвращает часть перед `'-'` или всю строку, если `'-'` отсутствует.
