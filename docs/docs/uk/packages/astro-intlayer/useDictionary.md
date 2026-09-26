---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація хука useDictionary | astro-intlayer
description: Дізнайтеся, як використовувати хук useDictionary у компонентах і скриптах Astro для обробки об'єктів словників.
keywords:
  - useDictionary
  - словник
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація хука useDictionary

Хук `useDictionary` обробляє імпортований або визначений безпосередньо в коді об'єкт словника та повертає його вміст для поточної локалі в додатках Astro.

На відміну від `useIntlayer`, який отримує словники за ключем із глобального реєстру словників, `useDictionary` працює безпосередньо з об'єктом словника.

## Використання

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Ви також можете передавати вбудовані словники, визначені за допомогою `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      uk: "Усі права захищені.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Параметри

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Об'єкт словника або кваліфікована група словників.
2. **`localeOrSelector`** (необов'язково): Конкретна локаль або об'єкт селектора (`{ item }`, `{ variant }`, додатково з `locale`).

## Опис

Хук виконує такі завдання:

1. **Визначення локалі**: На сервері отримує локаль з `Astro.locals.intlayer`. У браузері використовує локаль клієнтського сховища.
2. **Обробка вмісту**: Перетворює переклади (`t()`), перерахування, умови та вкладені структури відповідно до визначеної локалі.
3. **Селектори**: Застосовує будь-які селектори елементів або варіантів, передані в аргументах.

## Пов'язана документація

- [Інтеграція `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useLocale.md)
