---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Vite and Vue uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Vite ve Vue web sitenizi çok dilli hale getirmeyi öğrenin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) ve çevirisini yapın.
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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Vite and Vue çevirin | Uluslararasılaştırma (i18n)

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-vite-vue-template)'na bakın.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde açıklayıcı sözlükler kullanarak çevirileri kolayca yönetin**.
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**, böylece otomatik tamamlama ve hata algılama iyileşir.
- **Dinamik yerel ayar algılama ve anahtarlama gibi gelişmiş özelliklerden yararlanın**.

---

## Vite ve Vue Uygulamasında Intlayer Kurulumu İçin Adım Adım Kılavuz

### Adım 1: Bağımlılıkları Kurma

Gerekli paketleri npm kullanarak kurun:

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

- **intlayer**

  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), dönüştürme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan çekirdek paket.

- **vue-intlayer**
  Vue uygulamasıyla Intlayer'ı entegre eden paket. Vue uluslararasılaştırması için bağlam sağlayıcıları ve composables sağlar.

- **vite-intlayer**
  [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini ve kullanıcının tercih ettiği yerel ayarı algılamak, çerezleri yönetmek ve URL yönlendirmesi yapmak için middleware'i içerir.

### Adım 2: Projenizi Yapılandırma

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'leri, middleware yönlendirmesini, çerez adlarını, içerik bildiriminizin konumunu ve uzantısını, Intlayer günlüklerini konsolda devre dışı bırakmayı ve daha fazlasını ayarlayabilirsiniz. Kullanılabilir parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

### Adım 3: Intlayer'ı Vite Yapılandırmanıza Entegre Etme

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer()],
});
```

> `intlayer()` Vite eklentisi, Vite ile Intlayer'ı entegre etmek için kullanılır. İçerik bildirimi dosyalarının oluşturulmasını sağlar ve bunları geliştirme modunda izler. Ayrıca Intlayer ortam değişkenlerini Vite uygulaması içinde tanımlar. Ek olarak, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildiriminizi oluşturun ve yönetin:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
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
};

module.exports = appContent;
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

> İçerik bildiriminiz uygulamanızın herhangi bir yerine yerleştirilebilir, yeter ki `contentDir` dizinine dahil edilsin (varsayılan olarak `./src`). Ve içerik bildirimi dosya uzantısı ile eşleşsin (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla ayrıntı için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

### Adım 5: Kodunuzda Intlayer'ı Kullanın

Vue uygulamanız boyunca Intlayer'ın uluslararasılaştırma özelliklerine erişmek için, ana dosyanızda Intlayer singleton örneğini kaydetmeniz gerekir. Bu adım, çevirilerin bileşen ağacınızın herhangi bir yerinde erişilebilir olmasını sağlamak için çok önemlidir.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Üst düzeyde sağlayıcıyı enjekte edin
installIntlayer(app);

// Uygulamayı bağlayın
app.mount("#app");
```

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

### (İsteğe Bağlı) Adım 6: İçeriğinizin Dilini Değiştirin

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

### (İsteğe Bağlı) Adım 7: Uygulamanıza Yerelleştirilmiş Yönlendirme Ekleyin

Vue uygulamasında yerelleştirilmiş yönlendirme eklemek genellikle yerel ayar önekleriyle Vue Router kullanmayı içerir. Bu, her dil için benzersiz rotalar oluşturur, SEO ve SEO dostu URL'ler için kullanışlıdır.
Örnek:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Öncelikle Vue Router'ı kurun:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Ardından, yerel ayar tabanlı yönlendirmeyi yöneten bir yönlendirici yapılandırması oluşturun:

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// Uluslararasılaştırma yapılandırmasını çıkar
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Yerel ayar özel yollarla ve meta verilerle rotaları bildirin.
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
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

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Rota meta'sında tanımlanan yerel ayarı yeniden kullan
    client.setLocale(metaLocale);
    next();
  } else {
    // Geri dönüş: meta'da yerel ayar yok, muhtemelen eşleşmeyen rota
    // İsteğe bağlı: 404'ü yönetin veya varsayılan yerel ayara yönlendirin
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
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

Paralel olarak, uygulamanıza sunucu tarafı yönlendirme eklemek için `intlayerMiddleware`'i de kullanabilirsiniz. Bu eklenti, URL'ye göre geçerli yerel ayarı otomatik olarak algılar ve uygun yerel ayar çerezini ayarlar. Hiç yerel ayar belirtilmezse, eklenti kullanıcının tarayıcı dil tercihlerine göre en uygun yerel ayarı belirler. Hiç yerel ayar algılanmazsa, varsayılan yerel ayara yönlendirir.

> Not: Üretimde `intlayerMiddleware`'i kullanmak için `vite-intlayer` paketini `devDependencies`'den `dependencies`'e taşımalısınız.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

### (İsteğe Bağlı) Adım 8: Yerel ayar değiştiğinde URL'yi değiştirin

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
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
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

### (İsteğe Bağlı) Adım 9: HTML Dil ve Yön Niteliklerini Değiştirin

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

### (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı Bileşeni Oluşturun

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

### (İsteğe Bağlı) Adım 11: Markdown İşleyin

Intlayer, Vue uygulamanızda Markdown içeriğini doğrudan işleme desteği sağlar. Varsayılan olarak, Markdown düz metin olarak kabul edilir. Markdown'ı zengin HTML'ye dönüştürmek için [markdown-it](https://github.com/markdown-it/markdown-it), bir Markdown ayrıştırıcısı entegre edebilirsiniz.

Bu, çevirileriniz listeler, bağlantılar veya vurgu gibi biçimlendirilmiş içerik içerdiğinde özellikle kullanışlıdır.

Varsayılan olarak Intlayer markdown'ı dize olarak işler. Ancak Intlayer, markdown'ı HTML'ye dönüştürmek için `installIntlayerMarkdown` işlevini kullanarak markdown'ı işleme konusunda bir yol sağlar.

> Markdown içeriğini `intlayer` paketi kullanarak nasıl bildireceğinizi görmek için [markdown dokümantasyonuna](https://github.com/aymericzip/intlayer/tree/main/docs/en/dictionary/markdown.md) bakın.

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // HTML etiketlerine izin ver
  linkify: true, // URL'leri otomatik olarak bağla
  typographer: true, // Akıllı tırnaklar, tireler vb. etkinleştir
});

// Intlayer'a markdown'ı HTML'ye dönüştürmesi gerektiğinde md.render() kullanmasını söyle
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Kaydedildikten sonra, bileşen tabanlı sözdizimini kullanarak Markdown içeriğini doğrudan görüntüleyebilirsiniz:

```vue
<template>
  <div>
    <myMarkdownContent />
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myMarkdownContent } = useIntlayer("my-component");
</script>
```

### TypeScript Yapılandırın

Intlayer, modül genişletmesi kullanarak TypeScript avantajlarından yararlanır.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Otomatik oluşturulan türleri TypeScript yapılandırmanıza dahil edin.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaları Git deponuza kaydetmekten kaçınmak için bunları yok saymanız önerilir. Bu, bunları Git deponuza kaydetmekten kaçınmanıza olanak tanır.

Bunu yapmak için `.gitignore` dosyanıza aşağıdaki talimatları ekleyin:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı kurun.

[VS Code Marketplace'ten yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantıyı kullanma hakkında daha fazla ayrıntı için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

### Daha Fazla İlerle

Daha fazla ilerlemek için [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) kullanarak dışa aktarmayı uygulayabilirsiniz.

---
