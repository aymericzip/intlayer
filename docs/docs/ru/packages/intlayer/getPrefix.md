---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Документация функции getPrefix | intlayer
description: Узнайте, как использовать функцию getPrefix для пакета intlayer
keywords:
  - getPrefix
  - префикс
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Начальная документация
---

# Документация: функция `getPrefix` в `intlayer`

## Описание

Функция `getPrefix` определяет префикс URL для заданной локали на основе конфигурации режима маршрутизации. Она сравнивает локаль с локалью по умолчанию и возвращает объект, содержащий три различных формата префикса для гибкого построения URL.

**Основные особенности:**

- Принимает локаль в качестве первого параметра (обязательно)
- Необязательный объект `options` с параметрами `defaultLocale` и `mode`
- Возвращает объект с свойствами `prefix` и `localePrefix`
- Поддерживает все режимы маршрутизации: `prefix-no-default`, `prefix-all`, `no-prefix` и `search-params`
- Легковесная утилита для определения, когда добавлять префиксы локали

---

## Сигнатура функции

```typescript
getPrefix(
  locale: Locales,               // Обязательно
  options?: {                    // Необязательно
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // например, 'fr/' или ''
  localePrefix?: Locale; // например, 'fr' или undefined
}
```

---

## Параметры

- `locale: Locales`
  - **Описание**: Локаль, для которой необходимо сгенерировать префикс. Если значение ложно (undefined, null, пустая строка), функция возвращает пустую строку.
  - **Тип**: `Locales`
  - **Обязательно**: Да

- `options?: object`
  - **Описание**: Объект конфигурации для определения префикса.
  - **Тип**: `object`
  - **Обязательно**: Нет (необязательно)

  - `options.defaultLocale?: Locales`
    - **Описание**: Локаль по умолчанию для приложения. Если не указана, используется локаль по умолчанию, настроенная в конфигурации вашего проекта.
    - **Тип**: `Locales`
    - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Описание**: Режим маршрутизации URL для обработки локали. Если не указан, используется настроенный режим из конфигурации вашего проекта.
    - **Тип**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)
    - **Режимы**:
      - `prefix-no-default`: Возвращает пустые строки, когда локаль совпадает с локалью по умолчанию
      - `prefix-all`: Возвращает префикс для всех локалей, включая локаль по умолчанию
      - `no-prefix`: Возвращает пустые строки (без префикса в URL)
      - `search-params`: Возвращает пустые строки (локаль в параметрах запроса)

### Возвращает

- **Тип**: `GetPrefixResult`
- **Описание**: Объект, содержащий три различных формата префикса:
  - `prefix`: Префикс пути с завершающим слэшем (например, `'fr/'`, `''`)
  - `localePrefix`: Идентификатор локали без слэшей (например, `'fr'`, `undefined`)

---

## Пример использования

### Базовое использование

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Проверка префикса для английской локали
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Возвращает: { prefix: 'en/', localePrefix: 'en' }

// Проверка префикса для французской локали
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Возвращает: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Возвращает: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Возвращает: { prefix: '', localePrefix: undefined }
```

### Различные режимы маршрутизации

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Всегда возвращает префикс
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Возвращает: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Нет префикса, если локаль совпадает с локалью по умолчанию
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Возвращает: { prefix: '', localePrefix: undefined }

// prefix-no-default: Возвращает префикс, когда локаль отличается от локали по умолчанию
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Возвращает: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix и search-params: Никогда не возвращают префикс
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Возвращает: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Возвращает: { prefix: '', localePrefix: undefined }
```

### Практический пример

```typescript
import { getPrefix, Locales } from "intlayer";

// Формируем URL с соответствующим префиксом для конкретной локали
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Использование префикса для построения пути
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Результат: "/fr/about"

// Использование localePrefix для идентификации локали
console.log(`Текущая локаль: ${localePrefix}`);
// Вывод: "Текущая локаль: fr"
```

---

## Связанные функции

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md): Генерирует локализованный URL для конкретной локали
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getMultilingualUrls.md): Генерирует URL для всех настроенных локалей

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Префикс пути с завершающим слэшем (например, 'fr/' или '')
  localePrefix?: Locale; // Идентификатор локали без слэшей (например, 'fr' или undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
