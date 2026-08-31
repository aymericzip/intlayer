---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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
author: aymericzip
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

## Preguntas frecuentes

<FAQ>

<Question title="¿Para qué sirve Intlayer?">

Intlayer es una biblioteca de internacionalización (i18n) para aplicaciones JavaScript y TypeScript. Declaras el contenido de un componente junto a ese componente en un archivo `.content.ts`, Intlayer compila esas declaraciones en diccionarios tipados en tiempo de compilación, y tus componentes los leen mediante un hook como `useIntlayer`. Cubre la traducción, las reglas de plural, el género, Markdown, el enrutamiento por idioma, los metadatos de SEO, la traducción asistida por IA y un editor visual para quienes no programan.

</Question>

<Question title="¿Cuánto añade la i18n al tamaño de mi bundle?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar. Los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>

<Question title="¿Puedo migrar desde `i18next`, `next-intl` o `react-i18next` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md) o la [guía de migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` y `Lingui`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación sobre código JSX, TSX, Vue y Svelte, generando los diccionarios en cada cambio para que no haya ninguna clave que mantener a mano. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución quedan fuera de su alcance, y necesita unas pocas anotaciones para distinguir el texto visible para el usuario de la lógica de la aplicación.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación JavaScript?">

El campo se divide en tres generaciones:

- **Bibliotecas de catálogo en tiempo de ejecución**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Los mensajes viven en espacios de nombres JSON cargados en tiempo de ejecución. Maduras y agnósticas al framework, pero sin tipado y entregadas completas.
- **Bibliotecas de mensajes en tiempo de compilación**: `Lingui`, `Paraglide`, `react-intl` y `next-intl` con un paso de extracción. Mejor comportamiento de bundle y algo de tipado, pero siguen siendo catálogos centralizados.
- **Bibliotecas de capa de contenido**: `Intlayer`. El contenido se declara por componente y se compila por componente, así que el tipado, el tree shaking, las herramientas y la edición proceden de la misma fuente.

Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) para la comparación detallada, y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md) para cifras medidas de bundle y rendimiento.

</Question>

<Question title="¿Qué frameworks admite Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro con todos los frameworks de isla, React Native con Expo, Lynx, y en el servidor Express, Fastify, NestJS, Hono, Elysia y AdonisJS. Cada uno tiene su propia guía en [entornos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/introduction.md).

</Question>

<Question title="¿Por qué declarar el contenido junto al componente en lugar de en un archivo JSON central?">

Tres razones. Una página entrega solo las entradas que renderizan sus componentes, en lugar de un espacio de nombres entero, que es lo que recorta el tamaño del bundle. Una carpeta de funcionalidad se puede copiar o eliminar de una pieza, sin buscar claves huérfanas en un catálogo compartido. Y un LLM o un agente que edita un componente ve su contenido en la misma carpeta, que es por lo que la co-ubicación hace fiable el trabajo asistido por IA. Consulta [cómo funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/how_works_intlayer.md).

</Question>

<Question title="¿Cómo traduzco mi aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`. La CLI detecta las traducciones que faltan y las rellena con el LLM de tu elección, usando tu propio proveedor y tu clave de API, así que le pagas directamente al proveedor de IA. `--git-diff` restringe la ejecución al contenido modificado en la rama, lo que la mantiene barata en CI. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Cómo encuentro las traducciones que faltan?">

Ejecuta `npx intlayer test`. Falla cuando a un idioma declarado le falta contenido, así que una cadena sin traducir nunca llega a producción. La [extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md) muestra los mismos errores en línea, y el [plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md) marca las cadenas codificadas de forma fija con su regla `no-raw-text`. Consulta [probar tu contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).

</Question>

<Question title="¿Necesito poner el idioma en la URL?">

No. `routing.mode` acepta `"prefix-no-default"` (el valor por defecto, `/about` y `/fr/about`), `"prefix-all"`, `"no-prefix"` y `"search-params"`, y `routing.domains` asigna cada idioma a su propio dominio. Sea cual sea el esquema, `getMultilingualUrls` construye las alternativas `hreflang` para tus metadatos y tu sitemap. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cómo pueden trabajar los traductores y editores de contenido sin tocar el código?">

El [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) se ejecuta en tu propia infraestructura y permite que cualquiera haga clic en el texto de tu aplicación en ejecución para editarlo, escribiendo el cambio de vuelta en la base de código. El [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) externaliza el contenido para que pueda cambiar sin un despliegue, con la [sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md) aplicando las actualizaciones en tiempo de ejecución.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí. Intlayer es de código abierto bajo la licencia Apache 2.0, y la biblioteca, la CLI, el compilador y el editor visual son de uso gratuito, proyectos comerciales incluidos. El CMS alojado es un servicio de pago opcional, y también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
