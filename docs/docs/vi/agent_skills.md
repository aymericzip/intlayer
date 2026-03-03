---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Kỹ năng Agent
description: Tìm hiểu cách sử dụng Intlayer Agent Skills để cải thiện khả năng AI agent hiểu về dự án của bạn, bao gồm các hướng dẫn thiết lập toàn diện cho Metadata, Sitemaps và Server Actions.
keywords:
  - Intlayer
  - Kỹ năng Agent
  - AI Agent
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Init history
---

# Kỹ năng Agent

## Lệnh `intlayer init skills`

Lệnh `intlayer init skills` là cách dễ nhất để thiết lập agent skills trong dự án của bạn. Nó phát hiện môi trường và cài đặt các tập tin cấu hình cần thiết cho các nền tảng bạn ưu tiên.

```bash
npx intlayer init skills
```

Hoặc sử dụng Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

Khi bạn chạy lệnh này, nó sẽ:

1.  Phát hiện framework mà bạn đang sử dụng (ví dụ: Next.js, React, Vite).
2.  Hỏi bạn muốn cài kỹ năng cho nền tảng nào (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, v.v.).
3.  Tạo các tệp cấu hình cần thiết (chẳng hạn `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json`, v.v.).

## Các nền tảng được hỗ trợ

Intlayer cung cấp tài liệu cụ thể cho từng framework (Cài đặt, Sử dụng, Metadata, Sitemap, Server Actions, v.v.) để giúp AI agent hiểu cách làm việc với Intlayer trong dự án cụ thể của bạn. Các kỹ năng này được thiết kế để hướng dẫn agent vượt qua các phức tạp của quốc tế hóa, đảm bảo nó tuân theo các mô hình và thực hành tốt nhất.
