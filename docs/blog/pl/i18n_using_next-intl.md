---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Jak internacjonalizować aplikację Next.js za pomocą next-intl
description: Konfiguracja i18n z next-intl - najlepsze praktyki i wskazówki SEO dla wielojęzycznych aplikacji Next.js, obejmujące internacjonalizację, organizację treści i konfigurację techniczną.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Wersja początkowa
---

# Jak internacjonalizować aplikację Next.js za pomocą next-intl w 2025 roku

## Spis treści

<TOC/>

## Czym jest next-intl?

**next-intl** to popularna biblioteka do internacjonalizacji (i18n) zaprojektowana specjalnie dla Next.js App Router. Zapewnia płynny sposób tworzenia wielojęzycznych aplikacji Next.js z doskonałym wsparciem TypeScript oraz wbudowanymi optymalizacjami.

> Jeśli wolisz, możesz również odwołać się do [przewodnika next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-i18next.md) lub bezpośrednio korzystać z [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_next-intl.md).

> Zobacz porównanie w [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktyki, których powinieneś przestrzegać

Zanim przejdziemy do implementacji, oto kilka praktyk, których powinieneś przestrzegać:

- **Ustaw atrybuty HTML `lang` i `dir`**  
  W swoim układzie oblicz `dir` za pomocą `getLocaleDirection(locale)` i ustaw `<html lang={locale} dir={dir}>` dla odpowiedniej dostępności i SEO.
- **Podziel wiadomości według przestrzeni nazw**  
  Organizuj pliki JSON według lokalizacji i przestrzeni nazw (np. `common.json`, `about.json`), aby ładować tylko to, co potrzebujesz.
- **Minimalizuj obciążenie klienta**  
  Na stronach wysyłaj do `NextIntlClientProvider` tylko wymagane przestrzenie nazw (np. `pick(messages, ['common', 'about'])`).
- **Preferuj strony statyczne**  
  Używaj stron statycznych tak często, jak to możliwe, dla lepszej wydajności i SEO.
- **I18n w komponentach serwerowych**  
  Komponenty serwerowe, takie jak strony lub wszystkie komponenty nieoznaczone jako `client`, są statyczne i mogą być wstępnie renderowane podczas budowania. Dlatego będziemy musieli przekazać do nich funkcje tłumaczeń jako propsy.
- **Skonfiguruj typy TypeScript**  
  Dla swoich lokalizacji, aby zapewnić bezpieczeństwo typów w całej aplikacji.
- **Proxy do przekierowań**  
  Użyj proxy do obsługi wykrywania lokalizacji i routingu oraz przekierowania użytkownika na odpowiedni URL z prefiksem lokalizacji.
- **Internacjonalizacja metadanych, mapy witryny, robots.txt**  
  Internacjonalizuj swoje metadane, mapę witryny, robots.txt za pomocą funkcji `generateMetadata` dostarczonej przez Next.js, aby zapewnić lepsze odkrywanie przez wyszukiwarki we wszystkich lokalizacjach.
- **Lokalizuj linki**  
  Lokalizuj linki za pomocą komponentu `Link`, aby przekierować użytkownika na odpowiedni URL z prefiksem lokalizacji. Jest to ważne, aby zapewnić odnajdywalność Twoich stron we wszystkich lokalizacjach.
- **Automatyzuj testy i tłumaczenia**  
  Automatyzacja testów i tłumaczeń pomaga zaoszczędzić czas potrzebny na utrzymanie wielojęzycznej aplikacji.

> Zobacz naszą dokumentację zawierającą wszystko, co musisz wiedzieć o internacjonalizacji i SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md).

---

## Przewodnik krok po kroku, jak skonfigurować next-intl w aplikacji Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Zobacz [Szablon aplikacji](https://github.com/aymericzip/next-intl-template) na GitHub.

