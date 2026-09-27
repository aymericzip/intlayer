---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "use-intl ile TanStack Start i18n: Kapsamlı 2026 Kurulum Rehberi"
description: "TanStack Start uygulamanızı use-intl ile yerelleştirin: dil yönlendirmesi, tipli mesajlar, SSR, hreflang, site haritası ve robots.txt, ayrıca gerçek paket boyutu kıyaslama verileri."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Uluslararasılaştırma
  - i18n
  - SEO
  - Site Haritası
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "İlk sürüm"
author: aymericzip
---

# 2026 Yılında use-intl Kullanarak TanStack Start Uygulamanızı Nasıl Uluslararasılaştırırsınız?

## İçindekiler

<TOC/>

## use-intl Nedir?

**use-intl**, `next-intl` kütüphanesinin çatıdan bağımsız (framework-agnostic) çekirdeğidir. Next.js'e herhangi bir bağımlılığı olmadan aynı `useTranslations`, `useFormatter` ve `IntlProvider` API'lerini, ICU MessageFormat desteğini ve güçlü TypeScript entegrasyonunu sunar. Bu durum, onu bir **TanStack Start** uygulamasını yerelleştirmek için en popüler seçeneklerden biri yapar ve yapay zeka asistanlarının bu teknoloji yığını için en sık önerdiği kütüphanedir.

TanStack Start yerleşik bir i18n katmanı içermez. Yönlendirme (routing), dil algılama, SEO meta verileri ve site haritası oluşturma işlemleri geliştiriciye bırakılmıştır. Bu rehber tüm bu süreçleri baştan sona ele almaktadır:

- İsteğe bağlı `{-$locale}` segmenti ile **dil duyarlı yönlendirme** (`/about`, `/fr/about`).
- Bir sayfanın yalnızca oluşturduğu ad alanlarını ve dili indirmesini sağlayan **rota başına mesaj yükleme**.
- Metin uyuşmazlığı olmadan **sunucu taraflı işleme (SSR) ve hidrasyon**.
- **Eksiksiz çok dilli SEO**: çevrilmiş `<title>` ve açıklama, standart (canonical) URL, `x-default` içeren `hreflang` alternatifleri, Open Graph dilleri, JSON-LD, `xhtml:link` alternatifli site haritası, `robots.txt` ve her dilin önceden işlenmesi (pre-rendering).

> Farklı bir teknoloji yığını mı arıyorsunuz?

- [TanStack Start + Paraglide rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Lingui rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayer rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)

> Bunun yerine Next.js mi kullanıyorsunuz? [next-intl rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-intl.md) sayfasına bakın.

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)

## TanStack Start Üzerinde use-intl Kıyaslama (Benchmark) Sonuçları

[i18n kıyaslama testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md), her önemli kütüphane ile aynı 10 sayfalık ve 10 dilli TanStack Start uygulamasını çalıştırır ve tarayıcının gerçekte ne kadar veri indirdiğini ölçer.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

2026-09-26 tarihinde ölçülen `use-intl@4.14.2` için temel değerler (gzip):

| Kurulum                            | Kütüphane boyutu | Sayfa başına JS | Diğer dil sızıntısı | Diğer sayfa sızıntısı |
| :--------------------------------- | ---------------: | --------------: | ------------------: | --------------------: |
| i18n yok (temel uygulama)          |                - |        111.0 KB |                  0% |                    0% |
| `use-intl` (bu rehberdeki kurulum) |          75.9 KB |        128.7 KB |                  0% |                    0% |
| `@intlayer/use-intl` (uyumluluk)   |           6.7 KB |        129.4 KB |                  0% |                    0% |
| `react-intlayer` (yerel Intlayer)  |           4.5 KB |        126.8 KB |                  0% |                    0% |

Çıkarılması gereken temel sonuçlar:

- **Mesajları sayfaya göre bölün ve her dil için ayrı yükleyin.** Bu, her iki sızıntıyı da ortadan kaldırır ve aşağıdaki adımlarda uygulanan yöntemdir.
- **Çalışma zamanının kendisi ağır kalmaktadır** (~76 KB gzip), çünkü ICU ayrıştırıcısı istemciye gönderilir. `@intlayer/use-intl` uyumluluk adaptörü (17. adım), ~7 KB çalışma zamanı ile tamamen aynı API'yi korur.

