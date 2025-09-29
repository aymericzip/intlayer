---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: Next.js'te SEO ve i18n
description: next-intl, next-i18next ve Intlayer kullanarak Next.js uygulamanızda çok dilli SEO nasıl kurulur öğrenin.
keywords:
  - Intlayer
  - SEO
  - Uluslararasılaştırma
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - seo
  - i18n
  - nextjs
---

# Next.js'te SEO ve i18n: Çeviri yapmak yeterli değil

Geliştiriciler uluslararasılaştırma (i18n) düşündüklerinde, ilk refleks genellikle: _içeriği çevirmek_ olur. Ancak insanlar genellikle uluslararasılaştırmanın asıl amacının web sitenizi dünyaya daha görünür kılmak olduğunu unutur.
Eğer çok dilli Next.js uygulamanız, arama motorlarına farklı dil versiyonlarınızı nasıl tarayacaklarını ve anlayacaklarını söylemiyorsa, çabanızın çoğu fark edilmeden kalabilir.

Bu blogda, **neden i18n'in bir SEO süper gücü olduğunu** ve `next-intl`, `next-i18next` ve `Intlayer` ile Next.js'te bunu nasıl doğru şekilde uygulayacağımızı keşfedeceğiz.

---

## Neden SEO ve i18n

Dil eklemek sadece kullanıcı deneyimi (UX) ile ilgili değildir. Aynı zamanda **organik görünürlük** için güçlü bir kaldıraçtır. İşte nedenleri:

1. **Daha iyi keşfedilebilirlik:** Arama motorları yerelleştirilmiş versiyonları indeksler ve kullanıcıların kendi ana dillerinde arama yaptıklarında onları sıralar.
2. **Yinelenen içerikten kaçınma:** Doğru canonical ve alternatif etiketler, tarayıcılara hangi sayfanın hangi dil versiyonuna ait olduğunu bildirir.
3. **Daha iyi kullanıcı deneyimi:** Ziyaretçiler sitenizin doğru versiyonuna hemen ulaşır.
4. **Rekabet avantajı:** Çok az site çok dilli SEO'yu iyi uygular, bu da sizin öne çıkmanızı sağlar.

---

## Next.js'te Çok Dilli SEO için En İyi Uygulamalar

Her çok dilli uygulamanın uygulaması gereken kontrol listesi:

- **`<head>` içinde `hreflang` meta etiketlerini ayarlayın**  
  Google'ın her dil için hangi versiyonların mevcut olduğunu anlamasına yardımcı olur.

- **Tüm çevrilmiş sayfaları `sitemap.xml` içinde listeleyin**  
  Tarayıcıların alternatifleri kolayca bulabilmesi için `xhtml` şemasını kullanın.

- **Özel/yerelleştirilmiş rotaları `robots.txt` içinde hariç tutun**  
  Örneğin `/dashboard`, `/fr/dashboard`, `/es/dashboard` gibi sayfaların indekslenmesine izin vermeyin.

- **Yerelleştirilmiş bağlantılar kullanın**  
  Örnek: Varsayılan `/about` yerine `<a href="/fr/about">À propos</a>` kullanın.

Bunlar basit adımlar — ancak atlanmaları görünürlüğünüzü kaybetmenize neden olabilir.

---

## Uygulama Örnekleri

Geliştiriciler genellikle sayfalarını farklı yereller arasında doğru şekilde referanslamayı unutur, bu yüzden bunun farklı kütüphanelerle pratikte nasıl çalıştığına bakalım.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Sayfanın geri kalan kodu
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "aylık",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Varsayılan yerel değilse, yolu yerelleştirilmiş yerel ile önekler */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Mutlak URL yardımcı fonksiyonu */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Doğru JSON dosyasını dinamik olarak içe aktar
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Hakkında</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her yerel için tüm URL'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döner
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Sayfanın geri kalan kodu
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Tüm çok dilli URL'leri verilen URL listesinden alır
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Robots.txt kurallarını tanımlar
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // "/dashboard" sayfasına erişimi engeller
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer, site haritanız için çok dilli URL'ler oluşturmak üzere `getMultilingualUrls` fonksiyonunu sağlar.

  </TabItem>
</Tabs>

---

## Sonuç

Next.js'te i18n'i doğru yapmak sadece metni çevirmekle ilgili değildir, aynı zamanda arama motorlarının ve kullanıcıların içeriğinizin hangi sürümünü sunacağını tam olarak bilmelerini sağlamaktır.
Hreflang, site haritaları ve robots kurallarını ayarlamak, çevirileri gerçek SEO değerine dönüştüren şeydir.

next-intl ve next-i18next size bunu bağlamak için sağlam yollar sunarken, genellikle yereller arasında tutarlılığı sağlamak için çok fazla manuel kurulum gerektirirler.

İşte burada Intlayer gerçekten parlıyor:

getMultilingualUrls gibi yerleşik yardımcılarla birlikte gelir, bu da hreflang, site haritası ve robots entegrasyonunu neredeyse zahmetsiz hale getirir.

Meta veriler JSON dosyaları veya özel yardımcı araçlar arasında dağılmak yerine merkezi olarak tutulur.

Next.js için baştan sona tasarlanmıştır, böylece yapılandırmayı hata ayıklamakla daha az, projeyi teslim etmekle daha çok zaman harcarsınız.

Amacınız sadece çeviri yapmak değil, çok dilli SEO'yu sorunsuz bir şekilde ölçeklendirmekse, Intlayer size en temiz ve en geleceğe dönük kurulumu sunar.