Oto struktura projektu, którą będziemy tworzyć:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src jest opcjonalny
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grupa tras, aby nie zaśmiecać wszystkich stron zasobami home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Podstawowa biblioteka do internacjonalizacji dla Next.js App Router, która dostarcza hooki, funkcje serwerowe oraz klienta do zarządzania tłumaczeniami.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny, który definiuje obsługiwane lokalizacje i konfiguruje ustawienia żądań next-intl. Ten plik służy jako pojedyncze źródło prawdy dla Twojej konfiguracji i18n oraz zapewnia bezpieczeństwo typów w całej aplikacji.

Centralizacja konfiguracji lokalizacji zapobiega niespójnościom i ułatwia dodawanie lub usuwanie lokalizacji w przyszłości. Funkcja `getRequestConfig` jest wywoływana przy każdym żądaniu i ładuje tylko tłumaczenia potrzebne dla każdej strony, umożliwiając dzielenie kodu i zmniejszając rozmiar pakietu.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Definiuj obsługiwane lokalizacje z bezpieczeństwem typów
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Sprawdza, czy język jest zapisywany od prawej do lewej
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Dynamiczne ładowanie wiadomości dla każdej lokalizacji, aby umożliwić dzielenie kodu
// Promise.all ładuje przestrzenie nazw równolegle dla lepszej wydajności
async function loadMessages(locale: Locale) {
  // Ładuj tylko przestrzenie nazw potrzebne dla twojego layoutu/stron
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Przyszłe pliki JSON powinny być dodane tutaj
  ]);

  return { common, home, about } as const;
}

// Pomocnik do generowania zlokalizowanych URL-i (np. /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig uruchamia się przy każdym żądaniu i dostarcza wiadomości do komponentów serwera
// To tutaj next-intl integruje się z renderowaniem po stronie serwera Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 rok
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Zmienia trasę /en/... na /...
  // Opcjonalnie: zlokalizowane ścieżki
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // zapobiega przekierowaniom "/" -> "/en" na podstawie ciasteczek
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Krok 3: Definiowanie dynamicznych tras lokalizacji

Skonfiguruj dynamiczne routowanie dla lokalizacji, tworząc katalog `[locale]` w folderze aplikacji. Pozwala to Next.js obsługiwać routowanie oparte na lokalizacji, gdzie każda lokalizacja staje się segmentem URL (np. `/en/about`, `/fr/about`).

Użycie dynamicznych tras umożliwia Next.js generowanie statycznych stron dla wszystkich lokalizacji podczas budowania, co poprawia wydajność i SEO. Komponent layout ustawia atrybuty HTML `lang` i `dir` na podstawie lokalizacji, co jest kluczowe dla dostępności i zrozumienia przez wyszukiwarki.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Wstępne generowanie statycznych stron dla wszystkich lokalizacji podczas budowania (SSG)
// To poprawia wydajność i SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // W Next.js App Router, params jest Promise (można użyć await)
  // Pozwala to na asynchroniczne rozwiązywanie dynamicznych segmentów ścieżki
  const { locale } = await params;

  // Kluczowe: setRequestLocale informuje next-intl, której lokalizacji użyć dla tego żądania
  // Bez tego getTranslations() nie będzie wiedzieć, której lokalizacji użyć w komponentach serwerowych
  setRequestLocale(locale);

  // Pobierz kierunek tekstu (LTR/RTL) dla poprawnego renderowania HTML
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Wiadomości są ładowane po stronie serwera. Przekaż tylko to, co jest potrzebne do klienta.
  // Minimalizuje to rozmiar paczki JavaScript wysyłanej do przeglądarki
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Tłumaczenia/formatowanie ściśle po stronie serwera
  // Te funkcje działają po stronie serwera i mogą być przekazywane jako propsy do komponentów
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider udostępnia tłumaczenia komponentom po stronie klienta
    // Przekazuj tylko te przestrzenie nazw, których faktycznie używają Twoje komponenty klienta
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Krok 4: Utwórz pliki tłumaczeń

