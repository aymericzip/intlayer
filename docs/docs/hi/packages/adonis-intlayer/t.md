---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t फ़ंक्शन दस्तावेज़ीकरण | adonis-intlayer
description: adonis-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग करने का तरीका देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: प्रारंभिक दस्तावेज़ीकरण
---

# दस्तावेज़ीकरण: `adonis-intlayer` में `t` फ़ंक्शन

`adonis-intlayer` पैकेज में `t` फ़ंक्शन आपके AdonisJS एप्लिकेशन में स्थानीयकृत प्रतिक्रियाएँ प्रदान करने के लिए मुख्य उपयोगिता है। यह उपयोगकर्ता की पसंदीदा भाषा के आधार पर गतिशील रूप से सामग्री का चयन करके अंतर्राष्ट्रीयकरण (i18n) को सरल बनाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग भाषाओं के दिए गए सेट के लिए अनुवादों को परिभाषित करने और प्राप्त करने के लिए किया जाता है। यह क्लाइंट की अनुरोध सेटिंग्स, जैसे कि `Accept-Language` हेडर, के आधार पर वापस करने के लिए उपयुक्त भाषा को स्वचालित रूप से निर्धारित करता है। यदि पसंदीदा भाषा अनुपलब्ध है, तो यह आपके कॉन्फ़िगरेशन में निर्दिष्ट डिफ़ॉल्ट लोकेल पर वापस आ जाता है।

---

## मुख्य विशेषताएँ

- **गतिशील स्थानीयकरण**: क्लाइंट के लिए स्वचालित रूप से सबसे उपयुक्त अनुवाद का चयन करता है।
- **डिफ़ॉल्ट लोकेल पर फॉलबैक**: यदि क्लाइंट की पसंदीदा भाषा उपलब्ध नहीं है, तो डिफ़ॉल्ट लोकेल पर वापस आ जाता है, जिससे उपयोगकर्ता अनुभव में निरंतरता बनी रहती है।
- **अतुल्यकालिक संदर्भ**: Async Local Storage का उपयोग करके AdonisJS अनुरोध जीवनचक्र के भीतर निर्बाध रूप से काम करता है।
- **TypeScript समर्थन**: आपके अनुवादों के लिए प्रकार सुरक्षा लागू करता है।

---

## फ़ंक्शन सिग्नेचर

```typescript
t(translations: Record<string, any>): any;
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जहाँ कुंजियाँ लोकेल कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित सामग्री हैं।

### रिटर्न

- क्लाइंट की पसंदीदा भाषा का प्रतिनिधित्व करने वाली सामग्री।

---

## मिडलवेयर लोड करना

यह सुनिश्चित करने के लिए कि `t` फ़ंक्शन सही ढंग से काम करता है, आपको अपने AdonisJS एप्लिकेशन में `intlayer` मिडलवेयर पंजीकृत करना **होगा**।

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## उपयोग के उदाहरण

### बुनियादी उदाहरण

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### कंट्रोलर्स में उपयोग

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## उन्नत विषय

### फॉलबैक मैकेनिज्म

यदि पसंदीदा लोकेल अनुपलब्ध है, तो `t` फ़ंक्शन आपके `intlayer.config.ts` में परिभाषित डिफ़ॉल्ट लोकेल पर वापस आ जाएगा।

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript एकीकरण

`t` फ़ंक्शन परिभाषित शब्दकोशों के साथ उपयोग किए जाने पर प्रकार-सुरक्षित है। अधिक विवरण के लिए, [TypeScript दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।
