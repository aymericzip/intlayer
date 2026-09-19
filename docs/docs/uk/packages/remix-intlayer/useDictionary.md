---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документація хука useDictionary | remix-intlayer
description: Дізнайтеся, як використовувати хук useDictionary у додатках Remix 3 для отримання вмісту об'єктів словників для поточної локалі запиту.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація хука useDictionary"
author: aymericzip
---

# Документація хука useDictionary

Хук `useDictionary` перетворює імпортований або вбудований об'єкт словника та повертає його вміст, визначений для локалі поточного запиту в додатках Remix 3.

На відміну від `useIntlayer`, який шукає словники за рядковим ключем із глобального реєстру словників, `useDictionary` приймає безпосередньо об'єкт словника.

## Використання

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Ви також можете передавати вбудовані словники, визначені за допомогою `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        uk: "Усі права захищені.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Параметри

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Об'єкт словника або кваліфікована група словників.
2. **`localeOrSelector`** (необов'язково): Конкретна локаль або об'єкт селектора (`{ item }`, `{ variant }`, необов'язково з `locale`). Має пріоритет над локаллю запиту, якщо вказано.

## Опис

Хук виконує такі завдання:

1. **Визначення локалі**: Зчитує активну локаль запиту зі сховища `AsyncLocalStorage`, створеного middleware `intlayer()`.
2. **Розв'язання вмісту**: Оцінює переклади (`t()`), перелічення, умови та вкладені структури відповідно до визначеної локалі.
3. **Обробка селекторів**: Застосовує будь-які селектори елементів або варіантів, указані в аргументах.

## Пов'язана документація

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
