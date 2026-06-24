---
createdAt: 2024-12-06
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Alternates nesnesine `x-default` ifadesi eklendi"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Başlangıç geçmişi"
author: aymericzip
---

# Intlayer kullanarak Next.js 16 web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Next.js için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'daki [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-next-16-template) bakın.

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

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[aracı becerileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

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

## Next.js Uygulamasında Intlayer Kurulumu Adım Adım Rehber

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
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

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **next-intlayer**

  Intlayer'ı Next.js ile entegre eden paket. Next.js uluslararasılaştırması için bağlam sağlayıcıları ve kancalar sunar. Ayrıca, Intlayer'ı [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ile entegre etmek için Next.js eklentisinin yanı sıra kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için bir proxy içerir.

</Step>

<Step number={2} title="Projenizi Yapılandırın">

İşte yapacağımız nihai yapı:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Intlayer sağlayıcısı için yerel ayar düzeni
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Stil ve küresel sağlayıcılar için kök düzen
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
├── package.json
└── tsconfig.json
```

> Yerel ayar yönlendirmesi (locale routing) istemiyorsanız, intlayer basit bir sağlayıcı / kanca olarak kullanılabilir. Daha fazla ayrıntı için [bu kılavuza](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md) bakın.

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel ayarlarınız
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, proxy yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı, konsoldaki Intlayer günlüklerini devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Next.js Yapılandırmanıza Entegre Edin">

Next.js kurulumunuzu Intlayer kullanacak şekilde yapılandırın:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* buraya yapılandırma seçenekleri */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js eklentisi, Intlayer'ı Next.js ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Intlayer ortam değişkenlerini [Webpack](https://webpack.js.org/) veya [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) ortamlarında tanımlar. Ek olarak, performansı optimize etmek için takma adlar (aliases) sağlar ve sunucu bileşenleriyle uyumluluğu garanti eder.

> `withIntlayer()` fonksiyonu bir promise fonksiyonudur. Build başlamadan önce Intlayer sözlüklerini hazırlamaya olanak tanır. Başka eklentilerle birlikte kullanmak isterseniz, onu `await` edebilirsiniz. Örnek:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Senkron olarak kullanmak isterseniz `withIntlayerSync()` fonksiyonunu kullanabilirsiniz. Örnek:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer, komut satırı bayrakları `--webpack`, `--turbo` veya `--turbopack` ile mevcut **Next.js sürümünüze** bağlı olarak projenizin **webpack** mi yoksa **Turbopack** mi kullandığını otomatik olarak algılar.
>
> `next>=16` sürümünden itibaren **Rspack** kullanıyorsanız, Turbopack'i devre dışı bırakarak Intlayer'ı açıkça webpack yapılandırmasını kullanmaya zorlamalısınız:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Dinamik Yerel Ayar Rotalarını Tanımlayın">

`RootLayout` içindeki her şeyi kaldırın ve aşağıdaki kodla değiştirin:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Çocukları hala `next-themes`, `react-query`, `framer-motion` vb. gibi diğer sağlayıcılarla sarmalayabilirsiniz.
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout` bileşenini boş bırakmak, `<html>` etiketine [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) ve [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) özniteliklerini ayarlamaya olanak tanır.

Dinamik yönlendirmeyi uygulamak için, `[locale]` dizininizde yeni bir düzen ekleyerek yerel ayar yolunu sağlayın:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> `[locale]` yol segmenti, yerel ayarı tanımlamak için kullanılır. Örnek: `/en-US/about`, `en-US`'ye ve `/fr/about`, `fr`'ye atıfta bulunacaktır.

> Bu aşamada şu hatayla karşılaşacaksınız: `Error: Missing <html> and <body> tags in the root layout.`. Bu beklenen bir durumdur çünkü `/app/page.tsx` dosyası artık kullanılmıyor ve kaldırılabilir. Bunun yerine, `[locale]` yol segmenti `/app/[locale]/page.tsx` sayfasını etkinleştirecektir. Sonuç olarak, sayfalar tarayıcınızda `/en`, `/fr`, `/es` gibi yollar üzerinden erişilebilir olacaktır. Varsayılan yerel ayarı kök sayfa olarak ayarlamak için 7. adımdaki `proxy` kurulumuna bakın.

Ardından, uygulama Düzeninizde (Layout) `generateStaticParams` fonksiyonunu uygulayın.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Eklenecek satır

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Kodun geri kalanı*/
};

export default LocaleLayout;
```

> `generateStaticParams`, uygulamanızın tüm yerel ayarlar için gerekli sayfaları önceden oluşturmasını sağlayarak çalışma zamanı hesaplamasını azaltır ve kullanıcı deneyimini iyileştirir. Daha fazla ayrıntı için [generateStaticParams üzerine Next.js dokümantasyonuna](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params) bakın.

> Intlayer, sayfaların tüm yerel ayarlar için önceden oluşturulmasını sağlamak amacıyla `export const dynamic = 'force-static';` ile çalışır.

</Step>

<Step number={5} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

</Step>

<Step number={6} title="İçeriği Kodunuzda Kullanın">

Uygulamanız genelinde içerik sözlüklerinize erişin:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`**, yerel ayarı istemci tarafı bileşenlere sağlamak için kullanılır. Düzen dahil herhangi bir üst bileşene yerleştirilebilir. Ancak, Next.js düzen kodunu sayfalar arasında paylaştığı ve bu da onu daha verimli kıldığı için bir düzene yerleştirilmesi önerilir. `IntlayerClientProvider`'ı düzende kullanarak, her sayfa için yeniden başlatılmasını önler, performansı artırır ve uygulamanız genelinde tutarlı bir yerelleştirme bağlamı sağlarsınız.
- **`IntlayerServerProvider`**, yerel ayarı sunucu tarafı çocuklara sağlamak için kullanılır. Düzende (layout) ayarlanamaz.

  > Düzen (layout) ve sayfa ortak bir sunucu bağlamını paylaşamaz çünkü sunucu bağlamı sistemi her istek için veri deposuna ([React'in cache](https://react.dev/reference/react/cache) mekanizması aracılığıyla) dayanır ve her "bağlamın" uygulamanın farklı segmentleri için yeniden oluşturulmasına neden olur. Sağlayıcıyı paylaşılan bir düzene yerleştirmek bu izolasyonu bozacak ve sunucu bağlamı değerlerinin sunucu bileşenlerinize doğru şekilde yayılmasını engelleyecektir.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // İlgili içerik bildirimini oluşturun

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
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // İlgili içerik bildirimini oluşturun

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> İçeriğinizi `alt`, `title`, `href`, `aria-label` vb. gibi bir `string` özniteliğinde kullanmak istiyorsanız, fonksiyonun değerini çağırmalısınız, örneğin:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` kancası hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useIntlayer.md) bakın.

> Eğer uygulamanız zaten mevcutsa, binlerce bileşeni bir saniye içinde dönüştürmek için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)'ı [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) ile birlikte kullanabilirsiniz.

</Step>

<Step number={7} title="Yerel Ayar Algılama İçin Proxy Yapılandırın" isOptional={true}>

Kullanıcının tercih ettiği yerel ayarı algılamak için proxy'yi ayarlayın:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`, kullanıcının tercih ettiği yerel ayarı algılamak ve onları [yapılandırmada](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtilen uygun URL'ye yönlendirmek için kullanılır. Ek olarak, kullanıcının tercih ettiği yerel ayarın bir çerezde saklanmasını sağlar.

> Birden fazla proxy'yi bir zincirleme olarak bağlamanız gerekiyorsa (örneğin, kimlik doğrulama veya özel proxy'lerle birlikte `intlayerProxy`), Intlayer artık `multipleProxies` adında bir yardımcı sunuyor.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Meta Verilerinizin Uluslararasılaştırılması" isOptional={true}>

Sayfanızın başlığı gibi meta verilerinizi uluslararasılaştırmak istediğiniz durumda, Next.js tarafından sağlanan `generateMetadata` fonksiyonunu kullanabilirsiniz. İçinde, meta verilerinizi çevirmek için `getIntlayer` fonksiyonundan içeriği alabilirsiniz.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * Her bir yerel ayar için tüm URL'leri içeren bir nesne oluşturur.
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

> `next-intlayer`'dan içe aktarılan `getIntlayer` fonksiyonunun içeriğinizi bir `IntlayerNode` içine sarılmış olarak döndürdüğünü ve görsel editörle entegrasyona olanak tanıdığını unutmayın. Buna karşılık, `intlayer`'dan içe aktarılan `getIntlayer` fonksiyonu, içeriğinizi ek özellikler olmadan doğrudan döndürür.

Alternatif olarak, meta verilerinizi bildirmek için `getTranslation` fonksiyonunu kullanabilirsiniz. Ancak, meta verilerinizin çevirisini otomatikleştirmek ve bir noktada içeriği dışsallaştırmak için içerik bildirim dosyalarını kullanmanız önerilir.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Kodun geri kalanı
```

> Meta veri optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) bulabilirsiniz.

</Step>

<Step number={9} title="sitemap.xml ve robots.txt Uluslararasılaştırılması" isOptional={true}>

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

> Sitemap optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) bulabilirsiniz. robots.txt optimizasyonu hakkında daha fazla bilgiyi [resmi Next.js dokümantasyonunda](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) bulabilirsiniz.

</Step>

<Step number={10} title="İçeriğinizin Dilini Değiştirme" isOptional={true}>

Next.js'te içeriğinizin dilini değiştirmek için önerilen yöntem, kullanıcıları uygun yerelleştirilmiş sayfaya yönlendirmek için `Link` bileşenini kullanmaktır. `Link` bileşeni sayfanın önceden yüklenmesini (prefetching) sağlar, bu da tam bir sayfa yenilenmesini önlemeye yardımcı olur.

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
            replace // Tarayıcıdaki "geri" düğmesinin önceki sayfaya yönlendirmesini sağlar
          >
            <span>
              {/* Yerel ayar - örn. FR */}
              {localeItem}
            </span>
            <span>
              {/* Kendi yerel ayarında dil adı - örn. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Mevcut yerel ayarda dil adı - örn. mevcut yerel ayar Locales.SPANISH olduğunda Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* İngilizce dil adı - örn. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Alternatif bir yol da `useLocale` kancasıyla sağlanan `setLocale` fonksiyonunu kullanmaktır. Bu fonksiyon sayfanın önceden yüklenmesine (prefetching) izin vermez. Daha fazla ayrıntı için [`useLocale` kancası dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md) bakın.

> Ayrıca, yerel ayar değiştiğinde özel bir fonksiyonu tetiklemek için `onLocaleChange` seçeneğinde bir fonksiyon ayarlayabilirsiniz.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Kodun geri kalanı

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Fransızca'ya geç</button>
);
```

> Dokümantasyon referansları:
>
> - [`useLocale` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` kancası](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` özniteliği](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` özniteliği](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` özniteliği](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Yerelleştirilmiş Bir Link Bileşeni Oluşturma" isOptional={true}>

Uygulamanızın navigasyonunun mevcut yerel ayara saygı göstermesini sağlamak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'lerin önüne otomatik olarak geçerli dil kodunu ekler. Örneğin, Fransızca konuşan bir kullanıcı "Hakkında" sayfasının bağlantısına tıkladığında, `/about` yerine `/fr/about` sayfasına yönlendirilir.

Bu davranış birkaç nedenden dolayı yararlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dile özgü sayfaları doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, gezinmenin mevcut yerel ayar içinde kalmasını garanti eder, beklenmedik dil değişikliklerini önlersiniz.
- **Bakım Kolaylığı**: Yerelleştirme mantığını tek bir bileşende merkezileştirmek, URL yönetimini basitleştirir ve uygulamanız büyüdükçe kod tabanınızın bakımını ve genişletilmesini kolaylaştırır.

Aşağıda TypeScript ile yerelleştirilmiş bir `Link` bileşeninin uygulaması yer almaktadır:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Verilen URL'nin harici olup olmadığını kontrol eden yardımcı fonksiyon.
 * URL http:// veya https:// ile başlıyorsa harici kabul edilir.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Mevcut yerel ayara göre href özniteliğini uyarlayan özel bir Link bileşeni.
 * Dahili bağlantılar için, URL'nin önüne yerel ayarı eklemek için `getLocalizedUrl` kullanılır (örn. /fr/about).
 * Bu, navigasyonun aynı yerel ayar bağlamında kalmasını sağlar.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Bağlantı dahiliyse ve geçerli bir href sağlanmışsa, yerelleştirilmiş URL'yi alın.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Nasıl Çalışır?

- **Harici Bağlantıları Algılama**:  
  Yardımcı fonksiyon `checkIsExternalLink`, bir URL'nin harici olup olmadığını belirler. Harici bağlantılar yerelleştirilmeye ihtiyaç duymadığı için değişmeden bırakılır.

- **Mevcut Yerel Ayarı Alma**:  
  `useLocale` kancası mevcut yerel ayarı sağlar (örneğin, Fransızca için `fr`).

- **URL'yi Yerelleştirme**:  
  Dahili bağlantılar için (yani harici olmayan), `getLocalizedUrl` kullanılarak URL'nin önüne otomatik olarak geçerli yerel ayar eklenir. Bu, kullanıcınız Fransızca ise `/about` olarak iletilen `href` özniteliğinin `/fr/about` olarak dönüştürüleceği anlamına gelir.

- **Bağlantıyı Döndürme**:  
  Bileşen, yerelleştirilmiş URL'ye sahip bir `<a>` elemanı döndürerek navigasyonun yerel ayarla tutarlı olmasını sağlar.

Bu `Link` bileşenini uygulamanız genelinde entegre ederek, tutarlı ve dile duyarlı bir kullanıcı deneyimi sağlarken, aynı zamanda iyileştirilmiş SEO ve kullanılabilirlikten faydalanırsınız.

</Step>

<Step number={12} title="Server Action'larda Mevcut Yerel Ayarı Alma" isOptional={true}>

Bir Sunucu Eylemi (Server Action) içinde aktif yerel ayara ihtiyacınız varsa (örneğin, e-postaları yerelleştirmek veya yerel ayara duyarlı mantık yürütmek için), `next-intlayer/server` üzerinden `getLocale` fonksiyonunu çağırın:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Yerel ayarla bir şeyler yapın
};
```

> `getLocale` fonksiyonu, kullanıcının yerel ayarını belirlemek için kademeli bir strateji izler:
>
> 1. Önce, proxy tarafından ayarlanmış olabilecek bir yerel ayar değeri için istek başlıklarını (headers) kontrol eder.
> 2. Başlıklarda yerel ayar bulunamazsa, çerezlerde (cookies) saklanan bir yerel ayara bakar.
> 3. Çerez bulunamazsa, tarayıcı ayarlarından kullanıcının tercih ettiği dili algılamaya çalışır.
> 4. Son çare olarak, uygulamanın yapılandırılmış varsayılan yerel ayarına geri döner.
>
> Bu, mevcut bağlama göre en uygun yerel ayarın seçilmesini sağlar.

</Step>

<Step number={13} title="bundle boyutunuzu Optimize Edin" isOptional={true}>

`next-intlayer` kullanırken, sözlükler varsayılan olarak her sayfa için pakete dahil edilir. bundle boyutunu optimize etmek için Intlayer, makroları kullanarak `useIntlayer` çağrılarını akıllıca değiştiren isteğe bağlı bir SWC eklentisi sunar. Bu, sözlüklerin yalnızca onları gerçekten kullanan sayfaların paketlerine dahil edilmesini sağlar.

Bu optimizasyonu etkinleştirmek için `@intlayer/swc` paketini yükleyin. Yüklendikten sonra `next-intlayer` eklentiyi otomatik olarak algılayacak ve kullanacaktır:

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

> Not: Bu optimizasyon yalnızca Next.js 13 ve üzeri sürümlerde mevcuttur.

> Not: Bu paket varsayılan olarak yüklü değildir çünkü SWC eklentileri Next.js'te hala deneysel aşamadadır. Gelecekte değişebilir.

> Not: `dictionary` yapılandırmasında seçeneği `importMode: 'dynamic'` veya `importMode: 'fetch'` olarak ayarlarsanız, Suspense'e dayalı olacaktır, bu nedenle `useIntlayer` çağrılarınızı bir `Suspense` sınırı (boundary) içine sarmalamanız gerekecektir. Bu, `useIntlayer`'ı doğrudan Sayfa / Düzen bileşeninizin en üst düzeyinde kullanamayacağınız anlamına gelir.
> </Step>

<Step number={14} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkarmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkarıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sunar.

Kurulum için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Yapılandırmanızın geri kalanı
  compiler: {
    /**
     * Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
     */
    enabled: true,

    /**
     * Çıktı dosyalarının yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir. Bu sayede derleyici, uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı öneki
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Çıkarma komutu'>

Bileşenlerinizi dönüştürmek ve içeriği çıkarmak için çıkarıcıyı çalıştırın

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
 <Tab value='Babel derleyicisi'>

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Bileşenlerden içeriği sözlüklere çıkarın
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Veya npm run dev
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

### Turbopack'te Sözlük Değişikliklerini İzleyin

Next.js 16 uygulamanızı geliştirme sunucusu olarak Turbopack (`next dev` komutuyla) kullanırken, sözlük değişiklikleri varsayılan olarak otomatik olarak algılanmayacaktır.

Bu sınırlama, Turbopack'in içerik dosyalarınızdaki değişiklikleri izlemek için webpack eklentilerini paralel olarak çalıştıramamasından kaynaklanmaktadır. Bunu aşmak için hem geliştirme sunucusunu hem de Intlayer build izleyicisini eşzamanlı olarak çalıştırmak üzere `intlayer watch` komutunu kullanmanız gerekecektir.

```json5 fileName="package.json"
{
  // ... Mevcut package.json yapılandırmalarınız
  "scripts": {
    // ... Mevcut scripts yapılandırmalarınız
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> next-intlayer@<=6.x.x kullanıyorsanız, Next.js 16 uygulamasının Turbopack ile doğru çalışması için `--turbopack` bayrağını korumanız gerekir. Bu sınırlamadan kaçınmak için next-intlayer@>=7.x.x kullanmanızı öneririz.

### TypeScript Yapılandırması

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan tipleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan tipleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, onları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağına ilişkin daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

### Daha İleriye Gidin

Daha ileri gitmek için [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.
