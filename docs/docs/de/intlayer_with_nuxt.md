---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: So übersetzen Sie Ihre Nuxt- und Vue-App – i18n-Anleitung 2025
description: Entdecken Sie, wie Sie Ihre Nuxt- und Vue-Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
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
    changes: Aktualisierung von LocaleSwitcher, SEO, Metadaten
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Übersetzen Sie Ihre Nuxt- und Vue-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Nuxt-Anwendung

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Wie übersetzt man seine Nuxt- und Vue-App mit Intlayer? Entdecken Sie Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Siehe [Application Template](https://github.com/aymericzip/intlayer-nuxt-4-template) auf GitHub.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es stellt die Composables für die Vue-Komponenten bereit.

- **nuxt-intlayer**
  Das Nuxt-Modul, das Intlayer mit Nuxt-Anwendungen integriert. Es bietet automatische Einrichtung, Middleware zur Lokalerkennung, Cookie-Verwaltung und URL-Weiterleitung.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter konsultieren Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Nuxt-Konfiguration

Fügen Sie das Intlayer-Modul zu Ihrer Nuxt-Konfiguration hinzu:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Ihre bestehende Nuxt-Konfiguration
  modules: ["nuxt-intlayer"],
});
```

> Das `nuxt-intlayer`-Modul übernimmt automatisch die Integration von Intlayer mit Nuxt. Es richtet den Aufbau der Inhaltsdeklarationen ein, überwacht Dateien im Entwicklungsmodus, stellt Middleware zur Lokalerkennung bereit und verwaltet die lokalisierte Routing.

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
      en: "Entdecken Sie die mehrsprachige Startseite Ihrer Nuxt-App, die von Intlayer unterstützt wird.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration entspricht (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 5: Intlayer in Ihrem Code verwenden

Greifen Sie in Ihrer gesamten Nuxt-Anwendung mit dem Composable `useIntlayer` auf Ihre Inhaltswörterbücher zu:

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

#### Zugriff auf Inhalte in Intlayer

Intlayer bietet verschiedene APIs, um auf Ihre Inhalte zuzugreifen:

- **Komponentenbasierte Syntax** (empfohlen):
  Verwenden Sie die Syntax `<myContent />` oder `<Component :is="myContent" />`, um Inhalte als Intlayer-Knoten darzustellen. Dies integriert sich nahtlos mit dem [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

- **String-basierte Syntax**:
  Verwenden Sie `{{ myContent }}`, um den Inhalt als einfachen Text ohne Unterstützung des Visual Editors darzustellen.

- **Raw-HTML-Syntax**:
  Verwenden Sie `<div v-html="myContent" />`, um den Inhalt als rohes HTML ohne Unterstützung des Visual Editors darzustellen.

- **Destrukturierungssyntax**:
  Der `useIntlayer` Composable gibt ein Proxy-Objekt mit dem Inhalt zurück. Dieses Proxy kann destrukturiert werden, um auf den Inhalt zuzugreifen und dabei die Reaktivität beizubehalten.
  - Verwenden Sie `const content = useIntlayer("myContent");` und `{{ content.myContent }}` / `<content.myContent />`.
  - Oder verwenden Sie `const { myContent } = useIntlayer("myContent");` und `{{ myContent}}` / `<myContent/>`, um den Inhalt zu destrukturieren.

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale` Composable bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

Erstellen Sie eine Komponente, um zwischen Sprachen mit `NuxtLink` zu wechseln. **Die Verwendung von Links anstelle von Buttons für den Locale-Wechsel ist eine bewährte Methode für SEO und die Auffindbarkeit der Seite**, da Suchmaschinen so alle lokalisierten Versionen Ihrer Seiten crawlen und indexieren können:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt importiert useRoute automatisch
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

> Die Verwendung von `NuxtLink` mit korrekten `href`-Attributen (über `getLocalizedUrl`) stellt sicher, dass Suchmaschinen alle Sprachvarianten Ihrer Seiten entdecken können. Dies ist vorzuziehen gegenüber einem rein JavaScript-basierten Sprachwechsel, dem Suchmaschinen-Crawler möglicherweise nicht folgen.

Richten Sie anschließend Ihre `app.vue` so ein, dass Layouts verwendet werden:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### (Optional) Schritt 6b: Erstellen Sie ein Layout mit Navigation

