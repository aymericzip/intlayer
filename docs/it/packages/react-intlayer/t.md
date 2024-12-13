# Documentazione: Funzione `t` in `react-intlayer`

La funzione `t` nel pacchetto `react-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione React. Ti consente di definire traduzioni direttamente all'interno dei tuoi componenti, semplificando la visualizzazione di contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse lingue direttamente nei tuoi componenti. Passando un oggetto contenente traduzioni per ciascuna lingua supportata, `t` restituisce la traduzione appropriata in base al contesto della lingua corrente nella tua applicazione React.

---

## Caratteristiche Principali

- **Traduzioni Inline**: Ideale per testi rapidi inline che non richiedono una dichiarazione di contenuto separata.
- **Selezione Automatica della Lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto per TypeScript**: Fornisce sicurezza dei tipi e completamento automatico quando utilizzato con TypeScript.
- **Facile Integrazione**: Funziona senza problemi all'interno dei componenti React.

---

## Firma della Funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `translations`: Un oggetto dove le chiavi sono i codici lingua (es. `en`, `fr`, `es`) e i valori sono le corrispondenti stringhe tradotte.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di Utilizzo

### Utilizzo di Base di `t` in un Componente

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per traduzioni inline negli attributi JSX. Quando localizzi attributi come `alt`, `title`, `href`, o `aria-label`, puoi usare `t` direttamente all'interno dell'attributo.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Argomenti Avanzati

### Integrazione con TypeScript

La funzione `t` è sicura per i tipi quando utilizzata con TypeScript, garantendo che tutte le lingue richieste siano fornite.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Rilevamento della Lingua e Contesto

In `react-intlayer`, la lingua corrente è gestita attraverso l'`IntlayerProvider`. Assicurati che questo provider avvolga i tuoi componenti e che la prop `locale` sia passata correttamente.

#### Esempio:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* I tuoi componenti qui */}
  </IntlayerProvider>
);
```

---

## Errori Comuni e Risoluzione dei Problemi

### `t` Restituisce Undefined o Traduzione Errata

- **Causa**: La lingua corrente non è impostata correttamente o la traduzione per la lingua corrente è mancante.
- **Soluzione**:
  - Verifica che l'`IntlayerProvider` sia impostato correttamente con la `locale` appropriata.
  - Assicurati che il tuo oggetto traduzioni includa tutte le lingue necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto traduzioni non soddisfa le lingue richieste, causando errori in TypeScript.
- **Soluzione**: Usa il tipo `IConfigLocales` per imporre la completezza delle tue traduzioni.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore di TypeScript
};

const text = t(translations);
```

---

## Suggerimenti per un Utilizzo Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccoli pezzi di testo direttamente all'interno dei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni e riutilizzo di contenuti più complessi, definisci contenuti in file di dichiarazione e usa `useIntlayer`.
3. **Fornitura Consistente della Lingua**: Assicurati che la tua lingua sia fornita costantemente attraverso la tua applicazione tramite l'`IntlayerProvider`.
4. **Sfrutta TypeScript**: Usa i tipi TypeScript per catturare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `react-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni React. Integrandola in modo efficace, puoi migliorare le capacità di internazionalizzazione della tua app, fornendo un'esperienza migliore per gli utenti in tutto il mondo.

Per ulteriori dettagli sull'uso e sulle funzionalità avanzate, consulta la [documentazione di react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerProvider` per assicurarti che la lingua corrente venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
