---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Otomatik Doldurma
description: Önceden tanımlanmış desenlere göre içeriği otomatik olarak doldurmak için Intlayer'da otomatik doldurma işlevselliğini nasıl kullanacağınızı öğrenin. Projenizde otomatik doldurma özelliklerini verimli bir şekilde uygulamak için bu dokümantasyonu takip edin.
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
---

# Otomatik Doldurma İçerik Bildirim Dosyası Çevirileri

**Otomatik doldurma içerik bildirim dosyaları**, geliştirme iş akışınızı hızlandırmanın bir yoludur.

Otomatik doldurma mekanizması, içerik bildirim dosyaları arasında _ana-alt_ ilişkisi aracılığıyla çalışır. Ana (ana) dosya güncellendiğinde, Intlayer bu değişiklikleri türetilmiş (otomatik doldurulmuş) bildirim dosyalarına otomatik olarak uygular.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

İşte `autoFill` talimatını kullanan [yerel ayar başına içerik bildirim dosyası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md).

Ardından, aşağıdaki komutu çalıştırdığınızda:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer, ana dosyada henüz bildirilmemiş tüm yerel ayarları doldurarak türetilmiş bildirim dosyasını `src/components/example/example.content.json` konumunda otomatik olarak oluşturacaktır.

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

Bundan sonra, her iki bildirim dosyası da tek bir sözlüğe birleştirilecek ve standart `useIntlayer("example")` kancası (react) / composable (vue) kullanılarak erişilebilir olacaktır.

## Otomatik Doldurulmuş Dosya Formatı

Otomatik doldurulmuş bildirim dosyaları için önerilen format **JSON**'dur, bu da biçimlendirme kısıtlamalarından kaçınmaya yardımcı olur. Ancak, Intlayer ayrıca `.ts`, `.js`, `.mjs`, `.cjs` ve diğer formatları da destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Your content
  },
};
```

Bu, dosyayı şu konumda oluşturacaktır:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts` ve benzeri dosyaların oluşturulması şu şekilde çalışır:
>
> - Dosya zaten varsa, Intlayer her alanı bulmak için AST (Abstract Syntax Tree) kullanarak ayrıştıracak ve eksik çevirileri ekleyecektir.
> - Dosya mevcut değilse, Intlayer onu varsayılan içerik bildirim dosyası şablonu kullanarak oluşturacaktır.

## Mutlak Yollar

`autoFill` alanı ayrıca mutlak yolları da destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Your content
  },
};
```

Bu, dosyayı şu konumda oluşturacaktır:

```
/messages/example.content.json
```

## Yerel Ayar Başına İçerik Bildirim Dosyalarını Otomatik Oluştur

`autoFill` alanı ayrıca **yerel ayar başına** içerik bildirim dosyalarının oluşturulmasını destekler.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Your content
  },
};
```

Bu, iki ayrı dosya oluşturacaktır:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Belirli Yerel Ayar Otomatik Doldurmasını Filtrele

`autoFill` alanı için bir nesne kullanmak, filtreler uygulamaya ve sadece belirli yerel ayar dosyalarını oluşturmaya izin verir.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Your content
  },
};
```

Bu, sadece Fransızca çeviri dosyasını oluşturacaktır.

## Yol Değişkenleri

Oluşturulan dosyalar için hedef yolları dinamik olarak çözümlemek için `autoFill` yolunun içinde değişkenler kullanabilirsiniz.

**Kullanılabilir değişkenler:**

- `{{locale}}` – Yerel ayar kodu (ör. `fr`, `es`)
- `{{key}}` – Sözlük anahtarı (ör. `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Your content
  },
};
```

Bu, şunları oluşturacaktır:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
