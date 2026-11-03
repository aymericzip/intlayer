---
createdAt: 2026-07-08
updatedAt: 2026-11-03
priority: 8
title: "Intlayer Analytics: חשיפת תוכן ובדיקות A/B"
description: גלו כיצד @intlayer/analytics עוקב אחר צפיות בדפים/שפות וחשיפת תוכן, וכיצד להשתמש בו לביצוע בדיקות A/B על תוכן ה-Intlayer שלכם.
keywords:
  - אנליטיקה
  - בדיקות A/B
  - קהל יעד
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "הפעלת אנליטיקה כברירת מחדל, פעילה ברגע ש-@intlayer/analytics מותקנת"
  - version: 9.0.0
    date: 2026-07-08
    changes: "תיעוד ראשוני, חבילת @intlayer/analytics, מעקב ברמת provider ו-node, בדיקות A/B, לוח בקרה"
author: aymericzip
---

# תיעוד Intlayer Analytics

`@intlayer/analytics` היא חבילה נלווית אופציונלית המדווחת לכם **איזה תוכן מוצג בפועל** למבקרים שלכם (איזה דף, באיזו שפה ואיזה קטע ספציפי של תוכן מתורגם), כך שתוכלו להבין את קהל היעד שלכם ולהריץ **בדיקות A/B על תוכן**.

## תוכן עניינים

<TOC/>

## מה נמדד ונרשם

`@intlayer/analytics` מקבצת שלושה סוגים של אירועים אנונימיים:

| אירוע              | היכן הוא נלכד                                   | מה הוא מספר לכם                                                                               |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `page_view`        | ברמת ה-Provider (ספק ה-Intlayer)                | באיזה דף ובאיזו שפה צפה הסשן, בטעינה הראשונה, בשינוי נתיב (route change) או במעבר שפה.        |
| `content_exposure` | ברמת ה-Node (`useIntlayer` / תוספי interpreter) | איזה מפתח מילון / נתיב מפתח פוענח והוצג בפועל, וכאשר הוא חלק מניסוי, איזו **גרסה (variant)**. |
| `conversion`       | בכל מקום שבו אתם קוראים ל-`useConversion()`     | יעד שהושג (הרשמה, לחיצה, רכישה...) המשויך לגרסת ה-A/B שאליה נחשף הסשן.                        |

אירועים נאספים בזיכרון ונשלחים כ**בקשה מקובצת יחידה (batch) בערך כל 20 שניות**, לעולם לא בכל הקשה או רינדור, כך שאנליטיקה לעולם אינה משפיעה על זמן הרינדור הראשוני או מוסיפה בקשת רשת לכל אינטראקציה.

## כיצד היא מאפשרת בדיקות A/B על תוכן

