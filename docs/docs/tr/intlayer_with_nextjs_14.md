---
createdAt: 2024-12-06
updatedAt: 2026-06-23
title: "Next.js 14 i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Next.js 14 uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - nextjs
  - intlayer
  - internationalization
  - i18n
  - typescript
  - react
  - nextjs-14
slugs:
  - doc
  - environment
  - nextjs
  - 14
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.6.0
    date: 2025-07-06
    changes: "`withIntlayer()` fonksiyonunu promise tabanlı fonksiyona dönüştür"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmişi başlat"
author: aymericzip
---

# Intlayer ile Next.js 14 and App Router çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'Next-intl' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Next.js kapsamı">

Intlayer, verimli işleme için **Sunucu Bileşenleri** ile çalışacak şekilde optimize edilmiştir ve [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) ile tamamen uyumludur. Statik oluşturmayı engellemez ve ara yazılımların yanı sıra uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunar.

> Intlayer, Next.js 12, 13, 14, 15 ve 16 ile uyumludur. Next.js Pages Router kullanıyorsanız bu [rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md) başvurabilirsiniz.
> Yerel yönlendirme SEO, bundle boyutu ve performans açısından faydalıdır. İhtiyacınız yoksa bu [rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) başvurabilirsiniz.
> Uygulama Yönlendiricili Next.js 12, 13, 14 ve 15 için bu [kılavuz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) bakın.

</Accordion>

<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **bundle ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>

<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

</Accordion>

<Accordion header="Otomasyon">

Maliyeti AI sağlayıcınıza ait olmak üzere seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkime sorunlarına yol açabilir. Intlayer, içerik yüklemenizi derleme sırasında optimize eder.

</Accordion>

<Accordion header="Non-dev ile ölçeklendirme">

