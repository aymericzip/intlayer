---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Paraglide JS के साथ TanStack Start i18n: 2026 सेटअप गाइड"
description: "Paraglide JS के साथ अपने TanStack Start ऐप का अनुवाद करें: URL रणनीति, router rewrite, SSR middleware, hreflang, sitemap और robots.txt, साथ ही वास्तविक बेंचमार्क डेटा।"
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - अंतर्राष्ट्रीयकरण
  - i18n
  - SEO
  - React
  - ब्लॉग
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "प्रारंभिक संस्करण"
author: aymericzip
---

# 2026 में Paraglide JS का उपयोग करके अपने TanStack Start एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें

## विषय सूची

<TOC/>

## Paraglide JS क्या है?

**Paraglide JS** (inlang द्वारा) एक **कंपाइलर-आधारित (compiler-based)** i18n लाइब्रेरी है। किसी JSON ऑब्जेक्ट में कीज़ (keys) खोजने वाले रनटाइम को भेजने के बजाय, यह प्रत्येक संदेश को एक टाइप्ड जावास्क्रिप्ट फ़ंक्शन (`m.about_title()`) में संकलित (compile) करता है। अप्रयुक्त संदेशों को बंडलर द्वारा हटाया जा सकता है, और किसी की (key) में टाइपो होना एक कंपाइल त्रुटि (compile error) बन जाता है।

Paraglide आधिकारिक TanStack Router उदाहरणों में उपयोग किया जाने वाला i18n दृष्टिकोण है, और यह तीन भागों के माध्यम से TanStack Start के साथ एकीकृत होता है:

- एक **Vite प्लगइन** जो संदेशों और रनटाइम को `src/paraglide` में संकलित करता है;
- एक **सर्वर मिडलवेयर** जो प्रत्येक अनुरोध के लोकेल को हल (resolve) करता है;
- एक **राउटर रीराइट (router rewrite)** जो स्थानीयकृत URL (`/fr/about`) को आपके रूट ट्री (`/about`) में मैप करता है, इसलिए आपको `$locale` सेगमेंट की आवश्यकता नहीं होती है।

यह गाइड इन तीनों को सेट अप करती है, फिर उन सभी चीज़ों को कवर करती है जो Paraglide आप पर छोड़ता है: `lang` और `dir`, लोकेल स्विचर, अनुवादित मेटाडेटा, `canonical`, `x-default` के साथ `hreflang`, Open Graph, JSON-LD, साइटमैप, `robots.txt`, प्री-रेंडरिंग और स्थानीयकृत 404 पेज।

> क्या आप किसी अन्य स्टैक की तलाश में हैं? [TanStack Start + use-intl गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_use-intl.md), [TanStack Start + Lingui गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_lingui.md), या [TanStack Start + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md) देखें।

> दो कंपाइलर-आधारित दृष्टिकोणों की तुलना कर रहे हैं? [क्या Intlayer, Paraglide से हल्का है?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_intlayer_lighter_than_paraglide.md) पढ़ें।

## TanStack Start पर Paraglide के बारे में बेंचमार्क क्या कहता है

[i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) हर प्रमुख लाइब्रेरी के साथ समान 10-पेज, 10-लोकेल TanStack Start ऐप चलाता है और मापता है कि ब्राउज़र वास्तव में क्या डाउनलोड करता है।

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

`@inlang/paraglide-js@2.15.1` के लिए मुख्य आंकड़े, 2026-09-26 को मापे गए (gzip):

| सेटअप                  | लाइब्रेरी का आकार | प्रति पेज JS | अन्य लोकेल लीक | अन्य पेज लीक | पेज लोड |
| :--------------------- | ----------------: | -----------: | -------------: | -----------: | ------: |
| कोई i18n नहीं (बेस ऐप) |                 - |     111.0 KB |             0% |           0% | 15.7 ms |
| Paraglide JS           |            1.8 KB |     125.1 KB |          49.7% |           0% | 22.1 ms |
| `react-intlayer`       |            4.5 KB |     126.8 KB |             0% |           0% | 14.8 ms |
| `use-intl`             |           75.9 KB |     128.7 KB |             0% |           0% | 17.4 ms |
| Lingui                 |           56.7 KB |     120.2 KB |           8.6% |           0% | 21.9 ms |

