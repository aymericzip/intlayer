---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "אימות מילונים באמצעות סכמות (Zod)"
description: "הגדירו סכמות Zod ב-intlayer.config.ts וחברו אותן למילונים שלכם כדי לאמת כל locale בזמן ה-build ולהוסיף טיפוסים לתוכן בעורך."
keywords:
  - סכמה
  - Zod
  - אימות
  - מילון
  - הצהרת תוכן
  - בטיחות טיפוסים
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "יצירת התיעוד"
author: aymericzip
---

# אימות מילונים באמצעות סכמות

סכמה מתארת את המבנה הצפוי של תוכן מילון. מגדירים אותה פעם אחת ב-`intlayer.config.ts`, נותנים לה שם, ואז מחברים את השם הזה לכל מילון דרך השדה `schema`.

לאחר מכן Intlayer:

- **מאמת** את המילון עבור כל locale בזמן בניית המילונים, ומדווח על כל שגיאה יחד עם ה-locale ונתיב השדה.
- **מוסיף טיפוסים** לתוכן המילון בעורך שלכם, כך ששדה חסר או שדה עם טיפוס שגוי מתגלה עוד לפני ה-build.

סכמות שימושיות כאשר כמה מילונים צריכים לחלוק את אותו מבנה (מטא-דאטה של SEO, כרטיסי מוצר, רשומות בסגנון CMS), או כאשר התוכן צריך לעמוד באילוצים ש-TypeScript לא יכול לבטא, כמו אורך מקסימלי לכל תרגום.

<Steps>
<Step number={1} title="הגדירו סכמות בקונפיגורציה">