Bir i18n çözümünden çok daha fazlası olan Intlayer, **kendi kendine barındırılan bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** ve **[tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olarak çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini kusursuz hale getirir. İçerik yerel olarak ve/veya uzaktan depolanabilir.

</Accordion>
</AccordionGroup>

---

## Ön Koşullar

Bu kılavuzu takip etmek için aşağıdaki araçlara ihtiyacınız olacak:

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştıracağınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

- Node.js 18 veya üzeri
- npm, pnpm veya yarn paket yöneticisi
- Next.js 14 projesi

<Steps>

<Step number={1} title="Intlayer Paketlerini Kurma">

İlk olarak, Intlayer paketlerini projenize kurun:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install next-intlayer intlayer --save
```

```bash packageManager="pnpm"
pnpm add next-intlayer intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer intlayer
```

```bash packageManager="bun"
bun add next-intlayer intlayer --save
```

- **intlayer**

Internationalization araçlarını sağlayan core package'ı, konfigürasyon yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilation ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için.

- **next-intlayer**

Intlayer'ı Next.js ile entegre eden paket. Next.js uluslararasılaştırması için context providers ve hooks'ları sağlar. Ayrıca, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js plugin'ini, ayrıca kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yeniden yönlendirmesini işlemek için middleware'i içerir.

</Step>

<Step number={2} title="Intlayer Yapılandırma Dosyası Oluşturma">

Here is the final structure that we will make:

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
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Proje kök dizininizde `intlayer.config.ts` dosyasını oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales } from "intlayer";
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // İçerik dosyalarınızın bulunduğu dizin
    fileExtensions: [".content.ts", ".content.js", ".content.json"],
    baseDir: "./src",
    contentDirName: "content",
    // İçerik dosyalarınızın türlerini belirtin
    types: {
      filePath: "./types/intlayer.d.ts",
      moduleAugmentation: true,
    },
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, middleware yönlendirmesi, cookie adları, içerik bildirimlerinizin konumu ve uzantısı, Intlayer günlüklerini konsolda devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) başvurun.

</Step>

<Step number={3} title="Next.js Yapılandırmasını Güncelleme">

Next.js yapılandırma dosyanızı Intlayer ile uyumlu hale getirin:

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/async";

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

export default withIntlayer(config);
```

```javascript fileName="next.config.js" codeFormat="esm"
import { withIntlayer } from "next-intlayer/async";

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

export default withIntlayer(config);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/async");

const config = {
  // ... Mevcut Next.js yapılandırmanız
};

module.exports = withIntlayer(config);
```

</Step>

<Step number={4} title="İçerik Bildirimi">

İçerik dosyalarınızı oluşturun. Bu dosyalar, uygulamanızdaki çok dilli içeriği tanımlar.

```typescript fileName="src/content/home.content.ts" codeFormat={["typescript", "esm"]}
import { t } from "intlayer";
import { type ILocaleContent } from "intlayer";

const homeContent = {
  title: t({
    en: "Welcome to My App",
    fr: "Bienvenue dans mon application",
    es: "Bienvenido a mi aplicación",
    tr: "Uygulamama Hoş Geldiniz",
  }),
  description: t({
    en: "This is a sample Next.js application with Intlayer",
    fr: "Ceci est un exemple d'application Next.js avec Intlayer",
    es: "Esta es una aplicación de ejemplo de Next.js con Intlayer",
    tr: "Bu, Intlayer ile örnek bir Next.js uygulamasıdır",
  }),
} satisfies ILocaleContent;

export default homeContent;
```

> `intlayerMiddleware`, kullanıcının tercih ettiği dili algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtilen uygun URL'ye yönlendirmek için kullanılır. Ayrıca, kullanıcının tercih ettiği dili bir çerezde kaydetmeyi sağlar.

> Intlayer v9'dan bu yana, bu middleware `routing.enableProxy` seçeneğini respects eder (`true` varsayılan olarak). Bunu pass-through haline dönüştürmek için konfigürasyonunuzda `routing.enableProxy: false` ayarlayın ve bu dosyayı silmeyin. [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) dosyasına bakın.

> Uygulamanızın rotalarıyla eşleşmesi için `matcher` parametresini uyarlayın. Daha fazla ayrıntı için [Next.js matcher yapılandırması belgesine](https://nextjs.org/docs/app/building-your-application/routing/middleware) bakın.

> Birden fazla middleware'i bir araya getirmeniz gerekiyorsa (örneğin, `intlayerMiddleware`'i kimlik doğrulama veya özel middleware'lerle), Intlayer artık `multipleMiddlewares` adında bir yardımcı sağlıyor.

```json fileName="src/content/home.content.json"
{
  "title": {
    "en": "Welcome to My App",
    "fr": "Bienvenue dans mon application",
    "es": "Bienvenido a mi aplicación",
    "tr": "Uygulamama Hoş Geldiniz"
  },
  "description": {
    "en": "This is a sample Next.js application with Intlayer",
    "fr": "Ceci est un exemple d'application Next.js avec Intlayer",
    "es": "Esta es una aplicación de ejemplo de Next.js con Intlayer",
    "tr": "Bu, Intlayer ile örnek bir Next.js uygulamasıdır"
  }
}
```

</Step>

<Step number={5} title="İçerik Kullanımı">

İçeriğinizi bileşenlerinizde kullanın:

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

> `RootLayout` bileşenini boş tutmak, [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) ve [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) özniteliklerini `<html>` etiketine ayarlamaya izin verir.

</Step>

<Step number={6} title="Middleware Kurulumu">

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <IntlayerProvider locale={locale}>
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  </IntlayerProvider>
);

export default LocaleLayout;
```

> Tek bir `IntlayerProvider`, ağacın her iki yarısını da kapsar: istek kapsamlı sunucu bağlamını tohumlandırır (sunucu hooks'ları tarafından okunur) ve istemci sağlayıcısını monte eder, böylece istemci bileşenleri aynı yerel ayarı alır.

Next.js 14'te çok dilli yönlendirme için middleware kurun:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer, IntlayerProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
    </body>
  </html>
);

export default LocaleLayout;
```

</Tab>
</Tabs>

> `[locale]` yol segmenti, dili tanımlamak için kullanılır. Örneğin: `/en-US/about` `en-US` dilini ve `/fr/about` ise `fr` dilini ifade eder.

> Bu aşamada şu hatayı alacaksınız: `Error: Missing <html> and <body> tags in the root layout.`. Bu beklenen bir durumdur çünkü `/app/page.tsx` dosyası artık kullanılmamaktadır ve kaldırılabilir. Bunun yerine, `[locale]` path segment `/app/[locale]/page.tsx` sayfasını etkinleştirecektir. Sonuç olarak, sayfalar tarayıcınızda `/en`, `/fr`, `/es` gibi yollar aracılığıyla erişilebilir olacaktır. Varsayılan locale'i kök sayfa olarak ayarlamak için, 4. adımdaki `middleware` kurulumuna başvurun.

Ardından, uygulamanızın Layout'unda `generateStaticParams` fonksiyonunu uygulayın.

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { createMiddleware } from "next-intlayer/middleware";
import { type NextRequest } from "next/server";

export default createMiddleware({
  // Alternatif olarak, middleware seçeneklerini özelleştirebilirsiniz
  // locales: ['en', 'fr', 'es'],
  // defaultLocale: 'en',
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

> `generateStaticParams`, uygulamanızın tüm locales için gerekli sayfaları önceden oluşturmasını sağlayarak runtime hesaplamasını azaltır ve kullanıcı deneyimini iyileştirir. Daha fazla bilgi için [Next.js generateStaticParams belgesine](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) bakın.

</Step>

<Step number={7} title="Düzen Dosyası (Layout)">

Kök düzen dosyanızı çok dilli hale getirin:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import {} from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { getLocaleName } from "intlayer";
import { Inter } from "next/font/google";
import { type Metadata } from "next/types";
import { getIntlayer } from "next-intlayer/server";
import { type Locales } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = (params: {
  params: { locale: Locales };
}): Metadata => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "My App",
      fr: "Mon Application",
      es: "Mi Aplicación",
      tr: "Uygulamam",
    }),
    description: t({
      en: "This is my Next.js app with Intlayer",
      fr: "Ceci est mon application Next.js avec Intlayer",
      es: "Esta es mi aplicación Next.js con Intlayer",
      tr: "Bu, Intlayer ile Next.js uygulamamdır",
    }),
  };
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locales };
}) {
  const { locale } = params;
  const localeName = getLocaleName(locale);
  const textDirection = getHTMLTextDir(locale);

  return (
    <html lang={locale} dir={textDirection}>
      <body className={inter.className}>
        <header>
          <h1>{localeName}</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "tr": "Düzenleyerek başlayın",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "tr": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> İçerik deklarasyonlarınız, `contentDir` dizinine dahil edildikleri sürece uygulamanızın herhangi bir yerinde tanımlanabilir (varsayılan olarak `./src`). Ve içerik deklarasyonu dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla bilgi için [içerik bildirimi belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) başvurun.

</Step>

<Step number={8} title="Sayfa Yönlendirme">

Sayfa yönlendirmelerini çok dilli hale getirin:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";

export default function HomePage() {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

- **`IntlayerProvider`** yerel düzen içinde bir kez monte edilir. Sunucu ve istemci bileşenlerine yerel ayarları sağlar, bu nedenle sayfalar artık kendilerini sarmalamaz.
- Sunucu hooks'ları yerel ayarları şu sırayla çözer: çağrı sitesinde geçirilen yerel ayar, ardından sağlayıcı tarafından başlatılan sunucu bağlamı, ardından istekle taşınan yerel ayar (Intlayer proxy'si tarafından ayarlanan `x-intlayer-locale` başlığı, ardından yerel ayar cookie'si). Bu son adım, yalnızca sayfa segmentini yeniden işleyen istemci tarafı navigasyonunda içeriğin doğru kalmasını sağlar; burada düzen — ve onunla birlikte sağlayıcı — yeniden çalışmaz.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** istemci tarafı bileşenlerine locale sağlamak için kullanılır. Herhangi bir ana bileşene, düzen (layout) dahil olmak üzere yerleştirilebilir. Ancak, düzene yerleştirmek önerilir çünkü Next.js düzen kodunu sayfalar arasında paylaştığı için daha verimlidir. Düzende `IntlayerClientProvider` kullanarak, her sayfa için yeniden başlatmaktan kaçınır, performansı iyileştirir ve uygulamanız genelinde tutarlı bir lokalizasyon bağlamı sağlarsınız.
- **`IntlayerServerProvider`** sunucu alt öğelerine locale sağlamak için kullanılır. Düzende ayarlanamaz.

> Layout ve page ortak bir server context paylaşamaz çünkü server context sistemi, per-request data store'a dayalıdır ([React's cache](https://react.dev/reference/react/cache) mekanizması aracılığıyla), bu da her "context"in uygulamanın farklı segmentleri için yeniden oluşturulmasına neden olur. Provider'ı shared layout'a yerleştirmek bu izolasyonu bozar, server context değerlerinin server component'lerinize doğru şekilde yayılmasını engeller.

</Step>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimini oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Step number={9} title="Meta Verilerin Uluslararasılaştırılması">

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` isomorphic import yoludur: `react-server` export koşulu sunucu bileşenlerine ambient-locale uygulamasını verirken, istemci bileşenleri context-backed olanı alır. Aynı çağrı her iki tarafta da çalışır.

Sayfa meta verilerini uluslararasılaştırın:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer } from "next-intlayer/server";
import { type Locales } from "intlayer";
import { type Metadata } from "next/types";

export const generateMetadata = (params: {
  params: { locale: Locales };
}): Metadata => {
  const { locale } = params.params;
  const t = getIntlayer(locale);

  return {
    title: t({
      en: "Home Page",
      fr: "Page d'accueil",
      es: "Página de inicio",
      tr: "Ana Sayfa",
    }),
    description: t({
      en: "Welcome to the home page",
      fr: "Bienvenue sur la page d'accueil",
      es: "Bienvenido a la página de inicio",
      tr: "Ana sayfaya hoş geldiniz",
    }),
  };
};

export default function HomePage() {
  const content = getIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

 </Tab>
</Tabs>

> İçeriğinizi `alt`, `title`, `href`, `aria-label` gibi bir `string` özniteliğinde kullanmak istiyorsanız, fonksiyonun değerini şu şekilde kullanabilirsiniz:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook hakkında daha fazla bilgi için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakınız.

</Step>

<Step number={10} title="Site Haritası ve Robots.txt Kurulumu">

Site haritanızı ve robots.txt dosyanızı çok dilli hale getirin:

```typescript fileName="src/app/[locale]/sitemap.ts" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";
import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = [
    Locales.ENGLISH,
    Locales.FRENCH,
    Locales.SPANISH,
    Locales.TURKISH,
  ];

  return [
    {
      url: getLocalizedUrl("/", Locales.ENGLISH),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: getLocalizedUrl("/", locale),
          }),
          {}
        ),
      },
    },
  ];
}
```

```typescript fileName="src/app/[locale]/robots.ts" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: getLocalizedUrl("/sitemap.xml", Locales.ENGLISH),
  };
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Her locale için tüm url'leri içeren bir nesne oluşturur.
   *
   * Örnek:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Döndürür
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

