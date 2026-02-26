---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: intlayerMiddleware दस्तावेज़ीकरण | next-intlayer
description: next-intlayer पैकेज के लिए intlayerMiddleware फ़ंक्शन का उपयोग करने का तरीका देखें
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: intlayerMiddleware का नाम बदलकर intlayerProxy किया गया
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayerProxy (intlayerMiddleware) दस्तावेज़ीकरण

`intlayerProxy` फ़ंक्शन (`nextjs < 16` के लिए `intlayerMiddleware`) एक Next.js middleware है जो locale-आधारित रूटिंग और रीडायरेक्ट्स को संभालता है। यह स्वचालित रूप रूप से उपयोगकर्ता की पसंदीदा locale का पता लगाता है और आवश्यक होने पर उन्हें उपयुक्त स्थानीयकृत पथ पर रीडायरेक्ट कर देता है।

## उपयोग

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## विवरण

यह middleware निम्नलिखित कार्य करता है:

1. **लॉकेल का पता लगाना**: यह URL path, cookies, और `Accept-Language` हेडर की जाँच करता है ताकि उपयोगकर्ता की लोकेल निर्धारित की जा सके।
2. **रीडायरेक्शन**: यदि URL में लोकेल प्रीफिक्स नहीं है और कॉन्फ़िगरेशन इसके लिए आवश्यक है (या उपयोगकर्ता की प्राथमिकताओं के आधार पर), तो यह स्थानीयकृत URL पर रीडायरेक्ट करता है।
3. **कुकी प्रबंधन**: यह भविष्य के अनुरोधों के लिए पाए गए लोकेल को cookie में सहेज सकता है।

## पैरामीटर

यह फ़ंक्शन सीधे उपयोग किए जाने पर मानक Next.js `NextRequest` को पैरामीटर के रूप में लेता है, या इसे ऊपर दिखाए अनुसार export किया जा सकता है।

## कॉन्फ़िगरेशन

मिडलवेयर को कॉन्फ़िगर करने के लिए, आप `intlayer.config.ts` फ़ाइल में `routing` विकल्प सेट कर सकते हैं। अधिक विवरण के लिए [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।
