---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "क्या नोड प्रकारों को संयोजित किया जा सकता है? (उदा. एक वाक्य में कई बहुवचन)"
description: "Intlayer में insert() या नेस्टेड plural() का उपयोग करके नोड प्रकारों को कैसे संयोजित करें और एक वाक्य में कई स्वतंत्र बहुवचन चरों को कैसे व्यक्त करें।"
keywords:
  - plural
  - nested plural
  - multiple plurals
  - composition
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# क्या नोड प्रकारों को संयोजित किया जा सकता है? (उदा. एक वाक्य में कई बहुवचन)

**हाँ**, Intlayer में नोड प्रकारों को संयोजित (compose) किया जा सकता है। उदाहरण के लिए, आप एक `plural()` को दूसरे `plural()` के अंदर नेस्ट कर सकते हैं, या `plural()` को `insert()` के साथ संयोजित कर सकते हैं।

जब आपको **एक ही वाक्य में दो स्वतंत्र बहुवचन चर व्यक्त करने** की आवश्यकता होती है (उदाहरण के लिए: _"2 फ़ोल्डरों में 1 फ़ाइल"_ बनाम _"1 फ़ोल्डर में 3 फ़ाइलें"_), तो इसके दो मुख्य तरीके हैं:

1. **अलग-अलग `plural()` कुंजियों के साथ `insert()` का उपयोग करना (अनुशंसित)**: साफ, रखरखाव में आसान और विभिन्न भाषाओं में शब्दों का सही क्रम बनाए रखता है।
2. **`plural()` के अंदर `plural()` को नेस्ट करना (प्रत्यक्ष संयोजन)**: यह वैध सिंटैक्स है, लेकिन जटिल बहुवचन नियमों वाली भाषाओं के लिए शाखाओं का अत्यधिक विस्तार (combinatorial explosion) हो सकता है।

## `insert()` को `plural()` के साथ संयोजित करना

सबसे लचीला और मुहावरेदार पैटर्न यह है कि प्रत्येक बहुवचन शब्द के लिए अलग-अलग `plural` कुंजियाँ घोषित की जाएँ और उन्हें एक `insert()` टेम्पलेट के साथ संयोजित किया जाए।

### 1. सामग्री घोषित करें

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // सम्मिलन टेम्पलेट परिभाषित करता है कि प्रत्येक भाषा में तत्वों को कैसे व्यवस्थित किया जाता है
    summary: t({
      hi: insert("{{folders}} में {{files}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      hi: plural({
        one: "{{count}} फ़ाइल",
        other: "{{count}} फ़ाइलें",
      }),
      en: plural({
        one: "{{count}} file",
        other: "{{count}} files",
      }),
      fr: plural({
        one: "{{count}} fichier",
        other: "{{count}} fichiers",
      }),
      ja: plural({
        other: "{{count}} 個のファイル",
      }),
    }),
    folders: t({
      hi: plural({
        one: "{{count}} फ़ोल्डर",
        other: "{{count}} फ़ोल्डर्स",
      }),
      en: plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
      }),
      fr: plural({
        one: "{{count}} dossier",
        other: "{{count}} dossiers",
      }),
      ja: plural({
        other: "{{count}} 個のフォルダー",
      }),
    }),
  },
} satisfies Dictionary;

export default fileSummaryContent;
```

```json fileName="src/fileSummary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "file_summary",
  "content": {
    "summary": {
      "nodeType": "translation",
      "translation": {
        "hi": {
          "nodeType": "insertion",
          "insertion": "{{folders}} में {{files}}"
        },
        "en": {
          "nodeType": "insertion",
          "insertion": "{{files}} in {{folders}}"
        }
      }
    },
    "files": {
      "nodeType": "translation",
      "translation": {
        "hi": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} फ़ाइल",
            "other": "{{count}} फ़ाइलें"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} files"
          }
        }
      }
    },
    "folders": {
      "nodeType": "translation",
      "translation": {
        "hi": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} फ़ोल्डर",
            "other": "{{count}} फ़ोल्डर्स"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "other": "{{count}} folders"
          }
        }
      }
    }
  }
}
```

### 2. अपने घटक में उपभोग करें

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/components/FileSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const FileSummary: FC<{ fileCount: number; folderCount: number }> = ({
  fileCount,
  folderCount,
}) => {
  const { summary, files, folders } = useIntlayer("file_summary");

  return (
    <p>
      {summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })}
    </p>
  );
};
```

  </Tab>
  <Tab label="Vue" value="vue">

```vue fileName="src/components/FileSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{
  fileCount: number;
  folderCount: number;
}>();

const { summary, files, folders } = useIntlayer("file_summary");
</script>

<template>
  <p>
    {{
      summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })
    }}
  </p>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

```svelte fileName="src/components/FileSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  export let fileCount: number;
  export let folderCount: number;

  const content = useIntlayer("file_summary");
</script>

<p>
  {$content.summary({
    files: $content.files(fileCount),
    folders: $content.folders(folderCount),
  })}
</p>
```

  </Tab>
</Tabs>

### यह अनुशंसित दृष्टिकोण क्यों है

- **वाक्य संरचना और शब्द क्रम**: अलग-अलग भाषाएं विशेषणों, संख्याओं और संज्ञाओं को अलग-अलग क्रम में रखती हैं (उदाहरण के लिए जापानी या हिंदी में फ़ाइलों और फ़ोल्डरों का क्रम बदल सकता है)। `insert()` टेम्पलेट अनुवादकों को बहुवचन नियमों को प्रभावित किए बिना शब्द क्रम पर पूर्ण नियंत्रण देता है।
- **संयोजन विस्फोट को रोकता है**: यदि भाषा A में 2 बहुवचन रूप हैं (अंग्रेजी: `one`, `other`) और भाषा B में 4 रूप हैं (रूसी: `one`, `few`, `many`, `other`), तो बहुवचनों को नेस्ट करने पर रूसी के लिए $4 \times 4 = 16$ शाखाओं की आवश्यकता होगी। अलग-अलग कुंजियों के साथ, आप केवल $4 + 4 = 8$ शाखाएं घोषित करते हैं।
- **पुन: प्रयोज्यता**: आप अपने UI के अन्य भागों में `files` या `folders` बहुवचन परिभाषाओं का पुन: उपयोग कर सकते हैं।
