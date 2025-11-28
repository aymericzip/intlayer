---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Jak internacjonalizować aplikację Next.js za pomocą next-i18next
description: Konfiguracja i18n z next-i18next -  najlepsze praktyki i wskazówki SEO dla wielojęzycznych aplikacji Next.js, obejmujące internacjonalizację, organizację treści i konfigurację techniczną.
keywords:
  - next-i18next
  - i18next
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Wersja początkowa
---

# Jak internacjonalizować aplikację Next.js za pomocą next-i18next w 2025 roku

## Spis treści

<TOC/>

## Czym jest next-i18next?

**next-i18next** to popularne rozwiązanie do internacjonalizacji (i18n) dla aplikacji Next.js. Podczas gdy oryginalny pakiet `next-i18next` był zaprojektowany dla Pages Router, ten przewodnik pokazuje, jak zaimplementować i18next z nowoczesnym **App Router** używając bezpośrednio `i18next` i `react-i18next`.

Dzięki temu podejściu możesz:

- **Organizować tłumaczenia** używając przestrzeni nazw (np. `common.json`, `about.json`) dla lepszego zarządzania treścią.
- **Ładować tłumaczenia efektywnie** poprzez ładowanie tylko tych przestrzeni nazw, które są potrzebne na danej stronie, co zmniejsza rozmiar paczki.
- **Wspierać zarówno komponenty serwerowe, jak i klienckie** z odpowiednią obsługą SSR i hydratacji.
- **Zapewnić wsparcie dla TypeScript** z typowo bezpieczną konfiguracją lokalizacji i kluczy tłumaczeń.
- **Optymalizuj pod SEO** z odpowiednimi metadanymi, mapą strony oraz internacjonalizacją robots.txt.

> Alternatywnie możesz również odnieść się do [przewodnika next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md) lub bezpośrednio użyć [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md).

> Zobacz porównanie w [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktyki, których powinieneś przestrzegać

Zanim przejdziemy do implementacji, oto kilka praktyk, których powinieneś przestrzegać:

- **Ustaw atrybuty HTML `lang` i `dir`**
  W swoim layoucie oblicz `dir` za pomocą `getLocaleDirection(locale)` i ustaw `<html lang={locale} dir={dir}>` dla odpowiedniej dostępności i SEO.
- **Podziel wiadomości według przestrzeni nazw**
  Organizuj pliki JSON według lokalizacji i przestrzeni nazw (np. `common.json`, `about.json`), aby ładować tylko to, co potrzebujesz.
- **Minimalizuj payload klienta**
  Na stronach wysyłaj tylko wymagane przestrzenie nazw do `NextIntlClientProvider` (np. `pick(messages, ['common', 'about'])`).
- **Preferuj strony statyczne**
  Używaj stron statycznych tak często, jak to możliwe, dla lepszej wydajności i SEO.
- **I18n w komponentach serwerowych**
  Komponenty serwerowe, takie jak strony lub wszystkie komponenty nieoznaczone jako `client`, są statyczne i mogą być wstępnie renderowane podczas budowania. Dlatego będziemy musieli przekazać do nich funkcje tłumaczenia jako propsy.
- **Skonfiguruj typy TypeScript**
  Dla swoich lokalizacji zapewnij bezpieczeństwo typów w całej aplikacji.
- **Proxy do przekierowań**
  Użyj proxy do obsługi wykrywania lokalizacji i routingu oraz przekierowywania użytkownika na odpowiedni URL z prefiksem lokalizacji.
- **Internacjonalizacja metadanych, mapy witryny, robots.txt**
  Internacjonalizuj swoje metadane, mapę witryny, robots.txt za pomocą funkcji `generateMetadata` dostarczonej przez Next.js, aby zapewnić lepsze indeksowanie przez wyszukiwarki we wszystkich lokalizacjach.
- **Lokalizacja linków**
  Lokalizuj linki za pomocą komponentu `Link`, aby przekierowywać użytkownika na odpowiedni URL z prefiksem lokalizacji. Jest to ważne, aby zapewnić odkrywalność Twoich stron we wszystkich lokalizacjach.
- **Automatyzacja testów i tłumaczeń**
  Automatyzacja testów i tłumaczeń pomaga zaoszczędzić czas na utrzymanie wielojęzycznej aplikacji.

> Zobacz naszą dokumentację zawierającą wszystko, co musisz wiedzieć o internacjonalizacji i SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md).

