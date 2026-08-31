---
createdAt: 2025-03-25
updatedAt: 2026-08-25
title: "TanStack Start + Solid i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) TanStack Start + Solid uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Yerel Ayar Yönlendirmesi
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Rota head fonksiyonlarında meta veri sözlüklerinin statik, dinamik ve önbellekli dinamik çözümlemesinin karşılaştırılması"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Tanstack Start Solid.js için eklendi"
author: aymericzip
---

# Intlayer Kullanarak Tanstack Start + Solid.js Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

Bu kılavuz, Solid.js içeren Tanstack Start projelerinde sorunsuz uluslararasılaştırma, yerel ayara duyarlı yönlendirme, TypeScript desteği ve modern geliştirme uygulamaları için **Intlayer**'ı nasıl entegre edeceğinizi gösterir.

## Neden alternatifler yerine Intlayer?

'React-i18next' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam TanStack Start kapsamı">

Intlayer, **çok dilli yönlendirme**, **site haritası** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak TanStack Start ve Solid ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## Tanstack Start Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Tanstack Start için en iyi i18n çözümü mü? Intlayer'ı Keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız?"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'daki [Uygulama Şablonu](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)na göz atın.

<Steps>

<Step number={1} title="Proje Oluşturma">

Öncelikle, TanStack Start web sitesindeki [Yeni Proje Başlat](https://tanstack.com/start/latest/docs/framework/solid/quick-start) kılavuzunu izleyerek yeni bir TanStack Start projesi oluşturun.

</Step>

<Step number={2} title="Intlayer Paketlerini Kurun">

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketleri kurun:

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **solid-intlayer**
  Intlayer'ı Solid uygulamasına entegre eden paket. Solid uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve hook'lar sunar.

- **vite-intlayer**
  Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılımı (middleware) içerir.

</Step>

<Step number={3} title="Projenizin Yapılandırılması">

Uygulamanızın dillerini ayarlamak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, ara yazılım yönlendirmesini, çerez adlarını, içerik bildirimlerinizin konumunu ve uzantısını yapılandırabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)na bakın.

</Step>

<Step number={4} title="Intlayer'ı Vite Yapılandırmanıza Entegre Edin">

Bite yapılandırmanıza intlayer eklentisini ekleyin:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite eklentisi, Intlayer'ı Vite ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Vite uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performans yükünü azaltmak için takma adlar (aliases) sağlar.

</Step>

<Step number={5} title="Kök Düzeni (Root Layout) Oluşturma">

Geçerli yerel ayarı algılamak için `useParams` kullanarak ve `html` etiketinde `lang` ve `dir` özelliklerini ayarlayarak kök düzeninizi uluslararasılaştırmayı destekleyecek şekilde yapılandırın.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Yerel Ayar Düzeni Oluşturma">

Yerel ayar önekini işleyen ve doğrulama gerçekleştiren bir düzen oluşturun. Bu düzen, yalnızca geçerli yerel ayarların işlenmesini sağlayacaktır.

> Rota düzeyinde yerel ayar önekini doğrulamanız gerekmiyorsa bu adım isteğe bağlıdır.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Yerel ayar önekini doğrula
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Burada, `{-$locale}` geçerli yerel ayarla değiştirilen dinamik bir rota parametresidir. Bu gösterim, bu slotu isteğe bağlı hale getirerek `'prefix-no-default'` vb. yönlendirme modlarıyla çalışmasına olanak tanır.

> Aynı rotada birden fazla dinamik segment kullanırsanız bu slotun sorunlara neden olabileceğini unutmayın (ör: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> `'prefix-all'` modu için slotu `$locale` olarak değiştirmeyi tercih edebilirsiniz.
> `'no-prefix'` veya `'search-params'` modu için slotu tamamen kaldırabilirsiniz.

</Step>

<Step number={7} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> İçerik bildirimleriniz, `contentDir` dizinine (varsayılan olarak `./app`) dahil edildiği sürece uygulamanızın herhangi bir yerinde tanımlanabilir. Ve içerik bildirimi dosya uzantısıyla (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) eşleşmelidir.

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)na bakın.

</Step>

<Step number={8} title="Yerel Ayara Duyarlı Bileşenleri ve Hook'ları Kullanın">

