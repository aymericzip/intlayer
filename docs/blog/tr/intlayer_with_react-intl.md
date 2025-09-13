---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer ve react-intl
description: React uygulaması için Intlayer'ı react-intl ile entegre edin
keywords:
  - react-intl
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-intl
---

# React Uluslararasılaştırma (i18n) ile **react-intl** ve Intlayer

Bu rehber, React uygulamasında çevirileri yönetmek için **Intlayer**'ı **react-intl** ile nasıl entegre edeceğinizi gösterir. Çevrilebilir içeriğinizi Intlayer ile beyan edeceksiniz ve ardından bu mesajları **react-intl** ile tüketeceksiniz, [FormatJS](https://formatjs.io/docs/react-intl) ekosisteminden popüler bir kütüphane.

## Genel Bakış

- **Intlayer**, çevirileri projenizde **bileşen düzeyinde** içerik beyan dosyalarında (JSON, JS, TS vb.) saklamanıza izin verir.
- **react-intl**, yerelleştirilmiş dizeleri görüntülemek için React bileşenleri ve hook'lar ( `<FormattedMessage>` ve `useIntl()` gibi) sağlar.

Intlayer'ı çevirileri **react-intl–uyumlu** bir formatta **dışa aktarmak** için yapılandırarak, `<IntlProvider>` (react-intl'den) tarafından gereken mesaj dosyalarını otomatik olarak **oluşturabilir** ve **güncelleyebilirsiniz**.

---

## Neden Intlayer'ı react-intl ile Kullanmalı?

1. **Bileşen Başına Sözlükler**  
   Intlayer içerik beyan dosyaları React bileşenlerinizin yanında yaşayabilir, bileşenler taşındığında veya kaldırıldığında "yetim" çevirileri önler. Örneğin:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer içerik beyan
               └── index.tsx          # React bileşeni
   ```

2. **Merkezi Çeviriler**  
   Her içerik beyan dosyası bir bileşen tarafından ihtiyaç duyulan tüm çevirileri toplar. Bu, özellikle TypeScript projelerinde yardımcı olur: eksik çeviriler **derleme zamanında** yakalanabilir.

3. **Otomatik Oluşturma ve Yeniden Oluşturma**  
   Çeviri eklediğinizde veya güncellediğinizde, Intlayer mesaj JSON dosyalarını yeniden oluşturur. Bunları react-intl’in `<IntlProvider>`'ına geçebilirsiniz.

---

## Kurulum

Tipik bir React projesinde şunları yükleyin:

```bash
# npm ile
npm install intlayer react-intl

# yarn ile
yarn add intlayer react-intl

# pnpm ile
pnpm add intlayer react-intl
```

### Bu Paketler Neden?

- **intlayer**: İçerik beyanlarını tarar, birleştirir ve sözlük çıktılarını oluşturur.
- **react-intl**: FormatJS'ten ana kütüphane, `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` ve diğer uluslararasılaştırma primitiflerini sağlar.

> React'i henüz yüklemediyseniz, onu da yüklemeniz gerekir (`react` ve `react-dom`).

## react-intl Mesajlarını Dışa Aktarmak İçin Intlayer'ı Yapılandırma

Projenizin kökünde **`intlayer.config.ts`** (veya `.js`, `.mjs`, `.cjs`) oluşturun:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // İstediğiniz kadar yerel ekleyin
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer'a react-intl için mesaj dosyaları oluşturmasını söyler
    dictionaryOutput: ["react-intl"],

    // Intlayer'ın mesaj JSON dosyalarınızı yazacağı dizin
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Not**: Diğer dosya uzantıları için (`.mjs`, `.cjs`, `.js`), kullanım detayları için [Intlayer dokümantasyonuna](https://intlayer.org/en/doc/concept/configuration) bakın.

---

## Intlayer Sözlüklerinizi Oluşturma

Intlayer kod tabanınızı (varsayılan olarak `./src` altında) `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}` ile eşleşen dosyalar için tarar.  
**TypeScript** örneği burada:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" react-intl JSON dosyanızda üst düzey mesaj anahtarı olur
  key: "my-component",

  content: {
    // t() çağrısının her biri çevrilebilir bir alan beyan eder
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

JSON veya farklı JS türlerini tercih ederseniz (`.cjs`, `.mjs`), yapı büyük ölçüde aynıdır, bkz. [Intlayer içerik beyan dokümantasyonu](https://intlayer.org/en/doc/concept/content).

---

## react-intl Mesajlarını Oluşturma

**react-intl** için gerçek mesaj JSON dosyalarını oluşturmak için şunu çalıştırın:

```bash
# npm ile
npx intlayer dictionaries build

# yarn ile
yarn intlayer build

