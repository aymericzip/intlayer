# Документация: `getLocaleName` Функция в `intlayer`

## Описание:

Функция `getLocaleName` возвращает локализованное название данного локаля (`targetLocale`) на языке отображения (`displayLocale`). Если `targetLocale` не указан, она возвращает название `displayLocale` на его собственном языке.

## Параметры:

- `displayLocale: Locales`

  - **Описание**: Локаль, в которой будет отображаться название целевого локаля.
  - **Тип**: Enum или строка, представляющая допустимые локали.

- `targetLocale?: Locales`
  - **Описание**: Локаль, название которой должно быть локализовано.
  - **Тип**: Необязательно. Enum или строка, представляющая допустимые локали.

## Возвращает:

- **Тип**: `string`
- **Описание**: Локализованное название `targetLocale` на `displayLocale`, или собственное название `displayLocale`, если `targetLocale` не указан. Если перевод не найден, возвращает `"Неизвестный локаль"`.

## Пример использования:

```typescript
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

getLocaleName("unknown-locale"); // Вывод: "Неизвестный локаль"
```

## Пограничные случаи:

- **`targetLocale` не указан:**
  - Функция по умолчанию возвращает собственное название `displayLocale`.
- **Отсутствие переводов:**
  - Если `localeNameTranslations` не содержит записи для `targetLocale` или конкретного `displayLocale`, функция возвращает `ownLocalesName` или `"Неизвестный локаль"`.
