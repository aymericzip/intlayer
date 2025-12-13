---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: İçerik Dosyası
description: İçerik bildirim dosyalarınız için uzantıları nasıl özelleştireceğinizi öğrenin. Projenizde koşulları verimli bir şekilde uygulamak için bu dokümantasyonu takip edin.
keywords:
  - İçerik Dosyası
  - Dokümantasyon
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: ICU ve i18next format desteği eklendi
  - version: 6.0.0
    date: 2025-09-20
    changes: Alanlar dokümantasyonu eklendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Başlangıç geçmişi
---

# İçerik Dosyası

<iframe title="i18n, Markdown, JSON… hepsini yönetmek için tek bir çözüm | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## İçerik Dosyası Nedir?

Intlayer'da bir içerik dosyası, sözlük tanımlarını içeren bir dosyadır.  
Bu dosyalar, uygulamanızın metin içeriğini, çevirilerini ve kaynaklarını bildirir.  
İçerik dosyaları, sözlükler oluşturmak için Intlayer tarafından işlenir.

Sözlükler, uygulamanızın `useIntlayer` kancasını kullanarak içe aktaracağı nihai sonuç olacaktır.

### Temel Kavramlar

#### Sözlük

Sözlük, anahtarlar tarafından organize edilmiş yapılandırılmış bir içerik koleksiyonudur. Her sözlük şunları içerir:

- **Anahtar**: Sözlük için benzersiz bir tanımlayıcı
- **İçerik**: Gerçek içerik değerleri (metin, sayılar, nesneler, vb.)
- **Meta Veriler**: Başlık, açıklama, etiketler gibi ek bilgiler

#### İçerik Dosyası

