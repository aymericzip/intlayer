---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "ngx-translate बनाम Angular i18n बनाम Transloco बनाम Intlayer (2026)"
description: "Angular i18n के लिए ngx-translate, @angular/localize, Transloco या Intlayer? रनटाइम भाषा परिवर्तन, टाइप सुरक्षा, लेज़ी लोडिंग, बहुवचन और SSR की तुलना करें।"
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - Angular अंतर्राष्ट्रीयकरण
  - ngx-translate बनाम Transloco
  - Intlayer
  - i18n लाइब्रेरी तुलना
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate बनाम Angular i18n बनाम Transloco बनाम Intlayer

Angular एकमात्र प्रमुख फ्रेमवर्क है जो अपना i18n साथ देता है। इसका तरीका समुदाय की लाइब्रेरियों से उलटा है। `@angular/localize` बिल्ड के समय अनुवाद करके हर भाषा के लिए अलग ऐप बनाता है। `ngx-translate` और Transloco रनटाइम पर JSON फ़ाइलों से अनुवाद करते हैं। Intlayer सामग्री को बिल्ड के समय कंपाइल करता है, लेकिन एक ही ऐप रखता है जिसमें रनटाइम पर भाषा बदल सकती है।

यह लेख चारों की तुलना उन बातों पर करता है जो व्यवहार में चुनाव तय करती हैं: भाषा कैसे बदलती है, सामग्री कहाँ रहती है, कंपाइलर क्या पकड़ता है और ब्राउज़र में क्या लोड होता है।

## विषय-सूची

<TOC/>

## संक्षिप्त तुलना

- **`@angular/localize`** (Angular i18n): रनटाइम पर अनुवाद का कोई खर्च नहीं और ICU का मूल समर्थन, लेकिन हर लोकेल के लिए अलग बिल्ड और डिप्लॉयमेंट चाहिए। भाषा बदलने पर ऐप फिर लोड होता है।
- **`ngx-translate`**: सबसे पुराना और सरल रनटाइम विकल्प। हर लोकेल की एक JSON फ़ाइल HTTP से आती है; कुंजियों के टाइप नहीं होते और बहुवचन के लिए प्लगइन चाहिए।
- **Transloco**: बड़े ऐप के लिए रनटाइम विकल्प। स्कोप हर फ़ीचर के अनुवाद अलग लोड करते हैं। प्लगइन ICU, लोकेल के अनुसार फ़ॉर्मैटिंग और कुंजी निकालने की सुविधा देते हैं।
- **Intlayer**: सामग्री हर कंपोनेंट के पास घोषित होती है, बिल्ड पर टाइप मिलते हैं, कंपोनेंट और लोकेल के अनुसार विभाजन होता है और रनटाइम पर भाषा बदलती है। कस्टम esbuild builder चाहिए।

> हर लाइब्रेरी की पृष्ठभूमि के लिए [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) पढ़ें।

- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)

## बिल्ड टाइम या रनटाइम: विकल्पों को बाँटने वाला निर्णय

**`@angular/localize`** अनुवादों को कंपाइल किए गए टेम्पलेट में सीधे जोड़ता है। `ng build --localize` से `dist/app/en`, `dist/app/fr` आदि बनते हैं, हर फ़ोल्डर में केवल उसकी भाषा होती है। रनटाइम पर न कुछ डाउनलोड होता है, न अनुवाद की व्याख्या होती है; इसलिए लोड होने के बाद यह सबसे तेज़ विकल्प है। कीमत संचालन में चुकानी पड़ती है: N बिल्ड जाँचना, N फ़ोल्डर डिप्लॉय करना, `/fr/` को सही फ़ोल्डर तक भेजने के लिए सर्वर या CDN नियम बनाना और भाषा बदलने पर पूरा पेज लोड करना। `ng serve` भी एक समय में केवल एक लोकेल चलाता है।

**`ngx-translate` और Transloco** में एक बिल्ड रहता है। लोकेल बदलने पर सर्विस `fr.json` लाती है और हर pipe या directive फिर रेंडर होता है। बदलाव तुरंत होता है, लेकिन पहला रेंडर HTTP अनुरोध का इंतज़ार करता है और कुंजियाँ सामान्य स्ट्रिंग होती हैं। SSR में loader को सर्वर पर भी चलना चाहिए: पूर्ण URL या फ़ाइल-सिस्टम loader और दोहरा अनुरोध रोकने के लिए `TransferState` इस्तेमाल करें।

