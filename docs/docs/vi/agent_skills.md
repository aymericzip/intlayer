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
  - version: 8.0.4
    date: 2026-02-09
    changes: Init history
---

## Lệnh `intlayer init skills`

Lệnh `intlayer init skills` là cách dễ nhất để thiết lập agent skills trong dự án của bạn. Nó phát hiện môi trường và cài đặt các tập tin cấu hình cần thiết cho các nền tảng bạn ưu tiên.

```bash
npx intlayer init skills
```

Khi bạn chạy lệnh này, nó sẽ:

1.  Phát hiện framework mà bạn đang sử dụng (ví dụ: Next.js, React, Vite).
2.  Hỏi bạn muốn cài kỹ năng cho nền tảng nào (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, v.v.).
3.  Tạo các tệp cấu hình cần thiết (chẳng hạn `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/next_js/SKILL.md`, `.vscode/mcp.json`, v.v.).

## Các nền tảng được hỗ trợ

Intlayer cung cấp tài liệu cụ thể cho từng framework (Cài đặt, Sử dụng, Metadata, Sitemap, Server Actions, v.v.) để giúp AI agent hiểu cách làm việc với Intlayer trong dự án cụ thể của bạn. Các kỹ năng này được thiết kế để hướng dẫn agent vượt qua các phức tạp của quốc tế hóa, đảm bảo nó tuân theo các mô hình và thực hành tốt nhất.

Intlayer hỗ trợ tích hợp với các nền tảng sau:

### 1. Cursor

Cursor hỗ trợ các máy chủ MCP (Model Context Protocol) và các kỹ năng tùy chỉnh. Chạy `intlayer init skills` sẽ:

- Tạo một tệp `.cursor/mcp.json` để giao tiếp với máy chủ Intlayer MCP.
- Cài đặt các kỹ năng cụ thể cho framework trong thư mục `.cursor/skills`.

### 2. Windsurf

Windsurf là một IDE hỗ trợ bởi AI. Chạy `intlayer init skills` sẽ cài đặt các kỹ năng cụ thể cho framework trong thư mục `.windsurf/skills`.

### 3. VS Code

Đối với người dùng VS Code, đặc biệt là những người sử dụng GitHub Copilot hoặc các tiện ích mở rộng tương thích với MCP khác, lệnh:

- Tạo cấu hình `.vscode/mcp.json`.
- Cài đặt các kỹ năng cụ thể cho framework trong thư mục `skills/` ở gốc dự án của bạn.

### 4. OpenCode

OpenCode là một tác nhân CLI tương tác được thiết kế cho các tác vụ kỹ thuật phần mềm. Intlayer cung cấp các kỹ năng cụ thể để giúp OpenCode hỗ trợ bạn trong các tác vụ quốc tế hóa. Những kỹ năng này được cài đặt trong thư mục `.opencode/skills`.

### 5. Claude Code

Claude Code có thể được cấu hình để sử dụng các kỹ năng của Intlayer. Lệnh này cài đặt các kỹ năng cụ thể cho framework trong thư mục `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace cho phép bạn xác định các kỹ năng tùy chỉnh. Lệnh này cài đặt các kỹ năng cụ thể cho framework trong thư mục `.github/skills`.
