---
createdAt: 2025-11-20
updatedAt: 2026-05-31
title: "SvelteKit i18n - SvelteKit uygulamasını çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) SvelteKit uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Başlangıç geçmişi"
---

# Intlayer kullanarak SvelteKit web sitenizi çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

"svelte-i18n" veya "i18next" gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam SvelteKit kapsamı">

Intlayer, **çok dilli yönlendirme**, **SSR desteği** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak SvelteKit ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## SvelteKit Uygulamasında Intlayer Kurulumu için Adım Adım Rehber

Başlamak için yeni bir SvelteKit projesi oluşturun. İşte oluşturacağımız son yapı:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**: Temel i18n paketi.
- **svelte-intlayer**: Svelte/SvelteKit için context sağlayıcıları ve store'lar sunar.
- **vite-intlayer**: İçerik bildirimlerini build süreciyle entegre eden Vite eklentisi.

</Step>

<Step number={2} title="Projenizin Yapılandırması">

Proje kök dizininizde bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Intlayer'ı Vite Konfigürasyonunuza Entegre Edin">

`vite.config.ts` dosyanızı, Intlayer eklentisini içerecek şekilde güncelleyin. Bu eklenti, içerik dosyalarınızın transpile edilmesini yönetir.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // sıralama önemlidir, Intlayer SvelteKit'ten önce yerleştirilmelidir
});
```

</Step>

<Step number={4} title="İçeriğinizi Bildirin">

`src` klasörünüzde istediğiniz herhangi bir yerde içerik bildirim dosyalarınızı oluşturun (örneğin, `src/lib/content` veya bileşenlerinizin yanında). Bu dosyalar, uygulamanız için çevrilebilir içeriği her locale için `t()` fonksiyonunu kullanarak tanımlar.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Bileşenlerinizde Intlayer'ı Kullanın">

Artık `useIntlayer` fonksiyonunu herhangi bir Svelte bileşeninde kullanabilirsiniz. Bu fonksiyon, locale değiştiğinde otomatik olarak güncellenen reaktif bir store döner. Fonksiyon, mevcut locale'yi otomatik olarak dikkate alır (hem SSR sırasında hem de istemci tarafı gezinmede).

> **Not:** `useIntlayer` bir Svelte store döner, bu yüzden reaktif değerine erişmek için `---
> createdAt: 2025-11-20
> updatedAt: 2026-05-31
> title: SvelteKit uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
> description: SvelteKit web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Server-Side Rendering (SSR) kullanarak uluslararasılaştırma (i18n) ve çeviri yapmak için dokümantasyonu takip edin.
> keywords:

- Uluslararasılaştırma
- Dokümantasyon
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Başlangıç geçmişi

---

# Intlayer kullanarak SvelteKit web sitenizi çevirin | Uluslararasılaştırma (i18n)

</Step>

</Steps>

## İçindekiler

<TOC/>

## Intlayer nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. **SvelteKit'in** Server-Side Rendering (SSR) yetenekleriyle sorunsuz çalışır.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde deklaratif sözlükler kullanarak çevirileri kolayca yönetin.**
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlayın.**
- **SEO dostu uluslararasılaştırma için SvelteKit'in SSR'sinden yararlanın.**

---

## SvelteKit Uygulamasında Intlayer Kurulumu için Adım Adım Rehber

Başlamak için yeni bir SvelteKit projesi oluşturun. İşte oluşturacağımız son yapı:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**: Temel i18n paketi.
- **svelte-intlayer**: Svelte/SvelteKit için context sağlayıcıları ve store'lar sunar.
- **vite-intlayer**: İçerik bildirimlerini build süreciyle entegre eden Vite eklentisi.

</Step>

<Step number={2} title="Projenizin Yapılandırması">

Proje kök dizininizde bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Intlayer'ı Vite Konfigürasyonunuza Entegre Edin">