Utwórz pliki JSON dla każdego locale i namespace. Ta struktura pozwala na logiczne organizowanie tłumaczeń oraz ładowanie tylko tego, co jest potrzebne na każdej stronie.

Organizowanie tłumaczeń według namespace (np. `common.json`, `about.json`) umożliwia dzielenie kodu (code splitting) i zmniejsza rozmiar bundla. Ładujesz tylko tłumaczenia potrzebne dla danej strony, co poprawia wydajność.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Krok 5: Wykorzystaj tłumaczenia na swoich stronach

Utwórz komponent strony, który ładuje tłumaczenia po stronie serwera i przekazuje je zarówno do komponentów serwerowych, jak i klienckich. Zapewnia to, że tłumaczenia są załadowane przed renderowaniem i zapobiega migotaniu treści.

Ładowanie tłumaczeń po stronie serwera poprawia SEO i zapobiega FOUC (Flash of Untranslated Content - migotanie nieprzetłumaczonej treści). Używając `pick` do wysłania tylko wymaganych przestrzeni nazw do klienta, minimalizujemy rozmiar pakietu JavaScript wysyłanego do przeglądarki.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Wiadomości są ładowane po stronie serwera. Przekaż tylko to, co jest potrzebne klientowi.
  // Minimalizuje to pakiet JavaScript wysyłany do przeglądarki
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Tłumaczenia i formatowanie ściśle po stronie serwera
  // Te operacje są wykonywane na serwerze i mogą być przekazane jako propsy do komponentów
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider udostępnia tłumaczenia komponentom klienckim
    // Przekazuj tylko te przestrzenie nazw, których faktycznie używają Twoje komponenty klienckie
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Krok 6: Używanie tłumaczeń w komponentach klienckich

Komponenty klienckie mogą używać hooków `useTranslations` i `useFormatter`, aby uzyskać dostęp do tłumaczeń i funkcji formatowania. Hooki te odczytują dane z kontekstu `NextIntlClientProvider`.

Komponenty klienckie potrzebują hooków React, aby uzyskać dostęp do tłumaczeń. Hooki `useTranslations` i `useFormatter` integrują się bezproblemowo z next-intl i zapewniają reaktywne aktualizacje po zmianie lokalizacji.

> Nie zapomnij dodać wymaganych przestrzeni nazw do komunikatów klienta na stronie (uwzględnij tylko te przestrzenie nazw, których faktycznie potrzebują Twoje komponenty klienckie).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Zakres bezpośrednio do zagnieżdżonego obiektu
  // useTranslations/useFormatter to hooki, które odczytują kontekst NextIntlClientProvider
  // Działają tylko wtedy, gdy komponent jest opakowany w NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### Krok 7: Używanie tłumaczeń w komponentach serwerowych

Komponenty serwerowe nie mogą używać hooków React, dlatego otrzymują tłumaczenia i formatery przez propsy od komponentów nadrzędnych. Takie podejście utrzymuje komponenty serwerowe synchroniczne i pozwala na ich zagnieżdżanie wewnątrz komponentów klienckich.

Komponenty serwerowe, które mogą być zagnieżdżone pod granicami komponentów klienckich, muszą być synchroniczne. Przekazując przetłumaczone ciągi znaków i sformatowane wartości jako propsy, unikamy operacji asynchronicznych i zapewniamy prawidłowe renderowanie. Przetwarzaj tłumaczenia i formatowanie w komponencie nadrzędnym strony.

