---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: शब्दकोश नेस्टिंग
description: Intlayer में सामग्री नेस्टिंग का उपयोग करके अपने बहुभाषी सामग्री को कुशलतापूर्वक पुनः उपयोग और संरचित करने का तरीका जानें। इस दस्तावेज़ का पालन करें और नेस्टिंग को अपने प्रोजेक्ट में सहजता से लागू करें।
keywords:
  - Nesting
  - सामग्री पुन: उपयोग
  - प्रलेखन
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
author: aymericzip
---

# नेस्टिंग / उप सामग्री संदर्भ

## नेस्टिंग कैसे काम करता है

Intlayer में, नेस्टिंग `nest` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो आपको किसी अन्य शब्दकोश से सामग्री को संदर्भित करने और पुन: उपयोग करने की अनुमति देता है। सामग्री को डुप्लिकेट करने के बजाय, आप मौजूदा सामग्री मॉड्यूल को उसकी कुंजी द्वारा इंगित कर सकते हैं।

## नेस्टिंग सेट करना

<Tabs group="framework">
  <Tab label="React" value="react">

To use nested content in a React component, leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified key. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use nested content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use nested content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use nested content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use nested content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use nested content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use nested content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use nested content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## React Intlayer के साथ नेस्टिंग का उपयोग करना

React कंपोनेंट में नेस्टेड सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक का उपयोग करें। यह हुक निर्दिष्ट कुंजी के आधार पर सही सामग्री प्राप्त करता है। इसका उपयोग करने का एक उदाहरण यहां दिया गया है:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* आउटपुट: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* आउटपुट: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न फ्रेमवर्क्स के साथ Intlayer की सेटअप और उपयोग के बारे में और अधिक जानकारी प्रदान करते हैं।
