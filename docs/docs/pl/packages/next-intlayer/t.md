---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji t | next-intlayer
description: Zobacz, jak używać funkcji t w pakiecie next-intlayer
keywords:
  - t
  - tłumaczenie
  - Intlayer
  - next-intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `t` w `next-intlayer`

Funkcja `t` w pakiecie `next-intlayer` jest podstawowym narzędziem do inline'owej internacjonalizacji w Twojej aplikacji Next.js. Pozwala na definiowanie tłumaczeń bezpośrednio w komponentach, co ułatwia wyświetlanie lokalizowanych treści w zależności od aktualnej lokalizacji.

---

## Przegląd

Funkcja `t` służy do dostarczania tłumaczeń dla różnych lokalizacji bezpośrednio w Twoich komponentach. Przekazując obiekt zawierający tłumaczenia dla każdej obsługiwanej lokalizacji, `t` zwraca odpowiednie tłumaczenie na podstawie aktualnego kontekstu lokalizacji w Twojej aplikacji Next.js.

---

## Kluczowe funkcje

- **Tłumaczenia inline**: Idealne do szybkiego, inline'owego tekstu, który nie wymaga oddzielnej deklaracji treści.
- **Automatyczny wybór lokalizacji**: Automatycznie zwraca tłumaczenie odpowiadające aktualnej lokalizacji.
- **Wsparcie TypeScript**: Zapewnia bezpieczeństwo typów i autouzupełnianie podczas używania z TypeScript.
- **Łatwa integracja**: Działa bezproblemowo zarówno w komponentach klienta, jak i serwera w Next.js.

---

## Sygnatura funkcji

```typescript
typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametry

- `translations`: Obiekt, w którym kluczami są kody lokalizacji (np. `en`, `fr`, `es`), a wartościami odpowiadające im przetłumaczone ciągi znaków.

### Zwraca

- Ciąg znaków reprezentujący przetłumaczoną treść dla aktualnej lokalizacji.

---

## Przykłady użycia

### Użycie `t` w komponencie klienta

Upewnij się, że na początku pliku komponentu umieścisz dyrektywę `'use client';` podczas korzystania z `t` w komponencie po stronie klienta.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Używanie `t` w komponencie serwerowym

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Tłumaczenia inline w atrybutach

Funkcja `t` jest szczególnie przydatna do tłumaczeń inline w atrybutach JSX.
Podczas lokalizacji atrybutów takich jak `alt`, `title`, `href` czy `aria-label`, możesz użyć `t` bezpośrednio w atrybucie.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Zaawansowane tematy

### Integracja z TypeScript

Funkcja `t` jest bezpieczna typowo podczas użycia z TypeScript, zapewniając, że wszystkie wymagane lokalizacje są dostarczone.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Wykrywanie lokalizacji i kontekst

W `next-intlayer` bieżąca lokalizacja jest zarządzana przez dostawców kontekstu: `IntlayerClientProvider` oraz `IntlayerServerProvider`. Upewnij się, że ci dostawcy otaczają twoje komponenty, a właściwość `locale` jest poprawnie przekazywana.

#### Przykład:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Twoje komponenty tutaj */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Twoje komponenty tutaj */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Twoje komponenty tutaj */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Częste błędy i rozwiązywanie problemów

### `t` zwraca undefined lub niepoprawne tłumaczenie

- **Przyczyna**: Bieżący locale nie jest poprawnie ustawiony lub brakuje tłumaczenia dla bieżącego locale.
- **Rozwiązanie**:
  - Sprawdź, czy `IntlayerClientProvider` lub `IntlayerServerProvider` jest poprawnie skonfigurowany z odpowiednim `locale`.
- Upewnij się, że obiekt tłumaczeń zawiera wszystkie niezbędne locale.

### Brakujące tłumaczenia w TypeScript

- **Przyczyna**: Obiekt tłumaczeń nie spełnia wymagań dotyczących wszystkich locale, co prowadzi do błędów TypeScript.
- **Rozwiązanie**: Użyj typu `IConfigLocales`, aby wymusić kompletność tłumaczeń.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript [!code error]
};

const text = t(translations);
```

---

## Wskazówki dotyczące efektywnego użycia

1. **Używaj `t` do prostych tłumaczeń inline**: Idealne do tłumaczenia krótkich fragmentów tekstu bezpośrednio w komponentach.
2. **Preferuj `useIntlayer` do strukturalnej zawartości**: Do bardziej złożonych tłumaczeń i ponownego wykorzystania treści definiuj zawartość w plikach deklaracji i używaj `useIntlayer`.
3. **Zapewnij spójne dostarczanie locale**: Upewnij się, że locale jest konsekwentnie dostarczane w całej aplikacji za pomocą odpowiednich providerów.
4. **Wykorzystaj TypeScript**: Używaj typów TypeScript, aby wychwycić brakujące tłumaczenia i zapewnić bezpieczeństwo typów.

---

## Podsumowanie

Funkcja `t` w `next-intlayer` to potężne i wygodne narzędzie do zarządzania tłumaczeniami inline w aplikacjach Next.js. Poprzez efektywną integrację zwiększasz możliwości internacjonalizacji swojej aplikacji, zapewniając lepsze doświadczenia użytkownikom na całym świecie.

Aby uzyskać bardziej szczegółowe informacje o użytkowaniu i zaawansowanych funkcjach, zapoznaj się z [dokumentacją next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

---

**Uwaga**: Pamiętaj, aby poprawnie skonfigurować `IntlayerClientProvider` oraz `IntlayerServerProvider`, aby bieżące locale było prawidłowo przekazywane do Twoich komponentów. Jest to kluczowe, aby funkcja `t` zwracała poprawne tłumaczenia.