```tsx fileName="src/components/ServerComponent.tsx"
// Komponenty serwerowe zagnieżdżone wewnątrz komponentów klienckich muszą być synchroniczne
// React nie może serializować funkcji asynchronicznych przez granicę serwer/klient
// Rozwiązanie: przetwarzaj tłumaczenia/formaty w komponencie nadrzędnym i przekazuj jako propsy
type ServerComponentProps = {
  formattedCount: string; // sformatowana liczba
  label: string; // etykieta
  increment: string; // inkrementacja
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> Na swojej stronie/układzie użyj `getTranslations` i `getFormatter` z `next-intl/server`, aby wstępnie obliczyć tłumaczenia i formatowanie, a następnie przekaż je jako propsy do komponentów serwerowych.

---

### (Opcjonalny) Krok 8: Zmień język swojej zawartości

Aby zmienić język swojej zawartości za pomocą next-intl, renderuj linki uwzględniające lokalizację, które wskazują na tę samą ścieżkę, zmieniając jednocześnie lokalizację. Provider automatycznie przepisuje URL-e, więc musisz tylko wskazać aktualną trasę.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Usuń prefiks lokalizacji ze ścieżki, aby uzyskać ścieżkę bazową
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Selektor języka">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Buduje href w zależności od tego, czy jest to domyślny język
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
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Opcjonalny) Krok 9: Użyj lokalizowanego komponentu Link

`next-intl` dostarcza podpakiet `next-intl/navigation`, który zawiera lokalizowany komponent linku automatycznie stosujący aktywną lokalizację. Już wyodrębniliśmy go dla Ciebie w pliku `@/i18n`, więc możesz go użyć w ten sposób:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Opcjonalny) Krok 10: Uzyskaj dostęp do aktywnej lokalizacji w Server Actions

Server Actions mogą odczytać aktualną lokalizację używając `next-intl/server`. Jest to przydatne do wysyłania zlokalizowanych e-maili lub przechowywania preferencji językowych wraz z przesłanymi danymi.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Użyj locale do wyboru szablonów, etykiet analitycznych itp.
  console.log(`Otrzymano formularz kontaktowy z locale ${locale}`);
}
```

> `getLocale` odczytuje locale ustawione przez proxy `next-intl`, więc działa wszędzie na serwerze: w Route Handlers, Server Actions i funkcjach edge.

### (Opcjonalny) Krok 11: Internacjonalizacja metadanych

Tłumaczenie treści jest ważne, ale głównym celem internacjonalizacji jest uczynienie Twojej strony bardziej widoczną dla świata. I18n to niesamowita dźwignia do poprawy widoczności Twojej strony poprzez odpowiednie SEO.

Prawidłowo zinternacjonalizowane metadane pomagają wyszukiwarkom zrozumieć, jakie języki są dostępne na Twoich stronach. Obejmuje to ustawianie meta tagów hreflang, tłumaczenie tytułów i opisów oraz zapewnienie prawidłowego ustawienia kanonicznych URL dla każdego języka.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata działa dla każdego języka, generując metadane przyjazne SEO
// To pomaga wyszukiwarkom zrozumieć alternatywne wersje językowe
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Reszta kodu strony
```

### (Opcjonalny) Krok 12: Internacjonalizacja Twojej mapy witryny

Wygeneruj mapę witryny, która zawiera wszystkie wersje językowe Twoich stron. Pomaga to wyszukiwarkom odnaleźć i zaindeksować wszystkie wersje językowe Twoich treści.

Prawidłowo zinternacjonalizowana mapa witryny zapewnia, że wyszukiwarki mogą znaleźć i zaindeksować wszystkie wersje językowe Twoich stron. Poprawia to widoczność w międzynarodowych wynikach wyszukiwania.

```tsx fileName="src/app/sitemap.ts"
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

### (Opcjonalny) Krok 13: Internacjonalizacja pliku robots.txt

Utwórz plik robots.txt, który prawidłowo obsługuje wszystkie wersje językowe Twoich chronionych ścieżek. Zapewnia to, że wyszukiwarki nie będą indeksować stron admina ani panelu w żadnym języku.

