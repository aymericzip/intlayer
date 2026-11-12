---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer editor: פקודות CLI של העורך הוויזואלי"
description: "הפעל והגדר את העורך הוויזואלי של Intlayer משורת הפקודה כדי לערוך את התוכן שלך בהקשר, ישירות על האפליקציה הרצה שלך."
keywords:
  - Editor
  - עורך
  - Visual Editor
  - עורך ויזואלי
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# פקודות עורך (Editor commands)

הפקודה `editor` עוטפת מחדש את פקודות `intlayer-editor`.

> כדי שתוכל להשתמש בפקודת `editor`, חבילת `intlayer-editor` חייבת להיות מותקנת. (ראה [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)).

- [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
