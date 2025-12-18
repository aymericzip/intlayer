---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: Jak przetłumaczyć swoją aplikację Nuxt i Vue – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Nuxt i Vue wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
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
    changes: Aktualizacja LocaleSwitcher, SEO, metadanych
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Nuxt i Vue za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Nuxt

<Tab defaultTab="video">
  <TabItem label="Wideo" value="video">
  
<iframe title="Jak przetłumaczyć swoją aplikację Nuxt i Vue za pomocą Intlayer? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-nuxt-4-template) na GitHub.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą npm:

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

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **vue-intlayer**
  Pakiet integrujący Intlayer z aplikacją Vue. Zawiera composables dla komponentów Vue.

- **nuxt-intlayer**
  Moduł Nuxt, który integruje Intlayer z aplikacjami Nuxt. Zapewnia automatyczną konfigurację, middleware do wykrywania lokalizacji, zarządzanie ciasteczkami oraz przekierowania URL.

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
      // Twoje inne lokalizacje
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
      // Twoje inne lokalizacje
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
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Poprzez ten plik konfiguracyjny możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Aby uzyskać pełną listę dostępnych parametrów, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w swojej konfiguracji Nuxt

Dodaj moduł intlayer do swojej konfiguracji Nuxt:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Twoja istniejąca konfiguracja Nuxt
  modules: ["nuxt-intlayer"],
});
```

> Moduł `nuxt-intlayer` automatycznie obsługuje integrację Intlayer z Nuxt. Konfiguruje budowanie deklaracji zawartości, monitoruje pliki w trybie deweloperskim, dostarcza middleware do wykrywania lokalizacji oraz zarządza lokalizowanym routingiem.

### Krok 4: Zadeklaruj swoją zawartość

Twórz i zarządzaj swoimi deklaracjami zawartości, aby przechowywać tłumaczenia:

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

> Twoje deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że znajdują się w katalogu `contentDir` (domyślnie `./src`). I mają odpowiednie rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji Nuxt, korzystając z kompozycji `useIntlayer`:

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

#### Dostęp do zawartości w Intlayer

Intlayer oferuje różne API do dostępu do Twojej zawartości:

- **Składnia oparta na komponentach** (zalecana):
  Użyj składni `<myContent />` lub `<Component :is="myContent" />`, aby wyrenderować zawartość jako węzeł Intlayer. Integruje się to bezproblemowo z [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

- **Składnia oparta na łańcuchach znaków**:
  Użyj `{{ myContent }}`, aby wyrenderować zawartość jako zwykły tekst, bez wsparcia Visual Editor.

- **Składnia surowego HTML**:
  Użyj `<div v-html="myContent" />`, aby wyrenderować zawartość jako surowy HTML, bez wsparcia Visual Editor.

- **Składnia destrukturyzacji**:
  Kompozycja `useIntlayer` zwraca Proxy z zawartością. Ten proxy można zdestrukturyzować, aby uzyskać dostęp do zawartości, zachowując reaktywność.
  - Użyj `const content = useIntlayer("myContent");` oraz `{{ content.myContent }}` / `<content.myContent />`.
  - Lub użyj `const { myContent } = useIntlayer("myContent");` oraz `{{ myContent}}` / `<myContent/>`, aby zdestrukturyzować zawartość.

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez kompozycję `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

Utwórz komponent do przełączania między językami, używając `NuxtLink`. **Używanie linków zamiast przycisków do zmiany lokalizacji to najlepsza praktyka dla SEO i odkrywalności stron**, ponieważ pozwala wyszukiwarkom indeksować wszystkie zlokalizowane wersje Twoich stron:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt automatycznie importuje useRoute
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

> Używanie `NuxtLink` z odpowiednimi atrybutami `href` (za pomocą `getLocalizedUrl`) zapewnia, że wyszukiwarki mogą odkryć wszystkie warianty językowe Twoich stron. Jest to lepsze niż przełączanie lokalizacji wyłącznie za pomocą JavaScript, którego roboty wyszukiwarek mogą nie śledzić.

Następnie skonfiguruj swój plik `app.vue`, aby używać layoutów:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (Opcjonalny) Krok 6b: Utwórz Layout z Nawigacją

Layouty Nuxt pozwalają zdefiniować wspólną strukturę dla Twoich stron. Utwórz domyślny layout, który zawiera przełącznik języków oraz nawigację:

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

    <Links href="/">Strona główna</Links>
    <Links href="/about">O nas</Links>
  </div>
