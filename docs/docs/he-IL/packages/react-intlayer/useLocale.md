---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useLocale | react-intlayer
description: "השתמש ב-useLocale ב-React כדי לקרוא את השפה הנוכחית, שפת ברירת המחדל והשפות הזמינות, ולהחליף שפה מכל רכיב."
keywords:
  - useLocale
  - מילון
  - מפתח
  - Intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# שילוב ב-React: תיעוד ההוק `useLocale`

סעיף זה מספק פרטים מקיפים על ההוק `useLocale` מספריית `react-intlayer`, המיועד לניהול שפות (locales) ביישומי React.

## ייבוא `useLocale` ב-React

כדי לשלב את ההוק `useLocale` ביישום ה-React שלך, ייבא אותו מהחבילה המתאימה:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { useLocale } from "react-intlayer"; // משמש ברכיבי React לניהול שפה
```

## סקירה כללית

ההוק `useLocale` מציע דרך פשוטה לגשת להגדרות השפה ולשנות אותן בתוך רכיבי React. הוא מספק גישה לשפה הנוכחית, לשפת ברירת המחדל, לכל השפות הזמינות, ופונקציות לעדכון הגדרות השפה.

## שימוש

כך תוכל להשתמש בהוק `useLocale` בתוך רכיב React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## פרמטרים וערכים מוחזרים

בעת הפעלת ההוק `useLocale`, הוא מחזיר אובייקט המכיל את המאפיינים הבאים:

- **`locale`**: השפה הנוכחית כפי שנקבעה בקונטקסט של React.
- **`defaultLocale`**: השפה הראשית שהוגדרה בקונפיגורציה.
- **`availableLocales`**: רשימה של כל השפות הזמינות כפי שהוגדרו בקונפיגורציה.
- **`setLocale`**: פונקציה לעדכון השפה הנוכחית בתוך קונטקסט היישום.

## דוגמה

דוגמה זו מציגה רכיב המשתמש בהוק `useLocale` כדי לרנדר בורר שפות, המאפשר למשתמשים לשנות באופן דינמי את שפת היישום:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## סיכום

ההוק `useLocale` מ-`react-intlayer` הוא כלי חיוני לניהול שפות ביישומי ה-React שלך, ומספק את הפונקציונליות הדרושה להתאמת היישום שלך לקהלים בינלאומיים שונים בצורה יעילה.
