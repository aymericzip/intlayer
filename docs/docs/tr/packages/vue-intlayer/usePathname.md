---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Fonksiyon Dokümantasyonu | vue-intlayer
description: vue-intlayer paketinden usePathname fonksiyonunu nasıl kullanacağınızı öğrenin
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname yardımcı programı eklendi"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Geçmişi başlat"
author: aymericzip
---

# Vue Entegrasyonu: `usePathname` Dokümantasyonu

`usePathname` fonksiyonu, locale segmenti kaldırılmış mevcut tarayıcı pathname'ini bir Vue `ComputedRef<string>` olarak döndürür. Bu, locale önekini manuel olarak çıkarmak zorunda kalmadan, locale duyarlı bir navigasyon oluşturmak — örneğin, hangi nav öğesinin aktif olduğunu belirlemek — için faydalıdır.

## Vue'da `usePathname` İçe Aktarımı

```typescript
import { usePathname } from "vue-intlayer";
```

## Genel Bakış

`usePathname`, `window.location.pathname` okuyan, `getPathWithoutLocale` aracılığıyla locale önekini kaldıran ve tarayıcı her `popstate` olayı (geri/ileri gezinme) tetiklediğinde değerini güncelleyen bir Vue hesaplanmış referansı (computed ref) oluşturur. Bu değer doğrudan Vue şablonlarınızda veya setup fonksiyonlarınızda kullanılabilir.

## Kullanım

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Dönüş Değeri

| Tür                   | Açıklama                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Locale öneki olmadan geçerli tarayıcı pathname'ini içeren Vue Computed Ref nesnesi. |

## Davranış

- **Locale çıkarma**: Baştaki locale segmentini kaldırır (örn. `/tr/dashboard` → `/dashboard`).
- **Reaktif**: Her `popstate` olayında (tarayıcının geri / ileri gezinmesi) değeri günceller.
- **SSR güvenli**: `window` kullanılamadığında `""` döndürür.
- **Temizleme (Cleanup)**: `popstate` dinleyicisi başlatıldığında global olarak eklenir ve Vue'nun yaşam döngüsünü nasıl yönettiği sayesinde genellikle bileşen başına manuel temizlik gerektirmez.

## Örnek

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Kontrol Paneli" },
  { href: "/settings", label: "Ayarlar" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## İlgili

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vue-intlayer/useLocale.md) — mevcut locale + locale değiştirici
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getPathWithoutLocale.md) — bu hook tarafından kullanılan temel yardımcı program
