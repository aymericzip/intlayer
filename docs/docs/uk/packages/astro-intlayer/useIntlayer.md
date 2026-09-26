---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація хука useIntlayer | astro-intlayer
description: Дізнайтеся, як використовувати хук useIntlayer у компонентах Astro та клієнтських скриптах для доступу до локалізованого вмісту.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація хука useIntlayer

Хук `useIntlayer` дозволяє отримувати локалізований вміст словника за ключем у додатках Astro.

Його можна викликати у двох різних контекстах за одним і тим самим шляхом імпорту:

1. **Сервер / Frontmatter**: Усередині файлів `.astro` він автоматично визначає вміст за допомогою локалі запиту, збереженої в `Astro.locals.intlayer`.
2. **Браузер / Клієнтський скрипт `<script>`**: Усередині клієнтських скриптів або компонентів UI-фреймворків він звертається до реалізації клієнтського сховища (`vanilla-intlayer`).

## Використання

### У Frontmatter компонента Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### У клієнтських блоках `<script>`

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Параметри

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Унікальний ключ словника (як визначено у ваших файлах декларацій `.content.ts`).
2. **`localeOrSelector`** (необов'язково): Конкретна локаль або об'єкт селектора (`{ item }`, `{ variant }`, додатково з `locale`). Якщо вказано, він перевизначає локаль, визначену з контексту запиту або клієнтського сховища.

## Опис

Хук виконує такі завдання:

1. **Визначення локалі**:
   - На сервері зчитує активну локаль з `Astro.locals.intlayer` через область `AsyncLocalStorage`, ініціалізовану `astro-intlayer/middleware`.
   - У браузері зчитує активну локаль зі сховища клієнта.
2. **Отримання словника**: Впроваджує вміст словника, що відповідає вказаному ключу.
3. **Обробка перекладу**: Перетворює переклади (`t()`), перерахування, умови та markdown у готовий до рендерингу вміст.

## Пов'язана документація

- [Інтеграція `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/intlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useDictionary.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useLocale.md)
