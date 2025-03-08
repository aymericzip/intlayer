# البدء في التدويل (i18n) باستخدام Intlayer و React Native

## ما هو Intlayer؟

**Intlayer** هو **مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر** تسهل دعم اللغات المتعددة في التطبيقات الحديثة. تعمل في العديد من بيئات JavaScript/TypeScript، **بما في ذلك React Native** (عبر حزمة `react-intlayer`).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا.
- **تخصيص المحتوى ديناميكيًا**، بما في ذلك **سلاسل واجهة المستخدم** (وفي React للويب، يمكنها أيضًا تخصيص بيانات HTML الوصفية، إلخ).
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

> **مهم**: في React Native، لن تقوم بتغيير `<html lang="...">` أو الاعتماد على إضافات Vite. بدلاً من ذلك، ستقوم بدمج واجهة برمجة التطبيقات `react-intlayer`، والتنسيق اختياريًا مع [`I18nManager`](https://reactnative.dev/docs/i18nmanager) لدعم الكتابة من اليمين إلى اليسار، وإذا كنت تستخدم React Navigation، قم بتكييف الموجه ليعكس تغييرات اللغة.

---

## الخطوة 1: تثبيت التبعيات

من مشروع React Native الخاص بك، قم بتثبيت الحزم التالية:

```bash
npm install intlayer react-intlayer react-native-intlayer
```

```bash
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash
yarn add intlayer react-intlayer react-native-intlayer
```

### الحزم

- **intlayer**  
  أداة i18n الأساسية للتكوين، محتوى القاموس، توليد الأنواع، وأوامر CLI.

- **react-intlayer**  
  تكامل React الذي يوفر موفري السياق وخطافات React التي ستستخدمها في React Native للحصول على اللغات وتبديلها.

- **react-native-intlayer**  
  تكامل React Native الذي يوفر إضافة Metro لدمج Intlayer مع مجمع React Native.

---

## الخطوة 2: إنشاء تكوين Intlayer

في جذر مشروعك (أو في أي مكان مناسب)، قم بإنشاء ملف **تكوين Intlayer**. قد يبدو مثل هذا:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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
- لاحقًا، يمكنك إضافة خيارات أكثر تقدمًا (مثل السجلات، أدلة المحتوى المخصصة، إلخ).
- راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من التفاصيل.

## الخطوة 3: إضافة إضافة Metro

Metro هو مجمع لـ React Native. وهو المجمع الافتراضي لمشاريع React Native التي تم إنشاؤها باستخدام أمر `react-native init`. لاستخدام Intlayer مع Metro، تحتاج إلى إضافة الإضافة إلى ملف `metro.config.js` الخاص بك:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## الخطوة 4: إضافة موفر Intlayer

للحفاظ على تزامن لغة المستخدم عبر تطبيقك، تحتاج إلى تغليف المكون الجذري الخاص بك بمكون `IntlayerProvider` من `react-intlayer`.

قم بتغليف مكون **الجذر** أو المستوى الأعلى الخاص بك بـ `IntlayerProvider` من `react-intlayer`.

أيضًا، تحتاج إلى إضافة وظيفة `intlayerPolyfill` إلى ملف `index.js` الخاص بك لضمان عمل Intlayer بشكل صحيح.

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

## الخطوة 5: إعلان المحتوى الخاص بك

قم بإنشاء ملفات **إعلان المحتوى** في أي مكان في مشروعك (عادةً داخل `src/`)، باستخدام أي من تنسيقات الامتداد التي يدعمها Intlayer:

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
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
      ar: "مرحبًا!",
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
      ar: "مرحبًا!",
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
      ar: "مرحبًا!",
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

        "ar": "مرحباً!",
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> لمزيد من التفاصيل حول إعلانات المحتوى، راجع [وثائق محتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

---

## الخطوة 4: استخدام Intlayer في مكوناتك

قم بتغليف مكون **الجذر** أو المستوى الأعلى بـ `IntlayerProvider` من `react-intlayer`. ثم استخدم الخطاف `useIntlayer` في المكونات الفرعية للحصول على المحتوى المحلي.

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
    alignItems: "center",
    gap: 8,
  },
});

module.exports = HomeScreen;
```

> عند استخدام `content.someKey` في الخصائص النصية (مثل خاصية `title` للزر أو خاصية `children` لمكون `Text`)، **قم باستدعاء `content.someKey.value`** للحصول على النص الفعلي.

---

## (اختياري) الخطوة 5: تغيير لغة التطبيق

لتبديل اللغات من داخل مكوناتك، يمكنك استخدام طريقة `setLocale` من خطاف `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="التبديل إلى الفرنسية"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="التبديل إلى الفرنسية"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="التبديل إلى الفرنسية"
      onPress={() => {
        setLocale(Locales.FRENCH);
      }}
    />
  );
};
```

هذا يؤدي إلى إعادة عرض جميع المكونات التي تستخدم محتوى Intlayer، الآن مع عرض الترجمات للغة الجديدة.

> راجع [وثائق `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md) لمزيد من التفاصيل.

## تكوين TypeScript (إذا كنت تستخدم TypeScript)

يقوم Intlayer بإنشاء تعريفات الأنواع في مجلد مخفي (افتراضيًا `.intlayer`) لتحسين الإكمال التلقائي واكتشاف أخطاء الترجمة:

```json5
// tsconfig.json
{
  // ... إعدادات TS الحالية
  "include": [
    "src", // كود المصدر الخاص بك
    ".intlayer", // <-- تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا
    // ... أي شيء آخر تقوم بتضمينه بالفعل
  ],
}
```

هذا ما يتيح ميزات مثل:

- **الإكمال التلقائي** لمفاتيح القاموس.
- **التحقق من النوع** الذي يحذرك إذا قمت بالوصول إلى مفتاح غير موجود أو عدم تطابق النوع.

---

## تكوين Git

لتجنب الالتزام بالملفات التي يتم إنشاؤها تلقائيًا بواسطة Intlayer، أضف ما يلي إلى `.gitignore`:

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

---

## الذهاب أبعد

- **المحرر المرئي**: استخدم [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) لإدارة الترجمات بشكل مرئي.
- **تكامل CMS**: يمكنك أيضًا استخراج محتوى القاموس الخاص بك من [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).
- **أوامر CLI**: استكشف [CLI الخاص بـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md) للمهام مثل **استخراج الترجمات** أو **التحقق من المفاتيح المفقودة**.

استمتع ببناء تطبيقات **React Native** الخاصة بك مع دعم كامل للتدويل من خلال **Intlayer**!
