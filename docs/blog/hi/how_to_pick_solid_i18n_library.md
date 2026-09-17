---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026 में सही Solid i18n लाइब्रेरी कैसे चुनें"
description: SolidJS और SolidStart internationalization के लिए एक निर्णय गाइड। @solid-primitives/i18n, solid-i18next, Paraglide, Lingui और Intlayer की तुलना करने से पहले किन सवालों के जवाब देने चाहिए, और प्रत्येक विकल्प reactivity, bundle size और typing में क्या लागत लेता है।
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalization
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n लाइब्रेरी तुलना
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# सही Solid i18n लाइब्रेरी कैसे चुनें

Solid का reactivity model यह बदल देता है कि एक i18n लाइब्रेरी को क्या करना चाहिए। Components केवल एक बार चलते हैं, इसलिए setup के समय `const` में संग्रहीत अनुवाद एक frozen string बन जाता है, और जो लाइब्रेरी accessors के बजाय strings सौंपती है, वह एक ऐसा पेज बनाएगी जो उन तीन components को छोड़कर हर जगह भाषा बदलता है जहाँ किसी ने ऐसा किया हो। Solid के लिए लाइब्रेरी चुनना आंशिक रूप से API के बारे में है, और आंशिक रूप से इस बारे में कि कौन सी लाइब्रेरी इस गलती को करने से रोकती है।

यह गाइड पहले उत्तर देने योग्य प्रश्नों की सूची देता है, फिर Vite + Solid और SolidStart के लिए `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` और Intlayer पर उन्हें मैप करता है।

