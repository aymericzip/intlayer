---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML सामग्री
description: जानें कि Intlayer में कस्टम कॉम्पोनेंट्स के साथ HTML सामग्री कैसे घोषित और उपयोग की जाती है। अपनी अंतर्राष्ट्रीयकृत परियोजना में गतिशील कॉम्पोनेंट प्रतिस्थापन के साथ समृद्ध HTML-जैसी सामग्री एम्बेड करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - HTML
  - Custom Components
  - Rich Content
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
    changes: HTMLRenderer / useHTMLRenderer / renderHTML यूटिलिटी जोड़े
  - version: 8.0.0
    date: 2026-01-20
    changes: HTML पार्सिंग समर्थन जोड़ा
---

# HTML सामग्री / Intlayer में HTML

Intlayer HTML सामग्री का समर्थन करता है, जिससे आप अपने dictionaries के भीतर समृद्ध, संरचित सामग्री एम्बेड कर सकते हैं। इस सामग्री को standard HTML टैग्स के साथ रेंडर किया जा सकता है या रनटाइम पर कस्टम कंपोनेंट्स से बदल दिया जा सकता है।

## HTML कंटेंट घोषित करना

आप `html` फ़ंक्शन का उपयोग करके या सीधे एक स्ट्रिंग के रूप में HTML कंटेंट घोषित कर सकते हैं।

