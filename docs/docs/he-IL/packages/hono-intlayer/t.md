---
createdAt: 2024-12-02
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה t | hono-intlayer"
description: "השתמש בפונקציה t מתוך hono-intlayer כדי להחזיר תגובות מותאמות שפה ב-Hono, תוך בחירת תוכן על פי השפה שזוהתה עבור כל בקשה."
keywords:
  - t
  - תרגום
  - Intlayer
  - בינאום
  - תיעוד
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `t` ב-`hono-intlayer`

הפונקציה `t` בחבילת `hono-intlayer` היא כלי הליבה לאספקת תגובות מותאמות שפה באפליקציית ה-Hono שלך. היא מפשטת את תהליך הבינאום (i18n) על ידי בחירה דינמית של תוכן בהתבסס על השפה המועדפת על המשתמש.

## סקירה כללית

הפונקציה `t` משמשת להגדרה ואחזור של תרגומים עבור קבוצת שפות נתונה. היא קובעת אוטומטית את השפה המתאימה להחזרה בהתבסס על הגדרות בקשת הלקוח, כגון כותרת `Accept-Language`. אם השפה המועדפת אינה זמינה, היא חוזרת בצורה חלקה לשפת ברירת המחדל שצוינה בתצורה שלך.

## תכונות עיקריות

- **התאמה דינמית לשפה**: בוחרת אוטומטית את התרגום המתאים ביותר עבור הלקוח.
- **חזרה לשפת ברירת המחדל (Fallback)**: חוזרת לשפת ברירת המחדל אם השפה המועדפת על הלקוח אינה זמינה, מה שמבטיח רציפות בחוויית המשתמש.
- **קלה ומהירה**: תוכננה עבור אפליקציות עתירות ביצועים, ומבטיחה תקורה מינימלית.
- **תמיכה במצב קפדני (Strict Mode)**: אכיפת התאמה קפדנית לשפות שהוצהרו להתנהגות אמינה ובטוחה.

## חתימת הפונקציה

```typescript
t(translations: Record<string, string>): string;
```

### פרמטרים

- `translations`: אובייקט שבו המפתחות הם קודי שפה (למשל, `en`, `he`, `fr`, `es-MX`) והערכים הם מחרוזות התרגום התואמות.

### ערך מוחזר

- מחרוזת המייצגת את התוכן בשפה המועדפת על הלקוח.

## טעינת תוכנת הביניים של בקשות בינאום

כדי להבטיח שפונקציונליות הבינאום המסופקת על ידי `hono-intlayer` תפעל כהלכה, **עליך** לטעון את תוכנת הביניים לבינאום בתחילת אפליקציית ה-Hono שלך. פעולה זו מפעילה את הפונקציה `t` ומבטיחה טיפול תקין בזיהוי השפה ובתרגום.

מקם את תוכנת הביניים `app.use("*", intlayer())` **לפני כל הנתיבים** באפליקציה שלך כדי להבטיח שכל הנתיבים ייהנו מבינאום:

```typescript {6} fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Hono } from "hono";
import { intlayer, t } from "hono-intlayer";

const app = new Hono();

// טעינת תוכנת הביניים לטיפול בבקשות בינאום
app.use("*", intlayer());

// הגדרת הנתיבים שלך לאחר טעינת תוכנת הביניים
app.get("/", (c) => {
  return c.text(
    t({
      he: "שלום, עולם!",
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### מדוע זה נדרש

- **זיהוי שפה**: תוכנת הביניים `intlayer` מעבדת בקשות נכנסות כדי לזהות את השפה המועדפת על המשתמש בהתבסס על כותרות, עוגיות או שיטות מוגדרות אחרות.
- **הקשר תרגום**: מגדירה את ההקשר הדרוש לפעולתה התקינה של הפונקציה `t`, ומבטיחה שהתרגומים יוחזרו בשפה הנכונה.
- **מניעת שגיאות**: ללא תוכנת ביניים זו, שימוש בפונקציה `t` יגרום לשגיאות בזמן ריצה מכיוון שמידע השפה הנדרש לא יהיה זמין.

## דוגמאות שימוש

### דוגמה בסיסית

הגשת תוכן מתורגם בשפות שונות:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
app.get("/", (c) => {
  return c.text(
    t({
      he: "ברוכים הבאים!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**בקשות לקוח:**

- לקוח עם `Accept-Language: fr` יקבל `Bienvenue!`.
- לקוח עם `Accept-Language: es` יקבל `¡Bienvenido!`.
- לקוח עם `Accept-Language: de` יקבל `Welcome!` (שפת ברירת המחדל).

### טיפול בשגיאות

מתן הודעות שגיאה במספר שפות:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
app.get("/error", (c) => {
  return c.text(
    t({
      he: "אירעה שגיאה בלתי צפויה.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

### שימוש בגרסאות שפה מקומיות (Locale Variants)

ציון תרגומים עבור גרסאות אזוריות ספציפיות של שפה:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      he: "שלום!",
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

## נושאים מתקדמים

### מנגנון גיבוי (Fallback)

אם שפה מועדפת אינה זמינה, הפונקציה `t` תחזור לשפת ברירת המחדל המוגדרת בתצורה:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

### אכיפת מצב קפדני (Strict Mode)

הגדרת הפונקציה `t` לאכיפת התאמה קפדנית לשפות שהוצהרו:

| מצב         | התנהגות                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| `strict`    | יש לספק תרגומים עבור כל השפות שהוצהרו. שפות חסרות יעלו שגיאות.           |
| `inclusive` | שפות שהוצהרו חייבות לכלול תרגומים. שפות חסרות מעוררות אזהרות אך מתקבלות. |
| `loose`     | כל שפה קיימת מתקבלת, גם אם לא הוצהרה.                                    |

### שילוב עם TypeScript

הפונקציה `t` בטוחה מבחינת טיפוסים כאשר נעשה בה שימוש עם TypeScript. הגדרת אובייקט תרגומים בטוח טיפוסית:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  he: "בוקר טוב!",
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

### שגיאות נפוצות ופתרון בעיות

| בעיה                    | סיבה                         | פתרון                                                     |
| ----------------------- | ---------------------------- | --------------------------------------------------------- |
| הפונקציה `t` אינה פועלת | תוכנת הביניים לא נטענה       | ודא ש-`app.use("*", intlayer())` נוסף לפני הגדרת הנתיבים. |
| שגיאת תרגומים חסרים     | מצב קפדני מופעל ללא כל השפות | ספק את כל התרגומים הנדרשים.                               |

## סיכום

הפונקציה `t` היא כלי רב-עוצמה עבור בינאום צד שרת. שימוש יעיל בה מאפשר ליצור אפליקציה נגישה וידידותית יותר למשתמשים מכל רחבי העולם. לשימוש מתקדם ואפשרויות תצורה מפורטות, עיין ב-[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תצורת Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
