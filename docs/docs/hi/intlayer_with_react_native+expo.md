---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Expo + React Native ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
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

# अपने Expo और React Native ऐप का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-react-native-template) देखें।

## विकल्पों पर इन्टलेयर क्यों?

`रिएक्ट-नेटिव-लोकलाइज़` या `i18next` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण रिएक्ट नेटिव कवरेज**

इंटलेयर को **घटक-स्तरीय सामग्री स्कोपिंग**, **टाइपस्क्रिप्ट समर्थन**, और मोबाइल ऐप्स में अंतर्राष्ट्रीयकरण (i18n) को बढ़ाने के लिए आवश्यक सभी सुविधाओं की पेशकश करके रिएक्ट नेटिव और एक्सपो के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

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

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर **आपके बंडल और दृश्य आकार को 50% तक कम करने** में मदद करता है।

## चरण 1: निर्भरताएँ स्थापित करें

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-react-native-template) देखें।

अपने रिएक्ट नेटिव प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```बैश पैकेजमैनेजर='एनपीएम'
एनपीएम इंस्टाल इंटरलेयर रिएक्ट-इंटलेयर
एनपीएम इंस्टॉल--सेव-देव रिएक्ट-नेटिव-इंटलेयर
एनपीएक्स इंटलेयर इनिट
```

```बैश पैकेजमैनेजर='पीएनपीएम'
पीएनपीएम इंटरलेयर रिएक्ट-इंटलेयर जोड़ें
पीएनपीएम ऐड--सेव-देव रिएक्ट-नेटिव-इंटलेयर
पीएनपीएम इंटलेयर इनिट
```

```बैश पैकेजमैनेजर='यार्न'
यार्न इंटरलेयर प्रतिक्रिया-इंटलेयर जोड़ें
यार्न ऐड--सेव-डेव रिएक्ट-नेटिव-इंटलेयर
यार्न इंटरलेयर init
```

```बैश पैकेजमैनेजर='बन'
बन इनटलेयर प्रतिक्रिया-इंटलेयर जोड़ें
बन ऐड--देव रिएक्ट-नेटिव-इंटलेयर
बन एक्स इंटरलेयर इनिट
```

### पैकेज

- **इंटलेयर**  
  कॉन्फ़िगरेशन, शब्दकोश सामग्री, प्रकार निर्माण और सीएलआई कमांड के लिए कोर i18n टूलकिट।

- **प्रतिक्रिया-इंटलेयर**  
  रिएक्ट एकीकरण जो संदर्भ प्रदाता और रिएक्ट हुक प्रदान करता है जिसका उपयोग आप रिएक्ट नेटिव में स्थानों को प्राप्त करने और स्विच करने के लिए करेंगे।

- **प्रतिक्रिया-मूल-इंटलेयर**  
  रिएक्ट नेटिव इंटीग्रेशन जो रिएक्ट नेटिव बंडलर के साथ इंटलेयर को एकीकृत करने के लिए मेट्रो प्लगइन प्रदान करता है।

---

## चरण 1: निर्भरता स्थापित करें

अपने React Native प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```bash packageManager="npm"
bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### पैकेज

- **intlayer**  
  कॉन्फ़िगरेशन, शब्दकोश सामग्री, प्रकारों का निर्माण, और CLI कमांड के लिए मूल i18n टूलकिट।

- **react-intlayer**  
  React एकीकरण जो कॉन्टेक्स्ट प्रदाताओं और React हुक्स प्रदान करता है, जिन्हें आप React Native में स्थानीयकरण प्राप्त करने और स्विच करने के लिए उपयोग करेंगे।

- **react-native-intlayer**  
  React Native एकीकरण जो Intlayer को React Native बंडलर के साथ एकीकृत करने के लिए Metro प्लगइन प्रदान करता है।

---

## चरण 2: Intlayer कॉन्फ़िग बनाएं

अपने प्रोजेक्ट रूट (या कहीं भी सुविधाजनक) में, एक **Intlayer कॉन्फ़िग** फ़ाइल बनाएं। यह कुछ इस प्रकार दिख सकती है:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * यदि Locales प्रकार उपलब्ध नहीं है, तो अपने tsconfig.json में moduleResolution को "bundler" पर सेट करने का प्रयास करें
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... अपनी आवश्यकतानुसार अन्य स्थानीय भाषाएँ जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

इस कॉन्फ़िग में, आप कर सकते हैं:

- अपने **समर्थित स्थानीय भाषाओं की सूची** कॉन्फ़िगर करें।
- एक **डिफ़ॉल्ट** स्थानीय भाषा सेट करें।
- बाद में, आप अधिक उन्नत विकल्प जोड़ सकते हैं (जैसे, लॉग्स, कस्टम कंटेंट डायरेक्टरीज़, आदि)।
- अधिक जानकारी के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## चरण 3: मेट्रो प्लगइन जोड़ें

मेट्रो React Native के लिए एक बंडलर है। यह `react-native init` कमांड से बनाए गए React Native प्रोजेक्ट्स के लिए डिफ़ॉल्ट बंडलर है। Intlayer को मेट्रो के साथ उपयोग करने के लिए, आपको अपने `metro.config.js` फ़ाइल में प्लगइन जोड़ना होगा:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## चरण 4: Intlayer प्रदाता जोड़ें

अपने एप्लिकेशन में उपयोगकर्ता की भाषा को सिंक्रनाइज़ रखने के लिए, आपको अपने रूट कंपोनेंट को `react-intlayer-native` से `IntlayerProvider` कंपोनेंट के साथ रैप करना होगा।

> `react-intlayer` के बजाय `react-native-intlayer` से प्रदाता का उपयोग करना सुनिश्चित करें। `react-native-intlayer` से एक्सपोर्ट में वेब API के लिए पॉलीफिल्स शामिल हैं।

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

## चरण 5: अपनी सामग्री घोषित करें

प्रोजेक्ट में कहीं भी **content declaration** फाइलें बनाएं (आमतौर पर `src/` के अंदर), Intlayer द्वारा समर्थित किसी भी एक्सटेंशन फॉर्मेट का उपयोग करते हुए:

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

उदाहरण (React Native के लिए TSX नोड्स के साथ TypeScript):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * हमारे "app" डोमेन के लिए कंटेंट शब्दकोश
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> सामग्री घोषणाओं के विवरण के लिए, देखें [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)।

---

## चरण 4: अपने घटकों में Intlayer का उपयोग करें

स्थानीयकृत सामग्री प्राप्त करने के लिए चाइल्ड कॉम्पोनेंट्स में `useIntlayer` हुक का उपयोग करें।

### उदाहरण

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row", // पंक्ति में तत्वों को व्यवस्थित करें
    alignItems: "center", // केंद्र में संरेखित करें
    gap: 8, // तत्वों के बीच 8 की दूरी
  },
});

export default HomeScreen;
```

