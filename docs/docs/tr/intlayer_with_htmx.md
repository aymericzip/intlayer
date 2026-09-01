---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Uygulamanızı çevirmek için kapsamlı rehber"
description: "Artık i18next yok. 2026 çok dilli (i18n) htmx uygulaması oluşturmak için rehber. AI aracıları ile çeviri yapın ve bundle boyutunu, SEO'yu ve performansı optimize edin."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "Initial history"
author: aymericzip
---

# Intlayer kullanarak htmx uygulamanızı çevirin | Uluslararasılaştırma (i18n)

htmx kendi içeriğini render etmez. Bir ziyaretçinin okuduğu her etiket sunucunuzun ürettiği HTML'dir ve her swap ayrı bir HTTP isteğidir. Bu nedenle, bir htmx uygulamasını uluslararasılaştırmak bir sunucu sorumluluğudur: locale her istekte çözülmeli ve her fragment o locale'de render edilmelidir.

Intlayer bunu backend entegrasyonları aracılığıyla kapsar ve bu entegrasyonlar her istekte locale'yi algılar ve bildirilen içeriğinizi HTML'yi oluşturan handler'a sunar.

## İçindekiler

<TOC/>

## htmx uygulamasında i18n'nin üç kuralı

<AccordionGroup>
<Accordion header="Locale her istekte çözülmeli, sadece ilkinde değil">

Tek bir sayfa düzinelerce swap tetikleyebilir. Her biri, onu başlatan sayfanın belleğine sahip olmayan yeni bir istek. Eğer yerel ayar, ilk render sırasında ayarlanan bir değişkende bulunuyorsa, sonraki her fragment varsayılan dile geri döner.

Intlayer middleware, yerel ayarı istek kendisinden çözer, bu nedenle onuncu dakikada sunulan bir fragment, sıfırıncı dakikada sunulan sayfa ile aynı dilde cevap verir.

</Accordion>

<Accordion header="İstek ile yerel ayar seyahat etmelidir">

htmx ile iki taşıyıcı çalışır. Bir cookie (`INTLAYER_LOCALE`), tarayıcı tarafından htmx olanlar da dahil olmak üzere her istek üzerinde otomatik olarak gönderilir. Bir başlık (`x-intlayer-locale`), `hx-headers` özniteliği ile htmx isteklerine eklenebilir. Her ikisi de varsayılan olarak okunur.

</Accordion>

<Accordion header="Değiştirilen HTML hala HTML'dir">

Bir parçaya interpole edilen çevrilmiş bir değer markup'tır. Bunu diğer dinamik değerler gibi tam olarak escape edin, böylece `<` içeren bir çeviri, değiştirildiği belgeyi bozamaz.

</Accordion>
</AccordionGroup>

---

## Adım Adım Rehber

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı uluslararasılaştırma"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub'ta [Uygulama Şablonu](https://github.com/aymericzip/intlayer-htmx-template) sayfasına bakın.

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

`intlayer` ve sunucunuz için entegrasyonu yükleyin.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```bash packageManager="npm"
npm install intlayer express-intlayer cookie-parser
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer cookie-parser
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer cookie-parser
```

```bash packageManager="bun"
bun add intlayer express-intlayer cookie-parser
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```bash packageManager="npm"
npm install intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

  </Tab>
  <Tab label="Hono" value="hono">

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express ve Fastify, locale cookie'sini kendi cookie parser'ları aracılığıyla okurlar, bu nedenle bunlar yanında yüklenmelidir. Hono ve Elysia, cookie'leri yerel olarak ayrıştırırlar.

htmx'in kendisi, adım 4'te eklenen tek bir script tag'idir.

</Step>

<Step number={2} title="Projenizin Konfigürasyonu">

