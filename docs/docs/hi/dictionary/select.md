---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: चयन-आधारित सामग्री (Select-based Content)
description: किसी मनमाने स्ट्रिंग मान के आधार पर गतिशील रूप से सामग्री प्रदर्शित करने के लिए Intlayer में चयन-आधारित सामग्री का उपयोग करना सीखें। अपने प्रोजेक्ट में स्विच-जैसी सामग्री को कुशलतापूर्वक लागू करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - चयन-आधारित सामग्री
  - Select Content
  - स्विच सामग्री
  - ICU select
  - गतिशील प्रतिपादन (Dynamic rendering)
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "चयन-आधारित सामग्री प्रस्तुत की गई"
author: aymericzip
---

# चयन-आधारित सामग्री (Select) / Intlayer

## Select कैसे काम करता है

Intlayer में, चयन-आधारित सामग्री को `select` फ़ंक्शन के माध्यम से प्राप्त किया जाता है, जो मनमाने स्ट्रिंग मानों को उनके संबंधित सामग्री में मैप करता है। यह ICU संदेश `{value, select, …}` के बराबर है, या आपके एप्लिकेशन कोड में `switch` कथन के समान है।

`select` का उपयोग तब करें जब विवेचक (discriminant) एक मुक्त-स्वरूप स्ट्रिंग हो: एक स्थिति (status), एक योजना (plan), एक प्लेटफ़ॉर्म (platform), एक भूमिका (role)। अन्य विवेचकों के लिए, Intlayer समर्पित नोड्स प्रदान करता है:

| विवेचक (Discriminant) | नोड        |
| --------------------- | ---------- |
| मात्रा (Quantity)     | `enu()`    |
| बूलियन (Boolean)      | `cond()`   |
| लिंग (Gender)         | `gender()` |
| कोई अन्य स्ट्रिंग     | `select()` |

## चयन-आधारित सामग्री सेट अप करना

अपने Intlayer प्रोजेक्ट में चयन-आधारित सामग्री सेट अप करने के लिए, एक सामग्री मॉड्यूल (content module) बनाएं जिसमें आपकी चयन परिभाषाएं शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // वैकल्पिक (Optional)
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // वैकल्पिक (Optional)
      },
    },
  },
}
```

> यदि कोई `fallback` घोषित नहीं किया गया है, तो प्रदान किया गया मान किसी भी घोषित स्थिति से मेल न खाने पर अंतिम घोषित कुंजी (key) को फ़ॉलबैक के रूप में माना जाता है: ठीक `cond()` और `gender()` अनुबंध (contract) की तरह।

### टाइप सुरक्षा (Type Safety)

स्वीकृत तर्क (argument) घोषित स्थितियों (cases) से अनुमानित होते हैं:

- `fallback` के बिना, केवल घोषित स्थितियों को ही स्वीकार किया जाता है: टाइपो टाइप त्रुटि (type error) उत्पन्न करेगा।
- `fallback` के साथ, किसी भी स्ट्रिंग को स्वीकार किया जाता है (क्योंकि फ़ॉलबैक बेमेल मानों को कवर करता है) जबकि घोषित स्थितियां अभी भी स्वतः पूर्णता (autocompletion) प्रदान करती हैं।

## साधारण ऑब्जेक्ट (Plain Object) का उपयोग क्यों न करें?

साधारण ऑब्जेक्ट को घोषित करना और रनटाइम मान का उपयोग करके उसमें अनुक्रमण (indexing) करना आकर्षक हो सकता है:

```tsx
// ❌ ऐसा न करें
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Intlayer कंपाइलर (compiler) आपके स्रोत कोड (source code) का विश्लेषण करता है ताकि अप्रयुक्त सामग्री को छोड़ दिया जा सके और शेष कुंजियों (keys) को छोटा (minify) किया जा सके। गतिशील गणना की गई पहुंच (dynamic computed access) (`obj[expr]`) को स्थिर (statically) रूप से हल नहीं किया जा सकता है, इसलिए पूरे शाखा को अपारदर्शी (opaque) के रूप में चिह्नित किया जाएगा: यह बंडल में संरक्षित रहेगा और इसकी कुंजियों को छोटा नहीं किया जाएगा।

`select()` का उपयोग करके, स्थिति समाधान (case resolution) प्रॉपर्टी एक्सेस के बजाय एक फ़ंक्शन कॉल के अंदर होता है। कंपाइलर इसे एकल स्थिर फ़ील्ड पहुंच के रूप में देखता है, और नोड को बिल्कुल वैसे ही अनुकूलित (optimize) करता है जैसे वह `enu()`, `cond()`, या `gender()` के साथ करता है:

```tsx
// ✅ ऐसा करें
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## चयन-आधारित सामग्री का उपयोग करना

<Tabs group="framework">
  <Tab label="React" value="react">

React घटक के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक आयात करें और उपयोग करें। यह हुक निर्दिष्ट कुंजी के लिए सामग्री प्राप्त करता है और आपको उचित आउटपुट का चयन करने के लिए मान पारित करने की अनुमति देता है।

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* आउटपुट: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* आउटपुट: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Next.js क्लाइंट घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Vue घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। स्टोर को `$` का उपयोग करके एक्सेस किया जाता है। यहाँ एक उदाहरण है:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJS घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular घटकों के भीतर चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` के साथ चयन-आधारित सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें। यहाँ एक उदाहरण है:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// प्रारंभिक प्रतिपादन
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## अन्य नोड्स के साथ Select का संयोजन

चूंकि प्रत्येक स्थिति (case) में एक पूर्ण सामग्री नोड (content node) होता है, इसलिए `select` को `t()`, `insert()`, `md()` आदि के साथ संयोजित किया जा सकता है:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          hi: "{{name}} ने एक मसौदा सहेजा",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          hi: "{{name}} ने पोस्ट प्रकाशित की",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          hi: "{{name}} ने पोस्ट अपडेट की",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // आउटपुट: Alice ने एक मसौदा सहेजा
```

## ICU `select` से प्रवासन (Migration)

वे संदेश जो ICU `select` तर्क का उपयोग करते हैं, उन्हें `select` नोड के रूप में आयात किया जाता है:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

यह बन जाएगा:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

ICU की `other` स्थिति को `fallback` के रूप में नाम दिया गया है, जो कि Intlayer में सभी कैच-ऑल (catch-all) स्थितियों के लिए विहित (canonical) नाम है। दूसरा तर्क ICU चर नाम को रिकॉर्ड करता है, ताकि निर्यात (export) के समय संदेश बिल्कुल उसी ICU स्ट्रिंग में वापस आ सके।

> ध्यान दें, ICU `select` जिसमें स्थितियां लिंग मान (`male` / `female` / `other`) हैं, उन्हें इसके बजाय [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md) नोड के रूप में आयात किया जाता है।

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन (configuration) और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [Intlayer React दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Intlayer Next.js दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न परिवेशों और रूपरेखाओं (frameworks) के भीतर Intlayer को सेट अप और उपयोग करने में और अधिक जानकारी प्रदान करते हैं।
