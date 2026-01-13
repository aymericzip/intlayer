---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: ترجمة المستند
description: تعلّم كيفية ترجمة ملفات التوثيق تلقائيًا باستخدام خدمات الترجمة بالذكاء الاصطناعي.
keywords:
  - ترجمة
  - مستند
  - توثيق
  - ذكاء اصطناعي
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# ترجمة المستند

يقوم الأمر `doc translate` بترجمة ملفات التوثيق تلقائيًا من لغة أساسية إلى لغات مستهدفة باستخدام خدمات الترجمة بالذكاء الاصطناعي.

## النقاط الرئيسية:

- يقسم ملفات markdown الكبيرة إلى أجزاء للبقاء ضمن حدود نافذة سياق نموذج الذكاء الاصطناعي.
- يعيد محاولة الترجمة إذا كان تنسيق الإخراج غير صحيح.
- يدمج سياقًا محددًا للتطبيق والملف لتحسين دقة الترجمة.
- يحافظ على الترجمات الموجودة بعدم الكتابة فوقها.
- يعالج الملفات والأجزاء واللغات بالتوازي باستخدام نظام قائمة انتظار لزيادة السرعة.

```bash
npx intlayer doc translate
```

## الوسائط:

**خيارات قائمة الملفات:**

- **`--doc-pattern [docPattern...]`**: أنماط glob لمطابقة ملفات التوثيق التي سيتم ترجمتها.

  > مثال: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: أنماط glob لاستبعادها من الترجمة.

  > مثال: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: تخطى الملف إذا تم تعديله قبل الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو أدوات أخرى تعدل الملف.

  > مثال: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: تخطى الملف إذا تم تعديله خلال الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو أدوات أخرى تعدل الملف.

  > مثال: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: تخطى الملف إذا كان موجودًا بالفعل.

  > مثال: `npx intlayer doc translate --skip-if-exists`

**خيارات إخراج الإدخال:**

- **`--locales [locales...]`**: اللغات المستهدفة لترجمة الوثائق إليها.

  > مثال: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: لغة المصدر للترجمة منها.

  > مثال: `npx intlayer doc translate --base-locale en`

**خيارات معالجة الملفات:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: عدد الملفات التي تتم معالجتها في نفس الوقت للترجمة.

  > مثال: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**خيارات الذكاء الاصطناعي:**

- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للترجمة (مثل `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود الذكاء الاصطناعي المستخدم للترجمة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API الخاص بك لخدمة الذكاء الاصطناعي.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لترجمة الذكاء الاصطناعي.
- **`--custom-prompt [prompt]`**: تخصيص الموجه الأساسي المستخدم للترجمة. (ملاحظة: في معظم حالات الاستخدام، يُفضل استخدام خيار `--custom-instructions` بدلاً من ذلك لأنه يوفر تحكمًا أفضل في سلوك الترجمة.)

  > مثال: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "تطبيقي هو متجر للقطط"`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل مفصل لأغراض التصحيح. (افتراضيًا مفعل عند استخدام CLI)

  > مثال: `npx intlayer doc translate --verbose`

**خيارات التعليمات المخصصة:**

- **`--custom-instructions [customInstructions]`**: تعليمات مخصصة تضاف إلى الموجه. مفيدة لتطبيق قواعد محددة بخصوص التنسيق، ترجمة الروابط، إلخ.
  - يمكن أن تكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن تكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو غيرها التي تعدل الملف.

> مثال: `npx intlayer doc translate --custom-instructions "تجنب ترجمة الروابط، واحتفظ بتنسيق الماركداون"`

> مثال: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضي `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لـ git diff (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لـ git diff (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزمة.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

> مثال: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

> مثال: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> لاحظ أن مسار ملف الإخراج سيتم تحديده عن طريق استبدال الأنماط التالية
>
> - `/{{baseLocale}}/` بـ `/{{locale}}/` (يونكس)
> - `\{{baseLocale}}\` بـ `\{{locale}}\` (ويندوز)
> - `_{{baseLocale}}.` بـ `_{{locale}}.`
> - `{{baseLocale}}_` بـ `{{locale}}_`
> - `.{{baseLocaleName}}.` بـ `.{{localeName}}.`
>
> إذا لم يتم العثور على النمط، فسيتم إضافة `.{{locale}}` إلى امتدادات الملف. على سبيل المثال، `./my/file.md` سيتم ترجمته إلى `./my/file.fr.md` للغة الفرنسية.
