---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: ملحق VS Code الرسمي
description: تعلّم كيفية استخدام ملحق Intlayer في VS Code لتعزيز سير عمل التطوير الخاص بك. تنقل بسرعة بين المحتوى المحلي وأدر قواميسك بكفاءة.
keywords:
  - ملحق VS Code
  - Intlayer
  - التوطين
  - أدوات التطوير
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# ملحق VS Code الرسمي

## نظرة عامة

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) هو الملحق الرسمي لـ Visual Studio Code الخاص بـ **Intlayer**، مصمم لتحسين تجربة المطور عند العمل مع المحتوى المحلي في مشاريعك.

![ملحق Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

رابط الملحق: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## الميزات

![ملء القواميس](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **التنقل الفوري** – القفز بسرعة إلى ملف المحتوى الصحيح عند النقر على مفتاح `useIntlayer`.
- **ملء القواميس** – ملء القواميس بالمحتوى من مشروعك.

![قائمة الأوامر](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **الوصول السهل إلى أوامر Intlayer** – بناء، دفع، سحب، ملء، اختبار قواميس المحتوى بسهولة.

![إنشاء ملف محتوى](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **مولد إعلان المحتوى** – إنشاء ملفات محتوى القاموس بصيغ مختلفة (`.ts`, `.esm`, `.cjs`, `.json`).

![اختبار القواميس](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **اختبار القواميس** – اختبار القواميس للترجمات المفقودة.

![إعادة بناء القاموس](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **حافظ على تحديث قواميسك** – حافظ على تحديث قواميسك بأحدث المحتويات من مشروعك.

![علامة تبويب Intlayer (شريط النشاط)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **علامة تبويب Intlayer (شريط النشاط)** – تصفح وابحث في القواميس من علامة تبويب جانبية مخصصة مع شريط أدوات وإجراءات سياقية (بناء، سحب، دفع، ملء، تحديث، اختبار، إنشاء ملف).

## الاستخدام

### التنقل السريع

1. افتح مشروعًا يستخدم **react-intlayer**.
2. حدد موقع استدعاء `useIntlayer()`، مثل:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **انقر مع الضغط على الأمر** (`⌘+Click` على macOS) أو **Ctrl+Click** (على Windows/Linux) على المفتاح (مثل `"app"`).
4. سيقوم VS Code بفتح ملف القاموس المقابل تلقائيًا، مثل `src/app.content.ts`.

### علامة تبويب Intlayer (شريط النشاط)

استخدم علامة التبويب الجانبية لتصفح وإدارة القواميس:

- افتح أيقونة Intlayer في شريط النشاط.
- في **البحث**، اكتب لتصفية القواميس والإدخالات في الوقت الحقيقي.
- في **القواميس**، تصفح البيئات والقواميس والملفات. استخدم شريط الأدوات للبناء، السحب، الدفع، الملء، التحديث، الاختبار، وإنشاء ملف قاموس. انقر بزر الماوس الأيمن للحصول على إجراءات سياقية (سحب/دفع على القواميس، ملء على الملفات). يتم الكشف تلقائيًا عن ملف المحرر الحالي في الشجرة عند الاقتضاء.

### الوصول إلى الأوامر

يمكنك الوصول إلى الأوامر من **لوحة الأوامر**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **بناء القواميس**
- **دفع القواميس**
- **سحب القواميس**
- **ملء القواميس**
- **اختبار القواميس**
- **إنشاء ملف قاموس**

### تحميل متغيرات البيئة

توصي Intlayer بتخزين مفاتيح API الخاصة بالذكاء الاصطناعي، بالإضافة إلى معرف العميل وسرية Intlayer في متغيرات البيئة.

يمكن للإضافة تحميل متغيرات البيئة من مساحة العمل الخاصة بك لتشغيل أوامر Intlayer بالسياق الصحيح.

- **ترتيب التحميل (حسب الأولوية)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **غير مدمر**: لا يتم تجاوز قيم `process.env` الموجودة.
- **النطاق**: يتم حل الملفات من الدليل الأساسي المُكوَّن (افتراضيًا جذر مساحة العمل).

#### اختيار البيئة النشطة

- **لوحة الأوامر**: افتح اللوحة وقم بتشغيل الأمر `Intlayer: Select Environment`، ثم اختر البيئة (مثلًا، `development`، `staging`، `production`). ستحاول الإضافة تحميل أول ملف متاح في قائمة الأولويات أعلاه وستعرض إشعارًا مثل "تم تحميل البيئة من .env.<env>.local".
- **الإعدادات**: اذهب إلى `Settings → Extensions → Intlayer`، وقم بتعيين:
  - **البيئة**: اسم البيئة المستخدمة لحل ملفات `.env.<env>*`.
  - (اختياري) **ملف البيئة**: مسار صريح لملف `.env`. عند توفيره، يكون له الأولوية على القائمة المستنتجة.

#### المستودعات الأحادية والمجلدات المخصصة

إذا كانت ملفات `.env` الخاصة بك موجودة خارج جذر مساحة العمل، فقم بتعيين **الدليل الأساسي** في `الإعدادات → الإضافات → Intlayer`. سيبحث المحمل عن ملفات `.env` نسبةً إلى ذلك الدليل.

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                                |
| ------- | ---------- | ---------------------------------------- |
| 6.1.5   | 2025-09-30 | إضافة صورة متحركة توضيحية                |
| 6.1.0   | 2025-09-24 | إضافة قسم اختيار البيئة                  |
| 6.0.0   | 2025-09-22 | تبويب Intlayer / أوامر التعبئة والاختبار |
| 5.5.10  | 2025-06-29 | بدء السجل                                |
