---
createdAt: 2026-05-07
updatedAt: 2026-11-03
priority: 4
title: הטיפוס IntlayerNode. מה זה?
description: מהו הטיפוס IntlayerNode? מדוע המחרוזת שלי מומרת ל-IntlayerNode?
keywords:
  - מבוא
  - תחילת עבודה
  - Intlayer
  - אפליקציה
  - חבילות
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "תיעוד ראשוני"
author: aymericzip
---

# מהו הטיפוס IntlayerNode?

הטיפוס `IntlayerNode<T>` הוא טיפוס מיוחד המסופק על ידי חבילות intlayer כגון `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` ו-`vanilla-intlayer`.

## דוגמת שימוש

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // מחזיר טיפוס: IntlayerNode<string>
};
```

  </Tab>

// Todo add other framworks as tabs as for docs/docs/he-IL/dictionary/markdown.md
</Tabs>

### מדוע Intlayer מוסיף IntlayerNode?

Intlayer מוסיף IntlayerNode כדי לאפשר רינדור של בוררי העורך החזותי (Visual Editor Selectors) בהקשר של ה-CMS / Visual Editor.

![דמו של העורך החזותי](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode הוא React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla Node מועשר, המאפשר גם גישה למאפיינים של צומת הפרימיטיב הבסיסי.

לדוגמה:

```js
const content = useIntlayer("app");

// במקרה של מחרוזת (String)
content.title; // מחזיר IntlayerNode<string>
content.title.value; // מחזיר את התוכן הבסיסי, כאן מחרוזת

content.title.toString(); // מחזיר string
content.title.toLowerCase(); // מחזיר string
String(content.title); // מחזיר string
content.title.toUpperCase(); // מחזיר מחרוזת באותיות גדולות (uppercased)
content.title.replace("a", "b"); // מחזיר מחרוזת מעודכנת
// ...
```

> גישה ישירה למאפיינים של IntlayerNode תעבוד, אך תפגע ביכולת להציג את הבוררים בעורך החזותי (Visual Editor).

> ה-IntlayerNode יכול גם לעטוף מספרים או טיפוסים אחרים כגון `IntlayerNode<number>`.
