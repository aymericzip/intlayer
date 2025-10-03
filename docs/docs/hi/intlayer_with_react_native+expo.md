---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: अपने React Native और Expo वेबसाइट का अनुवाद करें (i18n)
description: जानें कि अपनी React Native और Expo वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
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
---

# Intlayer और React Native के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

GitHub पर [एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-react-native-template) देखें।

## Intlayer क्या है?

**Intlayer** एक **नवोन्मेषी, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी** है जो आधुनिक अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाती है। यह कई JavaScript/TypeScript वातावरणों में काम करता है, जिसमें **React Native** भी शामिल है ( `react-intlayer` पैकेज के माध्यम से)।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कंपोनेंट स्तर पर होते हैं।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**।
- **सामग्री को गतिशील रूप से स्थानीयकृत करें**, जिसमें **UI स्ट्रिंग्स** शामिल हैं (और React वेब के लिए, यह HTML मेटाडेटा आदि को भी स्थानीयकृत कर सकता है)।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील स्थानीय पहचान और स्विचिंग।

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

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

// डिवाइस की भाषा प्राप्त करने के लिए फ़ंक्शन
const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
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

> सामग्री घोषणाओं के विवरण के लिए, देखें [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)।

---

## चरण 4: अपने घटकों में Intlayer का उपयोग करें

स्थानीयकृत सामग्री प्राप्त करने के लिए चाइल्ड कॉम्पोनेंट्स में `useIntlayer` हुक का उपयोग करें।

### उदाहरण

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("react-intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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
    gap: 8, // तत्वों के बीच 8 पिक्सेल का अंतराल
  },
});

module.exports = HomeScreen;
```

> जब आप `content.someKey` का उपयोग स्ट्रिंग-आधारित प्रॉप्स में करते हैं (जैसे, किसी बटन के `title` या `Text` कंपोनेंट के `children` में), तो वास्तविक स्ट्रिंग प्राप्त करने के लिए **`content.someKey.value` कॉल करें**।

---

## (वैकल्पिक) चरण 5: ऐप का लोकल बदलें

अपने कंपोनेंट्स के भीतर से लोकल बदलने के लिए, आप `useLocale` हुक के `setLocale` मेथड का उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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
    flexDirection: "row", // कंटेनर में आइटम्स को क्षैतिज रूप से व्यवस्थित करता है
    justifyContent: "center", // कंटेनर के अंदर आइटम्स को केंद्र में संरेखित करता है
    alignItems: "center", // आइटम्स को ऊर्ध्वाधर रूप से केंद्रित करता है
    gap: 8, // आइटम्स के बीच 8 पिक्सेल का अंतराल
  },
  button: {
    paddingVertical: 6, // बटन के ऊपर और नीचे 6 पिक्सेल की पैडिंग
    paddingHorizontal: 12, // बटन के बाएं और दाएं 12 पिक्सेल की पैडिंग
    borderRadius: 6, // बटन के किनारों को गोलाई देता है
    backgroundColor: "#ddd", // बटन का पृष्ठभूमि रंग
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
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
- **CLI कमांड्स**: ऐसे कार्यों के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) का अन्वेषण करें जैसे **अनुवाद निकालना** या **गुम हुए कुंजियों की जांच करना**।

**Intlayer** के माध्यम से पूरी तरह से सशक्त i18n के साथ अपने **React Native** ऐप्स का निर्माण करें!

---

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
