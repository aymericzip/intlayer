<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : un toolkit i18n open-source e flessibile con traduzione AI-powered e CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Documentazione</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="versione npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Stelle GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="download mensili" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="licenza"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="ultimo commit"/>
  </a>
</p>

![Guarda il video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Inizia-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Cos'è Intlayer?

La maggior parte delle librerie i18n sono o troppo complesse, troppo rigide o non progettate per framework moderni.

Intlayer è una **soluzione i18n moderna** per app web e mobile.  
È indipendente dal framework, **alimentata dall'IA** e include un **CMS e un editor visuale** gratuiti.

Con **file di contenuto per ogni locale**, **autocompletamento TypeScript**, **dizionari tree-shakable** e **integrazione CI/CD**, Intlayer rende l'internazionalizzazione **più veloce, pulita e intelligente**.

## Vantaggi chiave di Intlayer:

| Caratteristica                                                                                                                                      | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Supporto Cross-Framework**<br><br>Intlayer è compatibile con tutti i principali framework e librerie, inclusi Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e altri ancora.                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **Gestione dei Contenuti con JavaScript**<br><br>Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente. <br><br> - [Dichiarazione dei contenuti](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **File di Dichiarazione dei Contenuti per Locale**<br><br>Accelera il tuo sviluppo dichiarando i contenuti una sola volta, prima della generazione automatica.<br><br> - [File di Dichiarazione dei Contenuti per Locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Ambiente Type-Safe**<br><br>Sfrutta TypeScript per garantire che le definizioni dei tuoi contenuti e il codice siano privi di errori, beneficiando anche dell'autocompletamento nell'IDE.<br><br> - [Configurazione di TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Configurazione Semplificata**<br><br>Avvia rapidamente con una configurazione minima. Regola facilmente le impostazioni per l'internazionalizzazione, il routing, l'IA, la build e la gestione dei contenuti.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Recupero Contenuti Semplificato**<br><br>Non è necessario chiamare la funzione `t` per ogni singolo contenuto. Recupera tutti i tuoi contenuti direttamente usando un unico hook.<br><br> - [Integrazione React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Implementazione Coerente dei Componenti Server**<br><br>Perfettamente adatto per i componenti server di Next.js, utilizza la stessa implementazione sia per i componenti client che per quelli server, senza bisogno di passare la funzione `t` attraverso ogni componente server. <br><br> - [Componenti Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Codebase Organizzato**<br><br>Mantieni la tua codebase più organizzata: 1 componente = 1 dizionario nella stessa cartella. Traduzioni vicine ai rispettivi componenti, migliorando la manutenibilità e la chiarezza. <br><br> - [Come funziona Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Routing Avanzato**<br><br>Pieno supporto per il routing delle app, adattandosi perfettamente a strutture applicative complesse, per Next.js, React, Vite, Vue.js, ecc.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Supporto Markdown**<br><br>Importa e interpreta file locali e Markdown remoto per contenuti multilingue come politiche sulla privacy, documentazione, ecc. Interpreta e rendi accessibili i metadati Markdown nel tuo codice.<br><br> - [File di contenuto](https://intlayer.org/doc/concept/content/file)                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Editor Visivo e CMS Gratuiti**<br><br>Un editor visivo gratuito e un CMS sono disponibili per i redattori di contenuti, eliminando la necessità di una piattaforma di localizzazione. Mantieni i tuoi contenuti sincronizzati usando Git, oppure esternalizzali totalmente o parzialmente con il CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Contenuto Tree-shakable**<br><br>Contenuto tree-shakable, che riduce la dimensione del bundle finale. Carica il contenuto per componente, escludendo qualsiasi contenuto non utilizzato dal tuo bundle. Supporta il lazy loading per migliorare l'efficienza del caricamento dell'app.<br><br> - [Ottimizzazione della build dell'app](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Rendering Statico**<br><br>Non blocca il Rendering Statico. <br><br> - [Integrazione Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Traduzione Potenziata dall'IA**<br><br>Trasforma il tuo sito web in 231 lingue con un solo clic utilizzando gli avanzati strumenti di traduzione potenziati dall'IA di Intlayer, sfruttando il tuo provider AI / chiave API. <br><br> - [Integrazione CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI di Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Compilazione automatica](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Integrazione Server MCP**<br><br>Fornisce un server MCP (Model Context Protocol) per l'automazione dell'IDE, consentendo una gestione dei contenuti e flussi di lavoro i18n senza interruzioni direttamente all'interno del tuo ambiente di sviluppo. <br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Estensione VSCode**<br><br>Intlayer fornisce un'estensione per VSCode per aiutarti a gestire i tuoi contenuti e le traduzioni, costruire i tuoi dizionari, tradurre i tuoi contenuti e altro ancora. <br><br> - [Estensione VSCode](https://intlayer.org/doc/it/vs-code-extension)                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilità**<br><br>Consente l'interoperabilità con react-i18next, next-i18next, next-intl e react-intl. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                    |

---

## 📦 Installazione

Inizia oggi il tuo percorso con Intlayer e scopri un approccio più fluido e potente all'internazionalizzazione.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Avvio rapido (Next.js)

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

<a href="https://intlayer.org/doc/environment/nextjs"> Ottieni la guida completa → </a>

## 🎥 Tutorial live su YouTube

[![Come internazionalizzare la tua applicazione usando Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Indice

Esplora la nostra documentazione completa per iniziare con Intlayer e imparare come integrarlo nei tuoi progetti.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Inizia</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Perché Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Introduzione</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Concetto</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Come Funziona Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Configurazione</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Fornitore AI</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Dizionario</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">File di Dichiarazione Contenuti per Locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Traduzione</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumerazione</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Condizione</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Annidamento</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Recupero Funzione</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Inserimento</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">File</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Ambiente</summary>
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
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Avvio Tanstack</a></li>
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
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/what_is_internationalization.md">Cos'è i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n e SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer e i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer e react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer e next-intl</a></li>
</ul>
</details>

## 🌐 Readme in altre lingue

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

## 🤝 Comunità

Intlayer è costruito con e per la comunità e ci piacerebbe avere il tuo contributo!

- Hai un suggerimento? [Apri una issue](https://github.com/aymericzip/intlayer/issues)
- Hai trovato un bug o un miglioramento? [Invia una PR](https://github.com/aymericzip/intlayer/pulls)
- Hai bisogno di aiuto o vuoi connetterti? [Unisciti al nostro Discord](https://discord.gg/7uxamYVeCk)

Puoi anche seguirci su:

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

### Contributo

Per linee guida più dettagliate su come contribuire a questo progetto, si prega di fare riferimento al file [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Contiene informazioni essenziali sul nostro processo di sviluppo, sulle convenzioni per i messaggi di commit e sulle procedure di rilascio. I vostri contributi sono preziosi per noi e apprezziamo i vostri sforzi per migliorare questo progetto!

### Grazie per il Supporto

Se ti piace Intlayer, lasciaci una ⭐ su GitHub. Aiuta altri a scoprire il progetto!

[![Grafico della Storia delle Stelle](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
