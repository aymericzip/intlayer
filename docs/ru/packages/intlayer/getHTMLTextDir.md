# Документация: `getHTMLTextDir` Функция в `intlayer`

## Описание:

Функция `getHTMLTextDir` определяет направление текста (`ltr`, `rtl` или `auto`) на основе предоставленной локали. Она предназначена для помощи разработчикам в установке атрибута `dir` в HTML для правильного отображения текста.

## Параметры:

- `locale?: Locales`

  - **Описание**: Строка локали (например, `Locales.ENGLISH`, `Locales.ARABIC`), используемая для определения направления текста.
  - **Тип**: `Locales` (необязательный)

## Возвращает:

- **Тип**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Описание**: Направление текста, соответствующее локали:
  - `'ltr'` для языков слева направо.
  - `'rtl'` для языков справа налево.
  - `'auto'` если локаль не распознана.

## Пример Использования:

### Определение Направления Текста:

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

## Граничные Случаи:

- **Локаль Не Предоставлена:**

  - Функция возвращает `'auto'`, когда `locale` равно `undefined`.

- **Нераспознанная Локаль:**
  - Для нераспознанных локалей функция по умолчанию возвращает `'auto'`.

## Использование в Компонентах:

Функция `getHTMLTextDir` может быть использована для динамической установки атрибута `dir` в HTML-документе для правильного отображения текста на основе локали.

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

В указанном примере атрибут `dir` динамически устанавливается в зависимости от локали.
