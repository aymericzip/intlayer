---
createdAt: 2026-09-09
updatedAt: 2026-09-19
title: "Remix 3 i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "i18next'i unutun. Çok dilli (i18n) bir Remix 3 uygulaması oluşturmak için 2026 rehberi. Yapay zeka ajanlarıyla çeviri yapın, paket boyutunu, SEO'yu ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Web Standartları
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer ara yazılımı ve hook'larının kullanımı"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 için ilk dokümantasyon"
author: aymericzip
---

# Intlayer Kullanarak Remix 3 Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

Bu kılavuz, yerel ayara duyarlı yönlendirme, tip güvenli içerik bildirimleri, sunucu taraflı işlenen JSX bileşenleri ve Node.js, Bun, Deno ve Cloudflare Workers üzerinde çoklu çalışma zamanı desteği ile **Remix 3** uygulamalarında sorunsuz uluslararasılaştırma için **Intlayer**'ın nasıl entegre edileceğini göstermektedir.

## Remix 3 Nedir?

**Remix 3**, tamamen web standartları üzerine inşa edilmiş, **çalışma zamanından bağımsız, modüler bir web çatısına doğru temel bir mimari değişimi** temsil eder. Belirli paketleyicilere veya özel sunucu API'lerine bağlı kalmak yerine Remix 3, tek amaçlı modüler paketler olarak dağıtılır:

- **`remix/fetch-router`** (veya `remix/router`): Fetch API (`Request` ve `Response`) üzerine inşa edilmiş hafif, standartlara uygun yönlendirme.
- **`remix/ui`**: Bir JSX bileşen modeli (`jsxImportSource: "remix/ui"`). Bir bileşen, tipli bir tanıtıcı (handle) aracılığıyla propları alan ve bir render işlevi döndüren bir kurulum (setup) işlevidir.
- **`remix/middleware/render`**: Her istekte `context.render(<Page />)` kurulumu yaparak JSX ağacını bir HTML `Response` nesnesine aktarır (streaming).
- **`remix/node-fetch-server`**: Node.js için sunucu bağdaştırıcıları ile Bun, Deno ve uç (edge) çalışma zamanları için yerel destek.
- **`remix/cookie`**: Kriptografik olarak imzalanmış çerez ayrıştırma ve serileştirme.

