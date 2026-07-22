---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Nuxt uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.3.11
    date: 2025-12-07
    changes: "LocaleSwitcher, SEO, metadata güncellendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer kullanarak Nuxt ve Vue web sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'@nuxtjs/i18n' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Nuxt kapsamı">

Intlayer, **çok dilli yönlendirme**, **yerel algılama için ara yazılım**, **site haritası** ve uluslararasılaştırmayı ölçeklendirmek için gereken tüm özellikleri (i18n) sunarak Nuxt ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## Nuxt Uygulamasında Intlayer Kurulumu Adım Adım Rehber

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Nuxt ve Vue uygulamanızı Intlayer kullanarak nasıl çevirirsiniz? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-nuxt-4-template) inceleyin.

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
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  Konfigürasyon yönetimi, çeviri, [içerik beyanı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **vue-intlayer**
  Intlayer'ı Vue uygulamasıyla entegre eden paket. Vue bileşenleri için composables sağlar.

- **nuxt-intlayer**
  Nuxt uygulamalarıyla Intlayer'ı entegre eden Nuxt modülü. Otomatik kurulum, yerel algılama için middleware, çerez yönetimi ve URL yönlendirmesi sağlar.

</Step>

<Step number={2} title="Projenizin yapılandırması">

Uygulamanızın dillerini yapılandırmak için bir konfigürasyon dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, middleware yönlendirmesini, çerez isimlerini, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, Intlayer loglarını konsolda devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

</Step>

<Step number={3} title="Intlayer'ı Nuxt Yapılandırmanıza Entegre Edin">

Intlayer modülünü Nuxt yapılandırmanıza ekleyin:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Mevcut Nuxt yapılandırmanız
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` modülü, Intlayer'ın Nuxt ile entegrasyonunu otomatik olarak yönetir. İçerik bildirimlerinin oluşturulmasını ayarlar, geliştirme modunda dosyaları izler, yerel tespit için middleware sağlar ve yerelleştirilmiş yönlendirmeyi yönetir.

</Step>

<Step number={4} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> İçerik bildirimleriniz, uygulamanızın herhangi bir yerinde tanımlanabilir, yeter ki `contentDir` dizini içinde yer alsın (varsayılan olarak `./src`). Ve içerik bildirim dosya uzantısıyla eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakınız.

</Step>

<Step number={5} title="Intlayer'ı Kodunuzda Kullanın">

Nuxt uygulamanızın her yerinde içerik sözlüklerinize `useIntlayer` composable'ı ile erişin:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Intlayer'da İçeriğe Erişim

Intlayer, içeriğinize erişmek için farklı API'ler sunar:

- **Bileşen tabanlı sözdizimi** (önerilen):
  `<myContent />` veya `<Component :is="myContent" />` sözdizimini kullanarak içeriği bir Intlayer Node olarak render edin. Bu, [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile sorunsuz bir şekilde entegre olur.

- **Metin tabanlı sözdizimi**:  
  İçeriği Visual Editor desteği olmadan düz metin olarak render etmek için `{{ myContent }}` kullanın.

- **Ham HTML sözdizimi**:  
  İçeriği Visual Editor desteği olmadan ham HTML olarak render etmek için `<div v-html="myContent" />` kullanın.

- **Yapı bozma (Destructuration) sözdizimi**:  
  `useIntlayer` composable, içerikle birlikte bir Proxy döner. Bu proxy, reaktiviteyi koruyarak içeriğe erişmek için yapı bozma yöntemiyle ayrıştırılabilir.
  - `const content = useIntlayer("myContent");` kullanın ve `{{ content.myContent }}` / `<content.myContent />` şeklinde render edin.
  - Ya da içeriği yapı bozma ile almak için `const { myContent } = useIntlayer("myContent");` kullanın ve `{{ myContent}}` / `<myContent/>` şeklinde render edin.

</Step>

<Step number={6} title="İçeriğinizin dilini değiştirin" isOptional={true}>

İçeriğinizin dilini değiştirmek için `useLocale` composable tarafından sağlanan `setLocale` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, uygulamanın yerel ayarını belirlemenize ve içeriği buna göre güncellemenize olanak tanır.

`NuxtLink` kullanarak diller arasında geçiş yapmak için bir bileşen oluşturun. **Dil değiştirme için butonlar yerine link kullanmak, SEO ve sayfa keşfedilebilirliği açısından en iyi uygulamadır**, çünkü bu sayede arama motorları sayfalarınızın tüm yerelleştirilmiş versiyonlarını tarayabilir ve indeksleyebilir.

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt useRoute'u otomatik olarak import eder
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> `NuxtLink`'i uygun `href` öznitelikleriyle ( `getLocalizedUrl` aracılığıyla) kullanmak, arama motorlarının sayfalarınızın tüm dil varyantlarını keşfetmesini sağlar. Bu, arama motoru tarayıcılarının takip etmeyebileceği yalnızca JavaScript ile yapılan dil değiştirmeye tercih edilir.

Sonra, `app.vue` dosyanızı layout kullanacak şekilde ayarlayın:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin" isOptional={true}>

Nuxt, `nuxt-intlayer` modülünü kullandığınızda yerelleştirilmiş yönlendirmeyi otomatik olarak yönetir. Bu, sayfalar dizin yapınıza dayanarak her dil için otomatik olarak rotalar oluşturur.

Örnek:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Yerelleştirilmiş sayfalar oluşturmak için, `pages/` dizininde Vue dosyalarınızı oluşturmanız yeterlidir. İşte iki örnek sayfa:

**Ana Sayfa (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Hakkında Sayfası (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Primitif string erişimi için .raw kullanın
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Primitif string erişimi için .raw kullanın
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Not: `useHead` Nuxt'ta otomatik olarak içe aktarılır. İçerik değerlerine ihtiyaçlarınıza bağlı olarak `.value` (reaktif) veya `.raw` (primitif string) ile erişebilirsiniz.

`nuxt-intlayer` modülü otomatik olarak:

- Kullanıcının tercih ettiği yerel dili algılar
- URL üzerinden yerel dil değişimini yönetir
- Uygun `<html lang="">` özniteliğini ayarlar
- Yerel dil çerezlerini yönetir
- Kullanıcıları uygun yerelleştirilmiş URL'ye yönlendirir

</Step>

<Step number={8} title="Yerelleştirilmiş Bir Link Bileşeni Oluşturma" isOptional={true}>

Uygulamanızın navigasyonunun mevcut locale'a uygun olmasını sağlamak için özel bir `Links` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'lerin önüne otomatik olarak mevcut dili ekler; bu, **SEO ve sayfa keşfedilebilirliği** için çok önemlidir.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Son yolu hesapla
const finalPath = computed(() => {
  // 1. Linkin harici olup olmadığını kontrol et
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Eğer harici ise, olduğu gibi döndür (NuxtLink <a> etiketi oluşturmayı yönetir)
  if (isExternal) return props.href;

  // 3. Eğer dahili ise, URL'yi yerelleştir
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Sonra bu bileşeni uygulamanızın her yerinde kullanabilirsiniz:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Anasayfa</Links>
    <Links href="/about">Hakkında</Links>
  </div>
</template>
```

> `NuxtLink`'i yerelleştirilmiş yollarla kullanarak şunları sağlarsınız:
>
> - Arama motorları sayfalarınızın tüm dil versiyonlarını tarayabilir ve dizine ekleyebilir
> - Kullanıcılar yerelleştirilmiş URL'leri doğrudan paylaşabilir
> - Tarayıcı geçmişi, dil önekli URL'lerle doğru şekilde çalışır

</Step>

<Step number={9} title="Meta Verileri ve SEO'yu Yönetme" isOptional={true}>

Nuxt, `useHead` composable (otomatik olarak içe aktarılır) aracılığıyla mükemmel SEO yetenekleri sunar. Intlayer'ı, yerelleştirilmiş meta verileri yönetmek için `.raw` veya `.value` erişicisini kullanarak temel string değerini almak için kullanabilirsiniz:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead Nuxt'ta otomatik olarak içe aktarılır
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Temel string erişimi için .raw kullanın
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // İlkel string erişimi için .raw kullanın
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternatif olarak, Vue reaktivitesi olmadan içeriği almak için `import { getIntlayer } from "intlayer"` fonksiyonunu kullanabilirsiniz.

> **İçerik değerlerine erişim:**
>
> - İlkel string değeri almak için `.raw` kullanın (reaktif değil)
> - Reaktif değeri almak için `.value` kullanın
> - Görsel Editör desteği için `<content.key />` bileşen sözdizimini kullanın

İlgili içerik bildirimi oluşturun:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Hakkımızda - Şirketim",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Şirketimiz ve misyonumuz hakkında daha fazla bilgi edinin",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Hakkımızda",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión",
        "tr": "Şirketimiz ve misyonumuz hakkında daha fazla bilgi edinin"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "tr": "Hakkımızda"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Navigasyonlu Bir Layout Oluşturun" isOptional={true}>

Nuxt layout'ları, sayfalarınız için ortak bir yapı tanımlamanıza olanak tanır. Dil değiştirici ve navigasyonu içeren varsayılan bir layout oluşturun:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Ana Sayfa</Links>
    <Links href="/about">Hakkında</Links>
  </div>
</template>
```

`Links` bileşeni (aşağıda gösterilmiştir), dahili navigasyon bağlantılarının otomatik olarak yerelleştirilmesini sağlar.

</Step>

</Steps>

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna commit edilmesini önler.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları göz ardı et
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **Otomatik tamamlama**.
- Eksik çeviriler için **Gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **Satır içi önizlemeleri**.
- Çevirileri kolayca oluşturup güncellemek için **Hızlı işlemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

---

### Daha İleri Gitmek

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.
