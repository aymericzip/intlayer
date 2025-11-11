<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: Ein Open-Source, flexibles i18n Toolkit mit KI-gestützter Übersetzung & CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Dokumentation</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF&cacheSeconds=86400" alt="npm Version" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700&cacheSeconds=86400" alt="GitHub Sterne" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monatliche Downloads" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="Lizenz"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="letzter Commit"/>
  </a>
</p>

![Video ansehen](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Erste_Schritte-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Was ist Intlayer?

Die meisten i18n-Bibliotheken sind entweder zu komplex, zu starr oder nicht für moderne Frameworks entwickelt.

Intlayer ist eine **moderne i18n-Lösung** für Web- und Mobile-Apps.  
Es ist framework-unabhängig, **KI-gestützt** und beinhaltet ein kostenloses **CMS & visuellen Editor**.

Mit **pro-Locale Inhaltsdateien**, **TypeScript-Autovervollständigung**, **baumoptimierbaren Wörterbüchern** und **CI/CD-Integration** macht Intlayer die Internationalisierung **schneller, sauberer und intelligenter**.

## Hauptvorteile von Intlayer:

| Funktion                                                                                                                                            | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Unterstützung für mehrere Frameworks**<br><br>Intlayer ist kompatibel mit allen wichtigen Frameworks und Bibliotheken, einschließlich Next.js, React, Vite, Vue.js, Nuxt, Preact, Express und mehr.                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **JavaScript-gesteuertes Content-Management**<br><br>Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten. <br><br> - [Inhaltsdeklaration](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Pro-Lokale Inhaltsdeklarationsdatei**<br><br>Beschleunigen Sie Ihre Entwicklung, indem Sie Ihre Inhalte einmalig deklarieren, bevor die automatische Generierung erfolgt.<br><br> - [Pro-Lokale Inhaltsdeklarationsdatei](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Typsicheres Umfeld**<br><br>Nutzen Sie TypeScript, um sicherzustellen, dass Ihre Inhaltsdefinitionen und Ihr Code fehlerfrei sind, und profitieren Sie gleichzeitig von der Autovervollständigung in Ihrer IDE.<br><br> - [TypeScript-Konfiguration](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Vereinfachte Einrichtung**<br><br>Starten Sie schnell mit minimaler Konfiguration. Passen Sie mühelos Einstellungen für Internationalisierung, Routing, KI, Build und Inhaltsverwaltung an. <br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Vereinfachte Inhaltsabfrage**<br><br>Es ist nicht erforderlich, Ihre `t`-Funktion für jeden Inhalt aufzurufen. Rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.<br><br> - [React-Integration](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Konsistente Implementierung von Server-Komponenten**<br><br>Perfekt geeignet für Next.js Server-Komponenten, verwenden Sie die gleiche Implementierung für Client- und Server-Komponenten, ohne die `t`-Funktion über jede Server-Komponente weitergeben zu müssen. <br><br> - [Server-Komponenten](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Organisierte Codebasis**<br><br>Halten Sie Ihre Codebasis besser organisiert: 1 Komponente = 1 Wörterbuch im selben Ordner. Übersetzungen nahe bei ihren jeweiligen Komponenten verbessern die Wartbarkeit und Klarheit. <br><br> - [Wie Intlayer funktioniert](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Verbessertes Routing**<br><br>Volle Unterstützung des App-Routings, das sich nahtlos an komplexe Anwendungsstrukturen anpasst, für Next.js, React, Vite, Vue.js usw.<br><br> - [Next.js-Integration erkunden](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown-Unterstützung**<br><br>Importieren und interpretieren Sie Lokalisierungsdateien und entfernte Markdown-Dateien für mehrsprachige Inhalte wie Datenschutzrichtlinien, Dokumentationen usw. Interpretieren Sie Markdown-Metadaten und machen Sie sie in Ihrem Code zugänglich.<br><br> - [Inhaltsdateien](https://intlayer.org/doc/concept/content/file)                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Kostenloser visueller Editor & CMS**<br><br>Ein kostenloser visueller Editor und CMS stehen Content-Autoren zur Verfügung, wodurch keine Lokalisierungsplattform mehr benötigt wird. Halten Sie Ihre Inhalte mit Git synchronisiert oder externalisieren Sie sie ganz oder teilweise mit dem CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Tree-shakable Inhalte**<br><br>Tree-shakable Inhalte, die die Größe des finalen Bundles reduzieren. Lädt Inhalte pro Komponente und schließt ungenutzte Inhalte aus Ihrem Bundle aus. Unterstützt Lazy Loading, um die Ladeeffizienz der App zu verbessern. <br><br> - [App-Build-Optimierung](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Statisches Rendering**<br><br>Blockiert das statische Rendering nicht. <br><br> - [Next.js-Integration](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **KI-gestützte Übersetzung**<br><br>Verwandeln Sie Ihre Website mit nur einem Klick in 231 Sprachen mithilfe der fortschrittlichen KI-gestützten Übersetzungswerkzeuge von Intlayer, die Ihren eigenen KI-Anbieter / API-Schlüssel verwenden. <br><br> - [CI/CD-Integration](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatisches Ausfüllen](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP-Server-Integration**<br><br>Stellt einen MCP (Model Context Protocol) Server für die IDE-Automatisierung bereit, der nahtloses Content-Management und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht. <br><br> - [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode-Erweiterung**<br><br>Intlayer bietet eine VSCode-Erweiterung, die Ihnen hilft, Ihre Inhalte und Übersetzungen zu verwalten, Ihre Wörterbücher zu erstellen, Ihre Inhalte zu übersetzen und mehr. <br><br> - [VSCode-Erweiterung](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilität**<br><br>Ermöglicht die Interoperabilität mit react-i18next, next-i18next, next-intl und react-intl. <br><br> - [Intlayer und react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer und next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer und next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                 |

---

## 📦 Installation

Beginnen Sie noch heute Ihre Reise mit Intlayer und erleben Sie einen reibungsloseren, leistungsfähigeren Ansatz zur Internationalisierung.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // unterstützte Sprachen
    defaultLocale: Locales.ENGLISH, // Standardsprache
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home"); // Übersetzungen für "home" laden

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Vollständige Anleitung → </a>

## 🎥 Live-Tutorial auf YouTube

[![Wie Sie Ihre Anwendung mit Intlayer internationalisieren](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Inhaltsverzeichnis

Entdecken Sie unsere umfassende Dokumentation, um mit Intlayer zu beginnen und zu lernen, wie Sie es in Ihre Projekte integrieren.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Erste Schritte</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Warum Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Einführung</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Konzept</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Wie Intlayer funktioniert</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Konfiguration</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">KI-Anbieter</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Wörterbuch</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Pro-Locale Content-Deklarationsdatei</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Übersetzung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Aufzählung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Bedingung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Verschachtelung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Funktionsabruf</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Einfügung</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Datei</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Umgebung</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer mit Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Tanstack Start</a></li>
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
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/what_is_internationalization.md">Was ist i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n und SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer und i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer und react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer und next-intl</a></li>
</ul>
</details>

## 🌐 Readme in anderen Sprachen

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

## 🤝 Gemeinschaft

Intlayer wird mit und für die Gemeinschaft entwickelt und wir freuen uns auf Ihr Feedback!

- Haben Sie einen Vorschlag? [Öffnen Sie ein Issue](https://github.com/aymericzip/intlayer/issues)
- Einen Fehler oder eine Verbesserung gefunden? [Reiche einen PR ein](https://github.com/aymericzip/intlayer/pulls)
- Brauchen Sie Hilfe oder möchten Sie sich vernetzen? [Treten Sie unserem Discord bei](https://discord.gg/7uxamYVeCk)

Sie können uns auch folgen auf:

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

### Beitrag

Für detailliertere Richtlinien zur Mitarbeit an diesem Projekt lesen Sie bitte die Datei [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Sie enthält wichtige Informationen zu unserem Entwicklungsprozess, den Konventionen für Commit-Nachrichten und den Veröffentlichungsverfahren. Ihre Beiträge sind uns wertvoll, und wir schätzen Ihre Bemühungen, dieses Projekt zu verbessern!

### Vielen Dank für die Unterstützung

Wenn Ihnen Intlayer gefällt, geben Sie uns einen ⭐ auf GitHub. Das hilft anderen, das Projekt zu entdecken!

[![Stern-Historien-Diagramm](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