---

## Przewodnik krok po kroku, jak skonfigurować i18next w aplikacji Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Zobacz [Szablon Aplikacji](https://github.com/aymericzip/next-i18next-template) na GitHub.

Oto struktura projektu, którą będziemy tworzyć:

```bash
.
├── i18n.config.ts
└── src # Src jest opcjonalny
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupa tras, aby nie zaśmiecać wszystkich stron komunikatami home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Podstawowy framework do internacjonalizacji, który obsługuje ładowanie i zarządzanie tłumaczeniami.
- **react-i18next**: Powiązania React dla i18next, które dostarczają hooki takie jak `useTranslation` dla komponentów klienckich.
- **i18next-resources-to-backend**: Wtyczka umożliwiająca dynamiczne ładowanie plików tłumaczeń, pozwalająca ładować tylko potrzebne przestrzenie nazw.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby zdefiniować obsługiwane lokalizacje, domyślną lokalizację oraz funkcje pomocnicze do lokalizacji URL. Ten plik służy jako pojedyncze źródło prawdy dla Twojej konfiguracji i18n i zapewnia bezpieczeństwo typów w całej aplikacji.

Centralizacja konfiguracji lokalizacji zapobiega niespójnościom i ułatwia dodawanie lub usuwanie lokalizacji w przyszłości. Funkcje pomocnicze zapewniają spójne generowanie URL dla SEO i routingu.

```ts fileName="i18n.config.ts"
// Zdefiniuj obsługiwane lokalizacje jako stałą tablicę dla bezpieczeństwa typów
// Asercja 'as const' powoduje, że TypeScript wywnioskuje typy dosłowne zamiast string[]
export const locales = ["en", "fr"] as const;

// Wyodrębnij typ Locale z tablicy locales
// Tworzy to typ unii: "en" | "fr"
export type Locale = (typeof locales)[number];

// Ustaw domyślną lokalizację używaną, gdy lokalizacja nie jest określona
export const defaultLocale: Locale = "en";

// Języki pisane od prawej do lewej, które wymagają specjalnego kierunku tekstu
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Sprawdź, czy lokalizacja wymaga kierunku tekstu RTL (od prawej do lewej)
// Używane dla języków takich jak arabski, hebrajski, perski i urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Generuj zlokalizowaną ścieżkę dla danej lokalizacji i ścieżki
// Ścieżki dla domyślnej lokalizacji nie mają prefiksu (np. "/about" zamiast "/en/about")
// Inne lokalizacje mają prefiks (np. "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Podstawowy URL dla adresów absolutnych (używany w mapach witryn, metadanych itp.)
const ORIGIN = "https://example.com";

