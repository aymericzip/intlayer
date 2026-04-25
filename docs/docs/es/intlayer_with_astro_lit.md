---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - Cómo traducir una aplicación Astro + Lit en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro + Lit usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Lit"
---

# Traduce tu sitio web Astro + Lit con Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support de TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamique de locale.

---

## Guide étape par étape pour configurer Intlayer dans Astro + Lit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver el [Modelo de Aplicación](https://github.com/aymericzip/intlayer-astro-template) en GitHub.

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando tu gestor de paquetes:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  El paquete central que proporciona herramientas de internacionalización para la gestión de la configuración, la traducción, la [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), la transpilación y los [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como un middleware para detectar el idioma preferido del usuario, gestionar cookies y gestionar la redirección de URL.

- **lit**
  El paquete Lit fundamental para construir Web Components rápidos y ligeros.

- **lit-intlayer**
  El paquete que integra Intlayer con las aplicaciones Lit. Proporciona hooks basados en `ReactiveController` (`useIntlayer`, `useLocale`, etc.) para que los LitElements se re-rendericen automáticamente cuando el idioma cambia.

- **@astrojs/lit**
  La integración oficial de Astro que permite utilizar elementos personalizados Lit en páginas Astro.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Gracias a este archivo de configuración, puedes configurar URLs localizadas, la redirección del middleware, los nombres de las cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Astro

Añade el plugin de intlayer y la integración de Lit en su configuración.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> El plugin de integración de Astro `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo desarrollo. Define las variables de entorno de Intlayer en la aplicación Astro. Además, proporciona alias para optimizar el rendimiento.

> La integración `lit()` permite utilizar elementos personalizados Lit en páginas Astro.

### Paso 4: Declarar tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar las traducciones:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Tus declaraciones de contenido se pueden definir en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Puedes consumir los diccionarios directamente en los archivos `.astro` utilizando los ayudantes básicos exportados por `intlayer`. También deberías añadir metadatos SEO como los enlaces hreflang y canónicos a cada página. El elemento personalizado Lit se importa a través de un `<script>` del lado del cliente y se coloca en el cuerpo.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Enlace canónico -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Enlaces Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- El elemento personalizado Lit — recibe la locale detectada por el servidor como una propiedad -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **Nota sobre la configuración del enrutamiento:**
> La estructura de directorios que utilices depende del parámetro `middleware.routing` de tu `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** Mantiene el idioma predeterminado en la raíz (sin prefijo) y añade prefijos a los demás. Utiliza `[...locale]` para interceptar todos los casos.
> - **`prefix-all`:** Todas las URLs van precedidas del idioma. Puedes utilizar un `[locale]` estándar si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** No se necesita una carpeta de idioma. El idioma se gestiona a través de parámetros de búsqueda o cookies.

### Paso 6: Crear el elemento personalizado Lit

Crea el elemento personalizado Lit. `installIntlayer` se llama en `connectedCallback` con la propiedad `locale` detectada por el servidor para inicializar el singleton Intlayer en el cliente.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Inicializar con la locale detectada por el servidor
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- El selector de idioma se renderiza en línea en el LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Cambiar idioma :</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> La propiedad `locale` se transmite de la página Astro (detectada por el servidor) y se utiliza en `connectedCallback` para inicializar `installIntlayer`, lo que la convierte en la locale inicial para todos los hooks `ReactiveController` del elemento.

> `useIntlayer` se registra como un `ReactiveController`. El elemento se re-renderiza automáticamente cuando el idioma cambia — no se requiere ninguna configuración adicional.

### Paso 7: Añadir un Selector de Idioma

El selector de idioma está integrado directamente en el método `render()` del elemento personalizado Lit (visto en el paso 6). Utiliza `useLocale` de `lit-intlayer` y navega a la URL localizada cuando el usuario elija un nuevo idioma:

```typescript fileName="src/components/lit/LitDemo.ts"
// Dentro de la clase LitElement, después de la configuración de useLocale (visto en el paso 6):

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Navegar a la URL localizada al cambiar de idioma
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Cambiar idioma :</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Nota sobre la reactividad de Lit:**
> `useLocale` devuelve un `ReactiveController`. Cuando se llama a `setLocale`, el controlador programa automáticamente una nueva renderización — por lo que el estado del botón activo se actualiza sin manipulación manual del DOM.

> **Nota sobre la persistencia:**
> El uso de `onLocaleChange` para redirigir a través de `window.location.href` asegura que se visite la URL del nuevo idioma, permitiendo que el middleware de Intlayer establezca la cookie de idioma y recuerde la preferencia del usuario en futuras visitas.

### Paso 8: Sitemap y Robots.txt

Intlayer proporciona utilidades para generar dinámicamente sitemaps y archivos robots.txt localizados.

#### Sitemap

Crea `src/pages/sitemap.xml.ts` para generar un sitemap que incluya todas tus rutas localizadas.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Crea `src/pages/robots.txt.ts` para controlar la indexación por parte de los motores de búsqueda.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Configurar TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et rendre votre codebase plus robuste. Lit nécessite que `experimentalDecorators` soit activé si vous utilisez la syntaxe des décorateurs.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Requis par Lit pour le support des décorateurs
  },
  include: [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

### Configuration du Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```bash
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**Extension VS Code officielle Intlayer**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** para crear y actualizar traducciones fácilmente.

Para más detalles sobre el uso de la extensión, consulte la [documentación de la extensión VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puede implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar su contenido a través del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
