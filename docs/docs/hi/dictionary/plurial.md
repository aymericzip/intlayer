---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: बहुवचन (Plural)
description: जानें कि अपनी बहुभाषी वेबसाइट में लोकेल-जागरूक बहुवचन सामग्री (CLDR-आधारित) को कैसे घोषित और उपयोग करें। अपने प्रोजेक्ट को कुछ ही मिनटों में सेट करने के लिए इस ऑनलाइन दस्तावेज़ के चरणों का पालन करें।
keywords:
  - बहुवचन
  - बहुवचन रूप
  - CLDR
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# बहुवचन सामग्री / Intlayer में बहुवचन

## बहुवचन कैसे काम करता है

Intlayer में, बहुवचन सामग्री `plural` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो CLDR बहुवचन श्रेणियों, `zero`, `one`, `two`, `few`, `many`, `other`, को उनकी संबंधित सामग्री से मैप करती है। प्लेटफ़ॉर्म के अंतर्निहित [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API का उपयोग करके सक्रिय लोकेल और एक गिनती (count) मान के आधार पर सही श्रेणी स्वचालित रूप से चुनी जाती है।

[`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md) के विपरीत, जो आपके द्वारा स्वयं परिभाषित संख्यात्मक श्रेणियों के आधार पर सामग्री चुनता है, `plural` चयन को CLDR नियमों को सौंपता है। यही कारण है कि यह जटिल बहुवचन नियमों वाली भाषाओं, जैसे रूसी, पोलिश, अरबी, या वेल्श, के लिए स्केलेबल बनाता है, बिना हस्तलिखित मोडुलो (modulo) तर्क के।

## `plural` बनाम `enu` का कब उपयोग करें

| उपयोग मामला                                                 | हेल्पर   |
| ----------------------------------------------------------- | -------- |
| लोकेल-जागरूक व्याकरणिक बहुवचन रूप (एक सेब / दो सेब / 5 सेब) | `plural` |
| कस्टम संख्यात्मक श्रेणियां (`<5`, `>=10`) या गैर-CLDR बकेट  | `enu`    |

यदि आप केवल अंग्रेजी या हिंदी को लक्षित करते हैं (जिसमें केवल `one` / `other` होता है), तो दोनों काम करते हैं। `few` / `many` / `two` भेदों वाली किसी भी भाषा के लिए, `plural` को प्राथमिकता दें।

## बहुवचन सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में बहुवचन सामग्री सेट करने के लिए, एक सामग्री मॉड्यूल बनाएं जो `plural` हेल्पर का उपयोग करता है। `other` श्रेणी आवश्यक है और इसका उपयोग फ़ालबैक (fallback) के रूप में किया जाता है जब कोई लोकेल अधिक विशिष्ट श्रेणी परिभाषित नहीं करता है।

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      hi: plural({
        one: "{{count}} अवसर",
        other: "{{count}} अवसर",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "hi": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} अवसर",
            "other": "{{count}} अवसर"
          }
        }
      }
    }
  }
}
```

> समर्थित श्रेणियां `zero`, `one`, `two`, `few`, `many`, `other` हैं। आपको केवल उन श्रेणियों को घोषित करने की आवश्यकता है जो आपकी लक्षित भाषा उपयोग करती है, Intlayer `other` पर वापस आ जाता है जब कोई विशिष्ट श्रेणी मेल नहीं खाती है।
>
> `{{count}}` प्लेसहोल्डर स्वचालित रूप से उस गिनती से बदल दिया जाता है जिसे आप रनटाइम पर पास करते हैं। आप अन्य प्लेसहोल्डर भी शामिल कर सकते हैं (नीचे [कस्टम प्लेसहोल्डर्स](#custom-placeholders) देखें)।

## React Intlayer के साथ बहुवचन सामग्री का उपयोग करना

React घटक के अंदर बहुवचन सामग्री का उपयोग करने के लिए, इसे `useIntlayer` हुक के माध्यम से प्राप्त करें और इसे गिनती (count) के साथ कॉल करें। सक्रिय लोकेल और गिनती को मिलान वाली CLDR श्रेणी चुनने के लिए संयोजित किया जाता है।

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* अंग्रेजी में:                                   */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

आप लौटाए गए फ़ंक्शन को दो समान तरीकों से कॉल कर सकते हैं:

```tsx
totalOpenings(21); // संक्षिप्त: केवल गिनती
totalOpenings({ count: 21 }); // स्पष्ट रूप
```

## कस्टम प्लेसहोल्डर्स

बहुवचन स्ट्रिंग्स में `{{count}}` के अलावा अन्य प्लेसहोल्डर्स शामिल हो सकते हैं। उन्हें `count` के साथ ऑब्जेक्ट रूप में पास करें:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, आपके पास {{count}} नया संदेश है",
      other: "{{name}}, आपके पास {{count}} नए संदेश हैं",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, आपके पास 1 नया संदेश है"

summary({ count: 7, name: "Alice" });
// → "Alice, आपके पास 7 नए संदेश हैं"
```

## CLDR श्रेणियों पर एक नज़र

विभिन्न भाषाएं CLDR श्रेणियों के विभिन्न उपसमुच्चयों का उपयोग करती हैं। कुछ सामान्य मामले:

| भाषा            | प्रयुक्त श्रेणियां                           |
| --------------- | -------------------------------------------- |
| अंग्रेजी (`en`) | `one`, `other`                               |
| फ्रेंच (`fr`)   | `one`, `many`, `other`                       |
| रूसी (`ru`)     | `one`, `few`, `many`, `other`                |
| पोलिश (`pl`)    | `one`, `few`, `many`, `other`                |
| अरबी (`ar`)     | `zero`, `one`, `two`, `few`, `many`, `other` |
| जापानी / चीनी   | केवल `other`                                 |

आपको इसे याद रखने की आवश्यकता नहीं है, उन श्रेणियों को घोषित करें जिनके लिए आपके पास अनुवाद हैं, और आवश्यकता पड़ने पर Intlayer `other` पर वापस आ जाएगा।

## सीमा

अन्य नोड्स की तुलना में, `plural` को अभी तक बाल नोड्स के साथ नेस्ट (imbricate) नहीं किया जा सकता है।

उदाहरण:

वैध:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

अवैध:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Enumeration दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md)
- [Insertion दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)
- [Intlayer CLI दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [React Intlayer दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और रूपरेखाओं में Intlayer के सेटअप और उपयोग में और अंतर्दृष्टि प्रदान करते।
