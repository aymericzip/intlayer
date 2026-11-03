---
createdAt: 2025-01-02
updatedAt: 2026-11-03
priority: 8
title: "אוטומציה של תרגומי react-i18next JSON באמצעות Intlayer"
description: בצעו אוטומציה של תרגומי ה-JSON שלכם עם Intlayer ו-react-i18next לבינאום משופר ביישומי React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - בינאום
  - i18n
  - בלוג
  - React
  - JavaScript
  - TypeScript
  - ניהול תוכן
slugs:
  - blog
  - intlayer-with-react-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: הוספת תיעוד תמיכה בספקי AI
  - version: 7.0.6
    date: 2025-11-01
    changes: הוספת תוסף loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: מעבר לתוסף syncJSON
author: aymericzip
---

# כיצד לבצע אוטומציה של תרגומי ה-JSON של react-i18next באמצעות Intlayer

<iframe title="כיצד לבצע אוטומציה של תרגומי ה-JSON של react-i18next באמצעות Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## תוכן עניינים

<TOC/>

## מה זה Intlayer?

**Intlayer** היא ספריית בינאום חדשנית בקוד פתוח שתוכננה לפתור את המגבלות של פתרונות i18n מסורתיים. היא מציעה גישה מודרנית לניהול תוכן ביישומי React.

ראו השוואה מעשית מול react-i18next בפוסט שלנו [react-i18next לעומת react-intl לעומת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/react-i18next_vs_react-intl_vs_intlayer.md).

- [react-i18next לעומת react-intl לעומת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/react-i18next_vs_react-intl_vs_intlayer.md)

## מדוע לשלב את Intlayer עם react-i18next?

בעוד ש-Intlayer מספקת פתרון i18n עצמאי מצוין (ראו את [מדריך האינטגרציה ל-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md) שלנו), ייתכן שתרצו לשלב אותה עם react-i18next מכמה סיבות.

