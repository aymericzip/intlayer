---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode प्रकार। यह क्या है?
description: IntlayerNode प्रकार क्या है? मेरी स्ट्रिंग IntlayerNode&lt;string&gt; में क्यों बदल गई है?
keywords:
  - परिचय
  - शुरू करें
  - Intlayer
  - एप्लिकेशन
  - पैकेज
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "दस्तावेज़ की शुरुआत"
author: aymericzip
---

# IntlayerNode प्रकार क्या है?

`IntlayerNode<T>` प्रकार एक विशेष प्रकार है जो intlayer के पैकेज जैसे कि `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` और `vanilla-intlayer` द्वारा प्रदान किया जाता है।

## उपयोग का उदाहरण

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // प्रकार लौटाता है: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo docs/docs/hi/dictionary/markdown.md की तरह अन्य फ्रेमवर्क को टैब के रूप में जोड़ें
</Tabs>

### Intlayer एक IntlayerNode क्यों डालता है?

Intlayer CMS / विजुअल एडिटर के संदर्भ में विजुअल एडिटर सिलेक्टर्स को रेंडर करने में सक्षम होने के लिए एक IntlayerNode डालता है।

![विजुअल एडिटर डेमो](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

एक IntlayerNode एक समृद्ध React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla नोड है, लेकिन बेस प्रिमिटिव नोड के गुणों तक पहुँचने के लिए भी है।

उदाहरण के लिए:

```js
const content = useIntlayer("app");

// स्ट्रिंग का मामला
content.title; // IntlayerNode&lt;string&gt; लौटाता है
content.title.value; // बेस कंटेंट लौटाता है, यहाँ एक स्ट्रिंग

content.title.toString(); // स्ट्रिंग लौटाता है
content.title.toLowerCase(); // स्ट्रिंग लौटाता है
String(content.title); // स्ट्रिंग लौटाता है
content.title.toUpperCase(); // अपरकेस स्ट्रिंग लौटाता है
content.title.replace("a", "b"); // संशोधित स्ट्रिंग लौटाता है
// ...
```

> IntlayerNode के गुणों तक पहुँचना काम करेगा, लेकिन विजुअल एडिटर में सिलेक्टर्स को प्रदर्शित करने की क्षमता को तोड़ देगा।

> IntlayerNode नंबर, या अन्य प्रकार जैसे कि `IntlayerNode<number>` को भी लपेट सकता है
