---
createdAt: 2025-12-07
updatedAt: 2025-12-07
title: React Router v7 (File-System Routes) uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: React Router v7 uygulamanıza Intlayer kullanarak dosya sistemi tabanlı yönlendirme ile uluslararasılaştırmayı (i18n) nasıl ekleyeceğinizi öğrenin. Uygulamanızı yerel dil farkındalıklı yönlendirme ile çok dilli hale getirmek için bu kapsamlı rehberi takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - React Router v7
  - fs-routes
  - Dosya Sistemi Rotaları
  - React
  - i18n
  - TypeScript
  - Yerel Yönlendirme
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template-fs-routes
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.3.4
    date: 2025-12-08
    changes: Init history
---

# Intlayer ile React Router v7 (File-System Routes) çevirin | Uluslararasılaştırma (i18n)

Bu rehber, React Router v7 projelerinde **dosya sistemi tabanlı yönlendirme** (`@react-router/fs-routes`) kullanarak yerel dil farkındalıklı yönlendirme, TypeScript desteği ve modern geliştirme uygulamaları ile sorunsuz uluslararasılaştırma için **Intlayer**'ın nasıl entegre edileceğini gösterir.

## Table of Contents

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde bildirimsel sözlükler kullanarak çevirileri kolayca yönetmek.**
- **Meta verileri, yönlendirmeleri ve içeriği dinamik olarak yerelleştirmek.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlamak, otomatik tamamlama ve hata tespitini geliştirmek.**
- **Dinamik yerel dil algılama ve değiştirme gibi gelişmiş özelliklerden faydalanmak.**
- **React Router v7'nin dosya sistemi tabanlı yönlendirme sistemi ile yerel dil farkındalıklı yönlendirmeyi etkinleştirin.**

---

## Dosya sistemi tabanlı rotalar ile React Router v7 uygulamasında Intlayer kurulumu için adım adım rehber

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="How to translate your React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template-fs-routes?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template-fs-routes) on GitHub.

### Adım 1: Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

- **intlayer**

- Uluslararasılaştırma araçlarını yapılandırma yönetimi, çeviri, [içerik beyanı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) için sağlayan temel paket.

- **react-intlayer**
  Intlayer'ı React uygulamasıyla entegre eden paket. React uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini, ayrıca kullanıcının tercih ettiği yerel dili algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı içerir.

- **@react-router/fs-routes**
  React Router v7 için dosya sistemi tabanlı yönlendirmeyi etkinleştiren paket.

### Adım 2: Projenizin Yapılandırması

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, ara yazılım yönlendirmesini, çerez isimlerini, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, Intlayer günlüklerini konsolda devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar sağlar.

### Adım 4: React Router v7 Dosya Sistemi Rotalarını Yapılandırma

Yönlendirme yapılandırmanızı `flatRoutes` ile dosya sistemi tabanlı rotalar kullanacak şekilde ayarlayın:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // İçerik bildirimi dosyalarının rota olarak işlenmesini engelle
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> `@react-router/fs-routes`'tan gelen `flatRoutes` işlevi, `routes/` dizinindeki dosya yapısının uygulamanızın rotalarını belirlediği dosya sistemi tabanlı yönlendirmeyi etkinleştirir. `ignoredRouteFiles` seçeneği, Intlayer içerik bildirimi dosyalarının (`.content.ts`, vb.) rota dosyaları olarak işlenmemesini sağlar.

### Adım 5: Dosya Sistemi Kuralları ile Rota Dosyaları Oluşturun

Dosya sistemi yönlendirmesi ile, noktalar (`.`) yol segmentlerini temsil eden ve parantezler `()` isteğe bağlı segmentleri belirten düz bir adlandırma kuralı kullanırsınız.

`app/routes/` dizininizde aşağıdaki dosyaları oluşturun:

#### Dosya Yapısı

```bash
app/routes/
├── ($locale)._layout.tsx        # Yerel rota için layout sarmalayıcı
├── ($locale)._index.tsx         # Ana sayfa (/:locale?)
├── ($locale)._index.content.ts  # Ana sayfa içeriği
├── ($locale).about.tsx          # Hakkında sayfası (/:locale?/about)
└── ($locale).about.content.ts   # Hakkında sayfası içeriği
```

