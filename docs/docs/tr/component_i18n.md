---
createdAt: 2024-03-07
updatedAt: 2025-09-30
priority: 8
title: React ve Next.js'te bir bileşeni çok dilli (i18n kütüphanesi) yapma
description: Intlayer ile çok dilli bir React veya Next.js bileşeni oluşturmak için yerelleştirilmiş içeriğin nasıl beyan edileceğini ve alınacağını öğrenin.
keywords:
  - i18n
  - bileşen
  - react
  - çok dilli
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
author: aymericzip
---

# Intlayer ile bir bileşeni çok dilli (i18n) nasıl yaparsınız

Bu rehber, iki yaygın kurulumda bir UI bileşenini çok dilli yapmak için gereken asgari adımları gösterir:

- React (Vite/SPA)
- Next.js (App Router)

Öncelikle içeriğinizi beyan edecek, ardından bileşeninizde içeriği alacaksınız.

## 1) İçeriğinizi beyan edin (React ve Next.js için ortak)

Bileşeninizin yakınında bir içerik beyan dosyası oluşturun. Bu, çevirileri kullanıldıkları yere yakın tutar ve tür güvenliğini sağlar.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

Yapılandırma dosyalarını tercih ediyorsanız JSON da desteklenmektedir.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) İçeriğinizi alın

### Durum A. React uygulaması (Vite/SPA)

Varsayılan yaklaşım: Anahtarla almak için `useIntlayer` kullanın. Bu, bileşenleri hafif ve tipli tutar.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Sunucu tarafı render veya sağlayıcı dışında: `react-intlayer/server` kullanın ve gerektiğinde açık bir `locale` parametresi geçin.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternatif: Çağrı noktasında yapıyı yan yana koymayı tercih ederseniz, `useDictionary` tüm tanımlı nesneyi okuyabilir.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Durum B. Next.js (App Router)

Veri güvenliği ve performans için sunucu bileşenlerini tercih edin. Sunucu dosyalarında `next-intlayer/server` içinden `useIntlayer` kullanın, istemci bileşenlerinde ise `next-intlayer` içinden `useIntlayer` kullanın.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

İpucu: Sayfa meta verileri ve SEO için, içeriği `getIntlayer` kullanarak da alabilir ve çok dilli URL’leri `getMultilingualUrls` ile oluşturabilirsiniz.

## Neden Intlayer’ın bileşen yaklaşımı en iyisidir

- **Birlikte konumlandırma**: İçerik beyanları bileşenlerin yakınında bulunur, sürüklenmeyi azaltır ve tasarım sistemleri arasında yeniden kullanımı artırır.
- **Tip güvenliği**: Anahtarlar ve yapılar güçlü şekilde tiplenmiştir; eksik çeviriler çalışma zamanında değil, build zamanında ortaya çıkar.
- **Sunucu-öncelikli**: Daha iyi güvenlik ve performans için sunucu bileşenlerinde doğal olarak çalışır; istemci kancaları ergonomik kalır.
- **Ağaç sarsma (Tree-shaking)**: Sadece bileşen tarafından kullanılan içerik paketlenir, böylece büyük uygulamalarda yükler küçük tutulur.
- **Geliştirici Deneyimi (DX) ve araçlar**: Dahili ara katman yazılımı, SEO yardımcıları ve isteğe bağlı Görsel Editör/Yapay Zeka çevirileri günlük işleri kolaylaştırır.

Next.js odaklı karşılaştırmalar ve kalıplar için bakınız: https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md

## İlgili rehberler ve referanslar

- React kurulumu (Vite): https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md
- React Router v7: https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_router_v7.md
- TanStack Başlangıç: https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md
- Next.js kurulumu: https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md
- Neden Intlayer vs. next-intl vs. next-i18next - https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-i18next_vs_next-intl_vs_intlayer.md

Bu sayfalar uçtan uca kurulum, sağlayıcılar, yönlendirme ve SEO yardımcılarını içerir.