मुख्य निष्कर्ष:

- **रनटाइम बहुत छोटा है, और पेज लीक नहीं होते हैं।** रनटाइम आपके कॉन्फ़िगरेशन के लिए जेनरेट किया जाता है, और संदेशों को वहीं आयात किया जाता है जहाँ उनका उपयोग होता है।
- **लोकेल्स लीक होते हैं।** प्रत्येक संदेश फ़ंक्शन में सभी लोकेल्स होते हैं, इसलिए किसी पेज पर भेजे जाने वाले अनुवादित स्ट्रिंग्स का लगभग आधा हिस्सा उन भाषाओं में होता है जिनका उपयोग विज़िटर नहीं करता है। आप जितने अधिक लोकेल्स जोड़ेंगे, यह हिस्सा उतना ही बड़ा होता जाएगा।
- **पेज लोड समूह में सबसे धीमा है**, आंशिक रूप से इसलिए क्योंकि लोकेल को React कॉन्टेक्स्ट से पढ़ने के बजाय प्रत्येक कॉल पर रणनीतियों के माध्यम से हल किया जाता है।

> पूरा डेटा देखें: [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md), और [बेंचमार्क रिपॉजिटरी](https://github.com/intlayer-org/benchmark-i18n)।

## TanStack Start पर सुविधाओं की तुलना

TanStack Start पर आमतौर पर उपयोग की जाने वाली अन्य लाइब्रेरीज़ के साथ Paraglide JS की तुलना:

| सुविधा                                   | `react-intlayer` (Intlayer)             | `use-intl`                   | Paraglide JS                      | Lingui                          |
| ---------------------------------------- | --------------------------------------- | ---------------------------- | --------------------------------- | ------------------------------- |
| **कंपोनेंट्स के पास अनुवाद**             | ✅ Co-located                           | ❌ केंद्रीकृत JSON           | ❌ प्रति लोकेल एक JSON फ़ाइल      | ⚠️ कंपोनेंट्स में स्रोत टेक्स्ट |
| **TypeScript एकीकरण**                    | ✅ स्वतः जनरेट किए गए प्रकार            | ✅ `AppConfig` के माध्यम से  | ✅ टाइप्ड संदेश फ़ंक्शन           | ⚠️ केवल Macros                  |
| **अनुपलब्ध अनुवादों का पता लगाना**       | ✅ प्रकार त्रुटियाँ और बिल्ड चेतावनियाँ | ⚠️ रनटाइम फ़ॉलबैक            | ⚠️ बेस लोकेल पर फ़ॉलबैक           | ⚠️ स्रोत टेक्स्ट पर फ़ॉलबैक     |
| **रिच कंटेंट (JSX, Markdown)**           | ✅ सीधा समर्थन                          | ⚠️ `t.rich` के माध्यम से टैग | ⚠️ स्ट्रिंग्स                     | ✅ `<Trans>` के अंदर JSX        |
| **स्थानीयकृत रूटिंग**                    | ✅ अंतर्निहित (Built-in)                | ❌ मैन्युअल `{-$locale}`     | ✅ `urlPatterns` + router rewrite | ❌ मैन्युअल `{-$locale}`        |
| **रीलोड के बिना लोकेल स्विच**            | ✅ हाँ                                  | ✅ हाँ                       | ❌ पूर्ण पेज रीलोड                | ✅ हाँ                          |
| **बहुवचन (Pluralization)**               | ✅ गणना-आधारित                          | ✅ ICU                       | ✅ वैरिएंट्स (Variants)           | ✅ ICU                          |
| **ICU MessageFormat**                    | ✅ `format: "icu"` के माध्यम से         | ✅ नेटिव                     | ⚠️ inlang प्लगइन के माध्यम से     | ✅ नेटिव                        |
| **कंटेंट प्रारूप**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                   | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV                |
| **AI अनुवाद**                            | ✅ आपका अपना प्रदाता और API की          | ❌ नहीं                      | ❌ नहीं                           | ❌ नहीं                         |
| **विज़ुअल एडिटर / CMS**                  | ✅ स्थानीय संपादक + वैकल्पिक CMS        | ❌ बाहरी प्लेटफ़ॉर्म         | ⚠️ inlang इकोसिस्टम ऐप्स          | ❌ बाहरी प्लेटफ़ॉर्म            |
| **SEO सहायक (hreflang, sitemap)**        | ✅ अंतर्निहित                           | ❌ मैन्युअल                  | ⚠️ स्थानीयकृत URL, बाकी मैन्युअल  | ❌ मैन्युअल                     |
| **रनटाइम आकार (gzip, बेंचमार्क)**        | 4.5 KB                                  | 75.9 KB                      | 1.8 KB                            | 56.7 KB                         |
| **लीक, सर्वश्रेष्ठ सेटअप (लोकेल / पेज)** | 0% / 0%                                 | 0% / 0%                      | 49.7% / 0%                        | 8.6% / 0%                       |
| **CI में छूटे हुए अनुवाद**               | ✅ `npx intlayer test`                  | ⚠️ अंतर्निहित नहीं           | ⚠️ अंतर्निहित नहीं                | ✅ `lingui compile --strict`    |

> रनटाइम आकार और लीक के आंकड़े [TanStack Start बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) से लिए गए हैं। लीक को प्रत्येक लाइब्रेरी के सर्वोत्तम सेटअप पर मापा गया है।

> अन्य TanStack Start गाइड: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_lingui.md), [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_use-intl.md), और [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)।

