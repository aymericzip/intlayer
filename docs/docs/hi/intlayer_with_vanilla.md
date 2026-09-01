---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Vanilla JS ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.4.10
    date: 2026-03-31
    changes: "इतिहास प्रारंभ"
author: aymericzip
---

# Intlayer का उपयोग करके अपनी Vanilla JS वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय-सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`i18next` या `i18n.js` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण वेनिला जेएस कवरेज">

इंटलेयर को **फ्रेमवर्क-अज्ञेयवादी सामग्री प्रबंधन**, **टाइपस्क्रिप्ट समर्थन**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके वेनिला जावास्क्रिप्ट के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

</Accordion>

<Accordion header="Bundle size">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI Agent">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="ऑटोमेशन">

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="Performance">

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="किसी भी देव के साथ स्केलिंग">

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

---

## Vanilla JS एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
# intlayer और vanilla-intlayer का स्टैंडअलोन बंडल जनरेट करें
# यह फ़ाइल आपकी HTML फ़ाइल में आयात की जाएगी
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# कॉन्फ़िगरेशन फ़ाइल के साथ intlayer प्रारंभ करें
npx intlayer init --no-gitignore

# शब्दकोश बनाएँ
npx intlayer build
```

```bash packageManager="pnpm"
# intlayer और vanilla-intlayer का स्टैंडअलोन बंडल जनरेट करें
# यह फ़ाइल आपकी HTML फ़ाइल में आयात की जाएगी
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# कॉन्फ़िगरेशन फ़ाइल के साथ intlayer प्रारंभ करें
pnpm intlayer init --no-gitignore

# शब्दकोश बनाएँ
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayer और vanilla-intlayer का स्टैंडअलोन बंडल जनरेट करें
# यह फ़ाइल आपकी HTML फ़ाइल में आयात की जाएगी
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer कॉन्फ़िगरेशन फ़ाइल, TypeScript यदि सेट किया गया है, env var प्रारंभ करें
yarn intlayer init --no-gitignore

# शब्दकोश बनाएँ
yarn intlayer build
```

```bash packageManager="bun"
# intlayer और vanilla-intlayer का स्टैंडअलोन बंडल जनरेट करें
# यह फ़ाइल आपकी HTML फ़ाइल में आयात की जाएगी
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# कॉन्फ़िगरेशन फ़ाइल के साथ intlayer प्रारंभ करें
bun x intlayer init --no-gitignore

# शब्दकोश बनाएँ
bun x intlayer build
```

- **intlayer**
  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md), ट्रांसपाइलेशन और [CLI कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के लिए अंतर्राष्ट्रीयकरण उपकरण प्रदान करता है।

- **vanilla-intlayer**
  वह पैकेज जो Intlayer को शुद्ध JavaScript / TypeScript अनुप्रयोगों के साथ एकीकृत करता है। यह एक पब/सब सिंगलटन (`IntlayerClient`) और कॉलबैक-आधारित सहायक (`useIntlayer`, `useLocale`, आदि) प्रदान करता है ताकि आपके ऐप का कोई भी हिस्सा बिना किसी UI फ्रेमवर्क पर निर्भर हुए लोकेल परिवर्तनों पर प्रतिक्रिया कर सके।

> `intlayer standalone` CLI का बंडलिंग एक्सपोर्ट अनुपयोगित पैकेज, लोकेल और आपके कॉन्फ़िगरेशन के लिए विशिष्ट गैर-जरूरी लॉजिक (जैसे रीडायरेक्ट या प्रीफ़िक्स) को ट्री-शेकिंग (tree-shaking) के माध्यम से हटाकर एक अनुकूलित बिल्ड तैयार करता है।

</Step>

<Step number={2} title="आपके प्रोजेक्ट का कॉन्फ़िगरेशन">

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य लोकेल
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध मानकों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपने HTML में बंडल आयात करें">

एक बार जब आप `intlayer.js` बंडल जनरेट कर लेते हैं, तो आप इसे अपनी HTML फ़ाइल में आयात कर सकते हैं:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />

    <!-- बंडल आयात करें -->
    <script src="./intlayer.js" defer></script>
    <!-- अपनी मुख्य स्क्रिप्ट आयात करें -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

बंडल `window` पर वैश्विक ऑब्जेक्ट के रूप में `Intlayer` और `VanillaIntlayer` को उजागर करता है।

</Step>

<Step number={4} title="अपने प्रवेश बिंदु में Intlayer को बूटस्ट्रैप करें">

अपने `src/main.js` में, किसी भी सामग्री को रेंडर करने से **पहले** `installIntlayer()` कॉल करें ताकि वैश्विक लोकेल सिंगलटन तैयार हो जाए।

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// किसी भी i18n सामग्री को रेंडर करने से पहले कॉल किया जाना चाहिए।
installIntlayer();
```

