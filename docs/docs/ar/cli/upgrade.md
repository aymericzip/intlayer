---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 5
title: CLI - ترقية حزم Intlayer
description: تعرف على كيفية استخدام أمر upgrade في Intlayer CLI لسرد كل حزمة Intlayer في مشروعك أو monorepo وترقيتها إلى أحدث إصدار.
keywords:
  - CLI
  - Upgrade
  - ترقية
  - Packages
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "إضافة أمر upgrade"
author: aymericzip
---

# ترقية حزم Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

يسرد الأمر `upgrade` حزم Intlayer المعلنة في كل `package.json` من مشروعك، بما في ذلك مساحات عمل (workspaces) الـ monorepo، ويقوم بترقيتها إلى أحدث إصدار منشور. وهو ينفذ نفس خطوة ترقية الحزم الخاصة بـ `intlayer init` بشكل مستقل.

## الوسيطات:

- `--project-root [projectRoot]` - اختياري. دليل جذر المشروع. افتراضيًا، يبدأ الأمر من أقرب `package.json` أعلى دليل العمل الحالي.
- `--dry-run` - اختياري. يسرد الحزم وإصدارها المستهدف دون تعديل أي ملف.
- `--tag <tag>` - اختياري. npm dist-tag للترقية إليه (على سبيل المثال `canary`). الافتراضي هو `latest`.

## ما يقوم به:

1. **يسرد حزم Intlayer** - يفحص كل `package.json` في المشروع (متجاوزًا `node_modules` ومخرجات البناء) بحثًا عن تبعيات و devDependencies الخاصة بـ `intlayer` و `@intlayer/*` و `*-intlayer` و `intlayer-*`.
2. **يجلب الإصدار المستهدف** - يقرأ إصدار الـ dist-tag المحدد (افتراضيًا `latest`) لكل حزمة من سجل npm.
3. **يعيد كتابة النطاقات** - يحدّث كل نطاق قديم في مكانه، مع الحفاظ على المعامل الخاص به (`^` أو `~` أو لا شيء) ومسافات بادئة الملف.
4. **يثبت مرة واحدة** - ينفذ عملية تثبيت واحدة من جذر مساحة العمل (أقرب دليل يحتوي على lock file)، باستخدام مدير الحزم المالك لملف القفل:

| ملف القفل (Lock file)           | الأمر          |
| ------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`        | `bun install`  |
| `pnpm-lock.yaml`                | `pnpm install` |
| `yarn.lock`                     | `yarn install` |
| `package-lock.json` أو بدون قفل | `npm install`  |

إذا لم يكن هناك ملف قفل، فسيتم استخدام حقل `packageManager` في `package.json` (على سبيل المثال `"bun@1.2.0"`) قبل الرجوع إلى npm.

النطاقات التي لا تشير إلى السجل، مثل `workspace:*` أو `file:` أو `link:` أو `catalog:` أو عناوين git URL، لا يتم تعديلها أبدًا.

## أمثلة:

### سرد الترقيات المتاحة دون تطبيقها:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### الترقية إلى إصدار canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## مثال للمخرجات:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## ملاحظات:

- شغّل الأمر من جذر المستودع الخاص بك لترقية كل مساحة عمل. شغّله من مساحة عمل معينة لترقية تلك المساحة فقط.
- الحزم التي لا يمكن جلب إصدارها (غير متصل بالإنترنت، حزمة خاصة أو غير منشورة) يتم سردها وتُترك دون تغيير.
- إذا فشل التثبيت، فسيتم الاحتفاظ بالنطاقات التي تمت ترقيتها في `package.json`. شغّل أمر التثبيت الخاص بمدير الحزم يدويًا.
