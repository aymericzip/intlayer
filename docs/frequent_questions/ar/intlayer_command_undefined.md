---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: أمر Intlayer غير معرف
description: تعلّم كيفية إصلاح خطأ أمر intlayer غير معرف.
keywords:
  - intlayer
  - أمر
  - غير معرف
  - خطأ
  - vscode
  - امتداد
  - مكون إضافي
  - إطار عمل
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# أمر Intlayer غير معرف

## نظرة عامة

يوفر CLI الخاص بـ Intlayer طريقة مريحة للتحكم في محتوى intlayer الخاص بك، بما في ذلك بناء القواميس، ودفع الترجمات، والمزيد. ومع ذلك، فهو ليس ضروريًا لعمل مشروعك. إذا كنت تستخدم مكون التجميع الإضافي (مثل `withIntlayer()` لـ Next.js أو `intlayer()` لـ Vite)، فسيقوم Intlayer تلقائيًا ببناء القواميس أثناء بناء التطبيق أو بدء تشغيل خادم التطوير. في وضع التطوير، سيقوم أيضًا بمراقبة التغييرات وإعادة بناء ملفات إعلان المحتوى تلقائيًا.

يمكنك الوصول إلى أوامر intlayer بطرق مختلفة:

- استخدام أمر CLI `intlayer` مباشرة
- استخدام [امتداد VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)
- استخدام SDK الخاص بـ `@intlayer/cli`

## المشكلة

عند محاولة استخدام أمر `intlayer`، قد تواجه هذا الخطأ:

```bash
'intlayer' غير معروف كأمر داخلي أو خارجي،
برنامج قابل للتشغيل أو ملف دفعي.
```

## الحلول

جرّب هذه الحلول بالترتيب:

1. **تحقق من تثبيت الأمر**

```bash
npx intlayer -h
```

الناتج المتوقع:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **تثبيت حزمة intlayer-cli بشكل عام**

```bash
npm install intlayer-cli -g -g
```

> لا يجب أن يكون ذلك ضروريًا إذا كنت قد قمت بالفعل بتثبيت حزمة `intlayer`

3. **تثبيت الحزمة بشكل عام**

```bash
npm install intlayer -g
```

4. **أعد تشغيل الطرفية**
   أحيانًا يكون من الضروري إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

5. **تنظيف وإعادة التثبيت**
   إذا لم تنجح الحلول السابقة:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **التحقق من ملفات التثبيت**
   إذا استمرت المشكلة، تحقق من وجود هذه الملفات:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (يجب أن يحتوي على حقل `bin` يشير إلى `./dist/cjs/cli.cjs`)

7. **التحقق من متغير بيئة PATH**
   تأكد من أن دليل npm العام موجود في PATH الخاص بك:

```bash
# لأنظمة يونكس (macOS/Linux)
echo $PATH
# يجب أن يتضمن شيئًا مثل /usr/local/bin أو ~/.npm-global/bin

# لنظام ويندوز
echo %PATH%
# يجب أن يتضمن دليل npm العام
```

8. **استخدام npx مع المسار الكامل**
   إذا لم يتم العثور على الأمر بعد، جرب استخدام npx مع المسار الكامل:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **التحقق من وجود تثبيتات متضاربة**

```bash
# عرض جميع الحزم المثبتة عالميًا
npm list -g --depth=0

# إزالة أي تثبيتات متضاربة عالمياً
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# ثم إعادة التثبيت
npm install -g intlayer
```

10. **التحقق من إصدارات Node.js و npm**
    تأكد من أنك تستخدم إصدارات متوافقة:

```bash
node --version
npm --version
```

    إذا كنت تستخدم إصدارًا قديمًا، فكر في تحديث Node.js و npm.

11. **التحقق من مشاكل الأذونات**
    إذا كنت تواجه أخطاء في الأذونات:

    ```bash
    # لأنظمة يونكس
    sudo npm install -g intlayer

    # أو تغيير الدليل الافتراضي لـ npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # أضف إلى ملف ~/.profile أو ~/.bashrc الخاص بك:
    export PATH=~/.npm-global/bin:$PATH
    ```