Yerel ayara duyarlı navigasyon için bir `LocalizedLink` bileşeni oluşturun:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
  McPherson,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Bu bileşen iki amaca hizmet eder:

- URL'den gereksiz `{-$locale}` önekini kaldırmak.
- Kullanıcının doğrudan yerelleştirilmiş rotaya yönlendirilmesini sağlamak için yerel ayar parametresini URL'ye enjekte etmek.

Ardından, programatik navigasyon için bir `useLocalizedNavigate` hook'u oluşturabiliriz:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Sayfalarınızda Intlayer'ı Kullanın">

> Varsayılan olarak **`useIntlayer`** kullanın: bileşenler içinde içerik okumanın önerilen yoludur ve derleyici onu render edilen yerel ayara çözer. `getIntlayer` / `getIntlayerAsync` işlevlerine yalnızca Solid ağacının dışında başvurun: rota `head`'i, loader'lar ve sunucu işlevleri.

Uygulamanız genelinde içerik sözlüklerinize erişin:

#### Yerelleştirilmiş Ana Sayfa

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Solid'de, `useIntlayer` reaktif içerik döndürür (örneğin, `content`). Özelliklerine doğrudan erişebilirsiniz.
>
> `useIntlayer` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useIntlayer.md)a bakın.

</Step>

<Step number={10} title="Yerel Ayar Değiştirici Bileşeni Oluşturma">

Kullanıcıların dilleri değiştirmesine olanak tanıyan bir bileşen oluşturun:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Solid'de, `useLocale`dan gelen `locale` bir **signal accessor**'dur. Reaktif olarak geçerli değerini okumak için `locale()` (parantezli) kullanın.
>
> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md)a bakın.

</Step>

<Step number={11} title="HTML Özniteliklerinin Yönetimi">

Adım 5'te görüldüğü gibi, kök bileşeninizde `useParams` kullanarak `html` etiketinin `lang` ve `dir` özniteliklerini yönetebilirsiniz. Bu, hem sunucuda hem de istemcide doğru özniteliklerin ayarlanmasını sağlar.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={12} title="Ara Yazılım Ekleme">

Uygulamanıza sunucu tarafı yönlendirmesi eklemek için `intlayerProxy`yi de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılayacak ve uygun yerel ayar çerezini ayarlayacaktır. Herhangi bir yerel ayar belirtilmemişse, eklenti kullanıcının tarayıcı dili tercihlerine göre en uygun yerel ayarı belirleyecektir. Hiçbir yerel ayar algılanmazsa varsayılan yerel ayara yönlendirecektir.

> Üretimde `intlayerProxy`yi kullanmak için `vite-intlayer` paketini `devDependencies`dan `dependencies`e taşımanız gerektiğini unutmayın.

> Intlayer v9 sürümünden itibaren, `intlayerProxy()` doğrudan `intlayer()` plugin'ine dahil edilmiştir ve `routing.enableProxy` seçeneği aracılığıyla varsayılan olarak etkinleştirilir (varsayılan olarak `true`). Aşağıda gösterildiği gibi ayrı olarak kaydı artık isteğe bağlıdır; geriye dönük uyumluluk ve plugin sırasını kontrol etmesi gereken kurulumlar için tutulur. Devre dışı bırakmak için `routing.enableProxy: false` olarak ayarlayın. [v9 sürüm notlarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) bakın.

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

---

</Step>

<Step number={13} title="Meta Verilerinizi Uluslararasılaştırın">

<Tabs>

<Tab label="Statik çözümleme" value="static">

`getIntlayer`, tüm bildirilen yerel ayarları içeren **birleştirilmiş** sözlük üzerinden senkron olarak çözümlenir. `head` senkron kalır ve hiçbir şey beklenmez, ancak tüm çok dilli sözlük tarayıcıya gönderilen rota parçasına dahil edilir.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Küçük meta veri sözlükleri, az sayıda yerel ayar veya prototipleme aşaması için idealdir.

</Tab>

<Tab label="Dinamik çözümleme" value="dynamic">

