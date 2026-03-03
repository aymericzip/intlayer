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
  - version: 8.1.0
    date: 2026-02-09
    changes: سجل البدء
---

# مهارات الوكيل

## أمر `intlayer init skills`

أمر `intlayer init skills` هو أسهل طريقة لإعداد مهارات الوكلاء في مشروعك. يقوم باكتشاف بيئتك وتثبيت ملفات التهيئة اللازمة للمنصات التي تفضّلها.

```bash
npx intlayer init skills
```

أو باستخدام Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

عند تشغيل هذا الأمر، سيقوم بما يلي:

1.  اكتشاف الإطار الذي تستخدمه (مثل Next.js أو React أو Vite).
2.  سوف يسألك عن المنصات التي تريد تثبيت المهارات لها (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace، إلخ).
3.  سيُنشئ ملفات التكوين المطلوبة (مثل `.cursor/skills/intlayer-next-js/SKILL.md` و `.windsurf/skills/intlayer-next-js/SKILL.md` و `.opencode/skills/intlayer-next-js/SKILL.md` و `.vscode/mcp.json` إلخ).

## المنصات المدعومة

يوفر Intlayer وثائق خاصة بالإطار العملي (الإعداد، الاستخدام، بيانات التعريف، خريطة الموقع، إجراءات الخادم، إلخ) لمساعدة وكيل الذكاء الاصطناعي على فهم كيفية العمل مع Intlayer في مشروعك المحدد. تم تصميم هذه المهارات لتوجيه الوكيل خلال تعقيدات التدويل، مما يضمن اتباعه للأنماط الصحيحة وأفضل الممارسات.
