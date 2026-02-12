---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Keterampilan Agen
description: Pelajari cara menggunakan Intlayer Agent Skills untuk meningkatkan pemahaman agen AI Anda terhadap proyek Anda.
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
2.  Menanyakan platform mana yang ingin Anda pasang skills-nya (Cursor, VS Code, OpenCode, Claude Code, dll.).
3.  Menghasilkan file konfigurasi yang diperlukan (seperti `.cursor/mcp.json`, `.vscode/mcp.json`, atau `.intlayer/skills/*.md`).

## Platform yang Didukung

Intlayer mendukung integrasi dengan platform berikut:

### 1. Cursor

Cursor mendukung server MCP (Model Context Protocol). Menjalankan `intlayer init skills` akan membuat file `.cursor/mcp.json` yang memungkinkan Cursor berkomunikasi dengan server MCP Intlayer.

### 2. VS Code

Untuk pengguna VS Code, terutama yang menggunakan GitHub Copilot atau ekstensi lain yang kompatibel dengan MCP, perintah ini akan membuat konfigurasi `.vscode/mcp.json`.

### 3. OpenCode

OpenCode adalah agen CLI interaktif yang dirancang untuk tugas rekayasa perangkat lunak. Intlayer menyediakan skills khusus untuk membantu OpenCode menangani tugas internasionalisasi.

### 4. Claude Code

Claude Code dapat dikonfigurasi untuk menggunakan skills Intlayer dengan menambahkan konfigurasi yang dihasilkan ke pengaturan desktop atau CLI-nya.