</template>
```

Komponent `Links` (pokazany poniżej) zapewnia, że wewnętrzne linki nawigacyjne są automatycznie lokalizowane.

### (Opcjonalny) Krok 7: Dodaj lokalizowane routingi do swojej aplikacji

Nuxt automatycznie obsługuje lokalizowane routingi podczas korzystania z modułu `nuxt-intlayer`. Tworzy to trasy dla każdego języka automatycznie na podstawie struktury katalogu stron.

Przykład:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Aby utworzyć lokalizowane strony, wystarczy utworzyć pliki Vue w katalogu `pages/`. Oto dwa przykładowe pliki stron:

**Strona główna (`pages/index.vue`):**

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

**Strona O nas (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Użyj .raw, aby uzyskać dostęp do prymitywnego stringa
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Użyj .raw, aby uzyskać dostęp do prymitywnego łańcucha znaków
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Uwaga: `useHead` jest automatycznie importowany w Nuxt. Możesz uzyskać dostęp do wartości content za pomocą `.value` (reaktywne) lub `.raw` (prymitywny łańcuch znaków), w zależności od potrzeb.

Moduł `nuxt-intlayer` automatycznie:

- Wykrywa preferowany język użytkownika
- Obsługuje przełączanie języków przez URL
- Ustawia odpowiedni atrybut `<html lang="">`
- Zarządza ciasteczkami językowymi
- Przekierowuje użytkowników do odpowiedniego zlokalizowanego URL

### (Opcjonalny) Krok 8: Tworzenie lokalizowanego komponentu Linków

Aby zapewnić, że nawigacja Twojej aplikacji respektuje bieżący język, możesz utworzyć niestandardowy komponent `Links`. Komponent ten automatycznie dodaje przedrostek z aktualnym językiem do wewnętrznych adresów URL, co jest niezbędne dla **SEO i odnajdywalności stron**.

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

// Oblicz końcową ścieżkę
const finalPath = computed(() => {
  // 1. Sprawdź, czy link jest zewnętrzny
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Jeśli zewnętrzny, zwróć go bez zmian (NuxtLink obsługuje generowanie tagu <a>)
  if (isExternal) return props.href;

  // 3. Jeśli link jest wewnętrzny, lokalizuj URL
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

Następnie użyj tego komponentu w całej aplikacji:

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

    <Links href="/">Strona główna</Links>
    <Links href="/about">O nas</Links>
  </div>
</template>
```

> Korzystając z `NuxtLink` z lokalizowanymi ścieżkami, zapewniasz, że:
>
> - Wyszukiwarki mogą indeksować i przeszukiwać wszystkie wersje językowe Twoich stron
> - Użytkownicy mogą bezpośrednio udostępniać lokalizowane URL-e
> - Historia przeglądarki działa poprawnie z URL-ami poprzedzonymi prefiksem języka

### (Opcjonalny) Krok 9: Obsługa Metadanych i SEO

Nuxt oferuje doskonałe możliwości SEO za pomocą kompozycji `useHead` (auto-importowanej). Możesz użyć Intlayer do obsługi lokalizowanych metadanych, korzystając z akcesora `.raw` lub `.value`, aby uzyskać prymitywną wartość łańcuchową:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead jest auto-importowane w Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Użyj .raw, aby uzyskać prymitywną wartość łańcuchową
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Użyj .raw, aby uzyskać prymitywną wartość łańcuchową
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternatywnie możesz użyć funkcji `import { getIntlayer } from "intlayer"`, aby uzyskać zawartość bez reaktywności Vue.

> **Dostęp do wartości zawartości:**
>
> - Użyj `.raw`, aby uzyskać prymitywną wartość łańcuchową (niereaktywną)
> - Użyj `.value`, aby uzyskać wartość reaktywną
> - Użyj składni komponentu `<content.key />` dla wsparcia Visual Editora

Utwórz odpowiednią deklarację zawartości:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      pl: "Dowiedz się więcej o naszej firmie i naszej misji",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      pl: "O nas",
      en: "About Us",
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
      pl: "O nas - Moja firma",
      en: "About Us - My Company",
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

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      pl: "O nas - Moja Firma", // tytuł meta w języku polskim
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Dowiedz się więcej o naszej firmie i naszej misji",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "O nas",
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
        "en": "O nas - Moja firma",
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
        "pl": "Dowiedz się więcej o naszej firmie i naszej misji"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "pl": "O nas"
      }
    }
  }
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
