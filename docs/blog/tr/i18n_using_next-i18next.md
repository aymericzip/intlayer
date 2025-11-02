---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-i18next kullanarak Next.js uygulamanızı nasıl uluslararasılaştırırsınız
description: next-i18next ile i18n kurulumu: çok dilli Next.js uygulamaları için en iyi uygulamalar ve SEO ipuçları, uluslararasılaştırma, içerik organizasyonu ve teknik kurulum konularını kapsar.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: İlk sürüm
---

# 2025'te next-i18next kullanarak Next.js uygulamanızı nasıl uluslararasılaştırırsınız

## İçindekiler

<TOC/>

## next-i18next nedir?

**next-i18next**, Next.js uygulamaları için popüler bir uluslararasılaştırma (i18n) çözümüdür. Orijinal `next-i18next` paketi Pages Router için tasarlanmışken, bu rehber size modern **App Router** ile `i18next` ve `react-i18next` kullanarak i18next'i doğrudan nasıl uygulayacağınızı gösterir.

Bu yaklaşımla şunları yapabilirsiniz:

- **Çevirileri isim alanları kullanarak organize edin** (örneğin, `common.json`, `about.json`) böylece içerik yönetimini iyileştirin.
- **Çevirileri verimli şekilde yükleyin**; her sayfa için sadece gerekli isim alanlarını yükleyerek paket boyutunu küçültün.
- **Hem sunucu hem de istemci bileşenlerini destekleyin**; uygun SSR ve hydration işlemlerini sağlayın.
- **TypeScript desteğini garanti altına alın**; tür güvenli yerel ayar yapılandırması ve çeviri anahtarları kullanın.
- **SEO için optimize edin**; uygun metadata, sitemap ve robots.txt uluslararasılaştırması ile.

> Alternatif olarak, [next-intl rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_with_next-intl.md) veya doğrudan [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md) kullanımına da başvurabilirsiniz.

> Karşılaştırmayı [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) sayfasında görebilirsiniz.

## Takip etmeniz gereken uygulamalar

Uygulamaya başlamadan önce, takip etmeniz gereken bazı uygulamalar şunlardır:

- **HTML `lang` ve `dir` özniteliklerini ayarlayın**
- Düzeninizde, `dir` değerini `getLocaleDirection(locale)` kullanarak hesaplayın ve uygun erişilebilirlik ve SEO için `<html lang={locale} dir={dir}>` olarak ayarlayın.
- **Mesajları namespace'e göre ayırın**
  JSON dosyalarını locale ve namespace (örneğin, `common.json`, `about.json`) bazında organize edin, böylece sadece ihtiyacınız olanları yükleyin.
- **İstemci yükünü minimize edin**
  Sayfalarda, sadece gerekli namespace'leri `NextIntlClientProvider`'a gönderin (örneğin, `pick(messages, ['common', 'about'])`).
- **Statik sayfaları tercih edin**
  Daha iyi performans ve SEO için mümkün olduğunca statik sayfalar kullanın.
- **Sunucu bileşenlerinde I18n**
  Sayfalar veya `client` olarak işaretlenmemiş tüm bileşenler gibi sunucu bileşenleri statiktir ve build zamanında önceden render edilebilir. Bu yüzden çeviri fonksiyonlarını onlara props olarak geçmemiz gerekecek.
- **TypeScript tiplerini ayarlayın**
- Uygulamanız genelinde tip güvenliğini sağlamak için locale'larınız için TypeScript tiplerini ayarlayın.
- **Yönlendirme için Proxy kullanımı**
  Locale tespiti ve yönlendirmeyi yönetmek için bir proxy kullanın ve kullanıcıyı uygun locale önekli URL'ye yönlendirin.
- **Metadata, sitemap, robots.txt'nin uluslararasılaştırılması**
  Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanarak metadata, sitemap ve robots.txt dosyalarınızı uluslararasılaştırın; böylece tüm locale'larda arama motorları tarafından daha iyi keşfedilmesini sağlayın.
