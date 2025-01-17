# @intlayer/webpack: حزمة NPM لاستخدام إضافة Intlayer Webpack في تطبيقك

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و React و Express.js.

تُستخدم حزمة **`@intlayer/webpack`** لتوفير تكوين Webpack لتسهيل العمل بتطبيق يعتمد على Webpack مع Intlayer. كما أن الحزمة توفر إضافة (plugin) لإضافتها إلى تطبيق Webpack قائم.

## الاستخدام

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // خيارات
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