## सर्वोत्तम प्रथाएं जिनका आपको पालन करना चाहिए

- **सर्वर पर हल किए गए लोकेल से `<html>` पर `lang` और `dir` सेट करें**।
- **एक प्रीफ़िक्स रणनीति (`/fr/about`) के साथ प्रति लोकेल एक URL रखें**, ताकि प्रत्येक भाषा संस्करण अनुक्रमित (indexable) हो सके।
- **अपनी लोकेल रणनीति में `url` को सबसे पहले रखें**, ताकि URL सत्य का स्रोत (source of truth) बना रहे, और क्रॉलर्स को वही पेज मिले जिसका उन्होंने अनुरोध किया था।
- **फ्लैट, वर्णनात्मक संदेश कुंजियों (keys)** (`about_title`) का उपयोग करें जो फ़ंक्शन नामों में आसानी से मैप होती हैं।
- **अपनी `messages/*.json` फ़ाइलों को कमिट करें, न कि जनरेट किए गए `src/paraglide` फ़ोल्डर को**, ताकि जनरेट की गई फ़ाइलों पर मर्ज विरोध (merge conflicts) से बचा जा सके।
- **अपने मेटाडेटा का अनुवाद करें**, और प्रत्येक पेज पर `canonical`, `hreflang` और `x-default` घोषित करें।
- **एक बहुभाषी साइटमैप और robots.txt जनरेट करें**, और प्रत्येक लोकेल को प्री-रेंडर करें।
- **लोकेल स्विचर के लिए वास्तविक लिंक्स का उपयोग करें**, ताकि क्रॉलर्स हर भाषा को खोज सकें।

> [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md) और [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) पर हमारी गाइड देखें।

## TanStack Start एप्लिकेशन में Paraglide JS सेट अप करने के लिए चरण-दर-चरण गाइड

यहाँ वह प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

ध्यान दें कि यहाँ कोई `$locale` फ़ोल्डर नहीं है: रूट मिलान (route matching) से पहले राउटर रीराइट प्रीफ़िक्स को हटा देता है।

<Steps>
<Step number={1} title="निर्भरताएँ स्थापित करें">

