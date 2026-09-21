---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: كيفية تقليل استهلاك رموز Claude Code (Tokens) لتوليد الترجمات
description: لماذا يستهلك استخدام Claude Code للترجمة الكثير من الرموز، وماذا يقدم Intlayer بدلاً من ذلك (تصفية المفاتيح المترجمة، تقسيم JSON، ترجمة markdown كتلة بكتلة)، وكيفية إعادة استخدام اشتراك Claude عبر claude setup-token.
keywords:
  - claude code
  - tokens
  - استهلاك الرموز
  - setup-token
  - i18n
  - تدويل
  - ترجمة
  - fill
  - mcp
  - وكيل
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# كيفية تقليل استهلاك رموز Claude Code (Tokens) لتوليد الترجمات

## وصف المشكلة

يُعد الطلب من Claude Code (أو أي وكيل برمجي) ترجمة محتواك الطريقة الأكثر تكلفة على الإطلاق. ففي كل تشغيل، يضطر الوكيل إلى:

- تحميل ملف JSON أو ملف المحتوى كاملاً في سياقه، حتى المفاتيح المترجمة بالفعل.
- البحث في الملفات المرتبطة لمعرفة مكان المحتوى وطريقة تنظيمه.
- استنتاج اللغات الناقصة التي ينبغي توليدها.
- إعادة قراءة تعليماتك المخصصة في كل مرة ("تحويل الروابط بهذا الشكل"، "الإبقاء على اسم العلامة التجارية بالإنجليزية"، "استخدام الصيغة غير الرسمية").
- إعادة كتابة الملف بأكمله، بما في ذلك الأجزاء التي لم تتغير.

يتم إعادة إرسال كل هذا مع كل جولة محادثة، مما يؤدي إلى تضخم التكلفة وفق معادلة `حجم المحتوى × عدد اللغات × عدد الجولات`، بالإضافة إلى ضرورة اكتشاف أي خلل في التنسيق أو المفاتيح يدوياً.

## ماذا يقدم Intlayer بدلاً من ذلك

تكمن فائدة Intlayer في إنجاز هذا العمل خارج سياق الوكيل، عبر خط معالجة مبني خصيصاً للترجمة:

- **تصفية الترجمات الموجودة مسبقاً** للحد من استهلاك الرموز (Tokens). يتم استبعاد المفاتيح المترجمة بالفعل في ملف JSON، وإرسال المفاتيح الناقصة فقط إلى النموذج.
- **ترجمة ملفات markdown كتلة بكتلة.** بالنسبة للتوثيق، يقارن الأمران [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate.md) و [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review.md) كل كتلة مع المستند الأساسي ويتجاوزان الكتل المترجمة مسبقاً أو غير المعدلة.
- **تقسيم ملفات JSON إلى أجزاء (Chunks)** إذا كانت كبيرة جداً، لضمان البقاء في النطاق الأمثل لنافذة السياق.
- **تسطيح وإعادة بناء ملفات JSON** لتحسين استهلاك الرموز.
- **إدراج مطالبات مخصصة** للقواعد المحددة لعلامتك التجارية وصياغتك (`applicationContext`، `--custom-instructions`)، لتكتبها مرة واحدة بدلاً من تكرارها في كل محادثة.
- **التحقق من صحة البنية** لضمان الاتساق ومنع انحراف المفاتيح، مع الحفاظ على التنسيق الأصلي (markdown، HTML، الإدراجات، صيغ الجمع).
- **إدارة إعادة المحاولة (Retry)** في حال كان الناتج غير منسق بشكل سليم.
- **جدولة الطلبات ومعالجتها بالتوازي** عبر الملفات والكتل واللغات لزيادة سرعة التنفيذ.

لا يمر أي من هذا عبر سياق الوكيل. القاعدة الأساسية: دع الوكيل يقرر **ماذا** ينبغي تدويله، ودع Intlayer يتكفل بالمهام المتكررة.

## الحل

### 1. إسناد الاستخراج إلى `intlayer extract`

بدلاً من مطالبة الوكيل بإعادة كتابة كل مكوّن يدوياً، دعه ينفذ الأمر [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md). يقوم هذا الأمر بنقل النصوص الثابتة إلى ملف `.content` بجانب المكوّن دون تحميل الملف كاملاً في سياق الوكيل.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. إسناد الترجمة إلى `intlayer fill`

تجنب تماماً مطالبة الوكيل بالترجمة المباشرة. يقوم الأمر [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) بتطبيق خط المعالجة المذكور: يرسل المفاتيح الناقصة فقط، ويقسمها إلى أجزاء، ويعالج اللغات بالتوازي، ويكتب النتائج مباشرة داخل ملفات المحتوى الخاصة بك.

