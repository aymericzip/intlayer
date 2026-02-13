---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: مهارات الوكيل
description: تعرّف على كيفية استخدام مهارات الوكلاء في Intlayer لتحسين فهم وكيل الذكاء الاصطناعي لمشروعك، بما في ذلك أدلة الإعداد الشاملة لبيانات التعريف (Metadata)، وخرائط المواقع (Sitemaps)، وإجراءات الخادم (Server Actions).
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
2.  سوف يسألك عن المنصات التي تريد تثبيت المهارات لها (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace، إلخ).
3.  سيُنشئ ملفات التكوين المطلوبة (مثل `.cursor/skills/intlayer_next_js/SKILL.md` و `.windsurf/skills/next_js/SKILL.md` و `.opencode/skills/next_js/SKILL.md` و `.vscode/mcp.json` إلخ).

## المنصات المدعومة

يوفر Intlayer وثائق خاصة بالإطار العملي (الإعداد، الاستخدام، بيانات التعريف، خريطة الموقع، إجراءات الخادم، إلخ) لمساعدة وكيل الذكاء الاصطناعي على فهم كيفية العمل مع Intlayer في مشروعك المحدد. تم تصميم هذه المهارات لتوجيه الوكيل خلال تعقيدات التدويل، مما يضمن اتباعه للأنماط الصحيحة وأفضل الممارسات.

يدعم Intlayer التكامل مع المنصات التالية:

### 1. Cursor

يدعم Cursor خوادم MCP (Model Context Protocol) والمهارات المخصصة. تشغيل الأمر `intlayer init skills` سيقوم بما يلي:

- إنشاء ملف `.cursor/mcp.json` للتواصل مع خادم MCP الخاص بـ Intlayer.
- تثبيت مهارات خاصة بالإطار في دليل `.cursor/skills`.

### 2. Windsurf

Windsurf هو بيئة تطوير متكاملة (IDE) مدعومة بالذكاء الاصطناعي. سيقوم تشغيل الأمر `intlayer init skills` بتثبيت مهارات خاصة بالإطار في دليل `.windsurf/skills`.

### 3. VS Code

لمستخدمي VS Code، وخاصة الذين يستخدمون GitHub Copilot أو امتدادات أخرى متوافقة مع MCP، فإن الأمر:

- يُنشئ تكوين `.vscode/mcp.json`.
- يُثبت مهارات خاصة بالإطار في دليل `skills/` في جذر مشروعك.

### 4. OpenCode

OpenCode هو وكيل CLI تفاعلي مصمم لمهام هندسة البرمجيات. يوفر Intlayer مهارات محددة لمساعدة OpenCode في مهام التدويل الخاصة بك. يتم تثبيت هذه المهارات في دليل `.opencode/skills`.

### 5. Claude Code

يمكن تكوين Claude Code لاستخدام مهارات Intlayer. يقوم الأمر بتثبيت مهارات خاصة بالإطار في دليل `.claude/skills`.

### 6. GitHub Copilot Workspace

يتيح لك GitHub Copilot Workspace تحديد مهارات مخصصة. يقوم الأمر بتثبيت مهارات خاصة بالإطار في دليل `.github/skills`.
