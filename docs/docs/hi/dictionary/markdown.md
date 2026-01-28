---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown सामग्री
description: Intlayer के साथ अपने बहुभाषी वेबसाइट में Markdown सामग्री को घोषित करने और उपयोग करने का तरीका जानें। अपने प्रोजेक्ट में Markdown को आसानी से एकीकृत करने के लिए इस ऑनलाइन दस्तावेज़ का पालन करें।
keywords:
  - Markdown
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
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
    changes: MarkdownRenderer / useMarkdownRenderer / renderMarkdown यूटिलिटी और forceInline विकल्प जोड़ें
  - version: 8.0.0
    date: 2026-01-18
    changes: मार्कडाउन सामग्री का स्वचालित सजावट, MDX और SSR समर्थन
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ
---

# मार्कडाउन / रिच टेक्स्ट सामग्री

Intlayer मार्कडाउन सिंटैक्स का उपयोग करके परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह आपको ब्लॉग, लेख और बहुत कुछ जैसे समृद्ध स्वरूपण के साथ सामग्री को आसानी से लिखने और बनाए रखने की अनुमति देता है।

## भाग 1: मार्कडाउन सामग्री घोषित करना

आप `md` फ़ंक्शन का उपयोग करके या केवल एक स्ट्रिंग के रूप में मार्कडाउन सामग्री घोषित कर सकते हैं (यदि इसमें मार्कडाउन सिंटैक्स है)।

<Tabs>
  <Tab label="मैनुअल रैपिंग" value="manual-wrapping">
    मार्कडाउन सामग्री को स्पष्ट रूप से घोषित करने के लिए `md` फ़ंक्शन का उपयोग करें। यह तब उपयोगी होता है जब आप सुनिश्चित करना चाहते हैं कि स्ट्रिंग को मार्कडाउन के रूप में माना जाए, भले ही इसमें स्पष्ट सिंटैक्स न हो।

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## मेरा शीर्षक \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="स्वचालित पहचान" value="automatic-detection">
    यदि स्ट्रिंग में सामान्य मार्कडाउन संकेतक (जैसे हेडर, सूचियां, लिंक आदि) हैं, तो Intlayer इसे स्वतः ही रूपांतरित कर देगा।

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // मार्कडाउन सामग्री की स्वचालित पहचान सक्षम करें - intlayer.config.ts में वैश्विक स्तर पर सेट किया जा सकता है
      content: {
        myMarkdownContent: "## मेरा शीर्षक \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="बाहरी फ़ाइलें" value="external-files">
    `file` फ़ंक्शन का उपयोग करके सीधे `.md` फ़ाइलें आयात करें।

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

## भाग 2: मार्कडाउन रेंडरिंग

रेंडरिंग को Intlayer के सामग्री सिस्टम द्वारा स्वचालित रूप से या विशेष टूल्स का उपयोग करके मैन्युअल रूप से संभाला जा सकता है।

### 1. स्वचालित रेंडरिंग (`useIntlayer` का उपयोग करके)

जब आप `useIntlayer` के माध्यम से सामग्री तक पहुँचते हैं, तो मार्कडाउन नोड्स रेंडरिंग के लिए पहले से ही तैयार होते हैं।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    मार्कडाउन नोड्स को सीधे JSX के रूप में रेंडर किया जा सकता है।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    आप `.use()` मेथड का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue में, मार्कडाउन सामग्री को बिल्ट-इन `component` का उपयोग करके या सीधे नोड के रूप में रेंडर किया जा सकता है।

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
    Svelte डिफ़ॉल्ट रूप से मार्कडाउन को HTML स्ट्रिंग के रूप में रेंडर करता है। इसे रेंडर करने के लिए `{@html}` का उपयोग करें।

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact JSX में सीधे मार्कडाउन नोड्स का समर्थन करता है।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid JSX में सीधे मार्कडाउन नोड्स का समर्थन करता है।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular मार्कडाउन सामग्री को रेंडर करने के लिए `[innerHTML]` डायरेक्टिव का उपयोग करता है।

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

    आप `.use()` मेथड का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. मैन्युअल रेंडरिंग और उन्नत टूल्स

यदि आपको कच्ची मार्कडाउन स्ट्रिंग्स रेंडर करने की आवश्यकता है या रेंडरिंग प्रक्रिया पर अधिक नियंत्रण चाहिए, तो निम्नलिखित टूल्स का उपयोग करें।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` घटक

    विशिष्ट विकल्पों के साथ मार्कडाउन स्ट्रिंग रेंडर करें।

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    एक पूर्व-कॉन्फ़िगर रेंडरर फ़ंक्शन प्राप्त करें।

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# मेरा शीर्षक");
    ```

    #### `renderMarkdown()` यूटिलिटी
    घटकों के बाहर रेंडरिंग के लिए स्टैंडअलोन यूटिलिटी।

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# मेरा शीर्षक", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` घटक

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# मेरा शीर्षक" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` घटक

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# मेरा शीर्षक" />
    ```

    #### `useMarkdownRenderer()` हुक

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# मेरा शीर्षक")}
    ```

    #### `renderMarkdown()` यूटिलिटी

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# मेरा शीर्षक")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` घटक

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# मेरा शीर्षक")}</div>;
    ```

    #### `renderMarkdown()` यूटिलिटी

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# मेरा शीर्षक")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` घटक

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# मेरा शीर्षक")}</div>;
    ```

    #### `renderMarkdown()` यूटिलिटी

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# मेरा शीर्षक")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` सर्विस
    सेवा का उपयोग करके मार्कडाउन स्ट्रिंग रेंडर करें।

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

## `MarkdownProvider` के साथ वैश्विक कॉन्फ़िगरेशन

आप अपने पूरे एप्लिकेशन के लिए मार्कडाउन रेंडरिंग को वैश्विक स्तर पर कॉन्फ़िगर कर सकते हैं। यह प्रत्येक रेंडरर को समान प्रॉप्स पास करने से बचाता है।

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

## विकल्प संदर्भ

इन विकल्पों को `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, और `renderMarkdown` को पास किया जा सकता है।

| विकल्प                | प्रकार      | डिफ़ॉल्ट | विवरण                                                                                           |
| :-------------------- | :---------- | :------- | :---------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`  | आउटपुट को ब्लॉक-लेवल एलिमेंट (जैसे, `<div>`) में लपेटने के लिए मजबूर करता है।                   |
| `forceInline`         | `boolean`   | `false`  | आउटपुट को इनलाइन एलिमेंट (जैसे, `<span>`) में लपेटने के लिए मजबूर करता है।                      |
| `tagfilter`           | `boolean`   | `true`   | खतरनाक HTML टैग्स को हटाकर सुरक्षा में सुधार के लिए GitHub टैग फ़िल्टर को सक्षम करता है।        |
| `preserveFrontmatter` | `boolean`   | `false`  | यदि `true` है, तो मार्कडाउन स्ट्रिंग की शुरुआत में फ्रंटमैटर (frontmatter) को नहीं हटाया जाएगा। |
| `components`          | `Overrides` | `{}`     | HTML टैग्स का कस्टम घटकों के साथ मैपिंग (जैसे, `{ h1: MyHeading }`)।                            |
| `wrapper`             | `Component` | `null`   | रेंडर किए गए मार्कडाउन को लपेटने के लिए एक कस्टम घटक।                                           |
| `renderMarkdown`      | `Function`  | `null`   | डिफ़ॉल्ट मार्कडाउन कंपाइलर को पूरी तरह से बदलने के लिए एक कस्टम रेंडरिंग फ़ंक्शन।               |