<Tabs>
  <Tab label="मैन्युअल रैपिंग" value="manual-wrapping">
    HTML कंटेंट को स्पष्ट रूप से घोषित करने के लिए `html` फ़ंक्शन का उपयोग करें। यह सुनिश्चित करता है कि मानक टैग सही तरीके से मैप किए जाएँ, भले ही स्वचालित पहचान अक्षम हो।

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>हैलो <strong>वर्ल्ड</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="स्वचालित पहचान" value="automatic-detection">
    यदि स्ट्रिंग में सामान्य HTML टैग शामिल हैं (उदाहरण के लिए `<p>`, `<div>`, `<strong>` आदि), तो Intlayer इसे स्वतः रूप से परिवर्तित कर देगा।

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>हैलो <strong>वर्ल्ड</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="बाहरी फ़ाइलें" value="external-files">
    HTML सामग्री फ़ाइलों से आयात करें। ध्यान दें कि वर्तमान में `file()` फ़ंक्शन एक स्ट्रिंग लौटाता है, जिसे टैग शामिल होने पर स्वतः HTML के रूप में पहचाना जाएगा।

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          hi: html(file("./content.hi.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### `html()` नोड

`html()` फ़ंक्शन Intlayer v8 में एक नई विशेषता है जो आपको अपने शब्दकोशों में स्पष्ट रूप से HTML सामग्री को परिभाषित करने की अनुमति देती है। जबकि Intlayer अक्सर HTML सामग्री का स्वतः पता लगा सकता है, `html()` फ़ंक्शन का उपयोग करने से कई लाभ मिलते हैं:

- **टाइप सुरक्षा (Type Safety)**: `html()` फ़ंक्शन आपको कस्टम घटकों के लिए अपेक्षित प्रॉप्स (props) को परिभाषित करने की अनुमति देता है, जो आपके संपादक में बेहतर ऑटोकंप्लीशन और टाइप चेकिंग प्रदान करता है।
- **स्पष्ट घोषणा**: यह सुनिश्चित करता है कि स्ट्रिंग को हमेशा HTML के रूप में माना जाए, भले ही इसमें मानक HTML टैग न हों जो स्वतः पता लगाने को ट्रگر करते हैं।
- **कस्टम घटक परिभाषा**: आप कस्टम घटकों और उनके अपेक्षित प्रॉप प्रकारों को परिभाषित करने के लिए `html()` में दूसरा तर्क पारित कर सकते हैं।

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='नमस्ते'>दुनिया</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

HTML नोड पर `.use()` विधि का उपयोग करते समय, आपके द्वारा प्रदान किए गए घटकों की जांच `html()` फ़ंक्शन (यदि उपलब्ध हो) में प्रदान की गई परिभाषा के विरुद्ध की जाएगी।

---

## HTML रेंडरिंग

रेंडरिंग को Intlayer के कंटेंट सिस्टम द्वारा स्वचालित रूप से या विशेष टूल्स का उपयोग करके मैन्युअली संभाला जा सकता है।

### स्वचालित रेंडरिंग (`useIntlayer` का उपयोग)

जब आप `useIntlayer` के माध्यम से कंटेंट एक्सेस करते हैं, तो HTML नोड्स पहले से ही रेंडरिंग के लिए तैयार होते हैं।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML नोड्स को सीधे JSX के रूप में रेंडर किया जा सकता है। सामान्य टैग स्वचालित रूप से काम करते हैं।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    कस्टम कंपोनेंट्स प्रदान करने या टैग ओवरराइड करने के लिए `.use()` मेथड का उपयोग करें:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue में, HTML कंटेंट बिल्ट-इन `component` के माध्यम से रेंडर किया जा सकता है।

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    ओवरराइड करने के लिए `.use()` का उपयोग करें:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte HTML नोड्स को स्ट्रिंग के रूप में रेंडर करता है। इसे रेंडर करने के लिए `{@html}` का उपयोग करें।

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact JSX में सीधे HTML नोड्स को सपोर्ट करता है।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid JSX में सीधे HTML नोड्स को सपोर्ट करता है।

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular HTML कंटेंट रेंडर करने के लिए `[innerHTML]` डायरेक्टिव का उपयोग करता है।

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

    कस्टम कंपोनेंट्स प्रदान करने या टैग ओवरराइड करने के लिए `.use()` मेथड का उपयोग करें:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## `HTMLProvider` के साथ वैश्विक कॉन्फ़िगरेशन

आप अपने पूरे एप्लिकेशन के लिए HTML rendering को वैश्विक स्तर पर कॉन्फ़िगर कर सकते हैं। यह उन कस्टम कंपोनेंट्स को परिभाषित करने के लिए आदर्श है जिन्हें सभी HTML कंटेंट में उपलब्ध होना चाहिए।

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

### मैनुअल रेंडरिंग और उन्नत टूल्स

यदि आपको raw HTML स्ट्रिंग्स रेंडर करने की आवश्यकता है या component मैपिंग पर अधिक नियंत्रण चाहिए, तो निम्नलिखित टूल्स का उपयोग करें।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` कम्पोनेंट
    विशिष्ट कम्पोनेंट्स के साथ HTML स्ट्रिंग रेंडर करें।

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    एक पूर्व-कॉन्फ़िगर किया हुआ renderer फ़ंक्शन प्राप्त करें।

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>हैलो <strong>वर्ल्ड</strong></p>");
    ```

    #### `renderHTML()` यूटिलिटी

    कम्पोनेन्ट्स के बाहर रेंडरिंग के लिए स्टैंडअलोन यूटिलिटी।

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>हैलो</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### `<HTMLRenderer />` कम्पोनेन्ट
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### `<HTMLRenderer />` कम्पोनेन्ट
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` हुक

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` यूटिलिटी

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### `<HTMLRenderer />` कम्पोनेंट
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` यूटिलिटी

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### `<HTMLRenderer />` कम्पोनेंट
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` यूटिलिटी

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` सर्विस
    सर्विस का उपयोग करके HTML स्ट्रिंग रेंडर करें।

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

## विकल्प संदर्भ

इन विकल्पों को `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, और `renderHTML` को पास किया जा सकता है।

| विकल्प       | प्रकार                | डिफ़ॉल्ट | विवरण                                                                                                          |
| :----------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | HTML टैग्स या कस्टम कॉम्पोनेंट नामों को कॉम्पोनेंट्स से मैप करने वाला ऑब्जेक्ट।                                |
| `renderHTML` | `Function`            | `null`   | डिफ़ॉल्ट HTML पार्सर को पूरी तरह से बदलने के लिए एक कस्टम रेंडरिंग फ़ंक्शन (केवल Vue/Svelte providers के लिए)। |

> नोट: React और Preact के लिए, मानक HTML टैग्स स्वतः प्रदान किए जाते हैं। केवल तभी आपको `components` prop पास करने की आवश्यकता होती है जब आप उन्हें ओवरराइड करना या कस्टम कॉम्पोनेंट जोड़ना चाहें।
