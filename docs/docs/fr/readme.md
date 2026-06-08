<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong>i18n pour chaque composant</strong>
</h1>
<h2 align="center">
  <strong>Traduction assistée par IA. Éditeur visuel. CMS multilingue.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="version npm" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Étoiles GitHub" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="téléchargements mensuels" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="licence"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="dernier commit"/>
  </a>
</p>

![Regarder la vidéo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Commencer-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Qu'est-ce qu'Intlayer ?

La plupart des bibliothèques i18n sont soit trop complexes, soit trop rigides, ou ne sont pas conçues pour les frameworks modernes.

Intlayer est une **solution i18n moderne** pour les applications web et mobiles.  
C'est indépendant du framework, **propulsé par l'IA**, et inclut un **CMS & un éditeur visuel** gratuits.

Avec des **fichiers de contenu par locale**, l'**autocomplétion TypeScript**, des **dictionnaires tree-shakable**, et l'**intégration CI/CD**, Intlayer rend l'internationalisation **plus rapide, plus propre et plus intelligente**.

## Principaux avantages d'Intlayer :

| Fonctionnalité                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Support Multi-Frameworks**<br><br>Intlayer est compatible avec tous les principaux frameworks et bibliothèques, notamment Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, et plus encore.                                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **Gestion de contenu propulsée par JavaScript**<br><br>Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement. <br><br> - [Déclaration de contenu](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Fichier de déclaration de contenu par locale**<br><br>Accélérez votre développement en déclarant votre contenu une seule fois, avant la génération automatique.<br><br> - [Fichier de déclaration de contenu par locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **Compilateur**<br><br>Le compilateur Intlayer extrait automatiquement le contenu des composants et génère les fichiers de dictionnaire.<br><br> - [Compilateur](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Environnement typé sécurisé**<br><br>Utilisez TypeScript pour garantir que vos définitions de contenu et votre code sont sans erreur, tout en bénéficiant de l'autocomplétion de l'IDE.<br><br> - [Configuration TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Configuration simplifiée**<br><br>Démarrez rapidement avec une configuration minimale. Ajustez facilement les paramètres d'internationalisation, de routage, d'IA, de build et de gestion du contenu. <br><br> - [Explorer l'intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Récupération simplifiée du contenu**<br><br>Pas besoin d'appeler votre fonction `t` pour chaque élément de contenu. Récupérez tout votre contenu directement à l'aide d'un seul hook.<br><br> - [Intégration React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Implémentation cohérente des composants serveur**<br><br>Parfaitement adapté aux composants serveur Next.js, utilisez la même implémentation pour les composants client et serveur, pas besoin de passer votre fonction `t` à travers chaque composant serveur. <br><br> - [Composants Serveur](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Base de code organisée**<br><br>Gardez votre base de code plus organisée : 1 composant = 1 dictionnaire dans le même dossier. Les traductions proches de leurs composants respectifs améliorent la maintenabilité et la clarté. <br><br> - [Comment fonctionne Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Routage amélioré**<br><br>Prise en charge complète du routage d'application, s'adaptant parfaitement aux structures d'applications complexes, pour Next.js, React, Vite, Vue.js, etc.<br><br> - [Explorer l'intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Support Markdown**<br><br>Importez et interprétez les fichiers locaux et le Markdown distant pour du contenu multilingue comme les politiques de confidentialité, la documentation, etc. Interprétez et rendez les métadonnées Markdown accessibles dans votre code.<br><br> - [Fichiers de contenu](https://intlayer.org/doc/concept/content/file)                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Éditeur visuel et CMS gratuits**<br><br>Un éditeur visuel et un CMS gratuits sont disponibles pour les rédacteurs de contenu, éliminant ainsi le besoin d'une plateforme de localisation. Gardez votre contenu synchronisé à l'aide de Git, ou externalisez-le totalement ou partiellement avec le CMS.<br><br> - [Éditeur Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Contenu tree-shakable**<br><br>Contenu tree-shakable, réduisant la taille du bundle final. Charge le contenu par composant, excluant tout contenu inutilisé de votre bundle. Supporte le chargement dynamique (lazy-loading) pour améliorer l'efficacité du chargement de l'application. <br><br> - [Optimisation du build](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Rendu statique**<br><br>Ne bloque pas le rendu statique. <br><br> - [Intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Traduction propulsée par l'IA**<br><br>Transformez votre site web en 231 langues en un seul clic grâce aux outils de traduction avancés d'Intlayer utilisant votre propre fournisseur d'IA / clé API. <br><br> - [Intégration CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Auto-remplissage](https://intlayer.org/doc/concept/auto-fill)                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Intégration du serveur MCP**<br><br>Fournit un serveur MCP (Model Context Protocol) pour l'automatisation de l'IDE, permettant une gestion du contenu et des flux de travail i18n fluides directement dans votre environnement de développement. <br><br> - [Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Extension VSCode**<br><br>Intlayer propose une extension VSCode pour vous aider à gérer votre contenu et vos traductions, à construire vos dictionnaires, à traduire votre contenu, et plus encore. <br><br> - [Extension VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interopérabilité**<br><br>Permet l'interopérabilité avec react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer et react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer et next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer et next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer et vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/benchmark.png?raw=true" alt="Feature" width="700">                           | **Performances & Benchmark**<br><br>Utilise le tree-shaking avancé et le chargement dynamique pour booster les performances et garder la solution la plus légère possible. <br><br> - [Performances & Benchmark](https://intlayer.org/doc/benchmark)                                                                                                                                                                                                                       |

---

## 📦 Installation

Commencez votre voyage avec Intlayer dès aujourd'hui et découvrez une approche plus fluide et plus puissante de l'internationalisation.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Commencer-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer
```

⚡ Démarrage rapide (Next.js)

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

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Obtenir le guide complet → </a>

## 🎥 Tutoriel en direct sur YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Commencer-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Table des matières

Explorez notre documentation exhaustive pour commencer avec Intlayer et apprendre à l'intégrer dans vos projets.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Commencer</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Pourquoi Intlayer ?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Introduction</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Comment fonctionne Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Configuration</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>CLI Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>Compilateur</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Éditeur Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>CMS Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Dictionnaire</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Fichier de déclaration de contenu par locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Traduction</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Énumération</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Condition</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Imbrication</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Récupération de fonction</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Insertion</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>Fichier</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Environnement</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer avec Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js utilisant le compilateur</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React utilisant le compilateur</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/tanstack-start" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/tanstack-start/solid" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/astro" rel=''>Astro</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/astro/react" rel=''>React</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vue" rel=''>Vue</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/svelte" rel=''>Svelte</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/solid" rel=''>Solid</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vanilla" rel=''>Vanilla JS</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/lit" rel=''>Lit</a></li>
    </ul>
  </li>

  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>Backend</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📊 Benchmark</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md" rel=''>Next.js</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md" rel=''>TanStack Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md" rel=''>Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md" rel=''>Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md" rel=''>Svelte</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/what_is_internationalization.md" rel=''>Qu'est-ce que l'i18n ?</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n et SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer et i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer et react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer et next-intl</a></li>
</ul>
</details>

## Système de gestion de contenu multilingue

Plus qu'une bibliothèque i18n, Intlayer est un **système de gestion de contenu multilingue** complet. Un CMS complet est disponible gratuitement sur [app.intlayer.org](https://app.intlayer.org).

Intlayer connecte **développeurs**, **rédacteurs** et **agents IA** dans un flux de travail unique pour créer et maintenir des sites web multilingues sans effort. Intlayer remplace la pile suivante en une seule solution :

- Solutions i18n (ex. `i18next`, `next-intl`, `vue-i18n`)
- TMS (Systèmes de gestion de traduction) (ex. Crowdin, Phrase, Lokalise)
- CMS Headless (ex. Contentful, Strapi, Sanity)
- Feature flag
- AB testing platform (ex. Optimizely, VWO, AB tasty) [coming soon]

![CMS Preview](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png?raw=true)

## 🌐 Readme dans d'autres langues

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 Communauté

Intlayer est construit avec et pour la communauté et nous serions ravis de recevoir vos retours !

- Une suggestion ? [Ouvrez une issue](https://github.com/aymericzip/intlayer/issues)
- Un bug ou une amélioration ? [Soumettez une PR](https://github.com/aymericzip/intlayer/pulls)
- Besoin d'aide ou envie de vous connecter ? [Rejoignez notre Discord](https://discord.gg/7uxamYVeCk)

Vous pouvez aussi nous suivre sur :

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Contribution

Pour des directives plus détaillées sur la contribution à ce projet, veuillez consulter le fichier [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Il contient des informations essentielles sur notre processus de développement, les conventions de messages de commit et les procédures de publication. Vos contributions nous sont précieuses et nous apprécions vos efforts pour améliorer ce projet !

Contribuez sur [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) ou [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Merci pour votre soutien

Si vous aimez Intlayer, donnez-nous une ⭐ sur GitHub. Cela aide les autres à découvrir le projet ! [Découvrez pourquoi les étoiles GitHub comptent](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
