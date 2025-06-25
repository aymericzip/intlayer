# intlayer-cli: حزمة NPM لاستخدام Intlayer CLI

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وExpress.js.

حزمة **`intlayer-cli`** هي حزمة NPM تستهلك حزمة `@intlayer/cli` وتجعلها متاحة لواجهات سطر الأوامر الخاصة بـ `intlayer`.

> لاحظ أن هذه الحزمة ليست ضرورية إذا تم تثبيت حزمة [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md). بالمقارنة مع حزمة `intlayer`، فإن حزمة `intlayer-cli` هي حزمة أخف تحتوي فقط على أداة CLI، بدون تبعيات `@intlayer/core`.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## الاستخدام

إليك مثال على كيفية استخدام حزمة `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## أوامر CLI

يوفر Intlayer أداة CLI لـ:

- تدقيق إعلانات المحتوى الخاص بك واستكمال الترجمات المفقودة
- إنشاء القواميس من إعلانات المحتوى الخاص بك
- دفع وسحب القواميس البعيدة من CMS الخاص بك إلى مشروعك المحلي

راجع [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) لمزيد من المعلومات.
