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

## إعلان محتوى HTML

يمكنك تعريف محتوى HTML باستخدام الدالة `html` أو ببساطة كسلسلة نصية.

<Tabs>
  <Tab label="التغليف اليدوي" value="manual-wrapping">
    استخدم الدالة `html` لتعريف محتوى HTML صراحة. هذا يضمن مطابقة الوسوم القياسية بشكل صحيح حتى إذا تم تعطيل الكشف التلقائي.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // يمكن تعيينه في ملف التكوين
      content: {
        myHtmlContent:  html("<p>مرحبًا <strong>بالعالم</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="الكشف التلقائي" value="automatic-detection">
    إذا كانت السلسلة تحتوي على علامات HTML الشائعة (مثل `<p>`, `<div>`, `<strong>`، إلخ)، فسيقوم Intlayer بتحويلها تلقائيًا.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // يمكن تعيينه في ملف التكوين
      content: {
        myHtmlContent:  "<p>مرحبًا <strong>بالعالم</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="ملفات خارجية" value="external-files">
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

### عقدة `html()`

دالة `html()` هي ميزة جديدة في Intlayer v8 تتيح لك تحديد محتوى HTML بشكل صريح في قواميسك. بينما يمكن لـ Intlayer غالبًا اكتشاف محتوى HTML تلقائيًا، فإن استخدام دالة `html()` يوفر عدة مزايا:

- **سلامة النوع (Type Safety)**: تتيح لك دالة `html()` تحديد الخصائص (props) المتوقعة للمكونات المخصصة، مما يوفر إكمالاً تلقائيًا وفحصًا أفضل للنوع في المحرر الخاص بك.
- **الإعلان الصريح**: يضمن معاملة السلسلة دائمًا على أنها HTML، حتى لو لم تكن تحتوي على علامات HTML قياسية من شأنها تشغيل الاكتشاف التلقائي.
- **تعريف المكونات المخصصة**: يمكنك تمرير وسيط ثانٍ إلى `html()` لتعريف المكونات المخصصة وأنواع الخصائص المتوقعة لها.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='مرحباً'>العالم</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

عند استخدام طريقة `.use()` على عقدة HTML، سيتم التحقق من المكونات التي تقدمها مقابل التعريف المقدم في دالة `html()` (إذا كان متاحًا).

---

## عرض HTML

يمكن معالجة العرض تلقائيًا بواسطة نظام محتوى Intlayer أو يدويًا باستخدام أدوات متخصصة.

### العرض التلقائي (باستخدام `useIntlayer`)

عند الوصول إلى المحتوى عبر `useIntlayer`، تكون عقد HTML جاهزة بالفعل للعرض.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
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
  <Tab label="Vue" value="vue">
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
  <Tab label="Svelte" value="svelte">
    يقوم Svelte بعرض عناصر HTML كسلاسل نصية. استخدم `{@html}` لعرضها.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    يدعم Preact عناصر HTML مباشرةً داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    يدعم Solid عناصر HTML مباشرةً داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
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
  <Tab label="React / Next.js" value="react">
  
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
  <Tab label="Vue" value="vue">
  
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
  <Tab label="Svelte" value="svelte">
   
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
  <Tab label="Preact" value="preact">
   
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
  <Tab label="Solid" value="solid">
   
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
  <Tab label="Angular" value="angular">

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
  <Tab label="React / Next.js" value="react">
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
  <Tab label="Vue" value="vue">
   
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
  <Tab label="Svelte" value="svelte">
  
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
  <Tab label="Preact" value="preact">
   
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
  <Tab label="Solid" value="solid">
   
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
  <Tab label="Angular" value="angular">
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
