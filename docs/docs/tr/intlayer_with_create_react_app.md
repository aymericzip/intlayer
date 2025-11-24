---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Create React App uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Create React App (CRA) web sitenizi çok dilli hale getirmeyi keşfedin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Create React App çevirin | Uluslararasılaştırma (i18n)

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-react-cra-template)'na bakın.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde bildirimsel sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**, otomatik tamamlama ve hata algılamayı iyileştirin.
- **Dinamik yerel algılama ve değiştirme gibi gelişmiş özelliklerden yararlanın**.

## React Uygulamasında Intlayer'ı Kurmak İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **react-intlayer**

  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve hook'lar sağlar.

- **react-scripts-intlayer**

  Create React App tabanlı uygulama ile Intlayer'ı entegre etmek için `react-scripts-intlayer` komutlarını ve eklentileri içerir. Bu eklentiler [craco](https://craco.js.org/) tabanlıdır ve [Webpack](https://webpack.js.org/) paketleyici için ek yapılandırma içerir.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı ayarlayabilir, Intlayer günlüklerini konsolda devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: Intlayer'ı CRA Yapılandırmanızda Entegre Edin

Betiklerinizi Intlayer kullanacak şekilde değiştirin

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer` betikleri [CRACO](https://craco.js.org/) tabanlıdır. Kendi kurulumunuzu CRACO'nun intlayer eklentisi temel alarak da uygulayabilirsiniz. [Örneğe buradan bakın](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          <code>src/App.tsx</code>'i düzenleyin ve kaydedin
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> İçerik bildirimleriniz uygulamanızda herhangi bir yerde tanımlanabilir, yeter ki `contentDir` dizinine dahil edilsinler (varsayılan olarak `./src`). Ve içerik bildirim dosyası uzantısıyla eşleşsinler (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

> Eğer içerik dosyanız TSX kodu içeriyorsa, içerik dosyanıza `import React from "react";` içe aktarmayı düşünün.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

İçerik sözlüklerinize uygulamanız genelinde erişin:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Not: Eğer içeriğinizi bir `string` özniteliğinde kullanmak istiyorsanız, `alt`, `title`, `href`, `aria-label` vb. gibi, fonksiyonun değerini çağırmanız gerekir:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` hook'u hakkında daha fazla bilgi için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md) bakın.

### (İsteğe Bağlı) Adım 6: İçeriğinizin Dilini Değiştirin