यदि आप मार्कडाउन रेंडरर का भी उपयोग करना चाहते हैं, तो `installIntlayerMarkdown()` कॉल करें:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="अपनी सामग्री घोषित करें">

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "अधिक जानने के लिए Vite लोगो पर क्लिक करें",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जैसे ही वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल होती हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) से मेल खाती हैं।
>
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={6} title="अपने JavaScript में Intlayer का उपयोग करें">

`window.VanillaIntlayer` ऑब्जेक्ट API सहायक प्रदान करता है: `useIntlayer(key, locale?)` किसी दिए गए कुंजी के लिए अनुवादित सामग्री लौटाता है।

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// वर्तमान लोकेल के लिए प्रारंभिक सामग्री प्राप्त करें।
// जब भी लोकेल बदलता है तो सूचित होने के लिए .onChange() जोड़ें।
const content = useIntlayer("app").onChange((newContent) => {
  // केवल प्रभावित DOM नोड्स को पुनः रेंडर या पैच करें
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// प्रारंभिक रेंडर
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> लीफ़ मानों को `String()` में लपेटकर स्ट्रिंग के रूप में एक्सेस करें, जो नोड की `toString()` विधि को कॉल करता है और अनुवादित पाठ लौटाता है।
>
> जब आपको मूल HTML विशेषता (जैसे `alt`, `aria-label`) के मान की आवश्यकता हो, तो सीधे `.value` का उपयोग करें:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

अपनी सामग्री की भाषा बदलने के लिए, `useLocale` द्वारा उजागर `setLocale` फ़ंक्शन का उपयोग करें।

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "भाषा");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // जब लोकेल कहीं और से बदलता है तो ड्रॉपडाउन को सिंक में रखें
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="HTML भाषा और दिशा विशेषताएँ स्विच करें" isOptional={true}>

एक्सेसिबिलिटी और SEO के लिए `<html>` टैग की `lang` और `dir` विशेषताओं को वर्तमान लोकेल से मिलान करने के लिए अपडेट करें।

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="प्रति लोकेल शब्दकोशों को आलसी-लोड (Lazy-load) करें" isOptional={true}>

यदि आप प्रति लोकेल शब्दकोशों को आलसी-लोड करना चाहते हैं, तो आप `useDictionaryDynamic` का उपयोग कर सकते हैं। यह उपयोगी है यदि आप प्रारंभिक `intlayer.js` फ़ाइल में सभी अनुवादों को बंडल नहीं करना चाहते हैं।

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> नोट: `useDictionaryDynamic` के लिए शब्दकोशों को अलग ESM फ़ाइलों के रूप में उपलब्ध होना आवश्यक है। यह दृष्टिकोण आमतौर पर तब उपयोग किया जाता है जब आपके पास शब्दकोश परोसने वाला वेब सर्वर होता है।
> </Step>

</Steps>

### TypeScript कॉन्फ़िगर करें

सुनिश्चित करें कि आपके TypeScript कॉन्फ़िगरेशन में स्वतः जनित प्रकार शामिल हैं।

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** स्थापित कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **स्वतः पूर्णता**।
- गुम अनुवादों के लिए **वास्तविक समय त्रुटि पहचान**।
- अनुवादित सामग्री का **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित कार्य**।

एक्सटेंशन का उपयोग करने के तरीके के बारे में अधिक विवरण के लिए, [Intlayer VS Code एक्सटेंशन दस्तावेज़ीकरण](https://intlayer.org/doc/vs-code-extension) देखें।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके अपनी सामग्री को बाहरी बना सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या मैं बिना किसी बंडलर या फ्रेमवर्क के Intlayer का उपयोग कर सकता हूँ?">

हाँ। यह गाइड विशेष रूप से उस मामले के लिए समर्पित है। आप `vanilla-intlayer` बंडल को सीधे HTML में शामिल करते हैं, इसे प्रारंभ करते हैं, और `useIntlayer` या `getIntlayer` के माध्यम से सामग्री पढ़ते हैं।

</Question>

<Question title="i18n मेरे पृष्ठ के भार को कितना बढ़ाता है?">

पारंपरिक कैटलॉग की तुलना में बहुत कम, क्योंकि पृष्ठ कभी भी उस भाषा को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सामग्री अनुकूलित प्रारूपों में वितरित की जाती है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मैं अपनी स्क्रिप्ट को फिर से लिखे बिना i18next से माइग्रेट कर सकता हूँ?">

काफी हद तक हाँ। [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) का पालन करें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूर्ण स्वचालन के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) बिल्ड समय पर यही काम करता है और प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="सादे JavaScript वेबसाइट के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **मैन्युअल शब्दकोश ऑब्जेक्ट**: बिना प्रकार या सत्यापन उपकरण के।
- **`i18next`**: रनटाइम के लिए सामान्य लाइब्रेरी।
- **`Intlayer`**: सामग्री फ़ाइल में घोषणा, वैकल्पिक बिल्ड समय संकलन, प्रकार, विज़ुअल एडिटर और CMS।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="अनुवाद कैसे पढ़ें और इसे DOM में कैसे डालें?">

शब्दकोश कुंजी के साथ `useIntlayer` को कॉल करें और मान को मैन्युअल रूप से DOM नोड में असाइन करें, जैसा कि चरण 6 में दिखाया गया है।

</Question>

<Question title="विज़िटर की भाषा का पता कैसे लगाया जाता है?">

`routing.storage` में स्रोतों से: आमतौर पर पहले कुकी, फिर `Accept-Language` हेडर, और डिफ़ॉल्ट भाषा पर वापस लौटता है। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Question>

<Question title="दाएं से बाएं भाषाओं का समर्थन कैसे करें?">

चरण 8 इसे समझाता है। `getHTMLTextDir` `ltr`, `rtl`, या `auto` लौटाता है, जिससे आप `html` या `body` तत्व पर `lang` और `dir` विशेषताएँ सेट कर सकते हैं।

</Question>

<Question title="क्या विज़िटर्स को प्रत्येक भाषा डाउनलोड करनी पड़ती है?">

नहीं, यदि आप ऐसा नहीं चाहते हैं। चरण 9 प्रति लोकेल शब्दकोशों की लेज़ी लोडिंग को कवर करता है, जिससे पृष्ठ केवल सक्रिय भाषा लोड करता है।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। यह कमांड आपके चुने हुए LLM का उपयोग करके आपके अपने प्रदाता और API कुंजी के साथ लापता अनुवादों को भरता है, और `--git-diff` बदली गई फ़ाइलों तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer बहुवचन, लिंग और समृद्ध पाठ (rich text) का समर्थन करता है?">

हाँ: [बहुवचन (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/plurial.md), [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [सम्मिलन (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md), और संख्याओं, तिथियों और मुद्राओं के लिए [प्रारूपक (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md)।

</Question>

<Question title="अनुवादक कोड को छुए बिना सामग्री को कैसे संपादित कर सकते हैं?">

[विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) के माध्यम से, जो किसी को भी सीधे चलते हुए ऐप में टेक्स्ट संपादित करने देता है, या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के माध्यम से, जो सामग्री को अलग करता है ताकि कोड को फिर से तैनात किए बिना उसे अपडेट किया जा सके।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ, Apache 2.0 लाइसेंस के तहत, व्यावसायिक उपयोग सहित। होस्टेड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
