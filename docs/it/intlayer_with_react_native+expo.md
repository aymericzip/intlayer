# Introduzione all'Internazionalizzazione (i18n) con Intlayer e React Native

## Cos'è Intlayer?

**Intlayer** è una **libreria open-source innovativa per l'internazionalizzazione (i18n)** che semplifica il supporto multilingue nelle applicazioni moderne. Funziona in diversi ambienti JavaScript/TypeScript, **incluso React Native** (tramite il pacchetto `react-intlayer`).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Garantire il supporto a TypeScript** con tipi generati automaticamente.
- **Localizzare dinamicamente** i contenuti, incluse **stringhe dell'interfaccia utente** (e, per React web, anche i metadati HTML, ecc.).
- **Beneficiare di funzionalità avanzate**, come il rilevamento dinamico della lingua e il cambio di lingua in tempo reale.

---

## Passaggio 1: Installa le Dipendenze

Nel tuo progetto React Native, installa i seguenti pacchetti:

```bash packageManager="npm"
npm install intlayer react-intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-native-intlayer
```

### Pacchetti

- **intlayer**  
  Il toolkit principale per l'i18n: configurazione, contenuti dei dizionari, generazione dei tipi e comandi CLI.

- **react-intlayer**  
  Integrazione con React che fornisce provider di contesto e hook React per ottenere e cambiare la lingua in React Native.

- **react-native-intlayer**  
  Integrazione specifica per React Native, che fornisce il plugin Metro per la compatibilità con il bundler di React Native.

---

## Passaggio 2: Crea un File di Configurazione Intlayer

Nella root del progetto (o in qualsiasi percorso comodo), crea un file di configurazione di Intlayer simile a questo:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Aggiungi altre lingue se necessario
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
      // ... Aggiungi altre lingue se necessario
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

In questa configurazione, puoi:

- Definire la lista delle **lingue supportate**.
- Impostare una **lingua predefinita**.
- Aggiungere opzioni avanzate in seguito (es. log, directory personalizzate per i contenuti, ecc.).
- Consulta la [documentazione sulla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md) per maggiori dettagli.

---

## Passaggio 3: Aggiungi il Plugin Metro

Metro è il bundler predefinito per i progetti React Native. Per utilizzare Intlayer con Metro, aggiungi il plugin nel file `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

---

## Passaggio 4: Aggiungi il Provider di Intlayer

Per mantenere sincronizzata la lingua dell'utente nell'applicazione, devi avvolgere il tuo componente principale con `IntlayerProvider` da `react-intlayer`.

Inoltre, aggiungi `intlayerPolyfill` nel file `index.js` per garantire il corretto funzionamento di Intlayer.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent locale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

---

## Passaggio 5: Dichiarare i Contenuti

Crea file di dichiarazione dei contenuti nel tuo progetto (solitamente in `src/`), con uno dei formati supportati da Intlayer:

- `.content.ts`
- `.content.mjs`
- `.content.cjs`
- `.content.json`
- ecc.

Esempio (TypeScript con nodi TSX per React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/**
 * Dizionario dei contenuti per la schermata principale
 */
const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      it: "Benvenuto!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

---

## Passaggio 6: Utilizzare Intlayer nei Componenti

Dopo aver avvolto il tuo componente radice con `IntlayerProvider`, utilizza `useIntlayer` nei componenti figlio per ottenere contenuti localizzati.

### Esempio

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import { ThemedText } from "@/components/ThemedText";

const HomeScreen = () => {
  const { title } = useIntlayer("home-screen");

  return <ThemedText>{title}</ThemedText>;
};

export default HomeScreen;
```

---

## (Opzionale) Passaggio 7: Cambiare la Lingua dell'App

Per cambiare lingua nei componenti, usa l’hook `useLocale` con il metodo `setLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Passa all'Italiano"
      onPress={() => {
        setLocale(Locales.ITALIAN);
      }}
    />
  );
};
```

---

## Configurazione TypeScript

Aggiungi `.intlayer` a `tsconfig.json` per includere i tipi generati:

```json
{
  "include": ["src", ".intlayer"]
}
```

---

## Vai Oltre

- **Editor Visuale**: Usa l’[Editor Visuale di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md).
- **CLI Intlayer**: Scopri i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md).
