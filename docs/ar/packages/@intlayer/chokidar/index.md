# @intlayer/chokidar: حزمة NPM للمسح وبناء ملفات إعلان Intlayer إلى قواميس

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. إنها متوافقة مع أطر العمل مثل React وReact وExpress.js.

تستخدم حزمة **`@intlayer/chokidar`** للمسح وبناء ملفات إعلان Intlayer إلى قواميس باستخدام [chokidar](https://github.com/paulmillr/chokidar) ووفقًا لـ [إعدادات Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## الاستخدام

```ts
import { watch } from "@intlayer/chokidar";

watch(); // بناء قواميس Intlayer

// أو

watch({ persistent: true }); // وضع المراقبة
```

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
