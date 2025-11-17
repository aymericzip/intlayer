---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Vite and Preact uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Vite ve Preact web sitenizi çok dilli hale getirmeyi öğrenin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Vite and Preact çevirin | Uluslararasılaştırma (i18n)

> Bu paket geliştirme aşamasındadır. Daha fazla bilgi için [sorunu](https://github.com/aymericzip/intlayer/issues/118) inceleyin. Preact için Intlayer'a ilgi göstermek için sorunu beğenin

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-vite-preact-template)'na bakın.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde açıklayıcı sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**, böylece otomatik tamamlama ve hata algılama iyileşir.
- **Dinamik yerel ayar algılama ve anahtarlama gibi gelişmiş özelliklerden yararlanın**.

---

## Vite ve Preact Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Kurma

Gerekli paketleri npm kullanarak kurun:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **preact-intlayer**
  Preact uygulamasıyla Intlayer'ı entegre eden paket. Preact uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar.

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
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Vite ile Intlayer'ı entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Ayrıca Intlayer ortam değişkenlerini Vite uygulaması içinde tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildiriminizi oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // JSX'i doğrudan .mjs'de kullanıyorsanız gerekli

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // JSX'i doğrudan .cjs'de kullanıyorsanız gerekli

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite ve Preact para obtener más información"
      }
    }
  }
}
```

> İçerik bildiriminiz uygulamanızın herhangi bir yerine yerleştirilebilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak `./src`). Ve içerik bildirimi dosya uzantısı ile eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

> İçerik dosyanız TSX kodu içeriyorsa, `import { h } from "preact";`'ı içe aktarmanız gerekebilir veya JSX pragma'nızın Preact için doğru şekilde ayarlandığından emin olun.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Uygulamanız boyunca içerik sözlüklerinize erişin:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svg'niz olduğunu varsayalım
import viteLogo from "/vite.svg";
import "./app.css"; // CSS dosyanızın app.css olarak adlandırıldığını varsayalım
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> Not: Preact'te `className` genellikle `class` olarak yazılır.

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md) bakın (API `preact-intlayer` için benzer).

### (İsteğe Bağlı) Adım 6: İçeriğinizin Dilini Değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` kancasından sağlanan `setLocale` işlevini kullanabilirsiniz. Bu işlev uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize olanak tanır.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce'ye Değiştir
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın (API `preact-intlayer` için benzer).

### (İsteğe Bağlı) Adım 7: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Bu adımın amacı, her dil için benzersiz rotalar oluşturmaktır. Bu, SEO ve SEO dostu URL'ler için kullanışlıdır.
Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Varsayılan olarak, rotalar varsayılan yerel ayar için öneklenmez. Varsayılan yerel ayarı öneklemek istiyorsanız, yapılandırmanızda `middleware.prefixDefault` seçeneğini `true` olarak ayarlayabilirsiniz. Daha fazla bilgi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

Uygulamanıza yerelleştirilmiş yönlendirme eklemek için, uygulamanızın rotalarını saran ve yerel ayar tabanlı yönlendirmeyi yöneten bir `LocaleRouter` bileşeni oluşturabilirsiniz. [preact-iso](https://github.com/preactjs/preact-iso) kullanarak bir örnek aşağıda verilmiştir:

Öncelikle `preact-iso`'yu kurun:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

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
          (loc) => loc.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * preact-iso'yu kullanarak gezinmeyi yönetir ve yerelleştirilmiş bileşenleri işler.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Gerekli bağımlılıkları ve işlevleri içe aktar
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // JSX için gerekli

// Intlayer'dan yapılandırmayı çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

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
          (loc) => loc.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * preact-iso'yu kullanarak gezinmeyi yönetir ve yerelleştirilmiş bileşenleri işler.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Gerekli bağımlılıkları ve işlevleri içe aktar
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // JSX için gerekli

// Intlayer'dan yapılandırmayı çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Yerelleştirme ve uygun yerel ayar bağlamıyla çocukları saran bir bileşen.
 * URL tabanlı yerel ayar algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

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
          (loc) => loc.toString() !== defaultLocale.toString() // Varsayılan yerel ayarı hariç tut
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Yerel ayar özel rotaları ayarlayan bir yönlendirici bileşen.
 * preact-iso'yu kullanarak gezinmeyi yönetir ve yerelleştirilmiş bileşenleri işler.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Ardından, `LocaleRouter` bileşenini uygulamanızda kullanabilirsiniz:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... AppContent bileşeniniz (5. Adımda tanımlandı)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... AppContent bileşeniniz (5. Adımda tanımlandı)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </AppContent>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... AppContent bileşeniniz (5. Adımda tanımlandı)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Paralel olarak, uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiç yerel ayar belirtilmezse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiç yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirir.

> Not: Üretimde `intlayerProxy`'i kullanmak için `vite-intlayer` paketini `devDependencies`'den `dependencies`'e taşımalısınız.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (İsteğe Bağlı) Adım 8: Yerel ayar değiştiğinde URL'yi değiştirin

Yerel ayar değiştiğinde URL'yi değiştirmek için `useLocale` kancasından sağlanan `onLocaleChange` prop'unu kullanabilirsiniz. Paralel olarak, URL yolunu güncellemek için `useLocation` ve `route`'u `preact-iso`'dan kullanabilirsiniz.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso tam url sağlar
      // Güncellenmiş yerel ayar ile URL'yi oluştur
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // URL yolunu güncelle
      route(pathWithLocale, true); // true için değiştir
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Yerel ayar ayarlandıktan sonra programatik navigasyon onLocaleChange tarafından işlenecek
            }}
            key={localeItem}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarındaki dil - örn. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Geçerli yerel ayar set edildiğinde İspanyolca olarak Fransızca - örn. Francés */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // JSX için

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // JSX için

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Dokümantasyon referansları:
>
> > - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) (API `preact-intlayer` için benzer)> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` niteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [`lang` niteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)> - [`dir` niteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` niteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

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
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer";
const { getHTMLTextDir } = require("intlayer");

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Uygulamanızda Kancayı Kullanma

