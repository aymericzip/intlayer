---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Documentación de Intlayer - Guía completa de i18n para JavaScript
description: Documentación completa de Intlayer, la moderna biblioteca de internacionalización para JavaScript, React, Next.js, Express y más frameworks.
keywords:
  - intlayer
  - internacionalización
  - i18n
  - JavaScript
  - React
  - Next.js
  - documentación
  - traducción
  - multilingüe
slugs:
  - doc
  - index
---

# Documentación de Intlayer

¡Bienvenido a la documentación oficial de **Intlayer**! Aquí encontrarás todo lo que necesitas para integrar, configurar y dominar Intlayer para todas tus necesidades de internacionalización (i18n), ya sea que trabajes con **Next.js**, **React**, **Vite**, **Express** u otro entorno de JavaScript.

Intlayer ofrece un enfoque flexible y moderno para traducir tu aplicación. Nuestra documentación te guiará desde la instalación y configuración hasta funciones avanzadas como la **traducción impulsada por IA**, definiciones de **TypeScript** y soporte para **componentes del servidor**, permitiéndote crear una experiencia multilingüe fluida.

---

## Primeros Pasos

- **[Introducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/introduction.md)**  
  Obtén una visión general de cómo funciona Intlayer, sus características principales y por qué es un cambio radical para la i18n.

- **[Cómo Funciona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/how_works_intlayer.md)**  
  Profundiza en el diseño arquitectónico y aprende cómo Intlayer maneja todo, desde la declaración de contenido hasta la entrega de traducciones.

- **[Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)**  
  Personaliza Intlayer para adaptarlo a las necesidades de tu proyecto. Explora opciones de middleware, estructuras de directorios y configuraciones avanzadas.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md)**  
  Gestiona contenido y traducciones usando nuestra herramienta de línea de comandos. Descubre cómo enviar y recibir contenido, automatizar traducciones y más.

- **[Editor de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)**  
  Simplifica la colaboración con personas no desarrolladoras y potencia tus traducciones con IA, directamente en nuestro CMS gratuito e intuitivo.

---

## Conceptos Básicos

### Diccionario

Organiza tu contenido multilingüe cerca de tu código para mantener todo consistente y fácil de mantener.

- **[Comenzar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)**  
  Aprende los conceptos básicos para declarar tu contenido en Intlayer.

- **[Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)**

  Entiende cómo se generan, almacenan y utilizan las traducciones en tu aplicación.

- **[Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration.md)**  
  Gestiona fácilmente conjuntos de datos repetidos o fijos en varios idiomas.

- **[Condición](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/conditional.md)**  
  Aprende a usar lógica condicional en Intlayer para crear contenido dinámico.

- **[Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)**  
  Descubre cómo insertar valores en una cadena usando marcadores de posición de inserción.

- **[Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)**

  Descubre cómo obtener contenido dinámicamente con lógica personalizada para adaptarlo al flujo de trabajo de tu proyecto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md)**  
  Aprende a usar Markdown en Intlayer para crear contenido enriquecido.

- **[Incrustaciones de archivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file_embeddings.md)**  
  Descubre cómo incrustar archivos externos en Intlayer para usarlos en el editor de contenido.

- **[Anidamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nesting.md)**  
  Entiende cómo anidar contenido en Intlayer para crear estructuras complejas.

---

## Entornos e Integraciones

Hemos construido Intlayer pensando en la flexibilidad, ofreciendo una integración perfecta con los frameworks y herramientas de construcción más populares:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)**
- **[Intlayer con React Native y Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_lynx+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_express.md)**

Cada guía de integración incluye las mejores prácticas para usar las funcionalidades de Intlayer, como **renderizado del lado del servidor**, **ruteo dinámico** o **renderizado del lado del cliente**, para que puedas mantener una aplicación rápida, amigable para SEO y altamente escalable.

---

## Paquetes

El diseño modular de Intlayer ofrece paquetes dedicados para entornos y necesidades específicas:

### `intlayer`

Funciones utilitarias principales para configurar y gestionar tu configuración i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Aprovecha Intlayer dentro de aplicaciones basadas en **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/express-intlayer/t.md)**  
  Un ayudante de traducción minimalista y sencillo para tus rutas y vistas del servidor.

### `react-intlayer`

Mejore sus aplicaciones **React** con potentes hooks:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Integración perfecta con **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md)**

---

## Recursos Adicionales

- **[Blog: Intlayer e i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_i18next.md)**  
  Aprende cómo Intlayer complementa y se compara con la popular librería **i18next**.

- **[Tutorial en Vivo en YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Mira una demostración completa y aprende cómo integrar Intlayer en tiempo real.

---

## Contribuciones y Comentarios

Valoramos el poder del código abierto y el desarrollo impulsado por la comunidad. Si deseas proponer mejoras, agregar una nueva guía o corregir cualquier problema en nuestra documentación, no dudes en enviar un Pull Request o abrir un issue en nuestro [repositorio de GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**¿Listo para traducir tu aplicación de manera más rápida y eficiente?** Sumérgete en nuestra documentación para comenzar a usar Intlayer hoy mismo. Experimenta un enfoque robusto y optimizado para la internacionalización que mantiene tu contenido organizado y a tu equipo más productivo.

## Historial de la Documentación

- 5.5.10 - 2025-06-29: Historial inicial
