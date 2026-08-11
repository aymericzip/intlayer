---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Server LSP Intlayer
description: Pelajari bagaimana language server Intlayer menghadirkan Go-to-Definition, pencarian referensi, pratinjau saat hover, autocomplete kunci, dan diagnostik ke IDE dan agen AI Anda.
keywords:
  - LSP
  - Language Server
  - Go to Definition
  - Autocomplete
  - Diagnostik
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Menambahkan pencarian referensi, hover, autocomplete, dan diagnostik"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Server LSP Intlayer

**Language server Intlayer** adalah implementasi [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) yang membuat IDE — dan agen AI — Anda memahami Intlayer. Ia menghubungkan pemanggilan seperti `useIntlayer("home")` dengan berkas `.content.ts` yang mendeklarasikannya, dua arah.

---

## Fitur

| Fitur                    | Pintasan            | Fungsinya                                                                                                           |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Ke definisi**          | `F12` / `Cmd+Klik`  | Melompat dari kunci kamus atau penggunaan field ke deklarasinya di berkas konten                                    |
| **Cari semua referensi** | `Shift+F12`         | Dari berkas konten, menampilkan setiap lokasi pemanggilan yang memakai kunci atau field tersebut                    |
| **Hover**                | arahkan kursor      | Melihat field sebuah kamus, atau nilai terjemahan sebuah field, tanpa meninggalkan berkas                           |
| **Autocomplete**         | `"` `'` `` ` `` `.` | Menyarankan kunci kamus yang dideklarasikan di dalam getter, dan field konten setelah `.` atau saat destrukturisasi |
| **Diagnostik**           | otomatis            | Memperingatkan saat sebuah kunci tidak dideklarasikan di berkas konten mana pun                                     |

Ada dua perilaku tambahan yang perlu diketahui:

- **Kamus tergabung** — kunci yang terbagi di beberapa berkas konten mengembalikan satu hasil per berkas, sehingga Anda dapat menuju setiap deklarasi.
- **Ramah monorepo** — server menyelesaikan `intlayer.config.*` yang _terdekat_ dengan setiap berkas, sehingga beberapa proyek dalam satu workspace masing-masing memiliki kamusnya sendiri.

### Pemanggilan yang didukung

Kunci dibaca dari argumen string posisional atau dari objek opsi (`{ namespace }`, `{ id }`).

| Pustaka                     | Pemanggilan                                              |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Ini berlaku untuk semua paket `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), serta untuk paket adapter compat yang memungkinkan Anda mempertahankan sintaks i18n yang sudah ada.

> Kamus dibaca dari hasil build, jadi jalankan `npx intlayer build` — atau biarkan dev server tetap berjalan — agar server punya sesuatu untuk diselesaikan.

---

## Instalasi

Server didistribusikan sebagai biner `intlayer-lsp` di dalam `@intlayer/lsp`:

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

Pasang secara global (`npm install -g @intlayer/lsp`) bila editor Anda membutuhkan `intlayer-lsp` di `PATH` — ini berlaku untuk plugin Claude Code dan untuk setiap konfigurasi di bawah yang memanggil biner secara langsung.

---

