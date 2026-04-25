---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Svelte i18n - 2026'da Astro + Svelte uygulaması nasıl çevrilir?
description: Intlayer kullanarak Astro + Svelte sitenize uluslararasılaştırma (i18n) eklemeyi öğrenin. Sitenizi çok dilli hale getirmek için bu kılavuzu izleyin.
keywords:
  - uluslararasılaştırma
  - dokümantasyon
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Svelte için ilk dokümantasyon"
---

# Astro + Svelte Sitenizi Intlayer ile Çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri kolayca yönetin**: Bileşen düzeyinde deklaratif sözlükler kullanarak.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **TypeScript desteği sağlayın**: Daha iyi otomatik tamamlama ve hata algılama için otomatik olarak oluşturulan türlerle.
- **Gelişmiş özelliklerden yararlanın**: Dinamik dil algılama ve değiştirme gibi.

---

## Astro + Svelte'de Intlayer'ı Yapılandırmak İçin Adım Adım Kılavuz

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
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

bun x intlayer init
```

- **intlayer**
  Konfigürasyon yönetimi, çeviriler, [içerik deklarasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilasyon ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için i18n araçları sağlayan temel paket.

- **astro-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile bağlamak için Astro entegrasyon eklentisi; ayrıca kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmelerini işlemek için ara yazılım (middleware) içerir.

- **svelte**
  Temel Svelte paketi.

- **svelte-intlayer**
  Svelte uygulamalarına Intlayer entegre etmek için paket. Svelte'de uluslararasılaştırma için `setupIntlayer`'ın yanı sıra `useIntlayer` ve `useLocale` store'larını sağlar.

- **@astrojs/svelte**
  Svelte bileşen islands kullanımına olanak tanıyan resmi Astro entegrasyonu.

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

Astro konfigürasyonunuza `intlayer` eklentisini ve Svelte entegrasyonunu ekleyin.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> `intlayer()` entegrasyon eklentisi, Intlayer'ı Astro ile entegre etmek için kullanılır. İçerik deklarasyon dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Astro uygulaması içinde Intlayer ortam değişkenlerini tanımlar ve performansı optimize etmek için takma adalar (aliases) sağlar.

> `svelte()` entegrasyonu, `client:only="svelte"` aracılığıyla Svelte bileşen islands kullanımına olanak tanır.

### Adım 4: İçeriğinizi Deklare Edin

Çevirileri saklamak için içerik deklarasyonlarınızı oluşturun ve yönetin:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      tr: "Merhaba Dünya",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik deklarasyonları, `contentDir` (varsayılan olarak `./src`) içinde yer aldıkları ve içerik deklarasyon dosyası uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) eşleştikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir.

> Daha fazla bilgi için [içerik deklarasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

### Adım 5: Astro'da İçerik Kullanma

Sözlükleri doğrudan `.astro` dosyalarınızda, `intlayer`'dan dışa aktarılan temel yardımcıları kullanarak tüketebilirsiniz. Her sayfaya SEO meta verileri (hreflang ve kurallı bağlantılar gibi) eklemeli ve etkileşimli istemci tarafı içeriği için bir Svelte island tanıtmalısınız.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Kurallı (Canonical) Bağlantı: Arama motorlarını bu sayfanın ana sürümü hakkında bilgilendirir -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Google'ı tüm yerelleştirilmiş sürümler hakkında bilgilendirir -->
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

    <!-- x-default: Dil kullanıcının diliyle eşleşmediğinde kullanılan geri dönüş (fallback) seçeneği -->
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
    <!-- Svelte island, dil seçici de dahil olmak üzere tüm etkileşimli içeriği oluşturur -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> **Yönlendirme Kurulumu Hakkında Not:**
> Kullandığınız dizin yapısı, `intlayer.config.ts` dosyasındaki `middleware.routing` ayarına bağlıdır:
>
> - **`prefix-no-default` (varsayılan):** Varsayılan dili kök dizinde tutar (önek yok) ve diğerlerine önek ekler. Tüm durumları yakalamak için `[...locale]` kullanın.
> - **`prefix-all`:** Tüm URL'ler bir dil öneki alır. Kök dizini ayrı işlemek gerekmiyorsa standart `[locale]` kullanabilirsiniz.
> - **`search-param` veya `no-prefix`:** Dil dizinlerine gerek yoktur. Dil, sorgu parametreleri veya çerezler aracılığıyla yönetilir.

### Adım 6: Bir Svelte Island Bileşeni Oluşturun

Svelte uygulamanızı sarmalayan bir island bileşeni oluşturun. Store'lara erişmeden önce sunucu tarafından algılanan dille `setupIntlayer`'ı çağırmalısınız.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- Dil seçici doğrudan island içinde oluşturulur -->
  <div class="locale-switcher">
    <span class="switcher-label">Dili değiştir:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> `locale` prop'u, Astro sayfasından (sunucu algılaması) aktarılır ve `setupIntlayer`'ı başlatmak için kullanılır, böylece bileşendeki tüm store'lar için başlangıç dili ayarlanmış olur.

### Adım 7: Bir Dil Seçici Ekleme

Dil değiştirme işlevselliği doğrudan Svelte island'ına entegre edilmiştir (yukarıdaki Adım 6'ya bakın). `svelte-intlayer`'dan `useLocale` store'unu kullanır ve kullanıcı yeni bir dil seçtiğinde yerelleştirilmiş URL'ye yönlendirir:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // Adım 6'daki aynı locale/setupIntlayer mantığını yeniden kullanın...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Dil değişikliğinde yerelleştirilmiş URL'ye yönlendir
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">Dili değiştir:</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **Kalıcılık Hakkında Not:**
> `window.location.href` aracılığıyla yönlendirmek için `onLocaleChange` kullanmak, yeni dil URL'sinin ziyaret edilmesini sağlar. Bu da Intlayer ara yazılımının dil çerezini ayarlamasına ve gelecekteki ziyaretlerde kullanıcının tercihini hatırlamasına olanak tanır.

### Adım 8: Sitemap ve Robots.txt

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

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
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

Daha fazlarını öğrenmek isterseniz, içeriğinizi dış kaynaklara aktarmak için [Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)'ü uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanabilirsiniz.
