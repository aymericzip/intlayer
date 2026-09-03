---
createdAt: 2025-06-18
updatedAt: 2026-06-25
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Providers और hooks को सीधे react-native-intlayer से import करें; react-intlayer अब सीधी dependency के रूप में आवश्यक नहीं है"
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ें"
  - version: 6.1.6
    date: 2025-10-02
    changes: "डीबग अनुभाग जोड़ें"
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# अपने Expo और React Native ऐप का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

<Tabs defaultTab="code">
  <Tab label="कोड" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="डेमो" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="डेमो - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## विषय सूची

<TOC/>

## विकल्पों पर Intlayer क्यों?

`react-native-localize` या `i18next` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

<AccordionGroup>
<Accordion header="पूर्ण React Native कवरेज">

Intlayer को **घटक-स्तरीय सामग्री स्कोपिंग**, **TypeScript समर्थन**, और मोबाइल ऐप्स में अंतर्राष्ट्रीयकरण (i18n) को बढ़ाने के लिए आवश्यक सभी सुविधाओं की पेशकश करके React Native और Expo के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

</Accordion>

<Accordion header="रखरखाव">

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

</Accordion>

<Accordion header="AI एजेंट">

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (LLM) द्वारा आवश्यक संदर्भ को कम करता है**। Intlayer टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

</Accordion>

<Accordion header="स्वचालन">

अपने AI प्रदाता की कीमत पर अपनी पसंद के LLM का उपयोग करके अपने CI/CD पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। Intlayer सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="प्रदर्शन">

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। Intlayer बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="बिना डेव के स्केलिंग">

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** प्रदान करता है आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>

<Accordion header="बंडल का आकार">

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। Intlayer **आपके बंडल और दृश्य आकार को 50% तक कम करने** में मदद करता है।

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-react-native-template) देखें।

