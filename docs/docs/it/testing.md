---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Testare i tuoi contenuti
description: Scopri come testare i tuoi contenuti con Intlayer.
keywords:
  - Test
  - Intlayer
  - Internazionalizzazione
  - CMS
  - Sistema di Gestione dei Contenuti
  - Editor Visivo
slugs:
  - doc
  - testing
---

# Testare i tuoi contenuti

Questa guida mostra come verificare automaticamente che i tuoi dizionari siano completi, individuare traduzioni mancanti prima della distribuzione e testare l'interfaccia localizzata nella tua app.

---

## Cosa puoi testare

- **Traduzioni mancanti**: fallire il CI se mancano locali richiesti in qualsiasi dizionario.
- **Rendering dell'interfaccia localizzata**: renderizzare componenti con un provider di locale specifico e verificare il testo/attributi visibili.
- **Audit a tempo di build**: eseguire un rapido audit localmente tramite CLI.

---

## Avvio rapido: audit tramite CLI

Esegui l'audit dalla radice del tuo progetto:

```bash
npx intlayer content test
```

Flag utili:

- `--env-file [path]`: carica variabili d'ambiente da un file.
- `-e, --env [name]`: seleziona un profilo ambiente.
- `--base-dir [path]`: imposta la directory base dell'app per la risoluzione.
- `--verbose`: mostra log dettagliati.
- `--prefix [label]`: aggiunge un prefisso alle righe di log.

Nota: la CLI stampa un report dettagliato ma non termina con codice diverso da zero in caso di errori. Per il gating in CI, aggiungi un test unitario (di seguito) che verifichi l'assenza di locali richiesti mancanti.

---

## Test programmatico (Vitest/Jest)

Usa l'API CLI di Intlayer per verificare che non ci siano traduzioni mancanti per i locali richiesti.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("traduzioni", () => {
  it("non ha locali richiesti mancanti", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Utile quando il test fallisce localmente o in CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Equivalente Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("non ha locali richiesti mancanti", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Come funziona:

- Intlayer legge la tua configurazione (locali, requiredLocales) e i dizionari dichiarati, quindi riporta:
  - `missingTranslations`: per chiave, quali locali mancano e da quale file.
  - `missingLocales`: unione di tutti i locali mancanti.
  - `missingRequiredLocales`: sottoinsieme limitato a `requiredLocales` (o tutti i locali se `requiredLocales` non è impostato).

---

## Testare l'interfaccia localizzata (React / Next.js)

Renderizza i componenti sotto un provider Intlayer e verifica il contenuto visibile.

Esempio React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Titolo inglese previsto")).toBeInTheDocument();
});
```

Esempio Next.js (App Router): usa il wrapper del framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renderizza l'intestazione localizzata in francese", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Consigli:

- Quando hai bisogno dei valori stringa grezzi per gli attributi (es. `aria-label`), accedi al campo `.value` restituito da `useIntlayer` in React.
- Mantieni i dizionari accanto ai componenti per facilitare i test unitari e la pulizia.

---

## Integrazione Continua

Aggiungi un test che fallisca la build quando mancano traduzioni obbligatorie.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Esempio GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Opzionale: esegui l'audit CLI per un riepilogo leggibile dall'uomo insieme ai test:

```bash
npx intlayer content test --verbose
```

---

## Risoluzione dei problemi

- Assicurati che la tua configurazione Intlayer definisca `locales` e (opzionalmente) `requiredLocales`.
- Se la tua app utilizza dizionari dinamici o remoti, esegui i test in un ambiente dove i dizionari sono disponibili.
- Per monorepo misti, usa `--base-dir` per indicare al CLI la radice corretta dell'applicazione.

---

## Cronologia del Documento

| Versione | Data       | Modifiche             |
| -------- | ---------- | --------------------- |
| 6.0.0    | 2025-09-20 | Introduzione dei test |
