---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Çerezlerden / başlıklardan locale nasıl alınır?
description: Çerezlerden / başlıklardan locale nasıl alınır, öğrenin.
keywords:
  - çerez
  - başlık
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Çerezlerden / başlıklardan locale nasıl alınır

## Hook Kullanımı (Önerilen)

Çoğu kullanım için, mevcut locale'i otomatik olarak çözen `useLocale` hook'unu kullanmanız önerilir. Bu, Vue.js'deki `useLocale` composable ile benzer şekilde çalışır.

```ts
import { useLocale } from "next-intlayer";
// veya import { useLocale } from "react-intlayer";
// veya import { useLocale } from "vue-intlayer";

// İstemci tarafı kullanım
const { locale } = useLocale();
```

Sunucu bileşenleri için şuradan içe aktarabilirsiniz:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Sadece çerez değerini çözen bir `useLocaleCookie` hook'u da vardır.

## Manuel Çerez Yapılandırması

Özel çerez adı tanımlayabilirsiniz:

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "ozelLocaleCookie", // varsayılan 'intlayer-locale'
  },
};

export default config;
```

ve şu şekilde alabilirsiniz:

### İstemci tarafı

```ts
// Varsayılan çerez adı ile
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Özel çerez adı ile
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("ozelLocaleCookie="))
  ?.split("=")[1];
```

### Sunucu tarafı (Next.js)

```ts
import { cookies } from "next/headers";

// Varsayılan çerez adı ile
const locale = cookies().get("intlayer-locale")?.value;

// Özel çerez adı ile
const locale = cookies().get("ozelLocaleCookie")?.value;
```

### Locale henüz ayarlanmadıysa

Locale, kullanıcı dili açıkça seçtiğinde çerez olarak ayarlanır. Varsayılan olarak, yeni ziyaretçiler için locale başlık alanlarından yorumlanır.

Kullanıcının tercih ettiği locale'i istek başlıklarından tespit edebilirsiniz. İşte nasıl yapılacağına dair bir örnek:

```ts
/**
 * İstek başlıklarından locale tespiti
 *
 * accept-language başlığı, locale tespiti için en önemlisidir.
 * Kullanıcının tercih ettiği dilleri öncelik sırasına göre q-değerleriyle içerir.
 *
 * Örnek: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US birincil dil (q=1.0 varsayılır)
 * - en ikinci tercih (q=0.9)
 * - fr üçüncü tercih (q=0.8)
 * - es dördüncü tercih (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Tarayıcıların tipik olarak gönderdiği örnek başlıklar
 * Bu başlıklar kullanıcının tercih ettiği dili belirlemeye yardımcı olur
 */
const ornekNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Kullanım örneği:
const tespitEdilenLocale = localeDetector(ornekNegotiatorHeaders);
```
