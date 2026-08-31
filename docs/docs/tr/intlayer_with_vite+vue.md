---
createdAt: 2025-09-07
updatedAt: 2026-06-23
title: "Vite + Vue i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Vite + Vue uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer kullanarak Vite ve Vue web sitenizi çevirme | Uluslararasılaştırma (i18n)

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

'vue-i18n' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Vue kapsamı">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **reaktif çeviriler** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Vue ile mükemmel çalışacak şekilde optimize edilmiştir.

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

## Vite ve Vue Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-vite-vue-template)'na bakın.

<Steps>

<Step number={1} title="Bağımlılıkları Kurma">

Gerekli paketleri npm kullanarak kurun:

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
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **vue-intlayer**
  Vue uygulamasıyla Intlayer'ı entegre eden paket. Vue uluslararasılaştırması için bağlam sağlayıcıları ve composables sağlar.

- **vite-intlayer**
  [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesi yapmak için middleware'i içerir.

</Step>

<Step number={2} title="Projenizi Yapılandırma">

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

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, middleware yönlendirmesini, çerez adlarını, içerik bildiriminizin konumunu ve uzantısını, Intlayer günlüklerini konsolda devre dışı bırakmayı ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

</Step>

<Step number={3} title="Intlayer'ı Vite Yapılandırmanıza Entegre Etme">

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Vite ile Intlayer'ı entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Ayrıca Intlayer ortam değişkenlerini Vite uygulaması içinde tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

</Step>

<Step number={4} title="İçeriğinizi Bildirin">

Çevirileri depolamak için içerik bildiriminizi oluşturun ve yönetin:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> İçerik bildiriminiz uygulamanızın herhangi bir yerine yerleştirilebilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak `./src`). Ve içerik bildirimi dosya uzantısı ile eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

</Step>

<Step number={5} title="Kodunuzda Intlayer'ı Kullanın">

Vue uygulamanız boyunca Intlayer'ın uluslararasılaştırma özelliklerine erişmek için, ana dosyanızda Intlayer singleton örneğini kaydetmeniz gerekir. Bu adım, çevirilerin bileşen ağacınızın herhangi bir yerinde erişilebilir olmasını sağlamak için çok önemlidir.

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Üst düzeyde sağlayıcıyı enjekte edin
app.use(intlayer);

// Uygulamayı bağlayın
app.mount("#app");
```

> Ayrıca, isterseniz `installIntlayer(app)` işlevini doğrudan bir işlev olarak çağırabilirsiniz:
>
> ```javascript
> import { intlayer } from "vue-intlayer";
> app.use(intlayer);
> ```

İçerik sözlüklerinize uygulamanız boyunca erişin ve `useIntlayer` composables kullanarak bir ana Vue bileşeni oluşturun:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

> Uygulamanız zaten mevcutsa, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) ve [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) kullanarak binlerce bileşeni saniyeler içinde dönüştürebilirsiniz.

#### Intlayer'da İçeriğe Erişim

Intlayer, içeriğinize erişmek için farklı API'ler sunar:

- **Bileşen tabanlı sözdizimi** (önerilen):
  İçeriği Intlayer Düğümü olarak işlemek için `<myContent />` veya `<Component :is="myContent" />` sözdizimini kullanın. Bu, [Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) ve [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) ile sorunsuz bir şekilde entegre olur.

- **Dize tabanlı sözdizimi**:
  İçeriği düz metin olarak işlemek için `{{ myContent }}` kullanın, Görsel Düzenleyici desteği olmadan.

- **Ham HTML sözdizimi**:
  İçeriği ham HTML olarak işlemek için `<div v-html="myContent" />` kullanın, Görsel Düzenleyici desteği olmadan.

- **Yıkım sözdizimi**:
  `useIntlayer` composable, içeriği erişirken reaktifliği koruyan bir Proxy döndürür.
  - `const content = useIntlayer("myContent");` Ve `{{ content.myContent }}` / `<content.myContent />` kullanın.
  - Veya `const { myContent } = useIntlayer("myContent");` Ve `{{ myContent}}` / `<myContent/>` kullanarak içeriği yıkın.

</Step>

<Step number={6} title="İçeriğinizin Dilini Değiştirin" isOptional={true}>

İçeriğinizin dilini değiştirmek için `useLocale` composable tarafından sağlanan `setLocale` işlevini kullanabilirsiniz. Bu işlev, uygulamanın yerel ayarını ayarlamanıza ve içeriği buna göre güncellemenize olanak tanır.

Dilleri değiştirmek için bir bileşen oluşturun:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// Yerel ayar bilgilerini ve setLocale işlevini alın
const { locale, availableLocales, setLocale } = useLocale();

// Seçilen yerel ayarı bir ref ile takip edin
const selectedLocale = ref(locale.value);

// Seçim değiştiğinde yerel ayarı güncelleyin
const changeLocale = () => setLocale(selectedLocale.value);

// Seçilen yerel ayarı genel yerel ayar ile senkronize tutun
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Ardından, bu bileşeni App.vue'nuzda kullanın:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // İlgili intlayer bildirim dosyası oluşturun
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

</Step>

<Step number={7} title="Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin" isOptional={true}>

Vue uygulamasında yerelleştirilmiş yönlendirme eklemek genellikle yerel ayar önekleriyle Vue Router kullanmayı içerir. Bu, her dil için benzersiz rotalar oluşturur, SEO ve SEO dostu URL'ler için kullanışlıdır.
Örnek:

Please provide:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Öncelikle Vue Router'ı kurun:

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

Ardından, yerel ayar tabanlı yönlendirmeyi yöneten bir yönlendirici yapılandırması oluşturun:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from "vue-intlayer";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * Yerel ayar özel yollarla ve meta verilerle rotaları bildirin.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// Yönlendirici örneğini oluştur
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Yerel ayar yönetimi için navigasyon koruması ekleyin
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Rota meta'sında tanımlanan yerel ayarı yeniden kullan
  client.setLocale(metaLocale);
  next();
});
```

