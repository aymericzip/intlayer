---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Nuxt i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Nuxt-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
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
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Aktualisierung von LocaleSwitcher, SEO, Metadaten"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# Übersetzen Sie Ihre Nuxt- und Vue-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Warum Intlayer gegenüber Alternativen?

Im Vergleich zu Hauptlösungen wie „@nuxtjs/i18n“ oder „i18next“ ist Intlayer eine Lösung, die über integrierte Optimierungen verfügt wie:

<AccordionGroup>
<Accordion header="Vollständige Nuxt-Abdeckung">

Intlayer ist für die perfekte Zusammenarbeit mit Nuxt optimiert, indem es **mehrsprachiges Routing**, **Middleware zur Lokalisierungserkennung**, **Sitemap** und alle Funktionen bietet, die für die Skalierung der Internationalisierung (i18n) erforderlich sind.

</Accordion>

<Accordion header="Bundle-Größe">

Anstatt riesige JSON-Dateien in Ihre Seiten zu laden, laden Sie nur den erforderlichen Inhalt. Intlayer hilft **Ihre Bundle- und Seitengröße um bis zu 50 % zu reduzieren**.

</Accordion>

<Accordion header="Wartbarkeit">

Durch die Festlegung des Inhaltsbereichs Ihrer Anwendung wird die Wartung für umfangreiche Anwendungen erleichtert. Sie können einen einzelnen Feature-Ordner duplizieren oder löschen, ohne die mentale Belastung durch die Überprüfung Ihrer gesamten Inhaltscodebasis auf sich nehmen zu müssen. Darüber hinaus ist Intlayer **vollständig typisiert (fully typed)**, um die Genauigkeit Ihrer Inhalte sicherzustellen.

</Accordion>

<Accordion header="KI-Agent">

Durch die gemeinsame Platzierung von Inhalten **reduziert sich der von Large Language Models (LLMs) benötigte Kontext**. Intlayer verfügt außerdem über eine Reihe von Tools, wie zum Beispiel eine **CLI** zum Testen auf fehlende Übersetzungen,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** und **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**, um die Entwicklererfahrung (DX) für KI-Agenten noch reibungsloser zu gestalten.

</Accordion>

<Accordion header="Automatisierung">

Nutzen Sie die Automatisierung, um Ihre CI/CD-Pipeline mit dem LLM Ihrer Wahl auf Kosten Ihres KI-Anbieters zu übersetzen. Intlayer bietet außerdem einen **Compiler** zur Automatisierung der Inhaltsextraktion sowie eine [Webplattform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) zur Unterstützung der **Übersetzung im Hintergrund**.

</Accordion>

<Accordion header="Leistung">

Das Verbinden großer JSON-Dateien mit Komponenten kann zu Leistungs- und Reaktivitätsproblemen führen. Intlayer optimiert das Laden Ihrer Inhalte zur Erstellungszeit.

</Accordion>

<Accordion header="Skalierung mit Nicht-Entwickler">