// Generuj absolutny URL z prefiksem lokalizacji
// Używane dla metadanych SEO, map witryn i adresów kanonicznych
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Używane do ustawiania ciasteczka lokalizacji w przeglądarce
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 rok
    "SameSite=Lax",
  ].join("; ");
}
```

### Krok 3: Centralizacja przestrzeni nazw tłumaczeń

Utwórz jedno źródło prawdy dla każdej przestrzeni nazw, którą udostępnia Twoja aplikacja. Ponowne użycie tej listy utrzymuje synchronizację kodu serwera, klienta i narzędzi oraz umożliwia silne typowanie pomocników tłumaczeń.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Krok 4: Silne typowanie kluczy tłumaczeń za pomocą TypeScript

Rozszerz `i18next`, aby wskazywał na Twoje kanoniczne pliki językowe (zazwyczaj angielskie). TypeScript wtedy wywnioskuje poprawne klucze dla każdej przestrzeni nazw, dzięki czemu wywołania `t()` są sprawdzane kompleksowo.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Wskazówka: Przechowuj tę deklarację w katalogu `src/types` (utwórz folder, jeśli nie istnieje). Next.js automatycznie uwzględnia `src` w `tsconfig.json`, więc rozszerzenie jest wykrywane automatycznie. Jeśli nie, dodaj następujące do pliku `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Dzięki temu możesz polegać na autouzupełnianiu i sprawdzaniu podczas kompilacji:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, typowane: t("counter.increment")
// BŁĄD, błąd kompilacji: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Krok 5: Skonfiguruj inicjalizację i18n po stronie serwera

Utwórz funkcję inicjalizacji po stronie serwera, która ładuje tłumaczenia dla komponentów serwerowych. Ta funkcja tworzy osobną instancję i18next do renderowania po stronie serwera, zapewniając, że tłumaczenia są załadowane przed renderowaniem.

