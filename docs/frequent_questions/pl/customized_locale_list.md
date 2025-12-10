---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Jak dostosować listę lokalizacji?
description: Dowiedz się, jak dostosować listę lokalizacji.
keywords:
  - lokalizacje
  - lista
  - intlayer
  - konfiguracja
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - lokalizacja
  - lista
slugs:
  - frequent-questions
  - customized-locale-list
---

# Czy można zablokować typ języka, na przykład angielski? Dodaję angielski do moich słowników, ale nie chcę, aby angielski był jeszcze dostępny na stronie internetowej

Tak, możesz zablokować typ języka, na przykład angielski, używając opcji `availableLocales` w konfiguracji Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

lub

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Ta konfiguracja zmieni typy Twojej funkcji `t()`, aby uwzględniały tylko dostępne lokalizacje.

Opcja availableLocales jest opcjonalna, jeśli jej nie podasz, wszystkie lokalizacje będą dostępne.

Uważaj, wszystkie lokalizacje uwzględnione w opcji `availableLocales` powinny być zawarte w opcji `locales`.

Zauważ, że jeśli używasz hooka `useLocale`, opcja `availableLocales` będzie używana do ustawienia dostępu do listy lokalizacji.

```ts
import { useLocale } from "react-intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
