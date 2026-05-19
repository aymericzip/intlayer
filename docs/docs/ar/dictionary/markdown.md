---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: تعرف على كيفية الإعلان عن واستخدام محتوى Markdown في موقعك متعدد اللغات باستخدام Intlayer. اتبع الخطوات في هذه الوثائق عبر الإنترنت لدمج Markdown بسلاسة في مشروعك.
keywords:
  - Markdown
  - تدويل
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "تمت إضافة دعم لملفات `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "تمت إضافة كائن إضافة `intlayerMarkdown` ؛ استخدم `app.use(intlayerMarkdown)` بدلاً من `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "تم نقل الاستيراد من `{{framework}}-intlayer` إلى `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "إضافة أدوات MarkdownRenderer / useMarkdownRenderer / renderMarkdown وخيار forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "تزيين تلقائي لمحتوى markdown ، دعم MDX و SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "تم تهيئة السجل"
---

# Markdown / محتوى نصي غني

يدعم Intlayer المحتوى النصي الغني المعرف باستخدام بناء جملة Markdown. يتيح لك هذا كتابة المحتوى ذي التنسيق الغني والحفاظ عليه بسهولة مثل المدونات والمقالات والمزيد.

## الإعلان عن محتوى Markdown

يمكنك الإعلان عن محتوى Markdown باستخدام وظيفة `md` أو ببساطة كسلسلة نصية (إذا كانت تحتوي على بناء جملة Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    بدءًا من الإصدار `8.10.0` ، يمكنك الإعلان عن محتوى Markdown مباشرةً في ملفات `.content.md`. سيكتشف Intlayer محتوى Markdown ويحلله تلقائيًا.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: محتواي
    locale: en
    ---

    # محتواي

    فيما يلي مثال على محتوى markdown
    ```

    حقل front-matter `locale` هو الحقل الذي يحدد لغة المحتوى. إنه اختياري. في حالة عدم توفيره ، سيستخدم Intlayer اللغة الافتراضية ، والتي تُستخدم أيضًا كلغة احتياطية إذا لم تتوفر ترجمة للغة معينة.

    مثال على بنية الملفات:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    يمكنك إضافة أي خصائص معرفة في [تعريف القاموس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) في front-matter

  </Tab>
  <Tab label="التغليف اليدوي" value="manual-wrapping">
    استخدم الوظيفة `md` للإعلان بشكل صريح عن محتوى Markdown. يكون هذا مفيدًا إذا كنت تريد التأكد من التعامل مع سلسلة نصية على أنها Markdown حتى لو كانت لا تحتوي على بناء جملة واضح.

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
  <Tab label="الاكتشاف التلقائي" value="automatic-detection">
    إذا كانت السلسلة النصية تحتوي على مؤشرات Markdown شائعة (مثل العناوين والقوائم والروابط وما إلى ذلك) ، فسيقوم Intlayer بتحويلها تلقائيًا.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // تمكين الاكتشاف التلقائي لمحتوى Markdown - يمكن تعيينه عالميًا في intlayer.config.ts
      content: {
        myMarkdownContent: "## عنواني \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

  <Tab label="الملفات الخارجية" value="external-files">
    قم باستيراد ملفات `.md` مباشرة باستخدام وظيفة `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          ar: md(file("./myMarkdown.ar.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## عرض Markdown

يوفر Intlayer طريقتين مستقلتين لعرض Markdown:

1. **عبر `useIntlayer`**
   — يحول Intlayer تلقائيًا عقدة `md` إلى الإخراج الأصلي لإطار العمل (JSX ، VNode ، سلسلة HTML).
   - يتم تحليل Frontmatter وكشفه كـ `.metadata`. يمكنك تجاوز التقديم على مستويين — عالميًا باستخدام `MarkdownProvider` (أو ما يعادله في إطار العمل) ومحليًا لكل عقدة باستخدام `.use()`. يمكن دمج كليهما ؛ `.use()` له الأسبقية على `MarkdownProvider` ، والذي له الأسبقية على الافتراضي.

2. **الأدوات المساعدة** — `<MarkdownRenderer />` ، `useMarkdownRenderer()` ، و `renderMarkdown()` هي أدوات مستقلة لا تقبل سوى **سلاسل Markdown الخام**. إنها مستقلة عن `useIntlayer` ولا تعمل مع العقد المزخرفة التي تعيدها.

يدعم عرض Markdown **MDX** — استخدم أي مكون JSX/framework بالاسم مباشرة داخل Markdown الخاص بك.

### 1. العرض التلقائي (عبر `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    يمكن عرض عقد Markdown مباشرة كـ JSX.

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
          MyButton: (props) => <button {...props} />, // مكون MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > إذا لم يكن `MarkdownProvider` موجودًا ، فسيقوم Intlayer بعرض markdown باستخدام المحلل اللغوي الافتراضي من Markdown إلى JSX.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    في Vue ، يمكن عرض محتوى Markdown باستخدام علامة `component` المضمنة أو مباشرة كعقدة.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    التكوين العالمي عبر إضافة `intlayerMarkdown` (يدعم مكونات MDX المخصصة):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // مكون MDX
      },
    });
    ```

    > إذا لم يتم تثبيت إضافة `intlayerMarkdown` ، فسيقوم Intlayer بالعرض باستخدام المترجم الافتراضي.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    يعرض Svelte Markdown كسلسلة HTML افتراضيًا. استخدم `{@html}` لعرضه.

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

    > إذا لم يكن `MarkdownProvider` موجودًا ، فسيقوم Intlayer بعرض markdown باستخدام المترجم الافتراضي.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    يدعم Preact عقد Markdown مباشرة في JSX.

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
          MyButton: (props) => <button {...props} />, // مكون MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > إذا لم يكن `MarkdownProvider` موجودًا ، فسيقوم Intlayer بعرض markdown باستخدام المحلل اللغوي الافتراضي من Markdown إلى JSX.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    يدعم Solid عقد Markdown مباشرة في JSX.

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
          MyButton: (props) => <button {...props} />, // مكون MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > إذا لم يكن `MarkdownProvider` موجودًا ، فسيقوم Intlayer بعرض markdown باستخدام المحلل اللغوي الافتراضي من Markdown إلى JSX.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    يستخدم Angular التوجيه `[innerHTML]` لعرض محتوى Markdown.

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

    > إذا لم يتم تكوين مزود IntlayerMarkdown ، فسيقوم Intlayer بالعرض باستخدام المترجم الافتراضي.

    يمكنك أيضًا توفير تجاوزات محلية لعقد معينة باستخدام طريقة `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    يمكنك استرداد Markdown كسلسلة نصية:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    ويمكنك الوصول إلى بيانات markdown الوصفية الخاصة بك على النحو التالي:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. الأدوات المساعدة (سلاسل Markdown فقط)

