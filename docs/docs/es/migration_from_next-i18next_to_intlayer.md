---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrar de next-i18next a Intlayer | Internacionalización (i18n)"
description: "Aprende cómo migrar tu aplicación Next.js de next-i18next a Intlayer — paso a paso, sin romper tu código existente. Utiliza el adaptador de compatibilidad @intlayer/next-i18next para una transición sin interrupciones."
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - migración
  - internacionalización
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Migrar de next-i18next a Intlayer

## ¿Por qué migrar de next-i18next a Intlayer?

<AccordionGroup>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en tus páginas, carga solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de tu bundle y tus páginas hasta en un 50 %**.

</Accordion>

<Accordion header="Mantenibilidad">

Establecer un alcance al contenido de tu aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puedes duplicar o eliminar una carpeta de función completa sin la carga mental de revisar todo el código de tu contenido. Además, Intlayer está **completamente tipado** para asegurar la precisión de tu contenido.

Intlayer es también la solución con el **desarrollo más activo** en el ecosistema i18n — los problemas se solucionan rápidamente, nuevos adaptadores de framework se añaden regularmente y la API principal se refina continuamente basándose en retroalimentación real de producción.

</Accordion>

<Accordion header="Agente de IA">

Colocalizar el contenido **reduce el contexto necesario** para los Grandes Modelos de Lenguaje (LLM). Intlayer también incluye una suite de herramientas, como un **CLI** para probar traducciones faltantes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)** y **[habilidades de agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Usa la automatización para traducir en tu flujo de CI/CD utilizando el LLM de tu elección al costo de tu proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Rendimiento">

Conectar archivos JSON masivos a los componentes puede llevar a problemas de rendimiento y reactividad. Intlayer optimiza la carga de tu contenido en tiempo de compilación.

</Accordion>

<Accordion header="Escalabilidad con no-desarrolladores">

Más que una simple solución de i18n, Intlayer proporciona un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)** autohospedado y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para ayudarte a gestionar tu contenido multilingüe en **tiempo real**, haciendo la colaboración con traductores, redactores y otros miembros del equipo fluida. El contenido se puede almacenar local y/o remotamente.

</Accordion>

</AccordionGroup>

---

## Estrategias de migración

Dado que `next-i18next` envuelve a `react-i18next` e `i18next` internamente, existen dos estrategias complementarias para migrar hacia Intlayer:

1. **Adaptador de compatibilidad (recomendado para aplicaciones existentes)** — Instala `@intlayer/next-i18next`, `@intlayer/react-i18next`, y `@intlayer/i18next`. Estos paquetes exponen **exactamente la misma API** que sus equivalentes, pero delegan todo el trabajo de traducción a Intlayer. Mantienes tus llamadas existentes a `useTranslation`, `appWithTranslation`, `serverSideTranslations` y el enrutamiento de páginas de Next.js sin cambios — el único cambio es la inicialización.

2. **Migración completa** — Reemplaza gradualmente las APIs de `next-i18next` por hooks nativos de Intlayer (`useIntlayer`) y colocaliza el contenido en archivos `.content.ts` junto a tus componentes.

Esta guía cubre primero la **Estrategia 1** (adaptador de compatibilidad de fácil uso), y luego revisa la migración completa opcional.

---

## Tabla de Contenidos

<TOC/>

---

## Migración rápida

Los siguientes pasos son el mínimo requerido para que tu aplicación Next.js Pages Router existente funcione sobre Intlayer con cero cambios de código en tus páginas y componentes.

<Steps>

<Step number={1} title="Instalar Dependencias">

Instala los paquetes principales de Intlayer y los adaptadores de compatibilidad:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Puedes mantener de manera segura `next-i18next`, `react-i18next`, e `i18next` instalados durante la migración, aunque los eliminarás una vez configurados los alias.

</Step>

<Step number={2} title="Configurar Intlayer">

El comando `intlayer init` crea un archivo inicial `intlayer.config.ts`. Actualízalo para que coincida con tus idiomas existentes y apunta el plugin `syncJSON` a tus archivos de mensajes de `next-i18next` (usualmente en `public/locales`):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Agrega todos tus idiomas existentes aquí
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // coincide con la sintaxis de marcador de posición i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** asigna un idioma y un espacio de nombres (`key`) a la ruta de su archivo JSON. **`location`** le indica al observador de Intlayer qué carpeta monitorear. La opción `format: 'i18next'` asegura que los marcadores de posición se analicen correctamente para `next-i18next`.

</Step>

<Step number={3} title="Actualizar la Configuración de Next.js">

Envuelve tu archivo existente `next.config.ts` (o `.js`) con `createNextI18nPlugin` de `@intlayer/next-i18next/plugin`. Este envoltorio compone `withIntlayer` **e** inyecta los alias `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, de modo que tus llamadas a `import { useTranslation } from 'next-i18next'` se redirijan transparentemente en tiempo de compilación. No se necesitan cambios en los archivos fuente.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Puedes eliminar la configuración i18n importada de next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer gestiona el enrutamiento i18n de Next.js de manera interna,
  // por lo que ya no necesitas pasar el objeto i18n aquí.
};

export default withIntlayer(nextConfig);
```

