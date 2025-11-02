---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Come costruire dizionari?
description: Impara come costruire dizionari.
keywords:
  - costruire
  - dizionari
  - intlayer
  - comando
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Costruire Dizionari

## Come costruire dizionari

Intlayer fornisce uno strumento da linea di comando per costruire dizionari.

```bash
npx intlayer dictionaries build
```

Questo comando:

- Scansiona tutti i file di dichiarazione contenuti (`.content.{ts,tsx,js,mjs,cjs,json,...}`) nel tuo progetto.
- Genera dizionari e li memorizza nella cartella `.intlayer/dictionary`.

### Modalità Watch

Se vuoi aggiornare automaticamente i dizionari quando vengono apportate modifiche ai file di dichiarazione dei contenuti, esegui il seguente comando:

```bash
npx intlayer dictionaries build --watch
```

In questa modalità, Intlayer scansionerà e costruirà i dizionari ogni volta che vengono apportate modifiche ai file di dichiarazione dei contenuti e aggiornerà automaticamente la cartella `.intlayer/dictionary`.

### Utilizzo dell'estensione VSCode

Puoi anche utilizzare l'[estensione Intlayer per VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/it/vs_code_extension.md) per migliorare la tua esperienza con Intlayer in VSCode.

### Utilizzo del plugin per il tuo framework applicativo preferito

Se stai utilizzando un framework come Next.js (Webpack / Turbopack), Vite, React Native, Lynx ecc., Intlayer fornisce un plugin che puoi utilizzare per integrare Intlayer nella tua applicazione.

Intlayer costruirà i dizionari prima della compilazione della tua applicazione.
Allo stesso modo, in modalità sviluppo, Intlayer monitorerà le modifiche ai file di dichiarazione dei contenuti e ricostruirà automaticamente i dizionari.

Quindi, fai riferimento alla documentazione specifica del tuo framework per imparare come integrare il plugin.