هذه الأدوات تعرض **فقط سلاسل Markdown الخام** وهي مستقلة عن `useIntlayer`. استخدمها عندما تحتاج إلى عرض Markdown من مصادر أخرى غير قواميسك.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### مكون `<MarkdownRenderer />`

    يعرض سلسلة Markdown مع خيارات محددة.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### خطاف `useMarkdownRenderer()`

    احصل على وظيفة عارض مكونة مسبقًا.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# عنواني");
    ```

    #### أداة `renderMarkdown()`
    أداة مستقلة للعرض خارج المكونات.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# عنواني", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### مكون `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# عنواني" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### مكون `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# عنواني" />
    ```

    #### خطاف `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# عنواني")}
    ```

    #### أداة `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# عنواني")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### مكون `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### خطاف `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# عنواني")}</div>;
    ```

    #### أداة `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# عنواني")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### مكون `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# عنواني"}
    </MarkdownRenderer>
    ```

    #### خطاف `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# عنواني")}</div>;
    ```

    #### أداة `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# عنواني")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### خدمة `IntlayerMarkdownService`
    تعرض سلسلة Markdown باستخدام الخدمة.

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
</Tabs>

---

## التكوين العالمي باستخدام `MarkdownProvider`

يقوم `MarkdownProvider` (أو ما يعادله في إطار العمل) بتكوين خط أنابيب عرض Markdown لتطبيقك بالكامل. ينطبق هذا على كل من العرض التلقائي `useIntlayer` والأدوات المساعدة. الخيارات المعينة هنا هي الإعدادات الافتراضية — يتجاوزها `.use()` على مستوى العقدة.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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

    > MDX مدعوم — يتم حل أي اسم مكون يستخدم داخل Markdown الخاص بك (على سبيل المثال `<MyCustomJSXComponent />`) مقابل خريطة `components`.

    يمكنك أيضًا استخدام عارض markdown الخاص بك:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

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

    يمكنك أيضًا استخدام عارض markdown الخاص بك:

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

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

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

    يمكنك أيضًا استخدام عارض markdown الخاص بك:

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

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

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

    يمكنك أيضًا استخدام عارض markdown الخاص بك:

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

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

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

    يمكنك أيضًا استخدام عارض markdown الخاص بك:

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

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > الاستيراد الديناميكي لعارض Markdown الخاص بك هو طريقة رائعة لتقليل حجم حزمة تطبيقك.

  </Tab>
</Tabs>
