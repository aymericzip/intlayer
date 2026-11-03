---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 8
title: "שילוב Intlayer ב-CI/CD עבור תרגומים"
description: למד כיצד לשלב את Intlayer בצינור ה-CI/CD שלך לניהול תוכן ופריסה אוטומטיים.
keywords:
  - CI/CD
  - אינטגרציה רציפה
  - פריסה רציפה
  - אוטומציה
  - בינאום
  - תיעוד
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הפקה אוטומטית של תרגומים בצינור CI/CD

Intlayer מאפשר יצירה אוטומטית של תרגומים עבור קובצי הצהרת התוכן שלך. ישנן מספר דרכים להשיג זאת בהתאם לתהליך העבודה שלך.

## תוכן העניינים

<TOC/>

## שימוש ב-CMS

באמצעות Intlayer, תוכל לאמץ תהליך עבודה שבו שפה אחת בלבד מוצהרת מקומית, בעוד שכל שאר התרגומים מנוהלים מרחוק דרך ה-CMS. הדבר מאפשר לנתק את התוכן והתרגומים לחלוטין מבסיס הקוד, ומעניק גמישות רבה יותר לעורכי תוכן תוך הפעלת Live Sync (ללא צורך בבנייה מחדש של האפליקציה כדי להחיל שינויים).

### דוגמה לתצורה

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // שפות אופציונליות ינוהלו מרחוק
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    // אישורי CMS אם אתה משתמש ב-CMS
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
  ai: {
    applicationContext: "This is a test application", // מסייע להבטיח עקביות ביצירת התרגום
  },
};

export default config;
```

כדי ללמוד עוד על ה-CMS, עיין ב[תיעוד הרשמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [Intlayer CMS: החצנת התוכן הרב-לשוני שלך](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שימוש ב-Husky

תוכל לשלב יצירת תרגומים בתהליך ה-Git המקומי שלך באמצעות [Husky](https://typicode.github.io/husky/).

### דוגמה לתצורה

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // שפות אופציונליות מטופלות מרחוק
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // השתמש במפתח API משלך

    applicationContext: "This is a test application", // מסייע להבטיח עקביות ביצירת התרגום
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # כדי להבטיח שהמילונים מעודכנים
npx intlayer fill --unpushed --mode complete    # ממלא רק תוכן חסר, אינו מעדכן תוכן קיים
```

> למידע נוסף על פקודות Intlayer CLI והשימוש בהן, עיין ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- [תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)

> אם יש לך מספר אפליקציות במאגר המשתמשות במופעי Intlayer נפרדים, תוכל להשתמש בארגומנט `--base-dir` באופן הבא:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

## שימוש ב-GitHub Actions

Intlayer מספק פקודת CLI להשלמה אוטומטית וסקירה של תוכן מילונים. ניתן לשלב זאת בתהליך ה-CI/CD שלך באמצעות GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
# תנאי הפעלה עבור תהליך עבודה זה
on:
  pull_request:
    branches:
      - "main"

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
      # OpenAI
      AI_PROVIDER: openai
      AI_MODEL: gpt-5.6-terra
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # שלב 1: משיכת הקוד העדכני ביותר מהמאגר
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true # שמירת אישורים ליצירת PRs
          fetch-depth: 0 # קבלת היסטוריית git מלאה לניתוח diff

      # שלב 2: הגדרת סביבת Node.js
      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # שימוש ב-Node.js 20 LTS ליציבות

      # שלב 3: התקנת תלויות הפרויקט
      - name: 📦 Install dependencies
        run: npm install

      # שלב 4: התקנת Intlayer CLI גלובלית לניהול תרגומים
      - name: 📦 Install Intlayer
        run: npm install -g intlayer-cli

      # שלב 5: בניית פרויקט Intlayer להפקת קובצי תרגום
      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      # שלב 6: שימוש ב-AI להשלמה אוטומטית של תרגומים חסרים
      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # שלב 7: בדיקה אם יש שינויים וביצוע commit
      - name: 🔍 Check for changes
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # שלב 8: ביצוע Commit ודחיפת שינויים אם קיימים
      - name: 📤 Commit and push changes
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

כדי להגדיר את משתני הסביבה, עבור אל GitHub → Settings → Secrets and variables → Actions והוסף את הסוד.

> בדומה ל-Husky, במקרה של מונוריפו תוכל להשתמש בארגומנט `--base-dir` כדי לטפל בכל אפליקציה ברצף.

> כברירת מחדל, הארגומנט `--git-diff` מסנן מילונים הכוללים שינויים מענף הבסיס (ברירת מחדל `origin/main`) לענף הנוכחי (ברירת מחדל: `HEAD`).

> למידע נוסף על פקודות Intlayer CLI והשימוש בהן, עיין ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- [תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