- **Linkleri yerelleştirin**
  Kullanıcıyı uygun locale önekli URL'ye yönlendirmek için `Link` bileşenini kullanarak linkleri yerelleştirin. Sayfalarınızın tüm locale'larda keşfedilmesini sağlamak önemlidir.
- **Testleri ve çevirileri otomatikleştirin**
  Testleri ve çevirileri otomatikleştirmek, çok dilli uygulamanızı sürdürürken zaman kaybını önlemeye yardımcı olur.

> Uluslararasılaştırma ve SEO hakkında bilmeniz gereken her şeyi listeleyen dokümanımıza bakın: [next-intl ile Uluslararasılaştırma (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md).

---

## Next.js Uygulamasında i18next Kurulumu için Adım Adım Rehber

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> GitHub'da [Uygulama Şablonuna](https://github.com/aymericzip/next-i18next-template) bakın.

Oluşturacağımız proje yapısı şöyle olacak:

```bash
.
├── i18n.config.ts
└── src # Src isteğe bağlıdır
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Tüm sayfaları home mesajlarıyla kirletmemek için Route Grubu)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Çeviri yükleme ve yönetimini sağlayan temel uluslararasılaştırma çerçevesi.
- **react-i18next**: i18next için React bağlayıcıları; client bileşenler için `useTranslation` gibi hook'lar sağlar.
- **i18next-resources-to-backend**: Çeviri dosyalarının dinamik yüklenmesini sağlayan bir eklenti; sadece ihtiyacınız olan namespace'leri yüklemenize olanak tanır.

### Adım 2: Projenizi Yapılandırın

Desteklenen yerel ayarları, varsayılan yerel ayarı ve URL yerelleştirmesi için yardımcı fonksiyonları tanımlamak üzere bir yapılandırma dosyası oluşturun. Bu dosya, i18n kurulumunuz için tek gerçek kaynak olarak hizmet eder ve uygulamanız genelinde tür güvenliğini sağlar.

Yerel ayar yapılandırmanızı merkezileştirmek tutarsızlıkları önler ve gelecekte yerel ayar ekleme veya kaldırmayı kolaylaştırır. Yardımcı fonksiyonlar, SEO ve yönlendirme için tutarlı URL oluşturulmasını garanti eder.

```ts fileName="i18n.config.ts"
// Tür güvenliği için desteklenen yerel ayarları const dizi olarak tanımlayın
// 'as const' ifadesi TypeScript'in string[] yerine literal türleri çıkarmasını sağlar
export const locales = ["en", "fr"] as const;

// Locale türünü locales dizisinden çıkarın
// Bu, birleşik bir tür oluşturur: "en" | "fr"
export type Locale = (typeof locales)[number];

// Yerel ayar belirtilmediğinde kullanılan varsayılan yerel ayarı ayarla
export const defaultLocale: Locale = "en";

// Özel metin yönlendirmesi gerektiren sağdan sola diller
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Bir yerel ayarın RTL (sağdan sola) metin yönlendirmesi gerektirip gerektirmediğini kontrol et
// Arapça, İbranice, Farsça ve Urduca gibi diller için kullanılır
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Belirli bir yerel ayar ve yol için yerelleştirilmiş bir yol oluştur
// Varsayılan yerel ayar yollarında önek yoktur (örneğin, "/about" "/en/about" yerine)
// Diğer yerel ayarlar önek alır (örneğin, "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Mutlak URL'ler için temel URL (site haritaları, metadata vb. için kullanılır)
const ORIGIN = "https://example.com";

// Yerel ayar öneki ile mutlak URL oluştur
// SEO metadata, site haritaları ve canonical URL'ler için kullanılır
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Tarayıcıda yerel ayar çerezi ayarlamak için kullanılır
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 yıl
    "SameSite=Lax",
  ].join("; ");
}
```

### Adım 3: Çeviri Ad Alanlarını Merkezileştir

Uygulamanızın sunduğu her namespace için tek bir doğruluk kaynağı oluşturun. Bu listeyi yeniden kullanmak, sunucu, istemci ve araç kodlarının senkronize kalmasını sağlar ve çeviri yardımcıları için güçlü tip desteğini açar.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Adım 4: TypeScript ile Çeviri Anahtarlarını Güçlü Tip Yapmak

`i18next`'i, kanonik dil dosyalarınızı (genellikle İngilizce) işaret edecek şekilde genişletin. TypeScript böylece her namespace için geçerli anahtarları çıkarır ve `t()` çağrıları baştan sona kontrol edilir.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> İpucu: Bu bildirimi `src/types` altında saklayın (klasör yoksa oluşturun). Next.js zaten `tsconfig.json` içinde `src`'yi içerdiği için bu genişletme otomatik olarak algılanır. Eğer algılanmazsa, `tsconfig.json` dosyanıza aşağıdakini ekleyin:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Bununla birlikte otomatik tamamlama ve derleme zamanı kontrollerine güvenebilirsiniz:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// TAMAM, tipli: t("counter.increment")
// HATA, derleme hatası: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Adım 5: Sunucu Tarafı i18n Başlatmasını Kurun

Sunucu bileşenleri için çevirileri yükleyen bir sunucu tarafı başlatma fonksiyonu oluşturun. Bu fonksiyon, sunucu tarafı render için ayrı bir i18next örneği oluşturur ve çevirilerin render edilmeden önce yüklendiğinden emin olur.

Sunucu bileşenlerinin kendi i18next örneğine ihtiyacı vardır çünkü istemci bileşenlerinden farklı bir bağlamda çalışırlar. Sunucuda çevirilerin önceden yüklenmesi, çevrilmemiş içeriğin anlık görünmesini engeller ve arama motorlarının çevrilmiş içeriği görmesini sağlayarak SEO'yu iyileştirir.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// i18next için dinamik kaynak yüklemeyi yapılandır
// Bu fonksiyon, locale ve namespace'e göre çeviri JSON dosyalarını dinamik olarak içe aktarır
// Örnek: locale="fr", namespace="about" -> "@/locales/fr/about.json" dosyasını içe aktarır
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Sunucu tarafı render için i18next örneğini başlatır
 *
 * @returns Sunucu tarafı kullanım için hazır başlatılmış i18next örneği
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Yeni bir i18next örneği oluştur (istemci tarafı örneğinden ayrı)
  const i18n = createInstance();

  // React entegrasyonu ve backend yükleyici ile başlat
  await i18n
    .use(initReactI18next) // React hook desteğini etkinleştir
    .use(backend) // Dinamik kaynak yüklemeyi etkinleştir
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Daha iyi performans için sadece belirtilen namespace'leri yükle
      defaultNS: "common", // Belirtilmezse varsayılan namespace
      interpolation: { escapeValue: false }, // HTML'yi kaçırma (React XSS korumasını sağlar)
      react: { useSuspense: false }, // SSR uyumluluğu için Suspense'i devre dışı bırak
      returnNull: false, // Eksik anahtarlar için null yerine boş string döndür
      initImmediate: false, // Kaynaklar yüklenene kadar başlatmayı ertele (daha hızlı SSR)
    });
  return i18n;
}
```

### Adım 6: İstemci Tarafı i18n Sağlayıcısı Oluşturun

Uygulamanızı i18next bağlamı ile saran bir istemci bileşen sağlayıcısı oluşturun. Bu sağlayıcı, sunucudan önceden yüklenmiş çevirileri alarak çevrilmemiş içeriğin anlık görünmesini (FOUC) önler ve tekrar eden veri çekimini engeller.

İstemci bileşenlerin, tarayıcıda çalışan kendi i18next örneğine ihtiyacı vardır. Sunucudan önceden yüklenmiş kaynakları kabul ederek, sorunsuz hidratasyon sağlarız ve içerik yanıp sönmesini önleriz. Sağlayıcı ayrıca dil değişikliklerini ve isim alanı yüklemelerini dinamik olarak yönetir.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// İstemci tarafı için dinamik kaynak yüklemeyi yapılandır
// Sunucu tarafıyla aynı desen, ancak bu örnek tarayıcıda çalışır
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Sunucudan önceden yüklenmiş kaynaklar (FOUC - Çevirisi yapılmamış İçerik Flaşını önler)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Uygulamayı i18next context ile saran istemci tarafı i18n sağlayıcısı
 * Çevirilerin yeniden alınmasını önlemek için sunucudan önceden yüklenmiş kaynakları alır
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // useState tembel başlatıcısı kullanarak i18n örneğini bir kez oluştur
  // Bu, örneğin her renderda değil, yalnızca bir kez oluşturulmasını sağlar
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Eğer kaynaklar (sunucudan) sağlanmışsa, istemci tarafı isteklerini önlemek için bunları kullan
        // Bu, FOUC'u önler ve ilk yükleme performansını artırır
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Tanımsız değerlerin dönmesini engelle
      });

    return i18nInstance;
  });

  // locale prop değiştiğinde dili güncelle
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // İstemci tarafında gerekli tüm namespace'lerin yüklendiğinden emin ol
  // Dizileri doğru karşılaştırmak için join("|") bağımlılığı kullanılıyor
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // i18n örneğini React context aracılığıyla tüm alt bileşenlere sağla
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Adım 7: Dinamik Yerel Yönlendirmeleri Tanımla

Uygulama klasörünüzde `[locale]` adlı bir dizin oluşturarak yerel bazlı dinamik yönlendirmeleri ayarlayın. Bu, Next.js'in her yerelin URL segmenti olarak işlendiği yerel bazlı yönlendirmeleri yönetmesini sağlar (örneğin, `/en/about`, `/fr/about`).

Dinamik yönlendirmeleri kullanmak, Next.js'in tüm yereller için derleme zamanında statik sayfalar oluşturmasını sağlar, bu da performansı ve SEO'yu artırır. Layout bileşeni, yerel ayara göre HTML `lang` ve `dir` özniteliklerini ayarlar; bu, erişilebilirlik ve arama motorlarının anlayışı için kritik öneme sahiptir.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Dinamik parametreleri devre dışı bırak - tüm yerel ayarlar build zamanında bilinmelidir
// Bu, tüm yerel rota için statik üretimi garanti eder
export const dynamicParams = false;

/**
 * Build zamanında tüm yerel ayarlar için statik parametreler oluşturur
 * Next.js burada döndürülen her yerel için sayfaları önceden render eder
 * Örnek: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Yerel ayara özgü HTML özniteliklerini yöneten kök layout bileşeni
 * lang özniteliğini ve metin yönünü (ltr/rtl) yerel ayara göre ayarlar
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  /// URL parametrelerinden locale doğrulaması yapın
  /// Geçersiz bir locale sağlanırsa, varsayılan locale geri dönülür
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  /// Locale'a göre metin yönünü belirleyin
  /// Arapça gibi RTL dilleri için doğru metin görüntülemesi adına dir="rtl" gereklidir
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Adım 8: Çeviri Dosyalarınızı Oluşturun

Her locale ve namespace için JSON dosyaları oluşturun. Bu yapı, çevirileri mantıklı şekilde organize etmenize ve her sayfa için sadece ihtiyacınız olanları yüklemenize olanak sağlar.

Çevirileri namespace (örneğin, `common.json`, `about.json`) bazında organize etmek, kod bölme (code splitting) yapılmasını sağlar ve paket boyutunu küçültür. Her sayfa için sadece gereken çevirileri yüklersiniz, bu da performansı artırır.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/tr/home.json"
{
  "title": "Ana Sayfa",
  "description": "Ana sayfa açıklaması",
  "welcome": "Hoşgeldiniz",
  "greeting": "Merhaba dünya!",
  "aboutPage": "Hakkında Sayfası",
  "documentation": "Dokümantasyon"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/tr/about.json"
{
  "title": "Hakkında",
  "description": "Hakkında sayfası açıklaması",
  "counter": {
    "label": "Sayaç",
    "increment": "Arttır",
    "description": "Sayacı artırmak için butona tıklayın"
  }
}
```

### Adım 9: Sayfalarınızda Çevirileri Kullanın

Sunucuda i18next'i başlatan ve çevirileri hem sunucu hem de istemci bileşenlerine aktaran bir sayfa bileşeni oluşturun. Bu, çevirilerin render edilmeden önce yüklenmesini sağlar ve içerik yanıp sönmesini engeller.

Sunucu tarafı başlatma, sayfa render edilmeden önce çevirileri yükler, SEO'yu iyileştirir ve FOUC'u (Flash of Unstyled Content) önler. Önceden yüklenmiş kaynakları istemci sağlayıcısına geçirerek, çift fetch yapılmasını önler ve sorunsuz bir hydration sağlar.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * i18n başlatmasını yöneten sunucu bileşeni sayfası
 * Çevirileri sunucuda önceden yükler ve istemci bileşenlerine iletir
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Bu sayfanın ihtiyaç duyduğu çeviri ad alanlarını tanımlayın
  // Tür güvenliği ve otomatik tamamlama için merkezi listeyi yeniden kullanın
  const pageNamespaces = allNamespaces;

  // Gerekli ad alanları ile sunucuda i18next'i başlatın
  // Bu, çeviri JSON dosyalarını sunucu tarafında yükler
  const i18n = await initI18next(locale, pageNamespaces);

  // "about" namespace'i için sabit bir çeviri fonksiyonu alın
  // getFixedT namespace'i kilitler, böylece t("about:title") yerine t("title") kullanılır
  const tAbout = i18n.getFixedT(locale, "about");

  // i18n örneğinden çeviri paketlerini çıkar
  // Bu veri, istemci tarafı i18n'i beslemek için I18nProvider'a iletilir
  // FOUC (Çevrilmemiş İçerik Flaşlaması) önlenir ve tekrar eden istekler engellenir
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Adım 10: İstemci Bileşenlerinde Çevirileri Kullanma

İstemci bileşenleri, çevirilere erişmek için `useTranslation` kancasını kullanabilir. Bu kanca, çeviri fonksiyonuna ve i18n örneğine erişim sağlar, böylece içeriği çevirebilir ve yerel bilgisine ulaşabilirsiniz.

İstemci bileşenlerinin çevirilere erişmek için React kancalarına ihtiyacı vardır. `useTranslation` kancası, i18next ile sorunsuz bir şekilde entegre olur ve yerel değiştiğinde reaktif güncellemeler sağlar.

> Sayfa/sağlayıcı yalnızca ihtiyacınız olan ad alanlarını (örneğin, `about`) içerdiğinden emin olun.  
> React < 19 kullanıyorsanız, `Intl.NumberFormat` gibi ağır formatlayıcıları memoize edin.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Çeviriler için React hook'ları kullanan istemci bileşeni örneği
 * useState, useEffect ve useTranslation gibi hook'lar kullanılabilir
 */
