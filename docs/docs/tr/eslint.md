---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint Eklentisi | Intlayer için lint kuralları
description: eslint-plugin-intlayer ile sabit kodlanmış metinleri ve Intlayer derleyicisinin optimize edemediği dinamik çağrıları yakalayın. ESLint ve oxlint ile çalışır; React, Vue, Svelte, Angular ve Astro'yu destekler.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Uluslararasılaştırma
  - no-raw-text
  - Sabit kodlanmış metinler
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# ESLint x OXLint Eklentisi

`eslint-plugin-intlayer`, TypeScript'in göremediği iki tür i18n hatasını yakalar:

1. **Sabit kodlanmış metin** — hiçbir zaman bir sözlüğe girmemiş olan metin.
2. **Dinamik çağrılar** — tür denetiminden geçen ve çalışan, ancak Intlayer derleyicisinin optimize edemediği çağrılar.

Bilinmeyen sözlük anahtarları, bilinmeyen alan yolları ve eksik yereller zaten derleme hatasıdır; bu yüzden eklenti bunları tekrar bildirmez.

## Kurulum

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 veya üzeri gerekir (flat config).

## Kullanım

Eklenti hem ESLint hem de [oxlint](https://oxc.rs) içinde çalışır — aynı kurallar, aynı seçenekler.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Ya da kuralları tek tek etkinleştirin:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

İki uyarı: oxlint'in JS eklenti desteği hâlâ alpha aşamasında ve oxlint özel parser'ları desteklemiyor — bu nedenle `.vue`, `.svelte`, `.astro` dosyaları ile Angular şablonları orada denetlenmez. oxlint'i JS/TS/JSX dosyalarınız üzerinde çalıştırın, geri kalanı için ESLint'i kullanmaya devam edin.

  </Tab>
</Tabs>

### Yapılandırmalar

| Yapılandırma    | `no-raw-text`                     | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                              | error                   | error                     | off                      |
| `strict`        | error (+ JSX dışı sabit değerler) | error                   | error                     | error                    |
| `contract-only` | off                               | error                   | error                     | off                      |

`recommended`, `no-raw-text` kuralını bilerek `warn` seviyesinde tutar: bu kuralı mevcut bir codebase üzerine yönelttiğinizde çevrilmemiş tüm metinler bir anda ortaya çıkar ve bunun ilk günden build'inizi kırmaması gerekir.

`enforce-adapter-import` varsayılan olarak kapalıdır — istiyorsanız açıkça etkinleştirin.

## Kurallar

### `no-raw-text`

Bir sözlükte tanımlanmamış, kullanıcıya yönelik metinleri bildirir. `intlayer extract` ile aynı tespiti kullanır; bu yüzden marka adları, CSS sınıfları ve teknik tanımlayıcılar yok sayılır.

```jsx
// ✗ Bildirilir
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Sorun yok
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

İçerik bildirim dosyaları (`*.content.ts`, …) atlanır.

Bir dosyanın tamamını tek seferde düzeltmek için `npx intlayer extract` çalıştırın ve metinleri sizin için sözlüğe taşımasına izin verin.

**Seçenekler**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Değeri kullanıcıya yönelik metin olan öznitelikler.
      // Varsayılan: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // İçeriği asla kullanıcıya yönelik metin olmayan öğeler.
      // Varsayılan: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Asla bildirilmeyecek metinler için düzenli ifadeler.
      ignorePatterns: ["^Powered by"],

      // İşaretleme dışındaki dize sabitlerini de bildir. Varsayılan: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Sözlük anahtarının bir dize sabiti olmasını gerektirir.

Derleyici, bir sözlüğü yalnızca anahtarı çağrı noktasında doğrudan okuyabildiğinde önceden yükleyebilir. Hesaplanmış bir anahtarda optimizasyonu sessizce atlar ve bunun yerine tüm sözlükleri paketler.

```typescript
// ✗ Bildirilir
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Bir değişken yine de sabit değer değildir
const key = "home";
useIntlayer(key);

// ✓ Sorun yok
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Bu; `useIntlayer`, `getIntlayer` ve her compat adaptörü (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) için geçerlidir.

### `no-dynamic-field-access`

Bir sözlükten okuduğunuz alanın statik olarak bilinmesini gerektirir.

Derleyici, kullanıldığını göremediği alanları kaldırır. Hesaplanmış bir erişim onun için görünmezdir, bu nedenle okuma çalışma zamanında `undefined` döndürebilir.

```typescript
// ✗ Bildirilir
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Sorun yok
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Orijinal paket yerine `@intlayer/*` compat adaptörünü tercih eder. Orijinali yalnızca bundler takma adı yapılandırıldığında Intlayer'a çözümlenir; adaptör her zaman çözümlenir. `--fix` ile otomatik düzeltilebilir.

```typescript
// ✗ Bildirilir
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Sorun yok
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Framework'ler

Tüm kurallar, Vue, Svelte ve Angular şablonlarının içi dahil olmak üzere tüm Intlayer entegrasyonlarında çalışır. Yalnızca ESLint'e hangi parser'ın hangi dosya türünü okuduğunu söylemeniz yeterlidir.

| Framework                 | Dosyalar          | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular şablonları        | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Yalnızca projenizin ihtiyaç duyduğu parser'ları kurun.

> **Bilinen kısıtlama.** Vue ve Angular şablonlarında `{{ content[key] }}` gibi bir ifade `no-dynamic-field-access` tarafından denetlenmez. Script bloğunda yazılan dinamik okumalar normal şekilde yakalanır.
