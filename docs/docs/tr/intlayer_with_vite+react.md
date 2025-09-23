---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Vite + React'ta Intlayer ile Başlarken
description: Intlayer kullanarak Vite ve React uygulamanıza i18n eklemeyi öğrenin. Bu kılavuzu takip ederek uygulamanızı çok dilli hale getirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Vite ve React ile Intlayer kullanarak uluslararasılaştırma (i18n) başlangıç kılavuzu

<iframe title="Vite ve React için en iyi i18n çözümü? Intlayer'ı keşfedin" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-vite-react-template)'na bakın.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde açıklayıcı sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**, böylece otomatik tamamlama ve hata algılama iyileşir.
- **Dinamik yerel ayar algılama ve anahtarlama gibi gelişmiş özelliklerden yararlanın**.

---

## Vite ve React Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Kurma

Gerekli paketleri npm kullanarak kurun:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **react-intlayer**
  React uygulamasıyla Intlayer'ı entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar.

- **vite-intlayer**
  [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesi yapmak için middleware'i içerir.

### Adım 2: Projenizi Yapılandırma

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, middleware yönlendirmesini, çerez adlarını, içerik bildiriminizin konumunu ve uzantısını, Intlayer günlüklerini konsolda devre dışı bırakmayı ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Etme

Vite yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = "@vitejs/plugin-react-swc";
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Vite ile Intlayer'ı entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Ayrıca Intlayer ortam değişkenlerini Vite uygulaması içinde tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildiriminizi oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // React düğümünü içeriğinizde kullanıyorsanız React'i içe aktarmayı unutmayın
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // React düğümünü içeriğinizde kullanıyorsanız React'i içe aktarmayı unutmayın
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite ve React para obtener más bilgi",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite ve React para obtener más bilgi"
      }
    }
  }
}
```

> İçerik bildiriminiz uygulamanızın herhangi bir yerine yerleştirilebilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak `./src`). Ve içerik bildirimi dosya uzantısı ile eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md) bakın.

> İçerik dosyanız TSX kodu içeriyorsa, `import React from "react";`'ı içerik dosyanıza dahil etmeyi düşünün.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Uygulamanız boyunca içerik sözlüklerinize erişin:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> İçeriğinizi bir `string` niteliğinde kullanmak istediğinizde, `alt`, `title`, `href`, `aria-label` vb. gibi, işlevin değerini çağırmanız gerekir:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md) bakın.

### (İsteğe Bağlı) Adım 6: İçeriğinizin Dilini Değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` kancasından sağlanan `setLocale` işlevini kullanabilirsiniz. Bu işlev uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize olanak tanır.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};
```

> `useLocale` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

### (İsteğe Bağlı) Adım 7: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Bu adımın amacı, her dil için benzersiz rotalar oluşturmaktır. Bu, SEO ve SEO dostu URL'ler için kullanışlıdır.
Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Varsayılan olarak, rotalar varsayılan yerel ayar için öneklenmez. Varsayılan yerel ayarı öneklemek istiyorsanız, yapılandırmanızda `middleware.prefixDefault` seçeneğini `true` olarak ayarlayabilirsiniz. Daha fazla bilgi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

Uygulamanıza yerelleştirilmiş yönlendirme eklemek için, uygulamanızın rotalarını saran ve yerel ayar tabanlı yönlendirmeyi yöneten bir `LocaleRouter` bileşeni oluşturabilirsiniz. [React Router](https://reactrouter.com/home) kullanarak bir örnek aşağıda verilmiştir:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Gerekli bağımlılıkları ve işlevleri içe aktar
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Intlayer'dan yardımcı işlevler ve türler
import type { FC, PropsWithChildren } from "react"; // React türleri işlevsel bileşenler ve props için
import { IntlayerProvider } from "react-intlayer"; // Uluslararasılaştırma bağlam sağlayıcısı
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Navigasyonu yönetmek için yönlendirici bileşenleri

// Intlayer'dan yapılandırmayı çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel ayar önekini kaldır
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Geçerli URL yolu
  );

  /**
   * middleware.prefixDefault true ise, varsayılan yerel ayar her zaman öneklenmelidir.
   */
  if (middleware.prefixDefault) {
    // Yerel ayarı doğrula
    if (!locale || !locales.includes(locale)) {
      // Güncellenmiş yol ile varsayılan yerel ayara yönlendir
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Geçerli geçmiş girişini yenisiyle değiştir
        />
      );
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault false olduğunda, varsayılan yerel ayar öneklenmez.
     * Geçerli yerel ayar geçerli olduğundan ve varsayılan yerel ayar olmadığından emin ol.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
        )
        .includes(currentLocale) // Geçerli yerel ayar geçerli yerel ayarlar listesinde mi kontrol et
    ) {
      // Yerel ayar öneki olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * React Router kullanarak navigasyonu yönetir ve yerelleştirilmiş bileşenleri işler.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Yerel ayarı yakalayan rota deseni (örneğin, /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Yerel ayar yönetimiyle çocukları sar
          />
        ))}

      {
        // Varsayılan yerel ayar öneki devre dışı bırakılmışsa, kök yolda çocukları doğrudan işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Yerel ayar yönetimiyle çocukları sar
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Gerekli bağımlılıkları ve işlevleri içe aktar
import { configuration, getPathWithoutLocale } from "intlayer"; // Intlayer'dan yardımcı işlevler ve türler
// Intlayer'dan yardımcı işlevler ve türler
import { IntlayerProvider } from "react-intlayer"; // Uluslararasılaştırma bağlam sağlayıcısı
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Navigasyonu yönetmek için yönlendirici bileşenleri

// Intlayer'dan yapılandırmayı çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel ayar önekini kaldır
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Geçerli URL yolu
  );

  /**
   * middleware.prefixDefault true ise, varsayılan yerel ayar her zaman öneklenmelidir.
   */
  if (middleware.prefixDefault) {
    // Yerel ayarı doğrula
    if (!locale || !locales.includes(locale)) {
      // Güncellenmiş yol ile varsayılan yerel ayara yönlendir
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Geçerli geçmiş girişini yenisiyle değiştir
        />
      );
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault false olduğunda, varsayılan yerel ayar öneklenmez.
     * Geçerli yerel ayar geçerli olduğundan ve varsayılan yerel ayar olmadığından emin ol.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
        )
        .includes(currentLocale) // Geçerli yerel ayar geçerli yerel ayarlar listesinde mi kontrol et
    ) {
      // Yerel ayar öneki olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * React Router kullanarak navigasyonu yönetir ve yerelleştirilmiş bileşenleri işler.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Yerel ayarı yakalayan rota deseni (örneğin, /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Yerel ayar yönetimiyle çocukları sar
          />
        ))}

      {
        // Varsayılan yerel ayar öneki devre dışı bırakılmışsa, kök yolda çocukları doğrudan işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Yerel ayar yönetimiyle çocukları sar
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Gerekli bağımlılıkları ve işlevleri içe aktar
const { configuration, getPathWithoutLocale } = require("intlayer"); // Intlayer'dan yardımcı işlevler ve türler
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Uluslararasılaştırma bağlam sağlayıcısı
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Navigasyonu yönetmek için yönlendirici bileşenleri

// Intlayer'dan yapılandırmayı çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel ayar önekini kaldır
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Geçerli URL yolu
  );

  /**
   * middleware.prefixDefault true ise, varsayılan yerel ayar her zaman öneklenmelidir.
   */
  if (middleware.prefixDefault) {
    // Yerel ayarı doğrula
    if (!locale || !locales.includes(locale)) {
      // Güncellenmiş yol ile varsayılan yerel ayara yönlendir
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Geçerli geçmiş girişini yenisiyle değiştir
        />
      );
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault false olduğunda, varsayılan yerel ayar öneklenmez.
     * Geçerli yerel ayar geçerli olduğundan ve varsayılan yerel ayar olmadığından emin ol.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
        )
        .includes(currentLocale) // Geçerli yerel ayar geçerli yerel ayarlar listesinde mi kontrol et
    ) {
      // Yerel ayar öneki olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Geçerli yerel ayarı ayarlayarak çocukları IntlayerProvider ile sar
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * React Router kullanarak navigasyonu yönetir ve yerelleştirilmiş bileşenleri işler.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Yerel ayarı yakalayan rota deseni (örneğin, /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Yerel ayar yönetimiyle çocukları sar
          />
        ))}

      {
        // Varsayılan yerel ayar öneki devre dışı bırakılmışsa, kök yolda çocukları doğrudan işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Yerel ayar yönetimiyle çocukları sar
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Ardından, `LocaleRouter` bileşenini uygulamanızda kullanabilirsiniz:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... AppContent bileşeniniz

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContent bileşeniniz

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContent bileşeniniz

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

Paralel olarak, uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerMiddlewarePlugin`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiç yerel ayar belirtilmezse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiç yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirir.

