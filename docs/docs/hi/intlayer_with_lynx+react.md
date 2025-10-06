---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: अपना Lynx and React mobile app ऐप कैसे अनुवाद करें – i18n गाइड 2025
description: ​लिनक्स और रिएक्ट मोबाइल ऐप को बहुभाषी बनाने के लिए जानें। इसे अंतर्राष्ट्रीयकृत (i18n) और अनुवादित करने के लिए दस्तावेज़ का पालन करें।​
keywords:
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
---

# Intlayer के साथ अपना Lynx and React mobile app अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

[एप्लीकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-lynx-template) पर देखें।

## इंटलेयर क्या है?

**इंटलेयर** एक **नवोन्मेषी, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी** है जो आधुनिक अनुप्रयोगों में बहुभाषीय समर्थन को सरल बनाती है। यह कई जावास्क्रिप्ट/टाइपस्क्रिप्ट वातावरणों में काम करती है, **लिनक्स सहित** (`react-intlayer` पैकेज के माध्यम से)।

इंटलेयर के साथ, आप कर सकते हैं:

- **आसानी से अनुवाद प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ।
- **सामग्री को गतिशील रूप से स्थानीयकृत करें**, जिसमें **यूआई स्ट्रिंग्स** शामिल हैं (और वेब के लिए रिएक्ट में, यह HTML मेटाडेटा आदि को भी स्थानीयकृत कर सकता है)।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

---

## चरण 1: निर्भरताएँ स्थापित करें

अपने लिनक्स प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### पैकेज

- **intlayer**  
  कॉन्फ़िगरेशन, शब्दकोश सामग्री, प्रकार जनरेशन, और CLI कमांड्स के लिए मुख्य i18n टूलकिट।

- **react-intlayer**  
  रिएक्ट एकीकरण जो संदर्भ प्रदाताओं और रिएक्ट हुक प्रदान करता है जिन्हें आप लिनक्स में लोकेल प्राप्त करने और स्विच करने के लिए उपयोग करेंगे।

- **lynx-intlayer**  
  लिनक्स एकीकरण जो इंटलेयर को लिनक्स बंडलर के साथ एकीकृत करने के लिए प्लगइन प्रदान करता है।

---

## चरण 2: एक इंटलेयर कॉन्फ़िग बनाएं

अपने प्रोजेक्ट रूट (या कहीं भी सुविधाजनक) में, एक **इंटलेयर कॉन्फ़िग** फ़ाइल बनाएं। यह इस प्रकार दिख सकती है:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... अन्य लोकेल्स जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... अन्य लोकेल्स जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

इस कॉन्फ़िग में, आप कर सकते हैं:

- अपने **समर्थित लोकेल्स की सूची** कॉन्फ़िगर करें।
- एक **डिफ़ॉल्ट** लोकेल सेट करें।
- बाद में, आप अधिक उन्नत विकल्प जोड़ सकते हैं (जैसे, लॉग्स, कस्टम सामग्री निर्देशिकाएँ, आदि)।
- अधिक जानकारी के लिए [इंटलेयर कॉन्फ़िगरेशन डॉक्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## चरण 3: लिनक्स बंडलर में इंटलेयर प्लगइन जोड़ें

लिनक्स के साथ इंटलेयर का उपयोग करने के लिए, आपको अपने `lynx.config.ts` फ़ाइल में प्लगइन जोड़ने की आवश्यकता है:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... अन्य प्लगइन्स
    pluginIntlayerLynx(),
  ],
});
```

## चरण 4: इंटलेयर प्रदाता जोड़ें

अपने एप्लिकेशन में उपयोगकर्ता भाषा को सिंक्रनाइज़ रखने के लिए, आपको अपने रूट घटक को `react-intlayer` से `IntlayerProvider` घटक के साथ रैप करना होगा।

साथ ही, आपको यह सुनिश्चित करने के लिए `intlayerPolyfill` फ़ंक्शन फ़ाइल जोड़नी होगी कि इंटलेयर सही ढंग से काम कर सके।

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

// इंटलेयर पॉलिफिल लागू करें
intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## चरण 5: अपनी सामग्री घोषित करें

अपने प्रोजेक्ट में कहीं भी **सामग्री घोषणा** फ़ाइलें बनाएं (आमतौर पर `src/` के भीतर), किसी भी एक्सटेंशन प्रारूप का उपयोग करके जिसे इंटलेयर समर्थन करता है:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- आदि।

उदाहरण:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      hi: "लिनक्स पर",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      hi: "लोगो पर टैप करें और मज़े करें!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        hi: "संपादित करें",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        hi: "अपडेट देखने के लिए!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      hi: "लिनक्स पर",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      hi: "लोगो पर टैप करें और मज़े करें!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        hi: "संपादित करें",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        hi: "अपडेट देखने के लिए!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      hi: "लिनक्स पर",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      hi: "लोगो पर टैप करें और मज़े करें!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        hi: "संपादित करें",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        hi: "अपडेट देखने के लिए!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "hi": "React",
        "en": "React",
        "fr": "React",
        "es": "React"
      }
    },
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "hi": "लिनक्स पर",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "hi": "लोगो पर टैप करें और मज़े करें!",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "hi": "संपादित करें",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "hi": "अपडेट देखने के लिए!",
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> सामग्री घोषणाओं पर विवरण के लिए, [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

---

## चरण 4: अपने घटकों में Intlayer का उपयोग करें

स्थानीयकृत सामग्री प्राप्त करने के लिए बाल घटकों में `useIntlayer` हुक का उपयोग करें।

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    // केवल पृष्ठभूमि
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> जब स्ट्रिंग-आधारित प्रॉप्स (जैसे, बटन का `title` या `Text` घटक का `children`) में `content.someKey` का उपयोग करते हैं, **वास्तविक स्ट्रिंग प्राप्त करने के लिए `content.someKey.value` कॉल करें।**

---

## (वैकल्पिक) चरण 5: ऐप का स्थानीय सेटिंग बदलें

अपने घटकों से स्थानीय सेटिंग बदलने के लिए, आप `useLocale` हुक के `setLocale` मेथड का उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

यह Intlayer सामग्री का उपयोग करने वाले सभी घटकों का पुनः रेंडर ट्रिगर करता है, जो अब नई स्थानीय सेटिंग के लिए अनुवाद दिखा रहे हैं।

> अधिक विवरण के लिए [`useLocale` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

## TypeScript कॉन्फ़िगर करें (यदि आप TypeScript का उपयोग करते हैं)

Intlayer टाइप परिभाषाएँ एक छिपे हुए फ़ोल्डर (डिफ़ॉल्ट रूप से `.intlayer`) में उत्पन्न करता है ताकि ऑटो-कम्प्लीशन में सुधार हो और अनुवाद त्रुटियों को पकड़ा जा सके:

```json5
// tsconfig.json
{
  // ... आपका मौजूदा TS कॉन्फ़िग
  "include": [
    "src", // आपका स्रोत कोड
    ".intlayer/types/**/*.ts", // <-- सुनिश्चित करें कि ऑटो-जनरेटेड टाइप्स शामिल हैं
    // ... जो कुछ भी आप पहले से शामिल करते हैं
  ],
}
```

यह निम्नलिखित सुविधाओं को सक्षम करता है:

- **ऑटो-कम्प्लीशन** आपके शब्दकोश कुंजियों के लिए।
- **टाइप चेकिंग** जो चेतावनी देता है यदि आप एक गैर-मौजूद कुंजी तक पहुँचते हैं या प्रकार का मिलान नहीं होता है।

---

## Git कॉन्फ़िगरेशन

Intlayer द्वारा उत्पन्न ऑटो-जनरेटेड फ़ाइलों को कमिट करने से बचने के लिए, अपने `.gitignore` में निम्नलिखित जोड़ें:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

---

### VS Code एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- **अनुवाद कुंजियों के लिए ऑटो-कम्प्लीशन**।
- **लापता अनुवादों के लिए रियल-टाइम त्रुटि पहचान**।
- **अनुवादित सामग्री के इनलाइन पूर्वावलोकन**।
- **अनुवादों को आसानी से बनाने और अपडेट करने के लिए त्वरित क्रियाएं**।
  Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- लापता अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए देखें [Intlayer VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

## आगे बढ़ें

- **विज़ुअल एडिटर**: अनुवादों को विज़ुअली प्रबंधित करने के लिए [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) का उपयोग करें।
- **CMS एकीकरण**: आप अपने शब्दकोश सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) से बाहरीकरण और प्राप्त भी कर सकते हैं।
- **CLI कमांड्स**: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) का अन्वेषण करें जैसे **अनुवाद निकालना** या **लापता कुंजियों की जाँच करना।**

---

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