`getIntlayerAsync` (**v9.4** sürümünden itibaren kullanılabilir) `getIntlayer` gibi davranır, ancak build eklentisi onu birleştirilmiş sözlük yerine `.intlayer/dynamic_dictionaries/` içindeki yerel ayar başına parçaya yönlendirir. Böylece bir sayfa yalnızca render ettiği yerel ayarı gönderir. Bu parça talep üzerine yüklendiğinden `head` `async` hâle gelir:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Bir `head` birden fazla sözlük okuyorsa bunları `Promise.all` ile çözümleyin; her `getIntlayerAsync` çağrısını ayrı satırda beklemek, istekleri paralel çalıştırmak yerine zincirler.

Ödün: dinamik import, `head` çalışırken, belge render'ının kritik yolunda çözümlenir. Soğuk bir rotada bu, `head`'i birkaç milisaniye geciktirir ve **LCP**'yi bir miktar kötüleştirebilir.

</Tab>

<Tab label="Önbellekli dinamik çözümleme" value="cached">

Sözlüğü rotanın `loader`'ında çözümleyin ve `head` içinde `loaderData` üzerinden geri okuyun. Eşleşen rotaların loader'ları paralel çalışır ve `staleTime: Infinity`, TanStack Router'a sonucun hiçbir zaman bayatlamayacağını söyler, böylece yerel ayar başına parça bir kez çözümlenir, sonrasında router önbelleğinden sunulur ve `head` senkron kalır.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head`, loader tamamlanmadan önce çağrılabilir; bu nedenle `loaderData` muhtemelen `undefined` olarak tiplenir. Optional chaining'i koruyun veya yedek bir başlık döndürün.

Yerel ayar başına parçayı, bedelini `head` kritik yolunda ödemeden korursunuz. Bedeli geliştirici deneyimidir: içeriğin loader'dan `head`'e `loaderData` üzerinden açıkça taşınması gerekir.

</Tab>

</Tabs>

### Hangi çözümlemeyi seçmeliyim?

|                          | Statik çözümleme             | Dinamik çözümleme             | Önbellekli dinamik çözümleme               |
| ------------------------ | ---------------------------- | ----------------------------- | ------------------------------------------ |
| API                      | `getIntlayer`                | `getIntlayerAsync` (v9.4+)    | `loader` içinde `getIntlayerAsync` (v9.4+) |
| `head` imzası            | senkron                      | `async`                       | senkron, `loaderData` okur                 |
| Gönderilen yerel ayarlar | bildirilen tüm yerel ayarlar | yalnızca istenen yerel ayar   | yalnızca istenen yerel ayar                |
| İstemci gezinmeleri      | çözümlenecek bir şey yok     | her eşleşmede yeniden çalışır | router önbelleğinden sunulur               |
| Geliştirici deneyimi     | en basiti                    | tek bir `await`               | içerik `loaderData` üzerinden taşınır      |

---

</Step>

<Step number={14} title="Sunucu aksiyonlarınızda yerel ayarı alın">

Sunucu aksiyonlarınızın veya API uç noktalarınızın içinden geçerli yerel ayara erişmek isteyebilirsiniz.
Bunu `intlayer`dan `getLocale` yardımcısını kullanarak yapabilirsiniz.

İşte TanStack Start'ın sunucu fonksiyonlarını kullanan bir örnek:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // İstekten çerezi al (varsayılan: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // İstekten başlığı al (varsayılan: 'x-intlayer-locale')
    // Accept-Language anlaşması kullanılarak geri dönüş (fallback)
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer() ile alınan bazı içerikler
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={15} title="Bulunamayan sayfaları yönetme">

Bir kullanıcı var olmayan bir sayfayı ziyaret ettiğinde, özel bir bulunamadı sayfası görüntüleyebilirsiniz ve yerel ayar öneki bulunamadı sayfasının tetiklenme şeklini etkileyebilir.

#### TanStack Router'ın yerel ayar önekleriyle 404 işlemesini anlama

TanStack Router'da, yerelleştirilmiş rotalarla 404 sayfalarını işlemek çok katmanlı bir yaklaşım gerektirir:

