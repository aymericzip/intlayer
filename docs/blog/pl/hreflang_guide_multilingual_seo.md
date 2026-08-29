---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, przewodnik po wielojęzycznym SEO"
description: "Co to jest hreflang, zasady wymuszane przez wyszukiwarki, dlaczego x-default jest prawie zawsze błędy, i jak generować poprawne znaczniki w Next.js i TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: przewodnik po wielojęzycznym SEO

Przetłumaczyłeś swoją aplikację. Wdrożyłeś `/en`, `/fr`, `/es`. A użytkownicy francuscy wciąż lądują na angielskiej stronie.

Tłumaczenie to łatwa połowa. Trudna połowa to poinformowanie wyszukiwarek, że te strony to **ta sama strona w innym języku**, a nie trzy dokumenty konkurujące ze sobą. To jest to, co robi `hreflang`, i to jest gdzie większość wielojęzycznych stron po cichu traci swój ruch.

---

## Co naprawdę robi hreflang

Adnotacja na stronie mówiąca: _ten URL ma równoważne wersje tam, dla tych języków._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Daje ci dwie rzeczy: wyświetlenie prawidłowej wersji właściwemu użytkownikowi oraz konsolidację twoich lokalizacji w jeden klaster zamiast kanibalizowania się nawzajem jako duplikaty.

Warto wyjaśnić, czym to nie jest. To **nie jest przekierowanie** — to wskazówka, którą Google może zastąpić. To **nie jest wzmocnienie rankingu** — zmienia _którą_ wersję rankingu, a nie _czy_ się plasują. A Bing w ogóle to ignoruje, polegając zamiast tego na `content-language` i geo-targetowaniu.

---

## Gdzie to zadeklarować

Trzy umiejscowienia, wszystkie prawidłowe. Wybierz jedno i pozostań tam — ten sam klaster zadeklarowany w dwóch miejscach to jak zestawy dryfują.

**HTML `<head>`** to zwyczajowy wybór. Jedno zastrzeżenie: znaczniki wstrzykiwane po hidratacji są zawodne. Jeśli twój framework dodaje je tylko po stronie klienta, crawler może nigdy ich nie zobaczyć.

**Mapa witryny XML** jest lepsza na dużą skalę. Dziesięć lokalizacji na 5 000 stronach oznacza 50 000 elementów `<link>` wysłanych do przeglądarek bez powodu; w mapie witryny kosztuje to Twoje strony zero bajtów.

**Nagłówek HTTP `Link`** jest jedyną opcją dla plików innych niż HTML, takich jak pliki PDF.

---

## Reguły

### Samoodwołanie i wzajemność

Zestaw na `/fr/about` musi zawierać `hreflang="fr"` wskazujący na `/fr/about`. A jeśli `/about` wskazuje na `/fr/about`, `/fr/about` musi wskazać z powrotem. Google nazywa jednokierunkowe odwołanie "tagiem bez zwrotu" i je odrzuca.

W praktyce oznacza to, że **każda strona w klastrze wysyła identyczny zestaw linków**. Generowanie ich z jednej wspólnej listy lokalizacji nie jest wygodą, jest to jedyny sposób, aby pozostać poprawnym, gdy masz więcej niż dwie lokalizacje.

### Zawsze bezwzględne adresy URL

