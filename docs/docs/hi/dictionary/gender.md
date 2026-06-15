---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: लिंग-आधारित सामग्री
description: जानें कि Intlayer में लिंग-आधारित सामग्री का उपयोग कैसे करें ताकि लिंग के आधार पर सामग्री को गतिशील रूप से प्रदर्शित किया जा सके। इस दस्तावेज़ का पालन करें ताकि आप अपने प्रोजेक्ट में लिंग-विशिष्ट सामग्री को प्रभावी ढंग से लागू कर सकें।
keywords:
  - लिंग-आधारित सामग्री
  - गतिशील रेंडरिंग
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "लिंग आधारित सामग्री पेश की गई"
author: aymericzip
---

# लिंग-आधारित सामग्री / Intlayer में लिंग

## लिंग कैसे काम करता है

Intlayer में, लिंग-आधारित सामग्री `gender` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो विशिष्ट लिंग मानों ('male', 'female') को उनके संबंधित सामग्री से मैप करता है। यह तरीका आपको दिए गए लिंग के आधार पर सामग्री को गतिशील रूप से चुनने में सक्षम बनाता है। जब इसे React Intlayer या Next Intlayer के साथ एकीकृत किया जाता है, तो रनटाइम पर प्रदान किए गए लिंग के अनुसार उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## लिंग-आधारित सामग्री सेटअप करना

अपने Intlayer प्रोजेक्ट में लिंग-आधारित सामग्री सेटअप करने के लिए, एक सामग्री मॉड्यूल बनाएं जिसमें आपके लिंग-विशिष्ट परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
      female: "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
      fallback: "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "पुरुष उपयोगकर्ताओं के लिए मेरी सामग्री",
        "female": "महिला उपयोगकर्ताओं के लिए मेरी सामग्री",
        "fallback": "जब लिंग निर्दिष्ट नहीं होता है तो मेरी सामग्री", // वैकल्पिक
      },
    },
  },
}
```

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो अंतिम घोषित कुंजी को फॉलबैक के रूप में लिया जाएगा यदि लिंग निर्दिष्ट नहीं है या किसी परिभाषित लिंग से मेल नहीं खाता है।

## React Intlayer के साथ लिंग-आधारित सामग्री का उपयोग करना

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize gender-based content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a gender to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize gender-based content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilize gender-based content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilize gender-based content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilize gender-based content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilize gender-based content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilize gender-based content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilize gender-based content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// Initial render
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क्स में Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।