Komponenty serwerowe potrzebują własnej instancji i18next, ponieważ działają w innym kontekście niż komponenty klienckie. Wstępne ładowanie tłumaczeń na serwerze zapobiega migotaniu nieprzetłumaczonej treści i poprawia SEO, zapewniając, że wyszukiwarki widzą przetłumaczoną zawartość.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Konfiguracja dynamicznego ładowania zasobów dla i18next
// Ta funkcja dynamicznie importuje pliki JSON z tłumaczeniami na podstawie lokalizacji i przestrzeni nazw
// Przykład: locale="fr", namespace="about" -> importuje "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Inicjalizuje instancję i18next do renderowania po stronie serwera
 *
 * @returns Zainicjalizowana instancja i18next gotowa do użycia po stronie serwera
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Utwórz nową instancję i18next (oddzielną od instancji po stronie klienta)
  const i18n = createInstance();

  // Inicjalizuj z integracją React i loaderem backendowym
  await i18n
    .use(initReactI18next) // Włącz wsparcie dla hooków React
    .use(backend) // Włącz dynamiczne ładowanie zasobów
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Załaduj tylko określone przestrzenie nazw dla lepszej wydajności
      defaultNS: "common", // Domyślna przestrzeń nazw, gdy żadna nie jest określona
      interpolation: { escapeValue: false }, // Nie escapuj HTML (React obsługuje ochronę XSS)
      react: { useSuspense: false }, // Wyłącz Suspense dla kompatybilności SSR
      returnNull: false, // Zwróć pusty ciąg zamiast null dla brakujących kluczy
      initImmediate: false, // Odłóż inicjalizację do momentu załadowania zasobów (szybszy SSR)
    });
  return i18n;
}
```

### Krok 6: Utwórz klienta i18n Provider

Utwórz komponent klienta, który opakuje Twoją aplikację kontekstem i18next. Ten provider otrzymuje wstępnie załadowane tłumaczenia z serwera, aby zapobiec błyskowi nieprzetłumaczonej zawartości (FOUC) i uniknąć podwójnego pobierania.

Komponenty klienckie potrzebują własnej instancji i18next działającej w przeglądarce. Przyjmując wstępnie załadowane zasoby z serwera, zapewniamy płynne nawilżanie i zapobiegamy migotaniu zawartości. Provider zarządza również dynamicznie zmianą lokalizacji i ładowaniem przestrzeni nazw.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Konfiguracja dynamicznego ładowania zasobów po stronie klienta
// Ten sam wzorzec co po stronie serwera, ale ta instancja działa w przeglądarce
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Wstępnie załadowane zasoby z serwera (zapobiega FOUC - Flash of Untranslated Content)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Klientowy provider i18n, który opakowuje aplikację kontekstem i18next
 * Otrzymuje wstępnie załadowane zasoby z serwera, aby uniknąć ponownego pobierania tłumaczeń
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Utwórz instancję i18n tylko raz, używając leniwego inicjalizatora useState
  // Zapewnia to, że instancja jest tworzona tylko raz, a nie przy każdym renderze
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Jeśli zasoby są dostarczone (z serwera), użyj ich, aby uniknąć pobierania po stronie klienta
        // Zapobiega to FOUC i poprawia wydajność początkowego ładowania
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Zapobiega zwracaniu wartości undefined
      });

    return i18nInstance;
  });

  // Aktualizuj język, gdy zmienia się właściwość locale
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Upewnij się, że wszystkie wymagane przestrzenie nazw są załadowane po stronie klienta
  // Użycie join("|") jako zależności pozwala poprawnie porównać tablice
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Udostępnij instancję i18n wszystkim komponentom potomnym za pomocą kontekstu React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Krok 7: Zdefiniuj dynamiczne trasy lokalizacji

Skonfiguruj dynamiczne routowanie dla lokalizacji, tworząc katalog `[locale]` w folderze aplikacji. Pozwala to Next.js obsługiwać routowanie oparte na lokalizacji, gdzie każda lokalizacja staje się segmentem URL (np. `/en/about`, `/fr/about`).

Użycie dynamicznych tras umożliwia Next.js generowanie statycznych stron dla wszystkich lokalizacji podczas budowania, co poprawia wydajność i SEO. Komponent layout ustawia atrybuty HTML `lang` i `dir` w oparciu o lokalizację, co jest kluczowe dla dostępności i zrozumienia przez wyszukiwarki.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Wyłącz dynamiczne parametry - wszystkie locale muszą być znane podczas budowania
// Zapewnia to statyczne generowanie dla wszystkich tras locale
export const dynamicParams = false;

/**
 * Generuj statyczne parametry dla wszystkich locale podczas budowania
 * Next.js będzie pre-renderować strony dla każdego locale zwróconego tutaj
 * Przykład: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Główny komponent layoutu obsługujący atrybuty HTML specyficzne dla locale
 * Ustawia atrybut lang oraz kierunek tekstu (ltr/rtl) na podstawie locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Waliduj locale z parametrów URL
  // Jeśli podane jest nieprawidłowe locale, użyj domyślnego locale
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Określ kierunek tekstu na podstawie locale
  // Języki RTL, takie jak arabski, wymagają dir="rtl" dla prawidłowego wyświetlania tekstu
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Krok 8: Utwórz pliki tłumaczeń

Utwórz pliki JSON dla każdego locale i przestrzeni nazw. Ta struktura pozwala na logiczne organizowanie tłumaczeń i ładowanie tylko tego, co jest potrzebne na każdej stronie.

Organizowanie tłumaczeń według przestrzeni nazw (np. `common.json`, `about.json`) umożliwia dzielenie kodu i zmniejsza rozmiar pakietu. Ładujesz tylko tłumaczenia potrzebne dla każdej strony, co poprawia wydajność.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/pl/home.json"
{
  "title": "Strona główna",
  "description": "Opis strony głównej",
  "welcome": "Witamy",
  "greeting": "Witaj, świecie!",
  "aboutPage": "Strona O nas",
  "documentation": "Dokumentacja"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/pl/about.json"
{
  "title": "O nas",
  "description": "Opis strony O nas",
  "counter": {
    "label": "Licznik",
    "increment": "Zwiększ",
    "description": "Kliknij przycisk, aby zwiększyć licznik"
  }
}
```

### Krok 9: Wykorzystanie tłumaczeń na Twoich stronach

Utwórz komponent strony, który inicjalizuje i18next po stronie serwera i przekazuje tłumaczenia zarówno do komponentów serwerowych, jak i klienckich. Zapewnia to załadowanie tłumaczeń przed renderowaniem i zapobiega migotaniu treści.

