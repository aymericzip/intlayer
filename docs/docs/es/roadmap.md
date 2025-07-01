---
docName: roadmap
url: https://intlayer.org/doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Hoja de ruta
description: Descubre la hoja de ruta de Intlayer. Consulta todas las funcionalidades que Intlayer ha implementado y las que planea implementar.
keywords:
  - Hoja de ruta
  - Intlayer
  - Internacionalización
  - CMS
  - Sistema de Gestión de Contenidos
  - Editor Visual
---

# Intlayer: Resumen de funcionalidades y hoja de ruta

Intlayer es una solución de gestión de contenido e internacionalización diseñada para optimizar cómo declaras, gestionas y actualizas contenido en tus aplicaciones. Ofrece potentes funcionalidades como la declaración de contenido centralizada o distribuida, amplias opciones de internacionalización, soporte para Markdown, renderizado condicional, integración con TypeScript/JavaScript/JSON, y más. A continuación, se presenta una visión general completa de lo que Intlayer ofrece actualmente, seguida de las funcionalidades previstas en la hoja de ruta.

---

## Funcionalidades Actuales

### 1. Declaración de Contenido

#### Centralizada o Distribuida

- **Centralizada**: Declara todo tu contenido en un único archivo grande en la base de tu aplicación, similar a i18next, para que puedas gestionar todo en un solo lugar.
- **Distribuida**: Alternativamente, divide tu contenido en archivos separados a nivel de componente o funcionalidad para una mejor mantenibilidad. Esto mantiene tu contenido cerca del código relevante (componentes, pruebas, Storybook, etc.). Eliminar un componente asegura que cualquier contenido asociado también se elimine, evitando que datos residuales saturen tu base de código.

> Recursos:
>
> - [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)

### 2. Internacionalización

- Soporte para **230 idiomas y locales** (incluyendo variantes regionales como francés (Francia), inglés (Canadá), inglés (Reino Unido), portugués (Portugal), etc.).
- Gestiona fácilmente las traducciones para todos estos locales desde un solo lugar.

> Recursos:
>
> - [Internacionalización](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)

### 3. Soporte Markdown

- Declara contenido usando **Markdown**, lo que te permite formatear automáticamente el texto con párrafos, encabezados, enlaces y más.
- Ideal para publicaciones de blog, artículos, páginas de documentación o cualquier escenario donde se necesite formato de texto enriquecido.

> Recursos:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)

### 4. Soporte de archivos externos

- Importa contenido desde archivos externos en formato de texto, como TXT, HTML, JSON, YAML o CSV.
- Usa la función `file` en Intlayer para incrustar contenido de archivos externos en un diccionario, asegurando una integración fluida con el Editor Visual y CMS de Intlayer.
- Soporta actualizaciones dinámicas de contenido, lo que significa que cuando el archivo fuente se modifica, el contenido se actualiza automáticamente dentro de Intlayer.
- Permite la gestión de contenido multilingüe vinculando dinámicamente archivos Markdown específicos por idioma.

> Recursos:
>
> - [Incrustación de contenido de archivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file.md)

### 5. Contenido dinámico y obtención de funciones

Intlayer proporciona varios métodos para insertar y gestionar contenido dinámico, asegurando flexibilidad y adaptabilidad en la entrega de contenido. Esto incluye funciones para la inserción dinámica de contenido, renderizado condicional, enumeración, anidamiento y obtención de funciones.

1. Inserción de contenido dinámico

   Usa la función insert para definir contenido con marcadores de posición ({{name}}, {{age}}, etc.).

   Permite contenido tipo plantilla que se adapta según la entrada del usuario, respuestas de API u otras fuentes de datos dinámicas.

   Funciona perfectamente con configuraciones de TypeScript, ESM, CommonJS y JSON.

   Se integra fácilmente con React Intlayer y Next Intlayer usando useIntlayer.

2. Renderizado Condicional

   Define contenido que se adapta según condiciones específicas del usuario, como el idioma o el estado de autenticación.

   Personaliza experiencias sin duplicar contenido en múltiples archivos.

3. Enumeración y Pluralización

   Usa la función enu para definir variaciones de contenido basadas en valores numéricos, rangos o claves personalizadas.

   Garantiza la selección automática de la frase correcta según un valor dado.

   Soporta reglas de ordenamiento, asegurando un comportamiento predecible.

