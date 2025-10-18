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
    changes: Küresel yapılandırma eklendi
  - version: 6.0.0
    date: 2025-09-17
    changes: `{{fileName}}` değişkeni eklendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

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

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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
