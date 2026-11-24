---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrasi dari ngx-translate ke Intlayer"
description: "Migrasikan aplikasi Angular dari ngx-translate ke Intlayer langkah demi langkah. Pipe translate, directive translate, dan TranslateService tetap berfungsi dengan compat adapter @intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrasi dari ngx-translate ke Intlayer

## Mengapa migrasi dari ngx-translate ke Intlayer?

<AccordionGroup>
<Accordion header="Tanpa loader HTTP">

ngx-translate mengambil file locale saat runtime melalui `TranslateHttpLoader`, yang menunda render pertama. Intlayer mengompilasi kamus saat build, sehingga terjemahan langsung tersedia.

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

1. **Compat adapter (disarankan untuk aplikasi yang sudah ada)**: instal `@intlayer/ngx-translate`. Package ini mengekspos API yang sama dengan `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) dan menyajikan pesan dari kamus Intlayer. Template Anda tidak berubah.
2. **Migrasi penuh**: ganti pemanggilan ngx-translate secara bertahap dengan `useIntlayer` dari `angular-intlayer` dan file `.content.ts` di samping komponen Anda.

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
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> Biarkan `@ngx-translate/core` tetap terinstal: package ini menyediakan tipe TypeScript. `@ngx-translate/http-loader` dapat dihapus.

</Step>
<Step number={2} title="Konfigurasi Intlayer">

Arahkan plugin `syncJSON` ke file terjemahan Anda yang sudah ada. Dengan satu file per namespace (`src/i18n/en/home.json`), setiap file menjadi sebuah kamus:

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
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` diresolve ke field `title` dari kamus `home`. Jika Anda menggunakan satu file per locale (`src/assets/i18n/en.json`) dengan key bersarang, gunakan `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\`` sebagai gantinya: setiap key tingkat atas menjadi sebuah kamus.

</Step>
<Step number={3} title="Tambahkan plugin esbuild">

Angular CLI menerima plugin esbuild melalui `@angular-builders/custom-esbuild`. Buat file plugin:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Lalu rujuk file tersebut di `angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

Plugin ini menjalankan build Intlayer dan meresolve `@ngx-translate/core` ke `@intlayer/ngx-translate`, tanpa perubahan pada file sumber.

> Build dengan Vite (Analog)? Gunakan `ngxTranslateVitePlugin()` dari `@intlayer/ngx-translate/plugin` sebagai gantinya.

</Step>
<Step number={4} title="Hapus loader HTTP">

Pertahankan `provideTranslateService()`, tetapi hapus opsi `loader`: pesan berasal dari kamus Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> Terjemahan tidak lagi melalui loader, jadi `TranslateHttpLoader` dan `@ngx-translate/http-loader` dapat dihapus.

</Step>
</Steps>

Template dan service Anda tetap berfungsi tanpa perubahan:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## Migrasi penuh

<Steps>
<Step number={5} title="Penggantian nama import secara eksplisit (opsional)" isOptional={true}>

Plugin esbuild sudah menangani alias. Untuk membuat dependensi menjadi eksplisit:

| Sebelum                                                         | Sesudah                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Pindahkan konten ke file .content.ts" isOptional={true}>

Komponen baru dapat menggunakan konten Intlayer native, berdampingan dengan pemanggilan ngx-translate yang sudah ada. Daftarkan `provideIntlayer()` dari `angular-intlayer` di samping `provideTranslateService()` di `app.config.ts`, lalu:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
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

| File / pola                                                   | Mengapa tidak diperlukan lagi                            |
| ------------------------------------------------------------- | -------------------------------------------------------- |
| `TranslateHttpLoader` / loader kustom                         | Kamus dikompilasi dan dimuat oleh Intlayer.              |
| `@ngx-translate/http-loader`                                  | Tidak ada lagi pengambilan file terjemahan saat runtime. |
| `provideHttpClient()` (jika hanya digunakan untuk terjemahan) | Alasan yang sama.                                        |

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

- [Compat adapter ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [Intlayer dengan Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md)
- [Editor visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
