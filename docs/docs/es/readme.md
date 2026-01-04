<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo de Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: un kit de herramientas i18n flexible y de código abierto con traducción impulsada por IA y CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Documentación</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="versión npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Estrellas en GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="descargas mensuales" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="licencia"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="último commit"/>
  </a>
</p>

![Ver el video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Comenzar-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## ¿Qué es Intlayer?

La mayoría de las bibliotecas i18n son demasiado complejas, demasiado rígidas o no están diseñadas para frameworks modernos.

Intlayer es una **solución i18n moderna** para aplicaciones web y móviles.  
Es independiente del framework, **potenciada por IA**, e incluye un **CMS y editor visual** gratuitos.

Con **archivos de contenido por localidad**, **autocompletado en TypeScript**, **diccionarios tree-shakable** e **integración CI/CD**, Intlayer hace que la internacionalización sea **más rápida, limpia e inteligente**.

## Beneficios clave de Intlayer:

| Característica                                                                                                                                      | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Compatibilidad entre Frameworks**<br><br>Intlayer es compatible con todos los principales frameworks y bibliotecas, incluyendo Next.js, React, Vite, Vue.js, Nuxt, Preact, Express y más.                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **Gestión de Contenido Potenciada por JavaScript**<br><br>Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido de manera eficiente. <br><br> - [Declaración de contenido](https://intlayer.org/doc/concept/content)                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Archivo de Declaración de Contenido por Localidad**<br><br>Acelera tu desarrollo declarando tu contenido una vez, antes de la generación automática.<br><br> - [Archivo de Declaración de Contenido por Localidad](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Entorno con Tipos Seguros**<br><br>Aprovecha TypeScript para asegurar que tus definiciones de contenido y código estén libres de errores, además de beneficiarte de la autocompletación en el IDE.<br><br> - [Configuración de TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Configuración Simplificada**<br><br>Ponte en marcha rápidamente con una configuración mínima. Ajusta fácilmente los ajustes para internacionalización, enrutamiento, IA, compilación y manejo de contenido.<br><br> - [Explora la integración con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Recuperación de Contenido Simplificada**<br><br>No es necesario llamar a tu función `t` para cada contenido. Recupera todo tu contenido directamente usando un solo hook.<br><br> - [Integración con React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Implementación Consistente de Componentes del Servidor**<br><br>Perfectamente adecuado para componentes del servidor de Next.js, utiliza la misma implementación tanto para componentes cliente como servidor, sin necesidad de pasar tu función `t` a través de cada componente del servidor. <br><br> - [Componentes del Servidor](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Base de Código Organizada**<br><br>Mantén tu base de código más organizada: 1 componente = 1 diccionario en la misma carpeta. Traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad. <br><br> - [Cómo funciona Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Enrutamiento Mejorado**<br><br>Soporte completo para el enrutamiento de aplicaciones, adaptándose sin problemas a estructuras complejas de aplicaciones, para Next.js, React, Vite, Vue.js, etc.<br><br> - [Explorar la integración con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Soporte Markdown**<br><br>Importa e interpreta archivos de localización y Markdown remoto para contenido multilingüe como políticas de privacidad, documentación, etc. Interpreta y haz accesibles los metadatos de Markdown en tu código.<br><br> - [Archivos de contenido](https://intlayer.org/doc/concept/content/file)                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Editor Visual y CMS Gratuitos**<br><br>Un editor visual gratuito y CMS están disponibles para los redactores de contenido, eliminando la necesidad de una plataforma de localización. Mantén tu contenido sincronizado usando Git, o externalízalo total o parcialmente con el CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Contenido Tree-shakable**<br><br>Contenido tree-shakable, que reduce el tamaño del paquete final. Carga contenido por componente, excluyendo cualquier contenido no utilizado de tu paquete. Soporta carga diferida para mejorar la eficiencia de carga de la aplicación. <br><br> - [Optimización de construcción de la aplicación](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Renderizado Estático**<br><br>No bloquea el Renderizado Estático. <br><br> - [Integración con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Traducción impulsada por IA**<br><br>Transforma tu sitio web a 231 idiomas con solo un clic utilizando las avanzadas herramientas de traducción impulsadas por IA de Intlayer, usando tu propio proveedor de IA / clave API. <br><br> - [Integración CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI de Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Autocompletar](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Integración del Servidor MCP**<br><br>Proporciona un servidor MCP (Protocolo de Contexto de Modelo) para la automatización del IDE, permitiendo una gestión de contenido fluida y flujos de trabajo de i18n directamente dentro de tu entorno de desarrollo. <br><br> - [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Extensión de VSCode**<br><br>Intlayer proporciona una extensión para VSCode que te ayuda a gestionar tu contenido y traducciones, construir tus diccionarios, traducir tu contenido y más. <br><br> - [Extensión de VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilidad**<br><br>Permite la interoperabilidad con react-i18next, next-i18next, next-intl y react-intl. <br><br> - [Intlayer y react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer y next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer y next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                       |

---

## 📦 Instalación

Comienza tu viaje con Intlayer hoy y experimenta un enfoque más fluido y potente para la internacionalización.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Inicio rápido (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Obtén la guía completa → </a>

## 🎥 Tutorial en vivo en YouTube

[![Cómo internacionalizar tu aplicación usando Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Tabla de Contenidos

Explora nuestra documentación completa para comenzar con Intlayer y aprender cómo integrarlo en tus proyectos.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Comenzar</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">¿Por qué Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Introducción</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concepto</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Cómo funciona Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Configuración</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Proveedor de IA</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">CLI de Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Editor de Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">CMS de Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Diccionario</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Archivo de Declaración de Contenido por Localidad</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Traducción</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumeración</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Condición</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Anidamiento</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Obtención de Funciones</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Inserción</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Archivo</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Entorno</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer con Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Inicio con Tanstack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/what_is_internationalization.md">Qué es i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n y SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer e i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer y react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer y next-intl</a></li>
</ul>
</details>

## 🌐 Readme en otros idiomas

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Comunidad

Intlayer está construido con y para la comunidad ¡y nos encantaría contar con tu opinión!

- ¿Tienes una sugerencia? [Abre un issue](https://github.com/aymericzip/intlayer/issues)
- ¿Encontraste un error o una mejora? [Envía un PR](https://github.com/aymericzip/intlayer/pulls)
- ¿Necesitas ayuda o quieres conectar? [Únete a nuestro Discord](https://discord.gg/7uxamYVeCk)

También puedes seguirnos en:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Discord de Intlayer" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="LinkedIn de Intlayer" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Contribución

Para obtener pautas más detalladas sobre cómo contribuir a este proyecto, consulte el archivo [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Contiene información esencial sobre nuestro proceso de desarrollo, convenciones para los mensajes de commit y procedimientos de lanzamiento. ¡Sus contribuciones son valiosas para nosotros y apreciamos sus esfuerzos para mejorar este proyecto!

### Gracias por el Apoyo

Si te gusta Intlayer, danos una ⭐ en GitHub. ¡Esto ayuda a que otros descubran el proyecto!

[![Gráfico de Historial de Estrellas](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
