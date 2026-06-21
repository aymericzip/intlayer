---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrar de @nuxtjs/i18n a Intlayer | Internacionalización (i18n)"
description: "Aprende cómo migrar tu aplicación Nuxt de @nuxtjs/i18n a Intlayer — paso a paso, sin romper tu código existente. Utiliza el adaptador de compatibilidad @intlayer/vue-i18n para una transición sin interrupciones."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migración
  - internacionalización
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrar de @nuxtjs/i18n a Intlayer

## ¿Por qué migrar de @nuxtjs/i18n a Intlayer?

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

Dado que `@nuxtjs/i18n` está impulsado internamente por `vue-i18n`, existen dos estrategias complementarias para migrar hacia Intlayer:

1. **Adaptador de compatibilidad (recomendado para aplicaciones existentes)** — Instala `@intlayer/vue-i18n` y `nuxt-intlayer`. Esto expone **exactamente la misma API** que `vue-i18n` pero delega todo el trabajo de traducción a Intlayer. Mantienes tus llamadas existentes a `$t`, `useI18n()` y el enrutamiento de Nuxt sin cambios — el único cambio es la inicialización.

2. **Migración completa** — Reemplaza gradualmente las APIs de `@nuxtjs/i18n` por hooks nativos de Intlayer (`useIntlayer`) y colocaliza el contenido en archivos `.content.ts` junto a tus componentes.

Esta guía cubre primero la **Estrategia 1** (adaptador de compatibilidad de fácil uso), y luego revisa la migración completa opcional.

---

## Tabla de Contenidos

<TOC/>

---

## Migración rápida

Los siguientes pasos son el mínimo requerido para que tu aplicación Nuxt existente funcione sobre Intlayer con cero cambios en el código de tus componentes.

<Steps>

<Step number={1} title="Instalar Dependencias">

Instala los paquetes principales de Intlayer y el adaptador de compatibilidad:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Puedes mantener de forma segura `@nuxtjs/i18n` instalado durante la migración, aunque en breve lo eliminarás de tu configuración de Nuxt.

</Step>

<Step number={2} title="Configurar Intlayer">

El comando `intlayer init` crea un archivo inicial `intlayer.config.ts`. Actualízalo para que coincida con tus idiomas existentes y apunta el plugin `syncJSON` a tus archivos de mensajes:

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
      // coincide con la sintaxis de marcador de posición de vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** asigna un idioma a su ruta de archivo JSON. **`location`** le indica al observador de Intlayer qué carpeta monitorear en busca de cambios. La opción `format: 'icu'` asegura que los marcadores de posición se analicen correctamente para `vue-i18n`.

</Step>

<Step number={3} title="Actualizar la Configuración de Nuxt">

Reemplaza el módulo `@nuxtjs/i18n` por `nuxt-intlayer` en tu `nuxt.config.ts`. El plugin de Intlayer inyecta automáticamente los alias de módulo, lo que significa que tus llamadas a `import { useI18n } from 'vue-i18n'` se redirigen transparentemente a `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Elimina '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Ya no necesitas definir los objetos de configuración i18n de Nuxt.** Intlayer compila todos los diccionarios **en tiempo de compilación**, gestionando la detección del idioma, el enrutamiento y la carga de diccionarios de forma impecable.

</Step>

</Steps>

Eso es todo para la migración rápida. Tu aplicación Nuxt ahora funciona sobre Intlayer mientras mantiene intactas todas las llamadas a `$t` y `useI18n()`.

---

## Migración completa

Los pasos a continuación son opcionales y pueden hacerse incrementalmente. Desbloquean todas las funcionalidades de Intlayer: editor visual, CMS, archivos de contenido tipados, automatización de traducción con IA y más.

<Steps>

<Step number={4} title="Renombrar importaciones explícitamente (opcional)" isOptional={true}>

Los plugins de Intlayer ya manejan los alias a nivel del empaquetador. Si prefieres hacer la dependencia explícita en tus archivos de origen, puedes renombrar las importaciones manualmente:

| Antes                                | Después                                        |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

Una vez que el adaptador de compatibilidad esté en su lugar, el siguiente código repetitivo se puede eliminar:

| Archivo / patrón                              | Por qué ya no es necesario                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| configuraciones de `i18n` en `nuxt.config.ts` | Intlayer gestiona el enrutamiento, la carga de diccionarios y los idiomas por defecto de manera interna.                                               |
| `@nuxtjs/i18n` en `package.json`              | Reemplazado completamente por `nuxt-intlayer`.                                                                                                         |
| Bundles de idiomas JSON (`locales/*.json`)    | Los bundles JSON solo son necesarios si aún utilizas el plugin `syncJSON`. Una vez que migres a archivos `.content.ts`, puedes borrar la carpeta JSON. |

Cuando estés listo para ir más allá, Intlayer **descubre automáticamente todos los archivos `.content.ts` y `.content.json` en cualquier lugar de tu código base** (por defecto, en cualquier lugar dentro de `./src`). Puedes colocar un archivo `my-component.content.ts` directamente junto a tu `MyComponent.vue` e Intlayer lo tomará al momento de compilación sin configuración adicional — sin importaciones, sin registro, sin necesidad de un archivo índice centralizado. Esto hace que la co-localización de traducciones con páginas y componentes sea completamente fluida.

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
- **Intlayer con Nuxt** — Guía de configuración completa para Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md)
- **Intlayer con Vue** — Guía de configuración completa para Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)
