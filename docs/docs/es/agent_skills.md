---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Habilidades del Agente
description: Aprenda a usar las Habilidades del Agente de Intlayer para mejorar la comprensión de su proyecto por parte de su agente de IA, incluyendo guías de configuración completas para Metadatos, Sitemaps y Acciones del Servidor.
keywords:
  - Intlayer
  - Habilidades del Agente
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
---

# Habilidades del Agente

## Configuración

### Usando la CLI

El comando `intlayer init skills` es la forma más fácil de configurar las habilidades del agente en su proyecto. Detecta su entorno e instala los archivos de configuración necesarios para sus plataformas preferidas.

```bash
npx intlayer init skills
```

### Usando el SDK de Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Usando la extensión de VS Code

1. Abra la Paleta de Comandos (Ctrl+Shift+P o Cmd+Shift+P).
2. Escriba `Intlayer: Setup AI Agent Skills`
3. Elija la plataforma que usa (por ejemplo, `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Elija las habilidades que desea instalar (por ejemplo, `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Presione Enter.

## Lista de Habilidades

**intlayer-config**

- Empodera al agente para entender la configuración de i18n específica de su proyecto, permitiéndole configurar con precisión los locales, patrones de enrutamiento y estrategias de respaldo.

**intlayer-cli**

- Permite al agente gestionar de forma autónoma su ciclo de vida de traducción, incluyendo la auditoría de traducciones faltantes, la creación de diccionarios y la sincronización de contenidos a través de la línea de comandos.

**intlayer-angular**

- Equipa al agente con experiencia específica en el framework para implementar correctamente los patrones i18n reactivos y señales de acuerdo con las mejores prácticas de Angular.

**intlayer-astro**

- Proporciona al agente el conocimiento necesario para manejar las traducciones del lado del servidor y los patrones de enrutamiento localizados únicos en el ecosistema de Astro.

**intlayer-content**

- Enseña al agente cómo utilizar los nodos de contenido avanzados—como pluralización, condiciones y markdown—para construir diccionarios ricos, dinámicos y localizados.

**intlayer-next-js**

- Da al agente la profundidad necesaria para implementar i18n en los componentes de Servidor y Cliente de Next.js, asegurando la optimización SEO y un enrutamiento localizado sin problemas.

**intlayer-react**

- Proporciona conocimientos especializados al agente para implementar componentes y hooks i18n declarativos de manera eficiente en cualquier entorno basado en React.

**intlayer-preact**

- Optimiza la capacidad del agente para implementar i18n para Preact, permitiéndole escribir componentes ligeros y localizados utilizando señales y patrones reactivos eficientes.

**intlayer-solid**

- Permite al agente aprovechar la reactividad de grano fino de SolidJS para la gestión de contenido localizado de alto rendimiento.

**intlayer-svelte**

- Enseña al agente el uso de los stores de Svelte y una sintaxis idiomática para un contenido localizado reactivo y con tipado seguro en aplicaciones Svelte y SvelteKit.

**intlayer-cms**

- Permite al agente integrar y gestionar contenido remoto, permitiéndole manejar flujos de trabajo de sincronización en vivo y traducción remota a través del CMS de Intlayer.

**intlayer-usage**

- Estandariza el enfoque del agente con respecto a la estructura del proyecto y la declaración de contenido, asegurando que siga los flujos de trabajo más eficientes para su proyecto i18n.

**intlayer-vue**

- Equipa al agente con patrones específicos de Vue—incluyendo Composables y soporte de Nuxt—para construir aplicaciones web modernas y localizadas.

**intlayer-compiler**

- Simplifica el flujo de trabajo del agente al permitir la extracción automática de contenido, permitiéndole escribir cadenas traducibles directamente en su código sin archivos de diccionario manuales.
