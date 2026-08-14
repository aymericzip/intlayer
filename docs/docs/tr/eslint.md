---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: ESLint Eklentisi | Intlayer için Lint Kuralları
description: eslint-plugin-intlayer ile sabit kodlanmış metinleri, Intlayer derleyicisinin optimize edemediği dinamik çağrıları ve kullanılmayan sözlük içeriğini yakalayın. React, Vue, Svelte, Angular ve Astro genelinde ESLint ve oxlint ile çalışır.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Uluslararasılaştırma
  - no-raw-text
  - Sabit kodlanmış metinler
  - Kullanılmayan çeviriler
  - Ölü içerik
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
    changes: "Başlangıç geçmişi"
author: aymericzip
---

# ESLint x OXLint Eklentisi

`eslint-plugin-intlayer`, TypeScript'in yakalayamadığı i18n hatalarını tespit eder:

1. Bir sözlüğe hiç eklenmemiş **sabit kodlanmış metinler (hardcoded text)**.
2. Tip kontrolünden geçen ve çalışan ancak Intlayer derleyicisinin optimize edemediği **dinamik çağrılar**.
3. **Ölü içerik (Dead content)** — projedeki hiçbir yerin okumadığı sözlükler ve alanlar (isteğe bağlı).

Bilinmeyen sözlük anahtarları, bilinmeyen alan yolları ve eksik yerel ayarlar zaten derleme hataları olduğundan, eklenti bunları tekrar bildirmez.

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

ESLint 9 veya üzerini gerektirir (flat config). ESLint 10 desteklenir.

## Kullanım

