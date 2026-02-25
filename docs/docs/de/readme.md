<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong>i18n für jede Komponente</strong>
</h1>
<h2 align="center">
  <strong>KI-gestützte Übersetzung. Visueller Editor. Mehrsprachiges CMS.</strong>
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
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm Version" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Sterne" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monatliche Downloads" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Lizenz"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="letzter Commit"/>
  </a>
</p>

![Video ansehen](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Erste_Schritte-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Was ist Intlayer?

Die meisten i18n-Bibliotheken sind entweder zu komplex, zu starr oder nicht für moderne Frameworks entwickelt.

Intlayer ist eine **moderne i18n-Lösung** für Web- und mobile Apps.  
Es ist framework-unabhängig, **KI-gestützt** und enthält ein kostenloses **CMS & einen visuellen Editor**.

Mit **lokalspezifischen Inhaltsdateien**, **TypeScript-Autovervollständigung**, **Tree-shakable Wörterbüchern** und **CI/CD-Integration** macht Intlayer die Internationalisierung **schneller, sauberer und intelligenter**.

## Hauptvorteile von Intlayer:

| Merkmal                                                                                                                                             | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Framework-übergreifende Unterstützung**<br><br>Intlayer ist mit allen gängigen Frameworks und Bibliotheken kompatibel, einschließlich Next.js, React, Vite, Vue.js, Nuxt, Preact, Express und mehr.                                                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **JavaScript-gestütztes Content-Management**<br><br>Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten. <br><br> - [Inhaltsdeklaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Lokalspezifische Inhaltsdeklarationsdatei**<br><br>Beschleunigen Sie Ihre Entwicklung, indem Sie Ihren Inhalt einmal vor der automatischen Generierung deklarieren.<br><br> - [Lokalspezifische Inhaltsdeklarationsdatei](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **Compiler**<br><br>Der Intlayer-Compiler extrahiert automatisch den Inhalt aus den Komponenten und generiert die Wörterbuchdateien.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Typsichere Umgebung**<br><br>Nutzen Sie TypeScript, um sicherzustellen, dass Ihre Inhaltsdefinitionen und Ihr Code fehlerfrei sind, während Sie gleichzeitig von der IDE-Autovervollständigung profitieren.<br><br> - [TypeScript-Konfiguration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Vereinfachtes Setup**<br><br>Starten Sie schnell mit minimaler Konfiguration. Passen Sie Einstellungen für Internationalisierung, Routing, KI, Build und Inhaltsverwaltung mit Leichtigkeit an. <br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Vereinfachter Inhaltsabruf**<br><br>Es ist nicht nötig, Ihre `t`-Funktion für jedes Inhaltselement aufzurufen. Rufen Sie Ihren gesamten Inhalt direkt mit einem einzigen Hook ab.<br><br> - [React-Integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Konsistente Implementierung von Server-Komponenten**<br><br>Perfekt geeignet für Next.js-Server-Komponenten. Verwenden Sie dieselbe Implementierung sowohl für Client- als auch für Server-Komponenten. Die `t`-Funktion muss nicht an jede Server-Komponente übergeben werden. <br><br> - [Server-Komponenten](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Organisierte Codebasis**<br><br>Halten Sie Ihre Codebasis organisierter: 1 Komponente = 1 Wörterbuch im selben Ordner. Übersetzungen in der Nähe ihrer jeweiligen Komponenten verbessern die Wartbarkeit und Klarheit. <br><br> - [Wie Intlayer funktioniert](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Verbessertes Routing**<br><br>Volle Unterstützung für App-Routing, das sich nahtlos an komplexe Anwendungsstrukturen anpasst, für Next.js, React, Vite, Vue.js usw.<br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown-Unterstützung**<br><br>Importier und interpretieren Sie lokale Dateien und Remote-Markdown für mehrsprachige Inhalte wie Datenschutzrichtlinien, Dokumentationen usw. Interpretieren Sie Markdown-Metadaten und machen Sie sie in Ihrem Code zugänglich.<br><br> - [Inhaltsdateien](https://intlayer.org/doc/concept/content/file)                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Kostenloser visueller Editor & CMS**<br><br>Ein kostenloser visueller Editor und ein CMS stehen für Content-Autoren zur Verfügung, sodass keine Lokalisierungsplattform erforderlich ist. Halten Sie Ihren Inhalt mit Git synchron oder externalisieren Sie ihn ganz oder teilweise mit dem CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Tree-shakable Inhalt**<br><br>Tree-shakable Inhalt, der die Größe des endgültigen Bundles reduziert. Lädt Inhalt pro Komponente und schließt ungenutzten Inhalt aus Ihrem Bundle aus. Unterstützt Lazy Loading, um die Ladeeffizienz der App zu verbessern. <br><br> - [App-Build-Optimierung](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Statisches Rendering**<br><br>Blockiert statisches Rendering nicht. <br><br> - [Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **KI-gestützte Übersetzung**<br><br>Verwandeln Sie Ihre Website mit nur einem Klick in 231 Sprachen mit den fortschrittlichen KI-gestützten Übersetzungswerkzeugen von Intlayer unter Verwendung Ihres eigenen KI-Anbieters / API-Schlüssels. <br><br> - [CI/CD-Integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto-Fill](https://intlayer.org/doc/concept/auto-fill)                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP-Server-Integration**<br><br>Bietet einen MCP-Server (Model Context Protocol) für die IDE-Automatisierung, der nahtloses Content-Management und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht. <br><br> - [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode-Erweiterung**<br><br>Intlayer bietet eine VSCode-Erweiterung, die Ihnen hilft, Ihre Inhalte und Übersetzungen zu verwalten, Ihre Wörterbücher zu erstellen, Ihre Inhalte zu übersetzen und mehr. <br><br> - [VSCode-Erweiterung](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilität**<br><br>Ermöglicht Interoperabilität mit react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer und react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer und next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer und next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer und vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 Installation

Beginnen Sie noch heute Ihre Reise mit Intlayer und erleben Sie einen reibungsloseren, leistungsstärkeren Ansatz zur Internationalisierung.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Erste_Schritte-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Schnellstart (Next.js)

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

<a href="https://intlayer.org/doc/environment/nextjs"> Zum vollständigen Leitfaden → </a>

## 🎥 Live-Tutorial auf YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Erste_Schritte-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Inhaltsverzeichnis

Erkunden Sie unsere umfassende Dokumentation, um mit Intlayer zu beginnen und zu erfahren, wie Sie es in Ihre Projekte integrieren.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Erste Schritte</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Warum Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Einführung</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Konzept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Wie Intlayer funktioniert</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Konfiguration</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>Compiler</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Wörterbuch</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Lokalspezifische Inhaltsdeklarationsdatei</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Übersetzung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Aufzählung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Bedingung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Verschachtelung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Funktionsabruf</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Einfügung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>Datei</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Umgebung</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer mit Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js mit Compiler</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React mit Compiler</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start" rel=''>Tanstack start</a></li>
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
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/what_is_internationalization.md" rel=''>Was ist i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n und SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer und i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer und react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer und next-intl</a></li>
</ul>
</details>

## 🌐 Readme in anderen Sprachen

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

## 🤝 Community

Intlayer wird mit und für die Community entwickelt und wir würden uns über Ihr Feedback freuen!

- Haben Sie einen Vorschlag? [Eröffnen Sie ein Issue](https://github.com/aymericzip/intlayer/issues)
- Einen Fehler oder eine Verbesserung gefunden? [Senden Sie einen PR](https://github.com/aymericzip/intlayer/pulls)
- Brauchen Sie Hilfe oder möchten Sie sich vernetzen? [Treten Sie unserem Discord bei](https://discord.gg/7uxamYVeCk)

Sie können uns auch folgen auf:

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

### Beitrag

Detailliertere Richtlinien zur Mitarbeit an diesem Projekt finden Sie in der Datei [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Sie enthält wichtige Informationen zu unserem Entwicklungsprozess, zu Konventionen für Commit-Nachrichten und zu Release-Verfahren. Ihre Beiträge sind für uns wertvoll und wir schätzen Ihre Bemühungen, dieses Projekt zu verbessern!

Tragen Sie bei auf [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) oder [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Vielen Dank für die Unterstützung

Wenn Ihnen Intlayer gefällt, geben Sie uns einen ⭐ auf GitHub. Es hilft anderen, das Projekt zu entdecken! [Erfahren Sie, warum GitHub-Sterne wichtig sind](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
