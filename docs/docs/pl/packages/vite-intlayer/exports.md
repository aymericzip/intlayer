---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: Dokumentacja pakietu vite-intlayer
description: Wtyczka Vite dla Intlayer, dostarczająca aliasy słowników i obserwatory.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Zaktualizowano indeks eksportów – proxy i compiler są teraz dołączone do intlayer(); dodano dokumentację intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet vite-intlayer

Pakiet `vite-intlayer` dostarcza wtyczkę Vite do integracji Intlayer z Twoją aplikacją opartą na Vite.

## Instalacja

```bash
npm install vite-intlayer
```

## Eksporty

### Wtyczka

Import:

```tsx
import "vite-intlayer";
```

| Funkcja                    | Opis                                                                                                                                                            | Powiązana dokumentacja                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Główny plugin Vite. Przygotowuje słowniki, konfiguruje aliasy, uruchamia obserwatorów serwera deweloperskiego i (od v9) dołącza proxy oraz kompilator.          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Przestarzałe**) Alias dla `intlayer`.                                                                                                                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Przestarzałe**) Alias dla `intlayer`.                                                                                                                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Wtyczka middleware routingu regionalnego (wykrywanie, przekierowanie, przepisywanie). Od v9 włączona do `intlayer()` – rejestruj osobno tylko w razie potrzeby. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Przestarzałe**) Alias dla `intlayerProxy`.                                                                                                                   | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Przestarzałe**) Alias dla `intlayerProxy`.                                                                                                                   | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Wyodrębnia deklaracje treści inline z komponentów i zapisuje je w słownikach. Od v9 włączona do `intlayer()`.                                                   | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Usuwa nieużywane pola słownika z pakietu produkcyjnego za pomocą tree-shakingu.                                                                                 | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifikuje skompilowane pliki JSON słowników i opcjonalnie zniekształca nazwy pól.                                                                              | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerMinify.md)     |

### Narzędzia

| Export                       | Opis                                                                                                                | Powiązana dokumentacja                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Zwraca niezależne od framework'u oprogramowanie Node.js `(req, res, next)` middleware z logiką routowania locale'i. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerProxy.md) |

### Typy

| Export                       | Opis                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Opcje akceptowane przez `intlayer()`. Rozszerza `GetConfigurationOptions` o `compatCallers` i `proxy`.          |
| `IntlayerProxyPluginOptions` | Opcje akceptowane przez `intlayerProxy()` i `createIntlayerProxyHandler()`. Zawiera `ignore` i `configOptions`. |
| `IntlayerCompilerOptions`    | Opcje akceptowane przez `intlayerCompiler()`. Zawiera `configOptions` i `compilerConfig`.                       |
| `CompatCallerConfig`         | Re-export z `@intlayer/babel`. Opisuje wzorzec compat-adapter caller do analizy użycia pól.                     |