Inicjalizacja po stronie serwera ładuje tłumaczenia przed renderowaniem strony, co poprawia SEO i zapobiega FOUC (Flash of Unstyled Content). Przekazując wcześniej załadowane zasoby do providera po stronie klienta, unikamy podwójnego pobierania i zapewniamy płynne hydracje.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Komponent serwerowy strony, który obsługuje inicjalizację i18n
 * Wstępnie ładuje tłumaczenia na serwerze i przekazuje je do komponentów klienta
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Określ, których przestrzeni nazw tłumaczeń potrzebuje ta strona
  // Ponownie użyj scentralizowanej listy dla bezpieczeństwa typów i autouzupełniania
  const pageNamespaces = allNamespaces;

  // Zainicjuj i18next na serwerze z wymaganymi przestrzeniami nazw
  // To ładuje pliki JSON tłumaczeń po stronie serwera
  const i18n = await initI18next(locale, pageNamespaces);

  // Pobierz stałą funkcję tłumaczenia dla przestrzeni nazw "about"
  // getFixedT blokuje przestrzeń nazw, więc używamy t("title") zamiast t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Wyodrębnij pakiety tłumaczeń z instancji i18n
  // Te dane są przekazywane do I18nProvider, aby zasilić i18n po stronie klienta
  // Zapobiega FOUC (Flash of Untranslated Content) i unika podwójnego pobierania
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Krok 10: Używanie tłumaczeń w komponentach klienckich

Komponenty klienckie mogą korzystać z hooka `useTranslation`, aby uzyskać dostęp do tłumaczeń. Ten hook zapewnia dostęp do funkcji tłumaczącej oraz instancji i18n, co pozwala na tłumaczenie treści i dostęp do informacji o lokalizacji.

Komponenty klienckie potrzebują hooków Reacta, aby uzyskać dostęp do tłumaczeń. Hook `useTranslation` integruje się bezproblemowo z i18next i zapewnia reaktywne aktualizacje przy zmianie lokalizacji.

