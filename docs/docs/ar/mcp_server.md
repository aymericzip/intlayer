---
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: توثيق خادم MCP
description: استكشف ميزات وإعداد خادم MCP لتحسين إدارة وتشغيل الخادم الخاص بك.
keywords:
  - خادم MCP
  - إدارة الخادم
  - تحسين
  - إنتلاير
  - توثيق
  - إعداد
  - ميزات
slugs:
  - doc
  - mcp-server
---

# خادم MCP الخاص بإنتلاير

يقدم **خادم MCP (بروتوكول سياق النموذج) الخاص بإنتلاير** مساعدة مدعومة بالذكاء الاصطناعي داخل بيئة التطوير المتكاملة (IDE) مصممة خصيصًا لنظام إنتلاير البيئي. تم تصميمه لبيئات المطورين الحديثة مثل **Cursor**، و**مساحة عمل GitHub Copilot**، وأي بيئة تطوير متكاملة تدعم بروتوكول MCP، حيث يوفر هذا الخادم دعمًا سياقيًا وفوريًا بناءً على إعداد مشروعك.

## لماذا تستخدم خادم MCP الخاص بإنتلاير؟

بتمكين خادم MCP الخاص بإنتلاير في بيئة التطوير المتكاملة لديك، ستحصل على:

- **تكامل ذكي مع واجهة الأوامر (CLI)**
  الوصول إلى أوامر واجهة الأوامر الخاصة بإنتلاير وتشغيلها مباشرة من واجهة بيئة التطوير المتكاملة الخاصة بك. يمكنك عرض القائمة الكاملة للأوامر والخيارات في [توثيق واجهة أوامر إنتلاير](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **توثيق واعٍ للسياق**
  يقوم خادم MCP بتحميل وعرض التوثيق الذي يتوافق مع إصدار إنتلاير الذي تستخدمه في مشروعك. هذا يضمن أن تكون اقتراحات الكود، وخيارات الأوامر، والتفسيرات دائمًا محدثة وذات صلة.

- **تطوير بمساعدة الذكاء الاصطناعي**
  مع اقتراحات واعية للسياق في المشروع وإكمال تلقائي، يمكن للمساعد الذكي شرح كودك، أو التوصية باستخدام واجهة الأوامر (CLI)، أو اقتراح كيفية استخدام ميزات محددة من إنتلاير بناءً على ملفاتك الحالية.

- **خفيف الوزن وإعداد فوري**
  لا حاجة لصيانة الخادم أو تثبيت ثقيل. فقط قم بتكوين ملف `.cursor/mcp.json` أو ملف تكوين MCP المعادل وأنت جاهز للانطلاق.

---

## إعداد Cursor

في جذر مشروعك، أضف ملف التكوين التالي `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

هذا يخبر بيئة التطوير المتكاملة (IDE) الخاصة بك بتشغيل خادم MCP الخاص بـ Intlayer باستخدام `npx`، مما يضمن أنه يستخدم دائمًا أحدث إصدار متاح ما لم تقم بتثبيته يدويًا.

---

## إعداد VS Code

لاستخدام خادم Intlayer MCP مع VS Code، تحتاج إلى تكوينه في إعدادات مساحة العمل أو إعدادات المستخدم.

### تكوين مساحة العمل

أنشئ ملف `.vscode/mcp.json` في جذر مشروعك:

```json
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### استخدام خادم MCP في VS Code

1. **تفعيل وضع الوكيل**: افتح عرض الدردشة (⌃⌘I على ماك، Ctrl+Alt+I على ويندوز/لينكس) واختر وضع **Agent** من القائمة المنسدلة.

2. **الوصول إلى الأدوات**: انقر على زر **الأدوات** لعرض أدوات Intlayer المتاحة. يمكنك اختيار أو إلغاء اختيار أدوات محددة حسب الحاجة.

3. **الإشارة المباشرة إلى الأدوات**: قم بالإشارة إلى الأدوات مباشرة في مطالباتك بكتابة `#` متبوعًا باسم الأداة.

4. **تأكيد الأداة**: بشكل افتراضي، سيطلب VS Code تأكيدًا قبل تشغيل الأدوات. استخدم خيارات زر **متابعة** لتأكيد الأدوات تلقائيًا للجلسة الحالية، أو مساحة العمل، أو لجميع الاستدعاءات المستقبلية.

### إدارة الخادم

- قم بتشغيل **MCP: قائمة الخوادم** من لوحة الأوامر لعرض الخوادم المكونة
- ابدأ، أوقف، أو أعد تشغيل خادم Intlayer MCP حسب الحاجة
- عرض سجلات الخادم لاستكشاف الأخطاء وإصلاحها عن طريق اختيار الخادم واختيار **عرض الإخراج**

لمزيد من المعلومات التفصيلية حول تكامل VS Code MCP، راجع [التوثيق الرسمي لـ VS Code MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## استخدام خادم MCP عبر واجهة الأوامر

يمكنك أيضًا تشغيل خادم Intlayer MCP مباشرة من سطر الأوامر للاختبار، وتصحيح الأخطاء، أو التكامل مع أدوات أخرى.

### تثبيت خادم MCP

أولاً، قم بتثبيت حزمة خادم MCP عالميًا أو استخدمها عبر npx:

```bash
# التثبيت عالميًا
npm install -g @intlayer/mcp

# أو الاستخدام مباشرة مع npx (موصى به)
npx @intlayer/mcp
```

### بدء الخادم

لتشغيل خادم MCP مع أداة المفتش للتصحيح والاختبار:

```bash
# استخدام أمر البدء المدمج
npm run start

# أو مباشرة مع npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

سيؤدي هذا إلى تشغيل خادم MCP مع واجهة المفتش التي تتيح لك:

- اختبار اتصالات بروتوكول MCP
- تصحيح استجابات الخادم
- التحقق من صحة تنفيذ الأدوات والموارد
- مراقبة أداء الخادم

### استخدام التطوير

لأغراض التطوير والاختبار، يمكنك تشغيل الخادم في أوضاع مختلفة:

```bash
# البناء والبدء في وضع التطوير
npm run dev

# التشغيل بتكوين مخصص
node dist/cjs/index.cjs

# اختبار وظائف الخادم
npm test
```

سيكشف الخادم عن أدوات وموارد خاصة بـ Intlayer يمكن لأي عميل متوافق مع MCP استخدامها، وليس فقط Cursor أو بيئات التطوير المتكاملة الأخرى.

---

## نظرة عامة على الميزات

| الميزة           | الوصف                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| دعم CLI          | تشغيل أوامر `intlayer`، الحصول على تلميحات الاستخدام والمعاملات مباشرة |
| الوثائق المرقمة  | الكشف التلقائي وتحميل الوثائق المطابقة لإصدار Intlayer الحالي          |
| الإكمال التلقائي | اقتراحات ذكية للأوامر والتكوين أثناء الكتابة                           |
| جاهز للإضافات    | متوافق مع بيئات التطوير المتكاملة والأدوات التي تدعم معيار MCP         |

---

## روابط مفيدة

- [توثيق CLI الخاص بـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md)
- [مستودع Intlayer على GitHub](https://github.com/aymericzip/intlayer)

---

## تاريخ الوثائق

- 5.5.10 - 2025-06-29: بداية التاريخ
