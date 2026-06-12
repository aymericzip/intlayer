---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Server LSP Intlayer
description: Pelajari bagaimana Server Bahasa Intlayer menyediakan fitur "Go-to-Definition" dan fitur IDE lainnya untuk useIntlayer, getIntlayer, dan panggilan terkait di semua editor yang didukung.
keywords:
  - LSP
  - Server Bahasa
  - Go to Definition
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Server LSP Intlayer

**Server Bahasa Intlayer (LSP)** adalah implementasi [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) yang meningkatkan IDE Anda dengan kecerdasan yang memahami Intlayer. Saat ini, server menyediakan fitur **Go to Definition** untuk panggilan kunci kamus, memungkinkan Anda melompat langsung dari `useIntlayer("my-key")` di komponen Anda ke file `.content.ts` yang mendeklarasikannya.

---

## Mengapa Menggunakan LSP?

Saat Anda menggunakan Intlayer, hubungan antara panggilan seperti `useIntlayer("homepage")` dan deklarasinya di `src/homepage.content.ts` bersifat implisit. Tanpa alat bantu, Anda harus mencari file tersebut secara manual. LSP membuat tautan tersebut menjadi eksplisit:

**Kesadaran agen AI**

Agen pengkodean AI (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) mengandalkan server bahasa untuk menyelesaikan simbol dan memahami hubungan lintas file. Dengan menjalankan Intlayer LSP, agen dapat mengikuti `useIntlayer("key")` kembali ke deklarasinya, memberikan mereka konteks yang akurat tentang kunci konten yang tersedia, bentuk setiap kamus, dan file mana yang harus dibaca atau diedit.

**Go to Definition**

Tempatkan kursor Anda pada string kunci kamus apa pun di dalam panggilan getter yang didukung dan tekan `F12` (atau `Cmd/Ctrl+Click`). Editor akan membuka file deklarasi konten dan memposisikan kursor pada baris `key:`.

**Dukungan kamus yang digabungkan**

Kunci dapat dibagi di beberapa file konten (Intlayer menggabungkannya). Server mengembalikan satu `Location` per file sumber sehingga Anda dapat menavigasi ke setiap deklarasi.

**Bekerja di mana saja**

Mendukung semua paket `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Panggilan getter yang didukung

Server mendeteksi panggilan fungsi berikut dan mengekstrak argumen string-literal pertama sebagai kunci kamus:

| Fungsi        | Contoh                        |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript generics dan argumen ekstra diabaikan — hanya string kunci yang penting.

> `useDictionary` dan `getDictionary` mengambil objek `Dictionary` yang sudah diimpor sebagai argumen pertama mereka, bukan kunci string, sehingga mereka tidak mendapatkan manfaat dari Go-to-Definition dan tidak dilacak oleh server.

---

## Instalasi

Server LSP didistribusikan sebagai bagian dari `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

Paket ini mengekspos biner `intlayer-lsp`, yang digunakan editor sebagai executable server.

---

## Pengaturan sebagai Plugin Claude Code

Intlayer LSP tersedia sebagai **plugin Claude Code** yang dihosting langsung di repositori GitHub Intlayer. Menginstalnya memberikan Claude Code kesadaran native Go-to-Definition untuk semua panggilan `useIntlayer` / `getIntlayer` Anda.

### 1. Instal biner server bahasa

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Ini menempatkan biner `intlayer-lsp` pada PATH Anda, yang dipanggil oleh entri `lspServers` pada plugin.

### 2. Daftarkan marketplace Intlayer dan instal plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code akan menambahkan `"intlayer-lsp@intlayer": true` ke `enabledPlugins` Anda dan secara otomatis memulai server bahasa pada tipe file yang didukung (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Aktifkan alat LSP (jika belum aktif)

Beberapa versi Claude Code memerlukan flag fitur LSP untuk disetel. Tambahkan yang berikut ke `~/.claude/settings.json` Anda jika Go-to-Definition tidak berfungsi setelah instalasi:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Mulai ulang Claude Code — sekarang ia akan menggunakan `goToDefinition`, `findReferences`, dan operasi LSP lainnya saat menavigasi basis kode Intlayer Anda alih-alih kembali ke `grep`.

---

## Pengaturan di VS Code (melalui ekstensi — direkomendasikan)

Jika Anda memiliki [ekstensi VS Code Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) yang terinstal, server bahasa akan dimulai secara otomatis. Tidak diperlukan konfigurasi tambahan. LSP terintegrasi langsung ke dalam ekstensi VSCode sejak v8.12.0.

