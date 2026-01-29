---
createdAt: 2025-09-07
updatedAt: 2025-12-30
title: Vite ve Preact i18n - Preact uygulamanızı nasıl çevirirsiniz – rehber 2026
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
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu ekle
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer kullanarak Vite ve Preact web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri kolayca yönetin**: Bileşen düzeyinde açıklayıcı sözlükler kullanarak.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **TypeScript desteği sağlayın**: Otomatik oluşturulan türlerle, otomatik tamamlama ve hata algılamayı iyileştirin.
- **Gelişmiş özelliklerden yararlanın**: Dinamik yerel ayar algılama ve değiştirme gibi.

---

## Vite ve Preact Uygulamasında Intlayer'ı Ayarlamak İçin Adım Adım Kılavuz

GitHub'daki [Uygulama Şablonu](https://github.com/aymericzip/intlayer-vite-preact-template)'na bakın.

### Adım 1: Bağımlılıkları Kurun

Gerekli paketleri npm kullanarak kurun:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), derleme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için temel paket.

- **preact-intlayer**

  Intlayer'ı Preact uygulamasına entegre eden paket. Preact uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar.

- **vite-intlayer**

  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisinin yanı sıra kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı içerir.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Varsayılan: varsayılan yerel ayar hariç tüm yerel ayarları önekle
    storage: ["cookie", "header"], // Varsayılan: yerel ayarı çerezde sakla ve başlıktan algıla
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
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Varsayılan: varsayılan yerel ayar hariç tüm yerel ayarları önekle
    storage: ["cookie", "header"], // Varsayılan: yerel ayarı çerezde sakla ve başlıktan algıla
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
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Varsayılan: varsayılan yerel ayar hariç tüm yerel ayarları önekle
    storage: ["cookie", "header"], // Varsayılan: yerel ayarı çerezde sakla ve başlıktan algıla
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'leri, yönlendirme modlarını, depolama seçeneklerini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin.

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

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri saklamak için içerik bildirimlerinizi oluşturun ve yönetin:

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
// import { h } from 'preact'; // .mjs içinde doğrudan JSX kullanıyorsanız gereklidir

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
// const { h } = require('preact'); // .cjs içinde doğrudan JSX kullanıyorsanız gereklidir

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
      es: "Haga clic en los logotipos de Vite ve Preact para obtener daha fazla bilgi",
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
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

> İçerik dosyanız TSX kodu içeriyorsa `import { h } from "preact";` içe aktarmanız gerekebilir veya JSX pragma'nızın Preact için doğru ayarlandığından emin olun.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Uygulamanız boyunca içerik sözlüklerinize erişin:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svg dosyanızın olduğunu varsayarsak
import viteLogo from "/vite.svg";
import "./app.css"; // CSS dosyanızın adının app.css olduğunu varsayarsak
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
      {/* Markdown içeriği */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML içeriği */}
      <div>{content.myHtmlContent}</div>

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

> İçeriğinizi `alt`, `title`, `href`, `aria-label` vb. gibi bir `string` niteliğinde kullanmak istiyorsanız, işlevin değerini çağırmalısınız:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Not: Preact'te `className` genellikle `class` olarak yazılır.

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md) bakın (`preact-intlayer` için API benzerdir).

### (İsteğe Bağlı) Adım 6: İçeriğinizin dilini değiştirin