> Tüm verileri inceleyin: [TanStack Start kıyaslama raporu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) ve [kıyaslama deposu](https://github.com/intlayer-org/benchmark-i18n).

## TanStack Start Üzerinde Özellik Karşılaştırması

`use-intl` kütüphanesinin TanStack Start üzerinde yaygın olarak kullanılan diğer kütüphanelerle karşılaştırması:

| Özellik                                   | `react-intlayer` (Intlayer)          | `use-intl`                | Paraglide JS                                    | Lingui                         |
| ----------------------------------------- | ------------------------------------ | ------------------------- | ----------------------------------------------- | ------------------------------ |
| **Bileşenlerin yanında çeviriler**        | ✅ Birlikte konumlandırılmış         | ❌ Merkezi JSON           | ❌ Dil başına tek JSON dosyası                  | ⚠️ Bileşen içinde kaynak metin |
| **TypeScript entegrasyonu**               | ✅ Otomatik üretilen tipler          | ✅ `AppConfig` ile        | ✅ Tipli mesaj fonksiyonları                    | ⚠️ Yalnızca makrolar           |
| **Eksik çeviri algılama**                 | ✅ Tip hataları ve derleme uyarıları | ⚠️ Çalışma zamanı yedeği  | ⚠️ Temel dile geri döner                        | ⚠️ Kaynak metne geri döner     |
| **Zengin içerik (JSX, Markdown)**         | ✅ Doğrudan destek                   | ⚠️ `t.rich` ile etiketler | ⚠️ Düz metinler                                 | ✅ `<Trans>` içinde JSX        |
| **Yerelleştirilmiş yönlendirme**          | ✅ Yerleşik                          | ❌ Manuel `{-$locale}`    | ✅ `urlPatterns` + router rewrite               | ❌ Manuel `{-$locale}`         |
| **Yenileme olmadan dil değiştirme**       | ✅ Evet                              | ✅ Evet                   | ❌ Tam sayfa yenileme                           | ✅ Evet                        |
| **Çoğullaştırma (Pluralization)**         | ✅ Numaralandırma tabanlı            | ✅ ICU                    | ✅ Varyantlar                                   | ✅ ICU                         |
| **ICU MessageFormat**                     | ✅ `format: "icu"` ile               | ✅ Yerel                  | ⚠️ inlang eklentisi ile                         | ✅ Yerel                       |
| **İçerik formatları**                     | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                | ⚠️ inlang JSON                                  | ✅ PO, JSON, CSV               |
| **Yapay zeka ile çeviri**                 | ✅ Kendi sağlayıcınız ve anahtarınız | ❌ Yok                    | ❌ Yok                                          | ❌ Yok                         |
| **Görsel editör / CMS**                   | ✅ Yerel editör + isteğe bağlı CMS   | ❌ Harici platformlar     | ⚠️ inlang ekosistem uygulamaları                | ❌ Harici platformlar          |
| **SEO yardımcıları (hreflang, sitemap)**  | ✅ Yerleşik                          | ❌ Manuel                 | ⚠️ Yerelleştirilmiş URL'ler, geri kalanı manuel | ❌ Manuel                      |
| **Çalışma zamanı boyutu (gzip)**          | 4.5 KB                               | 75.9 KB                   | 1.8 KB                                          | 56.7 KB                        |
| **Sızıntı, en iyi kurulum (dil / sayfa)** | 0% / 0%                              | 0% / 0%                   | 49.7% / 0%                                      | 8.6% / 0%                      |
| **CI üzerinde eksik çeviriler**           | ✅ `npx intlayer test`               | ⚠️ Yerleşik değil         | ⚠️ Yerleşik değil                               | ✅ `lingui compile --strict`   |

> Çalışma zamanı boyutu ve sızıntı değerleri [TanStack Start kıyaslama testinden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) alınmıştır. Sızıntı, her kütüphanenin en iyi yapılandırmasında ölçülmüştür.

> Diğer TanStack Start rehberleri:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)

## Uygulamanız Gereken En İyi Pratikler

