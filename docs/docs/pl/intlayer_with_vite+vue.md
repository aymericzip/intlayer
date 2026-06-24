---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Vue i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Vite + Vue. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
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
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją stronę Vite i Vue za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `vue-i18n` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

**Pełne pokrycie Vue**

Intlayer jest zoptymalizowany do doskonałej współpracy z Vue, oferując **zakres treści na poziomie komponentu**, **tłumaczenia reaktywne** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[umiejętności agenta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Vite i Vue

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
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

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-vite-vue-template) na GitHub.

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

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

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **vue-intlayer**
  Pakiet integrujący Intlayer z aplikacją Vue. Zapewnia dostawców kontekstu oraz composables do internacjonalizacji w Vue.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

</Step>

<Step number={2} title="Konfiguracja Twojego projektu">

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Zintegruj Intlayer w swojej konfiguracji Vite">

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

</Step>

<Step number={4} title="Zadeklaruj swoją treść">

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). Muszą również odpowiadać rozszerzeniu pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={5} title="Wykorzystaj Intlayer w swoim kodzie">

Aby wykorzystać funkcje internacjonalizacji Intlayer w całej aplikacji Vue, najpierw musisz zarejestrować instancję singleton Intlayer w swoim głównym pliku. Ten krok jest kluczowy, ponieważ dostarcza kontekst internacjonalizacji wszystkim komponentom w aplikacji, umożliwiając dostęp do tłumaczeń w dowolnym miejscu w drzewie komponentów.

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// Wstrzyknij providera na najwyższym poziomie
app.use(intlayer);

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
  - Lub użyj `const { myContent } = useIntlayer(\"myContent\");` oraz `{{ myContent }}` / `<myContent/>`, aby destrukturyzować zawartość.

> Jeśli Twoja aplikacja już istnieje, możesz użyć [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) w połączeniu z [poleceniem extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przekonwertować tysiące komponentów w jedną sekundę.

</Step>

<Step number={6} title="Zmień język swojej zawartości" isOptional={true}>

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

</Step>

<Step number={7} title="Dodaj lokalizowane routowanie do swojej aplikacji" isOptional={true}>

Dodanie lokalizowanego routingu w aplikacji Vue zazwyczaj polega na użyciu Vue Router z prefiksami lokalizacji. Tworzy to unikalne ścieżki dla każdego języka, co jest przydatne dla SEO i przyjaznych dla SEO adresów URL.

Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Najpierw zainstaluj Vue Router:

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

Następnie utwórz konfigurację routera, która obsługuje routing oparty na lokalizacji:

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
 * Zadeklaruj trasy z lokalizowanymi ścieżkami i metadanymi.
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

// Utwórz instancję routera
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Dodaj strażnika nawigacji do obsługi lokalizacji
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // Ponowne użycie lokalizacji zdefiniowanej w meta trasy
  client.setLocale(metaLocale);
  next();
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

Równolegle możesz również użyć `intlayerProxy`, aby dodać routowanie po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje bieżący język na podstawie URL i ustawi odpowiedni cookie językowy. Jeśli nie zostanie określony żaden język, plugin wybierze najbardziej odpowiedni język na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Zauważ, że aby używać `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    vue(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="Zmiana URL po zmianie lokalizacji" isOptional={true}>

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
<ol>
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

</Step>

<Step number={9} title="Zmień atrybuty języka i kierunku w tagu HTML" isOptional={true}>

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

</Step>

<Step number={10} title="Tworzenie lokalizowanego komponentu Link" isOptional={true}>

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

</Step>

<Step number={11} title="Renderowanie Markdown" isOptional={true}>

Intlayer obsługuje renderowanie zawartości Markdown bezpośrednio w Twojej aplikacji Vue. Domyślnie Markdown jest traktowany jako zwykły tekst. Aby przekształcić Markdown w bogaty HTML, możesz zintegrować [markdown-it](https://github.com/markdown-it/markdown-it), parser Markdown.

Jest to szczególnie przydatne, gdy Twoje tłumaczenia zawierają sformatowaną zawartość, taką jak listy, linki czy wyróżnienia.

Domyślnie Intlayer renderuje markdown jako ciąg znaków. Jednak Intlayer oferuje również sposób na renderowanie markdown do HTML za pomocą funkcji `installIntlayerMarkdown`.

> Aby zobaczyć, jak deklarować zawartość markdown za pomocą pakietu `intlayer`, zobacz [dokumentację markdown](https://github.com/aymericzip/intlayer/tree/main/docs/pl/dictionary/markdown.md).

```ts fileName="main.ts"
import MarkdownIt from "markdown-it";
import { createApp, h } from "vue";
import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";

const app = createApp(App);

app.use(intlayer);

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

</Step>

<Step number={12} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przetransformować komponenty i wyodrębnić zawartość.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reszta Twojej konfiguracji
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny zostać zapisane po transformacji. W ten sposób kompilator można uruchomić tylko raz, aby przetransformować aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Polecenie wyodrębniania'>

Uruchom ekstraktor, aby przetransformować komponenty i wyodrębnić zawartość

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
 <Tab value='Kompilator Babel'>

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
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

```bash
#  Ignoruj pliki generowane przez Intlayer
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

```bash
#  Ignoruj pliki generowane przez Intlayer
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

### (Opcjonalnie) Sitemap i robots.txt (generacja przy buildzie)

Intlayer udostępnia `generateSitemap` i `getMultilingualUrls` - narzędzia do formatowania wielojęzycznych plików `sitemap.xml` i `robots.txt` dla crawlerów i automatycznego zapisu do `public/`. Zwykle uruchamia się mały skrypt Node **przed** Vite (np. hooki npm `predev` / `prebuild`).

#### Sitemap

Generator sitemap uwzględnia locale i dodaje metadane dla crawlerów.

> Sitemap obsługuje przestrzeń nazw `xhtml:link` (hreflang). Zamiast płaskiej listy URL Intlayer tworzy dwukierunkowe powiązania wszystkich wersji językowych strony (np. `/about`, `/fr/about` lub `/about?lang=fr` w zależności od routingu).

#### Robots.txt

Użyj `getMultilingualUrls`, by reguły `Disallow` obejmowały wszystkie zlokalizowane warianty ścieżek.

#### 1. Plik `generate-seo.mjs` w katalogu głównym

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

Pakiet `intlayer` musi być zainstalowany. W produkcji ustaw `SITE_URL` w środowisku (np. w CI).

> Preferuj `generate-seo.mjs` dla ESM w Node. Przy `generate-seo.js` ustaw `"type": "module"` w `package.json` lub włącz ESM inaczej.

#### 2. Uruchom skrypt przed Vite

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

Dostosuj polecenia dla pnpm lub yarn. Możesz też wywołać skrypt z CI.

### Idź dalej

Aby iść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---