Eklenti hem ESLint hem de [oxlint](https://oxc.rs) üzerinde aynı kurallar ve aynı seçeneklerle çalışır.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Veya bir yapılandırmayı yayın ve önem düzeylerini kendiniz belirleyin:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
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

İki uyarı: oxlint'in JS eklenti desteği henüz alfa aşamasındadır ve oxlint özel ayrıştırıcıları (custom parsers) desteklemez — bu nedenle `.vue`, `.svelte`, `.astro` ve Angular şablonları orada denetlenmez. JS/TS/JSX dosyalarınız için oxlint'i çalıştırın ve geri kalanı için ESLint'i kullanın.

`no-unused-content` yukarıda kasıtlı olarak hariç tutulmuştur: kural bağlamından çalışma dizinine ve denetlenen dosya yoluna ihtiyaç duyar; alfa JS eklenti köprüsü bunu garanti etmez. ESLint altında çalıştırın.

  </Tab>
</Tabs>

### Yapılandırmalar (Configs)

| Yapılandırma    | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                       | error                   | error                     | off                      | off                 |
| `strict`        | error (+ JSX dışı dizeler) | error                   | error                     | error                    | off                 |
| `contract-only` | off                        | error                   | error                     | off                      | off                 |

`recommended`, `no-raw-text` kuralını kasıtlı olarak `warn` seviyesinde tutar: bunu mevcut bir kod tabanına yöneltmek tüm çevrilmemiş dizeleri aynı anda ortaya çıkarır ve bu durum derlemenizi ilk günden bozmamalıdır.

`enforce-adapter-import` varsayılan olarak kapalıdır — istiyorsanız açıkça etkinleştirin.

`no-unused-content`, `strict` dahil tüm yapılandırmalarda kapalıdır. Intlayer yapılandırmanızı okuyan ve kaynak dosyalarınızı diskten tarayan tek kuraldır; bu nedenle açılması, bir ön ayarın sizin yerinize yapmasından ziyade bilinçli bir seçim olmalıdır.

## Kurallar

### `no-raw-text`

Bir sözlükte bildirilmemiş kullanıcıya yönelik metinleri bildirir. `intlayer extract` ile aynı algılamayı kullanır; bu nedenle marka adları, CSS sınıfları ve teknik tanımlayıcılar yoksayılır.

```jsx
// ✗ Bildirildi
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Sorunsuz
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

İçerik bildirim dosyaları (`*.content.ts`, …) atlanır.

Tüm bir dosyayı tek seferde düzeltmek için `npx intlayer extract` komutunu çalıştırın ve derleyicinin dizeleri sizin için bir sözlüğe taşımasına izin verin.

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

      // Biçimlendirme dışındaki dize sabitlerini de bildirin. Varsayılan: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Sözlük anahtarının bir dize sabiti olmasını gerektirir.

Derleyici, bir sözlüğü yalnızca çağrı noktasında anahtarı doğrudan okuyabildiğinde önceden yükleyebilir. Hesaplanmış bir anahtarla optimizasyonu sessizce atlar ve bunun yerine her sözlüğü paketler.

```typescript
// ✗ Bildirildi
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Değişken hala bir dize sabiti değildir
const key = "home";
useIntlayer(key);

// ✓ Sorunsuz
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Bu durum `useIntlayer`, `getIntlayer` ve tüm uyumluluk bağdaştırıcıları (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) için geçerlidir.

### `no-dynamic-field-access`

Bir sözlükten okuduğunuz alanın statik olarak bilinmesini gerektirir.

Derleyici, kullanıldığını görmediği alanları kaldırır. Hesaplanmış bir erişim onun için görünmezdir, bu nedenle okuma işlemi çalışma zamanında `undefined` döndürebilir.

```typescript
// ✗ Bildirildi
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Sorunsuz
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Orijinal paket yerine `@intlayer/*` uyumluluk bağdaştırıcısını tercih eder. Orijinal paket yalnızca paketleyici takma adı yapılandırıldığında Intlayer'a çözümlenir; bağdaştırıcı her zaman çözümlenir. `--fix` ile otomatik düzeltilebilir.

```typescript
// ✗ Bildirildi
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Sorunsuz
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Varsayılan olarak kapalıdır.** Projenizdeki hiçbir yerin okumadığı içeriği ve birden fazla yerde bildirilen sözlük anahtarlarını bildirir.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Projede hiçbir çağıran "home" istemediğinde bildirilir
  content: {
    title: t({ tr: "Başlık", en: "Title" }),

    // ✗ `hero` alanını hiçbir şey okumadığında bildirilir
    hero: {
      subtitle: t({ tr: "Alt Başlık", en: "Subtitle" }),
    },
  },
};
```

Diğer kuralların aksine, bu kural yalnızca önündeki dosyadan karar veremez — bir alan yalnızca tüm projeye göre kullanılmamış sayılır. Bir lint çalıştırmasının ilk içerik bildiriminde Intlayer yapılandırmanızı yükler, bu yapılandırmanın bildirdiği kaynak dosyaları (`build.traversePattern`, `compiler.transformPattern`) tarar ve `@intlayer/lsp` ile VS Code uzantısındaki "kullanılmayan" üstü çizili metni destekleyen aynı kullanım çözümleyicisini çalıştırır. Sonuç `cacheTtl` milisaniye boyunca önbelleğe alınır, böylece tarama dosya başına değil çalıştırma başına bir kez gerçekleşir.

**Seçenekler**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Hiçbir şeyin başvurmadığı sözlük anahtarlarını bildirin. Varsayılan: true
      reportUnusedDictionaries: true,

      // Hiçbir şeyin okumadığı içerik alanlarını bildirin. Varsayılan: true
      reportUnusedFields: true,

      // Birden fazla yerde bildirilen anahtarları bildirin. Varsayılan: true
      reportDuplicateKeys: true,

      // Asla bildirilmeyecek alan yolları için düzenli ifadeler.
      ignoreFields: ["^meta"],

      // Taramanın başlayacağı proje kökü. Varsayılan: ESLint çalışma dizini
      baseDir: process.cwd(),

      // Bir proje taramasının yeniden kullanılma süresi (ms). Varsayılan: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Uzun süre çalışan bir düzenleyici sunucusundan lint işlemi yaparken ve düzenlemelerinizin daha erken yansımasını istediğinizde `cacheTtl` değerini düşürün; tek bir lint çalıştırması bir monorepodaki birkaç Intlayer projesini kapsadığında `baseDir` değerini ayarlayın.

> **Sessiz kalmaya meyillidir.** Buradaki yanlış bir pozitif sonuç bir çeviriyi silebilir; bu nedenle sözlük analizin izleyemeyeceği bir şekilde kullanıldığında hiçbir şey bildirilmez: içerik nesnesinin bir bütün olarak aktarılması, ondan bağlanan bir çevirici işlevi (`const t = useTranslations("home")`), doğrudan içe aktarma yoluyla ulaşılan bir bildirim (`useDictionary(myDictionary)`), başka bir sözlükten bir `nest()` veya bir yayma (spread) operatörü ile kapsamlı olmaktan çıkarılan bir alan listesi. Tek dosyalı bileşenler (`.vue`, `.svelte`, `.astro`), komut dosyası blokları burada ayrıştırılmadığı için bahsettikleri sözlüklerin her alanını kullanıyor sayılır.

`reportDuplicateKeys`, derlemenin `.intlayer/` altına yazdığı birleştirilmemiş sözlükleri okur, bu nedenle proje en az bir kez derlenene kadar sessiz kalır. Bir anahtarı paylaşan iki bildirim birleştirilir ve bu meşru bir kalıptır — bu raporlama mekanizması, her iki tarafta tanımlanan bir alanın sessizce iki değerden yalnızca birini koruması nedeniyle mevcuttur.

Çözümleyici, ESM olarak dağıtılan `@intlayer/lsp` paketinden yüklenir. Bu nedenle kural, bir ES modülünü `require()` edebilen bir Node sürümüne ihtiyaç duyar — Node 20.19+ veya 22.12+. Daha eski sürümlerde lint çalıştırmasını başarısız kılmak yerine hiçbir şey bildirmez.

## Çerçeveler (Frameworks)

Her kural, Vue, Svelte ve Angular şablonları dahil olmak üzere tüm Intlayer entegrasyonlarında çalışır. ESLint'e yalnızca her dosya türünü hangi ayrıştırıcının okuyacağını belirtmeniz gerekir.

| Çerçeve                   | Dosyalar          | Ayrıştırıcı (Parser)              |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular Şablonları        | `.component.html` | `@angular-eslint/template-parser` |
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

Yalnızca projenizin ihtiyaç duyduğu ayrıştırıcıları yükleyin.

> **Bilinen sınırlama.** Vue ve Angular şablonlarında `{{ content[key] }}` gibi bir ifade `no-dynamic-field-access` tarafından kontrol edilmez. Script bloğunda yazılan dinamik okumalar normal şekilde yakalanır.
