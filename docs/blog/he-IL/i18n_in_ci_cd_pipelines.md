---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: "אוטומציה של תרגומים בצינורות CI/CD מבלי לשלוח טקסט לקוי"
description: שלושה מקומות לאוטומציה של i18n, pre-push, pull request וזמן ריצה. כיצד לחסום בנייה על כיסוי שפות, מילוי אוטומטי בטוח, והימנעות מלולאת CI שמבצעת commit לנצח.
keywords:
  - אוטומציית תרגומים ci
  - i18n ci cd
  - תרגומים ב-github actions
  - husky pre-push
  - לוקליזציה רציפה
  - צינור תרגום
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# אוטומציה של תרגומים בצינורות CI/CD מבלי לשלוח טקסט לקוי

תרגום ידני אינו שורד קצב שחרור גרסאות מהיר. מישהו מוסיף מחרוזת ביום שישי, הייצוא מתבצע בספרינט הבא, ועד אז שלוש שפות נוספות נשארות מאחור. אוטומציה של התהליך היא עניין פשוט יחסית. לעשות זאת מבלי לפרסם בשקט פלט תרגום מכונה למשתמשים, זה החלק שדורש מחשבה מעמיקה.

## תוכן העניינים

<TOC/>

## אין צורך בהגירה מלאה כדי לבצע אוטומציה

מבני ה-pipeline המפורטים להלן אינם תלויים בספרייה מסוימת, וכך גם כלי העבודה. אם ההודעות שלכם שמורות בקטלוגי JSON עבור i18next, next-intl, react-intl, vue-i18n או next-translate, [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) קורא וכותב קבצים אלה ישירות במקומם:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // או "icu" עבור next-intl / react-intl
    }),
  ],
};

