---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Expo + React Native multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Storia iniziale"
author: aymericzip
---

# Traduci la tua app Expo e React Native | Internazionalizzazione (i18n)

<Tabs defaultTab="code">
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta il [Template Applicazione](https://github.com/aymericzip/intlayer-react-native-template) su GitHub.

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `react-native-localize` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Copertura nativa React completa">

Intlayer è ottimizzato per funzionare perfettamente con React Native ed Expo offrendo **ambito del contenuto a livello di componente**, **supporto TypeScript** e tutte le funzionalità necessarie per ridimensionare l'internazionalizzazione (i18n) nelle app mobili.

</Accordion>

<Accordion header="Manutenibilità">

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[capacità dell'agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando il LLM di tua scelta al costo del tuo provider di intelligenza artificiale. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Prestazione">

La connessione di enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti in fase di compilazione.

</Accordion>

<Accordion header="Scalabilità con nessuno sviluppatore">

Più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** per aiutarti gestisci i tuoi contenuti multilingue in **tempo reale**, semplificando la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre il pacchetto e visualizzare le dimensioni fino al 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="installare le dipendenze">

Vedere [Modello di applicazione](https://github.com/aymericzip/intlayer-react-native-template) su GitHub.

Dal tuo progetto React Native, installa i seguenti pacchetti:

```bash pacchettoManager="npm"
npm installa interlayer react-intlayer
npm install --save-dev react-native-intlayer
init dell'interlayer npx
```

```bash packageManager="pnpm"
pnpm aggiungi intlayer react-intlayer
pnpm aggiungi --save-dev react-native-intlayer
init dell'interlayer pnpm
```

```bash packageManager="filato"
il filato aggiunge l'interstrato reagisce all'interstrato
filato aggiungi --save-dev react-native-intlayer
init.interstrato di filato
```

```bash packageManager="panino"
bun aggiungi intlayer react-intlayer
bun aggiungi --dev react-native-intlayer
bun x intlayer init
```

### Pacchetti

- **interstrato**  
  Il toolkit i18n principale per configurazione, contenuto del dizionario, generazione di tipi e comandi CLI.

- **reagire-interstrato**  
  Integrazione React che fornisce i provider di contesto e gli hook React che utilizzerai in React Native per ottenere e cambiare locale.

- **react-native-intlayer**  
  Integrazione React Native che fornisce il plug-in Metro per l'integrazione di Intlayer con il bundler React Native.

---

</Step>

<Step number={2} title="Installa le dipendenze">

Dal tuo progetto React Native, installa i seguenti pacchetti:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
```

### Pacchetti

- **intlayer**  
  Il toolkit i18n principale per la configurazione, il contenuto del dizionario, la generazione dei tipi e i comandi CLI.

- **react-intlayer**  
  Integrazione React che fornisce i provider di contesto e gli hook React che utilizzerai in React Native per ottenere e cambiare le localizzazioni.

- **react-native-intlayer**  
  Integrazione React Native che fornisce il plugin Metro per integrare Intlayer con il bundler di React Native.

---

</Step>

<Step number={3} title="Crea una Configurazione Intlayer">

Nella root del tuo progetto (o in qualsiasi posizione conveniente), crea un file di **configurazione Intlayer**. Potrebbe apparire così:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Se i tipi Locales non sono disponibili, prova a impostare moduleResolution su "bundler" nel tuo tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Aggiungi qualsiasi altra localizzazione di cui hai bisogno
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

All'interno di questa configurazione, puoi:

- Configurare la tua **lista di localizzazioni supportate**.
- Impostare una localizzazione **predefinita**.
- Successivamente, potrai aggiungere opzioni più avanzate (ad esempio, log, directory di contenuti personalizzate, ecc.).
- Consulta la [documentazione di configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori informazioni.

</Step>

<Step number={4} title="Aggiungi il plugin Metro">

Metro è un bundler per React Native. È il bundler predefinito per i progetti React Native creati con il comando `react-native init`. Per usare Intlayer con Metro, devi aggiungere il plugin al file `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

</Step>

<Step number={5} title="Aggiungi il provider Intlayer">

Per mantenere sincronizzata la lingua dell'utente in tutta l'applicazione, devi avvolgere il componente radice con il componente `IntlayerProvider` da `react-intlayer-native`.

> Assicurati di utilizzare il provider da `react-native-intlayer` invece di `react-intlayer`. L'export da `react-native-intlayer` include polyfills per l'API web.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Dichiarare il Tuo Contenuto">

Crea file di **dichiarazione del contenuto** in qualsiasi punto del tuo progetto (comunemente all'interno di `src/`), utilizzando uno qualsiasi dei formati di estensione supportati da Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- ecc.

> **Expo Router (web): tieni i file `.content.*` fuori dalla directory `app/`.** Expo Router tratta ogni file JavaScript/TypeScript all'interno di `app/` come una rotta. Sul web, la sua scoperta delle rotte scansiona direttamente il file system e **non** rispetta il `resolver.blockList` di Metro, quindi un `*.content.ts` co-localizzato viene registrato come una rotta. Un file come `app/(tabs)/_layout.content.ts` viene persino analizzato come un layout (la parte `.content` viene letta come suffisso della piattaforma), il che entra in conflitto con il vero `_layout.tsx` e genera l'errore:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Posiziona le tue dichiarazioni in una directory al di fuori di `app/` (ad esempio `content/` o `src/content/`). Intlayer scopre i file `.content.*` ovunque nel progetto e i dizionari sono referenziati tramite la loro `key`, quindi non sono necessarie modifiche agli import. Su nativo questo non è richiesto (la `blockList` di Metro li nasconde già), ma utilizzare una directory diversa da `app/` mantiene entrambe le piattaforme funzionanti.

Esempio (TypeScript con nodi TSX per React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Dizionario dei contenuti per il nostro dominio "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Per dettagli sulle dichiarazioni di contenuto, consulta la [documentazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

---

</Step>

<Step number={7} title="Usa Intlayer nei tuoi componenti">

Usa l'hook `useIntlayer` nei componenti figli per ottenere contenuti localizzati.

### Esempio

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Quando si utilizza `content.someKey` in proprietà basate su stringhe (ad esempio, il `title` di un pulsante o i `children` di un componente `Text`), **chiamare `content.someKey.value`** per ottenere la stringa effettiva.

> Se la tua app esiste già, puoi utilizzare l' [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) in combinazione con il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per convertire migliaia di componenti in un secondo.

---

</Step>

<Step number={8} title="Cambiare la Lingua dell'App">

Per cambiare la lingua dall'interno dei tuoi componenti, puoi usare il metodo `setLocale` dell'hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Questo provoca un nuovo rendering di tutti i componenti che utilizzano contenuti Intlayer, mostrando ora le traduzioni per la nuova localizzazione.

> Vedi la documentazione di [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md) per maggiori dettagli.

</Step>

</Steps>

## Configurare TypeScript (se usi TypeScript)

Intlayer genera definizioni di tipo in una cartella nascosta (di default `.intlayer`) per migliorare l'autocompletamento e rilevare errori di traduzione:

```json5
// tsconfig.json
{
  // ... la tua configurazione TS esistente
  "include": [
    "src", // il tuo codice sorgente
    ".intlayer/types/**/*.ts", // <-- assicurati che i tipi generati automaticamente siano inclusi
    // ... qualsiasi altra cosa che già includi
  ],
}
```

Questo abilita funzionalità come:

- **Completamento automatico** per le chiavi del tuo dizionario.
- **Controllo dei tipi** che avvisa se accedi a una chiave inesistente o se c'è un disallineamento di tipo.

---

## Configurazione Git

Per evitare di commettere file generati automaticamente da Intlayer, aggiungi quanto segue al tuo `.gitignore`:

```bash
#  Ignora i file generati da Intlayer
.intlayer
```

---

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vai oltre

- **Editor Visivo**: Usa il [Visual Editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) per gestire le traduzioni in modo visivo.
- **Integrazione CMS**: Puoi anche esternalizzare e recuperare il contenuto del tuo dizionario da un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
- **Comandi CLI**: Esplora il [CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per attività come **estrarre traduzioni** o **controllare le chiavi mancanti**.

Divertiti a sviluppare le tue app **React Native** con un i18n completamente potenziato tramite **Intlayer**!

---

### Debug

React Native può essere meno stabile di React Web, quindi presta particolare attenzione all'allineamento delle versioni.

Intlayer è principalmente orientato all'API Web Intl; su React Native è necessario includere i polyfill appropriati.

Checklist:

- Utilizza le versioni più recenti di `intlayer`, `react-intlayer` e `react-native-intlayer`.
- Abilita il polyfill di Intlayer.
- Se utilizzi `getLocaleName` o altre utility basate su Intl-API, importa questi polyfill all'inizio (ad esempio in `index.js` o `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Verifica la configurazione di Metro (resolver aliases, asset plugins, percorsi `tsconfig`) se i moduli non vengono risolti.

---
