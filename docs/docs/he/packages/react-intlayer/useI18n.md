---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useI18n | react-intlayer
description: "השתמש ב-useI18n ב-React כדי לקבל פונקציית תרגום התחומה למילון מסוים, שימושי במיוחד בעת מעבר מספריות מבוססות מפתחות."
keywords:
  - useI18n
  - i18n
  - תרגום
  - מילון
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
  - useI18n
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 6.0.0
    date: 2025-06-29
    changes: "כתיבה ראשונית של תיעוד ההוק `useI18n`"
author: aymericzip
---

# שילוב ב-React: תיעוד ההוק `useI18n`

סעיף זה מספק הנחיות מפורטות כיצד להשתמש בהוק `useI18n` ביישומי React, ומאפשר לוקליזציה יעילה של תוכן.

## ייבוא `useI18n` ב-React

ניתן לייבא את ההוק `useI18n` ולשלבו ביישומי React בהתאם לקונטקסט באופן הבא:

- **רכיבי לקוח (Client Components):**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // לשימוש ברכיבי React צד-לקוח
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // לשימוש ברכיבי React צד-לקוח
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // לשימוש ברכיבי React צד-לקוח
  ```

- **רכיבי שרת (Server Components):**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // לשימוש ברכיבי React צד-שרת
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // לשימוש ברכיבי React צד-שרת
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // לשימוש ברכיבי React צד-שרת
  ```

## פרמטרים

הוק זה מקבל שני פרמטרים:

1. **`namespace`**: מרחב שמות של מילון לתחימת מפתחות התרגום.
2. **`locale`** (אופציונלי): השפה הרצויה. אם לא צוינה, שפת הקונטקסט תשמש כברירת מחדל.

## מילון

כל מפתחות המילון חייבים להיות מוצהרים בקובצי הצהרת תוכן כדי לשפר את בטיחות הטיפוסים ולמנוע שגיאות. [הוראות הגדרה ניתן למצוא כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [הוראות הגדרה ניתן למצוא כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

## דוגמאות שימוש ב-React

דוגמאות לשימוש בהוק `useI18n` בתוך רכיבי React:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <ServerComponentExample />
    </>
  );
};
```

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

 </Tab>
</Tabs>

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* הצגת הכותרת */}
      <p>{t("description")}</p> {/* הצגת התיאור */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* הצגת הכותרת */}
      <p>{t("description")}</p> {/* הצגת התיאור */}
    </div>
  );
};
```

## טיפול במאפיינים (Attributes)

בעת התאמת מאפיינים לשפה מסוימת, גש לערכי התרגום בהתאם:

```html
<!-- עבור מאפייני נגישות (כגון aria-label), השתמש ב-.value מאחר שנדרשות מחרוזות טהורות -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## משאבים נוספים

- **עורך ויזואלי של Intlayer**: לחוויית ניהול תוכן אינטואיטיבית יותר, עיין בתיעוד העורך הוויזואלי [כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).

סעיף זה מכסה באופן ספציפי את השילוב של ההוק `useI18n` ביישומי React, תוך פישוט תהליך הלוקליזציה והבטחת עקביות התוכן בין שפות שונות.
