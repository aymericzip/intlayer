---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Ekstensi VS Code Resmi
description: Pelajari cara menggunakan ekstensi Intlayer di VS Code untuk meningkatkan alur kerja pengembangan Anda. Navigasi cepat antar konten yang dilokalisasi dan kelola kamus Anda dengan efisien.
keywords:
  - Ekstensi VS Code
  - Intlayer
  - Lokalisasi
  - Alat Pengembangan
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Menambahkan gif demo
  - version: 6.1.0
    date: 2025-09-24
    changes: Menambahkan bagian pemilihan lingkungan
  - version: 6.0.0
    date: 2025-09-22
    changes: Tab Intlayer / Perintah Isi & Uji
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Ekstensi VS Code Resmi

## Ikhtisar

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) adalah ekstensi resmi Visual Studio Code untuk **Intlayer**, yang dirancang untuk meningkatkan pengalaman pengembang saat bekerja dengan konten yang dilokalisasi dalam proyek Anda.

![Ekstensi Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Tautan ekstensi: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Fitur

![Ekstrak konten](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_extract_content.gif?raw=true)

- **Ekstrak Konten** – Ekstrak konten dari komponen React / Vue / Svelte Anda

![Isi kamus](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Navigasi Instan** – Melompat dengan cepat ke file konten yang benar saat mengklik kunci `useIntlayer`.
- **Isi Kamus** – Mengisi kamus dengan konten dari proyek Anda.

![Daftar perintah](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Akses Mudah ke Perintah Intlayer** – Membangun, mendorong, menarik, mengisi, menguji kamus konten dengan mudah.

![Buat file konten](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Generator Deklarasi Konten** – Membuat file konten kamus dalam berbagai format (`.ts`, `.esm`, `.cjs`, `.json`).

![Uji kamus](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Uji Kamus** – Uji kamus untuk terjemahan yang hilang.

![Bangun ulang kamus](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Perbarui kamus Anda** – Perbarui kamus Anda dengan konten terbaru dari proyek Anda.

![Tab Intlayer (Activity Bar)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Tab Intlayer (Activity Bar)** – Jelajahi dan cari kamus dari tab samping khusus dengan toolbar dan aksi konteks (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Penggunaan

### Navigasi Cepat

1. Buka proyek yang menggunakan **react-intlayer**.
2. Temukan pemanggilan `useIntlayer()`, seperti:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` di macOS) atau **Ctrl+Click** (di Windows/Linux) pada kunci (misalnya, `"app"`).
4. VS Code akan secara otomatis membuka file kamus yang sesuai, misalnya, `src/app.content.ts`.

### Tab Intlayer (Activity Bar)

Gunakan tab samping untuk menjelajahi dan mengelola kamus:

- Buka ikon Intlayer di Activity Bar.
- Di **Search**, ketik untuk memfilter kamus dan entri secara real time.
- Di **Dictionaries**, jelajahi environment, kamus, dan file. Gunakan toolbar untuk Build, Pull, Push, Fill, Refresh, Test, dan Create Dictionary File. Klik kanan untuk aksi konteks (Pull/Push pada kamus, Fill pada file). File editor saat ini akan otomatis terlihat di pohon saat berlaku.

### Mengakses perintah

Anda dapat mengakses perintah dari **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Build Dictionaries**
- **Push Dictionaries**
- **Pull Dictionaries**
- **Fill Dictionaries**
- **Test Dictionaries**
- **Create Dictionary File**

### Memuat Variabel Lingkungan

Intlayer menyarankan untuk menyimpan kunci API AI Anda, serta client ID dan secret Intlayer dalam variabel lingkungan.

Ekstensi dapat memuat variabel lingkungan dari workspace Anda untuk menjalankan perintah Intlayer dengan konteks yang benar.

- **Urutan pemuatan (berdasarkan prioritas)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Non-destruktif**: nilai `process.env` yang sudah ada tidak akan ditimpa.
- **Lingkup**: file diselesaikan dari direktori dasar yang dikonfigurasi (default ke root workspace).

#### Memilih environment aktif

- **Command Palette**: buka palette dan jalankan `Intlayer: Select Environment`, lalu pilih environment (misalnya, `development`, `staging`, `production`). Ekstensi akan mencoba memuat file pertama yang tersedia dalam daftar prioritas di atas dan menampilkan notifikasi seperti “Loaded env from .env.<env>.local”.
- **Settings**: buka `Settings → Extensions → Intlayer`, dan atur:
  - **Environment**: nama environment yang digunakan untuk menyelesaikan file `.env.<env>*`.
  - (Opsional) **Env File**: jalur eksplisit ke file `.env`. Jika disediakan, ini akan memiliki prioritas lebih tinggi daripada daftar yang diinferensikan.

#### Monorepos dan direktori kustom

Jika file `.env` Anda berada di luar root workspace, atur **Base Directory** di `Settings → Extensions → Intlayer`. Loader akan mencari file `.env` relatif terhadap direktori tersebut.