İçerik dosyası örneği:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Merhaba Dünya",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "İngilizce içerik",
      "en-GB": "İngilizce içerik (İngiltere)",
      fr: "Fransızca içerik",
      es: "İspanyolca içerik",
    }),
    quantityContent: enu({
      "<-1": "Eksi birden az araba",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Birkaç araba",
      ">19": "Birçok araba",
    }),
    conditionalContent: cond({
      true: "Doğrulama etkin",
      false: "Doğrulama devre dışı",
    }),
    insertionContent: insert("Merhaba {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown Örneği"),

    /*
     * Sadece `react-intlayer` veya `next-intlayer` kullanılarak mevcuttur
     */
    jsxContent: <h1>Başlığım</h1>,
  },
} satisfies Dictionary<Content>; // [isteğe bağlı] Dictionary generiktir ve sözlüğünüzün biçimlendirmesini güçlendirmenize olanak tanır
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "İngilizce içerik",
      "en-GB": "İngilizce içerik (İngiltere)",
      fr: "Fransızca içerik",
      es: "İspanyolca içerik",
    }),
    quantityContent: enu({
      "<-1": "Eksi birden az araba",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Birkaç araba",
      ">19": "Birçok araba",
    }),
    conditionalContent: cond({
      true: "Doğrulama etkin",
      false: "Doğrulama devre dışı",
    }),
    insertionContent: insert("Merhaba {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    markdownContent: md("# Markdown Örneği"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Sadece `react-intlayer` veya `next-intlayer` kullanılırken mevcuttur
    jsxContent: <h1>Başlığım</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Merhaba Dünya",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      tr: "Türkçe içerik",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Eksi birden az araba",
      "-1": "Eksi bir araba",
      "0": "Araba yok",
      "1": "Bir araba",
      ">5": "Birkaç araba",
      ">19": "Birçok araba",
    }),
    conditionalContent: cond({
      true: "Doğrulama etkin",
      false: "Doğrulama devre dışı",
    }),
    insertionContent: insert("Merhaba {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    markdownContent: md("# Markdown Örneği"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Sadece `react-intlayer` veya `next-intlayer` kullanılırken mevcuttur
    jsxContent: <h1>Başlığım</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Merhaba Dünya",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Araba yok",
        "1": "Bir araba",
        "<-1": "Eksi bir arabadan az",
        "-1": "Eksi bir araba",
        ">5": "Birkaç araba",
        ">19": "Birçok araba",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Doğrulama etkin",
        "false": "Doğrulama devre dışı",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Merhaba {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown Örneği",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Başlığım"],
      },
    },
  },
}
```

#### İçerik Düğümleri

İçerik düğümleri, sözlük içeriğinin yapı taşlarıdır. Şunlar olabilirler:

- **İlkel değerler**: stringler, sayılar, booleanlar, null, undefined
- **Tiplenmiş düğümler**: Çeviriler, koşullar, markdown gibi özel içerik türleri
- **Fonksiyonlar**: Çalışma zamanında değerlendirilebilen dinamik içerik [bkz. Fonksiyon Getirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md)
- **İç içe içerik**: Diğer sözlüklere referanslar

#### İçerik Türleri

Intlayer, tiplenmiş düğümler aracılığıyla çeşitli içerik türlerini destekler:

- **Çeviri İçeriği**: Yerel dil değerlerine sahip çok dilli metinler [bkz. Çeviri İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation_content.md)
- **Koşul İçeriği**: Boolean ifadelerine dayalı koşullu içerik [bkz. Koşul İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/condition_content.md)
- **Numaralandırma İçeriği**: Numaralandırılmış değerlere göre değişen içerik [bkz. Numaralandırma İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration_content.md)
- **Ekleme İçeriği**: Diğer içeriklere eklenebilen içerik [bkz. Ekleme İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion_content.md)
- **Markdown İçeriği**: Markdown formatında zengin metin içeriği [bkz. Markdown İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown_content.md)
- **İç İçe İçerik**: Diğer sözlüklere referanslar [bkz. İç İçe İçerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/nested_content.md)
- **Cinsiyet İçeriği**: Cinsiyete göre değişen içerik [bkz. Cinsiyet İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender_content.md)
- **Dosya İçeriği**: Harici dosyalara referanslar [bkz. Dosya İçeriği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/file_content.md)

## Sözlük Yapısı

Intlayer'da bir sözlük, `Dictionary` türü ile tanımlanır ve davranışını kontrol eden birkaç özelliğe sahiptir:

### Gerekli Özellikler

#### `key` (string)

Sözlüğün tanımlayıcısıdır. Birden fazla sözlük aynı anahtara sahipse, Intlayer bunları otomatik olarak birleştirir.

> Kebab-case adlandırma kuralını kullanın (örneğin, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

`content` özelliği, gerçek sözlük verisini içerir ve aşağıdakileri destekler:

- **İlkel değerler**: stringler, sayılar, booleanlar, null, undefined
- **Tipli düğümler**: Intlayer'ın yardımcı fonksiyonlarıyla oluşturulan özel içerik türleri
- **İç içe nesneler**: Karmaşık veri yapıları
- **Diziler**: İçerik koleksiyonları
- **Fonksiyonlar**: Dinamik içerik değerlendirmesi

### İsteğe Bağlı Özellikler

#### `title` (string)

Sözlüğü tanımlayıcı, insan tarafından okunabilir başlık. Bu, özellikle çok sayıda sözlük yönetirken veya içerik yönetim arayüzleriyle çalışırken faydalıdır.

**Örnek:**

```typescript
{
  key: "about-page-meta",
  title: "Hakkında Sayfası Meta Verileri",
  content: { /* ... */ }
}
```

#### `description` (string)

Sözlüğün amacını, kullanım yönergelerini ve özel hususları açıklayan ayrıntılı açıklama. Bu açıklama, yapay zeka destekli çeviri üretimi için bağlam olarak da kullanılır ve çeviri kalitesi ile tutarlılığının korunmasında değerlidir.

**Örnek:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Bu sözlük Hakkında Sayfasının meta verilerini yönetir",
    "SEO için iyi uygulamalar göz önünde bulundurulmalı:",
    "- Başlık 50 ile 60 karakter arasında olmalıdır",
    "- Açıklama 150 ile 160 karakter arasında olmalıdır",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Sözlükleri kategorize etmek ve düzenlemek için kullanılan string dizisi. Etiketler, ek bağlam sağlar ve editörlerde veya içerik yönetim sistemlerinde filtreleme, arama veya düzenleme için kullanılabilir.

**Örnek:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Sözlük içeriği için kullanılacak formatlayıcıyı belirtir. Bu, farklı mesaj formatlama sözdizimlerini kullanmanıza olanak tanır.

- `'intlayer'`: Varsayılan Intlayer formatlayıcısı.
- `'icu'`: ICU mesaj formatlamasını kullanır.
- `'i18next'`: i18next mesaj formatlamasını kullanır.

**Örnek:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Sözlük içeriği için kullanılacak formatörü belirtir. Bu, farklı mesaj formatlama sözdizimlerini kullanmaya olanak tanır.

- `'intlayer'`: Varsayılan Intlayer formatörü.
- `'icu'`: ICU mesaj formatlamasını kullanır.
- `'i18next'`: i18next mesaj formatlamasını kullanır.

**Örnek:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Sözlüğü, içerikte bildirilen her alanın otomatik olarak bir çeviri düğümüne dönüştürüleceği yerel bazlı bir sözlüğe dönüştürür. Bu özellik ayarlandığında:

- Sözlük tek bir yerel dil sözlüğü olarak işlenir
- Her alan, o belirli yerel dil için bir çeviri düğümü haline gelir
- Bu özellik kullanılırken içerikte çeviri düğümleri (`t()`) kullanmamalısınız
- Eğer belirtilmezse, sözlük çok dilli bir sözlük olarak işlenir

> Daha fazla bilgi için [Intlayer'da Yerel Dil Bazlı İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md) sayfasına bakınız.

**Örnek:**

```json
// Yerel dil bazlı sözlük
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Bu 'en' için bir çeviri düğümü olur
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Sözlük içeriğini harici kaynaklardan otomatik olarak doldurma talimatları. Bu, `intlayer.config.ts` içinde global olarak veya sözlük bazında yapılandırılabilir. Birden fazla formatı destekler:

- **`true`**: Tüm yerel diller için otomatik doldurmayı etkinleştirir
- **`string`**: Tek bir dosya yolu veya değişkenlerle şablon
- **`object`**: Yerel dil bazında dosya yolları

**Örnekler:**

```json
// Tüm yerel diller için etkinleştir
{
  "autoFill": true
}
// Tek dosya
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Değişkenlerle şablon
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Yerel dil bazında detaylı yapılandırma
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Kullanılabilir değişkenler:**

- `{{locale}}` – Yerel dil kodu (örneğin `fr`, `es`)
- `{{fileName}}` – Dosya adı (örneğin `example`)
- `{{key}}` – Sözlük anahtarı (örneğin `example`)

> Daha fazla bilgi için [Intlayer'da Otomatik Doldurma Yapılandırması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md) sayfasına bakınız.

##### `priority` (sayı)

Çakışma çözümlemesi için sözlüğün önceliğini belirtir. Birden fazla sözlük aynı anahtara sahip olduğunda, en yüksek öncelik numarasına sahip sözlük diğerlerinin üzerine yazacaktır. Bu, içerik hiyerarşilerini ve geçersiz kılmaları yönetmek için faydalıdır.

**Örnek:**

```typescript
// Temel sözlük
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Hoş geldiniz!" }
}