> Upewnij się, że strona/provider zawiera tylko potrzebne przestrzenie nazw (np. `about`).  
> Jeśli używasz React < 19, zapamiętuj (memoizuj) ciężkie formatery, takie jak `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Przykład komponentu klienta używającego hooków React do tłumaczeń
 * Może używać hooków takich jak useState, useEffect oraz useTranslation
 */
const ClientComponent = () => {
  // Hook useTranslation zapewnia dostęp do funkcji tłumaczenia oraz instancji i18n
  // Określ namespace, aby ładować tylko tłumaczenia dla namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Tworzy formatowanie liczb zgodne z lokalizacją
  // i18n.language dostarcza aktualną lokalizację (np. "en", "fr")
  // Intl.NumberFormat formatuje liczby zgodnie z konwencjami lokalnymi
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Formatowanie liczby zgodnie z ustawieniami lokalnymi */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Krok 11: Użycie tłumaczeń w komponentach serwerowych

Komponenty serwerowe nie mogą korzystać z hooków React, dlatego otrzymują tłumaczenia za pomocą propsów od komponentów nadrzędnych. Takie podejście utrzymuje komponenty serwerowe synchroniczne i pozwala na ich zagnieżdżanie wewnątrz komponentów klienckich.

Komponenty serwerowe, które mogą być zagnieżdżone pod granicami klienta, muszą być synchroniczne. Przekazując przetłumaczone ciągi znaków oraz informacje o lokalizacji jako propsy, unikamy operacji asynchronicznych i zapewniamy poprawne renderowanie.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Funkcja tłumaczenia przekazywana z nadrzędnego komponentu serwerowego
  // Komponenty serwerowe nie mogą używać hooków, więc tłumaczenia przychodzą przez propsy
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Przykład komponentu serwerowego - otrzymuje tłumaczenia jako propsy
 * Może być zagnieżdżony wewnątrz komponentów klienckich (asynchroniczne komponenty serwerowe)
 * Nie może używać hooków React, więc wszystkie dane muszą pochodzić z propsów lub operacji asynchronicznych
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Formatowanie liczby po stronie serwera z użyciem locale
  // To działa na serwerze podczas SSR, poprawiając początkowe ładowanie strony
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Użyj funkcji tłumaczenia przekazanej jako prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Opcjonalny) Krok 12: Zmień język swojej zawartości

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest używanie adresów URL z prefiksem lokalizacji oraz linków Next.js. Poniższy przykład odczytuje aktualną lokalizację z trasy, usuwa ją z nazwy ścieżki i renderuje jeden link na każdą dostępną lokalizację.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Selektor języka">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Opcjonalny) Krok 13: Zbuduj lokalizowany komponent Link

Ponowne użycie lokalizowanych URL-i w całej aplikacji utrzymuje spójność nawigacji i jest przyjazne dla SEO. Owiń `next/link` w małą pomocniczą funkcję, która dodaje prefiks aktywnego locale do wewnętrznych ścieżek, pozostawiając zewnętrzne URL-e bez zmian.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Wskazówka: Ponieważ `LocalizedLink` jest zamiennikiem typu drop-in, migruj stopniowo, zamieniając importy i pozwalając komponentowi obsługiwać adresy URL specyficzne dla lokalizacji.

### (Opcjonalny) Krok 14: Uzyskanie aktywnej lokalizacji wewnątrz Server Actions

Server Actions często potrzebują aktualnej lokalizacji do e-maili, logowania lub integracji z zewnętrznymi usługami. Połącz ciasteczko lokalizacji ustawione przez Twój proxy z nagłówkiem `Accept-Language` jako zapasową opcję.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Przykład akcji serwerowej, która używa aktualnej lokalizacji
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Użyj lokalizacji do efektów ubocznych zależnych od języka (e-maile, CRM itp.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Ponieważ helper opiera się na ciasteczkach i nagłówkach Next.js, działa w Route Handlers, Server Actions oraz innych kontekstach dostępnych tylko po stronie serwera.

### (Opcjonalny) Krok 15: Internacjonalizacja Twoich Metadanych

Tłumaczenie treści jest ważne, ale głównym celem internacjonalizacji jest uczynienie Twojej strony bardziej widoczną na świecie. I18n to niesamowite narzędzie do poprawy widoczności Twojej strony poprzez odpowiednie SEO.

Właściwie zinternacjonalizowane metadane pomagają wyszukiwarkom zrozumieć, jakie języki są dostępne na Twoich stronach. Obejmuje to ustawianie meta tagów hreflang, tłumaczenie tytułów i opisów oraz zapewnienie poprawnego ustawienia kanonicznych URL dla każdej lokalizacji.

Oto lista dobrych praktyk dotyczących wielojęzycznego SEO:

- Ustaw meta tagi hreflang w tagu `<head>`, aby pomóc wyszukiwarkom zrozumieć, jakie języki są dostępne na stronie
- Wymień wszystkie tłumaczenia strony w pliku sitemap.xml, używając schematu XML `http://www.w3.org/1999/xhtml`
- Nie zapomnij wykluczyć stron z prefiksem w pliku robots.txt (np. `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Użyj niestandardowego komponentu Link, aby przekierować do najbardziej zlokalizowanej wersji strony (np. po francusku `<a href="/fr/about">À propos</a>`)

Deweloperzy często zapominają prawidłowo odwołać się do swoich stron w różnych lokalizacjach. Naprawmy to:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Generuje metadane SEO dla każdej wersji strony w danym języku
 * Ta funkcja jest wywoływana dla każdego locale podczas budowania
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamicznie importuj plik tłumaczeń dla tego locale
  // Używane do pobrania przetłumaczonego tytułu i opisu dla metadanych
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Utwórz mapowanie hreflang dla wszystkich locale
  // Pomaga wyszukiwarkom zrozumieć alternatywy językowe
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Kanoniczny URL dla tej wersji językowej
      canonical: absoluteUrl(locale, "/about"),
      // Alternatywy językowe dla SEO (tagi hreflang)
      // "x-default" określa domyślną wersję językową
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>O nas</h1>;
}
```

### (Opcjonalny) Krok 16: Internacjonalizacja mapy witryny

Wygeneruj mapę witryny, która zawiera wszystkie wersje językowe Twoich stron. Pomaga to wyszukiwarkom odnaleźć i zaindeksować wszystkie wersje językowe Twoich treści.

Prawidłowo zinternacjonalizowana mapa witryny zapewnia, że wyszukiwarki mogą znaleźć i zaindeksować wszystkie wersje językowe Twoich stron. Poprawia to widoczność w międzynarodowych wynikach wyszukiwania.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Pobierz mapę wszystkich lokalizacji i ich zlokalizowanych ścieżek
 *
 * Przykładowy wynik:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Generuj mapę witryny ze wszystkimi wariantami językowymi dla lepszego SEO
// Pole alternates informuje wyszukiwarki o wersjach językowych
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opcjonalny) Krok 17: Internacjonalizacja pliku robots.txt

