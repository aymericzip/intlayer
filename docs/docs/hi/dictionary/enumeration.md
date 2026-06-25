---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: एनेमरेशन
description: जानिए कि अपनी बहुभाषी वेबसाइट में एनेमरेशन को कैसे घोषित और उपयोग करें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेटअप करें।
keywords:
  - एनेमरेशन
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
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# एनेमरेशन / बहुवचन रूप

## एनेमरेशन कैसे काम करता है

Intlayer में, एनेमरेशन `enu` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो विशिष्ट कुंजियों को उनके संबंधित सामग्री से मैप करता है। ये कुंजियाँ संख्यात्मक मान, रेंज, या कस्टम पहचानकर्ता हो सकती हैं। जब React Intlayer या Next Intlayer के साथ उपयोग किया जाता है, तो एप्लिकेशन की लोकल और परिभाषित नियमों के आधार पर उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## एनेमरेशन सेटअप करना

अपने Intlayer प्रोजेक्ट में एनेमरेशन सेटअप करने के लिए, आपको एक कंटेंट मॉड्यूल बनाना होगा जिसमें एनेमरेशन परिभाषाएँ शामिल हों। यहाँ कारों की संख्या के लिए एक सरल एनेमरेशन का उदाहरण दिया गया है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "माइनस एक कार से कम",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
      "fallback": "फॉलबैक मान", // वैकल्पिक
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "माइनस एक कार से कम",
        "-1": "माइनस एक कार",
        "0": "कोई कार नहीं",
        "1": "एक कार",
        ">5": "कुछ कारें",
        ">19": "कई कारें",
        "fallback": "फॉलबैक मान" // वैकल्पिक
      }
    }
  }
}
```

इस उदाहरण में, `enu` विभिन्न स्थितियों को विशिष्ट सामग्री से मैप करता है। जब इसे एक React घटक में उपयोग किया जाता है, तो Intlayer दिए गए चर के आधार पर स्वचालित रूप से उपयुक्त सामग्री चुन सकता है।

> Intlayer एनेमरेशन में घोषणा का क्रम महत्वपूर्ण होता है। पहली मान्य घोषणा को चुना जाएगा। यदि कई स्थितियां लागू होती हैं, तो सुनिश्चित करें कि वे सही क्रम में हैं ताकि अप्रत्याशित व्यवहार से बचा जा सके।

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो यदि कोई कुंजी मेल नहीं खाती है, तो फ़ंक्शन `undefined` लौटाएगा।

## React Intlayer के साथ एनेमरेशन का उपयोग करना

<Tabs group="framework">
  <Tab label="React" value="react">

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use enumeration in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use enumeration in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use enumeration in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use enumeration in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use enumeration in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use enumeration in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use enumeration with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न फ्रेमवर्क के साथ Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।

### Using Ordinal Enumeration

<Tabs group="framework">
  <Tab label="React" value="react">

To use this in a React component, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use this in Next.js Client Components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use this in Vue components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use this in Svelte components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use this in Preact components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use this in SolidJS components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use this in Angular components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use this with `vanilla-intlayer`, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
