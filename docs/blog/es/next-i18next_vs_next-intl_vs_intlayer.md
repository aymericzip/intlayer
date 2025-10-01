---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Comparar next-i18next con next-intl e Intlayer para la internacionalización (i18n) de una aplicación Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internacionalización
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Internacionalización (i18n) en Next.js

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Veamos las similitudes y diferencias entre tres opciones de i18n para Next.js: next-i18next, next-intl e Intlayer.

Esto no es un tutorial completo. Es una comparación para ayudarte a elegir.

Nos enfocamos en **Next.js 13+ App Router** (con **React Server Components**) y evaluamos:

1. **Arquitectura y organización del contenido**
2. **TypeScript y seguridad**
3. **Manejo de traducciones faltantes**
4. **Enrutamiento y middleware**
5. **Rendimiento y comportamiento de carga**
6. **Experiencia del desarrollador (DX), herramientas y mantenimiento**
7. **SEO y escalabilidad para proyectos grandes**

> **resumen**: Los tres pueden localizar una aplicación Next.js. Si quieres **contenido con alcance por componente**, **tipos estrictos en TypeScript**, **verificaciones de claves faltantes en tiempo de compilación**, **diccionarios optimizados (tree-shaken)** y **helpers de primera clase para App Router y SEO**, **Intlayer** es la opción más completa y moderna.

