---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrasi dari svelte-i18n ke Intlayer"
description: "Migrasikan aplikasi Svelte atau SvelteKit dari svelte-i18n ke Intlayer langkah demi langkah. Store $_, $date, dan $number tetap berfungsi dengan compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrasi dari svelte-i18n ke Intlayer

## Mengapa migrasi dari svelte-i18n ke Intlayer?

<AccordionGroup>
<Accordion header="Ukuran bundle">

svelte-i18n mendaftarkan seluruh file locale saat startup. Intlayer hanya mengirim kamus yang digunakan setiap halaman, sehingga **mengurangi ukuran bundle dan halaman hingga 50%**.

</Accordion>
<Accordion header="Kemudahan pemeliharaan">

Key **bertipe** sesuai kamus Anda: key yang tidak valid gagal saat build. Konten dapat diletakkan di samping komponen yang menggunakannya.

</Accordion>
<Accordion header="Agen AI">

Konten yang berdekatan dengan komponen **mengurangi konteks yang dibutuhkan** LLM. Intlayer menyediakan **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**.

</Accordion>
<Accordion header="Otomatisasi">

Terjemahkan pesan yang hilang di pipeline CI/CD dengan LLM pilihan Anda, atau di latar belakang dengan [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalabilitas bersama non-developer">

Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** self-hosted dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** agar penerjemah dan copywriter dapat mengedit konten secara real-time.

</Accordion>
</AccordionGroup>

> Untuk memahami asal-usul library ini, baca [sejarah i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md).

## Strategi migrasi

1. **Compat adapter (disarankan untuk aplikasi yang sudah ada)**: instal `@intlayer/svelte-i18n`. Package ini mengekspos API yang sama dengan `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) dan menyajikan pesan dari kamus Intlayer. ICU MessageFormat berfungsi seperti sebelumnya.
2. **Migrasi penuh**: ganti store svelte-i18n secara bertahap dengan `useIntlayer` dari `svelte-intlayer` dan file `.content.ts` di samping komponen Anda.

## Daftar isi

<TOC/>

## Migrasi cepat

<Steps>
<Step number={1} title="Instal dependensi">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

Perintah ini mendeteksi lingkungan Anda dan menginstal package yang dibutuhkan, misalnya:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Biarkan `svelte-i18n` tetap terinstal: package ini menyediakan tipe TypeScript.

</Step>
<Step number={2} title="Konfigurasi Intlayer">

Arahkan plugin `syncJSON` ke file pesan Anda yang sudah ada. Dengan satu file per namespace (`src/locales/en/home.json`), setiap file menjadi sebuah kamus:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` diresolve ke field `title` dari kamus `home`. Jika Anda menggunakan satu file per locale (`src/locales/en.json`) dengan namespace bersarang, gunakan `source: ({ locale }) => \`./src/locales/${locale}.json\`` sebagai gantinya: setiap key tingkat atas menjadi sebuah kamus.

</Step>
<Step number={3} title="Tambahkan plugin Vite">

`svelteI18nVitePlugin()` menjalankan build Intlayer dan membuat alias `svelte-i18n` ke `@intlayer/svelte-i18n`, tanpa perubahan pada file sumber.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Untuk SvelteKit, tambahkan `svelteI18nVitePlugin()` setelah `sveltekit()` di array `plugins` yang sama.

</Step>
<Step number={4} title="Sederhanakan penyiapan i18n">

Pertahankan `init()`, tetapi hapus `register()` dan `addMessages()`: pesan berasal dari kamus Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Komponen Anda tetap berfungsi tanpa perubahan:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Mengatur `$locale = 'fr'` mengganti bahasa untuk store svelte-i18n maupun `useIntlayer`.

## Migrasi penuh

<Steps>
<Step number={5} title="Penggantian nama import secara eksplisit (opsional)" isOptional={true}>

Plugin Vite sudah menangani alias. Untuk membuat dependensi menjadi eksplisit:

| Sebelum                                      | Sesudah                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Pindahkan konten ke file .content.ts" isOptional={true}>

Komponen baru dapat menggunakan konten Intlayer native, berdampingan dengan pemanggilan svelte-i18n yang sudah ada:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="Aktifkan terjemahan berbasis AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Terjemahan yang diisi ditulis kembali ke file JSON Anda. Lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk konfigurasi AI.

</Step>
</Steps>

## Yang dapat Anda hapus setelah migrasi

| File / pola                                | Mengapa tidak diperlukan lagi               |
| ------------------------------------------ | ------------------------------------------- |
| Pemanggilan `register()` / `addMessages()` | Kamus dikompilasi dan dimuat oleh Intlayer. |
| `waitLocale()` sebelum render              | Pesan tersedia begitu locale ditetapkan.    |

## Konfigurasi TypeScript

Sertakan tipe yang dihasilkan di `tsconfig.json` Anda:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Konfigurasi Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [Intlayer dengan Vite dan Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md)
- [Intlayer dengan SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_svelte_kit.md)
- [Editor visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
