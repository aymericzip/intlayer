---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer'da `Yerel Ayar Başına` İçerik Bildirimi
description: Intlayer'da yerel ayar başına içerik bildiriminin nasıl yapılacağını keşfedin. Farklı formatları ve kullanım durumlarını anlamak için dokümantasyonu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Yerel Ayar Başına
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
---

# Intlayer'da `Yerel Ayar Başına` İçerik Bildirimi

Intlayer çok dilli içeriği bildirmek için iki yol destekler:

- Tüm çevirilerle tek dosya
- Yerel ayar başına bir dosya (yerel ayar başına format)

Bu esneklik şunları sağlar:

- Diğer i18n araçlarından kolay geçiş
- Otomatik çeviri iş akışları desteği
- Çevirilerin ayrı, yerel ayara özgü dosyalara net organizasyonu

## Tüm Çevirilerle Tek Dosya

Bu format şunlar için idealdir:

- Kodda hızlı yineleme.
- CMS ile sorunsuz entegrasyon.

Bu, çoğu kullanım durumu için önerilen yaklaşımdır. Çevirileri merkezileştirir, yinelemeyi ve CMS ile entegrasyonu kolaylaştırır.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Önerilen: Bu format, Intlayer'ın görsel düzenleyicisini kullanırken veya çevirileri doğrudan kodda yönetirken en iyisidir.

## Yerel Ayar Başına Format

Bu format şunlar için yararlıdır:

- Çevirileri bağımsız olarak sürümlemek veya geçersiz kılmak istediğinizde.
- Makine veya insan çeviri iş akışlarını entegre ettiğinizde.

Yerel ayar alanını belirterek çevirileri ayrı yerel ayar dosyalarına bölebilirsiniz:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Önemli
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Önemli
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Önemli
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Önemli
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Önemli
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Önemli
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Önemli
  "content": {
    "multilingualContent": "Title of my component",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Önemli
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Önemli: Yerel ayar alanının tanımlandığından emin olun. Bu, Intlayer'a dosyanın hangi dili temsil ettiğini söyler.

> Not: Her iki durumda da, içerik bildirim dosyası Intlayer tarafından tanınmak için `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` adlandırma desenini takip etmelidir. `.[locale]` soneki isteğe bağlıdır ve sadece adlandırma kuralı olarak kullanılır.

## Formatları Karıştırma

Aynı içerik anahtarı için her iki bildirim yaklaşımını da birleştirebilirsiniz. Örneğin:

- Temel içeriğinizi index.content.ts gibi bir dosyada statik olarak bildirin.
- Belirli çevirileri index.fr.content.ts veya index.content.json gibi ayrı dosyalarda ekleyin veya geçersiz kılın.

Bu kurulum özellikle şunlar için yararlıdır:

- İlk içerik yapısını kodda tanımlamak istediğinizde.
- Daha sonra CMS veya otomatik araçları kullanarak çevirileri zenginleştirmeyi veya tamamlamayı planladığınızda.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Örnek

İşte çok dilli bir içerik bildirim dosyası:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer çok dilli ve yerel ayar başına dosyaları otomatik olarak birleştirir.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Varsayılan yerel ayar ENGLISH, bu yüzden ENGLISH içeriği döndürecek

console.log(JSON.stringify(intlayer, null, 2));
// Sonuç:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Sonuç:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Sonuç:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Otomatik Çeviri Oluşturma

Eksik çevirileri tercih ettiğiniz servisler temelinde otomatik olarak doldurmak için [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)'yi kullanın.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