**Intlayer** में भी एक बिल्ड रहता है, लेकिन कच्चा JSON डाउनलोड करने के बजाय सामग्री bundle में कंपाइल होती है। `useIntlayer()` एक Signal लौटाता है, इसलिए लोकेल बदलने पर उसे पढ़ने वाले कंपोनेंट बिना रीलोड के अपडेट होते हैं।

रनटाइम लाइब्रेरियों के साथ Angular की एक बात आसानी से छूट जाती है: `DatePipe`, `CurrencyPipe` और `DecimalPipe`, `LOCALE_ID` पढ़ते हैं जो bootstrap के समय तय हो जाता है। `ngx-translate` से भाषा बदलने पर तारीख और कीमत का फ़ॉर्मैट नहीं बदलता। Transloco इसे `@jsverse/transloco-locale` से हल करता है; Intlayer के `useDate`, `useNumber` और `useCurrency` सक्रिय लोकेल का अनुसरण करते हैं। `@angular/localize` में हर बिल्ड का अलग `LOCALE_ID` होता है, इसलिए यह समस्या नहीं आती। `Intl` के लिए [तारीख, समय और संख्या फ़ॉर्मैटिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/date_time_number_formatting_locales.md) देखें।

- [तारीख, समय और संख्या फ़ॉर्मैटिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/date_time_number_formatting_locales.md)

## सुविधाओं की तुलना

|                         | `@angular/localize`                               | `ngx-translate`                                 | Transloco                                     | Intlayer                                                  |
| :---------------------- | :------------------------------------------------ | :---------------------------------------------- | :-------------------------------------------- | :-------------------------------------------------------- |
| **अनुवाद लागू होना**      | बिल्ड पर सीधे जुड़ता है                                | रनटाइम                                          | रनटाइम                                        | बिल्ड पर कंपाइल, रनटाइम पर समाधान                           |
| **हर रिलीज़ के बिल्ड**     | हर लोकेल का एक                                     | एक                                              | एक                                            | एक                                                        |
| **लोकेल बदलना**          | दूसरे बिल्ड का पेज रीलोड                              | तुरंत                                             | तुरंत                                           | तुरंत                                                       |
| **सामग्री का स्थान**      | स्रोत टेम्पलेट में, अनुवाद XLIFF/JSON में                  | हर लोकेल का JSON                                 | हर लोकेल और स्कोप का JSON                       | कंपोनेंट के पास `.content.ts`/JSON या केंद्रीय रूप से              |
| **बहुवचन / ICU**         | ✅ टेम्पलेट में मूल ICU                                 | ⚠️ `ngx-translate-messageformat-compiler` प्लगइन | ⚠️ `@jsverse/transloco-messageformat` प्लगइन   | ✅ CLDR नियमों वाला `plural()`, ⚠️ ICU स्ट्रिंग का आंशिक समर्थन |
| **कुंजियों के टाइप**        | लागू नहीं, स्रोत पाठ ही संदेश है                        | ❌ नहीं                                          | ❌ नहीं, Keys Manager CLI से गायब कुंजियाँ खोजता है | ✅ स्वतः बनते हैं, गलत कुंजी से `ng build` विफल                  |
| **गायब अनुवाद**          | बिल्ड चेतावनी या `i18nMissingTranslation` से त्रुटि    | रनटाइम पर मूल कुंजी दिखती है                        | रनटाइम पर वैकल्पिक भाषा, CLI जाँच                | TypeScript में संकेत, CI में `intlayer test`                    |
| **लेज़ी लोडिंग**           | ज़रूरी नहीं, हर बिल्ड में एक लोकेल                       | पूरा लोकेल फ़ाइल, विभाजन मैन्युअल                     | ✅ स्कोप के अनुसार, रूट या कंपोनेंट                  | ✅ कंपोनेंट और लोकेल के अनुसार                                  |
| **Signals**             | लागू नहीं, स्थिर पाठ                                 | Pipe और Observable                              | `translateSignal()`                           | `useIntlayer()` Signal लौटाता है                           |
| **बिल्ड सेटअप**           | `ng add @angular/localize`, `angular.json` में लोकेल | कुछ नहीं                                          | कुछ नहीं                                        | `@angular-builders/custom-esbuild` और esbuild प्लगइन       |
| **अनुवादक का कार्यप्रवाह** | ✅ TMS के अनुकूल XLIFF                               | JSON                                            | JSON                                          | `.content.ts`/JSON, सिंक प्लगइन, विज़ुअल एडिटर, CLI में AI भरना |

