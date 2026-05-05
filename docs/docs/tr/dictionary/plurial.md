---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Çoğul
description: Çok dilli web sitenizde yerele duyarlı çoğul içeriği (CLDR tabanlı) nasıl tanımlayacağınızı ve kullanacağınızı keşfedin. Projenizi birkaç dakika içinde kurmak için bu çevrimiçi belgelerdeki adımları izleyin.
keywords:
  - Çoğul
  - Çoğullaştırma
  - CLDR
  - Uluslararasılaştırma
  - Belgeler
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Çoğul İçerik / Intlayer'da Çoğul

## Çoğul Nasıl Çalışır?

Intlayer'da çoğul içerik, CLDR çoğul kategorilerini (`zero`, `one`, `two`, `few`, `many`, `other`) ilgili içerikleriyle eşleştiren `plural` işlevi aracılığıyla elde edilir. Doğru kategori, platformun yerleşik [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API'si kullanılarak aktif yerele ve bir sayı değerine göre otomatik olarak seçilir.

Kendi tanımladığınız sayısal aralıklara göre içerik seçen [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration.md) işlevinden farklı olarak, `plural` seçimi CLDR kurallarına devreder. Rusça, Lehçe, Arapça veya Galce gibi karmaşık çoğullaştırma kurallarına sahip diller için, elle modülo mantığı yazmak zorunda kalmadan ölçeklenebilir olmasını sağlayan şey budur.

## Ne Zaman `plural` vs `enu` Kullanılmalı?

| Kullanım durumu                                                         | Yardımcı |
| ----------------------------------------------------------------------- | -------- |
| Yerele duyarlı dilbilgisel çoğul formlar (bir elma / iki elma / 5 elma) | `plural` |
| Özel sayısal aralıklar (`<5`, `>=10`) veya CLDR dışı gruplar            | `enu`    |

Sadece İngilizceyi hedefliyorsanız (sadece `one` / `other` vardır), her ikisi de çalışır. `few` / `many` / `two` ayrımları olan herhangi bir dil için `plural` tercih edin.

## Çoğul İçeriği Ayarlama

Intlayer projenizde çoğul içeriği ayarlamak için `plural` yardımcısını kullanan bir içerik modülü oluşturun. `other` kategorisi zorunludur ve bir yerel daha spesifik bir kategori tanımlamadığında yedek olarak kullanılır.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      tr: plural({
        one: "{{count}} açık pozisyon",
        other: "{{count}} açık pozisyon",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "tr": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} açık pozisyon",
            "other": "{{count}} açık pozisyon"
          }
        }
      }
    }
  }
}
```

> Desteklenen kategoriler `zero`, `one`, `two`, `few`, `many`, `other`'dır. Sadece hedef dilinizin kullandığı kategorileri beyan etmeniz yeterlidir — Intlayer, belirli bir kategori eşleşmediğinde `other` kategorisine geri döner.
>
> `{{count}}` yer tutucusu, çalışma zamanında ilettiğiniz sayıyla otomatik olarak değiştirilir. Diğer yer tutucuları da dahil edebilirsiniz (aşağıdaki [Özel yer tutucular](#custom-placeholders) bölümüne bakın).

## React Intlayer ile Çoğul İçeriği Kullanma

React bileşeni içinde çoğul içeriği kullanmak için, `useIntlayer` kancası aracılığıyla içeriği alın ve bir sayıyla çağırın. Aktif yerel ve sayı, eşleşen CLDR kategorisini seçmek için birleştirilir.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* İngilizcede:                                 */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Döndürülen işlevi iki eşdeğer şekilde çağırabilirsiniz:

```tsx
totalOpenings(21); // kısa yol: sadece sayı
totalOpenings({ count: 21 }); // açık form
```

## Özel yer tutucular

Çoğul dizeler `{{count}}` dışındaki yer tutucuları içerebilir. Bunları `count` ile birlikte nesne formunda iletin:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, {{count}} yeni mesajınız var",
      other: "{{name}}, {{count}} yeni mesajınız var",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, 1 yeni mesajınız var"

summary({ count: 7, name: "Alice" });
// → "Alice, 7 yeni mesajınız var"
```

## Bir Bakışta CLDR Kategorileri

Farklı diller CLDR kategorilerinin farklı alt kümelerini kullanır. Birkaç yaygın durum:

| Dil              | Kullanılan kategoriler                       |
| ---------------- | -------------------------------------------- |
| İngilizce (`en`) | `one`, `other`                               |
| Fransızca (`fr`) | `one`, `many`, `other`                       |
| Rusça (`ru`)     | `one`, `few`, `many`, `other`                |
| Lehçe (`pl`)     | `one`, `few`, `many`, `other`                |
| Arapça (`ar`)    | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japonca / Çince  | sadece `other`                               |

Bunu ezberlemenize gerek yok — çevirilerinizin olduğu kategorileri beyan edin, Intlayer gerektiğinde `other` kategorisine geri dönecektir.

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha ayrıntılı bilgi için aşağıdaki kaynaklara bakın:

- [Enumeration Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration.md)
- [Insertion Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)
- [Intlayer CLI Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
- [React Intlayer Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_create_react_app.md)
- [Next Intlayer Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_15.md)

Bu kaynaklar, Intlayer'ın çeşitli ortamlarda ve çerçevelerde kurulumu ve kullanımı hakkında daha fazla bilgi sunar.
