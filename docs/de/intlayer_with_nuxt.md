# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und Nuxt

Siehe [Application Template](https://github.com/aymericzip/intlayer-nuxt-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Nuxt-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es bietet die Composables für die Vue-Komponenten.

- **nuxt-intlayer**
  Das Nuxt-Modul, das Intlayer in Nuxt-Anwendungen integriert. Es bietet eine automatische Einrichtung, Middleware für die Spracherkennung, Cookie-Verwaltung und URL-Umleitung.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Umleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Logs in der Konsole deaktivieren und mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Nuxt-Konfiguration integrieren

Fügen Sie das Intlayer-Modul zu Ihrer Nuxt-Konfiguration hinzu:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Ihre bestehende Nuxt-Konfiguration
  modules: ["nuxt-intlayer"],
});
```

> Das `nuxt-intlayer`-Modul übernimmt automatisch die Integration von Intlayer in Nuxt. Es richtet den Aufbau der Inhaltsdeklaration ein, überwacht Dateien im Entwicklungsmodus, bietet Middleware für die Spracherkennung und verwaltet lokalisierte Routen.

### Schritt 4: Ihre Inhalte deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      de: "Nuxt Intlayer Dokumentation",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über Nuxt in der ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      de: "Nuxt Dokumentation",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      de: "Nuxt Intlayer Dokumentation",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über Nuxt in der ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      de: "Nuxt Dokumentation",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      de: "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      de: "Nuxt Intlayer Dokumentation",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      de: "Erfahren Sie mehr über Nuxt in der ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      de: "Nuxt Dokumentation",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      de: "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="components/helloWorld.content.json5"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "de": "Anzahl ist ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
      },
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "de": "Bearbeiten Sie <code>components/HelloWorld.vue</code> und speichern Sie, um HMR zu testen",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
      },
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "de": "Schauen Sie sich ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
      },
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "de": "Nuxt Intlayer Dokumentation",
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer",
      },
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "de": "Erfahren Sie mehr über Nuxt in der ",
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la ",
      },
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Nuxt Dokumentation",
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt",
      },
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren",
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información",
      },
    },
  },
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` Verzeichnis (standardmäßig `./src`) enthalten sind und der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details, lesen Sie die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

Greifen Sie in Ihrer Nuxt-Anwendung mit dem `useIntlayer` Composable auf Ihre Inhaltswörterbücher zu:

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

Intlayer bietet zwei APIs, um auf Ihre Inhalte zuzugreifen:

- **Komponentenbasierte Syntax** (empfohlen):
  Verwenden Sie die `<myContent />` oder `<Component :is="myContent" />` Syntax, um Inhalte als Intlayer Node darzustellen. Dies integriert sich nahtlos mit dem [Visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) und [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md).

- **String-basierte Syntax**:
  Verwenden Sie `{{ myContent }}`, um den Inhalt als einfachen Text darzustellen, ohne Unterstützung für den visuellen Editor.

- **Roh-HTML-Syntax**:
  Verwenden Sie `<div v-html="myContent" />`, um den Inhalt als Roh-HTML darzustellen, ohne Unterstützung für den visuellen Editor.

- **Destrukturierungssyntax**:
  Das `useIntlayer` Composable gibt einen Proxy mit dem Inhalt zurück. Dieser Proxy kann destrukturiert werden, um auf den Inhalt zuzugreifen und dabei die Reaktivität zu bewahren.
  - Verwenden Sie `const content = useIntlayer("myContent");` und `{{ content.myContent }}` / `<content.myContent />`.
  - Oder verwenden Sie `const { myContent } = useIntlayer("myContent");` und `{{ myContent }}` / `<myContent/>`, um den Inhalt zu destrukturieren.

### (Optional) Schritt 6: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die `setLocale` Funktion verwenden, die vom `useLocale` Composable bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und die Inhalte entsprechend zu aktualisieren.

Erstellen Sie eine Komponente, um zwischen Sprachen zu wechseln:

```vue fileName="components/LocaleSwitcher.vue"
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

// Abrufen von Sprachinformationen und setLocale Funktion
const { locale, availableLocales, setLocale } = useLocale();

// Verfolgen der ausgewählten Sprache mit einem Ref
const selectedLocale = ref(locale.value);

// Aktualisieren der Sprache, wenn sich die Auswahl ändert
const changeLocale = () => setLocale(selectedLocale.value);

// Halten Sie selectedLocale mit der globalen Sprache synchron
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

Verwenden Sie diese Komponente dann in Ihren Seiten oder Ihrem Layout:

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // Erstellen Sie die zugehörige Intlayer-Deklarationsdatei
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Nuxt verwaltet automatisch lokalisierte Routen, wenn das `nuxt-intlayer` Modul verwendet wird. Dies erstellt automatisch Routen für jede Sprache basierend auf der Struktur Ihres Seitenverzeichnisses.

Beispiel:

```plaintext
pages/
├── index.vue          → /, /de, /fr, /es
├── about.vue          → /about, /de/about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /de/contact, /fr/contact, /es/contact
```

Um eine lokalisierte Seite zu erstellen, erstellen Sie einfach Ihre Vue-Dateien im `pages/` Verzeichnis:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

Das `nuxt-intlayer` Modul wird automatisch:

- Die bevorzugte Sprache des Benutzers erkennen
- Sprachwechsel über die URL verwalten
- Das entsprechende `<html lang="">` Attribut setzen
- Sprach-Cookies verwalten
- Benutzer zur entsprechenden lokalisierten URL weiterleiten

### (Optional) Schritt 8: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `LocalizedLink` Komponente erstellen. Diese Komponente fügt automatisch interne URLs mit der aktuellen Sprache vor.

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// Prüfen, ob der Link extern ist
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// Erstellen eines lokalisierten href für interne Links
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

Verwenden Sie diese Komponente dann in Ihrer gesamten Anwendung:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>

      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### (Optional) Schritt 9: Metadaten und SEO verwalten

Nuxt bietet hervorragende SEO-Funktionen. Sie können Intlayer verwenden, um lokalisierte Metadaten zu verwalten:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

Erstellen Sie die entsprechende Inhaltsdeklaration:

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      de: "Über Uns - Mein Unternehmen",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      de: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      de: "Über Uns - Mein Unternehmen",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      de: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      de: "Über Uns - Mein Unternehmen",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      de: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "de": "Über Uns - Mein Unternehmen",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "de": "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### TypeScript konfigurieren

Intlayer verwendet Modulerweiterung, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Schließen Sie die automatisch generierten Typen ein
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, diese in Ihr Git-Repository einzuchecken.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installieren Sie sie aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) auslagern.