Intlayer ist mehr als nur eine i18n-Lösung. Es bietet einen **selbstgehosteten [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** und ein **[vollständiges CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, um Ihnen zu helfen Verwalten Sie Ihre mehrsprachigen Inhalte in **Echtzeit** und gestalten Sie die Zusammenarbeit mit Übersetzern, Textern und anderen Teammitgliedern reibungslos. Inhalte können lokal und/oder remote gespeichert werden.

</Accordion>
</AccordionGroup>

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Nuxt-Anwendung

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Wie übersetzt man seine Nuxt- und Vue-App mit Intlayer? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
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

Siehe [Application Template](https://github.com/aymericzip/intlayer-nuxt-4-template) auf GitHub.

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die notwendigen Pakete mit npm:

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

> Das Flag `--interactive` ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt Ihre Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **vue-intlayer**
  Das Paket, das Intlayer in Vue-Anwendungen integriert. Es stellt die Composables für die Vue-Komponenten bereit.

- **nuxt-intlayer**
  Das Nuxt-Modul, das Intlayer mit Nuxt-Anwendungen integriert. Es bietet automatische Einrichtung, Middleware zur Lokalerkennung, Cookie-Verwaltung und URL-Weiterleitung.

</Step>

<Step number={2} title="Konfiguration Ihres Projekts">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter konsultieren Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Nuxt-Konfiguration">

Fügen Sie das Intlayer-Modul zu Ihrer Nuxt-Konfiguration hinzu:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Ihre bestehende Nuxt-Konfiguration
  modules: ["nuxt-intlayer"],
});
```

> Das `nuxt-intlayer`-Modul übernimmt automatisch die Integration von Intlayer mit Nuxt. Es richtet den Aufbau der Inhaltsdeklarationen ein, überwacht Dateien im Entwicklungsmodus, stellt Middleware zur Lokalerkennung bereit und verwaltet die lokalisierte Routing.

</Step>

<Step number={4} title="Deklarieren Sie Ihre Inhalte">

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
      en: "Entdecken Sie die mehrsprachige Startseite Ihrer Nuxt-App, die von Intlayer unterstützt wird.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` enthalten sind (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration entspricht (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

</Step>

<Step number={5} title="Intlayer in Ihrem Code verwenden">

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

</Step>

<Step number={6} title="Ändern Sie die Sprache Ihres Inhalts" isOptional={true}>

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

</Step>

<Step number={7} title="Lokalisierte Routen zu Ihrer Anwendung hinzufügen" isOptional={true}>

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

</Step>

<Step number={8} title="Erstellen einer lokalisierten Link-Komponente" isOptional={true}>

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

</Step>

<Step number={9} title="Metadaten und SEO verwalten" isOptional={true}>

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number="6b" title="Erstellen Sie ein Layout mit Navigation" isOptional={true}>

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

</Step>

</Steps>

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

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Nuxt-App zu internationalisieren?">

Zwei realistische Optionen:

- **`@nuxtjs/i18n`**: das etablierte Modul, aufgebaut auf `vue-i18n`, mit pro Seite geladenen Locale-Dateien und einer großen Konfigurationsfläche.
- **`Intlayer`**: Inhalte werden neben jeder Komponente deklariert und zur Build-Zeit kompiliert, vollständig typisiert, mit Locale-bewusstem Routing, KI-Übersetzung, visuellem Editor und CMS.

Der Unterschied liegt darin, wo die Inhalte liegen. `@nuxtjs/i18n` zentralisiert sie in `locales/*.json`-Dateien, während Intlayer sie mit der Komponente zusammenlegt, die sie rendert, sodass eine Seite nur die Einträge ausliefert, die sie verwendet, und ein Feature-Ordner in einem Stück verschoben oder gelöscht werden kann. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Vue-i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Nuxt-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/vue.md).

</Question>

<Question title="Kann ich von `@nuxtjs/i18n` oder `vue-i18n` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [@nuxtjs/i18n-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_nuxtjs_i18n_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `vue-i18n` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Quelldateien, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

Für eine vollständig automatisierte Pipeline macht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) dasselbe zur Build-Zeit auf JSX-, TSX-, Vue- und Svelte-Quellcode und generiert die Wörterbücher bei jeder Änderung, sodass es keine von Hand zu pflegenden Schlüssel gibt. Er arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, unerreichbar bleiben, und er braucht einige Annotationen, um für den Nutzer sichtbaren Text von Anwendungslogik zu unterscheiden.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Funktioniert Intlayer mit serverseitigem Rendering und statischer Generierung von Nuxt?">

Ja. Inhalte werden während SSR und während `nuxt generate` aufgelöst, sodass vorgerenderte Seiten das übersetzte Markup enthalten, statt auf dem Client einen Katalog abzurufen. Das `nuxt-intlayer`-Modul verdrahtet den Provider und die Locale-Erkennung für Sie.

</Question>

<Question title="Muss ich die Locale in die URL aufnehmen?">

Nein. `routing.mode` akzeptiert `"prefix-no-default"` (die Voreinstellung, `/about` und `/fr/about`), `"prefix-all"`, `"no-prefix"` und `"search-params"`, und `routing.domains` ordnet jede Locale ihrer eigenen Domain zu. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Wie handhabe ich SEO-Metadaten und hreflang-Tags in Nuxt?">

Schritt 9 dieses Leitfadens behandelt das. Lokalisierte `useHead`-Metadaten kommen aus Ihren Wörterbüchern, und `getMultilingualUrls` erstellt die `hreflang`-Alternativen für jede deklarierte Locale, einschließlich `x-default`, was auch eine lokalisierte Sitemap speist.

</Question>

<Question title="Wie baue ich einen Sprachumschalter, der auf der aktuellen Seite bleibt?">

Verwenden Sie `useLocale` für die aktive und die verfügbaren Locales und die lokalisierte Link-Komponente aus Schritt 8, damit die Navigation in der aktuellen Sprache bleibt. `getLocalizedUrl` schreibt den aktuellen Pfad in die Ziel-Locale um, sodass der Sprachwechsel den Leser auf derselben Route hält.

</Question>

<Question title="Wie übersetze ich eine Nuxt-App automatisch mit KI?">

Führen Sie `npx intlayer fill` aus. Fehlende Übersetzungen werden mit dem LLM Ihrer Wahl unter Verwendung Ihres eigenen Anbieters und API-Schlüssels gefüllt, und `--git-diff` beschränkt den Lauf auf die im Branch geänderten Inhalte. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und Rich Text in Vue-Templates?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden App zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
