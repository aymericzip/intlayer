---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. Çok dilli (i18n) bir SolidStart uygulaması oluşturmak için 2026 kılavuzu. Sunucu tarafında işlenen yerel ayar yönlendirmesi, hreflang, sitemap ve yapay zeka destekli çeviri."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "İlk geçmiş"
author: aymericzip
---

# Intlayer Kullanarak SolidStart Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Vite ve Solid için en iyi i18n çözümü mü? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı uluslararasılaştırma"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

Bu kılavuz, **sunucu tarafında işlenen (server-rendered)** bir SolidStart uygulamasını kapsar: yerel ayar algılaması istek üzerine gerçekleşir, sayfalar sunucuda doğru dille işlenir ve arama motorlarının ihtiyaç duyduğu `<html lang>`, `hreflang` ve sitemap sinyalleri sunucu tarafında oluşturulur.

## Neden alternatifler yerine Intlayer?

`@solid-primitives/i18n` veya `i18next` gibi ana çözümlerle karşılaştırıldığında, Intlayer aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>
<Accordion header="Tam Solid desteği">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **reaktif çeviriler** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Solid ile mükemmel şekilde çalışacak şekilde optimize edilmiştir.

</Accordion>

<Accordion header="Paket boyutu">

Sayfalarınıza devasa JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer, **paket ve sayfa boyutlarınızı %50'ye kadar azaltmaya** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğini kapsamlara ayırmak, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. Tüm içerik kod tabanınızı gözden geçirme zihinsel yükü olmadan tek bir özellik klasörünü kopyalayabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiştir (fully typed)**.

</Accordion>

<Accordion header="Yapay Zeka Ajanı">