TanStack Start प्रोजेक्ट से शुरुआत करें, फिर Paraglide को इनिशियलाइज़ करें। init कमांड `project.inlang/settings.json`, एक पहली `messages/en.json` बनाता है और पैकेज इंस्टॉल करता है।

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: कंपाइलर और इसका Vite प्लगइन। इंस्टॉल करने के लिए कोई रनटाइम पैकेज नहीं है: रनटाइम आपके प्रोजेक्ट में ही जनरेट होता है।

</Step>
<Step number={2} title="अपने लोकेल्स कॉन्फ़िगर करें">

`project.inlang/settings.json` लोकेल्स के लिए सत्य का एकमात्र स्रोत है। संदेश प्रारूप प्लगइन प्रति लोकेल एक JSON फ़ाइल पढ़ता है।

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Vite प्लगइन और URL रणनीति कॉन्फ़िगर करें">

प्लगइन हर बदलाव पर संदेशों को संकलित करता है। TanStack Start के लिए तीन विकल्प महत्वपूर्ण हैं:

- **`strategy`**: लोकेल को पढ़ने के लिए स्थानों की क्रमित सूची। `url` पहले होने से URL सत्य का स्रोत बन जाता है। `cookie` और `preferredLanguage` का उपयोग मिडलवेयर द्वारा तब किया जाता है जब URL निर्णय नहीं लेता है।
- **`urlPatterns`**: एक लोकेल URL पर कैसे मैप होता है। गैर-डिफ़ॉल्ट लोकेल्स पहले सूचीबद्ध होते हैं, क्योंकि पहला मेल खाने वाला पैटर्न जीतता है। यहाँ डिफ़ॉल्ट लोकेल बिना प्रीफ़िक्स (`/about`) रहता है, और अन्य लोकेल्स प्रीफ़िक्स (`/fr/about`) के साथ होते हैं।
- **`outputStructure: "message-modules"`**: प्रति संदेश एक मॉड्यूल, जो बंडलर को उन संदेशों को हटाने की अनुमति देता है जिन्हें कोई पेज आयात नहीं करता है।

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

जनरेट किए गए फ़ोल्डर को `.gitignore` में जोड़ें। यह `dev` और `build` पर फिर से बनाया जाता है:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="अपनी अनुवाद फ़ाइलें बनाएं">

प्रत्येक की (key) `src/paraglide/messages` से निर्यात किया गया एक फ़ंक्शन बन जाती है। फ्लैट, snake_case कुंजियाँ सबसे साफ फ़ंक्शन नाम देती हैं। वेरिएबल्स `{name}` प्लेसहोल्डर्स का उपयोग करते हैं।

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

बहुवचन inlang संदेश प्रारूप के वैरिएंट्स (variants) सिंटैक्स का उपयोग करते हैं:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="सर्वर मिडलवेयर जोड़ें">

मिडलवेयर आपकी रणनीति के साथ प्रत्येक अनुरोध के लोकेल को हल करता है, और इसे एक `AsyncLocalStorage` स्कोप के माध्यम से पूरे सर्वर रेंडर के लिए `getLocale()` पर उपलब्ध कराता है। यही विभिन्न भाषाओं में समवर्ती (concurrent) अनुरोधों को सुरक्षित बनाता है।

TanStack Start में, डिफ़ॉल्ट सर्वर प्रविष्टि (server entry) को लपेटें:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="राउटर में स्थानीयकृत URL रीराइट करें">

TanStack Router का `rewrite` विकल्प राउटर की सीमा पर URL का अनुवाद करता है:

- **input**: रूट मिलान से पहले `/fr/about` को `/about` में डी-लोकलाइज़ किया जाता है, ताकि एक ही `about.tsx` रूट हर भाषा को सेवा दे सके;
- **output**: प्रत्येक जनरेट किया गया `href` (लिंक्स, रीडायरेक्ट्स, नेविगेशन) सक्रिय लोकेल के लिए स्थानीयकृत होता है, इसलिए `<Link to="/about">` एक फ़्रेंच पेज पर `/fr/about` रेंडर करता है।

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> क्योंकि लिंक रीराइट द्वारा स्थानीयकृत होते हैं, आपको कस्टम `LocalizedLink` कंपोनेंट की आवश्यकता नहीं होती है: हमेशा की तरह TanStack Router के `Link` का उपयोग करें।