> Lihat [dokumentasi ekstensi VS Code](https://intlayer.org/doc/vs-code-extension) untuk instalasi dan fitur lainnya.

---

## Pengaturan Manual di VS Code

Jika Anda tidak menggunakan ekstensi Intlayer, Anda dapat menghubungkan server bahasa secara manual menggunakan ekstensi klien LSP generik seperti [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) atau dengan menulis ekstensi kecil Anda sendiri. Pendekatan yang direkomendasikan adalah menggunakan ekstensi Intlayer.

Sebagai referensi, server diluncurkan melalui biner `intlayer-lsp` melalui stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Ekstensi Intlayer membaca pengaturan ini untuk meluncurkan server. Jika Anda hanya mengandalkan ekstensi, tidak diperlukan pengaturan manual.

---

## Pengaturan di Cursor

[Cursor](https://www.cursor.com/) adalah fork VS Code dengan fitur AI bawaan. Ini menggunakan ekosistem ekstensi yang sama, sehingga **ekstensi VS Code Intlayer** bekerja tanpa konfigurasi ekstra — instal sekali dan Cursor akan mendeteksinya secara otomatis.

Jika Anda lebih memilih konfigurasi manual, Cursor juga membaca `.vscode/settings.json` dari root workspace, sehingga cuplikan VS Code di atas berlaku secara langsung.

---

## Pengaturan di Windsurf

[Windsurf](https://windsurf.com/) (oleh Codeium) adalah editor berbasis VS Code lainnya. Instal ekstensi Intlayer dari VS Code Marketplace dan server bahasa akan aktif secara otomatis, persis seperti di VS Code dan Cursor.

Untuk konfigurasi manual, buat `.vscode/settings.json` di root proyek:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Pengaturan di Zed

[Zed](https://zed.dev/) memiliki dukungan LSP native melalui pengaturan bahasanya. Tambahkan entri di pengaturan pengguna Zed Anda (`~/.config/zed/settings.json`):

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

Placeholder `"..."` memberi tahu Zed untuk mempertahankan server bahasa defaultnya bersama dengan server Intlayer.

---

## Pengaturan untuk CLI Agen AI (Claude Code, Codex, dll.)

**Claude Code** memiliki dukungan plugin LSP kelas satu — ikuti [pengaturan Plugin Claude Code](#pengaturan-sebagai-plugin-claude-code) di atas untuk mendapatkan pengalaman penuh Go-to-Definition secara langsung di sesi terminal Anda.

**OpenAI Codex** dan alat berbasis terminal lainnya belum bertindak sebagai klien LSP — mereka membaca dan menulis file secara langsung daripada mempertahankan sesi server bahasa yang persisten. Untuk alat-alat tersebut, nilai dari menjalankan LSP datang secara tidak langsung: ketika server aktif di editor pendamping (VS Code, Cursor, Windsurf, ...) indeks langsung editor tersedia untuk agen AI apa pun yang dapat menanyakannya melalui konteks yang disediakan editor (misalnya, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Jika Anda bekerja murni di terminal tanpa editor yang terbuka, Anda dapat memulai server bahasa di latar belakang sehingga siap untuk editor mana pun yang kemudian terhubung ke workspace yang sama:

```bash
# Biarkan server tetap hidup di latar belakang
npx @intlayer/lsp &
```

---

## Pengaturan Manual di Neovim

Menggunakan [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), daftarkan konfigurasi server khusus:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Luncurkan server dengan npx sehingga Anda tidak memerlukan instalasi global
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Setelah memulai ulang Neovim, menekan `gd` di atas kunci Intlayer akan memicu Go to Definition.

---

## Pengaturan Manual di Editor Lain

Editor apa pun yang mendukung Language Server Protocol dapat menggunakan `@intlayer/lsp`. Server:

- **Transportasi** – Node.js IPC / stdio (standar)
- **Executable** – `npx @intlayer/lsp` (atau biner `intlayer-lsp` yang diinstal secara lokal)
- **Kemampuan** – `definitionProvider: true`, `textDocumentSync: Incremental`

Konsultasikan dokumentasi LSP editor Anda untuk format konfigurasi yang tepat (misalnya, `languageserver.json` untuk [coc.nvim](https://github.com/neoclide/coc.nvim), atau pengaturan klien LSP di [Helix](https://helix-editor.com)).

### Contoh: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### Contoh: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Cara Kerja

Ketika server dimulai, ia menyelesaikan konfigurasi Intlayer dari root workspace menggunakan `getConfiguration()`. Ini memberikan jalur `build` dan `system` yang diperlukan untuk menemukan kamus yang dikompilasi.

Pada setiap permintaan **Go to Definition**:

1. Server membaca teks lengkap dari dokumen yang terbuka.
2. Server memindai panggilan getter (`useIntlayer`, `getIntlayer`, dll.) menggunakan ekspresi reguler.
3. Server memeriksa apakah posisi kursor jatuh di dalam salah satu panggilan tersebut.
4. Jika ya, ia mengekstrak kunci kamus (grup tangkapan 3 dari regex) dan memanggil `getUnmergedDictionaries()` untuk menemukan setiap file konten yang mendeklarasikan kunci tersebut.
5. Ia membaca setiap file yang cocok dan menemukan baris persis yang berisi `key: "<key>"` untuk memposisikan kursor secara tepat.
6. Ia mengembalikan array objek `Location` — satu per file sumber.

Konfigurasi diselesaikan secara malas (lazy) dan di-cache per sesi; ia disetel ulang pada setiap permintaan `initialize` (misalnya, ketika Anda membuka folder workspace baru).

---

## Pemecahan Masalah

| Gejala                                     | Penyebab yang mungkin          | Solusi                                                                           |
| ------------------------------------------ | ------------------------------ | -------------------------------------------------------------------------------- |
| Go to Definition tidak melakukan apa-apa   | Server tidak berjalan          | Periksa apakah `@intlayer/lsp` terinstal dan editor meluncurkannya               |
| Root workspace yang salah terdeteksi       | Beberapa folder workspace      | Pastikan folder yang berisi `intlayer.config.ts` adalah folder workspace pertama |
| Definisi tidak ditemukan untuk suatu kunci | Konfigurasi tidak diselesaikan | Verifikasi `intlayer.config.ts` (atau `.js`) ada di root workspace               |
| Server crash saat start                    | Versi Node.js terlalu usang    | Memerlukan Node.js ≥ 14.18                                                       |