İçeriği aynı yerde konumlandırmak, Büyük Dil Modelleri (LLM'ler) için **gereken bağlamı azaltır**. Intlayer ayrıca yapay zeka ajanları için geliştirici deneyimini (DX) daha da sorunsuz hale getirmek amacıyla eksik çevirileri test etmek için **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** gibi bir dizi araçla birlikte gelir.

</Accordion>

<Accordion header="Otomasyon">

AI sağlayıcınızın maliyetiyle seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici (compiler)** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Devasa JSON dosyalarını bileşenlere bağlamak performans ve reaktivite sorunlarına yol açabilir. Intlayer, derleme süresinde (build time) içerik yüklemenizi optimize eder.

</Accordion>

<Accordion header="Geliştirici olmayanlarla ölçeklendirme">

Bir i18n çözümünden daha fazlası olan Intlayer, çevirmenler, reklam yazarları ve diğer ekip üyeleriyle iş birliğini sorunsuz hale getirmek için çok dilli içeriğinizi **gerçek zamanlı** yönetmenize yardımcı olan **kendi sunucunuzda barındırılan bir [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** ve **[tam bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** sağlar. İçerik yerel ve/veya uzaktan depolanabilir.

</Accordion>
</AccordionGroup>

---

## SolidStart Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

npm kullanarak gerekli paketleri yükleyin:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Yapay zeka ajanıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), dönüştürme (transpilation) ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **solid-intlayer**

  Intlayer'ı Solid uygulamasıyla entegre eden paket. Solid uluslararasılaştırması için bağlam sağlayıcıları (context providers) ve hook'lar sunar.

- **vite-intlayer**

  Intlayer'ı [Vite paketleyicisi](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılayan, çerezleri yöneten ve URL yönlendirmesini işleyen yerel ayar yönlendirme işleyicisini içerir.

> Buradaki `vite-intlayer` yalnızca bir derleme zamanı konusu değil, aynı zamanda sunucu tarafı bir konudur: SolidStart'ın Nitro sunucusunun çalıştırdığı istek işleyicisini sağlar. Bunu `dependencies` içinde tutmak güvenli varsayılandır — yalnızca Nitro'nun işleyiciyi satır içine aldığı oluşturulmuş `.output` dizinini dağıtırsanız bunu `devDependencies` kısmına taşıyabilirsiniz.

</Step>

<Step number={2} title="Projenizin Yapılandırılması">

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

`prefix-no-default` ile varsayılan yerel ayar, ön ek içermeyen URL'lerden sunulur:

```plaintext
/            /about          → İngilizce  (varsayılan yerel ayar)
/fr          /fr/about       → Fransızca
/es          /es/about       → İspanyolca
```

> Bu yapılandırma dosyası aracılığıyla yerelleştirilmiş URL'ler, ara yazılım (middleware) yönlendirmesi, çerez adları, içerik bildirimlerinizin konumu ve uzantısı ayarlayabilir, konsoldaki Intlayer günlüklerini devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

</Step>

<Step number={3} title="Vite Yapılandırmanıza Intlayer'ı Entegre Edin">

Intlayer eklentisini yapılandırmanıza ekleyin:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> `intlayer()` Vite eklentisi içerik bildirimi dosyalarınızı oluşturur, geliştirme modunda bunları izler ve uygulama içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca performansı optimize eden takma adlar (aliases) sağlar.

### Yerel ayar yönlendirmesi eklentiyle birlikte gelir

SolidStart [Nitro](https://nitro.build) üzerinde çalışır ve `intlayer()`, yerel ayar yönlendirme işleyicisini doğrudan Nitro'nun sunucu hattına kaydeder (varsayılan olarak `true` olan `routing.enableProxy` seçeneği aracılığıyla). Başka bir şey bağlamanıza gerek yok: oluşturulmuş bir sunucuda, her istek yönlendiriciye ulaşmadan önce denetlenir ve

- yerel ayar URL ön ekinden, ardından `INTLAYER_LOCALE` çerezinden, ardından `Accept-Language` üst bilgisinden okunur;
- ön eki olmayan bir URL, çözümlenen yerel ayar varsayılan yerel ayar olmadığında yerelleştirilmiş karşılığına yönlendirilir (`/` → `/fr`);
- gereksiz ön eke sahip bir URL, kurallı (canonical) biçimine geri yönlendirilir (`/en/about` → `/about`);
- yerel ayar çerezi yanıta geri yazılır.

</Step>

<Step number={4} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart'a özgü püf noktası**: `src/routes` altındaki her `.ts` / `.tsx` dosyası bir rota haline gelir ve bir `.content.ts` dosyası varsayılan dışa aktarmaya sahip olduğundan sayfa olarak algılanır. **Sayfalarınızın** içerik bildirimlerini rotalar dizininin dışında tutun (`src/contents/` iyi çalışır). File-system yönlendiricisi `src/components` dizinini taramadığı için **bileşenlerin** içeriği aynı yerde kalabilir.

> İçerik bildirimleriniz `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği ve içerik bildirimi dosya uzantısıyla eşleştiği sürece (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) uygulamanızın herhangi bir yerinde tanımlanabilir.
>
> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

</Step>

<Step number={5} title="Yerelleştirilmiş yönlendirme ekleyin">

Bu adımın amacı, her dile kendi URL'sini vermektir; arama motorlarının dizine eklediği şey de budur.

Sayfalarınızı **isteğe bağlı dinamik bir segment** altına taşıyın. SolidStart'ın file-system yönlendiricisinde `[[locale]]` `:locale?` yol kalıbına derlenir:

```plaintext
src/routes/
  [[locale]].tsx          ← segmenti doğrulayan düzen (layout)
  [[locale]]/
    index.tsx             → /        ve /fr        ve /es
    about.tsx             → /about   ve /fr/about  ve /es/about
  [...404].tsx            → diğer her şey için tümünü yakalama
```

Düzen dosyasının tek görevi, segmenti yapılandırılmış bir yerel ayarla sınırlandırmaktır:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router`, `:locale?` kalıbını iki kalıba genişletir — biri segmentli, diğeri segmentsiz — ve bunları azalan özgüllüğe göre dener. `matchFilters`, çalışan bir kurulum ile kafa karıştırıcı bir kurulum arasındaki farkı yaratan şeydir:

| URL         | matchFilters olmadan                          | matchFilters ile                           |
| ----------- | --------------------------------------------- | ------------------------------------------ |
| `/fr/about` | Fransızca hakkında sayfası                    | Fransızca hakkında sayfası                 |
| `/about`    | Hakkında sayfası (statik segment kazanır)     | Hakkında sayfası                           |
| `/unknown`  | **Ana sayfa**, sessizce, `locale=unknown` ile | Eşleşme yok → tümünü yakalayan 404'e düşer |

> `'prefix-all'` yönlendirme modunu kullanıyorsanız `[[locale]]` yerine `[locale]` (gerekli) kullanmayı tercih edin ve `'no-prefix'` veya `'search-params'` için segmenti tamamen kaldırın.

</Step>

<Step number={6} title="Yerel ayarı uygulamanıza sağlayın">

URL, yerel ayar için tek doğruluk kaynağıdır: ara yazılım (middleware) isteği yerelleştirilmiş yoluna zaten yönlendirmiştir, bu nedenle kök düzende (root layout) yolu okumak sunucu oluşturma ile istemci hidrasyonunu (hydration) uyumlu tutar ve her istemci tarafı gezinmenin yerel ayarı ücretsiz olarak güncellemesini sağlar.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Sunucu <html> öğesini entry-server.tsx içinde işler;
  // yerel ayarlar arasındaki istemci tarafı gezinmeler öznitelikleri kendileri güncellemelidir.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider`, `locale` prop'una yanıt verir, bu nedenle JSX içinde erişimci çağrısı `locale()` geçirmek yeterlidir — Solid bunu bir getter'a derler ve URL değiştiğinde tüm ağaç yeni dilde yeniden işlenir.

</Step>

<Step number={7} title="Sunucuda HTML lang ve dir özniteliklerini ayarlayın">

`<html>` öğesi, `Router` dışında `entry-server.tsx` tarafından işlenir. Bunun yerine yerel ayarı istek URL'sinden okuyun:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Arama motoru tarayıcıları (crawlers) artık ilk baytta doğru dili alır:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Sayfalarınızda Intlayer Kullanın">

Uygulamanız genelinde içerik sözlüklerinize erişin:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Solid'de `useIntlayer` reaktif içerik döndürür (örneğin, `content`). Özelliklerine doğrudan erişebilirsiniz.

> İçerğinizi `alt`, `title`, `href`, `aria-label` vb. gibi bir `string` özniteliğinde kullanmak istiyorsanız, fonksiyonun değerini şu şekilde kullanabilirsiniz:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md) bakın.

İçerik düğümleri yalnızca düz çevirilerle sınırlı değildir. Örneğin çoğullaştırılmış bir sayaç:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()`, etkin yerel ayar için `Intl.PluralRules` aracılığıyla kategoriyi seçer, bu nedenle ikiden fazla çoğul biçimine sahip diller herhangi bir ekstra kod olmadan çalışır.

</Step>

<Step number={9} title="Yerelleştirilmiş Bir Bağlantı (Link) Bileşeni Oluşturun">

İç URL'lere otomatik olarak geçerli dili ön ek olarak ekleyen özel bir `Link` bileşeni oluşturun:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Bir kez `href="/about"` yazmak artık etkin yerel ayara bağlı olarak `/about`, `/fr/about` veya `/es/about` üretir — sayfalarınızın hiçbir yerinde manuel ön ek eklemeye gerek kalmaz.

</Step>

<Step number={10} title="Bir Yerel Ayar Değiştirici (Locale Switcher) Bileşeni Oluşturun">

Değiştiriciyi bir `<select>` yerine **gerçek bağlantılar (anchors)** olarak işleyin: geçerli sayfanın her dili, yeni bir sekmede açılabilen taranabilir bir bağlantı haline gelir ki bu yalnızca JavaScript ile çalışan bir denetimin sunamayacağı bir şeydir.

`getPathWithoutLocale` yerel ayar segmentini geçerli yoldan kaldırır ve `getLocalizedUrl` bunu hedef yerel ayar için yeniden oluşturur, böylece bağlantılar hiçbir şeyi sabit kodlamadan yönlendirme modunuzu takip eder. Gezinme, işlenen yerel ayarı değiştiren şeydir — `[[locale]]` rotası bunu URL'den türetir — bu sırada `setLocale` seçimi `INTLAYER_LOCALE` çerezinde saklar, böylece yerel ayarsız bir URL'ye daha sonra yapılan bir ziyaret aynı dilde çözümlenir.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Şu anda görüntülenen sayfanın kurallı (yerel ayarsız) yolu
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Yalnızca tam eşleşme, böylece varsayılan yerel ayar bağlantısı
              // her sayfada etkin olarak işaretlenmez
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Tarayıcının "geri" düğmesinin önceki sayfaya dönmesini sağlar
              replace
            >
              {/* Kendi dilinde dil adı - örneğin Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Solid'de `useLocale` içindeki `locale` bir **signal erişimcisidir**. Mevcut değerini reaktif olarak okumak için `locale()` (parantezler ile) kullanın.
>
> `getLocaleName(localeItem)` her dili kendi dilinde işler — `English / Français / Español`. İsimleri şu anda görüntülenen dile çevirmek için ikinci bir bağımsız değişken geçirin: `getLocaleName(localeItem, locale())`, İngilizce'de `English / French / Spanish`, Fransızca'da `anglais / français / espagnol` verir.
>
> `<A>` zaten geçerli URL ile eşleşen bağlantıda `aria-current="page"` ayarlar, bu nedenle bunun için eklenecek bir şey yoktur. `replace`, işlenen öznitelikten yönlendirici tarafından geri okunur: bir geçmiş girdisi eklemek yerine onu değiştirir, böylece tarayıcının "geri" düğmesi önceki dildeki aynı sayfaya değil, geçişten önce ziyaret edilen sayfaya geri döner.
>
> Her bağlantıdaki `dir` ve `hreflang`, sağdan sola dillerin isimlerini doğru şekilde yönlendirir ve yardımcı teknolojilere ve arama motoru tarayıcılarına her bağlantının hangi dili işaret ettiğini bildirir.
>
> `useLocale` hook'u hakkında daha fazla bilgi edinmek için [dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md) bakın.

</Step>

<Step number={11} title="Kurallı (canonical) ve hreflang bağlantılarını yayınlayın" isOptional={true}>

`hreflang` açıklamaları arama motorlarına `/about`, `/fr/about` ve `/es/about` sayfalarının farklı dillerdeki aynı sayfa olduğunu bildirir. `getMultilingualUrls`, yönlendirme modunuzu izleyerek bunları kurallı (yerel ayarsız) yoldan türetir, böylece hiçbir şey sabit kodlanmaz:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** İşlenen sayfanın mutlak URL'si. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

İstek URL'sinin mevcut olduğu belge head kısmında işleyin:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … diğer meta etiketlerinin yanında <head> içinde:
<AlternateLinks url={url} />;
```

`GET /fr/about` daha sonra şunu sunar:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **`@solidjs/meta` hakkında not**: Bu kılavuz yazıldığı sırada, `@solidjs/meta` paketinden `<Title>` ve `<Meta>` hidrasyondan sonra istemcide uygulanır ancak SolidStart v2'de sunucu tarafında işlenen `<head>` içine **yayınlanmaz**. Üst projede bu düzeltilene kadar, arama motoru tarayıcılarının JavaScript olmadan görmesi gereken etiketleri — `canonical`, `hreflang` ve gerekirse `title` / `description` — yukarıda gösterildiği gibi doğrudan `entry-server.tsx` içinde işleyin.

</Step>

<Step number={12} title="Bulunamayan sayfaları yönetin" isOptional={true}>

`src/routes` kökündeki bir splat rotası, yerel ayar segmentinin eşleşmediği her yolu yakalar — `matchFilters` tarafından reddedilen geçersiz yerel ayar ön ekleri dahil. Yerel ayar hala kök düzen aracılığıyla URL'den geldiği için 404 sayfası ziyaretçinin dilinde görüntülenir:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| İstek             | Sonuç                                             |
| ----------------- | ------------------------------------------------- |
| `/xx`             | `404` — `xx` yapılandırılmış bir yerel ayar değil |
| `/nonexistent`    | Varsayılan yerel ayarda `404`                     |
| `/fr/nonexistent` | Fransızca `404` (`Page introuvable`)              |

</Step>

<Step number={13} title="Çok dilli bir sitemap (site haritası) oluşturun" isOptional={true}>

Intlayer'ın sitemap oluşturucusu, her yolu yerel ayar başına bir girişe genişletir ve aralarındaki `xhtml:link` alternatiflerini bağlar, böylece rotanın yalnızca kurallı, yerel ayarsız yolları listelemesi gerekir.

> Yalnızca düz URL'ler oluşturan temel oluşturucuların aksine Intlayer, her sayfanın her yerelleştirilmiş varyantı arasında iki yönlü bağlantılar kurar; bu da arama motorlarının yerelleştirilmiş URL'leri ilişkilendirmesine ve doğru kitleye doğru URL'yi sunmasına yardımcı olur.

SolidStart, bir HTTP yöntemini dışa aktaran bir dosyayı bir API rotasına dönüştürür ve yoldan `.ts` uzantısını kaldırır — böylece `src/routes/sitemap.xml.ts` `/sitemap.xml` adresinde sunulur:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
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
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API rotaları isteğe bağlı parametreleri desteklemez, bu nedenle bu dosyayı `[[locale]]` segmentinin dışında, `src/routes` kökünde tutun. Sitemap zaten her yerel ayarı içerir.

Aynı şekilde `getMultilingualUrls` ile bir `robots.txt` oluşturabilirsiniz, böylece `Disallow` girdileri hassas bir yolun her yerelleştirilmiş yazımını kapsar:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Sunucu fonksiyonlarınızda yerel ayarı alın" isOptional={true}>

Mevcut yerel ayara bir sunucu fonksiyonu veya bir API rotası içinden erişmek isteyebilirsiniz.

Bunun gibi ön ek tabanlı bir kurulumda, **URL yetkilidir**: `getLocaleFromPath` ön eki istek URL'sinden okur. `getLocale`, yerel ayar ön eki taşımayan istekler için bir geri çekilme (fallback) mekanizmasıdır — `INTLAYER_LOCALE` çerezini, ardından `x-intlayer-locale` üst bilgisini inceler, ardından `Accept-Language` uzlaşması yapar.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // İstekten çerezi alın (varsayılan: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // İstekten üst bilgiyi alın (varsayılan: 'x-intlayer-locale'),
      // Accept-Language uzlaşmasına geri dönün
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // getIntlayer() kullanarak bir bileşenin dışındaki bazı içerikleri alın
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Burada yalnızca `getLocale` fonksiyonuna güvenmeyin: yerel ayar çerezi yalnızca bir ziyaretçi etkin bir şekilde dil değiştirdiğinde yazılır, bu nedenle `/fr/...` adresine yapılan ilk ziyaret varsayılan yerel ayara çözümlenir.

</Step>

<Step number={15} title="Bileşenlerinizin içeriğini ayıklayın (extract)" isOptional={true}>

Mevcut bir kod tabanınız varsa binlerce dosyayı dönüştürmek zaman alabilir.

Bu süreci kolaylaştırmak için Intlayer, bileşenlerinizi dönüştürmek ve içeriği ayıklamak için bir [derleyici (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [ayıklayıcı (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) sunar.

Bunu kurmak için `intlayer.config.ts` dosyanıza bir `compiler` bölümü ekleyebilirsiniz:

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
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     *
     * - `true` ise derleyici, bileşen dosyasını diske yeniden yazar. Böylece dönüşüm kalıcı olur ve derleyici bir sonraki işlem için dönüşümü atlar. Bu şekilde derleyici uygulamayı dönüştürebilir ve ardından kaldırılabilir.
     *
     * - `false` ise derleyici `useIntlayer()` fonksiyon çağrısını yalnızca derleme çıktısındaki koda ekler ve temel kod tabanını dokunulmadan tutar. Dönüşüm yalnızca bellekte yapılacaktır.
     */
    saveComponents: false,

    /**
     * Sözlük anahtarı ön eki
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Çıkarma komutu'>

Bileşenlerinizi dönüştürmek ve içeriği ayıklamak için ayıklayıcıyı çalıştırın

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

> 5. adımda açıklanan nedenden dolayı, sayfalarınızın oluşturulan içerik dosyalarını daha sonra `src/routes` dışına taşıyın.

 </Tab>
 <Tab value='Babel derleyicisi'>

> v9 sürümünden itibaren `intlayerCompiler`, `intlayer` eklentisine dahil edilmiştir. Bu nedenle manuel olarak eklemenize gerek yoktur.

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Derleyici eklentisini ekler
  ],
});
```

```bash packageManager="npm"
npm run build # Veya npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Veya pnpm run dev
```

```bash packageManager="yarn"
yarn build # Veya yarn dev
```

```bash packageManager="bun"
bun run build # Veya bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="TypeScript'i Yapılandırın">

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül artırma (module augmentation) kullanır.

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri içerdiğinden emin olun:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... mevcut yapılandırmalarınız
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri dahil edin
  ],
}
```

Sözlük anahtarları ve içerik yolları artık derleme zamanında denetlenir:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Kurulumunuzu doğrulama

Sunucuyu derleyin ve başlatın, ardından bu isteklerin beklendiği gibi davrandığını kontrol edin:

```bash
npm run build
node .output/server/index.mjs
```

| İstek                                     | Beklenen yanıt                         |
| ----------------------------------------- | -------------------------------------- |
| `GET /`                                   | `200` — İngilizce                      |
| `GET /` (`Accept-Language: fr` ile)       | `302` → `/fr`                          |
| `GET /` (`INTLAYER_LOCALE=es` çerezi ile) | `302` → `/es`                          |
| `GET /fr`                                 | `200` — Fransızca, `<html lang="fr">`  |
| `GET /fr/about`                           | `200` — Fransızca hakkında sayfası     |
| `GET /en/about`                           | `302` → `/about` (kurallı yönlendirme) |
| `GET /xx`                                 | `404`                                  |
| `GET /fr/nonexistent`                     | `404` Fransızca                        |
| `GET /sitemap.xml`                        | `200` — çok dilli XML site haritası    |

Bir sayfayı işleyen satırlar `vite dev` altında aynı şekilde davranır. Üç yönlendirme satırı, işleyiciyi kendiniz bir ara yazılım (middleware) olarak kaydetmediğiniz sürece yalnızca oluşturulmuş bir sunucu için geçerlidir — 3. adıma bakın.

> Geliştirme sunucusunu Bun (`bun --bun vite dev`) yerine Node (`vite dev`) üzerinde çalıştırın: SolidStart'ın SSR'ı şu anda Bun çalışma zamanında `Expected a Response object, but received 'NodeResponse'` hatasıyla başarısız oluyor. Bu Intlayer ile ilgili değildir — düz şablonda da tekrarlanır — ve yalnızca geliştirme sunucusunu etkiler, `vite build` komutunu etkilemez.

---

## Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bunları Git depolamanıza (repository) taahhüt (commit) etmekten kaçınmanızı sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

---

## VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Eklentisini** yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata algılama**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

---

## Daha Fazlası

Daha ileri gitmek için [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) uygulayabilir veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak içeriğinizi dışa aktarabilirsiniz.

---

## Dokümantasyon Referansları

- [Intlayer Dokümantasyonu](https://intlayer.org)
- [SolidStart Dokümantasyonu](https://start.solidjs.com)
- [useIntlayer hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [useLocale hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [İçerik Bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Solid Start uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **`@solid-primitives/i18n`**: sinyallere dayalı düz bir sözlük, SSR desteği sınırlı.
- **`Intlayer`**: SSR ve önceden render desteği, rota segmentleri, ince taneli Solid sinyalleri, AI çeviri ve görsel düzenleyici sunan en gelişmiş çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md).

</Question>

<Question title="i18n Solid Start paket boyutuma ne kadar ekler?">

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

Derleyiciyi açmadan önce bilmeye değer iki sınır vardır. Statik analiz ile çalışır, bu nedenle API hata kodları veya CMS alanları gibi yalnızca çalışma zamanında var olan dizeler ulaşılamaz kalır. Ayrıca, `className="active"` veya durum kodu gibi uygulama mantığından kullanıcıya yönelik metinleri ayırt etmesi gerekir; bu da büyük bir kod tabanında birkaç ek açıklama gerektirir. [Extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sizi döngüde tutarak her ikisinden de kaçınır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Intlayer Solid Start sunucu tarafı render (SSR) ile çalışır mı?">

Evet. İçerik SSR sırasında çözümlenir ve adım 16 yerel başına statik HTML üreten ön render yapılandırmasını kapsar.

</Question>

<Question title="Yereli değiştirmek tüm uygulamamı yeniden render eder mi?">

Hayır. İçerik Solid sinyalleriyle desteklenir, bu nedenle dil değiştirmek bileşen ağacını yeniden oluşturmadan yalnızca değişen değerleri okuyan DOM düğümlerini günceller.

</Question>

<Question title="Kanonik ve hreflang bağlantılarını nasıl eklerim?">

Yerel site haritasında `generateSitemap` veya `getMultilingualUrls` kullanarak arama motorları için `xhtml:link` alternatiflerini tanımlayabilirsiniz.

</Question>

<Question title="Yerelleştirilmiş rotalarda 404 sayfalarını nasıl yönetirim?">

Adım 14 bunu kapsar. `validatePrefix`, URL'nin yerel segmentinin geçerli olup olmadığını kontrol eder, böylece `/xx/about` gibi hatalı rotalar 404 döner.

</Question>

<Question title="URL'ye yerel koymak zorunda mıyım?">

Hayır. `routing.mode` ayarı `"prefix-no-default"` (varsayılan), `"prefix-all"`, `"no-prefix"` ve `"search-params"` değerlerini kabul eder.

</Question>

<Question title="Bir sunucu fonksiyonunda yereli nasıl alırım?">

Solid Start sunucu fonksiyonlarında `getIntlayer` istek bağlamındaki yerel bilgisini otomatik olarak çözümler.

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
