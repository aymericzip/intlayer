---
createdAt: 2025-03-01
updatedAt: 2026-10-27
priority: 8
title: "اختبار ترجماتك باستخدام Intlayer"
description: "اختبر محتوى Intlayer: اكتشف الترجمات الناقصة، وتحقّق من القواميس في CI، واعرض المكوّنات لكل لغة في اختبارات الوحدة."
keywords:
  - اختبار
  - Intlayer
  - التدويل
  - نظام إدارة المحتوى
  - محرر بصري
slugs:
  - doc
  - testing
history:
  - version: 6.1.0
    date: 2026-10-27
    changes: "توضيح أن content test ينتهي برمز غير صفري عند غياب اللغات المطلوبة"
  - version: 6.0.0
    date: 2025-09-20
    changes: "تقديم الاختبارات"
author: aymericzip
---

# اختبار المحتوى الخاص بك

يوضح هذا الدليل كيفية التحقق تلقائيًا من اكتمال قواميسك، واكتشاف الترجمات المفقودة قبل النشر، واختبار واجهة المستخدم المحلية في تطبيقك.

## ما يمكنك اختباره

- **الترجمات المفقودة**: فشل في CI إذا كانت هناك أي لغات مطلوبة مفقودة لأي قاموس.
- **عرض واجهة المستخدم المحلية**: عرض المكونات باستخدام مزود لغة محدد والتحقق من النصوص/السمات المرئية.
- **تدقيق وقت البناء**: شغّل `npx intlayer content test` محليًا أو في CI؛ ينتهي برمز غير صفري عند غياب الترجمات المطلوبة.

## بداية سريعة: التدقيق عبر CLI

شغّل التدقيق من جذر مشروعك:

```bash packageManager="npm"
npx intlayer content test
```

```bash packageManager="yarn"
yarn intlayer content test
```

```bash packageManager="pnpm"
pnpm intlayer content test
```

```bash packageManager="bun"
bun x intlayer content test
```

علامات مفيدة:

- `--env-file [path]`: تحميل متغيرات البيئة من ملف.
- `-e, --env [name]`: اختيار ملف تعريف البيئة.
- `--base-dir [path]`: تعيين الدليل الأساسي للتطبيق لحل المسارات.
- `--verbose`: عرض سجلات مفصلة.
- `--prefix [label]`: إضافة بادئة لأسطر السجل.

ينتهي الأمر بالرمز `1` عندما تكون أي لغة مطلوبة مفقودة (انظر `requiredLocales` في إعداداتك)، وبالرمز `0` خلاف ذلك. يمكنك استخدامه مباشرة لإفشال مهام CI أو خطافات الالتزام. الاختبار البرمجي أدناه بديل اختياري.

## اختبار برمجي (Vitest/Jest)

استخدم واجهة برمجة تطبيقات Intlayer CLI للتأكد من عدم وجود ترجمات مفقودة للغات المطلوبة.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("الترجمات", () => {
  it("لا توجد لغات مطلوبة مفقودة", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // مفيد عند فشل الاختبار محليًا أو في CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

المكافئ في Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("لا توجد لغات مطلوبة مفقودة", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

كيف يعمل:

- يقرأ Intlayer تكوينك (اللغات locales، اللغات المطلوبة requiredLocales) والقواميس المعلنة، ثم يبلغ عن:
  - `missingTranslations`: لكل مفتاح، أي اللغات مفقودة ومن أي ملف.
  - `missingLocales`: اتحاد جميع اللغات المفقودة.
  - `missingRequiredLocales`: مجموعة فرعية محدودة بـ `requiredLocales` (أو جميع اللغات إذا لم يتم تعيين `requiredLocales`).

## اختبار واجهة المستخدم المحلية (React / Next.js)

قم بعرض المكونات تحت مزود Intlayer وتحقق من المحتوى المرئي.

مثال React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("العنوان الإنجليزي المتوقع")).toBeInTheDocument();
});
```

مثال Next.js (App Router): استخدم غلاف الإطار:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("يعرض العنوان المحلي بالفرنسية", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "العنوان المتوقع" })
  ).toBeInTheDocument();
});
```

نصائح:

- عندما تحتاج إلى قيم نصية خام للسمات (مثل `aria-label`)، قم بالوصول إلى الحقل `.value` الذي يتم إرجاعه بواسطة `useIntlayer` في React.
- احتفظ بالقواميس بجانب المكونات لتسهيل اختبار الوحدة والتنظيف.

## التكامل المستمر

شغّل تدقيق CLI في CI. يفشل المهمة عندما تكون الترجمات المطلوبة مفقودة.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "npx intlayer content test"
  }
}
```

بديل: Vitest

```json
{
  "scripts": {
    "test:i18n": "vitest run"
  }
}
```

مثال على GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx intlayer content test
```

اختياري: قم بتشغيل تدقيق CLI للحصول على ملخص قابل للقراءة البشرية إلى جانب الاختبارات:

```bash packageManager="npm"
npx intlayer content test --verbose
```

```bash packageManager="yarn"
yarn intlayer content test --verbose
```

```bash packageManager="pnpm"
pnpm intlayer content test --verbose
```

```bash packageManager="bun"
bun x intlayer content test --verbose
```

## استكشاف الأخطاء وإصلاحها

- تأكد من أن تكوين Intlayer الخاص بك يحدد `locales` و (اختياريًا) `requiredLocales`.
- إذا كان تطبيقك يستخدم قواميس ديناميكية أو عن بُعد، فقم بتشغيل الاختبارات في بيئة تتوفر فيها القواميس.
- بالنسبة للمستودعات المختلطة (monorepos)، استخدم `--base-dir` لتوجيه CLI إلى جذر التطبيق الصحيح.

---