Intlayer כבר מאפשרת לכם להגדיר [גרסאות תוכן (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) (למשל, מילון `hero-banner` עם גרסת ברירת מחדל וגרסת `black_friday`). חבילת `@intlayer/analytics` סוגרת את המעגל:

1. `useExperiment(experimentKey, variants)` מקצה באופן דטרמיניסטי כל סשן אנונימי לגרסה מסוימת, כפונקציה טהורה של מזהה הסשן ומפתח הניסוי. כך ההקצאה נשארת **יציבה לאורך כל הסשן** ואינה דורשת **סבב תקשורת לשרת** לפני הרינדור הראשוני (ללא הבהוב וללא layout shift).
2. כל אירוע `content_exposure` נושא עמו את ה-`variant` שהוצגה.
3. `useConversion()` מאפשר לכם לשייך יעד (כגון `"cta_click"`) לאותה גרסה.
4. נקודת הקצה של תוצאות הניסוי בלוח הבקרה משווה את שיעורי ההמרה לכל גרסה, כולל מובהקות סטטיסטית (z-test).

- [גרסאות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)

## התקנה

`@intlayer/analytics` היא **תלות אופציונלית (optional dependency)** של כל חבילת framework (`react-intlayer`, `next-intlayer`, `vue-intlayer` וכו'), כך שרוב הפרויקטים כבר כוללים אותה. התקינו אותה במפורש אם סביבת ההתקנה שלכם מדלגת על תלויות אופציונליות (`npm install --no-optional`, התקנות עם `NODE_ENV=production` בחלק ממנהלי החבילות וכו'):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

התקנת החבילה היא כל מה שנדרש כדי להפעיל את האנליטיקה: `analytics.enabled` מוגדר כברירת מחדל ל-`true`, ו-Intlayer מגדירה אותו ל-`false` בכל פעם שהחבילה אינה נמצאת בפרויקט שלכם. אם אינכם מתקינים אותה, כל נקודת שילוב הופכת ל-no-op. ראו [אפס עלות כאשר אינה מותקנת](#zero-cost-when-not-installed) להלן.

## הגדרות (Configuration)

אנליטיקה אינה דורשת הגדרות מיוחדות כדי להתחיל: היא **מופעלת כברירת מחדל** ו**עושה שימוש חוזר בבלוק ההגדרות הקיים של `editor`** עבור נקודת הקצה ומפתח הפרויקט שלה.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // משמש גם כנקודת קליטת האנליטיקה (ingestion endpoint)
    clientId: "your-client-id", // משמש גם כמפתח פרויקט האנליטיקה
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL`: כתובת הבסיס שאליה נשלחים אירועי האנליטיקה (`POST {backendURL}/api/analytics/events`).
- `editor.clientId`: מפתח הפרויקט ה**ציבורי**. הוא מזהה את הפרויקט כאשר ה-SDK מבקש token לקליטת נתונים, ומשמש כ**מתג הפעלה**: האנליטיקה נשארת מושבתת לחלוטין (ועוברת tree-shaking, ראו להלן) עד ש-`clientId` מוגדר.
- `editor.clientSecret`: **לעולם אינו בשימוש על ידי האנליטיקה, ולעולם אינו נשלח לדפדפן.** זהו מזהה סודי המיועד לשרת בלבד. ראו [כיצד מאומתים אירועים](#how-events-are-authenticated).

אם אתם מארחים את Intlayer בעצמכם (self-hosting), האנליטיקה מצביעה אוטומטית על המופע שלכם מאחר שהיא חולקת את `editor.backendURL`.

### קריאה ל-API מתוך הדפדפן

אותו אסימון (token) מגבה לקוח קל משקל ללא פרטי הזדהות רגישים, כך שאתר סטטי או SPA יכול לקרוא את תוכן ה-CMS שלו בזמן ריצה ללא שרת, ללא server action וללא שום secret ב-bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

הוא מאמת את עצמו מתוך `editor.clientId`, כאשר ההחלפה, השמירה במטמון (caching) והחידוש מנוהלים פנימית. ה-scopes מגבילים את מה שהוא יכול לגשת אליו: תוכן מילון שפורסם וקליטת אנליטיקה. כל פעולה אחרת (דחיפת מילונים, קריאת פרויקט, שימוש בקרדיטים של AI) דורשת פרטי הזדהות אמיתיים, ולכן דורשת שרת או משתמש מחובר.

### ביטול הצטרפות (Opting out)

בלוק `analytics` האופציונלי מאפשר לכוונן או לכבות את איסוף הנתונים:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // ברירת מחדל: true, מוציא את כל האינטגרציה מה-bundle
    flushInterval: 20_000, // מילישניות בין שתי שליחות מקובצות (flushes)
    sampleRate: 1, // חלק הסשנים לתיעוד, מ-0 (ללא) עד 1 (כולם)
  },
};

export default config;
```

הסרת ההתקנה של `@intlayer/analytics` משיגה את אותה תוצאה כמו `enabled: false`. ראו את [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#analytics-configuration) עבור רשימת השדות המלאה.

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#analytics-configuration)

## שימוש

### מעקב אוטומטי ברמת ה-Provider

אין צורך בשינויי קוד. ברגע ש-`@intlayer/analytics` מותקנת ו-`editor.clientId` מוגדר, ה-provider של Intlayer שאתם כבר משלבים באפליקציה מבצע אוטומטית:

- אתחול לקוח האנליטיקה בעת הטעינה (mount),
- רישום `page_view` בטעינה הראשונית,
- רישום `page_view` בכל החלפת שפה,
- הפעלת לולאת ה-flush של כ-20 שניות וריקון כל האירועים הנותרים בעת הסרה / סגירת טאב (באמצעות `navigator.sendBeacon`, עם fallback ל-`fetch(..., { keepalive: true })`).

נקודת הכניסה שונה בין frameworks, אך בכל מקרה זוהי אותה נקודה שבה אתם כבר משתמשים להגדרת Intlayer, כך שאין צורך להוסיף דבר:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` מרכיב את ספק האנליטיקה באופן פנימי.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` מייצאת מחדש את `IntlayerProvider` של React, כך שהאנליטיקה מחוברת באותו אופן בדיוק.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    תוסף `intlayer` רושם את ה-hooks של האנליטיקה על מחזור החיים של רכיב השורש.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > ב-Nuxt, `nuxt-intlayer` מתקין את התוסף עבורכם, אין צורך לבצע פעולה נוספת.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` מפעיל את האנליטיקה מתוך הרכיב שמגדיר את Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` מרכיב את ספק האנליטיקה באופן פנימי.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` מרכיב את ספק האנליטיקה בטעינה עצלה (lazy load), כך שה-chunk נשאר מחוץ לנתיב הקריטי.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` כבר כולל את `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > השתמשו ב-`provideIntlayerAnalytics()` בנפרד רק אם אתם מנהלים providers באופן פרטני.

  </Tab>
</Tabs>

### מעקב אוטומטי ברמת ה-Node

בכל פעם ש-`useIntlayer` מפענח קטע תוכן לתצוגה, המפענח (interpreter) מדווח על אירוע `content_exposure` עבור אותו `dictionaryKey` מדויק בתוספת נתיב מפתח ושפה, גם כאן, ללא צורך בשינויי קוד. חשיפות חוזרות של אותו צומת בתוך חלון ה-flush מאוחדות לאירוע יחיד עם מונה `count`, כך שרשימה המתרנדרת מחדש 50 פעמים לא שולחת 50 אירועים.

### מעקב אחר המרות עבור בדיקות A/B

`useConversion()` מחזיר פונקציית callback המשייכת יעד לגרסה (variant) שהסשן ראה. הוא מיוצא מכל חבילת framework, עם אותה חתימה:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          התחילו עכשיו
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          התחילו עכשיו
        </button>
      );
    };
    ```

    > `useConversion` הוא client hook, סמנו את הרכיב ב-`"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        התחילו עכשיו
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      התחילו עכשיו
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          התחילו עכשיו
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          התחילו עכשיו
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">התחילו עכשיו</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### פענוח גרסה בצד הלקוח (Client-Side Variant Resolution)

`useExperiment()` מקצה את הסשן לגרסה מסוימת ומתעד את החשיפה המהווה את המכנה של שיעור ההמרה. הגנו על תת-העץ המודע לגרסאות באמצעות `isAssigned` כדי שאף מבקר לא יראה הבהוב של גרסת הבקרה לפני שההקצאה מפוענחת:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` היא מחרוזת פשוטה.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` היא מחרוזת פשוטה. ההקצאה מתרחשת בדפדפן, ולכן הרכיב חייב להיות client component.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` ו-`isAssigned` הם אובייקטי `Ref`.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` ו-`isAssigned` הם stores. קראו אותם עם קידומת `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` היא מחרוזת פשוטה.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` ו-`isAssigned` הם `Accessor`s. קראו להם כפונקציה לקבלת הערך.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` ו-`isAssigned` הם `Signal`s. קראו להם כפונקציה לקבלת הערך.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

הגדרת משקולות (weights) היא אופציונלית. העבירו משקל אחד לכל גרסה כדי להטות את החלוקה, למשל: `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

רכיב הבן קורא לאחר מכן את ה-[Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md) התואמת של המילון:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

- [גרסה (Variant)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md)

> קריאת ה-variant ברכיב **בן (child)** היא מה שמאפשר לזה לעבוד מחוץ ל-React: ב-Vue, Svelte, Solid ו-Angular הסלקטור המועבר ל-`useIntlayer` נלכד בעת אתחול הרכיב, ולכן הקריאה חייבת להתרחש ברכיב שמורכב רק לאחר שהגרסה ידועה.

אם הניסוי מכסה דף שלם ולא מילון בודד, העלו (hoist) את הגרסה ל-provider במקום זאת. ראו [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md#ambient-variant). כל `useIntlayer` מתחתיו יפוענח לפיה ללא כל שינוי בקוד הקורא.

- [גרסה סביבתית (Ambient variant)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md#ambient-variant)

אם אתם זקוקים להקצאה הגולמית מחוץ לרכיב, פנו ישירות ללקוח:

```ts fileName="heroVariant.ts"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "default",
  "black_friday",
]);
```

> `getVariant` רק מקצה. הוא אינו מתעד את החשיפה. העדיפו להשתמש ב-`useExperiment()`, אחרת לשיעור ההמרה לא יהיה מכנה.

## פרטיות וביצועים

- **אנונימי כברירת מחדל**: סשנים מזוהים באמצעות מזהה מתחלף. ה-backend שומר אך ורק **hash מסוג SHA-256** של אותו מזהה, לעולם לא את המזהה הגולמי, ולעולם לא כתובת IP.
- **מיקום גס (Coarse location)**: קוד מדינה בלבד, הנגזר מכותרות מיקום גיאוגרפי של CDN (`cf-ipcountry`, `x-vercel-ip-country` וכו'), ללא קריאה או שמירה של כתובת IP.
- **כתובות URL אינן כוללות פרמטרים (search params)** כברירת מחדל, כך ששאילתות (query strings) לעולם אינן נלכדות.
- **דגימה (Sampling)**: `sampleRate` מאפשר לכם לשמור רק חלק מאירועי חשיפת התוכן באפליקציות עמוסות תנועה.
- **שליחה מקובצת (Batched)**: בקשה אחת בערך כל 20 שניות (`flushInterval`), או מוקדם יותר אם המאגר מתמלא (`maxBufferSize`), לעולם לא בקשה אחת לכל אירוע.

### אפס עלות כאשר אינה מותקנת (Zero-cost when not installed)

חבילת `@intlayer/analytics` פועלת בדיוק לפי אותו דפוס של תלות אופציונלית כמו `@intlayer/editor`:

- כל נקודת שילוב טוענת את החבילה באמצעות **`import()` דינמי העטוף ב-`try/catch`**. אפליקציה שלעולם אינה מתקינה את `@intlayer/analytics` אינה משלמת שום עלות בגודל ה-bundle או בזמן הריצה, ולעולם אינה נתקלת בשגיאה.
- משתנה סביבה בזמן הידור (`INTLAYER_ANALYTICS_ENABLED`), המוגדר אוטומטית ל-`'false'` כאשר החבילה אינה מותקנת, כאשר `analytics.enabled` הוא `false`, או כאשר `editor.clientId` אינו מוגדר, מאפשר ל-bundlers לבצע **dead-code-elimination** מלא לכל האינטגרציה.
- האנליטיקה מושבתת בתוך iframe התצוגה המקדימה של עורך ה-Intlayer / CMS, כך שסשנים של עריכה לעולם אינם נספרים כתנועה אמיתית.

## לוח בקרה: דף Analytics

לאחר שהפרויקט שלכם אסף אירועים, דף ה-**Analytics** ב-[לוח הבקרה של Intlayer](https://app.intlayer.org/analytics) (המופיע בסרגל הצד לאחר בחירת פרויקט) מציג:

- **משתמשים פעילים**: מבקרים ייחודיים לאורך חלון הזמן הנבחר (7 / 30 / 90 ימים).
- **משתמשים היום** ו**משתמשים ב-7 הימים האחרונים**.
- **צפיות בדפים (Page views)** לאורך חלון הזמן הנבחר.
- **גרף מגמה** של מבקרים ייחודיים יומיים.
- לשוניות פירוט לפי **שפות (Locales)** ו**מיקום (Location)**, המדרגות את קהל היעד שלכם לפי שפה ולפי מדינה.

## מדריך API של ה-Backend

כל נקודות הקצה לקריאה דורשות אימות. החלפת האסימון וקליטת הנתונים הן ציבוריות.

| מתודה  | נקודת קצה                                   | תיאור                                                                          |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------ |
| `POST` | `/api/public/token`                         | החלפת ה-`clientId` הציבורי באסימון דפדפן קצר מועד בעל הרשאות מוגדרות (scoped). |
| `POST` | `/api/analytics/events`                     | קליטת מקבץ אירועים (ציבורי, scope מסוג `analytics:ingest`).                    |
| `GET`  | `/api/analytics/overview`                   | סך הכול דפים ושפות עבור הפרויקט המאומת.                                        |
| `GET`  | `/api/analytics/audience?days=30`           | מבקרים ייחודיים, צפיות בדפים, סדרות יומיות ופילוח לפי שפה ומדינה.              |
| `GET`  | `/api/analytics/content-stats`              | סך הכול חשיפות לכל תוכן, מקובצות לפי מפתח מילון / נתיב מפתח / שפה.             |
| `GET`  | `/api/analytics/experiments/:experimentKey` | שיעורי המרה ומובהקות סטטיסטית לכל גרסה עבור ניסוי A/B.                         |

תוכלו גם לקרוא לנקודות קצה אלו באופן תכנותי באמצעות [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

- [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

> **בצד השרת בלבד.** `createIntlayerCMS()` מאמת באמצעות `clientId` בתוספת `clientSecret`, והסוד לעולם אינו זמין בדפדפן. קטע קוד זה ישלח בקשות לא מאומתות אם ירוץ שם. שמרו אותו ב-route handler, ב-server action או בסקריפט.

## קישורים שימושיים

- [מילונים דינמיים - אוספים וגרסאות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [מדריך אירוח עצמי (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)