- Erişilebilirlik, ekran okuyucular ve arama motorları için **`<html>` etiketinde `lang` ve `dir` tanımlayın**.
- **Her dil için tek bir URL kullanın.** Yalnızca çerez tabanlı bir geçiş yerine dil öneki (`/fr/about`) kullanın, böylece her çevrilmiş sayfa taranabilir ve paylaşılabilir olur.
- **Mesajları ad alanına (namespace) göre bölün** (`common`, `home`, `about`) ve bunları rota bazında yükleyin.
- **Yalnızca aktif dili yükleyin.** İstemciye gönderilen bir modülde asla tüm dil dosyalarını içe aktarmayın.
- `IntlProvider` içinde **saat dilimini sabitleyin**. Aksi takdirde tarihler SSR sırasında sunucu saat diliminde, hidrasyonda ise ziyaretçi saat diliminde biçimlendirilir ve bu da hidrasyon uyuşmazlıklarına (hydration mismatch) yol açar.
- **Meta verilerinizi çevirin** ve her sayfada `canonical`, `hreflang` ve `x-default` tanımlayın.
- **Çok dilli bir site haritası ve robots.txt oluşturun** ve her dili önceden işleyin (pre-render).
- Arama motoru botlarının her dili keşfedebilmesi için dil değiştirici için `<select>` yerine **gerçek bağlantılar (linkler) kullanın**.
- Eksik bir anahtarın derleme zamanında hata vermesi için **mesajlarınızı tiplendirin**.

- [Uluslararasılaştırma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md)
- [hreflang rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md)

## TanStack Start Uygulamasında use-intl Kurulumu İçin Adım Adım Rehber

Oluşturacağımız proje yapısı şu şekildedir:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # İstek ara yazılımı (dil yönlendirmesi)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Diller, URL yardımcıları
    │   ├── messages.ts           # Ad alanı ve dil bazında yükleyici
    │   ├── negotiateLocale.ts    # Accept-Language ayrıştırma
    │   ├── seo.ts                # head() oluşturucu
    │   └── use-intl.d.ts         # Tipli mesajlar
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Dil düzeni + IntlProvider
            ├── index.tsx         # / ve /fr
            ├── about.tsx         # /about ve /fr/about
            └── $.tsx             # Yerelleştirilmiş 404
```

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

Bir TanStack Start projesiyle başlayın ve ardından `use-intl` ekleyin:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: `IntlProvider`, `useTranslations`, `useFormatter` ve `createTranslator` (React dışında, örneğin `head()` içinde kullanılabilir) sağlar.

</Step>
<Step number={2} title="Dil Yapılandırmanızı Merkezileştirin">

Dilleriniz ve URL yardımcılarınız için tek bir doğruluk kaynağı (source of truth) oluşturun. Diğer tüm dosyalar (rotalar, SEO, site haritası, ön işleme) buradan içe aktarılır, böylece yeni bir dil eklemek tek satırlık bir değişikliktir.

Varsayılan dil öneksiz kalır (`/about`), diğer diller ise önek alır (`/fr/about`). Bu "ihtiyaca göre" stratejisidir: dil başına sayfa başına bir URL ve ana kitleniz için kısa URL'ler.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Çeviri Dosyalarınızı Oluşturun">

Mesajları dile ve ad alanına göre düzenleyin. `common`, her sayfanın ihtiyaç duyduğu öğeleri (navigasyon, altbilgi) tutar ve her sayfa meta verileri de dahil olmak üzere kendi dosyasına sahip olur.

use-intl **ICU MessageFormat** kullanır; bu nedenle çoğullar, seçimler ve biçimlendirilmiş bağımsız değişkenler doğrudan iletinin içinde yer alır.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

`home.json` dosyasını da aynı şekilde bir `metadata` nesnesi ve sayfa içeriği ile oluşturun.

</Step>
<Step number={4} title="Mesajları Ad Alanı ve Dil Başına Yükleyin">

Bu yükleyici performans açısından en kritik dosyadır. `import.meta.glob`, Vite'e **her JSON dosyası için bir parça (chunk)** oluşturmasını söyler. Fransızca olarak `["about"]` isteyen bir rota `messages/fr/about.json` dosyasını indirir ve başka hiçbir şey indirmez; kıyaslama testinde %0 dil sızıntısı ve %0 sayfa sızıntısına bu şekilde ulaşılır.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Mesajlarınızı Tiplendirin">

Modül genişletme (module augmentation), `useTranslations("about")` ve `t("counter.label")` üzerinde otomatik tamamlama sağlar ve yazım hatalarında veya silinen anahtarlarda derleme hatası verir.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

`tsconfig.json` dosyanızda `resolveJsonModule` seçeneğinin etkinleştirildiğinden emin olun.

</Step>
<Step number={6} title="Kök Dokümanı Oluşturun">

Kök rota `<html>` etiketini işler. `lang` ve `dir` değerlerini ayarlamak için isteğe bağlı dil parametresini okur, böylece öznitelikler herhangi bir JavaScript çalışmadan önce sunucu tarafından oluşturulan HTML içinde doğru şekilde yer alır.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="Dil Düzeni Rotasını Oluşturun">

`{-$locale}` klasörü **isteğe bağlı** bir yol segmenti oluşturur: `/about` ve `/fr/about` yollarının her ikisi de `/{-$locale}/about` ile eşleşir. Bu düzen:

1. Desteklenmeyen önekleri reddeder (`/xx/about` → 404).
2. Yalnızca geçerli dil için `common` ad alanını yükler.
3. Mesajları `IntlProvider` aracılığıyla sağlar.

Yükleyici sonucu HTML içine serileştirilir ve hidrasyonda yeniden kullanılır, böylece istemci `common.json` dosyasını ikinci kez indirmez. `staleTime: Infinity` istemci geçişlerinde önbellekte tutulmasını sağlar.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` üst sağlayıcıdan gelen mesajları birleştirmez. Bir sonraki adım bunu gerçekleştiren küçük bir bileşen ekler, böylece her sayfa `common` üzerine kendi ad alanını ekleyebilir.

