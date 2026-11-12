---
createdAt: 2025-02-07
updatedAt: 2026-11-03
priority: 8
title: "תוכן Markdown ב-Intlayer"
description: "הצהר על תוכן Markdown מתורגם ב-Intlayer באמצעות md() או קובצי .content.md, ורנדר אותו באמצעות רכיבים משלך בכל פריימוורק."
keywords:
  - Markdown
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.11.0
    date: 2026-05-28
    changes: "עיטור אוטומטי של תוכן markdown, תמיכה ב-MDX ו-SSR"
  - version: 8.10.0
    date: 2026-05-19
    changes: "הוספת תמיכה בקובצי `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "הוספת אובייקט תוסף `intlayerMarkdown`; שימוש ב-`app.use(intlayerMarkdown)` במקום `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "העברת הייבוא מ-`{{framework}}-intlayer` ל-`{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "הוספת כלי העזר MarkdownRenderer / useMarkdownRenderer / renderMarkdown והאפשרות forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "עיטור אוטומטי של תוכן markdown, תמיכה ב-MDX ו-SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוכן Markdown / טקסט עשיר

Intlayer תומך בתוכן טקסט עשיר המוגדר באמצעות תחביר Markdown. הדבר מאפשר לכתוב ולתחזק בקלות תוכן בעל עיצוב עשיר, כגון בלוגים, מאמרים ועוד.

## הצהרה על תוכן Markdown

ניתן להצהיר על תוכן Markdown באמצעות הפונקציה `md` או פשוט כמחרוזת (אם היא מכילה תחביר Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">

    החל מגרסה `8.10.0`, ניתן להצהיר על תוכן Markdown ישירות בקובצי `.content.md`. Intlayer יזהה וינתח אוטומטית את תוכן ה-Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: My content
    locale: en
    ---

    # My content

    Here an example of markdown content
    ```

    שדה ה-`locale` ב-front-matter הוא השדה שמגדיר את שפת התוכן. שדה זה אופציונלי. אם לא צוין, Intlayer ישתמש בשפת ברירת המחדל, המשמשת גם כשפת fallback אם אין תרגום זמין עבור שפה ספציפית.

    דוגמה למבנה קבצים:

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    תוכל להוסיף ב-front-matter כל מאפיין המוגדר ב[הגדרת המילון](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

  </Tab>
  <Tab label="עטיפה ידנית" value="manual-wrapping">
    השתמש בפונקציה `md` כדי להצהיר במפורש על תוכן Markdown. הדבר שימושי אם ברצונך להבטיח שמחרוזת תטופל כ-Markdown גם אם אינה מכילה תחביר מובהק.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>

  <Tab label="קבצים חיצוניים" value="external-files">
    ייבוא קובצי `.md` ישירות באמצעות הפונקציה `file`:

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          he: md(file("./myMarkdown.he.md")),
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="זיהוי אוטומטי" value="automatic-detection">
    אם המחרוזת מכילה סמני Markdown נפוצים (כמו כותרות, רשימות, קישורים וכו'), Intlayer ימיר אותה אוטומטית.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // הפעלת זיהוי אוטומטי של תוכן Markdown - ניתן להגדרה גלובלית ב-intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

</Tabs>

## רינדור Markdown

Intlayer מספק שתי דרכים עצמאיות לרנדר Markdown:

1. **באמצעות `useIntlayer`**
   Intlayer ממיר אוטומטית את צומת ה-`md` לפלט המקורי של הפריימוורק (JSX, VNode, מחרוזת HTML).
   - ה-frontmatter מנותח ונחשף כ-`.metadata`. ניתן לדרוס את הרינדור בשתי רמות, גלובלית באמצעות `MarkdownProvider` (או המקבילה בפריימוורק) ומקומית לכל צומת באמצעות `.use()`. ניתן לשלב בין השניים; ל-`.use()` יש עדיפות על פני `MarkdownProvider`, שלו יש עדיפות על פני ברירת המחדל.

2. **כלי עזר (Helper utilities)**: `<MarkdownRenderer />`, `useMarkdownRenderer()` ו-`renderMarkdown()` הם כלים עצמאיים המקבלים **מחרוזות Markdown גולמיות בלבד**. הם אינם תלויים ב-`useIntlayer` ואינם פועלים עם הצמתים המעוטרים שהוא מחזיר.

רינדור Markdown תומך ב-**MDX**. השתמש בכל רכיב JSX או פריימוורק לפי שמו ישירות בתוך ה-Markdown שלך.

### 1. רינדור אוטומטי (באמצעות `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    צומתי Markdown יכולים להיות מרונדרים ישירות כ-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // רכיב MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > אם `MarkdownProvider` אינו קיים, Intlayer ירנדר את ה-Markdown באמצעות מנתח ברירת המחדל של Markdown ל-JSX.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown באופן הבא:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    צומתי Markdown יכולים להיות מרונדרים ישירות כ-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "next-intlayer";
    import { MarkdownProvider } from "next-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // רכיב MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > אם `MarkdownProvider` אינו קיים, Intlayer ירנדר את ה-Markdown באמצעות מנתח ברירת המחדל של Markdown ל-JSX.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ב-Vue, תוכן Markdown יכול להיות מרונדר באמצעות הרכיב המובנה `component` או ישירות כצומת.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    הגדרה גלובלית באמצעות התוסף `intlayerMarkdown` (תומך ברכיבים מותאמים אישית של MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // רכיב MDX
      },
    });
    ```

    > אם התוסף `intlayerMarkdown` אינו מותקן, Intlayer ירנדר באמצעות קומפיילר ברירת המחדל.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte מרנדר Markdown כמחרוזת HTML כברירת מחדל. השתמש ב-`{@html}` כדי לרנדר זאת.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > אם `MarkdownProvider` אינו קיים, Intlayer ירנדר את ה-Markdown באמצעות קומפיילר ברירת המחדל.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact תומך בצומתי Markdown ישירות ב-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // רכיב MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > אם `MarkdownProvider` אינו קיים, Intlayer ירנדר את ה-Markdown באמצעות מנתח ברירת המחדל של Markdown ל-JSX.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid תומך בצומתי Markdown ישירות ב-JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // רכיב MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > אם `MarkdownProvider` אינו קיים, Intlayer ירנדר את ה-Markdown באמצעות מנתח ברירת המחדל של Markdown ל-JSX.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular משתמש בהנחיית `[innerHTML]` כדי לרנדר תוכן Markdown.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    > אם ה-provider של IntlayerMarkdown אינו מוגדר, Intlayer ירנדר באמצעות קומפיילר ברירת המחדל.

    תוכל גם לספק דריסות מקומיות עבור צמתים ספציפיים באמצעות המתודה `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    ניתן לאחזר את ה-Markdown כמחרוזת:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    ב-Remix 3, צומתי Markdown מרונדרים בשרת למחרוזת HTML. הזרק אותה עם ה-prop‏ `innerHTML` של Remix JSX, או עם `html.raw` בתצוגת `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div innerHTML={myMarkdownContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return html.raw`<div>${myMarkdownContent.value}</div>`;
    };
    ```

    > Remix מבצע escape לערכים שעברו אינטרפולציה כברירת מחדל. `innerHTML` ו-`html.raw` הם שני המנגנונים לעקיפת זאת, כפי שנדרש עבור מחרוזת Markdown מרונדרת.

    תוכל גם לספק דריסות מקומיות עבור תגיות ספציפיות באמצעות המתודה `.use()`. הדריסות הן פונקציות המחזירות מחרוזת HTML:

    ```tsx
    <div
      innerHTML={myMarkdownContent.use({
        h1: ({ children }) => `<h1 class="text-3xl font-bold">${children}</h1>`,
      })}
    />
    ```

    המאפיין `.value` הוא מחרוזת ה-HTML המרונדרת, בעוד ש-`String()` / `.toString()` מחזירים את מקור ה-Markdown הגולמי:

    ```tsx
    myMarkdownContent.value // "<h1>…</h1>"
    String(myMarkdownContent) // "# …"
    myMarkdownContent.toString() // "# …"
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```tsx
    myMarkdownContent.metadata
    myMarkdownContent.metadata.title
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    ב-Astro, צומתי Markdown מרונדרים למחרוזת HTML. הזרק אותה באמצעות ההנחיה `set:html` בתבנית, או עם `innerHTML` בתוך `<script>` בצד לקוח.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myMarkdownContent } = useIntlayer("app");
    ---

    <div set:html={myMarkdownContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myMarkdownContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myMarkdownContent.value;
    </script>
    ```

    > Astro מבצע escape ל-`{ביטויים}` כברירת מחדל. `set:html` הוא המנגנון לעקיפת זאת, כפי שנדרש עבור מחרוזת Markdown מרונדרת.

    תוכל גם לספק דריסות מקומיות עבור תגיות ספציפיות באמצעות המתודה `.use()`. הדריסות הן פונקציות המחזירות מחרוזת HTML:

    ```astro
    <div
      set:html={myMarkdownContent.use({
        h1: ({ children }) => `<h1 class="text-3xl font-bold">${children}</h1>`,
      })}
    />
    ```

    המאפיין `.value` הוא מחרוזת ה-HTML המרונדרת, בעוד ש-`String()` / `.toString()` מחזירים את מקור ה-Markdown הגולמי:

    ```astro
    myMarkdownContent.value // "<h1>…</h1>"
    String(myMarkdownContent) // "# …"
    myMarkdownContent.toString() // "# …"
    ```

    וניתן לגשת למטא-דאטה של ה-Markdown:

    ```astro
    myMarkdownContent.metadata
    myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. כלי עזר (מחרוזות Markdown בלבד)

כלי עזר אלה מרנדרים **מחרוזות Markdown גולמיות** ואינם תלויים ב-`useIntlayer`. השתמש בהם כאשר עליך לרנדר Markdown ממקורות שאינם המילונים שלך.

<Tabs group="framework">
  <Tab label="React" value="react">

    #### רכיב `<MarkdownRenderer />`

    רינדור מחרוזת Markdown עם אפשרויות ספציפיות:

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### ה-Hook‏ `useMarkdownRenderer()`

    קבלת פונקציית רינדור מוגדרת מראש:

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### כלי העזר `renderMarkdown()`
    כלי עצמאי לרינדור מחוץ לרכיבים:

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    #### רכיב `<MarkdownRenderer />`

    רינדור מחרוזת Markdown עם אפשרויות ספציפיות:

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### ה-Hook‏ `useMarkdownRenderer()`

    קבלת פונקציית רינדור מוגדרת מראש:

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### כלי העזר `renderMarkdown()`
    כלי עצמאי לרינדור מחוץ לרכיבים:

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### רכיב `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### רכיב `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### ה-Hook‏ `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### כלי העזר `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### רכיב `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### ה-Hook‏ `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### כלי העזר `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### רכיב `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### ה-Hook‏ `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### כלי העזר `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### השירות `IntlayerMarkdownService`
    רינדור מחרוזת Markdown באמצעות השירות:

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### ה-Hook‏ `useMarkdownRenderer()`

    קבלת פונקציית רינדור מוגדרת מראש על ידי `installIntlayerMarkdown()`. היא מחזירה מחרוזת HTML.

    ```tsx
    import { useMarkdownRenderer } from "remix-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({ forceBlock: true });

    return <div innerHTML={renderMarkdown("# My Title")} />;
    ```

    #### כלי העזר `renderMarkdown()`

    כלי עצמאי שמתעלם מהקונפיגורציה הגלובלית:

    ```tsx
    import { renderMarkdown } from "remix-intlayer/markdown";

    const html = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### ה-Hook‏ `useMarkdownRenderer()`

    קבלת פונקציית רינדור מוגדרת מראש על ידי `installIntlayerMarkdown()`. היא מחזירה מחרוזת HTML.

    ```astro
    ---
    import { useMarkdownRenderer } from "astro-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({ forceBlock: true });
    ---

    <div set:html={renderMarkdown("# My Title")} />
    ```

    #### כלי העזר `renderMarkdown()`

    כלי עצמאי שמתעלם מהקונפיגורציה הגלובלית:

    ```astro
    ---
    import { renderMarkdown } from "astro-intlayer/markdown";

    const html = renderMarkdown("# My Title", { forceBlock: true });
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## קונפיגורציה גלובלית באמצעות `MarkdownProvider`

`MarkdownProvider` (או המקבילה בפריימוורק) מגדיר את צינור עיבוד ה-Markdown עבור כל האפליקציה שלך. הוא חל הן על הרינדור האוטומטי של `useIntlayer` והן על כלי העזר. האפשרויות המוגדרות כאן הן ברירות המחדל, ו-`.use()` דורס אותן ברמת הצומת הבודד.

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // שימוש בייבוא דינמי להקטנת גודל ה-bundle של האפליקציה שלך
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // שימוש בייבוא דינמי להקטנת גודל ה-bundle של האפליקציה שלך
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

    > MDX נתמך, כל שם רכיב שנעשה בו שימוש בתוך ה-Markdown שלך (למשל `<MyCustomJSXComponent />`) מפוענח מול מפת ה-`components`.

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          },
        }),
      ],
    };
    ```

    > ייבוא ה-Markdown renderer שלך באופן דינמי הוא דרך טובה להקטין את גודל ה-bundle של האפליקציה שלך.

  </Tab>
  <Tab label="Remix" value="remix">

    ל-Remix אין עץ רכיבים שיחזיק provider, לכן הקונפיגורציה מותקנת פעם אחת, כ-singleton, בהפעלת השרת. היא מגדירה את ה-renderer המוחזר על ידי `useMarkdownRenderer()`. צומתי ה-`md` המוחזרים על ידי `useIntlayer` מרונדרים עם קומפיילר ברירת המחדל; דרוס את התגיות שלהם לכל צומת באמצעות `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerMarkdown } from "remix-intlayer/markdown";

    installIntlayerMarkdown({
      forceBlock: true,
      components: {
        h1: ({ children }) => `<h1 class="text-2xl font-bold">${children}</h1>`,
      },
    });
    ```

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```typescript fileName="src/router.ts"
    import { installIntlayerMarkdown } from "remix-intlayer/markdown";

    installIntlayerMarkdown({
      renderMarkdown: async (md) => {
        const { marked } = await import("marked");
        return marked(md) as string;
      },
    });
    ```

    > השתמש ב-`installIntlayerMarkdownDynamic(async () => …)` כדי לטעון את ה-renderer עצמו באופן עצל (lazy); הטוען רץ בקריאה הראשונה בלבד.

  </Tab>
  <Tab label="Astro" value="astro">

    ל-Astro אין עץ רכיבים שיחזיק provider, לכן הקונפיגורציה מותקנת פעם אחת, כ-singleton, ב-middleware (שרת) וב-`<script>` בצד לקוח (דפדפן). היא מגדירה את ה-renderer המוחזר על ידי `useMarkdownRenderer()`. צומתי ה-`md` המוחזרים על ידי `useIntlayer` מרונדרים עם קומפיילר ברירת המחדל; דרוס את התגיות שלהם לכל צומת באמצעות `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerMarkdown } from "astro-intlayer/markdown";
    import { defineMiddleware } from "astro:middleware";

    // רץ פעם אחת בהפעלת השרת; ה-middleware של Intlayer עצמו
    // נרשם על ידי האינטגרציה, לפני קובץ זה.
    installIntlayerMarkdown({
      forceBlock: true,
      components: {
        h1: ({ children }) => `<h1 class="text-2xl font-bold">${children}</h1>`,
      },
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    תוכל גם להשתמש ב-Markdown renderer משלך:

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerMarkdown } from "astro-intlayer/markdown";

    installIntlayerMarkdown({
      renderMarkdown: async (md) => {
        const { marked } = await import("marked");
        return marked(md) as string;
      },
    });
    ```

    > השתמש ב-`installIntlayerMarkdownDynamic(async () => …)` כדי לטעון את ה-renderer עצמו באופן עצל (lazy); הטוען רץ בקריאה הראשונה בלבד.

  </Tab>
</Tabs>

## Suspense

ה-renderer של Intlayer ל-Markdown נטען באופן דינמי. למרות היותו מותאם, ה-chunk של המנתח הפנימי שוקל כ-55kb. טעינה סינכרונית שלו מעכבת את רינדור הדף הראשוני ופוגעת במדד First Contentful Paint (FCP).

כדי למנוע חסימה של ממשק המשתמש (UI), ‏Intlayer משתלב עם ה-Suspense API של React. הוא שולף את המנתח ברקע וזורק Promise במהלך ההורדה.

עטוף כל רכיב המרנדר Intlayer Markdown בתוך גבול `<Suspense>`. פעולה זו מציגה מצב fallback מתורגם בזמן שה-chunk יורד, ומאפשרת לשאר ה-DOM שלך להתרנדר מיד.

אזהרה: אם לא תספק גבול `<Suspense>`, ‏React יבצע suspend ברמת השורש או יחסום את כל עץ הרכיבים מלהתרנדר עד שה-chunk של ה-55kb ייטען במלואו.

<Tabs>
  <Tab label="Next.js" value="nextjs">

ב-Next.js App Router, תוכל להשתמש ב-`Suspense` של React עבור רכיבי לקוח או בקובץ `loading.tsx` עבור רכיבי שרת.

**רכיב לקוח (Client Component):**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**רכיב שרת עם `loading.tsx`:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>

  <Tab label="Vue" value="vue">

ל-Vue יש רכיב `<Suspense>` מובנה. עטוף את הרכיב המרנדר תוכן Markdown בגבול `<Suspense>`.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

ל-Svelte אין מקבילה ל-Suspense API. השתמש בבלוק `{#await}` כדי לטפל ברינדור אסינכרוני של תוכן Markdown.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact תומך ב-Suspense API של React באמצעות `preact/compat`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

ל-Solid יש רכיב `<Suspense>` משלו מתוך `solid-js`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

ל-Angular אין Suspense API. השתמש בתצוגות ניתנות להשהיה של Angular (`@defer`) כדי לטפל בתוכן Markdown בטעינה עצלה (דורש Angular 17+).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

## רינדור בצד שרת (SSR) והידרציה (Hydration)

בהשוואה למנתחי Markdown אחרים כגון remark / rehype, מנתח ה-Markdown של Intlayer נטול תלויות ופועל הן בצד הלקוח והן בצד השרת.

אך Intlayer ביצע אופטימיזציה לניתוח עבור פריימוורקים מבוססי Server-Side Rendering (SSR) (כגון Next.js App Router, React Router, Nuxt, SvelteKit וכו').

במקום לשלוח מחרוזות Markdown גולמיות ללקוח ולנתח אותן בדפדפן (מה שגורר פגיעה בביצועים), Intlayer מאפשר לך לנתח מראש את ה-Markdown לעץ תחביר מופשט (AST - Abstract Syntax Tree) בשרת.

ניתן להשתמש בפונקציה `parseMarkdown` מחבילת ה-Intlayer של הפריימוורק שלך בצד השרת כדי ליצור AST הניתן לסריאליזציה (אובייקט `ParsedMarkdown`), ולהעביר אותו ישירות לצד הלקוח. כל כלי הרינדור של Intlayer (כגון `<MarkdownRenderer>`, `useMarkdownRenderer` וכו') מקבלים אובייקט AST זה באופן אוטומטי ומרנדרים אותו בצורה חלקה.

### דוגמה בארכיטקטורת שרת/לקוח

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. בשרת: ניתוח ה-markdown ל-AST הניתן לסריאליזציה
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // החזרת ה-AST כ-JSON ללקוח
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. בלקוח: רינדור ה-AST ישירות ללא ניתוח מחדש
    export default function Page() {
      const { content } = useLoaderData();

      // ה-renderer מקבל מחרוזת גולמית או את ה-AST המנותח
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. ניתוח ה-markdown ל-AST הניתן לסריאליזציה בשרת
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. רינדור ה-AST ישירות
      // ב-Server Component, זה עובד בצורה חלקה ומעביר את ה-AST
      // ישירות לרכיבי הלקוח הפנימיים במידת הצורך.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. שליפה וניתוח ה-markdown ל-AST בשרת
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. בלקוח: רינדור ה-AST ישירות ללא ניתוח מחדש -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. בשרת: ניתוח ה-markdown ל-AST הניתן לסריאליזציה
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // החזרת ה-AST ללקוח
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. בלקוח: רינדור ה-AST ישירות ללא ניתוח מחדש -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ב-Angular SSR הנתונים נפתרים לרוב בשרת במהלך הטעינה הראשונית ועוברים הידרציה בלקוח. ניתן להשתמש ב-resolvers כדי להעביר את ה-AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. בשרת: ניתוח ה-markdown ל-AST הניתן לסריאליזציה
        return parseMarkdown(markdownString);
      }
    }
    ```

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { ActivatedRoute } from "@angular/router";
    import { IntlayerMarkdownService, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="renderedMarkdown"></div>`,
    })
    export class AppComponent {
      renderedMarkdown: string = "";

      constructor(
        private route: ActivatedRoute,
        private markdownService: IntlayerMarkdownService
      ) {
        // 2. בלקוח: רינדור ה-AST ישירות ללא ניתוח מחדש
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">

    Remix 3 מרנדר בשרת ומזרים HTML, כך שאין צורך להעביר AST ללקוח. נתח פעם אחת, ורנדר את ה-AST בכל מקום שבו הדף נבנה:

    ```tsx fileName="src/views/article.tsx"
    import { parseMarkdown, renderMarkdown } from "remix-intlayer/markdown";

    // 1. ניתוח ה-markdown ל-AST הניתן לסריאליזציה (למשל פעם אחת, בעת טעינת המודול)
    const ast = parseMarkdown("## My title \n\nLorem Ipsum");

    export const ArticlePage = () => () => (
      // 2. רינדור ה-AST: ה-renderer מקבל מחרוזת גולמית או את ה-AST המנותח
      <article innerHTML={renderMarkdown(ast)} />
    );
    ```

  </Tab>
  <Tab label="Astro" value="astro">

    דפי Astro מרונדרים בשרת, כך שאין צורך להעביר AST ללקוח. נתח את ה-Markdown ב-frontmatter ורנדר אותו באמצעות `set:html`:

    ```astro fileName="src/pages/article.astro"
    ---
    import { parseMarkdown, renderMarkdown } from "astro-intlayer/markdown";

    // 1. ניתוח ה-markdown ל-AST הניתן לסריאליזציה
    const ast = parseMarkdown("## My title \n\nLorem Ipsum");
    ---

    <!-- 2. רינדור ה-AST: ה-renderer מקבל מחרוזת גולמית או את ה-AST המנותח -->
    <article set:html={renderMarkdown(ast)} />
    ```

  </Tab>
</Tabs>

דפוס זה מבטיח שלוגיקת ניתוח ה-Markdown מבוצעת במלואה בשרת, מה שמפחית משמעותית את זמן הריצה בצד הלקוח ומשפר את מהירות ההידרציה הראשונית.

## מדריך אפשרויות (Options Reference)

ניתן להעביר אפשרויות אלו ל-`MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` ו-`renderMarkdown`.

| אפשרות                | טיפוס       | ברירת מחדל | תיאור                                                                               |
| :-------------------- | :---------- | :--------- | :---------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`    | מאלץ את הפלט להיעטף באלמנט ברמת בלוק (כגון `<div>`).                                |
| `forceInline`         | `boolean`   | `false`    | מאלץ את הפלט להיעטף באלמנט מוטבע (inline, כגון `<span>`).                           |
| `tagfilter`           | `boolean`   | `true`     | מפעיל את מסנן התגיות של GitHub לאבטחה משופרת על ידי הסרת תגיות HTML מסוכנות.        |
| `preserveFrontmatter` | `boolean`   | `false`    | אם מוגדר כ-`true`, ה-frontmatter בתחילת מחרוזת ה-Markdown לא יוסר.                  |
| `components`          | `Overrides` | `{}`       | מפה של תגיות HTML לרכיבים מותאמים אישית (למשל `{ h1: MyHeading }`).                 |
| `wrapper`             | `Component` | `null`     | רכיב מותאם אישית לעטיפת ה-Markdown המרונדר.                                         |
| `renderMarkdown`      | `Function`  | `null`     | פונקציית רינדור מותאמת אישית להחלפה מלאה של קומפיילר ה-Markdown המוגדר כברירת מחדל. |