Prawidłowa konfiguracja robots.txt dla wszystkich lokalizacji zapobiega indeksowaniu przez wyszukiwarki wrażliwych stron, gdy Twoje ścieżki różnią się dla każdej lokalizacji.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Generowanie ścieżek dla wszystkich lokalizacji (np. /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (Opcjonalny) Krok 14: Skonfiguruj Proxy dla trasowania lokalizacji

Utwórz proxy, które automatycznie wykryje preferowaną lokalizację użytkownika i przekieruje go na odpowiedni adres URL z prefiksem lokalizacji. next-intl dostarcza wygodną funkcję proxy, która obsługuje to automatycznie.

Proxy zapewnia, że użytkownicy są automatycznie przekierowywani do preferowanego języka podczas odwiedzania Twojej strony. Zapisuje również preferencje użytkownika na przyszłe wizyty, poprawiając doświadczenie użytkownika.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware działa przed trasami, obsługując wykrywanie i trasowanie lokalizacji
// localeDetection: true używa nagłówka Accept-Language do automatycznego wykrywania lokalizacji
export default proxy;

export const config = {
  // Pomija API, wewnętrzne elementy Next oraz zasoby statyczne
  // Regex: dopasowuje wszystkie trasy z wyjątkiem tych zaczynających się od api, _next lub zawierających kropkę (pliki)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Opcjonalny) Krok 15: Skonfiguruj typy TypeScript dla lokalizacji

Konfiguracja TypeScript pomoże Ci uzyskać autouzupełnianie i bezpieczeństwo typów dla Twoich kluczy.

W tym celu możesz utworzyć plik global.ts w katalogu głównym projektu i dodać następujący kod:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Przyszłe pliki JSON również powinny być tutaj dodane
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Ten kod użyje Module Augmentation, aby dodać locales i messages do typu AppConfig w next-intl.

### (Opcjonalny) Krok 15: Automatyzuj swoje tłumaczenia za pomocą Intlayer

Intlayer to **bezpłatna** i **otwartoźródłowa** biblioteka zaprojektowana, aby wspierać proces lokalizacji w Twojej aplikacji. Podczas gdy next-intl zajmuje się ładowaniem i zarządzaniem tłumaczeniami, Intlayer pomaga zautomatyzować przepływ pracy związany z tłumaczeniami.

Ręczne zarządzanie tłumaczeniami może być czasochłonne i podatne na błędy. Intlayer automatyzuje testowanie, generowanie i zarządzanie tłumaczeniami, oszczędzając Twój czas i zapewniając spójność w całej aplikacji.

Intlayer pozwala Ci na:

- **Deklarowanie treści tam, gdzie chcesz w swojej bazie kodu**
  Intlayer pozwala deklarować treści tam, gdzie chcesz w swojej bazie kodu, używając plików `.content.{ts|js|json}`. Umożliwi to lepszą organizację treści, zapewniając lepszą czytelność i łatwiejszą konserwację kodu.

- **Testowanie brakujących tłumaczeń**
  Intlayer dostarcza funkcje testowe, które można zintegrować z Twoim pipeline CI/CD lub testami jednostkowymi. Dowiedz się więcej o [testowaniu tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).

- **Automatyzuj swoje tłumaczenia**,
  Intlayer oferuje CLI oraz rozszerzenie do VSCode do automatyzacji tłumaczeń. Może być zintegrowany z pipeline CI/CD. Dowiedz się więcej o [automatyzacji tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
  Możesz używać **własnego klucza API oraz wybranego dostawcy AI**. Zapewnia również tłumaczenia uwzględniające kontekst, zobacz [wypełnianie treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md).

- **Połącz zewnętrzne treści**
  Intlayer pozwala na połączenie Twoich treści z zewnętrznym systemem zarządzania treścią (CMS). Aby pobierać je w zoptymalizowany sposób i wstawiać do Twoich zasobów JSON. Dowiedz się więcej o [pobieraniu zewnętrznych treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md).

- **Edytor wizualny**
  Intlayer oferuje darmowy edytor wizualny do edycji Twoich treści za pomocą edytora wizualnego. Dowiedz się więcej o [wizualnej edycji Twoich tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

I więcej. Aby odkryć wszystkie funkcje oferowane przez Intlayer, prosimy zapoznać się z dokumentacją [Zainteresowanie Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).