// Geçersiz kılma sözlüğü
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Premium hizmetimize hoş geldiniz!" }
}
// Bu, temel sözlüğün üzerine yazacaktır
```

### CMS Özellikleri

##### `version` (string)

Uzak sözlükler için sürüm tanımlayıcısı. Hangi sürümün kullanıldığını takip etmeye yardımcı olur, özellikle uzak içerik yönetim sistemleri ile çalışırken faydalıdır.

##### `live` (boolean)

Uzak sözlükler için, sözlüğün çalışma zamanında canlı olarak getirilip getirilmemesi gerektiğini belirtir. Etkinleştirildiğinde:

- `intlayer.config.ts` dosyasında `importMode`'un "live" olarak ayarlanmasını gerektirir
- Canlı bir sunucunun çalışıyor olmasını gerektirir
- Sözlük, çalışma zamanında canlı senkronizasyon API'si kullanılarak getirilir
- Canlı modda ancak getirme başarısız olursa, dinamik değere geri döner
- Canlı değilse, sözlük optimal performans için derleme zamanında dönüştürülür

### Sistem Özellikleri (Otomatik Oluşturuldu)

Bu özellikler Intlayer tarafından otomatik olarak oluşturulur ve manuel olarak değiştirilmemelidir:

##### `$schema` (string)

Sözlük yapısının doğrulanması için kullanılan JSON şeması. Sözlük bütünlüğünü sağlamak için Intlayer tarafından otomatik olarak eklenir.

##### `id` (string)

Uzak sözlükler için, uzak sunucudaki sözlüğün benzersiz tanımlayıcısıdır. Uzak içeriğin getirilmesi ve yönetilmesi için kullanılır.

##### `localId` (LocalDictionaryId)

Yerel sözlükler için benzersiz tanımlayıcı. Sözlüğü tanımlamaya ve yerel mi yoksa uzak mı olduğunu, ayrıca konumunu belirlemeye yardımcı olmak için Intlayer tarafından otomatik olarak oluşturulur.

##### `localIds` (LocalDictionaryId[])

Birleştirilmiş sözlükler için, bu dizi birleştirilen tüm sözlüklerin kimliklerini içerir. Birleştirilmiş içeriğin kaynağını takip etmek için faydalıdır.

##### `filePath` (string)

Yerel sözlüğün dosya yolu, sözlüğün hangi `.content` dosyasından oluşturulduğunu gösterir. Hata ayıklama ve kaynak takibi için yardımcı olur.

##### `versions` (string[])

Uzak sözlükler için, bu dizi sözlüğün mevcut tüm sürümlerini içerir. Hangi sürümlerin kullanılabilir olduğunu takip etmeye yardımcı olur.

##### `autoFilled` (true)

Sözlüğün dış kaynaklardan otomatik olarak doldurulup doldurulmadığını belirtir. Çakışma durumunda, temel sözlükler otomatik doldurulan sözlüklerin üzerine yazacaktır.

##### `location` ('distant' | 'locale')

Sözlüğün konumunu belirtir:

- `'locale'`: Yerel sözlük (içerik dosyalarından)
- `'distant'`: Uzak sözlük (harici kaynaktan)

## İçerik Düğüm Türleri

Intlayer, temel ilkel değerleri genişleten birkaç özel içerik düğüm türü sağlar:

### Çeviri İçeriği (`t`)

Yerel dile göre değişen çok dilli içerik:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Koşul İçeriği (`cond`)

Boolean koşullara göre değişen içerik:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Numaralandırma İçeriği (`enu`)

Numaralandırılmış değerlere göre değişen içerik:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "İsteğiniz beklemede",
  approved: "İsteğiniz onaylandı",
  rejected: "İsteğiniz reddedildi",
});
```

### Ekleme İçeriği (`insert`)

Başka içeriklere eklenebilen içerik:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Bu metin herhangi bir yere eklenebilir");
```

### İç İçe İçerik (`nest`)

Diğer sözlüklere referanslar:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Markdown İçeriği (`md`)

Markdown formatında zengin metin içeriği:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Hoşgeldiniz\n\nBu, [bağlantılar](https://example.com) içeren **kalın** metindir"
);
```

### Cinsiyete Göre İçerik (`gender`)

