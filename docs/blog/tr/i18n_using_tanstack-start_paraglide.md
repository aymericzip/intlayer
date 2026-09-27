---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Paraglide JS ile TanStack Start i18n: 2026 Kurulum Rehberi"
description: "TanStack Start uygulamanızı Paraglide JS ile yerelleştirin: URL stratejisi, router rewrite, SSR middleware, hreflang, sitemap ve robots.txt, ayrıca gerçek karşılaştırma verileri."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Uluslararasılaşma
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "İlk sürüm"
author: aymericzip
---

# 2026 Yılında Paraglide JS Kullanarak TanStack Start Uygulamanızı Nasıl Uluslararasılaştırırsınız?

## İçindekiler Tablosu

<TOC/>

## Paraglide JS Nedir?

**Paraglide JS** (inlang tarafından geliştirilen), **derleyici tabanlı** (compiler-based) bir i18n kütüphanesidir. Bir JSON nesnesi içindeki anahtarları çalışma zamanında (runtime) aramak yerine, her bir mesajı tür güvenli (typed) bir JavaScript fonksiyonuna (`m.about_title()`) derler. Kullanılmayan mesajlar paketleyici (bundler) tarafından elenebilir (tree-shaking) ve bir anahtardaki yazım hatası derleme zamanı hatası (compile error) olarak yakalanır.

Paraglide, resmi TanStack Router örneklerinde kullanılan i18n yaklaşımıdır ve TanStack Start ile üç parça aracılığıyla entegre olur:

- Mesajları ve çalışma zamanını `src/paraglide` dizinine derleyen bir **Vite eklentisi**;
- Her isteğin yerel ayarını (locale) çözümleyen bir **sunucu ara yazılımı (server middleware)**;
- Yerelleştirilmiş URL'leri (`/fr/about`) rota ağacınıza (`/about`) eşleyen bir **router rewrite** mekanizması; böylece bir `$locale` segmentine ihtiyaç duymazsınız.

Bu rehber her üç parçanın da kurulumunu yapar, ardından Paraglide'ın size bıraktığı tüm konuları ele alır: `lang` ve `dir`, dil değiştirici (locale switcher), çevrilmiş meta veriler, `canonical`, `x-default` ile `hreflang`, Open Graph, JSON-LD, sitemap, `robots.txt`, önceden oluşturma (pre-rendering) ve yerelleştirilmiş 404 sayfaları.

> Başka bir yığın mı arıyorsunuz? [TanStack Start + use-intl rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_use-intl.md), [TanStack Start + Lingui rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_lingui.md) veya [TanStack Start + Intlayer rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md) göz atın.

