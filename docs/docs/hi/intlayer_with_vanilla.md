---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - 2026 में Vanilla JS ऐप का अनुवाद कैसे करें
description: जानें कि अपनी Vanilla JS वेबसाइट को बहुभाषी कैसे बनाया जाए। इसे अंतरराष्ट्रीय बनाने (i18n) और अनुवाद करने के लिए दस्तावेज़ों का पालन करें।
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "इतिहास प्रारंभ"
---

# Intlayer का उपयोग करके अपनी Vanilla JS वेबसाइट का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

## विषय-सूची

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप यह कर सकते हैं:

- घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके **आसानी से अनुवाद प्रबंधित करें**।
- **मेटाडेटा, रूट और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वतः जनित प्रकारों के साथ, स्वतः पूर्णता और त्रुटि पहचान में सुधार करें।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

यह मार्गदर्शिका दिखाती है कि Vanilla JavaScript एप्लिकेशन में **पैकेज मैनेजर या बंडलर का उपयोग किए बिना** (जैसे Vite, Webpack, आदि) Intlayer का उपयोग कैसे करें।

यदि आपका एप्लिकेशन बंडलर (जैसे Vite) का उपयोग करता है, तो हम इसके बजाय [Vite + Vanilla JS गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vanilla.md) का पालन करने की सलाह देते हैं।

स्टैंडअलोन बंडल का उपयोग करके, आप Intlayer को सीधे अपनी HTML फ़ाइलों में एक एकल JavaScript फ़ाइल के माध्यम से आयात कर सकते हैं, जो इसे पुराने प्रोजेक्ट्स या सरल स्थैतिक साइटों के लिए उपयुक्त बनाता है।

---

## Vanilla JS एप्लिकेशन में Intlayer सेट करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

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

### चरण 2: आपके प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, अपनी सामग्री घोषणाओं का स्थान और एक्सटेंशन सेट कर सकते हैं, कंसोल में Intlayer लॉग को अक्षम कर सकते हैं, और बहुत कुछ। उपलब्ध मानकों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: अपने HTML में बंडल आयात करें

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

### चरण 4: अपने प्रवेश बिंदु में Intlayer को बूटस्ट्रैप करें

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

### चरण 5: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएँ और प्रबंधित करें:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Vite लोगो पर क्लिक करके और जानें",
    }),
  },
};

module.exports = appContent;
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

> आपकी सामग्री घोषणाएँ आपके एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जैसे ही वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./src`) में शामिल होती हैं। और सामग्री घोषणा फ़ाइल एक्सटेंशन (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) से मेल खाती हैं।
>
> अधिक विवरण के लिए, [सामग्री घोषणा दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

### चरण 6: अपने JavaScript में Intlayer का उपयोग करें

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

### (ऐच्छिक) चरण 7: अपनी सामग्री की भाषा बदलें

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

### (ऐच्छिक) चरण 8: HTML भाषा और दिशा विशेषताएँ स्विच करें

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

### (ऐच्छिक) चरण 9: प्रति लोकेल शब्दकोशों को आलसी-लोड (Lazy-load) करें

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
