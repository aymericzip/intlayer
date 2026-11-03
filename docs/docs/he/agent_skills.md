---
createdAt: 2026-02-09
updatedAt: 2026-11-03
priority: 6
title: "כישורי סוכן Intlayer עבור סוכני קידוד AI (Agent Skills)"
description: "העניקו לסוכן הקידוד שלכם מבוסס AI כישורי Intlayer: מדריכי הגדרה לתוכן, מטא-דאטה, מפות אתר ו-server actions שהוא יכול לבצע בפרויקט שלכם."
keywords:
  - Intlayer
  - כישורי סוכן
  - סוכן AI
  - בינאום
  - תיעוד
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "היסטוריית גרסאות ראשונית"
author: aymericzip
---

# כישורי סוכן (Agent Skills)

## הגדרה

### שימוש ב-CLI

הפקודה `intlayer init skills` היא הדרך הקלה ביותר להגדיר כישורי סוכן (agent skills) בפרויקט שלכם. היא מזהה את סביבת העבודה שלכם ומתקינה את קובצי התצורה הדרושים עבור הפלטפורמות המועדפות עליכם.

```bash packageManager="npm"
npx intlayer init skills
```

```bash packageManager="yarn"
yarn intlayer init skills
```

```bash packageManager="pnpm"
pnpm intlayer init skills
```

```bash packageManager="bun"
bun x intlayer init skills
```

### שימוש ב-SDK של Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### שימוש בתוסף VS Code של Intlayer

1. פתחו את לוח הפקודות (Command Palette) באמצעות Ctrl+Shift+P או Cmd+Shift+P.
2. הקלידו `Intlayer: Setup AI Agent Skills`.
3. בחרו את הפלטפורמה שבה אתם משתמשים (לדוגמה: `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` ועוד).
4. בחרו את הכישורים (Skills) שברצונכם להתקין (לדוגמה: `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. לחצו על Enter.

## רשימת כישורים (Skills List)

**intlayer-config**

- מעניק לסוכן את היכולת להבין את הגדרות ה-i18n הספציפיות של הפרויקט שלכם, ומאפשר לו להגדיר במדויק שפות (locales), דפוסי ניתוב (routing patterns) ואסטרטגיות fallback.

**intlayer-cli**

- מאפשר לסוכן לנהל באופן אוטונומי את מחזור החיים של התרגומים שלכם, כולל ביקורת תרגומים חסרים, בניית מילונים וסנכרון תוכן באמצעות שורת הפקודה.

**intlayer-angular**

- מצייד את הסוכן במומחיות ספציפית ל-framework כדי ליישם נכון דפוסי i18n ריאקטיביים ו-signals בהתאם לשיטות העבודה המומלצות של Angular.

**intlayer-astro**

- מעניק לסוכן את הידע לנהל תרגומים בצד השרת ודפוסי ניתוב מקומיים ייחודיים לאקוסיסטם של Astro.

**intlayer-content**

- מלמד את הסוכן כיצד להשתמש בצמתי תוכן מתקדמים, כגון ריבוי (pluralization), תנאים ו-Markdown, כדי לבנות מילונים עשירים, דינמיים ומותאמים לשפות שונות.

**intlayer-next-js**

- מעניק לסוכן הבנה מעמיקה ליישום i18n ברכיבי שרת ולקוח של Next.js, תוך הבטחת אופטימיזציית SEO וניתוב מקומי חלק.

**intlayer-react**

- מספק ידע ייעודי עבור הסוכן ליישום רכיבי i18n דקלרטיביים ו-hooks ביעילות בתוך כל סביבה מבוססת React.

**intlayer-preact**

- מבצע אופטימיזציה ליכולת של הסוכן ליישם i18n עבור Preact, ומאפשר לו לכתוב רכיבים מקומיים קלי משקל באמצעות signals ודפוסים ריאקטיביים יעילים.

**intlayer-solid**

- מאפשר לסוכן לנצל את הריאקטיביות המדויקת (fine-grained reactivity) של SolidJS לניהול תוכן מקומי בעל ביצועים גבוהים.

**intlayer-svelte**

- מלמד את הסוכן להשתמש ב-Svelte stores ובתחביר אידיומטי לתוכן מקומי ריאקטיבי ובטוח מבחינת טיפוסים (type-safe) ברחבי אפליקציות Svelte ו-SvelteKit.

**intlayer-remote-content**

- מאפשר לסוכן לשלב ולנהל תוכן מרוחק, ומאפשר לו לטפל בסנכרון חי (live-syncing) ותהליכי עבודה של תרגום מרוחק באמצעות Intlayer CMS.

**intlayer-usage**

- מגדיר סטנדרט לגישת הסוכן למבנה הפרויקט ולהצהרת תוכן, ומבטיח שהוא יפעל לפי תהליכי העבודה היעילים ביותר עבור פרויקט ה-i18n שלכם.

**intlayer-vue**

- מצייד את הסוכן בדפוסים ייחודיים ל-Vue, כולל Composables ותמיכה ב-Nuxt, לבניית אפליקציות אינטרנט מודרניות ומותאמות לשפות שונות.

**intlayer-compiler**

- מפשט את תהליך העבודה של הסוכן על ידי הפעלת חילוץ תוכן אוטומטי, ומאפשר לו לכתוב מחרוזות הניתנות לתרגום ישירות בקוד שלכם ללא צורך בקובצי מילון ידניים.

**intlayer-lit**

- מלמד את הסוכן לתרגם רכיבי אינטרנט של Lit באמצעות ה-ReactiveControllers מסוג `useIntlayer` ו-`useLocale`.

**intlayer-vanilla**

- מאפשר לסוכן לבצע לוקליזציה של דפי JavaScript / TypeScript רגילים באמצעות `vanilla-intlayer`, עם או בלי bundler.

**intlayer-remix**

- מעניק לסוכן את ה-middleware של נתב Remix 3 ואת ה-hooks מסוג `useIntlayer` / `useLocale` ברמת ה-request.

**intlayer-backend**

- מצייד את הסוכן ביכולת לתרגם תגובות שרת ב-Express, Fastify, Hono, NestJS, AdonisJS ו-Elysia באמצעות דפוס משותף אחד של middleware בתוספת `t` / `getIntlayer`.

**intlayer-dev-tools**

- מאפשר לסוכן להגדיר את כלי הפיתוח של Intlayer סביב הקוד שלכם: כללי ESLint עבור מחרוזות מקודדות (hardcoded strings), שרת השפה (Language Server), תוספי VS Code ו-Chrome, שרת ה-MCP ובדיקות תרגום ב-CI/CD.

**intlayer-markdown**

- מלמד את הסוכן להצהיר על תוכן Markdown (`md()`, קובצי `.content.md`, קבצים חיצוניים) ולרנדר אותו באמצעות רכיבי MDX, `MarkdownProvider` גלובלי, Suspense ופענוח בצד השרת.

**intlayer-compat**

- מנחה את הסוכן בתהליך הגירה מ-i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n או Lingui באמצעות מתאמי תאימות (compat adapters) ששומרים על ה-API המקורי, כך שאין צורך לשכתב קריאות תרגום.