const ClientComponent = () => {
  // useTranslation hook'u çeviri fonksiyonuna ve i18n örneğine erişim sağlar
  // Sadece "about" isim alanı için çevirileri yüklemek üzere isim alanını belirtin
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Yerel ayara duyarlı sayı biçimlendirici oluştur
  // i18n.language mevcut yereli sağlar (örneğin, "en", "fr")
  // Intl.NumberFormat sayıları yerel kurallara göre biçimlendirir
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Yerel dil formatına göre sayıyı biçimlendir */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Adım 11: Sunucu Bileşenlerinde Çevirileri Kullanma

Sunucu bileşenleri React hook'larını kullanamaz, bu yüzden çevirileri üst bileşenlerinden props olarak alırlar. Bu yaklaşım sunucu bileşenlerinin senkron kalmasını sağlar ve onların istemci bileşenlerinin içinde iç içe geçmesine izin verir.

İstemci sınırları altında iç içe geçebilecek sunucu bileşenlerinin senkron olması gerekir. Çevrilmiş metinleri ve yerel bilgiyi props olarak geçirerek, asenkron işlemlerden kaçınır ve doğru render edilmesini sağlarız.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Üst sunucu bileşeninden geçirilen çeviri fonksiyonu
  // Sunucu bileşenleri hook kullanamaz, bu yüzden çeviriler props ile gelir
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Sunucu bileşeni örneği - çevirileri props olarak alır
 * İstemci bileşenlerin içinde (async sunucu bileşenleri) iç içe olabilir
 * React hook'larını kullanamaz, bu yüzden tüm veriler props veya async işlemlerden gelmelidir
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Sayıyı locale kullanarak sunucu tarafında biçimlendir
  // Bu SSR sırasında sunucuda çalışır, ilk sayfa yüklemesini iyileştirir
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Props olarak geçen çeviri fonksiyonunu kullan */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (İsteğe Bağlı) Adım 12: İçeriğinizin Dilini Değiştirme

Next.js'te içeriğinizin dilini değiştirmek için önerilen yöntem, locale önekli URL'ler ve Next.js linklerini kullanmaktır. Aşağıdaki örnek, mevcut locale'yi rotadan okur, pathname'den çıkarır ve mevcut her locale için bir bağlantı render eder.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Dil seçici">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "sayfa" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (İsteğe Bağlı) Adım 13: Yerelleştirilmiş bir Link bileşeni oluşturun

Uygulamanızda yerelleştirilmiş URL'leri yeniden kullanmak, gezinmenin tutarlı ve SEO dostu kalmasını sağlar. Dahili rotaların önüne aktif locale'yi ekleyen, dış URL'leri ise dokunmadan bırakan küçük bir yardımcı ile `next/link`'i sarmalayın.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> İpucu: `LocalizedLink` bir drop-in replacement (yerine geçme) olduğundan, ithalatları değiştirerek ve bileşenin yerel dil URL'lerini yönetmesine izin vererek kademeli olarak geçiş yapın.

### (İsteğe Bağlı) Adım 14: Server Actions içinde aktif locale erişimi

Server Actions genellikle e-postalar, kayıt tutma veya üçüncü taraf entegrasyonları için geçerli locale ihtiyaç duyar. Proxy'niz tarafından ayarlanan locale çerezi ile `Accept-Language` başlığını yedek olarak birleştirin.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Geçerli locale'i kullanan bir server action örneği
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Locale'i yerelleştirilmiş yan etkiler için kullan (e-postalar, CRM, vb.)
  console.log(`Locale ${locale} ile sunucudan gelen veriler`);
}
```

> Yardımcı fonksiyon Next.js çerezlerine ve başlıklara dayandığı için, Route Handlers, Server Actions ve diğer yalnızca sunucu bağlamlarında çalışır.

### (İsteğe Bağlı) Adım 15: Meta Verilerinizi Uluslararasılaştırın

İçeriği çevirmek önemlidir, ancak uluslararasılaştırmanın asıl amacı web sitenizi dünyaya daha görünür hale getirmektir. I18n, doğru SEO ile web sitenizin görünürlüğünü artırmak için inanılmaz bir araçtır.

Doğru şekilde uluslararasılaştırılmış meta veriler, arama motorlarının sayfalarınızda hangi dillerin mevcut olduğunu anlamasına yardımcı olur. Bu, hreflang meta etiketlerinin ayarlanmasını, başlıkların ve açıklamaların çevrilmesini ve her yerel dil için kanonik URL'lerin doğru şekilde ayarlandığından emin olmayı içerir.

Çok dilli SEO ile ilgili iyi uygulamalar listesi şöyledir:

- Arama motorlarının sayfada hangi dillerin mevcut olduğunu anlamasına yardımcı olmak için `<head>` etiketi içinde hreflang meta etiketlerini ayarlayın
- Tüm sayfa çevirilerini `http://www.w3.org/1999/xhtml` XML şemasını kullanarak sitemap.xml dosyasında listeleyin
- Robots.txt dosyasından önekli sayfaları hariç tutmayı unutmayın (örneğin, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- En yerelleştirilmiş sayfaya yönlendirmek için özel Link bileşeni kullanın (örneğin, Fransızca için `<a href="/fr/about">À propos</a>`)

Geliştiriciler genellikle sayfalarını farklı yereller arasında doğru şekilde referanslamayı unuturlar. Bunu düzeltelim:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Sayfanın her yerel versiyonu için SEO metadata'sı oluşturur
 * Bu fonksiyon, her locale için build zamanında çalışır
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Bu locale için çeviri dosyasını dinamik olarak içe aktar
  // Metadata için çevrilmiş başlık ve açıklamayı almak için kullanılır
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Tüm locale'ler için hreflang eşlemesi oluştur
  // Arama motorlarının dil alternatiflerini anlamasına yardımcı olur
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Bu yerel sürüm için canonical URL
      canonical: absoluteUrl(locale, "/about"),
      // SEO için dil alternatifleri (hreflang etiketleri)
      // "x-default" varsayılan yerel sürümü belirtir
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Hakkında</h1>;
}
```

### (İsteğe Bağlı) Adım 16: Site Haritanızı Uluslararasılaştırın

Sayfalarınızın tüm yerel sürümlerini içeren bir site haritası oluşturun. Bu, arama motorlarının içeriğinizin tüm dil sürümlerini keşfetmesine ve dizine eklemesine yardımcı olur.

Doğru şekilde uluslararasılaştırılmış bir site haritası, arama motorlarının sayfalarınızın tüm dil sürümlerini bulmasını ve dizine eklemesini sağlar. Bu, uluslararası arama sonuçlarındaki görünürlüğü artırır.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Tüm yerel ayarların ve yerelleştirilmiş yollarının bir haritasını alın
 *
 * Örnek çıktı:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Daha iyi SEO için tüm yerel varyantlarla sitemap oluşturun
// alternates alanı arama motorlarına dil versiyonları hakkında bilgi verir
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (İsteğe Bağlı) Adım 17: robots.txt Dosyanızı Uluslararasılaştırın

Korumalı rotalarınızın tüm yerel sürümlerini doğru şekilde yöneten bir robots.txt dosyası oluşturun. Bu, arama motorlarının yönetici veya gösterge paneli sayfalarını hiçbir dilde dizine eklememesini sağlar.

Tüm yereller için robots.txt dosyasını doğru yapılandırmak, arama motorlarının hassas sayfaları hiçbir dilde dizine eklemesini engeller. Bu, güvenlik ve gizlilik açısından çok önemlidir.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Tüm yereller için yollar oluştur (örneğin, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (İsteğe Bağlı) Adım 18: Yerel Yönlendirme için Middleware Kurulumu

Kullanıcının tercih ettiği dili otomatik olarak algılayan ve onları uygun yerel ön ekli URL'ye yönlendiren bir proxy oluşturun. Bu, kullanıcı deneyimini tercih ettikleri dilde içerik göstererek iyileştirir.

Middleware, kullanıcıların sitenizi ziyaret ettiklerinde tercih ettikleri dile otomatik olarak yönlendirilmesini sağlar. Ayrıca, kullanıcının tercihlerini gelecekteki ziyaretler için bir çerezde kaydeder.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Uzantılı dosyalarla eşleşen Regex (örneğin, .js, .css, .png)
// Statik varlıkları locale yönlendirmesinden hariç tutmak için kullanılır
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Accept-Language başlığından locale çıkarır
 * "fr-CA", "en-US" gibi formatları işler
 * Tarayıcı dili desteklenmiyorsa varsayılan locale döner
 */
const pickLocale = (accept: string | null) => {
  // İlk dil tercihini al (örneğin, "fr-CA,en-US;q=0.9" içinden "fr-CA")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Temel dil kodunu çıkar (örneğin, "fr-CA" içinden "fr")
  const base = raw.toLowerCase().split("-")[0];
  // Bu locale destekleniyor mu kontrol et, yoksa varsayılanı kullan
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js için locale tespiti ve yönlendirmesi proxy'si
 * Sayfa render edilmeden önce her istekte çalışır
 * Gerekli olduğunda otomatik olarak locale önekli URL'lere yönlendirir
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.js dahili yolları, API rotaları ve statik dosyalar için proxy'yi atla
  // Bunlar locale önekli olmamalıdır
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // URL'nin zaten bir locale öneki olup olmadığını kontrol et
  // Örnek: "/fr/about" veya "/en" true döner
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Eğer yerel önek yoksa, yereli algıla ve yönlendir
  if (!hasLocale) {
    // Öncelikle yereli çerezden almaya çalış (kullanıcı tercihi)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Çerez yereli geçerliyse kullan, aksi takdirde tarayıcı başlıklarından algıla
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Yolu değiştirmek için URL'yi klonla
    const url = request.nextUrl.clone();
    // Yola yerel önek ekle
    // Çift eğik çizgiyi önlemek için kök yolu özel olarak işle
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Yönlendirme yanıtı oluştur ve locale çerezini ayarla
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Aşağıdakiler hariç tüm yollarla eşleş:
    // - API rotaları (/api/*)
    // - Next.js dahili yolları (/_next/*)
    // - Statik dosyalar (/static/*)
    // - Uzantılı dosyalar (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (İsteğe Bağlı) Adım 19: Çevirilerinizi Intlayer ile Otomatikleştirin

Intlayer, uygulamanızdaki yerelleştirme sürecine yardımcı olmak için tasarlanmış **ücretsiz** ve **açık kaynaklı** bir kütüphanedir. i18next çeviri yükleme ve yönetimini sağlarken, Intlayer çeviri iş akışını otomatikleştirmenize yardımcı olur.

Çevirileri manuel olarak yönetmek zaman alıcı ve hata yapmaya açık olabilir. Intlayer, çeviri testlerini, oluşturulmasını ve yönetimini otomatikleştirerek zaman kazandırır ve uygulamanız genelinde tutarlılığı sağlar.

Intlayer size şunları sağlar:

- **İçeriğinizi kod tabanınızda istediğiniz yerde beyan edin**  
  Intlayer, `.content.{ts|js|json}` dosyalarını kullanarak içeriğinizi kod tabanınızda istediğiniz yerde beyan etmenize olanak tanır. Bu, içeriğinizin daha iyi organize edilmesini sağlayarak kod tabanınızın okunabilirliğini ve sürdürülebilirliğini artırır.

- **Eksik çevirileri test edin**  
  Intlayer, CI/CD pipeline'ınıza veya birim testlerinize entegre edilebilen test fonksiyonları sağlar. Çevirilerinizi test etmek hakkında daha fazla bilgi için [buraya bakın](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md).

- **Çevirilerinizi otomatikleştirin**,
  Intlayer, çevirilerinizi otomatikleştirmek için bir CLI ve bir VSCode eklentisi sağlar. Bu, CI/CD pipeline'ınıza entegre edilebilir. Çevirilerinizi otomatikleştirme hakkında daha fazla bilgi edinin: [çevirilerinizi otomatikleştirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md).
  Kendi **API anahtarınızı ve tercih ettiğiniz AI sağlayıcısını** kullanabilirsiniz. Ayrıca bağlama duyarlı çeviriler sağlar, bkz. [içerik doldurma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md).

- **Dış içerik bağlayın**
- **Çevirilerinizi otomatikleştirin**,  
  Intlayer, çevirilerinizi otomatikleştirmek için bir CLI ve bir VSCode eklentisi sağlar. Bunlar CI/CD pipeline'ınıza entegre edilebilir. [Çevirilerinizi otomatikleştirme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) hakkında daha fazla bilgi edinin.  
  Kendi **API anahtarınızı ve tercih ettiğiniz AI sağlayıcısını** kullanabilirsiniz. Ayrıca bağlama duyarlı çeviriler sağlar, bkz. [içerik doldurma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md).

- **Dış içerik bağlayın**  
  Intlayer, içeriğinizi harici bir içerik yönetim sistemi (CMS) ile bağlamanıza olanak tanır. İçeriği optimize edilmiş bir şekilde çekmek ve JSON kaynaklarınıza eklemek için. [Dış içerik çekme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md) hakkında daha fazla bilgi edinin.

- **Görsel editör**  
  Intlayer, içeriğinizi görsel bir editör kullanarak düzenlemeniz için ücretsiz bir görsel editör sunar. [Çevirilerinizi görsel olarak düzenleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) hakkında daha fazla bilgi edinin.

Ve daha fazlası. Intlayer tarafından sunulan tüm özellikleri keşfetmek için lütfen [Intlayer'ın Önemi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) bakınız.
