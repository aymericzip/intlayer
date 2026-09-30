---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: إعداد Intlayer في مشروعك"
description: "شغّل intlayer init لإضافة Intlayer إلى مشروع موجود: يكتشف إطار العمل، ويثبّت الحزم، ويكتب ملفات الإعداد."
keywords:
  - تهيئة
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "أصبح init يثبّت الحزم ويُعدّ إطار العمل فقط؛ إضافة أمر فرعي لكل خطوة؛ يفشل --interactive دون طرفية"
  - version: 9.5.6
    date: 2026-09-21
    changes: "إضافة الأمر الفرعي init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "إضافة خيار --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
author: aymericzip
---

# تهيئة Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

يثبّت الأمر `init` حزم Intlayer ويُعدّ إطار العمل لديك (ملف الإعداد، TypeScript، إضافة المُجمِّع، middleware/proxy، المزوّدات). وهو الطريقة الموصى بها للبدء مع Intlayer.

كل ما عدا ذلك (مسارات عمل CI، مهارات الذكاء الاصطناعي، خادم MCP، أدوات المحرر، قواعد lint، CMS، البنية التحتية) اختياري: اختره من قائمة `--interactive`، أو شغّل الأمر الفرعي المخصص له (انظر أدناه).

## الأسماء المستعارة:

- `npx intlayer init`

## الوسائط:

- `--project-root [projectRoot]` - اختياري. حدد الدليل الجذر للمشروع. إذا لم يتم توفيره ، فسيقوم الأمر بالبحث عن جذر المشروع بدءًا من دليل العمل الحالي.
- `--no-gitignore` - اختياري. يتخطى التحديث التلقائي لملف `.gitignore`. إذا تم تعيين هذا العلم ، فلن يتم إضافة `.intlayer` إلى `.gitignore`.
- `--no-framework-setup` - اختياري. يثبّت الحزم فقط، دون تعديل ملفات المشروع.
- `--routing <routing>` - اختياري. توجيه اللغات: `prefix-no-default` (افتراضي)، `prefix-all`، `no-prefix`، `search-params` أو `none`.
- `-i, --interactive` - اختياري. اختر خطوات الإعداد من قائمة (الحزم، CI، المهارات، MCP، VS Code، LSP، lint، CMS، البنية التحتية، …) بدلًا من المجموعة الافتراضية. يتطلب طرفية: بدونها (وكيل ذكاء اصطناعي، CI) يفشل الأمر ويعرض الأوامر الفرعية التي يجب تشغيلها بدلًا منه.
- `--no-github-actions` - اختياري. مع `--interactive`، لا يُنشئ أبدًا مسارات عمل GitHub Actions، حتى لو كانت محددة.

## ماذا يفعل:

يقوم أمر `init` بمهام الإعداد التالية:

1. **التحقق من صحة هيكل المشروع** - يضمن أنك في دليل مشروع صالح مع ملف `package.json`.
2. **يثبّت الحزم** - يثبّت حزم Intlayer الناقصة لمكدّسك التقني (مثل `react-intlayer` و`vite-intlayer`) ويحدّث القديمة منها.
3. **تحديث `.gitignore`** - يضيف `.intlayer` إلى ملف `.gitignore` الخاص بك لاستبعاد الملفات التي تم إنشاؤها من التحكم في الإصدار (يمكن تخطيه باستخدام `--no-gitignore`).
4. **تكوين TypeScript** - يقوم بتحديث أي ملفات `tsconfig.json` لتشمل تعريفات أنواع Intlayer (`.intlayer/**/*.ts`).
5. **إنشاء ملف التكوين** - ينشئ `intlayer.config.ts` (لمشاريع TypeScript) أو `intlayer.config.mjs` (لمشاريع JavaScript) مع الإعدادات الافتراضية.
6. **يحدّث إعداد المُجمِّع / إطار العمل** - يضيف إضافة Intlayer إلى إعداد Vite أو Next.js أو Nuxt أو Astro أو غيرها، ويُنشئ middleware/proxy والمزوّدات عندما يدعم إطار العمل ذلك.

## الإعداد خطوة بخطوة

لكل خطوة في قائمة `--interactive` أمر فرعي خاص بها. لا تطرح هذه الأوامر أي سؤال عند تمرير القيم كخيارات، لذا يمكن تشغيلها بأمان من وكيل ذكاء اصطناعي أو من مهمة CI.

