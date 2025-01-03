# next-i18next VS next-intl VS Intlayer | Next.js Internazionalizzazione (i18n)

Di seguito è riportato un confronto conciso di **tre librerie popolari** per internazionalizzare (i18n) un'applicazione Next.js: **next-intl**, **next-i18next** e **Intlayer**.

Questo documento evidenzia criteri chiave:

1. **Architettura** (mantenere le traduzioni vicine ai loro componenti)
2. **Supporto TypeScript**
3. **Gestione delle traduzioni mancanti**
4. **Supporto per i Componenti del Server**
5. **Routing e middleware avanzati** per Next.js
6. **Semplicità di configurazione**

La guida fornisce anche uno **sguardo approfondito su Intlayer**, mostrando perché può essere una scelta forte—specialmente per Next.js 13+, inclusi **App Router** e **Server Components**.

---

## Panoramica di Ogni Libreria

### 1. next-intl

**Focus principale**: Configurazione rapida e semplice con un approccio leggero alla localizzazione.

- **Architettura**: Incoraggia a posizionare le traduzioni in una singola cartella (ad es., `locales/`), ma consente anche strategie multiple. Non impone strettamente un’architettura “traduzione per componente”.
- **Supporto TypeScript**: Integrazione di base con TypeScript. Esistono alcune definizioni di tipo, ma non sono incentrate sull'auto-generazione di definizioni TypeScript dai file di traduzione.
- **Traduzioni mancanti**: Meccanismo di fallback di base. Per impostazione predefinita, torna a una chiave o a una stringa di locale predefinita. Nessun strumento robusto out-of-the-box per controlli avanzati delle traduzioni mancanti.
- **Supporto per i Componenti del Server**: Funziona con Next.js 13+ in generale, ma il pattern è meno specializzato per un uso profondo lato server (ad es., componenti del server con routing dinamico complesso).
- **Routing e Middleware**: Il supporto middleware è possibile ma limitato. Si basa tipicamente su Next.js `Middleware` per la rilevazione della lingua, o configurazioni manuali per riscrivere i percorsi delle lingue.
- **Semplicità di Configurazione**: Molto semplice. Sono necessarie poche boilerplate.

**Usa quando**: Vuoi un approccio più semplice o sei a tuo agio nel gestire le tue traduzioni in modi più convenzionali (come una cartella con file JSON per locale).

---

### 2. next-i18next

**Focus principale**: Soluzione collaudata che utilizza `i18next` sotto il cofano, ampiamente adottata per progetti Next.js.

- **Architettura**: Organizza spesso le traduzioni nella cartella `public/locales`. Non è specificamente progettato per mantenere le traduzioni “vicine” a ciascun componente, anche se puoi adottare manualmente una struttura diversa.
- **Supporto TypeScript**: Copertura ragionevole di TypeScript, ma richiede configurazione personalizzata per traduzioni tipizzate e hooks tipizzati.
- **Traduzioni mancanti**: i18next offre interpolazione/fallback. Tuttavia, la rilevazione delle traduzioni mancanti richiede generalmente configurazioni extra o plugin di terze parti.
- **Supporto per i Componenti del Server**: L'uso di base con Next.js 13 è documentato, ma l'uso avanzato (ad es., integrazione profonda con componenti del server, generazione dinamica di percorsi) può essere ingombrante.
- **Routing e Middleware**: Si basa pesantemente su Next.js `Middleware` e riscritture per i sottopercorsi locali. Per configurazioni più complesse, potresti dover approfondire nella configurazione avanzata di i18next.
- **Semplicità di Configurazione**: Approccio familiare per chi è abituato a i18next. Tuttavia, può diventare più pesante in termini di boilerplate quando sono necessarie funzionalità i18n avanzate (namespace, più lingue di fallback, ecc.).

**Usa quando**: Sei già impegnato nell'ecosistema `i18next` o hai traduzioni esistenti basate su i18next.

---

### 3. Intlayer

**Focus principale**: Una libreria i18n moderna e open-source specificamente progettata per Next.js **App Router** (12, 13, 14 e 15) con supporto integrato per **Server Components** e **Turbopack**.

#### Vantaggi Chiave

1. **Architettura**

   - Incoraggia a posizionare **le traduzioni direttamente accanto ai loro componenti**. Ogni pagina o componente può avere il proprio file `.content.ts` (o JSON)—niente più ricerche in una gigantesca cartella di traduzioni.
   - Questo rende il tuo codice più **modulare e manutenibile**, specialmente in grandi basi di codice.

