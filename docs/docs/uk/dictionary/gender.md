---
createdAt: 2025-07-27
updatedAt: 2026-10-08
priority: 8
title: "Контент залежно від статі в Intlayer"
description: "Адаптуйте повідомлення до статі читача за допомогою вузла gender() в Intlayer: чоловічий, жіночий і типовий варіанти в одному місці."
keywords:
  - Гендерно-орієнтований контент
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "Додано підтримку гендерно-залежного контенту"
author: aymericzip
---

# Гендерно-орієнтований контент / Гендер в Intlayer

## Як працює гендерна логіка

Щоб використовувати контент з урахуванням статі у клієнтських компонентах Next.js, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

## Налаштування контенту, залежного від гендера

Щоб налаштувати контент залежно від гендера у вашому проекті Intlayer, створіть модуль контенту, який містить ваші визначення для конкретних гендерів. Нижче наведені приклади в різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "мій контент для чоловіків",
      female: "мій контент для жінок",
      fallback: "мій контент, коли стать не вказана", // Необов'язково
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "мій контент для чоловіків",
        "female": "мій контент для жінок",
        "fallback": "мій контент, коли стать не вказана", // Необов'язково
      },
    },
  },
}
```

> Якщо не вказано fallback, останній оголошений ключ буде використано як fallback, якщо стать не вказана або не відповідає жодній визначеній статі.

## Використання контенту за гендером у React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Щоб використовувати контент з урахуванням статі у компоненті React, імпортуйте та застосовуйте хук `useIntlayer` із пакета `react-intlayer`. Цей хук отримує контент за вказаним ключем і дозволяє передати стать для вибору відповідного виводу.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Щоб використовувати контент з урахуванням статі у клієнтських компонентах Next.js, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Щоб використовувати контент з урахуванням статі у компонентах Vue, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Щоб використовувати контент з урахуванням статі у компонентах Svelte, отримайте його за допомогою хука `useIntlayer`. Доступ до сховища здійснюється через `$`. Ось приклад:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Щоб використовувати контент з урахуванням статі у компонентах Preact, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Щоб використовувати контент з урахуванням статі у компонентах SolidJS, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Щоб використовувати контент з урахуванням статі у компонентах Angular, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Щоб використовувати контент з урахуванням статі із `vanilla-intlayer`, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// Initial render
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## Додаткові ресурси

Для детальнішої інформації щодо налаштування та використання зверніться до таких ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткові відомості щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
