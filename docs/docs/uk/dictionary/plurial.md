---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Множина
description: Дізнайтеся, як оголошувати та використовувати контент з урахуванням множини (на основі CLDR) на вашому багатомовному веб-сайті. Дотримуйтесь інструкцій у цій онлайн-документації, щоб налаштувати свій проект за кілька хвилин.
keywords:
  - Множина
  - Плюралізація
  - CLDR
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# Контент у множині / Множина в Intlayer

## Як працює множина

В Intlayer контент у множині реалізується за допомогою функції `plural`, яка зіставляє категорії множини CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, з відповідним контентом. Правильна категорія вибирається автоматично на основі активної локалі та значення лічильника за допомогою вбудованого в платформу API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

На відміну від [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md), який вибирає контент на основі числових діапазонів, визначених вами самостійно, `plural` делегує вибір правилам CLDR. Це робить його масштабованим для мов зі складними правилами множини, таких як українська, польська, арабська або валлійська, без необхідності вручну писати логіку по модулю.

## Коли використовувати `plural` проти `enu`

<Tabs group="framework">
  <Tab label="React" value="react">

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use plural content in Vue components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use plural content in Svelte components, retrieve it via the `useIntlayer` hook and call it with a count. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use plural content in Preact components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use plural content in SolidJS components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use plural content in Angular components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use plural content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// Initial render
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>

## Налаштування контенту у множині

Щоб налаштувати контент у множині у вашому проекті Intlayer, створіть модуль контенту, який використовує помічник `plural`. Категорія `other` є обов'язковою і використовується як резервний варіант, коли локаль не визначає більш конкретну категорію.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      uk: plural({
        one: "{{count}} вакансія",
        few: "{{count}} вакансії",
        many: "{{count}} вакансій",
        other: "{{count}} вакансій",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "uk": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} вакансія",
            "few": "{{count}} вакансії",
            "many": "{{count}} вакансій",
            "other": "{{count}} вакансій"
          }
        }
      }
    }
  }
}
```

> Підтримувані категорії: `zero`, `one`, `two`, `few`, `many`, `other`. Вам потрібно оголосити лише ті категорії, які використовує ваша цільова мова, Intlayer повертається до `other`, коли жодна конкретна категорія не підходить.
>
> Заповнювач `{{count}}` автоматично замінюється лічильником, який ви передаєте під час виконання. Ви також можете включити інші заповнювачі (див. [Спеціальні заповнювачі](#custom-placeholders) нижче).

## Використання контенту у множині з React Intlayer

Щоб використовувати контент у множині всередині компонента React, отримайте його за допомогою хука `useIntlayer` і викличте його з лічильником. Активна локаль і лічильник поєднуються для вибору відповідної категорії CLDR.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Англійською:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Ви можете викликати повернуту функцію двома еквівалентними способами:

```tsx
totalOpenings(21); // скорочення: лише лічильник
totalOpenings({ count: 21 }); // явна форма
```

## Спеціальні заповнювачі

Рядки у множині можуть включати заповнювачі, відмінні від `{{count}}`. Передайте їх у формі об'єкта разом із `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, у вас {{count}} нове повідомлення",
      few: "{{name}}, у вас {{count}} нові повідомлення",
      many: "{{name}}, у вас {{count}} нових повідомлень",
      other: "{{name}}, у вас {{count}} нових повідомлень",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, у вас 1 нове повідомлення"

summary({ count: 7, name: "Alice" });
// → "Alice, у вас 7 нових повідомлень"
```

## Категорії CLDR з першого погляду

Різні мови використовують різні підмножини категорій CLDR. Кілька поширених випадків:

| Мова                 | Використовувані категорії                    |
| -------------------- | -------------------------------------------- |
| Англійська (`en`)    | `one`, `other`                               |
| Французька (`fr`)    | `one`, `many`, `other`                       |
| Російська (`ru`)     | `one`, `few`, `many`, `other`                |
| Українська (`uk`)    | `one`, `few`, `many`, `other`                |
| Польська (`pl`)      | `one`, `few`, `many`, `other`                |
| Арабська (`ar`)      | `zero`, `one`, `two`, `few`, `many`, `other` |
| Японська / Китайська | лише `other`                                 |

Вам не потрібно це запам'ятовувати, оголошуйте категорії, для яких у вас є переклади, і Intlayer за потреби повернеться до `other`.

## Обмеження

На відміну від інших вузлів, вузол `plural` поки що не може бути вкладеним у дочірні вузли.

Приклад:

Дійсно:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Недійсно:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Додаткові ресурси

Для отримання більш детальної інформації про налаштування та використання зверніться до наступних ресурсів:

- [Документація по перерахуванню (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md)
- [Документація по вставці (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)
- [Документація по Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси пропонують додаткову інформацію про налаштування та використання Intlayer у різних середовищах та фреймворках.