> Una confusión común entre los desarrolladores es pensar que `next-intl` es la versión de Next.js de `react-intl`. No lo es: `next-intl` es mantenido por [Amann](https://github.com/amannn), mientras que `react-intl` es mantenido por [FormatJS](https://github.com/formatjs/formatjs).

---

## En resumen

- **next-intl** - Formateo de mensajes ligero y sencillo con un sólido soporte para Next.js. Los catálogos centralizados son comunes; la experiencia del desarrollador (DX) es simple, pero la seguridad y el mantenimiento a gran escala siguen siendo principalmente tu responsabilidad.
- **next-i18next** - i18next con apariencia de Next.js. Ecosistema maduro y características mediante plugins (por ejemplo, ICU), pero la configuración puede ser extensa y los catálogos tienden a centralizarse a medida que los proyectos crecen.
- **Intlayer** - Modelo de contenido centrado en componentes para Next.js, **tipado estricto en TS**, **verificaciones en tiempo de compilación**, **tree-shaking**, **middleware y ayudas SEO integradas**, **Editor Visual/CMS** opcional y **traducciones asistidas por IA**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Las insignias se actualizan automáticamente. Las instantáneas variarán con el tiempo.

---

## Comparación de Funciones Lado a Lado (enfocado en Next.js)

| Función                                                          | `next-intlayer` (Intlayer)                                                                                                                       | `next-intl`                                                                                                                           | `next-i18next`                                                                                                                        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Traducciones Cerca de los Componentes**                        | ✅ Sí, contenido ubicado junto a cada componente                                                                                                 | ❌ No                                                                                                                                 | ❌ No                                                                                                                                 |
| **Integración con TypeScript**                                   | ✅ Avanzada, tipos estrictos generados automáticamente                                                                                           | ✅ Buena                                                                                                                              | ⚠️ Básica                                                                                                                             |
| **Detección de Traducción Faltante**                             | ✅ Resaltado de errores en TypeScript y error/advertencia en tiempo de compilación                                                               | ⚠️ Recurso alternativo en tiempo de ejecución                                                                                         | ⚠️ Recurso alternativo en tiempo de ejecución                                                                                         |
| **Contenido enriquecido (JSX/Markdown/componentes)**             | ✅ Soporte directo                                                                                                                               | ❌ No diseñado para nodos enriquecidos                                                                                                | ⚠️ Limitado                                                                                                                           |
| **Traducción impulsada por IA**                                  | ✅ Sí, soporta múltiples proveedores de IA. Usable con tus propias claves API. Considera el contexto de tu aplicación y el alcance del contenido | ❌ No                                                                                                                                 | ❌ No                                                                                                                                 |
| **Editor Visual**                                                | ✅ Sí, Editor Visual local + CMS opcional; puede externalizar contenido de la base de código; integrable                                         | ❌ No / disponible a través de plataformas externas de localización                                                                   | ❌ No / disponible a través de plataformas externas de localización                                                                   |
| **Enrutamiento Localizado**                                      | ✅ Sí, soporta rutas localizadas desde el inicio (funciona con Next.js y Vite)                                                                   | ✅ Incorporado, App Router soporta el segmento `[locale]`                                                                             | ✅ Incorporado                                                                                                                        |
| **Generación Dinámica de Rutas**                                 | ✅ Sí                                                                                                                                            | ✅ Sí                                                                                                                                 | ✅ Sí                                                                                                                                 |
| **Pluralización**                                                | ✅ Patrones basados en enumeraciones                                                                                                             | ✅ Bueno                                                                                                                              | ✅ Bueno                                                                                                                              |
| **Formato (fechas, números, monedas)**                           | ✅ Formateadores optimizados (Intl en el núcleo)                                                                                                 | ✅ Bueno (helpers de Intl)                                                                                                            | ✅ Bueno (helpers de Intl)                                                                                                            |
| **Formato de contenido**                                         | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml en desarrollo)                                                                                       | ✅ .json, .js, .ts                                                                                                                    | ⚠️ .json                                                                                                                              |
| **Soporte ICU**                                                  | ⚠️ En desarrollo                                                                                                                                 | ✅ Sí                                                                                                                                 | ⚠️ A través de plugin (`i18next-icu`)                                                                                                 |
| **Ayudas SEO (hreflang, sitemap)**                               | ✅ Herramientas integradas: ayudas para sitemap, robots.txt, metadatos                                                                           | ✅ Bueno                                                                                                                              | ✅ Bueno                                                                                                                              |
| **Ecosistema / Comunidad**                                       | ⚠️ Más pequeño pero creciendo rápido y reactivo                                                                                                  | ✅ Bueno                                                                                                                              | ✅ Bueno                                                                                                                              |
| **Renderizado del lado del servidor y Componentes del servidor** | ✅ Sí, optimizado para SSR / Componentes del servidor de React                                                                                   | ⚠️ Soportado a nivel de página pero es necesario pasar funciones t en el árbol de componentes para los componentes hijos del servidor | ⚠️ Soportado a nivel de página pero es necesario pasar funciones t en el árbol de componentes para los componentes hijos del servidor |
| **Tree-shaking (cargar solo el contenido usado)**                | ✅ Sí, por componente en tiempo de compilación mediante plugins de Babel/SWC                                                                     | ⚠️ Parcial                                                                                                                            | ⚠️ Parcial                                                                                                                            |
| **Carga diferida (Lazy loading)**                                | ✅ Sí, por localización / por diccionario                                                                                                        | ✅ Sí (por ruta/por localización), requiere gestión de espacios de nombres                                                            | ✅ Sí (por ruta/por localización), requiere gestión de espacios de nombres                                                            |
| **Eliminación de contenido no utilizado**                        | ✅ Sí, por diccionario en tiempo de compilación                                                                                                  | ❌ No, puede gestionarse manualmente con la gestión de espacios de nombres                                                            | ❌ No, puede gestionarse manualmente con la gestión de espacios de nombres                                                            |
| **Gestión de proyectos grandes**                                 | ✅ Fomenta la modularidad, adecuado para sistemas de diseño                                                                                      | ✅ Modular con configuración                                                                                                          | ✅ Modular con configuración                                                                                                          |
| **Prueba de traducciones faltantes (CLI/CI)**                    | ✅ CLI: `npx intlayer content test` (auditoría compatible con CI)                                                                                | ⚠️ No incorporado; la documentación sugiere `npx @lingual/i18n-check`                                                                 | ⚠️ No incorporado; depende de herramientas de i18next / runtime `saveMissing`                                                         |

---

## Introducción

Next.js te ofrece soporte integrado para enrutamiento internacionalizado (por ejemplo, segmentos de localización). Pero esa función no realiza traducciones por sí sola. Aún necesitas una biblioteca para mostrar contenido localizado a tus usuarios.

Existen muchas bibliotecas i18n, pero en el mundo de Next.js hoy en día, tres están ganando popularidad: next-i18next, next-intl e Intlayer.

