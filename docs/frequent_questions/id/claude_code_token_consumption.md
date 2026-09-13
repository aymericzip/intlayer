---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Cara membatasi konsumsi token Claude Code untuk menghasilkan terjemahan
description: Mengapa menerjemahkan dengan Claude Code menghabiskan banyak token, apa yang dilakukan Intlayer sebagai gantinya (memfilter kunci yang diterjemahkan, memotong JSON, menerjemahkan markdown blok demi blok), dan cara menggunakan kembali langganan Claude Anda dengan claude setup-token.
keywords:
  - claude code
  - tokens
  - konsumsi token
  - setup-token
  - i18n
  - internasionalisasi
  - terjemahan
  - fill
  - mcp
  - agen
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Cara membatasi konsumsi token Claude Code untuk menghasilkan terjemahan

## Deskripsi Masalah

Meminta Claude Code (atau agen pengodean apa pun) untuk menerjemahkan konten Anda adalah metode yang paling boros biaya. Untuk setiap eksekusi, agen harus:

- Memuat seluruh file JSON atau file konten ke dalam konteksnya, bahkan kunci yang sudah diterjemahkan.
- Mencari file terkait untuk memahami letak konten dan bagaimana strukturnya disusun.
- Menentukan locale mana yang belum ada dan perlu dibuat.
- Membaca ulang instruksi khusus Anda setiap saat ("ubah URL dengan cara ini", "biarkan nama merek dalam bahasa Inggris", "gunakan nada santai").
- Menulis ulang seluruh file, termasuk bagian yang tidak mengalami perubahan.

Semua itu dikirim ulang pada setiap giliran percakapan, sehingga biaya melonjak seiring `ukuran konten × jumlah locale × jumlah giliran`, dan setiap inkonsistensi format maupun kunci harus diperiksa secara manual.

## Apa yang dilakukan Intlayer sebagai gantinya

Kelebihan Intlayer adalah menjalankan pekerjaan tersebut di luar agen melalui alur kerja (pipeline) yang dirancang khusus untuk penerjemahan:

- **Memfilter terjemahan yang sudah ada** untuk menekan penggunaan token. Kunci yang sudah diterjemahkan di dalam JSON Anda akan disaring, dan hanya kunci yang belum ada yang dikirim ke model.
- **Menerjemahkan markdown blok demi blok.** Untuk dokumentasi, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate.md) dan [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-review.md) membandingkan setiap blok dengan dokumen dasar dan melewati blok yang sudah diterjemahkan atau tidak berubah.
- **Memotong JSON (chunking)** jika ukurannya terlalu besar agar tetap berada di rentang konteks yang optimal.
- **Meratakan dan menyusun ulang JSON** guna mengoptimalkan konsumsi token.
- **Menyisipkan prompt khusus** untuk aturan tertentu terkait merek dan terminologi Anda (`applicationContext`, `--custom-instructions`), sehingga Anda hanya menuliskannya satu kali tanpa perlu mengulanginya di setiap percakapan.
- **Memvalidasi struktur** untuk menjamin konsistensi dan mencegah pergeseran kunci, serta mempertahankan format (markdown, HTML, tag sisipan, bentuk jamak).
- **Menerapkan manajemen percobaan ulang (retry)** apabila format output tidak valid.
- **Mengantrekan dan memparalelkan permintaan** lintas file, potongan teks, dan locale untuk meningkatkan kecepatan.

Semua proses ini tidak melewati konteks agen. Aturan praktisnya: biarkan agen memutuskan **apa** yang perlu diinternasionalisasi, dan biarkan Intlayer menangani pekerjaan berulang tersebut.

## Solusi

### 1. Delegasikan ekstraksi ke `intlayer extract`

Alih-alih meminta agen menulis ulang setiap komponen secara manual, biarkan agen menjalankan perintah [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md). Perintah ini memindahkan string statis ke dalam file `.content` di samping komponen tanpa memuat seluruh file ke dalam konteks agen.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Delegasikan penerjemahan ke `intlayer fill`

Jangan pernah meminta agen untuk menerjemahkan secara langsung. Perintah [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) menerapkan alur kerja di atas: hanya mengirimkan kunci yang belum diterjemahkan, membaginya ke dalam beberapa potongan, memproses locale secara paralel, dan menuliskan hasilnya kembali ke file konten Anda.

```bash
npx intlayer fill
```

