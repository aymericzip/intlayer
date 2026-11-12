---
createdAt: 2026-01-20
updatedAt: 2026-11-03
priority: 8
title: "תוכן HTML עם רכיבים מותאמים אישית"
description: "הגדר תוכן HTML ב-Intlayer והחלף תגיות ברכיבים משלך בזמן רינדור, עבור טקסט מתורגם עשיר ללא dangerouslySetInnerHTML."
keywords:
  - HTML
  - רכיבים מותאמים אישית
  - תוכן עשיר
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.5.0
    date: 2026-03-24
    changes: "הוספת אובייקט תוסף `intlayerHTML`; שימוש ב-`app.use(intlayerHTML)` במקום `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "העברת הייבוא מ-`{{framework}}-intlayer` ל-`{{framework}}-intlayer/html`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "הוספת כלי העזר HTMLRenderer / useHTMLRenderer / renderHTML"
  - version: 8.0.0
    date: 2026-01-20
    changes: "הוספת תמיכה בניתוח HTML (HTML parsing)"
author: aymericzip
---

# תוכן HTML / HTML ב-Intlayer

Intlayer תומך בתוכן HTML, ומאפשר לך להטמיע תוכן עשיר ומובנה בתוך המילונים שלך. ניתן לרנדר תוכן זה באמצעות תגיות HTML סטנדרטיות או להחליף אותן ברכיבים מותאמים אישית בזמן ריצה.

## הגדרת תוכן HTML

ניתן להגדיר תוכן HTML באמצעות הפונקציה `html` או פשוט כמחרוזת.

