---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד חבילת intlayer-cli"
description: "כלי CLI עבור Intlayer, המספק פקודות לבנייה וביקורת (audit) של מילונים."
keywords:
  - cli
  - כלים
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת intlayer-cli

חבילת `intlayer-cli` מספקת קבוצה של פקודות לניהול מילוני ותצורת Intlayer.

## התקנה

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="bun"
bun add intlayer-cli
```

## ייצואים (Exports)

### פקודות CLI (פונקציות)

החבילה מייצאת פונקציות המפעילות את פקודות ה-CLI, ומאפשרות לך להפעיל פעולות Intlayer באופן פרוגרמטי.

ייבוא:

```tsx
import "intlayer-cli";
```

| פונקציה        | תיאור                                                 |
| -------------- | ----------------------------------------------------- |
| `build`        | בונה את מילוני Intlayer.                              |
| `audit`        | מבצעת ביקורת (audit) על מילונים לאיתור תרגומים חסרים. |
| `liveSync`     | מסנכרנת מילונים בזמן אמת.                             |
| `pull`         | מושכת מילונים ממקור מרוחק (remote source).            |
| `push`         | דוחפת מילונים למקור מרוחק.                            |
| `test`         | מריצה בדיקות על מילונים.                              |
| `transform`    | ממירה מילונים בין פורמטים שונים.                      |
| `fill`         | ממלאת מילונים בתרגומים חסרים באמצעות AI.              |
| `reviewDoc`    | בודקת תיעוד לצורך בינאום.                             |
| `translateDoc` | מתרגמת תיעוד באמצעות AI.                              |
