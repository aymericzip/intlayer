<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : une boîte à outils i18n open-source et flexible avec traduction assistée par IA & CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="version npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Étoiles GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="téléchargements mensuels" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="licence"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="dernier commit"/>
  </a>
</p>

![Regarder la vidéo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Commencer-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Qu'est-ce qu'Intlayer ?

La plupart des bibliothèques i18n sont soit trop complexes, trop rigides, ou pas conçues pour les frameworks modernes.

Intlayer est une **solution i18n moderne** pour les applications web et mobiles.  
Elle est indépendante du framework, **alimentée par l’IA**, et inclut un **CMS & éditeur visuel** gratuits.

Avec des **fichiers de contenu par locale**, une **autocomplétion TypeScript**, des **dictionnaires tree-shakables**, et une **intégration CI/CD**, Intlayer rend l’internationalisation **plus rapide, plus propre, et plus intelligente**.

## Principaux avantages d’Intlayer :

| Fonctionnalité                                                                                                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Fonctionnalité" width="700">                          | **Support Multi-Frameworks**<br><br>Intlayer est compatible avec tous les principaux frameworks et bibliothèques, y compris Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, et bien d'autres.                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Fonctionnalité" width="700">       | **Gestion de contenu propulsée par JavaScript**<br><br>Exploitez la flexibilité de JavaScript pour définir et gérer efficacement votre contenu. <br><br> - [Déclaration de contenu](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Fonctionnalité" width="700"> | **Fichier de déclaration de contenu par locale**<br><br>Accélérez votre développement en déclarant votre contenu une seule fois, avant la génération automatique.<br><br> - [Fichier de déclaration de contenu par locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Fonctionnalité" width="700">                      | **Environnement avec typage sécurisé**<br><br>Exploitez TypeScript pour garantir que vos définitions de contenu et votre code sont sans erreur, tout en bénéficiant de l'autocomplétion dans votre IDE.<br><br> - [Configuration TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Fonctionnalité" width="700">                         | **Configuration simplifiée**<br><br>Démarrez rapidement avec une configuration minimale. Ajustez facilement les paramètres pour l'internationalisation, le routage, l'IA, la construction et la gestion du contenu.<br><br> - [Découvrez l'intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Fonctionnalité" width="700">                   | **Récupération de contenu simplifiée**<br><br>Pas besoin d'appeler votre fonction `t` pour chaque contenu. Récupérez tout votre contenu directement en utilisant un seul hook.<br><br> - [Intégration React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Fonctionnalité" width="700">                    | **Implémentation cohérente des composants serveur**<br><br>Parfaitement adapté aux composants serveur Next.js, utilisez la même implémentation pour les composants client et serveur, sans avoir besoin de passer votre fonction `t` à chaque composant serveur. <br><br> - [Composants Serveur](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Fonctionnalité" width="700">                           | **Base de code organisée**<br><br>Gardez votre base de code plus organisée : 1 composant = 1 dictionnaire dans le même dossier. Les traductions proches de leurs composants respectifs améliorent la maintenabilité et la clarté. <br><br> - [Comment Intlayer fonctionne](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Fonctionnalité" width="700">                         | **Routage Amélioré**<br><br>Prise en charge complète du routage d’application, s’adaptant parfaitement aux structures d’applications complexes, pour Next.js, React, Vite, Vue.js, etc.<br><br> - [Explorer l’intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                                   | **Support Markdown**<br><br>Importer et interpréter les fichiers de localisation et le Markdown distant pour du contenu multilingue comme les politiques de confidentialité, la documentation, etc. Interpréter et rendre les métadonnées Markdown accessibles dans votre code.<br><br> - [Fichiers de contenu](https://intlayer.org/doc/concept/content/file)                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                              | **Éditeur Visuel Gratuit & CMS**<br><br>Un éditeur visuel gratuit et un CMS sont disponibles pour les rédacteurs de contenu, supprimant le besoin d'une plateforme de localisation. Gardez votre contenu synchronisé en utilisant Git, ou externalisez-le totalement ou partiellement avec le CMS.<br><br> - [Éditeur Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                                     | **Contenu Tree-shakable**<br><br>Contenu tree-shakable, réduisant la taille du bundle final. Charge le contenu par composant, excluant tout contenu inutilisé de votre bundle. Supporte le chargement paresseux pour améliorer l'efficacité du chargement de l'application. <br><br> - [Optimisation de la construction de l'application](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                           | **Rendu Statique**<br><br>Ne bloque pas le rendu statique. <br><br> - [Intégration Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                             | **Traduction alimentée par l'IA**<br><br>Transformez votre site web en 231 langues en un seul clic grâce aux outils avancés de traduction alimentés par l'IA d'Intlayer, en utilisant votre propre fournisseur d'IA / clé API. <br><br> - [Intégration CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Remplissage automatique](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                        | **Intégration du serveur MCP**<br><br>Fournit un serveur MCP (Model Context Protocol) pour l'automatisation dans l'IDE, permettant une gestion fluide du contenu et des workflows i18n directement au sein de votre environnement de développement. <br><br> - [Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                           | **Extension VSCode**<br><br>Intlayer fournit une extension VSCode pour vous aider à gérer votre contenu et vos traductions, construire vos dictionnaires, traduire votre contenu, et plus encore. <br><br> - [Extension VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Fonctionnalité" width="700">                    | **Interopérabilité**<br><br>Permet l'interopérabilité avec react-i18next, next-i18next, next-intl, et react-intl. <br><br> - [Intlayer et react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer et next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer et next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                            |

---

## 📦 Installation

Commencez votre aventure avec Intlayer dès aujourd'hui et découvrez une approche plus fluide et plus puissante de l'internationalisation.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
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

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Obtenez le guide complet → </a>

## 🎥 Tutoriel en direct sur YouTube

[![Comment internationaliser votre application avec Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Table des matières

Explorez notre documentation complète pour commencer avec Intlayer et apprendre comment l'intégrer dans vos projets.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Démarrer</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Pourquoi Intlayer ?</a></li>
  <li><a href="https://intlayer.org/doc">Introduction</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Comment fonctionne Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Configuration</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Fournisseur d'IA</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">CLI Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Éditeur Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">CMS Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Dictionnaire</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Fichier de déclaration de contenu par locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Traduction</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Énumération</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Condition</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Imbrication</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Récupération de fonction</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Insertion</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Fichier</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Environnement</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer avec Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Démarrage avec Tanstack</a></li>
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
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/what_is_internationalization.md">Qu'est-ce que l'i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n et SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer et i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer et react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer et next-intl</a></li>
</ul>
</details>

## 🌐 Readme dans d'autres langues

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

## 🤝 Communauté

Intlayer est construit avec et pour la communauté et nous serions ravis de recevoir vos retours !

- Vous avez une suggestion ? [Ouvrez une issue](https://github.com/aymericzip/intlayer/issues)
- Vous avez trouvé un bug ou une amélioration ? [Soumettez une PR](https://github.com/aymericzip/intlayer/pulls)
- Besoin d’aide ou envie de vous connecter ? [Rejoignez notre Discord](https://discord.gg/7uxamYVeCk)

Vous pouvez aussi nous suivre sur :

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
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

### Contribution

Pour des directives plus détaillées sur la contribution à ce projet, veuillez consulter le fichier [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Il contient des informations essentielles sur notre processus de développement, les conventions des messages de commit, et les procédures de publication. Vos contributions nous sont précieuses, et nous apprécions vos efforts pour améliorer ce projet !

### Merci pour votre soutien

Si vous aimez Intlayer, donnez-nous une ⭐ sur GitHub. Cela aide d'autres personnes à découvrir le projet !

[![Graphique de l'historique des étoiles](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