Nuxt-Layouts ermöglichen es Ihnen, eine gemeinsame Struktur für Ihre Seiten zu definieren. Erstellen Sie ein Standard-Layout, das den Sprachumschalter und die Navigation enthält:

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

    <Links href="/">Startseite</Links>
    <Links href="/about">Über</Links>
  </div>
</template>
```

Die `Links`-Komponente (siehe unten) stellt sicher, dass interne Navigationslinks automatisch lokalisiert werden.

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Nuxt verwaltet lokalisierte Routen automatisch, wenn das `nuxt-intlayer` Modul verwendet wird. Dies erstellt Routen für jede Sprache automatisch basierend auf der Struktur Ihres Seitenverzeichnisses.

Beispiel:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Um lokalisierte Seiten zu erstellen, legen Sie einfach Ihre Vue-Dateien im Verzeichnis `pages/` an. Hier sind zwei Beispielseiten:

**Startseite (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.value,
  meta: [
    {
      name: "description",
      content: content.metaDescription.value,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**Über-Seite (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Verwenden Sie .raw für den Zugriff auf primitive Strings
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Verwenden Sie .raw für den Zugriff auf primitive Strings
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Hinweis: `useHead` wird in Nuxt automatisch importiert. Sie können auf Inhaltswerte entweder mit `.value` (reaktiv) oder `.raw` (primitiver String) je nach Bedarf zugreifen.

Das `nuxt-intlayer`-Modul wird automatisch:

- Die bevorzugte Sprache des Benutzers erkennen
- Die Sprachumschaltung über die URL handhaben
- Das passende `<html lang="">` Attribut setzen
- Sprach-Cookies verwalten
- Benutzer zur entsprechenden lokalisierten URL weiterleiten

### (Optional) Schritt 8: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Locale berücksichtigt, können Sie eine benutzerdefinierte `Links`-Komponente erstellen. Diese Komponente fügt automatisch interne URLs mit der aktuellen Sprache als Präfix hinzu, was für **SEO und die Auffindbarkeit von Seiten** unerlässlich ist.

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

// Berechnet den finalen Pfad
const finalPath = computed(() => {
  // 1. Prüfen, ob der Link extern ist
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. Wenn extern, unverändert zurückgeben (NuxtLink übernimmt die <a>-Tag-Erzeugung)
  if (isExternal) return props.href;

  // 3. Wenn intern, URL lokalisieren
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

Verwenden Sie dann diese Komponente in Ihrer gesamten Anwendung:

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

    <Links href="/">Startseite</Links>
    <Links href="/about">Über</Links>
  </div>
</template>
```

> Durch die Verwendung von `NuxtLink` mit lokalisierten Pfaden stellen Sie sicher, dass:
>
> - Suchmaschinen alle Sprachversionen Ihrer Seiten crawlen und indexieren können
> - Benutzer lokalisierten URLs direkt teilen können
> - Der Browserverlauf korrekt mit sprachpräfixierten URLs funktioniert

### (Optional) Schritt 9: Metadaten und SEO verwalten

Nuxt bietet hervorragende SEO-Fähigkeiten über den `useHead` Composable (automatisch importiert). Sie können Intlayer verwenden, um lokalisierte Metadaten zu verwalten, indem Sie den `.raw` oder `.value` Zugriff verwenden, um den primitiven String-Wert zu erhalten:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead wird in Nuxt automatisch importiert
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Verwenden Sie .raw für den Zugriff auf den primitiven String
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Verwenden Sie .raw für den Zugriff auf den primitiven Stringwert
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternativ können Sie die Funktion `import { getIntlayer } from "intlayer"` verwenden, um den Inhalt ohne Vue-Reaktivität zu erhalten.

> **Zugriff auf Inhaltswerte:**
>
> - Verwenden Sie `.raw`, um den primitiven Stringwert (nicht reaktiv) zu erhalten
> - Verwenden Sie `.value`, um den reaktiven Wert zu erhalten
> - Verwenden Sie die Komponenten-Syntax `<content.key />` für die Unterstützung des Visual Editors

Erstellen Sie die entsprechende Inhaltsdeklaration:

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
      en: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
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
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Über uns",
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
      en: "Über uns - Mein Unternehmen",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "Über uns",
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
        "en": "Über uns - Mein Unternehmen",
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
        "de": "Erfahren Sie mehr über unser Unternehmen und unsere Mission"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros",
        "de": "Über Uns"
      }
    }
  }
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Verwendung der Erweiterung lesen Sie bitte die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
