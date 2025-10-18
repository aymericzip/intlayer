---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getHTMLTextDir | intlayer
description: Узнайте, как использовать функцию getHTMLTextDir для пакета intlayer
keywords:
  - getHTMLTextDir
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
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Документация: функция `getHTMLTextDir` в `intlayer`

## Описание

Функция `getHTMLTextDir` определяет направление текста (`ltr`, `rtl` или `auto`) на основе переданного локали. Она предназначена для помощи разработчикам в установке атрибута `dir` в HTML для правильного отображения текста.

## Параметры

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH`, `Locales.ARABIC`), используемая для определения направления текста.
  - **Тип**: `Locales` (необязательно)

## Возвращаемое значение

- **Тип**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Описание**: Направление текста, соответствующее локали:
  - `'ltr'` для языков с направлением слева направо.
  - `'rtl'` для языков с направлением справа налево.
  - `'auto'` если локаль не распознана.

## Пример использования

### Определение направления текста

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Вывод: "ltr"
getHTMLTextDir(Locales.FRENCH); // Вывод: "ltr"
getHTMLTextDir(Locales.ARABIC); // Вывод: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Вывод: "ltr"
getHTMLTextDir(Locales.FRENCH); // Вывод: "ltr"
getHTMLTextDir(Locales.ARABIC); // Вывод: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Вывод: "ltr"
getHTMLTextDir(Locales.FRENCH); // Вывод: "ltr"
getHTMLTextDir(Locales.ARABIC); // Вывод: "rtl"
```

## Особые случаи

- **Локаль не указана:**

  - Функция возвращает `'auto'`, если `locale` равен `undefined`.

- **Неизвестная локаль:**
  - Для нераспознанных локалей функция по умолчанию возвращает `'auto'`.

## Использование в компонентах:

Функция `getHTMLTextDir` может использоваться для динамической установки атрибута `dir` в HTML-документе для правильного отображения текста в зависимости от локали.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

В приведённом выше примере атрибут `dir` динамически устанавливается в зависимости от локали.
