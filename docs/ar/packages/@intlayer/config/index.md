# @intlayer/config: حزمة NPM لاسترجاع تكوين Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر مثل React و Express.js.

حزمة **`@intlayer/config`** هي حزمة NPM تسمح لك باسترجاع إعدادات Intlayer وتعريف المتغيرات البيئية المتعلقة بالبيئة الحالية.

## التثبيت

قم بتثبيت الحزمة الضرورية باستخدام مدير الحزم الذي تفضله:

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
// النتيجة:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> هذه الدالة تستخدم حزمة `fs` وستعمل فقط على جانب الخادم.

### قراءة تكوين Intlayer باستخدام المتغيرات البيئية

مثال:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// النتيجة:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> هذه الدالة لن ترجع أي شيء إذا لم يتم تعريف المتغيرات البيئية.

### تعريف المتغيرات البيئية

1. إنشاء ملف تكوين.

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

> انظر [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) للحصول على مزيد من التفاصيل.

2. تعريف المتغيرات البيئية.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// تنسيق جميع قيم التكوين كمتغيرات بيئية
const env = formatEnvVariable();

// تعيين كل متغير بيئي مُنسق في process.env
Object.assign(process.env, env);
```

3. استيراد ملف التكوين.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