Yerel ayar değiştiğinde HTML niteliklerinin güncellenmesi için kancayı ana bileşeninizde entegre edin:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContent için useIntlayer zaten içe aktarılmışsa
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// AppContent tanımı 5. Adımdan

const AppWithHooks: FunctionalComponent = () => {
  // Kancayı kullanarak yerel ayara göre <html> etiketinin lang ve dir niteliklerini güncelle
  useI18nHTMLAttributes();

  // AppContent, 5. Adımdan ana içerik görüntüleme bileşeniniz olduğunu varsayalım
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// AppContent tanımı 5. Adımdan

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// AppContent tanımı 5. Adımdan

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Bu değişiklikleri uygulayarak uygulamanız şunları sağlayacak:

- **Dil** (`lang`) niteliği, SEO ve tarayıcı davranışı için geçerli yerel ayarı doğru şekilde yansıtacak.
- **Metin yönü** (`dir`) niteliği, farklı okuma sıralarına sahip diller için okunabilirliği ve kullanılabilirliği geliştirecek.
- Daha **erişilebilir** bir deneyim sağlayacak, çünkü yardımcı teknolojiler bu niteliklere optimum şekilde çalışmak için güvenir.

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Bileşeni Oluşturun

Uygulamanızın navigasyonu geçerli yerel ayarı saygı gösterdiğinden emin olmak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen dahili URL'leri otomatik olarak geçerli dille önekler.

Bu davranış çeşitli nedenlerle kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun aynı yerel ayar bağlamında kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL mantığını tek bir bileşende merkezileştirmek, yönetimini basitleştirir.

Preact ile `preact-iso` için, navigasyon için genellikle standart `<a>` etiketleri kullanılır ve `preact-iso` yönlendirmeyi yönetir. Tıklama üzerine programatik navigasyon yapmak istiyorsanız (örneğin, gezinmeden önce eylemler gerçekleştirmek için), `useLocation`'dan `route` işlevini kullanabilirsiniz. İşte `preact-iso`'nun `route` işlevini kullanarak (doğrudan içe aktararak veya `useLocation` aracılığıyla) URL'leri yerelleştiren özel bir anchor bileşeni:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // preact-intlayer'dan re-export edilmişse useLocation ve route; aksi takdirde doğrudan içe aktar
// Re-export edilmediyse, doğrudan içe aktar: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // HTMLAttributes için
import { forwardRef } from "preact/compat"; // Ref'leri iletmek için

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // İsteğe bağlı: geçmiş durumunu değiştir
}

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
 * Standart <a> etiketi kullanır ancak preact-iso'nun `route` ile istemci tarafı navigasyon tetikleyebilir.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // preact-iso'dan
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // href'nin tanımlandığından emin ol
        event.button === 0 && // Sol tıklama
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Standart değiştirici kontrolü
        !props.target // Yeni sekme/pencere hedeflenmiyor
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // URL farklıysa sadece gezin
          route(hrefI18n, replace); // preact-iso'nun route'unu kullan
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // preact-iso'dan içe aktar
import { forwardRef } from "preact/compat";
import { h } from "preact"; // JSX için

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // preact-iso'dan içe aktar
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // JSX için

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:
  Yardımcı işlev `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar değişmeden bırakılır.
- **Geçerli Yerel Ayarı Alma**:
  `useLocale` kancası geçerli yerel ayarı sağlar.
- **URL'yi Yerelleştirme**:
  Dahili bağlantılar için `getLocalizedUrl`, URL'yi geçerli yerel ayar ile önekler.
- **İstemci Tarafı Navigasyon**:
  `handleClick` işlevi, standart navigasyonun engellenip engellenmeyeceğini kontrol eder. Öyleyse, `useLocation` aracılığıyla veya doğrudan içe aktarılarak elde edilen preact-iso'nun `route` işlevini kullanarak istemci tarafı navigasyon gerçekleştirir. Bu, tam sayfa yeniden yüklemesi olmadan SPA benzeri davranış sağlar.
- **Bağlantıyı Döndürme**:
  Bileşen, yerelleştirilmiş URL ve özel tıklama işleyicisi ile bir `<a>` etiketi döndürür.

### TypeScript Yapılandırın

Intlayer, modül genişletmesi kullanarak TypeScript avantajlarından yararlanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik oluşturulan türleri TypeScript yapılandırmanıza dahil edin.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+ için önerilir
    // ...
  },
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

> Preact için `tsconfig.json`'unuzu ayarladığınızdan emin olun, özellikle `jsx` ve `jsxImportSource` veya eski Preact sürümleri için `jsxFactory`/`jsxFragmentFactory` yoksa `preset-vite`'nin varsayılanlarını kullanın.

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
