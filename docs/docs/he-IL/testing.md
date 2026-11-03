---
createdAt: 2025-03-01
updatedAt: 2026-11-03
priority: 8
title: "בדיקת התרגומים שלכם עם Intlayer"
description: "בדקו את תוכן ה-Intlayer שלכם: זהו תרגומים חסרים, אמתו מילונים ב-CI ורנדרו רכיבים לפי שפה בבדיקות יחידה (unit tests)."
keywords:
  - בדיקות
  - Testing
  - Intlayer
  - בינאום
  - CMS
  - מערכת ניהול תוכן
  - עורך ויזואלי
slugs:
  - doc
  - testing
history:
  - version: 6.1.0
    date: 2026-10-27
    changes: "הבהרה כי בדיקת התוכן מסתיימת עם קוד שגיאה שאינו אפס כאשר חסרות שפות חובה"
  - version: 6.0.1
    date: 2025-10-05
    changes: "הפיכת הבדיקה לאסינכרונית והוספת אפשרות build"
  - version: 6.0.0
    date: 2025-09-20
    changes: "הצגת יכולות הבדיקה"
author: aymericzip
---

# בדיקת התוכן שלכם

מדריך זה מציג כיצד לאמת אוטומטית שהמילונים שלכם שלמים, לתפוס תרגומים חסרים לפני העלאה ל-production, ולבדוק ממשק משתמש מתורגם באפליקציה שלכם.

## מה ניתן לבדוק

- **תרגומים חסרים**: הכשלת ה-CI אם חסרות שפות חובה (required locales) עבור מילון כלשהו.
- **רינדור ממשק משתמש מקומי (Localized UI)**: רינדור רכיבים תחת provider של שפה ספציפית ואימות הטקסט או המאפיינים המוצגים.
- **ביקורת בזמן הבנייה (Build-time audits)**: הרצת `npx intlayer content test` מקומית או ב-CI. הפקודה מסתיימת עם קוד שגיאה שאינו אפס כאשר תרגומי חובה חסרים.

## תחילת עבודה מהירה: ביקורת באמצעות ה-CLI

הריצו את בדיקת הביקורת משורש הפרויקט שלכם:

```bash packageManager="npm"
npx intlayer content test
```

```bash packageManager="yarn"
yarn intlayer content test
```

```bash packageManager="pnpm"
pnpm intlayer content test
```

```bash packageManager="bun"
bun x intlayer content test
```

דגלים שימושיים:

- `--env-file [path]`: טעינת משתני סביבה מתוך קובץ.
- `-e, --env [name]`: בחירת פרופיל סביבה.
- `--base-dir [path]`: הגדרת תיקיית הבסיס של האפליקציה לצורך פענוח נתיבים.
- `--verbose`: הצגת יומני רישום מפורטים (verbose logs).
- `--prefix [label]`: הוספת קידומת לשורות הרישום.
- `--build [build]`: בניית המילונים לפני הבדיקה כדי להבטיח שהתוכן מעודכן. ערך true יאלץ בנייה, ערך false ידלג על הבנייה, וערך לא מוגדר (undefined) יאפשר שימוש במטמון הבנייה (build cache).

הפקודה מסתיימת עם קוד יציאה `1` כאשר שפת חובה כלשהי חסרה (ראו `requiredLocales` בהגדרות התצורה שלכם), ו-`0` אחרת. תוכלו להשתמש בה ישירות כדי להכשיל משימות CI או commit hooks. הבדיקה התכנותית המופיעה להלן היא חלופה אופציונלית.

## בדיקה תכנותית (Vitest/Jest)

השתמשו ב-API של Intlayer CLI כדי לוודא שאין תרגומים חסרים עבור שפות החובה שלכם.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // שימושי כאשר הבדיקה נכשלת מקומית או ב-CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

מקבילה ב-Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // שימושי כאשר הבדיקה נכשלת מקומית או ב-CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

כיצד זה עובד:

- Intlayer קורא את התצורה שלכם (`locales`, `requiredLocales`) ואת המילונים המוצהרים, ולאחר מכן מדווח על:
  - `missingTranslations`: פירוט לפי מפתח, אילו שפות חסרות ומאיזה קובץ.
  - `missingLocales`: איחוד של כל השפות החסרות.
  - `missingRequiredLocales`: תת-קבוצה המוגבלת לשפות המוגדרות ב-`requiredLocales` (או לכל השפות אם `requiredLocales` לא הוגדר).

## בדיקת ממשק משתמש מקומי (React / Next.js)

רנדרו רכיבים תחת ספק (provider) של Intlayer ואמתו את התוכן המוצג.

דוגמה ב-React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

דוגמה ב-Next.js (App Router): השתמשו בעטיפת ה-framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renders localized heading in French", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

טיפים:

- כאשר אתם זקוקים לערכי מחרוזת גולמיים עבור מאפיינים (למשל, `aria-label`), גשו לשדה `.value` המוחזר על ידי `useIntlayer` ב-React.
- מומלץ לשמור מילונים באותה תיקייה לצד הרכיבים (colocation) עבור בדיקות יחידה וסדר פשוטים יותר.

## אינטגרציה רציפה (CI - Continuous Integration)

הריצו את ביקורת ה-CLI בסביבת ה-CI. היא תכשיל את תהליך הבנייה כאשר חסרים תרגומי חובה.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "npx intlayer content test"
  }
}
```

חלופה: Vitest

```json
{
  "scripts": {
    "test:i18n": "vitest run"
  }
}
```

דוגמה ל-GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx intlayer content test
```

אופציונלי: הרצת ביקורת ה-CLI לקבלת סיכום קריא לצד הבדיקות:

```bash packageManager="npm"
npx intlayer content test --verbose
```

```bash packageManager="yarn"
yarn intlayer content test --verbose
```

```bash packageManager="pnpm"
pnpm intlayer content test --verbose
```

```bash packageManager="bun"
bun x intlayer content test --verbose
```

## פתרון בעיות

- ודאו שתצורת ה-Intlayer שלכם מגדירה את `locales` ובאופן אופציונלי את `requiredLocales`.
- אם האפליקציה שלכם משתמשת במילונים דינמיים או מרוחקים, הריצו את הבדיקות בסביבה שבה המילונים זמינים.
- עבור פרויקטי monorepo מעורבים, השתמשו ב-`--base-dir` כדי לכוון את ה-CLI אל תיקיית השורש הנכונה של האפליקציה.
