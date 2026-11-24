---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar de react-intl (FormatJS) a Intlayer"
description: "Migra una aplicación React de react-intl a Intlayer paso a paso. Mantén funcionando useIntl, FormattedMessage y todos los componentes Formatted* con el compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar de react-intl (FormatJS) a Intlayer

## ¿Por qué migrar de react-intl a Intlayer?

<AccordionGroup>
<Accordion header="Tamaño del bundle">

Con react-intl, todos los mensajes de la locale se pasan a `IntlProvider`, así que cada página carga el catálogo completo. Intlayer solo envía los diccionarios que usa cada página, lo que **reduce el tamaño de tus bundles y páginas hasta un 50 %**.

</Accordion>
<Accordion header="Mantenibilidad">

Los ids de mensaje están **tipados** según tus diccionarios: los ids inválidos fallan en el build. El contenido puede ubicarse junto a los componentes que lo usan.

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

1. **Compat adapter (recomendado para aplicaciones existentes)**: instala `@intlayer/react-intl`. Expone la misma API que `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) y sirve los mensajes desde los diccionarios de Intlayer. ICU MessageFormat, plurales, selects y etiquetas de rich text funcionan como antes.
2. **Migración completa**: reemplaza gradualmente las llamadas de react-intl por `useIntlayer` y archivos `.content.ts` ubicados junto a tus componentes.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Mantén `react-intl` instalado: aporta los tipos de TypeScript.

</Step>
<Step number={2} title="Configurar Intlayer">

Apunta el plugin `syncJSON` a tus archivos de mensajes existentes. Los catálogos de react-intl son mapas planos de ids con puntos:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> El primer segmento de cada id (`home`) se convierte en un diccionario de Intlayer, así que cada página solo carga los diccionarios que usa. Cuando Intlayer escribe las traducciones de vuelta, el archivo mantiene su forma plana.

</Step>
<Step number={3} title="Añadir el plugin de Vite">

`reactIntlVitePlugin()` ejecuta el build de Intlayer y crea un alias de `react-intl` hacia `@intlayer/react-intl`, sin cambios en tus archivos fuente.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> ¿Usas otro bundler? Renombra los imports a `@intlayer/react-intl` (ver paso 5) y usa el plugin de Intlayer para tu bundler, por ejemplo `withIntlayer` de `next-intlayer` para Next.js.

</Step>
<Step number={4} title="Dejar de pasar mensajes a IntlProvider">

`IntlProvider` sigue funcionando, pero ahora Intlayer carga los mensajes. Elimina la prop `messages` y el import del catálogo:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Si todavía se pasa `messages`, se ignora y se muestra un aviso en desarrollo.

</Step>
</Steps>

Tus componentes siguen funcionando sin cambios, con ids tipados:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Migración completa

<Steps>
<Step number={5} title="Renombrado explícito de imports (opcional)" isOptional={true}>

El plugin de Vite ya gestiona los alias. Para hacer explícita la dependencia:

| Antes                                           | Después                                                   |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Mover el contenido a archivos .content.ts" isOptional={true}>

Los nuevos componentes pueden usar contenido nativo de Intlayer, junto a las llamadas de react-intl existentes:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Las traducciones completadas se escriben de vuelta en tus archivos JSON. Consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md) para configurar la IA.

</Step>
</Steps>

## Qué puedes eliminar después de la migración

| Archivo / patrón                              | Por qué ya no es necesario                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| Prop `messages` y carga del catálogo          | Intlayer compila y carga los diccionarios.                                   |
| Paso `formatjs compile`                       | Intlayer analiza los mensajes ICU directamente desde los archivos JSON.      |
| Generación de ids con `babel-plugin-formatjs` | Usa ids explícitos con puntos para que cada id corresponda a un diccionario. |

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

- [Compat adapter de react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)
- [Intlayer con Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- [Migrar desde react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md)
- [Editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
