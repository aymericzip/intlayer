**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وReact وExpress.js.

**حزمة `react-native-intlayer`** تتيح لك تعريب تطبيق Vite الخاص بك. تتضمن مكون Metro الإضافي لتعيين التكوين من خلال متغيرات البيئة في [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## لماذا يجب تعريب تطبيق React Native الخاص بك؟

تعريب تطبيق React Native الخاص بك أمر ضروري لخدمة جمهور عالمي بشكل فعال. يتيح ذلك لتطبيقك تقديم المحتوى والرسائل بلغة المستخدم المفضلة. هذه القدرة تعزز تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر وصولاً وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## التكوين

تعمل حزمة `react-native-intlayer` بسلاسة مع [حزمة `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md)، و[حزمة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). اطلع على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## مثال على الاستخدام

اطلع على مثال حول كيفية تضمين المكونات الإضافية في تكوين Vite الخاص بك.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## إتقان تعريب تطبيق Vite الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تعريب تطبيق Vite الخاص بك.

**للتعرف على المزيد حول هذه الميزات، راجع دليل [تعريب React (i18n) باستخدام Intlayer وReact Native](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_react_native+expo.md) لتطبيق React Native.**

## اقرأ عن Intlayer

- [موقع Intlayer](https://intlayer.org)
- [وثائق Intlayer](https://intlayer.org/docs)
- [Intlayer على GitHub](https://github.com/aymericzip/intlayer)

- [اطرح أسئلتك على وثائقنا الذكية](https://intlayer.org/docs/chat)
