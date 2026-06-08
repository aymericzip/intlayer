---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: "i18n per componente vs. i18n centralizzato: un nuovo approccio con Intlayer"
description: "Un'analisi approfondita delle strategie di internazionalizzazione in React, confrontando gli approcci centralizzato, per-key e per-componente, e presentando Intlayer."
keywords:
  - i18n
  - React
  - Internazionalizzazione
  - Intlayer
  - Ottimizzazione
  - Dimensione del bundle
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# i18n per componente vs i18n centralizzato

L'approccio per-componente non è un concetto nuovo. Ad esempio, nell'ecosistema Vue, `vue-i18n` supporta l'[i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt offre anche [traduzioni per-componente](https://i18n.nuxtjs.org/docs/guide/per-component-translations), e Angular utilizza un pattern simile attraverso i suoi [Feature Modules](https://v17.angular.io/guide/feature-modules).

Anche in un'app Flutter spesso troviamo questo schema:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Le traduzioni risiedono qui
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Tuttavia, nel mondo React vediamo principalmente approcci differenti, che raggrupperò in tre categorie:

<Columns>
  <Column>

**Approccio centralizzato** (i18next, next-intl, react-intl, lingui)

- (senza namespaces) considera un'unica sorgente per recuperare i contenuti. Per impostazione predefinita, carichi i contenuti di tutte le pagine quando la tua app si avvia.

  </Column>
  <Column>

**Approccio granulare** (intlayer, inlang)

- dettagliare il recupero dei contenuti per chiave o per componente.

  </Column>
</Columns>

> In questo blog non mi concentrerò sulle soluzioni compiler-based, che ho già trattato qui: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md).
> Nota che l'i18n compiler-based (ad es., Lingui) automatizza semplicemente l'estrazione e il caricamento dei contenuti. Sotto il cofano, spesso condividono le stesse limitazioni di altri approcci.

> Nota che più granularizzi il modo in cui recuperi i tuoi contenuti, maggiore è il rischio di inserire stato e logica aggiuntiva nei tuoi componenti.

Gli approcci granulari sono più flessibili di quelli centralizzati, ma spesso è un compromesso. Anche se quelle librerie pubblicizzano il "tree shaking", nella pratica finirai spesso per caricare una pagina in tutte le lingue.

Quindi, in termini generali, la decisione si riduce a:

- Se la tua applicazione ha più pagine che lingue, dovresti favorire un approccio granulare.
- Se hai più lingue che pagine, dovresti orientarti verso un approccio centralizzato.

Naturalmente, gli autori delle librerie sono consapevoli di queste limitazioni e forniscono delle soluzioni. Tra queste: suddividere in namespace, caricare dinamicamente file JSON (`await import()`), o eliminare i contenuti in fase di build.

Allo stesso tempo, dovresti sapere che quando carichi dinamicamente i tuoi contenuti, introduci richieste aggiuntive al tuo server. Ogni ulteriore `useState` o hook comporta una richiesta aggiuntiva al server.

> Per risolvere questo punto, Intlayer suggerisce di raggruppare più definizioni di contenuto sotto la stessa chiave; Intlayer poi effettuerà il merge di quei contenuti.

Ma da tutte queste soluzioni risulta chiaro che l'approccio più popolare è quello centralizzato.

### Perché dunque l'approccio centralizzato è così popolare?

- In primo luogo, i18next è stata la prima soluzione ad essere ampiamente adottata, seguendo una filosofia ispirata alle architetture PHP e Java (MVC), che si basano su una rigorosa separazione delle responsabilità (mantenere il contenuto separato dal codice). È arrivata nel 2011, stabilendo i suoi standard prima della grande transizione verso le architetture basate su componenti (come React).
- Inoltre, una volta che una libreria viene ampiamente adottata, diventa difficile spostare l'intero ecosistema verso altri pattern.
- L'utilizzo di un approccio centralizzato rende anche le cose più semplici in sistemi di gestione delle traduzioni (Translation Management Systems) come Crowdin, Phrase o Localized.
- La logica alla base di un approccio per componente è più complessa rispetto a quella centralizzata e richiede più tempo di sviluppo, soprattutto quando bisogna risolvere problemi come identificare dove si trova il contenuto.

### Ok, ma perché non limitarsi semplicemente a un approccio centralizzato?

Lasciami spiegare perché può essere problematico per la tua app:

- **Dati non utilizzati:**
  Quando una pagina si carica, spesso carichi anche i contenuti di tutte le altre pagine. (In un'app di 10 pagine, significa il 90% di contenuti caricati e non usati). Carichi in lazy un modal? La libreria i18n non se ne cura, carica comunque prima le stringhe.
- **Prestazioni:**
  A ogni re-render, ciascuno dei tuoi componenti viene idratato con un enorme payload JSON, il che impatta la reattività dell'app man mano che cresce.
- **Manutenzione:**
  Gestire grandi file JSON è doloroso. Devi saltare tra file diversi per inserire una traduzione, assicurandoti che non manchino traduzioni e che non rimangano **orphan keys**.
- **Design system:**
  Ciò crea incompatibilità con i design system (ad es., un componente `LoginForm`) e vincola la duplicazione dei componenti tra diverse app.

**"Ma abbiamo inventato i Namespaces!"**

Certo, ed è un enorme passo avanti. Diamo un'occhiata al confronto delle dimensioni del bundle principale di una configurazione Vite + React + React Router v7 + Intlayer. Abbiamo simulato un'applicazione di 20 pagine.

Il primo esempio non include traduzioni lazy-loaded per locale né splitting dei namespace. Il secondo include content purging + caricamento dinamico delle traduzioni.

| Bundle ottimizzato                                                                                                          | Bundle non ottimizzato                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ![bundle non ottimizzato](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![bundle ottimizzato](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Quindi, grazie ai namespaces, siamo passati da questa struttura:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

To this one:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Ora devi gestire con precisione quale parte del contenuto della tua app debba essere caricata e dove. In conclusione, la stragrande maggioranza dei progetti salta semplicemente questa fase a causa della complessità (vedi ad esempio la guida [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-i18next.md) per vedere le sfide che comporta (anche solo) seguire le buone pratiche).
Di conseguenza, questi progetti finiscono col trovarsi di fronte al problema del caricamento massiccio dei JSON spiegato in precedenza.

> Nota che questo problema non è specifico di i18next, ma riguarda tutti gli approcci centralizzati elencati sopra.

Tuttavia, voglio ricordarti che non tutti gli approcci granulari risolvono questo problema. Ad esempio, gli approcci basati su `vue-i18n SFC` o su `inlang` non effettuano intrinsecamente il lazy loading delle traduzioni per locale, quindi si finisce semplicemente per scambiare il problema delle dimensioni del bundle con un altro.

Inoltre, senza una corretta separazione delle responsabilità, diventa molto più difficile estrarre e fornire le traduzioni ai traduttori per la revisione.

### Come l'approccio per componente di Intlayer risolve questo

Intlayer procede in diversi passaggi:

1. **Dichiarazione:** Dichiara i tuoi contenuti ovunque nella tua codebase usando file `*.content.{ts|jsx|cjs|json|json5|...}`. Questo garantisce la separazione delle responsabilità mantenendo i contenuti collocati insieme. Un file di contenuto può essere per-locale o multilingue.
2. **Elaborazione:** Intlayer esegue uno step di build per elaborare la logica JS, gestire i fallback per traduzioni mancanti, generare i tipi TypeScript, gestire contenuti duplicati, recuperare contenuti dal tuo CMS e altro.
3. **Pulizia:** Quando la tua app viene buildata, Intlayer elimina i contenuti non utilizzati (un po' come Tailwind gestisce le tue classi) sostituendo il contenuto come segue:

**Dichiarazione:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    it: { title: "Il mio titolo" },
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Elaborazione:** Intlayer costruisce il dizionario basato sul file `.content` e genera:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Sostituzione:** Intlayer trasforma il tuo componente durante la fase di build dell'applicazione.

**- Modalità di importazione statica:**

```tsx
// Rappresentazione del componente in sintassi simile a JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Modalità di importazione dinamica:**

```tsx
// Rappresentazione del componente in sintassi simile a JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Lo stesso per altre lingue
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` utilizza un meccanismo simile a Suspense per caricare il JSON localizzato solo quando necessario.

**Vantaggi principali di questo approccio per componente:**

- Mantenere la dichiarazione del contenuto vicino ai componenti consente una migliore manutenibilità (es. spostare un componente in un'altra app o in un design system. Eliminando la cartella del componente si rimuovono anche i contenuti correlati, come probabilmente già fai per i file `.test`, `.stories`)

- Un approccio per componente evita che gli agenti AI debbano saltare tra tutti i tuoi file. Tratta tutte le traduzioni in un unico posto, limitando la complessità del compito e la quantità di token utilizzati.

### Limitazioni

Naturalmente, questo approccio comporta dei compromessi:

- È più difficile connettersi ad altri sistemi di l10n e a tooling aggiuntivo.
- Sei vincolato (cosa che è praticamente già il caso con qualsiasi soluzione i18n a causa della loro sintassi specifica).

Per questo motivo Intlayer cerca di fornire un set completo di strumenti per l'i18n (100% gratuito e OSS), inclusa la traduzione AI usando il tuo AI Provider e le tue API keys. Intlayer fornisce anche tooling per sincronizzare i tuoi JSON, funzionando come formatter di messaggi tipo ICU / vue-i18n / i18next per mappare il contenuto nei loro formati specifici.
