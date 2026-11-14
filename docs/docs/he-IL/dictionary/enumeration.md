---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 8
title: "תוכן Enumeration: הודעות מבוססות כמות"
description: "השתמש ב-enumerations של Intlayer כדי להציג תוכן שונה בהתאם למספר או טווח, באמצעות הצומת enu() ותנאים כגון '<-1' או '>5'."
keywords:
  - Enumeration
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
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
youtubeVideo: https://www.youtube.com/watch?v=7VtLdbtV1us&t=2357s
---

# Enumeration / ריבוי

<iframe title="הכול על i18n: המדריך המלא לבינאום ווב" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/7VtLdbtV1us?autoplay=0&amp;start=2357&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## כיצד Enumeration עובד

ב-Intlayer, enumeration מושג באמצעות הפונקציה `enu`, אשר ממפה מפתחות ספציפיים לתוכן המתאים להם. מפתחות אלה יכולים לייצג ערכים מספריים, טווחים או מזהים מותאמים אישית. בעת שימוש עם React Intlayer או Next Intlayer, התוכן המתאים נבחר אוטומטית על פי שפת האפליקציה והכללים שהוגדרו.

## הגדרת Enumeration

כדי להגדיר enumeration בפרויקט Intlayer שלך, עליך ליצור מודול תוכן הכולל הגדרות enumeration. להלן דוגמה ל-enumeration פשוט עבור מספר מכוניות:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
      fallback: "Fallback value", // אופציונלי
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
        "fallback": "Fallback value" // אופציונלי
      }
    }
  }
}
```

בדוגמה זו, `enu` ממפה תנאים שונים לתוכן ספציפי. כאשר משתמשים בו ברכיב React, ‏Intlayer יכול לבחור אוטומטית את התוכן המתאים בהתבסס על המשתנה הנתון.

> סדר ההצהרה חשוב ב-enumerations של Intlayer. ההצהרה התקפה הראשונה היא זו שתיבחר. אם חלים מספר תנאים, ודא שהם מסודרים כראוי כדי למנוע התנהגות בלתי צפויה.

> אם לא הוגדר fallback, הפונקציה תחזיר `undefined` אם אף מפתח אינו תואם.

## שימוש ב-Enumeration

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש ב-enumeration ברכיב React, תוכל להשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. ה-hook שולף את התוכן הנכון על פי המזהה שצוין. להלן דוגמה לשימוש בו:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // פלט: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // פלט: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // פלט: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // פלט: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש ב-enumeration ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש ב-enumeration ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש ב-enumeration ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש ב-enumeration ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש ב-enumeration ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש ב-enumeration ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש ב-enumeration עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// רינדור ראשוני
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## שילוב Enumeration עם Insert עבור מספרים סידוריים

תרחיש שימוש נפוץ הוא הצגת מספרים סידוריים (1st, 2nd, 3rd וכו'). ניתן לשלב את `enu` עם `insert` כדי ליצור תוכן סידורי דינמי:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, insert, type Dictionary } from "intlayer";

const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
} satisfies Dictionary;

export default rankingContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "ranking_component",
  "content": {
    "ordinal": {
      "nodeType": "enumeration",
      "enumeration": {
        "1": {
          "nodeType": "insertion",
          "insertion": "{{count}}st place"
        },
        "2": {
          "nodeType": "insertion",
          "insertion": "{{count}}nd place"
        },
        "3": {
          "nodeType": "insertion",
          "insertion": "{{count}}rd place"
        },
        "fallback": {
          "nodeType": "insertion",
          "insertion": "{{count}}th place"
        }
      }
    }
  }
}
```

### שימוש ב-Ordinal Enumeration

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בכך ברכיב React, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // קבלת הספרה האחרונה כדי לקבוע את הסיומת הנכונה
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // למשל, "5th place" עבור count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בכך ב-Client Components של Next.js, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בכך ברכיבי Vue, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בכך ברכיבי Svelte, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בכך ברכיבי Preact, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בכך ברכיבי SolidJS, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בכך ברכיבי Angular, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בכך עם `vanilla-intlayer`, קרא ל-enumeration עם הספרה האחרונה של המספר כדי לקבל את הסיומת הנכונה, ולאחר מכן העבר את הספירה המלאה כערך ה-insertion:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## משאבים נוספים

למידע מפורט יותר על הגדרות ושימוש, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_15.md)

משאבים אלה מספקים תובנות נוספות לגבי ההגדרה והשימוש ב-Intlayer בסביבות ובפריימוורקים שונים.
