---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: ملء القواميس
description: تعلّم كيفية ملء، تدقيق، وترجمة قواميسك باستخدام الذكاء الاصطناعي.
keywords:
  - ملء
  - تدقيق
  - ترجمة
  - قواميس
  - CLI
  - Intlayer
  - الذكاء الاصطناعي
slugs:
  - doc
  - concept
  - cli
  - fill
---

# ملء / تدقيق / ترجمة القواميس

```bash
npx intlayer fill
```

يقوم هذا الأمر بتحليل ملفات إعلان المحتوى الخاصة بك للبحث عن مشكلات محتملة مثل الترجمات المفقودة، التناقضات الهيكلية، أو عدم تطابق الأنواع. إذا وجد أي مشاكل، فإن **intlayer fill** سيقترح أو يطبق تحديثات للحفاظ على اتساق وكمال قواميسك.

## الأسماء المستعارة:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## الوسائط:

**خيارات قائمة الملفات:**

- **`-f, --file [files...]`**: قائمة بملفات إعلان المحتوى المحددة التي سيتم تدقيقها. إذا لم يتم توفيرها، فسيتم تدقيق جميع الملفات المكتشفة التي تطابق النمط `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` بناءً على إعداد ملف التكوين الخاص بك.

  > مثال: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: تصفية القواميس بناءً على المفاتيح. إذا لم يتم توفيرها، فسيتم تدقيق جميع القواميس.

  > مثال: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: تصفية القواميس بناءً على المفاتيح (اسم مستعار لـ --keys).

  > مثال: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: استبعاد القواميس بناءً على المفاتيح. إذا لم يتم توفيرها، فسيتم تدقيق جميع القواميس.

  > مثال: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: استبعاد القواميس بناءً على المفاتيح (اسم مستعار لـ --excluded-keys).

  > مثال: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: تصفية القواميس بناءً على نمط glob لمسارات الملفات.

  > مثال: `npx intlayer dictionary fill --path-filter "src/home/**"`

**خيارات إخراج الإدخال:**

- **`--source-locale [sourceLocale]`**: اللغة المصدر التي سيتم الترجمة منها. إذا لم يتم تحديدها، سيتم استخدام اللغة الافتراضية من إعدادات التكوين الخاصة بك.

- **`--output-locales [outputLocales...]`**: اللغات المستهدفة للترجمة إليها. إذا لم يتم تحديدها، سيتم استخدام جميع اللغات من إعدادات التكوين الخاصة بك باستثناء اللغة المصدر.

- **`--mode [mode]`**: وضع الترجمة: `complete`، `review`. الافتراضي هو `complete`. يقوم `complete` بملء كل المحتوى المفقود، و`review` يملأ المحتوى المفقود ويُراجع المفاتيح الموجودة.

**خيارات Git:**

- **`--git-diff`**: تشغيل فقط على القواميس التي تتضمن تغييرات من القاعدة (الافتراضي `origin/main`) إلى الفرع الحالي (الافتراضي: `HEAD`).
- **`--git-diff-base`**: تحديد المرجع الأساسي لفارق git (الافتراضي `origin/main`).
- **`--git-diff-current`**: تحديد المرجع الحالي لفارق git (الافتراضي: `HEAD`).
- **`--uncommitted`**: تضمين التغييرات غير الملتزمة.
- **`--unpushed`**: تضمين التغييرات غير المدفوعة.
- **`--untracked`**: تضمين الملفات غير المتتبعة.

  > مثال: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > مثال: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**خيارات الذكاء الاصطناعي:**

- **`--model [model]`**: نموذج الذكاء الاصطناعي المستخدم للترجمة (مثلًا، `gpt-3.5-turbo`).
- **`--provider [provider]`**: مزود خدمة الذكاء الاصطناعي المستخدم للترجمة.
- **`--temperature [temperature]`**: إعداد درجة الحرارة لنموذج الذكاء الاصطناعي.
- **`--api-key [apiKey]`**: توفير مفتاح API خاص بك لخدمة الذكاء الاصطناعي.
- **`--custom-prompt [prompt]`**: توفير موجه مخصص لتعليمات الترجمة الخاصة بك.
- **`--application-context [applicationContext]`**: توفير سياق إضافي لترجمة الذكاء الاصطناعي.

  > مثال: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "تطبيقي هو متجر للقطط"`

**خيارات متغيرات البيئة:**

- **`--env`**: تحديد البيئة (مثلًا، `development`، `production`).
- **`--env-file [envFile]`**: توفير ملف بيئة مخصص لتحميل المتغيرات منه.

  > مثال: `npx intlayer fill --env-file .env.production.local`

  > مثال: `npx intlayer fill --env production`

**خيارات التكوين:**

- **`--base-dir`**: تحديد الدليل الأساسي للمشروع.

  > مثال: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: تعطيل التخزين المؤقت.

  > مثال: `npx intlayer build --no-cache`

**خيارات التحضير:**

- **`--build`**: بناء القواميس قبل الدفع لضمان تحديث المحتوى. القيمة true ستجبر البناء، والقيمة false ستتخطى البناء، والقيمة undefined ستسمح باستخدام التخزين المؤقت للبناء.

- **`--skip-metadata`**: تخطي ملء البيانات الوصفية المفقودة (الوصف، العنوان، العلامات) للقواميس.

**خيارات السجل:**

- **`--verbose`**: تمكين تسجيل مفصل لأغراض التصحيح. (الإعداد الافتراضي هو true عند استخدام CLI)

## مثال:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

يقوم هذا الأمر بترجمة المحتوى من الإنجليزية إلى الفرنسية والإسبانية لجميع ملفات إعلان المحتوى في دليل `src/home/` باستخدام نموذج GPT-3.5 Turbo.
