---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Sözlükleri Şemalarla Doğrulama (Zod)"
description: "intlayer.config.ts içinde Zod şemaları tanımlayın ve bunları sözlüklerinize bağlayarak her locale'i build sırasında doğrulayın ve içeriği editörünüzde tipleyin."
keywords:
  - Şema
  - Zod
  - Doğrulama
  - Sözlük
  - İçerik Beyanı
  - Tip Güvenliği
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Dokümanın oluşturulması"
author: aymericzip
---

# Sözlükleri Şemalarla Doğrulama

Şema, bir sözlük içeriğinin beklenen yapısını tanımlar. Onu `intlayer.config.ts` içinde bir kez tanımlar, bir isim verir, ardından bu ismi `schema` alanı ile herhangi bir sözlüğe bağlarsınız.

Ardından Intlayer:

- Sözlükleri build ederken her sözlüğü her locale için **doğrular** ve her hatayı locale ve alan yolu ile birlikte raporlar.
- Sözlük içeriğini editörünüzde **tipler**, böylece eksik veya yanlış tipte bir alan build öncesinde yakalanır.

Şemalar, birden fazla sözlüğün aynı yapıyı paylaşması gerektiğinde (SEO metadata, ürün kartları, CMS benzeri kayıtlar) veya içeriğin TypeScript'in ifade edemediği kısıtlamalara uyması gerektiğinde, örneğin her çeviri için maksimum uzunluk, işe yarar.

<Steps>
<Step number={1} title="Şemaları yapılandırmada tanımlayın">

[Zod](https://zod.dev) paketini yükleyin:

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Ardından şemalarınızı `schemas` anahtarı altında tanımlayın. Her anahtar, sözlüklerinizden referans vereceğiniz isimdir.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Bir şemayı sözlüğe bağlayın">

Bir sözlüğün `schema` alanını yapılandırmada tanımlanan isimlerden birine ayarlayın.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Aynı şema istediğiniz kadar sözlüğe bağlanabilir.

</Step>
<Step number={3} title="Build alın ve raporu okuyun">

Doğrulama, Intlayer sözlükleri her build ettiğinde çalışır: `npx intlayer build` ile veya dev ve build modunda bundler plugin'iniz üzerinden. Bir çeviri şemaya uymazsa Intlayer locale'i, alan yolunu ve Zod mesajını loglar:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Geçersiz bir sözlük, içeriği düzeltilene kadar build dışında bırakılır. Diğer sözlükler etkilenmez.

</Step>
</Steps>

## İçeriği şemadan tipleme

`Dictionary` tipinin generic parametreleri, TypeScript'in bir sözlüğü ne kadar sıkı kontrol edeceğini belirler:

| Tanım                                                   | `schema` alanı                               | `content` alanı                       |
| ------------------------------------------------------- | -------------------------------------------- | ------------------------------------- |
| `satisfies Dictionary`                                  | Otomatik tamamlanır, bilinmeyen isim hatadır | TypeScript tarafından kontrol edilmez |
| `satisfies Dictionary<undefined, "seo-metadata">`       | `"seo-metadata"` olmalıdır                   | Şemadan tiplenir                      |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | `"seo-metadata"` olmalıdır                   | Şemadan ve kendi tipinizden tiplenir  |

Tiplenmiş bir şemada her alan, ya düz bir değer ya da bu değeri üreten bir içerik düğümü kabul eder, yani `t()` kullanılmaya devam edebilir:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer bu tipleri, sözlükleri her build ettiğinde Zod şemalarınızdan `.intlayer/types` içine üretir. Yalnızca yapı tiplenir: `.min()`, `.max()` veya `.regex()` gibi kısıtlamalar build sırasında kontrol edilir.

## Neler doğrulanır

`internationalization.locales` içinde listelenen her locale için Intlayer, sözlük içeriğini o locale için çözümler ve ardından sonucu doğrular. Bu nedenle şema, çevirileri tutan `t()` düğümünü değil, bir alanın nihai değerini (`title: string`) tanımlar.

- **Eksik çeviriler**: varsayılan `strictMode` ile eksik bir çeviri, doğrulamadan önce varsayılan locale'e düşer. `strictMode: "strict"` ile eksik bir çeviri zorunlu bir alanın hata vermesine neden olur.
- **Diğer içerik düğümleri**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` ve `insert()` fonksiyonlara, `md()` veya `html()` ise düğümlere çözümlenir. Bu alanları `z.any()` ile tanımlayın ve kısıtlamaları düz değerlere çözümlenen alanlarda tutun.
- **Doğrulanmayanlar**: bir fonksiyon veya Promise tarafından sağlanan içerik ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md)) ve [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) üzerinden çekilen sözlükler.

## Başka bir doğrulama kütüphanesi kullanma

`schemas` girdileri Zod'a bağlı değildir. Zod uyumlu bir `safeParse(data)` metodu sunan her nesne çalışır, yeter ki `{ success: true }` veya `{ success: false, error: { issues } }` döndürsün; burada her issue bir `path` dizisine ve bir `message` alanına sahiptir. İçerik tiplemesi yalnızca Zod şemalarından üretilir: başka bir kütüphaneyle bağlı sözlüklerin içeriği `any` olarak tiplenir.

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Bir şema hatası build'imi durdurur mu?">

Hayır. Intlayer her hatayı loglar, geçersiz sözlüğü build dışında bırakır ve diğerlerini build etmeye devam eder. Dev modunda içeriği düzeltip kaydedin: watcher sözlüğü doğrular ve yeniden build eder.

</Question>
<Question title="Birden fazla sözlük aynı şemayı paylaşabilir mi?">

Evet. Şemaya ismiyle referans verilir, bu yüzden istediğiniz sayıda sözlük ona işaret edebilir. Ana kullanım senaryosu budur: tüm sayfa metadata'larına, ürün kayıtlarına veya e-posta şablonlarına tek bir yapı dayatmak.

</Question>
<Question title="Şema ismi mevcut değilse ne olur?">

En az bir şema tanımlandığı anda TypeScript bunu hata olarak bildirir, çünkü `schema` alanı yalnızca tanımlı isimleri kabul eder. Bir JSON içerik dosyasında bilinmeyen isim yok sayılır ve sözlük doğrulanmaz.

</Question>
<Question title="Her locale mi doğrulanır, yoksa sadece varsayılan olan mı?">

`internationalization.locales` içinde listelenen her locale. Rapor, hata veren locale'i belirtir; böylece yalnızca Almancada çok uzun olan bir çeviriyi bulmak kolaydır.

</Question>

</FAQ>

## İlgili

- [İçerik beyan dosyaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