---

## Arquitectura y escalabilidad

- **next-intl / next-i18next**: Por defecto usan **catálogos centralizados** por idioma (más **espacios de nombres** en i18next). Funciona bien al principio, pero a menudo se convierte en una gran área compartida con un aumento del acoplamiento y la rotación de claves.
- **Intlayer**: Fomenta diccionarios **por componente** (o por característica) **co-localizados** con el código que sirven. Esto reduce la carga cognitiva, facilita la duplicación/migración de piezas de la interfaz y disminuye los conflictos entre equipos. El contenido no utilizado es naturalmente más fácil de detectar y eliminar.

**Por qué importa:** En grandes bases de código o configuraciones de sistemas de diseño, el **contenido modular** escala mejor que los catálogos monolíticos.

---

## Tamaños de los paquetes y dependencias

Después de construir la aplicación, el bundle es el JavaScript que el navegador cargará para renderizar la página. Por lo tanto, el tamaño del bundle es importante para el rendimiento de la aplicación.

Dos componentes son importantes en el contexto de un bundle de aplicación multilingüe:

- El código de la aplicación
- El contenido cargado por el navegador

## Código de la Aplicación

La importancia del código de la aplicación es mínima en este caso. Las tres soluciones son tree-shakables, lo que significa que las partes no utilizadas del código no se incluyen en el bundle.

Aquí hay una comparación del tamaño del bundle de JavaScript cargado por el navegador para una aplicación multilingüe con las tres soluciones.

