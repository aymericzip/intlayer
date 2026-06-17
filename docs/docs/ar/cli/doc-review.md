---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: مراجعة المستند
description: تعلّم كيفية مراجعة ملفات التوثيق من حيث الجودة، الاتساق، والكمال عبر اللغات المختلفة.
keywords:
  - مراجعة
  - مستند
  - توثيق
  - ذكاء اصطناعي
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# مراجعة المستند

يقوم أمر `doc review` بتحليل ملفات التوثيق من حيث الجودة، الاتساق، والكمال عبر اللغات المختلفة.

## النقاط الرئيسية:

- يقسم ملفات markdown الكبيرة إلى أجزاء للبقاء ضمن حدود نافذة سياق نموذج الذكاء الاصطناعي.
- يحسن الأجزاء المراد مراجعتها ويتخطى الأجزاء التي تم ترجمتها بالفعل ولم تتغير.
- يعالج الملفات والأجزاء واللغات بالتوازي باستخدام نظام قائمة انتظار لزيادة السرعة.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

يمكن استخدامه لمراجعة الملفات التي تم ترجمتها بالفعل، وللتحقق مما إذا كانت الترجمة صحيحة.

في معظم حالات الاستخدام،

- يُفضل استخدام `doc translate` عندما لا تتوفر النسخة المترجمة من هذا الملف.
- يُفضل استخدام `doc review` عندما تكون النسخة المترجمة من هذا الملف موجودة بالفعل.

> لاحظ أن عملية المراجعة تستهلك عددًا أكبر من رموز الإدخال مقارنة بعملية الترجمة لمراجعة نفس الملف بالكامل. ومع ذلك، ستقوم عملية المراجعة بتحسين الأجزاء التي يجب مراجعتها، وستتخطى الأجزاء التي لم تتغير.

## الوسائط:

**خيارات قائمة الملفات:**

- **`--doc-pattern [docPattern...]`**: أنماط glob لمطابقة ملفات التوثيق التي سيتم مراجعتها.

  > مثال: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: أنماط glob لاستبعادها من المراجعة.

  > مثال: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: تخطى الملف إذا تم تعديله قبل الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو غيرها التي تعدل الملف.

  > مثال: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: تخطى الملف إذا تم تعديله خلال الوقت المحدد.
  - يمكن أن يكون وقتًا مطلقًا مثل "2025-12-05" (نص أو تاريخ)
  - يمكن أن يكون وقتًا نسبيًا بالميلي ثانية `1 * 60 * 60 * 1000` (ساعة واحدة)
  - هذا الخيار يتحقق من وقت تحديث الملف باستخدام طريقة `fs.stat`. لذلك قد يتأثر بأدوات مثل Git أو غيرها التي تعدل الملف.

  > مثال: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: تخطى الملف إذا كان موجودًا بالفعل.

  > مثال: `npx intlayer doc review --skip-if-exists`

**خيارات وضع المراجعة:**

- **`--log`**: وضع السجل فقط. لا يترجم باستخدام الذكاء الاصطناعي؛ بدلاً من ذلك، يسجل الكتل التي تحتاج إلى اهتمام (مع أرقام الأسطر والمحتوى) للغتين الأساسية والمستهدفة، لمساعدة وكيل آخر في توليد الترجمات.

  > مثال: `npx intlayer doc review --log`

**خيارات إخراج الإدخال:**

- **`--locales [locales...]`**: اللغات المستهدفة لمراجعة الوثائق لها.

  > مثال: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: لغة المصدر (المستند الأساسي) للمقارنة بها.

  > مثال: `npx intlayer doc review --base-locale en`

**خيارات معالجة الملفات:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: عدد الملفات التي تتم معالجتها في نفس الوقت للمراجعة.

  > مثال: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**خيارات الذكاء الاصطناعي:**

- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للمراجعة (مثل `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود الذكاء الاصطناعي المستخدم للمراجعة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API الخاص بك لخدمة الذكاء الاصطناعي.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لمراجعة الذكاء الاصطناعي.
- **`--data-serialization [dataSerialization]`**: تنسيق تسلسل البيانات لاستخدامه في ميزات الذكاء الاصطناعي لـ Intlayer. الخيارات: `json` (قياسي، موثوق)، `toon` (رموز أقل، أقل اتساقًا).
- **`--custom-prompt [prompt]`**: تخصيص الموجه الأساسي المستخدم للمراجعة. (ملاحظة: في معظم حالات الاستخدام، يُفضل استخدام خيار `--custom-instructions` بدلاً من ذلك لأنه يوفر تحكمًا أفضل.)

  > مثال: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "تطبيقي هو متجر للقطط"`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثل `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.
- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.
- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل مفصل لأغراض التصحيح. (افتراضيًا مفعل عند استخدام CLI)

  > مثال: `npx intlayer doc review --verbose`

**خيارات التعليمات المخصصة:**

- **`--custom-instructions [customInstructions]`**: تعليمات مخصصة تضاف إلى الموجه. مفيدة لتطبيق قواعد محددة بخصوص التنسيق، ترجمة الروابط، إلخ.

  > مثال: `npx intlayer doc review --custom-instructions "تجنب ترجمة الروابط، واحتفظ بتنسيق الماركداون"`

  > مثال: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على الملفات التي تتضمن تغييرات من القاعدة (الافتراضي `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لـ git diff (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لـ git diff (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزمة.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

  > مثال: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > مثال: `npx intlayer doc review --uncommitted --unpushed --untracked`

> لاحظ أن مسار ملف الإخراج سيتم تحديده عن طريق استبدال الأنماط التالية:
>
> - `/{{baseLocale}}/` بـ `/{{locale}}/` (يونكس)
> - `\{{baseLocale}}\` بـ `\{{locale}}\` (ويندوز)
> - `_{{baseLocale}}.` بـ `_{{locale}}.`
> - `{{baseLocale}}_` بـ `{{locale}}_`
> - `.{{baseLocaleName}}.` بـ `.{{localeName}}.`
>
> إذا لم يتم العثور على النمط، فسيتم إضافة `.{{locale}}` إلى امتدادات الملف. على سبيل المثال، `./my/file.md` سيتم مراجعته وتحديثه إلى `./my/file.fr.md` للغة الفرنسية.