> जब आप `content.someKey` का उपयोग स्ट्रिंग-आधारित प्रॉप्स में करते हैं (जैसे, किसी बटन के `title` या `Text` कंपोनेंट के `children` में), तो वास्तविक स्ट्रिंग प्राप्त करने के लिए **`content.someKey.value` कॉल करें**।

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) के साथ उपयोग कर सकते हैं।

---

## (वैकल्पिक) चरण 5: ऐप का लोकल बदलें

अपने कंपोनेंट्स के भीतर से लोकल बदलने के लिए, आप `useLocale` हुक के `setLocale` मेथड का उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

यह उन सभी कंपोनेंट्स को पुनः रेंडर करता है जो Intlayer सामग्री का उपयोग करते हैं, अब नए लोकल के लिए अनुवाद दिखाते हुए।

> अधिक जानकारी के लिए [`useLocale` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

## TypeScript कॉन्फ़िगर करें (यदि आप TypeScript का उपयोग करते हैं)

Intlayer ऑटोकम्प्लीशन को बेहतर बनाने और अनुवाद त्रुटियों को पकड़ने के लिए एक छिपे हुए फ़ोल्डर (डिफ़ॉल्ट रूप से `.intlayer`) में टाइप परिभाषाएँ उत्पन्न करता है:

```json5
// tsconfig.json
{
  // ... आपका मौजूदा TS कॉन्फ़िग
  "include": [
    "src", // आपका स्रोत कोड
    ".intlayer/types/**/*.ts", // <-- सुनिश्चित करें कि स्वचालित रूप से उत्पन्न प्रकार शामिल हैं
    // ... जो कुछ भी आप पहले से शामिल करते हैं
  ],
}
```

यह निम्नलिखित सुविधाओं को सक्षम करता है:

- **ऑटोकम्प्लीशन** आपके शब्दकोश की कुंजियों के लिए।
- **टाइप जांच** जो चेतावनी देता है यदि आप किसी अस्तित्वहीन कुंजी तक पहुँचते हैं या प्रकार मेल नहीं खाते हैं।

---

## गिट कॉन्फ़िगरेशन

Intlayer द्वारा स्वचालित रूप से उत्पन्न फ़ाइलों को कमिट करने से बचने के लिए, अपनी `.gitignore` में निम्नलिखित जोड़ें:

```bash
#  Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

---

### VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकम्प्लीशन**।
- गायब अनुवादों के लिए **रीयल-टाइम त्रुटि पहचान**।
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**।
- अनुवादों को आसानी से बनाने और अपडेट करने के लिए **त्वरित क्रियाएं**।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

## आगे बढ़ें

- **विज़ुअल एडिटर**: अनुवादों को दृश्य रूप से प्रबंधित करने के लिए [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) का उपयोग करें।
- **CMS एकीकरण**: आप अपने शब्दकोश की सामग्री को एक [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) से बाहरी रूप से प्रबंधित और प्राप्त भी कर सकते हैं।
- **CLI कमांड्स**: ऐसे कार्यों के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) का अन्वेषण करें जैसे **अनुवाद निकालना** या **गुम हुए कुंजियों की जांच करना**।

**Intlayer** के माध्यम से पूरी तरह से सशक्त i18n के साथ अपने **React Native** ऐप्स का निर्माण करें!

---
