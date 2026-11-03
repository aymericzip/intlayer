---
createdAt: 2026-09-13
updatedAt: 2026-11-03
priority: 4
title: הגבלת צריכת ה-Tokens של Claude Code בעת תרגום
description: מדוע תרגום באמצעות Claude Code שורף tokens רבים, מה Intlayer עושה במקום זאת, וכיצד לעשות שימוש חוזר במנוי Claude עבור תרגומים.
keywords:
  - claude code
  - tokens
  - צריכת tokens
  - טוקנים
  - setup-token
  - i18n
  - בינאום
  - תרגום
  - fill
  - mcp
  - סוכן
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# כיצד להגביל את צריכת ה-Tokens ב-Claude Code ליצירת תרגומים

## תיאור הבעיה

בקשה מ-Claude Code (או מכל סוכן תכנות אחר) לתרגם את התוכן שלך היא הדרך היקרה ביותר לעשות זאת. בכל הרצה, הסוכן נדרש:

- לטעון את קובץ ה-JSON או התוכן המלא לתוך ההקשר (context) שלו, כולל מפתחות שכבר מתורגמים.
- לחפש בקבצים קשורים כדי להבין היכן התוכן נמצא וכיצד הוא מובנה.
- לפענח אילו שפות (locales) חסרות ונדרש לייצר אותן.
- לקרוא מחדש את ההוראות המותאמות אישית שלך בכל פעם ("שנה כתובות URL באופן הזה", "השאר את שם המותג באנגלית", "השתמש בפנייה בלתי פורמלית").
- לשכתב את הקובץ כולו, כולל חלקים שלא השתנו.

כל המידע הזה נשלח מחדש בכל סיבוב שיחה (turn), כך שהעלות גדלה לפי `גודל התוכן × מספר השפות × מספר הסיבובים`, וכל חריגה בעיצוב או במפתחות צריכה להתגלות ידנית.

## מה ש-Intlayer עושה במקום זאת

היתרון של Intlayer הוא ביצוע עבודה זו מחוץ להקשר הסוכן, באמצעות pipeline ייעודי שנבנה לתרגום:

- **סינון תרגומים קיימים** להגבלת השימוש ב-tokens. מפתחות שכבר תורגמו ב-JSON שלך מוסרים, ורק המפתחות החסרים נשלחים למודל.
- **תרגום markdown בלוק אחר בלוק.** עבור תיעוד, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-translate.md) ו-[`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-review.md) משווים כל בלוק למסמך הבסיס ומדלגים על בלוקים שכבר תורגמו או שלא שונו.
- **פיצול ה-JSON למקטעים (chunking)** אם הוא גדול מדי, כדי להישאר בחלק האופטימלי של חלון ההקשר.
- **שיטוח ושחזור ה-JSON שלך** לצורך אופטימיזציה של צריכת ה-tokens.
- **הזרקת הנחיות (prompts) מותאמות אישית** עבור כללים ספציפיים הנוגעים למותג ולניסוח שלך (`applicationContext`, `--custom-instructions`), כך שאתה מגדיר אותם פעם אחת במקום לחזור עליהם בכל שיחה.
- **אימות מבנה** להבטחת עקביות ומניעת שינויי מפתחות (key drift), תוך שימור עיצוב (markdown, HTML, הזרקות, צורות רבים).
- **ניהול ניסיונות חוזרים (retries)** במקרה שהפלט אינו תקין.
- **תזמון ומקבול בקשות בתור** על פני קבצים, מקטעים ושפות כדי להאיץ את התהליך.

אף אחד מהשלבים הללו אינו עובר דרך ה-context של הסוכן. כלל האצבע: תן לסוכן להחליט **מה** לבנאם, ותן ל-Intlayer לבצע את העבודה החזרתית.

## פתרון

### 1. האצלת החילוץ ל-`intlayer extract`

במקום לבקש מהסוכן לשכתב כל רכיב באופן ידני, תן לו להריץ את פקודת [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md). הפקודה מעבירה מחרוזות מובנות בקוד (hard-coded strings) לקובץ `.content` לצד הרכיב, מבלי לטעון את כל הקובץ להקשר של הסוכן.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. האצלת התרגום ל-`intlayer fill`

לעולם אל תבקש מהסוכן לתרגם ישירות. פקודת [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) מפעילה את ה-pipeline שתואר לעיל: היא שולחת רק את המפתחות החסרים, מפצלת אותם למקטעים, מריצה את השפות במקביל וכותבת את התוצאה בחזרה לקובצי התוכן שלך.

```bash
npx intlayer fill
```

מספר דגלים שומרים על ריצה חסכונית:

- `--git-diff` (או `--uncommitted`) מעבד רק את המילונים שהשתנו בענף הנוכחי.
- `--file` או `--keys` ממקד את הריצה לקובצי תוכן מסוימים.
- `--output-locales fr es` מגביל את הריצה לשפות שאתה באמת צריך כרגע.
- `--skip-metadata` מדלג על יצירת כותרת, תיאור ותגיות.
- `--data-serialization toon` שולח payload קומפקטי יותר למודל (פחות tokens, פלט מעט פחות עקבי).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. תרגום markdown באמצעות `doc translate` ו-`doc review`

בקשה מסוכן לתרגם קובץ `.md` פירושה הדבקת המסמך כולו, עבור כל שפה ובכל שינוי. הפקודות [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-translate.md) ו-[`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-review.md) עובדות בלוק אחר בלוק במקום זאת.

