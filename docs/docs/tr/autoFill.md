---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Otomatik Doldurma
description: Intlayer'da önceden tanımlanmış kalıplara göre içeriği otomatik doldurmak için otomatik doldurma işlevinin nasıl kullanılacağını öğrenin. Projenizde otomatik doldurma özelliklerini verimli bir şekilde uygulamak için bu dokümantasyonu takip edin.
keywords:
  - Otomatik Doldurma
  - İçerik Otomasyonu
  - Dinamik İçerik
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Küresel yapılandırma eklendi"
  - version: 6.0.0
    date: 2025-09-17
    changes: "`{{fileName}}` değişkeni eklendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# İçerik Bildirim Dosyası Çevirilerini Doldur

**İçerik bildirim dosyalarını otomatik doldur**, CI'nizde geliştirme iş akışınızı hızlandırmanın bir yoludur.

## Davranışı Anlamak

`fill` komutu iki moda sahiptir:

- **Complete**: Her yerel ayar için tüm eksik içeriği otomatik olarak doldurur ve geçerli dosyayı veya belirtilmişse başka bir dosyayı düzenler. Yani, complete modu, zaten çevrilen varsa mevcut içeriğin çevirisini atlar.
- **Review**: Her yerel ayar için **tüm** içeriği otomatik olarak doldurur ve belirli bir dosya için veya belirtilmişse başka bir dosya için oluşturur.

`fill` komutu tüm yerel ayar içeriği bildirimi dosyalarınızı işleyecektir. Yani, CMS'den uzak içeriğinizi işlemeyecektir. CMS'nin kendi çevirileri yönetimi vardır.
`@intlayer/sync-json-plugin` gibi eklentileri kullanıyorsanız, Intlayer JSON dosyalarını yerel ayar içeriği bildirimi dosyalarına dönüştürecektir. Yani, `fill` komutu tarafından işleneceklerdir.

Yeni oluşturulan dosyalar, sözlük metaverisi olarak `filled` talimatını içerir. Bu talimat, Intlayer tarafından dosyanın otomatik olarak doldurulup doldurulmadığını bilmek için kullanılır ve varsa bu dosyayı tekrar çevirilmekten atlar.

Intlayer ayrıca otomatik doldurma için aşağıdaki talimatı dikkate alacaktır:

- `.content.{ts|js|json}` dosyanızdan → `fill` talimatı
- `.intlayer.config.ts` yapılandırma dosyanızdan → `dictionary.fill` talimatı
- Aksi takdirde varsayılan olarak `true` olarak ayarlanır

Yerel ayara özgü içerik bildirimi dosyaları için, `true` talimatı `./{{fileName}}.fill.content.json` ile değiştirilecektir. Bunun nedeni, yerel ayara özgü bir içerik bildirimi dosyasının ek yerelleştirilmiş içerik alamamasıdır. Yani, mevcut dosyayı üzerine yazmamak için yeni bir dosya oluşturacaktır.

## Varsayılan Davranış

Varsayılan olarak, `fill` global olarak `true` olarak ayarlanır, bu da Intlayer'ın tüm içerik dosyalarını otomatik olarak dolduracağı ve dosyanın kendisini düzenleyeceği anlamına gelir. Bu davranış çeşitli şekillerde özelleştirilebilir:

### Genel Yapılandırma Seçenekleri

1. **`fill: true` (default)** - Tüm locales'i otomatik olarak doldur ve mevcut dosyayı düzenle
2. **`fill: false`** - Bu content dosyası için auto-fill'i devre dışı bırak
3. **`fill: "./relative/path/to/file"`** - Mevcut dosyayı düzenlemeden belirtilen dosyayı oluştur/güncelle ve mevcut dosyanın konumuna göre çözümlenen göreli yola işaret et
4. **`fill: "/absolute/path/to/file"`** - Mevcut dosyayı düzenlemeden belirtilen dosyayı oluştur/güncelle ve `.intlayer.config.ts` yapılandırma dosyasındaki base directory konumuna (`baseDir` alanı) göre çözümlenen yola işaret et
5. **`fill: "C:\\absolute\path\to\file"`** - Mevcut dosyayı düzenlemeden belirtilen dosyayı oluştur/güncelle ve işletim sisteminize göre çözümlenen mutlak yola işaret et
6. **`fill: { [key in Locales]?: string }`** - Her locale için belirtilen dosyayı oluştur/güncelle

### v7 Davranış Değişiklikleri

v7'de, `fill` komutunun davranışı güncellenmiştir:

- **`fill: true`** - Geçerli dosyayı tüm diller için doldurulmuş içerikle yeniden yazar
- **`fill: "path/to/file"`** - Belirtilen dosyayı geçerli dosyayı değiştirmeden doldurur
- **`fill: false`** - Otomatik doldurmayı tamamen devre dışı bırakır

