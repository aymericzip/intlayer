---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Documentazione del pacchetto | react-native-intlayer
description: Scopri come utilizzare il pacchetto react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# react-native-intlayer: Internazionalizza (i18n) un'applicazione React Native

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `react-native-intlayer`** ti permette di internazionalizzare la tua applicazione Vite. Include il plugin Metro per impostare la configurazione tramite variabili d'ambiente nel [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## Perché internazionalizzare la tua applicazione React Native?

Internazionalizzare la tua applicazione React Native è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone provenienti da diversi contesti linguistici.

## Configurazione

Il pacchetto `react-native-intlayer` funziona perfettamente con il [`pacchetto react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) e il [`pacchetto intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/index.md). Dai un'occhiata alla documentazione pertinente per maggiori informazioni.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Esempio di utilizzo

Ecco un esempio di come includere i plugin nella tua configurazione vite.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Padroneggiare l'internazionalizzazione della tua applicazione Vite

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione Vite.

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione React (i18n) con Intlayer e React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_native+expo.md) per applicazioni React Native.**

## Informazioni su Intlayer

- [Sito web di Intlayer](https://intlayer.org)
- [Documentazione Intlayer](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Fai le tue domande alla nostra documentazione intelligente](https://intlayer.org/docchat)

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
