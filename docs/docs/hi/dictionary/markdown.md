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
  - version: 8.11.0
    date: 2026-05-28
    changes: "SSR / हाइड्रेशन के लिए मार्कडाउन एएसटी के पूर्व-पार्सिंग की अनुमति दें"
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
author: aymericzip
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
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
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
</Tabs>

## Markdown रेंडरिंग

Intlayer Markdown रेंडर करने के दो स्वतंत्र तरीके प्रदान करता है:

1. **`useIntlayer` के माध्यम से**
   — Intlayer स्वचालित रूप से `md` नोड को फ्रेमवर्क के मूल आउटपुट (JSX, VNode, HTML स्ट्रिंग) में बदल देता है।
   - फ्रंटमैटर को पार्स किया जाता है और `.metadata` के रूप में उजागर किया जाता है। आप रेंडरिंग को दो स्तरों पर ओवरराइड कर सकते हैं — विश्व स्तर पर `MarkdownProvider` (या फ्रेमवर्क समतुल्य) के साथ और स्थानीय स्तर पर प्रति नोड `.use()` के साथ। दोनों को जोड़ा जा सकता है; `.use()`, `MarkdownProvider` पर पूर्वता लेता है, जो डिफ़ॉल्ट पर पूर्वता लेता है।

2. **हेल्पर यूटिलिटीज** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, और `renderMarkdown()` स्टैंडअलोन टूल हैं जो **केवल कच्चे Markdown स्ट्रिंग्स** को स्वीकार करते हैं। वे `useIntlayer` से स्वतंत्र हैं और इसके द्वारा लौटाए गए सजाए गए नोड्स के साथ काम नहीं करते हैं।

Markdown रेंडरिंग **MDX** का समर्थन करता है — अपने Markdown के अंदर सीधे नाम से किसी भी JSX/फ्रेमवर्क घटक का उपयोग करें।

### 1. स्वचालित रेंडरिंग (`useIntlayer` के माध्यम से)

