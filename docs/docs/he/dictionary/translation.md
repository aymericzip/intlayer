---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 8
title: "תוכן תרגום: הפונקציה t()"
description: "הצהר על תרגומים לכל שפה באמצעות הפונקציה t() של Intlayer, עם בדיקת טיפוסים המתריעה על שפות חסרות בזמן בנייה."
keywords:
  - תרגום
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
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום (Translation)

## הגדרת תרגומים

הפונקציה `t` ב-`intlayer` מאפשרת לך להצהיר על תוכן במספר שפות. פונקציה זו מבטיחה בטיחות טיפוסים (type safety), ומציגה שגיאה אם חסרים תרגומים כלשהם, מה ששימושי במיוחד בסביבות TypeScript.

להלן דוגמה כיצד להצהיר על תוכן עם תרגומים:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      he: "ברוכים הבאים לאפליקציה שלנו",
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "he": "ברוכים הבאים לאפליקציה שלנו",
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## קונפיגורציה עבור שפות (Locales)

כדי להבטיח טיפול תקין בתרגומים, תוכל להגדיר את השפות המקובלות ב-`intlayer.config.ts`. קונפיגורציה זו מאפשרת לך להגדיר את השפות שבהן האפליקציה שלך תומכת:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HEBREW],
  },
};

export default config;
```

## שימוש בתרגומים

<Tabs group="framework">
  <Tab label="React" value="react">

באמצעות `react-intlayer`, תוכל להשתמש בתרגומים ברכיבי React. הנה דוגמה:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

רכיב זה שולף את התרגום המתאים בהתבסס על השפה הנוכחית המוגדרת באפליקציה שלך.

  </Tab>
  <Tab label="Next.js" value="nextjs">

באמצעות `next-intlayer`, תוכל להשתמש בתרגומים ב-React Server Components או ב-Client Components. הנה דוגמה ב-Client Component:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

באמצעות `vue-intlayer`, תוכל להשתמש בתרגומים ברכיבי Vue. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("multi_lang");
</script>

<template>
  <div>
    <p>{{ content.welcomeMessage }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

באמצעות `svelte-intlayer`, תוכל להשתמש בתרגומים ברכיבי Svelte. ה-hook מחזיר store של Svelte. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("multi_lang");
</script>

<div>
  <p>{$content.welcomeMessage}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

באמצעות `preact-intlayer`, תוכל להשתמש בתרגומים ברכיבי Preact. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

באמצעות `solid-intlayer`, תוכל להשתמש בתרגומים ברכיבי SolidJS. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const MyComponent: Component = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

באמצעות `angular-intlayer`, תוכל להשתמש בתרגומים ברכיבי Angular. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  template: `
    <div>
      <p>{{ content().welcomeMessage }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("multi_lang");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

באמצעות `vanilla-intlayer`, תוכל להשתמש בתרגומים על ידי הרשמה לשינויי תוכן. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("multi_lang").onChange((newContent) => {
  document.getElementById("welcome-message")!.textContent = String(
    newContent.welcomeMessage
  );
});

// רינדור ראשוני
document.getElementById("welcome-message")!.textContent = String(
  content.welcomeMessage
);
```

  </Tab>
</Tabs>
