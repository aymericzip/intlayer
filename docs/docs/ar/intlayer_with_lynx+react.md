---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "تدويل Lynx + React - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Lynx + React متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - ت Documentation
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء السجل"
author: aymericzip
---

# ترجم Lynx and React mobile app باستخدام Intlayer | التدويل (i18n)

انظر [قالب التطبيق](https://github.com/aymericzip/intlayer-lynx-template) على GitHub.

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `react-native-localize` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية الوشق الكاملة **

تم تحسين Intlayer للعمل بشكل مثالي مع Lynx وReact من خلال تقديم **نطاق المحتوى على مستوى المكونات**، و**دعم TypeScript**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

**حجم البندل**

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

---

<Steps>

<Step number={1} title="تثبيت التبعيات">

من مشروع Lynx الخاص بك، قم بتثبيت الحزم التالية:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> علامة `--interactive` اختيارية. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
```

### الحزم

- **intlayer**  
  أداة i18n الأساسية للتكوين، محتوى القاموس، إنشاء الأنواع، وأوامر CLI.

- **react-intlayer**  
  تكامل React الذي يوفر موفري السياق وخطافات React التي ستستخدمها في Lynx للحصول على اللغات وتبديلها.

- **lynx-intlayer**  
  تكامل Lynx الذي يوفر المكون الإضافي لدمج Intlayer مع Lynx bundler.

---

</Step>

<Step number={2} title="إنشاء تكوين Intlayer">

في جذر مشروعك (أو في أي مكان مناسب)، قم بإنشاء ملف **تكوين Intlayer**. قد يبدو كالتالي:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... أضف أي لغات أخرى تحتاجها
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

داخل هذا التكوين، يمكنك:

- تكوين **قائمة اللغات المدعومة**.
- تعيين لغة **افتراضية**.
- لاحقًا، يمكنك إضافة خيارات أكثر تقدمًا (مثل السجلات، أدلة المحتوى المخصصة، إلخ).
- راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للمزيد.

</Step>

<Step number={3} title="إضافة المكون الإضافي Intlayer إلى Lynx bundler">

لاستخدام Intlayer مع Lynx، تحتاج إلى إضافة المكون الإضافي إلى ملف `lynx.config.ts` الخاص بك:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... مكونات إضافية أخرى
    pluginIntlayerLynx(),
  ],
});
```

</Step>

<Step number={4} title="إضافة موفر Intlayer">

للحفاظ على تزامن لغة المستخدم عبر تطبيقك، تحتاج إلى تغليف المكون الجذري الخاص بك باستخدام المكون `IntlayerProvider` من `react-intlayer`.

أيضًا، تحتاج إلى إضافة ملف وظيفة `intlayerPolyfill` لضمان عمل Intlayer بشكل صحيح.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

</Step>

<Step number={5} title="إعلان المحتوى الخاص بك">

قم بإنشاء ملفات **إعلان المحتوى** في أي مكان في مشروعك (عادةً داخل `src/`)، باستخدام أي من تنسيقات الامتداد التي يدعمها Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- إلخ.

مثال:

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      ar: "اضغط على الشعار واستمتع!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        ar: "تعديل",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        ar: "لرؤية التحديثات!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "ar": "على Lynx",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    }
  },
  "description": {
    "nodeType": "translation",
    "translation": {
      "ar": "اضغط على الشعار واستمتع!",
      "en": "Tap the logo and have fun!",
      "fr": "Appuyez sur le logo et amusez-vous!",
      "es": "¡Toca el logo y diviértete!"
    }
  },
  "hint": [
    {
      "nodeType": "translation",
      "translation": {
        "ar": "تعديل",
        "en": "Edit",
        "fr": "Modifier",
        "es": "Editar"
      }
    },
    " src/App.tsx ",
    {
      "nodeType": "translation",
      "translation": {
        "ar": "لرؤية التحديثات!",
        "en": "to see updates!",
        "fr": "pour voir les mises à jour!",
        "es": "para ver actualizaciones!"
      }
    }
  ]
}
```

> لمزيد من التفاصيل حول إعلانات المحتوى، راجع [وثائق محتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

---

</Step>

<Step number={6} title="استخدام Intlayer في مكوناتك">

استخدم الخطاف `useIntlayer` في المكونات الفرعية للحصول على المحتوى المحلي.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    // تغيير الخلفية فقط
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> عند استخدام `content.someKey` في الخصائص النصية (مثل خاصية `title` للزر أو خاصية `children` لمكون `Text`)، **قم باستدعاء `content.someKey.value`** للحصول على النص الفعلي.

---

</Step>

<Step number={7} title="تغيير لغة التطبيق">

لتبديل اللغات من داخل مكوناتك، يمكنك استخدام طريقة `setLocale` من الخطاف `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

هذا يؤدي إلى إعادة رسم جميع المكونات التي تستخدم محتوى Intlayer، مما يعرض الآن الترجمات للغة الجديدة.

> راجع [وثائق `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) لمزيد من التفاصيل.

</Step>

</Steps>

## إعداد TypeScript (إذا كنت تستخدم TypeScript)

يقوم Intlayer بإنشاء تعريفات الأنواع في مجلد مخفي (افتراضيًا `.intlayer`) لتحسين الإكمال التلقائي واكتشاف أخطاء الترجمة:

```json5
// tsconfig.json
{
  // ... إعدادات TypeScript الحالية
  "include": [
    "src", // كود المصدر الخاص بك
    ".intlayer/types/**/*.ts", // <-- تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا
    // ... أي شيء آخر تقوم بتضمينه بالفعل
  ],
}
```

هذا ما يتيح ميزات مثل:

- **الإكمال التلقائي** لمفاتيح القاموس.
- **التحقق من النوع** الذي يحذرك إذا قمت بالوصول إلى مفتاح غير موجود أو عدم تطابق النوع.

---

## إعداد Git

لتجنب الالتزام بالملفات التي يتم إنشاؤها تلقائيًا بواسطة Intlayer، أضف التالي إلى ملف `.gitignore` الخاص بك:

```bash
#  تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

---

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.
  لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## المزيد من الاستكشاف

- **المحرر المرئي**: استخدم [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) لإدارة الترجمات بشكل مرئي.
- **تكامل CMS**: يمكنك أيضًا استخراج محتوى قاموسك وجلبه من [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).
- **أوامر CLI**: استكشف [CLI الخاص بـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للمهام مثل **استخراج الترجمات** أو **التحقق من المفاتيح المفقودة**.

---
