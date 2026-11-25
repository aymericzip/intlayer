---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Validare i dizionari con gli schemi (Zod)"
description: "Dichiara schemi Zod in intlayer.config.ts e collegali ai tuoi dizionari per validare ogni locale al build e tipizzare il contenuto nel tuo editor."
keywords:
  - Schema
  - Zod
  - Validazione
  - Dizionario
  - Dichiarazione dei contenuti
  - Type Safety
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Inizializzazione della doc"
author: aymericzip
---

# Validare i dizionari con gli schemi

Uno schema descrive la forma attesa del contenuto di un dizionario. Lo dichiari una sola volta in `intlayer.config.ts`, gli dai un nome, poi colleghi quel nome a qualsiasi dizionario tramite il campo `schema`.

Intlayer quindi:

- **Valida** il dizionario per ogni locale quando costruisce i dizionari, e segnala ogni errore con la sua locale e il percorso del campo.
- **Tipizza** il contenuto del dizionario nel tuo editor, così un campo mancante o con il tipo sbagliato viene individuato prima del build.

Gli schemi sono utili quando più dizionari devono condividere la stessa struttura (metadati SEO, schede prodotto, voci in stile CMS), o quando il contenuto deve rispettare vincoli che TypeScript non può esprimere, come una lunghezza massima per ogni traduzione.

<Steps>
<Step number={1} title="Dichiarare gli schemi nella configurazione">

Installa [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Poi dichiara i tuoi schemi sotto la chiave `schemas`. Ogni chiave è il nome che userai nei tuoi dizionari.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Collegare uno schema a un dizionario">

Imposta il campo `schema` di un dizionario su uno dei nomi dichiarati nella configurazione.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Lo stesso schema può essere collegato a tutti i dizionari che vuoi.

</Step>
<Step number={3} title="Eseguire il build e leggere il report">

La validazione viene eseguita ogni volta che Intlayer costruisce i dizionari: con `npx intlayer build`, o tramite il plugin del tuo bundler in modalità dev e build. Se una traduzione non rispetta lo schema, Intlayer mostra la locale, il percorso del campo e il messaggio di Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Un dizionario non valido viene escluso dal build finché il suo contenuto non viene corretto. Gli altri dizionari non sono interessati.

</Step>
</Steps>

## Tipizzare il contenuto a partire dallo schema

I parametri generici di `Dictionary` determinano quanto rigorosamente TypeScript controlla un dizionario:

| Dichiarazione                                           | Campo `schema`                                  | Campo `content`                       |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| `satisfies Dictionary`                                  | Autocompletato, un nome sconosciuto è un errore | Non controllato da TypeScript         |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Deve essere `"seo-metadata"`                    | Tipizzato dallo schema                |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Deve essere `"seo-metadata"`                    | Tipizzato dallo schema e dal tuo tipo |

Con uno schema tipizzato, ogni campo accetta un valore semplice o un nodo di contenuto che produce quel valore, quindi `t()` resta consentito:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer genera questi tipi dai tuoi schemi Zod in `.intlayer/types` ogni volta che costruisce i dizionari. Viene tipizzata solo la forma: i vincoli come `.min()`, `.max()` o `.regex()` vengono controllati al build.

## Cosa viene validato

Per ogni locale elencata in `internationalization.locales`, Intlayer risolve il contenuto del dizionario per quella locale, poi valida il risultato. Lo schema descrive quindi il valore finale di un campo (`title: string`), non il nodo `t()` che contiene le traduzioni.

- **Traduzioni mancanti**: con lo `strictMode` predefinito, una traduzione mancante ripiega sulla locale predefinita prima della validazione. Con `strictMode: "strict"`, una traduzione mancante fa fallire un campo obbligatorio.
- **Altri nodi di contenuto**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` e `insert()` vengono risolti in funzioni, e `md()` o `html()` in nodi. Dichiara questi campi con `z.any()` e mantieni i vincoli sui campi che si risolvono in valori semplici.
- **Non validato**: il contenuto fornito da una funzione o da una Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)), e i dizionari recuperati dal [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

## Usare un'altra libreria di validazione

Le voci di `schemas` non sono legate a Zod. Funziona qualsiasi oggetto che esponga un metodo `safeParse(data)` compatibile con Zod, purché restituisca `{ success: true }` o `{ success: false, error: { issues } }`, dove ogni issue ha un array `path` e un `message`. La tipizzazione del contenuto viene generata solo dagli schemi Zod: con un'altra libreria, il contenuto dei dizionari collegati è tipizzato come `any`.

## Domande frequenti

<FAQ>

<Question title="Un errore di schema blocca il mio build?">

No. Intlayer mostra ogni errore, esclude il dizionario non valido dal build e continua a costruire gli altri. In modalità dev, correggi il contenuto e salva: il watcher valida e ricostruisce il dizionario.

</Question>
<Question title="Più dizionari possono condividere lo stesso schema?">

Sì. Uno schema è referenziato per nome, quindi qualsiasi numero di dizionari può puntarvi. È il caso d'uso principale: imporre una stessa struttura a tutti i metadati di pagina, schede prodotto o template di email.

</Question>
<Question title="Cosa succede se il nome dello schema non esiste?">

TypeScript lo segnala non appena viene dichiarato almeno uno schema, perché il campo `schema` accetta solo i nomi dichiarati. In un file di contenuto JSON, un nome sconosciuto viene ignorato e il dizionario non viene validato.

</Question>
<Question title="Vengono validate tutte le locale o solo quella predefinita?">

Tutte le locale elencate in `internationalization.locales`. Il report indica la locale in errore, quindi è facile individuare una traduzione troppo lunga solo in tedesco.

</Question>

</FAQ>

## Approfondimenti

- [File di dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)
- [CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
