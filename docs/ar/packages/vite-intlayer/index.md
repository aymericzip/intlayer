# vite-intlayer: حزمة NPM لتدويل (i18n) تطبيق Vite

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Express.js.

**حزمة `vite-intlayer`** تتيح لك تدويل تطبيق Vite الخاص بك. وهي تتضمن إضافة Vite لضبط التكوين من خلال متغيرات البيئة في [تجميع Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). كما تقدم أيضًا برنامج وسيط لكشف اللغة المفضلة للمستخدم، وإعادة توجيه المستخدم إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## لماذا تدويل تطبيق Vite الخاص بك؟

يعتبر تدويل تطبيق Vite الخاص بك أمرًا ضروريًا لتلبية احتياجات جمهور عالمي بشكل فعال. فهو يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة من تجربة المستخدم وتوسع نطاق وصول تطبيقك من خلال جعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## التكوين

تعمل حزمة `vite-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md) وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). اطلع على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## مثال على الاستخدام

انظر مثالًا عن كيفية تضمين الإضافات في تكوين vite الخاص بك.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> تُستخدم إضافة `intlayerPlugin()` في Vite لدمج Intlayer مع Vite. إنها تضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. تقوم بتعريف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، توفر مرادفات لتحسين الأداء.

> يضيف `intLayerMiddlewarePlugin()` توجيهًا على جانب الخادم لتطبيقك. ستقوم هذه الإضافة بالكشف تلقائيًا عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف ارتباط اللغة المناسب. إذا لم يتم تحديد لغة، فسيقوم المكون الإضافي بتحديد اللغة الأكثر ملاءمة بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن لغة، فسوف يتم إعادة التوجيه إلى اللغة الافتراضية.

## اتقن تدويل تطبيق Vite الخاص بك

توفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Vite الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع دليل [تدويل React (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md) لتطبيق Vite وReact.**
