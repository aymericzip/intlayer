---
createdAt: 2026-06-12
updatedAt: 2026-11-03
priority: 8
title: "Variants: מבחני A/B ותוכן חלופי"
description: "הצהר על חלופות תוכן בעלות שם באמצעות וריאציות (variants) של Intlayer עבור מבחני A/B, באנרים עונתיים, feature flags או ניסוח מותאם אישית למשתמש."
keywords:
  - Variants
  - וריאציות
  - מבחני A/B
  - Feature Flags
  - תוכן דינמי
  - רשומות דינמיות
  - CMS
  - Intlayer
  - בינאום
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 9.0.0
    date: 2026-06-12
    changes: "שחרור תכונת הווריאציות (variants)"
  - version: 9.1.0
    date: 2026-06-26
    changes: "כעת `variant` מקבל מחרוזת או אובייקט, מה שהיה בעבר `meta` / רשומות דינמיות מוצהר כעת כ-object variants"
  - version: 9.1.1
    date: 2026-07-31
    changes: "וריאציה מצהירה רק על המפתחות שהיא דורסת; וריאציות שלא הוצהרו נופלות לערך ברירת המחדל"
  - version: 9.1.2
    date: 2026-08-04
    changes: "ספקים (Providers) מקבלים prop בשם `variant` סביבתי; בוררים מקבלים שרשרת העדפות סדורה"
author: aymericzip
---

# וריאציות (Variants)

**וריאציה** (variant) היא קבוצה של קובצי תוכן החולקים את אותו מפתח מילון (`key`), אך כל אחד מהם נושא ערך `variant` שונה. Intlayer מגיש את הקובץ המתאים בהתבסס על הבורר (selector) המועבר ל-`useIntlayer`.

ערך ה-`variant` יכול לקבל **שתי צורות**:

- **מחרוזת**: חלופה בודדת בעלת שם (מבחני A/B, באנרים עונתיים, feature flags).
- **אובייקט**: מבחין מובנה הממוען באמצעות קבוצת שדות (רשומות CMS, ניסוח מותאם משתמש, כל תוכן הממופתח באמצעות מזהה אטום). האובייקט כולו מהווה את הזהות: על הבורר לספק אובייקט **זהה** כדי לפענח את הרשומה.

> צורת האובייקט מחליפה את שדה ה-`meta` הישן. בכל מקום שבו כתבת בעבר `meta: { id, … }`, כתוב כעת `variant: { id, … }`, ובחר אותו באמצעות `{ variant: { id, … } }`.

## וריאציות בעלות שם (מחרוזת)

