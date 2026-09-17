---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026 में सही Svelte i18n लाइब्रेरी कैसे चुनें"
description: Svelte और SvelteKit अंतर्राष्ट्रीयकरण के लिए एक निर्णय मार्गदर्शिका। svelte-i18n, Paraglide, typesafe-i18n, wuchale और Intlayer की तुलना करने से पहले किन सवालों के जवाब देने चाहिए, और प्रत्येक विकल्प बंडल आकार, टाइपिंग और SSR सुरक्षा के मामले में क्या लागत लेता है।
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# सही Svelte i18n लाइब्रेरी कैसे चुनें

Svelte i18n के लिए कुछ भी इन-बिल्ट प्रदान नहीं करता है। कोई `$t` नहीं, कोई locale primitive नहीं, कोई message format नहीं। प्रत्येक विकल्प एक third-party चयन है, और Svelte ecosystem वह जगह है जहाँ compile-time i18n सबसे आगे निकल गया है, इसलिए उम्मीदवार React या Vue की तुलना में एक-दूसरे से अधिक भिन्न हैं।

यह गाइड उन सवालों की सूची देती है जिनका उत्तर पहले दिया जाना चाहिए, फिर उन उत्तरों को `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` और Intlayer से मैप करती है, Vite + Svelte और SvelteKit दोनों के लिए।