अपने React Native प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` फ्लैग वैकल्पिक है। यदि आप AI एजेंट हैं तो `intlayer-cli init` का उपयोग करें।

> यह कमांड आपके environment का पता लगाएगा और आवश्यक पैकेज इंस्टॉल करेगा। उदाहरण के लिए:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### पैकेज

- **intlayer**  
  कॉन्फ़िगरेशन, शब्दकोश सामग्री, प्रकार निर्माण और CLI कमांड के लिए कोर i18n टूलकिट।

- **react-native-intlayer**  
  React Native एकीकरण जो कॉन्टेक्स्ट प्रदाताओं और React हुक्स प्रदान करता है जिनका उपयोग आप locale प्राप्त करने और स्विच करने के लिए करेंगे, React Native polyfills, और React Native bundler के साथ Intlayer को एकीकृत करने के लिए Metro प्लगइन। यह `react-intlayer` से सब कुछ re-export करता है, इसलिए React Native ऐप में आपको केवल इसी एकल पैकेज की आवश्यकता है।

</Step>

<Step number={2} title="Intlayer कॉन्फ़िग बनाएं">

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
- अधिक जानकारी के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) देखें।

</Step>

<Step number={3} title="Metro प्लगइन जोड़ें">

Metro React Native के लिए एक बंडलर है। यह `react-native init` कमांड से बनाए गए React Native प्रोजेक्ट्स के लिए डिफ़ॉल्ट बंडलर है। Intlayer को Metro के साथ उपयोग करने के लिए, आपको अपने `metro.config.js` फ़ाइल में प्लगइन जोड़ना होगा:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> नोट: `configMetroIntlayer` एक promise फ़ंक्शन है। यदि आप इसे synchronously उपयोग करना चाहते हैं, या IIFE (Immediately Invoked Function Expression) से बचना चाहते हैं, तो इसके बजाय `configMetroIntlayerSync` का उपयोग करें।
> नोट: `configMetroIntlayerSync` सर्वर स्टार्ट पर intlayer dictionaries बनाने की अनुमति नहीं देता

</Step>

<Step number={4} title="Intlayer प्रदाता जोड़ें">

अपने एप्लिकेशन में उपयोगकर्ता की भाषा को सिंक्रनाइज़ रखने के लिए, आपको अपने रूट कंपोनेंट को `react-native-intlayer` से `IntlayerProvider` कंपोनेंट के साथ रैप करना होगा।

> हमेशा `react-native-intlayer` से import करें। इसका `IntlayerProvider` Intlayer द्वारा उपयोग की जाने वाली web API के लिए polyfills शामिल करता है, और यह पैकेज `react-intlayer` से सभी hooks और utilities को re-export करता है।

इसके अलावा, आपको यह सुनिश्चित करने के लिए कि Intlayer सही ढंग से काम कर सके, अपने `index.js` फ़ाइल में `intlayerPolyfill` फ़ंक्शन जोड़ना होगा।

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

</Step>

<Step number={5} title="अपनी सामग्री घोषित करें">

प्रोजेक्ट में कहीं भी **content declaration** फाइलें बनाएं (आमतौर पर `src/` के अंदर), Intlayer द्वारा समर्थित किसी भी एक्सटेंशन फॉर्मेट का उपयोग करते हुए:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- आदि।

> **Expo Router (वेब): `.content.*` फ़ाइलों को `app/` डायरेक्टरी से बाहर रखें।** Expo Router `app/` के अंदर मौजूद हर JavaScript/TypeScript फ़ाइल को एक रूट मानता है। वेब पर, इसकी रूट खोज फ़ाइल सिस्टम को सीधे स्कैन करती है और Metro के `resolver.blockList` का **सम्मान नहीं** करती है, इसलिए एक सह-स्थित `*.content.ts` रूट के रूप में पंजीकृत हो जाता है। `app/(tabs)/_layout.content.ts` जैसी फ़ाइल को लेआउट के रूप में भी पार्स किया जाता है (`.content` भाग को प्लेटफ़ॉर्म प्रत्यय के रूप में पढ़ा जाता है), जो वास्तविक `_layout.tsx` के साथ टकराता है और यह त्रुटि देता है:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> अपनी घोषणाओं को `app/` के बाहर किसी डायरेक्टरी में रखें (उदाहरण के लिए `content/` या `src/content/`)। Intlayer प्रोजेक्ट में कहीं भी `.content.*` फ़ाइलों की खोज करता है और शब्दकोशों को उनकी `key` द्वारा संदर्भित किया जाता है, इसलिए कोई आयात परिवर्तन आवश्यक नहीं है। नेटिव पर इसकी आवश्यकता नहीं है (Metro का `blockList` पहले से ही उन्हें छुपाता है), लेकिन गैर-`app/` डायरेक्टरी का उपयोग करने से दोनों प्लेटफ़ॉर्म काम करते रहते हैं।

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

> सामग्री घोषणाओं के विवरण के लिए, देखें [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)।

</Step>

<Step number={6} title="अपने घटकों में Intlayer का उपयोग करें">

स्थानीयकृत सामग्री प्राप्त करने के लिए चाइल्ड कॉम्पोनेंट्स में `useIntlayer` हुक का उपयोग करें।

### उदाहरण

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> जब आप `content.someKey` का उपयोग स्ट्रिंग-आधारित प्रॉप्स में करते हैं (जैसे, किसी बटन के `title` या `Text` कंपोनेंट के `children` में), तो वास्तविक स्ट्रिंग प्राप्त करने के लिए **`content.someKey.value` कॉल करें**।

> यदि आपका ऐप पहले से मौजूद है, तो आप हजारों घटकों को एक सेकंड में बदलने के लिए [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) को [एक्सट्रैक्ट कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) के साथ उपयोग कर सकते हैं।

</Step>

<Step number={7} title="ऐप का लोकल बदलें" isOptional={true}>

अपने कंपोनेंट्स के भीतर से लोकल बदलने के लिए, आप `useLocale` हुक के `setLocale` मेथड का उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

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

> अधिक जानकारी के लिए [`useLocale` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) देखें।

</Step>

</Steps>

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

- **विज़ुअल एडिटर**: अनुवादों को दृश्य रूप से प्रबंधित करने के लिए [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) का उपयोग करें।
- **CMS एकीकरण**: आप अपने शब्दकोश की सामग्री को एक [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) से बाहरी रूप से प्रबंधित और प्राप्त भी कर सकते हैं।
- **CLI कमांड्स**: ऐसे कार्यों के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) का अन्वेषण करें जैसे **अनुवाद निकालना** या **गुम हुए कुंजियों की जांच करना**।

**Intlayer** के माध्यम से पूरी तरह से सशक्त i18n के साथ अपने **React Native** ऐप्स का निर्माण करें!

---

### Debug

React Native, React Web की तुलना में कम स्थिर हो सकता है, इसलिए version alignment पर अतिरिक्त ध्यान दें।

Intlayer मुख्य रूप से Web Intl API को target करता है; React Native पर आपको appropriate polyfills शामिल करने होंगे।

Checklist:

- `intlayer` और `react-native-intlayer` के नवीनतम versions का उपयोग करें।
- Intlayer polyfill को enable करें।
- यदि आप `getLocaleName` या अन्य Intl-API-based utilities का उपयोग करते हैं, तो इन polyfills को जल्दी import करें (उदाहरण के लिए `index.js` या `App.tsx` में):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- यदि modules resolve करने में विफल हों तो अपने Metro configuration (resolver aliases, asset plugins, `tsconfig` paths) को verify करें।

---

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="React Native या Expo अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

- **`i18n-js`** के साथ `expo-localization`: स्थिर प्रकार के बिना साधारण ऑब्जेक्ट।
- **`react-i18next`**: मेमोरी में नेमस्पेस लोड करने वाली सामान्य लाइब्रेरी।
- **`Intlayer`**: बिल्ड समय अनुकूलन के लिए Metro प्लगइन, पूर्ण TypeScript प्रकार, AI अनुवाद और मोबाइल उपकरणों पर उच्च प्रदर्शन।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Question>

<Question title="i18n मेरे React Native बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित समाधानों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक प्रविष्टियों से बदल देता है, और [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं, जिससे बंडल 50% तक कम हो जाता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना i18n-js या react-i18next से माइग्रेट कर सकता हूँ?">

हाँ। [react-i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md) का पालन करें या संगतता एडेप्टर का उपयोग करें।

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

<Question title="क्या Intlayer Expo और Metro बंडलर के साथ काम करता है?">

हाँ। चरण 3 Metro प्लगइन जोड़ता है; सहेजते ही Fast Refresh का समर्थन करने के लिए प्रकार तुरंत अपडेट हो जाते हैं।

</Question>

<Question title="डिवाइस की भाषा का पता कैसे लगाएं?">

`expo-localization` के माध्यम से पढ़ें और प्रारंभिक लोकेल के रूप में Intlayer प्रदाता को पास करें, उपयोगकर्ता की पसंद को `AsyncStorage` में सहेजें।

</Question>

<Question title="रनटाइम पर ऐप की भाषा कैसे बदलें?">

चरण 7 इसे समझाता है। `useLocale` हुक सक्रिय लोकेल, भाषाओं की सूची और सेटर प्रदान करता है; घटक ऐप को पुनः आरंभ किए बिना फिर से रेंडर होते हैं।

</Question>

<Question title="अरबी या हिब्रू जैसी दाएं से बाएं भाषाओं का समर्थन कैसे करें?">

`getHTMLTextDir` के माध्यम से टेक्स्ट दिशा की जांच करें और React Native में `I18nManager` मॉड्यूल के माध्यम से लागू करें।

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
