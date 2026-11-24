---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar de svelte-i18n a Intlayer"
description: "Migra una aplicación Svelte o SvelteKit de svelte-i18n a Intlayer paso a paso. Mantén funcionando los stores $_, $date y $number con el compat adapter @intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar de svelte-i18n a Intlayer

## ¿Por qué migrar de svelte-i18n a Intlayer?

<AccordionGroup>
<Accordion header="Tamaño del bundle">

svelte-i18n registra archivos de locale completos al arrancar. Intlayer solo envía los diccionarios que usa cada página, lo que **reduce el tamaño de tus bundles y páginas hasta un 50 %**.

</Accordion>
<Accordion header="Mantenibilidad">

Las claves están **tipadas** según tus diccionarios: las claves inválidas fallan en el build. El contenido puede ubicarse junto a los componentes que lo usan.

</Accordion>
<Accordion header="Agente de IA">

El contenido ubicado junto a los componentes **reduce el contexto necesario** para los LLM. Intlayer incluye una **CLI** para detectar traducciones faltantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, un **[servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**.

</Accordion>
<Accordion header="Automatización">

Traduce los mensajes faltantes en tu pipeline de CI/CD con el LLM que prefieras, o en segundo plano con la [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

</Accordion>
<Accordion header="Escalar con perfiles no técnicos">

Intlayer ofrece un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)** autoalojado y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para que traductores y redactores editen el contenido en tiempo real.

</Accordion>
</AccordionGroup>

> Para entender de dónde vienen estas librerías, lee [la historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md).

## Estrategias de migración

1. **Compat adapter (recomendado para aplicaciones existentes)**: instala `@intlayer/svelte-i18n`. Expone la misma API que `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) y sirve los mensajes desde los diccionarios de Intlayer. ICU MessageFormat funciona como antes.
2. **Migración completa**: reemplaza gradualmente los stores de svelte-i18n por `useIntlayer` de `svelte-intlayer` y archivos `.content.ts` ubicados junto a tus componentes.

## Tabla de contenidos

<TOC/>

## Migración rápida

<Steps>
<Step number={1} title="Instalar dependencias">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> El flag `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

El comando detecta tu entorno e instala los packages necesarios, por ejemplo:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> Mantén `svelte-i18n` instalado: aporta los tipos de TypeScript.

</Step>
<Step number={2} title="Configurar Intlayer">

Apunta el plugin `syncJSON` a tus archivos de mensajes existentes. Con un archivo por namespace (`src/locales/en/home.json`), cada archivo se convierte en un diccionario:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` se resuelve al campo `title` del diccionario `home`. Si usas un único archivo por locale (`src/locales/en.json`) con namespaces anidados, usa en su lugar `source: ({ locale }) => \`./src/locales/${locale}.json\``: cada clave de primer nivel se convierte en un diccionario.

</Step>
<Step number={3} title="Añadir el plugin de Vite">

`svelteI18nVitePlugin()` ejecuta el build de Intlayer y crea un alias de `svelte-i18n` hacia `@intlayer/svelte-i18n`, sin cambios en tus archivos fuente.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> Para SvelteKit, añade `svelteI18nVitePlugin()` después de `sveltekit()` en el mismo array `plugins`.

</Step>
<Step number={4} title="Simplificar la configuración i18n">

Mantén `init()`, pero elimina `register()` y `addMessages()`: los mensajes vienen de los diccionarios de Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Tus componentes siguen funcionando sin cambios:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Asignar `$locale = 'fr'` cambia el idioma tanto de los stores de svelte-i18n como de `useIntlayer`.

## Migración completa

<Steps>
<Step number={5} title="Renombrado explícito de imports (opcional)" isOptional={true}>

El plugin de Vite ya gestiona los alias. Para hacer explícita la dependencia:

| Antes                                        | Después                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Mover el contenido a archivos .content.ts" isOptional={true}>

Los nuevos componentes pueden usar contenido nativo de Intlayer, junto a las llamadas de svelte-i18n existentes:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="Activar la traducción con IA" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
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

Las traducciones completadas se escriben de vuelta en tus archivos JSON. Consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para configurar la IA.

</Step>
</Steps>

## Qué puedes eliminar después de la migración

| Archivo / patrón                          | Por qué ya no es necesario                                    |
| ----------------------------------------- | ------------------------------------------------------------- |
| Llamadas a `register()` / `addMessages()` | Intlayer compila y carga los diccionarios.                    |
| `waitLocale()` antes del render           | Los mensajes están disponibles en cuanto se define la locale. |

## Configurar TypeScript

Incluye los tipos generados en tu `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Configuración de Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter de svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/svelte-i18n.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)
- [Intlayer con Vite y Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md)
- [Intlayer con SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_svelte_kit.md)
- [Editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
