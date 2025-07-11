---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: توثيق خادم MCP
description: استكشف ميزات وإعداد خادم MCP لتحسين إدارة وتشغيل الخادم الخاص بك.
keywords:
  - خادم MCP
  - إدارة الخادم
  - تحسين
  - Intlayer
  - التوثيق
  - الإعداد
  - الميزات
slugs:
  - doc
  - mcp-server
---

# خادم Intlayer MCP

يوفر **خادم Intlayer MCP (بروتوكول سياق النموذج)** مساعدة مدعومة بالذكاء الاصطناعي لبيئات التطوير المتكاملة (IDE) مصممة خصيصًا لنظام Intlayer.

## أين يمكنني استخدامه؟

- في بيئات التطوير الحديثة مثل **Cursor**، **VS Code**، وأي بيئة تطوير متكاملة تدعم بروتوكول MCP.
- على مساعد الذكاء الاصطناعي المفضل لديك مثل **Claude Desktop**، **Gemini**، **ChatGPT**، وغيرها.

## لماذا تستخدم خادم Intlayer MCP؟

بتمكين خادم Intlayer MCP في بيئة التطوير المتكاملة الخاصة بك، يمكنك الوصول إلى:

- **توثيق مدرك للسياق**
  يقوم خادم MCP بتحميل وعرض توثيق Intlayer. لتسريع إعدادك، وترحيلاتك، وما إلى ذلك.
  هذا يضمن أن اقتراحات الكود، وخيارات الأوامر، والتفسيرات تكون دائمًا محدثة وذات صلة.

- **تكامل ذكي لأوامر CLI**
  الوصول إلى أوامر Intlayer CLI وتشغيلها مباشرة من واجهة بيئة التطوير المتكاملة الخاصة بك. باستخدام خادم MCP، يمكنك السماح لمساعد الذكاء الاصطناعي الخاص بك بتشغيل أوامر مثل `intlayer dictionaries build` لتحديث القواميس الخاصة بك، أو `intlayer dictionaries fill` لملء الترجمات المفقودة.

  > عرض القائمة الكاملة للأوامر والخيارات في [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

## الخادم المحلي (stdio) مقابل الخادم البعيد (SSE)

يمكن استخدام خادم MCP بطريقتين:

- الخادم المحلي (stdio)
- الخادم البعيد (SSE)

### الخادم المحلي (stdio) (موصى به)

توفر Intlayer حزمة NPM يمكن تثبيتها محليًا على جهازك. يمكن تثبيتها في بيئة التطوير المتكاملة المفضلة لديك، مثل VS Code، Cursor، وكذلك تطبيق المساعد المحلي الخاص بك، مثل ChatGPT، Claude Desktop، إلخ.

هذا الخادم هو الطريقة الموصى بها لاستخدام خادم MCP. حيث يدمج جميع ميزات خادم MCP، بما في ذلك أدوات CLI.

### الخادم البعيد (SSE)

يمكن أيضًا استخدام خادم MCP عن بُعد، باستخدام طريقة النقل SSE. يستضيف هذا الخادم Intlayer، وهو متاح على https://mcp.intlayer.org. يمكن الوصول إلى هذا الخادم علنًا، بدون أي مصادقة، وهو مجاني للاستخدام.

لاحظ أن الخادم البعيد لا يدمج أدوات CLI، الإكمال التلقائي بالذكاء الاصطناعي، إلخ. الخادم البعيد مخصص فقط للتفاعل مع الوثائق لمساعدة مساعد الذكاء الاصطناعي الخاص بك في نظام Intlayer البيئي.

> بسبب تكاليف استضافة الخادم، لا يمكن ضمان توفر الخادم البعيد. نحن نحد من عدد الاتصالات المتزامنة. نوصي باستخدام طريقة النقل للخادم المحلي (stdio) للحصول على تجربة أكثر موثوقية.

---

## الإعداد في Cursor

اتبع [الوثائق الرسمية](https://docs.cursor.com/context/mcp) لتكوين خادم MCP في Cursor.

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

للاتصال بخادم Intlayer MCP البعيد باستخدام أحداث الخادم المرسلة (SSE)، يمكنك تكوين عميل MCP الخاص بك للاتصال بالخدمة المستضافة.

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

هذا يخبر بيئة التطوير المتكاملة (IDE) الخاصة بك بتشغيل خادم Intlayer MCP باستخدام `npx`، مما يضمن دائمًا استخدام أحدث إصدار متاح ما لم تقم بتثبيته.

---

## الإعداد في VS Code

اتبع [الوثائق الرسمية](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) لتكوين خادم MCP في VS Code.

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

اتبع [الوثائق الرسمية](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) لتكوين خادم MCP في ChatGPT.

1 - اذهب إلى [لوحة التحكم الخاصة بالموجه](https://platform.openai.com/prompts)
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
# التثبيت بشكل عام
npm install -g @intlayer/mcp

# أو الاستخدام مباشرة مع npx (موصى به)
npx @intlayer/mcp
```

---

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                    |
| ------- | ---------- | ---------------------------- |
| 5.5.12  | 2025-07-11 | إضافة إعداد ChatGPT          |
| 5.5.12  | 2025-07-10 | إضافة إعداد Claude Desktop   |
| 5.5.12  | 2025-07-10 | إضافة نقل SSE والخادم البعيد |
| 5.5.10  | 2025-06-29 | بدء السجل                    |
