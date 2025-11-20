---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: SvelteKit uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: SvelteKit web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Server-Side Rendering (SSR) kullanarak uluslararasılaştırma (i18n) ve çeviri yapmak için dokümantasyonu takip edin.
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
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: Başlangıç geçmişi
---

# Intlayer kullanarak SvelteKit web sitenizi çevirin | Uluslararasılaştırma (i18n)

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

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: Temel i18n paketi.
- **svelte-intlayer**: Svelte/SvelteKit için context sağlayıcıları ve store'lar sunar.
- **vite-intlayer**: İçerik bildirimlerini build süreciyle entegre eden Vite eklentisi.

### Adım 2: Projenizin Yapılandırması

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

### Adım 3: Intlayer'ı Vite Konfigürasyonunuza Entegre Edin

`vite.config.ts` dosyanızı, Intlayer eklentisini içerecek şekilde güncelleyin. Bu eklenti, içerik dosyalarınızın transpile edilmesini yönetir.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // sıralama önemlidir, Intlayer SvelteKit'ten önce yerleştirilmelidir
});
```

### Adım 4: İçeriğinizi Bildirin

`src` klasörünüzde istediğiniz herhangi bir yerde içerik bildirim dosyalarınızı oluşturun (örneğin, `src/lib/content` veya bileşenlerinizin yanında). Bu dosyalar, uygulamanız için çevrilebilir içeriği her locale için `t()` fonksiyonunu kullanarak tanımlar.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Adım 5: Bileşenlerinizde Intlayer'ı Kullanın

Artık `useIntlayer` fonksiyonunu herhangi bir Svelte bileşeninde kullanabilirsiniz. Bu fonksiyon, locale değiştiğinde otomatik olarak güncellenen reaktif bir store döner. Fonksiyon, mevcut locale'yi otomatik olarak dikkate alır (hem SSR sırasında hem de istemci tarafı gezinmede).

> **Not:** `useIntlayer` bir Svelte store döner, bu yüzden reaktif değerine erişmek için `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: SvelteKit uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
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

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: Temel i18n paketi.
- **svelte-intlayer**: Svelte/SvelteKit için context sağlayıcıları ve store'lar sunar.
- **vite-intlayer**: İçerik bildirimlerini build süreciyle entegre eden Vite eklentisi.

### Adım 2: Projenizin Yapılandırması

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

### Adım 3: Intlayer'ı Vite Konfigürasyonunuza Entegre Edin

`vite.config.ts` dosyanızı, Intlayer eklentisini içerecek şekilde güncelleyin. Bu eklenti, içerik dosyalarınızın transpile edilmesini yönetir.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // sıralama önemlidir, Intlayer SvelteKit'ten önce yerleştirilmelidir
});
```

### Adım 4: İçeriğinizi Bildirin

`src` klasörünüzde istediğiniz herhangi bir yerde içerik bildirim dosyalarınızı oluşturun (örneğin, `src/lib/content` veya bileşenlerinizin yanında). Bu dosyalar, uygulamanız için çevrilebilir içeriği her locale için `t()` fonksiyonunu kullanarak tanımlar.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### Adım 5: Bileşenlerinizde Intlayer'ı Kullanın

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
<h1><svelte:component this={$content.title} /></h1>
<!-- İçeriği string olarak render etmek için -->
<div aria-label={$content.title.value}></div>
```

### (İsteğe bağlı) Adım 6: Yönlendirmeyi ayarlama

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

### Adım 7: Sunucu Tarafı Dil Algılama (Hooks) İşlemi

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

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
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
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Genel Load tipini kullan
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Yönlendirmeden alınan locale ile Intlayer'ı başlat
	setupIntlayer(data.locale);

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
	import { useIntlayer } from 'svelte-intlayer';

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

### (İsteğe Bağlı) Adım 8: Uluslararasılaştırılmış Bağlantılar

SEO için, rotalarınızı locale ile öneklemeniz önerilir (örneğin, `/en/about`, `/fr/about`). Bu bileşen, herhangi bir bağlantıyı otomatik olarak mevcut locale ile önekler.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

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

### (İsteğe Bağlı) Adım 9: Dil Değiştirici

Kullanıcıların dilleri değiştirmesine izin vermek için URL'yi güncelleyin.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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

### (İsteğe Bağlı) Adım 10: Backend proxy ekleme

SvelteKit uygulamanıza bir backend proxy eklemek için, `vite-intlayer` eklentisi tarafından sağlanan `intlayerProxy` fonksiyonunu kullanabilirsiniz. Bu eklenti, URL, çerezler ve tarayıcı dil tercihleri temelinde kullanıcı için en iyi yereli otomatik olarak algılar.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (İsteğe Bağlı) Adım 11: intlayer editör / CMS kurulumu

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
  <svelte:component this={$content.component} />
</div>
```

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
