---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrar de next-intl a Intlayer | Internacionalización (i18n)"
description: "Aprende cómo migrar tu aplicación Next.js de next-intl a Intlayer — paso a paso, sin romper tu código existente. Utiliza el adaptador de compatibilidad @intlayer/next-intl para una transición sin interrupciones."
keywords:
  - next-intl
  - intlayer
  - migración
  - internacionalización
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrar de next-intl a Intlayer

## ¿Por qué migrar de next-intl a Intlayer?

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

## Estrategia de migración

El enfoque recomendado para las aplicaciones existentes es el **adaptador de compatibilidad**: instala `@intlayer/next-intl`, que expone **exactamente la misma API** que `next-intl` pero delega todo el trabajo de traducción a Intlayer.

Mantienes tus `useTranslations`, `getTranslations`, `NextIntlClientProvider` existentes y demás elementos — **el único cambio es la ruta de importación**. No se requiere refactorizar firmas de llamada, formas de props o la estructura de los componentes.

Con el tiempo puedes, opcionalmente, migrar archivos individuales al formato `.content.ts` más rico de Intlayer para desbloquear el editor visual, el CMS y el alcance de contenido por componente — pero este paso es enteramente opcional y puede realizarse de forma gradual.

---

## Tabla de Contenidos

<TOC/>

---

## Migración rápida

Los siguientes pasos son el mínimo requerido para que tu aplicación `next-intl` existente funcione sobre Intlayer con cero cambios en el código.

<Steps>

<Step number={1} title="Instalar Dependencias">

Instala los paquetes principales de Intlayer y el adaptador de compatibilidad `@intlayer/next-intl`:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> Conserva instalado `next-intl` — sigue siendo necesario para el **enrutamiento URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). El adaptador de compatibilidad **no** reemplaza la capa de enrutamiento.

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
      // 'icu' coincide con la sintaxis de marcador de posición ICU de next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** asigna un idioma a su ruta de archivo JSON. **`location`** le indica al observador de Intlayer qué carpeta monitorear en busca de cambios. La opción `format: 'icu'` asegura que los marcadores de posición ICU como `{name}` y `{count, plural, one {# item} other {# items}}` se analicen correctamente.

> Para obtener una lista completa de opciones de configuración, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={3} title="Añadir el Plugin de Intlayer a Next.js">

