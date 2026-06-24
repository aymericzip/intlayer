---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z i18next do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji JavaScript/TypeScript z i18next do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/i18next do przejścia bez przerw."
keywords:
  - i18next
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z i18next do Intlayer

## Dlaczego migrować z i18next do Intlayer?

<AccordionGroup>

<Accordion header="Rozmiar bundle">

Zamiast ładować ogromne pliki JSON do stron, ładuj tylko niezbędną zawartość. Intlayer pomaga **zmniejszyć bundle i rozmiary stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość utrzymania">

Ograniczanie zawartości aplikacji **ułatwia utrzymanie** dużych aplikacji. Możesz zduplikować lub usunąć jeden folder funkcji bez konieczności przeglądania całej bazy kodu zawartości. Ponadto Intlayer jest **w pełni wpisany** aby zapewnić dokładność zawartości.

Intlayer jest również rozwiązaniem z **najaktywniejszym rozwojem** w ekosystemie i18n — problemy są naprawiane szybko, nowe adaptery frameworku pojawiają się regularnie, a podstawowy API jest stale ulepsszany na podstawie opinii z produkcji.

</Accordion>

<Accordion header="Agent AI">

Umieszczanie zawartości razem **zmniejsza kontekst potrzebny** przez Duże Modele Języka (LLM). Intlayer zawiera również pakiet narzędzi, takich jak **CLI** do testowania brakujących tłumaczeń, **LSP**, **MCP** i **umiejętności agenta**, aby jeszcze bardziej gładka była doświadczenie dla programistów (DX) dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Użyj automatyzacji do tłumaczenia w pipeline CI/CD korzystając z wybranego LLM za koszt dostawcy AI. Intlayer oferuje również **kompilator** do automatycznego wyodrębniania zawartości, a także **platforma internetowa** aby pomóc **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie dużych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje ładowanie zawartości w czasie budowania.

</Accordion>

<Accordion header="Skalowanie wraz z non-dev">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia samodzielnie hostowany **edytor wizualny** i **pełny CMS** aby pomóc ci zarządzać multilingual zawartością w **rzeczywistym czasie**, czyniąc współpracę z tłumaczami, copywriterami i innymi członkami zespołu bezproblemową. Zawartość może być przechowywana lokalnie i/lub zdalnie.

</Accordion>

</AccordionGroup>

---

## Strategie migracji

Istnieją dwie komplementarne strategie migracji z `i18next` do Intlayer:

1. **Adapter compat (rekomendowany dla istniejących aplikacji)** — Zainstaluj `@intlayer/i18next`. Ten pakiet ujawnia **dokładnie ten sam API** co `i18next`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami. Zachowujesz istniejące `i18next.t()`, `i18next.changeLanguage()` i `createInstance()` — jedyną zmianą jest ścieżka importu i inicjalizacja.

2. **Pełna migracja** — Stopniowo zastępuj API `i18next` natywnymi narzędziami Intlayer i umieszczaj zawartość w plikach `.content.ts`.

Ten przewodnik obejmuje **Strategię 1** najpierw (adapter compat drop-in), a następnie przechodzi przez opcjonalną pełną migrację.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `i18next` na Intlayer bez zmian kodu.

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj pakiety rdzenia Intlayer i adapter compat:
