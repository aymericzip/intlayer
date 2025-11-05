---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Dokumentasi Server MCP
description: Jelajahi fitur dan pengaturan Server MCP untuk mengoptimalkan manajemen dan operasi server Anda.
keywords:
  - Server MCP
  - Manajemen Server
  - Optimasi
  - Intlayer
  - Dokumentasi
  - Pengaturan
  - Fitur
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Menambahkan pengaturan ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Menambahkan pengaturan Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Menambahkan transport SSE dan server jarak jauh
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Intlayer MCP Server

**Intlayer MCP (Model Context Protocol) Server** menyediakan bantuan IDE bertenaga AI yang disesuaikan untuk ekosistem Intlayer.

## Di mana saya bisa menggunakannya?

- Pada lingkungan pengembang modern seperti **Cursor**, **VS Code**, dan IDE apa pun yang mendukung protokol MCP.
- Pada asisten AI favorit Anda seperti **Claude Desktop**, **Gemini**, **ChatGPT**, dll.

## Mengapa Menggunakan Intlayer MCP Server?

Dengan mengaktifkan Intlayer MCP Server di IDE Anda, Anda membuka:

- **Dokumentasi yang Sadar Konteks**  
  Server MCP memuat dan menampilkan dokumentasi Intlayer. Untuk mempercepat pengaturan Anda, migrasi Anda, dll.  
  Ini memastikan bahwa saran kode, opsi perintah, dan penjelasan selalu terbaru dan relevan.

- **Integrasi CLI Cerdas**  
  Akses dan jalankan perintah Intlayer CLI langsung dari antarmuka IDE Anda. Dengan menggunakan server MCP, Anda dapat membiarkan asisten AI Anda menjalankan perintah seperti `intlayer dictionaries build` untuk memperbarui kamus Anda, atau `intlayer dictionaries fill` untuk mengisi terjemahan yang hilang.

> Lihat daftar lengkap perintah dan opsi di [dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

## Server lokal (stdio) vs Server jarak jauh (SSE)

Server MCP dapat digunakan dengan dua cara:

- Server lokal (stdio)
- Server jarak jauh (SSE)

### Server lokal (stdio) (direkomendasikan)

Intlayer menyediakan paket NPM yang dapat diinstal secara lokal di mesin Anda. Paket ini dapat diinstal di IDE favorit Anda, seperti VS Code, Cursor, serta aplikasi asisten lokal Anda, seperti ChatGPT, Claude Desktop, dll.

Server ini adalah cara yang direkomendasikan untuk menggunakan server MCP. Karena server ini mengintegrasikan semua fitur dari server MCP, termasuk alat CLI.

### Server jarak jauh (SSE)

Server MCP juga dapat digunakan secara jarak jauh, menggunakan metode transport SSE. Server ini dihosting oleh Intlayer, dan tersedia di https://mcp.intlayer.org. Server ini dapat diakses secara publik, tanpa autentikasi, dan gratis untuk digunakan.

Perlu dicatat bahwa server jarak jauh tidak mengintegrasikan alat CLI, autocompletion AI, dll. Server jarak jauh hanya untuk interaksi dengan dokumentasi guna membantu asisten AI Anda dengan ekosistem Intlayer.

> Karena biaya hosting server, ketersediaan server jarak jauh tidak dapat dijamin. Kami membatasi jumlah koneksi simultan. Kami merekomendasikan menggunakan metode transport server lokal (stdio) untuk pengalaman yang paling andal.

---

## Pengaturan di Cursor

Ikuti [dokumentasi resmi](https://docs.cursor.com/context/mcp) untuk mengonfigurasi server MCP di Cursor.

Di root proyek Anda, tambahkan file konfigurasi `.cursor/mcp.json` berikut:

### Server lokal (stdio) (direkomendasikan)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Server jarak jauh (SSE)

Untuk menghubungkan ke server Intlayer MCP jarak jauh menggunakan Server-Sent Events (SSE), Anda dapat mengonfigurasi klien MCP Anda untuk terhubung ke layanan yang dihosting.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Ini memberi tahu IDE Anda untuk meluncurkan server Intlayer MCP menggunakan `npx`, memastikan selalu menggunakan versi terbaru yang tersedia kecuali Anda menguncinya.

---

## Pengaturan di VS Code

Ikuti [dokumentasi resmi](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) untuk mengonfigurasi server MCP di VS Code.

Untuk menggunakan Server Intlayer MCP dengan VS Code, Anda perlu mengonfigurasinya di pengaturan workspace atau pengguna Anda.

### Server lokal (stdio) (direkomendasikan)

Buat file `.vscode/mcp.json` di root proyek Anda:

```json fileName=".vscode/mcp.json"
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

### Server jarak jauh (SSE)

Untuk menghubungkan ke server Intlayer MCP jarak jauh menggunakan Server-Sent Events (SSE), Anda dapat mengonfigurasi klien MCP Anda untuk terhubung ke layanan yang dihosting.

```json fileName=".vscode/mcp.json"
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

## Pengaturan di ChatGPT

### Server jarak jauh (SSE)

Ikuti [dokumentasi resmi](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) untuk mengonfigurasi server MCP di ChatGPT.

1. Buka [dashboard prompt](https://platform.openai.com/prompts)
2. Klik `+ Create`
3. Klik `Tools (Create or +)`
4. Pilih `MCP Server`
5. Klik `Add new`
6. Isi bidang berikut:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Klik `Save`

---

## Pengaturan di Claude Desktop

Ikuti [dokumentasi resmi](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) untuk mengonfigurasi server MCP di Claude Desktop.

Lokasi file konfigurasi:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Server lokal (stdio) (direkomendasikan)

```json fileName="claude_desktop_config.json"
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

## Menggunakan MCP Server melalui CLI

Anda juga dapat menjalankan server MCP Intlayer langsung dari command line untuk pengujian, debugging, atau integrasi dengan alat lain.

```bash
# Instal secara global
npm install -g @intlayer/mcp

# Atau gunakan langsung dengan npx (direkomendasikan)
npx @intlayer/mcp
```

---
