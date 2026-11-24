---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrar de ngx-translate a Intlayer"
description: "Migra una aplicación Angular de ngx-translate a Intlayer paso a paso. Mantén funcionando el pipe translate, la directiva translate y TranslateService con el compat adapter @intlayer/ngx-translate."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrar de ngx-translate a Intlayer

## ¿Por qué migrar de ngx-translate a Intlayer?

<AccordionGroup>
<Accordion header="Sin loader HTTP">

ngx-translate descarga los archivos de locale en runtime mediante `TranslateHttpLoader`, lo que retrasa el primer render. Intlayer compila los diccionarios en el build, así que las traducciones están disponibles de inmediato.

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

1. **Compat adapter (recomendado para aplicaciones existentes)**: instala `@intlayer/ngx-translate`. Expone la misma API que `@ngx-translate/core` (`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`) y sirve los mensajes desde los diccionarios de Intlayer. Tus templates no cambian.
2. **Migración completa**: reemplaza gradualmente las llamadas de ngx-translate por `useIntlayer` de `angular-intlayer` y archivos `.content.ts` ubicados junto a tus componentes.

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
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> Mantén `@ngx-translate/core` instalado: aporta los tipos de TypeScript. `@ngx-translate/http-loader` se puede eliminar.

</Step>
<Step number={2} title="Configurar Intlayer">

Apunta el plugin `syncJSON` a tus archivos de traducción existentes. Con un archivo por namespace (`src/i18n/en/home.json`), cada archivo se convierte en un diccionario:

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
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate` se resuelve al campo `title` del diccionario `home`. Si usas un único archivo por locale (`src/assets/i18n/en.json`) con claves anidadas, usa en su lugar `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``: cada clave de primer nivel se convierte en un diccionario.

</Step>
<Step number={3} title="Añadir el plugin de esbuild">

La Angular CLI acepta plugins de esbuild mediante `@angular-builders/custom-esbuild`. Crea un archivo de plugins:

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

Después referéncialo en `angular.json`:

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

El plugin ejecuta el build de Intlayer y resuelve `@ngx-translate/core` hacia `@intlayer/ngx-translate`, sin cambios en tus archivos fuente.

> ¿Haces el build con Vite (Analog)? Usa en su lugar `ngxTranslateVitePlugin()` de `@intlayer/ngx-translate/plugin`.

</Step>
<Step number={4} title="Eliminar el loader HTTP">

Mantén `provideTranslateService()`, pero quita la opción `loader`: los mensajes vienen de los diccionarios de Intlayer.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> Las traducciones ya no pasan por un loader, así que `TranslateHttpLoader` y `@ngx-translate/http-loader` se pueden eliminar.

</Step>
</Steps>

Tus templates y servicios siguen funcionando sin cambios:

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## Migración completa

<Steps>
<Step number={5} title="Renombrado explícito de imports (opcional)" isOptional={true}>

El plugin de esbuild ya gestiona los alias. Para hacer explícita la dependencia:

| Antes                                                           | Después                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="Mover el contenido a archivos .content.ts" isOptional={true}>

Los nuevos componentes pueden usar contenido nativo de Intlayer, junto a las llamadas de ngx-translate existentes. Registra `provideIntlayer()` de `angular-intlayer` junto a `provideTranslateService()` en `app.config.ts`, y después:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
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

| Archivo / patrón                                         | Por qué ya no es necesario                            |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `TranslateHttpLoader` / loaders personalizados           | Intlayer compila y carga los diccionarios.            |
| `@ngx-translate/http-loader`                             | Ya no se descargan archivos de traducción en runtime. |
| `provideHttpClient()` (si solo se usa para traducciones) | Mismo motivo.                                         |

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

- [Compat adapter de ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/ngx-translate.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)
- [Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md)
- [Editor visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
