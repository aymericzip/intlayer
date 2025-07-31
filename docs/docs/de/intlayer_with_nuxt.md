---
createdAt: 2025-06-18
updatedAt: 2025-06-29
title: Übersetzen Sie Ihre Nuxt- und Vue-Website (i18n)
description: Entdecken Sie, wie Sie Ihre Nuxt- und Vue-Website mehrsprachig machen. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
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
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-template
---

# Erste Schritte zur Internationalisierung (i18n) mit Intlayer und Nuxt

Siehe [Application Template](https://github.com/aymericzip/intlayer-nuxt-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, quelloffene Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Nuxt-Anwendung

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es stellt die Composables für die Vue-Komponenten bereit.

- **nuxt-intlayer**
  Das Nuxt-Modul, das Intlayer in Nuxt-Anwendungen integriert. Es bietet automatische Einrichtung, Middleware zur Spracherkennung, Cookie-Verwaltung und URL-Weiterleitung.

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
  content: {
    contentDir: ["."], // Da Intlayer standardmäßig Inhaltsdeklarationsdateien aus dem Verzeichnis `./src` überwacht
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung und Inhaltsverzeichnis
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
  content: {
    contentDir: ["."], // Verzeichnis für Inhaltsdeklarationen
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguration für die Internationalisierung und Inhaltsverzeichnis
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
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter konsultieren Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Nuxt-Konfiguration

Fügen Sie das Intlayer-Modul zu Ihrer Nuxt-Konfiguration hinzu:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Ihre bestehende Nuxt-Konfiguration
  modules: ["nuxt-intlayer"],
});
```

> Das `nuxt-intlayer`-Modul übernimmt automatisch die Integration von Intlayer in Nuxt. Es richtet den Aufbau der Inhaltsdeklaration ein, überwacht Dateien im Entwicklungsmodus, stellt Middleware zur Lokalerkennung bereit und verwaltet die lokalisierte Routing.

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    nuxtIntlayer: t({
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
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
      de: "Bearbeite <code>components/HelloWorld.vue</code> und speichere, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      de: "Schauen Sie sich an ",
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
    count: t({ de: "Anzahl ist ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      de: "Bearbeite <code>components/HelloWorld.vue</code> und speichere, um HMR zu testen",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ de: "Schau dir an ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    nuxtIntlayer: t({
      de: "Nuxt Intlayer Dokumentation",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
      es: "Dokumentation von Nuxt Intlayer",
    }),
    learnMore: t({
      en: "Erfahren Sie mehr über Nuxt in der ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      en: "Nuxt-Dokumentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      en: "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
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
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "de": "Bearbeite <code>components/HelloWorld.vue</code> und speichere, um HMR zu testen",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "de": "Schau dir an ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "de": "Nuxt Intlayer Dokumentation"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "de": "Erfahren Sie mehr über Nuxt in der "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Nuxt Dokumentation"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Klicken Sie auf das Nuxt-Logo, um mehr zu erfahren"
      }
    }
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration entspricht (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

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
  Verwenden Sie die Syntax `<myContent />` oder `<Component :is="myContent" />`, um Inhalte als Intlayer-Knoten zu rendern. Dies integriert sich nahtlos mit dem [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

- **String-basierte Syntax**:  
  Verwenden Sie `{{ myContent }}`, um den Inhalt als reinen Text ohne Unterstützung des Visual Editors darzustellen.

- **Raw-HTML-Syntax**:  
  Verwenden Sie `<div v-html="myContent" />`, um den Inhalt als rohes HTML ohne Unterstützung des Visual Editors darzustellen.

- **Destrukturierungssyntax**:  
  Der `useIntlayer` Composable gibt ein Proxy-Objekt mit dem Inhalt zurück. Dieses Proxy-Objekt kann destrukturiert werden, um auf den Inhalt zuzugreifen und dabei die Reaktivität beizubehalten.
  - Verwenden Sie `const content = useIntlayer("myContent");` und `{{ content.myContent }}` / `<content.myContent />`.
  - Oder verwenden Sie `const { myContent } = useIntlayer("myContent");` und `{{ myContent }}` / `<myContent/>`, um den Inhalt zu destrukturieren.

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale` Composable bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

Erstellen Sie eine Komponente, um zwischen den Sprachen zu wechseln:

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

// Hole Sprachinformationen und die setLocale-Funktion
const { locale, availableLocales, setLocale } = useLocale();

// Verfolge die ausgewählte Sprache mit einem ref
const selectedLocale = ref(locale.value);

// Aktualisiere die Sprache, wenn die Auswahl sich ändert
const changeLocale = () => setLocale(selectedLocale.value);

// Halte selectedLocale synchron mit der globalen Sprache
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

Verwenden Sie dann diese Komponente in Ihren Seiten oder im Layout:

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

### (Optional) Schritt 7: Lokalisierte Routing zu Ihrer Anwendung hinzufügen

Nuxt verwaltet die lokalisierte Navigation automatisch, wenn das Modul `nuxt-intlayer` verwendet wird. Dies erstellt Routen für jede Sprache automatisch basierend auf der Struktur Ihres Seitenverzeichnisses.

Beispiel:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

Um eine lokalisierte Seite zu erstellen, erstellen Sie einfach Ihre Vue-Dateien im Verzeichnis `pages/`:

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

Das Modul `nuxt-intlayer` wird automatisch:

- Erkennen der bevorzugten Sprache des Benutzers
- Verwaltung des Sprachwechsels über die URL
- Setzen des entsprechenden `<html lang="">` Attributs
- Verwaltung von Sprach-Cookies
- Weiterleitung der Benutzer zur entsprechenden lokalisierten URL

### (Optional) Schritt 8: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `LocalizedLink`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch das aktuelle Sprachpräfix hinzu.

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

// Erstelle einen lokalisierten href für interne Links
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

Dann verwenden Sie diese Komponente in Ihrer gesamten Anwendung:

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>
    <LocalizedLink to="/contact">
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

Nuxt bietet hervorragende SEO-Fähigkeiten. Sie können Intlayer verwenden, um lokalisierte Metadaten zu verwalten:

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

```ts fileName="pages/about-meta.content.ts"
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
      zh: "关于我们 - 我的公司",
      de: "Über uns - Mein Unternehmen",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
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
      zh: "关于我们 - 我的公司",
      de: "Über uns - Mein Unternehmen",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
      de: "Erfahren Sie mehr über unser Unternehmen und unsere Mission",
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
        "zh": "关于我们 - 我的公司",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa",
        "de": "Über uns - Mein Unternehmen"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei aufnehmen:

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

Für weitere Details zur Verwendung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
