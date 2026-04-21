---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark delle librerie i18n
description: Scopri come Intlayer si confronta con altre librerie i18n in termini di prestazioni e dimensioni del bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inizializzazione benchmark"
---

# Benchmark Bloom — Rapporto

Benchmark Bloom è una suite di test prestazionali che misura l'impatto reale delle librerie i18n (internazionalizzazione) su più framework React e strategie di caricamento.

Di seguito i rapporti dettagliati e la documentazione tecnica per ogni framework:

- [**Rapporto Benchmark Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md)
- [**Rapporto Benchmark TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)

---

## Risultati Attuali

Consulta la [**dashboard interattiva del benchmark**](https://intlayer.org/benchmark) per confronti in tempo reale e dati sintetici.
| `scoped-dynamic` | Alta (leakage quasi nullo) | Alta |

Passare da `static` a `scoped-dynamic` riduce generalmente i contenuti inutilizzati del 60–90%, ma richiede una configurazione significativamente maggiore. Librerie come Intlayer automatizzano il pattern scoped-dynamic in modo che i sviluppatori ottengano l'efficienza senza i codici ripetitivi (boilerplate).

### Leggere i numeri di leakage

Un leakage di pagina del **35%** significa che il 35% del JavaScript scaricato per quella pagina contiene stringhe di altre pagine — contenuti che l'utente non può vedere su questa pagina. Su una pagina da 400 KB, si tratta di ~140 KB di dati evitabili.

Un leakage di localizzazione (locale leakage) del **10%** significa che il 10% del bundle contiene traduzioni in lingue che l'utente attuale non sta utilizzando.

### Reattività vs tempo di rendering

- **Reattività E2E**: misura l'esperienza utente completa: rete, sovraccarico del framework, aggiornamento DOM.
- **Tempo React Profiler**: isola il costo di re-rendering dell'albero React.

Una libreria può avere un tempo Profiler basso ma un tempo E2E alto se il cambio di lingua comporta una richiesta di rete (recupero del nuovo file di lingua). Al contrario, una libreria può avere un tempo Profiler alto ma risultare comunque veloce se raggruppa gli aggiornamenti in modo efficiente.
