---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar de Lingui a Intlayer"
description: "Migra una aplicación React de Lingui a Intlayer paso a paso. Mantén funcionando tus macros de Lingui, useLingui y <Trans> con el compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar de Lingui a Intlayer

## ¿Por qué migrar de Lingui a Intlayer?

<AccordionGroup>
<Accordion header="Tamaño del bundle">

Lingui carga un catálogo compilado por locale, con todos los mensajes de la aplicación. Intlayer divide el contenido por diccionario y solo envía lo que usa cada página, lo que **reduce el tamaño de tus bundles y páginas hasta un 50 %**.

</Accordion>
<Accordion header="Mantenibilidad">

Los diccionarios de Intlayer están **totalmente tipados** y pueden ubicarse junto a los componentes que los usan. Sin pasos `extract` / `compile` que recordar: los diccionarios los genera el plugin del bundler.

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

1. **Compat adapter (recomendado para aplicaciones existentes)**: instala `@intlayer/lingui`. Expone la misma API que `@lingui/core` y `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) y sirve los mensajes desde los diccionarios de Intlayer. Tus macros (`` t`…` ``, `<Trans>`, `msg`, `plural`) siguen compilando exactamente igual que antes.
2. **Migración completa**: reemplaza gradualmente las llamadas de Lingui por `useIntlayer` y archivos `.content.ts` ubicados junto a tus componentes.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Mantén instalados `@lingui/core`, `@lingui/react` y tu plugin de macros (`@lingui/babel-plugin-lingui-macro` o `@lingui/swc-plugin`). Las macros siguen ejecutándose, y los packages de Lingui aportan los tipos de TypeScript.

</Step>
<Step number={2} title="Configurar Intlayer">

Intlayer lee tus catálogos de Lingui como fuente de verdad. Con la estructura por defecto de Lingui (`src/locales/{locale}/messages.po`), apunta el plugin `syncPO` hacia ellos:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Usar catálogos JSON">

Con `@lingui/format-json`, usa `syncJSON` con el formato ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Usa ids de mensaje explícitos (`t({ id: "hero.title", message: "Welcome" })` o `<Trans id="hero.title">`). Los ids generados a partir del texto fuente no se resuelven contra los catálogos.

</Step>
<Step number={3} title="Reemplazar el plugin Vite de Lingui">

Cambia `@lingui/vite-plugin` por `@intlayer/lingui/plugin`. El binding sigue siendo `lingui()`: ejecuta el build de Intlayer y crea alias de `@lingui/core` y `@lingui/react` hacia `@intlayer/lingui`, sin cambios en tus archivos fuente.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Mantén el plugin de macros en el plugin de React (Babel o `@lingui/swc-plugin`), para que las macros se compilen en llamadas `i18n._()` antes de que Intlayer las resuelva.

</Step>
</Steps>

Tus componentes siguen funcionando sin cambios:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

El cambio de locale sigue pasando por `i18n.activate(locale)`, que actualiza cada consumidor de `useLingui()`.

## Migración completa

<Steps>
<Step number={4} title="Eliminar la carga de catálogos en runtime" isOptional={true}>

Los mensajes ahora vienen de los diccionarios de Intlayer compilados en el build. Las llamadas a `i18n.load()` / `i18n.loadAndActivate()` solo sirven como fallback y muestran un aviso en desarrollo. Reemplázalas por `i18n.activate(locale)` y elimina el paso `lingui compile`. Mantén `lingui extract` para recopilar los nuevos ids de mensaje.

</Step>
<Step number={5} title="Renombrado explícito de imports (opcional)" isOptional={true}>

El plugin de Vite ya gestiona los alias. Para hacer explícita la dependencia:

| Antes                                              | Después                                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Mover el contenido a archivos .content.ts" isOptional={true}>

Los nuevos componentes pueden usar contenido nativo de Intlayer, junto a las llamadas de Lingui existentes:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

Las traducciones completadas se escriben de vuelta en tus catálogos de Lingui. Consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para configurar la IA.

</Step>
</Steps>

## Qué puedes eliminar después de la migración

| Archivo / patrón                               | Por qué ya no es necesario                                         |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| `i18n.load()` / imports dinámicos de catálogos | Intlayer compila y carga los diccionarios.                         |
| `lingui compile` y catálogos `.js` compilados  | Intlayer genera los diccionarios directamente desde tus catálogos. |
| `@lingui/vite-plugin`                          | Reemplazado por `lingui()` de `@intlayer/lingui/plugin`.           |

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

- [Compat adapter de Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md)
- [Intlayer con Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- [Editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