İçeriğinizin dilini değiştirmek için, `useLocale` hook'u tarafından sağlanan `setLocale` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize izin verir.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Dili İngilizce'ye değiştir
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Dili İngilizce'ye değiştir
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
    <button onClick={() => setLocale(Locales.English)}>
      Dili İngilizce'ye değiştir
    </button>
  );
};
```

> `useLocale` hook'u hakkında daha fazla bilgi için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

### (İsteğe Bağlı) Adım 7: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Bu adımın amacı, her dil için benzersiz rotalar oluşturmaktır. Bu, SEO ve SEO dostu URL'ler için yararlıdır.
Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Varsayılan olarak, rotalar varsayılan yerel ayar için öneklenmez. Varsayılan yerel ayarı öneklemek istiyorsanız, yapılandırmanızda `middleware.prefixDefault` seçeneğini `true` olarak ayarlayabilirsiniz. Daha fazla bilgi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

Uygulamanıza yerelleştirilmiş yönlendirme eklemek için, uygulamanızın rotalarını saran ve yerel tabanlı yönlendirmeyi işleyen bir `LocaleRouter` bileşeni oluşturabilirsiniz. [React Router](https://reactrouter.com/home) kullanarak bir örnek aşağıda verilmiştir:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Gerekli bağımlılıkları ve fonksiyonları içe aktar
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Intlayer'dan yardımcı fonksiyonlar ve türler
// Intlayer'dan yardımcı fonksiyonlar ve türler
import type { FC, PropsWithChildren } from "react"; // React fonksiyonel bileşenler ve prop türleri
import { IntlayerProvider } from "react-intlayer"; // Uluslararasılaştırma bağlam sağlayıcısı
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Navigasyon yönetimi için yönlendirici bileşenleri

// Yapılandırmayı Intlayer'dan çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirmeyi işleyen ve çocukları uygun yerel bağlamla saran bir bileşen.
 * URL tabanlı yerel algılama ve doğrulama yönetir.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel öneki kaldır
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
          replace // Geçerli geçmişi yeni olanla değiştir
        />
      );
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
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
      // Yerel önek olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayarlara özel rotalar ayarlayan bir yönlendirici bileşen.
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
            // Yerel ayarı yakalayan rota deseni (ör. /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Çocukları yerel yönetimle sar
          />
        ))}

      {
        // Varsayılan yerel ayar önekleme devre dışıysa, çocukları doğrudan kök yolda işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Çocukları yerel yönetimle sar
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Gerekli bağımlılıkları ve fonksiyonları içe aktar
import { configuration, getPathWithoutLocale } from "intlayer"; // Intlayer'dan yardımcı fonksiyonlar ve türler
// Intlayer'dan yardımcı fonksiyonlar ve türler
import { IntlayerProvider } from "react-intlayer"; // Uluslararasılaştırma bağlam sağlayıcısı
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Navigasyon yönetimi için yönlendirici bileşenleri

// Yapılandırmayı Intlayer'dan çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirmeyi işleyen ve çocukları uygun yerel bağlamla saran bir bileşen.
 * URL tabanlı yerel algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel öneki kaldır
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
          replace // Geçerli geçmişi yeni olanla değiştir
        />
      );
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
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
      // Yerel önek olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayarlara özel rotalar ayarlayan bir yönlendirici bileşen.
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
            // Yerel ayarı yakalayan rota deseni (ör. /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Çocukları yerel yönetimle sar
          />
        ))}

      {
        // Varsayılan yerel ayar önekleme devre dışıysa, çocukları doğrudan kök yolda işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Çocukları yerel yönetimle sar
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Gerekli bağımlılıkları ve fonksiyonları içe aktar
const { configuration, getPathWithoutLocale } = require("intlayer"); // Intlayer'dan yardımcı fonksiyonlar ve türler
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Uluslararasılaştırma bağlam sağlayıcısı
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Navigasyon yönetimi için yönlendirici bileşenleri

// Yapılandırmayı Intlayer'dan çıkar
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Yerelleştirmeyi işleyen ve çocukları uygun yerel bağlamla saran bir bileşen.
 * URL tabanlı yerel algılama ve doğrulama yönetir.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Geçerli URL yolunu al

  // Sağlanmadıysa varsayılan yerel ayara geri dön
  const currentLocale = locale ?? defaultLocale;

  // Temel bir yol oluşturmak için yoldan yerel öneki kaldır
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
          replace // Geçerli geçmişi yeni olanla değiştir
        />
      );
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
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
      // Yerel önek olmadan yola yönlendir
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Çocukları IntlayerProvider ile sar ve geçerli yerel ayarı ayarla
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Yerel ayarlara özel rotalar ayarlayan bir yönlendirici bileşen.
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
            // Yerel ayarı yakalayan rota deseni (ör. /en/, /fr/) ve sonraki tüm yolları eşleştir
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Çocukları yerel yönetimle sar
          />
        ))}

      {
        // Varsayılan yerel ayar önekleme devre dışıysa, çocukları doğrudan kök yolda işle
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Çocukları yerel yönetimle sar
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

### (İsteğe Bağlı) Adım 8: Yerel Ayar Değiştiğinde URL'yi Değiştirin

Yerel ayar değiştiğinde URL'yi değiştirmek için, `useLocale` hook'u tarafından sağlanan `onLocaleChange` prop'unu kullanabilirsiniz. Paralel olarak, URL yolunu güncellemek için `react-router-dom`'dan `useLocation` ve `useNavigate` hook'larını kullanabilirsiniz.

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
              {/* Geçerli yerel ayar set edildiğinde İspanyolca'da Francés - örn. */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'de dil - örn. French */}
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
              {/* Geçerli yerel ayar set edildiğinde İspanyolca'da Francés - örn. */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'de dil - örn. French */}
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
              {/* Geçerli yerel ayar set edildiğinde İspanyolca'da Francés - örn. */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce'de dil - örn. French */}
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
> - [`useLocale` hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (İsteğe Bağlı) Adım 9: HTML Dil ve Yön Özniteliklerini Değiştirin

Uygulamanız birden fazla dili desteklediğinde, `<html>` etiketinin `lang` ve `dir` özniteliklerini geçerli yerel ayarla eşleşecek şekilde güncellemek çok önemlidir.

Bunu otomatik olarak işlemek için bir hook oluşturabilirsiniz.

#### Hook'u Uygulama

HTML özniteliklerini yönetmek için özel bir hook oluşturun. Hook, yerel ayar değişikliklerini dinler ve öznitelikleri buna göre günceller:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` özniteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Arapça veya İbranice gibi diller için 'rtl' gibi doğru okuma sırasını sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Dil özniteliğini geçerli yerel ayara güncelle
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
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` özniteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Arapça veya İbranice gibi diller için 'rtl' gibi doğru okuma sırasını sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Dil özniteliğini geçerli yerel ayara güncelle
    document.documentElement.lang = locale;

    // Geçerli yerel ayara göre metin yönünü ayarla
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` özniteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Arapça veya İbranice gibi diller için 'rtl' gibi doğru okuma sırasını sağlar.
 *
 * Bu dinamik güncelleme, uygun metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Dil özniteliğini geçerli yerel ayara güncelle
    document.documentElement.lang = locale;

    // Geçerli yerel ayara göre metin yönünü ayarla
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Hook'u Uygulamanızda Kullanma

HTML özniteliklerinin yerel ayar her değiştiğinde güncellenmesi için hook'u ana bileşeninizde entegre edin:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Hook'u kullanarak yerel ayara göre <html> etiketinin lang ve dir özniteliklerini güncelleyin.
  useI18nHTMLAttributes();

  // ... Bileşeninizin geri kalanı
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
  // Hook'u kullanarak yerel ayara göre <html> etiketinin lang ve dir özniteliklerini güncelleyin.
  useI18nHTMLAttributes();

  // ... Bileşeninizin geri kalanı
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
  // Hook'u kullanarak yerel ayara göre <html> etiketinin lang ve dir özniteliklerini güncelleyin.
  useI18nHTMLAttributes();

  // ... Bileşeninizin geri kalanı
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Bu değişiklikleri uygulayarak, uygulamanız:

- **Dil** (`lang`) özniteliğinin SEO ve tarayıcı davranışı için doğru geçerli yerel ayarı yansıtmasını sağlar.
- **Metin yönü** (`dir`) özniteliğini yerel ayara göre ayarlar, Arapça veya İbranice gibi farklı okuma sırasına sahip diller için okunabilirliği geliştirir.
- Daha **erişilebilir** bir deneyim sağlar, çünkü yardımcı teknolojiler bu özniteliklere optimum şekilde çalışmak için güvenir.

### TypeScript'i Yapılandırın

Intlayer, kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır ve TypeScript avantajlarından yararlanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deponuza commit etmenizi önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha Fazla Gidin

Daha fazla gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.
