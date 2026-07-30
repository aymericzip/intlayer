---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Контент на основі вибору (Select)
description: Дізнайтеся, як використовувати контент на основі вибору в Intlayer для динамічного відображення контенту на основі довільного рядкового значення. Дотримуйтесь цієї документації, щоб ефективно реалізувати контент типу switch у вашому проєкті.
keywords:
  - Контент на основі вибору
  - Select Content
  - Switch контент
  - ICU select
  - Динамічний рендеринг
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Представлено контент на основі вибору"
author: aymericzip
---

# Контент на основі вибору (Select) / Intlayer

## Як працює Select

В Intlayer контент на основі вибору досягається за допомогою функції `select`, яка зіставляє довільні рядкові значення з відповідним їм контентом. Це еквівалентно повідомленню ICU `{value, select, …}`, або подібно до оператора `switch` у коді вашого застосунку.

Використовуйте `select`, коли дискримінантом (discriminant) є довільний рядок: статус (status), план (plan), платформа (platform) або роль (role). Для інших дискримінантів Intlayer надає спеціалізовані вузли:

| Дискримінант               | Вузол      |
| -------------------------- | ---------- |
| Кількість (Quantity)       | `enu()`    |
| Логічне значення (Boolean) | `cond()`   |
| Стать (Gender)             | `gender()` |
| Будь-який інший рядок      | `select()` |

## Налаштування контенту на основі вибору

Щоб налаштувати контент на основі вибору у вашому проєкті Intlayer, створіть модуль контенту, який містить ваші визначення вибору. Нижче наведено приклади у різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // необов'язково
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // необов'язково
      },
    },
  },
}
```

> Якщо `fallback` не оголошено, останній оголошений ключ розглядається як резервний (fallback), коли надане значення не збігається з жодним із оголошених випадків: точно так само, як у контрактах `cond()` та `gender()`.

### Безпека типів (Type Safety)

Прийманий аргумент виводиться з оголошених випадків:

- Без `fallback` приймаються лише оголошені випадки: помилка друку призведе до помилки типу (type error).
- З `fallback` приймається будь-який рядок (оскільки резервний варіант покриває невідповідні значення), тоді як оголошені випадки все ще забезпечують автодоповнення.

## Чому б не використовувати звичайний об'єкт?

Може виникнути спокуса оголосити звичайний об'єкт та індексувати його за допомогою значення під час виконання (runtime value):

```tsx
// ❌ Не робіть цього
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Компілятор Intlayer аналізує ваш вихідний код, щоб видалити контент, який не використовується, та мініфікувати ключі, що залишилися. Динамічно обчислюваний доступ (`obj[expr]`) не може бути дозволений статично, тому вся гілка буде позначена як непрозора (opaque): вона залишиться у збірці (bundle), а її ключі не будуть мініфіковані.

При використанні `select()` розв'язання випадку (case resolution) відбувається всередині виклику функції, а не як доступ до властивості. Компілятор бачить це як єдиний статичний доступ до поля і точно оптимізує вузол так само, як він це робить з `enu()`, `cond()` або `gender()`:

```tsx
// ✅ Робіть так
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Використання контенту на основі вибору

<Tabs group="framework">
  <Tab label="React" value="react">

Щоб використовувати контент на основі вибору в компоненті React, імпортуйте та використовуйте хук `useIntlayer` із пакета `react-intlayer`. Цей хук отримує контент для вказаного ключа і дозволяє передати значення для вибору відповідного виводу.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вивід: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Вивід: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Вивід: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Щоб використовувати контент на основі вибору в клієнтських компонентах Next.js (Client Components), отримуйте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Щоб використовувати контент на основі вибору в компонентах Vue, отримуйте його за допомогою хука `useIntlayer`. Ось приклад:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Щоб використовувати контент на основі вибору в компонентах Svelte, отримуйте його за допомогою хука `useIntlayer`. Доступ до сховища (store) здійснюється за допомогою `$`. Ось приклад:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Щоб використовувати контент на основі вибору в компонентах Preact, отримуйте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Щоб використовувати контент на основі вибору в компонентах SolidJS, отримуйте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Щоб використовувати контент на основі вибору в компонентах Angular, отримуйте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Щоб використовувати контент на основі вибору з `vanilla-intlayer`, отримуйте його за допомогою функції `useIntlayer`. Ось приклад:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Початковий рендеринг
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Комбінування Select з іншими вузлами

Оскільки кожен випадок (case) містить повний вузол контенту, `select` можна комбінувати з `t()`, `insert()`, `md()` тощо:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          uk: "{{name}} зберіг(ла) чернетку",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          uk: "{{name}} опублікував(ла) пост",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          uk: "{{name}} оновив(ла) пост",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Вивід: Alice зберіг(ла) чернетку
```

## Міграція з ICU `select`

Повідомлення, що використовують аргумент ICU `select`, імпортуються як вузол `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Стане:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Випадок `other` з ICU перейменовується на `fallback`, що є канонічною назвою в Intlayer для всіх резервних (catch-all) випадків. Другий аргумент записує ім'я змінної ICU, тому при експорті повідомлення трансформується назад у точно такий самий рядок ICU.

> Зверніть увагу: повідомлення ICU `select`, у яких випадками є значення статі (`male` / `female` / `other`), натомість імпортуються як вузол [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md).

## Додаткові ресурси

Для отримання більш детальної інформації щодо конфігурації та використання перегляньте такі ресурси:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документация Intlayer React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають подальшу інформацію щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
