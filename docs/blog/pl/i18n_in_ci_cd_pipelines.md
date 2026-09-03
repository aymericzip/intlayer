---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automatyzacja tłumaczeń w CI/CD bez publikowania złych tekstów"
description: Trzy miejsca na automatyzację i18n, pre-push, pull request i runtime. Jak blokować build na podstawie pokrycia, bezpiecznie uzupełniać braki i unikać nieskończonej pętli commitów w CI.
keywords:
  - automatyzacja tłumaczeń ci
  - i18n ci cd
  - github actions tłumaczenia
  - husky pre-push
  - ciągła lokalizacja
  - pipeline tłumaczeń
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automatyzacja tłumaczeń w CI/CD bez publikowania złych tekstów

Ręczne tłumaczenie nie wytrzymuje zderzenia z nowoczesnym cyklem wydawniczym. Ktoś dodaje ciąg znaków w piątek, eksport następuje w kolejnym sprincie, a do tego czasu trzy kolejne języki pozostają w tyle. Sama automatyzacja jest prosta. Jednak zautomatyzowanie procesu bez cichego publikowania maszynowych tekstów do klientów to kwestia, nad którą warto się zastanowić.

## Spis treści

<TOC/>

## Nie musisz migrować, aby zautomatyzować

Poniższe struktury pipeline'ów są niezależne od biblioteki, podobnie jak same narzędzia. Jeśli Twoje wiadomości to katalogi JSON dla i18next, next-intl, react-intl, vue-i18n lub next-translate, [wtyczka Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) odczytuje i zapisuje te pliki bezpośrednio w miejscu:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // lub "icu" dla next-intl / react-intl
    }),
  ],
};

export default config;
```

Twoja aplikacja nadal importuje to, co importowała dotychczas. Poniższe zadania CI uzupełniają i weryfikują istniejące katalogi, a diff widoczny dla recenzenta to zmiana w `locales/fr/checkout.json`, a nie duża migracja kodu. Dostępna jest również [wtyczka Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) dla przepływów gettext oraz [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md), jeśli zależy Ci na zachowaniu obecnego runtime API.

## Oddziel bramkę (gate) od uzupełniania (fill)

Dwa zupełnie różne zadania są nagminnie mylone.

**Bramka (gate)** to kontrola, która zgłasza błąd. Oznacza, że ta kompilacja nie może trafić na produkcję, ponieważ brakuje wymaganych tłumaczeń. Bramka niczego nie zapisuje.

**Uzupełnianie (fill)** to operacja modyfikacji. Generuje brakujące tłumaczenia i tworzy commit. Nigdy nie przerywa buildu z błędem.

Uruchamianie samego uzupełniania oznacza, że nic nigdy nie blokuje wdrożenia, a niesprawdzone tłumaczenia maszynowe trafiają do użytkowników. Uruchamianie samej bramki sprawia, że build staje się czerwony i człowiek musi za każdym razem ręcznie interweniować. Większość zespołów potrzebuje obu mechanizmów powiązanych z różnymi zdarzeniami: fill przy pull requeście, gate przy merge do gałęzi wydaniowej.

## Gdzie można umieścić automatyzację

| Etap          | Wyzwalacz   | Dobre do                                    | Koszt                                            |
| :------------ | :---------- | :------------------------------------------ | :----------------------------------------------- |
| Hook pre-push | Lokalny git | Szybka informacja zwrotna, zero minut w CI  | Działa na maszynie programisty i jego kluczu API |
| Pull request  | Zadanie CI  | Przegląd przed merge, bezpieczne sekrety    | Minuty w CI oraz wywołania modeli na każdy PR    |
| Gałąź wydania | Zadanie CI  | Twarda bramka pokrycia                      | Tanie, brak zapytań do modeli                    |
| Runtime       | CMS         | Zmiany treści bez przebudowywania aplikacji | Zależność od zewnętrznej usługi                  |

## Pre-push: najszybsza pętla

Husky uruchamia uzupełnianie, zanim kod opuści lokalną maszynę, dzięki czemu tłumaczenia trafiają do tego samego pusha co nowe ciągi znaków.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` ogranicza pracę do treści, które nie zostały jeszcze wypchnięte do repozytorium, co zapobiega minutowym opóźnieniom przy każdym pushu. `--mode complete` wypełnia tylko brakujące wpisy bez przepisywania tych, które już mają wartość, dzięki czemu zweryfikowane tłumaczenie nigdy nie zostanie po cichu zastąpione.

W przypadku monorepo zawęź zakres do poszczególnych aplikacji:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Minus jest oczywisty: każdy programista potrzebuje klucza API, a koszt spada na osobę wykonującą push. Dlatego w miarę rozwoju zespołu większość projektów przenosi ten etap do CI.

## Pull request: uzupełnianie w miejscu recenzji

Ta sama praca w GitHub Actions, zawężona do diffa:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Cztery szczegóły mają tu kluczowe znaczenie:

- **`fetch-depth: 0`** jest niezbędne do działania `--git-diff`. Płytki klon nie ma bazy do wyliczenia różnic i uzupełnianie niczego nie wykona.
- **`[skip ci]` w wiadomości commita** zapobiega zapętleniu workflow. Bez tego commit uruchamia nowy przebieg, który znów commituje, drenując limit CI w jedną noc.
- **`concurrency` z `cancel-in-progress`** zatrzymuje równoległe pushe przed jednoczesnym zapisem do tych samych plików.
- **`--git-diff`** ogranicza działanie do zmian w PR. Pominięcie tego spowoduje ponowne tłumaczenie całego katalogu przy każdym uruchomieniu.

Tłumaczenia pojawiają się jako commit w gałęzi PR, co oznacza, że recenzent widzi je w diffie. To główny powód, dla którego warto to robić tutaj, a nie po wykonaniu merge.

## Gałąź wydaniowa: bramka (gate)

Bramka nie potrzebuje dostępu do modeli i powinna działać błyskawicznie.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Wspierana testem sprawdzającym pokrycie zamiast polegania na samym raporcie CLI:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` drukuje raport, ale kończy się z kodem 0, więc informuje, ale nie blokuje. Używaj tego lokalnie, a w CI polegaj na asercjach w teście. Więcej szczegółów w [wykrywaniu brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md).

## `requiredLocales` czyni bramkę znośną w praktyce

Bramka wymagająca kompletności wszystkich osiemnastu języków blokuje każde wydanie do czasu przygotowania najwolniejszego tłumaczenia i zostaje wyłączona w ciągu miesiąca.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Zadeklaruj obsługiwane języki i wymagaj jako blokujące tylko te, które są krytyczne dla wydania. Reszta jest uzupełniana asynchronicznie i nie opóźnia wdrożeń.

## Całkowite wyniesienie tłumaczeń poza repozytorium

Alternatywnym podejściem jest zadeklarowanie jednego języka w kodzie i zarządzanie pozostałymi zdalnie za pośrednictwem CMS z Live Sync. Zmiany treści nie wymagają wtedy ponownej kompilacji, co oddziela tempo prac edytorskich od cyklu wdrożeń programistycznych.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Odpowiada to zespołom, w których treścią zajmują się osoby nietechniczne. Jest to kompromis: zyskujesz autonomię edytorską, ale tracisz pewność, że checkout gita w pełni opisuje stan renderowania aplikacji. Szczegóły w [dokumentacji CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

Pamiętaj, że `clientSecret` to poświadczenie serwerowe. Powinno znajdować się w sekretach CI i środowisku serwera, nigdy w kodzie klienta.

## Rzeczywiste ograniczenia

Wszystko powyżej automatyzuje _pokrycie_, a nie _jakość_. Maszynowe uzupełnienie zamienia widoczną lukę w lukę niewidoczną: audyt świeci na zielono, ponieważ klucz ma wartość, ale nikt jej nie przeczytał.

Jest to dopuszczalne w przypadku narzędzi wewnętrznych, changelogów czy języków w wersji beta. Nie jest to akceptowalne dla cenników, tekstów prawnych, komunikatów o błędach płatności ani niczego, co klient czyta przed podjęciem decyzji. Skieruj te teksty do człowieka i używaj `--mode complete`, aby zweryfikowane ciągi nie zostały nadpisane.

Dostarcz modelowi kontekst, aby jego wyniki były spójne:

```ts
ai: {
  applicationContext: "Aplikacja do fakturowania B2B. Styl formalny. Nigdy nie tłumacz nazwy produktu.",
}
```

## Częste błędy

- **Brak `[skip ci]` w automatycznym commicie.** Zadanie zapętla się bez końca.
- **Płytki klon z `--git-diff`.** Brak bazy do porównania skutkuje cichym brakiem działań.
- **Uzupełnianie całego katalogu przy każdym uruchomieniu.** Ograniczaj zakres za pomocą `--git-diff` lub `--unpushed`.
- **Używanie raportu CLI jako bramki.** Zwraca kod 0 i nie przerywa buildu.
- **Wymaganie każdego języka.** Kontrola zostaje wyłączona przy pierwszym zablokowanym wydaniu.
- **Zadanie uzupełniania bez żadnej bramki.** Nic nie zgłasza błędów, a niesprawdzone teksty trafiają na produkcję.
- **Klucze API modeli w repozytorium.** Powinny być w sekretach CI, podobnie jak `clientSecret`.

## Warto przeczytać

- [CI/CD: automatyczne generowanie tłumaczeń z Husky, GitHub Actions i CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md)
- [Testowanie treści i blokowanie buildu na podstawie pokrycia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md)
- [autoFill: generowanie plików deklaracji dla poszczególnych języków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md)
- [Dokumentacja konfiguracji: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Raporty porównawcze wydajności między frameworkami](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Adapter kompatybilności i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md)
- [Jak wykrywać brakujące tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md)
- [Jak testować tłumaczenia bez kruchych testów](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_testing_strategies.md)
