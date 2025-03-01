# @intlayer/webpack: حزمة NPM لاستخدام مكون Intlayer Webpack في تطبيقك

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وReact وExpress.js.

حزمة **`@intlayer/webpack`** تُستخدم لتوفير تكوين Webpack لجعل العمل مع تطبيق يعتمد على Webpack مع Intlayer أسهل. كما توفر الحزمة مكونًا إضافيًا لإضافته إلى تطبيق Webpack موجود.

## الاستخدام

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // الخيارات
    }),
  ],
};
```

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
