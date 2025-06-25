---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции getHTMLTextDir | intlayer
description: Узнайте, как использовать функцию getHTMLTextDir для пакета intlayer
keywords:
  - getHTMLTextDir
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getHTMLTextDir` в `intlayer`

## Описание

Функция `getHTMLTextDir` определяет направление текста (`ltr`, `rtl` или `auto`) на основе предоставленной локали. Она предназначена для помощи разработчикам в установке атрибута `dir` в HTML для корректного отображения текста.

## Параметры

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH`, `Locales.ARABIC`), используемая для определения направления текста.
  - **Тип**: `Locales` (опционально)

## Возвращаемое значение

- **Тип**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Описание**: Направление текста, соответствующее локали:
  - `'ltr'` для языков с направлением текста слева направо.
  - `'rtl'` для языков с направлением текста справа налево.
  - `'auto'`, если локаль не распознана.

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

## Граничные случаи

- **Локаль не указана:**

  - Функция возвращает `'auto'`, если `locale` имеет значение `undefined`.

- **Нераспознанная локаль:**
  - Для нераспознанных локалей функция по умолчанию возвращает `'auto'`.

## Использование в компонентах:

Функция `getHTMLTextDir` может быть использована для динамического задания атрибута `dir` в HTML-документе для корректного отображения текста на основе локали.

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

В приведенном выше примере атрибут `dir` задается динамически на основе локали.
