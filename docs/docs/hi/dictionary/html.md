---
createdAt: 2026-01-20
updatedAt: 2026-09-21
priority: 8
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
    changes: "Add `intlayerHTML` plugin object; use `app.use(intlayerHTML)` instead of `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "move import from `{{framework}}-intlayer` to `{{framework}}-intlayer/html`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "HTMLRenderer / useHTMLRenderer / renderHTML यूटिलिटी जोड़े"
  - version: 8.0.0
    date: 2026-01-20
    changes: "HTML पार्सिंग समर्थन जोड़ा"
author: aymericzip
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
      contentAutoTransformation: true, // कॉन्फ़िग फ़ाइल में सेट किया जा सकता है
      content: {
        myHtmlContent:  html("<p>हैलो <strong>वर्ल्ड</strong></p>"),
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
      contentAutoTransformation: true, // कॉन्फ़िग फ़ाइल में सेट किया जा सकता है
      content: {
        myHtmlContent:  "<p>हैलो <strong>वर्ल्ड</strong></p>",
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
  <Tab label="Remix" value="remix">
    Remix 3 में, HTML नोड्स एक HTML स्ट्रिंग में हल होते हैं। इसे Remix JSX के `innerHTML` प्रॉप के साथ, या `html-template` दृश्य में `html.raw` के साथ इंजेक्ट करें।

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

    > Remix डिफ़ॉल्ट रूप से इंटरपोलेटेड मानों को एस्केप करता है। `innerHTML` और `html.raw` दो ऑप्ट-आउट हैं, जो एक HTML स्ट्रिंग की आवश्यकता है।

    टैग को ओवरराइड करने या कस्टम घटकों को मैप करने के लिए `.use()` विधि का उपयोग करें। ओवरराइड ऐसे फ़ंक्शन हैं जो एक HTML स्ट्रिंग लौटाते हैं:

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
    Astro में, HTML नोड्स एक HTML स्ट्रिंग में हल होते हैं। इसे टेम्पलेट में `set:html` निर्देश के साथ, या क्लाइंट `<script>` में `innerHTML` के साथ इंजेक्ट करें।

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

    > Astro डिफ़ॉल्ट रूप से `{अभिव्यक्तियों}` को एस्केप करता है। `set:html` ऑप्ट-आउट है, जो एक HTML स्ट्रिंग की आवश्यकता है।

    टैग को ओवरराइड करने या कस्टम घटकों को मैप करने के लिए `.use()` विधि का उपयोग करें। ओवरराइड ऐसे फ़ंक्शन हैं जो एक HTML स्ट्रिंग लौटाते हैं:

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

## `HTMLProvider` के साथ वैश्विक कॉन्फ़िगरेशन

आप अपने पूरे एप्लिकेशन के लिए HTML rendering को वैश्विक स्तर पर कॉन्फ़िगर कर सकते हैं। यह उन कस्टम कंपोनेंट्स को परिभाषित करने के लिए आदर्श है जिन्हें सभी HTML कंटेंट में उपलब्ध होना चाहिए।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

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

    आप अपना स्वयं का HTML renderer भी उपयोग कर सकते हैं:

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

    > अपने HTML renderer को dynamically import करना आपके application के bundle size को कम करने का एक अच्छा तरीका है।

  </Tab>
  <Tab label="Remix" value="remix">

    Remix में प्रोवाइडर रखने के लिए कोई कंपोनेंट ट्री नहीं है, इसलिए सर्वर प्रारंभ होने पर कॉन्फ़िगरेशन एक सिंगलटन के रूप में एक बार स्थापित होता है। यह `useHTMLRenderer()` द्वारा लौटाए गए रेंडरर को कॉन्फ़िगर करता है। `useIntlayer` द्वारा लौटाए गए `html` नोड्स यथावत प्रस्तुत किए जाते हैं; प्रति नोड उनके टैग को `.use()` के साथ ओवरराइड करें।

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > रेंडरर को लेज़ी लोड करने के लिए `installIntlayerHTMLDynamic(async () => …)` का उपयोग करें; लोडर केवल पहले कॉल पर चलता है।

  </Tab>
  <Tab label="Astro" value="astro">

    Astro में प्रोवाइडर रखने के लिए कोई कंपोनेंट ट्री नहीं है, इसलिए कॉन्फ़िगरेशन मिडलवेयर (सर्वर) और क्लाइंट `<script>` (ब्राउज़र) में सिंगलटन के रूप में एक बार स्थापित होता है। यह `useHTMLRenderer()` द्वारा लौटाए गए रेंडरर को कॉन्फ़िगर करता है। `useIntlayer` द्वारा लौटाए गए `html` नोड्स यथावत प्रस्तुत किए जाते हैं; प्रति नोड उनके टैग को `.use()` के साथ ओवरराइड करें।

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // सर्वर प्रारंभ होने पर एक बार चलता है; Intlayer मिडलवेयर स्वयं इस फ़ाइल से
    // पहले एकीकरण द्वारा पंजीकृत होता है।
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > रेंडरर को लेज़ी लोड करने के लिए `installIntlayerHTMLDynamic(async () => …)` का उपयोग करें; लोडर केवल पहले कॉल पर चलता है।

  </Tab>
</Tabs>

### मैनुअल रेंडरिंग और उन्नत टूल्स

यदि आपको raw HTML स्ट्रिंग्स रेंडर करने की आवश्यकता है या component मैपिंग पर अधिक नियंत्रण चाहिए, तो निम्नलिखित टूल्स का उपयोग करें।

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` कम्पोनेंट
    विशिष्ट कम्पोनेंट्स के साथ HTML स्ट्रिंग रेंडर करें।

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    एक पूर्व-कॉन्फ़िगर किया हुआ renderer फ़ंक्शन प्राप्त करें।

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>हैलो <strong>वर्ल्ड</strong></p>");
    ```

    #### `renderHTML()` यूटिलिटी

    कम्पोनेन्ट्स के बाहर रेंडरिंग के लिए स्टैंडअलोन यूटिलिटी।

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>हैलो</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<HTMLRenderer />` कम्पोनेन्ट

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

    #### `<HTMLRenderer />` कम्पोनेन्ट

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` हुक

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` यूटिलिटी

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### `<HTMLRenderer />` कम्पोनेंट

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` यूटिलिटी

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### `<HTMLRenderer />` कम्पोनेंट

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` हुक

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` यूटिलिटी

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerHTMLService` सर्विस
    सर्विस का उपयोग करके HTML स्ट्रिंग रेंडर करें।

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
    #### `useHTMLRenderer()` हुक

    `installIntlayerHTML()` द्वारा पूर्व-कॉन्फ़िगर किया गया रेंडरर फ़ंक्शन प्राप्त करें। यह एक HTML स्ट्रिंग लौटाता है।

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### `renderHTML()` यूटिलिटी

    स्टैंडअलोन यूटिलिटी जो वैश्विक कॉन्फ़िगरेशन को अनदेखा करती है।

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### `useHTMLRenderer()` हुक

    `installIntlayerHTML()` द्वारा पूर्व-कॉन्फ़िगर किया गया रेंडरर फ़ंक्शन प्राप्त करें। यह एक HTML स्ट्रिंग लौटाता है।

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### `renderHTML()` यूटिलिटी

    स्टैंडअलोन यूटिलिटी जो वैश्विक कॉन्फ़िगरेशन को अनदेखा करती है।

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## विकल्प संदर्भ

इन विकल्पों को `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, और `renderHTML` को पास किया जा सकता है।

| विकल्प       | प्रकार                | डिफ़ॉल्ट | विवरण                                                                                                             |
| :----------- | :-------------------- | :------- | :---------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | HTML टैग्स या कस्टम कॉम्पोनेंट नामों को कॉम्पोनेंट्स से मैप करने वाला ऑब्जेक्ट।                                   |
| `renderHTML` | `Function`            | `null`   | डिफ़ॉल्ट HTML पार्सर को पूरी तरह से बदलने के लिए एक कस्टम रेंडरिंग फ़ंक्शन (Vue, Svelte, Remix और Astro प्रदाता)। |

> नोट: React और Preact के लिए, मानक HTML टैग्स स्वतः प्रदान किए जाते हैं। केवल तभी आपको `components` prop पास करने की आवश्यकता होती है जब आप उन्हें ओवरराइड करना या कस्टम कॉम्पोनेंट जोड़ना चाहें।
