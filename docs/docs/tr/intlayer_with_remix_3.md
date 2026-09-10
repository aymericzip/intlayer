---
createdAt: 2026-09-09
updatedAt: 2026-09-09
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
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 için ilk dokümantasyon"
author: aymericzip
---

# Intlayer Kullanarak Remix 3 Web Sitenizi Çevirin | Uluslararasılaştırma (i18n)

Bu kılavuz, yerel ayara duyarlı yönlendirme, tip güvenli içerik bildirimleri, güvenli HTML şablonları ve Node.js, Bun, Deno ve Cloudflare Workers üzerinde çoklu çalışma zamanı desteği ile **Remix 3** uygulamalarında sorunsuz uluslararasılaştırma için **Intlayer**'ın nasıl entegre edileceğini göstermektedir.

## Remix 3 Nedir?

**Remix 3**, tamamen web standartları üzerine inşa edilmiş, **çalışma zamanından bağımsız, modüler bir web çatısına doğru temel bir mimari değişimi** temsil eder. Belirli paketleyicilere veya özel sunucu API'lerine bağlı kalmak yerine Remix 3, tek amaçlı modüler paketler olarak dağıtılır:

- **`remix/fetch-router`** (veya `remix/router`): Fetch API (`Request` ve `Response`) üzerine inşa edilmiş hafif, standartlara uygun yönlendirme.
- **`remix/html-template`**: Otomatik XSS koruması ve parça kompozisyonu ile güvenli HTML şablon değişmezleri.
- **`remix/response/html`**: Standart HTTP anlambilimiyle HTML sunmaya yarayan yanıt yardımcıları.
- **`remix/node-fetch-server`**: Node.js için sunucu bağdaştırıcıları ile Bun, Deno ve uç (edge) çalışma zamanları için yerel destek.
- **`remix/cookie`**: Kriptografik olarak güvenli çerez ayrıştırma ve serileştirme.

**Intlayer** ile birleştirildiğinde, derleme zamanı güvenliği, otomatik yapay zeka çevirileri, sıfır ek yüklü sunucu oluşturma ve sorunsuz yerel ayar yönlendirmesi sağlayan eksiksiz bir uluslararasılaştırma sistemine sahip olursunuz.

## İçindekiler

<TOC/>

## Neden Alternatifler Yerine Intlayer?

`i18next` veya özel çeviri yükleyicileri gibi geleneksel çözümlerle karşılaştırıldığında Intlayer, modern web mimarisi için optimize edilmiş entegre bir geliştirici deneyimi sunar:

<AccordionGroup>
<Accordion header="Tam Remix 3 ve Web Standartları Uyumluluğu">

Intlayer, web standartlarıyla (`Request`, `Response`, `Headers` ve `URL`) sorunsuz çalışacak şekilde tasarlanmıştır. Remix 3'ün Fetch yönlendiricisine hafif bir ara yazılım aracılığıyla kolayca entegre olur ve sizi belirli bir çalışma zamanına bağlamadan URL yollarından, çerezlerden veya `Accept-Language` başlıklarından yerel ayarları ayıklar.

</Accordion>
<Accordion header="Tip Güvenli İçerik Bildirimleri">

Gevşek JSON anahtarlarına ve çalışma zamanındaki eksik anahtar çökmelerine veda edin. Intlayer, bildirilen tüm dillerde TypeScript denetimlerini zorunlu kılar ve bir çeviri eksik veya geçersiz olduğunda sizi derleme zamanında uyarır.

</Accordion>
<Accordion header="Sunucuda Sıfır Paket Ek Yükü">

Remix 3'ün sunucu taraflı işlenen HTML şablonlarını (`remix/html-template`) kullanırken, çıktı akışına yalnızca istenen yerel ayar için çözümlenmiş metin yazılır. Açıkça gerekmedikçe istemci hidrasyon paketlerine veya hacimli çeviri kataloglarına ihtiyaç duyulmaz.

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

Tercih ettiğiniz paket yöneticisini kullanarak `intlayer` ve `remix` (sürüm 3) paketlerini yükleyin:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Yapılandırma yönetimi, sözlük bildirimi (`t()`, `Dictionary`), CLI araçları ve çalışma zamanı yorumlayıcısı sağlayan çekirdek uluslararasılaştırma motoru.
- **`remix`**: `remix/router`, `remix/routes`, `remix/html-template` ve `remix/node-fetch-server` dışa aktaran birleşik Remix 3 çatı paketi.

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
<Step number={5} title="Intlayer Ara Yazılımını (Middleware) Uygulayın">

Remix 3, `createRouter({ middleware: [...] })` aracılığıyla modüler bir ara yazılım hattı sağlar.

Aşağıdaki öncelik sırasına göre her gelen isteğin dilini çözümleyen bir Intlayer ara yazılımı oluşturun:

1. Intlayer'ın `getLocaleFromPath` fonksiyonu ile URL yolu öneki (örneğin `/tr` veya `/fr`).
2. Çerezleri (`INTLAYER_LOCALE`), özel başlıkları (`x-intlayer-locale`), standart `Accept-Language` başlıklarını ve `defaultLocale` ayarını otomatik olarak müzakere eden Intlayer `getLocale` yardımcısı.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Remix 3 RequestContext içinden çözümlenen yerel ayarı almak için tip güvenli bağlam anahtarı.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Remix 3 için Intlayer ara yazılımı.
 *
 * İstek dilini aşağıdaki önceliğe göre çözümler:
 * 1. `getLocaleFromPath` ile URL yolu öneki (ör. `/tr/...`)
 * 2. `getLocale` ile başlık ve depolama müzakeresi (çerez, özel başlık, Accept-Language, varsayılan defaultLocale)
 *
 * Çözümlenen yerel ayarı Remix 3 RequestContext'e ekler.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Yol tespiti (/tr/about -> "tr", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Çözümlenen yerel ayarı Remix 3 istek bağlamına ekle
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Çözümlenen yerel ayarı Remix 3 istek bağlamına ekle
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

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
<Step number={7} title="Yerelleştirilmiş HTML Şablonlarını İşleyin">

Remix 3, güvenli ve otomatik olarak kaçış karakterleri eklenmiş HTML üretimi için `remix/html-template` kullanır. `getIntlayer` ile yerelleştirilmiş sözlüğü çıkaran, `<html lang="..." dir="...">` niteliklerini ayarlayan ve bir dil değiştirici gösteren bir görünüm işlevi oluşturun:

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="Sunucu Uygulamasını Bağlayın">

Yönlendiricinizi, ara yazılımlarınızı ve rota eylemlerinizi `src/server.ts` içinde bağlayın:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Yönlendiriciyi Intlayer ara yazılımı ile başlatın
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Rota işleyicilerini eşleyin
router.map(routes, {
  actions: {
    // Varsayılan yerel ayar rotası
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Yerelleştirilmiş rota
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. Sunucuyu başlatın
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

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

`tsconfig.json` dosyanızın oluşturulan `.intlayer` türlerini içerdiğinden emin olun:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## Sonuç

Remix 3 ve Intlayer ile açık web standartlarına uyan yalın, tam tip korumalı ve çalışma zamanı taşınabilir bir teknoloji yığınına sahip olursunuz. Uygulamanız, basit yerelleştirilmiş pazarlama sayfalarından küresel olarak dağıtılmış ve uçta işlenen hizmetlere kadar zahmetsizce ölçeklenebilir.
