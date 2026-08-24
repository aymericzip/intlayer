---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: useIntlayer Hook Dokümantasyonu | react-intlayer
description: react-intlayer paketi için useIntlayer hook'unun nasıl kullanılacağını görün
keywords:
  - useIntlayer
  - sözlük
  - anahtar
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# React Entegrasyonu: `useIntlayer` Hook Dokümantasyonu

Bu bölüm, React uygulamalarında içerik yerelleştirmesini etkinleştirmek için `useIntlayer` hook'unun nasıl kullanılacağına ilişkin detaylı rehberlik sağlar.

## React'te Örnek Kullanım

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Ek Kaynaklar

- **Intlayer Görsel Düzenleyici**: Daha sezgisel içerik yönetimi için görsel düzenleyici dokümantasyonuna [burada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) bakın.

Bu bölüm, React uygulamalarında `useIntlayer` hook'unun entegrasyonuna özel olarak odaklanır, yerelleştirme sürecini basitleştirir ve farklı yerel ayarlar arasında içerik tutarlılığını sağlar.