# pnpm ile
pnpm intlayer build
```

Bu, tüm `*.content.*` dosyalarını tarar, derler ve sonuçları **`intlayer.config.ts`**'inizde belirtilen dizine yazar, bu örnekte `./react-intl/messages`.  
Tipik bir çıktı şöyle görünebilir:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Her dosya, beyanlarınızın her **`content.key`**'ine karşılık gelen **üst düzey anahtarlara** sahip bir JSON nesnesidir. **Alt anahtarlar** ( `helloWorld` gibi) o içerik öğesi içinde beyan edilen çevirileri yansıtır.

Örneğin, **en.json** şöyle görünebilir:

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## React Uygulamanızda react-intl'i Başlatma

### 1. Oluşturulan Mesajları Yükleyin

Uygulamanızın kök bileşenini yapılandırdığınız yerde (örneğin, `src/main.tsx` veya `src/index.tsx`), şunları yapmanız gerekir:

1. **İçe aktarın** oluşturulan mesaj dosyalarını (statik olarak veya dinamik olarak).
2. **Sağlayın** bunları `react-intl`'den `<IntlProvider>`'a.

Basit bir yaklaşım onları **statik olarak** içe aktarmaktır:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Yapı çıktısından JSON dosyalarını içe aktarın.
// Alternatif olarak, kullanıcının seçtiği yerele göre dinamik olarak içe aktarabilirsiniz.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";



// Vite'nin import.meta.glob kullanarak tüm JSON dosyalarını dinamik olarak içe aktarın
const messages = import.meta.glob("../react-intl/messages/**/*.json", {
  eager: true,
});

// Mesajları yapılandırılmış bir kayda toplayın
const messagesRecord: Record<string, Record<string, any>> = {};

Object.entries(messages).forEach(([path, module]) => {
  // Dosya yolundan yerel ve ad alanını çıkarın
  const [, locale, namespace] = path.match(/messages\/(\w+)\/(.+?)\.json$/) ?? [];
  if (locale && namespace) {
    messagesRecord[locale] = messagesRecord[locale] ?? {};
    messagesRecord[locale][namespace] = module.default; // JSON içeriğini atayın
  }
});

// Her yerel için ad alanlarını birleştirin
const mergeMessages = (locale: string) =>
  Object.values(messagesRecord[locale] ?? {}).reduce(
    (acc, namespaceMessages) => ({ ...acc, ...namespaceMessages }),
    {}
  );

// Kullanıcının dilini algılamak için bir mekanizmanız varsa, burada ayarlayın.
// Basitlik için İngilizce'yi seçelim.
const locale = "en";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={mergeMessages(locale)}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **İpucu**: Gerçek projeler için şunları yapabilirsiniz:

> - JSON mesajlarını çalışma zamanında dinamik olarak yükleyin.
> - Ortama dayalı, tarayıcıya dayalı veya kullanıcı hesabına dayalı yerel algılama kullanın.

### 2. `<FormattedMessage>` veya `useIntl()` Kullanın

Mesajlarınız `<IntlProvider>`'a yüklendikten sonra, herhangi bir alt bileşen react-intl'i yerelleştirilmiş dizelere erişmek için kullanabilir. İki ana yaklaşım vardır:

- **`<FormattedMessage>`** bileşeni
- **`useIntl()`** hook'u

---

## React Bileşenlerinde Çevirileri Kullanma

### Yaklaşım A: `<FormattedMessage>`

Hızlı satır içi kullanım için:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” en.json, fr.json vb.'den anahtara başvurur */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> `<FormattedMessage>`'teki **`id`** prop'u **üst düzey anahtar** (`my-component`) artı herhangi bir alt anahtar (`helloWorld`) ile eşleşmelidir.

### Yaklaşım B: `useIntl()`

Daha dinamik kullanım için:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Her iki yaklaşım da geçerlidir, uygulamanıza uygun olanı seçin.

---

## Yeni Çeviriler Güncelleme veya Ekleme

1. Herhangi bir `*.content.*` dosyasında içeriği **ekleyin veya değiştirin**.
2. `./react-intl/messages` altında JSON dosyalarını yeniden oluşturmak için `intlayer build` komutunu yeniden çalıştırın.
3. React (ve react-intl) güncellemeleri bir sonraki yeniden oluşturma veya yeniden yükleme sırasında alacak.

---

## TypeScript Entegrasyonu (İsteğe Bağlı)

TypeScript kullanıyorsanız, Intlayer çevirileriniz için **tip tanımlarını oluşturabilir**.

- `tsconfig.json`'ınızın `"include"` dizisinde `types` klasörünüzü (veya Intlayer'ın oluşturduğu çıktı klasörünü) içerdiğinden emin olun.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Oluşturulan tipler, React bileşenlerinizde eksik çevirileri veya geçersiz anahtarları derleme zamanında algılamaya yardımcı olabilir.

---

## Git Yapılandırması

Intlayer'ın iç yapı eserlerini sürüm kontrolünden **hariç tutmak** yaygındır. `.gitignore` dosyanıza şunu ekleyin:

```plaintext
# Intlayer yapı eserlerini yoksay
.intlayer
react-intl
```

İş akışınıza bağlı olarak, `./react-intl/messages` içindeki son sözlükleri yoksayabilir veya commit edebilirsiniz. CI/CD boru hattınız onları yeniden oluşturuyorsa, güvenle yoksayabilirsiniz; aksi takdirde, üretim dağıtımları için ihtiyaç duyarsanız commit edin.