</Step>
<Step number={7} title="रूट दस्तावेज़ बनाएं">

`getLocale()` सर्वर पर मिडलवेयर द्वारा हल किए गए लोकेल को और ब्राउज़र में URL से लोकेल को लौटाता है, इसलिए सर्वर HTML और हाइड्रेशन के बाद `lang` और `dir` समान होते हैं।

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="अपने पेजों में अनुवादों का उपयोग करें">

संदेश सामान्य फ़ंक्शन होते हैं: `m` आयात करें, फ़ंक्शन को कॉल करें, वेरिएबल्स को एक ऑब्जेक्ट के रूप में पास करें। वेरिएबल्स सहित सब कुछ पूरी तरह से टाइप्ड है।

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> एक संदेश फ़ंक्शन एक स्पष्ट लोकेल भी स्वीकार करता है: `m.about_title({}, { locale: "fr" })`। यह सर्वर कोड में उपयोगी होता है जो अनुरोध की भाषा के अलावा किसी अन्य भाषा को रेंडर करता है, जैसे कि ईमेल।

</Step>
<Step number={9} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

स्विचर को `localizeHref` के साथ **लिंक्स** के रूप में रेंडर करें, ताकि क्रॉलर्स हर भाषा को खोज सकें। `setLocale` पसंद को कुकी में संग्रहीत करता है और नई भाषा में पेज को पुनः लोड करता है: एक पूर्ण रीलोड अपेक्षित Paraglide व्यवहार है, क्योंकि संदेश फ़ंक्शन React स्थिति की सदस्यता लेने के बजाय प्रत्येक कॉल पर लोकेल पढ़ते हैं।

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

प्रत्येक भाषा संस्करण अपने दम पर रैंक कर सकता है, बशर्ते प्रत्येक पेज निम्नलिखित को प्रदर्शित करे:

- एक **अनुवादित** `<title>` और `description`;
- स्वयं की ओर इशारा करने वाला एक **canonical** URL;
- प्रति लोकेल एक **`hreflang` alternate**, साथ ही **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` और `og:url`;
- `inLanguage` के साथ **JSON-LD**।

Paraglide का `localizeUrl` आपके `urlPatterns` से वैकल्पिक URL बनाता है, इसलिए वे वास्तविक रूटिंग से कभी भटक नहीं सकते:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="अपने साइटमैप का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

एक बहुभाषी साइटमैप प्रत्येक लोकेल के प्रत्येक URL को सूचीबद्ध करता है, और प्रत्येक प्रविष्टि `xhtml:link` के साथ अपने सभी विकल्पों की घोषणा करती है:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="अपने robots.txt का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

निजी रूट्स (Private routes) हर भाषा में मौजूद होते हैं, इसलिए `Disallow` नियमों में हर स्थानीयकृत पथ को शामिल किया जाना चाहिए। यदि स्टार्टर ने `public/robots.txt` बनाया है तो उसे हटा दें, फिर इसे एक रूट से सर्व करें:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="प्रत्येक लोकेल को प्री-रेंडर करें" isOptional={true}>

प्रत्येक पेज के स्थानीयकृत पथ को सूचीबद्ध करें ताकि TanStack Start सभी भाषा संस्करणों को प्री-रेंडर कर सके। `localizeHref` बिना किसी ब्राउज़र निर्भरता वाला जनरेट किया गया कोड है, इसलिए यह `vite.config.ts` में चल सकता है, लेकिन फ़ाइल केवल पहले संकलन के बाद ही मौजूद होती है। नीचे दिए गए अनुसार मैन्युअल रूप से पथों को सूचीबद्ध करना उस क्रम निर्धारण समस्या से बचाता है:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

चूँकि स्विचर वास्तविक लिंक्स रेंडर करता है, `crawlLinks: true` उन पेजों को भी खोज लेता है जिन्हें आप सूचीबद्ध करना भूल गए थे।

</Step>
<Step number={14} title="स्थानीयकृत 404 पेजों को संभालें" isOptional={true}>

रीराइट के साथ, `/fr/does-not-exist` का मिलान `/does-not-exist` के रूप में होता है, और `getLocale()` अभी भी `fr` लौटाता है, इसलिए चरण 7 का रूट `notFoundComponent` फ़्रेंच में रेंडर होता है। एक कैच-ऑल रूट यह सुनिश्चित करता है कि गहरे पथ भी इस तक पहुंचें। पेज को `noindex` के रूप में चिह्नित करें: React 19 `<meta>` को `<head>` में फहराता (hoist) है।

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="सर्वर फ़ंक्शंस में लोकेल तक पहुँचें" isOptional={true}>

सर्वर फ़ंक्शंस Paraglide मिडलवेयर स्कोप के अंदर चलते हैं, इसलिए `getLocale()` वहाँ भी काम करता है:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Intlayer के साथ तुलना करें" isOptional={true}>

Paraglide से Intlayer के लिए कोई ड्रॉप-इन एडाप्टर नहीं है, क्योंकि दोनों एक ही विचार का पालन करते हैं: बिल्ड समय पर सामग्री को संकलित करना और यथासंभव कम रनटाइम भेजना। अंतर इस बात में है कि ब्राउज़र तक क्या पहुँचता है और सामग्री कैसे व्यवस्थित होती है:

- **लोकेल्स**: Intlayer प्रति लोकेल [गतिशील शब्दकोश (dynamic dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) लोड करता है (बेंचमार्क में 0% लोकेल लीक), जबकि प्रत्येक Paraglide संदेश फ़ंक्शन में सभी लोकेल्स होते हैं (49.7%)।
- **सामग्री संगठन**: सामग्री प्रत्येक कंपोनेंट के बगल में `.content.ts` फ़ाइलों में, या केंद्रीकृत फ़ाइलों में रह सकती है। देखें [प्रति-कंपोनेंट बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)।
- **लोकेल स्विच**: सामग्री को React कॉन्टेक्स्ट से पढ़ा जाता है, इसलिए लोकेल बदलने पर बिना रीलोड के री-रेंडर होता है।
- **जनरेट किया गया कोड**: `src` के अंदर कुछ भी जनरेट नहीं होता है, इसलिए कमिट करने से पहले फिर से जनरेट करने के लिए कुछ भी नहीं है।

यदि आप Paraglide के बजाय किसी अन्य लाइब्रेरी से आते हैं, तो [संगतता एडेप्टर (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) `use-intl`, `next-intl`, `react-i18next`, `react-intl` या Lingui API को बनाए रखते हैं और रनटाइम की अदला-बदली करते हैं।

देखें [क्या Intlayer, Paraglide से हल्का है?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_intlayer_lighter_than_paraglide.md) और [Intlayer TanStack Start गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)।

</Step>
<Step number={17} title="Intlayer का उपयोग करके अपने अनुवादों को स्वचालित करें" isOptional={true}>

Paraglide अनुवाद रेंडर करता है, लेकिन यह उन्हें **बनाने (produce)** में आपकी मदद नहीं करता है। Intlayer **मुफ़्त** और **ओपन सोर्स** है, और इसके टूल्स Paraglide प्रोजेक्ट पर भी मदद करते हैं:

- अपनी खुद की API की और प्रदाता का उपयोग करके **AI के साथ अनुवाद करें**। देखें [ऑटो फ़िल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md) और [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)।
- [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) के साथ **अपनी JSON फ़ाइलों को सत्य के स्रोत के रूप में रखें**।
- CI में **अनुपलब्ध अनुवादों का परीक्षण करें**। देखें [अपने अनुवादों का परीक्षण करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md)।
- [scan कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/scan.md) के साथ छूटे हुए `hreflang`, गलत canocinals और लोकेल लीक के लिए **अपनी परिनियोजित (deployed) साइट को स्कैन करें**।

</Step>
</Steps>

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या Paraglide JS, TanStack Start के लिए एक अच्छा विकल्प है?">

यह एक मजबूत विकल्प है: इसका उपयोग आधिकारिक TanStack Router उदाहरणों में किया जाता है, इसका रनटाइम [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) में सबसे छोटा है (~1.8 KB gzip), और संदेश पूरी तरह से टाइप्ड हैं। इसके नुकसान यह हैं कि प्रत्येक संदेश फ़ंक्शन में सभी लोकेल्स होते हैं, जो अन्य भाषाओं के विज़िटर्स को अनुवादित स्ट्रिंग्स का लगभग आधा हिस्सा लीक करता है, और लोकेल बदलने पर पेज रीलोड होता है।

</Question>
<Question title="क्या मुझे Paraglide के साथ $locale रूट सेगमेंट की आवश्यकता है?">

नहीं। राउटर का `rewrite` रूट मिलान से पहले लोकेल प्रीफ़िक्स को हटा देता है और जनरेट किए गए लिंक्स में इसे वापस जोड़ देता है, इसलिए एक ही `about.tsx` फ़ाइल `/about`, `/fr/about` और `/es/about` को सेवा देती है।

</Question>
<Question title="भाषा बदलने पर पेज पुनः लोड (reload) क्यों होता है?">

संदेश फ़ंक्शन कॉल किए जाने पर लोकेल पढ़ते हैं, वे React स्टेट की सदस्यता नहीं लेते हैं। इसलिए `setLocale` डिफ़ॉल्ट रूप से पेज को पुनः लोड करता है, ताकि प्रत्येक संदेश नई भाषा में फिर से रेंडर हो सके। आप `{ reload: false }` पास कर सकते हैं, लेकिन फिर आपको ट्री को स्वयं फिर से रेंडर करना होगा।

</Question>
<Question title="क्या मुझे जनरेट किए गए src/paraglide फ़ोल्डर को कमिट करना चाहिए?">

बेहतर होगा कि ऐसा न करें। यह फ़ोल्डर हर `dev` और `build` पर फिर से बनाया जाता है, और इसे कमिट करने से जनरेट की गई फ़ाइलों पर मर्ज विरोध (merge conflicts) होते हैं। इसके बजाय `messages/*.json` और `project.inlang/settings.json` को कमिट करें।

</Question>
<Question title="मैं Paraglide के साथ hreflang टैग कैसे जोड़ूँ?">

रूट `head()` में प्रति लोकेल एक पूर्ण (absolute) URL बनाने के लिए `localizeUrl` का उपयोग करें, और बेस लोकेल की ओर इशारा करते हुए एक `x-default` जोड़ें। चरण 10 एक पुन: प्रयोज्य (reusable) हेल्पर प्रदान करता है, और चरण 11 साइटमैप में वही विकल्प जोड़ता है।

</Question>
<Question title="क्या Paraglide अप्रयुक्त अनुवादों को ट्री-शेक (tree-shake) करता है?">

जब आप `outputStructure: "message-modules"` का उपयोग करते हैं तो अप्रयुक्त **संदेशों (messages)** को हटा दिया जाता है, इसलिए अन्य पेजों की सामग्री लीक नहीं होती है। अप्रयुक्त **लोकेल्स** नहीं हटाए जाते: प्रत्येक संदेश फ़ंक्शन में सभी अनुवाद होते हैं, यही कारण है कि बेंचमार्क 49.7% लोकेल लीक मापता है।

</Question>
<Question title="क्या मैं Paraglide से Intlayer में माइग्रेट कर सकता हूँ?">

हाँ। दोनों कंपाइलर-आधारित हैं, इसलिए उनका मानसिक मॉडल समान है। [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) के साथ अपनी JSON फ़ाइलों को रखें, फिर पेज दर पेज `m.key()` कॉल्स को `useIntlayer` से बदलें। [Intlayer TanStack Start गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md) देखें।

</Question>

</FAQ>
