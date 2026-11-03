---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier Eklentisi | Intlayer Çevirilerini Sıralama
description: "prettier-plugin-intlayer ile t() yerel ayarlarını, plural() kategorilerini, enu() koşullarını, select() durumlarını ve içerik bildirimlerinizin anahtarlarını sıralayın."
keywords:
  - Intlayer
  - Prettier
  - Biçimlendirme
  - Çevirileri sırala
  - Yerel ayarları sırala
  - i18n
  - Uluslararasılaştırma
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Başlangıç geçmişi"
author: aymericzip
---

# Prettier Eklentisi

`prettier-plugin-intlayer`, Prettier bir dosyayı her biçimlendirdiğinde çeviri anahtarlarınızı sabit bir sıraya koyar. Farklar (diffs) küçük kalır, birleştirme çakışmaları (merge conflicts) azalır ve eksik bir yerel ayarı fark etmek kolaylaşır.

```ts
// önce
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// sonra
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Kurulum

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Prettier 3 veya daha yenisini gerektirir.

Projeniz zaten Prettier kullanıyorsa, `intlayer init prettier` eklentiyi yükler ve yapılandırmanıza otomatik olarak ekler.

## Kullanım

Eklentiyi Prettier yapılandırmanıza ekleyin:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Yalnızca içerik bildirimlerinize uygulamak için bir geçersiz kılma (override) kullanın:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Neler sıralanır

### `t()`: yerel ayarlar (locales)

Sabitlenmiş (pinned) yerel ayarlar ilk sırada yer alır (varsayılan olarak `en`). Diğer yerel ayarlar alfabetik sırada dizilir.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR sırası

Kategoriler en küçük miktardan yedek seçeneğe (fallback) doğru sıralanır: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: artan eşikler

Koşullar önce sayılarına göre, ardından operatöre göre sıralanır (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` en sona yerleşir.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Çalışma zamanında ilk eşleşen koşul geçerli olur. Eklenti, yeni sırayı yalnızca her miktar yine aynı içeriğe çözümlendiğinde uygular. Sıralama sonucu belirlediğinde nesne yazıldığı gibi bırakılır. Örneğin `{ '<1': …, '<=-2.3': … }` içinde `'<1'` anahtarı tüm negatif sayıları yakalar.

### `select()`: alfabetik

Durumlar alfabetik olarak sıralanır ve `fallback` en sona gider.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

`fallback` veya `other` anahtarı olmadığında, son durum fallback olarak kullanılır. Bu durum sonda kalır ve yalnızca öncesindeki durumlar sıralanır.

### `.content.json` dosyaları

Serileştirilmiş form da aynı şekilde sıralanır: `{ "nodeType": "translation", "translation": { … } }`, ayrıca `plural`, `enumeration` ve `select` düğümleri.

### İçerik anahtarları (isteğe bağlı)

`intlayerSortContentKeys: true` ile eklenti, sözlük `content` anahtarlarını her iç içe yerleşim düzeyinde alfabetik olarak da sıralar. Bu yalnızca `*.content.*` dosyalarında geçerlidir.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Sıralama, içlerindeki nesnelere ulaşmak için her yardımcı işlevden (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) geçerek devam eder. Her yardımcının kendi anahtar haritası kendi sıralamasını korur. `cond()` ve `gender()` işlevlerine iletilen anahtarlar hiçbir zaman yeniden sıralanmaz, çünkü son anahtar fallback işlevi görür. `content` ile yan yana duran alanlar (`key`, `title`, `locale`…) oldukları gibi kalır.

## Seçenekler

| Seçenek                   | Varsayılan | Açıklama                                                                                               |
| ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `intlayerPinnedLocales`   | `["en"]`   | `t()` içinde ilk başta tutulan yerel ayarlar, bu sırada. Tüm yerel ayarları sıralamak için `[]` geçin. |
| `intlayerSortContentKeys` | `false`    | `*.content.*` dosyalarında, sözlük içerik anahtarlarını ve iç içe nesneleri de sıralar.                |

## Değiştirilmeyenler

- Spread (`...base`), hesaplanmış anahtar (`[key]`), metot veya yinelenen anahtar içeren nesneler.
- CLDR kategorisi olmayan bir anahtara sahip `plural()` haritaları.
- Yeni sırası çözümlenen içeriği değiştirecek olan `enu()` haritaları.
- Bir yardımcı gibi adlandırılmış ancak nesne olmayan bir argüman verilmiş diğer işlev çağrıları.

Yorumlar ait oldukları anahtarla birlikte taşınır.

## Desteklenen ayrıştırıcılar (Parsers)

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` ve `jsonc`. Vue, Svelte ve Astro dosyalarının `<script>` blokları bu ayrıştırıcılarla biçimlendirilir.

> **Bilinen kısıtlama.** Prettier her ayrıştırıcı için yalnızca tek bir eklenti çalıştırır. Başka bir eklenti de JavaScript/TypeScript ayrıştırıcılarının yerini alıyorsa (örneğin `prettier-plugin-tailwindcss`), bu dosyalar için yalnızca listede son yer alan eklenti geçerli olur. Çakışmayı önlemek için bir override ile `prettier-plugin-intlayer` kapsamını `*.content.*` dosyalarıyla sınırlandırın.