<Tabs group="framework">
  <Tab label="React" value="react">
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
  <Tab label="Next.js" value="nextjs">
    Markdown नोड्स को सीधे JSX के रूप में रेंडर किया जा सकता है।

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
  <Tab label="React" value="react">
  
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
  <Tab label="Next.js" value="nextjs">
  
    #### `<MarkdownRenderer />` घटक

    विशिष्ट विकल्पों के साथ एक Markdown स्ट्रिंग रेंडर करता है।

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# मेरा शीर्षक"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` हुक

    पूर्व-कॉन्फ़िगर रेंडरर फ़ंक्शन प्राप्त करें।

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# मेरा शीर्षक");
    ```

    #### `renderMarkdown()` उपयोगिता
    घटकों के बाहर रेंडरिंग के लिए स्टैंडअलोन उपयोगिता।

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

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

## `MarkdownProvider` के साथ ग्लोबल कॉन्फ़िगरेशन

`MarkdownProvider` (या इसके फ्रेमवर्क समतुल्य) आपके संपूर्ण एप्लिकेशन के लिए Markdown रेंडरिंग पाइपलाइन को कॉन्फ़िगर करता है। यह स्वचालित `useIntlayer` रेंडरिंग और हेल्पर यूटिलिटीज दोनों पर लागू होता है। यहाँ सेट किए गए विकल्प डिफ़ॉल्ट हैं — `.use()` उन्हें नोड स्तर पर ओवरराइड करता है।

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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

    आप अपने स्वयं के मार्कडाउन रेंडरर का भी उपयोग कर सकते हैं:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('next-intlayer/markdown');
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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

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


    > MDX समर्थित है — आपके Markdown के अंदर उपयोग किए गए किसी भी घटक नाम (उदा. `<MyCustomJSXComponent />`) को `components` मानचित्र के विरुद्ध हल किया जाता है।

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

## सस्पेंस (Suspense)

Intlayer Markdown रेंडरर गतिशील रूप से लोड किया गया है। अनुकूलित होने के बावजूद, अंतर्निहित पार्सर चंक लगभग 55kb है। इसे सिंक्रोनस रूप से लोड करने से प्रारंभिक पृष्ठ रेंडरिंग में देरी होती है और First Contentful Paint (FCP) कम हो जाता है।

UI को ब्लॉक होने से रोकने के लिए, Intlayer React के Suspense API के साथ एकीकृत होता है। यह पार्सर को पृष्ठभूमि में लाता है और डाउनलोड के दौरान एक Promise थ्रो करता है।

Intlayer Markdown रेंडर करने वाले किसी भी घटक को `<Suspense>` बाउंड्री में लपेटें। यह चंक डाउनलोड होने के दौरान एक स्थानीयकृत फ़ॉलबैक स्थिति प्रदर्शित करता है, जिससे आपके शेष DOM को तुरंत रेंडर करने की अनुमति मिलती है।

चेतावनी: यदि आप `<Suspense>` बाउंड्री प्रदान नहीं करते हैं, तो 55kb चंक पूरी तरह से लोड होने तक React रूट स्तर पर निलंबित हो जाएगा या पूरे घटक ट्री को रेंडर होने से रोक देगा।

<Tabs>
  <Tab label="Next.js" value="nextjs">

Next.js ऐप राउटर में, आप क्लाइंट घटकों के लिए React `Suspense` या सर्वर घटकों के लिए `loading.tsx` फ़ाइल का उपयोग कर सकते हैं।

**क्लाइंट घटक:**

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

**`loading.tsx` के साथ सर्वर घटक:**

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

Vue में एक अंतर्निहित `<Suspense>` घटक है। Markdown सामग्री रेंडर करने वाले घटक को `<Suspense>` बाउंड्री में लपेटें।

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

Svelte में Suspense API के समकक्ष नहीं है। Markdown सामग्री के एसिंक्रोनस रेंडरिंग को संभालने के लिए `{#await}` ब्लॉक का उपयोग करें।

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

Preact `preact/compat` के माध्यम से React के Suspense API का समर्थन करता है।

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

Solid का अपना `<Suspense>` घटक `solid-js` से है।

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

Angular में Suspense API नहीं है। लेज़ी-लोडेड Markdown सामग्री (Angular 17+ की आवश्यकता है) को संभालने के लिए Angular के आस्थगित दृश्य (`@defer`) का उपयोग करें।

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

---

## सर्वर-साइड रेंडरिंग (SSR) और हाइड्रेशन

अन्य मार्कडाउन पार्सर जैसे remark / rehype की तुलना में, Intlayer Markdown पूरी तरह से निर्भरता-मुक्त है और क्लाइंट तथा सर्वर दोनों साइड पर चलता है।

लेकिन Intlayer ने सर्वर-साइड रेंडरिंग (SSR) फ्रेमवर्क (जैसे Next.js App Router, React Router, Nuxt, SvelteKit, आदि) के लिए पार्सिंग को अनुकूलित किया है।

क्लाइंट को रॉ मार्कडाउन स्ट्रिंग्स भेजने और ब्राउज़र पर उन्हें पार्स करने के बजाय (जिससे प्रदर्शन प्रभावित होता है), Intlayer आपको सर्वर पर ही मार्कडाउन को एब्सट्रैक्ट सिंटैक्स ट्री (AST) में प्री-पार्स करने की अनुमति देता है।

आप सर्वर साइड पर अपने फ्रेमवर्क के Intlayer पैकेज से `parseMarkdown` फ़ंक्शन का उपयोग करके एक सीरियलाइज़ेबल AST (`ParsedMarkdown` ऑब्जेक्ट) बना सकते हैं, और इसे सीधे फ़्रंटएंड पर पास कर सकते हैं। सभी Intlayer रेंडरिंग उपयोगिताएँ (जैसे `<MarkdownRenderer>`, `useMarkdownRenderer`, आदि) स्वचालित रूप से इस AST ऑब्जेक्ट को स्वीकार करती हैं और इसे बिना किसी बाधा के रेंडर करती हैं।

### सर्वर/क्लाइंट आर्किटेक्चर में उदाहरण

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. सर्वर पर: मार्कडाउन को एक सीरियलाइज़ेबल AST में पार्स करें
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // AST को JSON के रूप में क्लाइंट को वापस करें
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. क्लाइंट पर: बिना री-पार्स किए सीधे AST रेंडर करें
    export default function Page() {
      const { content } = useLoaderData();

      // रेंडरर रॉ स्ट्रिंग या पार्स किए गए AST दोनों को स्वीकार करता है
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. सर्वर पर मार्कडाउन को सीरियलाइज़ेबल AST में पार्स करें
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. सीधे AST को रेंडर करें
      // सर्वर कंपोनेंट में, यह बिना किसी समस्या के काम करता है और यदि आवश्यक हो
    // तो सीधे अंतर्निहित क्लाइंट कंपोनेंट्स में AST को पास करता है।
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. सर्वर पर मार्कडाउन प्राप्त करें और उसे AST में पार्स करें
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. क्लाइंट पर: बिना री-पार्स किए सीधे AST रेंडर करें -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. सर्वर पर: मार्कडाउन को एक सीरियलाइज़ेबल AST में पार्स करें
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // AST को क्लाइंट को लौटाएं
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. क्लाइंट पर: बिना री-पार्स किए सीधे AST रेंडर करें -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR आमतौर पर प्रारंभिक लोड के दौरान सर्वर पर डेटा हल करता है और क्लाइंट पर हाइड्रेट करता है। आप AST पास करने के लिए रिज़ॉल्वर का उपयोग कर सकते हैं।

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. सर्वर पर: मार्कडाउन को एक सीरियलाइज़ेबल AST में पार्स करें
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
        // 2. क्लाइंट पर: बिना री-पार्स किए सीधे AST रेंडर करें
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
</Tabs>

यह पैटर्न यह सुनिश्चित करता है कि मार्कडाउन पार्सिंग लॉजिक पूरी तरह से सर्वर पर निष्पादित हो, जिससे क्लाइंट-साइड निष्पादन समय काफी कम हो जाता है और प्रारंभिक हाइड्रेशन गति में सुधार होता है।

## विकल्प संदर्भ

इन विकल्पों को `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` और `renderMarkdown` में पास किया जा सकता है।

| Option                | Type        | Default | विवरण                                                                                  |
| :-------------------- | :---------- | :------ | :------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | आउटपुट को ब्लॉक-स्तरीय तत्व (उदा., `<div>`) में लपेटने के लिए बाध्य करता है।           |
| `forceInline`         | `boolean`   | `false` | आउटपुट को इनलाइन तत्व (उदा., `<span>`) में लपेटने के लिए बाध्य करता है।                |
| `tagfilter`           | `boolean`   | `true`  | खतरनाक HTML टैग को हटाकर सुरक्षा में सुधार के लिए GitHub टैग फ़िल्टर को सक्षम करता है। |
| `preserveFrontmatter` | `boolean`   | `false` | यदि `true` है, तो Markdown स्ट्रिंग के प्रारंभ में फ्रंटमैटर को नहीं हटाया जाएगा।      |
| `components`          | `Overrides` | `{}`    | कस्टम घटकों के लिए HTML टैग का मानचित्र (उदा., `{ h1: MyHeading }`)।                   |
| `wrapper`             | `Component` | `null`  | रेंडर किए गए Markdown को लपेटने के लिए एक कस्टम घटक।                                   |
| `renderMarkdown`      | `Function`  | `null`  | डिफ़ॉल्ट Markdown कंपाइलर को पूरी तरह से बदलने के लिए एक कस्टम रेंडरिंग फ़ंक्शन।       |