```html
<!-- Ignorowane w milczeniu -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Poprawnie -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Warto zrozumieć powód, zamiast go tylko zapamiętać. `hreflang` jest odwołaniem między dokumentami: silniki wyszukiwarek budują klaster opierając się na adresie URL, współdzielony między wszystkimi stronami w nim. Ścieżka względna ma znaczenie tylko w stosunku do dokumentu, w którym się znajduje, dlatego nie może tego wyrazić. Nie może również przekroczyć hosta — a alternatywna wersja bardzo często to robi, gdy lokalizacja znajduje się na `example.fr` lub `fr.example.com`. W mapie witryny lub w nagłówku HTTP nie ma dokumentu bazowego do rozwiązania.

Ma to bezpośrednią konsekwencję w kodzie. `getLocalizedUrl("/about", "fr")` zwraca `/fr/about` — względna na wejściu, względna na wyjściu. Dla `hreflang` musisz podać absolutny URL:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ pominięte
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Jedynym wyjątkiem jest framework, który rozwiązuje dla ciebie względne wartości przed renderowaniem: Next.js rozszerza względne `alternates` względem `metadataBase`. OK — ale reguła dotyczy **emitowanego HTML-a**, więc sprawdź za pomocą `curl`, a nie inspektora DevTools.

### Kody języków

ISO 639-1 dla języka, ISO 3166-1 Alpha 2 dla opcjonalnego regionu: `fr`, `fr-CA`, `pt-BR`.

Dwie pułapki łapią prawie każdego. Sam region jest nieprawidłowy — `hreflang="ca"` to kataloński, a nie Kanada; potrzebujesz `en-CA` lub `fr-CA`. A `en-UK` nie istnieje: kod kraju Wielkiej Brytanii to `GB`, więc to `en-GB`.

Dodawaj region tylko wtedy, gdy naprawdę serwujesz temu regionowi inną zawartość — różne ceny, różne informacje prawne. `fr` i `fr-FR` na identycznej zawartości to szum.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Jedno pojęcie, które jest najczęściej zapominane i źle rozumiane, to `x-default` — mniej niż 30% aplikacji wdraża je prawidłowo.

To fallback dla użytkowników, których język nie odpowiada żadnemu wpisowi w zestawie. Użytkownik mówiący po holendersku na stronie oferującej angielski, francuski i hiszpański nie pasuje do żadnego wpisu; bez `x-default`, Google wybiera za Ciebie.

Ludzie źle rozumieją, co to oznacza. `x-default` **nie jest „wersją angielską"** i **nie jest „domyślnym locale"**, nawet jeśli zwykle wskazuje tam. Oznacza to _stronę dla użytkowników, którzy nie są objęci tym zestawem_. Dlatego jest uzasadnione — i często lepsze — aby wskazać to na selektor języka lub stronę docelową z geokierowaniem, zamiast na `/en`. Jeśli nie masz takiej strony, Twój język główny to rozsądna odpowiedź.

Dwie rzeczy do zapamiętania: `x-default` to jeden dodatkowy wpis w zestawie, a nie zamiennik dla samoreferentalnego, i jak każdy inny wpis musi pojawić się identycznie na każdej stronie w klastrze.

---

## Pułapka canonical

Każda zlokalizowana strona musi być **swoją własną canonical**:

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Wskazywanie canonical każdego locale na wersję angielską:

```html
<!-- On https://example.com/fr/about — kills the page -->
<link rel="canonical" href="https://example.com/about" />
```

mówi, że francuska strona jest duplikatem, który nie powinien być indeksowany, podczas gdy `hreflang` mówi, że jest to strona do serwowania użytkownikom francuskim. Sygnały się sprzeczają, canonical wygrywa, a twoje francuskie strony wypadają z indeksu.

**Canonical jest samoodnośny na lokalizację. `hreflang` opisuje klaster.**

---

## Wybór struktury URL

`hreflang` adnotuje adresy URL, więc struktura ma pierwszeństwo.

| Struktura       | Przykład          | Kompromis                                                                              |
| --------------- | ----------------- | -------------------------------------------------------------------------------------- |
| **Podkatalogi** | `example.com/fr/` | Jedna domena, wspólna autorytet — słabszy sygnał geograficzny                          |
| **Poddomeny**   | `fr.example.com`  | Łatwe dodawanie lub usuwanie lokalizacji — może być postrzegane jako oddzielna witryna |
| **ccTLDs**      | `example.fr`      | Najsilniejszy sygnał kraju — autorytetu zbudowany na domenę                            |

Podkatalogi to właściwy domyślny wybór dla większości projektów. Sięgaj po ccTLDs tylko wtedy, gdy naprawdę działasz jako oddzielne biznesu krajowe.

Jedyna struktura do uniknięcia: serwowanie różnych języków pod **tym samym adresem URL** na podstawie `Accept-Language` lub IP. Crawlery widzą jedną wersję i indeksują jedną wersję; wszystko inne jest niewidoczne.

> Intlayer obejmuje wszystkie trzy poprzez `routing.mode` i `routing.domains`. Patrz [niestandardowe domeny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/custom_domains.md) i [dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

---

## Implementacja

Ręczne pisanie tych tagów nie przetrwa kontakt z drugim locale'em. Wyprowadź je z listy locale'a.

<Steps>

<Step number={1} title="Emituj klaster na każdej stronie">

Ten sam zestaw wszędzie, canonical dla każdego locale'a, bezwzględne adresy URL, `x-default` włączony.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API udostępnia `alternates.languages`, a `getMultilingualUrls` buduje cały rekord z konfigurowanych locale'ów:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) zwraca:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Pełna konfiguracja: [Przewodnik i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Funkcja `head` trasy buduje linki. `localeMap` iteruje po skonfigurowanych lokalach, więc dodanie nowej lokali do konfiguracji dodaje ją wszędzie naraz:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    // Pobierz bieżącą lokalę z parametrów trasy
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        // Iteruj po wszystkich skonfigurowanych lokalach i utwórz alternates
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` uruchamia się na serwerze, więc tagi trafiają do initial HTML. Pełna konfiguracja: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Lub przenieś to wszystko do sitemapy">