Beberapa opsi flag membantu mempersempit ruang lingkup eksekusi:

- `--git-diff` (atau `--uncommitted`) hanya memproses kamus yang dimodifikasi pada branch saat ini.
- `--file` atau `--keys` menargetkan file konten tertentu.
- `--output-locales fr es` membatasi eksekusi hanya untuk locale yang benar-benar Anda butuhkan saat ini.
- `--skip-metadata` melewati pembuatan judul, deskripsi, dan tag.
- `--data-serialization toon` mengirimkan payload yang lebih ringkas ke model (mengurangi token, hasil sedikit kurang konsisten).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Terjemahkan markdown dengan `doc translate` dan `doc review`

Meminta agen menerjemahkan file `.md` berarti menempelkan seluruh dokumen, untuk setiap locale, pada setiap perubahan. Sebaliknya, perintah [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-translate.md) dan [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/doc-review.md) bekerja blok demi blok.

Gunakan `doc translate` ketika file hasil terjemahan belum ada. Perintah ini memotong markdown, menerjemahkannya secara paralel, dan menulis file tujuan:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Gunakan `doc review` ketika file terjemahan sudah ada. Perintah ini membandingkan setiap blok dengan dokumen dasar, melewati blok yang sudah diterjemahkan atau tidak berubah, dan hanya mengirimkan blok yang berbeda:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Kedua perintah ini menerima aturan Anda satu kali saja, sehingga Anda tidak perlu mengulanginya di setiap prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Dua mode pada `doc review` sangat berguna saat agen tetap harus dilibatkan tanpa memicu panggilan AI dari Intlayer:

- `--mode report` mencatat blok-blok yang memerlukan penyesuaian lengkap dengan nomor baris, sehingga agen hanya mengubah blok tersebut.
- `--mode synthesis` hanya melaporkan dokumen mana yang sudah diperbarui dan dokumen mana yang masih memiliki blok untuk diedit.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Biarkan agen memanggil CLI melalui server MCP

Dengan [server MCP Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md), agen menjawab berdasarkan dokumentasi terbaru dan menjalankan `intlayer fill` atau `intlayer doc review` secara langsung alih-alih mengimplementasikan kembali logika tersebut di dalam percakapan.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Memasang [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md) melalui `npx intlayer init skills` juga mencegah agen menebak-nebak API Intlayer dan membaca ulang dokumentasi di setiap tugas.

### 5. Gunakan kembali langganan Claude Anda dengan `claude setup-token`

Menjalankan penyiapan i18n di dalam sesi Claude Code interaktif akan menumpuk seluruh riwayat percakapan dalam konteks. Alihkan tugas berat tersebut ke sesi headless yang singkat.

Buat token berdurasi panjang dari langganan Claude Anda:

```bash
claude setup-token
```

Simpan token ini sebagai `CLAUDE_CODE_OAUTH_TOKEN` (di dalam file `.env` atau secret CI Anda), lalu gunakan kembali untuk sesi sekali jalan yang mengeksekusi perintah Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

Sesi tersebut hanya memuat prompt dan output perintah tanpa menyertakan riwayat percakapan sebelumnya. Token yang sama juga berfungsi pada [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) untuk menjalankan `intlayer fill` di setiap pull request.

> Token yang dibuat oleh `claude setup-token` hanya mengautentikasi Claude Code. Token ini tidak dapat digunakan sebagai kunci API Anthropic di `ai.apiKey`. Untuk proses penerjemahannya sendiri, `intlayer fill` menggunakan [akun Intlayer](https://app.intlayer.org) Anda (termasuk paket gratis) atau kunci penyedia Anda sendiri yang dikonfigurasi pada [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#ai-configuration).

## Ringkasan

| Tugas                                 | Pelaksana                | Token dalam konteks agen |
| ------------------------------------- | ------------------------ | ------------------------ |
| Menentukan apa yang akan dilokalisasi | Claude Code              | Rendah                   |
| Mengekstrak string                    | `intlayer extract`       | Tidak ada                |
| Menerjemahkan konten                  | `intlayer fill`          | Tidak ada                |
| Menerjemahkan dokumentasi             | `intlayer doc translate` | Tidak ada                |
| Memperbarui dokumentasi               | `intlayer doc review`    | Tidak ada                |
| Menjalankan perintah                  | Headless Claude Code     | Prompt + output perintah |
