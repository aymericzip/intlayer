---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Next.js uygulamanızı Vite üzerinde çevirmek için eksiksiz rehber"
description: "Intlayer'ı vinext ile kurun, yani Vite üzerindeki Next.js API'si: proxy.ts ile dil yönlendirme, Server ve Client Components, yerelleştirilmiş meta veriler, sitemap ve Cloudflare Workers dağıtımı."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "İlk geçmiş"
author: aymericzip
---

# vinext sitenizi Intlayer ile çevirin

[vinext](https://github.com/cloudflare/vinext), Next.js API'sini Vite üzerinde yeniden uygular. `app/` dizininiz, `next/*` importlarınız ve `proxy.ts` çalışmaya devam eder, ancak derleme Turbopack veya webpack yerine Vite üzerinden yapılır.

Intlayer bu yapıya iki paketle dahil olur: bileşenlerinizin Next.js'te zaten kullandığı hook'lar, provider'lar ve proxy için `next-intlayer`, derleme tarafı için (sözlük derleme, izleme ve bundle optimizasyonu) `vite-intlayer`.

> Next.js'i kendi toolchain'iyle mi çalıştırıyorsunuz? Bunun yerine [Next.js 16 rehberini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md) izleyin.

- [Next.js 16 rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

`next-intl` veya `i18next` gibi çözümlerle karşılaştırıldığında Intlayer, yerleşik optimizasyonlarla birlikte gelir:

<AccordionGroup>
<Accordion header="Vite üzerinde Next.js API'si için geliştirildi">

Aynı `next-intlayer` kodu hem Next.js'te hem vinext'te çalışır. Server Components içeriği sunucuda çözer, Client Components provider üzerinden okur ve dil yönlendirme `proxy.ts` dosyanızdan çalışır. İki toolchain arasında geçiş yapmak bileşenlerinize dokunmaz.

</Accordion>
<Accordion header="Bundle boyutu">

Sayfalarınıza devasa JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Vite eklentisi her `useIntlayer` çağrısını bileşenin gerçekten kullandığı girdilerle değiştirir ve böylece **bundle ve sayfa boyutunu %50'ye kadar azaltır**.

</Accordion>
<Accordion header="Bakım kolaylığı">

İçeriği bileşen bazında düzenlemek, büyük uygulamalarda **bakımı kolaylaştırır**. Tüm içerik kod tabanını gözden geçirmeden bir özellik klasörünü çoğaltabilir veya silebilirsiniz ve Intlayer içeriğinizin doğru kalması için **tamamen tiplidir**.

</Accordion>
<Accordion header="Yapay zeka ajanı">

İçeriği bileşenin yanında tutmak, LLM'lerin ihtiyaç duyduğu **bağlamı azaltır**. Intlayer; eksik çevirileri test eden bir **CLI**, bir **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, bir **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** sunar.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)
- [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)

</Accordion>
<Accordion header="Otomasyon">

CI/CD hattınızda seçtiğiniz LLM ile çeviri yapın, maliyeti yapay zeka sağlayıcınız karşılar. Intlayer ayrıca içerik çıkarmayı otomatikleştiren bir **derleyici** ve **arka planda çeviri** yapan bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunar.

- [Web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Accordion>
<Accordion header="Geliştirici olmayanlarla ölçekleme">

Intlayer, çevirmenler ve metin yazarlarıyla **gerçek zamanlı** olarak çok dilli içerik yönetmeniz için **kendi sunucunuzda barındırılabilen bir [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sağlar. İçerik yerel ve/veya uzak olarak saklanabilir.

- [Görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [Tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Bir vinext uygulamasında Intlayer'ı kurmak için adım adım rehber

<Steps>
<Step number={1} title="Bağımlılıkları yükleyin">

Çalışan bir vinext projesiyle başlayın. Yeni bir proje oluşturmak için `npm create vinext-app@latest` komutunu çalıştırın. Mevcut bir Next.js uygulamasını taşımak için `npx vinext init` komutunu çalıştırın.

Ardından Intlayer'ı yükleyin:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpile ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) gibi uluslararasılaştırma araçlarını sağlayan çekirdek paket.

- **next-intlayer**

  Next.js API'si için provider'ları, hook'ları ve proxy'yi sağlar. vinext, `next/navigation`, `next/headers` ve `next/server` modüllerini kendi uygulamalarına yönlendirir, bu yüzden `next-intlayer` değişiklik yapmadan çalışır.

- **vite-intlayer**

  İçerik bildirimlerinizi derleyen, geliştirme sırasında izleyen ve üretim bundle'ında sözlükleri optimize eden Vite eklentisi. vinext'in çalıştırmadığı Next.js eklentisi `withIntlayer()` yerine geçer.

</Step>
<Step number={2} title="Projenizi yapılandırın">

Uygulamanızın yerelleştirilmiş URL yolları kullanıp kullanmayacağını (örneğin `/en/about`, `/fr/about`) ya da yolda dil segmenti olmadan içerik sunup sunmayacağını (örneğin `/about`, dil çerezler, header'lar veya sorgu parametreleriyle algılanır) seçin.

<Tabs group="routing-mode">
<Tab label="Dil yolu ile" value="with-locale-path">

### Mimari

Tüm yerelleştirilmiş sayfalar dinamik bir `[locale]` segmentinin altına yerleştirilir. Her dilin kendi URL'si olduğu için SEO ve statik render için önerilir:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Yapılandırma

Desteklenen dilleri bildirmek için bir `intlayer.config.ts` dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Dil yolu olmadan" value="without-locale-path">

### Mimari

Rotalar `[locale]` segmenti içermez. Tüm sayfalar doğrudan `src/app/` altında bulunur ve dil çerezlerden, header'lardan veya sorgu parametrelerinden gelir. Bu, panolara ve kimlik doğrulamalı uygulamalara uygundur:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Yapılandırma

`routing.mode` değerini `"search-params"` (örneğin `/about?locale=fr`) veya `"no-prefix"` olarak ayarlayın:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Bu dosya ayrıca proxy yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını, logları ve daha fazlasını belirler. Tam liste için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

- [Yapılandırma dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

</Step>
<Step number={3} title="Intlayer'ı Vite yapılandırmanıza entegre edin">

`vite.config.ts` içinde `intlayer()` eklentisini `vinext()` yanına ekleyin:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> `intlayer()` eklentisi, derleme başlamadan önce sözlüklerinizi oluşturur, geliştirme sırasında içerik dosyalarını izler ve `next-intlayer`'ın RSC, SSR ve istemci ortamlarında kullandığı alias'ları ve optimizasyonları ayarlar.

> `intlayer()` ayrıca Vite geliştirme sunucusu için bir dil yönlendirme middleware'i de içerir. vinext'te `src/proxy.ts` bu işi zaten geliştirmede ve üretim runtime'ınızda yapar, bu yüzden `ignore` seçeneği Vite'ınkini kapatarak her isteğin iki kez yönlendirilmesini önler.

> `next.config.ts` içinde `withIntlayer()` kullanmayın. vinext, `redirects`, `rewrites` ve `headers` gibi seçenekler için `next.config.ts` dosyasını okur ancak webpack veya Turbopack eklentilerini çalıştırmaz.

Cloudflare Workers'a dağıtım yapıyorsanız `vinext init` tarafından oluşturulan `cloudflare()` eklentisini koruyun:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Dinamik dil rotalarını tanımlayın">

<Tabs group="routing-mode">
<Tab label="Dil yolu ile" value="with-locale-path">

`RootLayout` içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout`'u boş bırakmak, dil layout'unun `<html>` etiketindeki [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) ve [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) özniteliklerini ayarlamasını sağlar.

`[locale]` dizininize bir layout ekleyin:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Tek bir `IntlayerProvider` ağacın her iki yarısını da kapsar: Server Components'e dili sağlar ve istemci provider'ını bağlar, böylece Client Components aynı dili alır.

> `[locale]` segmenti dili tutar: `/en-US/about` yolu `en-US`'ye, `/fr/about` yolu `fr`'ye çözümlenir. Önceki `src/app/page.tsx` artık kullanılmaz ve silinebilir. Proxy (adım 7) varsayılan dili kökte sunar.

> `generateStaticParams`, vinext'in her dil için her sayfayı önceden render etmesini sağlar. vinext ayrıca `dynamicParams` kuralını uygular, bu yüzden `export const dynamicParams = false` tanımladığınızda bilinmeyen bir dil 404 döndürür.

</Tab>
<Tab label="Dil yolu olmadan" value="without-locale-path">

`[locale]` dizini yoktur. `src/app/layout.tsx` dosyasını, dili istekten okuyacak ve uygulamanızı `IntlayerProvider` ile saracak şekilde yapılandırın:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="İçeriğinizi bildirin">

Çevirilerinizi saklamak için içerik bildirimleri oluşturun:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        tr: "Düzenleyerek başlayın",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "tr": "Düzenleyerek başlayın",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> İçerik bildirimleri, içerik bildirimi uzantısına (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) uydukları sürece `contentDir` dizini (varsayılan olarak `./src`) altında herhangi bir yerde bulunabilir.

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

- [İçerik bildirimi dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)

</Step>
<Step number={6} title="Kodunuzda içeriği kullanın">

Sözlüklerinize herhangi bir bileşenden erişin:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` izomorfiktir: vinext'in RSC ortamına uyguladığı `react-server` export koşulu Server Components'e sunucu uygulamasını verirken Client Components bağlam tabanlı olanı alır. Aynı çağrı her iki tarafta da çalışır.

> İçeriğinizi `alt`, `title`, `href` veya `aria-label` gibi bir `string` özniteliğinde kullanmak için değerini okuyun:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> [`useIntlayer` dokümantasyonunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) daha fazla bilgi edinin.

- [`useIntlayer` dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md)

> Uygulamanız zaten varsa [Intlayer derleyicisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) ve [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) binlerce bileşeni bir saniyede dönüştürür.

- [Intlayer derleyicisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)
- [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)

</Step>
<Step number={7} title="Dil algılama için proxy'yi yapılandırın">

vinext, `proxy.ts` (ve `middleware.ts`) dosyasını Next.js 16 gibi, geliştirmede ve üretimde, Cloudflare Workers dahil çalıştırır. Intlayer proxy'sini dışa aktarın:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`, kullanıcının tercih ettiği dili algılar, [yapılandırmaya](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) göre eşleşen URL'ye yönlendirir ve dili bir çerezde saklar. Ayrıca dili `getLocale()` ve sunucu hook'larına iletir, bu yüzden dil yolu olmayan mimaride de onu koruyun.

- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

> Birden fazla proxy'yi zincirlemek için (örneğin `intlayerProxy` ile kimlik doğrulama) `multipleProxies` kullanın:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Meta verilerinizin uluslararasılaştırılması" isOptional={true}>

vinext, Metadata API'sini destekler. Sayfa meta verilerinizi çevirmek için `generateMetadata` ile `getIntlayer` kullanın:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      tr: "vinext uygulamam",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      tr: "Vite üzerinde çalışan bir Next.js uygulaması",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> `intlayer` paketinden içe aktarılan `getIntlayer` fonksiyonu, meta veri nesnesi için hazır ham değerler döndürür. `next-intlayer` içindeki ise bunları görsel editör için sarmalar.

</Step>
<Step number={9} title="sitemap.xml ve robots.txt dosyalarınızın uluslararasılaştırılması" isOptional={true}>

`sitemap.ts` ve `robots.ts` Next.js'tekiyle aynı şekilde çalışır. Yerelleştirilmiş her URL'yi listelemek için `getMultilingualUrls` kullanın:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="İçeriğinizin dilini değiştirin" isOptional={true}>

Yerelleştirilmiş sayfaya gitmek için `next/link` kullanın. vinext istemci tarafı gezinmeyi ve prefetching'i korur, bu yüzden geçiş tam sayfa yenilemesi olmadan gerçekleşir:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Dokümantasyon referansları:
>
> - [`useLocale` hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` fonksiyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` fonksiyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` fonksiyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Yerelleştirilmiş bir Link bileşeni oluşturun" isOptional={true}>

Özel bir `Link` bileşeni dahili URL'lerin başına mevcut dili ekler, böylece `/about` bağlantısına tıklayan bir Fransız kullanıcı `/fr/about` sayfasına gider:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Server Actions içinde mevcut dili alın" isOptional={true}>

Bir Server Action içinde `next-intlayer/server` paketinden `getLocale` fonksiyonunu çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale`, önce proxy'nin istek header'larında ayarladığı dili, sonra dil çerezini, sonra tarayıcının `Accept-Language` header'ını okur ve varsayılan dile geri döner.

</Step>
<Step number={13} title="Cloudflare Workers'a dağıtın" isOptional={true}>

Intlayer sözlükleri derleme sırasında bundle'a derler, bu yüzden çalışma zamanında dosya sistemini okuyan bir şey yoktur ve uygulama workerd içinde olduğu gibi çalışır. vinext CLI ile derleyin ve dağıtın:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Başka bir yere dağıtmak için (Vercel, Netlify, AWS, Node.js) `vinext()` yanına [Nitro](https://v3.nitro.build/) Vite eklentisini ekleyin veya `next.config.ts` içinde `output: "standalone"` ayarlayın. Intlayer kurulumu değişmez.

</Step>
<Step number={14} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

Mevcut bir kod tabanında Intlayer, koda gömülü metinleri içerik bildirimlerine taşımak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) ve bir [çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sağlar.

- [Derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)
- [Çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)

`intlayer.config.ts` içinde derleyiciyi etkinleştirin:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Bileşenlerinizi dönüştürmek ve içeriği çıkarmak için çıkarıcıyı çalıştırın:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Vite compiler'>

`intlayer()` Vite eklentisi derleyiciyi içerir. `compiler.enabled` ayarlandıktan sonra geliştirme sunucunuzu veya derlemenizi her zamanki gibi çalıştırın:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScript'i yapılandırın

Intlayer, içerik anahtarlarınızı ve değerlerinizi tiplemek için module augmentation kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Oluşturulan tipleri TypeScript yapılandırmanıza dahil edin:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git yapılandırması

Intlayer tarafından oluşturulan dosyaları yok sayın:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code eklentisi

Anahtar otomatik tamamlama, eksik çeviri hataları, satır içi önizlemeler ve hızlı eylemler için resmi **[Intlayer VS Code eklentisini](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** yükleyin. [Eklenti dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) bakın.

- [Eklenti dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)

### Daha fazlası

[Görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ekleyin veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile dışarıya taşıyın.

- [Görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

## Sıkça sorulan sorular

<FAQ>

<Question title="vinext nedir?">

vinext, Cloudflare tarafından sürdürülen ve Next.js'in herkese açık API'sini yeniden uygulayan açık kaynaklı bir Vite eklentisidir: App Router ve Pages Router, React Server Components, Server Actions, `proxy.ts`, route handler'lar ve `next/*` modülleri. Next.js kodunuz Vite üzerinde çalışır ve Cloudflare Workers'a yerel olarak ya da Nitro aracılığıyla diğer platformlara dağıtılır.

</Question>
<Question title="Next.js kurulumuna kıyasla ne değişiyor?">

Yalnızca derleme entegrasyonu. Next.js'te `withIntlayer()`, `next.config.ts` dosyasını sarar. vinext'te bunun yerine `vite-intlayer` içindeki `intlayer()` eklentisi `vite.config.ts` dosyasına eklenir. Provider'lar, hook'lar, `proxy.ts`, meta veriler ve sitemap kodu aynı kalır, bu yüzden bu sayfanın kapsamadığı her şey için [Next.js 16 rehberini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md) izleyebilirsiniz.

- [Next.js 16 rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)

</Question>
<Question title="Next.js i18n yapılandırmasına veya SWC eklentisine ihtiyacım var mı?">

Hayır. `next.config.ts` içindeki `i18n` alanı vinext'te yalnızca Pages Router dil öneklerini kapsar ve Intlayer kendi yönlendirmesini `proxy.ts` ile yapar. `@intlayer/swc` eklentisine de gerek yoktur: Vite eklentisi `useIntlayer` çağrılarını zaten değiştirdiği için her sayfa yalnızca kullandığı sözlükleri gönderir. [Bundle optimizasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) bakın.

- [Bundle optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)

</Question>
<Question title="Geliştirmede `intlayer watch` gerekli mi?">

Hayır. `intlayer()` Vite eklentisi içerik izleyicisini `vite dev` ile başlatır ve bir içerik düzenlemesi yalnızca değişen sözlüğü okuyan bileşenleri anında günceller.

</Question>
<Question title="Bileşenlerimi yeniden yazmadan `next-intl` veya `i18next` kullanımından geçebilir miyim?">

Evet. [next-intl geçiş rehberini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) veya [i18next geçiş rehberini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) izleyin ya da Intlayer sözlükleriyle çalışan `next-intl`, `react-i18next` ve `react-intl` API'lerini sunan [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) ile mevcut API'nizi koruyun.

- [next-intl geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md)
- [i18next geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md)
- [Uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md)

</Question>
<Question title="Dili /fr/about gibi URL'ye koymak zorunda mıyım?">

Hayır. `routing.mode` şunları kabul eder:

- `"prefix-no-default"` (varsayılan): varsayılan dil için `/about`, diğerleri için `/fr/about`.
- `"prefix-all"`: her dil önek alır, `/en/about` ve `/fr/about`.
- `"no-prefix"`: yolda dil yoktur, çerezden veya header'dan çözümlenir.
- `"search-params"`: `/about?locale=fr`.

[Yapılandırma referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ve 2. adımdaki dil yolu olmayan mimariye bakın.

- [Yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

</Question>
<Question title="Uygulamamı yapay zeka ile otomatik olarak nasıl çeviririm?">

`npx intlayer fill` komutunu çalıştırın. CLI eksik çevirileri algılar ve kendi sağlayıcınız ile API anahtarınızı kullanarak seçtiğiniz LLM ile doldurur. [fill komutuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md) bakın.

- [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)
- [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md)

</Question>
<Question title="Yayına almadan önce eksik çevirileri nasıl yakalarım?">

CI'da `npx intlayer test` komutunu çalıştırın. Bildirilen bir dilde içerik eksikse derleme başarısız olur. [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) aynı hataları siz yazarken gösterir ve [ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md) koda gömülü metinleri işaretler.

- [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)
- [ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)

</Question>
<Question title="Intlayer ücretsiz ve açık kaynak mı?">

Evet. Intlayer, Apache 2.0 lisansı altında açık kaynaklıdır; kütüphane, CLI, görsel editör ve derleyici ticari kullanım dahil ücretsizdir. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve [kendi sunucunuzda barındırılabilir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

- [Kendi sunucunuzda barındırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)

</Question>

</FAQ>
