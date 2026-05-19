---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Intlayer के साथ अपनी बहुभाषी वेबसाइट में Markdown सामग्री घोषित करने और उसका उपयोग करने का तरीका जानें। अपने प्रोजेक्ट में Markdown को समेकित रूप से एकीकृत करने के लिए इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करें।
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "`.content.md` फ़ाइलों के लिए समर्थन जोड़ा गया"
  - version: 8.5.0
    date: 2026-03-24
    changes: "`intlayerMarkdown` प्लगइन ऑब्जेक्ट जोड़ा गया; `app.use(installIntlayerMarkdown)` के बजाय `app.use(intlayerMarkdown)` का उपयोग करें"
  - version: 8.5.0
    date: 2026-03-24
    changes: "आयात को `{{framework}}-intlayer` से `{{framework}}-intlayer/markdown` में ले जाया गया"
  - version: 8.0.0
    date: 2026-01-22
    changes: "MarkdownRenderer / useMarkdownRenderer / renderMarkdown उपयोगिता और forceInline विकल्प जोड़ा गया"
  - version: 8.0.0
    date: 2026-01-18
    changes: "मार्कडाउन सामग्री, MDX और SSR समर्थन की स्वचालित सजावट"
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
---

# Markdown / रिच टेक्स्ट सामग्री

Intlayer Markdown सिंटैक्स का उपयोग करके परिभाषित रिच टेक्स्ट सामग्री का समर्थन करता है। यह आपको ब्लॉग, लेख आदि जैसी समृद्ध-स्वरूपित सामग्री को आसानी से लिखने और बनाए रखने की अनुमति देता है।

## Markdown सामग्री घोषित करना

आप `md` फ़ंक्शन का उपयोग करके या केवल एक स्ट्रिंग के रूप में (यदि इसमें Markdown सिंटैक्स है) Markdown सामग्री घोषित कर सकते हैं।

<Tabs>
  <Tab label=".content.md" value=".content.md">
    संस्करण `8.10.0` से, आप सीधे `.content.md` फ़ाइलों में Markdown सामग्री घोषित कर सकते हैं। Intlayer स्वचालित रूप से Markdown सामग्री का पता लगाएगा और उसे पार्स करेगा।

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: मेरी सामग्री
    locale: en
    ---

    # मेरी सामग्री

    यहाँ एक मार्कडाउन सामग्री उदाहरण है
    ```

    `locale` फ्रंट-मैटर फ़ील्ड वह फ़ील्ड है जो सामग्री स्थानीय (locale) को परिभाषित करता है। यह वैकल्पिक है। यदि प्रदान नहीं किया जाता है, तो Intlayer डिफ़ॉल्ट स्थानीय का उपयोग करेगा, जिसे विशिष्ट स्थानीय के लिए कोई अनुवाद उपलब्ध नहीं होने पर फ़ॉलबैक स्थानीय के रूप में भी उपयोग किया जाता है।

    फ़ाइल संरचना उदाहरण:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    आप फ्रंट-मैटर में [डिक्शनरी परिभाषा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) में परिभाषित कोई भी गुण जोड़ सकते हैं

  </Tab>
  <Tab label="मैनुअल रैपिंग" value="manual-wrapping">
    Markdown सामग्री को स्पष्ट रूप से घोषित करने के लिए `md` फ़ंक्शन का उपयोग करें। यह तब उपयोगी होता है जब आप यह सुनिश्चित करना चाहते हैं कि किसी स्ट्रिंग को Markdown के रूप में माना जाए, भले ही उसमें स्पष्ट सिंटैक्स न हो।

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
    यदि स्ट्रिंग में सामान्य Markdown संकेतक (जैसे हेडिंग, लिस्ट, लिंक आदि) हैं, तो Intlayer स्वचालित रूप से इसे बदल देगा।

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdown सामग्री की स्वचालित पहचान सक्षम करें - intlayer.config.ts में विश्व स्तर पर सेट किया जा सकता है
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
          hi: md(file("./myMarkdown.hi.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Markdown रेंडरिंग

Intlayer Markdown रेंडर करने के दो स्वतंत्र तरीके प्रदान करता है:

1. **`useIntlayer` के माध्यम से**
   — Intlayer स्वचालित रूप से `md` नोड को फ्रेमवर्क के मूल आउटपुट (JSX, VNode, HTML स्ट्रिंग) में बदल देता है।
   - फ्रंटमैटर को पार्स किया जाता है और `.metadata` के रूप में उजागर किया जाता है। आप रेंडरिंग को दो स्तरों पर ओवरराइड कर सकते हैं — विश्व स्तर पर `MarkdownProvider` (या फ्रेमवर्क समतुल्य) के साथ और स्थानीय स्तर पर प्रति नोड `.use()` के साथ। दोनों को जोड़ा जा सकता है; `.use()`, `MarkdownProvider` पर पूर्वता लेता है, जो डिफ़ॉल्ट पर पूर्वता लेता है।

2. **हेल्पर यूटिलिटीज** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, और `renderMarkdown()` स्टैंडअलोन टूल हैं जो **केवल कच्चे Markdown स्ट्रिंग्स** को स्वीकार करते हैं। वे `useIntlayer` से स्वतंत्र हैं और इसके द्वारा लौटाए गए सजाए गए नोड्स के साथ काम नहीं करते हैं।

Markdown रेंडरिंग **MDX** का समर्थन करता है — अपने Markdown के अंदर सीधे नाम से किसी भी JSX/फ्रेमवर्क घटक का उपयोग करें।

### 1. स्वचालित रेंडरिंग (`useIntlayer` के माध्यम से)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Markdown नोड्स को सीधे JSX के रूप में रेंडर किया जा सकता है।

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
          MyButton: (props) => <button {...props} />, // MDX घटक
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > यदि `MarkdownProvider` मौजूद नहीं है, तो Intlayer डिफ़ॉल्ट Markdown से JSX पार्सर का उपयोग करके मार्कडाउन को रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue में, Markdown सामग्री को अंतर्निहित `component` टैग का उपयोग करके या सीधे एक नोड के रूप में रेंडर किया जा सकता है।

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    `intlayerMarkdown` प्लगइन के माध्यम से विश्व स्तर पर कॉन्फ़िगर करें (MDX कस्टम घटकों का समर्थन करता है):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX घटक
      },
    });
    ```

    > यदि `intlayerMarkdown` प्लगइन स्थापित नहीं है, तो Intlayer डिफ़ॉल्ट कंपाइलर का उपयोग करके रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte डिफ़ॉल्ट रूप से Markdown को एक HTML स्ट्रिंग के रूप में रेंडर करता है। इसे रेंडर करने के लिए `{@html}` का उपयोग करें।

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

    > यदि `MarkdownProvider` मौजूद नहीं है, तो Intlayer डिफ़ॉल्ट कंपाइलर का उपयोग करके मार्कडाउन को रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact, JSX में सीधे Markdown नोड्स का समर्थन करता है।

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
          MyButton: (props) => <button {...props} />, // MDX घटक
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > यदि `MarkdownProvider` मौजूद नहीं है, तो Intlayer डिफ़ॉल्ट Markdown से JSX पार्सर का उपयोग करके मार्कडाउन को रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid, JSX में सीधे Markdown नोड्स का समर्थन करता है।

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
          MyButton: (props) => <button {...props} />, // MDX घटक
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > यदि `MarkdownProvider` मौजूद नहीं है, तो Intlayer डिफ़ॉल्ट Markdown से JSX पार्सर का उपयोग करके मार्कडाउन को रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular, Markdown सामग्री को रेंडर करने के लिए `[innerHTML]` निर्देश का उपयोग करता है।

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

    > यदि IntlayerMarkdown प्रदाता कॉन्फ़िगर नहीं किया गया है, तो Intlayer डिफ़ॉल्ट कंपाइलर का उपयोग करके रेंडर करेगा।

    आप `.use()` विधि का उपयोग करके विशिष्ट नोड्स के लिए स्थानीय ओवरराइड भी प्रदान कर सकते हैं:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    आप Markdown को एक स्ट्रिंग के रूप में प्राप्त कर सकते हैं:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    और आप अपने मार्कडाउन मेटाडेटा तक इस प्रकार पहुँच सकते हैं:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. हेल्पर यूटिलिटीज (केवल Markdown स्ट्रिंग्स)

