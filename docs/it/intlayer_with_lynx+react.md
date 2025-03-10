# Iniziare con l'Internazionalizzazione (i18n) con Intlayer, Lynx e React

## Cos'è Intlayer?

**Intlayer** è una **libreria innovativa e open-source per l'internazionalizzazione (i18n)** che semplifica il supporto multilingue nelle applicazioni moderne. Funziona in molti ambienti JavaScript/TypeScript, **incluso Lynx** (tramite il pacchetto `react-intlayer`).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Garantire il supporto TypeScript** con tipi autogenerati.
- **Localizzare dinamicamente** i contenuti, inclusi **stringhe dell'interfaccia utente** (e in React per il web, può anche localizzare i metadati HTML, ecc.).
- **Beneficiare di funzionalità avanzate**, come il rilevamento dinamico della lingua e il cambio di lingua.

---

## Passo 1: Installa le dipendenze

Dal tuo progetto Lynx, installa i seguenti pacchetti:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Pacchetti

- **intlayer**  
  Il toolkit i18n principale per la configurazione, il contenuto del dizionario, la generazione di tipi e i comandi CLI.

- **react-intlayer**  
  Integrazione React che fornisce i provider di contesto e gli hook React che utilizzerai in Lynx per ottenere e cambiare le lingue.

- **lynx-intlayer**  
  Integrazione Lynx che fornisce il plugin per integrare Intlayer con il bundler Lynx.

---

## Passo 2: Crea una Configurazione Intlayer

Nella radice del tuo progetto (o in qualsiasi posizione comoda), crea un file di **configurazione Intlayer**. Potrebbe apparire così:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Aggiungi altre lingue necessarie
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Aggiungi altre lingue necessarie
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

All'interno di questa configurazione, puoi:

- Configurare la tua **lista di lingue supportate**.
- Impostare una lingua **predefinita**.
- Successivamente, potrai aggiungere opzioni più avanzate (es. log, directory di contenuti personalizzate, ecc.).
- Consulta la [documentazione sulla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md) per ulteriori informazioni.

## Passo 3: Aggiungi il plugin Intlayer al bundler Lynx

Per utilizzare Intlayer con Lynx, devi aggiungere il plugin al file `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... altri plugin
    pluginIntlayerLynx(),
  ],
});
```

## Passo 4: Aggiungi il provider Intlayer

Per mantenere sincronizzata la lingua dell'utente in tutta l'applicazione, devi avvolgere il tuo componente radice con il componente `IntlayerProvider` di `react-intlayer`.

Inoltre, devi aggiungere il file della funzione `intlayerPolyfill` per garantire che Intlayer funzioni correttamente.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Passo 5: Dichiarare i tuoi contenuti

Crea file di **dichiarazione dei contenuti** ovunque nel tuo progetto (comunemente all'interno di `src/`), utilizzando uno qualsiasi dei formati di estensione supportati da Intlayer:

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
- ecc.

Esempio (TypeScript con nodi TSX per Lynx):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      it: "su Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      it: "Tocca il logo e divertiti!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        it: "Modifica",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        it: "per vedere gli aggiornamenti!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      it: "su Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      it: "Tocca il logo e divertiti!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        it: "Modifica",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        it: "per vedere gli aggiornamenti!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      it: "su Lynx",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      it: "Tocca il logo e divertiti!",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca il logo y diviértete!",
    }),
    hint: [
      t({
        it: "Modifica",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        it: "per vedere gli aggiornamenti!",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "it": "su Lynx",
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "it": "Tocca il logo e divertiti!",
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca il logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "it": "Modifica",
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!",
          "it": "per vedere gli aggiornamenti!"
        }
      }
    ]
  }
}
```

> Per dettagli sulle dichiarazioni di contenuto, consulta la [documentazione sui contenuti di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

---

## Passo 4: Usa Intlayer nei tuoi Componenti

Usa il hook `useIntlayer` nei componenti figli per ottenere contenuti localizzati.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    // solo sfondo
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Quando utilizzi `content.someKey` in proprietà basate su stringhe (ad esempio, il `title` di un pulsante o il `children` di un componente `Text`), **chiama `content.someKey.value`** per ottenere la stringa effettiva.

---

## (Opzionale) Passo 5: Cambia la Lingua dell'App

Per cambiare le lingue direttamente dai tuoi componenti, puoi usare il metodo `setLocale` del hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Questo attiverà un nuovo rendering di tutti i componenti che utilizzano i contenuti di Intlayer, mostrando ora le traduzioni per la nuova lingua.

> Consulta la documentazione di [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md) per maggiori dettagli.

## Configura TypeScript (se utilizzi TypeScript)

Intlayer genera definizioni di tipo in una cartella nascosta (di default `.intlayer`) per migliorare l'autocompletamento e rilevare errori di traduzione:

```json5
// tsconfig.json
{
  // ... la tua configurazione TS esistente
  "include": [
    "src", // il tuo codice sorgente
    ".intlayer", // <-- assicurati che i tipi generati automaticamente siano inclusi
    // ... qualsiasi altra cosa già inclusa
  ],
}
```

Questo abilita funzionalità come:

- **Autocompletamento** per le chiavi del tuo dizionario.
- **Controllo dei tipi** che avvisa se accedi a una chiave inesistente o se il tipo non corrisponde.

---

## Configurazione di Git

Per evitare di commettere file generati automaticamente da Intlayer, aggiungi quanto segue al tuo `.gitignore`:

```plaintext
# Ignora i file generati da Intlayer
.intlayer
```

---

## Approfondisci

- **Editor Visivo**: Usa l'[Editor Visivo di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) per gestire le traduzioni visivamente.
- **Integrazione CMS**: Puoi anche esternalizzare e recuperare i contenuti del tuo dizionario da un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md).
- **Comandi CLI**: Esplora la [CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md) per attività come **estrarre traduzioni** o **controllare chiavi mancanti**.
