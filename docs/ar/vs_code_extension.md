# امتداد VS Code الرسمي لـ Intlayer

## نظرة عامة

**Intlayer** هو الامتداد الرسمي لـ Visual Studio Code لـ **Intlayer**، مصمم لتحسين تجربة المطور عند العمل مع المحتوى المحلي في مشاريع **React, Next.js, و JavaScript**.

مع هذا الامتداد، يمكن للمطورين **التنقل بسرعة** إلى قواميس المحتوى الخاصة بهم، إدارة ملفات التوطين، وتبسيط سير العمل الخاص بهم باستخدام أوامر أتمتة قوية.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

رابط الامتداد: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## الميزات

### التنقل الفوري

**دعم الانتقال إلى التعريف** – استخدم `Cmd+Click` (Mac) أو `Ctrl+Click` (Windows/Linux) على مفتاح `useIntlayer` لفتح ملف المحتوى المقابل على الفور.  
**تكامل سلس** – يعمل بسلاسة مع مشاريع **react-intlayer** و **next-intlayer**.  
**دعم متعدد اللغات** – يدعم المحتوى المحلي عبر لغات مختلفة.  
**تكامل مع VS Code** – يندمج بسلاسة مع التنقل ولوحة الأوامر في VS Code.

### أوامر إدارة القواميس

قم بإدارة قواميس المحتوى مباشرة من VS Code:

- **بناء القواميس** (`extension.buildDictionaries`) – إنشاء ملفات المحتوى بناءً على هيكل مشروعك.
- **دفع القواميس** (`extension.pushDictionaries`) – تحميل أحدث محتوى القواميس إلى مستودعك.
- **سحب القواميس** (`extension.pullDictionaries`) – مزامنة أحدث محتوى القواميس من مستودعك إلى بيئتك المحلية.

### مولد إعلان المحتوى

قم بسهولة بإنشاء ملفات قواميس منظمة بتنسيقات مختلفة:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## التثبيت

يمكنك تثبيت **Intlayer** مباشرة من سوق VS Code:

1. افتح **VS Code**.
2. انتقل إلى **سوق الامتدادات**.
3. ابحث عن **"Intlayer"**.
4. انقر على **تثبيت**.

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

3. **انقر مع الضغط على الأمر** (`⌘+Click` على macOS) أو **Ctrl+Click** (على Windows/Linux) على المفتاح (مثل `"app"`).
4. سيقوم VS Code بفتح ملف القاموس المقابل تلقائيًا، مثل `src/app.content.ts`.

### إدارة قواميس المحتوى

#### بناء القواميس

قم بإنشاء جميع ملفات محتوى القواميس باستخدام:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

ابحث عن **بناء القواميس** ونفذ الأمر.

#### دفع القواميس

قم بتحميل أحدث محتوى القواميس:

1. افتح **لوحة الأوامر**.
2. ابحث عن **دفع القواميس**.
3. حدد القواميس التي تريد دفعها وقم بالتأكيد.

#### سحب القواميس

قم بمزامنة أحدث محتوى القواميس:

1. افتح **لوحة الأوامر**.
2. ابحث عن **سحب القواميس**.
3. اختر القواميس التي تريد سحبها.

### تخصيص مسارات ملفات القواميس

افتراضيًا، يتبع الامتداد هيكل مشروع **Intlayer** القياسي. ومع ذلك، يمكنك تكوين مسارات مخصصة:

1. افتح **الإعدادات (`Cmd + ,` على macOS / `Ctrl + ,` على Windows/Linux)`**.
2. ابحث عن `Intlayer`.
3. قم بتعديل إعداد مسار ملف المحتوى.

## التطوير والمساهمة

هل تريد المساهمة؟ نرحب بمساهمات المجتمع!

رابط المستودع: https://github.com/aymericzip/intlayer-vs-code-extension

### البدء

قم باستنساخ المستودع وتثبيت التبعيات:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> استخدم مدير الحزم `npm` للتوافق مع حزمة `vsce` لإنشاء ونشر الامتداد.

### التشغيل في وضع التطوير

1. افتح المشروع في **VS Code**.
2. اضغط على `F5` لفتح نافذة **Extension Development Host** جديدة.

### إرسال طلب سحب

إذا قمت بتحسين الامتداد، قم بإرسال PR على [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## الملاحظات والمشاكل

هل وجدت خطأً أو لديك طلب ميزة؟ افتح مشكلة على **مستودع GitHub الخاص بنا**:

[مشاكل GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## الترخيص

تم إصدار Intlayer بموجب **ترخيص MIT**.
