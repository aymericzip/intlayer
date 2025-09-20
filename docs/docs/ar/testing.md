---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: اختبار المحتوى الخاص بك
description: اكتشف كيفية اختبار المحتوى الخاص بك باستخدام Intlayer.
keywords:
  - اختبار
  - Intlayer
  - التدويل
  - نظام إدارة المحتوى
  - محرر بصري
slugs:
  - doc
  - testing
---

# اختبار المحتوى الخاص بك

يوضح هذا الدليل كيفية التحقق تلقائيًا من اكتمال قواميسك، واكتشاف الترجمات المفقودة قبل النشر، واختبار واجهة المستخدم المحلية في تطبيقك.

---

## ما يمكنك اختباره

- **الترجمات المفقودة**: فشل في CI إذا كانت هناك أي لغات مطلوبة مفقودة لأي قاموس.
- **عرض واجهة المستخدم المحلية**: عرض المكونات باستخدام مزود لغة محدد والتحقق من النصوص/السمات المرئية.
- **تدقيق وقت البناء**: إجراء تدقيق سريع محليًا عبر CLI.

---

## بداية سريعة: التدقيق عبر CLI

شغّل التدقيق من جذر مشروعك:

```bash
npx intlayer content test
```

علامات مفيدة:

- `--env-file [path]`: تحميل متغيرات البيئة من ملف.
- `-e, --env [name]`: اختيار ملف تعريف البيئة.
- `--base-dir [path]`: تعيين الدليل الأساسي للتطبيق لحل المسارات.
- `--verbose`: عرض سجلات مفصلة.
- `--prefix [label]`: إضافة بادئة لأسطر السجل.

ملاحظة: يقوم CLI بطباعة تقرير مفصل لكنه لا يخرج برمز خطأ عند الفشل. لاستخدامه في CI، أضف اختبار وحدة (أسفله) يؤكد عدم وجود لغات مطلوبة مفقودة.

---

## اختبار برمجي (Vitest/Jest)

استخدم واجهة برمجة تطبيقات Intlayer CLI للتأكد من عدم وجود ترجمات مفقودة للغات المطلوبة.

```ts file=i18n.test.ts
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

```ts file=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("لا توجد لغات مطلوبة مفقودة", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
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

---

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

---

## التكامل المستمر

أضف اختبارًا يفشل البناء عندما تكون الترجمات المطلوبة مفقودة.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
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
      - run: npm run test:i18n
```

اختياري: قم بتشغيل تدقيق CLI للحصول على ملخص قابل للقراءة البشرية إلى جانب الاختبارات:

```bash
npx intlayer content test --verbose
```

---

## استكشاف الأخطاء وإصلاحها

- تأكد من أن تكوين Intlayer الخاص بك يحدد `locales` و (اختياريًا) `requiredLocales`.
- إذا كان تطبيقك يستخدم قواميس ديناميكية أو عن بُعد، فقم بتشغيل الاختبارات في بيئة تتوفر فيها القواميس.
- بالنسبة للمستودعات المختلطة (monorepos)، استخدم `--base-dir` لتوجيه CLI إلى جذر التطبيق الصحيح.

---

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات        |
| ------- | ---------- | ---------------- |
| 6.0.0   | 2025-09-20 | تقديم الاختبارات |
