# Documentazione: `t` Funzione in `next-intlayer`

La funzione `t` nel pacchetto `next-intlayer` è uno strumento fondamentale per l'internazionalizzazione inline all'interno della tua applicazione Next.js. Ti consente di definire traduzioni direttamente all'interno dei tuoi componenti, rendendo semplice visualizzare contenuti localizzati in base alla lingua corrente.

---

## Panoramica

La funzione `t` viene utilizzata per fornire traduzioni per diverse lingue direttamente nei tuoi componenti. Passando un oggetto contenente traduzioni per ciascuna lingua supportata, `t` restituisce la traduzione appropriata in base al contesto della lingua corrente nella tua applicazione Next.js.

---

## Caratteristiche Principali

- **Traduzioni Inline**: Ideale per testi brevi che non richiedono una dichiarazione separata dei contenuti.
- **Selezione Automatica della Lingua**: Restituisce automaticamente la traduzione corrispondente alla lingua corrente.
- **Supporto TypeScript**: Fornisce sicurezza sui tipi e completamento automatico quando utilizzato con TypeScript.
- **Integrazione Facile**: Funziona senza problemi sia all'interno dei componenti client che server in Next.js.

---

## Firma della Funzione

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametri

- `traduzioni`: Un oggetto dove le chiavi sono codici di lingua (ad es., `en`, `fr`, `es`) e i valori sono le stringhe tradotte corrispondenti.

### Restituisce

- Una stringa che rappresenta il contenuto tradotto per la lingua corrente.

---

## Esempi di Utilizzo

### Utilizzando `t` in un Componente Client

Assicurati di includere la direttiva `'use client';` nella parte superiore del tuo file componente quando utilizzi `t` in un componente lato client.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Utilizzando `t` in un Componente Server

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Traduzioni Inline negli Attributi

La funzione `t` è particolarmente utile per le traduzioni inline negli attributi JSX. Quando localizzi attributi come `alt`, `title`, `href` o `aria-label`, puoi utilizzare `t` direttamente all'interno dell'attributo.

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

### Integrazione TypeScript

La funzione `t` è sicura per i tipi quando viene utilizzata con TypeScript, garantendo che tutte le lingue richieste siano fornite.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const traduzioni: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const saluto = t(traduzioni);
```

### Rilevamento della Lingua e Contesto

In `next-intlayer`, la lingua corrente è gestita tramite i provider di contesto: `IntlayerClientProvider` e `IntlayerServerProvider`. Assicurati che questi provider avvolgano i tuoi componenti e che il prop `locale` venga passato correttamente.

#### Esempio:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Pagina = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* I tuoi componenti qui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Errori Comuni e Risoluzione dei Problemi

### `t` Restituisce Undefined o Traduzione Corretta

- **Causa**: La lingua corrente non è impostata correttamente o la traduzione per la lingua corrente è mancante.
- **Soluzione**:
  - Verifica che il `IntlayerClientProvider` o il `IntlayerServerProvider` siano impostati correttamente con il `locale` appropriato.
  - Assicurati che il tuo oggetto traduzioni includa tutte le lingue necessarie.

### Traduzioni Mancanti in TypeScript

- **Causa**: L'oggetto traduzioni non soddisfa le lingue richieste, portando a errori di TypeScript.
- **Soluzione**: Utilizza il tipo `IConfigLocales` per mantenere la completezza delle tue traduzioni.

```typescript
const traduzioni: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La mancanza di 'es' causerà un errore di TypeScript
};

const testo = t(traduzioni);
```

---

## Suggerimenti per un Utilizzo Efficace

1. **Usa `t` per Traduzioni Inline Semplici**: Ideale per tradurre piccole parti di testo direttamente nei tuoi componenti.
2. **Preferisci `useIntlayer` per Contenuti Strutturati**: Per traduzioni più complesse e riutilizzo dei contenuti, definisci i contenuti in file di dichiarazione e utilizza `useIntlayer`.
3. **Fornitura Consistente della Lingua**: Assicurati che la tua lingua sia fornita in modo coerente in tutta la tua applicazione tramite i provider appropriati.
4. **Sfrutta TypeScript**: Utilizza i tipi di TypeScript per catturare traduzioni mancanti e garantire la sicurezza dei tipi.

---

## Conclusione

La funzione `t` in `next-intlayer` è uno strumento potente e conveniente per gestire traduzioni inline nelle tue applicazioni Next.js. Integrandola in modo efficace, migliori le capacità di internazionalizzazione della tua app, offrendo una migliore esperienza per gli utenti di tutto il mondo.

Per ulteriori dettagli sull'uso e sulle funzionalità avanzate, consulta la [documentazione di next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**Nota**: Ricorda di configurare correttamente il tuo `IntlayerClientProvider` e `IntlayerServerProvider` per assicurarti che la lingua corrente venga passata correttamente ai tuoi componenti. Questo è cruciale affinché la funzione `t` restituisca le traduzioni corrette.