`vite.config.ts` dosyanızı, Intlayer eklentisini içerecek şekilde güncelleyin. Bu eklenti, içerik dosyalarınızın transpile edilmesini yönetir.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // sıralama önemlidir, Intlayer SvelteKit'ten önce yerleştirilmelidir
});
```

</Step>

<Step number={4} title="İçeriğinizi Bildirin">

`src` klasörünüzde istediğiniz herhangi bir yerde içerik bildirim dosyalarınızı oluşturun (örneğin, `src/lib/content` veya bileşenlerinizin yanında). Bu dosyalar, uygulamanız için çevrilebilir içeriği her locale için `t()` fonksiyonunu kullanarak tanımlar.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Bileşenlerinizde Intlayer'ı Kullanın">

ön ekini kullanmanız gerekir (örneğin, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section", Adım 4'te tanımlanan key'e karşılık gelir
  const content = useIntlayer("hero-section");
</script>

<!-- İçeriği basit içerik olarak render et -->
<h1>{$content.title}</h1>
<!-- İçeriği editör kullanarak düzenlenebilir şekilde render etmek için -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- İçeriği string olarak render etmek için -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Yönlendirmeyi ayarlama" isOptional={true}>

Aşağıdaki adımlar, SvelteKit'te locale tabanlı yönlendirmeyi nasıl ayarlayacağınızı gösterir. Bu, URL'lerinizin locale önekini içermesine olanak tanır (örneğin, `/en/about`, `/fr/about`) ve böylece SEO ve kullanıcı deneyimini iyileştirir.

```bash
.
└─── src
    ├── app.d.ts                  # Locale türünü tanımla
    ├── hooks.server.ts           # Locale yönlendirmesini yönet
    ├── lib
    │   └── getLocale.ts          # Header ve çerezlerden locale kontrolü yap
    ├── params
    │   └── locale.ts             # Locale parametresini tanımla
    └── routes
        ├── [[locale=locale]]     # Locale'i ayarlamak için route grubuna sar
        │   ├── +layout.svelte    # Yönlendirme için yerel düzen
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Yazı tipleri ve genel stiller için kök düzen
```

</Step>

<Step number={7} title="Sunucu Tarafı Dil Algılama (Hooks) İşlemi">

SvelteKit'te, SSR sırasında doğru içeriği render etmek için sunucunun kullanıcının dilini bilmesi gerekir. URL veya çerezlerden dili algılamak için `hooks.server.ts` kullanılır.

`src/hooks.server.ts` dosyasını oluşturun veya düzenleyin:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Mevcut yolun zaten bir locale ile başlayıp başlamadığını kontrol edin (örneğin /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // URL'de locale yoksa (örneğin kullanıcı "/" adresini ziyaret ederse), yönlendirme yapın
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Geçici yönlendirme
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Ardından, kullanıcının locale bilgisini istek olayından almak için bir yardımcı oluşturun:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * İstek olayından kullanıcının yerel ayarını alın.
 * Bu fonksiyon `src/hooks.server.ts` dosyasındaki `handle` kancasına kullanılır.
 *
 * Öncelikle Intlayer depolamasından (çerezler veya özel başlıklar) yerel ayarı almaya çalışır.
 * Yerel ayar bulunamazsa, tarayıcının "Accept-Language" müzakeresine geri döner.
 *
 * @param event - SvelteKit'ten gelen istek olayı
 * @returns Kullanıcının yerel ayarı
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intlayer depolamasından yerel ayarı almaya çalış (Çerezler veya başlıklar)
  const storedLocale = getLocaleFromStorage({
    // SvelteKit çerez erişimi
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit başlık erişimi
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Tarayıcı "Accept-Language" müzakeresine geri dönüş
  const negotiatorHeaders: Record<string, string> = {};

  // SvelteKit Headers nesnesini basit bir Record<string, string> nesnesine dönüştür
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // `Accept-Language` başlığından locale kontrolü yap
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Eşleşme bulunamazsa varsayılan locale döndür
  return defaultLocale;
};
```

> `getLocaleFromStorage`, yapılandırmanıza bağlı olarak yerel ayarı header veya cookie'den kontrol edecektir. Daha fazla detay için [Configuration](https://intlayer.org/doc/configuration) sayfasına bakınız.

> `localeDetector` fonksiyonu `Accept-Language` header'ını işleyip en uygun eşleşmeyi döndürecektir.

Eğer yerel ayar yapılandırılmamışsa, 404 hatası döndürmek isteriz. Bunu kolaylaştırmak için, yerel ayarın geçerli olup olmadığını kontrol eden bir `match` fonksiyonu oluşturabiliriz:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Not:** `src/app.d.ts` dosyanızın yerel ayar tanımını içerdiğinden emin olun:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

`+layout.svelte` dosyası için, i18n ile ilgili olmayan sadece statik içeriği tutmak amacıyla her şeyi kaldırabiliriz:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Sonra, `[[locale=locale]]` grubu altında yeni bir sayfa ve layout oluşturun:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Genel Load tipini kullan
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Yönlendirmeden alınan locale ile Intlayer'ı başlat
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Layout içerik sözlüğünü kullan
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// Ana sayfa içerik sözlüğünü kullan
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="Uluslararasılaştırılmış Bağlantılar" isOptional={true}>

SEO için, rotalarınızı locale ile öneklemeniz önerilir (örneğin, `/en/about`, `/fr/about`). Bu bileşen, herhangi bir bağlantıyı otomatik olarak mevcut locale ile önekler.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // URL'ye mevcut locale'i öneklemek için yardımcı fonksiyon
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Eğer SvelteKit'ten `goto` kullanıyorsanız, aynı mantığı `getLocalizedUrl` ile kullanarak lokalize edilmiş URL'ye yönlendirme yapabilirsiniz:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Yerel dile bağlı olarak /en/about veya /fr/about adresine gider
```

</Step>

<Step number={9} title="Dil Değiştirici" isOptional={true}>

Kullanıcıların dilleri değiştirmesine izin vermek için URL'yi güncelleyin.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Mağazada yerel ayarı yapacak ve onLocaleChange tetiklenecek
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="Backend proxy ekleme" isOptional={true}>

SvelteKit uygulamanıza bir backend proxy eklemek için, `vite-intlayer` eklentisi tarafından sağlanan `intlayerProxy` fonksiyonunu kullanabilirsiniz. Bu eklenti, URL, çerezler ve tarayıcı dil tercihleri temelinde kullanıcı için en iyi yereli otomatik olarak algılar.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="intlayer editör / CMS kurulumu" isOptional={true}>

intlayer editörünü kurmak için, [intlayer editör dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) takip etmelisiniz.

intlayer CMS'i kurmak için, [intlayer CMS dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) takip etmelisiniz.

intlayer editör seçicisini görselleştirebilmek için, intlayer içeriğinizde bileşen sözdizimini kullanmanız gerekecektir.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- İçeriği basit içerik olarak render et -->
  <h1>{$content.title}</h1>

  <!-- İçeriği bir bileşen olarak render et (editör tarafından gereklidir) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

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

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Derleyici eklentisini ekler
  ],
});
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

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir.

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

---

### Daha İleri Gitmek İçin

- **Görsel Editör**: Çevirileri doğrudan kullanıcı arayüzünden düzenlemek için [Intlayer Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ile entegre olun.
- **CMS**: İçerik yönetiminizi dışa aktararak [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanın.
