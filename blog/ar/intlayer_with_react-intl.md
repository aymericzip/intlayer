# React Internationalization (i18n) مع **react-intl** و Intlayer

هذا الدليل يوضح كيفية دمج **Intlayer** مع **react-intl** لإدارة الترجمات في تطبيق React. ستقوم بإعلان المحتوى القابل للترجمة الخاص بك باستخدام Intlayer ثم استهلاك تلك الرسائل مع **react-intl**، وهي مكتبة شهيرة من نظام [FormatJS](https://formatjs.io/docs/react-intl) البيئي.

## نظرة عامة

- **Intlayer** يسمح لك بتخزين الترجمات في ملفات إعلان المحتوى على مستوى المكون (JSON، JS، TS، إلخ) داخل مشروعك.
- **react-intl** يوفر مكونات React وhooks (مثل `<FormattedMessage>` و `useIntl()`) لعرض السلاسل المحلية.

من خلال تكوين Intlayer لـ **تصدير** الترجمات بتنسيق متوافق مع **react-intl**، يمكنك تلقائيًا **توليد** و **تحديث** ملفات الرسائل التي يتطلبها `<IntlProvider>` (من react-intl).

---

## لماذا استخدام Intlayer مع react-intl؟

1. **إعلانات محتوى لكل مكون**  
   يمكن أن تعيش ملفات إعلان محتوى Intlayer بجانب مكونات React الخاصة بك، مما يمنع "ترجمات يتيمة" إذا تم نقل المكونات أو إزالتها. على سبيل المثال:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # إعلان محتوى Intlayer
               └── index.tsx          # مكون React
   ```

2. **ترجمات مركزية**  
   كل ملف إعلان محتوى يجمع جميع الترجمات التي يحتاجها مكون. هذا مفيد بشكل خاص في مشاريع TypeScript: يمكن اكتشاف الترجمات المفقودة في **وقت التجميع**.

3. **بناء تلقائي وتجديد**  
   كلما قمت بإضافة أو تحديث الترجمات، يقوم Intlayer بتجديد ملفات JSON للرسائل. يمكنك بعد ذلك تمرير هذه إلى `<IntlProvider>` لـ react-intl.

---

## التثبيت

في مشروع React النموذجي، قم بتثبيت ما يلي:

```bash
# مع npm
npm install intlayer react-intl

# مع yarn
yarn add intlayer react-intl

# مع pnpm
pnpm add intlayer react-intl
```

### لماذا هذه الحزم؟

- **intlayer**: CLI و مكتبة أساسية تفحص إعلانات المحتوى، تدمجها، وتبني المخرجات القاموس.
- **react-intl**: المكتبة الرئيسية من FormatJS التي توفر `<IntlProvider>`، `<FormattedMessage>`، `useIntl()` وغيرها من العناصر الأساسية في التدويل.

> إذا لم يكن لديك React مثبتًا بالفعل، ستحتاج إلى ذلك أيضًا (`react` و `react-dom`).

## تكوين Intlayer لتصدير رسائل react-intl

في جذر مشروعك، أنشئ **`intlayer.config.ts`** (أو `.js`، `.mjs`، `.cjs`) كما يلي:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // أضف العديد من اللغات كما ترغب
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // يخبر Intlayer بتوليد ملفات الرسائل لـ react-intl
    dictionaryOutput: ["react-intl"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON للرسائل الخاصة بك
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **ملاحظة**: للحصول على امتدادات ملفات أخرى (`.mjs`، `.cjs`، `.js`) ، راجع [وثائق Intlayer](https://intlayer.org/ar/doc/concept/configuration) للحصول على تفاصيل الاستخدام.

---

## إنشاء إعلانات محتوى Intlayer الخاصة بك

يقوم Intlayer بفحص قاعدة الشيفرة الخاصة بك (بشكل افتراضي، تحت `./src`) للملفات المطابقة لـ `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
إليك مثال **TypeScript**:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" يصبح المفتاح الرئيسي للرسالة في ملف JSON الخاص بك react-intl
  key: "my-component",

  content: {
    // كل استدعاء لـ t() يعلن عن حقل قابل للترجمة
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

إذا كنت تفضل JSON أو نكهات JS مختلفة (`.cjs`، `.mjs`)، فإن الهيكل مشابه إلى حد كبير - راجع [وثائق Intlayer حول إعلان المحتوى](https://intlayer.org/ar/doc/concept/content).

---

## بناء رسائل react-intl

لتوليد ملفات JSON الفعلية للرسائل لـ **react-intl**، قم بتشغيل:

```bash
# مع npm
npx intlayer build

# مع yarn
yarn intlayer build

# مع pnpm
pnpm intlayer build
```

هذا يقوم بمسح جميع ملفات `*.content.*`، وتجميعها، وكتابة النتائج إلى الدليل المحدد في **`intlayer.config.ts`** - في هذا المثال، `./react-intl/messages`.  
يمكن أن يبدو المخرجات النموذجية كما يلي:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

كل ملف هو كائن JSON تُطابق **المفاتيح العليا** الخاصة به كل **`content.key`** من إعلاناتك. تعكس **المفاتيح الفرعية** (مثل `helloWorld`) الترجمات المعلنة داخل تلك العنصر المحتوى.

على سبيل المثال، قد يبدو **en.json** كما يلي:

```json filePath="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## تهيئة react-intl في تطبيق React الخاص بك

### 1. تحميل الرسائل التي تم إنشاؤها

حيث تقوم بتكوين مكون الجذر لتطبيقك (مثل `src/main.tsx` أو `src/index.tsx`)، ستحتاج إلى:

1. **استيراد** ملفات الرسالة المولدة (إما بشكل ثابت أو ديناميكي).
2. **تقديم**ها إلى `<IntlProvider>` من `react-intl`.

طريقة بسيطة هي استيرادها **ثابتًا**:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// استيراد ملفات JSON من المخرجات التي تم بنائها.
// بدلاً من ذلك، يمكنك الاستيراد ديناميكيًا بناءً على لغة المستخدم المختارة.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// إذا كان لديك آلية لاكتشاف لغة المستخدم، قم بتعيينها هنا.
// للبساطة، دعنا نختار الإنجليزية.
const locale = "en";

// جمع الرسائل في كائن (أو اختيارها ديناميكيًا)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **نصيحة**: لمشاريع حقيقية، قد ترغب في:
>
> - تحميل الرسائل JSON بشكل ديناميكي وقت التشغيل.
> - استخدام الكشف عن اللغة المبني على البيئة أو على المتصفح أو على حساب المستخدم.

### 2. استخدام `<FormattedMessage>` أو `useIntl()`

بمجرد تحميل رسائلك في `<IntlProvider>`, يمكن لأي مكون طفل استخدام react-intl للوصول إلى السلاسل المحلية. هناك طريقتان رئيسيتان:

- **مكون `<FormattedMessage>`**
- **خطاف `useIntl()`**

---

## استخدام الترجمات في مكونات React

### النهج A: `<FormattedMessage>`

للاستخدام السريع في السطر:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* "my-component.helloWorld" يشير إلى المفتاح من en.json، fr.json، إلخ. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> يجب أن تطابق خاصية **`id`** في `<FormattedMessage>` **المفتاح الرئيسي** (`my-component`) بالإضافة إلى أي مفاتيح فرعية (`helloWorld`).

### النهج B: `useIntl()`

للاستخدام الأكثر ديناميكية:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

كلا النهجين صالحة - اختر النمط الذي يناسب تطبيقك.

---

## تحديث أو إضافة ترجمات جديدة

1. **أضف أو عدل** المحتوى في أي ملف `*.content.*`.
2. أعد تشغيل `intlayer build` لتجديد ملفات JSON تحت `./react-intl/messages`.
3. سوف يلتقط React (و react-intl) التحديثات في المرة القادمة التي تعيد فيها بناء أو تحميل تطبيقك.

---

## تكامل TypeScript (اختياري)

إذا كنت تستخدم TypeScript، يمكن أن يقوم Intlayer **بتوليد تعريفات الأنواع** لترجماتك.

- تأكد من أن `tsconfig.json` يتضمن مجلد `types` الخاص بك (أو أي مجلد ناتج ينشئه Intlayer) في مصفوفة `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

يمكن أن تساعد الأنواع المولدة في الكشف عن الترجمات المفقودة أو المفاتيح غير الصالحة في مكونات React الخاصة بك في وقت التجميع.

---

## تكوين Git

من الشائع **استبعاد** العناصر الناتجة الداخلية لـ Intlayer من التحكم في الإصدارات. في ملف `.gitignore` الخاص بك، أضف:

```plaintext
# تجاهل العناصر الناتجة من بناء intlayer
.intlayer
react-intl
```

اعتمادًا على سير عملك، قد ترغب أيضًا في تجاهل أو الالتزام بالقواميس النهائية في `./react-intl/messages`. إذا كان خط أنابيب CI/CD لديك يجددها، يمكنك تجاهلها بأمان؛ وإلا، التزم بها إذا كنت بحاجة إليها لعمليات نشر الإنتاج.
