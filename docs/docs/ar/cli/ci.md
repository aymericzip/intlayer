---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: أمر CI
description: تعلم كيفية استخدام أمر Intlayer CI لتشغيل أوامر Intlayer مع بيانات الاعتماد المحقونة تلقائياً في خطوط أنابيب CI/CD والمستودعات الأحادية.
keywords:
  - CI
  - CI/CD
  - الأتمتة
  - المستودع الأحادي
  - بيانات الاعتماد
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "إضافة أمر CI"
author: aymericzip
---

# أمر CI

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

تم تصميم أمر CI للأتمتة وخطوط أنابيب CI/CD. يقوم بحقن بيانات الاعتماد تلقائياً من متغير البيئة `INTLAYER_PROJECT_CREDENTIALS` ويمكنه تشغيل أوامر Intlayer عبر مشاريع متعددة في مستودع أحادي.

## كيفية العمل

يعمل أمر CI في وضعين:

1. **وضع المشروع الواحد**: إذا كان الدليل الحالي يطابق أحد مسارات المشاريع في `INTLAYER_PROJECT_CREDENTIALS`، فإنه يشغل الأمر فقط لهذا المشروع المحدد.

2. **وضع التكرار**: إذا لم يتم اكتشاف سياق مشروع محدد، فإنه يتكرر عبر جميع المشاريع المُكوّنة ويشغل الأمر لكل واحد منها.

## متغير البيئة

يتطلب الأمر تعيين متغير البيئة `INTLAYER_PROJECT_CREDENTIALS`. يجب أن يحتوي هذا المتغير على كائن JSON يقوم بتعيين مسارات المشاريع إلى بيانات اعتمادها:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## اكتشاف مدير الحزم

يكتشف أمر CI تلقائياً مدير الحزم المستخدم (npm أو yarn أو pnpm أو bun) بناءً على متغير البيئة `npm_config_user_agent` ويستخدم الأمر المناسب لتنفيذ Intlayer.

## الوسائط

- **`<command...>`**: أمر Intlayer المراد تنفيذه (على سبيل المثال، `fill` أو `push` أو `build`). يمكنك تمرير أي أمر Intlayer ووسائطه.

  > مثال: `npx intlayer ci fill --verbose`
  >
  > مثال: `npx intlayer ci push`
  >
  > مثال: `npx intlayer ci build`

## أمثلة

### تشغيل أمر في وضع المشروع الواحد

إذا كنت في دليل مشروع يطابق أحد المسارات في `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

سيقوم هذا بتشغيل أمر `fill` مع حقن بيانات الاعتماد تلقائياً لمشروع `packages/app`.

### تشغيل أمر عبر جميع المشاريع

إذا كنت في دليل لا يطابق أي مسار مشروع، سيتكرر الأمر عبر جميع المشاريع المُكوّنة:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

سيقوم هذا بتشغيل أمر `push` لكل مشروع مُكوّن في `INTLAYER_PROJECT_CREDENTIALS`.

### تمرير علامات إضافية

يمكنك تمرير أي علامات إلى أمر Intlayer الأساسي:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### الاستخدام في خطوط أنابيب CI/CD

في تكوين CI/CD الخاص بك (على سبيل المثال، GitHub Actions أو GitLab CI)، قم بتعيين `INTLAYER_PROJECT_CREDENTIALS` كسر:

```yaml
# مثال GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: ملء القواميس
    run: npx intlayer ci fill
```

## إجراءات GitHub المُنشأة تلقائياً

عند تشغيل `intlayer init`، يكتشف Intlayer مدير الحزم الخاص بك (npm أو yarn أو pnpm أو bun) وينشئ سير عملين من إجراءات GitHub تحت `.github/workflows/`، مع أوامر تطابق مدير الحزم هذا:

- **`intlayer-fill.yml`** — في كل طلب دمج، ينشئ القواميس ويشغل `intlayer fill --git-diff --mode complete` لإنشاء الترجمات المفقودة للقواميس المتغيرة، ثم يرسل النتيجة مرة أخرى إلى فرع طلب الدمج.
- **`intlayer-test.yml`** — في كل طلب دمج، ينشئ القواموس ويشغل `intlayer test`، ويفشل الفحص عندما تكون الترجمات المطلوبة مفقودة للغات المطلوبة.

لن يتم استبدال ملفات سير العمل الموجودة. لتخطي الإنشاء بالكامل، قم بتشغيل:

```bash
npx intlayer init --no-github-actions
```

### توفير وصول الذكاء الاصطناعي لسير العمل fill

ملف `intlayer-fill.yml` المُنشأ يتطلب وصول الذكاء الاصطناعي. يتوفر خياران (مُكوّنان في كتلة `env` في سير العمل):

1. **مفتاح مزود الذكاء الاصطناعي الخاص بك** — أضف سراً `AI_API_KEY` في إعدادات المستودع (Settings → Secrets and variables → Actions). يقوم سير العمل بإعادة توجيهه عبر `--provider` و `--model` و `--api-key`.
2. **مفاتيح وصول Intlayer CMS** — أضف أسراراً `INTLAYER_CLIENT_ID` و `INTLAYER_CLIENT_SECRET` وربطها في قسم `editor` الخاص بك في `intlayer.config`. مفاتيح وصول CMS تمنح وصول الذكاء الاصطناعي من خلال خادم Intlayer الخلفي.

سير العمل `intlayer-test.yml` لا يتطلب أي وصول للذكاء الاصطناعي.

## معالجة الأخطاء

- إذا لم يتم تعيين `INTLAYER_PROJECT_CREDENTIALS`، فسيخرج الأمر مع خطأ.
- إذا لم يكن `INTLAYER_PROJECT_CREDENTIALS` JSON صالحاً، فسيخرج الأمر مع خطأ.
- إذا لم يكن مسار المشروع موجوداً، فسيتم تخطيه مع تحذير.
- إذا فشل أي مشروع، فسيخرج الأمر برمز حالة غير صفري.

## حالات الاستخدام

- **أتمتة المستودع الأحادي**: تشغيل أوامر Intlayer عبر مشاريع متعددة في مستودع أحادي
- **خطوط أنابيب CI/CD**: أتمتة إدارة القواميس في سير عمل التكامل المستمر
- **العمليات المجمعة**: تنفيذ نفس العملية على مشاريع Intlayer متعددة في وقت واحد
- **إدارة الأسرار**: إدارة بيانات الاعتماد بشكل آمن لعدة مشاريع باستخدام متغيرات البيئة

## أفضل ممارسات الأمان

- قم بتخزين `INTLAYER_PROJECT_CREDENTIALS` كأسرار مشفرة في منصة CI/CD الخاصة بك
- لا تقم أبداً بإيداع بيانات الاعتماد في التحكم بالإصدارات
- استخدم بيانات اعتماد خاصة بالبيئة لبيئات النشر المختلفة
- قم بتدوير بيانات الاعتماد بانتظام
