---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - Tingkatkan Paket Intlayer
description: Pelajari cara menggunakan perintah upgrade Intlayer CLI untuk mencantumkan setiap paket Intlayer dari proyek atau monorepo Anda dan meningkatkannya ke versi terbaru.
keywords:
  - CLI
  - Upgrade
  - Tingkatkan
  - Paket
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "Memasang dan mendaftarkan plugin lint / Prettier, memperbarui entri server MCP"
  - version: 9.5.8
    date: 2026-09-23
    changes: "Menambahkan perintah upgrade"
author: aymericzip
---

# Tingkatkan Paket Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Perintah `upgrade` menampilkan paket Intlayer yang dideklarasikan di setiap `package.json` proyek Anda, termasuk workspace monorepo, lalu memperbaruinya ke versi terbaru yang dipublikasikan: integrasi framework, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp`, dan semua paket `@intlayer/*` lainnya. Setelah itu, perintah ini memperbarui tooling terkait.

## Argumen:

- `--project-root [projectRoot]` - Opsional. Direktori root proyek. Secara default, perintah dimulai dari `package.json` terdekat di atas direktori kerja saat ini.
- `--dry-run` - Opsional. Mencantumkan paket beserta versi targetnya tanpa mengubah file apa pun.
- `--tag <tag>` - Opsional. Dist-tag npm untuk peningkatan (misalnya `canary`). Default adalah `latest`.
- `--no-eslint` - Opsional. Tidak memasang atau mendaftarkan aturan lint Intlayer.
- `--no-prettier` - Opsional. Tidak memasang atau mendaftarkan plugin Prettier Intlayer.

## Apa yang dilakukannya:

1. **Mencantumkan paket Intlayer** - Memindai setiap `package.json` proyek (melewati `node_modules` dan output build) untuk menemukan dependensi dan devDependencies `intlayer`, `@intlayer/*`, `*-intlayer`, dan `intlayer-*`.
2. **Mengambil versi target** - Membaca versi dist-tag yang dipilih (default `latest`) dari setiap paket dari npm registry.
3. **Menulis ulang rentang versi** - Memperbarui setiap rentang yang kedaluwarsa langsung di tempat, mempertahankan operatornya (`^`, `~` atau tidak ada) dan indentasi file.
4. **Menginstal sekali saja** - Menjalankan instalasi tunggal dari root workspace (direktori terdekat dengan file lock), menggunakan manajer paket pemilik file lock:

| File lock                           | Perintah       |
| ----------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`            | `bun install`  |
| `pnpm-lock.yaml`                    | `pnpm install` |
| `yarn.lock`                         | `yarn install` |
| `package-lock.json` atau tanpa lock | `npm install`  |

Jika tidak ada file lock, bidang `packageManager` dari `package.json` (misalnya `"bun@1.2.0"`) digunakan sebelum kembali ke npm.

Rentang yang tidak mengarah ke registry, seperti `workspace:*`, `file:`, `link:`, `catalog:` atau URL git, tidak pernah diubah.

5. **Plugin lint dan Prettier** - Jika proyek menggunakan ESLint / oxlint atau Prettier, memasang `eslint-plugin-intlayer` / `prettier-plugin-intlayer` yang belum ada dan mendaftarkannya: `...intlayer.configs.recommended` di config flat ESLint, aturan di `.oxlintrc.json`, dan plugin di config Prettier (JSON, YAML, JavaScript, atau TypeScript). Config yang tidak dapat diubah dengan aman akan menampilkan cuplikan untuk ditempel.
6. **Server MCP** - Mengarahkan entri MCP stdio Intlayer di proyek (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) ke `@intlayer/mcp@<tag>`, sehingga `npx` menjalankan server yang sudah diperbarui, bukan salinan dari cache.

## Contoh:

### Mencantumkan peningkatan yang tersedia tanpa menerapkannya:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Meningkatkan ke rilis canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Contoh output:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Catatan:

- Jalankan perintah dari root repositori Anda untuk meningkatkan setiap workspace. Jalankan dari workspace tertentu untuk hanya meningkatkan workspace tersebut.
- Paket yang versinya tidak dapat diambil (offline, paket pribadi atau belum dipublikasikan) dicantumkan dan dibiarkan tidak berubah.
- Jika instalasi gagal, rentang yang telah ditingkatkan tetap dipertahankan di `package.json`. Jalankan perintah instalasi manajer paket Anda secara manual.
