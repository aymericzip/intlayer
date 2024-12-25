# Документация: Функция `getLocaleName` в `intlayer`

## Описание:

Функция `getLocaleName` возвращает локализованное имя указанной локали (`targetLocale`) в локали отображения (`displayLocale`). Если `targetLocale` не предоставлена, она возвращает имя `displayLocale` на ее собственном языке.

## Параметры:

- `displayLocale: Locales`

  - **Описание**: Локаль, в которой будет отображено имя целевой локали.
  - **Тип**: Перечисление или строка, представляющая допустимые локали.

- `targetLocale?: Locales`
  - **Описание**: Локаль, имя которой должно быть локализовано.
  - **Тип**: Необязательный. Перечисление или строка, представляющая допустимые локали.

## Возвращает:

- **Тип**: `string`
- **Описание**: Локализованное имя `targetLocale` в `displayLocale`, или собственное имя `displayLocale`, если `targetLocale` не предоставлена. Если перевод не найден, возвращает `"Неизвестная локаль"`.

## Пример использования:

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

getLocaleName("unknown-locale"); // Вывод: "Неизвестная локаль"
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

getLocaleName("unknown-locale"); // Вывод: "Неизвестная локаль"
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

getLocaleName("unknown-locale"); // Вывод: "Неизвестная локаль"
```

## Пограничные случаи:

- **Не предоставлена `targetLocale`:**
  - Функция по умолчанию возвращает собственное имя `displayLocale`.
- **Отсутствуют переводы:**
  - Если `localeNameTranslations` не содержит записи для `targetLocale` или конкретного `displayLocale`, функция возвращает `ownLocalesName` или `"Неизвестная локаль"`.
