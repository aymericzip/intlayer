# इंटलेयर और रिएक्ट नेटिव के साथ अंतर्राष्ट्रीयकरण (i18n) शुरू करना

## इंटलेयर क्या है?

**इंटलेयर** एक **आधुनिक, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी** है जो आधुनिक अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाती है। यह कई जावास्क्रिप्ट/टाइपस्क्रिप्ट परिवेशों में काम करता है, **रिएक्ट नेटिव सहित** (`react-intlayer` पैकेज के माध्यम से)।

इंटलेयर के साथ, आप कर सकते हैं:

- **अनुवादों को आसानी से प्रबंधित करें** घटक स्तर पर घोषणात्मक शब्दकोशों का उपयोग करके।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** स्वचालित रूप से उत्पन्न प्रकारों के साथ।
- **सामग्री को गतिशील रूप से स्थानीयकृत करें**, जिसमें **यूआई स्ट्रिंग्स** शामिल हैं (और रिएक्ट फॉर वेब में, यह HTML मेटाडेटा आदि को भी स्थानीयकृत कर सकता है)।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील लोकेल का पता लगाना और स्विच करना।

> **महत्वपूर्ण**: रिएक्ट नेटिव में, आप `<html lang="...">` को नहीं बदलेंगे या Vite प्लगइन्स पर निर्भर नहीं करेंगे। इसके बजाय, आप `react-intlayer` एपीआई को एकीकृत करेंगे, वैकल्पिक रूप से [`I18nManager`](https://reactnative.dev/docs/i18nmanager) के साथ समन्वय करेंगे आरटीएल समर्थन के लिए, और यदि आप रिएक्ट नेविगेशन का उपयोग करते हैं, तो लोकेल परिवर्तनों को प्रतिबिंबित करने के लिए राउटर को अनुकूलित करेंगे।

---

## चरण 1: निर्भरताएँ स्थापित करें

अपने रिएक्ट नेटिव प्रोजेक्ट से, निम्नलिखित पैकेज स्थापित करें:

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### पैकेज

- **intlayer**  
  कॉन्फ़िगरेशन, शब्दकोश सामग्री, प्रकार निर्माण, और CLI कमांड्स के लिए मुख्य i18n टूलकिट।

- **react-intlayer**  
  रिएक्ट एकीकरण जो संदर्भ प्रदाताओं और रिएक्ट हुक्स को प्रदान करता है जिन्हें आप रिएक्ट नेटिव में लोकेल प्राप्त करने और स्विच करने के लिए उपयोग करेंगे।

- **react-native-intlayer**  
  रिएक्ट नेटिव एकीकरण जो रिएक्ट नेटिव बंडलर के साथ इंटलेयर को एकीकृत करने के लिए मेट्रो प्लगइन प्रदान करता है।

---

## चरण 2: एक इंटलेयर कॉन्फ़िग बनाएँ

अपने प्रोजेक्ट रूट (या किसी भी सुविधाजनक स्थान) में एक **इंटलेयर कॉन्फ़िग** फ़ाइल बनाएँ। यह इस प्रकार दिख सकता है:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... अन्य लोकेल्स जोड़ें जिनकी आपको आवश्यकता है
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
      // ... अन्य लोकेल्स जोड़ें जिनकी आपको आवश्यकता है
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
- [इंटलेयर कॉन्फ़िगरेशन डॉक्स](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें अधिक जानकारी के लिए।

## चरण 3: मेट्रो प्लगइन जोड़ें

मेट्रो रिएक्ट नेटिव के लिए एक बंडलर है। यह `react-native init` कमांड के साथ बनाए गए रिएक्ट नेटिव प्रोजेक्ट्स के लिए डिफ़ॉल्ट बंडलर है। इंटलेयर को मेट्रो के साथ उपयोग करने के लिए, आपको अपने `metro.config.js` फ़ाइल में प्लगइन जोड़ने की आवश्यकता है:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## चरण 4: इंटलेयर प्रदाता जोड़ें

अपने एप्लिकेशन में उपयोगकर्ता भाषा को सिंक्रनाइज़ रखने के लिए, आपको अपने रूट घटक को `react-intlayer` से `IntlayerProvider` घटक के साथ रैप करना होगा।

अपने **रूट** या शीर्ष-स्तरीय घटक को `react-intlayer` से `IntlayerProvider` के साथ रैप करें।

साथ ही, आपको यह सुनिश्चित करने के लिए अपने `index.js` फ़ाइल में `intlayerPolyfill` फ़ंक्शन जोड़ने की आवश्यकता है कि इंटलेयर सही ढंग से काम कर सके।

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProviderContent } = require("react-intlayer");
const { intlayerPolyfill } = require("react-native-intlayer");

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

module.exports = RootLayout;
```

## चरण 5: अपनी सामग्री घोषित करें

अपने प्रोजेक्ट में कहीं भी **सामग्री घोषणा** फ़ाइलें बनाएँ (आमतौर पर `src/` के भीतर), इंटलेयर द्वारा समर्थित किसी भी एक्सटेंशन प्रारूप का उपयोग करके:

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
- आदि।

उदाहरण (रिएक्ट नेटिव के लिए TSX नोड्स के साथ टाइपस्क्रिप्ट):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * "app" डोमेन के लिए सामग्री शब्दकोश
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
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
      hi: "स्वागत है!",
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

        "hi": "स्वागत है!",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> सामग्री घोषणाओं पर विवरण के लिए, [Intlayer की सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) देखें।

---

## चरण 4: अपने घटकों में Intlayer का उपयोग करें

अपने **रूट** या शीर्ष-स्तरीय घटक को `react-intlayer` से `IntlayerProvider` के साथ लपेटें। फिर, स्थानीयकृत सामग्री प्राप्त करने के लिए चाइल्ड घटकों में `useIntlayer` हुक का उपयोग करें।

### उदाहरण

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
// आवश्यक मॉड्यूल आयात करें
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

// होम स्क्रीन घटक परिभाषित करें
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

// स्टाइल्स परिभाषित करें
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
// आवश्यक मॉड्यूल आयात करें
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// होम स्क्रीन घटक परिभाषित करें
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

// स्टाइल्स परिभाषित करें
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
// आवश्यक मॉड्यूल आयात करें
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("react-intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

// होम स्क्रीन घटक परिभाषित करें
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

// स्टाइल्स परिभाषित करें
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

module.exports = HomeScreen;
```

> जब स्ट्रिंग-आधारित प्रॉप्स (जैसे, बटन का `title` या `Text` घटक का `children`) में `content.someKey` का उपयोग करते हैं, तो **वास्तविक स्ट्रिंग प्राप्त करने के लिए `content.someKey.value` कॉल करें।**

---

## (वैकल्पिक) चरण 5: ऐप लोकेल बदलें

अपने घटकों के भीतर से लोकेल बदलने के लिए, आप `useLocale` हुक के `setLocale` मेथड का उपयोग कर सकते हैं:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
// आवश्यक मॉड्यूल आयात करें
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

// लोकेल स्विचर घटक परिभाषित करें
export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="फ्रेंच में स्विच करें"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
// आवश्यक मॉड्यूल आयात करें
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

// लोकेल स्विचर घटक परिभाषित करें
const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="फ्रेंच में स्विच करें"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
// आवश्यक मॉड्यूल आयात करें
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

// लोकेल स्विचर घटक परिभाषित करें
const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="फ्रेंच में स्विच करें"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

यह Intlayer सामग्री का उपयोग करने वाले सभी घटकों का पुनः-रेंडर ट्रिगर करता है, जो अब नए लोकेल के लिए अनुवाद दिखाते हैं।

> अधिक विवरण के लिए [`useLocale` दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/useLocale.md) देखें।

## टाइपस्क्रिप्ट कॉन्फ़िगर करें (यदि आप टाइपस्क्रिप्ट का उपयोग करते हैं)

Intlayer एक छिपे हुए फ़ोल्डर (डिफ़ॉल्ट रूप से `.intlayer`) में प्रकार परिभाषाएँ उत्पन्न करता है ताकि ऑटो-कम्प्लीशन में सुधार हो और अनुवाद त्रुटियों को पकड़ा जा सके:

```json5
// tsconfig.json
{
  // ... आपका मौजूदा TS कॉन्फ़िग
  "include": [
    "src", // आपका स्रोत कोड
    ".intlayer", // <-- सुनिश्चित करें कि ऑटो-जनरेटेड प्रकार शामिल हैं
    // ... जो कुछ भी आप पहले से शामिल करते हैं
  ],
}
```

यह निम्नलिखित सुविधाओं को सक्षम करता है:

- **ऑटो-कम्प्लीशन** आपके शब्दकोश कुंजियों के लिए।
- **प्रकार जांच** जो चेतावनी देता है यदि आप किसी गैर-मौजूद कुंजी तक पहुंचते हैं या प्रकार का मिलान नहीं करते हैं।

---

## गिट कॉन्फ़िगरेशन

Intlayer द्वारा ऑटो-जनरेटेड फ़ाइलों को कमिट करने से बचने के लिए, अपने `.gitignore` में निम्नलिखित जोड़ें:

```plaintext
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

---

## आगे बढ़ें

- **विज़ुअल एडिटर**: अनुवादों को विज़ुअली प्रबंधित करने के लिए [Intlayer विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) का उपयोग करें।
- **CMS एकीकरण**: आप अपने शब्दकोश सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_CMS.md) से बाहरीकरण और प्राप्त भी कर सकते हैं।
- **CLI कमांड्स**: अनुवाद निकालने या गायब कुंजियों की जांच जैसे कार्यों के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) का अन्वेषण करें।

**Intlayer** के माध्यम से पूरी तरह से सक्षम i18n के साथ अपने **React Native** ऐप्स का निर्माण करने का आनंद लें!