1. **Özel 404 rotası**: 404 kullanıcı arabirimini görüntülemek için belirli bir rota
2. **Rota düzeyinde doğrulama**: Yerel ayar öneklerini doğrular ve geçersiz olanları 404'e yönlendirir
3. **Catch-all rotası**: Yerel ayar segmentindeki eşleşmeyen tüm yolları yakalar

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Bu, özel bir /[locale]/404 rotası oluşturur
// Hem doğrudan bir rota olarak kullanılır hem de diğer dosyalarda bir bileşen olarak içe aktarılır
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent ve catch-all rotalarında yeniden kullanılabilmesi için ayrı olarak dışa aktarıldı
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad, rota işlenmeden (render) önce çalışır (hem sunucu hem istemci)
  // Yerel ayar önekini doğrulamak için ideal yerdir
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix, yerel ayarın intlayer yapılandırmanıza göre geçerli olup olmadığını kontrol eder
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Geçersiz yerel ayar öneki - geçerli bir yerel ayar önekiyle 404 sayfasına yönlendir
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent, bir alt rota mevcut olmadığında çağrılır
  // ör: /en/var-olmayan-sayfa /en düzeni içinde bunu tetikler
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) rotası, diğer rotalarla eşleşmeyen tüm yollarla eşleşir
// ör: /en/derin/ic-ice/gecersiz/yol
// Bu, bir yerel ayar içindeki TÜM eşleşmeyen yolların 404 sayfasını göstermesini sağlar
// Bu olmadan, derin eşleşmeyen yollar boş bir sayfa veya hata gösterebilir
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="Bileşenlerinizden içeriği çıkartın" isOptional={true}>

Mevcut bir kod tabanınız varsa, binlerce dosyayı dönüştürmek zaman alıcı olabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği çıkartmak için bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) / [çıkartıcı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) önerir.

Kurulumu yapmak için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

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
     * Çıkış dosyaları yolunu tanımlar
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Dönüştürüldükten sonra bileşenlerin kaydedilip kaydedilmeyeceğini belirtir.
     *
     * - `true` ise, derleyici diskteki bileşen dosyasını yeniden yazacaktır. Böylece dönüşüm kalıcı olacak ve derleyici bir sonraki işlem için dönüşümü atlayacaktır. Bu şekilde, derleyici uygulamayı dönüştürebilir ve ardından kaldırılabilir.
     *
     * - `false` ise, derleyici `useIntlayer()` fonksiyon çağrısını yalnızca derleme çıktısındaki koda enjekte ederek temel kod tabanını olduğu gibi tutacaktır. Dönüşüm yalnızca bellekte yapılacaktır.
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
 <Tab value='Extract komutu'>

