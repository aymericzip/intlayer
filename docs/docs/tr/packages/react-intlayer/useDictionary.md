---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useDictionary Hook Dokümantasyonu | react-intlayer
description: React uygulamalarında Intlayer ile useDictionary hook'unun verimli kullanımı için tam rehber.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - yerelleştirme
  - i18n
  - sözlük
  - çeviri
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# React Entegrasyonu: `useDictionary` Hook Dokümantasyonu

Bu bölüm, React uygulamalarında görsel düzenleyici olmadan yerelleştirilmiş içeriği verimli bir şekilde yönetmek için `useDictionary` hook'unun kullanımına ilişkin detaylı rehberlik sağlar.

## Sunucu Entegrasyonu

`useDictionary` hook'unu `IntlayerProvider` dışında kullanıyorsanız, bileşeni işlerken yerel ayar açıkça parametre olarak sağlanmalıdır:

```tsx fileName="./ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Ek İpuçları

- **Tür Güvenliği**: Tür güvenliğini sağlamak için her zaman sözlüklerinizi tanımlamak üzere `Dictionary` kullanın.
- **Yerelleştirme Güncellemeleri**: İçeriği güncellerken, eksik çevirileri önlemek için tüm yerel ayarların tutarlı olduğundan emin olun.

Bu dokümantasyon, `useDictionary` hook'unun entegrasyonuna odaklanır, görsel düzenleyici işlevlerine güvenmeden yerelleştirilmiş içeriği yönetmek için akıcı bir yaklaşım sağlar.
