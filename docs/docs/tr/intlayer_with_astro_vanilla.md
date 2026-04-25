---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - 2026'da Astro + Vanilla JS uygulaması nasıl çevrilir?
description: Intlayer kullanarak Astro + Vanilla JS sitenize uluslararasılaştırma (i18n) eklemeyi öğrenin. Sitenizi çok dilli hale getirmek için bu kılavuzu izleyin.
keywords:
  - uluslararasılaştırma
  - dokümantasyon
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Vanilla JS için ilk dokümantasyon"
---

# Astro + Vanilla JS Sitenizi Intlayer ile Çevirin | Uluslararasılaştırma (i18n)

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri kolayca yönetin**: Bileşen düzeyinde deklaratif sözlükler kullanarak.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **TypeScript desteği sağlayın**: Daha iyi otomatik tamamlama ve hata algılama için otomatik olarak oluşturulan türlerle.
- **Gelişmiş özelliklerden yararlanın**: Dinamik dil algılama ve değiştirme gibi.

---

## Astro + Vanilla JS'de Intlayer'ı Yapılandırmak İçin Adım Adım Kılavuz

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Uygulamanızı Intlayer ile nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub'daki [uygulama şablonuna](https://github.com/aymericzip/intlayer-astro-template) göz atın.

### Adım 1: Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  Konfigürasyon yönetimi, çeviriler, [içerik deklarasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için i18n araçları sağlayan temel paket.

- **astro-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile bağlamak için Astro entegrasyon eklentisi; ayrıca kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmelerini işlemek için ara yazılım (middleware) içerir.

- **vanilla-intlayer**
  Intlayer'ı Vanilla JavaScript / TypeScript uygulamalarına entegre etmek için bir paket. Herhangi bir UI framework'üne ihtiyaç duymadan Astro `<script>` etiketlerinizin herhangi bir parçasının dil değişikliklerine yanıt vermesini sağlayan bir Pub/Sub singleton (`IntlayerClient`) ve geri çağırma tabanlı yardımcılar (`useIntlayer`, `useLocale`, vb.) sağlar.

### Adım 2: Projenizi Yapılandırın

Uygulamanızın dillerini tanımlamak için bir konfigürasyon dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu konfigürasyon dosyası aracılığıyla yerelleştirilmiş URL'leri, ara yazılım yönlendirmelerini, çerez adlarını, içerik deklarasyonlarının konumunu ve uzantılarını yapılandırabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

### Adım 3: Intlayer'ı Astro konfigürasyonunuza entegre edin

Astro konfigürasyonunuza `intlayer` eklentisini ekleyin. Vanilla JS için ek bir UI framework entegrasyonu gerekmez.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` entegrasyon eklentisi, Intlayer'ı Astro ile entegre etmek için kullanılır. İçerik deklarasyon dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Astro uygulaması içinde Intlayer ortam değişkenlerini tanımlar ve performansı optimize etmek için takma adalar (aliases) sağlar.

### Adım 4: İçeriğinizi Deklare Edin

Çevirileri saklamak için içerik deklarasyonlarınızı oluşturun ve yönetin:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      tr: "Merhaba Dünya",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      tr: "Çok dilli Astro siteme hoş geldiniz.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      tr: "Dili değiştir:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik deklarasyonları, `contentDir` (varsayılan olarak `./src`) içinde yer aldıkları ve içerik deklarasyon dosyası uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleştikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir.

> Daha fazla bilgi için [içerik deklarasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 5: Astro'da İçerik Kullanma

Vanilla JS ile tüm sunucu tarafı oluşturma (SSR), doğrudan `.astro` dosyalarında `getIntlayer` kullanılarak gerçekleşir. Ardından, istemci tarafında dil değiştirmeyi etkinleştirmek için bir `<script>` bloğu `vanilla-intlayer` kütüphanesini başlatır.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Kurallı (Canonical) Bağlantı -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang Bağlantıları -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **Yönlendirme Kurulumu Hakkında Not:**
> Kullandığınız dizin yapısı, `intlayer.config.ts` dosyasındaki `middleware.routing` ayarına bağlıdır:
>
> - **`prefix-no-default` (varsayılan):** Varsayılan dili kök dizinde tutar (önek yok) ve diğerlerine önek ekler. Tüm durumları yakalamak için `[...locale]` kullanın.
> - **`prefix-all`:** Tüm URL'ler bir dil öneki alır. Kök dizini ayrı işlemek gerekmiyorsa standart `[locale]` kullanabilirsiniz.
> - **`search-param` veya `no-prefix`:** Dil dizinlerine gerek yoktur. Dil, sorgu parametreleri veya çerezler aracılığıyla yönetilir.

### Adım 6: Bir Dil Seçici Ekleme

Vanilla JS'li Astro'da dil seçici, sunucuda düzenli bağlantılar olarak oluşturulur ve istemci tarafında bir `<script>` bloğu aracılığıyla etkinleştirilir. Bir kullanıcı bir dil bağlantısına tıkladığında, `vanilla-intlayer` yerelleştirilmiş URL'ye gitmeden önce `setLocale` aracılığıyla dil çerezini ayarlar.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- Adım 5'teki sunucu tarafı markup'ını buraya dahil edin -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // İstemcide Intlayer'ı geçerli yoldan alınan dille başlatın
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Dil seçici bağlantılarına tıklama olaylarını bağlayın
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Kalıcılık Hakkında Not:**
> `installIntlayer`, sunucuda tanımlanan dille Intlayer singleton'ını başlatır. `onLocaleChange` ile `useLocale`, ara yazılım aracılığıyla yönlendirilmeden önce dil çerezinin ayarlanmasını sağlar, böylece gelecekteki ziyaretlerde kullanıcının dil tercihi hatırlanır.

> **Kademeli Geliştirme (Progressive Enhancement) Hakkında Not:**
> Dil seçici içindeki bağlantılar, JavaScript olmadan da standart `<a>` etiketleri olarak çalışacaktır. JavaScript mevcut olduğunda, `setLocale` çağrısı yönlendirmeden önce çerezi güncelleyerek ara yazılımın doğru dille yönlendirme yapmasını sağlar.

### Adım 7: Sitemap ve Robots.txt

Intlayer, yerelleştirilmiş site haritanızı ve robots.txt dosyalarınızı dinamik olarak oluşturmak için yardımcı programlar sunar.

#### Sitemap

Tüm yerelleştirilmiş rotalarınızı içeren bir site haritası oluşturmak için `src/pages/sitemap.xml.ts` dosyasını oluşturun.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Arama motoru taramasını kontrol etmek için `src/pages/robots.txt.ts` dosyasını oluşturun.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript Yapılandırması

Intlayer, kod tabanınızı daha sağlam hale getirmek için TypeScript'ten yararlanmak amacıyla modül artırımı (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... mevcut TypeScript yapılandırmanız
  "include": [
    // ... mevcut TypeScript yapılandırmanız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyin:

```bash
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için **resmi Intlayer VS Code uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten Kurulum](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemesi**.
- Kolayca çeviri oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantı kullanımı hakkında daha fazla bilgi için [VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Bilginizi Derinleştirin

Daha fazlasını öğrenmek isterseniz, içeriğinizi dış kaynaklara aktarmak için [Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)'ü uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanabilirsiniz.