- [מדריך אינטגרציה ל-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

Intlayer מציעה מגוון עשיר של **תכונות מתקדמות** החורגות מעבר לכלי i18n מסורתיים. היא מאפשרת לכם:

- **לזהות ולמלא תרגומים חסרים באופן אוטומטי** כדי לייעל את תהליך הלוקליזציה.
- **לבדוק ולאמת את התרגומים שלכם** ישירות בתהליכי הפיתוח או ה-CI/CD שלכם.
- **לנהל תוכן ברמת הקומפוננטה**, מה שמאפשר מבנה נקי, סקיילבילי וקל לתחזוקה ברחבי האפליקציה.
- **להחצין את התוכן שלכם (Externalize)**, ובכך להפוך אותו לעריך בקלות עבור כל הצוות (מפתחים, מתרגמים ומנהלי תוכן).

עם זאת, **i18next** נותרה פתרון i18n מצוין ונפוץ במיוחד בזכות ה**אקוסיסטם הבוגר שלה**, **התמיכה הרחבה מהקהילה** ו**תאימות התוספים הענפה** שלה.

באמצעות שילוב **Intlayer** עם **i18next**, אתם מקבלים את הטוב משני העולמות: היציבות ובשלות האקוסיסטם של i18next, יחד עם ניהול התוכן המודרני, האוטומציה ושיפורי חוויית המפתח של Intlayer.

מדריך זה מסביר כיצד לרתום את Intlayer כ**מתאם (adapter) עבור i18next**, ומאפשר לכם:

- להגר בהדרגה מ-i18next ל-Intlayer.
- לשמור על התוספים ותהליכי העבודה הקיימים שלכם ב-i18next.
- לבצע אוטומציה של תרגומי JSON ב-CLI או בצינורות CI/CD.
- לבדוק, לסנכרן ולנהל תרגומים בצורה יעילה יותר.

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## תוכן עניינים

<TOC/>

## מדריך שלב אחר שלב להגדרת Intlayer עם react-i18next

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
```

**תיאור החבילות:**

- **intlayer**: ספריית הליבה לניהול בינאום, הצהרת תוכן ובנייה (build)
- **@intlayer/sync-json-plugin**: תוסף לייצוא הצהרות תוכן של Intlayer לפורמט JSON התואם ל-react-i18next

</Step>
<Step number={2} title="הטמעת תוסף Intlayer לעטיפת ה-JSON">

צרו קובץ תצורה של Intlayer כדי להגדיר את השפות הנתמכות שלכם:

**אם ברצונכם לייצא גם מילוני JSON עבור react-i18next**, הוסיפו את התוסף `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

התוסף `syncJSON` יעטוף אוטומטית את ה-JSON. הוא יקרא ויכתוב את קובצי ה-JSON מבלי לשנות את ארכיטקטורת התוכן.

אם ברצונכם שקובצי ה-JSON יתקיימו לצד קובצי הצהרת התוכן של Intlayer (קובצי `.content`), Intlayer תפעל באופן הבא:

1. טעינת קובצי ה-JSON וקובצי הצהרת התוכן והמרתם למילון של Intlayer.
2. אם קיימות התנגשויות בין ה-JSON לבין קובצי הצהרת התוכן, Intlayer תבצע מיזוג (merge) של כל המילונים, בהתאם לעדיפות התוספים ועדיפות קובץ הצהרת התוכן (הכול ניתן להגדרה).

אם מבוצעים שינויים באמצעות ה-CLI לתרגום ה-JSON, או באמצעות ה-CMS, Intlayer תעדכן את קובץ ה-JSON עם התרגומים החדשים.

לפרטים נוספים אודות התוסף `syncJSON`, עיינו ב[תיעוד התוסף syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md).

- [תיעוד התוסף syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Step>
<Step number={3} title="הגדרת ספק AI">

Intlayer פותחת שורה של תכונות אוטומציה מתקדמות וידידותיות למפתח עבור תהליך העבודה שלכם ב-i18next:

- **זיהוי ומילוי אוטומטי של תרגומים חסרים**: Intlayer סורקת את מילוני ה-JSON שלכם, מאתרת מפתחות חסרים או לא מתורגמים, ומתרגמת רק אותם, כך ש-99% מקובץ ה-JSON נשאר ללא שינוי.
- **תרגום במקטעים (Chunks) עבור קובצי JSON גדולים**: כאשר קובצי התרגום גדולים מאוד, Intlayer מפצלת אוטומטית את העיבוד למקטעים הניתנים לניהול, ומתרגמת אותם באופן עצמאי כדי למנוע מגבלות API ובעיות זיכרון.
- **מקביליות של מרחבי שמות (Namespaces)**: אם יש לכם מאות מרחבי שמות (או קבצים), Intlayer מבצעת את משימות התרגום במקביל, ומאיצה ביעילות את תהליכי ה-CI/CD או פעולות תרגום מרוכזות.
- **תמיכה גמישה בספקי AI**: בחרו את ספק ה-AI המועדף עליכם (למשל OpenAI, Claude, Gemini) פשוט על ידי הגדרת פרטי אימות. השתמשו במפתח API משלכם והחליפו ספקים לפי הצורך.
- **טיפול גמיש בתשובות AI**: Intlayer יודעת להתמודד עם מקרי קצה שבהם ספק ה-AI מחזיר טקסט כמחרוזת או כאובייקט, ואף מנסה שוב אוטומטית כאשר הפורמט אינו עקבי.
- **מוכן ל-CLI ול-CI/CD**: הריצו את הבדיקות והמילוי האוטומטי של Intlayer ישירות בבדיקות או בצינורות הפריסה שלכם, מה שהופך את תהליך הלוקליזציה לחזק ואוטומטי.
- **משתלב על גבי ההגדרה הקיימת שלכם**: אינכם צריכים לשנות את תשתית ה-i18next או ה-Next.js שלכם. Intlayer פועלת כתוסף מוסף להגדרה הנוכחית שלכם, ומעניקה לכם את כל היתרונות הללו עם מינימום מאמץ הגירה.

להלן דוגמה להגדרת ספק ה-AI:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-5.6-terra",
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

לאחר מכן תוכלו להריץ את הפקודה הבאה כדי למלא את התרגומים שלכם:

```bash
npx intlayer fill
```

פקודה זו תמלא את התרגומים שלכם באמצעות ספק ה-AI שהגדרתם.

> ראו את כל ספקי ה-AI הזמינים ב[תיעוד הגדרת AI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#ai-configuration).
> ראו את כל הפקודות הזמינות ב[תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- [תיעוד הגדרת AI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#ai-configuration)
- [תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)

</Step>

</Steps>

## הגדרות Git

מומלץ להתעלם מקבצים שנוצרים אוטומטית על ידי Intlayer:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

קבצים אלו יכולים להיווצר מחדש במהלך תהליך ה-build שלכם ואין צורך לבצע להם commit לניהול הגרסאות.

### הרחבה ל-VS Code

לחוויית פיתוח משופרת, התקינו את **הרחבת VS Code הרשמית של Intlayer** :

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