> Not: Üretimde `intlayerMiddlewarePlugin`'i kullanmak için `vite-intlayer` paketini `devDependencies`'den `dependencies`'e taşımalısınız.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = "@vitejs/plugin-react-swc";
const { intlayer, intlayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerMiddlewarePlugin()],
});
```

### (İsteğe Bağlı) Adım 8: Yerel ayar değiştiğinde URL'yi değiştirin

Yerel ayar değiştiğinde URL'yi değiştirmek için `useLocale` kancasından sağlanan `onLocaleChange` prop'unu kullanabilirsiniz. Paralel olarak, URL yolunu güncellemek için `useLocation` ve `useNavigate` kancalarını `react-router-dom`'dan kullanabilirsiniz.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al. Örnek: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Güncellenmiş yerel ayar ile URL'yi oluştur
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL yolunu güncelle
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde İspanyolca olarak Fransızca - örn. Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce olarak dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al. Örnek: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Güncellenmiş yerel ayar ile URL'yi oluştur
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL yolunu güncelle
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde İspanyolca olarak Fransızca - örn. Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce olarak dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al. Örnek: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Güncellenmiş yerel ayar ile URL'yi oluştur
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL yolunu güncelle
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde İspanyolca olarak Fransızca - örn. Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce olarak dil - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Dokümantasyon referansları:
>
> - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` niteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` niteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` niteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` niteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Aşağıda **güncellenmiş Adım 9** açıklamalar ve iyileştirilmiş kod örnekleriyle eklenmiştir:

---

### (İsteğe Bağlı) Adım 9: HTML Dil ve Yön Niteliklerini Değiştirin

Uygulamanız birden fazla dili desteklediğinde, geçerli yerel ayar ile eşleşmesi için `<html>` etiketinin `lang` ve `dir` niteliklerini güncellemek önemlidir. Bunu yapmak şunları sağlar:

- **Erişilebilirlik**: Ekran okuyucular ve yardımcı teknolojiler, içeriği doğru şekilde telaffuz etmek ve yorumlamak için doğru `lang` niteliğine güvenir.
- **Metin İşleme**: `dir` (yön) niteliği, metnin doğru sırada işlenmesini sağlar (örneğin, İngilizce için soldan sağa, Arapça veya İbranice için sağdan sola), okunabilirlik için gereklidir.
- **SEO**: Arama motorları, sayfanızın dilini belirlemek için `lang` niteliğini kullanır, arama sonuçlarında doğru yerelleştirilmiş içeriği sunmaya yardımcı olur.

Yerel ayar değiştiğinde bu nitelikleri dinamik olarak güncellemek, tüm desteklenen diller için tutarlı ve erişilebilir bir deneyim sağlar.

#### Kancayı Uygulama

Geçerli yerel ayara göre HTML niteliklerini yöneten özel bir kanca oluşturun. Kanca yerel ayar değişikliklerini dinler ve nitelikleri buna göre günceller:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Geçerli yerel ayara göre doğru okuma sırasını (örneğin, İngilizce için 'ltr', Arapça için 'rtl') sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Geçerli yerel ayara dil niteliğini ayarla
    document.documentElement.lang = locale;

    // Geçerli yerel ayara göre metin yönünü ayarla
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Geçerli yerel ayara göre doğru okuma sırasını (örneğin, İngilizce için 'ltr', Arapça için 'rtl') sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Geçerli yerel ayara dil niteliğini ayarla
    document.documentElement.lang = locale;

    // Geçerli yerel ayara göre metin yönünü ayarla
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer";
const { getHTMLTextDir } = require("intlayer");

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Geçerli yerel ayara göre doğru okuma sırasını (örneğin, İngilizce için 'ltr', Arapça için 'rtl') sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Geçerli yerel ayara dil niteliğini ayarla
    document.documentElement.lang = locale;

    // Geçerli yerel ayara göre metin yönünü ayarla
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Uygulamanızda Kancayı Kullanma

Yerel ayar değiştiğinde HTML niteliklerinin güncellenmesi için kancayı ana bileşeninizde entegre edin:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Kancayı kullanarak yerel ayara göre <html> etiketinin lang ve dir niteliklerini güncelle
  useI18nHTMLAttributes();

  // ... Rest of your component
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Kancayı kullanarak yerel ayara göre <html> etiketinin lang ve dir niteliklerini güncelle
  useI18nHTMLAttributes();

  // ... Rest of your component
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Kancayı kullanarak yerel ayara göre <html> etiketinin lang ve dir niteliklerini güncelle
  useI18nHTMLAttributes();

  // ... Rest of your component
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Bu değişiklikleri uygulayarak uygulamanız şunları sağlayacak:

- **Dil** (`lang`) niteliği, SEO ve tarayıcı davranışı için geçerli yerel ayarı doğru şekilde yansıtacak.
- **Metin yönü** (`dir`) niteliği, farklı okuma sıralarına sahip diller için okunabilirliği ve kullanılabilirliği geliştirecek.
- Daha **erişilebilir** bir deneyim sağlayacak, çünkü yardımcı teknolojiler bu niteliklere optimum şekilde çalışmak için güvenir.

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Bileşeni Oluşturun

Uygulamanızın navigasyonu geçerli yerel ayarı saygı gösterdiğinden emin olmak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen dahili URL'leri otomatik olarak geçerli dille önekler, böylece. Örneğin, bir Fransızca konuşan kullanıcı "Hakkında" sayfasına giden bir bağlantıya tıkladığında, `/about` yerine `/fr/about`'a yönlendirilir.

Bu davranış çeşitli nedenlerle kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun aynı yerel ayar bağlamında kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL mantığını tek bir bileşende merkezileştirmek, yönetimini basitleştirir, uygulamanız büyüdükçe kod tabanınızı daha kolay yönetilebilir hale getirir.

Aşağıda TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması verilmiştir:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Verilen URL'nin harici olup olmadığını belirleyen yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Geçerli yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Dahili bağlantıysa ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi al.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Verilen URL'nin harici olup olmadığını belirleyen yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Geçerli yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Dahili bağlantıysa ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi al.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Verilen URL'nin harici olup olmadığını belirleyen yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa harici olarak kabul edilir.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Geçerli yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Dahili bağlantıysa ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi al.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:
  Yardımcı işlev `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar değişmeden bırakılır çünkü yerelleştirmeye ihtiyaçları yoktur.

