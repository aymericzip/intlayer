---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Nuxt ve Vue uygulamanızı nasıl çevirirsiniz – i18n rehberi 2026
description: Nuxt ve Vue web sitenizi çok dilli hale nasıl getireceğinizi keşfedin. Uluslararasılaştırma (i18n) ve çeviri için dokümantasyonu takip edin.
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
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: LocaleSwitcher, SEO, metadata güncellendi
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer kullanarak Nuxt ve Vue web sitenizi çevirin | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde deklaratif sözlükler kullanarak çevirileri kolayca yönetin.**
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlayarak otomatik tamamlama ve hata tespitini geliştirin.**
- **Dinamik dil algılama ve değiştirme gibi gelişmiş özelliklerden faydalanın.**

---

## Nuxt Uygulamasında Intlayer Kurulumu Adım Adım Rehber

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Nuxt ve Vue uygulamanızı Intlayer kullanarak nasıl çevirirsiniz? Intlayer'ı keşfedin" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer kullanarak uygulamanızı nasıl uluslararasılaştırırsınız"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub'da [Uygulama Şablonunu](https://github.com/aymericzip/intlayer-nuxt-4-template) inceleyin.

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bunx intlayer init
```

- **intlayer**

  Konfigürasyon yönetimi, çeviri, [içerik beyanı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **vue-intlayer**
  Intlayer'ı Vue uygulamasıyla entegre eden paket. Vue bileşenleri için composables sağlar.

- **nuxt-intlayer**
  Nuxt uygulamalarıyla Intlayer'ı entegre eden Nuxt modülü. Otomatik kurulum, yerel algılama için middleware, çerez yönetimi ve URL yönlendirmesi sağlar.

### Adım 2: Projenizin yapılandırması

Uygulamanızın dillerini yapılandırmak için bir konfigürasyon dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, middleware yönlendirmesini, çerez isimlerini, içerik bildirimlerinizin konumunu ve uzantısını ayarlayabilir, Intlayer loglarını konsolda devre dışı bırakabilir ve daha fazlasını yapabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

### Adım 3: Intlayer'ı Nuxt Yapılandırmanıza Entegre Edin

Intlayer modülünü Nuxt yapılandırmanıza ekleyin:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Mevcut Nuxt yapılandırmanız
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` modülü, Intlayer'ın Nuxt ile entegrasyonunu otomatik olarak yönetir. İçerik bildirimlerinin oluşturulmasını ayarlar, geliştirme modunda dosyaları izler, yerel tespit için middleware sağlar ve yerelleştirilmiş yönlendirmeyi yönetir.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
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

> İçerik bildirimleriniz, uygulamanızın herhangi bir yerinde tanımlanabilir, yeter ki `contentDir` dizini içinde yer alsın (varsayılan olarak `./src`). Ve içerik bildirim dosya uzantısıyla eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakınız.

### Adım 5: Intlayer'ı Kodunuzda Kullanın

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

### (İsteğe Bağlı) Adım 6: İçeriğinizin dilini değiştirin

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

### (İsteğe Bağlı) Adım 6b: Navigasyonlu Bir Layout Oluşturun

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

### (İsteğe Bağlı) Adım 7: Uygulamanıza yerelleştirilmiş Yönlendirme ekleyin

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

### (İsteğe Bağlı) Adım 8: Yerelleştirilmiş Bir Link Bileşeni Oluşturma

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

### (İsteğe Bağlı) Adım 9: Meta Verileri ve SEO'yu Yönetme

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "Hakkımızda - Şirketim",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

module.exports = aboutPageContent;
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