> İki derleyici tabanlı yaklaşımı mı karşılaştırıyorsunuz? [Intlayer Paraglide'dan daha mı hafif?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/is_intlayer_lighter_than_paraglide.md) makalesini okuyun.

## Karşılaştırma Testi (Benchmark) TanStack Start Üzerinde Paraglide Hakkında Ne Söylüyor?

[i18n karşılaştırma testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md), aynı 10 sayfalık, 10 dilli TanStack Start uygulamasını tüm büyük kütüphanelerle çalıştırır ve tarayıcının gerçekte ne kadar veri indirdiğini ölçer.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

`@inlang/paraglide-js@2.15.1` için 2026-09-26 tarihinde ölçülen temel rakamlar (gzip):

| Kurulum                   | Kütüphane boyutu | Sayfa başına JS | Diğer dil sızıntısı | Diğer sayfa sızıntısı | Sayfa yükleme |
| :------------------------ | ---------------: | --------------: | ------------------: | --------------------: | ------------: |
| i18n Yok (temel uygulama) |                - |        111.0 KB |                  0% |                    0% |       15.7 ms |
| Paraglide JS              |           1.8 KB |        125.1 KB |               49.7% |                    0% |       22.1 ms |
| `react-intlayer`          |           4.5 KB |        126.8 KB |                  0% |                    0% |       14.8 ms |
| `use-intl`                |          75.9 KB |        128.7 KB |                  0% |                    0% |       17.4 ms |
| Lingui                    |          56.7 KB |        120.2 KB |                8.6% |                    0% |       21.9 ms |

Buradan çıkarılacak sonuçlar:

- **Çalışma zamanı çok küçüktür ve sayfalar sızıntı yapmaz.** Çalışma zamanı yapılandırmanıza göre oluşturulur ve mesajlar yalnızca kullanıldıkları yerlerde içe aktarılır.
- **Diller sızıntı yapar (Locales leak).** Her mesaj fonksiyonu tüm dilleri içerir, bu nedenle bir sayfaya gönderilen çevrilmiş metinlerin yaklaşık yarısı ziyaretçinin kullanmadığı dillerdedir. Ne kadar çok dil eklerseniz, bu oran o kadar büyür.
- **Sayfa yükleme hızı grubun en yavaşıdır**, bunun kısmi nedeni dilin bir React bağlamından (context) okunmak yerine her çağrıda stratejiler üzerinden çözümlenmesidir.

> Tüm verileri inceleyin: [TanStack Start karşılaştırma raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) ve [karşılaştırma deposu](https://github.com/intlayer-org/benchmark-i18n).

## TanStack Start Üzerinde Özellik Karşılaştırması

Paraglide JS'nin TanStack Start'ta yaygın olarak kullanılan diğer kütüphanelerle karşılaştırması:

| Özellik                                     | `react-intlayer` (Intlayer)          | `use-intl`                | Paraglide JS                               | Lingui                            |
| ------------------------------------------- | ------------------------------------ | ------------------------- | ------------------------------------------ | --------------------------------- |
| **Bileşenlerin yanında çeviriler**          | ✅ Birlikte konumlandırılmış         | ❌ Merkezi JSON           | ❌ Dil başına bir JSON dosyası             | ⚠️ Bileşenler içinde kaynak metin |
| **TypeScript entegrasyonu**                 | ✅ Otomatik oluşturulan tipler       | ✅ `AppConfig` ile        | ✅ Tiplendirilmiş mesaj fonksiyonları      | ⚠️ Yalnızca makrolar              |
| **Eksik çeviri tespiti**                    | ✅ Tip hataları ve derleme uyarıları | ⚠️ Çalışma zamanı yedeği  | ⚠️ Temel dile geri döner                   | ⚠️ Kaynak metne geri döner        |
| **Zengin içerik (JSX, Markdown)**           | ✅ Doğrudan destek                   | ⚠️ `t.rich` ile etiketler | ⚠️ Dize metinler                           | ✅ `<Trans>` içinde JSX           |
| **Yerelleştirilmiş yönlendirme**            | ✅ Yerleşik                          | ❌ Manuel `{-$locale}`    | ✅ `urlPatterns` + router rewrite          | ❌ Manuel `{-$locale}`            |
| **Yenileme yapmadan dil değişimi**          | ✅ Evet                              | ✅ Evet                   | ❌ Tam sayfa yenileme                      | ✅ Evet                           |
| **Çoğullaştırma (Pluralization)**           | ✅ Numaralandırma tabanlı            | ✅ ICU                    | ✅ Varyantlar                              | ✅ ICU                            |
| **ICU MessageFormat**                       | ✅ `format: "icu"` ile               | ✅ Yerel                  | ⚠️ Bir inlang eklentisi ile                | ✅ Yerel                          |
| **İçerik formatları**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                | ⚠️ inlang JSON                             | ✅ PO, JSON, CSV                  |
| **Yapay zeka ile çeviri**                   | ✅ Kendi sağlayıcınız ve anahtarınız | ❌ Yok                    | ❌ Yok                                     | ❌ Yok                            |
| **Görsel editör / CMS**                     | ✅ Yerel editör + isteğe bağlı CMS   | ❌ Harici platformlar     | ⚠️ inlang ekosistem uygulamaları           | ❌ Harici platformlar             |
| **SEO yardımcıları (hreflang, sitemap)**    | ✅ Yerleşik                          | ❌ Manuel                 | ⚠️ Yerelleştirilmiş URL'ler, gerisi manuel | ❌ Manuel                         |
| **Çalışma zamanı boyutu (gzip, benchmark)** | 4.5 KB                               | 75.9 KB                   | 1.8 KB                                     | 56.7 KB                           |
| **Sızıntı, en iyi kurulum (dil / sayfa)**   | 0% / 0%                              | 0% / 0%                   | 49.7% / 0%                                 | 8.6% / 0%                         |
| **CI ortamında eksik çeviri kontrolü**      | ✅ `npx intlayer test`               | ⚠️ Yerleşik değil         | ⚠️ Yerleşik değil                          | ✅ `lingui compile --strict`      |

> Çalışma zamanı boyutu ve sızıntı rakamları [TanStack Start karşılaştırmasından](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) alınmıştır. Sızıntı, her kütüphanenin en iyi kurulumu üzerinden ölçülmüştür.

> Diğer TanStack Start rehberleri: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_lingui.md), [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_use-intl.md) ve [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md).

## İzlemeniz Gereken En İyi Uygulamalar

- **Sunucuda çözümlenen dilden `<html>` üzerine `lang` ve `dir` değerlerini ayarlayın**.
- **Ön ek stratejisiyle (`/fr/about`) dil başına bir URL kullanın**, böylece her dil sürümü dizine eklenebilir (indexable).
- **Dil stratejinizde `url` seçeneğini ilk sıraya koyun**, böylece URL tek doğruluk kaynağı olur ve arama motoru botları istedikleri sayfayı doğrudan alır.
- **Fonksiyon adlarıyla temiz bir şekilde eşleşen düz ve açıklayıcı mesaj anahtarları (`about_title`) kullanın**.
- **Oluşturulan `src/paraglide` klasörünü değil, `messages/*.json` dosyalarınızı commitleyin**, böylece oluşturulan dosyalarda birleştirme (merge) çakışmalarını önlersiniz.
- **Meta verilerinizi çevirin** ve her sayfada `canonical`, `hreflang` ve `x-default` tanımlayın.
- **Çok dilli bir sitemap ve robots.txt oluşturun** ve her dili önceden oluşturun (pre-render).
- **Dil değiştirici için gerçek bağlantılar (`<a>`) kullanın**, böylece arama motoru botları tüm dilleri keşfedebilir.

> [Uluslararasılaşma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md) rehberimize ve [hreflang rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md) göz atın.

## TanStack Start Uygulamasında Paraglide JS Kurulumu İçin Adım Adım Rehber

Oluşturacağımız proje yapısı şu şekildedir:

```bash
.
├── project.inlang
│   └── settings.json          # Diller ve mesaj formatı
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Oluşturulan, git tarafından yok sayılan dizin
    ├── server.ts              # Paraglide ara yazılımı (middleware)
    ├── router.tsx             # URL yeniden yazımı (rewrite)
    ├── i18n
    │   ├── config.ts          # Site URL'si, yardımcı fonksiyonlar
    │   └── seo.ts             # head() oluşturucu
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / ve /fr
        ├── about.tsx          # /about ve /fr/about
        ├── $.tsx              # Yerelleştirilmiş 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Fark edeceğiniz üzere bir `$locale` klasörü yoktur: router rewrite mekanizması rota eşleşmesinden önce ön eki kaldırır.

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

Bir TanStack Start projesinden başlayın, ardından Paraglide'ı başlatın. Başlatma komutu `project.inlang/settings.json`, ilk `messages/en.json` dosyasını oluşturur ve paketi yükler.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: Derleyici ve Vite eklentisi. Yüklenecek bir çalışma zamanı (runtime) paketi yoktur: çalışma zamanı doğrudan projenizin içine üretilir.

</Step>
<Step number={2} title="Dillerinizi Yapılandırın">

`project.inlang/settings.json` dosyası diller için tek doğruluk kaynağıdır. Mesaj formatı eklentisi dil başına bir JSON dosyası okur.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Vite Eklentisini ve URL Stratejisini Yapılandırın">

Eklenti her değişiklikte mesajları derler. TanStack Start için üç seçenek önemlidir:

- **`strategy`**: Dilin okunacağı yerlerin sıralı listesi. `url` seçeneğinin ilk sırada olması URL'yi tek doğruluk kaynağı yapar. `cookie` ve `preferredLanguage`, URL karar vermediğinde ara yazılım tarafından kullanılır.
- **`urlPatterns`**: Bir dilin bir URL ile nasıl eşleştiği. Varsayılan olmayan diller ilk olarak listelenir, çünkü eşleşen ilk kalıp kazanır. Burada varsayılan dil ön eksiz kalır (`/about`) ve diğer diller ön ek alır (`/fr/about`).
- **`outputStructure: "message-modules"`**: Mesaj başına bir modül oluşturur; bu da paketleyicinin bir sayfa tarafından içe aktarılmayan mesajları elemesine (tree-shake) olanak tanır.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Varsayılan dil en sonda: kalan tüm URL'lerle eşleşir
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Oluşturulan klasörü `.gitignore` dosyasına ekleyin. Bu klasör `dev` ve `build` sırasında yeniden oluşturulur:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Çeviri Dosyalarınızı Oluşturun">

Her anahtar `src/paraglide/messages` içerisinden dışa aktarılan bir fonksiyon haline gelir. Düz, snake_case anahtarlar en temiz fonksiyon adlarını sağlar. Değişkenler `{name}` yer tutucularını kullanır.

<Tabs group="locale">
 <Tab value='en' label='İngilizce'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='Fransızca'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Çoğullar inlang mesaj formatının varyantlar (variants) sözdizimini kullanır:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Sunucu Ara Yazılımını (Server Middleware) Ekleyin">

Ara yazılım, stratejinizi kullanarak her isteğin dilini çözümler ve bir `AsyncLocalStorage` kapsamı aracılığıyla tüm sunucu render işlemi boyunca bunu `getLocale()` için erişilebilir kılar. Farklı dillerdeki eşzamanlı istekleri güvenli kılan şey budur.

TanStack Start'ta varsayılan sunucu girişini sarmalayın:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Router İçinde Yerelleştirilmiş URL'leri Yeniden Yazın">

TanStack Router'ın `rewrite` seçeneği URL'leri yönlendiricinin sınırında çevirir:

- **input**: `/fr/about`, eşleşmeden önce `/about` olarak yerelleştirmeden arındırılır (de-localized), böylece tek bir `about.tsx` rotası her dile hizmet eder;
- **output**: oluşturulan her `href` (bağlantılar, yönlendirmeler, navigasyon) aktif dil için yerelleştirilir, böylece `<Link to="/about">` bir Fransızca sayfada `/fr/about` olarak işlenir.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Bağlantılar rewrite tarafından yerelleştirildiği için özel bir `LocalizedLink` bileşenine ihtiyacınız yoktur: TanStack Router'ın `Link` bileşenini her zamanki gibi kullanın.

</Step>
<Step number={7} title="Kök Belgeyi (Root Document) Oluşturun">

`getLocale()`, sunucuda ara yazılım tarafından çözümlenen dili, tarayıcıda ise URL'den gelen dili döndürür; böylece `lang` ve `dir` sunucu HTML'inde ve hidrasyon (hydration) sonrasında birebir aynı kalır.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Genel alan adı; canonical URL'ler, hreflang ve sitemap için kullanılır. */
export const siteUrl = "https://example.com";

/** Open Graph `dil_BÖLGE` kodlarını bekler. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Sayfalarınızda Çevirileri Kullanın">

Mesajlar sade JavaScript fonksiyonlarıdır: `m` nesnesini içe aktarın, fonksiyonu çağırın ve değişkenleri bir nesne olarak iletin. Değişkenler dahil her şey tiplendirilmiştir.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Bir mesaj fonksiyonu açık bir dil parametresini de kabul eder: `m.about_title({}, { locale: "fr" })`. Bu, e-postalar gibi isteğin dilinden farklı bir dilde çıktı üreten sunucu kodlarında oldukça kullanışlıdır.

</Step>
<Step number={9} title="İçeriğinizin Dilini Değiştirin" isOptional={true}>

Değiştiriciyi `localizeHref` kullanarak **bağlantılar (`<a>`)** halinde oluşturun, böylece tarayıcı botları her dili keşfedebilir. `setLocale` seçimi çereze (cookie) kaydeder ve sayfayı yeni dilde yeniden yükler: Tam sayfa yenileme Paraglide'ın beklenen davranışıdır, çünkü mesaj fonksiyonları bir React durumuna (state) abone olmak yerine her çağrıda dili okur.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Rewrite tarafından önceden ön eki kaldırılmış router pathname değeri: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Çerezi ayarlar ve yerelleştirilmiş URL ile sayfayı yeniden yükler
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Meta Verilerinizi Uluslararasılaştırın" isOptional={true}>

Her sayfa aşağıdakileri sağladığı sürece her dil sürümü bağımsız olarak sıralama alabilir:

- **çevrilmiş** bir `<title>` ve `description`;
- kendisine işaret eden bir **canonical** URL;
- **dil başına bir `hreflang` alternatifi** artı **`x-default`**;
- **Open Graph** etiketleri (`og:locale`, `og:locale:alternate` ve `og:url`);
- `inLanguage` içeren **JSON-LD**.

Paraglide'ın `localizeUrl` fonksiyonu alternatif URL'leri `urlPatterns` yapılandırmanızdan oluşturur, böylece gerçek yönlendirmeden asla sapmazlar:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** Ön eki kaldırılmış yol, örn. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="Site Haritanızı (Sitemap) Uluslararasılaştırın" isOptional={true}>

Çok dilli bir sitemap her dilin tüm URL'lerini listeler ve her girdi `xhtml:link` ile tüm alternatiflerini bildirir:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="robots.txt Dosyanızı Uluslararasılaştırın" isOptional={true}>

Özel rotalar her dilde mevcuttur, bu nedenle `Disallow` kuralları tüm yerelleştirilmiş yolları kapsamalıdır. Başlangıç şablonu oluşturduysa `public/robots.txt` dosyasını silin, ardından bunu bir rotadan sunun:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="Her Dili Önceden Oluşturun (Pre-render)" isOptional={true}>

TanStack Start'ın tüm dil sürümlerini önceden oluşturması için her sayfanın yerelleştirilmiş yolunu listeleyin. `localizeHref` tarayıcı bağımlılığı olmayan üretilmiş bir koddur, bu yüzden `vite.config.ts` içinde çalışabilir; ancak dosya yalnızca ilk derlemeden sonra var olur. Yolları aşağıda gösterildiği gibi manuel olarak listelemek bu sıralama sorununu önler:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Varsayılan dil "en" ön eksizdir
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... 3. adımdaki seçeneklerle aynı
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Değiştirici gerçek bağlantılar oluşturduğu için, `crawlLinks: true` listelemeyi unuttuğunuz sayfaları da keşfeder.

</Step>
<Step number={14} title="Yerelleştirilmiş 404 Sayfalarını Yönetin" isOptional={true}>

Rewrite mekanizması sayesinde `/fr/does-not-exist` rotası `/does-not-exist` olarak eşleştirilir ve `getLocale()` yine `fr` döndürür; böylece 7. adımdaki kök `notFoundComponent` Fransızca olarak işlenir. Bir catch-all rotası derin yolların da buraya ulaşmasını sağlar. Sayfayı `noindex` olarak işaretleyin: React 19 bu `<meta>` etiketini `<head>` içine taşır.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Sunucu Fonksiyonlarında Dile Erişin" isOptional={true}>

Sunucu fonksiyonları Paraglide ara yazılım kapsamı içinde çalışır, bu nedenle `getLocale()` burada da sorunsuz çalışır:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Intlayer ile Karşılaştırın" isOptional={true}>

Paraglide'dan Intlayer'a doğrudan bir adaptör yoktur çünkü her ikisi de aynı temel fikri izler: içeriği derleme zamanında derlemek ve mümkün olduğunca az çalışma zamanı kodu sunmak. Farklılıklar tarayıcıya neyin ulaştığında ve içeriğin nasıl düzenlendiğinde yatar:

- **Diller**: Intlayer dil başına [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) yükler (karşılaştırmada %0 dil sızıntısı), Paraglide'ın her mesaj fonksiyonu ise tüm dilleri taşır (%49.7).
- **İçerik organizasyonu**: içerik her bileşenin yanında `.content.ts` dosyalarında veya merkezi dosyalarda bulunabilir. [Bileşen bazlı ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) makalesine göz atın.
- **Dil değişimi**: içerik bir React bağlamından okunur, bu nedenle dil değişimi sayfa yenilemesi olmadan yeniden render edilir.
- **Oluşturulan kod**: `src` içinde hiçbir şey oluşturulmaz, bu yüzden bir commit öncesinde yeniden oluşturulması gereken bir şey yoktur.

Paraglide yerine başka bir kütüphaneden geçiyorsanız, [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) `use-intl`, `next-intl`, `react-i18next`, `react-intl` veya Lingui API'sini korur ve yalnızca çalışma zamanını değiştirir.

[Intlayer Paraglide'dan daha mı hafif?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/is_intlayer_lighter_than_paraglide.md) makalesine ve [Intlayer TanStack Start rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md) göz atın.

</Step>
<Step number={17} title="Intlayer Kullanarak Çevirilerinizi Otomatikleştirin" isOptional={true}>

Paraglide çevirileri görüntüler, ancak bunları **oluşturmanıza** yardımcı olmaz. Intlayer **ücretsiz** ve **açık kaynaklıdır**; araçları bir Paraglide projesinde bile yardımcı olur:

- Kendi API anahtarınızı ve sağlayıcınızı kullanarak **Yapay Zeka ile Çeviri Yapın**. [Otomatik doldurma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md) ve [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) sayfalarına bakın.
- [JSON senkronizasyon eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) ile **JSON dosyalarınızı** tek doğruluk kaynağı olarak koruyun.
- CI ortamında **eksik çevirileri test edin**. [Çevirilerinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md) sayfasına bakın.
- [Scan komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/scan.md) ile **dağıtılmış sitenizi** eksik `hreflang`, yanlış canonical ve dil sızıntılarına karşı tarayın.

</Step>
</Steps>

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Paraglide JS, TanStack Start için iyi bir tercih midir?">

Oldukça güçlü bir tercihtir: resmi TanStack Router örneklerinde kullanılır, [karşılaştırma testinin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) en küçük çalışma zamanına sahiptir (~1.8 KB gzip) ve mesajlar tamamen tiplendirilmiştir. Dezavantajları ise her mesaj fonksiyonunun tüm dilleri içermesi (bu da diğer dillerdeki ziyaretçilere çevrilmiş metinlerin yaklaşık yarısının sızmasına neden olur) ve dil değiştirmenin sayfayı yeniden yüklemesidir.

</Question>
<Question title="Paraglide ile $locale rota segmentine ihtiyacım var mı?">

Hayır. Router `rewrite` mekanizması rota eşleşmesinden önce dil ön ekini kaldırır ve oluşturulan bağlantılara geri ekler, böylece tek bir `about.tsx` dosyası `/about`, `/fr/about` ve `/es/about` yollarına hizmet eder.

</Question>
<Question title="Dili değiştirmek neden sayfayı yeniden yükler?">

Mesaj fonksiyonları çağrıldıklarında dili doğrudan okur, bir React durumuna (state) abone değillerdir. Bu nedenle `setLocale` varsayılan olarak sayfayı yeniden yükler; böylece her mesaj yeni dilde yeniden render edilir. `{ reload: false }` seçeneğini iletebilirsiniz, ancak bu durumda bileşen ağacını kendiniz yeniden render etmeniz gerekir.

</Question>
<Question title="Oluşturulan src/paraglide klasörünü commitlemeli miyim?">

Commitlememek daha iyidir. Klasör her `dev` ve `build` işleminde yeniden oluşturulur ve commitlemek oluşturulan dosyalarda birleştirme çakışmalarına (merge conflicts) neden olur. Bunun yerine `messages/*.json` ve `project.inlang/settings.json` dosyalarını commitleyin.

</Question>
<Question title="Paraglide ile hreflang etiketlerini nasıl eklerim?">

Rota `head()` fonksiyonu içinde `localizeUrl` kullanarak dil başına bir mutlak URL oluşturun ve temel dile işaret eden bir `x-default` ekleyin. 10. adım yeniden kullanılabilir bir yardımcı sunar ve 11. adım aynı alternatifleri site haritasına ekler.

</Question>
<Question title="Paraglide kullanılmayan çevirileri tree-shake eder mi?">

`outputStructure: "message-modules"` kullandığınızda kullanılmayan **mesajlar** elenir, bu nedenle diğer sayfaların içeriği sızmaz. Kullanılmayan **diller** ise elenmez: her mesaj fonksiyonu tüm çevirileri içerir, bu nedenle karşılaştırma testi %49.7'lik bir dil sızıntısı ölçmektedir.

</Question>
<Question title="Paraglide'dan Intlayer'a geçiş yapabilir miyim?">

Evet. Her ikisi de derleyici tabanlıdır, bu nedenle zihinsel modelleri oldukça yakındır. [JSON senkronizasyon eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) ile JSON dosyalarınızı koruyun, ardından sayfa sayfa `m.key()` çağrılarını `useIntlayer` ile değiştirin. [Intlayer TanStack Start rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md) göz atın.

</Question>

</FAQ>