Adlandırma kuralları:

- `($locale)` - Yerel parametre için isteğe bağlı dinamik segment
- `_layout` - Alt rotaları saran layout rotası
- `_index` - İndeks rotası (üst yolda render edilir)
- `.` (nokta) - Yol segmentlerini ayırır (örneğin, `($locale).about` → `/:locale?/about`)

#### Layout Bileşeni

```tsx fileName="app/routes/($locale)._layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import { useI18nHTMLAttributes } from "~/hooks/useI18nHTMLAttributes";

import type { Route } from "./+types/($locale)._layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  useI18nHTMLAttributes();

  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

#### İndeks Sayfası

```tsx fileName="app/routes/($locale)._index.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

import type { Route } from "./+types/($locale)._index";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

#### Hakkında Sayfası

```tsx fileName="app/routes/($locale).about.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

import type { Route } from "./+types/($locale).about";

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

### Adım 6: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin. İçerik dosyalarını rota dosyalarınızın yanına yerleştirin:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> İçerik bildirimleriniz, uygulamanızda `contentDir` dizinine (varsayılan olarak `./app`) dahil edildiği sürece herhangi bir yerde tanımlanabilir. Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bakınız.

### Adım 7: Yerel Duyarlı Bileşenler Oluşturun

Yerel duyarlı gezinme için bir `LocalizedLink` bileşeni oluşturun:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Belirtilen locale göre URL'yi yerelleştirir
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// Yerelleştirilmiş link bileşeni
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Yerelleştirilmiş rotalara gitmek istediğiniz durumlarda, `useLocalizedNavigate` kancasını kullanabilirsiniz:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### Adım 8: Bir Dil Değiştirici Bileşeni Oluşturun

Kullanıcıların dilleri değiştirmesine izin veren bir bileşen oluşturun:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "sayfa" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            reloadDocument // Yeni locale'i uygulamak için sayfayı yeniden yükle
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Yerel - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerelde dil - örn. Locales.SPANISH olarak ayarlanmış mevcut yerelle Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dilinde - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md) bakınız.

### Adım 10: HTML Öznitelikleri Yönetimi Ekleme (İsteğe Bağlı)

HTML lang ve dir özniteliklerini yönetmek için bir hook oluşturun:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

Bu hook, Adım 5'te gösterilen layout bileşeninde (`($locale)._layout.tsx`) zaten kullanılmaktadır.

### Adım 10: Middleware ekleyin (İsteğe bağlı)

Ayrıca uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy` kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiçbir yerel ayar belirtilmemişse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiçbir yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirme yapar.

> Üretimde `intlayerProxy` kullanmak için, `vite-intlayer` paketini `devDependencies`'den `dependencies`'e geçirmeniz gerektiğini unutmayın.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerProxy()],
});
```

---

## TypeScript'i Yapılandırma

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... mevcut yapılandırmalarınız
  include: [
    // ... mevcut dahil ettikleriniz
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

---

## Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

---

## VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **Otomatik Tamamlama**.
- Eksik çeviriler için **Gerçek Zamanlı Hata Tespiti**.
- Çevrilmiş içeriğin **Satır İçi Önizlemeleri**.
- Çevirileri kolayca oluşturup güncellemek için **Hızlı İşlemler**.

Eklentinin nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

---

## Daha İleri Gitmek İçin

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [React Router v7 Dokümantasyonu](https://reactrouter.com/)
- [React Router fs-routes Dokümantasyonu](https://reactrouter.com/how-to/file-route-conventions)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useLocale.md)
- [İçerik Beyanı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

Bu kapsamlı rehber, dosya sistemi tabanlı yönlendirme kullanarak React Router v7 ile Intlayer'ı entegre etmeniz için ihtiyacınız olan her şeyi sağlar, böylece yerel dil farkındalıklı yönlendirme ve TypeScript desteği ile tamamen uluslararasılaştırılmış bir uygulama elde edersiniz.