Utwórz plik robots.txt, który prawidłowo obsługuje wszystkie wersje językowe chronionych tras. Zapewnia to, że wyszukiwarki nie będą indeksować stron admina ani panelu w żadnym języku.

Prawidłowa konfiguracja robots.txt dla wszystkich wersji językowych zapobiega indeksowaniu wrażliwych stron przez wyszukiwarki w dowolnym języku. Jest to kluczowe dla bezpieczeństwa i prywatności.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Generuj ścieżki dla wszystkich wersji językowych (np. /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Opcjonalny) Krok 18: Skonfiguruj Middleware dla trasowania lokalizacji

Utwórz proxy, które automatycznie wykryje preferowaną lokalizację użytkownika i przekieruje go do odpowiedniego adresu URL z prefiksem lokalizacji. Poprawia to doświadczenie użytkownika, pokazując treści w jego preferowanym języku.

Middleware zapewnia, że użytkownicy są automatycznie przekierowywani do swojego preferowanego języka podczas odwiedzania Twojej strony. Zapisuje również preferencje użytkownika w ciasteczku na przyszłe wizyty.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Wyrażenie regularne do dopasowania plików z rozszerzeniami (np. .js, .css, .png)
// Używane do wykluczenia statycznych zasobów z routingu lokalizacji
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Wyodrębnij lokalizację z nagłówka Accept-Language
 * Obsługuje formaty takie jak "fr-CA", "en-US" itd.
 * W przypadku braku obsługi języka przeglądarki, używa domyślnej lokalizacji
 */