```bash
npx intlayer fill
```

تساعد بعض الخيارات في تقليص نطاق التشغيل:

- `--git-diff` (أو `--uncommitted`) يعالج القواميس التي تم تعديلها في الفرع الحالي فقط.
- `--file` أو `--keys` يستهدف ملفات محتوى محددة.
- `--output-locales fr es` يقصر التشغيل على اللغات التي تحتاج إليها بالفعل الآن.
- `--skip-metadata` يتخطى توليد العنوان والوصف والوسوم.
- `--data-serialization toon` يرسل حمولة بيانات أكثر إيجازاً للنموذج (رموز أقل، مع تباين طفيف في الإخراج).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. ترجمة markdown عبر `doc translate` و `doc review`

مطالبة الوكيل بترجمة ملف `.md` يعني لصق المستند بالكامل، لكل لغة، عند كل تعديل. في المقابل، يعمل الأمران [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-translate.md) و [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/doc-review.md) كتلة بكتلة.

استخدم `doc translate` عندما لا يكون الملف المترجم موجوداً بعد. يقوم بتقسيم markdown وترجمته بالتوازي وكتابة الملفات الهدف:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

استخدم `doc review` عندما يكون الملف المترجم موجوداً بالفعل. يقارن كل كتلة مع المستند الأساسي، ويتخطى الكتل المترجمة أو غير المتغيرة، ويرسل الكتل المختلفة فقط:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

يقبل كلا الأمرين القواعد الخاصة بك مرة واحدة، دون الحاجة لتكرارها في كل موجه:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

هناك وضعان في `doc review` مفيدان عندما يحتاج الوكيل للبقاء في حلقة العمل، دون إجراء أي اتصال بالذكاء الاصطناعي من جانب Intlayer:

- `--mode report` يسجل الكتل التي تحتاج إلى مراجعة مع أرقام الأسطر، حتى يعدل الوكيل هذه الكتل فقط.
- `--mode synthesis` يوضح فقط المستندات المحدثة وتلك التي لا تزال تحتوي على كتل بحاجة للتعديل.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. تمكين الوكيل من استدعاء واجهة الأوامر CLI عبر خادم MCP

باستخدام [خادم Intlayer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)، يجيب الوكيل اعتماداً على أحدث التوثيقات ويشغل `intlayer fill` أو `intlayer doc review` بنفسه بدلاً من إعادة كتابة المنطق في المحادثة.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

كما أن تثبيت [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md) عبر `npx intlayer init skills` يمنع الوكيل من تخمين واجهة برمجة تطبيقات Intlayer وإعادة قراءة التوثيق عند كل مهمة.

### 5. إعادة استخدام اشتراك Claude عبر `claude setup-token`

يؤدي تشغيل إعداد التدويل (i18n) في جلسة Claude Code التفاعلية إلى الاحتفاظ بسجل المحادثة بأكمله في السياق. انقل هذه المعالجة الثقيلة إلى جلسة headless سريعة ومستقلة.

قم بتوليد رمز طويل الأمد من اشتراك Claude الخاص بك:

```bash
claude setup-token
```

احفظه كـ `CLAUDE_CODE_OAUTH_TOKEN` (في ملف `.env` أو ضمن أسرار CI)، ثم أعد استخدامه لجلسة تشغيل أحادية تنفذ أوامر Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

تقتصر هذه الجلسة على ذلك الموجه ومخرجات الأمر فقط، دون حمل سجل محادثتك السابق. يعمل نفس الرمز في [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) لتشغيل `intlayer fill` عند كل طلب سحب (Pull Request).

> الرمز الصادر عن `claude setup-token` يوثق Claude Code فقط. ولا يمكن استخدامه كمفتاح Anthropic API في `ai.apiKey`. بالنسبة للترجمة نفسها، يستخدم `intlayer fill` [حساب Intlayer](https://app.intlayer.org) الخاص بك (الخطة المجانية مشمولة) أو مفتاح المزود الخاص بك المكوّن في [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#ai-configuration).

## الملخص

| المهمة                | المسؤول عنها             | الرموز (Tokens) في سياق الوكيل |
| --------------------- | ------------------------ | ------------------------------ |
| تحديد ما ينبغي تعريبه | Claude Code              | منخفض                          |
| استخراج النصوص        | `intlayer extract`       | لا شيء                         |
| ترجمة المحتوى         | `intlayer fill`          | لا شيء                         |
| ترجمة التوثيق         | `intlayer doc translate` | لا شيء                         |
| تحديث التوثيق         | `intlayer doc review`    | لا شيء                         |
| تشغيل الأوامر         | Headless Claude Code     | الموجه + مخرجات الأمر          |