![Solid i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## विषय सूची

<TOC/>

## लाइब्रेरीज़ की तुलना करने से पहले उत्तर देने योग्य छह प्रश्न

1. **Vite SPA या SolidStart?** एक SPA में locale एक signal में रह सकता है और कुछ नहीं। SolidStart पर locale को सर्वर पर URL से resolve किया जाना चाहिए, और जो कुछ भी क्रॉलर को बिना JavaScript के देखना चाहिए (`<html lang>`, `hreflang`) वह `entry-server.tsx` में होना चाहिए।
2. **Locale बदलाव कितना reactive होना चाहिए?** भाषा बदलने पर पूरा पेज रीलोड होना कुछ ऐप्स के लिए स्वीकार्य है। यदि नहीं, तो लाइब्रेरी के values signals या accessors होने चाहिए, और उन्हें पढ़ना ट्रैक किया जाना चाहिए, कॉपी नहीं।
3. **अनुवाद कौन लिखता है?** डेवलपर्स, एक TMS, ICU strings प्रदान करने वाली एजेंसी, या एक AI पाइपलाइन। `solid-i18next` i18next के प्रारूप का उपयोग करता है। `@solid-primitives/i18n` वही है जो आपका dictionary object है। अपने वेंडर से मिलान करें।
4. **कितने locales और पेज हैं?** दो locales और पांच पेज सब कुछ शिप कर सकते हैं। दस locales और चालीस routes ऐसा नहीं कर सकते, और lazy catalogs तथा scoping मुख्य लागत बन जाते हैं।
5. **क्या आपको keys पर types की आवश्यकता है?** `@solid-primitives/i18n` उन्हें source dictionary से infer करता है। `solid-i18next` को मैन्युअल डिक्लेरेशन की आवश्यकता होती है। Compile-time लाइब्रेरीज़ उन्हें generate करती हैं।
6. **आपको कितने feature surface की आवश्यकता है?** Cookie management, locale-prefixed routing, redirects, formatters। सबसे हल्के विकल्प में इनमें से कुछ भी नहीं है, और यह तब तक ठीक है जब तक इसकी कमी महसूस न हो।

उत्तर लिख लें। नीचे सब कुछ उनका संदर्भ देता है।

## एक तस्वीर में पूरा परिदृश्य

Solid यहाँ सबसे युवा ecosystem है और इसमें तीन तरंगों में फैले सबसे कम विकल्प हैं।

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries: solid-i18next">

Solid के लिए रैप किया गया i18next। Namespaces, backends, detectors, और एक दशक के plugins। इस सेट में सबसे भारी, और React की तरह ही `t("a.b")` की लागत।

</Accordion>
<Accordion header="Minimal primitives (2022): @solid-primitives/i18n">

एक flat dictionary जिसे आप नियंत्रित करते हैं, एक `translator()` जो accessors रिटर्न करता है, source object से infer किए गए types। बहुत छोटा, कोई scoping नहीं, कोई routing नहीं, कोई formatters नहीं। कम्युनिटी डिफ़ॉल्ट।

</Accordion>
<Accordion header="Compiler और colocated content (2024 से 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide प्रति संदेश एक फ़ंक्शन generate करता है। Intlayer `.content.ts` फ़ाइलों में प्रति component सामग्री घोषित करता है और signal-backed nodes रिटर्न करता है। Lingui की Solid बाइंडिंग 2026 में आई और इसका macro-based extraction लाती है।

</Accordion>
</AccordionGroup>

[JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) प्रत्येक तरंग को विस्तार से कवर करता है।

## सबसे महत्वपूर्ण निर्णय: सामग्री कहाँ रहती है और कब लोड होती है

दो संरचनात्मक विकल्प सेटअप्स के बीच बंडल के अधिकांश अंतर को समझाते हैं:

- **Centralized या scoped content.** ऐप के लिए एक dictionary, या प्रति component एक डिक्लेरेशन।
- **Static या dynamic import.** स्टार्टअप पर सब कुछ, या सक्रिय locale (और आदर्श रूप से सक्रिय route) मांग पर प्राप्त (fetch) किया गया।

यह ग्राफ 1 से 10 पेजों वाले एक सैद्धांतिक ऐप के लिए पेलोड का अनुमान लगाता है, जिसका 1 से 10 locales में अनुवाद किया गया है, जिसमें प्रति पेज लगभग 30 KB टेक्स्ट है।

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` किसी भी अक्ष पर कुछ नहीं करता है: आप प्रति locale एक dictionary `createResource` करते हैं, जिससे आपको dynamic loading मिलती है, और बाकी सब आपके ऊपर है। `solid-i18next` में namespaces और lazy backends हैं, लेकिन कोई भी चीज़ मैपिंग को लागू नहीं करती है, इसलिए `common` को इम्पोर्ट करने वाला एक शेयर्ड कंपोनेंट इसे हर रूट की डिपेंडेंसी बना देता है। Paraglide tree-shaking के माध्यम से पेज अक्ष प्राप्त करता है, हालाँकि यह [Solid बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/solid.md) कार्यान्वयन में प्रभावी नहीं हुआ। Intlayer इसे per-component डिक्लेरेशन के माध्यम से प्राप्त करता है।

यदि प्रश्न 4 का आपका उत्तर "कई पेज" था, तो किसी भी API प्राथमिकता से अधिक इस खंड को महत्व दें। [Per-component बनाम centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md) पोस्ट इसी trade-off के रखरखाव पक्ष को कवर करता है।

## उम्मीदवार

लाइब्रेरी के आकार [Solid बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/solid.md) से हैं: 10-पेज, 10-लोकेल ऐप पर बंडलिंग, tree-shaking और minification के बाद, एक खाली कंपोनेंट में provider प्लस accessor। सामग्री को अलग से मापा जाता है।

| Library                  | Content model                              | Reactivity on locale change                       | टाइप सुरक्षा                            | Scoping and lazy loading          | Library size                                     |
| :----------------------- | :----------------------------------------- | :------------------------------------------------ | :-------------------------------------- | :-------------------------------- | :----------------------------------------------- |
| `@solid-primitives/i18n` | Flat dictionary जिसे आप नियंत्रित करते हैं | Signal, accessors translator द्वारा रिटर्न किए गए | 3/5 — Source dictionary से infer किए गए | कुछ भी इन-बिल्ट नहीं              | ~0.6 kB                                          |
| `solid-i18next`          | i18next catalogs और namespaces             | Store, provider के माध्यम से re-render            | 2/5 — मैनुअल डिक्लेरेशन                 | Namespaces, lazy backends         | ~14.9 kB                                         |
| Paraglide                | inlang प्रोजेक्ट, generated फ़ंक्शंस       | Cookie या storage से प्रति कॉल रीड                | 3.5/5 — Generated                       | Tree-shaking (बेंचमार्क में नहीं) | लगभग शून्य (कोडबेस में जनरेट किए गए कोड के कारण) |
| `@lingui/solid`          | कोड में सोर्स टेक्स्ट, compiled catalogs   | Signal-आधारित                                     | 2/5 — कंपाइलर से                        | प्रति catalog                     | ~11.8 kB                                         |
| Intlayer                 | प्रति कंपोनेंट एक `.content.ts`            | Signal-backed nodes, कोई कंपोनेंट re-run नहीं     | 5/5 — Generated, डिफ़ॉल्ट रूप से चालू   | हाँ, प्रति component              | ~4.3 kB                                          |

> संख्याएँ बेंचमार्क के वर्ज़न का एक स्नैपशॉट हैं। `@lingui/solid` का आकार TanStack Start बेंचमार्क से लिया गया है। केवल आकार के आधार पर निर्णय लेने से पहले इसे अपने ऐप पर चलाएं।
> टाइप सुरक्षा: 5/5 का अर्थ है कि URL फॉर्मेटर और हेल्पर्स सहित कुंजियाँ, पैरामीटर और हर लोकेल बिना किसी मैन्युअल सेटअप के जाँचे जाते हैं।

Paraglide का लगभग शून्य लाइब्रेरी आकार निर्माण के आधार पर है: runtime आपके रिपॉजिटरी में generate होता है। Intlayer को `vite-intlayer` की आवश्यकता होती है, इसलिए यह build step के बिना नहीं चल सकता।

## अपने उत्तरों को एक लाइब्रेरी से मिलाएँ

<AccordionGroup>
<Accordion header="Vite SPA, छोटा कैटलॉग, आप कुछ भी जटिल नहीं चाहते">

`@solid-primitives/i18n`। एक flat dictionary, एक `translator()` जो accessors रिटर्न करता है, बिना किसी अतिरिक्त वायरिंग के infer किए गए types। यह एक छोटे ऐप के लिए सही उत्तर है, और सोर्स कोड पढ़ने में दस मिनट लगते हैं। आप खुद क्या लिखेंगे: locale persistence, routing, formatters, और प्रति-रूट विभाजन। यदि ये आवश्यकताएं बढ़ती हैं, तो यह आगे बढ़ने का संकेत है।

</Accordion>
<Accordion header="i18next कोडबेस के साथ React से आ रहे हैं">

`solid-i18next` आपको catalogs, namespaces, backends और detectors को वैसे ही पुनः उपयोग करने की अनुमति देता है जैसे वे हैं। यह सबसे भारी विकल्प है और `react-i18next` जैसी ही लागत वहन करता है: मैनुअल टाइप डिक्लेरेशन, ऐसे ऑप्टिमाइज़ेशन जो संभव हैं लेकिन समय लेने वाले हैं, और एक `t()` जो एक string लौटाता है, जिससे frozen-translation बग लिखना आसान हो जाता है। Reads को JSX या memo में लपेटें और उन्हें कभी भी setup के समय स्टोर न करें।

</Accordion>
<Accordion header="Locale-prefixed routes और SSR के साथ SolidStart">

Locale को सर्वर पर URL से आना चाहिए ताकि दोनों पक्ष सहमत हों; क्लाइंट पर इसका पता लगाना बहुत देर हो चुकी होती है। `@solid-primitives/i18n` और `solid-i18next` `[[locale]]` रूट, `matchFilters`, रीडायरेक्ट और `entry-server.tsx` टैग्स को आपके ऊपर छोड़ देते हैं। Paraglide में एक Vite प्लगइन है जो रूटिंग को संभालता है। Intlayer मिडलवेयर और रूट हेल्पर्स प्रदान करता है। आप जो भी चुनें, `<html lang>` और `hreflang` को `entry-server.tsx` में रखें; SolidStart v2 में hydration के बाद `@solidjs/meta` क्लाइंट पर लागू होता है। [Solid i18n पोस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/solid.md) उस सेटअप को विस्तार से बताता है।

</Accordion>
<Accordion header="Locale बदलाव तुरंत और fine-grained होना चाहिए">

ऐसी लाइब्रेरी चुनें जिसके मान signals या accessors हों और जिसके reads ट्रैक किए जाते हों। `@solid-primitives/i18n` accessors और Intlayer nodes दोनों केवल उन DOM nodes को अपडेट करते हैं जो उन्हें पढ़ते हैं, बिना किसी कंपोनेंट re-run के। `solid-i18next` provider के माध्यम से re-render करता है। Paraglide सिग्नल के बजाय प्रत्येक मैसेज कॉल पर कुकी या स्टोरेज से लोकेल पढ़ता है, जो काम तो करता है लेकिन प्रति नोड आवश्यकता से अधिक काम करता है।

</Accordion>
<Accordion header="बड़ा ऐप, कई रूट्स, बंडल बजट">

Build time पर संकलित Scoped सामग्री। Intlayer केवल वही शिप करता है जो एक रूट रेंडर करता है। Paraglide को tree-shaking के माध्यम से वहां पहुंचना चाहिए; इसे अपने सेटअप में सत्यापित करें, क्योंकि यह बेंचमार्क में नहीं हुआ था। `solid-i18next` के साथ, पहले दिन ही namespace और lazy-loading रणनीति की योजना बनाएं और कोड समीक्षा में इसे लागू करें।

</Accordion>
<Accordion header="Type safety अनिवार्य है">

`@solid-primitives/i18n` आपको मुफ़्त में inferred types देता है, जो अधिकांश React लाइब्रेरीज़ की पेशकश से अधिक है। Lazy loading और प्रति-रूट विभाजन के बाद भी बने रहने वाले generated types के लिए, Paraglide, `@lingui/solid` और Intlayer सभी सामग्री से उन्हें बनाते हैं। [लापता अनुवादों का पता लगाना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) पोस्ट तुलना करता है कि प्रत्येक बिल्ड समय पर क्या पकड़ता है।

</Accordion>
<Accordion header="अनुवाद AI द्वारा तैयार किए जाएंगे">

तब एक centralized dictionary को सही ठहराने के लिए कोई उपभोक्ता नहीं बचता। Colocated सामग्री के साथ एक CLI जो लापता लोकेल्स को भरता है, एक छोटा रास्ता है। Intlayer का `fill` कमांड आपकी अपनी API key (OpenAI, Anthropic, Mistral, Gemini) के साथ चलता है और केवल उसी का अनुवाद करता है जो बदला है।

</Accordion>
</AccordionGroup>

## प्रत्येक लाइब्रेरी कहाँ कम पड़ती है

- **`@solid-primitives/i18n`**: आपके द्वारा बनाए गए सिस्टम के अलावा कोई lazy loading या scoping नहीं, कोई routing नहीं, कोई cookie हैंडलिंग नहीं, कोई formatters नहीं। छोटे ऐप्स के लिए उत्कृष्ट, व्यावसायिक ऐप्स के लिए जल्दी ही अपर्याप्त।
- **`solid-i18next`**: इस सेट में सबसे भारी, मैनुअल types, इसका अपना बहुवचन प्रारूप, और `t()` एक string लौटाता है इसलिए यदि setup के समय संग्रहीत किया जाए तो अनुवाद freeze हो जाते हैं।
- **Paraglide**: repo में प्रतिबद्ध generated फ़ाइलें जिन्हें हर पुश से पहले पुनः generate किया जाता है, Solid बेंचमार्क में tree-shaking प्रभावी नहीं हुआ, और locale सिग्नल के बजाय प्रति कॉल स्टोरेज से पढ़ा जाता है।
- **`@lingui/solid`**: 2026 में नया, इसलिए अभी बहुत कम प्रोडक्शन फीडबैक है। Lingui के `extract` / `compile` बिल्ड स्टेप और इसके कई ओवरलैपिंग सिंटैक्स को इनहेरिट करता है।
- **Intlayer**: अनिवार्य बिल्ड प्लगइन, छोटा इकोसिस्टम, आंशिक ICU समर्थन, और डिज़ाइन द्वारा पूरे कोडबेस में फैली सामग्री, इसलिए एक अनुवादक के लिए एक JSON निर्यात करने के लिए टूलिंग की आवश्यकता होती है।

## प्रत्येक विकल्प कोड में कैसा दिखता है

वही component, एक title और plural के साथ cart summary, प्रत्येक उम्मीदवार के साथ लिखा गया। ध्यान दें कि अनुवाद कहाँ पढ़ा जाता है: JSX में यह ट्रैक किया जाता है, setup बॉडी में यह एक frozen string है।

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

बिना किसी codegen के English object से Keys टाइप की जाती हैं। इसमें कोई बहुवचन नियम नहीं है, कोई lazy loading नहीं है और कोई routing नहीं है; प्रत्येक को जोड़ना आपका काम है।

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

i18next कैटलॉग, नेमस्पेस और प्लगइन्स जैसे हैं वैसे ही। `t` एक string लौटाता है, इसलिए setup के समय `const title = t("cart:title")` इसे फ्रीज कर देता है; कॉल को JSX के अंदर रखें।

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

प्रत्येक संदेश एक generated, typed फ़ंक्शन है। Locale को सिग्नल के बजाय प्रत्येक कॉल पर कुकी या स्टोरेज से पढ़ा जाता है, इसलिए स्विच पर reactivity को वायर करना आपका काम है।

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      hi: "आपकी कार्ट",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        hi: "{{count}} आइटम",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        hi: "{{count}} आइटम",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

कंपोनेंट के पास एक ही फ़ाइल में सभी locales। `useIntlayer` signal-backed nodes लौटाता है, इसलिए एक locale बदलाव केवल उन DOM nodes को अपडेट करता है जो उन्हें पढ़ते हैं। JSX में `{content.title}` ट्रैक किया जाता है; setup बॉडी में `content.title.value` ट्रैक नहीं होता है।

  </Tab>
</Tabs>

मौजूदा i18next कोडबेस पर, [i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/i18next.md) बंडलर स्तर पर पैकेज को alias करता है ताकि कैटलॉग और `t()` काम करते रहें जबकि Intlayer सामग्री प्रदान करता है, और [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) बाकी को कवर करता है।

## प्रतिबद्ध होने से पहले

एक फीचर टेबल आपको बताती है कि एक लाइब्रेरी आज क्या करती है। ये बिंदु आपको बताते हैं कि इसके साथ काम करना कैसा होगा।

**रिपॉजिटरी गतिविधि जांचें।**

कमिट, समस्या प्रतिक्रिया समय, और क्या अंतिम मामूली रिलीज इस वर्ष हुई थी। बिना किसी अनुरक्षक के एक ध्वनि डिज़ाइन प्रतीक्षा में एक माइग्रेशन है।

**npm डाउनलोड द्वारा चयन न करें।**

सबसे अधिक इंस्टॉल की गई लाइब्रेरी वह है जिसे पहले शिप किया गया था, वह नहीं जो 2026 Solid कोडबेस में फिट बैठती है। डाउनलोड इतिहास को मापते हैं, उपयुक्तता को नहीं।

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**पूछें कि अनुरक्षक को कौन भुगतान करता है, और वे क्या बेचते हैं।**

`i18next` (`solid-i18next` के पीछे) Locize द्वारा समर्थित है। `next-intl`, `vue-i18n`, `svelte-i18n` और Lingui Crowdin द्वारा समर्थित हैं। Tolgee, Paraglide (inlang) और Intlayer प्रत्येक अपना प्लेटफ़ॉर्म चलाते हैं। एक विक्रेता जिसका राजस्व होस्टेड अनुवाद है, उसके पास आपके टूलचेन के अंदर अनुवाद को मुफ़्त बनाने का बहुत कम कारण है। Intlayer इस सेट में एकमात्र ऐसा है जो आपकी अपनी API key के साथ CLI के माध्यम से AI अनुवाद प्रदान करता है, और एक CMS जिसे आप स्वयं होस्ट कर सकते हैं।

**क्या यह AI-agent तैयार है?**

एजेंट अभी भी i18n के साथ संघर्ष करते हैं: वे लोकेल्स भूल जाते हैं, चाबियां गढ़ते हैं, और संदेश सिंटैक्स मिलाते हैं। क्या लाइब्रेरी [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md) या एक [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md) शिप करती है ताकि एजेंट सामग्री को सूचीबद्ध, भर और परीक्षण कर सके? और क्या सामग्री लोडिंग डिफ़ॉल्ट रूप से अनुकूलित है, या किसी को हर तिमाही में नेमस्पेस और लेज़ी आयात की समीक्षा करनी होगी?

**आउट ऑफ द बॉक्स Type safety।**

"अतिरिक्त वायरिंग के साथ टाइप किया जा सकता है" नहीं, बल्कि "एक गलत कुंजी एक नए इंस्टॉल पर `tsc` को विफल करती है"। जांचें कि क्या होता है जब कोई ऐसी कुंजी होती है जो मौजूद नहीं है, और ऐसे लोकेल के साथ जिसमें एक अनुवाद गायब है।

**अप्रयुक्त सामग्री का पता लगाना।**

कैटलॉग केवल बढ़ते हैं। Intlayer का बिल्ड अप्रयुक्त फ़ील्ड्स को हटा देता है (purge) और उन्हें लॉग करता है (`build.purge`)। Paraglide आर्किटेक्चर द्वारा वहां पहुंचता है, क्योंकि एक अनकॉल्ड मैसेज फ़ंक्शन tree-shaken होता है। बाकी सब कुछ सफाई का काम आपके ऊपर छोड़ देता है।

**डेवलपर अनुभव।**

पहली अनुवादित स्ट्रिंग तक सेटअप समय, एक [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md) या [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) जो होवर पर अनुवाद दिखाता है और डिक्लेरेशन पर कूदता है, fill, test और push के लिए एक [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md), आपके कंपोनेंट्स से हार्ड-कोडेड स्ट्रिंग्स निकालने वाला एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) या एक्सट्रैक्टर ताकि हर स्ट्रिंग को कुंजी-दर-कुंजी प्रबंधित न करना पड़े, और गैर-डेवलपर्स के लिए बिना पुल रिक्वेस्ट के सामग्री संपादित करने का एक तरीका ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md))।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या @solid-primitives/i18n एक प्रोडक्शन ऐप के लिए पर्याप्त है?">

एक छोटे ऐप के लिए, हाँ, और यह उपलब्ध सबसे हल्का विकल्प है। जब आपको प्रति रूट लेज़ी कैटलॉग, SolidStart पर लोकेल रूटिंग, कुकी दृढ़ता या फ़ॉर्मेटर्स की आवश्यकता होती है, तो यह पर्याप्त नहीं रह जाता है, क्योंकि वह सब कुछ बनाना आपका काम है।

</Question>

<Question title="लोकेल बदलने पर मेरा अनुवाद अपडेट क्यों नहीं होता है?">

क्योंकि Solid कंपोनेंट केवल एक बार चलते हैं। Setup के समय `const` में पढ़ा गया अनुवाद एक सादा string होता है, कोई subscription नहीं। इसे JSX, प्रभाव (effect) या memo के अंदर पढ़ें, या ऐसी लाइब्रेरी चुनें जिसके मान accessors हों ताकि गलत वर्ज़न लिखना कठिन हो।

</Question>

<Question title="क्या मुझे कंपाइलर-आधारित लाइब्रेरी की आवश्यकता है?">

केवल तभी जब बंडल आकार, उत्पन्न प्रकार (generated types) या बिल्ड-टाइम अनुपलब्ध-कुंजी जांच वास्तविक आवश्यकताएं हों। [कंपाइलर बनाम डिक्लेरेटिव i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md) पोस्ट बताता है कि कंपाइलर आपको क्या देते हैं और वे कहाँ गलत हो सकते हैं।

</Question>

<Question title="क्या लाइब्रेरी का चुनाव SEO को प्रभावित करता है?">

अप्रत्यक्ष रूप से। क्रॉलर रूटिंग, `hreflang`, `<html lang>` और क्या टेक्स्ट सर्वर-रेंडर किए गए HTML में है, इसकी परवाह करते हैं, जिसका SolidStart पर अर्थ `entry-server.tsx` है। [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

</Question>

</FAQ>

## आगे पढ़ना

- [Solid i18n बेंचमार्क: बंडल आकार, लीकेज और लोकेल-स्विच समय](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/solid.md)
- [Solid i18n: लोकेल बदलने पर अनुवाद क्यों फ्रीज हो जाते हैं](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/solid.md)
- [ड्रॉप-इन i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/i18next.md) और [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md)
- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)
- [कंपाइलर बनाम डिक्लेरेटिव i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
- [Per-component बनाम centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [बिल्ड समय पर बंडल ऑप्टिमाइज़ेशन कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [Vite + Solid ऐप में i18n सेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+solid.md) और [SolidStart ऐप में](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_solid_start.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_vue_i18n_library.md) और [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_svelte_i18n_library.md) के लिए समान गाइड