const pickLocale = (accept: string | null) => {
  // Pobierz pierwsze preferowane języki (np. "fr-CA" z "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Wyodrębnij podstawowy kod języka (np. "fr" z "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Sprawdź, czy obsługujemy tę lokalizację, w przeciwnym razie użyj domyślnej
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy Next.js do wykrywania i routingu lokalizacji
 * Uruchamiany przy każdym żądaniu przed renderowaniem strony
 * Automatycznie przekierowuje do URL z prefiksem lokalizacji, gdy jest to potrzebne
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pomijaj proxy dla wewnętrznych ścieżek Next.js, tras API i plików statycznych
  // Te nie powinny mieć prefiksu lokalizacji
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Sprawdź, czy URL już ma prefiks lokalizacji
  // Przykład: "/fr/about" lub "/en" zwróci true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Jeśli brak prefiksu lokalizacji, wykryj lokalizację i przekieruj
  if (!hasLocale) {
    // Najpierw spróbuj pobrać lokalizację z ciasteczka (preferencje użytkownika)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Użyj lokalizacji z ciasteczka, jeśli jest ważna, w przeciwnym razie wykryj z nagłówków przeglądarki
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Sklonuj URL, aby zmodyfikować ścieżkę
    const url = request.nextUrl.clone();
    // Dodaj prefiks lokalizacji do ścieżki
    // Obsłuż ścieżkę główną specjalnie, aby uniknąć podwójnego ukośnika
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Utwórz odpowiedź przekierowującą i ustaw cookie z lokalizacją
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Dopasuj wszystkie ścieżki z wyjątkiem:
    // - tras API (/api/*)
    // - wewnętrznych elementów Next.js (/_next/*)
    // - plików statycznych (/static/*)
    // - plików z rozszerzeniami (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Opcjonalny) Krok 19: Automatyzuj swoje tłumaczenia za pomocą Intlayer

Intlayer to **bezpłatna** i **otwartoźródłowa** biblioteka zaprojektowana, aby wspierać proces lokalizacji w Twojej aplikacji. Podczas gdy i18next zajmuje się ładowaniem i zarządzaniem tłumaczeniami, Intlayer pomaga zautomatyzować cały proces tłumaczeniowy.

Zarządzanie tłumaczeniami ręcznie może być czasochłonne i podatne na błędy. Intlayer automatyzuje testowanie, generowanie i zarządzanie tłumaczeniami, oszczędzając Twój czas i zapewniając spójność w całej aplikacji.

Intlayer pozwala Ci na:

- **Deklarowanie treści tam, gdzie chcesz w swojej bazie kodu**  
  Intlayer pozwala deklarować treści tam, gdzie chcesz w swojej bazie kodu, używając plików `.content.{ts|js|json}`. Umożliwi to lepszą organizację treści, zapewniając lepszą czytelność i łatwiejszą konserwację kodu.

- **Testowanie brakujących tłumaczeń**  
  Intlayer dostarcza funkcje testowe, które można zintegrować z Twoim pipeline CI/CD lub testami jednostkowymi. Dowiedz się więcej o [testowaniu tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).

- **Automatyzuj swoje tłumaczenia**,
  Intlayer oferuje CLI oraz rozszerzenie do VSCode, które automatyzują proces tłumaczeń. Można je zintegrować z Twoim pipeline CI/CD. Dowiedz się więcej o [automatyzacji tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).
  Możesz używać **własnego klucza API oraz wybranego dostawcy AI**. Zapewnia również tłumaczenia uwzględniające kontekst, zobacz [wypełnianie treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md).

- **Podłączanie zewnętrznej zawartości**
- **Automatyzuj swoje tłumaczenia**,  
  Intlayer udostępnia CLI oraz rozszerzenie VSCode do automatyzacji tłumaczeń. Można je zintegrować z Twoim pipeline CI/CD. Dowiedz się więcej o [automatyzacji tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).  
  Możesz używać **własnego klucza API oraz wybranego dostawcy AI**. Zapewnia także tłumaczenia uwzględniające kontekst, zobacz [wypełnianie treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md).

- **Podłącz zewnętrzne treści**  
  Intlayer pozwala na podłączenie Twoich treści do zewnętrznego systemu zarządzania treścią (CMS). Aby pobierać je w zoptymalizowany sposób i wstawiać do Twoich zasobów JSON. Dowiedz się więcej o [pobieraniu zewnętrznych treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md).

- **Edytor wizualny**  
  Intlayer oferuje darmowy edytor wizualny do edycji Twoich treści za pomocą edytora wizualnego. Dowiedz się więcej o [wizualnej edycji tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

I wiele więcej. Aby odkryć wszystkie funkcje oferowane przez Intlayer, zapoznaj się z dokumentacją [Zainteresowanie Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).