| الأمر                                                                 | ما يُعدّه                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | يثبّت حزم Intlayer الناقصة ويحدّث القديمة                                             |
| `intlayer init project [--routing <routing>]`                         | ملف الإعداد، TypeScript، إضافة المُجمِّع، middleware/proxy، المزوّدات و`.gitignore`   |
| `intlayer init github-actions`                                        | مسارا عمل GitHub Actions `fill` و`test`                                               |
| `intlayer init vscode-extension`                                      | يوصي بإضافة Intlayer في `.vscode/extensions.json`                                     |
| `intlayer init lsp`                                                   | خادم لغة Intlayer في `.vscode/settings.json`                                          |
| `intlayer init eslint`                                                | قواعد lint الخاصة بـ Intlayer (ESLint / oxlint)، إذا كان المشروع يستخدم linter بالفعل |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | توثيق Intlayer على شكل مهارات لوكلاء الذكاء الاصطناعي                                 |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | خادم MCP الخاص بـ Intlayer                                                            |
| `intlayer init extension [--browser <chrome/firefox>]`                | يفتح صفحة إضافة المتصفح Intlayer في المتجر                                            |
| `intlayer init cms`                                                   | تسجيل الدخول إلى Intlayer CMS عبر المتصفح وحفظ بيانات الاعتماد في `.env`              |
| `intlayer init infra --mode <desktop/docker/compose>`                 | تطبيق سطح المكتب أو مكدّس مستضاف ذاتيًا                                               |

### من وكيل ذكاء اصطناعي أو مهمة CI

لا تملك صدفة وكيل الذكاء الاصطناعي طرفية، لذا لا يمكن الإجابة عن أي سؤال. استخدم الأمر الافتراضي، ثم الأوامر الفرعية التي تحتاجها:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

دون طرفية:

- يثبّت `init skills` المهارات المناسبة لمكدّسك ما لم يُحدَّد `--skills` (مثل `--skills Usage Content React`).
- يستخدم `init skills` و`init mcp` منصة الذكاء الاصطناعي المكتشفة (Claude Code، Cursor، VS Code، Windsurf، …) ما لم يُحدَّد `--platform`، ويفشلان مع قائمة المنصات إذا لم تُكتشف أي منصة.
- يستخدم `init mcp` النقل `stdio` ما لم يُحدَّد `--transport`.
- يتطلب `init infra` الخيار `--mode`، ويكتفي `init extension` بطباعة روابط المتجر ما لم يُحدَّد `--browser`.

يُعَدّ خادم MCP دائمًا داخل المشروع (بالنسبة إلى Claude Code، في `.mcp.json`).

## أمثلة:

### التهيئة الأساسية:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

يؤدي هذا إلى تهيئة Intlayer في الدليل الحالي ، مع اكتشاف جذر المشروع تلقائيًا.

### التهيئة مع جذر مشروع مخصص:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

يؤدي هذا إلى تهيئة Intlayer في الدليل المحدد.

### التهيئة دون تحديث .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

سيؤدي هذا إلى إعداد جميع ملفات التكوين ولكنه لن يعدل ملف `.gitignore` الخاص بك.

### إعداد البنية التحتية (تطبيق سطح المكتب أو الاستضافة الذاتية):

```bash
npx intlayer init infra
```

يقوم بتنزيل وتشغيل أداة التثبيت المستضافة (`https://intlayer.org/install.sh`، أو `install.ps1` على Windows)، والتي تسألك عن كيفية تشغيل Intlayer:

- **تطبيق سطح المكتب** - يقوم بتثبيت لوحة التحكم الأصلية على جهازك، المتصلة بـ Intlayer Cloud.
- **Docker الكل في واحد** - لوحة التحكم + API + MongoDB + Redis + MinIO في حاوية واحدة.
- **Docker Compose** - حاوية واحدة لكل خدمة، للاستضافة الذاتية القابلة للتوسع.

تخطي القائمة باستخدام `--mode`:

```bash
npx intlayer init infra --mode compose
```

يتم تقديم نفس الخطوة بواسطة `npx intlayer init --interactive`. راجع [مرجع `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/infra.md) لمعرفة إعدادات أداة التثبيت، و[دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md) لمعرفة ما يقوم كل وضع بإعداده.

- [مرجع `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/infra.md)
- [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)

## مثال على المخرجات:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## ملاحظات:

- الأمر متكرر (idempotent) - يمكنك تشغيله بأمان عدة مرات. سيتم تخطي الخطوات المكونة بالفعل.
- إذا كان ملف التكوين موجودًا بالفعل ، فلن يتم استبداله.
- يتم تخطي تكوينات TypeScript بدون مصفوفة `include` (على سبيل المثال ، تكوينات نمط الحل مع المراجع).
- سيتوقف الأمر مع خطأ إذا لم يتم العثور على `package.json` في جذر المشروع.