4. Anidamiento y Referencia de Sub-Contenido

   Usa la función nest para referenciar y reutilizar contenido de otro diccionario, reduciendo la duplicación.

   Soporta la gestión de contenido estructurado y jerárquico para una mejor mantenibilidad.

5. Obtención mediante Funciones

   Intlayer permite declarar contenido como funciones, habilitando la obtención de contenido tanto síncrona como asíncrona.

   Funciones Síncronas: El contenido se genera dinámicamente en tiempo de compilación.

   Funciones Asíncronas: Obtienen datos de fuentes externas (por ejemplo, APIs, bases de datos) de forma dinámica.

   Integración: Funciona con TypeScript, ESM y CommonJS, pero no está soportado en archivos JSON o de contenido remoto.

### 6. Formatos de Declaración de Contenido

Intlayer soporta **TypeScript** (también JavaScript) y **JSON** para declarar contenido.

- **TypeScript**:

  - Garantiza que la estructura de tu contenido sea correcta y que no falten traducciones.
  - Ofrece modos de validación estrictos o más flexibles.
  - Permite la obtención dinámica de datos desde variables, funciones o APIs externas.

- **JSON**:

  - Facilita la integración con herramientas externas (como editores visuales) debido a su formato estandarizado.

  > Recursos:
  >
  > - [Formatos de Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_extention_customization.md)

### 7. Purga, optimización del paquete e importaciones dinámicas

- Intlayer integra plugins de `Babel` y `SWC` para optimizar tu paquete y mejorar el rendimiento. Reemplaza las importaciones para permitir importar solo los diccionarios que se usan en el paquete.
- Al activar la opción, Intlayer también permite importar dinámicamente el contenido del diccionario solo para la configuración regional actual.

> Recursos:
>
> - [Configuración de compilación](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integración con Frameworks y Entornos

### 1. Next.js

#### a. Componentes de Servidor y Cliente

- Proporciona un **enfoque unificado de gestión de contenido** para componentes tanto del servidor como del cliente.
- Ofrece un contexto incorporado para componentes de servidor, simplificando la implementación en comparación con otras soluciones.

#### b. Metadatos, Mapas del sitio y robots.txt

- Obtiene e inyecta contenido dinámicamente para generar metadatos, mapas del sitio o archivos `robots.txt`.

#### c. Middleware

- Añade un middleware para **redirigir a los usuarios** al contenido basado en su idioma preferido.

#### d. Compatibilidad con Turbopack y Webpack

- Totalmente compatible con el nuevo Turbopack de Next.js así como con Webpack tradicional.

> Recursos:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

### 2. Vite

- Similar a Next.js, puedes integrar Intlayer con Vite y usar un **middleware** para redirigir a los usuarios al contenido según su idioma preferido.

> Recursos:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)

### 3. Express

- Gestiona contenido e internacionaliza servicios backend construidos con Express.
- Personaliza correos electrónicos, mensajes de error, notificaciones push y más con texto localizado.

> Recursos:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_express.md)

### 4. React Native

- Integra Intlayer con React Native para gestionar contenido e internacionalizar tus aplicaciones móviles.
- Compatible con plataformas iOS y Android.

> Recursos:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native.md)

### 5. Lynx

- Integra Intlayer con Lynx para gestionar contenido e internacionalizar tus aplicaciones móviles.
- Compatible con plataformas iOS y Android.

> Recursos:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_lynx.md)

### 6. Vue

- Integra Intlayer con Vue para gestionar contenido e internacionalizar tus aplicaciones Vite / Vue.js.

> Recursos:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vue.md)

### 7. Nuxt

- Integra Intlayer con Nuxt para gestionar contenido e internacionalizar tus aplicaciones Nuxt / Vue.js.
- Soporta componentes tanto del servidor como del cliente.
- Integra enrutamiento y middleware para redirigir a los usuarios al contenido según su idioma preferido.

> Recursos:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nuxt.md)

### 8. Preact

- Integra Intlayer con Preact para gestionar contenido e internacionalizar tus aplicaciones Preact.

> Recursos:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_preact.md)

---

## Editores Visuales y CMS

### 1. Editor Visual Local

- Un **editor visual local y gratuito** que te permite editar el contenido de tu aplicación seleccionando directamente los elementos en la página.
- Integra funciones de IA para ayudar a:
  - Generar o corregir traducciones
  - Revisar sintaxis y ortografía
  - Sugerir mejoras
