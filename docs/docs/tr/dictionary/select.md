---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Seçime Dayalı İçerik (Select)
description: Rastgele bir dize (string) değerine göre içeriği dinamik olarak oluşturmak için Intlayer'da seçime dayalı (select) içeriği nasıl kullanacağınızı öğrenin. Projenizde switch benzeri içeriği verimli bir şekilde uygulamak için bu belgeleri takip edin.
keywords:
  - Seçime Dayalı İçerik
  - Select Content
  - Switch İçeriği
  - ICU select
  - Dinamik oluşturma
  - Belgeler
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Seçime dayalı (select) içerik eklendi"
author: aymericzip
---

# Seçime Dayalı İçerik (Select) / Intlayer

## Select Nasıl Çalışır

Intlayer'da seçime dayalı içerik, rastgele dize değerlerini karşılık gelen içeriklerle eşleştiren `select` işlevi aracılığıyla elde edilir. Bu, ICU `{value, select, …}` mesajına eşdeğerdir veya uygulamanızın kodundaki bir `switch` ifadesine benzer.

Ayırt edici (discriminant) rastgele bir dize olduğunda `select` kullanın: durum (status), plan, platform veya rol (role) gibi. Diğer ayırt ediciler için Intlayer özel düğümler sunar:

| Ayırt Edici (Discriminant) | Düğüm      |
| -------------------------- | ---------- |
| Miktar (Quantity)          | `enu()`    |
| Boolean                    | `cond()`   |
| Cinsiyet (Gender)          | `gender()` |
| Diğer herhangi bir dize    | `select()` |

## Seçime Dayalı İçeriği Ayarlama

Intlayer projenizde seçime dayalı içeriği ayarlamak için, seçim (select) tanımlarınızı içeren bir içerik modülü oluşturun. Aşağıda farklı formatlarda örnekler verilmiştir.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // isteğe bağlı
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // isteğe bağlı
      },
    },
  },
}
```

> Eğer hiçbir `fallback` bildirilmezse, sağlanan değer bildirilen durumların hiçbiriyle eşleşmediğinde, son bildirilen anahtar yedek (fallback) olarak kabul edilir: tıpkı `cond()` ve `gender()` sözleşmelerinde olduğu gibi.

### Tür Güvenliği (Type Safety)

Kabul edilen argüman, bildirilen durumlardan (cases) çıkarılır:

- Hiçbir `fallback` yoksa, yalnızca bildirilen durumlar kabul edilir: bir yazım hatası tür hatasına (type error) neden olur.
- Bir `fallback` varsa, bildirilen durumlar hala otomatik tamamlama sağlarken herhangi bir dize kabul edilir (çünkü fallback eşleşmeyen değerleri kapsar).

## Neden düzenli bir nesne kullanılmamalı?

Düzenli (regular) bir nesne bildirmek ve çalışma zamanı (runtime) değerini kullanarak onu dizinlemek cazip gelebilir:

```tsx
// ❌ Bunu yapmayın
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Intlayer derleyicisi (compiler), kullanılmayan içeriği kaldırmak ve kalan anahtarları küçültmek (minify) için kaynak kodunuzu ayrıştırır. Dinamik olarak hesaplanan erişim (`obj[expr]`) statik olarak çözümlenemez, bu nedenle tüm dal opak olarak işaretlenir: pakette tutulacak ve anahtarları küçültülmeyecektir.

`select()` kullanarak, durum çözümü (case resolution) bir özellik erişimi yerine bir işlev çağrısı içinde gerçekleşir. Derleyici bunu tek bir statik alan erişimi olarak görür ve tıpkı `enu()`, `cond()` veya `gender()` ile yaptığı gibi düğümü doğru bir şekilde optimize eder:

```tsx
// ✅ Bunu yapın
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Seçime Dayalı İçeriği Kullanma

<Tabs group="framework">
  <Tab label="React" value="react">

React bileşeninde seçime dayalı içeriği kullanmak için, `react-intlayer` paketinden `useIntlayer` kancasını (hook) içe aktarın ve kullanın. Bu kanca, belirtilen anahtar için içeriği getirir ve uygun çıktıyı seçmek üzere bir değer iletmenizi sağlar.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Çıktı: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Çıktı: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Çıktı: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Next.js İstemci Bileşenlerinde (Client Components) seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Örnek:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Vue bileşenlerinde seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Örnek:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte bileşenlerinde seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Mağazaya (store) `$` kullanılarak erişilir. Örnek:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact bileşenlerinde seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Örnek:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

SolidJS bileşenlerinde seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Örnek:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular bileşenlerinde seçime dayalı içeriği kullanmak için içeriği `useIntlayer` kancası (hook) aracılığıyla getirin. Örnek:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` ile seçime dayalı içeriği kullanmak için içeriği `useIntlayer` işlevi (function) aracılığıyla getirin. Örnek:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// İlk oluşturma (Initial render)
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Select ile Diğer Düğümleri Birleştirme

Her durum tam bir içerik düğümü barındırdığından, `select` `t()`, `insert()`, `md()` vb. ile birleştirilebilir:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          tr: "{{name}} bir taslak kaydetti",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          tr: "{{name}} gönderiyi yayınladı",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          tr: "{{name}} gönderiyi güncelledi",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Çıktı: Alice bir taslak kaydetti
```

## ICU `select` 'ten Geçiş

ICU `select` argümanını kullanan mesajlar `select` düğümü olarak içe aktarılır:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Şuna dönüşür:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

ICU `other` durumu, Intlayer'da her şeyi yakalayan durumların (catch-all cases) standart adı olan `fallback` olarak yeniden adlandırılır. İkinci argüman ICU değişken adını tutar, böylece mesaj dışa aktarıldığında (export) tekrar aynı ICU dizesine dönüştürülür.

> Lütfen dikkat edin; durumların cinsiyet değerleri (`male` / `female` / `other`) olduğu ICU `select` mesajları bunun yerine bir [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md) düğümü olarak içe aktarılır.

## Ek Kaynaklar

Yapılandırma ve kullanım hakkında daha ayrıntılı bilgi için aşağıdaki kaynaklara bakın:

- [Intlayer CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
- [Intlayer React Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_create_react_app.md)
- [Intlayer Next.js Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_15.md)

Bu kaynaklar, Intlayer'ın kurulumu ve kullanımı hakkında çeşitli ortamlarda ve framework'lerde daha fazla bilgi sağlar.
