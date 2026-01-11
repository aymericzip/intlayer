---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` i Intlayer – fałszywy pozytyw: odmowa importu `node:fs`
description: Dlaczego vite-env-only zgłasza odmowę importu `node:fs` przy Intlayer + React-Router + Vite i co z tym zrobić.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only odrzuca `node:fs` w Intlayer

Jeśli używasz wtyczki **vite-env-only** (jak wspomniano w starszych sugestiach React-Router v7) i widzisz:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…mimo że **w twoim pakiecie klienckim nie ma `node:fs`**, jest to **fałszywy alarm**.

## Co to powoduje

`vite-env-only` wykonuje sprawdzenie oparte na Babel **wcześnie w fazie rozwiązywania grafu Vite**, _zanim_:

- aliasowanie (w tym mapowania Intlayer dla przeglądarki vs node),
- eliminacja martwego kodu,
- rozwiązywanie SSR vs klienta,
- moduły wirtualne, takie jak te z React-Routera.

Pakiety Intlayer zawierają kod, który może działać zarówno na Node, jak i w przeglądarce. Na etapie _pośrednim_ w grafie może pojawić się wbudowany moduł Node, taki jak `node:fs`, **zanim** Vite usunie go z kompilacji dla klienta. `vite-env-only` to wykrywa i natychmiast zgłasza błąd, mimo że finalny bundle go nie zawiera.

## React-Router i moduły serwerowe

W dokumentacji React-Router dotyczącej **konwencji modułów serwerowych**  
(https://reactrouter.com/api/framework-conventions/server-modules), zespół **wyraźnie sugeruje użycie `vite-env-only`**, aby zapobiec przedostawaniu się importów tylko dla serwera do bundle'a klienta.

Jednakże te konwencje opierają się na aliasingu Vite, conditional exports oraz tree-shaking, aby usunąć kod tylko dla serwera. Chociaż aliasing i conditional exports są już stosowane, niektóre narzędzia oparte na Node nadal występują w pakietach takich jak `@intlayer/core` na tym etapie (nawet jeśli nigdy nie są importowane po stronie klienta). Ponieważ tree-shaking jeszcze się nie uruchomił, te funkcje są nadal parsowane przez Babel, a `vite-env-only` wykrywa ich importy `node:` i zgłasza false positive — mimo że są poprawnie usuwane z ostatecznego bundle'a klienta.

## Jak naprawić / obejść

### Zalecane: Usuń `vite-env-only`

Po prostu usuń wtyczkę. W wielu przypadkach nie jest ona potrzebna — Vite sam obsługuje rozróżnienie importów dla klienta i serwera poprzez własne rozwiązywanie.

To naprawia fałszywy błąd dotyczący `node:fs` bez konieczności wprowadzania zmian w Intlayer.

### Zamiast tego zweryfikuj końcowy build

Jeśli nadal chcesz upewnić się, że żadne wbudowane moduły Node nie trafiają do klienta, sprawdź to **po buildzie**, np.:

```bash
pnpm build
grep -R "node:" dist/
```

Jeśli brak wyników, twoje client bundles są czyste.

## Podsumowanie

- `vite-env-only` może zgłaszać błąd dotyczący `node:fs`, ponieważ sprawdza zbyt wcześnie.
- Vite + Intlayer + konwencje modułów serwerowych React-Routera zwykle poprawnie usuwają odwołania przeznaczone wyłącznie dla serwera.
- Usunięcie wtyczki lub weryfikacja _końcowego wyniku_ zwykle jest najlepszym rozwiązaniem.