Bileşenlerinizi dönüştürmek ve içeriği çıkartmak için çıkartıcıyı çalıştırın

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`intlayerCompiler` eklentisini dahil etmek için `vite.config.ts` dosyanızı güncelleyin:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # veya pnpm run dev
```

```bash packageManager="yarn"
yarn build # veya yarn dev
```

```bash packageManager="bun"
bun run build # veya bun run dev
```

 </Tab>
</Tabs>

---

</Step>

<Step number={16} title="Pre-render & Generate Sitemap">

Intlayer, uygulamanız için kolayca bir sitemap oluşturmanıza yardımcı olmak için yerleşik bir sitemap oluşturucusu ile gelir. Yerelleştirilmiş rotaları işler ve arama motorları için gerekli metaveriyi ekler.

> Intlayer tarafından oluşturulan sitemap, `xhtml:link` namespace'ini (Hreflang XML Extensions) destekler. Yalnızca ham URL'leri listeleyen varsayılan sitemap oluşturucularının aksine, Intlayer bir sayfanın tüm dil sürümleri arasında gerekli çift yönlü bağlantıları otomatik olarak oluşturur (örneğin, `/about`, `/about?lang=fr` ve `/about?lang=es`). Bu, arama motorlarının doğru dil sürümünü doğru kitleye dizine eklemesini ve sunmasını sağlar.

Bunu kullanmak için, öncelikle `vite.config.ts` dosyanızı yerelleştirilmiş rotalarınız için ön işlemeyi etkinleştirmek ve varsayılan TanStack Start sitemap oluşturmasını devre dışı bırakmak üzere yapılandırmanız gerekir.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... diğer importlar

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... diğer pluginler
    tanstackStart({
      // ... diğer config
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Ardından, `generateSitemap` fonksiyonunu kullanan bir `src/routes/sitemap[.]xml.ts` route oluşturun:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

---

</Step>

<Step number={17} title="TypeScript'i Yapılandırın">

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  // ... mevcut ayarlarınız
  include: [
    // ... mevcut içerikleriniz (includes)
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

---

</Step>

</Steps>

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bunları Git deponuza göndermenizi engeller.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükle](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sunar:

- Çeviri anahtarları için **Otomatik Tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **Hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonu](https://intlayer.org/doc/vs-code-extension)na bakın.

---

## Daha İleri Gitmek

Daha ileri gitmek için [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)yi uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak içeriğinizi dışsallaştırabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [Tanstack Start Dokümantasyonu](https://tanstack.com/start/latest)
- [useIntlayer hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useIntlayer.md)
- [useLocale hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md)
- [İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="TanStack Start ve Solid uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

TanStack Start kendi i18n katmanına sahip değildir:

- **`@solid-primitives/i18n`**: düz bir sözlük, SSR ve tip desteği sınırlı.
- **`Intlayer`**: SSR ve ön render desteği, Solid sinyalleri, derleme zamanı optimizasyonu, AI çeviri ve görsel düzenleyici sunan modern çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n TanStack Start paket boyutuma ne kadar ekler?">

Ad alanı tabanlı bir yapılandırmaya kıyasla çok daha az, çünkü bir sayfa render etmediği bir kataloğu asla indirmez. Derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük girişleriyle değiştirir ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Intlayer paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="@solid-primitives/i18n veya i18next'ten bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Büyük ölçüde evet. [i18next geçiş kılavuzunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) izleyin.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer bileşenlerinizi okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz.

Tam otomatik bir süreç için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında aynı işlemi yapar: her değişiklikte kaynak kodunu tarar, sözlükleri üretir ve HMR ile senkronize tutar.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Intlayer burada sunucu tarafı render ve ön render desteği sunuyor mu?">

Evet. İçerik SSR sırasında çözümlenir ve adım 16 yerel başına statik bir belge üreten ön render yapılandırmasını kapsar.

</Question>

<Question title="Yereli değiştirmek tüm uygulamamı yeniden render eder mi?">

Hayır. İçerik Solid sinyalleriyle desteklenir, bu nedenle dil değiştirmek yalnızca değişen değerleri okuyan DOM düğümlerini günceller.

</Question>

<Question title="hreflang etiketlerini ve yerelleştirilmiş site haritasını nasıl eklerim?">

`src/routes/sitemap[.]xml.ts` rotasında yerleşik `generateSitemap` işlevini kullanın. Bildirilen her dil için `xhtml:link` ad alanını yayınlar.

</Question>

<Question title="Yerelleştirilmiş rotalarda 404 sayfalarını nasıl yönetirim?">

Adım 14 bunu kapsar. `validatePrefix` yerel segmentini doğrular, böylece bilinmeyen dillerde 404 döndürülür.

</Question>

<Question title="URL'ye yerel koymak zorunda mıyım?">

Hayır. `routing.mode` ayarı `"prefix-no-default"` (varsayılan), `"prefix-all"`, `"no-prefix"` ve `"search-params"` değerlerini kabul eder.

</Question>

<Question title="Mevcut rotayı koruyan bir dil değiştirici nasıl oluşturulur?">

Adım 9 bileşeni gösterir. `useLocale` aktif dili ve rotayı koruyarak güncelleme yapan setter fonksiyonunu sunar.

</Question>

<Question title="Uygulamayı AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile kendi sağlayıcınız ve API anahtarınızı kullanarak tamamlar ve `--git-diff` işlemi daldaki değişikliklerle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Intlayer çoğulları, cinsiyeti ve zengin metni (rich text) destekliyor mu?">

Evet: [çoğul biçimleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md), [cinsiyete dayalı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [eklemeler (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md) ve [biçimlendiriciler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md).

</Question>

<Question title="Çevirmenler koda dokunmadan içeriği nasıl düzenleyebilir?">

Kendi altyapınızda çalışan ve herkesin metinleri çalışan uygulamada yerinde düzenlemesine olanak tanıyan [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya içeriği kod dağıtımı olmadan güncellenebilecek şekilde dışsallaştıran [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) aracılığıyla.

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet, ticari kullanım dahil Apache 2.0 lisansı altındadır. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
