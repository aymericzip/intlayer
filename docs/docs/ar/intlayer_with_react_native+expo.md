---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "تدويل Expo + React Native - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Expo + React Native متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
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
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية التاريخ"
author: aymericzip
---

# ترجم تطبيق Expo و React Native الخاص بك | التدويل (i18n)

<Tabs defaultTab="code">
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-react-native-template) على GitHub.

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `react-native-localize` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية رد الفعل الأصلية الكاملة **

تم تحسين Intlayer للعمل بشكل مثالي مع React Native وExpo من خلال تقديم **نطاق المحتوى على مستوى المكونات**، و**دعم TypeScript**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n) في تطبيقات الأجهزة المحمولة.

** الصيانة **

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

**حجم البندل**

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل حجم البندل وعرض الأحجام بنسبة تصل إلى 50%**.

<Steps>

<Step number={1} title="تثبيت التبعيات">

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-react-native-template) على GitHub.

من مشروع React Native الخاص بك، قم بتثبيت الحزم التالية:

```bash packageManager='npm'
npm تثبيت طبقة رد فعل طبقة داخلية
تثبيت npm --save-dev رد الفعل الأصلي-inlayer
npx الطبقة البينية init
```

```bash packageManager="pnpm"
أضف pnpm طبقة تفاعلية داخلية
إضافة pnpm --save-dev رد الفعل الأصلي-inlayer
pnpm intlayer init
```

```bash packageManager = "غزل"
الغزل إضافة طبقة داخلية رد فعل طبقة داخلية
إضافة الغزل --save-dev رد الفعل الأصلي-inlayer
الغزل الضمني الحرف الأول
```

```باش باكدج ماناجر = "كعكة""
كعكة إضافة طبقة داخلية رد فعل طبقة داخلية
إضافة كعكة --dev رد الفعل الأصلي-inlayer
كعكة x الطبقة البينية init
```

### الحزم

- **الطبقة الداخلية**  
  مجموعة أدوات i18n الأساسية للتكوين ومحتوى القاموس وإنشاء الأنواع وأوامر CLI.

- **رد الفعل الضمني**  
  تكامل React الذي يوفر موفري السياق وخطافات React التي ستستخدمها في React Native للحصول على اللغات وتبديلها.

- **رد الفعل الأصلي-الطبقة الداخلية**  
  تكامل React Native الذي يوفر البرنامج الإضافي Metro لدمج Intlayer مع مجمّع React Native.

---

</Step>

<Step number={2} title="تثبيت التبعيات">

من مشروع React Native الخاص بك، قم بتثبيت الحزم التالية:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
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

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
```

### الحزم

- **intlayer**  
  مجموعة أدوات i18n الأساسية للتكوين، محتوى القاموس، توليد الأنواع، وأوامر CLI.

- **react-intlayer**  
  تكامل React الذي يوفر موفري السياق وReact hooks التي ستستخدمها في React Native للحصول على اللغات وتبديلها.

- **react-native-intlayer**  
  تكامل React Native الذي يوفر إضافة Metro لدمج Intlayer مع مجمع React Native.

---

</Step>

<Step number={3} title="إنشاء تكوين Intlayer">

في جذر مشروعك (أو في أي مكان مناسب)، أنشئ ملف **تكوين Intlayer**. قد يبدو كالتالي:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

ضمن هذا التكوين، يمكنك:

- تكوين **قائمة اللغات المدعومة**.
- تعيين لغة **افتراضية**.
- لاحقًا، يمكنك إضافة خيارات أكثر تقدمًا (مثل السجلات، مجلدات المحتوى المخصصة، إلخ).
- راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للمزيد.

</Step>

<Step number={4} title="إضافة ملحق Metro">

Metro هو أداة تجميع (bundler) لـ React Native. وهو أداة التجميع الافتراضية لمشاريع React Native التي تم إنشاؤها باستخدام الأمر `react-native init`. لاستخدام Intlayer مع Metro، تحتاج إلى إضافة الملحق إلى ملف `metro.config.js` الخاص بك:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

</Step>

<Step number={5} title="إضافة موفر Intlayer">

للحفاظ على مزامنة لغة المستخدم في جميع أنحاء تطبيقك، تحتاج إلى تغليف المكون الجذر الخاص بك بمكون `IntlayerProvider` من `react-intlayer-native`.

> تأكد من استخدام الموفر من `react-native-intlayer` بدلاً من `react-intlayer`. يتضمن التصدير من `react-native-intlayer` بدائل (polyfills) لواجهة برمجة التطبيقات للويب.

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

<Step number={6} title="إعلان المحتوى الخاص بك">

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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> لمزيد من التفاصيل حول إعلانات المحتوى، راجع [وثائق محتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

---

</Step>

<Step number={7} title="استخدام Intlayer في مكوناتك">

استخدم الخطاف `useIntlayer` في المكونات الفرعية للحصول على المحتوى المحلي.

### مثال

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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> عند استخدام `content.someKey` في الخصائص المعتمدة على النصوص (مثل خاصية `title` لزر أو `children` لمكون `Text`)، **يجب استدعاء `content.someKey.value`** للحصول على النص الفعلي.

> إذا كان تطبيقك موجودًا بالفعل، يمكنك استخدام [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)، بالإضافة إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)، لتحويل آلاف المكونات في ثانية واحدة.

---

</Step>

<Step number={8} title="تغيير لغة التطبيق">

لتغيير اللغة من داخل مكوناتك، يمكنك استخدام دالة `setLocale` من الخطاف `useLocale`:

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

هذا يؤدي إلى إعادة عرض جميع المكونات التي تستخدم محتوى Intlayer، مما يعرض الآن الترجمات للغة الجديدة.

> راجع [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) لمزيد من التفاصيل.

</Step>

</Steps>

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

```bash
#  تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
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
- **أوامر سطر الأوامر (CLI)**: استكشف [أدوات سطر الأوامر لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للمهام مثل **استخراج الترجمات** أو **التحقق من المفاتيح المفقودة**.

استمتع ببناء تطبيقات **React Native** الخاصة بك مع دعم كامل للترجمة الدولية (i18n) من خلال **Intlayer**!

---
