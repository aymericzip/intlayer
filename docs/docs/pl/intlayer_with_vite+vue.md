---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Jak przetłumaczyć swoją aplikację Vite i Vue – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Vite i Vue wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
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
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Vite i Vue za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source’owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Vite i Vue

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-vue-template?embed=1&ctl=1&file=intlayer.config.ts"
Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-vite-vue-template) na GitHub.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

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

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **vue-intlayer**
  Pakiet integrujący Intlayer z aplikacją Vue. Zapewnia dostawców kontekstu oraz composables do internacjonalizacji w Vue.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Konfiguracja Twojego projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
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
      // Twoje pozostałe lokalizacje
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
      // Twoje pozostałe lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w swojej konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji.

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

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

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
    checkOut: t({
      pl: "Sprawdź ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      pl: ", oficjalny starter Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pl: "Dowiedz się więcej o wsparciu IDE dla Vue w ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pl: "Przewodnik skalowania dokumentacji Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pl: "Kliknij na loga Vite i Vue, aby dowiedzieć się więcej",
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
    count: t({
      pl: "licznik to ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      pl: "Edytuj <code>components/HelloWorld.vue</code> i zapisz, aby przetestować HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      pl: "Sprawdź ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      pl: "oficjalny starter Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pl: "Dowiedz się więcej o wsparciu IDE dla Vue w ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pl: "Przewodnik skalowania dokumentacji Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pl: "Kliknij na loga Vite i Vue, aby dowiedzieć się więcej",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      pl: "Kliknij na logotypy Vite i Vue, aby dowiedzieć się więcej",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "helloworld",
  content: {
    count: t({
      pl: "licznik to ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      pl: "Edytuj <code>components/HelloWorld.vue</code> i zapisz, aby przetestować HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      pl: "Sprawdź ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      pl: "oficjalny starter Vue + Vite",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      pl: "Dowiedz się więcej o wsparciu IDE dla Vue w ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      pl: "Przewodnik skalowania dokumentacji Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      pl: "Kliknij na logotypy Vite i Vue, aby dowiedzieć się więcej",
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
        "pl": "liczba to ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "pl": "Edytuj <code>components/HelloWorld.vue</code> i zapisz, aby przetestować HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "pl": "Sprawdź ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "pl": "oficjalny starter Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "pl": "Dowiedz się więcej o wsparciu IDE dla Vue w ",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "pl": "Przewodnik po skalowaniu Vue Docs",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "pl": "Kliknij na loga Vite i Vue, aby dowiedzieć się więcej",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). Muszą również odpowiadać rozszerzeniu pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Aby wykorzystać funkcje internacjonalizacji Intlayer w całej aplikacji Vue, najpierw musisz zarejestrować instancję singleton Intlayer w swoim głównym pliku. Ten krok jest kluczowy, ponieważ dostarcza kontekst internacjonalizacji wszystkim komponentom w aplikacji, umożliwiając dostęp do tłumaczeń w dowolnym miejscu w drzewie komponentów.

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Wstrzyknij providera na najwyższym poziomie
installIntlayer(app);

// Zamontuj aplikację
app.mount("#app");
```

Uzyskaj dostęp do swoich słowników treści w całej aplikacji, tworząc główny komponent Vue i używając kompozycji `useIntlayer`:

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

#### Dostęp do treści w Intlayer

Intlayer oferuje różne API do dostępu do Twojej treści:

- **Składnia oparta na komponentach** (zalecana):
  Użyj składni `<myContent />` lub `<Component :is="myContent" />`, aby wyrenderować treść jako węzeł Intlayer. Integruje się to bezproblemowo z [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

- **Składnia oparta na łańcuchu znaków**:
  Użyj `{{ myContent }}`, aby wyrenderować treść jako zwykły tekst, bez wsparcia Visual Editor.

- **Składnia surowego HTML**:
  Użyj `<div v-html="myContent" />`, aby renderować zawartość jako surowy HTML, bez wsparcia Visual Editora.

- **Składnia destrukturyzacji**:
  Kompozycja `useIntlayer` zwraca Proxy z zawartością. Ten proxy można destrukturyzować, aby uzyskać dostęp do zawartości, zachowując reaktywność.
  - Użyj `const content = useIntlayer("myContent");` oraz `{{ content.myContent }}` / `<content.myContent />`.
  - Lub użyj `const { myContent } = useIntlayer("myContent");` oraz `{{ myContent }}` / `<myContent/>`, aby destrukturyzować zawartość.

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez kompozycję `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

Utwórz komponent do przełączania między językami:

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

// Pobierz informacje o lokalizacji oraz funkcję setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Śledź wybraną lokalizację za pomocą ref
const selectedLocale = ref(locale.value);

// Aktualizuj lokalizację, gdy zmieni się wybór
const changeLocale = () => setLocale(selectedLocale.value);

// Synchronizuj selectedLocale z globalnym locale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Następnie użyj tego komponentu w swoim pliku App.vue:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // Utwórz powiązany plik deklaracji intlayer
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

### (Opcjonalny) Krok 7: Dodaj lokalizowane routowanie do swojej aplikacji

Dodanie lokalizowanego routingu w aplikacji Vue zazwyczaj polega na użyciu Vue Router z prefiksami lokalizacji. Tworzy to unikalne ścieżki dla każdego języka, co jest przydatne dla SEO i przyjaznych dla SEO adresów URL.

Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Najpierw zainstaluj Vue Router:

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

Następnie utwórz konfigurację routera, która obsługuje routing oparty na lokalizacji:

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

// Pobierz konfigurację internacjonalizacji
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * Zadeklaruj trasy z lokalizowanymi ścieżkami i metadanymi.
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

// Utwórz instancję routera
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Dodaj strażnika nawigacji do obsługi lokalizacji
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // Ponowne użycie lokalizacji zdefiniowanej w meta trasy
    client.setLocale(metaLocale);
    next();
  } else {
    // Domyślne zachowanie: brak lokalizacji w meta, możliwa nieznaleziona trasa
    // Opcjonalnie: obsłuż 404 lub przekieruj do domyślnej lokalizacji
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> Nazwa jest używana do identyfikacji trasy w routerze. Powinna być unikalna wśród wszystkich tras, aby uniknąć konfliktów oraz zapewnić prawidłową nawigację i linkowanie.

Następnie zarejestruj router w pliku main.js:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// Dodaj router do aplikacji
app.use(router);

// Zamontuj aplikację
app.mount("#app");
```

Następnie zaktualizuj plik `App.vue`, aby renderować komponent RouterView. Ten komponent wyświetli dopasowany komponent dla bieżącej ścieżki.

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

Równolegle możesz również użyć `intlayerMiddleware`, aby dodać routowanie po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje bieżący język na podstawie URL i ustawi odpowiedni cookie językowy. Jeśli nie zostanie określony żaden język, plugin wybierze najbardziej odpowiedni język na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Zauważ, że aby używać `intlayerMiddleware` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

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

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayer(), intlayerMiddleware()],
});
```

### (Opcjonalny) Krok 8: Zmiana URL po zmianie lokalizacji

Aby automatycznie aktualizować URL po zmianie języka przez użytkownika, możesz zmodyfikować komponent `LocaleSwitcher`, aby korzystał z Vue Router:

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

// Pobierz Vue Router
const router = useRouter();

// Pobierz informacje o lokalizacji oraz funkcję setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Pobierz bieżącą trasę i utwórz zlokalizowany URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Przejdź do zlokalizowanej trasy bez przeładowania strony
    router.push(localizedPath);
  },
});

// Śledź wybraną lokalizację za pomocą ref
const selectedLocale = ref(locale.value);

// Aktualizuj lokalizację, gdy zmieni się wybór
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Synchronizuj selectedLocale z globalną lokalizacją
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

Wskazówka: Dla lepszego SEO i dostępności używaj tagów takich jak `<a href="/fr/home" hreflang="fr">` do linkowania do stron zlokalizowanych, jak pokazano w Kroku 10. Pozwala to wyszukiwarkom na prawidłowe wykrywanie i indeksowanie adresów URL specyficznych dla języka. Aby zachować zachowanie SPA, możesz zapobiec domyślnej nawigacji za pomocą @click.prevent, zmienić lokalizację używając useLocale oraz programowo nawigować za pomocą Vue Router.

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="Przełącz na angielski"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>Angielski</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Przełącz na hiszpański"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Hiszpański</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### (Opcjonalny) Krok 9: Zmień atrybuty języka i kierunku w tagu HTML

Gdy Twoja aplikacja obsługuje wiele języków, niezwykle ważne jest, aby zaktualizować atrybuty `lang` i `dir` znacznika `<html>`, tak aby odpowiadały aktualnej lokalizacji. Zapewnia to:

- **Dostępność**: Czytniki ekranu i technologie wspomagające polegają na poprawnym atrybucie `lang`, aby prawidłowo wymawiać i interpretować zawartość.
- **Renderowanie tekstu**: Atrybut `dir` (kierunek) zapewnia, że tekst jest wyświetlany w odpowiedniej kolejności (np. od lewej do prawej dla angielskiego, od prawej do lewej dla arabskiego lub hebrajskiego), co jest kluczowe dla czytelności.
- **SEO**: Wyszukiwarki używają atrybutu `lang`, aby określić język Twojej strony, co pomaga w wyświetlaniu odpowiednio zlokalizowanych treści w wynikach wyszukiwania.

Aktualizując te atrybuty dynamicznie przy każdej zmianie lokalizacji, zapewniasz spójne i dostępne doświadczenie dla użytkowników we wszystkich obsługiwanych językach.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable, który aktualizuje atrybuty `lang` i `dir` elementu HTML <html>
 * na podstawie aktualnej lokalizacji.
 *
 * @example
 * // W Twoim pliku App.vue lub globalnym komponencie
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // Aktualizuj atrybuty HTML za każdym razem, gdy zmienia się lokalizacja
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // Aktualizuj atrybut języka
      document.documentElement.lang = newLocale;

      // Ustaw kierunek tekstu (ltr dla większości języków, rtl dla arabskiego, hebrajskiego itd.)
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

Użyj tego composable w swoim `App.vue` lub globalnym komponencie:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// Zastosuj atrybuty HTML na podstawie aktualnej lokalizacji
useI18nHTMLAttributes();
</script>

<template>
  <!-- Szablon Twojej aplikacji -->
</template>
```

### (Opcjonalny) Krok 10: Tworzenie lokalizowanego komponentu Link

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje aktualny język, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie dodaje przedrostek z aktualnym językiem do wewnętrznych adresów URL. Na przykład, gdy użytkownik mówiący po francusku kliknie link do strony "About", zostanie przekierowany na `/fr/about` zamiast na `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczać użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając z lokalizowanego linku w całej aplikacji, zapewniasz, że nawigacja pozostaje w obrębie aktualnego języka, zapobiegając nieoczekiwanym zmianom języka.
  /// **Utrzymanie**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, co sprawia, że baza kodu jest łatwiejsza w utrzymaniu i rozbudowie wraz z rozwojem aplikacji.

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

// Sprawdź, czy link jest zewnętrzny
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// Utwórz zlokalizowany href dla linków wewnętrznych
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

Do użytku z Vue Router, utwórz wersję specyficzną dla routera:

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

// Utwórz zlokalizowaną właściwość to dla router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // Jeśli 'to' jest obiektem, zlokalizuj właściwość path
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

Użyj tych komponentów w swojej aplikacji:

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- Inne -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### (Opcjonalny) Krok 11: Renderowanie Markdown

Intlayer obsługuje renderowanie zawartości Markdown bezpośrednio w Twojej aplikacji Vue. Domyślnie Markdown jest traktowany jako zwykły tekst. Aby przekształcić Markdown w bogaty HTML, możesz zintegrować [markdown-it](https://github.com/markdown-it/markdown-it), parser Markdown.

Jest to szczególnie przydatne, gdy Twoje tłumaczenia zawierają sformatowaną zawartość, taką jak listy, linki czy wyróżnienia.

Domyślnie Intlayer renderuje markdown jako ciąg znaków. Jednak Intlayer oferuje również sposób na renderowanie markdown do HTML za pomocą funkcji `installIntlayerMarkdown`.

> Aby zobaczyć, jak deklarować zawartość markdown za pomocą pakietu `intlayer`, zobacz [dokumentację markdown](https://github.com/aymericzip/intlayer/tree/main/docs/pl/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

installIntlayer(app);

const md = new MarkdownIt({
  html: true, // zezwól na tagi HTML
  linkify: true, // automatyczne linkowanie URL
  typographer: true, // włącz inteligentne cudzysłowy, myślniki itp.
});

// Powiedz Intlayer, aby używał md.render() za każdym razem, gdy musi przekształcić markdown na HTML
installIntlayerMarkdown(app, (markdown) => {
  const html = md.render(markdown);
  return h("div", { innerHTML: html });
});
```

Po zarejestrowaniu możesz używać składni opartej na komponentach, aby bezpośrednio wyświetlać zawartość Markdown:

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

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenia modułów (module augmentation), aby korzystać z zalet TypeScript i uczynić Twoją bazę kodu bardziej solidną.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie podczas pracy z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby iść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---