ये यूटिलिटीज **केवल कच्चे Markdown स्ट्रिंग्स** को रेंडर करती हैं और `useIntlayer` से स्वतंत्र हैं। जब आपको अपने डिक्शनरी के अलावा अन्य स्रोतों से Markdown रेंडर करने की आवश्यकता हो, तो इनका उपयोग करें।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` घटक

    विशिष्ट विकल्पों के साथ एक Markdown स्ट्रिंग रेंडर करता है।

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    पूर्व-कॉन्फ़िगर रेंडरर फ़ंक्शन प्राप्त करें।

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# मेरा शीर्षक");
    ```

    #### `renderMarkdown()` उपयोगिता
    घटकों के बाहर रेंडरिंग के लिए स्टैंडअलोन उपयोगिता।

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# मेरा शीर्षक", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` घटक

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
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
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# मेरा शीर्षक" />
    ```

    #### `useMarkdownRenderer()` हुक

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# मेरा शीर्षक")}
    ```

    #### `renderMarkdown()` उपयोगिता

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# मेरा शीर्षक")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` घटक

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# मेरा शीर्षक")}</div>;
    ```

    #### `renderMarkdown()` उपयोगिता

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# मेरा शीर्षक")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` घटक

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# मेरा शीर्षक")}</div>;
    ```

    #### `renderMarkdown()` उपयोगिता

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# मेरा शीर्षक")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` सेवा
    सेवा का उपयोग करके एक Markdown स्ट्रिंग रेंडर करता है।

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

## `MarkdownProvider` के साथ ग्लोबल कॉन्फ़िगरेशन

`MarkdownProvider` (या इसके फ्रेमवर्क समतुल्य) आपके संपूर्ण एप्लिकेशन के लिए Markdown रेंडरिंग पाइपलाइन को कॉन्फ़िगर करता है। यह स्वचालित `useIntlayer` रेंडरिंग और हेल्पर यूटिलिटीज दोनों पर लागू होता है। यहाँ सेट किए गए विकल्प डिफ़ॉल्ट हैं — `.use()` उन्हें नोड स्तर पर ओवरराइड करता है।

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

    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

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

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

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

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

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

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

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

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

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

    > अपने Markdown रेंडरर को गतिशील रूप से आयात करना आपके एप्लिकेशन के बंडल आकार को कम करने का एक शानदार तरीका है।

  </Tab>
</Tabs>
