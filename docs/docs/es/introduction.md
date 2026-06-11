---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introducción
description: Descubre cómo funciona Intlayer. Conoce los pasos que utiliza Intlayer en tu aplicación. Descubre qué hacen los diferentes paquetes.
keywords:
  - Introducción
  - Comenzar
  - Intlayer
  - Aplicación
  - Paquetes
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Documentación de Intlayer

¡Bienvenido a la documentación oficial de Intlayer! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que trabajes con Next.js, React, Vite, Express u otro entorno de JavaScript.

## Introducción

### ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de tu contenido en cualquier parte de tu código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para integrarse fácilmente en tu código. Usando TypeScript, **Intlayer** hace que tu desarrollo sea más robusto y eficiente.

Intlayer también proporciona un editor visual opcional que te permite editar y gestionar fácilmente tu contenido. Este editor es particularmente útil para desarrolladores que prefieren una interfaz visual para la gestión de contenido, o para equipos que generan contenido sin tener que preocuparse por el código.

### Ejemplo de uso

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### ¿Por qué Intlayer en lugar de otras alternativas?

En comparación con las soluciones principales como `next-intl` o `i18next`, Intlayer es una solución que incluye optimizaciones integradas como:

<AccordionGroup>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en tus páginas, carga solo el contenido necesario. Intlayer te ayuda a **reducir el tamaño de tu bundle y de tus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Declarar tu contenido cerca de tus componentes **facilita el mantenimiento** en aplicaciones a gran escala. Puedes duplicar o eliminar una sola carpeta de funcionalidad sin la carga mental de revisar todo tu código fuente de contenido. Además, Intlayer está **completamente tipado** para garantizar la precisión de tu contenido.

</Accordion>

<Accordion header="Agente de IA">

La proximidad del contenido **reduce el contexto necesario** para los modelos de lenguaje grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Automatiza la traducción en tu pipeline CI/CD utilizando el LLM de tu elección al costo de tu proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para ayudarte a **traducir en segundo plano**.

</Accordion>

<Accordion header="Rendimiento">

La conexión de archivos JSON masivos a los componentes puede provocar problemas de rendimiento y reactividad. Intlayer optimiza la carga de tu contenido en el momento de la compilación.

</Accordion>

<Accordion header="Colaboración con perfiles no técnicos">

Más que una simple solución de i18n, Intlayer proporciona un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)** autoalojado y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para ayudarte a administrar tu contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

## Características principales

Intlayer ofrece una variedad de características adaptadas a las necesidades del desarrollo web moderno. A continuación se presentan las características clave, con enlaces a la documentación detallada de cada una:

- **Soporte de internacionalización**: Mejora el alcance global de tu aplicación con soporte integrado para la internacionalización.
- **Editor Visual**: Mejora tu flujo de trabajo de desarrollo con plugins de editor diseñados para Intlayer. Consulta la [Guía del Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).
- **Flexibilidad de configuración**: Personaliza tu configuración con amplias opciones de configuración detalladas en la [Guía de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
- **Herramientas avanzadas de CLI**: Administra tus proyectos de manera eficiente utilizando la interfaz de línea de comandos de Intlayer. Explora las capacidades en la [Documentación de herramientas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

## Conceptos clave

### Diccionario

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y mantenible.

- **[Comenzar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)**  
  Aprende los conceptos básicos para declarar tu contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)**  
  Comprende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md)**  
  Administra fácilmente conjuntos de datos repetidos o fijos en varios idiomas.

- **[Condición](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/condition.md)**  
  Aprende a usar la lógica condicional en Intlayer para crear contenido dinámico.

- **[Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)**  
  Descubre cómo insertar valores en una cadena de texto utilizando marcadores de posición de inserción.

- **[Recuperación de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)**  
  Observa cómo recuperar contenido dinámicamente con lógica personalizada para que coincida con el flujo de trabajo de tu proyecto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)**  
  Aprende a usar Markdown en Intlayer para crear contenido enriquecido.

- **[Integraciones de archivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file.md)**  
  Descubre cómo integrar archivos externos en Intlayer para usarlos en el editor de contenido.

- **[Anidamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nesting.md)**  
  Comprende cómo anidar contenido en Intlayer para crear estructuras complejas.

### Entornos e Integraciones

Hemos creado Intlayer pensando en la flexibilidad, ofreciendo una integración perfecta en frameworks y herramientas de construcción populares:

- **[Intlayer con Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)**
- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_router_v7.md)**
- **[Intlayer con Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)**
- **[Intlayer con React Native y Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_lynx+react.md)**
- **[Intlayer con Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+preact.md)**
- **[Intlayer con Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)**
- **[Intlayer con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md)**
- **[Intlayer con Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md)**
- **[Intlayer con SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_svelte_kit.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_express.md)**
- **[Intlayer con NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nestjs.md)**
- **[Intlayer con Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_hono.md)**
- **[Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_angular_21.md)**

Cada guía de integración incluye las mejores prácticas para utilizar las características de Intlayer, como el **renderizado del lado del servidor**, el **enrutamiento dinámico** o el **renderizado del lado del cliente**, de modo que puedas mantener una aplicación rápida, optimizada para SEO y altamente escalable.

## Contribución y comentarios

Valoramos el poder del código abierto y el desarrollo impulsado por la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir cualquier problema en nuestra documentación, no dudes en enviar un Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**¿Listo para traducir tu aplicación de manera más rápida y eficiente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy. Experimenta un enfoque robusto y optimizado para la internacionalización que mantiene tu contenido organizado y a tu equipo más productivo.