כל קובץ מייצג חלופה בעלת שם אחת. השמטת `variant` (או הגדרתו ל-`"default"`) מסמנת אותו כ-fallback (ברירת המחדל).

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      he: "בנו מהר יותר עם Intlayer",
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({
      he: "להתחיל",
      en: "Get started",
      fr: "Commencer",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      he: "50% הנחה, היום בלבד",
      en: "50 % off, today only",
      fr: "−50 %, aujourd'hui seulement",
    }),
    cta: t({
      he: "קנה עכשיו",
      en: "Shop now",
      fr: "Acheter maintenant",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

### וריאציות חלקיות

וריאציה מצהירה **רק על המפתחות שהיא דורסת**; השאר עוברים בירושה מרשומת ברירת המחדל.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      he: "בנו מהר יותר כל הקיץ",
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "בנו מהר יותר כל הקיץ", cta: "להתחיל" }, `cta` מורש

useIntlayer("hero-banner", { variant: "never-declared" });
// → רשומת ברירת המחדל
```

לכן עליך להוסיף קובץ variant רק במקומות שבהם הניסוח אכן שונה. מפתח יתפענח ל-`null` רק כאשר הוא מצהיר על variants אך אין לו רשומת ברירת מחדל.

### צריכת וריאציות בעלות שם

#### וריאציית ברירת מחדל

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → וריאציית ברירת מחדל

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → וריאציית ברירת מחדל

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → וריאציית ברירת מחדל

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → וריאציית ברירת מחדל

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### וריאציה בעלת שם

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### וריאציה בעלת שם עם שפה מפורשת

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## וריאציות אובייקט (מובנות)

וריאציית אובייקט ממקמת תוכן לפי קבוצה שרירותית של זוגות מפתח-ערך המוצהרים בשדה `variant`, מה שמאפשר למדל רשומות CMS, ניסוח מותאם אישית למשתמש, או כל תוכן שהמפתח שלו הוא מזהה אטום. **האובייקט כולו** מהווה את הזהות: הבורר חייב לספק אובייקט שווה ערך כדי שהרשומה תפוענח.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({
      he: "וידג'ט פרו",
      en: "Widget Pro",
      fr: "Widget Pro",
    }),
    description: t({
      he: "הווידג'ט הטוב ביותר.",
      en: "The best widget.",
      fr: "Le meilleur widget.",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({
      he: "וידג'ט לייט",
      en: "Widget Lite",
      fr: "Widget Lite",
    }),
    description: t({
      he: "אפשרות קלה יותר.",
      en: "A lighter option.",
      fr: "Une option plus légère.",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

### צריכת וריאציות אובייקט

העבר את האובייקט התואם ל-`variant`. כל שדה שהוצהר במילון חייב להיות מסופק ולהיות שווה; אחרת התוצאה היא `null`. סדר השדות אינו משנה.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### עם שפה מפורשת

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### שדה חסר, ללא התאמה

```ts
// מחזיר null: `userId` חסר, לכן האובייקט אינו תואם לווריאציה שהוצהרה
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## וריאציה סביבתית (Ambient variant)

ממדי וריאציה מסוימים קבועים עבור סשן שלם, ה-tenant, סוג בית הספר, או רמת התוכנית (plan tier). הם מפוענחים פעם אחת, ואף רכיב אינו צריך להעביר אותם ידנית.

> אל תעטוף את `useIntlayer` ב-hook משלך כדי להזריק אותם. אופטימיזציית זמן הבנייה משכתבת אך ורק קריאות מילוליות של `useIntlayer("key")` המיובאות ישירות מחבילת הפריימוורק, כך ששום דבר מאחורי עטיפה אינו נכלל ב-bundle בצורה ממוטבת.

הצהר על ה-variant פעם אחת ב-provider במקום זאת, בדיוק כמו `locale`:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">
        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```
      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">
        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerServerProvider } from "next-intlayer/server";
        import { IntlayerClientProvider } from "next-intlayer";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerServerProvider locale={locale} variant={schoolType}>
              <IntlayerClientProvider locale={locale} variant={schoolType}>
                {children}
              </IntlayerClientProvider>
            </IntlayerServerProvider>
          );
        }
        ```
      </Tab>
    </Tabs>

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

כל קריאת מילון מתחת ל-provider מתפענחת כעת מול אותה וריאציה, ובורר באתר הקריאה (call-site) תמיד מנצח:

```tsx
useIntlayer("hero-banner");
// → וריאציית ה-provider

useIntlayer("hero-banner", { variant: "summer" });
// → "summer", מחליף את וריאציית ה-provider (אינו מרחיב אותה)
```

### צורות שימוש (Forms)

ה-prop‏ `variant` מקבל שלוש צורות:

| צורה                                                      | משמעות                           |
| :-------------------------------------------------------- | :------------------------------- |
| `variant="school1"`                                       | וריאציה אחת בעלת שם עבור כל מפתח |
| `variant={["school1", "default"]}`                        | שרשרת העדפות סדורה               |
| `variant={{ "hero-banner": "school1", default: "base" }}` | וריאציה אחת לכל מפתח מילון       |

#### שרשרת העדפות

שרשרת נבדקת משמאל לימין מול הרשומות שכל מפתח מצהיר עליהן, והרשומה המוצהרת הראשונה מנצחת. כאשר אף אחת מהן אינה מוצהרת, נעשה שימוש ברשומת ברירת המחדל המשתמעת, בדיוק כמו עבור ערך בודד.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` אינו מצהיר על רשומת `school1` אך מצהיר על `school2` → "school2"
// מפתח שאינו מצהיר על אף אחת מהן                                  → רשומת ברירת המחדל
```

לפיכך, `["black_friday", "summer"]` נקרא כ"בלאק פריידי אם למפתח זה יש כזה, אחרת קיץ, אחרת ברירת מחדל". שרשראות מתקבלות גם באתר הקריאה:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> שים לב שזוהי תמונת ראי של המערך המתקבל על ידי **שדה** ה-`variant` בקובץ תוכן: שם מערך _מצהיר_ על רשומה אחת לכל אלמנט, כאן הוא _צורך_ אותן בסדר עדיפות.

#### מפה לפי מפתח (Per-key map)

פנה לכל מפתח מילון בנפרד. רשומת `default` השמורה מכסה כל מפתח שאינו מצוין ברשימה:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> ב-provider, אובייקט רגיל נקרא **תמיד** כמפה לפי מפתח, ולעולם לא כ-object variant (שכן השניים זהים מבנית). כדי להגדיר object variant באופן גלובלי, קנן אותו תחת רשומה: `variant={{ default: { id: "prod_abc" } }}`.

מכיוון שמפתחות המפה נבדקים מול מפתחות המילון שהצהרת עליהם, שגיאת כתיב (או object variant שנכתב ישירות, כגון `variant={{ id: "prod_abc" }}`) מהווה שגיאת זמן הידור (compile-time error).

## מצב טעינה (Loading mode)

וריאציות אובייקט נטענות לעתים קרובות באופן עצל (lazy). הגדר `importMode` במילון כדי לשלוט בכך:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // או "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: {/* … */},
} satisfies Dictionary;

export default dictionary;
```

עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) לפרטים על מצבי `static`, `dynamic` ו-`fetch`.

- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)

## תרחישי שימוש נפוצים

- מבחני ניסוח A/B המונעים על ידי מפתח ניסוי
- באנרים עונתיים או פרסומיים
- הודעות מבוססות feature flags
- קמפיינים שיווקיים מותאמי שפה
- ניסוח שיווקי לכל מוצר המנוהל ב-CMS
- תוכן ספציפי למשתמש או לחשבון
- כל תוכן הממופתח באמצעות מזהה אטום בזמן ריצה
