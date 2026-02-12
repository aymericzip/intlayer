---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: مهارات الوكيل
description: تعرّف على كيفية استخدام مهارات الوكلاء في Intlayer لتحسين فهم وكيل الذكاء الاصطناعي لمشروعك.
keywords:
  - Intlayer
  - مهارات الوكلاء
  - وكيل الذكاء الاصطناعي
  - التدويل
  - الوثائق
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: سجل البدء
---

## أمر `intlayer init skills`

أمر `intlayer init skills` هو أسهل طريقة لإعداد مهارات الوكلاء في مشروعك. يقوم باكتشاف بيئتك وتثبيت ملفات التهيئة اللازمة للمنصات التي تفضّلها.

```bash
npx intlayer init skills
```

عند تشغيل هذا الأمر، سيقوم بما يلي:

1.  اكتشاف الإطار الذي تستخدمه (مثل Next.js أو React أو Vite).
2.  سوف يسألك عن المنصات التي تريد تثبيت المهارات لها (Cursor, VS Code, OpenCode, Claude Code، إلخ).
3.  سيُنشئ ملفات التكوين المطلوبة (مثل `.cursor/mcp.json`، `.vscode/mcp.json`، أو `.intlayer/skills/*.md`).

## المنصات المدعومة

يدعم Intlayer التكامل مع المنصات التالية:

### 1. Cursor

يدعم Cursor خوادم MCP (Model Context Protocol). تشغيل الأمر `intlayer init skills` سيُنشئ ملف `.cursor/mcp.json` الذي يسمح لـ Cursor بالتواصل مع خادم MCP الخاص بـ Intlayer.

### 2. VS Code

لمستخدمي VS Code، وخاصة الذين يستخدمون GitHub Copilot أو امتدادات أخرى متوافقة مع MCP، سيقوم الأمر بإنشاء ملف تكوين `.vscode/mcp.json`.

### 3. OpenCode

OpenCode هو وكيل CLI تفاعلي مصمم لمهام هندسة البرمجيات. يوفر Intlayer مهارات محددة تساعد OpenCode على مساعدتك في مهام التدويل (i18n).

### 4. Claude Code

يمكن تكوين Claude Code لاستخدام مهارات Intlayer عن طريق إضافة التكوينات المولدة إلى إعدادات سطح المكتب أو إعدادات CLI الخاصة به.