2. **Supporto TypeScript**

   - **Definizioni di tipo auto-generate**: Nel momento in cui definisci il tuo contenuto, Intlayer genera tipi che alimentano l'autocompletamento e catturano errori di traduzione.
   - Minimizza gli errori di runtime come chiavi mancanti e offre avanzate **autocompletamenti** direttamente nel tuo IDE.

3. **Gestione delle Traduzioni Mancanti**

   - Durante la build, Intlayer può **rilevare chiavi di traduzione mancanti** e lanciare avvisi o errori.
   - Questo garantisce che non spedisci mai accidentalmente con testi mancanti nelle tue lingue.

4. **Ottimizzato per i Componenti del Server**

   - Completamente compatibile con il **App Router** di Next.js e il nuovo paradigma dei **Server Components**.
   - Fornisce provider specializzati (`IntlayerServerProvider`, `IntlayerClientProvider`) per **isolare il contesto del server** (vitale quando si tratta di Next.js 13+).

5. **Routing e Middleware Avanzati**

   - Include un dedicato [**`intlayerMiddleware`**](#) per **rilevazione automatica delle lingue** (via cookie o intestazioni del browser) e generazione avanzata di percorsi.
   - Gestisce dinamicamente i percorsi localizzati (ad es., `/en-US/about` vs. `/fr/about`) con configurazione minima.
   - Offre metodi helper come `getMultilingualUrls` per generare collegamenti a lingue alternative (ottimo per **SEO**).

6. **Configurazione Semplificata**
   - Un singolo file di configurazione (`intlayer.config.ts`) per definire la tua localizzazione, la lingua predefinita e le preferenze di integrazione.
   - Un plugin wrapper `withIntlayer(nextConfig)` che **inietta** tutte le variabili d'ambiente e watchers per il tuo contenuto.
   - **Nessuna grande configurazione di fallback**—il sistema è progettato per “funzionare semplicemente” con frizione minima.

> **Conclusione**: Intlayer è una soluzione moderna che vuole **promuovere le migliori pratiche**: da **mantenere le traduzioni vicine** a ciascun componente React, all'offrire un **robusto supporto TS** e un facile utilizzo lato server, mentre **riduce drasticamente la boilerplate**.

---

## Confronto delle Caratteristiche a Vista

| **Caratteristica**                   | **next-intl**                            | **next-i18next**                               | **Intlayer**                                   |
| ------------------------------------- | ---------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **Mantenere le traduzioni vicino ai componenti** | Parziale – tipicamente una cartella di lingue | Non predefinito – spesso `public/locales`     | **Sì – raccomandato & facile**                |
| **TypeScript Autogenerato**          | Definizioni di base TS                   | Supporto TS di base                            | **Sì – avanzato out-of-the-box**              |
| **Rilevazione delle traduzioni mancanti** | Per lo più stringhe di fallback           | Per lo più stringhe di fallback                | **Sì – controlli in fase di build**           |
| **Supporto per i Componenti del Server** | Funziona ma non specializzato             | Supportato ma può essere verboso               | **Full support con provider specializzati**    |
| **Routing e Middleware**              | Integrato manualmente con il middleware di Next | Fornito tramite configurazione di riscrittura | **Middleware i18n dedicato + hook avanzati**  |
| **Complesso di Configurazione**       | Semplice, configurazione minima           | Tradizionale, può essere verbosa per usi avanzati | **Un file di configurazione & plugin**        |

---

## Perché Intlayer?

Per i team che migrano verso o costruiscono su **Next.js App Router** (versioni 13, 14 o 15) con **Server Components**, Intlayer fornisce:

1. **Un'Architettura Snella**

   - Ogni percorso o componente contiene le proprie traduzioni. Questo favorisce chiarezza e manutenibilità.

2. **Integrazione Potente con TypeScript**

   - Ottieni sicurezza a livello di compilatore, evitando chiavi di traduzione “piene di errori di battitura” o mancanti.

3. **Avvisi Reali per Traduzioni Mancanti**

   - Se dimentichi una chiave o una traduzione linguistica, sarai avvisato in fase di build (anziché spedire un'interfaccia utente incompleta).

4. **Routing Avanzato Integrato**

   - Rilevazione automatica delle lingue, generazione dinamica dei percorsi e facile gestione degli URL localizzati sono inclusi.
   - Un `intlayerMiddleware` standard non richiede riscritture personalizzate profonde.

5. **Configurazione Unica**

   - Boilerplate minima: definisci semplicemente il tuo `intlayer.config.ts`, avvolgi `next.config` con `withIntlayer` e aggiungi il middleware ufficiale.
   - Utilizzo chiaro e diretto per componenti **server** e **client** tramite `IntlayerServerProvider` e `IntlayerClientProvider`.

6. **SEO-Friendly**
   - Helpers integrati (`getMultilingualUrls`, attributi `hrefLang`, ecc.) rendono facile produrre pagine e sitemap conformi alle norme SEO.

---

## Esempio: Intlayer in Azione

Di seguito è un _very_ condensa snippet che illustra come sfruttare Intlayer in un progetto Next.js 15. Per i dettagli completi e i codici di esempio, [controlla la guida completa di Intlayer](#).

<details>
<summary>Esempio passo-passo</summary>

1. **Installa e Configura**

   ```bash
   npm install intlayer next-intlayer
   ```

   ```ts
   // intlayer.config.ts
   import { Locales, type IntlayerConfig } from "intlayer";

   const config: IntlayerConfig = {
     internationalization: {
       locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
       defaultLocale: Locales.ENGLISH,
     },
   };
   export default config;
   ```

2. **Usa il Plugin**

   ```ts
   // next.config.mjs
   import { withIntlayer } from "next-intlayer/server";

   /** @type {import('next').NextConfig} */
   const nextConfig = {};

   export default withIntlayer(nextConfig);
   ```

3. **Aggiungi Middleware**

   ```ts
   // src/middleware.ts
   export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

   export const config = {
     matcher:
       "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
   };
   ```

4. **Crea un Layout Localizzato**

   ```tsx
   // src/app/[locale]/layout.tsx
   import { getHTMLTextDir } from "intlayer";
   import { NextLayoutIntlayer } from "next-intlayer";

   const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
     const { locale } = params;
     return (
       <html lang={locale} dir={getHTMLTextDir(locale)}>
         <body>{children}</body>
       </html>
     );
   };

   export { generateStaticParams } from "next-intlayer";
   export default LocaleLayout;
   ```

5. **Dichiarare e Usare il Contenuto**

   ```tsx
   // src/app/[locale]/page.content.ts
   import { t } from "intlayer";

   export default {
     key: "page",
     content: {
       getStarted: {
         main: t({
           en: "Get started by editing",
           fr: "Commencez par éditer",
           es: "Comience por editar",
         }),
         pageLink: "src/app/page.tsx",
       },
     },
   };
   ```

   ```tsx
   // src/app/[locale]/page.tsx
   import { IntlayerServerProvider } from "next-intlayer/server";
   import { IntlayerClientProvider, useIntlayer } from "next-intlayer";

   const PageContent = () => {
     const { content } = useIntlayer("page");
     return (
       <>
         <p>{content.getStarted.main}</p>
         <code>{content.getStarted.pageLink}</code>
       </>
     );
   };

   export default function Page({ params }) {
     return (
       <IntlayerServerProvider locale={params.locale}>
         <IntlayerClientProvider locale={params.locale}>
           <PageContent />
         </IntlayerClientProvider>
       </IntlayerServerProvider>
     );
   }
   ```

   </details>

---

## Conclusione

Ogni soluzione—**next-intl**, **next-i18next** e **Intlayer**—si è dimostrata efficace per progetti multilingue Next.js. Tuttavia, **Intlayer** va oltre:

- **Incoraggiando fortemente un'architettura di traduzione a livello di componente**
- Integrandosi senza soluzione di continuità con **Next.js 13+ e Server Components**
- Offrendo un **auto-generazione potente di TypeScript** per un codice più sicuro
- Gestendo le **traduzioni mancanti** in fase di build
- Fornendo un **approccio di configurazione semplificato** con routing e middleware avanzati

Se desideri funzionalità i18n **moderne** personalizzate per Next.js App Router e stai cercando un'esperienza **completamente tipizzata** senza dover configurare manualmente la logica di fallback, riscritture di percorso o complessi passaggi di build, **Intlayer** è una scelta convincente. Non solo accorcia i tempi di configurazione, ma garantisce anche un approccio più manutenibile e scalabile alle traduzioni per il tuo team.