---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: React Router v7'de Intlayer ile Başlarken
description: Intlayer kullanarak React Router v7 uygulamanıza uluslararasılaştırma (i18n) eklemeyi öğrenin. Yerel ayar bilincine sahip yönlendirme ile uygulamanızı çok dilli hale getirmek için bu kapsamlı kılavuzu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Yerel Yönlendirme
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Intlayer ve React Router v7 ile uluslararasılaştırma (i18n) başlangıç kılavuzu

Bu kılavuz, React Router v7 projelerinde yerel ayar bilincine sahip yönlendirme, TypeScript desteği ve modern geliştirme uygulamaları ile **Intlayer**'ı sorunsuz bir şekilde entegre etmeyi gösterir.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde bildirimsel sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik tamamlama ve hata algılama ile TypeScript desteği sağlayın**.
- **Dinamik yerel algılama ve anahtarlama gibi gelişmiş özelliklerden yararlanın**.
- **React Router v7'nin yapılandırma tabanlı yönlendirme sistemi ile yerel ayar bilincine sahip yönlendirmeyi etkinleştirin**.

---

## React Router v7 Uygulamasında Intlayer Kurulumu Adım Adım Kılavuzu

### Adım 1: Bağımlılıkları Kurma

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri kurun:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md), derleme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **react-intlayer**
  Intlayer'ı React uygulaması ile entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sağlar.

- **vite-intlayer**
  [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini içerir, ayrıca kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için middleware içerir.

### Adım 2: Projenizi Yapılandırma

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // URL'lerde her zaman varsayılan yerel ayarı önekle
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, middleware yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsolda Intlayer günlüklerinin devre dışı bırakılması ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: React Router v7 Rotalarını Yapılandırma

Yerel ayar bilincine sahip rotalarla yönlendirme yapılandırmanızı ayarlayın:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Kök sayfa - yerel ayara yönlendirir
    route("/:lang", "routes/[lang]/page.tsx"), // Yerelleştirilmiş ana sayfa
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // Yerelleştirilmiş hakkımızda sayfası
  ]),
] satisfies RouteConfig;
```

### Adım 4: Vite Yapılandırmanızda Intlayer'ı Entegre Etme

Intlayer eklentisini yapılandırmanıza ekleyin:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar sağlar.

### Adım 5: Düzen Bileşenleri Oluşturma

Kök düzeninizi ve yerel ayar özel düzenlerinizi ayarlayın:

#### Kök Düzen

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Adım 6: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Home",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> İçerik bildirimleriniz, `contentDir` dizinine dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir (varsayılan olarak, `./app`). Ve içerik bildirim dosyası uzantısıyla eşleşmelidir (varsayılan olarak, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md) bakın.

### Adım 7: Yerel Ayar Bilincine Sahip Bileşenler Oluşturma

Yerel ayar bilincine sahip navigasyon için bir `LocalizedLink` bileşeni oluşturun:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### Adım 8: Sayfalarınızda Intlayer'ı Kullanın

Uygulamanız boyunca içerik sözlüklerinize erişin:

#### Kök Yönlendirme Sayfası

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Yerelleştirilmiş Ana Sayfa

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md) bakın.

### Adım 9: Yerel Ayar Anahtarlama Bileşeni Oluşturma

Kullanıcıların dilleri değiştirmesine izin veren bir bileşen oluşturun:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">Dil Seçin: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> `useLocale` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

### Adım 10: HTML Özellikleri Yönetimini Ekleyin (İsteğe Bağlı)

HTML lang ve dir özelliklerini yönetmek için bir kanca oluşturun:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Ardından kök bileşeninizde kullanın:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // kancayı içe aktarın

export default function RootLayout() {
  useI18nHTMLAttributes(); // kancayı çağırın

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Adım 11: Uygulamanızı Oluşturun ve Çalıştırın

İçerik sözlüklerini oluşturun ve uygulamanızı çalıştırın:

```bash packageManager="npm"
# Intlayer sözlüklerini oluşturun
npm run intlayer:build

# Geliştirme sunucusunu başlatın
npm run dev
```

```bash packageManager="pnpm"
# Intlayer sözlüklerini oluşturun
pnpm intlayer:build

# Geliştirme sunucusunu başlatın
pnpm dev
```

```bash packageManager="yarn"
# Intlayer sözlüklerini oluşturun
yarn intlayer:build

# Geliştirme sunucusunu başlatın
yarn dev
```

### Adım 12: TypeScript Yapılandırma (İsteğe Bağlı)

Intlayer, TypeScript'ten faydalanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır.

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... mevcut TypeScript yapılandırmalarınız
  },
  include: [
    // ... mevcut dahil ettikleriniz
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırma

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deponuza göndermekten kaçınmanıza olanak tanır.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyin:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

---

## Üretim Dağıtımı

Uygulamanızı dağıtırken:

1. **Uygulamanızı oluşturun:**

   ```bash
   npm run build
   ```

2. **Intlayer sözlüklerini oluşturun:**

   ```bash
   npm run intlayer:build
   ```

3. **Üretimde middleware kullanıyorsanız `vite-intlayer`'ı bağımlılıklara taşıyın:**
   ```bash
   npm install vite-intlayer --save
   ```

Uygulamanız artık şunları destekleyecek:

- **URL Yapısı**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Tarayıcı tercihlerine göre otomatik yerel ayar algılama**
- **React Router v7 ile yerel ayar bilincine sahip yönlendirme**
- **Otomatik olarak oluşturulan türlerle TypeScript desteği**
- **Uygun yerel ayar yönetimi ile sunucu tarafı işleme**

## VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için, resmi **Intlayer VS Code Uzantısı**'nı kurabilirsiniz.

[VS Code Marketplace'ten Kurun](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

## Daha Fazla İlerleyin

Daha fazla ilerlemek için, [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [React Router v7 Dokümantasyonu](https://reactrouter.com/)
- [useIntlayer kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [useLocale kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
- [İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

Bu kapsamlı kılavuz, React Router v7 ile Intlayer'ı yerel ayar bilincine sahip yönlendirme ve TypeScript desteği ile tamamen uluslararasılaştırılmış bir uygulama için entegre etmek için ihtiyacınız olan her şeyi sağlar.

## Dokümantasyon Geçmişi

| Sürüm | Tarih     | Değişiklikler                |
| ----- | --------- | ---------------------------- |
| 5.8.2 | 2025-09-4 | React Router v7 için eklendi |