Si no necesitamos ningún formateador en la aplicación, la lista de funciones exportadas después del tree-shaking será:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (El tamaño del paquete es 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (El tamaño del paquete es 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (El tamaño del paquete es 80.7 kB -> 25.5 kB (gzip))

Estas funciones son solo envoltorios alrededor del contexto/estado de React, por lo que el impacto total de la biblioteca i18n en el tamaño del paquete es mínimo.

> Intlayer es ligeramente más grande que `next-intl` y `next-i18next` porque incluye más lógica en la función `useIntlayer`. Esto está relacionado con la integración de markdown y `intlayer-editor`.

## Contenido y Traducciones

Esta parte a menudo es ignorada por los desarrolladores, pero consideremos el caso de una aplicación compuesta por 10 páginas en 10 idiomas. Supongamos que cada página integra un contenido 100% único para simplificar el cálculo (en realidad, mucho contenido es redundante entre páginas, por ejemplo, título de la página, encabezado, pie de página, etc.).

Un usuario que quiera visitar la página `/fr/about` cargará el contenido de una página en un idioma dado. Ignorar la optimización del contenido significaría cargar innecesariamente el 8,200% `((1 + (((10 páginas - 1) × (10 idiomas - 1)))) × 100)` del contenido de la aplicación. ¿Ves el problema? Incluso si este contenido sigue siendo texto, y aunque probablemente prefieras pensar en optimizar las imágenes de tu sitio, estás enviando contenido inútil por todo el mundo y haciendo que las computadoras de los usuarios lo procesen sin motivo.

Dos problemas importantes:

- **División por ruta:**

  > Si estoy en la página `/about`, no quiero cargar el contenido de la página `/home`

- **División por localización:**

  > Si estoy en la página `/fr/about`, no quiero cargar el contenido de la página `/en/about`

De nuevo, las tres soluciones son conscientes de estos problemas y permiten gestionar estas optimizaciones. La diferencia entre las tres soluciones es la experiencia del desarrollador (DX).

`next-intl` y `next-i18next` utilizan un enfoque centralizado para gestionar las traducciones, permitiendo dividir el JSON por localización y por subarchivos. En `next-i18next`, llamamos a los archivos JSON 'namespaces'; `next-intl` permite declarar mensajes. En `intlayer`, llamamos a los archivos JSON 'diccionarios'.

- En el caso de `next-intl`, al igual que `next-i18next`, el contenido se carga a nivel de página/layout, luego este contenido se carga en un proveedor de contexto. Esto significa que el desarrollador debe gestionar manualmente los archivos JSON que se cargarán para cada página.

> En la práctica, esto implica que los desarrolladores a menudo omiten esta optimización, prefiriendo cargar todo el contenido en el proveedor de contexto de la página por simplicidad.

- En el caso de `intlayer`, todo el contenido se carga en la aplicación. Luego, un plugin (`@intlayer/babel` / `@intlayer/swc`) se encarga de optimizar el paquete cargando solo el contenido usado en la página. Por lo tanto, el desarrollador no necesita gestionar manualmente los diccionarios que se cargarán. Esto permite una mejor optimización, mejor mantenibilidad y reduce el tiempo de desarrollo.

A medida que la aplicación crece (especialmente cuando varios desarrolladores trabajan en la aplicación), es común olvidar eliminar contenido que ya no se usa de los archivos JSON.

> Tenga en cuenta que todos los JSON se cargan en todos los casos (next-intl, next-i18next, intlayer).

Por eso el enfoque de Intlayer es más eficiente: si un componente ya no se usa, su diccionario no se carga en el paquete.

Cómo la biblioteca maneja los fallback también es importante. Consideremos que la aplicación está en inglés por defecto, y el usuario visita la página `/fr/about`. Si faltan traducciones en francés, consideraremos el fallback en inglés.

En el caso de `next-intl` y `next-i18next`, la biblioteca requiere cargar el JSON relacionado con la configuración regional actual, pero también con la configuración regional de reserva. Por lo tanto, considerando que todo el contenido ha sido traducido, cada página cargará un 100% de contenido innecesario. **En comparación, `intlayer` procesa la reserva en tiempo de construcción del diccionario. Así, cada página cargará solo el contenido utilizado.**

Aquí un ejemplo del impacto de la optimización del tamaño del paquete usando `intlayer` en una aplicación vite + react:

| Paquete optimizado                                                                                      | Paquete no optimizado                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![paquete optimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![paquete no optimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript y seguridad

<Columns>
  <Column>

**next-intl**

- Soporte sólido para TypeScript, pero **las claves no están estrictamente tipadas por defecto**; deberás mantener los patrones de seguridad manualmente.

  </Column>
  <Column>

**next-i18next**

- Tipos base para hooks; **la tipificación estricta de claves requiere herramientas/configuración adicional**.

  </Column>
  <Column>

**intlayer**

- **Genera tipos estrictos** a partir de tu contenido. La **autocompletación del IDE** y los **errores en tiempo de compilación** detectan errores tipográficos y claves faltantes antes del despliegue.

  </Column>
</Columns>

**Por qué es importante:** La tipificación fuerte desplaza los fallos hacia la **izquierda** (CI/compilación) en lugar de hacia la **derecha** (tiempo de ejecución).

---

## Manejo de traducciones faltantes

**next-intl**

- Se basa en **respaldo en tiempo de ejecución** (por ejemplo, mostrar la clave o la configuración regional predeterminada). La compilación no falla.

**next-i18next**

- Se basa en **respaldo en tiempo de ejecución** (por ejemplo, mostrar la clave o la configuración regional predeterminada). La compilación no falla.

**intlayer**

- **Detección en tiempo de compilación** con **advertencias/errores** para configuraciones regionales o claves faltantes.

**Por qué es importante:** Detectar vacíos durante la compilación evita “cadenas misteriosas” en producción y se alinea con estrictas políticas de lanzamiento.

---

## Enrutamiento, middleware y estrategia de URL

<Columns>
  <Column>

**next-intl**

- Funciona con **enrutamiento localizado de Next.js** en el App Router.

  </Column>
  <Column>

**next-i18next**

- Funciona con **enrutamiento localizado de Next.js** en el App Router.

  </Column>
  <Column>

**intlayer**

- Todo lo anterior, además de **middleware i18n** (detección de locale vía headers/cookies) y **helpers** para generar URLs localizadas y etiquetas `<link rel="alternate" hreflang="…">`.

  </Column>
</Columns>

**Por qué es importante:** Menos capas de integración personalizadas; **UX consistente** y **SEO limpio** en todas las locales.

---

## Alineación con Componentes de Servidor (RSC)

<Columns>
  <Column>

**next-intl**

- Soporta Next.js 13+. A menudo requiere pasar funciones t/formatters a través de árboles de componentes en configuraciones híbridas.

  </Column>
  <Column>

**next-i18next**

- Compatible con Next.js 13+. Restricciones similares al pasar utilidades de traducción a través de límites.

  </Column>
  <Column>

**intlayer**

- Compatible con Next.js 13+ y suaviza la **frontera servidor/cliente** con una API consistente y proveedores orientados a RSC, evitando el traslado de formateadores o funciones t.

  </Column>
</Columns>

**Por qué importa:** Modelo mental más limpio y menos casos límite en árboles híbridos.

---

## DX, herramientas y mantenimiento

<Columns>
  <Column>

**next-intl**

- Comúnmente se usa junto con plataformas externas de localización y flujos editoriales.

  </Column>
  <Column>

**next-i18next**

- Comúnmente se usa junto con plataformas externas de localización y flujos editoriales.

  </Column>
  <Column>

**intlayer**

- Incluye un **Editor Visual gratuito** y un **CMS opcional** (compatible con Git o externalizado), además de una **extensión para VSCode** y **traducciones asistidas por IA** utilizando tus propias claves de proveedor.

  </Column>
</Columns>

**Por qué es importante:** Reduce los costos operativos y acorta el ciclo entre desarrolladores y autores de contenido.

## Integración con plataformas de localización (TMS)

Las grandes organizaciones suelen depender de Sistemas de Gestión de Traducción (TMS) como **Crowdin**, **Phrase**, **Lokalise**, **Localizely** o **Localazy**.

- **Por qué les importa a las empresas**
  - **Colaboración y roles**: Participan múltiples actores: desarrolladores, gerentes de producto, traductores, revisores, equipos de marketing.
  - **Escalabilidad y eficiencia**: localización continua, revisión en contexto.

- **next-intl / next-i18next**
  - Normalmente utilizan **catálogos JSON centralizados**, por lo que la exportación/importación con TMS es sencilla.
  - Ecosistemas maduros y ejemplos/integraciones para las plataformas mencionadas.

- **Intlayer**
  - Fomenta **diccionarios descentralizados por componente** y soporta contenido en **TypeScript/TSX/JS/JSON/MD**.
  - Esto mejora la modularidad en el código, pero puede dificultar la integración plug-and-play con TMS cuando una herramienta espera archivos JSON centralizados y planos.
  - Intlayer ofrece alternativas: **traducciones asistidas por IA** (usando tus propias claves de proveedor), un **Editor Visual/CMS**, y flujos de trabajo **CLI/CI** para detectar y completar vacíos.

> Nota: `next-intl` y `i18next` también aceptan catálogos en TypeScript. Si tu equipo almacena mensajes en archivos `.ts` o los descentraliza por funcionalidad, puedes enfrentar fricciones similares con el TMS. Sin embargo, muchas configuraciones de `next-intl` permanecen centralizadas en una carpeta `locales/`, lo que facilita un poco la refactorización a JSON para el TMS.

## Experiencia del Desarrollador

Esta parte realiza una comparación profunda entre las tres soluciones. En lugar de considerar casos simples, como se describe en la documentación de 'primeros pasos' para cada solución, consideraremos un caso de uso real, más similar a un proyecto real.

### Estructura de la aplicación

La estructura de la aplicación es importante para asegurar un buen mantenimiento de tu base de código.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home
    │       └── index.tsx
    │       └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Comparación

- **next-intl / next-i18next**: Catálogos centralizados (JSON; namespaces/mensajes). Estructura clara, se integra bien con plataformas de traducción, pero puede llevar a más ediciones cruzadas entre archivos a medida que las aplicaciones crecen.
- **Intlayer**: Diccionarios `.content.{ts|js|json}` por componente, ubicados junto a los componentes. Facilita la reutilización de componentes y el razonamiento local; añade archivos y depende de herramientas en tiempo de compilación.

#### Configuración y carga de contenido

Como se mencionó anteriormente, debe optimizar cómo se importa cada archivo JSON en su código.
Cómo la biblioteca maneja la carga de contenido es importante.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // Declare explícitamente el namespace utilizado por este componente
  const resources = await loadMessagesFor(locale); // tu cargador (JSON, etc.)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Solo precargar los namespaces necesarios para ESTA página
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Puede ser importado desde una configuración compartida
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Validar que el parámetro `locale` entrante sea válido
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Establece la configuración regional activa para esta renderización del servidor (RSC)
  unstable_setRequestLocale(locale);

  // Los mensajes se cargan del lado del servidor a través de src/i18n/request.ts
  // (ver documentación de next-intl). Aquí solo enviamos un subconjunto al cliente
  // que es necesario para los componentes del cliente (optimización de carga).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Carga estrictamente del lado del servidor (no hidratado en el cliente)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Comparación

Los tres soportan la carga de contenido y proveedores por localización.

- Con **next-intl/next-i18next**, normalmente cargas mensajes/espacios de nombres seleccionados por ruta y colocas los proveedores donde sea necesario.

- Con **Intlayer**, se añade un análisis en tiempo de compilación para inferir el uso, lo que puede reducir el cableado manual y permitir un único proveedor raíz.

Elige entre control explícito y automatización según la preferencia del equipo.

### Uso en un componente cliente

Tomemos un ejemplo de un componente cliente que renderiza un contador.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Traducciones (deben ser JSON reales en `public/locales/...`)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

const ClientComponentExample = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next no expone useNumber; usar Intl.NumberFormat
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> No olvides agregar el espacio de nombres "about" en las serverSideTranslations de la página
> Aquí tomamos la versión de react 19.x.x, pero para versiones inferiores, necesitarás usar useMemo para almacenar la instancia del formateador ya que es una función pesada

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Traducciones (misma estructura; cárgalas en los mensajes de next-intl como prefieras)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Alcance directamente al objeto anidado
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> No olvides añadir el mensaje "about" en el mensaje cliente de la página

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Contenido**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ es: "Contador", en: "Counter", fr: "Compteur" }),
    increment: t({ es: "Incrementar", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Componente cliente**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // devuelve cadenas
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Comparación

- **Formato de números**
  - **next-i18next**: no tiene `useNumber`; usa `Intl.NumberFormat` (o i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` incorporado.

- **Claves**
  - Mantén una estructura anidada (`about.counter.label`) y delimita tu hook en consecuencia (`useTranslation("about")` + `t("counter.label")` o `useTranslations("about.counter")` + `t("label")`).

- **Ubicación de archivos**
  - **next-i18next** espera JSON en `public/locales/{lng}/{ns}.json`.
  - **next-intl** es flexible; carga mensajes como configures.
  - **Intlayer** almacena contenido en diccionarios TS/JS y resuelve por clave.

---

### Uso en un componente de servidor

Tomaremos el caso de un componente de interfaz de usuario (UI). Este componente es un componente del servidor y debe poder insertarse como hijo de un componente cliente. (página (componente servidor) -> componente cliente -> componente servidor). Como este componente puede insertarse como hijo de un componente cliente, no puede ser asíncrono.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { t, i18n } = useTranslation("about");
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
};

const ServerComponent = ({ t, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
};
```

> Como el componente del servidor no puede ser async, necesitas pasar las traducciones y la función formateadora como props.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer expone hooks **seguros para el servidor** a través de `next-intlayer/server`. Para funcionar, `useIntlayer` y `useNumber` utilizan una sintaxis similar a los hooks del cliente, pero dependen internamente del contexto del servidor (`IntlayerServerProvider`).

### Metadatos / Sitemap / Robots

Traducir contenido es genial. Pero la gente suele olvidar que el objetivo principal de la internacionalización es hacer que tu sitio web sea más visible para el mundo. La i18n es una palanca increíble para mejorar la visibilidad de tu sitio web.

Aquí tienes una lista de buenas prácticas relacionadas con el SEO multilingüe.

- establecer etiquetas meta hreflang en la etiqueta `<head>`
  > Ayuda a los motores de búsqueda a entender qué idiomas están disponibles en la página
- listar todas las traducciones de páginas en el sitemap.xml usando el esquema XML `http://www.w3.org/1999/xhtml`
  >
- no olvidar excluir las páginas con prefijo del robots.txt (por ejemplo, `/dashboard`, y `/fr/dashboard`, `/es/dashboard`)
  >
- usar un componente Link personalizado para redirigir a la página más localizada (por ejemplo, en francés `<a href="/fr/about">A propos</a>`)
  >

Los desarrolladores a menudo olvidan referenciar correctamente sus páginas entre los distintos locales.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinámicamente el archivo JSON correcto
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Acerca de</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto del código de la página
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto del código de la página
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Obtiene todas las URLs multilingües a partir de una lista de URLs
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configuración del archivo robots.txt con reglas para los rastreadores
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer proporciona una función `getMultilingualUrls` para generar URLs multilingües para tu sitemap.

---

---

## Y el ganador es…

No es sencillo. Cada opción tiene sus ventajas y desventajas. Así es como lo veo:

<Columns>
  <Column>

**next-intl**

- la más simple, ligera, con menos decisiones impuestas. Si quieres una solución **mínima**, te sientes cómodo con catálogos centralizados y tu aplicación es de tamaño **pequeño a mediano**.

  </Column>
  <Column>

**next-i18next**

- madura, llena de funciones, con muchos plugins comunitarios, pero con un costo de configuración más alto. Si necesitas el **ecosistema de plugins de i18next** (por ejemplo, reglas ICU avanzadas mediante plugins) y tu equipo ya conoce i18next, aceptando **más configuración** para mayor flexibilidad.

  </Column>
  <Column>

**Intlayer**

- construido para Next.js moderno, con contenido modular, seguridad de tipos, herramientas y menos código repetitivo. Si valoras el **contenido con alcance de componente**, **TypeScript estricto**, **garantías en tiempo de compilación**, **tree-shaking**, y herramientas integradas para enrutamiento/SEO/editor - especialmente para **Next.js App Router**, sistemas de diseño y **bases de código grandes y modulares**.

  </Column>
</Columns>

Si prefieres una configuración mínima y aceptas algo de cableado manual, next-intl es una buena opción. Si necesitas todas las funciones y no te importa la complejidad, next-i18next funciona. Pero si quieres una solución moderna, escalable y modular con herramientas integradas, Intlayer busca ofrecerte eso listo para usar.

> **Alternativa para equipos empresariales**: Si necesita una solución bien probada que funcione perfectamente con plataformas de localización establecidas como **Crowdin**, **Phrase** u otros sistemas profesionales de gestión de traducciones, considere **next-intl** o **next-i18next** por su ecosistema maduro e integraciones comprobadas.

> **Hoja de ruta futura**: Intlayer también planea desarrollar plugins que funcionen sobre las soluciones **i18next** y **next-intl**. Esto le brindará las ventajas de Intlayer para automatización, sintaxis y gestión de contenido, manteniendo al mismo tiempo la seguridad y estabilidad que proporcionan estas soluciones establecidas en el código de su aplicación.

## Estrellas en GitHub

Las estrellas de GitHub son un indicador fuerte de la popularidad de un proyecto, la confianza de la comunidad y la relevancia a largo plazo. Aunque no son una medida directa de la calidad técnica, reflejan cuántos desarrolladores encuentran útil el proyecto, siguen su progreso y probablemente lo adopten. Para estimar el valor de un proyecto, las estrellas ayudan a comparar la tracción entre alternativas y proporcionan información sobre el crecimiento del ecosistema.

[![Gráfico de Historial de Estrellas](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Conclusión

Las tres bibliotecas tienen éxito en la localización básica. La diferencia es **cuánto trabajo debes hacer** para lograr una configuración robusta y escalable en **Next.js moderno**:

- Con **Intlayer**, el **contenido modular**, **TS estricto**, **seguridad en tiempo de compilación**, **paquetes optimizados por tree-shaking** y **herramientas de App Router + SEO de primera clase** son **predeterminados**, no tareas.
- Si tu equipo valora la **mantenibilidad y velocidad** en una aplicación multilingüe impulsada por componentes, Intlayer ofrece la experiencia **más completa** hoy en día.

Consulta el documento ['¿Por qué Intlayer?'](https://intlayer.org/doc/why) para más detalles.