התקינו את [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

לאחר מכן הגדירו את הסכמות תחת המפתח `schemas`. כל מפתח הוא השם שאליו תפנו מהמילונים שלכם.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="חברו סכמה למילון">

הגדירו את השדה `schema` של מילון לאחד מהשמות שהוגדרו בקונפיגורציה.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

אפשר לחבר את אותה סכמה לכמה מילונים שתרצו.

</Step>
<Step number={3} title="הריצו build וקראו את הדוח">

האימות רץ בכל פעם ש-Intlayer בונה את המילונים: עם `npx intlayer build`, או דרך ה-plugin של ה-bundler במצבי dev ו-build. אם תרגום מפר את הסכמה, Intlayer רושם ללוג את ה-locale, את נתיב השדה ואת הודעת Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

הרצה חד־פעמית של `intlayer build` נכשלת אם שם הסכמה אינו מוכר או אם האימות נכשל. במצב מעקב, Intlayer משמיט את המילון שאינו תקין עד לתיקון התוכן שלו.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="מטא-נתונים של Markdown">

יש לאמת שדות frontmatter כגון `title`,‏ `description`,‏ `date` ו־`tags` לפני הצגת Markdown. שדות חובה והסוגים הצפויים נבדקים בזמן בניית המילונים, ונתונים שגויים מדווחים יחד עם השפה ונתיב השדה.

</Accordion>
<Accordion header="מטא-נתוני SEO של הדף">

יש לאמת את הנתונים המשמשים לכותרות ותיאורי עמודים, כתובות URL קנוניות, תמונות לרשתות חברתיות והנחיות לאינדוקס. סכימה יכולה לדרוש כותרת באורך 1 עד 60 תווים, להגביל תיאורים ל־160 תווים ולבדוק שכתובות URL תקינות. תוכן לא תקין בשפה מסוימת נדחה לפני שהוא גורם לשגיאת הצגת עמוד.

</Accordion>
<Accordion header="תוכן מובנה משותף">

יש לצרף סכימה אחת למילונים בעלי מבנה תוכן משותף, כגון מוצרים, פריטי ניווט או תבניות אימייל. שדה חסר או ערך מסוג שגוי פוסלים את המילון בזמן הבנייה ועוזרים למנוע מתוכן לא עקבי להגיע ליישום.

</Accordion>
</AccordionGroup>

## הוספת טיפוסים לתוכן מתוך הסכמה

הפרמטרים הגנריים של `Dictionary` קובעים עד כמה TypeScript בודק מילון בקפדנות:

| הצהרה                                                   | השדה `schema`                        | השדה `content`                 |
| ------------------------------------------------------- | ------------------------------------ | ------------------------------ |
| `satisfies Dictionary`                                  | מושלם אוטומטית, שם לא מוכר הוא שגיאה | לא נבדק על ידי TypeScript      |
| `satisfies Dictionary<undefined, "seo-metadata">`       | חייב להיות `"seo-metadata"`          | מוקלד מתוך הסכמה               |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | חייב להיות `"seo-metadata"`          | מוקלד מתוך הסכמה ומהטיפוס שלכם |

עם סכמה מוקלדת, כל שדה מקבל ערך פשוט או צומת תוכן שמפיק את הערך הזה, ולכן `t()` עדיין מותר:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer מייצר את הטיפוסים האלה מסכמות ה-Zod שלכם ב-`.intlayer/types` בכל פעם שהוא בונה את המילונים. רק המבנה מוקלד: אילוצים כמו `.min()`, `.max()` או `.regex()` נבדקים בזמן ה-build.

## מה מאומת

עבור כל locale שמופיע ב-`internationalization.locales`, Intlayer פותר את תוכן המילון עבור אותו locale, ואז מאמת את התוצאה. לכן הסכמה מתארת את הערך הסופי של שדה (`title: string`), ולא את צומת ה-`t()` שמחזיק את התרגומים.

- **תרגומים חסרים**: עם `strictMode` ברירת המחדל, תרגום חסר נופל ל-locale ברירת המחדל לפני האימות. עם `strictMode: "strict"`, תרגום חסר גורם לכשל של שדה חובה.
- **צמתי תוכן אחרים**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` ו-`insert()` נפתרים לפונקציות, ו-`md()` או `html()` נפתרים לצמתים. הגדירו שדות כאלה עם `z.any()`, ושמרו את האילוצים על שדות שנפתרים לערכים פשוטים.
- **לא מאומת**: תוכן שמסופק על ידי פונקציה או Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/function_fetching.md)), ומילונים שנמשכים מ-[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

## שימוש בספריית אימות אחרת

הרשומות של `schemas` אינן קשורות ל-Zod. כל אובייקט שחושף מתודת `safeParse(data)` תואמת Zod יעבוד, כל עוד היא מחזירה `{ success: true }` או `{ success: false, error: { issues } }`, כאשר לכל issue יש מערך `path` ו-`message`. הטיפוסים של התוכן נוצרים רק מסכמות Zod: עם ספרייה אחרת, התוכן של המילונים המחוברים מוקלד כ-`any`.

## שאלות נפוצות

<FAQ>

<Question title="האם שגיאת סכמה עוצרת את ה-build שלי?">

הרצה חד־פעמית של `intlayer build` נכשלת אם מילון אינו תואם לסכמה שלו. במצב מעקב, Intlayer מתעד את השגיאות ומשמיט את המילון עד לתיקונו ולשמירתו.

</Question>
<Question title="האם כמה מילונים יכולים לחלוק את אותה סכמה?">

כן. סכמה מוזכרת לפי שמה, כך שכל מספר של מילונים יכול להצביע עליה. זהו מקרה השימוש העיקרי: אכיפת מבנה אחיד על כל המטא-דאטה של העמודים, רשומות המוצרים או תבניות המייל.

</Question>
<Question title="מה קורה אם שם הסכמה לא קיים?">

TypeScript מדווח על כך ברגע שהוגדרה לפחות סכמה אחת, כי השדה `schema` מקבל רק את השמות שהוגדרו. בקובצי JSON,‏ Intlayer מדווח על שם סכמה לא מוכר בזמן הבנייה ודוחה את המילון.

</Question>
<Question title="האם כל locale מאומת, או רק ברירת המחדל?">

כל locale שמופיע ב-`internationalization.locales`. הדוח מציין את ה-locale שנכשל, כך שקל לאתר תרגום שארוך מדי רק בגרמנית.

</Question>

</FAQ>

## קשור

- [קבצי הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- [קונפיגורציה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