</Step>
<Step number={8} title="Sayfa Mesajlarını Kapsamlandırın (Scope)">

Her sayfa kendi yükleyicisinde kendi ad alanını yükler ve ardından içeriğini `ScopedMessages` ile sarmalar; bu bileşen sayfa ad alanını üst mesajlarla birleştirir.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Sayfalarınızda Çevirileri Kullanın">

Sayfa yükleyicisi geçerli dil için `about` ad alanını getirir, `head()` bundan çevrilmiş ve SEO uyumlu meta veriler oluşturur (13. adıma bakın) ve bileşen içeriği işler.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Bileşenlerde Çevirileri ve Biçimlendiricileri Kullanın">

Sağlayıcıların altındaki herhangi bir bileşen `useTranslations` ve `useFormatter` çağırabilir. Çoğullar ICU tarafından çözümlenir ve sayılar aktif dile göre biçimlendirilir.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Yerelleştirilmiş Bağlantı Bileşeni Oluşturun" isOptional={true}>

Her rota `{-$locale}` altında yer alır, bu nedenle bir bağlantı geçerli dil parametresini taşımalıdır. Bu sarmalayıcı TanStack Router'ın tipli `to` özelliğini korur ve dil parametresini sizin yerinize ekler.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="İçeriğinizin Dilini Değiştirin" isOptional={true}>

Dil değiştiriciyi bir `<select>` yerine **bağlantılar (linkler)** olarak işleyin. Bağlantılar taranabilir olduğundan arama motorları her dil sürümünü bulabilir ve JavaScript olmadan da çalışırlar. `to="."` geçerli sayfayı korur ve yalnızca dil parametresini değiştirir. Çerez, 16. adımdaki yönlendirme ara yazılımı için yapılan açık tercihi hatırlar.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="Meta Verilerinizi Uluslararasılaştırın" isOptional={true}>

i18n yapısının en büyük fayda sağladığı yer burasıdır: her dil sürümü bağımsız olarak sıralama kazanabilir. Her sayfa şunları sağlamalıdır:

- **çevrilmiş** bir `<title>` ve `description`;
- kendisine işaret eden **standart (canonical)** bir URL (varsayılan dile değil);
- dil başına bir **`hreflang` alternatifi** ve eşleşmeyen diller için **`x-default`**;
- sosyal önizlemeler tarafından kullanılan **Open Graph** `og:locale`, `og:locale:alternate` ve `og:url` etiketleri;
- arama motorlarının ve yapay zeka asistanlarının sayfanın dilini belirlemesine yardımcı olan `inLanguage` içeren **JSON-LD**.

Tek bir yardımcı fonksiyon tüm bunları oluşturur, böylece sayfa kodları kısa kalır:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
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

Bunu 9. adımda gösterildiği gibi her sayfanın `head()` fonksiyonunda kullanın. Ana sayfa için `path: "/"` değerini iletin.

</Step>
<Step number={14} title="Site Haritanızı Uluslararasılaştırın" isOptional={true}>

Çok dilli bir site haritası **her dilin her URL'sini** listeler ve her girdi `xhtml:link` ile tüm alternatiflerini bildirir. Google bu ek açıklamaları tıpkı sayfadaki `hreflang` etiketleri gibi kullanır; bu da bir sayfa nadiren tarandığında bunları güvenilir bir yedek haline getirir.

TanStack Start sunucu rotaları bunu bir dosya rotasından sunmanıza olanak tanır:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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
<Step number={15} title="robots.txt Dosyanızı Uluslararasılaştırın" isOptional={true}>