कुछ पंक्तियों के लिए संदर्भ ज़रूरी है।

**`@angular/localize` में संदेश ID।** कस्टम ID (`i18n="@@cartTitle"`) न देने पर संदेश का ID स्रोत पाठ का hash होता है। अंग्रेज़ी में टाइपो ठीक करने से उस संदेश के सभी अनुवाद अपना संबंध खो देते हैं, जब तक अनुवादक उन्हें फिर नहीं संभालते। शुरुआत से कस्टम ID दें।

**`ngx-translate` में विभाजन।** डिफ़ॉल्ट loader पूरा `fr.json` डाउनलोड करता है, इसलिए हर पेज में बाकी सभी पेज की स्ट्रिंग भी आती हैं। कस्टम loader या कई `TranslateService` इंस्टेंस से फ़ीचर के अनुसार बाँट सकते हैं, लेकिन इसे लागू करवाने की गारंटी नहीं है। [कंपोनेंट-आधारित बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md) में इसकी तुलना है।

- [कंपोनेंट-आधारित बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)

**Transloco में स्कोप।** स्कोप JSON फ़ाइलों का फ़ोल्डर है, जैसे `i18n/cart/en.json`, जो रूट या कंपोनेंट द्वारा दिए जाने पर लोड होता है। रनटाइम लाइब्रेरियों में यह कंपोनेंट-आधारित सामग्री के सबसे करीब है। यह तब तक अच्छा काम करता है जब तक साझा कंपोनेंट दूसरे फ़ीचर के स्कोप में नहीं जाते।

**Intlayer का builder।** Angular CLI, esbuild प्लगइन उपलब्ध नहीं कराता, इसलिए `angular.json` में `@angular-builders/custom-esbuild` चाहिए। बदलाव छोटा है, लेकिन Angular अपग्रेड के साथ तीसरे पक्ष के builder की संगतता बनाए रखनी होती है। पूरा कॉन्फ़िगरेशन [Angular सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md) में है।

- [Angular सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)

## कमिट गतिविधि

`@angular/localize`, `angular/angular` monorepo में है। कमिट संख्या सीधे तुलनीय नहीं है, इसलिए इसे शामिल नहीं किया गया है।

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm डाउनलोड

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

डाउनलोड वर्तमान चुनाव से अधिक इतिहास दिखाते हैं: Transloco से पहले बने ऐप अब भी `ngx-translate` इंस्टॉल करते हैं। AI सहायक भी उसे सुझाते रहते हैं क्योंकि प्रशिक्षण कोड में उसकी अधिकता है। Transloco 2024 में `@ngneat/transloco` से `@jsverse/transloco` पर गया, लेकिन पुराना स्कोप अब भी डाउनलोड होता है।

## हर लाइब्रेरी से वही कंपोनेंट

शीर्षक और बहुवचन वाला कार्ट सारांश। टेम्पलेट लगभग समान रहता है; बदलता यह है कि स्ट्रिंग कहाँ रहती हैं और कंपाइलर उनके बारे में क्या जानता है।

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

अंग्रेज़ी पाठ टेम्पलेट में रहता है। अनुवादक निकाले गए XLIFF पर काम करते हैं और हर लोकेल का अलग बिल्ड बनता है। TypeScript की स्ट्रिंग `$localize` टैग इस्तेमाल करती हैं।

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="अंग्रेज़ी">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="फ़्रेंच">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU बहुवचन केवल `ngx-translate-messageformat-compiler` के साथ चलता है। डिफ़ॉल्ट parser सिर्फ़ `{{count}}` बदलता है। `"cart.titel"` कंपाइल हो जाता है, लेकिन रनटाइम पर मूल कुंजी दिखती है।

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="अंग्रेज़ी">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="फ़्रेंच">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

