---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrar de vue-i18n a Intlayer | Internacionalización (i18n)"
description: "Aprende cómo migrar tu aplicación Vue o Nuxt de vue-i18n a Intlayer — paso a paso, sin romper tu código existente. Utiliza el adaptador de compatibilidad @intlayer/vue-i18n para una transición sin interrupciones."
keywords:
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
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrar de vue-i18n a Intlayer

## ¿Por qué migrar de vue-i18n a Intlayer?

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

Existen dos estrategias complementarias para migrar de `vue-i18n` a Intlayer:

1. **Adaptador de compatibilidad (recomendado para aplicaciones existentes)** — Instala `@intlayer/vue-i18n` (para los componentes de Vue). Este paquete expone **exactamente la misma API** que `vue-i18n` pero delega todo el trabajo de traducción a Intlayer. Mantienes tus llamadas existentes a `$t`, `useI18n()`, y `<i18n-t>` — el único cambio es la ruta de importación y la inicialización.

2. **Migración completa** — Reemplaza gradualmente las APIs de `vue-i18n` por hooks nativos de Intlayer (`useIntlayer`) y colocaliza el contenido en archivos `.content.ts` junto a tus componentes.

Esta guía cubre primero la **Estrategia 1** (adaptador de compatibilidad de fácil uso), y luego revisa la migración completa opcional.

---

## Tabla de Contenidos

<TOC/>

---

## Migración rápida

Los siguientes pasos son el mínimo requerido para que tu aplicación `vue-i18n` existente funcione sobre Intlayer con cero cambios en el código de tus componentes.

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

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Puedes mantener `vue-i18n` instalado — el adaptador de compatibilidad lo usa como `devDependency` / `peerDependency` para los tipos de TypeScript.

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
      // coincide con la sintaxis de marcador de posición vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** asigna un idioma a su ruta de archivo JSON. **`location`** le indica al observador de Intlayer qué carpeta monitorear en busca de cambios. La opción `format: 'icu'` asegura que los marcadores de posición se analicen correctamente para `vue-i18n`.

</Step>

<Step number={3} title="Añadir el Plugin de Intlayer a tu Bundler">

Envuelve tu configuración de empaquetador existente con el plugin de compatibilidad. Este compone el plugin principal de Intlayer, vincula el monitoreo de contenido, y — críticamente — **inyecta un alias de módulo** para que tus llamadas a `import … from 'vue-i18n'` sean redirigidas de forma transparente a `@intlayer/vue-i18n` en tiempo de compilación. No se requieren cambios en los archivos fuente.

**Para Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` envuelve el plugin `intlayer()` de `vite-intlayer` y añade el alias `vue-i18n`. Usar el plugin regular `intlayer()` de `vite-intlayer` compila los diccionarios pero **no** añade el alias — tendrías que renombrar las importaciones a `@intlayer/vue-i18n` manualmente (ver el Paso 4).

**Para Nuxt:**

Si estás usando `@nuxtjs/i18n` (integración con Nuxt), instala `nuxt-intlayer` y añádelo a tu `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Puedes eliminar @nuxtjs/i18n de tus módulos
});
```

> **Ya no necesitas `createI18n()` ni configuración manual del provider.** Intlayer compila todos los diccionarios **en tiempo de compilación**, por lo que no hay paso de carga en tiempo de ejecución. El proveedor aliasado maneja la inicialización por ti.

</Step>

</Steps>

Eso es todo para la migración rápida. Tu aplicación ahora funciona sobre Intlayer mientras mantiene intactas todas las importaciones y APIs de `vue-i18n`.

> **Claves de traducción tipadas — automáticas.** Una vez que Intlayer compila tus diccionarios, `useI18n` queda tipado en relación a tu contenido real al pasar una opción `namespace`. Las claves se autocompletan en tu IDE y las rutas inválidas provocan errores de TypeScript en tiempo de compilación — sin configuraciones adicionales requeridas.
>
> ```ts
> // 'about' es una clave de diccionario registrada
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompletado
> t("does.not.exist"); // ✗ Error de TypeScript
> ```

---

## Migración completa

Los pasos a continuación son opcionales y pueden hacerse incrementalmente. Desbloquean todas las funcionalidades de Intlayer: editor visual, CMS, archivos de contenido tipados, automatización de traducción con IA y más.

<Steps>

<Step number={4} title="Renombrar importaciones explícitamente (opcional)" isOptional={true}>

Los plugins de Intlayer ya manejan los alias a nivel del empaquetador. Si prefieres hacer la dependencia explícita en tus archivos de origen, puedes renombrar las importaciones manualmente:

| Antes                                   | Después                                           |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

Una vez que los adaptadores de compatibilidad estén en su lugar, el siguiente código repetitivo de `vue-i18n` se puede eliminar:

| Archivo / patrón                             | Por qué ya no es necesario                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Llamadas a `createI18n()`                    | El proveedor de Intlayer inicializa todo automáticamente; no hay paso de carga en tiempo de ejecución.                                                 |
| Registro del plugin de Vue (`app.use(i18n)`) | El plugin de Intlayer maneja la inyección internamente.                                                                                                |
| Bundles de idiomas JSON (`locales/*.json`)   | Los bundles JSON solo son necesarios si aún utilizas el plugin `syncJSON`. Una vez que migres a archivos `.content.ts`, puedes borrar la carpeta JSON. |

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
- **Intlayer con Vue** — Guía de configuración completa para Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)
- **Intlayer con Nuxt** — Guía de configuración completa para Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md)