Na dużą skalę trzymaj adnotacje całkowicie z dala od swoich stron. `generateSitemap` emituje `xhtml:link` alternates dla każdego wpisu, czytając locales i tryb routingu z twojej konfiguracji:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Dwie warte poznania opcje:

- `xhtmlLinks` (domyślnie `true`) — alternaty są emitowane tylko tam, gdzie adresy URL lokalizacji faktycznie się różnią. W trybie `no-prefix` każda lokalizacja udostępnia jeden adres URL, więc są pomijane, chyba że `routing.domains` przydziela lokalizacjom własne hostnamy.
- `entryPerLocale` (domyślnie `false`) — domyślnie jeden wpis `<url>` zawiera wszystkie alternatywy. Obie formy są prawidłowe, ale tylko adres URL wymieniony jako `<loc>` liczy się jako _przesłany_ w Search Console; alternatywne ustawienia regionalne pozostają odkrywalne, ale nie są przypisane do żadnej mapy witryny. Włączenie tego ustawienia daje każdemu zlokalizowanemu adresowi URL własny wpis z pełnym zestawem alternatyw powtórzonym. Zwiększa to liczbę wpisów przez liczbę ustawień regionalnych, więc zwróć uwagę na limit 50 000 adresów URL / 50 MB i podziel na indeks mapy witryny po jego przekroczeniu.

</Step>

<Step number={3} title="Sprawdź, co otrzymuje crawler">

`hreflang` zawodzi bezgłośnie, więc sprawdź go zamiast go zakładać.

Czytaj źródło, a nie inspektora — `curl https://example.com/fr/about | grep hreflang` pokazuje, co otrzymuje crawler; DevTools pokazuje DOM po uruchomieniu JavaScriptu. Następnie podążaj za każdym alternatywnym i potwierdź, że wskazuje z powrotem z identycznym zestawem, i że żaden z nich nie przekierowuje. Raport International Targeting w Search Console wyłapuje resztę na całej stronie.

W przypadku crawlowania specyficznego dla wielu języków, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) sprawdza brakujące tagi, złamane alternatywy i konflikty canonical na całych zlokalizowanych stronach.

</Step>

</Steps>

---

## Checklist

- [ ] Każda lokalizacja ma odrębny, możliwy do przeszukania adres URL
- [ ] Każda strona odwołuje się do siebie, a każde odwołanie jest wzajemne
- [ ] Ten sam zestaw jest dostarczany na każdej stronie w klastrze
- [ ] Wszystkie wartości `href` są bezwzględne w emitowanym HTML
- [ ] Kody są ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, nie `en-UK`)
- [ ] `x-default` jest obecny i wskazuje, gdzie powinni przejść niezidentyfikowani użytkownicy
- [ ] Canonical jest samoodwołujący się dla każdej lokalizacji
- [ ] Tagi są renderowane po stronie serwera, a nie wstrzykiwane po hydratacji
- [ ] Zadeklarowane w dokładnie jednym miejscu
- [ ] Brak przekierowań alternacyjnych

---

## Podsumowanie

`hreflang` jest prosty i nieubłagany. Jeden brakujący tag powrotny, jeden względny URL, jeden canonical pomiędzy lokalizacjami, a cały klaster jest odrzucany bez żadnego błędu. Każdy z tych problemów pochodzi z ręcznego pisania tagów.

Wyprowadź zestaw z jednej listy locale, wyrenderuj go po stronie serwera, utrzymuj canonical self-referential i daj `x-default` myśl, którą zasługuje. Zrób to raz i poprawność przestaje być czymś, co utrzymujesz.

### Idąc dalej

- [SEO i Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md) — szerszy obraz wielojęzycznego SEO
- [SEO i i18n w Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Poradnik Next.js 16 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)
- [Przewodnik i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)
- [Niestandardowe domeny dla poszczególnych lokalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/custom_domains.md)
- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