Cinsiyete göre değişen içerik:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "O bir geliştiricidir",
  female: "O bir geliştiricidir",
  other: "Onlar bir geliştiricidir",
});
```

### Dosya İçeriği (`file`)

Harici dosyalara referanslar:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## İçerik Dosyaları Oluşturma

### Temel İçerik Dosyası Yapısı

Bir içerik dosyası, `Dictionary` tipini karşılayan varsayılan bir nesne ihraç eder:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Hoşgeldiniz Sayfası İçeriği",
  description:
    "Kahraman bölüm ve özellikler dahil olmak üzere ana karşılama sayfası için içerik",
  tags: ["sayfa", "karşılama", "anasayfa"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON İçerik Dosyası

İçerik dosyalarını JSON formatında da oluşturabilirsiniz:

```json
{
  "key": "welcome-page",
  "title": "Hoşgeldiniz Sayfası İçeriği",
  "description": "Ana karşılama sayfası için içerik",
  "tags": ["sayfa", "karşılama"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Platformumuza Hoş Geldiniz",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Harika uygulamaları kolayca oluşturun",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Yerel İçerik Dosyaları

Yerel sözlükler için `locale` özelliğini belirtin:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Platformumuza Hoş Geldiniz",
      subtitle: "Harika uygulamaları kolayca oluşturun",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## İçerik Dosyası Uzantıları

Intlayer, içerik bildirim dosyalarınız için uzantıları özelleştirmenize olanak tanır. Bu özelleştirme, büyük ölçekli projeleri yönetmede esneklik sağlar ve diğer modüllerle çakışmaları önlemeye yardımcı olur.

### Varsayılan Uzantılar

Varsayılan olarak, Intlayer içerik bildirimleri için aşağıdaki uzantılara sahip tüm dosyaları izler:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Bu varsayılan uzantılar çoğu uygulama için uygundur. Ancak, özel ihtiyaçlarınız olduğunda, derleme sürecini kolaylaştırmak ve diğer bileşenlerle çakışma riskini azaltmak için özel uzantılar tanımlayabilirsiniz.

> Intlayer'ın içerik bildirim dosyalarını tanımlamak için kullandığı dosya uzantılarını özelleştirmek için, bunları Intlayer yapılandırma dosyasında belirtebilirsiniz. Bu yaklaşım, izleme işleminin kapsamını sınırlamanın derleme performansını artırdığı büyük ölçekli projeler için faydalıdır.

## Gelişmiş Kavramlar

### Sözlük Birleştirme

Birden fazla sözlük aynı anahtara sahip olduğunda, Intlayer bunları otomatik olarak birleştirir. Birleştirme davranışı birkaç faktöre bağlıdır:

- **Öncelik**: Daha yüksek `priority` değerine sahip sözlükler, daha düşük değerlere sahip olanların yerine geçer
- **Otomatik doldurma vs Temel**: Temel sözlükler, otomatik doldurulan sözlüklerin üzerine yazar
- **Konum**: Yerel sözlükler, öncelikler eşit olduğunda uzak sözlüklerin üzerine yazar

### Tür Güvenliği

Intlayer, içerik dosyaları için tam TypeScript desteği sağlar:

```typescript
// İçerik türünüzü tanımlayın
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Sözlüğünüzde kullanın
export default {
  key: "welcome-page",
  content: {
    // TypeScript otomatik tamamlama ve tür denetimi sağlar
    hero: {
      title: "Hoşgeldiniz",
      subtitle: "Harika uygulamalar geliştirin",
      cta: "Başlayın",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Düğüm İç İçe Geçirme

Fonksiyonları sorunsuzca birbirinin içine yerleştirebilirsiniz.

Örnek:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` `['Hi', ' ', 'John Doe']` döner
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe geçiren bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10)` 'Multiple items found' döner
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` `['Hi', ' ', 'John Doe']` döner
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe geçen bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10)` 'Multiple items found' döner
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Birden fazla öğe bulundu",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Geçerli veri yok",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` `['Hi', ' ', 'John Doe']` döner
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe geçiren bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10)` 'Birden fazla öğe bulundu' döner
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "Öğe bulunamadı",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "Bir öğe bulundu",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Birden fazla öğe bulundu",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Geçerli veri yok",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Merhaba",
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "Öğe bulunamadı",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "Bir öğe bulundu",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Birden fazla öğe bulundu",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "Geçerli veri yok",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### En İyi Uygulamalar

1. **İsimlendirme Kuralları**:
   - Sözlük anahtarları için kebab-case kullanın (`"about-page-meta"`)
   - İlgili içeriği aynı anahtar ön eki altında gruplayın

2. **İçerik Organizasyonu**:
   - İlgili içeriği aynı sözlükte birlikte tutun
   - Karmaşık içerik yapıları için iç içe nesneler kullanın
   - Kategorilendirme için etiketlerden yararlanın
   - Eksik çevirileri otomatik doldurmak için `autoFill` kullanın

3. **Performans**:
   - İzlenen dosyaların kapsamını sınırlamak için içerik yapılandırmasını ayarlayın
   - Gerçek zamanlı güncellemeler gerektiğinde (örneğin A/B testi vb.) yalnızca canlı sözlükleri kullanın
   - Sözlüğü derleme zamanında optimize etmek için derleme dönüşüm eklentisinin (`@intlayer/swc` veya `@intlayer/babel`) etkin olduğundan emin olun