השתמש ב-`doc translate` כאשר קובץ היעד המתורגם עדיין אינו קיים. הפקודה מפצלת את ה-markdown, מתרגמת אותו במקביל וכותבת את קובצי היעד:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

השתמש ב-`doc review` כאשר הקובץ המתורגם כבר קיים. הפקודה משווה כל בלוק למסמך הבסיס, מדלגת על בלוקים שכבר מתורגמים או ללא שינוי, ושולחת רק את הבלוקים שהשתנו:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

שתי הפקודות מקבלות את הכללים שלך פעם אחת, במקום שתחזור עליהם בכל הנחיה:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

שני מצבים של `doc review` שימושיים כאשר יש צורך שהסוכן יישאר בתמונה, ללא שום קריאת AI מ-Intlayer:

- `--mode report` מציג ביומן את הבלוקים הדורשים התייחסות, כולל מספרי שורות, כך שהסוכן נוגע רק באותם בלוקים.
- `--mode synthesis` מציג ביומן רק אילו מסמכים מעודכנים ואילו מסמכים עדיין מכילים בלוקים לעריכה.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. אפשר לסוכן להפעיל את ה-CLI דרך שרת ה-MCP

בעזרת [שרת ה-MCP של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md), הסוכן עונה בהתבסס על התיעוד הנוכחי ומריץ את `intlayer fill` או `intlayer doc review` בעצמו, במקום לממש זאת מחדש בתוך השיחה.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

התקנת [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md) עם `npx intlayer init skills` מונעת גם מהסוכן לנחש את ה-API של Intlayer ולקרוא מחדש את התיעוד בכל משימה.

### 5. שימוש חוזר במנוי Claude שלך עם `claude setup-token`

הרצת הגדרות ה-i18n בסשן אינטראקטיבי של Claude Code שומרת את כל היסטוריית השיחה בהקשר (context). העבר את העבודה הכבדה לסשן headless קצר במקום זאת.

צור אסימון ארוך טווח מתוך מנוי ה-Claude שלך:

```bash
claude setup-token
```

שמור אותו כ-`CLAUDE_CODE_OAUTH_TOKEN` (בקובץ `.env` או ב-secrets של ה-CI שלך), ואז השתמש בו שוב עבור סשן חד-פעמי המריץ את פקודות Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

הסשן נושא רק את אותה הנחיה ואת פלט הפקודה, ולא את כל השיחה שלך. אותו אסימון עובד גם ב-[Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) להרצת `intlayer fill` בכל pull request.

> האסימון שמונפק על ידי `claude setup-token` מאמת את Claude Code בלבד. לא ניתן להשתמש בו כמפתח Anthropic API ב-`ai.apiKey`. עבור התרגום עצמו, `intlayer fill` משתמשת ב[חשבון Intlayer שלך](https://app.intlayer.org) (כולל מסלול חינמי) או במפתח ספק משלך המוגדר ב-[`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#ai-configuration).

## סיכום

| משימה          | מי מבצע                  | Tokens בהקשר הסוכן |
| -------------- | ------------------------ | ------------------ |
| החלטה מה לבנאם | Claude Code              | נמוך               |
| חילוץ מחרוזות  | `intlayer extract`       | ללא                |
| תרגום תוכן     | `intlayer fill`          | ללא                |
| תרגום תיעוד    | `intlayer doc translate` | ללא                |
| עדכון תיעוד    | `intlayer doc review`    | ללא                |
| הרצת הפקודות   | Headless Claude Code     | הנחיה + פלט פקודה  |
