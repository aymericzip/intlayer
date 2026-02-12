---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Kỹ năng Agent
description: Tìm hiểu cách sử dụng Intlayer Agent Skills để cải thiện khả năng AI agent hiểu về dự án của bạn.
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
2.  Hỏi bạn muốn cài kỹ năng cho nền tảng nào (Cursor, VS Code, OpenCode, Claude Code, v.v.).
3.  Tạo các tệp cấu hình cần thiết (chẳng hạn `.cursor/mcp.json`, `.vscode/mcp.json`, hoặc `.intlayer/skills/*.md`).

## Các nền tảng được hỗ trợ

Intlayer hỗ trợ tích hợp với các nền tảng sau:

### 1. Cursor

Cursor hỗ trợ các máy chủ MCP (Model Context Protocol). Chạy `intlayer init skills` sẽ tạo một tệp `.cursor/mcp.json` cho phép Cursor giao tiếp với máy chủ Intlayer MCP.

### 2. VS Code

Đối với người dùng VS Code, đặc biệt là những người sử dụng GitHub Copilot hoặc các extension tương thích MCP khác, lệnh sẽ tạo tệp cấu hình `.vscode/mcp.json`.

### 3. OpenCode

OpenCode là một tác nhân CLI tương tác được thiết kế cho các tác vụ kỹ thuật phần mềm. Intlayer cung cấp các skills cụ thể để giúp OpenCode hỗ trợ bạn với các nhiệm vụ internationalization (i18n).

### 4. Claude Code

Claude Code có thể được cấu hình để sử dụng các skills của Intlayer bằng cách thêm các cấu hình đã sinh vào cài đặt desktop hoặc CLI của nó.
