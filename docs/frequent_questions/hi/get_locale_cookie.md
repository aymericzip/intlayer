---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: कुकीज़ / हेडर से लोकल कैसे प्राप्त करें?
description: कुकीज़ / हेडर से लोकल कैसे प्राप्त करें, जानें।
keywords:
  - कुकी
  - हेडर
  - intlayer
  - लोकल
  - हुक
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# कुकीज़ / हेडर से लोकल कैसे प्राप्त करें

## हुक्स का उपयोग करना (अनुशंसित)

अधिकांश उपयोग मामलों के लिए, वर्तमान लोकल को `useLocale` हुक का उपयोग करके प्राप्त करना अनुशंसित है क्योंकि यह स्वचालित रूप से हल हो जाता है। यह Vue.js में `useLocale` कंपोज़ेबल की तरह काम करता है।

```ts
import { useLocale } from "next-intlayer";
// या import { useLocale } from "react-intlayer";
// या import { useLocale } from "vue-intlayer";

ts;
// क्लाइंट-साइड उपयोग
const { locale } = useLocale();
```

सर्वर कंपोनेंट्स के लिए, आप इसे इस प्रकार इम्पोर्ट कर सकते हैं:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

एक `useLocaleCookie` हुक भी है जो केवल कुकी मान को हल करता है।

## मैनुअल कुकी कॉन्फ़िगरेशन

आप कस्टम कुकी नाम इस प्रकार घोषित कर सकते हैं

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // डिफ़ॉल्ट 'intlayer-locale' है
  },
};

export default config;
```

इसे इस प्रकार पुनः प्राप्त करें

### क्लाइंट-साइड

```ts
// डिफ़ॉल्ट कुकी नाम का उपयोग करते हुए
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// कस्टम कुकी नाम का उपयोग करते हुए
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### सर्वर-साइड (Next.js)

```ts
import { cookies } from "next/headers";

// डिफ़ॉल्ट कुकी नाम का उपयोग करते हुए
const locale = cookies().get("intlayer-locale")?.value;

// कस्टम कुकी नाम का उपयोग करते हुए
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### यदि locale अभी तक सेट नहीं है

locale केवल तभी कुकी के रूप में सेट होता है जब उपयोगकर्ता स्पष्ट रूप से locale का चयन करता है। डिफ़ॉल्ट रूप से, नए आगंतुकों के लिए, locale हेडर फ़ील्ड से व्याख्यायित किया जाता है।

आप अनुरोध हेडर से उपयोगकर्ता की पसंदीदा locale का पता लगा सकते हैं। यहाँ इसका प्रबंधन करने का एक उदाहरण है:

```ts
/**
 * अनुरोध हेडर से locale का पता लगाता है
 *
 * accept-language हेडर locale पहचान के लिए सबसे महत्वपूर्ण है।
 * इसमें भाषा कोड की एक सूची होती है जिनके साथ गुणवत्ता मान (q-मूल्य) होते हैं जो
 * उपयोगकर्ता की पसंदीदा भाषाओं को प्राथमिकता के क्रम में दर्शाते हैं।
 *
 * उदाहरण: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US प्राथमिक भाषा है (q=1.0 निहित है)
 * - en दूसरी पसंद है (q=0.9)
 * - fr तीसरी पसंद है (q=0.8)
 * - es चौथी पसंद है (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * वे उदाहरण नेगोशिएटर हेडर जो ब्राउज़र आमतौर पर भेजते हैं
 * ये हेडर उपयोगकर्ता की पसंदीदा भाषा निर्धारित करने में मदद करते हैं
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// उपयोग का उदाहरण:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
