---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "מעבר ל-Intlayer מ-i18next, ‏next-intl, ‏react-intl, ‏Lingui, ‏vue-i18n ועוד"
description: "העבירו אפליקציה קיימת ל-Intlayer בלי לשכתב את קריאות התרגום. ה-compat adapters שומרים על ה-API של i18next, ‏react-i18next, ‏next-intl, ‏react-intl, ‏Lingui, ‏vue-i18n, ‏svelte-i18n ו-ngx-translate."
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# מעבר ל-Intlayer מספריית ה-i18n הנוכחית שלכם

שכתוב כל קריאת תרגום באפליקציה גדולה הוא כמעט אף פעם לא אפשרות. Intlayer מספקת **compat adapters**: packages שחושפים את **אותו API** של ספריית ה-i18n הנוכחית שלכם, אבל מגישים את ההודעות מתוך המילונים של Intlayer.

## איך זה עובד

1. **שמרו על הקוד.** הקריאות `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` או `| translate` נשארות כמו שהן.
2. **שמרו על קובצי ההודעות.** [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) (או [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)) קורא את הקבצים הקיימים וכותב אליהם את התרגומים בחזרה.
3. **החליפו את תוסף ה-bundler.** כל adapter מגיע עם תוסף שבונה את המילונים ומפנה את ה-imports של הספרייה המקורית ל-adapter. אין צורך לשנות אף import.

תקבלו מפתחות עם טיפוסים, טעינת מילונים לפי עמוד, תרגום בבינה מלאכותית דרך ה-[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md), את [העורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) ואת ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md). לאחר מכן אפשר לעבור לקובצי `.content.ts` נייטיב, קומפוננטה אחת בכל פעם.

> כדי להבין מאיפה הגיעו הספריות האלה, קראו את [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md).

## compat adapters זמינים

| ספרייה                                                   | Framework  | Adapter                   | מדריך מעבר                                                                                                                           |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [מעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [מעבר מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [מעבר מ-next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [מעבר מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [מעבר מ-react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [מעבר מ-Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [מעבר מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [מעבר מ-@nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [מעבר מ-svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [מעבר מ-ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_ngx-translate_to_intlayer.md) |

## התחלה מהירה

לא משנה באיזו ספרייה אתם משתמשים, הצעד הראשון זהה. `intlayer init` מזהה את ספריית ה-i18n הנוכחית ומתקין את ה-adapter המתאים:

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

לאחר מכן עקבו אחר מדריך המעבר של הספרייה שלכם למעלה.

## מתחילים מאפס?

אם באפליקציה שלכם עדיין אין ספריית i18n, דלגו על ה-adapters והתחילו עם ה-API הנייטיב:

- [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
- [Intlayer עם Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)
- [Intlayer עם Vite ו-Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+vue.md)
- [Intlayer עם Vite ו-Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+svelte.md)
- [Intlayer עם Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_21.md)
