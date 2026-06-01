---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: كيفية إعداد Intlayer مع Storybook
description: تعرف على كيفية جعل نظام التصميم الخاص بك متعدد اللغات باستخدام Intlayer مع Storybook - قم بتجميع إعلانات المحتوى، وإضافة مبدل اللغة، ومعاينة مكوناتك بأي لغة.
keywords:
  - تدويل
  - توثيق
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer مع Storybook

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `storybook-react-i18next` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية كاملة للقصص المصورة **

تم تحسين Intlayer للعمل بشكل مثالي مع Storybook من خلال تقديم **أدوات تزيين القصص متعددة اللغات**، و**تبديل الإعدادات المحلية**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n) عبر نظام التصميم الخاص بك.

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

## لماذا تستخدم Intlayer مع Storybook؟

Storybook هو الأداة القياسية في الصناعة لتطوير وتوثيق مكونات واجهة المستخدم بشكل معزول. يتيح لك دمجه مع Intlayer:

- **معاينة كل لغة** مباشرة داخل لوحة Storybook باستخدام مبدل شريط الأدوات.
- **اكتشاف الترجمات المفقودة** قبل أن تصل إلى مرحلة الإنتاج.
- **توثيق المكونات متعددة اللغات** بمحتوى حقيقي وآمن من حيث النوع (type-safe) بدلاً من السلاسل النصية الثابتة.

---

## الإعداد خطوة بخطوة

<Tabs>
<Tab value="Vite Setup">

<Steps>

<Step number={1} title="تثبيت التبعيات">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| الحزمة           | الدور                                                    |
| ---------------- | -------------------------------------------------------- |
| `intlayer`       | الأساس - التكوين، تجميع المحتوى، واجهة سطر الأوامر (CLI) |
| `react-intlayer` | روابط React - `IntlayerProvider` و `useIntlayer` hook    |
| `vite-intlayer`  | إضافة Vite - تراقب وتجمع ملفات إعلان المحتوى             |

---

</Step>

<Step number={2} title="إنشاء تكوين Intlayer">

أنشئ ملف `intlayer.config.ts` في جذر مشروعك (أو داخل حزمة نظام التصميم الخاص بك):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف المزيد من اللغات حسب الحاجة
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // مكان وجود ملفات *.content.ts الخاصة بك
  },
};

export default config;
```

> للحصول على القائمة الكاملة للخيارات، راجع [مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

---

</Step>

<Step number={3} title="إضافة إضافة Vite إلى Storybook">

تتيح لك وظيفة `viteFinal` في Storybook توسيع تكوين Vite الداخلي. قم باستيراد وإضافة إضافة `intlayer()` هناك:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …إضافات أخرى
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

تراقب إضافة `intlayer()` ملفات `*.content.ts` الخاصة بك وتعيد بناء القواميس تلقائيًا كلما تغيرت أثناء عملية تطوير Storybook.

---

</Step>

<Step number={4} title="إضافة `IntlayerProvider` ومبدل اللغة في شريط الأدوات">

ملف `preview` في Storybook هو المكان المناسب لتغليف كل قصة (story) بـ `IntlayerProvider` وعرض مبدل اللغة في شريط الأدوات:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // تغليف كل قصة داخل IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // عرض مبدل اللغة في شريط أدوات Storybook
  globalTypes: {
    locale: {
      description: "اللغة النشطة",
      defaultValue: "en",
      toolbar: {
        title: "اللغة",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> يجب أن تتطابق قيم `locale` مع اللغات المعلنة في ملف `intlayer.config.ts` الخاص بك.

</Tab>
<Tab value="Webpack Setup">

</Step>

<Step number={1} title="تثبيت التبعيات">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

</Step>

<Step number={2} title="إنشاء تكوين Intlayer">

أنشئ ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

</Step>

<Step number={3} title="تكوين Webpack لـ Storybook">

بالنسبة لإعدادات Storybook القائمة على Webpack (مثل `@storybook/react-webpack5`)، قم بتوسيع تكوين webpack عبر `webpackFinal` لإضافة أسماء Intlayer البديلة والـ loader:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

</Step>

<Step number={4} title="إضافة `IntlayerProvider` ومبدل اللغة في شريط الأدوات">

كما هو الحال في إعداد Vite - أضف الـ decorator ونوع اللغة العالمي في `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "اللغة النشطة",
      defaultValue: "en",
      toolbar: {
        title: "اللغة",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

</Step>

</Steps>

## إعلان المحتوى

أنشئ ملف `*.content.ts` بجانب كل مكون. سيتعرف عليه Intlayer تلقائيًا أثناء التجميع.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> لمزيد من تنسيقات وميزات إعلان المحتوى، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

---

## استخدام `useIntlayer` في مكون

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      نسخ
    </button>
  );
};
```

تعيد `useIntlayer` القاموس المجمع للغة الحالية المقدمة من أقرب `IntlayerProvider`. يؤدي تبديل اللغة في شريط أدوات Storybook إلى إعادة رندرة القصة تلقائيًا بالترجمات المحدثة.

---

## كتابة القصص للمكونات المدوّلة

مع وجود الـ `IntlayerProvider` decorator، تعمل قصصك تمامًا كما كانت من قبل. يتحكم مبدل اللغة في شريط الأدوات في اللغة النشطة للوحدة بأكملها:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** القصة الافتراضية - قم بتبديل اللغة في شريط الأدوات لمعاينة الترجمات. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** عرض الزر داخل كود برمجى، وهي حالة استخدام شائعة في الواقع. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> ترث كل قصة الـ `locale` العالمي من شريط الأدوات، لذا يمكنك التحقق من كل لغة دون تغيير أي كود في القصة.

---

## اختبار الترجمات في القصص

استخدم وظائف `play` في Storybook للتأكد من رندرة النص المترجم الصحيح للغة معينة:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // التأكد من أن الزر لديه اسم متاح غير فارغ
    await expect(button).toHaveAccessibleName();
    // التأكد من أن الزر غير معطل
    await expect(button).not.toBeDisabled();
    // التأكد من إمكانية الوصول عبر لوحة المفاتيح
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## موارد إضافية

- [مرجع تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق Storybook](https://storybook.js.org/docs)