<Tabs>
  <Tab label="עטיפה ידנית" value="manual-wrapping">
    השתמש בפונקציה `html` כדי להצהיר במפורש על תוכן HTML. זה מבטיח שתגיות סטנדרטיות ימופו כהלכה גם אם הזיהוי האוטומטי מושבת.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // ניתן להגדרה בקובץ הקונפיגורציה
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="זיהוי אוטומטי" value="automatic-detection">
    אם המחרוזת מכילה תגיות HTML נפוצות (כגון `<p>`, `<div>`, `<strong>` וכו'), Intlayer ימיר אותה אוטומטית.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // ניתן להגדרה בקובץ הקונפיגורציה
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="קבצים חיצוניים" value="external-files">
    ייבוא תוכן HTML מקבצים. שים לב שכרגע הפונקציה `file()` מחזירה מחרוזת, שתזוהה אוטומטית כ-HTML אם היא מכילה תגיות.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          he: html(file("./content.he.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### הצומת `html()`

הפונקציה `html()` היא תכונה חדשה ב-Intlayer v8 המאפשרת לך להגדיר במפורש תוכן HTML במילונים שלך. בעוד ש-Intlayer לרוב יכול לזהות אוטומטית תוכן HTML, השימוש בפונקציה `html()` מספק מספר יתרונות:

- **בטיחות טיפוסים (Type Safety)**: הפונקציה `html()` מאפשרת להגדיר את ה-props הצפויים עבור רכיבים מותאמים אישית, מה שמספק השלמה אוטומטית ובדיקת טיפוסים טובה יותר בעורך הקוד שלך.
- **הצהרה מפורשת (Explicit Declaration)**: מבטיח שמחרוזת תמיד תטופל כ-HTML, גם אם היא אינה מכילה תגיות HTML סטנדרטיות שהיו מפעילות זיהוי אוטומטי.
- **הגדרת רכיבים מותאמים אישית (Custom Component Definition)**: ניתן להעביר ארגומנט שני ל-`html()` כדי להגדיר את הרכיבים המותאמים אישית ואת טיפוסי ה-props הצפויים שלהם.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Hello'>World</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

בעת שימוש במתודה `.use()` על צומת HTML, הרכיבים שתספק ייבדקו מול ההגדרה שסופקה בפונקציה `html()` (אם קיימת).

## רינדור HTML

רינדור יכול להתבצע אוטומטית על ידי מערכת התוכן של Intlayer או ידנית באמצעות כלים ייעודיים.

### רינדור אוטומטי (באמצעות `useIntlayer`)

כאשר אתה ניגש לתוכן באמצעות `useIntlayer`, צומתי HTML כבר מוכנים לרינדור.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    צומתי HTML יכולים להיות מרונדרים ישירות כ-JSX. תגיות סטנדרטיות פועלות אוטומטית.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    השתמש במתודה `.use()` כדי לספק רכיבים מותאמים אישית או לדרוס תגיות:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ב-Vue, תוכן HTML ניתן לרינדור באמצעות הרכיב המובנה `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    השתמש ב-`.use()` עבור דריסות:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte מרנדר צומתי HTML כמחרוזות. השתמש ב-`{@html}` כדי לרנדר זאת.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact תומך בצומתי HTML ישירות ב-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid תומך בצומתי HTML ישירות ב-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular משתמש בהנחיית `[innerHTML]` כדי לרנדר תוכן HTML.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    השתמש במתודה `.use()` כדי לספק רכיבים מותאמים אישית או לדרוס תגיות:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    ב-Remix 3, צומתי HTML מתפענחים למחרוזת HTML. הזרק אותה באמצעות ה-prop‏ `innerHTML` של Remix JSX, או עם `html.raw` בתצוגת `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myHtmlContent } = useIntlayer("app");

      return <div innerHTML={myHtmlContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myHtmlContent } = useIntlayer("app");

      return html.raw`<div>${myHtmlContent.value}</div>`;
    };
    ```

    > Remix מבצע escape לערכים שעברו אינטרפולציה כברירת מחדל. `innerHTML` ו-`html.raw` הם שני המנגנונים לעקיפת זאת, כפי שנדרש עבור מחרוזת HTML.

    השתמש במתודה `.use()` כדי לדרוס תגיות או למפות רכיבים מותאמים אישית. הדריסות הן פונקציות המחזירות מחרוזת HTML:

    ```tsx
    <div
      innerHTML={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    ב-Astro, צומתי HTML מתפענחים למחרוזת HTML. הזרק אותה באמצעות ההנחיה `set:html` בתבנית, או עם `innerHTML` בתוך `<script>` בצד לקוח.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myHtmlContent } = useIntlayer("app");
    ---

    <div set:html={myHtmlContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myHtmlContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myHtmlContent.value;
    </script>
    ```

    > Astro מבצע escape ל-`{ביטויים}` כברירת מחדל. `set:html` הוא המנגנון לעקיפת זאת, כפי שנדרש עבור מחרוזת HTML.

    השתמש במתודה `.use()` כדי לדרוס תגיות או למפות רכיבים מותאמים אישית. הדריסות הן פונקציות המחזירות מחרוזת HTML:

    ```astro
    <div
      set:html={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
</Tabs>

## קונפיגורציה גלובלית באמצעות `HTMLProvider`

תוכל להגדיר רינדור HTML גלובלית עבור כל האפליקציה שלך. זה אידיאלי להגדרת רכיבים מותאמים אישית שצריכים להיות זמינים בכל תוכן HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('react-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      renderHTML: async (html) => {
        const { renderHTML } = await import('vue-intlayer/html');
        return renderHTML(html);
      },
    });

    app.mount("#app");
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
    </script>

    <HTMLProvider
      renderHTML={async (html) => {
        const { renderHTML } = await import('svelte-intlayer/html');
        return renderHTML(html);
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('preact-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('solid-intlayer/html');
          return renderHTML(html);
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

    תוכל גם להשתמש ב-HTML renderer מותאם אישית משלך:

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          renderHTML: async (html) => {
            const { renderHTML } = await import('angular-intlayer/html');
            return renderHTML(html);
          },
        }),
      ],
    };
    ```

    > ייבוא ה-HTML renderer שלך באופן דינמי הוא דרך מצוינת להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Remix" value="remix">

    ל-Remix אין עץ רכיבים שיחזיק provider, לכן הקונפיגורציה מותקנת פעם אחת, כ-singleton, בהפעלת השרת. היא מגדירה את ה-renderer המוחזר על ידי `useHTMLRenderer()`. צומתי ה-`html` המוחזרים על ידי `useIntlayer` מרונדרים כפי שהם; דרוס את התגיות שלהם לכל צומת באמצעות `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > השתמש ב-`installIntlayerHTMLDynamic(async () => …)` כדי לטעון את ה-renderer עצמו באופן עצל (lazy); הטוען רץ בקריאה הראשונה בלבד.

  </Tab>
  <Tab label="Astro" value="astro">

    ל-Astro אין עץ רכיבים שיחזיק provider, לכן הקונפיגורציה מותקנת פעם אחת, כ-singleton, ב-middleware (שרת) וב-`<script>` בצד לקוח (דפדפן). היא מגדירה את ה-renderer המוחזר על ידי `useHTMLRenderer()`. צומתי ה-`html` המוחזרים על ידי `useIntlayer` מרונדרים כפי שהם; דרוס את התגיות שלהם לכל צומת באמצעות `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // רץ פעם אחת בעת עליית השרת; ה-middleware של Intlayer עצמו
    // נרשם על ידי האינטגרציה, לפני קובץ זה.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > השתמש ב-`installIntlayerHTMLDynamic(async () => …)` כדי לטעון את ה-renderer עצמו באופן עצל (lazy); הטוען רץ בקריאה הראשונה בלבד.

  </Tab>
</Tabs>

### רינדור ידני וכלים מתקדמים

אם עליך לרנדר מחרוזות HTML גולמיות או לשלוט בצורה הדוקה יותר במיפוי הרכיבים, השתמש בכלים הבאים:

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### רכיב `<HTMLRenderer />`
    רינדור מחרוזת HTML עם רכיבים ספציפיים:

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### ה-Hook‏ `useHTMLRenderer()`

    קבלת פונקציית רינדור מוגדרת מראש:

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### כלי העזר `renderHTML()`

    כלי עצמאי לרינדור מחוץ לרכיבים:

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### רכיב `<HTMLRenderer />`

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer/html";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### רכיב `<HTMLRenderer />`

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### ה-Hook‏ `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### כלי העזר `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### רכיב `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### ה-Hook‏ `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### כלי העזר `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### רכיב `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### ה-Hook‏ `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### כלי העזר `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### השירות `IntlayerHTMLService`
    רינדור מחרוזת HTML באמצעות השירות:

    ```typescript
    import { IntlayerHTMLService } from "angular-intlayer/html";

    export class MyComponent {
      constructor(private markdownService: IntlayerHTMLService) {}

      renderHTML(html: string) {
        return this.markdownService.renderHTML(html);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### ה-Hook‏ `useHTMLRenderer()`

    קבלת פונקציית רינדור שהוגדרה מראש על ידי `installIntlayerHTML()`. היא מחזירה מחרוזת HTML.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### כלי העזר `renderHTML()`

    כלי עצמאי שמתעלם מהקונפיגורציה הגלובלית:

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### ה-Hook‏ `useHTMLRenderer()`

    קבלת פונקציית רינדור שהוגדרה מראש על ידי `installIntlayerHTML()`. היא מחזירה מחרוזת HTML.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### כלי העזר `renderHTML()`

    כלי עצמאי שמתעלם מהקונפיגורציה הגלובלית:

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## מדריך אפשרויות

ניתן להעביר אפשרויות אלו ל-`HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` ו-`renderHTML`.

| אפשרות       | טיפוס                 | ברירת מחדל | תיאור                                                                                                              |
| :----------- | :-------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`       | מפה של תגיות HTML או שמות רכיבים מותאמים אישית לרכיבים.                                                            |
| `renderHTML` | `Function`            | `null`     | פונקציית רינדור מותאמת אישית להחלפה מלאה של מנתח ה-HTML המוגדר כברירת מחדל (עבור ספקי Vue, Svelte, Remix ו-Astro). |

> הערה: עבור React ו-Preact, תגיות HTML סטנדרטיות מסופקות אוטומטית. עליך להעביר את ה-prop‏ `components` רק אם ברצונך לדרוס אותן או להוסיף רכיבים מותאמים אישית.
