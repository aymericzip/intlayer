# @intlayer/config: حزمة NPM لاسترجاع تكوين Intlayer

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وReact وExpress.js.

حزمة **`@intlayer/config`** هي حزمة NPM تتيح لك استرجاع تكوين Intlayer وتحديد متغيرات البيئة المتعلقة بالبيئة الحالية.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## الاستخدام

### قراءة تكوين Intlayer باستخدام نظام الملفات

مثال:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// الإخراج:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> تستخدم هذه الوظيفة حزم `fs` وستعمل فقط على جانب الخادم.

### قراءة تكوين Intlayer باستخدام متغيرات البيئة

مثال:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// الإخراج:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> لن تُرجع هذه الوظيفة أي شيء إذا لم يتم تعريف متغيرات البيئة.

### تحديد متغيرات البيئة

1. قم بإنشاء ملف تكوين.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> انظر [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من التفاصيل.

2. قم بتحديد متغيرات البيئة.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// تنسيق جميع قيم التكوين كمتغيرات بيئة
const env = formatEnvVariable();

// تعيين كل متغير بيئة مُنسق في process.env
Object.assign(process.env, env);
```

3. استيراد ملف التكوين.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
