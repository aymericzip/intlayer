---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migracja z next-intl do Intlayer | Internacjonalizacja (i18n)"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-intl do Intlayer krok po kroku, bez łamania istniejącego kodu. Użyj adaptera compat @intlayer/next-intl do przejścia bez przerw."
keywords:
  - next-intl
  - intlayer
  - migracja
  - internacjonalizacja
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migracja z next-intl do Intlayer

## Dlaczego migrować z next-intl do Intlayer?

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

## Strategia migracji

Rekomendowane podejście dla istniejących aplikacji to **adapter compat**: zainstaluj `@intlayer/next-intl`, który ujawnia **dokładnie ten sam API** co `next-intl`, ale deleguje całą pracę tłumaczenia do Intlayer za kulisami.

Zachowujesz istniejące `useTranslations`, `getTranslations`, `NextIntlClientProvider` i przyjaciół — **jedyną zmianą jest ścieżka importu**. Nie jest wymagane żadne refaktorowanie sygnatur Call, kształtów prop lub struktury komponentu.

Z biegiem czasu możesz opcjonalnie migrować poszczególne pliki do bogatszego formatu `.content.ts` Intlayer aby odblokować edytor wizualny, CMS i ograniczanie zawartości per-komponent — ale ten krok jest całkowicie opcjonalny i może być wykonywany przyrostowo.

---

## Spis treści

<TOC/>

---

## Szybka migracja

Następujące kroki są minimalne wymagane aby uruchomić istniejącą aplikację `next-intl` na Intlayer bez zmian kodu.

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj pakiety rdzenia Intlayer i adapter compat `@intlayer/next-intl`:
