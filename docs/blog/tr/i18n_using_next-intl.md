---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-intl kullanarak Next.js uygulamanızı nasıl uluslararasılaştırırsınız
description: next-intl ile i18n kurulumu: çok dilli Next.js uygulamaları için en iyi uygulamalar ve SEO ipuçları, uluslararasılaştırma, içerik organizasyonu ve teknik kurulum konularını kapsar.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: İlk sürüm
---

# 2025'te next-intl kullanarak Next.js uygulamanızı nasıl uluslararasılaştırırsınız

## İçindekiler

<TOC/>

## next-intl nedir?

**next-intl**, özellikle Next.js App Router için tasarlanmış popüler bir uluslararasılaştırma (i18n) kütüphanesidir. Mükemmel TypeScript desteği ve yerleşik optimizasyonlarla çok dilli Next.js uygulamaları oluşturmanın sorunsuz bir yolunu sağlar.

> Tercih ederseniz, ayrıca [next-i18next rehberine](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-i18next.md) veya doğrudan [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md) kullanmaya da başvurabilirsiniz.

> Karşılaştırmayı [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) sayfasında görebilirsiniz.

## Takip etmeniz gereken uygulamalar

Uygulamaya başlamadan önce, takip etmeniz gereken bazı uygulamalar şunlardır:

- **HTML `lang` ve `dir` özniteliklerini ayarlayın**  
  Düzeninizde, `dir` değerini `getLocaleDirection(locale)` kullanarak hesaplayın ve uygun erişilebilirlik ve SEO için `<html lang={locale} dir={dir}>` olarak ayarlayın.
- **Mesajları namespace'e göre ayırın**  
  JSON dosyalarını locale ve namespace (örneğin, `common.json`, `about.json`) bazında organize edin, böylece sadece ihtiyacınız olanları yükleyebilirsiniz.
- **İstemci yükünü minimize edin**  
  Sayfalarda, `NextIntlClientProvider`'a sadece gerekli namespace'leri gönderin (örneğin, `pick(messages, ['common', 'about'])`).
- **Statik sayfaları tercih edin**  
  Daha iyi performans ve SEO için mümkün olduğunca statik sayfalar kullanın.
- **Sunucu bileşenlerinde I18n**  
  Sunucu bileşenleri, sayfalar veya `client` olarak işaretlenmemiş tüm bileşenler statiktir ve build zamanında önceden render edilebilir. Bu nedenle, çeviri fonksiyonlarını onlara props olarak geçmemiz gerekecek.
- **TypeScript tiplerini ayarlayın**  
  Uygulamanız genelinde tip güvenliğini sağlamak için locale'leriniz için TypeScript tiplerini yapılandırın.
- **Yönlendirme için proxy kullanımı**  
  Locale tespiti ve yönlendirmeyi yönetmek için bir proxy kullanın ve kullanıcıyı uygun locale önekli URL'ye yönlendirin.
- **Metadata, sitemap, robots.txt'nin uluslararasılaştırılması**  
  Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanarak metadata, sitemap ve robots.txt dosyalarınızı uluslararasılaştırın; böylece tüm locale'lerde arama motorları tarafından daha iyi keşfedilmesini sağlayın.
- **Linkleri yerelleştirin**

`Link` bileşenini kullanarak bağlantıları yerelleştirin ve kullanıcıyı uygun locale önekiyle başlayan URL'ye yönlendirin. Sayfalarınızın tüm locale'lerde keşfedilmesini sağlamak önemlidir.

- **Testleri ve çevirileri otomatikleştirin**  
  Testlerin ve çevirilerin otomatikleştirilmesi, çok dilli uygulamanızı sürdürürken zaman kaybetmenizi önler.

> Uluslararasılaştırma ve SEO hakkında bilmeniz gereken her şeyi listeleyen dokümanımıza bakın: [next-intl ile Uluslararasılaştırma (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md).

---

## Next.js Uygulamasında next-intl Kurulumuna Adım Adım Rehber

<iframe  
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"  
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> GitHub'da [Uygulama Şablonuna](https://github.com/aymericzip/next-intl-template) bakın.

Oluşturacağımız proje yapısı şöyle:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src isteğe bağlıdır
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Tüm sayfaları home kaynaklarıyla kirletmemek için Route Grubu)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Çevirileri yönetmek için hooklar, sunucu fonksiyonları ve istemci sağlayıcıları sunan Next.js App Router için temel uluslararasılaştırma kütüphanesi.

### Adım 2: Projenizi Yapılandırın

Desteklenen yerel ayarları tanımlayan ve next-intl'in istek yapılandırmasını ayarlayan bir yapılandırma dosyası oluşturun. Bu dosya, i18n kurulumunuz için tek gerçek kaynak olarak hizmet eder ve uygulamanız genelinde tür güvenliğini sağlar.

Yerel ayar yapılandırmanızı merkezi hale getirmek, tutarsızlıkları önler ve gelecekte yerel ayar eklemeyi veya kaldırmayı kolaylaştırır. `getRequestConfig` fonksiyonu her istekte çalışır ve her sayfa için yalnızca gereken çevirileri yükler, bu da kod bölme (code-splitting) yapılmasını sağlar ve paket boyutunu azaltır.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Tür güvenliği ile desteklenen yerel ayarları tanımlayın
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Kod bölme (code-splitting) için yerel ayara göre mesajları dinamik olarak yükle
// Promise.all, daha iyi performans için isim alanlarını paralel olarak yükler
async function loadMessages(locale: Locale) {
  // Sadece layout/sayfalarınızın ihtiyaç duyduğu isim alanlarını yükleyin
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Gelecekteki JSON dosyaları buraya eklenmelidir
  ]);

  return { common, home, about } as const;
}

// Yerelleştirilmiş URL'ler oluşturmak için yardımcı fonksiyon (örneğin, /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig her istekte çalışır ve sunucu bileşenlerine mesajlar sağlar
// next-intl'in Next.js'in sunucu tarafı render'ına bağlandığı yer burasıdır
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 yıl
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /en/... rotasını /... olarak değiştir
  // Opsiyonel: yerelleştirilmiş yol adları
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // "/" -> "/en" yönlendirmelerini çerezden engelle
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Adım 3: Dinamik Yerel Rotaları Tanımlayın

Yerel ayarlar için dinamik yönlendirmeyi, uygulama klasörünüzde bir `[locale]` dizini oluşturarak ayarlayın. Bu, Next.js'in her yerel ayarın bir URL segmenti haline geldiği yerel ayar tabanlı yönlendirmeyi (örneğin, `/en/about`, `/fr/about`) yönetmesini sağlar.

Dinamik rotaların kullanılması, Next.js'in tüm yerel ayarlar için derleme zamanında statik sayfalar oluşturmasını sağlar, bu da performansı ve SEO'yu iyileştirir. Layout bileşeni, HTML `lang` ve `dir` özniteliklerini yerel ayara göre ayarlar; bu, erişilebilirlik ve arama motorlarının anlayışı için kritik öneme sahiptir.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Derleme zamanında (SSG) tüm yerel ayarlar için statik sayfalar önceden oluşturulur
// Bu, performansı ve SEO'yu iyileştirir
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js App Router'da, params bir Promise'dir (await edilebilir)
  // Bu, dinamik rota segmentlerinin asenkron olarak çözülmesine olanak tanır
  const { locale } = await params;

  // Kritik: setRequestLocale, next-intl'e bu istek için hangi yerel ayarın kullanılacağını söyler
  // Bunu yapmazsak, getTranslations() sunucu bileşenlerinde hangi yerelin kullanılacağını bilemez
  setRequestLocale(locale);

  // Doğru HTML render'ı için metin yönünü (LTR/RTL) al
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mesajlar sunucu tarafında yüklenir. İstemciye sadece gerekenler gönderilir.
  // Bu, tarayıcıya gönderilen JavaScript paketini minimize eder
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Sadece sunucu tarafı çeviriler/formatlama
  // Bunlar sunucuda çalışır ve bileşenlere props olarak geçirilebilir
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider çevirileri istemci bileşenlerine kullanılabilir hale getirir
    // İstemci bileşenlerinizin gerçekten kullandığı namespace'leri geçirin
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Adım 4: Çeviri Dosyalarınızı Oluşturun

Her locale ve namespace için JSON dosyaları oluşturun. Bu yapı, çevirileri mantıklı bir şekilde organize etmenizi ve her sayfa için yalnızca ihtiyacınız olanları yüklemenizi sağlar.

Çevirileri namespace bazında organize etmek (örneğin, `common.json`, `about.json`) kod bölme (code splitting) yapmanızı sağlar ve paket boyutunu küçültür. Her sayfa için yalnızca gereken çevirileri yüklersiniz, bu da performansı artırır.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Adım 5: Çevirileri Sayfalarınızda Kullanın

Sunucuda çevirileri yükleyen ve bunları hem sunucu hem de istemci bileşenlerine aktaran bir sayfa bileşeni oluşturun. Bu, çevirilerin render edilmeden önce yüklenmesini sağlar ve içerik yanıp sönmesini önler.

Sunucu tarafında çevirilerin yüklenmesi SEO'yu iyileştirir ve FOUC (Çevrilmemiş İçeriğin Yanıp Sönmesi) sorununu engeller. `pick` kullanarak yalnızca gerekli namespace'leri istemci sağlayıcısına göndererek, tarayıcıya gönderilen JavaScript paketini minimize ederiz.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mesajlar sunucu tarafında yüklenir. İstemciye sadece gerekenler gönderilir.
  // Bu, tarayıcıya gönderilen JavaScript paketini minimize eder
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Sadece sunucu tarafı çeviriler/formatlama
  // Bunlar sunucuda çalışır ve bileşenlere props olarak geçirilebilir
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider, çevirileri istemci bileşenlerine kullanılabilir hale getirir
    // İstemci bileşenlerinizin gerçekten kullandığı ad alanlarını geçin
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Adım 6: İstemci Bileşenlerinde Çevirileri Kullanma

İstemci bileşenleri, çevirilere ve biçimlendirme işlevlerine erişmek için `useTranslations` ve `useFormatter` hook'larını kullanabilir. Bu hook'lar `NextIntlClientProvider` bağlamından (context) okuma yapar.

İstemci bileşenlerin çevirilere erişmek için React hook'larına ihtiyacı vardır. `useTranslations` ve `useFormatter` hook'ları next-intl ile sorunsuz bir şekilde entegre olur ve dil değiştiğinde reaktif güncellemeler sağlar.

> Sayfanın istemci mesajlarına gerekli isim alanlarını eklemeyi unutmayın (yalnızca istemci bileşenlerinizin gerçekten ihtiyaç duyduğu isim alanlarını dahil edin).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Doğrudan iç içe nesneye erişim sağla
  // useTranslations/useFormatter, NextIntlClientProvider bağlamından okuyan hook'lardır
  // Bu hook'lar yalnızca bileşen NextIntlClientProvider ile sarıldığında çalışır
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### Adım 7: Sunucu Bileşenlerinde Çevirileri Kullanma

Sunucu bileşenleri React hook'larını kullanamaz, bu yüzden çeviriler ve biçimlendiriciler üst bileşenlerinden props olarak alınır. Bu yaklaşım sunucu bileşenlerini senkron tutar ve onların istemci bileşenlerinin içinde iç içe yerleştirilmesine izin verir.

İstemci sınırları altında iç içe olabilecek sunucu bileşenlerinin senkron olması gerekir. Çevrilmiş dizeleri ve biçimlendirilmiş değerleri props olarak geçirerek, asenkron işlemlerden kaçınır ve doğru render edilmesini sağlarız. Çevirileri ve biçimlendirmeyi üst sayfa bileşeninde önceden hesaplayın.

```tsx fileName="src/components/ServerComponent.tsx"
// İstemci bileşenleri içinde iç içe olan sunucu bileşenleri senkron olmalıdır
// React, sunucu/istemci sınırı boyunca asenkron fonksiyonları serileştiremez
// Çözüm: Çevirileri/biçimlendirmeleri üst bileşende önceden hesaplayıp props olarak geçmek
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> Sayfa/düzeninizde, çevirileri ve biçimlendirmeyi önceden hesaplamak için `next-intl/server`'dan `getTranslations` ve `getFormatter` kullanın, ardından bunları props olarak sunucu bileşenlerine iletin.

---

### (İsteğe Bağlı) Adım 8: İçeriğinizin dilini değiştirin

next-intl ile içeriğinizin dilini değiştirmek için, aynı yol adına işaret eden ve yerel ayarı değiştiren yerel-dil farkında bağlantılar render edin. Sağlayıcı URL'leri otomatik olarak yeniden yazar, bu yüzden sadece mevcut rotayı hedeflemeniz yeterlidir.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Temel yolu almak için yol adından yerel öneki kaldır
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Dil seçici">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Varsayılan locale göre href oluştur
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
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (İsteğe Bağlı) Adım 9: Yerelleştirilmiş Link bileşenini kullanma

`next-intl`, aktif locale otomatik olarak uygulayan yerelleştirilmiş bir link bileşeni içeren `next-intl/navigation` alt paketini sağlar. Bunu sizin için `@/i18n` dosyasında çıkardık, böylece şu şekilde kullanabilirsiniz:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (İsteğe Bağlı) Adım 10: Server Actions içinde aktif locale erişimi

Server Actions, `next-intl/server` kullanarak mevcut locale'i okuyabilir. Bu, yerelleştirilmiş e-postalar göndermek veya gönderilen verilerle birlikte dil tercihlerini saklamak için faydalıdır.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Şablonları, analiz etiketlerini vb. seçmek için locale kullanılır.
  console.log(`Locale ${locale} üzerinden iletişim formu alındı`);
}
```

> `getLocale`, `next-intl` proxy tarafından ayarlanan locale'i okur, bu yüzden sunucudaki her yerde çalışır: Route Handlers, Server Actions ve edge fonksiyonları.

### (İsteğe Bağlı) Adım 11: Meta Verilerinizi Uluslararasılaştırın

İçeriği çevirmek önemlidir, ancak uluslararasılaştırmanın asıl amacı web sitenizi dünyaya daha görünür kılmaktır. I18n, uygun SEO ile web sitenizin görünürlüğünü artırmak için inanılmaz bir kaldıraçtır.

Doğru şekilde uluslararasılaştırılmış meta veriler, arama motorlarının sayfalarınızda hangi dillerin mevcut olduğunu anlamasına yardımcı olur. Bu, hreflang meta etiketlerinin ayarlanmasını, başlıkların ve açıklamaların çevrilmesini ve her yerel için kanonik URL'lerin doğru şekilde ayarlandığından emin olmayı içerir.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata her yerel için çalışır ve SEO dostu meta veriler oluşturur
// Bu, arama motorlarının alternatif dil sürümlerini anlamasına yardımcı olur
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
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

### (İsteğe bağlı) Adım 12: Site Haritanızı Uluslararasılaştırın

Sayfalarınızın tüm yerel sürümlerini içeren bir sitemap oluşturun. Bu, arama motorlarının içeriğinizin tüm dil sürümlerini keşfetmesine ve dizine eklemesine yardımcı olur.

Doğru şekilde uluslararasılaştırılmış bir sitemap, arama motorlarının sayfalarınızın tüm dil sürümlerini bulmasını ve dizine eklemesini sağlar. Bu, uluslararası arama sonuçlarındaki görünürlüğü artırır.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Tüm yerellerin ve onların yerelleştirilmiş yollarının haritasını alın
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

### (İsteğe Bağlı) Adım 13: robots.txt Dosyanızı Uluslararasılaştırın

Korunan rotalarınızın tüm yerel sürümlerini düzgün şekilde yöneten bir robots.txt dosyası oluşturun. Bu, arama motorlarının yönetici veya kontrol paneli sayfalarını hiçbir dilde dizine eklememesini sağlar.

