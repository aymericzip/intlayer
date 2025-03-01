# react-scripts-intlayer: حزمة NPM لاستخدام Intlayer في تطبيق React Create App

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React، وReact، وExpress.js.

**حزمة `react-scripts-intlayer`** تتضمن أوامر ومكونات `react-scripts-intlayer` لدمج Intlayer مع تطبيق يعتمد على Create React App. تعتمد هذه المكونات على [craco](https://craco.js.org/) وتشمل تكوينًا إضافيًا لمجمع [Webpack](https://webpack.js.org/).

## التكوين

تعمل حزمة `react-scripts-intlayer` بسلاسة مع [حزمة `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md)، و[حزمة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). اطلع على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

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

### أوامر CLI

توفر حزمة `react-scripts-intlayer` أوامر CLI التالية:

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

## استخدام تكوين Webpack مخصص

تعتمد `react-scripts-intlayer` على [craco](https://craco.js.org/)، مما يسمح لك بتخصيص تكوين Webpack.
إذا كنت بحاجة إلى تخصيص تكوين Webpack، يمكنك أيضًا تنفيذ إعدادك الخاص بناءً على مكون intlayer craco. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## اقرأ دليل Intlayer الكامل لـ React Create App

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق React الخاص بك.
[اطلع على كيفية استخدام intlayer مع React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).
