---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: كيفية ترجمة تطبيق React Native and Expo – دليل i18n 2025
description: اكتشف كيفية جعل موقع React Native و Expo الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - React Native
  - Expo
  - جافا سكريبت
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# ترجم React Native and Expo باستخدام Intlayer | التدويل (i18n)

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-react-native-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة **تدويل (i18n) مبتكرة ومفتوحة المصدر** تُبسّط دعم اللغات المتعددة في التطبيقات الحديثة. تعمل في العديد من بيئات JavaScript/TypeScript، **بما في ذلك React Native** (عبر حزمة `react-intlayer`).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تصريحية على مستوى المكونات.
- **ضمان دعم TypeScript** بأنواع مولدة تلقائيًا.
- **توطين المحتوى ديناميكيًا**، بما في ذلك **سلاسل واجهة المستخدم** (وفي React للويب، يمكنها أيضًا توطين بيانات HTML الوصفية، وما إلى ذلك).
- **الاستفادة من ميزات متقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## الخطوة 1: تثبيت التبعيات

من مشروع React Native الخاص بك، قم بتثبيت الحزم التالية:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bunx intlayer init
```

### الحزم

- **intlayer**  
  مجموعة أدوات i18n الأساسية للتكوين، محتوى القاموس، توليد الأنواع، وأوامر CLI.

- **react-intlayer**  
  تكامل React الذي يوفر موفري السياق وReact hooks التي ستستخدمها في React Native للحصول على اللغات وتبديلها.

- **react-native-intlayer**  
  تكامل React Native الذي يوفر إضافة Metro لدمج Intlayer مع مجمع React Native.

---

## الخطوة 2: إنشاء تكوين Intlayer

في جذر مشروعك (أو في أي مكان مناسب)، أنشئ ملف **تكوين Intlayer**. قد يبدو كالتالي:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * إذا لم تكن أنواع Locales متوفرة، حاول تعيين moduleResolution إلى "bundler" في ملف tsconfig.json الخاص بك
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... أضف أي لغات أخرى تحتاجها
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
      // ... أضف أي لغات أخرى تحتاجها
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

ضمن هذا التكوين، يمكنك:

- تكوين **قائمة اللغات المدعومة**.
- تعيين لغة **افتراضية**.
- لاحقًا، يمكنك إضافة خيارات أكثر تقدمًا (مثل السجلات، مجلدات المحتوى المخصصة، إلخ).
- راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للمزيد.

## الخطوة 3: إضافة ملحق Metro

Metro هو أداة تجميع (bundler) لـ React Native. وهو أداة التجميع الافتراضية لمشاريع React Native التي تم إنشاؤها باستخدام الأمر `react-native init`. لاستخدام Intlayer مع Metro، تحتاج إلى إضافة الملحق إلى ملف `metro.config.js` الخاص بك:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## الخطوة 4: إضافة موفر Intlayer

للحفاظ على مزامنة لغة المستخدم في جميع أنحاء تطبيقك، تحتاج إلى تغليف المكون الجذر الخاص بك بمكون `IntlayerProvider` من `react-intlayer-native`.

> تأكد من استخدام الموفر من `react-native-intlayer` بدلاً من `react-intlayer`. يتضمن التصدير من `react-native-intlayer` بدائل (polyfills) لواجهة برمجة التطبيقات للويب.

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

## الخطوة 5: إعلان المحتوى الخاص بك

قم بإنشاء ملفات **إعلان المحتوى** في أي مكان داخل مشروعك (عادةً داخل مجلد `src/`)، باستخدام أي من صيغ الامتداد التي يدعمها Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- إلخ.

مثال (TypeScript مع عقد TSX لـ React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * قاموس المحتوى لنطاق "app" الخاص بنا
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

> لمزيد من التفاصيل حول إعلانات المحتوى، راجع [وثائق محتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

---

## الخطوة 4: استخدام Intlayer في مكوناتك

استخدم الخطاف `useIntlayer` في المكونات الفرعية للحصول على المحتوى المحلي.

### مثال

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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    flexDirection: "row",
    alignItems: "center", // محاذاة العناصر في الوسط عمودياً
    gap: 8, // المسافة بين العناصر
  },
});

module.exports = HomeScreen;
```

> عند استخدام `content.someKey` في الخصائص المعتمدة على النصوص (مثل خاصية `title` لزر أو `children` لمكون `Text`)، **يجب استدعاء `content.someKey.value`** للحصول على النص الفعلي.

---

## (اختياري) الخطوة 5: تغيير لغة التطبيق

لتغيير اللغة من داخل مكوناتك، يمكنك استخدام دالة `setLocale` من الخطاف `useLocale`:

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

هذا يؤدي إلى إعادة عرض جميع المكونات التي تستخدم محتوى Intlayer، مما يعرض الآن الترجمات للغة الجديدة.

> راجع [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) لمزيد من التفاصيل.

## تكوين TypeScript (إذا كنت تستخدم TypeScript)

يقوم Intlayer بإنشاء تعريفات النوع في مجلد مخفي (افتراضيًا `.intlayer`) لتحسين الإكمال التلقائي واكتشاف أخطاء الترجمة:

```json5
// tsconfig.json
{
  // ... تكوين TypeScript الحالي الخاص بك
  "include": [
    "src", // كود المصدر الخاص بك
    ".intlayer/types/**/*.ts", // <-- تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا
    // ... أي شيء آخر تقوم بتضمينه بالفعل
  ],
}
```

هذا ما يتيح ميزات مثل:

- **الإكمال التلقائي** لمفاتيح القاموس الخاصة بك.
- **التحقق من النوع** الذي يحذرك إذا قمت بالوصول إلى مفتاح غير موجود أو عدم تطابق النوع.

---

## تكوين Git

لتجنب الالتزام بالملفات التي تم إنشاؤها تلقائيًا بواسطة Intlayer، أضف ما يلي إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف عن الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## التعمق أكثر

- **المحرر المرئي**: استخدم [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) لإدارة الترجمات بشكل بصري.
- **تكامل نظام إدارة المحتوى (CMS)**: يمكنك أيضًا تعهيد واستيراد محتوى القاموس الخاص بك من خلال [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
- **أوامر سطر الأوامر (CLI)**: استكشف [أدوات سطر الأوامر لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) للمهام مثل **استخراج الترجمات** أو **التحقق من المفاتيح المفقودة**.

استمتع ببناء تطبيقات **React Native** الخاصة بك مع دعم كامل للترجمة الدولية (i18n) من خلال **Intlayer**!

---
