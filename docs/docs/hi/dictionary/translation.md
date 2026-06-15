---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: अनुवाद
description: अपनी बहुभाषी वेबसाइट में अनुवाद कैसे घोषित करें और उपयोग करें यह जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेटअप करें।
keywords:
  - अनुवाद
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# अनुवाद

## अनुवाद परिभाषित करना

`intlayer` में `t` फ़ंक्शन आपको कई भाषाओं में सामग्री घोषित करने की अनुमति देता है। यह फ़ंक्शन टाइप सुरक्षा सुनिश्चित करता है, यदि कोई अनुवाद गायब हो तो त्रुटि उत्पन्न करता है, जो विशेष रूप से TypeScript वातावरण में उपयोगी होता है।

यहाँ अनुवादों के साथ सामग्री घोषित करने का एक उदाहरण दिया गया है।

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## स्थानीय सेटिंग्स के लिए कॉन्फ़िगरेशन

सही अनुवाद प्रबंधन सुनिश्चित करने के लिए, आप `intlayer.config.ts` में स्वीकार किए गए स्थानीय सेटिंग्स को कॉन्फ़िगर कर सकते हैं। यह कॉन्फ़िगरेशन आपको उन भाषाओं को परिभाषित करने की अनुमति देता है जिन्हें आपका एप्लिकेशन सपोर्ट करता है:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## React कंपोनेंट्स में अनुवाद का उपयोग करना

<Tabs group="framework">
  <Tab label="React" value="react">

With `react-intlayer`, you can use translations in React components. Here's an example:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

This component fetches the corresponding translation based on the current locale set in your application.

  </Tab>
  <Tab label="Next.js" value="nextjs">

With `next-intlayer`, you can use translations in React Server Components or Client Components. Here's an example in a Client Component:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

With `vue-intlayer`, you can use translations in Vue components. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("multi_lang");
</script>

<template>
  <div>
    <p>{{ content.welcomeMessage }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

With `svelte-intlayer`, you can use translations in Svelte components. The hook returns a Svelte store. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("multi_lang");
</script>

<div>
  <p>{$content.welcomeMessage}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

With `preact-intlayer`, you can use translations in Preact components. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

With `solid-intlayer`, you can use translations in SolidJS components. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const MyComponent: Component = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

With `angular-intlayer`, you can use translations in Angular components. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  template: `
    <div>
      <p>{{ content().welcomeMessage }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("multi_lang");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

With `vanilla-intlayer`, you can use translations by subscribing to content changes. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("multi_lang").onChange((newContent) => {
  document.getElementById("welcome-message")!.textContent = String(
    newContent.welcomeMessage
  );
});

// Initial render
document.getElementById("welcome-message")!.textContent = String(
  content.welcomeMessage
);
```

  </Tab>
</Tabs>

## कस्टम कंटेंट ऑब्जेक्ट्स

`intlayer` अनुवाद के लिए कस्टम कंटेंट ऑब्जेक्ट्स का समर्थन करता है, जिससे आप अधिक जटिल संरचनाओं को परिभाषित कर सकते हैं और टाइप सुरक्षा सुनिश्चित कर सकते हैं। यहाँ एक कस्टम ऑब्जेक्ट के साथ उदाहरण दिया गया है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Page Title",
          "content": "पृष्ठ सामग्री"
        },
        "fr": {
          "title": "पृष्ठ का शीर्षक",
          "content": "पृष्ठ की सामग्री"
        },
        "es": {
          "title": "पृष्ठ का शीर्षक",
          "content": "पृष्ठ की सामग्री"
        }
      }
    }
  }
}
```
