---
createdAt: 2026-06-12
updatedAt: 2026-11-03
priority: 8
title: "מילונים דינמיים: קולקציות ו-Variants"
description: "סקירה של תכונות המילונים הדינמיים של Intlayer, קולקציות ו-variants, לבניית תוכן i18n גמיש המונע בזמן ריצה."
keywords:
  - מילונים דינמיים
  - קולקציות
  - Variants
  - וריאציות
  - Intlayer
  - בינאום
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "שחרור תכונת המילונים הדינמיים"
  - version: 9.1.0
    date: 2026-06-26
    changes: "מיזוג רשומות דינמיות לתוך variants, כעת `variant` מקבל מחרוזת או אובייקט"
author: aymericzip
---

# מילונים דינמיים (Dynamic Dictionaries)

Intlayer תומך בשני מנגנונים להבעת תוכן החורג ממילון סטטי בודד לכל מפתח. כל אחד מהם מוצהר באמצעות **שדה מטא-דאטה ברמה העליונה** בקובץ התוכן; אין צורך בפונקציית עטיפה (wrapper function).

| תכונה                                                                                                                          | שדה מטא-דאטה                            | בורר (Selector) ב-`useIntlayer`                 |
| :----------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :---------------------------------------------- |
| [קולקציות (Collections)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/collections.md) | `item: N`                               | `{ item: N }`                                   |
| [וריאציות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md)       | `variant: "name"` _או_ `variant: { … }` | `{ variant: "name" }` _או_ `{ variant: { … } }` |

שניהם משתלבים עם ארגומנט השפה (locale) ותומכים בטעינה בררנית / עצלה (lazy loading) באמצעות `importMode`.

## מתי להשתמש בכל אחד

- **קולקציות (Collections)**: רשימה סדורה של פריטים המנוהלים בקבצים נפרדים (שאלות נפוצות, פוסטים בבלוג, מוצרים).
- **וריאציות (Variants)**: חלופות תוכן בעלות שם או מבנה מוגדר:
  - וריאציית **מחרוזת** עבור מבחני A/B, באנרים עונתיים או feature flags;
  - וריאציית **אובייקט** עבור רשומות CMS, ניסוח מותאם משתמש, או כל תוכן הממוען באמצעות קבוצת שדות (מה שנקרא בעבר "dynamic records").

> גרסאות קודמות חשפו שדה `meta` נפרד עבור תוכן הממופתח לפי רשומות. שדה זה מוזג לתוך `variant`: העבר **אובייקט** ל-`variant` במקום להשתמש ב-`meta`.

## יישוב אי-בהירות בבורר (Selector Disambiguation)

מפתח עשוי להצהיר על שני הממדים בעת ובעונה אחת (למשל, קולקציה שכל אחד מפריטיה כולל variant). הם מפוענחים בסדר הבא:

```
variant → item
```

לפיכך, `{ variant: "promo" }` על מפתח המשלב variant × item יחזיר כל פריט promo כמערך, והוספת `{ item: 2 }` תצמצם אותו לרשומה בודדת.