- **Geçerli Yerel Ayarı Alma**:
  `useLocale` kancası geçerli yerel ayarı sağlar (örneğin, `fr` Fransızca için).

- **URL'yi Yerelleştirme**:
  Dahili bağlantılar için (yani harici olmayan), `getLocalizedUrl`, URL'yi geçerli yerel ayar ile otomatik olarak önekler. Bu, `href` olarak `/about` geçildiğinde, kullanıcının Fransızca'da olduğu durumda `/fr/about`'a dönüştürülmesi anlamına gelir.

- **Bağlantıyı Döndürme**:
  Bileşen, yerelleştirilmiş URL ile bir `<a>` etiketi döndürür, böylece navigasyon yerel ayar ile tutarlı kalır.

Bu `Link` bileşenini uygulamanız boyunca entegre ederek, dil farkındalığı olan tutarlı bir kullanıcı deneyimi sağlar ve aynı zamanda iyileştirilmiş SEO ve kullanılabilirlik avantajlarından yararlanırsınız.

### TypeScript Yapılandırın

Intlayer, modül genişletmesi kullanarak TypeScript avantajlarından yararlanır.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Otomatik oluşturulan türleri TypeScript yapılandırmanıza dahil edin.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları Git deponuza kaydetmekten kaçınmak için bunları yok saymanız önerilir. Bu, bunları Git deponuza kaydetmekten kaçınmanıza olanak tanır.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyin:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı kurun.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantıyı kullanma hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazla İlerle

Daha fazla ilerlemek için [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak dışa aktarmayı uygulayabilirsiniz.

---

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