## Penyiapan

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Pasang [ekstensi Intlayer untuk VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Language server sudah disertakan sejak v8.12.0 dan berjalan otomatis — **tanpa konfigurasi apa pun**.

Lihat [dokumentasi ekstensi VS Code](https://intlayer.org/doc/vs-code-extension) untuk fitur lainnya.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) dan [Windsurf](https://windsurf.com/) adalah fork VS Code dan memakai ekosistem ekstensi yang sama. Pasang [ekstensi Intlayer untuk VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) sekali dan server aktif otomatis — **tanpa konfigurasi apa pun**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer menyediakan **plugin Claude Code** yang dihosting di repositori Intlayer. Plugin ini memberi Claude Code resolusi simbol yang sesungguhnya untuk kunci kamus Anda, alih-alih kembali memakai `grep`.

Letakkan biner di `PATH` Anda, lalu daftarkan marketplace dan pasang plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` sekaligus mengaktifkan plugin. **Mulai ulang Claude Code** — language server dimuat saat startup, jadi sebelum itu plugin belum berpengaruh.

Claude Code kemudian menjalankan server pada berkas `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro`, dan `.svelte`, serta memakai `goToDefinition`, `findReferences`, dan `hover` saat menelusuri kode Anda.

Jika Go-to-Definition masih tidak bekerja, versi Claude Code Anda mungkin membatasi alat LSP di balik sebuah flag:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed mendukung LSP secara bawaan. Tambahkan server ke pengaturan pengguna Anda:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

Placeholder `"..."` mempertahankan language server bawaan Zed berdampingan dengan milik Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Dengan [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), daftarkan konfigurasi server kustom:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Jalankan server dengan npx agar tidak perlu instalasi global
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

Setelah memulai ulang Neovim, `gd` di atas kunci kamus menjalankan Ke Definisi dan `gr` menjalankan Cari Referensi.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Editor lain" value="other">

Editor apa pun yang mendukung LSP dapat menjalankan `@intlayer/lsp`. Arahkan ke:

- **Executable** — `npx @intlayer/lsp`, atau biner `intlayer-lsp`
- **Transport** — stdio (standar)
- **Kapabilitas** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (karakter pemicu `"` `'` `` ` `` `.`), diagnostik push, `textDocumentSync: Incremental`
- **Pola root** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Lihat dokumentasi LSP editor Anda untuk format konfigurasi yang tepat.

  </Tab>
</Tabs>

---

## Catatan tentang agen AI di terminal

**Claude Code** bertindak sebagai klien LSP sungguhan — lihat tab di atas.

**OpenAI Codex** dan sebagian besar alat terminal lain bukan klien LSP: mereka membaca dan menulis berkas secara langsung. Menjalankan server sendirian tidak membantu mereka; manfaatnya muncul saat server aktif di editor pendamping yang indeksnya bisa dikueri oleh agen (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Cara kerjanya

Untuk setiap berkas, server mencari `intlayer.config.*` terdekat dan memuat konfigurasi proyek tersebut guna menemukan kamus hasil kompilasi. Konfigurasi, kamus, dan daftar berkas sumber di-cache dengan TTL singkat, dan dibatalkan setiap kali berkas konten yang dipantau berubah.

Pada setiap permintaan, server mem-parsing dokumen (via [oxc](https://oxc.rs/)) dan memeriksa posisi kursor:

1. **Pada string kunci** (`useIntlayer("home")`) → mengembalikan setiap berkas konten yang mendeklarasikan kunci itu, diposisikan pada baris `key:`-nya.
2. **Pada penggunaan field** (`content.title`, properti hasil destrukturisasi, `t('path.to.field')`, `<Trans>`, …) → menelusuri variabel kembali ke kamusnya dan mengembalikan field yang cocok di dalam berkas konten.
3. **Dari berkas konten** → menjalankan pencarian balik, memindai sumber proyek untuk menemukan lokasi pemanggilan kunci atau field tersebut.

---

## Pemecahan masalah

| Gejala                                      | Kemungkinan penyebab            | Solusi                                                                                 |
| ------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| Tidak terjadi apa-apa                       | Server tidak berjalan           | Periksa `@intlayer/lsp` sudah terpasang dan editor Anda menjalankannya                 |
| Bekerja di editor, tidak di Claude Code     | Plugin dipasang di tengah sesi  | Mulai ulang Claude Code — language server dimuat saat startup                          |
| Definisi untuk sebuah kunci tidak ditemukan | Kamus belum dibangun            | Jalankan `npx intlayer build`, atau mulai dev server Anda                              |
| Semua kunci dilaporkan tidak dideklarasikan | Konfigurasi tidak terselesaikan | Pastikan ada `intlayer.config.ts` (atau `.js`) di root proyek Anda                     |
| Proyek yang salah dipakai di monorepo       | Konfigurasi per paket tidak ada | Tambahkan `intlayer.config.*` pada setiap paket yang mendeklarasikan kontennya sendiri |
| Server crash saat mulai                     | Versi Node.js terlalu lama      | Membutuhkan Node.js ≥ 14.18                                                            |

Di VS Code, server menulis log ke **View → Output → "Intlayer LSP"** — berguna untuk memastikan konfigurasi mana yang terselesaikan dan berapa kamus yang ditemukan.