Gizli (özel) rotalar her dilde mevcuttur, bu nedenle `Disallow` kuralları her öneki kapsamalıdır. Başlangıç şablonu oluşturduysa `public/robots.txt` dosyasını kaldırın ve ardından bunu bir rotadan sunun:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="İlk Kez Gelen Ziyaretçileri Kendi Dillerine Yönlendirin" isOptional={true}>

Bir istek ara yazılımı, `/` adresine gelen bir ziyaretçiyi önce dil çerezine, ardından `Accept-Language` başlığına bakarak tercih ettiği dile yönlendirir. Yalnızca `/` yönlendirilir: derin bağlantılara (deep links) asla dokunulmaz, böylece paylaşılan URL'ler ve tarayıcı botları her zaman istedikleri sayfaya ulaşır.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Dil değiştiricide açıkça İngilizceyi seçen bir ziyaretçinin çerezine `locale=en` yazılır, bu yüzden tekrar yönlendirilmez. Tamamen statik bir dağıtımda (18. adım), `/` bir dosya olarak sunulur ve bu ara yazılım çalışmaz; bu tamamen normaldir: sayfa erişilebilir kalır ve dil değiştirici gerisini halleder.

</Step>
<Step number={17} title="use-intl API'sini Koruyun, Intlayer ile Çalışma Zamanını Küçültün" isOptional={true}>

Kıyaslama testi, use-intl kurulumunun en ağır kısmının çalışma zamanının kendisi olduğunu göstermektedir (~76 KB gzip). [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) uyumluluk adaptörü **aynı API'yi** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU çoğulları, `t.rich`) sunar, ancak bunu derlenmiş Intlayer sözlüklerinden sağlar: bileşenlerinizde hiçbir değişiklik yapmadan **~75.9 KB yerine ~6.7 KB**, %0 dil sızıntısı ve %0 sayfa sızıntısı elde edersiniz.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Vite eklentisi `use-intl` paketini adaptöre yönlendirir (alias), böylece mevcut import ifadeleri çalışmaya devam eder:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

[JSON senkronizasyon eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) sayesinde JSON dosyalarınız doğruluk kaynağı olarak kalır:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> Adaptör ayrıca sorunsuz bir geçiş yolu sunar: çalışır hale geldikten sonra bileşenleri tek tek yerel `useIntlayer` API'sine taşıyabilirsiniz. [Intlayer TanStack Start rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md) göz atın.

</Step>
<Step number={18} title="Her Dili Önceden İşleyin (Pre-render)" isOptional={true}>

Statik HTML, sunabileceğiniz en hızlı ve dizine eklenmesi en kolay sayfadır. TanStack Start'ın derleme zamanında tüm dil sürümlerini, ayrıca site haritası ve robots dosyalarını önceden işlemesi için yerelleştirilmiş tüm yolları listeleyin:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Dil değiştirici gerçek bağlantılar oluşturduğu için `crawlLinks: true` listelemeyi unuttuğunuz sayfaları da otomatik olarak keşfeder.

</Step>
<Step number={19} title="Yerelleştirilmiş 404 Sayfalarını Yönetin" isOptional={true}>

7. adımdaki düzen, bilinmeyen dil önekleri için zaten `notFound()` fırlatır. Bir dil içindeki bilinmeyen yolların da yerelleştirilmiş 404 sayfasını işlemesi için her şeyi yakalayan (catch-all) bir rota ekleyin ve bunu `noindex` olarak işaretleyin: React 19 `<meta>` etiketini otomatik olarak `<head>` içine taşır.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Sunucu Fonksiyonlarında Dile Erişin" isOptional={true}>

Sunucu fonksiyonları rota parametrelerini almaz. Yerelleştirilmiş bir e-posta göndermek veya bir dil tercihini kaydetmek için dil çerezini okuyun ve gerekirse `Accept-Language` başlığına geri dönün:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Sunucu fonksiyonu içinde çeviri yapmak için bunu `use-intl` kütüphanesinden `loadMessages` ve `createTranslator` ile birleştirin.

</Step>
<Step number={21} title="Intlayer Kullanarak Çevirilerinizi Otomatikleştirin" isOptional={true}>

use-intl çevirileri işler, ancak bunları **oluşturmanıza** yardımcı olmaz. Intlayer **ücretsizdir** ve **açık kaynaklıdır**; use-intl kullanmaya devam etseniz bile bu boşluğu doldurur:

- CI veya birim testlerinde **eksik çevirileri test edin**. [Çevirilerinizi test etme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md) sayfasına bakın.
- Kendi API anahtarınız ve sağlayıcınızla **yapay zeka ile çevirin**: `npx intlayer fill` eksik anahtarları uygulamanızın bağlamıyla çevirir. [Otomatik tamamlama (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md) ve [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) sayfalarına bakın.
- [JSON senkronizasyon eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) ile **JSON dosyalarınızı** doğruluk kaynağı olarak koruyun.
- Geliştirici olmayanların çevirileri güncelleyebilmesi için [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile **içeriği görsel olarak düzenleyin**.
- [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) ve [ajan yetenekleri (skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) ile **yapay zeka ajanınıza bağlam sağlayın**.
- [Scan komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/scan.md) ile dağıtılmış sitenizi eksik `hreflang`, yanlış canonical ve dil sızıntılarına karşı **tarayın**.

Tüm özellikleri keşfetmek için [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) sayfasına bakın.

</Step>
</Steps>

## Sıkça Sorulan Sorular

<FAQ>

<Question title="use-intl TanStack Start için iyi bir tercih midir?">

Next.js dışında `next-intl` API'sini kullanmak istiyorsanız evet. Size ICU mesajları, biçimlendiriciler ve iyi bir TypeScript desteği sunar; ayrıca `setRequestLocale` gibi Next.js'e özgü kısıtlamalardan kaçınmanızı sağlar. Dezavantajı ise ağırlığıdır: [kıyaslama testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) çalışma zamanı için ~76 KB gzip ölçmektedir ve basit bir kurulum tüm dilleri ve sayfaları tarayıcıya gönderir. Sızıntıları önlemek için bu rehberde olduğu gibi ad alanlarını rota ve dil bazında yükleyin.

</Question>
<Question title="use-intl ile next-intl arasındaki fark nedir?">

`use-intl`, `next-intl` paketinin çekirdeğidir. `next-intl` bunun üzerine Next.js entegrasyonlarını ekler: ara yazılım, navigasyon yardımcıları, Sunucu Bileşenleri için `getTranslations` ve istek yapılandırması. TanStack Start üzerinde doğrudan `use-intl` kullanırsınız ve yönlendirmeyi yukarıda gösterildiği gibi TanStack Router ile uygularsınız.

</Question>
<Question title="Dili saklamak için dil öneki mi yoksa çerez mi kullanmalıyım?">

URL içinde bir önek kullanın. Böylece her dil sürümü arama motorlarının dizine ekleyebileceği ve kullanıcıların paylaşabileceği kendi URL'sine sahip olur. Bir çerez ise 16. adımdaki yönlendirme ara yazılımının yaptığı gibi açıkça yapılan bir tercihi hatırlamak için faydalıdır.

</Question>
<Question title="Tarihleri biçimlendirirken neden hidrasyon uyuşmazlığı (hydration mismatch) alıyorum?">

Sunucu ve tarayıcı tarihleri farklı saat dilimlerinde biçimlendirir. Her iki tarafın da aynı metni üretmesi için `IntlProvider` bileşenine açık bir `timeZone` (veya çerezde saklanan ziyaretçi saat dilimini) iletin.

</Question>
<Question title="use-intl paket boyutunu nasıl küçültebilirim?">

İlk olarak, mesajları ad alanına göre bölün ve `import.meta.glob` ile rota ve dil bazında yükleyin; bu, dil ve sayfa sızıntılarını ortadan kaldırır. Ardından, çalışma zamanı boyutu önemliyse [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) adaptörüne geçin: aynı API, kıyaslama testinde ~75.9 KB yerine ~6.7 KB.

</Question>
<Question title="use-intl ile başlık ve meta açıklamayı nasıl çevirebilirim?">

Rota yükleyicisinin döndürdüğü mesajlarla rota `head()` fonksiyonu içinde `createTranslator` çağırın, ardından `title`, `description`, canonical ve `hreflang` bağlantılarını döndürün. 13. adım yeniden kullanılabilir bir yardımcı fonksiyon sunmaktadır.

</Question>
<Question title="use-intl'den Intlayer'a kademeli olarak geçebilir miyim?">

Evet. Önce uyumluluk adaptörünü kurun (17. adım): bileşenleriniz `useTranslations` çağırmaya devam eder ve artık Intlayer tarafından desteklenir. Ardından bileşenleri tek tek `useIntlayer` API'sine taşıyın ve içerikleri yanlarında tanımlayın. [Uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) ve [Intlayer TanStack Start rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md) sayfalarına bakın.

</Question>

</FAQ>
