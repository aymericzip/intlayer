---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: قائمة مشاريع Intlayer
description: تعرّف كيف تُدرَج جميع مشاريع Intlayer في دليل أو مستودع git.
keywords:
  - قائمة
  - مشاريع
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: إضافة خيار الإخراج المطلق إلى أمر list projects
---

# قائمة مشاريع Intlayer

```bash
npx intlayer projects list
```

يبحث هذا الأمر عن جميع مشاريع Intlayer ويسردها عن طريق العثور على الأدلة التي تحتوي على ملفات تكوين Intlayer. يكون هذا مفيدًا لاكتشاف جميع مشاريع Intlayer في monorepo أو workspace أو مستودع git.

## الاختصارات:

- `npx intlayer projects-list`
- `npx intlayer pl`

## الوسائط:

- **`--base-dir [path]`**: حدد الدليل الأساسي للبحث منه. الافتراضي هو دليل العمل الحالي.

  > مثال: `npx intlayer projects list --base-dir /path/to/workspace`

  > مثال: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: البحث من جذر git بدلاً من الدليل الأساسي. هذا مفيد للعثور على جميع مشاريع Intlayer في monorepo أو مستودع git.

  > مثال: `npx intlayer projects list --git-root`

- **`--json`**: إخراج النتائج بتنسيق JSON بدلاً من النص المنسق. مفيد للبرمجة النصية والوصول البرمجي.

  > مثال: `npx intlayer projects list --json`

- **`--absolute`**: إخراج النتائج كمسارات مطلقة بدلاً من المسارات النسبية.

  > مثال: `npx intlayer projects list --absolute`

## كيف يعمل:

يبحث الأمر عن ملفات تكوين Intlayer في الدليل المحدد (أو جذر git إذا تم استخدام `--git-root`). يبحث عن أنماط ملفات التكوين التالية:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

يُعتبر كل دليل يحتوي على أحد هذه الملفات مشروع Intlayer وسيتم إدراجه في الناتج.

## أمثلة:

### سرد المشاريع في الدليل الحالي:

```bash
npx intlayer projects list
```

### قائمة المشاريع في دليل محدد:

```bash
npx intlayer projects list --base-dir ./packages
```

### قائمة جميع المشاريع في مستودع git:

```bash
npx intlayer projects list --git-root
```

### باستخدام الاسم المختصر:

```bash
npx intlayer pl --git-root
```

### الإخراج بتنسيق JSON:

```bash
npx intlayer projects list --json
```

## مثال على المخرجات:

### الإخراج المنسق:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### إخراج JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## حالات الاستخدام:

- **إدارة Monorepo**: اكتشاف جميع مشاريع Intlayer في هيكلية monorepo
- **اكتشاف المشاريع**: العثور على جميع المشاريع المدعومة بواسطة Intlayer في مساحة العمل
- **CI/CD**: التحقق من مشاريع Intlayer في سير عمل مؤتمت
- **التوثيق**: توليد توثيق يسرد جميع المشاريع التي تستخدم Intlayer
- **التوثيق**: إنشاء توثيق يسرد جميع المشاريع التي تستخدم Intlayer

تُرجع المخرجات مسارات مطلقة لكل دليل مشروع، مما يسهل التنقل إليها أو تشغيل عمليات نصية (scripting) على عدة مشاريع Intlayer.
