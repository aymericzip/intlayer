---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrar de i18next a Intlayer | Internacionalización (i18n)"
description: "Aprende cómo migrar tu aplicación JavaScript/TypeScript de i18next a Intlayer — paso a paso, sin romper tu código existente. Utiliza el adaptador de compatibilidad @intlayer/i18next para una transición sin interrupciones."
keywords:
  - i18next
  - intlayer
  - migración
  - internacionalización
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Migrar de i18next a Intlayer

## ¿Por qué migrar de i18next a Intlayer?

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

Existen dos estrategias complementarias para migrar de `i18next` a Intlayer:

1. **Adaptador de compatibilidad (recomendado para aplicaciones existentes)** — Instala `@intlayer/i18next`. Este paquete expone **exactamente la misma API** que `i18next` pero delega todo el trabajo de traducción a Intlayer en segundo plano. Mantienes tus llamadas existentes a `i18next.t()`, `i18next.changeLanguage()` y `createInstance()` — el único cambio es la ruta de importación y la inicialización.

2. **Migración completa** — Reemplaza gradualmente las APIs de `i18next` por herramientas nativas de Intlayer y colocaliza el contenido en archivos `.content.ts`.

Esta guía cubre primero la **Estrategia 1** (adaptador de compatibilidad de fácil uso), y luego revisa la migración completa opcional.

---

## Tabla de Contenidos

<TOC/>

---

## Migración rápida

Los siguientes pasos son el mínimo requerido para que tu aplicación `i18next` existente funcione sobre Intlayer sin cambios en el código.

<Steps>

<Step number={1} title="Instalar Dependencias">

Instala los paquetes principales de Intlayer y el adaptador de compatibilidad:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Puedes mantener `i18next` instalado — el adaptador de compatibilidad lo usa como `devDependency` / `peerDependency` para los tipos de TypeScript.

</Step>

<Step number={2} title="Configurar Intlayer">

El comando `intlayer init` crea un archivo inicial `intlayer.config.ts`. Actualízalo para que coincida con tus idiomas (locales) existentes y apunta el plugin `syncJSON` a tus archivos de mensajes:

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
      // coincide con la sintaxis de marcador de posición de i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** asigna un idioma a su ruta de archivo JSON. **`location`** le indica al observador de Intlayer qué carpeta monitorear en busca de cambios. La opción `format: 'i18next'` asegura que los marcadores de posición como `{{name}}` se analicen correctamente.

</Step>

<Step number={3} title="Actualizar los alias del Bundler (Opcional)">

Si estás usando un empaquetador (Vite, Webpack, esbuild), puedes inyectar un alias de módulo para que `import ... from 'i18next'` se resuelva automáticamente a `@intlayer/i18next`. Esto elimina la necesidad de cambiar manualmente cualquier importación en tu base de código.

**Para Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` envuelve el plugin `intlayer()` de `vite-intlayer` y añade el alias `i18next` → `@intlayer/i18next` por ti. Usar el plugin simple `intlayer()` de `vite-intlayer` compila los diccionarios pero **no** añade el alias — entonces tendrías que renombrar las importaciones a `@intlayer/i18next` manualmente (ver el siguiente paso).

</Step>

</Steps>

Eso es todo para la migración rápida. Tu aplicación ahora funciona sobre Intlayer mientras mantiene intactas todas las importaciones y APIs de `i18next`.

---

## Migración completa

Los pasos a continuación son opcionales y pueden hacerse incrementalmente. Desbloquean todas las funcionalidades de Intlayer: editor visual, CMS, archivos de contenido tipados, automatización de traducción con IA y más.

<Steps>

<Step number={4} title="Renombrar importaciones explícitamente (opcional)" isOptional={true}>

Si prefieres hacer la dependencia explícita en tus archivos fuente, o si no usas un plugin de bundler para alias de importación, puedes renombrar las importaciones manualmente:

| Antes                                      | Después                                              |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

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

Una vez que el adaptador de compatibilidad esté en su lugar, el siguiente código repetitivo de `i18next` se puede eliminar:

| Archivo / patrón                           | Por qué ya no es necesario                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Llamadas `i18next.init()`                  | Intlayer inicializa todo automáticamente; no hay paso de carga en tiempo de ejecución.                                                                 |
| `i18next.use(...)`                         | Intlayer no usa plugins de i18next, backends o detectores de idiomas.                                                                                  |
| Bundles de idiomas JSON (`locales/*.json`) | Los bundles JSON solo son necesarios si aún utilizas el plugin `syncJSON`. Una vez que migres a archivos `.content.ts`, puedes borrar la carpeta JSON. |

Cuando estés listo para ir más allá, Intlayer **descubre automáticamente todos los archivos `.content.ts` y `.content.json` en cualquier lugar de tu código base** (por defecto, en cualquier lugar dentro de `./src`). Puedes colocar un archivo `my-component.content.ts` directamente junto a tu lógica y Intlayer lo tomará al momento de compilación sin configuración adicional — sin importaciones, sin registro, sin necesidad de un archivo índice centralizado. Esto hace que la co-localización de traducciones sea completamente fluida.

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