Başka bir dosyaya yazmak için bir yol seçeneği kullanırken, doldurma mekanizması içerik deklarasyon dosyaları arasında _ana-köle_ ilişkisi aracılığıyla çalışır. Ana (master) dosya gerçeğin kaynağı olarak hizmet eder ve güncellendiğinde, Intlayer bu değişiklikleri otomatik olarak yol tarafından belirtilen türetilmiş (doldurulmuş) deklarasyon dosyalarına uygular.

# Otomatik Doldurma İçerik Beyan Dosyası Çevirileri

**Otomatik doldurma içerik beyan dosyaları**, geliştirme iş akışınızı hızlandırmanın bir yoludur.

Otomatik doldurma mekanizması, içerik beyan dosyaları arasında bir _ana-uydu_ ilişkisi üzerinden çalışır. Ana (master) dosya güncellendiğinde, Intlayer bu değişiklikleri türetilmiş (otomatik doldurulmuş) beyan dosyalarına otomatik olarak uygular.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Bu bir içerik örneğidir",
  },
} satisfies Dictionary;

export default exampleContent;
```

İşte `autoFill` talimatını kullanan bir [her dil için içerik beyan dosyası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md).

Sonra, aşağıdaki komutu çalıştırdığınızda:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer, ana dosyada henüz beyan edilmemiş tüm yerelleri doldurarak, türetilmiş beyan dosyasını `src/components/example/example.content.json` konumunda otomatik olarak oluşturacaktır.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Daha sonra, her iki beyan dosyası tek bir sözlükte birleştirilecek ve standart `useIntlayer("example")` hook'u (react) / composable'ı (vue) kullanılarak erişilebilir olacaktır.

## Genel Konfigürasyon

`intlayer.config.ts` dosyasında genel otomatik doldurma konfigürasyonunu yapılandırabilirsiniz.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Tüm sözlükler için eksik çevirileri otomatik oluştur
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // "./{{fileName}}.content.json" kullanarak tüm sözlükler için eksik çevirileri otomatik oluştur
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

İçerik dosyalarında `fill` alanını kullanarak her sözlük için ince ayar yapabilirsiniz. Intlayer önce sözlük başına konfigürasyonu dikkate alır, ardından genel konfigürasyona geri döner.

## Otomatik Doldurulmuş Dosya Formatı

Önerilen otomatik doldurulmuş beyan dosyalarının formatı, biçimlendirme kısıtlamalarından kaçınmaya yardımcı olan **JSON** formatıdır. Ancak, Intlayer `.ts`, `.js`, `.mjs`, `.cjs` ve diğer formatları da destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // İçeriğiniz
  },
};
```

Bu, şu dosyayı oluşturacaktır:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts` ve benzeri dosyaların oluşturulması şu şekilde çalışır:
>
> - Dosya zaten mevcutsa, Intlayer her alanı bulmak ve eksik çevirileri eklemek için AST (Soyut Sözdizimi Ağacı) kullanarak dosyayı ayrıştırır.
> - Dosya mevcut değilse, Intlayer varsayılan içerik beyan dosyası şablonunu kullanarak dosyayı oluşturur.

## Mutlak Yollar

`autoFill` alanı mutlak yolları da destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // İçeriğiniz
  },
};
```

Bu, şu dosyayı oluşturacaktır:

```
/messages/example.content.json
```

## Yerel Bazlı İçerik Beyan Dosyalarının Otomatik Oluşturulması

`autoFill` alanı ayrıca **yerel bazlı** içerik beyan dosyalarının oluşturulmasını da destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // İçeriğiniz
  },
};
```

Bu, iki ayrı dosya oluşturacaktır:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> Bu durumda, nesne tüm yerelleri içermiyorsa, Intlayer kalan yerellerin oluşturulmasını atlar.

## Belirli Yerel Otodoldurmayı Filtreleme

`autoFill` alanı için bir nesne kullanmak, filtre uygulamanıza ve yalnızca belirli yerel dosyalarını oluşturmanıza olanak tanır.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // İçeriğiniz
  },
};
```

Bu sadece Fransızca çeviri dosyasını oluşturacaktır.

## Yol Değişkenleri

`autoFill` yolu içinde değişkenler kullanarak oluşturulan dosyaların hedef yollarını dinamik olarak çözebilirsiniz.

**Kullanılabilir değişkenler:**

- `{{locale}}` – Yerel kodu (örneğin `fr`, `es`)
- `{{fileName}}` – Dosya adı (örneğin `index`)
- `{{key}}` – Sözlük anahtarı (örneğin `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // İçeriğiniz
  },
};
```

Bu, aşağıdaki dosyaları oluşturacaktır:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // İçeriğiniz
  },
};
```

Bu, aşağıdaki dosyaları oluşturacaktır:

- `./index.content.json`
- `./index.content.json`