- Puede alojarse localmente o desplegarse en un servidor remoto.

> Recursos:
>
> - [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remoto)

- Una solución de **CMS alojada** que te permite gestionar el contenido de la aplicación en línea, sin tocar tu base de código.
- Proporciona funciones asistidas por IA para declarar contenido, gestionar traducciones y corregir errores de sintaxis u ortografía.
- Interactúa con tu contenido a través de la interfaz de tu aplicación en vivo.

> Recursos:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

---

## Extensiones para IDE

- Extensiones para los principales IDEs que proporcionan una **interfaz gráfica** para gestionar traducciones locales y remotas.
- Las funcionalidades podrían incluir la generación automática de archivos de declaración de contenido para componentes, integración directa con el CMS de Intlayer y validación en tiempo real.

---

## Servidor MCP

- Un **servidor MCP** que te permite gestionar tu contenido y traducciones usando una herramienta integrada en tu IDE.

---

## Intlayer CLI

- **Traducción y generación de archivos**: Ejecuta auditorías en tus archivos de contenido para generar traducciones faltantes y revisar inconsistencias.
- **Interacción remota**: Envía tu contenido local al CMS remoto o extrae contenido remoto para integrarlo en tu aplicación local.
- **Traducción y revisión de documentos**: Traduce y revisa tu documentación / archivos, etc.

> Recursos:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)

---

## Entornos

- Usa **variables de entorno** para configurar Intlayer de manera diferente en producción, pruebas y entornos locales.
- Define qué editor visual o proyecto CMS remoto se debe usar según tu entorno.

---

## Actualizaciones de Contenido en Vivo

- Al usar diccionarios remotos y el CMS de Intlayer, puedes **actualizar el contenido de tu aplicación al instante**, sin necesidad de redeployar.

> Recursos:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

---

## Funcionalidades Próximas

### 1. Pruebas A/B y Personalización

- **Pruebas multivariantes**: Prueba diferentes versiones de un contenido dado para ver cuál funciona mejor (por ejemplo, mayor tasa de clics).
- **Personalización basada en datos**: Muestra contenido diferente según la demografía del usuario (género, edad, ubicación, etc.) u otros patrones de comportamiento.
- **Iteración automatizada**: Permite que la IA pruebe automáticamente múltiples versiones y elija la de mejor rendimiento o recomiende opciones para la aprobación del administrador.

### 2. Versionado

- Restaura versiones anteriores de tu contenido con **versionado de contenido**.
- Realiza un seguimiento de los cambios a lo largo del tiempo y vuelve a estados anteriores si es necesario.

### 3. Traducción automática

- Para usuarios de CMS remotos, **generación de traducción con un solo clic** para cualquier idioma compatible.
- El sistema generaría traducciones en segundo plano y luego te solicitaría validación o ediciones.

### 4. Mejoras SEO

- Herramientas para **analizar palabras clave**, la intención de búsqueda del usuario y tendencias emergentes.
- Sugerir contenido mejorado para obtener mejores posiciones y hacer seguimiento del rendimiento a largo plazo.

### 5. Compatibilidad con Más Frameworks

- Se están realizando esfuerzos para soportar **Solid, Svelte, Angular** y más.
- El objetivo es hacer que Intlayer sea compatible con **cualquier aplicación basada en JavaScript**.

---

## Conclusión

Intlayer tiene como objetivo ser una solución integral para la gestión de contenido e internacionalización. Se centra en la flexibilidad (archivos centralizados o distribuidos), amplio soporte de idiomas, fácil integración con frameworks y empaquetadores modernos, y potentes funciones impulsadas por IA. A medida que nuevas capacidades, como pruebas A/B, versionado y traducciones automáticas, estén disponibles, Intlayer continuará simplificando los flujos de trabajo de contenido y elevando la experiencia del usuario en diferentes plataformas.

¡Manténgase atento a las próximas versiones y no dude en explorar las funciones existentes para ver cómo Intlayer puede ayudar a centralizar y optimizar sus procesos de gestión de contenido hoy mismo!

---

## Historial del Documento

- 5.5.10 - 2025-06-30: Añadido soporte para Preact y Nuxt, servidor MCP, actualización de CLI
- 5.5.10 - 2025-06-29: Historial inicial
