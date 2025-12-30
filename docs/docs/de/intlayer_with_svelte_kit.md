---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: So übersetzen Sie Ihre SvelteKit-App – i18n-Anleitung 2026
description: Entdecken Sie, wie Sie Ihre SvelteKit-Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie mit Server-Side Rendering (SSR) zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 7.1.10
    date: 2025-11-20
    changes: Historie initialisiert
---

# Übersetzen Sie Ihre SvelteKit-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Sie arbeitet nahtlos mit den Server-Side-Rendering (SSR)-Fähigkeiten von **SvelteKit** zusammen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen.
- **SvelteKits SSR nutzen** für SEO-freundliche Internationalisierung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer SvelteKit-Anwendung

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Um zu beginnen, erstellen Sie ein neues SvelteKit-Projekt. Hier ist die finale Struktur, die wir erstellen werden:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Das Kernpaket für i18n.
- **svelte-intlayer**: Stellt Context-Provider und Stores für Svelte/SvelteKit bereit.
- **vite-intlayer**: Das Vite-Plugin zur Integration von Inhaltsdeklarationen in den Build-Prozess.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei im Stammverzeichnis Ihres Projekts:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Aktualisieren Sie Ihre `vite.config.ts`, um das Intlayer-Plugin einzubinden. Dieses Plugin übernimmt die Transpilierung Ihrer Inhaltsdateien.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // Reihenfolge ist wichtig, Intlayer sollte vor SvelteKit stehen
});
```

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen Sie Ihre Inhaltsdeklarationsdateien irgendwo in Ihrem `src`-Ordner (z. B. `src/lib/content` oder neben Ihren Komponenten). Diese Dateien definieren den übersetzbaren Inhalt für Ihre Anwendung mithilfe der Funktion `t()` für jede Locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Schritt 5: Verwenden Sie Intlayer in Ihren Komponenten

Jetzt können Sie die Funktion `useIntlayer` in jeder Svelte-Komponente verwenden. Sie gibt einen reaktiven Store zurück, der sich automatisch aktualisiert, wenn sich die Locale ändert. Die Funktion berücksichtigt automatisch die aktuelle Locale (sowohl während SSR als auch bei der clientseitigen Navigation).

> **Hinweis:** `useIntlayer` gibt einen Svelte-Store zurück, daher müssen Sie das `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: So übersetzen Sie Ihre SvelteKit-App – i18n-Anleitung 2025
> description: Entdecken Sie, wie Sie Ihre SvelteKit-Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie mit Server-Side Rendering (SSR) zu internationalisieren (i18n) und zu übersetzen.
> keywords:

- Internationalisierung
- Dokumentation
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Historie initialisiert

---

# Übersetzen Sie Ihre SvelteKit-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Sie arbeitet nahtlos mit den Server-Side-Rendering (SSR)-Fähigkeiten von **SvelteKit** zusammen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen.
- **SvelteKits SSR nutzen** für SEO-freundliche Internationalisierung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer SvelteKit-Anwendung

Um zu beginnen, erstellen Sie ein neues SvelteKit-Projekt. Hier ist die finale Struktur, die wir erstellen werden:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: Das Kernpaket für i18n.
- **svelte-intlayer**: Stellt Context-Provider und Stores für Svelte/SvelteKit bereit.
- **vite-intlayer**: Das Vite-Plugin zur Integration von Inhaltsdeklarationen in den Build-Prozess.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei im Stammverzeichnis Ihres Projekts:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Aktualisieren Sie Ihre `vite.config.ts`, um das Intlayer-Plugin einzubinden. Dieses Plugin übernimmt die Transpilierung Ihrer Inhaltsdateien.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // Reihenfolge ist wichtig, Intlayer sollte vor SvelteKit stehen
});
```

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen Sie Ihre Inhaltsdeklarationsdateien irgendwo in Ihrem `src`-Ordner (z. B. `src/lib/content` oder neben Ihren Komponenten). Diese Dateien definieren den übersetzbaren Inhalt für Ihre Anwendung mithilfe der Funktion `t()` für jede Locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Schritt 5: Verwenden Sie Intlayer in Ihren Komponenten

-Präfix verwenden, um auf den reaktiven Wert zuzugreifen (z. B. `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" entspricht dem in Schritt 4 definierten Schlüssel
  const content = useIntlayer("hero-section");
</script>

