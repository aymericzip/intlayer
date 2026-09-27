---
createdAt: 2026-02-09
updatedAt: 2026-09-27
priority: 6
title: "Agent Skills de Intlayer para agentes de código IA"
description: "Dale a tu agente de código IA las skills de Intlayer: guías de configuración para contenido, metadatos, sitemaps y server actions."
keywords:
  - Intlayer
  - Agent Skills
  - Agente de IA
  - Internacionalización
  - Documentación
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "Init history"
author: aymericzip
---

# Agent Skills

## Configuración

### Usando la CLI

El comando `intlayer init skills` es la forma más fácil de configurar las Agent Skills en su proyecto. Detecta su entorno e instala los archivos de configuración necesarios para sus plataformas preferidas.

```bash packageManager="npm"
npx intlayer init skills
```

```bash packageManager="yarn"
yarn intlayer init skills
```

```bash packageManager="pnpm"
pnpm intlayer init skills
```

```bash packageManager="bun"
bun x intlayer init skills
```

### Usando el SDK de Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Usando la extensión de VS Code

1. Abra la Paleta de Comandos (Ctrl+Shift+P o Cmd+Shift+P).
2. Escriba `Intlayer: Setup AI Agent Skills`
3. Elija la plataforma que usa (por ejemplo, `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Elija las Agent Skills que desea instalar (por ejemplo, `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Presione Enter.

## Lista de Agent Skills

**intlayer-config**

- Empodera al agente para entender la configuración de i18n específica de su proyecto, permitiéndole configurar con precisión los locales, patrones de enrutamiento y estrategias de respaldo.

**intlayer-cli**

- Permite al agente gestionar de forma autónoma su ciclo de vida de traducción, incluyendo la auditoría de traducciones faltantes, la creación de diccionarios y la sincronización de contenidos a través de la línea de comandos.

**intlayer-angular**

- Equipa al agente con experiencia específica en el framework para implementar correctamente los patrones i18n reactivos y señales de acuerdo con las mejores prácticas de Angular.

**intlayer-astro**

- Proporciona al agente el conocimiento necesario para manejar las traducciones del lado del servidor y los patrones de enrutamiento por localeizados únicos en el ecosistema de Astro.

**intlayer-content**

- Enseña al agente cómo utilizar los nodos de contenido avanzados-como pluralización, condiciones y markdown-para construir diccionarios ricos, dinámicos y localizados.

**intlayer-next-js**

- Da al agente la profundidad necesaria para implementar i18n en los componentes de Servidor y Cliente de Next.js, asegurando la optimización SEO y un enrutamiento por localeizado sin problemas.

**intlayer-react**

- Proporciona conocimientos especializados al agente para implementar componentes y hooks i18n declarativos de manera eficiente en cualquier entorno basado en React.

**intlayer-preact**

- Optimiza la capacidad del agente para implementar i18n para Preact, permitiéndole escribir componentes ligeros y localizados utilizando señales y patrones reactivos eficientes.

**intlayer-solid**

- Permite al agente aprovechar la reactividad de grano fino de SolidJS para la gestión de contenido localizado de alto rendimiento.

**intlayer-svelte**

- Enseña al agente el uso de los stores de Svelte y una sintaxis idiomática para un contenido localizado reactivo y con tipado seguro en aplicaciones Svelte y SvelteKit.

**intlayer-remote-content**

- Permite al agente integrar y gestionar contenido remoto, permitiéndole manejar flujos de trabajo de sincronización en vivo y traducción remota a través del CMS de Intlayer.

**intlayer-usage**

- Estandariza el enfoque del agente con respecto a la estructura del proyecto y la declaración de contenido, asegurando que siga los flujos de trabajo más eficientes para su proyecto i18n.

**intlayer-vue**

- Equipa al agente con patrones específicos de Vue-incluyendo Composables y soporte de Nuxt-para construir aplicaciones web modernas y localizadas.

**intlayer-compiler**

- Simplifica el flujo de trabajo del agente al permitir la extracción automática de contenido, permitiéndole escribir cadenas traducibles directamente en su código sin archivos de diccionario manuales.

**intlayer-lit**

- Enseña al agente a traducir web components de Lit con los ReactiveControllers `useIntlayer` y `useLocale`.

**intlayer-vanilla**

- Permite al agente localizar páginas en JavaScript / TypeScript puro con `vanilla-intlayer`, con o sin bundler.

**intlayer-remix**

- Proporciona al agente el middleware de router de Remix 3 y los hooks `useIntlayer` / `useLocale` con ámbito de petición.

**intlayer-backend**

- Prepara al agente para traducir respuestas del servidor en Express, Fastify, Hono, NestJS, AdonisJS y Elysia mediante un patrón compartido de middleware + `t` / `getIntlayer`.

**intlayer-dev-tools**

- Permite al agente configurar las herramientas de Intlayer alrededor de su código: reglas de ESLint para cadenas codificadas, el Language Server, las extensiones de VS Code y Chrome, el servidor MCP y las comprobaciones de traducción en CI/CD.

**intlayer-markdown**

- Enseña al agente a declarar contenido Markdown (`md()`, archivos `.content.md`, archivos externos) y a renderizarlo con componentes MDX, un `MarkdownProvider` global, Suspense y parsing del lado del servidor.

**intlayer-compat**

- Guía al agente en la migración desde i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n o Lingui con adaptadores de compatibilidad que mantienen la API original, de modo que no es necesario reescribir las llamadas de traducción.
