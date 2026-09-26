---
createdAt: 2026-09-22
updatedAt: 2026-09-22
priority: 6
title: Extensión de Chrome y Firefox, Escáner i18n y SEO
description: Inspecciona la configuración i18n de cualquier sitio web con la extensión de Chrome de Intlayer. Detecta el framework, la biblioteca i18n, los idiomas, etiquetas hreflang y SEO, y ejecuta una auditoría i18n SEO completa.
keywords:
  - Extensión de Chrome
  - Escáner i18n
  - Verificador de hreflang
  - SEO multilingüe
  - Intlayer
  - Localización
  - Herramientas de desarrollo
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Historial inicial"
author: aymericzip
---

# Extensión de Chrome y Firefox: Escáner i18n y SEO

## Descripción general

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) es la extensión oficial de Chrome para **Intlayer**. Ábrela en cualquier sitio web para ver cómo maneja la internacionalización: qué framework y biblioteca i18n utiliza, qué locales expone y si sus etiquetas SEO multilingües están configuradas correctamente.

Funciona en cualquier sitio web, utilice o no Intlayer.

![Extensión de Chrome de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Enlace de la extensión de Chrome](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Enlace del complemento de Firefox](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## Características

- **Detección de tecnologías**: identifica el framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) y la biblioteca i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Cada detección muestra las evidencias que la activaron, como una variable global, una cookie o un marcador DOM.
- **Locales**: enumera los locales encontrados en el atributo `lang`, las etiquetas hreflang y `og:locale`, el prefijo de locale en la URL y las cookies o entradas de almacenamiento de locale.
- **Etiquetas SEO i18n**: comprueba `html lang`, `html dir`, el enlace canónico, las etiquetas hreflang, `x-default`, `og:locale` y la proporción de enlaces internos localizados.
- **Navegación entre locales**: cambia la página actual a cualquiera de sus versiones localizadas con un clic, según sus etiquetas hreflang.
- **Búsqueda en el sitemap**: busca entre todas las páginas listadas en el sitemap del sitio y las abre en la pestaña actual.
- **Auditoría completa**: ejecuta la misma auditoría que el [Escáner SEO i18n](https://intlayer.org/i18n-seo-scanner) y muestra una puntuación en vivo.

## Instalación

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

Instala [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) desde la Chrome Web Store y luego fíjalo en tu barra de herramientas.

La extensión funciona en Chrome y en cualquier navegador basado en Chromium compatible con extensiones de Chrome Web Store (Edge, Brave, Arc, Opera).

  </Tab>
  <Tab label="Firefox" value="firefox">

Instala [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) desde Complementos de Firefox y luego fíjalo en tu barra de herramientas.

  </Tab>
</Tabs>

## Uso

### Inspeccionar una página

1. Abre el sitio web que deseas inspeccionar.
2. Haz clic en el icono de **Intlayer i18n Scanner** en la barra de herramientas.
3. La ventana emergente muestra las secciones **Tecnologías detectadas**, **Locales** y **Etiquetas SEO i18n** para la página actual.

La detección se ejecuta localmente en tu navegador, únicamente en la pestaña actual.

### Navegar entre locales

![Navegación de la extensión de Chrome de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

La sección **Navegar** muestra las **Versiones localizadas** de la página actual, obtenidas de sus etiquetas hreflang. Haz clic en una locale para abrir esa versión en la pestaña actual.

En **Páginas del sitemap**, escribe para buscar entre las URL del sitemap del sitio y haz clic en un resultado para abrirlo.

### Ejecutar una auditoría completa

![Puntuación de auditoría de la extensión de Chrome de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Desplázate hasta la sección **Auditoría completa** y haz clic en **Ejecutar auditoría i18n completa**. Los resultados se transmiten a medida que se completa cada verificación, agrupados en:

- **Página**: atributos `html lang` y `dir`, locale actual, etiquetas hreflang, `x-default`, enlace canónico, enlaces internos localizados, selector de idioma, iconos de bandera y contenido de locale no utilizado incluido en el bundle de JavaScript.
- **Robots.txt**: presencia y verificación de que las rutas de locale sigan siendo rastreables.
- **Sitemap**: presencia, cada locale listado, enlaces alternativos y `x-default`.
- **Dominio**: número de locales descubiertos en todo el sitio.

Cada verificación se marca como aprobada, advertencia o fallida, y la puntuación resume la salud general de SEO i18n de la página.

## Privacidad y permisos

La extensión solicita permisos mínimos:

- **activeTab** y **scripting**: el detector solo se ejecuta en la pestaña que estás viendo y únicamente cuando abres la ventana emergente.
- **back.intlayer.org**: se utiliza únicamente cuando ejecutas una auditoría completa. La URL de la página actual se envía a la API de Intlayer para ser escaneada.

No se recopila ningún historial de navegación y nada se ejecuta en segundo plano.

## Preguntas frecuentes

<FAQ>

<Question title="¿El sitio web necesita usar Intlayer?">

No. La extensión inspecciona cualquier sitio web, independientemente del framework o la biblioteca i18n que utilice.

</Question>
<Question title="¿Por qué no se detecta una tecnología?">

La detección se basa en lo que la página expone en el navegador: variables globales, cookies, metaetiquetas y marcadores DOM. Algunas compilaciones de producción eliminan estos marcadores, por lo que una biblioteca puede estar en uso sin dejar un rastro visible.

</Question>
<Question title="¿Cómo soluciono los problemas encontrados por la auditoría?">

La mayoría de las comprobaciones se corresponden con una configuración de enrutamiento o metadatos. Con Intlayer, hreflang, canónico, `x-default`, enlaces localizados, sitemap y robots.txt se generan a partir de tu [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Consulta la guía de integración para tu framework, por ejemplo [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md) o [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Herramientas relacionadas

- [Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)
- [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)
- [Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)