> Ad, tüm rotalar arasında benzersiz olmalı ve çakışmaları önlemek için yönlendirme ve bağlantıyı sağlamak için kullanılır.

Ardından, yönlendiriciyi main.js dosyanızda kaydedin:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Uygulamaya yönlendiriciyi ekleyin
app.use(router);

// Uygulamayı bağlayın
app.mount("#app");
```

Ardından, RouterView bileşenini işlemek için App.vue dosyanızı güncelleyin. Bu bileşen, geçerli rota için eşleşen bileşeni görüntüler.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

Paralel olarak, uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerProxy`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiç yerel ayar belirtilmezse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiç yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirir.

> Not: Üretimde `intlayerProxy`'i kullanmak için `vite-intlayer` paketini `devDependencies`'den `dependencies`'e taşımalısınız.

> Intlayer v9 sürümünden itibaren, `intlayerProxy()` doğrudan `intlayer()` eklentisine paketlenmiş ve `routing.enableProxy` seçeneği (`true` varsayılan olarak) aracılığıyla varsayılan olarak etkinleştirilmiştir. Aşağıda gösterildiği gibi ayrı olarak kaydettirmek artık isteğe bağlıdır — geriye uyumluluk ve eklenti sırasını kontrol etmesi gereken kurulumlar için tutulmuştur. Devre dışı bırakmak için `routing.enableProxy: false` olarak ayarlayın. [v9 sürüm notlarına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) bakın.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="Yerel ayar değiştiğinde URL'yi değiştirin" isOptional={true}>

Kullanıcı dili değiştirdiğinde URL'yi otomatik olarak güncellemek için `LocaleSwitcher` bileşenini Vue Router kullanacak şekilde değiştirebilirsiniz:

```vue fileName="src/components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Vue Router'ı alın
const router = useRouter();

// Yerel ayar bilgilerini ve setLocale işlevini alın
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Geçerli rotayı alın ve yerelleştirilmiş bir URL oluşturun
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Sayfayı yeniden yüklemeden yerelleştirilmiş rotaya gidin
    router.push(localizedPath);
  },
});

// Seçilen yerel ayarı bir ref ile takip edin
const selectedLocale = ref(locale.value);

// Seçim değiştiğinde yerel ayarı güncelleyin
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Seçilen yerel ayarı genel yerel ayar ile senkronize tutun
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

İpucu: Daha iyi SEO ve erişilebilirlik için, dil özel sayfalarına bağlanmak üzere `<a href="/fr/home" hreflang="fr">` gibi etiketleri kullanın. Bu, arama motorlarının dil özel URL'lerini keşfetmesine ve uygun şekilde indekslemesine olanak tanır. SPA davranışını korumak için varsayılan navigasyonu @click.prevent ile önleyin, useLocale ile yerel ayarı değiştirin ve Vue Router kullanarak programatik olarak gidin.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>English</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

</Step>

<Step number={9} title="HTML Dil ve Yön Niteliklerini Değiştirin" isOptional={true}>

Uygulamanız birden fazla dili desteklediğinde, `<html>` etiketinin `lang` ve `dir` niteliklerini geçerli yerel ayar ile eşleşecek şekilde güncellemek önemlidir. Bunu yapmak şunları sağlar:

- **Erişilebilirlik**: Ekran okuyucular ve yardımcı teknolojiler, içeriği doğru şekilde telaffuz etmek ve yorumlamak için doğru `lang` niteliğine güvenir.
- **Metin İşleme**: `dir` (yön) niteliği, metnin doğru sırada işlenmesini sağlar (örneğin, İngilizce için soldan sağa, Arapça veya İbranice için sağdan sola), okunabilirlik için gereklidir.
- **SEO**: Arama motorları, sayfanızın dilini belirlemek için `lang` niteliğini kullanır, arama sonuçlarında doğru yerelleştirilmiş içeriği sunmaya yardımcı olur.

Yerel ayar değiştiğinde bu nitelikleri dinamik olarak güncellemek, tüm desteklenen diller için tutarlı ve erişilebilir bir deneyim sağlar.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Geçerli yerel ayara göre HTML <html> etiketinin `lang` ve `dir` niteliklerini günceller.
 *
 * @example
 * // App.vue'nuzda veya genel bir bileşende
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Yerel ayar değiştiğinde HTML niteliklerini güncelleyin
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Dil niteliğini güncelleyin
      document.documentElement.lang = newLocale;

      // Metin yönünü ayarlayın (çoğu dil için ltr, Arapça, İbranice vb. için rtl)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Bu composable'ı App.vue'nuzda veya genel bir bileşende kullanın:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Geçerli yerel ayara göre HTML niteliklerini uygulayın
useI18nHTMLAttributes();
</script>

<template>
  <!-- Uygulama şablonunuz -->
</template>
```

</Step>

<Step number={10} title="Yerelleştirilmiş Bağlantı Bileşeni Oluşturun" isOptional={true}>

Uygulamanızın navigasyonunun geçerli yerel ayarı saygı gösterdiğinden emin olmak için özel bir `Link` bileşeni oluşturabilirsiniz. Bu bileşen, dahili URL'leri otomatik olarak geçerli dille önekler, böylece. Örneğin, bir Fransızca konuşan kullanıcı "Hakkında" sayfasına giden bir bağlantıya tıkladığında, `/about` yerine `/fr/about`'a yönlendirilir.

Bu davranış çeşitli nedenlerle kullanışlıdır:

- **SEO ve Kullanıcı Deneyimi**: Yerelleştirilmiş URL'ler, arama motorlarının dil özel sayfalarını doğru şekilde indekslemesine yardımcı olur ve kullanıcılara tercih ettikleri dilde içerik sunar.
- **Tutarlılık**: Uygulamanız boyunca yerelleştirilmiş bir bağlantı kullanarak, navigasyonun aynı yerel ayar bağlamında kalmasını garanti edersiniz, beklenmedik dil anahtarlarını önlersiniz.
- **Bakım Kolaylığı**: URL mantığını tek bir bileşende merkezileştirmek, yönetimini basitleştirir, uygulamanız büyüdükçe kod tabanınızı daha kolay yönetilebilir hale getirir.

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Bağlantının harici olup olmadığını kontrol edin
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Dahili bağlantılar için yerelleştirilmiş bir href oluşturun
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Vue Router ile kullanmak için yönlendiriciye özel bir sürüm oluşturun:

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// Router-link için yerelleştirilmiş to-prop oluşturun
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // 'to' bir nesne ise, yol özelliğini yerelleştirin
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Uygulamanızda bu bileşenleri kullanın:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Kök</RouterLink>
    <RouterLink to="/home">Ana Sayfa</RouterLink>
    <!-- Diğer -->
    <Link href="/">Kök</Link>
    <Link href="/home">Ana Sayfa</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

</Step>

<Step number={11} title="Bileşenlerinizin içeriğini çıkarın" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

### (İsteğe bağlı) Sitemap ve robots.txt (build zamanı üretimi)

Intlayer, `generateSitemap` ve `getMultilingualUrls` ile tarayıcılar için çok dilli `sitemap.xml` ve `robots.txt` üretip bunları `public/` klasörüne otomatik yazmanıza yardımcı olur. Genelde Vite’tan **önce** küçük bir Node betiği çalıştırılır (ör. npm `predev` / `prebuild` kancaları).

#### Sitemap