Envuelve tu configuración existente de Next.js con `createNextIntlPlugin` desde `@intlayer/next-intl/plugin`. Este envoltorio compone `withIntlayer` **e** inyecta los alias `next-intl` → `@intlayer/next-intl` por ti:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* tus opciones de configuración existentes */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` envuelve a `withIntlayer`, detecta automáticamente **Webpack** o **Turbopack**, vincula el monitoreo de contenido, compila los diccionarios y, lo más importante, **inyecta alias de módulos** para que tus llamadas existentes a `import … from 'next-intl'` sean redirigidas de forma transparente a `@intlayer/next-intl` en tiempo de compilación. La entrada de enrutamiento `next-intl/routing` sigue apuntando al paquete real. No se requieren cambios en los archivos de origen.
>
> ¿Prefieres usar el `withIntlayer` sencillo de `next-intlayer/server`? Compilará tus diccionarios, pero **no** añadirá los alias de `next-intl` — tendrías que renombrar las importaciones a `@intlayer/next-intl` manualmente (ver el Paso 4).

> **Ya no necesitas `getRequestConfig` o `loadMessages`.** Con `next-intl`, tenías que escribir un archivo `src/i18n.ts` que cargaba paquetes de mensajes JSON en cada solicitud a través de `getRequestConfig`. Intlayer compila todos los diccionarios **en tiempo de compilación**, por lo que no hay paso de carga en tiempo de ejecución. Puedes borrar ese archivo por completo (o mantener solo las partes de enrutamiento si aún utilizas `createNavigation`).

</Step>

</Steps>

Eso es todo para la migración rápida. Tu aplicación ahora funciona sobre Intlayer mientras mantiene intactas todas las importaciones y APIs de `next-intl`.

> **Claves de traducción tipadas — automáticas.** Una vez que Intlayer compila tus diccionarios, `useTranslations` y `getTranslations` quedan tipados en relación a tu contenido real. Las claves se autocompletan en tu IDE y las rutas inválidas provocan errores de TypeScript en tiempo de compilación — sin configuraciones adicionales requeridas.
>
> ```tsx
> // Componente de cliente — 'about' es una clave de diccionario registrada
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompletado
> t("does.not.exist"); // ✗ Error de TypeScript
>
> // Componente de servidor
> const t = await getTranslations("about");
> t("counter.label"); // ✓ tipado
> ```

---

## Migración completa

Los pasos a continuación son opcionales y pueden hacerse incrementalmente. Desbloquean todas las funcionalidades de Intlayer: editor visual, CMS, archivos de contenido tipados, automatización de traducción con IA y más.

<Steps>

<Step number={4} title="Renombrar importaciones explícitamente (opcional)" isOptional={true}>

El contenedor `createNextIntlPlugin()` ya maneja el alias de `next-intl` → `@intlayer/next-intl` a nivel del empaquetador. Si prefieres hacer la dependencia explícita en tus archivos de origen (y usar el plugin `withIntlayer` regular en su lugar), puedes renombrar las importaciones manualmente:

| Antes                                                | Después                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Mantén siempre las importaciones de enrutamiento del `next-intl` real — el adaptador de compatibilidad **no** reemplaza la capa de enrutamiento URL:
>
> ```ts
> // ✅ Mantén siempre estos desde el 'next-intl' real
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> De manera alternativa, puedes usar `defineRouting` de `@intlayer/next-intl/routing` que combina la configuración de idiomas de tu `intlayer.config.ts` automáticamente.

</Step>

<Step number={5} title="Activar la Automatización de Traducción con IA" isOptional={true}>

Una vez que Intlayer esté configurado, puedes usar su CLI para llenar automáticamente las traducciones faltantes utilizando el LLM de tu elección:

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

Añade una `OPENAI_API_KEY` (o la clave de tu proveedor preferido) a tu archivo `.env`, luego amplía tu `intlayer.config.ts`:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Una vez que `@intlayer/next-intl` esté en su lugar, el siguiente código repetitivo de `next-intl` se puede eliminar:

| Archivo / patrón                                      | Por qué ya no es necesario                                                                                                                                                                           |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exportación `getRequestConfig` de `src/i18n.ts`       | Intlayer compila los diccionarios en tiempo de compilación; no hay carga de mensajes por cada solicitud. Conserva el archivo solo si exporta además ayudantes de enrutamiento de `createNavigation`. |
| Llamadas `loadMessages()` / `getMessages()` en layout | El `NextIntlClientProvider` de `@intlayer/next-intl` lee de la salida compilada; no se requiere la prop `messages`.                                                                                  |
| Importaciones `locales/{locale}/*.json` en layout     | Los bundles JSON solo son necesarios si aún utilizas el plugin `syncJSON`. Una vez que migres a archivos `.content.ts`, puedes borrar la carpeta JSON.                                               |

Cuando estés listo para ir más allá, Intlayer **descubre automáticamente todos los archivos `.content.ts` y `.content.json` en cualquier lugar de tu código base** (por defecto, en cualquier lugar dentro de `./src`). Puedes colocar un archivo `about.content.ts` directamente junto a tu `about/page.tsx` e Intlayer lo tomará al momento de compilación sin configuración adicional — sin importaciones, sin registro, sin necesidad de un archivo índice centralizado. Esto hace que la co-localización de traducciones sea completamente fluida con las páginas y componentes.

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
- **Intlayer con Next.js** — Guía de configuración completa para Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)
