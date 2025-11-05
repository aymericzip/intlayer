---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji t | react-intlayer
description: Zobacz, jak używać funkcji t w pakiecie react-intlayer
keywords:
  - t
  - tłumaczenie
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `t` w `react-intlayer`

Funkcja `t` w pakiecie `react-intlayer` jest podstawowym narzędziem do inline internacjonalizacji w Twojej aplikacji React. Pozwala na definiowanie tłumaczeń bezpośrednio w komponentach, co ułatwia wyświetlanie zlokalizowanych treści w zależności od aktualnej lokalizacji.

---

## Przegląd

Funkcja `t` służy do dostarczania tłumaczeń dla różnych lokalizacji bezpośrednio w Twoich komponentach. Przekazując obiekt zawierający tłumaczenia dla każdej obsługiwanej lokalizacji, `t` zwraca odpowiednie tłumaczenie na podstawie bieżącego kontekstu lokalizacji w Twojej aplikacji React.

---

## Kluczowe funkcje

- **Tłumaczenia inline**: Idealne do szybkiego, wbudowanego tekstu, który nie wymaga osobnej deklaracji treści.
- **Automatyczny wybór lokalizacji**: Automatycznie zwraca tłumaczenie odpowiadające bieżącej lokalizacji.
- **Wsparcie TypeScript**: Zapewnia bezpieczeństwo typów i autouzupełnianie podczas używania z TypeScript.
- **Łatwa integracja**: Działa bezproblemowo w komponentach React.

---

## Sygnatura funkcji

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parametry

- `translations`: Obiekt, w którym kluczami są kody lokalizacji (np. `en`, `fr`, `es`), a wartościami odpowiadające im przetłumaczone ciągi znaków.

### Zwraca

- Ciąg znaków reprezentujący przetłumaczoną zawartość dla bieżącej lokalizacji.

---

## Przykłady użycia

### Podstawowe użycie `t` w komponencie

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Tłumaczenia w atrybutach inline

Funkcja `t` jest szczególnie przydatna do tłumaczeń inline w atrybutach JSX. Podczas lokalizacji atrybutów takich jak `alt`, `title`, `href` czy `aria-label`, możesz użyć `t` bezpośrednio w atrybucie.

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

Funkcja `t` jest bezpieczna typowo podczas używania z TypeScript, zapewniając, że wszystkie wymagane lokalizacje są dostarczone.

```typescript codeFormat="typescript"
typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Wykrywanie lokalizacji i kontekst

W `react-intlayer` bieżący locale jest zarządzany przez `IntlayerProvider`. Upewnij się, że ten provider otacza Twoje komponenty i że właściwość `locale` jest poprawnie przekazywana.

#### Przykład:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Twoje komponenty tutaj */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Twoje komponenty tutaj */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Twoje komponenty tutaj */}
  </IntlayerProvider>
);
```

---

## Najczęstsze błędy i rozwiązywanie problemów

### `t` zwraca undefined lub niepoprawne tłumaczenie

- **Przyczyna**: Bieżący locale nie jest poprawnie ustawiony lub brakuje tłumaczenia dla bieżącego locale.
- **Rozwiązanie**:
  - Sprawdź, czy `IntlayerProvider` jest poprawnie skonfigurowany z odpowiednim `locale`.
  - Upewnij się, że obiekt tłumaczeń zawiera wszystkie niezbędne locale.

### Brakujące tłumaczenia w TypeScript

- **Przyczyna**: Obiekt tłumaczeń nie spełnia wymagań dotyczących wszystkich locale, co powoduje błędy TypeScript.
- **Rozwiązanie**: Użyj typu `IConfigLocales`, aby wymusić kompletność tłumaczeń.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Brak 'es' spowoduje błąd TypeScript
};

const text = t(translations);
```

---

## Wskazówki dotyczące efektywnego użycia

1. **Używaj `t` do prostych tłumaczeń inline**: Idealne do tłumaczenia krótkich fragmentów tekstu bezpośrednio w komponentach.
2. **Preferuj `useIntlayer` do treści strukturalnych**: Dla bardziej złożonych tłumaczeń i ponownego użycia treści, definiuj zawartość w plikach deklaracji i korzystaj z `useIntlayer`.
3. **Zapewnij spójne dostarczanie locale**: Upewnij się, że locale jest konsekwentnie dostarczane w całej aplikacji za pomocą `IntlayerProvider`.
4. **Wykorzystaj TypeScript**: Używaj typów TypeScript, aby wykrywać brakujące tłumaczenia i zapewnić bezpieczeństwo typów.

---

## Podsumowanie

Funkcja `t` w `react-intlayer` to potężne i wygodne narzędzie do zarządzania tłumaczeniami inline w Twoich aplikacjach React. Poprzez jej efektywną integrację zwiększasz możliwości internacjonalizacji swojej aplikacji, zapewniając lepsze doświadczenia użytkownikom na całym świecie.

Aby uzyskać bardziej szczegółowe informacje dotyczące użytkowania i zaawansowanych funkcji, zapoznaj się z [dokumentacją react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

---

**Uwaga**: Pamiętaj, aby odpowiednio skonfigurować `IntlayerProvider`, aby bieżące locale było poprawnie przekazywane do Twoich komponentów. Jest to kluczowe, aby funkcja `t` zwracała właściwe tłumaczenia.
