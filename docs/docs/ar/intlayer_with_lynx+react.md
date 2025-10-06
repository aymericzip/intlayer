---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: كيفية ترجمة تطبيق Lynx and React mobile app – دليل i18n 2025
description: اكتشف كيفية جعل موقعك الذي يستخدم Lynx و React مع Page Router متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.
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
---

# ترجم Lynx and React mobile app باستخدام Intlayer | التدويل (i18n)

انظر [قالب التطبيق](https://github.com/aymericzip/intlayer-lynx-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي **مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر** تُبسط دعم اللغات المتعددة في التطبيقات الحديثة. تعمل في العديد من بيئات JavaScript/TypeScript، **بما في ذلك Lynx** (عبر حزمة `react-intlayer`).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **ضمان دعم TypeScript** مع الأنواع التي يتم إنشاؤها تلقائيًا.
- **تخصيص المحتوى ديناميكيًا**، بما في ذلك **سلاسل واجهة المستخدم** (وفي React للويب، يمكنه أيضًا تخصيص بيانات HTML الوصفية، إلخ).
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

---

## الخطوة 1: تثبيت التبعيات

من مشروع Lynx الخاص بك، قم بتثبيت الحزم التالية:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### الحزم

- **intlayer**  
  أداة i18n الأساسية للتكوين، محتوى القاموس، إنشاء الأنواع، وأوامر CLI.

- **react-intlayer**  
  تكامل React الذي يوفر موفري السياق وخطافات React التي ستستخدمها في Lynx للحصول على اللغات وتبديلها.

- **lynx-intlayer**  
  تكامل Lynx الذي يوفر المكون الإضافي لدمج Intlayer مع Lynx bundler.

---

## الخطوة 2: إنشاء تكوين Intlayer

في جذر مشروعك (أو في أي مكان مناسب)، قم بإنشاء ملف **تكوين Intlayer**. قد يبدو كالتالي:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
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

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

داخل هذا التكوين، يمكنك:

- تكوين **قائمة اللغات المدعومة**.
- تعيين لغة **افتراضية**.
- لاحقًا، يمكنك إضافة خيارات أكثر تقدمًا (مثل السجلات، أدلة المحتوى المخصصة، إلخ).
- راجع [وثائق تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للمزيد.

## الخطوة 3: إضافة المكون الإضافي Intlayer إلى Lynx bundler

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

## الخطوة 4: إضافة موفر Intlayer

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

## الخطوة 5: إعلان المحتوى الخاص بك

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

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ar: "على Lynx",
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
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      ar: "على Lynx",
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
};

module.exports = appContent;
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

> لمزيد من التفاصيل حول إعلانات المحتوى، راجع [وثائق محتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

---

## الخطوة 4: استخدام Intlayer في مكوناتك

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

## (اختياري) الخطوة 5: تغيير لغة التطبيق

لتبديل اللغات من داخل مكوناتك، يمكنك استخدام طريقة `setLocale` من الخطاف `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "intlayer";

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

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
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
- **أوامر CLI**: استكشف [CLI الخاص بـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) للمهام مثل **استخراج الترجمات** أو **التحقق من المفاتيح المفقودة**.

---

## سجل التوثيق

- 5.5.10 - 2025-06-29: بدء السجل
