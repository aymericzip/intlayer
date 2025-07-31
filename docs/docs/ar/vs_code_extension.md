---
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: إضافة VS Code الرسمية
description: تعلّم كيفية استخدام إضافة Intlayer في VS Code لتعزيز سير عمل التطوير الخاص بك. تنقل بسرعة بين المحتوى المحلي وأدر قواميسك بكفاءة.
keywords:
  - إضافة VS Code
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

# إضافة VS Code الرسمية

## نظرة عامة

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) هي الإضافة الرسمية لـ Visual Studio Code لـ **Intlayer**، مصممة لتحسين تجربة المطور عند العمل مع المحتوى المحلي في مشاريعك.

![إضافة Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

رابط الإضافة: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## الميزات

### التنقل الفوري

**دعم الانتقال إلى التعريف** – استخدم `Cmd+Click` (لنظام ماك) أو `Ctrl+Click` (لنظام ويندوز/لينكس) على مفتاح `useIntlayer` لفتح ملف المحتوى المقابل فورًا.  
**تكامل سلس** – يعمل بسهولة مع مشاريع **react-intlayer** و **next-intlayer**.  
**دعم متعدد اللغات** – يدعم المحتوى المحلي عبر لغات مختلفة.  
**تكامل مع VS Code** – يندمج بسلاسة مع نظام التنقل ولوحة الأوامر في VS Code.

### أوامر إدارة القواميس

قم بإدارة قواميس المحتوى الخاصة بك مباشرة من VS Code:

- **إنشاء القواميس** (`extension.buildDictionaries`) – توليد ملفات المحتوى بناءً على هيكل مشروعك.
- **دفع القواميس** (`extension.pushDictionaries`) – رفع أحدث محتوى القاموس إلى مستودعك.
- **سحب القواميس** (`extension.pullDictionaries`) – مزامنة أحدث محتوى القاموس من مستودعك إلى بيئتك المحلية.

### مولد إعلان المحتوى

قم بسهولة بإنشاء ملفات قاموس منظمة بصيغ مختلفة:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## التثبيت

يمكنك تثبيت **Intlayer** مباشرة من سوق إضافات VS Code:

1. افتح **VS Code**.
2. اذهب إلى **سوق الإضافات**.
3. ابحث عن **"Intlayer"**.
4. اضغط على **تثبيت**.

بدلاً من ذلك، قم بتثبيته عبر سطر الأوامر:

```sh
code --install-extension intlayer
```

## الاستخدام

### التنقل السريع

1. افتح مشروعًا يستخدم **react-intlayer**.
2. حدد موقع استدعاء `useIntlayer()`، مثل:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **انقر مع الضغط على الأمر** (`⌘+Click` على macOS) أو **انقر مع الضغط على Ctrl** (على Windows/Linux) على المفتاح (مثل `"app"`).
4. سيقوم VS Code بفتح ملف القاموس المقابل تلقائيًا، مثل `src/app.content.ts`.

### إدارة قواميس المحتوى

#### بناء القواميس

قم بإنشاء جميع ملفات محتوى القاموس باستخدام:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

ابحث عن **Build Dictionaries** ونفذ الأمر.

#### دفع القواميس

ارفع أحدث محتوى القاموس:

1. افتح **لوحة الأوامر**.
2. ابحث عن **Push Dictionaries**.
3. اختر القواميس التي تريد دفعها وقم بالتأكيد.

#### سحب القواميس

زامن أحدث محتوى القاموس:

1. افتح **لوحة الأوامر**.
2. ابحث عن **Pull Dictionaries**.
3. اختر القواميس التي تريد سحبها.

## التطوير والمساهمة

هل ترغب في المساهمة؟ نرحب بمساهمات المجتمع!

رابط المستودع: https://github.com/aymericzip/intlayer-vs-code-extension

### البدء

استنسخ المستودع وقم بتثبيت التبعيات:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> استخدم مدير الحزم `npm` للتوافق مع حزمة `vsce` لبناء ونشر الإضافة.

### التشغيل في وضع التطوير

1. افتح المشروع في **VS Code**.
2. اضغط على `F5` لفتح نافذة جديدة لـ **مضيف تطوير الإضافة**.

### تقديم طلب سحب

إذا قمت بتحسين الإضافة، قدم طلب سحب على [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## الملاحظات والمشاكل

هل وجدت خطأً أو لديك طلب ميزة؟ افتح مشكلة في **مستودع GitHub** الخاص بنا:

[مشاكل GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## الترخيص

تم إصدار Intlayer بموجب **رخصة MIT**.

## تاريخ الوثائق

- 5.5.10 - 2025-06-29: بداية التاريخ
