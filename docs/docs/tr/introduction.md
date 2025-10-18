---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Giriş
description: Intlayer'ın nasıl çalıştığını keşfedin. Intlayer'ın uygulamanızda kullandığı adımları görün. Farklı paketlerin ne yaptığını görün.
keywords:
  - Introduction
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer Dokümantasyonu

Resmi Intlayer dokümantasyonuna hoş geldiniz! Burada, Next.js, React, Vite, Express veya başka bir JavaScript ortamında çalışıp çalışmadığınızdan bağımsız olarak, tüm uluslararasılaştırma (i18n) ihtiyaçlarınız için Intlayer'ı entegre etmek, yapılandırmak ve ustalaşmak için ihtiyacınız olan her şeyi bulacaksınız.

## Giriş

### Intlayer Nedir?

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir uluslararasılaştırma kütüphanesidir. Kodunuzun her yerinde içeriğinizi bildirmenize izin verir. Çok dilli içeriğin bildirimini kodunuzda kolayca entegre etmek için yapılandırılmış sözlüklere dönüştürür. TypeScript kullanarak, **Intlayer** geliştirmenizi daha güçlü ve verimli hale getirir.

Intlayer ayrıca içeriğinizi kolayca düzenlemenize ve yönetmenize olanak tanıyan isteğe bağlı bir görsel düzenleyici sağlar. Bu düzenleyici, içerik yönetimi için görsel bir arayüz tercih eden geliştiriciler veya kodla uğraşmadan içerik üreten ekipler için özellikle yararlıdır.

### Kullanım Örneği

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Ana Özellikler

Intlayer, modern web geliştirmenin ihtiyaçlarını karşılamak için çeşitli özellikler sunar. Aşağıda, her biri için ayrıntılı dokümantasyon bağlantılarıyla birlikte temel özellikler bulunmaktadır:

- **Uluslararasılaştırma Desteği**: Uygulamanızın küresel erişimini yerleşik uluslararasılaştırma desteğiyle artırın.
- **Görsel Düzenleyici**: Intlayer için tasarlanmış düzenleyici eklentileriyle geliştirme iş akışınızı iyileştirin. [Görsel Düzenleyici Rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)'ne göz atın.
- **Konfigürasyon Esnekliği**: Kapsamlı konfigürasyon seçenekleriyle kurulumunuzu özelleştirin. [Konfigürasyon Rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)'nde ayrıntıları bulun.
- **Gelişmiş CLI Araçları**: Intlayer'ın komut satırı arayüzünü kullanarak projelerinizi verimli bir şekilde yönetin. [CLI Araçları Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)'nda yetenekleri keşfedin.

## Temel Kavramlar

### Sözlük

Çok dilli içeriğinizi kodunuzun yakınında organize edin, böylece her şey tutarlı ve sürdürülebilir kalır.

- **[Başlarken](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)**  
  Intlayer'da içeriğinizi bildirmenin temellerini öğrenin.

- **[Çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)**  
  Çevirilerin uygulamanızda nasıl oluşturulduğunu, depolandığını ve kullanıldığını anlayın.

- **[Numaralandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)**  
  Çeşitli dillerde tekrarlanan veya sabit veri kümelerini kolayca yönetin.

- **[Koşul](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/conditional.md)**  
  Intlayer'da dinamik içerik oluşturmak için koşullu mantığı nasıl kullanacağınızı öğrenin.

- **[Ekleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)**
  Ekleme yer tutucuları kullanarak bir dizeye değer eklemeyi keşfedin.

- **[Fonksiyon Getirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)**  
  Projenizin iş akışına uyacak şekilde özel mantıkla içeriği dinamik olarak nasıl getireceğinizi görün.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)**  
  Zengin içerik oluşturmak için Intlayer'da Markdown'ı nasıl kullanacağınızı öğrenin.

- **[Dosya gömme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file_embeddings.md)**  
  İçerik düzenleyicide kullanmak için Intlayer'da harici dosyaları nasıl gömeceğinizi keşfedin.

- **[İç içe yerleştirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)**  
  Karmaşık yapılar oluşturmak için Intlayer'da içeriği nasıl iç içe yerleştireceğinizi anlayın.

### Ortamlar ve Entegrasyonlar

Intlayer'ı esneklik göz önünde bulundurarak oluşturduk, popüler çerçeveler ve yapı araçları arasında sorunsuz entegrasyon sunuyoruz:

- **[Intlayer ile Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)**
- **[Intlayer ile Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)**
- **[Intlayer ile Next.js Sayfa Yönlendirici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)**
- **[Intlayer ile React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)**
- **[Intlayer ile Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)**
- **[Intlayer ile React Native ve Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md)**
- **[Intlayer ile Lynx ve React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md)**
- **[Intlayer ile Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md)**

Her entegrasyon rehberi, **sunucu tarafında işleme**, **dinamik yönlendirme** veya **istemci tarafında işleme** gibi Intlayer özelliklerini kullanmak için en iyi uygulamaları içerir, böylece hızlı, SEO dostu ve yüksek düzeyde ölçeklenebilir bir uygulama koruyabilirsiniz.

## Katkıda Bulunma ve Geri Bildirim

Açık kaynak ve topluluk odaklı geliştirmenin gücüne değer veriyoruz. Belgelerimizde iyileştirmeler önermek, yeni bir rehber eklemek veya herhangi bir sorunu düzeltmek isterseniz, [GitHub deposumuzda](https://github.com/aymericzip/intlayer/blob/main/docs/docs) bir Pull Request gönderin veya bir sorun açın.

**Uygulamanızı daha hızlı ve verimli bir şekilde çevirmeye hazır mısınız?** Bugün Intlayer'ı kullanmaya başlamak için belgelerimize dalın. İçeriğinizi organize tutan ve ekibinizi daha üretken kılan sağlam, akıcı bir uluslararasılaştırma yaklaşımı deneyimleyin.

---
