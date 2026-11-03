---
createdAt: 2026-05-04
updatedAt: 2026-11-03
priority: 8
title: "תוכן רבים: כללי ריבוי של CLDR"
description: "הצהר על צורות רבים מותאמות שפה ב-Intlayer עם קטגוריות CLDR (zero, one, two, few, many, other) המפוענחות מספירה בזמן ריצה."
keywords:
  - רבים
  - ריבוי
  - CLDR
  - בינאום
  - תיעוד
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
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוכן רבים / Plural ב-Intlayer

## כיצד Plural עובד

ב-Intlayer, תוכן רבים מושג באמצעות הפונקציה `plural`, הממפה קטגוריות ריבוי של CLDR (`zero`, `one`, `two`, `few`, `many`, `other`) לתוכן המתאים להן. הקטגוריה הנכונה נבחרת אוטומטית על פי השפה הפעילה וערך הספירה (count), באמצעות ממשק ה-API המובנה של הפלטפורמה [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

בניגוד ל-[`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md), אשר בוחר תוכן על בסיס טווחים מספריים שאתה מגדיר בעצמך, `plural` מאציל את הבחירה לכללי ה-CLDR. זה מה שמאפשר לו להתרחב לשפות בעלות כללי ריבוי מורכבים (כגון רוסית, פולנית, ערבית או עברית), מבלי שתצטרך לכתוב ידנית לוגיקת מודולו.

- [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md)

## מתי להשתמש ב-`plural` לעומת `enu`

| תרחיש שימוש                                                       | פונקציית עזר |
| :---------------------------------------------------------------- | :----------- |
| צורות רבים דקדוקיות מותאמות שפה (תפוח אחד / שני תפוחים / 5 яблок) | `plural`     |
| טווחים מספריים מותאמים אישית (`<5`, `>=10`) או קבוצות שאינן CLDR  | `enu`        |

אם קהל היעד שלך הוא אנגלית בלבד (שבה יש רק `one` / `other`), שתיהן יעבדו. עבור כל שפה הכוללת הבחנות בין `few` / `many` / `two`, העדף את `plural`.

## הגדרת תוכן רבים

כדי להגדיר תוכן רבים בפרויקט Intlayer שלך, צור מודול תוכן המשתמש בפונקציית העזר `plural`. קטגוריית `other` היא שדה חובה ומשמשת כ-fallback כאשר שפה אינה מגדירה קטגוריה ספציפית יותר.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      he: plural({
        one: "משרה {{count}}",
        two: "שתי משרות",
        other: "{{count}} משרות",
      }),
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ru: plural({
        one: "{{count}} вакансия",
        few: "{{count}} вакансии",
        many: "{{count}} вакансий",
        other: "{{count}} вакансий",
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
        "he": {
          "nodeType": "plural",
          "plural": {
            "one": "משרה {{count}}",
            "two": "שתי משרות",
            "other": "{{count}} משרות"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ru": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} вакансия",
            "few": "{{count}} вакансии",
            "many": "{{count}} вакансий",
            "other": "{{count}} вакансий"
          }
        }
      }
    }
  }
}
```

> הקטגוריות הנתמכות הן `zero`, `one`, `two`, `few`, `many`, `other`. עליך להצהיר רק על הקטגוריות ששפת היעד שלך משתמשת בהן; Intlayer יחזור ל-`other` כאשר אף קטגוריה ספציפית אינה תואמת.
>
> מציין המקום `{{count}}` מוחלף אוטומטית בספירה שהעברת בזמן ריצה. ניתן לכלול גם מצייני מקום אחרים (ראה [מצייני מקום מותאמים אישית](#מצייני-מקום-מותאמים-אישית) להלן).

## שימוש בתוכן רבים

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן רבים בתוך רכיב React, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה (count). השפה הפעילה והספירה משולבות כדי לבחור את קטגוריית ה-CLDR התואמת.

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

כדי להשתמש בתוכן רבים ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה:

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

כדי להשתמש בתוכן רבים ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer` וקרא לו עם ספירה:

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

כדי להשתמש בתוכן רבים ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה. הגישה ל-store מתבצעת עם `$`:

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

כדי להשתמש בתוכן רבים ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה:

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

כדי להשתמש בתוכן רבים ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה:

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

כדי להשתמש בתוכן רבים ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה:

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

כדי להשתמש בתוכן רבים עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer` וקרא לו עם ספירה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// רינדור ראשוני
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>

## מצייני מקום מותאמים אישית

מחרוזות ריבוי יכולות לכלול מצייני מקום נוספים מלבד `{{count}}`. העבר אותם בצורת אובייקט לצד `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, you have {{count}} new message",
      other: "{{name}}, you have {{count}} new messages",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, you have 1 new message"

summary({ count: 7, name: "Alice" });
// → "Alice, you have 7 new messages"
```

## קטגוריות CLDR במבט חטוף

שפות שונות משתמשות בתת-קבוצות שונות של קטגוריות ה-CLDR. מספר דוגמאות נפוצות:

| שפה           | קטגוריות בשימוש                              |
| :------------ | :------------------------------------------- |
| אנגלית (`en`) | `one`, `other`                               |
| צרפתית (`fr`) | `one`, `many`, `other`                       |
| רוסית (`ru`)  | `one`, `few`, `many`, `other`                |
| פולנית (`pl`) | `one`, `few`, `many`, `other`                |
| ערבית (`ar`)  | `zero`, `one`, `two`, `few`, `many`, `other` |
| עברית (`he`)  | `one`, `two`, `many`, `other`                |
| יפנית / סינית | `other` בלבד                                 |

אינך צריך לשנן זאת, הצהר על הקטגוריות שיש לך תרגומים עבורן, ו-Intlayer ייסוג ל-`other` בעת הצורך.

## מגבלה

בהשוואה לצמתים אחרים, לא ניתן לקנן צומת `plural` בתוך צמתים ילדים כרגע.

דוגמה:

תקין (Valid):

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

לא תקין (Invalid):

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

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md)
- [תיעוד Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_15.md)

משאבים אלה מספקים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
