# react-scripts-intlayer: حزمة NPM لاستخدام Intlayer في تطبيق React Create App

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. إنها متوافقة مع Frameworks مثل React و React و Express.js.

**حزمة `react-scripts-intlayer`** تتضمن أوامر وملحقات `react-scripts-intlayer` لدمج Intlayer مع التطبيق القائم على Create React App. هذه الملحقات تعتمد على [craco](https://craco.js.org/) وتشتمل على تكوين إضافي لمجمع [Webpack](https://webpack.js.org/).

## التكوين

تعمل حزمة `react-scripts-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md) وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). ألقِ نظرة على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة الضرورية باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## الاستخدام

### أوامر سطر الأوامر (CLI)

تقدم حزمة `react-scripts-intlayer` الأوامر التالية:

- `npx react-scripts-intlayer build`: يبني تطبيق React مع تكوين Intlayer.
- `npx react-scripts-intlayer start`: يبدأ خادم التطوير مع تكوين Intlayer.

### استبدال سكربتات package.json

لاستخدام حزمة `react-scripts-intlayer`، تحتاج إلى استبدال سكربتات `package.json` بالأوامر التالية:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## استخدم تكوين Webpack مخصص

`react-scripts-intlayer` يعتمد على [craco](https://craco.js.org/)، مما يسمح لك بتخصيص تكوين Webpack.
إذا كنت بحاجة إلى تخصيص تكوين Webpack، يمكنك أيضًا تنفيذ إعداد خاص بك استنادًا إلى ملحق intlayer craco. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## اقرأ الدليل الكامل لـ Intlayer لتطبيق React Create

يقدم Intlayer الكثير من الميزات لمساعدتك في دولنة تطبيق React الخاص بك.
[انظر كيف تستخدم intlayer مع React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).
