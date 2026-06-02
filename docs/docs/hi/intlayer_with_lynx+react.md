---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Lynx + React ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Lynx + React ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
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
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
---

# Intlayer के साथ अपना Lynx and React mobile app अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

[एप्लीकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-lynx-template) पर देखें।

## विकल्पों पर इन्टलेयर क्यों?

`रिएक्ट-नेटिव-लोकलाइज़` या `i18next` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण लिंक्स कवरेज**

इंटलेयर को **घटक-स्तरीय सामग्री स्कोपिंग**, **टाइपस्क्रिप्ट समर्थन**, और स्केलिंग अंतर्राष्ट्रीयकरण (i18n) के लिए आवश्यक सभी सुविधाओं की पेशकश करके लिंक्स और रिएक्ट के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

**रखरखाव**

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

**एआई एजेंट**

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[एजेंट कौशल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

**स्वचालन**

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

**प्रदर्शन**

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

**किसी भी देव के साथ स्केलिंग**

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

---

## चरण 1: निर्भरताएँ स्थापित करें

अपने लिनक्स प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bun x intlayer init
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> सामग्री घोषणाओं पर विवरण के लिए, [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

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

```bash
#  Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
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
- **CLI कमांड्स**: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) का अन्वेषण करें जैसे **अनुवाद निकालना** या **लापता कुंजियों की जाँच करना।**

---