// ... Kodun geri kalanı
````

> `next-intlayer` adresinden içe aktarılan `getIntlayer` işlevinin, içeriğinizi visual editor ile entegrasyon sağlayan bir `IntlayerNode` içinde sarılı şekilde döndürdüğünü unutmayın. Buna karşılık, `intlayer` adresinden içe aktarılan `getIntlayer` işlevi, içeriğinizi ek özelliklere sahip olmaksızın doğrudan döndürür.

> Metadata optimizasyonu hakkında daha fazla bilgi için [resmi Next.js dokumentasyonuna](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) bakın.

</Step>

<Step number={11} title="Yerel Anahtarlayıcı Bileşeni Oluşturma">

`sitemap.xml` ve `robots.txt` dosyalarınızı uluslararasılaştırmak için Intlayer tarafından sağlanan `getMultilingualUrls` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, sitemap'iniz için çok dilli URL'ler oluşturmanıza olanak tanır.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

Uygulamanızın mevcut yerel ayarı saygı göstermesini sağlamak için, bir yerel anahtarlayıcı bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak mevcut dille önekler, böylece örneğin Fransızca konuşan bir kullanıcı "Hakkında" sayfasına bir bağlantıya tıkladığında, `/fr/hakkinda` yerine `/hakkinda`ya yönlendirilir.

Bu davranış birkaç nedenden dolayı kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sağlar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL yönetim mantığını tek bir bileşende merkezileştirmek, kod tabanınızı yönetmeyi ve uygulamanız büyüdükçe genişletmeyi basitleştirir.

Aşağıda, TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";
import { Locales } from "intlayer";

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const handleLocaleChange = (newLocale: Locales) => {
    const pathWithoutLocale = window.location.pathname.replace(
      /^\/[a-z]{2}/,
      ""
    );
    router.push(getLocalizedUrl(pathWithoutLocale, newLocale));
  };

  return (
    <div>
      <h2>Dil Seçin</h2>
      <div>
        {Object.values(Locales).map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => handleLocaleChange(localeItem)}
            disabled={locale === localeItem}
          >
            {localeItem.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

> Alternatif bir yol, `useLocale` kancası tarafından sağlanan `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon, sayfa ön yüklemesine izin vermez ve sayfayı yeniden yükler.

> Bu durumda, `router.push` kullanarak yönlendirme olmadan, sadece sunucu tarafı kodunuz içeriğin yerel ayarını değiştirecektir.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Geri kalan kod

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızca'ya Geç</button>
);
```

> Dokümantasyon referansları:
>
> - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özelliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özelliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özelliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Yerelleştirilmiş Bağlantı Bileşeni Oluşturma" isOptional={true}>

Uygulamanızın navigasyonunun mevcut yerel ayarı saygı göstermesini sağlamak için, özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak mevcut dille önekler, böylece örneğin Fransızca konuşan bir kullanıcı "Hakkında" sayfasına bir bağlantıya tıkladığında, `/fr/hakkinda` yerine `/hakkinda`ya yönlendirilir.

Bu davranış birkaç nedenden dolayı kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sağlar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun mevcut yerel ayar içinde kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL yönetim mantığını tek bir bileşende merkezileştirmek, kod tabanınızı yönetmeyi ve uygulamanız büyüdükçe genişletmeyi basitleştirir.

Aşağıda, TypeScript'te yerelleştirilmiş bir `Link` bileşeninin uygulanması bulunmaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Verilen bir URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa, harici olarak kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Href özelliğini mevcut yerel ayar temelinde uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, `getLocalizedUrl` kullanarak URL'yi yerel ayar ile önekler (örneğin, /fr/hakkinda).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahili ise ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### Nasıl Çalışır

- **Harici Bağlantıları Algılama**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar değişmeden bırakılır çünkü yerelleştirmeye ihtiyaçları yoktur.

- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar (yani harici olmayan) için, `getLocalizedUrl` kullanarak URL'yi otomatik olarak mevcut yerel ayar ile önekler. Bu, kullanıcınız Fransızca ise, `/hakkinda` href'ini geçmek onu `/fr/hakkinda`ya dönüştürür.

- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL ile bir `<a>` elementi döndürür, böylece navigasyon yerel ayar ile tutarlı olur.

Bu `Link` bileşenini uygulamanız boyunca entegre ederek, tutarlı ve dil bilincine sahip bir kullanıcı deneyimi sürdürürsünüzken aynı zamanda gelişmiş SEO ve kullanılabilirlikten de yararlanırsınız.

</Step>

<Step number={12} title="Sunucu Eylemlerinde (Server Actions) geçerli yerel ayarı alın" isOptional={true}>

Bir Sunucu Eylemi (Server Action) içinde aktif yerel ayara ihtiyacınız varsa (örneğin, e-postaları yerelleştirmek veya yerel ayara duyarlı mantık çalıştırmak için), `next-intlayer/server` üzerinden `getLocale` fonksiyonunu çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Yerel ayar ile bir şeyler yapın
};
```

> `getLocale` fonksiyonu, kullanıcının yerel ayarını belirlemek için basamaklı bir strateji izler:
>
> 1. İlk olarak, ara katman yazılımı (middleware) tarafından ayarlanmış olabilecek bir yerel ayar değeri için istek başlıklarını kontrol eder
> 2. Başlıklarda yerel ayar bulunamazsa, çerezlerde saklanan bir yerel ayar arar
> 3. Çerez bulunamazsa, kullanıcının tercih ettiği dili tarayıcı ayarlarından tespit etmeye çalışır
> 4. Son çare olarak, uygulamanın yapılandırılmış varsayılan yerel ayarına geri döner
>
> Bu, mevcut bağlama göre en uygun yerel ayarın seçilmesini sağlar.

</Step>

<Step number={13} title="bundle boyutunuzu Optimize Edin" isOptional={true}>

`next-intlayer` kullanırken, sözlükler varsayılan olarak her sayfa için pakete dahil edilir. bundle boyutunu optimize etmek için, Intlayer isteğe bağlı bir SWC eklentisi sağlar ki bu, `useIntlayer` çağrılarını akıllıca makrolar kullanarak değiştirir. Bu, sözlüklerin sadece onları gerçekten kullanan sayfalar için paketlere dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için, `@intlayer/swc` paketini kurun. Kurulduktan sonra, `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Not: Bu optimizasyon sadece Next.js 13 ve üzeri için kullanılabilir.

> Not: Bu paket varsayı alan olarak kurulmaz çünkü SWC eklentileri Next.js'te hala deneyseldir. Gelecekte değişebilir.

> Not: Eğer seçeneği `importMode: 'dynamic'` veya `importMode: 'fetch'` olarak ayarlarsanız (sözlük yapılandırmasında), Suspense'e dayanacaktır, bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırıyla sarmalamanız gerekecektir. Bu, `useIntlayer`'ı doğrudan Sayfa / Düzen bileşeninizin en üst düzeyinde kullanamayacağınız anlamına gelir.
> </Step>

</Steps>

### TypeScript Yapılandırma

Intlayer, TypeScript'ten faydalanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletmesi kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırma

Intlayer tarafından oluşturulan dosyaları yok saymanız önerilir. Bu, onları Git deposuna göndermemenizi sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için, resmi **Intlayer VS Code Uzantısı**'nı kurabilirsiniz.

[VS Code Marketplace'ten Kurun](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Uzantısı dokümantasyonu](https://intlayer.org/doc/vs-code-extension)na bakın.

### Daha Fazla Bilgi Edinin

Daha fazla ilerlemek için, [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)yi uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak harici hale getirebilirsiniz.
