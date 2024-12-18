# Dokumentation: `getHTMLTextDir` Funktion in `intlayer`

## Beschreibung:

Die `getHTMLTextDir` Funktion bestimmt die Textausrichtungsrichtung (`ltr`, `rtl` oder `auto`) basierend auf der angegebenen Locale. Sie wurde entwickelt, um Entwicklern zu helfen, das `dir` Attribut in HTML für eine ordnungsgemäße Textdarstellung einzustellen.

## Parameter:

- `locale?: Locales`

  - **Beschreibung**: Der Locale-String (z.B. `Locales.ENGLISH`, `Locales.ARABIC`), der verwendet wird, um die Textausrichtungsrichtung zu bestimmen.
  - **Typ**: `Locales` (optional)

## Rückgabewert:

- **Typ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Beschreibung**: Die Textausrichtungsrichtung entsprechend der Locale:
  - `'ltr'` für von links nach rechts ausgerichtete Sprachen.
  - `'rtl'` für von rechts nach links ausgerichtete Sprachen.
  - `'auto'`, wenn die Locale nicht erkannt wird.

## Beispielverwendung:

### Bestimmung der Textausrichtungsrichtung:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.FRENCH); // Ausgabe: "ltr"
getHTMLTextDir(Locales.ARABIC); // Ausgabe: "rtl"
```

## Randfälle:

- **Keine Locale bereitgestellt:**

  - Die Funktion gibt `'auto'` zurück, wenn `locale` `undefined` ist.

- **Nicht erkannte Locale:**
  - Für nicht erkannte Locales standardisiert die Funktion auf `'auto'`.

## Verwendung in Komponenten:

Die `getHTMLTextDir` Funktion kann verwendet werden, um das `dir` Attribut in einem HTML-Dokument dynamisch einzustellen, um eine ordnungsgemäße Textdarstellung basierend auf der Locale zu gewährleisten.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Im obigen Beispiel wird das `dir` Attribut dynamisch basierend auf der Locale eingestellt.