Proje kökinizde bir `intlayer.config.ts` dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Konfigürasyonun tam seçenekleri için [yapılandırma belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

</Step>

<Step number={3} title="İçeriğinizi Bildirin">

Sunucunun oluşturacağı tüm etiketleri bildirin; bunlar yalnızca bir fragment içinde görünen etiketleri de içerir:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      tr: "Dil",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        tr: "Sepetinizde yer alan ürünler: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      tr: "Bir öğe ekle",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik bildirimleri `contentDir` altında herhangi bir yerde bulunabilir (varsayılan olarak `./src`) ve `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}` ile eşleşir. Bkz. [içerik bildirimi belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md).

</Step>

<Step number={4} title="Intlayer middleware'ini kaydet">

Middleware, her isteğin locale'ini çözer ve handler'larınıza açığa çıkarır.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cookie parser önce çalışmalıdır: `express-intlayer` locale
// cookie'sini `req.cookies` aracılığıyla okur.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Çözümlenen locale `res.locals.locale` üzerindedir.

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

Çözümlenen yerel ayar `req.intlayer.locale` üzerindedir.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Çözümlenen yerel ayar `c.get("locale")` üzerindedir.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Çözümlenen locale, route context'inde `intlayer!.locale` üzerindedir.

  </Tab>
</Tabs>

Varsayılan olarak locale, `INTLAYER_LOCALE` cookie'sinden, sonra `x-intlayer-locale` header'ından, sonra `Accept-Language` görüşmesinden alınır.

</Step>

<Step number={5} title="İstek locale'i ile fragment'ları render edin">

Fragment renderer'larınızı bir locale'in saf fonksiyonları olarak yazın ve middleware'in çözümlediği locale'i geçin. Bunu açık bir şekilde geçmek, fragment'ı hangi sunucuda olursa olsun, onu isteyen istekle bağlı tutar.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Çevirilen bir değeri markup'tan çıkamaması için escape eder. */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<section id="cart">
  <p>${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p>${escapeHtml(currency(itemCount * 12.5, { locale, currency: "EUR" }))}</p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
</section>`;
};
```

Bunu bir route'tan sunun:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return reply
    .type("text/html")
    .send(renderCart(req.intlayer.locale, itemCount));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", async (c) => {
  const body = await c.req.parseBody();
  const itemCount = Number(body["itemCount"] ?? 0) + 1;

  return c.html(renderCart(c.get("locale"), itemCount));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", ({ body, intlayer }) => {
  const itemCount =
    Number((body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return new Response(renderCart(intlayer!.locale, itemCount), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

Aynı fragment artık `fr` diyen bir ziyaretçi için Fransızca, `ar` diyen bir ziyaretçi için Arapça olarak yanıt veriyor, çağrı işaretlemesinde herhangi bir değişiklik olmaksızın.

</Step>

<Step number={6} title="İlk sayfayı sunun">

`<body>` öğesini kendi başına render edin, böylece 7. adımdaki locale anahtarı onu tamamen değiştirebilsin, sonra htmx yükleyen belgeyle sarın:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    ${renderLocaleSwitcher(locale)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(String(getIntlayer("app", locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
${renderBody(locale, itemCount)}
</html>`;
```

`getHTMLTextDir`, locale için `ltr`, `rtl` veya `auto` döndürür, bu da Arapça ve İbranice'nin doğru şekilde düzenlenmesini sağlar.

</Step>

<Step number={7} title="Dili değiştir">

Dil değiştirmek diğer herhangi bir istek gibidir. Sunucu seçimi middleware'in okuduğu cookie'de depolar, ardından sayfayı yeni locale'de yeniden render ederek döndürür.

Anahtarı bir `select` olarak işleyin ve tüm `<body>`'yi değiştirecek şekilde kendinizi gönderip takas edin, böylece statik etiketleriniz de değişsin:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  const content = getIntlayer("app", locale);

  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  return `<form>
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};
```

> `getLocaleName(availableLocale, locale)` her dilde mevcut olan dili yazar. Bunun yerine her birini kendi dilinde yazmak için ikinci bir argüman iletmeyin.

POST'u, değeri doğrulayarak, cookie'yi ayarlayarak ve yeni body'yi döndürerek işleyin:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  const requestedLocale = String(req.body?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send("Unknown locale");
    return;
  }

  res.cookie("INTLAYER_LOCALE", requestedLocale, {
    sameSite: "lax",
    path: "/",
  });
  res.type("html").send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

fastify.post("/locale", async (req, reply) => {
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Unknown locale");
  }

  return reply
    .setCookie("INTLAYER_LOCALE", requestedLocale, {
      sameSite: "lax",
      path: "/",
    })
    .type("text/html")
    .send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { setCookie } from "hono/cookie";
import { isDeclaredLocale } from "intlayer";

app.post("/locale", async (c) => {
  const body = await c.req.parseBody();
  // İstenen locale'i body'den al
  const requestedLocale = String(body["locale"]);

  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  // Yerel ayarın bildirilmiş bir yerel ayar olup olmadığını kontrol et
  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  // INTLAYER_LOCALE cookie'sini ayarla
  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  // Yanıt olarak HTML gövdesini döndür
  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale`, keyfi bir string'i yapılandırılmış yerel ayarlarınızdan birine daraltır, bu nedenle beklenmeyen bir değer hiçbir zaman rendererlarınıza ulaşmaz.

</Step>

<Step number={8} title="Swap sonrasında lang ve dir'i senkronize tut" isOptional={true}>

Bir swap `<body>` öğesini değiştirebilir, etrafındaki `<html>` öğesini asla değiştiremez. Swap yapılan body öğesinde `lang` ve `dir` özniteliklerini render edin ve bunları başlık bölümünden kök öğeye bir kez geri kopyalayın:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Bunu yapmazsanız, Arapçaya geçiş body içinde sağdan sola doğru render olurken, belge hala önceki dili yardımcı teknolojilere ve tarayıcılara bildirir.

</Step>

<Step number={9} title="Cookie yerine locale'i header olarak gönder" isOptional={true}>

Bir cookie size uygun değilse, bir üst öğedeki `hx-headers` ile her htmx isteğine locale'i ekleyin. Alt öğeler bunu miras alır:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware varsayılan olarak `x-intlayer-locale` okur. Her iki taşıyıcıyı da yapılandırmanızda yeniden adlandırabilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Diğer yapılandırma seçenekleri
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

</Step>

</Steps>

### TypeScript'i Yapılandırın

Otomatik olarak oluşturulan türleri ekleyerek, bildirilmemiş bir anahtarın runtime'da boş bir string yerine compile hatası olmasını sağlayın.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript konfigürasyonlarınız
  "include": [
    // ... Mevcut TypeScript konfigürasyonlarınız
    ".intlayer/**/*.ts", // Otomatik olarak oluşturulan türleri ekleyin
  ],
}
```

### Git Konfigürasyonu

Intlayer tarafından oluşturulan dosyaları yok saymak önerilir:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yok sayın
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu extension şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Extension'ın nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Extension belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha İleri Gidin

Daha ileri gitmek için, içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışsallaştırabilirsiniz, böylece çevirmenler bir deployment olmadan metni değiştirebilir.

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Değiştirilen fragmentim neden yanlış dilde geri geliyor?">

Çünkü fragment isteği hiçbir locale taşımadı. htmx istekleri onu yayınlayan sayfadan bağımsızdır, bu nedenle locale her birinde seyahat etmelidir, `INTLAYER_LOCALE` cookie'si veya `hx-headers` ile ayarlanan `x-intlayer-locale` başlığı aracılığıyla. Cookie parser'ın Express ve Fastify'de Intlayer middleware'den önce çalıştığını kontrol edin, aksi takdirde cookie hiçbir zaman okunmaz ve her istek `Accept-Language`'e geri döner.

</Question>

<Question title="Locale'i `getIntlayer`'e geçirmeli miyim yoksa request context'ine güvenmeli miyim?">

Bunu geçin. Entegrasyonlar çözümlenmiş locale'i (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`) açığa çıkarır ve bunu `getIntlayer`'a vermek her renderer'ı bir locale'in saf fonksiyonu yapar. Bu test etmeyi kolaylaştırır ve sunucuyu değiştirirseniz fragment renderer'larınızı taşınabilir tutar.

</Question>

<Question title="htmx'in yanında client side i18n kütüphanesine ihtiyacım var mı?">

Hayır. Ziyaretçinin gördüğü her şey sunucu tarafından üretilir, bu nedenle tarayıcıda çevirisi yapılacak bir şey yoktur. Bu ayrıca htmx uygulamasında i18n'nin sayfa ağırlığı maliyetinin neden sıfıra yakın olduğunun sebebidir: hiçbir katalog client'e gönderilmez.

</Question>

<Question title="URL'yi de lokalize etmek için SEO açısından nasıl yapabilirim?">

Sayfalarınızı bir yerel ön eki altında sunun (`/fr/cart`) ve tam sayfa renderi için yerel kodu yoldan okuyun, tanımlama bilgisinden değil, rota işleyicinizde. Parçalar tanımlama bilgisini veya başlığı kullanmaya devam edebilir. [konfigürasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) için yönlendirme seçeneklerine ve [özel URL yeniden yazımları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/custom_url_rewrites.md) bölümüne bakın.

</Question>

<Question title="Sağdan sola dilleri nasıl işleyebilirim?">

`getHTMLTextDir(locale)` `ltr`, `rtl` veya `auto` döndürür. İlk render için belgeye ayarlayın ve adım 8'in gösterdiği gibi bir takas sonrasında yeniden uygulayın. CSS mantıksal özellikleri kullanın (`margin-left` yerine `margin-inline-start`) böylece düzeniniz buna uyar.

</Question>

<Question title="Çevrilmiş değerleri kaçış karakteri ile işlemek zorunda mıyım?">

Evet, bir şablon dizesine interpolate ettiğiniz herhangi bir şey için, diğer dinamik değerler gibi tam olarak aynı şekilde. CMS'den veya çevirmen tarafından gelen içerik kontrol ettiğiniz markup değildir. Adım 5 minimal bir escaper göstermektedir.

</Question>

<Question title="Aynı içerik API yanıtlarıma da hizmet verebilir mi?">

Evet. Backend integrations, `t()` ve `getIntlayer()` fonksiyonlarını herhangi bir handler'a expose eder, böylece bir toast'ta gösterilen bir hata mesajı ve bir fragment'e render edilen bir label aynı declared content'ten gelir. [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_hono.md) ve [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_elysia.md) rehberlerine bakın.

</Question>

<Question title="İçeriği key by key taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın ve Intlayer kaynak dosyalarınızı okuyup kullanıcı tarafından görünen stringleri çıkartarak her birinin yanına bir `.content` dosyası yazar, böylece kataloğa birer birer string kopyalamak yerine bir diff'i gözden geçirirsiniz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) sayfasına bakınız.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı tutabilir miyim?">

Evet. [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) sizin `/messages/{locale}/{namespace}.json` dosyalarınızı gerçeğin kaynağı olarak tutar ve her iki yönde de bunlardan Intlayer sözlükleri oluşturur. Bir [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext kataloğu için aynısını yapar ve [locale başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md) içeriği locales'i bir dosyada gruplamak yerine dile göre bölmenizi sağlar.

</Question>

<Question title="Uygulamayı AI ile otomatik olarak nasıl çevirebilirim?">

`npx intlayer fill` komutunu çalıştırın; bu komut, kendi provider'ınız ve API anahtarınızı kullanarak seçtiğiniz LLM ile eksik çevirileri doldurur. Branch'de yapılan içeriği çevirmek için `--git-diff` ekleyin. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Intlayer cinsiyet, koşullar ve interpole edilmiş değerleri destekliyor mu?">

Evet: [cinsiyet tabanlı içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/gender.md), koşullar, [numaralandırmalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration.md), [eklemeler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md) enterpolasyonlu değerler için ve [formatlayıcılar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md) sayılar, tarihler ve para birimler için.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş parça, hepsi isteğe bağlı:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir anahtardan onu tanımlayan içerik dosyasına atla, bir dosyadan içerik çıkart ve komut paletinden build, fill, test, push ve pull komutlarını çalıştır.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP konuşan herhangi bir editörde aynı farkındalık, tanıma git, çevrilen değerin hover önizlemesi, anahtarların otomatik tamamlanması ve bir anahtarın hiçbir yerde tanımlanmadığı durumlarda uyarı.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye açığa çıkart.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` sabit kodlanmış stringleri işaretler.

</Question>

<Question title="Intlayer ücretsiz ve açık kaynak mı?">

Evet, Apache 2.0 lisansı altında, ticari kullanım dahil. Barındırılan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) isteğe bağlı bir ücretli hizmettir ve ayrıca [kendi kendine barındırılabilir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
