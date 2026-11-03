---
createdAt: 2025-12-16
updatedAt: 2026-11-03
priority: 5
title: "intlayer login: אימות מול ה-CMS"
description: למד כיצד להשתמש בפקודת התחברות (login) של Intlayer CLI כדי לבצע אימות מול Intlayer CMS ולקבל אישורי גישה.
keywords:
  - CLI
  - Login
  - התחברות
  - Authentication
  - אימות
  - CMS
  - Intlayer
  - Credentials
  - אישורים
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# פקודת Intlayer CLI Login

## תיאור

פקודת `login` של ה-Intlayer CLI מאפשרת לך לבצע אימות מול ה-Intlayer CMS. פקודה זו פותחת אוטומטית את דפדפן ברירת המחדל שלך כדי להשלים את תהליך האימות ולקבל את אישורי הגישה הנדרשים (Client ID ו-Client Secret) לשימוש בשירותי Intlayer.

## שימוש

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

או

```bash
intlayer login [options]
```

## אפשרויות

### `--cms-url <url>`

ציון כתובת ה-URL של Intlayer CMS שאליה יש להתחבר לאימות.

- **סוג**: `string`
- **ברירת מחדל**: הערך המוגדר ב-`intlayer.config.*` או `https://intlayer.org`
- **דוגמה**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### אפשרויות תצורה

תוכל גם להשתמש באפשרויות תצורה נפוצות:

- `--env-file <path>`: נתיב לקובץ הסביבה
- `-e, --env <env>`: סביבת הרצה
- `--base-dir <dir>`: ספריית הבסיס של הפרויקט
- `--verbose`: הפעלת פלט מפורט (ברירת מחדל: true)
- `--prefix <prefix>`: קידומת ללוגים

## כיצד זה עובד

1. **הפעלת שרת מקומי**: הפקודה מפעילה שרת HTTP מקומי בפורט אקראי לקבלת האישורים מה-CMS
2. **פתיחת הדפדפן**: הפקודה פותחת אוטומטית את דפדפן ברירת המחדל שלך לכתובת ההתחברות של ה-CMS
3. **אימות**: השלמת האימות בדפדפן באמצעות חשבון ה-Intlayer שלך
4. **קבלת האישורים**: השרת המקומי מקבל את ה-Client ID וה-Client Secret מה-CMS
5. **הנחיות**: הפקודה מציגה הנחיות להגדרת האישורים בפרויקט שלך

## פלט

לאחר התחברות מוצלחת, הפקודה תציג:

1. **האישורים שהתקבלו** (Client ID ו-Client Secret)
2. **הנחיות עבור קובץ ה-`.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **הנחיות עבור קובץ תצורת Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## שמירה על בטיחות מפתח הגישה

`intlayer login` מנפיק **מפתח גישה**: צמד `clientId` / `clientSecret` שכל פקודה בעלת הרשאות (`push`, `pull`, `fill`, `configuration push`, `live`, …) משתמשת בו לצורך אימות.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` הוא אישור גישה בצד השרת.** הוא מעניק גישת API מלאה ברמת הפרויקט, קריאה וכתיבה של המילונים שלך, הפרויקט שלך והארגון שלך. שמור אותו ב-`.env` (מוחרג ב-git) או במאגר הסודות של ה-CI שלך, ולעולם אל תטמיע אותו ישירות בקובץ התצורה.

Intlayer אוכף זאת מעבר לתיעוד גרידא:

- `clientSecret` **מוסר מהתצורה שהבאנדלר שלך מטמיע**, כך שהוא לעולם אינו יכול להגיע לבאנדל של הדפדפן בכל שילוב פריימוורק שבו תשתמש. הוא נקרא אך ורק בצד השרת, בזמן ריצה, מתוך משתני הסביבה.
- `clientId` שונה: זהו מפתח הפרויקט ה**ציבורי**, בטוח להפצה, ומשמש את [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/analytics.md#how-events-are-authenticated) כדי לקבל אסימון קצר-מועד לקליטת נתונים בלבד (ingest-only).

הערת שורה (commenting out) על `clientId` מספיקה כדי להשבית כל התנהגות הדורשת אישורים (אחזור מילונים מרוחקים, גישת CMS, אנליטיקה) גם כאשר משתני הסביבה עדיין מוגדרים.

עבור צינורות CI, העדף להשתמש בדגל `--ci`, שמזריק את האישורים למשך הריצה הבודדת במקום לשמור אותם בקובץ.

## הגדרה ידנית

אם הדפדפן אינו נפתח אוטומטית, תוכל לגשת ידנית לכתובת ה-URL המוצגת בטרמינל.

## דוגמאות

### התחברות עם כתובת CMS מותאמת אישית

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### התחברות עם קובץ סביבה ספציפי

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### התחברות במצב מפורט (Verbose)

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## פתרון בעיות

### הדפדפן אינו נפתח

אם הדפדפן אינו נפתח אוטומטית, העתק את כתובת ה-URL המוצגת בטרמינל ופתח אותה ידנית בדפדפן שלך.

### בעיות חיבור

אם נתקלת בבעיות חיבור, ודא:

1. שכתובת ה-URL של ה-CMS נכונה
2. שחיבור האינטרנט שלך פועל כראוי
3. שאין חומות אש (firewalls) החוסמות את החיבור

### האישורים לא התקבלו

אם האישורים אינם מתקבלים:

1. ודא שהשלמת את תהליך האימות בדפדפן
2. ודא שהפורט המקומי אינו חסום
3. נסה להריץ את הפקודה שוב

## השלבים הבאים

לאחר השלמת ההתחברות:

1. הוסף את האישורים לקובץ ה-`.env` שלך
2. הגדר את קובץ ה-`intlayer.config.*` שלך עם האישורים
3. השתמש בפקודות CLI כדי לנהל את המילונים שלך:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/push.md)
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/pull.md)
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)

## ראה גם

- [תיעוד CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [תצורת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
