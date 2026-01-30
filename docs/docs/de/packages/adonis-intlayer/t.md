---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t-Funktion Dokumentation | adonis-intlayer
description: Sehen Sie, wie Sie die t-Funktion für das adonis-intlayer-Paket verwenden
keywords:
  - t
  - Übersetzung
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initiale Dokumentation
---

# Dokumentation: `t`-Funktion in `adonis-intlayer`

Die `t`-Funktion im Paket `adonis-intlayer` ist das Kernwerkzeug zur Bereitstellung lokalisierter Antworten in Ihrer AdonisJS-Anwendung. Sie vereinfacht die Internationalisierung (i18n), indem sie Inhalte dynamisch basierend auf der bevorzugten Sprache des Benutzers auswählt.

---

## Übersicht

Die `t`-Funktion wird verwendet, um Übersetzungen für einen bestimmten Satz von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die geeignete Sprache für die Rückgabe basierend auf den Anfrageeinstellungen des Clients, wie dem `Accept-Language`-Header. Wenn die bevorzugte Sprache nicht verfügbar ist, fällt sie elegant auf die in Ihrer Konfiguration angegebene Standard-Locale zurück.

---

## Hauptmerkmale

- **Dynamische Lokalisierung**: Wählt automatisch die am besten geeignete Übersetzung für den Client aus.
- **Fallback auf Standard-Locale**: Fällt auf eine Standard-Locale zurück, wenn die bevorzugte Sprache des Clients nicht verfügbar ist, um die Kontinuität des Benutzererlebnisses zu gewährleisten.
- **Asynchroner Kontext**: Arbeitet nahtlos innerhalb des AdonisJS-Anfrage-Lebenszyklus unter Verwendung von Async Local Storage.
- **TypeScript-Unterstützung**: Erzwingen Sie Typsicherheit für Ihre Übersetzungen.

---

## Funktionssignatur

```typescript
t(translations: Record<string, any>): any;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Locale-Codes sind (z. B. `en`, `fr`, `es`) und die Werte die entsprechenden übersetzten Inhalte.

### Rückgabewerte

- Der Inhalt, der die bevorzugte Sprache des Clients repräsentiert.

---

## Laden der Middleware

Um sicherzustellen, dass die `t`-Funktion korrekt funktioniert, **müssen** Sie die `intlayer`-Middleware in Ihrer AdonisJS-Anwendung registrieren.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Anwendungsbeispiele

### Basispiel

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue !",
    es: "¡Bienvenido!",
  });
});
```

### Verwendung in Controllern

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour vom Controller",
      })
    );
  }
}
```

---

## Fortgeschrittene Themen

### Fallback-Mechanismus

Wenn eine bevorzugte Locale nicht verfügbar ist, fällt die `t`-Funktion auf die in Ihrer `intlayer.config.ts` definierte Standard-Locale zurück.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript-Integration

Die `t`-Funktion ist typsicher, wenn sie mit definierten Wörterbüchern verwendet wird. Weitere Details finden Sie in der [TypeScript-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).
