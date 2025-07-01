---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del pacchetto | react-scripts-intlayer
description: Scopri come utilizzare il pacchetto react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# react-scripts-intlayer: Pacchetto NPM per usare Intlayer in un'applicazione React Create App

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `react-scripts-intlayer`** include i comandi e i plugin `react-scripts-intlayer` per integrare Intlayer con un'applicazione basata su Create React App. Questi plugin si basano su [craco](https://craco.js.org/) e includono configurazioni aggiuntive per il bundler [Webpack](https://webpack.js.org/).

## Configurazione

Il pacchetto `react-scripts-intlayer` funziona perfettamente con il [`pacchetto react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) e con il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/index.md). Consulta la documentazione pertinente per maggiori informazioni.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Utilizzo

### Comandi CLI

Il pacchetto `react-scripts-intlayer` fornisce i seguenti comandi CLI:

- `npx react-scripts-intlayer build`: Compila l'applicazione React con la configurazione Intlayer.
- `npx react-scripts-intlayer start`: Avvia il server di sviluppo con la configurazione Intlayer.

### Sostituire gli script in package.json

Per utilizzare il pacchetto `react-scripts-intlayer`, è necessario sostituire gli script in `package.json` con i seguenti comandi:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Usa una configurazione Webpack personalizzata

`react-scripts-intlayer` si basa su [craco](https://craco.js.org/), che consente di personalizzare la configurazione di Webpack.
Se hai bisogno di personalizzare la configurazione di Webpack, puoi anche implementare la tua configurazione basata sul plugin craco di intlayer. [Vedi esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Leggi la guida completa di Intlayer per React Create App

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione React.
[Scopri come usare intlayer con React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md).

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