> **Ya no necesitas el archivo `next-i18next.config.js`.** Intlayer compila todos los diccionarios **en tiempo de compilación**, gestionando la detección del idioma, el enrutamiento y la carga de diccionarios a la perfección.
>
> ¿Prefieres el plugin simple `withIntlayer` de `next-intlayer/server`? Compila tus diccionarios pero **no** añade los alias de `next-i18next` / `react-i18next` / `i18next` — tendrías que renombrar las importaciones a `@intlayer/*` manualmente (ver el Paso 4).

</Step>

</Steps>

Eso es todo para la migración rápida. Tu aplicación Next.js ahora funciona sobre Intlayer mientras mantiene intactas todas las llamadas a `useTranslation`, `serverSideTranslations` y `appWithTranslation`.

> **Claves de traducción tipadas — automáticas.** Una vez que Intlayer compila tus diccionarios, `useTranslation` y `getFixedT` quedan tipados en relación con tu contenido real. Las claves se autocompletan en tu IDE y las rutas inválidas provocan errores de TypeScript en tiempo de compilación — sin configuraciones adicionales requeridas.
>
> ```tsx
> // Pages Router — 'about' es una clave registrada
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompletado
> t("does.not.exist"); // ✗ Error de TypeScript
>
> // getStaticProps / getServerSideProps (instancia i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tipado
> ```

---

## Migración completa

Los pasos a continuación son opcionales y pueden hacerse incrementalmente. Desbloquean todas las funcionalidades de Intlayer: editor visual, CMS, archivos de contenido tipados, automatización de traducción con IA y más.

<Steps>

<Step number={4} title="Renombrar importaciones explícitamente (opcional)" isOptional={true}>

El plugin de Intlayer ya maneja los alias a nivel del empaquetador. Si prefieres hacer la dependencia explícita en tus archivos fuente, puedes renombrar las importaciones manualmente:

| Antes                                                                          | Después                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Estos son **reemplazos directos** — no se requieren cambios en las firmas de llamada, argumentos o tipos de retorno.

</Step>

<Step number={5} title="Activar la Automatización de Traducción con IA" isOptional={true}>

Una vez que Intlayer esté configurado, utiliza su CLI para llenar automáticamente las traducciones faltantes:

```bash packageManager="npm"
# Probar traducciones faltantes (agregar al CI)
npx intlayer test

# Llenar traducciones faltantes con IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Añade la configuración de IA a `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> Consulta la [documentación de CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para ver todas las opciones disponibles.

</Step>

</Steps>

---

## Qué puedes eliminar tras la migración

Una vez que el adaptador de compatibilidad esté en su lugar, el siguiente código repetitivo de `next-i18next` se puede eliminar:

| Archivo / patrón                                  | Por qué ya no es necesario                                                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `next-i18next.config.js`                          | Intlayer gestiona el enrutamiento, la carga de diccionarios y los idiomas por defecto internamente basándose en `intlayer.config.ts`.                  |
| `next-i18next` del `package.json`                 | Reemplazado completamente por `@intlayer/next-i18next` y alias.                                                                                        |
| Bundles de idiomas JSON (`public/locales/*.json`) | Los bundles JSON solo son necesarios si aún utilizas el plugin `syncJSON`. Una vez que migres a archivos `.content.ts`, puedes borrar la carpeta JSON. |

Cuando estés listo para ir más allá, Intlayer **descubre automáticamente todos los archivos `.content.ts` y `.content.json` en cualquier lugar de tu código base** (por defecto, en cualquier lugar dentro de `./src`). Puedes colocar un archivo `my-component.content.ts` directamente junto a tu `MyComponent.tsx` y Intlayer lo tomará al momento de compilación sin configuración adicional — sin importaciones, sin registro, sin necesidad de un archivo índice centralizado. Esto hace que la co-localización de traducciones sea completamente fluida con las páginas y componentes.

---

## Configurar TypeScript

Intlayer usa el aumento de módulos para ofrecer autocompletado completo de TypeScript para tus claves de traducción. Asegúrate de que tu `tsconfig.json` incluya los tipos generados automáticamente:

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  "include": [
    // ... Tus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos generados automáticamente
  ],
}
```

---

## Configuración de Git

Añade el directorio generado por Intlayer a tu `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Profundizar Más

- **Editor Visual** — Gestiona las traducciones visualmente en tu navegador: [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- **CMS** — Externaliza y gestiona contenido de forma remota: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
- **Extensión de VS Code** — Obtén autocompletado y detección de errores de traducción en tiempo real: [Extensión de VS Code de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)
- **Referencia del CLI** — Lista completa de comandos CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- **Intlayer con Next.js (Pages Router)** — Guía de configuración completa para Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_page_router.md)