कंपोनेंट के पहले रेंडर पर `cart` स्कोप आता है। ICU बहुवचन के लिए `@jsverse/transloco-messageformat` चाहिए। कुंजियों के टाइप नहीं हैं; `transloco-keys-manager` गायब और अप्रयुक्त कुंजियाँ बताता है।

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ hi: "आपका कार्ट", en: "Your cart", fr: "Votre panier" }),
    items: t({
      hi: plural({ one: "{{count}} वस्तु", other: "{{count}} वस्तुएँ" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

सभी लोकेल कंपोनेंट के पास एक फ़ाइल में हैं। बिल्ड पर टाइप बनते हैं, इसलिए `content().titel` से `ng build` विफल होता है और `t()` में गायब लोकेल एडिटर में दिखता है।

  </Tab>
</Tabs>

## आपके ऐप के लिए कौन-सा विकल्प

<AccordionGroup>
<Accordion header="सार्वजनिक साइट, कम इंटरैक्शन, SEO प्राथमिकता">

`@angular/localize`। हर लोकेल का अपना बिल्ड और URL है, prerender किए गए पेज पहले से अनूदित आते हैं और i18n runtime लोड नहीं करना पड़ता। मुख्यतः सामग्री वाले ऐप में, जहाँ भाषा कम बदलती है, प्रति-लोकेल बिल्ड की लागत कम रहती है। सही `hreflang` टैग भी दें; [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

- [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="डैशबोर्ड या SaaS जहाँ उपयोगकर्ता ऐप के भीतर भाषा बदलते हैं">

रनटाइम विकल्प चुनें। दूसरा बिल्ड लोड करने से मेमोरी में रखी स्थिति खो जाती है और भाषा मेन्यू से पूरा ऐप रीलोड होना खराब अनुभव देता है। दो-तीन लोकेल वाले छोटे ऐप में `ngx-translate` पर्याप्त है। लगभग दर्जन भर से अधिक फ़ीचर होने पर स्कोप के कारण Transloco बेहतर रनटाइम चुनाव है।

</Accordion>
<Accordion header="अनुवाद TMS या एजेंसी से आते हैं">

`@angular/localize` XLIFF निर्यात करता है जिसे हर TMS पढ़ सकता है। टेम्पलेट का स्रोत पाठ अनुवादक को वास्तविक संदर्भ देता है। `ngx-translate` और Transloco का JSON भी व्यापक रूप से समर्थित है। रनटाइम लाइब्रेरी चुनने से पहले जाँचें कि आपका प्रदाता ICU बहुवचन संभालता है, क्योंकि दोनों को उसके लिए प्लगइन चाहिए।

</Accordion>
<Accordion header="बड़ा ऐप, कई लेज़ी रूट, सीमित bundle आकार">

Transloco स्कोप या Intlayer। दोनों हर रूट पर हर फ़ीचर की स्ट्रिंग भेजने से बचते हैं। अंतर लागू होने की गारंटी में है: Transloco स्कोप एक परिपाटी है; Intlayer dictionary वहीं bundle होती है जहाँ `useIntlayer()` उसे import करता है। [Bundle ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [डायनामिक dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) देखें।

- [Bundle ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [डायनामिक dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="टाइप सुरक्षा अनिवार्य है">

केवल Intlayer में कुंजियों के टाइप पहले से मिलते हैं। `ngx-translate` और Transloco में गलत कुंजी कंपाइल हो जाती है और production में मूल कुंजी दिखती है। Transloco Keys Manager इसे CI में पकड़ सकता है, लेकिन वह कंपाइल त्रुटि जैसा नहीं है। [गायब अनुवाद पहचानना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) में तरीकों की तुलना है।

- [गायब अनुवाद पहचानना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md)

</Accordion>
<Accordion header="अनुवाद AI से बनाए जाएँगे">

कंपोनेंट के पास सामग्री और गायब लोकेल भरने वाला CLI सबसे सीधा रास्ता है। Intlayer का [`fill` कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) आपकी API key से चलता है और केवल बदली सामग्री का फिर अनुवाद करता है। XLIFF या JSON कैटलॉग में यही प्रक्रिया आपको खुद स्क्रिप्ट करनी होगी।

- [`fill` कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md)

</Accordion>
</AccordionGroup>

## हर विकल्प की कमियाँ

- **`@angular/localize`**: हर लोकेल के लिए बिल्ड और डिप्लॉयमेंट, भाषा बदलने पर रीलोड, स्रोत बदलने से hash ID वाले अनुवाद का संबंध टूटना। बिल्ड के बाद CMS से अनुवाद लाने के लिए bootstrap में विशेष उपाय चाहिए।
- **`ngx-translate`**: कुंजियों के टाइप नहीं, बहुवचन और ICU के लिए प्लगइन, हर पेज पर पूरा लोकेल फ़ाइल, हर change detection पर फिर मूल्यांकन करने वाला impure pipe और तारीखों व संख्याओं के लिए `LOCALE_ID` प्रबंधन नहीं।
- **Transloco**: कुंजियों के टाइप नहीं, ICU के लिए प्लगइन और स्कोप केवल परिपाटी हैं, गारंटी नहीं। `@angular/localize` की मूल सुविधाएँ पाने के लिए कई प्लगइन जोड़ने पड़ते हैं।
- **Intlayer**: `angular.json` में तीसरे पक्ष का builder, बाकी तीन से छोटा Angular समुदाय और आंशिक ICU समर्थन। सामग्री जानबूझकर codebase में फैली रहती है; अनुवादक के लिए एक फ़ाइल निर्यात करने को [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) या CLI चाहिए।

- [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)

## ngx-translate से माइग्रेशन

[`@intlayer/ngx-translate` कम्पैटिबिलिटी एडाप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/ngx-translate.md), Intlayer से सामग्री देते हुए `TranslateService`, `translate` pipe और `[translate]` directive चलने देता है। इसलिए टेम्पलेट एक-एक करके बदले जा सकते हैं। प्रक्रिया [माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_ngx-translate_to_intlayer.md) में है। Transloco या `@angular/localize` से जाते समय [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) मौजूदा JSON कैटलॉग को प्रामाणिक स्रोत बनाए रख सकता है।

- [`@intlayer/ngx-translate` कम्पैटिबिलिटी एडाप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/ngx-translate.md)
- [माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_ngx-translate_to_intlayer.md)
- [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md)

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>
<Question title="क्या ngx-translate का रखरखाव अब भी होता है?">

हाँ। कई वर्षों की कम गतिविधि के बाद 2024 में नया maintainer आया और तब से `provideTranslateService` जैसी standalone API जारी हुई हैं। डिज़ाइन वही है: रनटाइम JSON, स्ट्रिंग कुंजियाँ और प्लगइन से बहुवचन।

</Question>
<Question title="नए Angular ऐप में ngx-translate या Transloco?">

Transloco, जब तक ऐप छोटा न हो। यह `ngx-translate` की सुविधाओं के साथ स्कोप, Signal helper, SSR मार्गदर्शन और कुंजी उपकरण देता है। दोनों API इतनी मिलती हैं कि बाद में बदलना अधिकतर यांत्रिक काम है, लेकिन बढ़ने वाले ऐप में सरल विकल्प से शुरुआत करने की ज़रूरत नहीं।

</Question>
<Question title="क्या @angular/localize बिना रीलोड भाषा बदल सकता है?">

मूल डिज़ाइन में नहीं। अनुवाद बिल्ड पर जुड़ते हैं, इसलिए दूसरी भाषा का मतलब दूसरा बिल्ड है। bootstrap से पहले `loadTranslations()` चलाकर रनटाइम पर अनुवाद लोड कर सकते हैं, लेकिन बदलने के लिए ऐप फिर शुरू करना पड़ता है।

</Question>
<Question title="Angular SEO के लिए सबसे अच्छा विकल्प कौन-सा है?">

लाइब्रेरी से अधिक रूटिंग मायने रखती है: हर लोकेल का URL, `hreflang` टैग, `<html lang>` और सर्वर पर रेंडर किया गया अनूदित HTML। `@angular/localize` में हर लोकेल का अलग बिल्ड होने से यह आसान है। रनटाइम लाइब्रेरियों को इसके लिए SSR और स्थानीयकृत रूट चाहिए। [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md) देखें।

- [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md)

</Question>
<Question title="क्या Intlayer, Analog के साथ काम करता है?">

हाँ, Vite के माध्यम से। [Analog गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_analog.md) देखें।

- [Analog गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_analog.md)

</Question>
</FAQ>

## आगे पढ़ें

- [Angular 22 में Intlayer सेटअप](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)
- [Angular 19 में Intlayer सेटअप](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_19.md)
- [i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md)
- [कंपाइलर बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
- [ICU संदेश फ़ॉर्मैट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/icu_message_format.md)
- [कम्पैटिबिलिटी एडाप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)

अन्य फ्रेमवर्क के लिए यही तुलना:

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_solid_i18n_library.md)
