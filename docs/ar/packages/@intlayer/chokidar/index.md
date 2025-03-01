# @intlayer/chokidar: حزمة NPM لمسح وبناء ملفات إعلان Intlayer إلى قواميس

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وExpress.js.

تُستخدم حزمة **`@intlayer/chokidar`** لمسح وبناء ملفات إعلان Intlayer إلى قواميس باستخدام [chokidar](https://github.com/paulmillr/chokidar) ووفقًا لـ [تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## الاستخدام

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // بناء قواميس Intlayer

watch({ persistent: true }); // مراقبة التغييرات في ملفات التكوين
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
