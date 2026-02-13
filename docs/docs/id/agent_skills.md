---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Keterampilan Agen
description: Pelajari cara menggunakan Intlayer Agent Skills untuk meningkatkan pemahaman agen AI Anda terhadap proyek Anda, termasuk panduan pengaturan komprehensif untuk Metadata, Sitemaps, dan Server Actions.
keywords:
  - Intlayer
  - Keterampilan Agen
  - Agen AI
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: Inisialisasi riwayat
---

## Perintah `intlayer init skills`

Perintah `intlayer init skills` adalah cara termudah untuk mengatur agent skills di proyek Anda. Perintah ini mendeteksi lingkungan Anda dan menginstal file konfigurasi yang diperlukan untuk platform pilihan Anda.

```bash
npx intlayer init skills
```

Saat Anda menjalankan perintah ini, perintah tersebut akan:

1.  Mendeteksi framework yang Anda gunakan (mis. Next.js, React, Vite).
2.  Menanyakan platform mana yang ingin Anda pasang skills-nya (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, dll.).
3.  Menghasilkan file konfigurasi yang diperlukan (seperti `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/next_js/SKILL.md`, `.opencode/skills/next_js/SKILL.md`, `.vscode/mcp.json`, dll.).

## Platform yang Didukung

Intlayer menyediakan dokumentasi khusus kerangka kerja (Pengaturan, Penggunaan, Metadata, Sitemap, Server Actions, dll.) untuk membantu agen AI memahami cara bekerja dengan Intlayer di proyek spesifik Anda. Keterampilan ini dirancang untuk memandu agen melalui kerumitan internasionalisasi, memastikannya mengikuti pola dan praktik terbaik yang benar.

Intlayer mendukung integrasi dengan platform berikut:

### 1. Cursor

Cursor mendukung server MCP (Model Context Protocol) dan custom skills. Menjalankan `intlayer init skills` akan:

- Membuat file `.cursor/mcp.json` untuk berkomunikasi dengan server MCP Intlayer.
- Menginstal framework-specific skills di direktori `.cursor/skills`.

### 2. Windsurf

Windsurf adalah IDE bertenaga AI. Menjalankan `intlayer init skills` akan menginstal framework-specific skills di direktori `.windsurf/skills`.

### 3. VS Code

Untuk pengguna VS Code, terutama yang menggunakan GitHub Copilot atau ekstensi lain yang kompatibel dengan MCP, perintah ini:

- Membuat konfigurasi `.vscode/mcp.json`.
- Menginstal framework-specific skills di direktori `skills/` pada root proyek Anda.

### 4. OpenCode

OpenCode adalah agen CLI interaktif yang dirancang untuk tugas rekayasa perangkat lunak. Intlayer menyediakan keterampilan khusus untuk membantu OpenCode membantu Anda dengan tugas internasionalisasi. Keterampilan ini diinstal di direktori `.opencode/skills`.

### 5. Claude Code

Claude Code dapat dikonfigurasi untuk menggunakan keterampilan Intlayer. Perintah ini menginstal framework-specific skills di direktori `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace memungkinkan Anda menentukan custom skills. Perintah ini menginstal framework-specific skills di direktori `.github/skills`.