Tüm yereller için robots.txt dosyasını doğru yapılandırmak, rotalarınız her yerel için farklı olduğunda arama motorlarının hassas sayfaları dizine eklemesini engeller.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Tüm yereller için yolları oluştur (örneğin, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (İsteğe Bağlı) Adım 14: Yerel Yönlendirme için Proxy Kurulumu

Kullanıcının tercih ettiği yereli otomatik olarak algılayan ve onları uygun yerel ön ekli URL'ye yönlendiren bir proxy oluşturun. next-intl, bunu otomatik olarak halleden kullanışlı bir proxy fonksiyonu sağlar.

Proxy, kullanıcıların sitenizi ziyaret ettiklerinde tercih ettikleri dile otomatik olarak yönlendirilmesini sağlar. Ayrıca, kullanıcının tercihlerini gelecekteki ziyaretler için kaydeder ve böylece kullanıcı deneyimini iyileştirir.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware, rotalardan önce çalışır, dil tespiti ve yönlendirmeyi yönetir
// localeDetection: true, Accept-Language başlığını kullanarak dili otomatik algılar
export default proxy;

export const config = {
  // API, Next dahili ve statik varlıkları atla
  // Regex: api, _next ile başlayan veya nokta (dosya) içeren rotalar hariç tüm rotalarla eşleşir
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (İsteğe Bağlı) Adım 15: Locale için TypeScript Tiplerini Ayarlama

TypeScript kurulumu, anahtarlarınız için otomatik tamamlama ve tip güvenliği elde etmenize yardımcı olur.

Bunun için, proje kök dizininizde bir global.ts dosyası oluşturabilir ve aşağıdaki kodu ekleyebilirsiniz:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Gelecekteki JSON dosyaları da buraya eklenmelidir
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Bu kod, Module Augmentation kullanarak locales ve messages öğelerini next-intl AppConfig türüne ekleyecektir.

### (İsteğe Bağlı) Adım 15: Çevirilerinizi Intlayer ile Otomatikleştirin

Intlayer, uygulamanızdaki yerelleştirme sürecine yardımcı olmak için tasarlanmış **ücretsiz** ve **açık kaynaklı** bir kütüphanedir. next-intl çeviri yükleme ve yönetimini üstlenirken, Intlayer çeviri iş akışını otomatikleştirmenize yardımcı olur.

Çevirileri manuel olarak yönetmek zaman alıcı ve hata yapmaya açık olabilir. Intlayer, çeviri testini, oluşturulmasını ve yönetimini otomatikleştirerek zaman kazandırır ve uygulamanız genelinde tutarlılığı sağlar.

Intlayer size şunları sağlar:

- **İçeriğinizi kod tabanınızda istediğiniz yerde tanımlayın**
  Intlayer, `.content.{ts|js|json}` dosyalarını kullanarak içeriğinizi kod tabanınızda istediğiniz yerde tanımlamanıza olanak tanır. Bu, içeriğinizin daha iyi organize edilmesini sağlayarak kod tabanınızın okunabilirliğini ve sürdürülebilirliğini artırır.

- **Eksik çevirileri test edin**
  Intlayer, CI/CD pipeline'ınıza veya birim testlerinize entegre edilebilen test fonksiyonları sağlar. Çevirilerinizi test etmek hakkında daha fazla bilgi edinin: [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md).

- **Çevirilerinizi otomatikleştirin**  
  Intlayer, çevirilerinizi otomatikleştirmek için bir CLI ve bir VSCode uzantısı sağlar. Bu, CI/CD pipeline'ınıza entegre edilebilir. Çevirilerinizi otomatikleştirmek hakkında daha fazla bilgi edinin: [automating your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md).  
  Kendi **API anahtarınızı ve tercih ettiğiniz AI sağlayıcısını** kullanabilirsiniz. Ayrıca bağlama duyarlı çeviriler sağlar, bkz. [fill content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md).

- **Harici içeriği bağlayın**  
  Intlayer, içeriğinizi harici bir içerik yönetim sistemi (CMS) ile bağlamanıza olanak tanır. İçeriği optimize edilmiş bir şekilde alıp JSON kaynaklarınıza ekleyebilirsiniz. Harici içeriğin nasıl alınacağı hakkında daha fazla bilgi için [fetching external content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md) sayfasını inceleyin.

- **Görsel editör**  
  Intlayer, içeriğinizi görsel bir editör kullanarak düzenlemenizi sağlayan ücretsiz bir görsel editör sunar. Çevirilerinizi görsel olarak düzenlemek hakkında daha fazla bilgi için [visual editing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) sayfasını ziyaret edin.

Ve daha fazlası. Intlayer tarafından sunulan tüm özellikleri keşfetmek için lütfen [Interest of Intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) dokümantasyonuna bakınız.