<!-- Inhalt als einfachen Inhalt rendern -->
<h1>{$content.title}</h1>
<!-- Um den Inhalt mit dem Editor bearbeitbar zu rendern -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Um den Inhalt als String darzustellen -->
<div aria-label={$content.title.value}></div>
```

### (Optional) Schritt 6: Routing einrichten

Die folgenden Schritte zeigen, wie man lokalisierungsbasiertes Routing in SvelteKit einrichtet. Dadurch können Ihre URLs das Locale-Präfix enthalten (z. B. `/en/about`, `/fr/about`) für bessere SEO und Benutzererfahrung.

```bash
.
└─── src
    ├── app.d.ts                  # Definiert den Locale-Typ
    ├── hooks.server.ts           # Verwalten des Locale-Routings
    ├── lib
    │   └── getLocale.ts          # Prüft die Locale aus Header, Cookies
    ├── params
    │   └── locale.ts             # Definiert den Locale-Parameter
    └── routes
        ├── [[locale=locale]]     # In einer Routengruppe einwickeln, um die Locale zu setzen
        │   ├── +layout.svelte    # Lokales Layout für die Route
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Root-Layout für Schriftarten und globale Styles
```

### Schritt 7: Serverseitige Lokalerkennung (Hooks) verwalten

In SvelteKit muss der Server die Locale des Benutzers kennen, um während des SSR den korrekten Inhalt zu rendern. Wir verwenden `hooks.server.ts`, um die Locale aus der URL oder Cookies zu erkennen.

Erstellen oder ändern Sie `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Prüfen, ob der aktuelle Pfad bereits mit einer Locale beginnt (z.B. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Wenn KEINE Locale in der URL vorhanden ist (z.B. Benutzer besucht "/"), weiterleiten
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Temporäre Weiterleitung
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Erstellen Sie dann einen Helfer, um die Locale des Benutzers aus dem Request-Event zu erhalten:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Ermittelt die Locale des Benutzers aus dem Request-Event.
 * Diese Funktion wird im `handle` Hook in `src/hooks.server.ts` verwendet.
 *
 * Zuerst wird versucht, die Locale aus dem Intlayer-Speicher (Cookies oder benutzerdefinierte Header) zu erhalten.
 * Falls keine Locale gefunden wird, erfolgt ein Fallback auf die Browser-"Accept-Language" Verhandlung.
 *
 * @param event - Das Request-Event von SvelteKit
 * @returns Die Locale des Benutzers
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Versuche, die Locale aus dem Intlayer-Speicher (Cookies oder Header) zu erhalten
  const storedLocale = getLocaleFromStorage({
    // Zugriff auf SvelteKit-Cookies
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Zugriff auf SvelteKit-Header
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Fallback auf Browser-"Accept-Language"-Verhandlung
  const negotiatorHeaders: Record<string, string> = {};

  // Konvertiere SvelteKit Headers-Objekt in ein einfaches Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Prüfe die Locale aus dem `Accept-Language`-Header
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Rückgabe der Standard-Locale, falls keine Übereinstimmung gefunden wurde
  return defaultLocale;
};
```

> `getLocaleFromStorage` überprüft die Locale aus dem Header oder Cookie, abhängig von Ihrer Konfiguration. Weitere Details finden Sie unter [Configuration](https://intlayer.org/doc/configuration).

> Die Funktion `localeDetector` verarbeitet den `Accept-Language`-Header und gibt die beste Übereinstimmung zurück.

Wenn die Locale nicht konfiguriert ist, möchten wir einen 404-Fehler zurückgeben. Um dies zu erleichtern, können wir eine `match`-Funktion erstellen, um zu überprüfen, ob die Locale gültig ist:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Hinweis:** Stellen Sie sicher, dass Ihre `src/app.d.ts` die Locale-Definition enthält:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Für die Datei `+layout.svelte` können wir alles entfernen, um nur statischen Inhalt zu behalten, der nicht mit i18n zusammenhängt:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Erstellen Sie dann eine neue Seite und ein Layout unter der Gruppe `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Verwenden Sie den generischen Load-Typ
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Initialisiere Intlayer mit der Locale aus der Route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Verwende das Layout-Inhaltsverzeichnis
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Verwenden Sie das Inhaltswörterbuch für die Startseite
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Optional) Schritt 8: Internationalisierte Links

Für SEO wird empfohlen, Ihre Routen mit dem Locale zu versehen (z. B. `/en/about`, `/fr/about`). Diese Komponente fügt automatisch jedem Link das aktuelle Locale als Präfix hinzu.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Hilfsfunktion, um die URL mit dem aktuellen Locale zu versehen
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Wenn Sie `goto` von SvelteKit verwenden, können Sie dieselbe Logik mit `getLocalizedUrl` verwenden, um zur lokalisierten URL zu navigieren:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Navigiert zu /en/about oder /fr/about je nach Locale
```

### (Optional) Schritt 9: Sprachumschalter

Um den Benutzern das Wechseln der Sprache zu ermöglichen, aktualisieren Sie die URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Setzt die Locale im Store und löst onLocaleChange aus
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Optional) Schritt 10: Backend-Proxy hinzufügen

Um einen Backend-Proxy zu deiner SvelteKit-Anwendung hinzuzufügen, kannst du die Funktion `intlayerProxy` verwenden, die vom `vite-intlayer` Plugin bereitgestellt wird. Dieses Plugin erkennt automatisch die beste Locale für den Benutzer basierend auf der URL, Cookies und den Spracheinstellungen des Browsers.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Optional) Schritt 11: Einrichtung des intlayer Editors / CMS

Um den intlayer Editor einzurichten, müssen Sie der [intlayer Editor Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) folgen.

Um das intlayer CMS einzurichten, müssen Sie der [intlayer CMS Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) folgen.

Um den Intlayer-Editor-Selektor visualisieren zu können, müssen Sie die Komponentensyntax in Ihrem Intlayer-Inhalt verwenden.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Inhalt als einfachen Inhalt rendern -->
  <h1>{$content.title}</h1>

  <!-- Inhalt als Komponente rendern (vom Editor erforderlich) -->
  <svelte:component this={$content.component} />
</div>
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren.

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

---

### Weiterführende Informationen

- **Visueller Editor**: Integrieren Sie den [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), um Übersetzungen direkt über die Benutzeroberfläche zu bearbeiten.
- **CMS**: Externalisieren Sie Ihr Content-Management mit dem [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).
