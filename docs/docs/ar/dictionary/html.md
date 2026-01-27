---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: محتوى HTML
description: تعلّم كيفية إعلان واستخدام محتوى HTML مع مكونات مخصصة في Intlayer. اتبع هذه الوثائق لتضمين محتوى غني يشبه HTML مع استبدال المكونات ديناميكيًا في مشروعك متعدد اللغات.
keywords:
  - HTML
  - مكونات مخصصة
  - محتوى غني
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: إضافة HTMLRenderer / useHTMLRenderer / renderHTML كأداة
  - version: 8.0.0
    date: 2026-01-20
    changes: إضافة دعم تحليل HTML
---

# محتوى HTML / HTML في Intlayer

يدعم Intlayer محتوى HTML، مما يتيح لك تضمين محتوى غني ومنظم داخل القواميس (dictionaries) الخاصة بك. يمكن عرض هذا المحتوى باستخدام وسوم HTML القياسية أو استبداله بمكونات مخصصة أثناء وقت التشغيل.

## كيف يعمل HTML

يقوم Intlayer v8 بذكاء باكتشاف وسوم HTML داخل سلاسل المحتوى الخاصة بك. إذا تم التعرف على السلسلة كـ HTML (تحتوي على وسوم)، فسيتم تحويلها تلقائيًا إلى عقدة HTML.

<Columns>
<Column title="سلوك v7 (التغليف اليدوي)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>مرحبًا <strong>بالعالم</strong></p>"),
  },
};
```

</Column>
<Column title="سلوك v8 (الكشف التلقائي)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>مرحبًا <strong>بالعالم</strong></p>",
  },
};
```

</Column>
</Columns>

---

## إعلان محتوى HTML

يمكنك تعريف محتوى HTML باستخدام الدالة `html` أو ببساطة كسلسلة نصية.

<Tabs>
  <Tab label="التغليف اليدوي">
    استخدم الدالة `html` لتعريف محتوى HTML صراحة. هذا يضمن مطابقة الوسوم القياسية بشكل صحيح حتى إذا تم تعطيل الكشف التلقائي.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>مرحبًا <strong>بالعالم</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="الكشف التلقائي">
    إذا كانت السلسلة تحتوي على علامات HTML الشائعة (مثل `<p>`, `<div>`, `<strong>`، إلخ)، فسيقوم Intlayer بتحويلها تلقائيًا.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>مرحبًا <strong>بالعالم</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="ملفات خارجية">
    استورد محتوى HTML من ملفات. لاحظ أن دالة `file()` حاليًا تُعيد سلسلة نصية، وسيتم اكتشافها تلقائيًا كمحتوى HTML إذا كانت تحتوي على علامات.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          ar: html(file("./content.ar.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## عرض HTML

يمكن معالجة العرض تلقائيًا بواسطة نظام محتوى Intlayer أو يدويًا باستخدام أدوات متخصصة.

### العرض التلقائي (باستخدام `useIntlayer`)

عند الوصول إلى المحتوى عبر `useIntlayer`، تكون عقد HTML جاهزة بالفعل للعرض.

<Tabs group="framework">
  <Tab label="React / Next.js">
    يمكن عرض عقد HTML مباشرةً كـ JSX. تعمل الوسوم القياسية تلقائيًا.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    استخدم الأسلوب `.use()` لتوفير مكونات مخصصة أو لتجاوز الوسوم:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    في Vue، يمكن عرض محتوى HTML باستخدام العنصر المدمج `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    استخدم `.use()` للتجاوز:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    يقوم Svelte بعرض عناصر HTML كسلاسل نصية. استخدم `{@html}` لعرضها.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    يدعم Preact عناصر HTML مباشرةً داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    يدعم Solid عناصر HTML مباشرةً داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    يستخدم Angular توجيه `[innerHTML]` لعرض محتوى HTML.

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

    استخدم الأسلوب `.use()` لتوفير مكونات مخصصة أو لتجاوز الوسوم:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## التكوين العام باستخدام `HTMLProvider`

يمكنك تكوين عرض HTML على مستوى التطبيق بأكمله. هذا مناسب لتعريف مكونات مخصصة يجب أن تكون متاحة في جميع محتويات HTML.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

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

  </Tab>
  <Tab label="Vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
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

  </Tab>
  <Tab label="Preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### التصيير اليدوي والأدوات المتقدمة

إذا كنت بحاجة إلى عرض سلاسل HTML خام أو التحكم بشكل أكبر في تعيين المكونات، فاستخدم الأدوات التالية.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### المكوّن `<HTMLRenderer />`
    عرض سلسلة HTML باستخدام مكونات محددة.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    احصل على دالة renderer مهيأة مسبقًا.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>مرحبًا <strong>العالم</strong></p>");
    ```

    #### أداة `renderHTML()`

    أداة مستقلة للـ rendering خارج المكونات.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>مرحبًا</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">
   
    #### مكوّن `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>مرحبًا بالعالم</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
  
    #### المكوّن `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>مرحبًا بالعالم</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>مرحبًا بالعالم</p>")}
    ```

    #### أداة `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>مرحبًا بالعالم</p>")}
    ```

  </Tab>
  <Tab label="Preact">
   
    #### مكوّن `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>مرحبًا بالعالم</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>مرحبًا بالعالم</p>")}</div>;
    ```

    #### أداة `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>مرحبًا بالعالم</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
   
    #### مكوّن `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>مرحبًا بالعالم</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>مرحبًا بالعالم</p>")}</div>;
    ```

    #### أداة `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>مرحبًا بالعالم</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### خدمة `IntlayerMarkdownService`
    عرض سلسلة HTML باستخدام الخدمة.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## مرجع الخيارات

يمكن تمرير هذه الخيارات إلى `HTMLProvider` و`HTMLRenderer` و`useHTMLRenderer` و`renderHTML`.

| الخيار       | النوع                 | الافتراضي | الوصف                                                                         |
| :----------- | :-------------------- | :-------- | :---------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`      | خريطة تربط علامات HTML أو أسماء المكونات المخصصة بالمكونات.                   |
| `renderHTML` | `Function`            | `null`    | دالة عرض مخصصة لاستبدال محلل HTML الافتراضي بالكامل (لمزودات Vue/Svelte فقط). |

> ملاحظة: بالنسبة لـ React و Preact، يتم توفير علامات HTML القياسية تلقائيًا. تحتاج فقط إلى تمرير الخاصية `components` إذا أردت تجاوزها أو إضافة مكونات مخصصة.