![Svelte i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## विषय सूची

<TOC/>

## लाइब्रेरीज़ की तुलना करने से पहले उत्तर देने के लिए छह प्रश्न

1. **Vite SPA या SvelteKit?** एक SPA में module-level store सही है: एक टैब, एक उपयोगकर्ता, एक locale। SvelteKit पर वही singleton सर्वर पर समवर्ती अनुरोधों (concurrent requests) में साझा हो जाता है, और अनुरोध B, अनुरोध A की भाषा में रेंडर होता है। लाइब्रेरी या तो आपको per-request shape (context, `locals`) देती है या इसे आप पर छोड़ देती है।
2. **अनुवाद कौन लिखता है?** डेवलपर्स, एक TMS, ICU स्ट्रिंग्स डिलीवर करने वाली एजेंसी, या एक AI pipeline। `svelte-i18n` ICU बोलता है। Paraglide और `typesafe-i18n` अपने स्वयं के सिंटैक्स का उपयोग करते हैं। अपने वेंडर से मिलान करें।
3. **कितने locales और पेज हैं?** दो locales और पाँच पेज सब कुछ शिप कर सकते हैं। दस locales और चालीस routes ऐसा नहीं कर सकते, और runtime catalogs तथा compiled messages के बीच का अंतर मुख्य लागत बन जाता है।
4. **क्या आपको keys पर types की आवश्यकता है?** `$_("cart.totl")` `svelte-i18n` में एक runtime विफलता है। Compile-time लाइब्रेरीज़ इसे बनावट के आधार पर ही एक type error बना देती हैं।
5. **Svelte 4 stores या Svelte 5 runes?** Runes locale state के सिंटैक्स को बदलते हैं, साझा करने की समस्या को नहीं। लेकिन एक `.ts` फ़ाइल में `$state` एक सामान्य चर (plain variable) में संकलित होता है, इसलिए यदि आप Svelte 5 पर हैं तो लाइब्रेरी के runtime को rune-aware होना चाहिए।
6. **क्या आप repo में generated files के साथ काम कर सकते हैं?** Paraglide और `typesafe-i18n` दोनों आपके source tree में JavaScript या TypeScript उत्पन्न करते हैं। कुछ टीमें इसके साथ सहज हैं, दूसरों को प्रत्येक समानांतर शाखा (parallel branch) पर merge conflicts मिलते हैं।

उत्तरों को लिख लें। नीचे दी गई हर बात उन पर वापस संदर्भित होती है।

## एक तस्वीर में परिदृश्य

Svelte i18n, React या Vue की तुलना में बाद में आया, और सीधे compile-time तरंगों पर चला गया।

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Runtime डिक्शनरीज़ (2019 से 2020): svelte-i18n, sveltekit-i18n">

JSON कैटलॉग, `intl-messageformat` के माध्यम से ब्राउज़र में पार्स किया गया ICU, module-level stores (`$locale`, `$_`) में locale। सबसे अधिक अपनाया गया, अच्छी तरह से प्रलेखित, SSR वायरिंग आपकी ज़िम्मेदारी है।

</Accordion>
<Accordion header="Generated types (2020 से 2022): typesafe-i18n">

एक जनरेटर आपके कैटलॉग को देखता है और typed accessors (`$LL.cart.total()`) उत्सर्जित करता है। मजबूत मॉडल, repo में generated files, और रिपॉजिटरी हाल ही में अधिक सक्रिय नहीं रही है।

</Accordion>
<Accordion header="Compiler और colocated content (2022 से 2026): Paraglide, wuchale, Intlayer">

Paraglide प्रत्येक संदेश को एक exported function में संकलित करता है ताकि bundler उस हिस्से को tree-shake कर सके जिसे कोई route कभी कॉल नहीं करता है। `wuchale` बिल्ड के समय मार्कअप से स्ट्रिंग्स निकालता है। Intlayer प्रति घटक सामग्री घोषित करता है और types तथा प्रति-घटक डिक्शनरी उत्पन्न करता है।

</Accordion>
</AccordionGroup>

[JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) प्रत्येक तरंग को विस्तार से कवर करता है।

## वह निर्णय जो सबसे अधिक मायने रखता है: सामग्री कहाँ रहती है और कब लोड होती है

दो संरचनात्मक विकल्प सेटअप के बीच बंडल के अधिकांश अंतर को समझाते हैं:

- **केंद्रीकृत या स्कोप्ड सामग्री।** ऐप के लिए एक `locales/en.json`, या प्रति घटक एक घोषणा।
- **Static या dynamic import।** स्टार्टअप पर सब कुछ, या सक्रिय locale (और आदर्श रूप से सक्रिय route) मांग पर प्राप्त (fetch) किया जाता है।

यह ग्राफ़ 1 से 10 पेजों के एक सैद्धांतिक ऐप के लिए पेलोड का अनुमान लगाता है, जिसका 1 से 10 locales में अनुवाद किया गया है, प्रति पेज लगभग 30 KB टेक्स्ट के साथ।

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`svelte-i18n` डिफ़ॉल्ट रूप से ऊपर-बाएँ में बैठता है: `register("fr", () => import("./fr.json"))` आपको प्रति locale dynamic loading देता है, लेकिन एक locale catalog एक सिंगल ऑब्जेक्ट होता है और इसे लोड करने से हर पेज की कॉपी लोड हो जाती है। Paraglide एक दिलचस्प मामला है: क्योंकि हर संदेश का अपना export होता है, tree-shaking आपको पेज का अक्ष मुफ़्त में दे देता है, और [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/svelte.md) पुष्टि करता है कि यह Vite + Svelte पर विज्ञापित रूप से काम करता है (यह React और Next.js बेंचमार्क में नहीं हुआ था)। Intlayer प्रति-घटक घोषणाओं के माध्यम से उसी कोने तक पहुँचता है।

यदि प्रश्न 3 का आपका उत्तर "कई पेज" था, तो किसी भी API प्राथमिकता से अधिक इस खंड को महत्व दें। [Per-component बनाम centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md) पोस्ट इसी ट्रेड-ऑफ के रखरखाव पक्ष को कवर करती है।

## उम्मीदवार

लाइब्रेरी के आकार [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/svelte.md) से हैं: 10-पेज, 10-locale ऐप पर बंडलिंग, tree-shaking और minification के बाद एक खाली घटक में store प्लस accessor। सामग्री को अलग से मापा जाता है।

| लाइब्रेरी       | संदेश कहाँ रहते हैं                    | Locale state                                 | Keys पर Types      | Message format | Per-route splitting      | लाइब्रेरी का आकार |
| :-------------- | :------------------------------------- | :------------------------------------------- | :----------------- | :------------- | :----------------------- | :---------------- |
| `svelte-i18n`   | प्रति locale JSON कैटलॉग               | Module-level Svelte store                    | Manual union       | ICU            | No                       | ~16.6 kB          |
| `typesafe-i18n` | Generated TS modules                   | Store adapter                                | Generated          | Own            | Partial                  | Small             |
| Paraglide       | inlang प्रोजेक्ट, functions में संकलित | Cookie, URL या storage से प्रति कॉल पढ़ा गया | Generated          | Own            | Yes, tree-shaking द्वारा | Near zero         |
| `wuchale`       | बिल्ड पर मार्कअप से निकाला गया         | Store                                        | N/A (keys नहीं)    | Own            | Yes                      | Small             |
| Intlayer        | घटक के बगल में `.content.ts`           | Context plus store, rune-aware               | Generated, default | Helpers        | Yes, प्रति घटक           | Baseline          |

> संख्याएं बेंचमार्क के संस्करणों पर एक स्नैपशॉट हैं। अकेले आकार पर निर्णय लेने से पहले इसे अपने ऐप पर चलाएं।

Paraglide का शून्य के करीब लाइब्रेरी आकार इसकी संरचना के कारण है: runtime आपके रिपॉजिटरी में उत्पन्न होता है। Intlayer को `vite-intlayer` की आवश्यकता होती है, इसलिए यह बिल्ड चरण के बिना नहीं चल सकता है।

## अपने उत्तरों का एक लाइब्रेरी से मिलान करें

<AccordionGroup>
<Accordion header="Vite SPA, छोटी टीम, कम locales">

`svelte-i18n`। यह सबसे अधिक प्रलेखित विकल्प है, `$_` मार्कअप में स्वाभाविक रूप से पढ़ता है, और `register` प्लस `waitLocale()` प्रति locale lazy loading को कवर करता है। पहले पेंट को `isLoading` पर रोकें नहीं तो आप raw keys फ्लैश करेंगे। यदि ऐप में बाद में सर्वर जुड़ सकता है, तो module store पर भरोसा करने के बजाय पहले दिन से ही locale को Svelte context में रखें; इसमें अभी कुछ भी खर्च नहीं होता है और बाद में केवल उत्पादन में आने वाले बग से बचाता है।

</Accordion>
<Accordion header="Locale routing और SSR के साथ SvelteKit">

साझा करने की समस्या इसे तय करती है। `svelte-i18n` SvelteKit पर काम करता है लेकिन प्रति-अनुरोध वायरिंग (`hooks.server.ts`, `locals`, `load`, फिर `setContext`) आपको लिखनी होती है और इसे सूक्ष्मता से गलत करना आसान है। Paraglide एक SvelteKit एकीकरण शिप करता है जो रूटिंग को संभालता है और प्रति कॉल locale पढ़ता है, जो singleton से बचता है। Intlayer `load` डेटा से locale को context में सेट करता है। [SvelteKit i18n पोस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/sveltekit.md) `[[lang]]` बनाम `reroute` विकल्प की व्याख्या करती है, जिसे आपको लाइब्रेरी चुनने से पहले चुनना चाहिए।

</Accordion>
<Accordion header="अनुवाद TMS या ICU डिलीवर करने वाली एजेंसी से आते हैं">

`svelte-i18n` `intl-messageformat` के माध्यम से ICU-native है, इसलिए यह सीधे अधिकांश वेंडरों से जुड़ता है। Paraglide और `typesafe-i18n` अपने स्वयं के सिंटैक्स का उपयोग करते हैं और रूपांतरण की आवश्यकता होती है। Intlayer का ICU समर्थन आंशिक है, इसलिए यदि आप आज ICU स्ट्रिंग्स प्राप्त करते हैं, तो इसे एक ब्लॉकर के रूप में मानें।

</Accordion>
<Accordion header="Bundle size शीर्ष बाधा है">

Compile-time। Paraglide की tree-shaking Vite + Svelte पर काम करती है और लाइब्रेरी की लागत शून्य के करीब है। Intlayer की प्रति-घटक डिक्शनरी repo में generated files के बिना समान परिणाम देती हैं। `svelte-i18n` ICU पार्सर और संपूर्ण कैटलॉग को शिप करता है और किसी भी सामग्री से पहले बेंचमार्क में `svelte-intlayer` से लगभग 4.5× बड़ा बैठता है।

</Accordion>
<Accordion header="Type safety गैर-परक्राम्य है">

एक साधारण `svelte-i18n` सेटअप के अलावा कुछ भी, जहाँ एकमात्र टाइपिंग एक हाथ से लिखा गया यूनियन है जो तुरंत JSON से भटक जाता है। `typesafe-i18n`, Paraglide और Intlayer सभी सामग्री से types उत्पन्न करते हैं। किसी कोडबेस को सौंपने से पहले `typesafe-i18n` की रिपॉजिटरी गतिविधि की जाँच करें। [लापता अनुवादों का पता लगाना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) पोस्ट तुलना करती है कि प्रत्येक बिल्ड समय पर क्या पकड़ता है।

</Accordion>
<Accordion header="आप repo में generated files नहीं चाहते हैं">

यह Paraglide और `typesafe-i18n` को हटा देता है। `svelte-i18n` और Intlayer अपने आउटपुट को `node_modules` या बिल्ड डायरेक्टरी में रखते हैं; Intlayer के साथ `.content.ts` फ़ाइलें हाथ से लिखे गए स्रोत हैं, संकलित डिक्शनरी और types `.intlayer/` में रहते हैं और अनदेखा (ignored) किए जाते हैं।

</Accordion>
<Accordion header="अनुवाद AI द्वारा तैयार किए जाएंगे">

तब केंद्रीकृत JSON के पास इसे सही ठहराने के लिए कोई उपभोक्ता नहीं बचता है। Colocated सामग्री के साथ एक CLI जो छूटे हुए locales को भरता है, छोटा रास्ता है। Intlayer का `fill` कमांड आपकी अपनी API key (OpenAI, Anthropic, Mistral, Gemini) के विरुद्ध चलता है और केवल उसी का पुन: अनुवाद करता है जो बदला है। Paraglide का inlang इकोसिस्टम अपनी योजनाओं के साथ होस्ट किए गए समकक्ष प्रदान करता है।

</Accordion>
</AccordionGroup>

## प्रत्येक लाइब्रेरी कहाँ कम पड़ती है

- **`svelte-i18n`**: सेट का सबसे भारी, कोई key types नहीं, कोई per-route splitting नहीं, module-level store जो SvelteKit पर अनुरोधों के पार लीक होता है जब तक कि आप स्वयं context वायर न करें।
- **`typesafe-i18n`**: एक watcher प्रक्रिया, repo में generated files, और एक रिपॉजिटरी जो हाल ही में अधिक सक्रिय नहीं रही है।
- **Paraglide**: generated files को repo में कमिट किया जाता है और हर पुश से पहले पुन: उत्पन्न किया जाता है, समानांतर शाखाओं पर merge conflicts, और locale को store के बजाय प्रत्येक संदेश कॉल पर cookie या storage से पढ़ा जाता है, जिससे locale परिवर्तन पर काम बढ़ता है।
- **`wuchale`**: दिलचस्प निष्कर्षण विचार, अभी भी शुरुआती। React बेंचमार्क में प्रतिक्रियाशीलता संबंधी समस्याओं का सामना करना पड़ा जिसके लिए प्रदाता री-रेंडर को बाध्य करना पड़ा, और प्रलेखन पतला है।
- **Intlayer**: अनिवार्य build plugin, छोटा इकोसिस्टम, आंशिक ICU समर्थन, और डिज़ाइन द्वारा पूरे कोडबेस में फैली हुई सामग्री, इसलिए अनुवादक के लिए एक JSON निर्यात करने के लिए टूलिंग की आवश्यकता होती है।

## प्रत्येक विकल्प कोड में कैसा दिखता है

वही घटक, एक शीर्षक और एक बहुवचन के साथ एक कार्ट सारांश, प्रत्येक उम्मीदवार के साथ लिखा गया है। दिलचस्प हिस्सा मार्कअप नहीं है, यह है कि सामग्री कहाँ रहती है, locale कैसे संग्रहीत होता है, और टाइप चेकर क्या जानता है।

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

`intl-messageformat` के माध्यम से ICU, module-level store में locale। `$_` किसी भी स्ट्रिंग को स्वीकार करता है; एकमात्र टाइपिंग एक यूनियन है जिसे आप हाथ से लिखते हैं।

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

प्रत्येक संदेश एक उत्पन्न, typed फ़ंक्शन है, जिसे कभी कॉल न किए जाने पर tree-shake किया जाता है। `paraglide/` फ़ोल्डर आपके repo में उत्पन्न होता है, और locale को store के बजाय प्रति कॉल पढ़ा जाता है।

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Watcher प्रक्रिया द्वारा उत्पन्न Typed accessors। मॉडल मजबूत है; generated files repo में रहती हैं और परियोजना हाल ही में शांत रही है।

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

घटक के बगल में एक ही फ़ाइल में सभी locales। `useIntlayer` एक readable store लौटाता है, इसलिए `$content` वह ऑटो-सब्सक्रिप्शन है जिसे आप पहले से जानते हैं, और locale को module singleton के बजाय context (SSR-सुरक्षित) में रखा जाता है।

  </Tab>
</Tabs>

पहले से ही `svelte-i18n` पर हैं? [`@intlayer/svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/svelte-i18n.md) पैकेज को बंडलर स्तर पर उपनाम (alias) देता है ताकि `$_`, `$date`, `$number` और आपकी फ्लैट कुंजियाँ काम करती रहें जबकि Intlayer सामग्री परोसता है।

## प्रतिबद्ध होने से पहले

एक सुविधा तालिका आपको बताती है कि आज एक लाइब्रेरी क्या करती है। ये बिंदु आपको बताते हैं कि इसके साथ रहना कैसा होगा।

**रिपॉजिटरी गतिविधि की जाँच करें।**

कमिट्स, समस्या प्रतिक्रिया समय, और क्या अंतिम लघु रिलीज़ इस वर्ष थी। बिना किसी अनुरक्षक (maintainer) के एक मजबूत डिज़ाइन भविष्य में होने वाला एक माइग्रेशन है।

**npm डाउनलोड द्वारा चयन न करें।**

सबसे अधिक स्थापित लाइब्रेरी वह है जो पहले शिप की गई थी, वह नहीं जो 2026 Svelte कोडबेस के अनुकूल हो। डाउनलोड इतिहास को मापते हैं, उपयुक्तता को नहीं।

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**पूछें कि अनुरक्षक को कौन भुगतान करता है, और वे क्या बेचते हैं।**

`svelte-i18n` को Crowdin द्वारा समर्थित किया गया है, जैसे `next-intl` और `vue-i18n`। `i18next` को Locize द्वारा समर्थित किया गया है। Tolgee, Paraglide (inlang) और Intlayer प्रत्येक अपना प्लेटफ़ॉर्म चलाते हैं। एक वेंडर जिसका राजस्व होस्ट किए गए अनुवाद से आता है, उसके पास आपके टूलचेन के अंदर अनुवाद को मुफ़्त बनाने का बहुत कम कारण होता है। Intlayer इस सेट में एकमात्र ऐसा है जो आपकी अपनी API key के साथ CLI के माध्यम से AI अनुवाद और एक CMS शिप करता है जिसे आप स्वयं होस्ट कर सकते हैं।

**क्या यह AI-agent तैयार है?**

एजेंट अभी भी i18n के साथ संघर्ष करते हैं: वे locales भूल जाते हैं, keys का आविष्कार करते हैं, और संदेश सिंटैक्स मिलाते हैं। क्या लाइब्रेरी [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md) या एक [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md) शिप करती है ताकि एजेंट सामग्री को सूचीबद्ध, भर और परीक्षण कर सके? और क्या सामग्री लोडिंग डिफ़ॉल्ट रूप से अनुकूलित है, या किसी को हर तिमाही में नेमस्पेस और लेज़ी आयात की समीक्षा करनी होगी?

**बॉक्स से बाहर टाइप सुरक्षा।**

"अतिरिक्त वायरिंग के साथ टाइप किया जा सकता है" नहीं बल्कि "एक गलत कुंजी एक नए इंस्टॉल पर `tsc` को विफल करती है"। जाँचें कि उस कुंजी के साथ क्या होता है जो मौजूद नहीं है, और उस locale के साथ जिसमें एक अनुवाद गायब है।

**अप्रयुक्त सामग्री का पता लगाना।**

कैटलॉग केवल बढ़ते हैं। Intlayer का बिल्ड अप्रयुक्त फ़ील्ड्स को हटा देता है और उन्हें लॉग करता है (`build.purge`)। Paraglide आर्किटेक्चर द्वारा वहाँ पहुँचता है, क्योंकि एक अनकॉल्ड संदेश फ़ंक्शन tree-shaken होता है। बाकी सब कुछ सफाई को आप पर छोड़ देता है।

**डेवलपर अनुभव।**

पहली अनुवादित स्ट्रिंग तक सेटअप समय, एक [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md) या [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) जो होवर पर अनुवाद दिखाता है और घोषणा पर कूदता है, भरने, परीक्षण करने और पुश करने के लिए एक [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md), और गैर-डेवलपर्स के लिए बिना पुल रिक्वेस्ट के सामग्री संपादित करने का एक तरीका ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md))।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या svelte-i18n 2026 में भी सही डिफ़ॉल्ट है?">

एक छोटे कैटलॉग वाले Vite SPA के लिए, हाँ। यह सबसे अधिक प्रलेखित विकल्प है और ICU अनुकूलता कई टीमों के लिए मायने रखती है। SvelteKit पर या कुछ दर्जन पृष्ठों के बाद, इसकी लागत (कोई types नहीं, कोई scoping नहीं, साझा store) जुड़ने लगती है।

</Question>

<Question title="क्या Paraglide की tree-shaking वास्तविक है?">

Vite + Svelte पर, हाँ, बेंचमार्क इसकी पुष्टि करता है। TanStack Start या Next.js के साथ React पर यह उसी बेंचमार्क में प्रभावी नहीं हुआ। किसी भी परिणाम पर भरोसा करने के बजाय अपने स्वयं के स्टैक में सत्यापित करें।

</Question>

<Question title="क्या runes बदलते हैं कि मुझे कौन सी लाइब्रेरी चुननी चाहिए?">

वे आपकी अपनी locale state के सिंटैक्स को बदलते हैं, साझा करने की समस्या को नहीं। जो मायने रखता है वह यह है कि क्या लाइब्रेरी का runtime Svelte 5 पर rune-aware है और क्या यह module store के बजाय context का उपयोग करता है। दोनों की जाँच करें।

</Question>

<Question title="क्या लाइब्रेरी का चुनाव SEO को प्रभावित करता है?">

अप्रत्यक्ष रूप से। क्रॉलर्स रूटिंग, `hreflang`, `<html lang>` और सर्वर-रेंडर किए गए HTML में टेक्स्ट है या नहीं, इसकी परवाह करते हैं। [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

</Question>

</FAQ>

## आगे पढ़ना

- [Svelte i18n बेंचमार्क: बंडल आकार, लीकेज और लोकेल-स्विच समय](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/svelte.md)
- [Svelte i18n: स्टोर्स, रून्स और मॉड्यूल-स्तरीय जाल](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/svelte.md) और [SvelteKit i18n: रूटिंग, SSR और साझा स्थिति](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/sveltekit.md)
- [ड्रॉप-इन `svelte-i18n` कम्पैट एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/svelte-i18n.md)
- [जावास्क्रिप्ट i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)
- [कंपाइलर बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
- [प्रति-घटक बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [बिल्ड समय पर बंडल अनुकूलन कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [Vite + Svelte ऐप में i18n सेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md) और [SvelteKit ऐप में](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_svelte_kit.md)
- यही गाइड [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_vue_i18n_library.md) और [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_solid_i18n_library.md) के लिए