Intlayer sitemap oluşturucusu yerel ayarlarınıza uyar ve tarayıcılar için metadata ekler.

> Üretilen sitemap `xhtml:link` (hreflang) ad alanını destekler. Düz URL listesi yerine, her sayfanın tüm dil sürümleri çift yönlü bağlanır (ör. `/about`, `/fr/about` veya `/about?lang=fr` - yönlendirme moduna bağlı).

#### Robots.txt

`getMultilingualUrls` kullanarak `Disallow` kurallarının hassas yolların tüm yerelleştirilmiş varyantlarını kapsamasını sağlayın.

#### 1. Proje köküne `generate-seo.mjs` ekleyin

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Betik `intlayer` içe aktarabilmeli; paket kurulu olmalı. Üretimde ortam değişkeni `SITE_URL` ayarlayın (ör. CI).

> Node ESM için `generate-seo.mjs` tercih edin. `generate-seo.js` kullanıyorsanız `package.json` içinde `"type": "module"` veya ESM’yi başka şekilde etkinleştirin.

#### 2. Betiği Vite’tan önce çalıştırın

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm veya yarn kullanıyorsanız komutları uyarlayın. CI’dan da çağrılabilir.

### TypeScript'ı Yapılandırın

Intlayer, TypeScript'in avantajlarından yararlanmak ve codebase'inizi daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript yapılandırmanızın otomatik olarak oluşturulan türleri (types) içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil edin
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların yoksayılması önerilir. Bu, bu dosyaların Git deponuza commit edilmesini önlemenizi sağlar.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext fileName=".gitignore"
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için resmi **Intlayer VS Code Uzantısını** yükleyebilirsiniz.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- Çeviri anahtarları için **otomatik tamamlama**.
- Eksik çeviriler için **gerçek zamanlı hata tespiti**.
- Çevrilmiş içeriğin **satır içi önizlemeleri**.
- Çevirileri kolayca oluşturmak ve güncellemek için **hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı belgelerine](https://intlayer.org/tr/doc/vs-code-extension) bakın.

---

### Daha Fazla İlerle

Daha ileri gitmek için [görsel düzenleyiciyi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.

Once you provide these blocks with their content, I'll perform the audit and return the fully updated Turkish translation following all the instructions you've outlined.---

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Vue uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

- **`vue-i18n`**: küresel olarak kayıtlı mesaj kataloglarına sahip standart kütüphane.
- **`Intlayer`**: bileşen yanında bildirim, Vite eklentisi ile derleme zamanı derlemesi, tam TypeScript tipleri, AI çeviri ve görsel düzenleyici sunan modern çözüm.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) ve [Vue i18n kıyaslaması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/vue.md).

</Question>

<Question title="i18n Vue paket boyutuma ne kadar ekler?">

Ad alanı tabanlı bir yapılandırmaya kıyasla çok daha az, çünkü bir sayfa render etmediği bir kataloğu asla indirmez. Derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük girişleriyle değiştirir ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Intlayer paket boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="vue-i18n'den bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet. [vue-i18n geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_vue-i18n_to_intlayer.md) ile içeriği kademeli olarak taşıyabilir veya uyumluluk adaptörleri ile mevcut API'nizi koruyabilirsiniz.

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

<Question title="Intlayer, Vue Composition API ve script setup ile çalışır mı?">

Evet. `useIntlayer`, `<script setup>` içinde kullanılan standart bir composable'dır ve dönen içerik reaktiftir, bu nedenle yereli değiştirmek sayfayı yeniden yüklemeden onu okuyan bileşenleri günceller.

</Question>

<Question title="Vue SPA'da yerelleştirilmiş yönlendirmeyi nasıl kurarım?">

Vue Router ile rotalarınızda bir yerel parametresi yapılandırın veya bir arama parametresi kullanın; Intlayer aktif yereli URL ile senkronize tutar. Bkz. [yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md).

</Question>

<Question title="Sağdan sola diller için html lang ve dir özelliklerini nasıl ayarlarım?">

Adım 9 bunu kapsar. `getHTMLTextDir` Arapça ve İbranice gibi diller için `rtl` döndürür, böylece aktif yerelden kök öğede `lang` ve `dir` bağlayabilirsiniz.

</Question>

<Question title="Vue uygulamasını AI ile otomatik olarak nasıl çeviririm?">

`npx intlayer fill` komutunu çalıştırın. Eksik çevirileri seçtiğiniz LLM ile tamamlar ve `--git-diff` işlemi daldaki değişikliklerle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md).

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
