---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js 16 i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Next.js 16 uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 8.0.0
    date: 2026-01-10
    changes: "İlk sürüm"
author: aymericzip
---

# Next.js 16 web sitenizi (sayfa yolunda [locale] olmadan) Intlayer kullanarak çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) sayfasına bakın.

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

## Next.js Uygulamasında Intlayer Kurulumuna Adım Adım Rehber

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak yükleyin:

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
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpilation ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçlarını sağlayan çekirdek paket.

- **next-intlayer**

Intlayer'ı Next.js ile entegre eden paket. Next.js için uluslararasılaştırma amacıyla context provider'ları ve hook'lar sağlar. Ayrıca Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisini ve kullanıcının tercih ettiği dili algılamak, çerezleri yönetmek ve URL yönlendirmesini gerçekleştirmek için bir proxy içerir.

</Step>

<Step number={2} title="Projenizi Yapılandırın">

İşte oluşturacağımız son yapı:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Eğer locale yönlendirmesi istemiyorsanız, intlayer basit bir provider / hook olarak kullanılabilir. Daha fazla ayrıntı için [bu rehbere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md) bakın.

Uygulamanızın dillerini yapılandırmak için bir config dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yereller (locales)
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // veya `no-prefix` - middleware tespiti için kullanışlı
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, proxy yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını, Intlayer günlüklerini konsolda devre dışı bırakmayı ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir tüm parametrelerin eksiksiz listesi için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Next.js Yapılandırmanıza Entegre Edin">

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* yapılandırma seçenekleri burada */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim (content declaration) dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize etmek için alias'lar sağlar ve sunucu bileşenleriyle uyumluluğu garanti eder.

> `withIntlayer()` fonksiyonu bir promise fonksiyonudur. Derleme başlamadan önce intlayer sözlüklerini hazırlamanıza olanak tanır. Diğer eklentilerle birlikte kullanmak istiyorsanız, onu await edebilirsiniz. Örnek:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer, proje komut satırı bayrakları `--webpack`, `--turbo` veya `--turbopack` ile ve mevcut **Next.js sürümünüz**e göre projenizin **webpack** mi yoksa **Turbopack** mi kullandığını otomatik olarak algılar.
>
> `next>=16` olduğunda, eğer **Rspack** kullanıyorsanız, Turbopack'i devre dışı bırakarak Intlayer'ın webpack yapılandırmasını kullanmasını açıkça zorlamalısınız:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Dinamik Locale Rotalarını Tanımlayın">

RootLayout içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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

> Tek bir `IntlayerProvider` ağacın her iki yarısını da kapsar: istek kapsamlı sunucu bağlamını tohumlar ve sunucu hook'ları tarafından okunur, istemci sağlayıcısını monte eder, böylece istemci bileşenleri aynı yerel ayarı alır.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>

<Step number={5} title="İçeriğinizi Deklare Edin">

Çevirileri saklamak için içerik deklarasyonlarınızı oluşturun ve yönetin:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      tr: "Projemin Başlığı",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      tr: "İş akışınızı sadeleştirmek ve verimliliği artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      tr: ["yenilik", "verimlilik", "iş akışı", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      tr: ["yenilik", "verimlilik", "iş akışı", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "tr": "Projemin Başlığı",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "tr": "İş akışınızı kolaylaştırmak ve verimliliği artırmak için tasarlanmış yenilikçi platformumuzu keşfedin.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "tr": ["yenilik", "verimlilik", "iş akışı", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
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
    "pageLink": "src/app/page.tsx"
  }
}
```

> İçerik deklarasyonlarınız, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildikleri sürece uygulamanızda herhangi bir yerde tanımlanabilir. Ve içerik deklarasyon dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla ayrıntı için [içerik deklarasyonu dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

</Step>

<Step number={6} title="İçeriği Kodunuzda Kullanın">

Uygulamanız genelinde içerik sözlüklerinize erişin:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** kök layout'ta bir kez monte edilir. Locale'i hem server hem de client bileşenlerine sağlar, böylece sayfalar artık kendilerini sarmalamaz.
- `[locale]` path segmenti olmadan locale her zaman istekten gelir — Intlayer proxy tarafından ayarlanan `x-intlayer-locale` header'ı, ardından locale cookie'si — provider çalışmadığında server hook'ları bunları kendi başlarına okur.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** istemci tarafı bileşenlerine locale sağlamak için kullanılır. Layout dahil herhangi bir üst bileşene yerleştirilebilir. Ancak, Next.js'in layout kodunu sayfalar arasında paylaştığı ve bu nedenle daha verimli olduğu için bir layout içine yerleştirilmesi önerilir. `IntlayerClientProvider`'ı layout'ta kullanarak, her sayfa için yeniden oluşturulmasını önleyerek performansı artırır ve uygulamanız boyunca tutarlı bir yerelleştirme bağlamı sağlar.
- **`IntlayerServerProvider`** sunucu çocuklarına locale sağlamak için kullanılır. Layout içinde ayarlanamaz.

  > Layout ve page ortak bir server context paylaşamaz çünkü server context sistemi her isteğe özel bir veri deposuna (React'in cache mekanizması aracılığıyla) dayanır, bu da uygulamanın farklı segmentleri için her "context"in yeniden oluşturulmasına neden olur. Sağlayıcıyı paylaşılan bir layout'a yerleştirmek bu izolasyonu bozacak ve server bileşenlerinize server context değerlerinin doğru şekilde iletilmesini engelleyecektir.

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik tanımını oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` isomorphic bir import yolu: `react-server` export condition sunucu bileşenlerine ambient-locale uygulamasını sağlarken, istemci bileşenleri context-backed olanı alır. Aynı çağrı her iki tarafta da çalışır.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimi oluştur

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> İçeriğinizi bir `string` özniteliğinde kullanmak istiyorsanız; ör. `alt`, `title`, `href`, `aria-label` vb., fonksiyonun değerini çağırmalısınız, örneğin:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook'u hakkında daha fazla bilgi edinmek için [belgelere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakın.

</Step>

<Step number={7} title="Locale Algılama için Proxy'yu Yapılandırma" isOptional={true}>

Kullanıcının tercih ettiği locale'i algılamak için proxy'yu yapılandırın:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`, kullanıcının tercih ettiği yerel dili algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtildiği gibi uygun URL'ye yönlendirmek için kullanılır. Ayrıca, kullanıcının tercih ettiği yerel dili bir çerezde kaydetmeyi sağlar.

> Intlayer v9'dan itibaren, bu middleware `routing.enableProxy` seçeneğine saygı duyar (`true` varsayılan olarak). Bunu bir pass-through'a dönüştürmek için konfigürasyonunuzda `routing.enableProxy: false` ayarlayın ve bu dosyayı silmeyin. [v9 sürüm notlarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) bakın.

> Birden fazla proxy'yi birbirine zincirlemeniz gerekiyorsa (örneğin, kimlik doğrulama veya özel proxy'lerle `intlayerProxy`), Intlayer artık `multipleProxies` adlı bir yardımcı sağlar.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="İçeriğinizin dilini değiştirin" isOptional={true}>

Next.js'te içeriğinizin dilini değiştirmek için önerilen yol, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek amacıyla `Link` bileşenini kullanmaktır. `Link` bileşeni sayfanın önceden getirilmesini (prefetching) sağlar; bu da tam sayfa yeniden yüklemesini önlemeye yardımcı olur.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Yerel (Locale) - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Dil kendi yerelinde - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Dil mevcut locale'de - örn. mevcut locale Locales.SPANISH ise "Francés" */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif bir yol, `useLocale` hook'unun sağladığı `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon sayfanın prefetching yapılmasına izin vermez. Daha fazla bilgi için [`useLocale` hook dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) bakın.

> Dokümantasyon referansları:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Sunucu eylemlerinde geçerli yereli (locale) alın" isOptional={true}>

Eğer bir sunucu eylemi içinde aktif yerel ayara (örn. e-postaları yerelleştirmek veya yerel duyarlı mantık çalıştırmak için) ihtiyacınız varsa, `next-intlayer/server` içinden `getLocale`'i çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale ile bir şeyler yap
};
```

> `getLocale` fonksiyonu kullanıcının yerel ayarını belirlemek için kademeli bir strateji izler:
>
> 1. Öncelikle, proksi tarafından ayarlanmış olabilecek bir locale değerini kontrol etmek için istek başlıklarını (request headers) kontrol eder
> 2. Başlıklarda locale bulunamazsa, çerezlerde (cookies) saklanan bir locale arar
> 3. Çerez bulunamazsa, kullanıcının tarayıcı ayarlarından tercih edilen dili tespit etmeye çalışır
> 4. Son çare olarak uygulamanın yapılandırılmış varsayılan locale değerine döner
>
> Bu, kullanılabilir bağlama göre en uygun yerelin seçilmesini sağlar.

</Step>

<Step number={10} title="bundle boyutunuzu optimize edin" isOptional={true}>

`next-intlayer` kullanıldığında, sözlükler varsayılan olarak her sayfanın bundle'ına dahil edilir. bundle boyutunu optimize etmek için Intlayer, makrolar kullanarak `useIntlayer` çağrılarını akıllıca değiştiren isteğe bağlı bir SWC eklentisi sağlar. Bu, sözlüklerin yalnızca bunları gerçekten kullanan sayfaların bundle'larına dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra `next-intlayer` eklentiyi otomatik olarak algılar ve kullanır:

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

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri için kullanılabilir.

> Not: Bu paket varsayılan olarak yüklenmez çünkü SWC eklentileri Next.js üzerinde hâlâ deneysel durumdadır. İleride değişebilir.

> Not: Eğer seçeneği `importMode: 'dynamic'` veya `importMode: 'fetch'` (`dictionary` yapılandırmasında) olarak ayarlarsanız, bu Suspense'e dayanır; bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırı içine almanız gerekir. Bu, `useIntlayer`'ı Sayfa / Layout bileşeninizin en üst düzeyinde doğrudan kullanamayacağınız anlamına gelir.
> </Step>

</Steps>

### Turbopack'ta sözlük değişikliklerini izleme

next dev komutunu kullanarak geliştirme sunucunuz olarak Turbopack'i kullandığınızda, sözlük değişiklikleri varsayılan olarak otomatik algılanmaz.

Bu sınırlama, Turbopack'in içerik dosyalarınızdaki değişiklikleri izlemek için webpack eklentilerini paralel olarak çalıştıramamasından kaynaklanır. Bunu aşmak için geliştirme sunucusunu ve Intlayer derleme izleyicisini aynı anda çalıştırmak üzere `intlayer watch` komutunu kullanmanız gerekir.

```json5 fileName="package.json"
{
  // ... Mevcut package.json yapılandırmalarınız
  "scripts": {
    // ... Mevcut scripts yapılandırmalarınız
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Eğer next-intlayer@<=6.x.x kullanıyorsanız, Next.js 16 uygulamasının Turbopack ile doğru çalışması için `--turbopack` bayrağını tutmanız gerekir. Bu sınırlamadan kaçınmak için next-intlayer@>=7.x.x kullanmanızı öneririz.

### TypeScript'i Yapılandırma

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı güçlendirmek için module augmentation kullanır.

![Otomatik tamamlama](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Çeviri hatası](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik oluşturulmuş tipleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları yoksaymanız önerilir. Bu, bu dosyaları Git deponuza commit etmekten kaçınmanızı sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki satırları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Otomatik tamamlama** çeviri anahtarları için.
- Eksik çeviriler için **gerçek zamanlı hata tespiti**.
- **Satır içi önizlemeler**, çevrilmiş içeriğin önizlemeleri.
- **Hızlı eylemler**, çevirileri kolayca oluşturup güncellemek için.

Daha fazla ayrıntı için uzantının nasıl kullanılacağına dair [Intlayer VS Code Extension belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha İleri

Daha ileri gitmek için [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışsallaştırabilirsiniz.

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Uygulamayı URL'de yerel olmadan neden sunmak isteyebilirim?">

Daha temiz URL'ler elde etmek, tek dilli görünen ancak kullanıcı tercihine veya çerezlere göre yerelleşen portallar oluşturmak veya mevcut URL yapısını bozmadan çoklu dil desteği eklemek için tercih edilir.

</Question>

<Question title="i18n Next.js paket (bundle) boyutuma ne kadar ekler?">

Ad alanı (namespace) tabanlı çözümlere kıyasla çok daha az, çünkü bir sayfa render etmediği bir sözlüğü asla indirmez. Sunucu bileşenleri içeriği sunucuda çözümler, derleme zamanı derleyicisi ise `useIntlayer` çağrılarını yalnızca kullanılan kayıtlarla değiştirir. [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler, paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="next-intl, next-i18next veya i18next'ten bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet, iki yol vardır. [i18next geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) veya [next-intl geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) ile içeriği aşamalı taşıyabilirsiniz. Ya da mevcut API'nizi koruyabilirsiniz: [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md), `next-intl` ve `i18next` ile birebir aynı API'yi Intlayer sözlükleri üzerinden sunar.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük metinleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

Tam otomatik bir akış için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında JSX, TSX, Vue ve Svelte kodunda aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir, böylece elle anahtar yönetimi gerekmez. Statik analizle çalıştığından, yalnızca çalışma zamanında var olan dizeler kapsam dışı kalır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama ile LSP destekleyen tüm editörlerde aynı deneyim. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözümler.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Yerel bu durumda nasıl algılanır?">

Öncelikle tanımlama bilgisi (cookie), ardından `Accept-Language` başlığı okunur ve son çare olarak varsayılan dile dönülür. Tercih çerezde saklanır.

</Question>

<Question title="URL'de yerel olmamasının SEO etkileri nelerdir?">

Arama motorları aynı URL'de farklı diller sunulduğunda dizine ekleme zorluğu yaşayabilir. Güçlü SEO gereksinimleri için her dilin ayrı bir URL'ye veya alt alan adına sahip olması önerilir.

</Question>

<Question title="no-prefix ve search-params modları arasındaki fark nedir?">

`no-prefix` modu URL'yi tamamen temiz tutar ve yereli çerezden okur; `search-params` modu ise yereli `?locale=tr` şeklinde sorgu parametresinde saklar.

</Question>

<Question title="Bunun yerine her dili kendi alan adına atayabilir miyim?">

Evet. `routing.domains` seçeneği her yereli `example.tr` veya `example.com` gibi kendi alan adına eşlemenize olanak tanır.

</Question>

<Question title="Intlayer React Server Components ile çalışır mı?">

Evet. İçerik sunucuda Server Components içinde çözümlenir, böylece sunucuda render edilen metinler için istemciye hiçbir sözlük gönderilmez. Client Components ise sağlayıcı üzerinden aynı sözlükleri okur.

</Question>

<Question title="Uygulamayı AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile kendi sağlayıcınız ve API anahtarınızı kullanarak tamamlar. `--git-diff` bayrağı işlemi geçerli daldaki değiştirilmiş içerikle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), uzun metinler için [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve sayılar, tarihler ve para birimleri için [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

</Question>

<Question title="Çevirmenler koda dokunmadan içeriği nasıl düzenleyebilir?">

Kendi altyapınızda çalışan ve herkesin metinleri çalışan uygulamada yerinde düzenlemesine olanak tanıyan [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya içeriği kod dağıtımı olmadan güncellenebilecek şekilde dışsallaştıran [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) aracılığıyla.

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
