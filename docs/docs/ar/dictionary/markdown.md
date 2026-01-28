---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: محتوى Markdown
description: تعلّم كيفية إعلان واستخدام محتوى Markdown في موقعك متعدد اللغات باستخدام Intlayer. اتبع الخطوات في هذه الوثائق لدمج Markdown بسلاسة في مشروعك.
keywords:
  - Markdown
  - الدولية
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: إضافة MarkdownRenderer / useMarkdownRenderer / renderMarkdown كأداة وخيار forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: التزيين التلقائي لمحتوى markdown، ودعم MDX و SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# محتوى Markdown / النصوص الغنية

يدعم Intlayer محتوى النصوص الغنية المحدد باستخدام صيغة Markdown. يتيح لك ذلك كتابة وصيانة المحتوى بسهولة مع تنسيق غني، مثل المدونات والمقالات والمزيد.

## الجزء الأول: إعلان محتوى Markdown

يمكنك تعريف محتوى Markdown باستخدام الدالة `md` أو ببساطة كسلسلة نصية (إذا كانت تحتوي على صيغة Markdown).

<Tabs>
  <Tab label="التغليف اليدوي" value="manual-wrapping">
    استخدم الدالة `md` لتعريف محتوى Markdown صراحة. هذا مفيد إذا كنت تريد ضمان معاملة السلسلة كـ Markdown حتى لو لم تكن تحتوي على صيغة واضحة.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## عنواني \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="الكشف التلقائي" value="automatic-detection">
    إذا كانت السلسلة تحتوي على مؤشرات Markdown شائعة (مثل العناوين، القوائم، الروابط، إلخ)، فسيقوم Intlayer بتحويلها تلقائيًا.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // تفعيل الكشف التلقائي لمحتوى Markdown - يمكن ضبطه عالميًا في intlayer.config.ts
      content: {
        myMarkdownContent: "## عنواني \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="ملفات خارجية" value="external-files">
    استورد ملفات `.md` مباشرة باستخدام الدالة `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## الجزء الثاني: عرض Markdown

يمكن معالجة العرض تلقائيًا بواسطة نظام محتوى Intlayer أو يدويًا باستخدام أدوات متخصصة.

### 1. العرض التلقائي (باستخدام `useIntlayer`)

عند الوصول إلى المحتوى عبر `useIntlayer`، تكون عقد Markdown جاهزة بالفعل للعرض.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    يمكن عرض عقد Markdown مباشرةً كـ JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام الأسلوب `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    في Vue، يمكن عرض محتوى Markdown باستخدام العنصر المدمج `component` أو مباشرة كعقدة.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    يقوم Svelte بعرض Markdown كسلسلة HTML افتراضيًا. استخدم `{@html}` لعرضها.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    يدعم Preact عقد Markdown مباشرة داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    يدعم Solid عقد Markdown مباشرة داخل JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    يستخدم Angular توجيه `[innerHTML]` لعرض محتوى Markdown.

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

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام الأسلوب `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. التصيير اليدوي والأدوات المتقدمة

إذا كنت بحاجة إلى عرض سلاسل Markdown خام أو التحكم بشكل أكبر في عملية العرض، فاستخدم الأدوات التالية.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### المكوّن `<MarkdownRenderer />`

    عرض سلسلة Markdown مع خيارات محددة.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    احصل على دالة renderer مهيأة مسبقًا.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# عنواني");
    ```

    #### أداة `renderMarkdown()`
    أداة مستقلة للـ rendering خارج المكونات.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# عنواني", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### المكوّن `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# عنواني" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### المكوّن `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# عنواني" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# عنواني")}
    ```

    #### أداة `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# عنواني")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### المكوّن `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# عنواني")}</div>;
    ```

    #### أداة `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# عنواني")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### المكوّن `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# عنواني")}</div>;
    ```

    #### أداة `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# عنواني")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### خدمة `IntlayerMarkdownService`
    عرض سلسلة Markdown باستخدام الخدمة.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## التكوين العام باستخدام `MarkdownProvider`

يمكنك تكوين عرض Markdown على مستوى التطبيق بأكمله. هذا يغنيك عن تمرير نفس الخصائص لكل renderer.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
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
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## مرجع الخيارات

يمكن تمرير هذه الخيارات إلى `MarkdownProvider` و`MarkdownRenderer` و`useMarkdownRenderer` و`renderMarkdown`.

| الخيار                | النوع       | الافتراضي | الوصف                                                                   |
| :-------------------- | :---------- | :-------- | :---------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`   | يجبر المخرجات على أن تكون مغلفة في عنصر على مستوى الكتلة (مثل `<div>`). |
| `forceInline`         | `boolean`   | `false`   | يجبر المخرجات على أن تكون مغلفة في عنصر سطري (مثل `<span>`).            |
| `tagfilter`           | `boolean`   | `true`    | يفعل مرشح وسوم GitHub لتحسين الأمان عن طريق إزالة وسوم HTML الخطرة.     |
| `preserveFrontmatter` | `boolean`   | `false`   | إذا كان `true`، فلن يتم إزالة frontmatter في بداية سلسلة Markdown.      |
| `components`          | `Overrides` | `{}`      | خريطة تربط وسوم HTML بمكونات مخصصة (مثل `{ h1: MyHeading }`).           |
| `wrapper`             | `Component` | `null`    | مكون مخصص لتغليف Markdown المصير.                                       |
| `renderMarkdown`      | `Function`  | `null`    | دالة تصيير مخصصة لاستبدال مترجم Markdown الافتراضي بالكامل.             |