export default config;
```

- [תוסף Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

האפליקציה שלכם ממשיכה לייבא את מה שהיא ייבאה תמיד. תהליכי ה-CI המפורטים להלן ממלאים את הקטלוגים הקיימים וחוסמים גרסאות במקרה הצורך, וה-diff שרואה סוקר הקוד ב-PR הוא שינוי בתוך `locales/fr/checkout.json`, ולא הגירה מורכבת של המערכת. קיים גם [תוסף Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עבור תהליכי עבודה עם gettext, ו-[מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) אם תרצו שגם ה-API בזמן ריצה יישאר ללא שינוי.

- [תוסף Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

## הפרדה בין חסימה (Gate) לבין מילוי (Fill)

שני תפקידים שונים מתבלבלים לעיתים קרובות:

**מחסום (Gate)** הוא בדיקה שנכשלת. הוא קובע שאסור לשחרר את ה-build מכיוון שחסרות שפות חובה. הוא אינו כותב דבר לקוד.

**מילוי (Fill)** הוא פעולת שינוי (mutation). הוא מייצר את התרגומים החסרים ומבצע commit. הוא לעולם אינו מכשיל build.

הפעלת מילוי בלבד גורמת לכך ששום דבר אינו נחסם, ופלט מכונה זורם ל-production ללא בדיקה אנושית. הפעלת מחסום בלבד גורמת ל-build להיצבע באדום בכל פעם ומחייבת התערבות אנושית כדי לפתוח את החסימה. רוב הצוותים זקוקים לשניהם, מחוברים לטריגרים שונים: מילוי בעת פתיחת pull request, ומחסום בעת מיזוג לענף השחרור (release branch).

## היכן ניתן להפעיל אוטומציה

| שלב                | טריגר     | יתרון עיקרי                                   | עלות                                      |
| :----------------- | :-------- | :-------------------------------------------- | :---------------------------------------- |
| Hook מסוג Pre-push | Git מקומי | משוב מהיר, ללא צריכת דקות CI                  | רץ על מחשב המפתח ועל מפתח ה-API האישי שלו |
| Pull request       | תהליך CI  | בדיקה לפני מיזוג, מקום מרוכז לסודות (secrets) | דקות CI בתוספת קריאות למודל בכל PR        |
| Release branch     | תהליך CI  | מחסום קשיח על כיסוי שפות                      | זול, ללא קריאות למודל AI                  |
| זמן ריצה (Runtime) | CMS       | שינויי תוכן ללא צורך בבנייה מחדש              | תלות בשירות מאוחסן בענן                   |

## Pre-push: לולאת המשוב המהירה ביותר

Husky מריץ את המילוי לפני שהקוד עוזב את המחשב המקומי, כך שהתרגומים מגיעים באותו ה-push שבו נוספו המחרוזות שדרשו אותם.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

הדגל `--unpushed` מגביל את העבודה לתוכן שטרם נדחף, מה שמונע מהתהליך לקחת דקה שלמה בכל push. הדגל `--mode complete` ממלא רק את מה שחסר מבלי לשכתב רשומות שכבר יש להן ערך, כך שתרגום שנבדק בעבר לעולם אינו מוחלף בשקט.

במונו-ריפו, הגדירו את התחום עבור כל אפליקציה:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

החיסרון ממשי: כל מפתח זקוק למפתח API אישי, והעלות נופלת על מי שמבצע את ה-push. מסיבה זו רוב הצוותים מעבירים שלב זה ל-CI ברגע שיש יותר ממפתחים בודדים.

## Pull request: מילוי במקום שבו מתבצעת הביקורת

אותה פעולה בתוך GitHub Actions, מתוחמת ל-diff של השינויים:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5.6-terra
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

ארבעה פרטים קריטיים שחייבים להקפיד עליהם:

- **`fetch-depth: 0`** נדרש כדי שהדגל `--git-diff` יעבוד. שיבוט רדוד (shallow clone) אינו כולל נקודת בסיס להשוואה מולה, ותהליך המילוי לא יכסה דבר בשקט.
- **`[skip ci]` בהודעת ה-commit** מונע מצינור העבודה להפעיל את עצמו מחדש בלולאה אינסופית. בלעדיו, ה-job יבצע commit, שיפתח ריצה חדשה, שתבצע commit נוסף, וזהו המתכון הקלאסי לשריפת תקציב ה-CI בין לילה.
- **`concurrency` עם `cancel-in-progress`** מונע מצב של תחרות שבו שתי דחיפות קוד מנסות לכתוב לאותם קבצים במקביל.
- **`--git-diff`** תוחם את המילוי אך ורק למה שהשתנה ב-PR הנוכחי. השמטתו תגרום לתרגום מחדש של הקטלוג כולו בכל ריצה.

התרגומים מתווספים כ-commit על ענף ה-PR, מה שאומר שהבודק רואה אותם ישירות ב-diff. זו המטרה המרכזית בביצוע הפעולה כאן ולא לאחר המיזוג.

## Release branch: המחסום (The gate)

המחסום אינו זקוק לגישה למודל AI ואמור לרוץ במהירות.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

מגובה בבדיקה המאמתת כיסוי שפות במקום להסתמך על דוח ה-CLI:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

הפקודה `npx intlayer content test` מדפיסה דוח אך יוצאת עם קוד 0, כך שהיא מיידעת אך אינה חוסמת. השתמשו בה מקומית; השתמשו באימות (assertion) ב-CI. למידע נוסף על ההבדלים, עיינו במאמר על [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md).

- [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md)

## `requiredLocales` הופך את המחסום לבר-קיימא

מחסום הדורש שכל שמונה עשרה השפות יהיו מושלמות יחסום כל שחרור גרסה עד שהשפה האיטית ביותר תתורגם במלואה, ויבוטל בתוך חודש ימים.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

הצהירו על השפות שאתם משרתים, אך הגדירו כחובה רק את אלו שחוסמות שחרור גרסה. השאר ימולאו באופן אסינכרוני ולעולם לא יעכבו פריסה.

## הוצאת תרגומים מתוך המאגר לחלוטין

המודל האחר הוא להצהיר על שפה אחת בקוד ולנהל את כל השאר מרחוק, דרך ה-CMS עם Live Sync. במקרה כזה שינויי תוכן אינם דורשים בנייה מחדש כלל, מה שמפריד לחלוטין בין קצב עדכון התוכן לקצב פריסת הקוד.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

גישה זו מתאימה לצוותים שבהם אנשי תוכן ולא מפתחים מנהלים את הניסוחים. זוהי פשרה הנדסית: אתם מרוויחים אוטונומיה לעורכי תוכן, אך מאבדים את התכונה שבה בדיקת Git checkout מתארת במלואה את מה שהאפליקציה מרנדרת. פרטים מלאים ב-[תיעוד ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [תיעוד מערכת ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

שימו לב ש-`clientSecret` הוא אישור גישה (credential) ברמת השרת. מקומו בסודות ה-CI ובסביבת השרת בלבד, ולעולם לא בקוד שמגיע ל-bundle של הלקוח.

## המגבלה האמיתית

כל המנגנונים לעיל מבצעים אוטומציה של _כיסוי (coverage)_, ולא של _איכות (quality)_. מילוי מכונה הופך פער גלוי לפער בלתי נראה: דוח הביקורת ירוק כי יש ערך למפתח, אך איש לא קרא אותו.

זה קביל עבור כלים פנימיים, יומני שינויים (changelogs) או שפות בשלבי בטא. זה אינו קביל עבור תמחור, נוסחים משפטיים, הודעות שגיאה על כשל בתשלום, או כל תוכן שהלקוח קורא לפני קבלת החלטה. נתבו טקסטים אלה לבדיקה אנושית, והשתמשו תמיד ב-`--mode complete` כדי שניסוח שנבדק לא יידרס בריצה מאוחרת יותר.

ספקו למודל הקשר (context) כדי שהפלט שלו יהיה עקבי:

```ts
ai: {
  applicationContext: "B2B invoicing app. Formal register. Never translate the product name.",
}
```

## טעויות נפוצות

- **אי-שימוש ב-`[skip ci]` ב-commit האוטומטי.** ה-job מפעיל את עצמו מחדש בלולאה אינסופית.
- **שיבוט רדוד (shallow clone) עם `--git-diff`.** אין בסיס להשוואה, שום דבר אינו מתמלא ואין שום התרעה על כך.
- **מילוי הקטלוג כולו בכל ריצה.** תחמו באמצעות `--git-diff` או `--unpushed`, אחרת חשבון ה-API יזנק.
- **שימוש בדוח ה-CLI כמחסום.** הפקודה מסתיימת בקוד 0 בכל מקרה.
- **הגדרת כל השפות כחובה.** המחסום יבוטל בפעם הראשונה שהוא יחסום שחרור גרסה.
- **הפעלת תהליך מילוי ללא מחסום כלל.** שום דבר אינו נכשל, וטקסט מכונה זורם ל-production ללא בקרה.
- **שמירת מפתחות API של המודלים בתוך המאגר.** מקומם בסודות ה-CI, בדיוק כמו `clientSecret`.

## קריאה נוספת

- [CI/CD: יצירת תרגומים אוטומטית עם Husky, GitHub Actions ו-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)
- [בדיקת התוכן שלכם וחסימת בנייה על בסיס כיסוי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md)
- [autoFill: יצירת קובצי הצהרות לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)
- [מדריך הגדרות קונפיגורציה: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [דוחות Benchmark בין פריימוורקים שונים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [מתאם תאימות מהיר עבור i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md)
- [כיצד למצוא תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md)
- [כיצד לבדוק תרגומים ללא בדיקות שבירות](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_testing_strategies.md)