İçeriğinizin dilini değiştirmek için `useLocale` kancası tarafından sağlanan `setLocale` işlevini kullanabilirsiniz. Bu işlev, uygulamanın yerel ayarını yapmanıza ve içeriği buna göre güncellemenize olanak tanır.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Dili İngilizce Olarak Değiştir
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
      Dili İngilizce Olarak Değiştir
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
      Dili İngilizce Olarak Değiştir
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` kancası hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) bakın (`preact-intlayer` için API benzerdir).

### (İsteğe Bağlı) Adım 7: Uygulamanıza yerelleştirilmiş yönlendirme ekleyin

Bu adımın amacı her dil için benzersiz rotalar oluşturmaktır. Bu, SEO ve SEO dostu URL'ler için faydalıdır.
Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Varsayılan olarak, rotalar varsayılan yerel ayar için önek almaz. Varsayılan yerel ayarı öneklemek istiyorsanız, yapılandırmanızda `routing.mode` seçeneğini `"prefix-all"` olarak ayarlayabilirsiniz. Daha fazla bilgi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

Uygulamanıza yerelleştirilmiş yönlendirme eklemek için, uygulamanızın rotalarını saran ve yerel ayar tabanlı yönlendirmeyi yöneten bir `LocaleRouter` bileşeni oluşturabilirsiniz. İşte [preact-iso](https://github.com/preactjs/preact-iso) kullanan bir örnek:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Yerel ayara özel rotalar ayarlayan bir yönlendirici bileşeni.
 * Gezinmeyi yönetmek ve yerelleştirilmiş bileşenleri işlemek için preact-iso kullanır.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * Yerel ayara özel rotalar ayarlayan bir yönlendirici bileşeni.
 * Gezinmeyi yönetmek ve yerelleştirilmiş bileşenleri işlemek için preact-iso kullanır.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * Yerel ayara özel rotalar ayarlayan bir yönlendirici bileşeni.
 * Gezinmeyi yönetmek ve yerelleştirilmiş bileşenleri işlemek için preact-iso kullanır.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

Ardından, `LocaleRouter` bileşenini uygulamanızda kullanabilirsiniz:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... AppContent bileşeniniz

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContent bileşeniniz

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContent bileşeniniz

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (İsteğe Bağlı) Adım 8: Yerel ayar değiştiğinde URL'yi değiştirin

Yerel ayar değiştiğinde URL'yi değiştirmek için `useLocale` kancası tarafından sağlanan `onLocaleChange` prop'unu kullanabilirsiniz. Paralel olarak, URL yolunu güncellemek için `preact-iso`'nun `useLocation` içindeki `route` yöntemini kullanabilirsiniz.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // Güncellenmiş yerel ayar ile URL'yi oluşturun
      // Örnek: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // URL yolunu güncelleyin
      route(pathWithLocale, true); // true, değiştirme (replace) içindir
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Yerel ayar ayarlandıktan sonra programatik gezinme onLocaleChange tarafından işlenecektir
            }}
            key={localeItem}
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi Yerel Ayarında Dil - örn. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut Yerel Ayarda Dil - örn. Mevcut yerel ayar Locales.SPANISH olarak ayarlandığında Francés */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce Dil - örn. French */}
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
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> Belge referansları:
>
> > - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) (API `preact-intlayer` için benzerdir)> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` niteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=tr)> - [`lang` niteliği](https://developer.mozilla.org/tr/docs/Web/HTML/Global_attributes/lang)> - [`dir` niteliği](https://developer.mozilla.org/tr/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` niteliği](https://developer.mozilla.org/tr/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/tr/docs/Web/API/Popover_API)

### (İsteğe Bağlı) Adım 9: HTML Dil ve Yön Niteliklerini Değiştirin

Uygulamanız birden fazla dili desteklediğinde, `<html>` etiketinin `lang` ve `dir` niteliklerini mevcut yerel ayara uyacak şekilde güncellemek çok önemlidir. Bunu yapmak şunları sağlar:

- **Erişilebilirlik**: Ekran okuyucular ve yardımcı teknolojiler, içeriği doğru şekilde telaffuz etmek ve yorumlamak için doğru `lang` niteliğine güvenir.
- **Metin İşleme**: `dir` (yön) niteliği, metnin doğru sırada işlenmesini sağlar (örneğin, İngilizce için soldan sağa, Arapça veya İbranice için sağdan sola), bu da okunabilirlik için gereklidir.
- **SEO**: Arama motorları sayfanızın dilini belirlemek için `lang` niteliğini kullanır ve arama sonuçlarında doğru yerelleştirilmiş içeriğin sunulmasına yardımcı olur.

Yerel ayar değiştiğinde bu nitelikleri dinamik olarak güncelleyerek, desteklenen tüm dillerdeki kullanıcılar için tutarlı ve erişilebilir bir deneyim garanti edersiniz.

#### Kancayı Uygulama

HTML niteliklerini yönetmek için özel bir kanca oluşturun. Kanca, yerel ayar değişikliklerini dinler ve nitelikleri buna göre günceller:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Mevcut yerel ayara göre HTML <html> öğesinin `lang` ve `dir` niteliklerini günceller.
 * - `lang`: Tarayıcılara ve arama motorlarına sayfanın dilini bildirir.
 * - `dir`: Doğru okuma sırasını sağlar (örneğin, İngilizce için 'ltr', Arapça için 'rtl').
 *
 * Bu dinamik güncelleme, doğru metin işleme, erişilebilirlik ve SEO için gereklidir.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Dil niteliğini mevcut yerel ayara göre güncelleyin.
    document.documentElement.lang = locale;

    // Metin yönünü mevcut yerel ayara göre ayarlayın.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Mevcut yerel ayara göre HTML <html> öğesinin `lang` ve `dir` niteliklerini günceller.
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
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Mevcut yerel ayara göre HTML <html> öğesinin `lang` ve `dir` niteliklerini günceller.
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

Kancayı ana bileşeninize entegre edin, böylece yerel ayar her değiştiğinde HTML nitelikleri güncellenir:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContent'in ihtiyacı varsa useIntlayer zaten içe aktarılmıştır
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 5. Adımdaki AppContent tanımı

const AppWithHooks: FunctionalComponent = () => {
  // Yerel ayara göre <html> etiketinin lang ve dir niteliklerini güncellemek için kancayı uygulayın.
  useI18nHTMLAttributes();

  // AppContent'in 5. Adımdaki ana içerik görüntüleme bileşeniniz olduğunu varsayarsak
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
// 5. Adımdaki AppContent tanımı

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
// 5. Adımdaki AppContent tanımı

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

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Bileşeni Oluşturma

Uygulamanızın gezinmesinin mevcut yerel ayara saygı göstermesini sağlamak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'lerin önüne otomatik olarak mevcut dili ekler.

Bu davranış birkaç nedenden dolayı yararlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dile özgü sayfaları doğru şekilde dizine eklemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız genelinde yerelleştirilmiş bir bağlantı kullanarak, gezinmenin mevcut yerel ayar içinde kalmasını garanti eder ve beklenmedik dil değişikliklerini önlersiniz.
- **Bakım Kolaylığı**: Yerelleştirme mantığını tek bir bileşende merkezileştirmek URL'lerin yönetimini basitleştirir.

Aşağıda Preact'te yerelleştirilmiş bir `Link` bileşeninin uygulaması bulunmaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Belirli bir URL'nin harici olup olmadığını kontrol eden yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa, harici kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * Belirli bir URL'nin harici olup olmadığını kontrol eden yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa, harici kabul edilir.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * Belirli bir URL'nin harici olup olmadığını kontrol eden yardımcı işlev.
 * URL http:// veya https:// ile başlıyorsa, harici kabul edilir.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href niteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanır (örneğin, /fr/about).
 * Bu, gezinmenin aynı yerel ayar bağlamında kalmasını sağlar.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:  
  Yardımcı işlev `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar yerelleştirme gerektirmediği için değiştirilmeden bırakılır.
- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).
- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar (yani harici olmayanlar) için, URL'nin önüne mevcut yerel ayarı otomatik olarak eklemek için `getLocalizedUrl` kullanılır. Bu, kullanıcınız Fransızca ise, `/about` u `href` olarak geçirmenin onu `/fr/about` a dönüştüreceği anlamına gelir.
- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL ile bir `<a>` öğesi döndürür ve gezinmenin yerel ayar ile tutarlı olmasını sağlar.

### (İsteğe Bağlı) Adım 11: Markdown ve HTML İşleme

Intlayer, Preact'te Markdown ve HTML içeriğinin işlenmesini destekler.

`.use()` yöntemini kullanarak Markdown ve HTML içeriğinin işlenmesini özelleştirebilirsiniz. Bu yöntem, belirli etiketlerin varsayılan işlenmesini geçersiz kılmanıza olanak tanır.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* Temel işleme */}
    {myMarkdownContent}

    {/* Markdown için özel işleme */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML için temel işleme */}
    {myHtmlContent}

    {/* HTML için özel işleme */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### TypeScript'i Yapılandırın

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletmesini kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

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

> `tsconfig.json` dosyanızın Preact için ayarlandığından emin olun, özellikle `jsx` ve `jsxImportSource` veya `preset-vite` varsayılanlarını kullanmıyorsanız eski Preact sürümleri için `jsxFactory`/`jsxFragmentFactory`.

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deponuza göndermenizi önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazla İlerleme

Daha fazla ilerlemek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışa aktarabilirsiniz.

---
