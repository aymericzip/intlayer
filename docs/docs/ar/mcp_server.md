---
createdAt: 2025-06-07
updatedAt: 2025-07-10
title: توثيق خادم MCP
description: استكشف ميزات وإعداد خادم MCP لتحسين إدارة وتشغيل الخادم الخاص بك.
keywords:
  - خادم MCP
  - إدارة الخادم
  - تحسين
  - Intlayer
  - توثيق
  - إعداد
  - ميزات
slugs:
  - doc
  - mcp-server
---

# خادم Intlayer MCP

يوفر **خادم Intlayer MCP (بروتوكول سياق النموذج)** مساعدة مدعومة بالذكاء الاصطناعي لبيئات تطوير متكاملة (IDE) مصممة خصيصًا لنظام Intlayer البيئي.

## أين يمكنني استخدامه؟

- في بيئات التطوير الحديثة مثل **Cursor**، **VS Code**، وأي بيئة تطوير متكاملة تدعم بروتوكول MCP.
- على مساعد الذكاء الاصطناعي المفضل لديك مثل **Claude Desktop**، **Gemini**، **ChatGPT**، وغيرها.

## لماذا تستخدم خادم Intlayer MCP؟

بتمكين خادم Intlayer MCP في بيئة التطوير المتكاملة الخاصة بك، يمكنك الوصول إلى:

- **توثيق مدرك للسياق**
  يقوم خادم MCP بتحميل وعرض توثيق Intlayer. لتسريع إعدادك، وترحيلاتك، وما إلى ذلك.
  هذا يضمن أن اقتراحات الكود، وخيارات الأوامر، والتفسيرات تكون دائمًا محدثة وذات صلة.

- **تكامل ذكي لسطر الأوامر (CLI)**
  الوصول إلى أوامر Intlayer CLI وتشغيلها مباشرة من واجهة بيئة التطوير المتكاملة الخاصة بك. باستخدام خادم MCP، يمكنك السماح لمساعد الذكاء الاصطناعي الخاص بك بتشغيل أوامر مثل `intlayer dictionaries build` لتحديث قواميسك، أو `intlayer dictionaries fill` لملء الترجمات المفقودة.

  > عرض القائمة الكاملة للأوامر والخيارات في [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

---

## الإعداد في Cursor

اتبع [التوثيق الرسمي](https://docs.cursor.com/context/mcp) لتكوين خادم MCP في Cursor.

في جذر مشروعك، أضف ملف التكوين التالي `.cursor/mcp.json`:

### الخادم المحلي (stdio) (موصى به)

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### الخادم البعيد (SSE)

للاتصال بخادم Intlayer MCP بعيد باستخدام أحداث الخادم المرسلة (SSE)، يمكنك تكوين عميل MCP الخاص بك للاتصال بالخدمة المستضافة.

> **ملاحظة:** الخادم البعيد لا يدمج أدوات سطر الأوامر (CLI). الخادم البعيد مخصص فقط للتوثيق والسياق.

> **ملاحظة:** بسبب تكاليف استضافة الخادم، لا يمكن ضمان توفر الخادم البعيد. نوصي باستخدام طريقة النقل للخادم المحلي (stdio) للحصول على تجربة أكثر موثوقية.

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

هذا يُخبر بيئة التطوير المتكاملة (IDE) الخاصة بك بإطلاق خادم Intlayer MCP باستخدام `npx`، مما يضمن استخدام أحدث إصدار متاح دائمًا ما لم تقم بتثبيته.

---

## الإعداد في VS Code

اتبع [التوثيق الرسمي](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) لتكوين خادم MCP في VS Code.

لاستخدام خادم Intlayer MCP مع VS Code، تحتاج إلى تكوينه في إعدادات مساحة العمل أو إعدادات المستخدم الخاصة بك.

### الخادم المحلي (stdio) (موصى به)

قم بإنشاء ملف `.vscode/mcp.json` في جذر مشروعك:

```json filename=".vscode/mcp.json"
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

### الخادم البعيد (SSE)

للاتصال بخادم Intlayer MCP البعيد باستخدام أحداث الخادم المرسلة (SSE)، يمكنك تكوين عميل MCP الخاص بك للاتصال بالخدمة المستضافة.

> **ملاحظة:** الخادم البعيد لا يدمج أدوات سطر الأوامر. الخادم البعيد مخصص فقط للوثائق والسياق.

> **ملاحظة:** بسبب تكاليف استضافة الخادم، لا يمكن ضمان توفر الخادم البعيد. نوصي باستخدام طريقة النقل للخادم المحلي (stdio) للحصول على تجربة أكثر موثوقية.

```json filename=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## الإعداد في ChatGPT

### الخادم البعيد (SSE)

اتبع [التوثيق الرسمي](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) لتكوين خادم MCP في ChatGPT.

1 - اذهب إلى [لوحة التحكم الخاصة بالمطالبات](https://platform.openai.com/prompts)  
2 - انقر على "+ إنشاء"  
3 - انقر على "الأدوات (إنشاء أو +)"  
4 - اختر "خادم MCP"  
5 - انقر على "إضافة جديد"  
6 - املأ الحقول التالية:

- URL: https://mcp.intlayer.org
- التسمية: خادم Intlayer MCP
- الاسم: intlayer-mcp-server
- المصادقة: لا شيء

7 - انقر على "حفظ"

> **ملاحظة:** الخادم البعيد لا يدمج أدوات سطر الأوامر. الخادم البعيد مخصص فقط للوثائق والسياق.

> **ملاحظة:** بسبب تكاليف استضافة الخادم، لا يمكن ضمان توفر الخادم البعيد. نوصي باستخدام طريقة النقل المحلية (stdio) للحصول على تجربة أكثر موثوقية.

---

## الإعداد في Claude Desktop

اتبع [الوثائق الرسمية](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) لتكوين خادم MCP في Claude Desktop.

مسار ملف التكوين:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### الخادم المحلي (stdio) (موصى به)

```json filename="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## استخدام خادم MCP عبر سطر الأوامر

يمكنك أيضًا تشغيل خادم Intlayer MCP مباشرة من سطر الأوامر للاختبار أو التصحيح أو التكامل مع أدوات أخرى.

```bash
# التثبيت عالميًا
npm install -g @intlayer/mcp

# أو استخدامه مباشرة مع npx (موصى به)
npx @intlayer/mcp
```

---

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                    |
| ------- | ---------- | ---------------------------- |
| 5.5.12  | 2025-07-11 | إضافة إعداد ChatGPT          |
| 5.5.12  | 2025-07-10 | إضافة إعداد Claude Desktop   |
| 5.5.12  | 2025-07-10 | إضافة نقل SSE والخادم البعيد |
| 5.5.10  | 2025-06-29 | بدء التاريخ                  |
