---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Dokümantasyonu | react-intlayer
description: react-intlayer paketinden usePathname hook'unu kullanarak yerel ayar (locale) segmenti olmadan mevcut URL yolunu nasıl alacağınızı öğrenin.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - uluslararasılaştırma
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname yardımcı programını ekle"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Geçmişi başlat"
author: aymericzip
---

# React Entegrasyonu: `usePathname` Hook Dokümantasyonu

`react-intlayer`'dan gelen `usePathname` hook'u, yerel ayar segmenti kaldırılmış mevcut tarayıcı yolunu (pathname) döndürür. Doğal `window.location.pathname` özelliğine dayanır ve `popstate` üzerinden tarayıcı gezinme olaylarına yanıt verir.

## `usePathname` İçeri Aktarımı

```typescript
import { usePathname } from "react-intlayer";
```

## Genel Bakış

Çerçeveye özgü yönlendirme hook'larından (örneğin `next-intlayer` veya `react-router` içindekiler) farklı olarak bu hook, saf React uygulamaları için hafif ve çerçeveden bağımsız bir çözümdür. Mevcut URL'i çıkarır ve eşleşen herhangi bir yerel ayar önekini kaldırır (örneğin, `/tr/about`, `/about` olur).

## Kullanım

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Ana Sayfa
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Hakkımızda
      </a>
    </nav>
  );
};

export default Navigation;
```

## Dönüş Değeri

| Tür      | Açıklama                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `string` | Yerel ayar öneki kaldırılmış tarayıcının geçerli yolu (pathname) (örneğin, `/tr/dashboard` → `/dashboard`). |

## Davranış

- **Locale Kaldırma**: Uygulamanın Intlayer yapılandırmasına dayanarak pathname'den yerel ayarı otomatik olarak algılamak ve kaldırmak için arka planda `getPathWithoutLocale` yardımcı programını kullanır.
- **Tepkisellik**: `popstate` olayını dinler. Kullanıcı tarayıcının geri/ileri düğmelerini kullanarak gezindiğinde veya `pushState`/`replaceState` çağrıldığında, hook döndürülen yolunu günceller.
- **SSR Yedeği**: Sunucuda (`window` tanımsız olduğunda), saf bir React bağlamında varsayılan olarak istek URL'sine erişimi olmadığı için varsayılan olarak `/` döndürür.

## İlgili Dokümantasyon

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md)
