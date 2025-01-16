# intlayer-cli: حزمة NPM لاستخدام واجهة سطر الأوامر Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. إنها متوافقة مع أطر العمل مثل React و Express.js.

حزمة **`intlayer-cli`** هي حزمة NPM تستهلك حزمة `@intlayer/cli` وتجعلها متاحة لواجهة الأوامر الخطية `intlayer`.

> لاحظ أن هذه الحزمة ليست ضرورية إذا تم تثبيت حزمة [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md). بالمقارنة مع حزمة `intlayer`، فإن حزمة `intlayer-cli` هي حزمة أخف تحتوي فقط على أداة CLI، دون تبعيات `@intlayer/core`.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## الاستخدام

إليك مثال على كيفية استخدام حزمة `intlayer-cli`:

```bash
npx intlayer build
```

## أوامر CLI

تقدم Intlayer أداة CLI لـ:

- تدقيق إعلانات المحتوى الخاصة بك وإكمال الترجمات المفقودة
- بناء القواميس من إعلانات المحتوى الخاصة بك
- دفع وسحب القواميس البعيدة من نظام إدارة المحتوى الخاص بك إلى مشروع اللغة الخاص بك

استشر [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md) لمزيد من المعلومات.