**Intlayer** ve **`remix-intlayer`** paketi (Remix istek bağlamına bağlı bir yerel ayar ara yazılımı ve `react-intlayer` ile aynı `useIntlayer` / `useDictionary` / `useLocale` hook'ları) ile birleştiğinde derleme zamanı güvenliği, yapay zeka ile otomatik çeviriler, sıfır ek yüklü sunucu oluşturma ve sorunsuz yerel ayar yönlendirmesi sunan eksiksiz bir uluslararasılaştırma sistemine sahip olursunuz.

## İçindekiler

<TOC/>

## Neden Alternatifler Yerine Intlayer?

`i18next` veya özel çeviri yükleyicileri gibi geleneksel çözümlerle karşılaştırıldığında Intlayer, modern web mimarisi için optimize edilmiş entegre bir geliştirici deneyimi sunar:

<AccordionGroup>
<Accordion header="Tam Remix 3 ve Web Standartları Uyumluluğu">

Intlayer, web standartlarıyla (`Request`, `Response`, `Headers` ve `URL`) sorunsuz çalışacak şekilde tasarlanmıştır. `remix-intlayer`, hafif bir ara yazılım olarak Remix 3'ün Fetch yönlendiricisine bağlanır; URL yollarından, çerezlerden veya `Accept-Language` başlıklarından yerel ayarı çıkarır ve bunu elden ele aktarmaya gerek kalmadan isteğin geri kalanına, işleyicilere, görünümlere ve `remix/ui` bileşenlerine sunar.

</Accordion>
<Accordion header="Tip Güvenli İçerik Bildirimleri">

Gevşek JSON anahtarlarına ve çalışma zamanındaki eksik anahtar çökmelerine veda edin. Intlayer, bildirilen tüm dillerde TypeScript denetimlerini zorunlu kılar ve bir çeviri eksik veya geçersiz olduğunda sizi derleme zamanında uyarır.

</Accordion>
<Accordion header="Sunucuda Sıfır Paket Ek Yükü">

Remix 3'ün sunucu taraflı işlenen JSX bileşenlerini kullanırken, çıktı akışına yalnızca istenen yerel ayar için çözümlenmiş metin yazılır. Bir `clientEntry` aracılığıyla istemci hidrasyonunu açıkça yapılandırmadığınız sürece bileşenler tamamen sunucuda çalışır. Varsayılan olarak istemciye hiçbir çeviri kataloğu veya hidrasyon çalışma zamanı gönderilmez.

</Accordion>
<Accordion header="Yapay Zeka Ajanları ve Otomasyona Hazır">

Intlayer, içerik bildirimlerini (`.content.ts`) doğrudan rota mantığınızla aynı yere yerleştirerek Büyük Dil Modelleri (LLM) için gereken belirteç (token) bağlamını azaltır. `intlayer fill` ve `intlayer test` gibi yerleşik CLI komutları, CI/CD süreçlerinde çevirileri doğrudan kendi yapay zeka sağlayıcınızın maliyetiyle otomatikleştirmenizi sağlar.

</Accordion>
<Accordion header="Görsel Editör ve CMS Entegrasyonu">

Kod odaklı iş akışlarının ötesinde Intlayer, kendi kendine barındırılabilen bir [Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve bir [Uzak CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunarak teknik olmayan editörlerin ve çevirmenlerin kodu yeniden dağıtmadan içeriği güncellemesine olanak tanır.

</Accordion>
</AccordionGroup>

## Adım Adım Kılavuz

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer Kullanarak Uygulamanızı Nasıl Uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 Şablonu"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub üzerindeki [Uygulama Şablonu](https://github.com/aymericzip/intlayer-remix-3-template) bağlantısına göz atın.

<Steps>
<Step number={1} title="Bağımlılıkları Yükleyin">

Tercih ettiğiniz paket yöneticisini kullanarak `intlayer`, `remix-intlayer` ve `remix` (sürüm 3) paketlerini yükleyin:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Yapılandırma yönetimi, sözlük bildirimi (`t()`, `Dictionary`), CLI araçları ve çalışma zamanı yorumlayıcısı sağlayan çekirdek uluslararasılaştırma motoru.
- **`remix-intlayer`**: Remix 3 entegrasyonu: her isteğin yerel ayarını çözümleyen `intlayer()` yönlendirici ara yazılımı ve bunu sonraki herhangi bir aşamada okuyan `useIntlayer`, `useDictionary` ve `useLocale` hook'ları.
- **`remix`**: `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` ve `remix/node-fetch-server` dışa aktaran birleşik Remix 3 çatı paketi.

</Step>
<Step number={2} title="Intlayer'ı Yapılandırın">

Desteklenen dillerinizi ve uluslararasılaştırma ayarlarınızı bildirmek için projenizin kök dizininde bir `intlayer.config.ts` dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

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
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.TURKISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Ek yapılandırma seçenekleri için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) başvurun.

</Step>
<Step number={3} title="Çok Dilli İçeriğinizi Bildirin">

Yerelleştirilmiş içeriğinizi bir `.content.ts` dosyasında bildirin:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      tr: "Remix 3'e Hoş Geldiniz",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      tr: "Yerel i18n desteğine sahip, web standartlarına dayalı modüler bir uygulama.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      tr: "Dili değiştir:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer ayrıca JSON, YAML ve CommonJS formatlarını da destekler. [İçerik Bildirimi Dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

</Step>
<Step number={4} title="Intlayer Sözlüklerini Derleyin">

TypeScript türlerini ve çalışma zamanı kayıtlarını oluşturmak için sözlük tanımlarını derleyin:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Bu işlem içeriğinizi `.intlayer` dizininde derleyerek tam TypeScript otomatik tamamlamasını ve hızlı sözlük aramasını etkinleştirir.

</Step>
<Step number={5} title="Intlayer Ara Yazılımını Ekleme">

Remix 3, `createRouter({ middleware: [...] })` aracılığıyla birleştirilebilir bir ara yazılım ardışık düzeni sunar.

`remix-intlayer`, `intlayer()` ara yazılımını sağlar. Gelen her istek için yerel ayarı şunları kullanarak çözümler:

1. `no-prefix` dışındaki tüm yönlendirme modlarında URL: yol ön eki (ör. `/tr` veya `/en`) veya `?locale=` arama parametresi.
2. İstemci tarafından kalıcı hale getirilen yerel ayar: depolama çerezi (`INTLAYER_LOCALE`) veya özel başlık (`x-intlayer-locale`).
3. Yapılandırdığınız `defaultLocale` değerine geri dönen standart `Accept-Language` anlaşması.

Sonuç, `locale`, `defaultLocale` ve `availableLocales` ile birlikte Remix istek bağlamında `context.intlayer` (veya `context.get(Intlayer)`) olarak saklanır. Ara yazılım ardından isteğin geri kalanını bu bağlama bağlı bir `AsyncLocalStorage` kapsamında çalıştırır; bu da paketin hook'larının rota işleyicilerinde, görünümlerde ve `remix/ui` bileşenlerinde bağımsız değişken olmadan yerel ayarı okumasını sağlar:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Ara yazılımdan sonraki herhangi bir noktada
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` veya `useIntlayer("faq", { item: 2 })` tek bir çağrı için istek yerel ayarını geçersiz kılar ve `useDictionary(homeContent)` bir anahtar yerine içe aktarılan bir sözlüğü okur. Bir isteğin dışındayken hook'lar varsayılan yerel ayara döner.

> Ara yazılım ayrıca sunucu başladığında Intlayer sözlüklerini hazırlar, böylece eksik bir `intlayer build` kaydı boş bırakmaz.

</Step>
<Step number={6} title="Tip Güvenli Rotalar Tanımlayın">

`remix/routes` içinden `route()` kullanarak uygulama rotalarınızı tanımlayın:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Varsayılan yerel ayar rotası
  home: "/",

  // Dinamik :locale segmentine sahip yerelleştirilmiş rota
  localizedHome: "/:locale",
});
```

`route()` kullanımı uygulamanız genelinde tip güvenli URL üretimi sağlar:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "tr" }); // "/tr"
```

</Step>
<Step number={7} title="JSX ile Yerelleştirilmiş Sayfaları İşleyin">

Remix 3, JSX bileşenleri için `remix/ui` kullanır. Bir bileşen, bir **render işlevi** döndüren bir **kurulum (setup) işlevidir**. Proplar, tipli bir `handle` aracılığıyla iletilir (örneğin, `handle.props.locale`):

Ara yazılım tarafından çözümlenen yerel ayardan `<html lang="..." dir="...">` niteliklerini ayarlayan paylaşılan bir `Document` kabuğu ile başlayın:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Ardından ana sayfayı oluşturun. `useIntlayer` ile yerelleştirilmiş sözlüğü okur ve bir dil değiştirici oluşturur:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX, React değildir: `class` olduğu gibi yazılır (`className` de kabul edilir) ve yeniden oluşturmalar `handle.update()` ile açıkça tetiklenir. İnterpole edilen değerler otomatik olarak kaçış karakteriyle korunur. Intlayer hook'ları istek kapsamını okuyan düz işlevlerdir, bu nedenle hem setup işlevinden hem de render işlevinden çağrılabilirler.

</Step>
<Step number={8} title="Yönlendiriciyi ve Sunucuyu Bağlayın">

Ara yazılımları kaydetmek ve rota eylemlerini tanımlamak için `src/router.tsx` dosyasını oluşturun. `context.render()` yardımcısını yüklemek için `remix/middleware/render` kullanın ve JSX bileşeninizi doğrudan iletin:

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render`, ikinci bağımsız değişken olarak isteğe bağlı bir `ResponseInit` kabul eder (ör. `context.render(<NotFoundPage />, { status: 404 })`). Çözümlenen yerel ayar, örneğin bir `Response.json` yükü oluşturmak için işleyiciden `context.intlayer.locale` olarak erişilebilir kalır.

Şimdi Node.js için `remix/node-fetch-server` kullanarak `src/server.ts` dosyasını bağlayın (veya Bun, Deno ya da Cloudflare Workers için `fetch` işleyicisini doğrudan dışa aktarın):

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js HTTP sunucusu
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

// Bun / Deno / Cloudflare Workers dışa aktarımı
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Çevirileri Denetleyin ve Otomatik Doldurun">

Intlayer, eksik çevirileri denetlemek ve bunları yapay zeka kullanarak otomatik doldurmak için bir CLI sağlar:

```bash packageManager="npm"
# Eksik çevirileri denetle
npx intlayer test

# Eksik çevirileri yapay zeka ile doldur
npx intlayer fill
```

```bash packageManager="pnpm"
# Eksik çevirileri denetle
pnpm dlx intlayer test

# Eksik çevirileri yapay zeka ile doldur
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Eksik çevirileri denetle
yarn dlx intlayer test

# Eksik çevirileri yapay zeka ile doldur
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Eksik çevirileri denetle
bun x intlayer test

# Eksik çevirileri yapay zeka ile doldur
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript Yapılandırması

JSX'i `remix/ui` çalışma zamanına yönlendirmek ve oluşturulan `.intlayer` türlerini dahil etmek için `tsconfig.json` dosyasını yapılandırın:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"`, `<HomePage />` ifadesinin React yerine Remix'in `createElement` işlevine çözümlenmesini sağlayan şeydir. Hiçbir React çalışma zamanı yüklenmez.

## Sonuç

Remix 3 ve Intlayer ile açık web standartlarına uyan yalın, tam tip korumalı ve çalışma zamanı taşınabilir bir teknoloji yığınına sahip olursunuz. Uygulamanız, basit yerelleştirilmiş pazarlama sayfalarından küresel olarak dağıtılmış ve uçta işlenen hizmetlere kadar zahmetsizce ölçeklenebilir.
