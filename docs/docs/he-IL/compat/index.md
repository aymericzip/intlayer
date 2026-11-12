---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "מתאמי תאימות של Intlayer עבור ספריות i18n קיימות"
description: "הגרו את פתרון ה-i18n הקיים שלכם ל-Intlayer ללא חיכוך באמצעות מתאמי תאימות (compat adapters)."
keywords:
  - תאימות
  - הגירה
  - בינאום
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# מתאמי תאימות של Intlayer

הגירה של אפליקציה גדולה לספריית בינאום חדשה עלולה להיראות מרתיעה. כדי להקל על מעבר זה, Intlayer מספקת **מתאמי תאימות (compat adapters)** עבור ספריות ה-i18n הפופולריות ביותר באקוסיסטם.

חבילות מתאמים אלו חושפות את **אותו ה-API הציבורי בדיוק** של ספריות ה-i18n הקיימות שלכם, אך מאצילות את כל עבודת התרגום ל-Intlayer בזמן ריצה.

## כיצד זה עובד

כאשר אתם משתמשים במתאם תאימות, אינכם צריכים לשכתב את הייבואים (imports) באפליקציה שלכם או לשנות את אופן השימוש ב-hooks וברכיבי התרגום. במקום זאת, תוספי ה-bundler של Intlayer מבצעים כינוי (aliasing) אוטומטי של הייבואים הקיימים שלכם לחבילות התאימות של Intlayer.

לדוגמה, מפתח מחליף את `import { useTranslation } from 'react-i18next'` ב-`import { useTranslation } from '@intlayer/react-i18next'` (מתבצע אוטומטית באמצעות תוסף ה-bundler), והאפליקציה ממשיכה לעבוד כשהתרגומים מוגשים כעת ממילוני Intlayer. המפתחות גם מקבלים בדיקת טיפוסים מול מילוני ה-Intlayer שלכם!

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)

## מתאמי תאימות זמינים

בחרו את הספרייה הקיימת שלכם למטה כדי לראות כיצד להגר בצורה חלקה:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
