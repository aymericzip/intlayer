---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: react-i18n vs react-intl vs Intlayer
description: Integrieren Sie react-i18next mit next-intl und Intlayer für die Internationalisierung (i18n) einer React-App
keywords:
  - next-intl
  - react-i18next
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - react-i18next-vs-react-intl-vs-intlayer
---

# React-Intl VS React-i18next VS Intlayer | React Internationalisierung (i18n)

Nachfolgend finden Sie einen prägnanten Vergleich von drei beliebten i18n (Internationalisierungs-) Bibliotheken für React: **React-Intl**, **React-i18next** und **Intlayer**. Jede Bibliothek bietet einzigartige Funktionen und Arbeitsabläufe zur Integration von mehrsprachiger Unterstützung in Ihre React-Anwendung. Nach dem Lesen sollten Sie in der Lage sein zu entscheiden, welche Lösung am besten zu Ihren Bedürfnissen passt.

---

## 1. Einführung

Internationalisierung (i18n) in React-Anwendungen kann auf verschiedene Weisen erreicht werden. Die drei hier vorgestellten Bibliotheken haben unterschiedliche Entwurfsphilosophien, Funktionen und Community-Unterstützung:

1. **React-Intl**
2. **React-i18next**
3. **Intlayer**

Unten finden Sie eine Übersicht über jede Lösung, gefolgt von einem Funktionsvergleich, Vor- und Nachteilen sowie Anwendungsbeispielen.

---

## 2. React-Intl

### Übersicht

[**React-Intl**](https://formatjs.io/docs/react-intl/) ist Teil der [FormatJS](https://formatjs.io/) Suite. Es bietet eine leistungsstarke Reihe von **APIs und Komponenten**, um die Nachrichtenformatierung, Pluralisierung, Datums-/Zeitformatierung und Zahlenformatierung zu verwalten. React-Intl wird häufig in Unternehmensanwendungen verwendet, hauptsächlich weil es Teil eines Ökosystems ist, das die Syntax und Formatierung von Nachrichten standardisiert.

### Hauptmerkmale

- **ICU-Nachrichtensyntax**: Bietet eine umfassende Syntax für die Nachrichteninterpolation, Pluralisierung und mehr.
- **Lokalisierte Formatierung**: Eingebaute Dienstprogramme zur Formatierung von Daten, Zeiten, Zahlen und relativen Zeiten basierend auf der Lokalisierung.
- **Deklarative Komponenten**: Stellt `<FormattedMessage>`, `<FormattedNumber>`, `<FormattedDate>` usw. für eine nahtlose Verwendung in JSX zur Verfügung.
- **Reiches Ökosystem**: Integriert sich gut mit den FormatJS-Tools (z. B. [babel-plugin-react-intl](https://formatjs.io/docs/tooling/babel-plugin/)) zum Extrahieren, Verwalten und Kompilieren von Nachrichten.

### Typischer Arbeitsablauf

1. **Definieren Sie Nachrichtenkataloge** (normalerweise JSON-Dateien pro Lokalisierung).
2. **Wickeln Sie Ihre App** in `<IntlProvider locale="de" messages={messages}>`.
3. **Verwenden Sie** `<FormattedMessage id="myMessage" defaultMessage="Hallo Welt" />` oder den `useIntl()` Hook, um auf Übersetzungsstrings zuzugreifen.

### Vorteile

- Gut etabliert und wird in vielen Produktionsumgebungen eingesetzt.
- Fortschrittliche Nachrichtenformatierung, einschließlich Pluralisierung, Geschlecht, Zeitzonen und mehr.
- Starke Unterstützung durch Werkzeuge zur Extraktion und Kompilierung von Nachrichten.

### Nachteile

- Erfordert Vertrautheit mit dem **ICU-Nachrichtenformat**, das ausführlich sein kann.
- Es ist nicht so einfach, dynamische oder komplexe Übersetzungen zu handhaben, die mehr als nur stringbasiert sind.

---

## 3. React-i18next

### Übersicht

[**React-i18next**](https://react.i18next.com/) ist eine React-Erweiterung von [i18next](https://www.i18next.com/), einem der beliebtesten JavaScript-i18n-Frameworks. Es bietet **umfangreiche Funktionen** für Laufzeitübersetzungen, Lazy Loading und Spracherkennung, was es extrem flexibel für eine Vielzahl von Anwendungsfällen macht.

### Hauptmerkmale

- **Flexible Übersetzungsstruktur**: Nicht an ein einzelnes Format wie ICU gebunden. Sie können Übersetzungen in JSON speichern, Interpolation, Pluralisierung usw. verwenden.
- **Dynamischer Sprachwechsel**: Eingebaute Sprachdetektor-Plugins und Laufzeitaktualisierungen.
- **Verschachtelte & strukturierte Übersetzungen**: Sie können Übersetzungen leicht innerhalb von JSON verschachteln.
- **Umfangreiches Plugin-Ökosystem**: Für Erkennung (Browser, Pfad, Subdomain usw.), Ressourcenladen, Caching und mehr.

### Typischer Arbeitsablauf

1. **Installieren Sie `i18next` & `react-i18next`.**
2. **Konfigurieren Sie i18n**, um Übersetzungen zu laden (JSON) und die Spracherkennung oder Fallbacks einzurichten.
3. **Wickeln Sie Ihre App** in `I18nextProvider`.
4. **Verwenden Sie den `useTranslation()` Hook** oder die `<Trans>`-Komponente, um Übersetzungen anzuzeigen.

### Vorteile

- Sehr **flexibel** und funktionsreich.
- Sehr aktive Community und großes Ökosystem von Plugins.
- Einfachheit des **dynamischen Ladens** von Übersetzungen (z. B. von einem Server, nach Bedarf).

### Nachteile

- **Konfiguration kann ausführlich sein**, insbesondere wenn Sie fortschrittlichere Bedürfnisse haben.
- Wenn Sie stark typisierte Übersetzungen bevorzugen, benötigen Sie möglicherweise zusätzliche TypeScript-Konfigurationen.

---

## 4. Intlayer

### Übersicht

[**Intlayer**](https://github.com/aymericzip/intlayer) ist eine neuere, Open-Source-i18n-Bibliothek, die sich auf **komponentenbasierte Inhaltsdeklarationen**, Typsicherheit und **dynamisches Routing** konzentriert. Sie ist für moderne React-Arbeitsabläufe konzipiert und unterstützt sowohl **Create React App** als auch **Vite**-Setups. Außerdem sind fortschrittliche Funktionen wie **lokalisierte Routen** und **automatisch generierte TypeScript-Typen** für Übersetzungen enthalten.

### Hauptmerkmale

- **Deklarative Inhaltsdateien**: Jede Komponente oder jedes Modul kann seine Übersetzungen in eigenen `.content.tsx` oder `.content.json`-Dateien deklarieren, um den Inhalt in der Nähe der Nutzung zu halten.
- **Eingebaute Routen & Middleware**: Optionale Module für lokalisiertes Routing (z. B. `/de/about`, `/fr/about`) und Server-Middleware zur Erkennung der Benutzersprache.
- **Automatisch generierte TypeScript-Typen**: Sicherstellt Typsicherheit mit Funktionen wie Autovervollständigung und Compile-Time-Fehlererkennung.
- **Dynamische & reiche Übersetzungen**: Können JSX/TSX in Übersetzungen für komplexere Anwendungsfälle (z. B. Links, kursiven Text, Icons in Übersetzungen) einbeziehen.

### Typischer Arbeitsablauf

1. **Installieren Sie `intlayer` und `react-intlayer`.**
2. **Erstellen Sie `intlayer.config.ts`**, um verfügbare Sprachen und die Standard-Sprache zu definieren.
3. **Verwenden Sie die Intlayer CLI** oder das Plugin, um **Inhaltsdeklarationen zu transpilen**.
4. **Wickeln Sie Ihre App** in `<IntlayerProvider>` und rufen Sie Inhalte mit `useIntlayer("keyName")` ab.

### Vorteile

- **TypeScript-freundlich** mit integrierter Typerzeugung und Fehlerüberprüfung.
- **Reicher Inhalt** möglich (z. B. Übergeben von React-Knoten als Übersetzungen).
- **Lokalisierte Routen** sofort einsatzbereit.
- Integriert mit beliebten Build-Tools (CRA, Vite) für eine einfache Einrichtung.

### Nachteile

- Noch **relativ neu** im Vergleich zu React-Intl oder React-i18next.
- Schwerer Fokus auf den Ansatz der „komponentenbasierten Inhaltsdeklaration“ – kann eine Abweichung von typischen .json-Katalogen sein.
- Kleinere Ökosystem und Community im Vergleich zu den etablierten Bibliotheken.

---

## 5. Funktionsvergleich

| **Funktion**                      | **React-Intl**                                                                           | **React-i18next**                                                                                                   | **Intlayer**                                                                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primärer Anwendungsfall**       | Stringbasierte Übersetzungen, Daten-/Zahlenformatierung, ICU-Nachrichtensyntax           | Vollwertige i18n mit einfachem dynamischem Wechsel, Verschachtelung, Plugin-Ökosystem                               | Typensichere Übersetzungen mit Fokus auf deklarativen Inhalt, lokalisierten Routen & optionaler Server-Middleware                                           |
| **Ansatz**                        | Nutzung von `<IntlProvider>` & FormatJS-Nachrichtenkomponenten                           | Nutzung von `I18nextProvider` & `useTranslation()`-Hook                                                             | Nutzung von `<IntlayerProvider>` & `useIntlayer()`-Hook mit Inhaltsdeklarationen                                                                            |
| **Lokalisierungsformat**          | ICU-basierte Strings (JSON oder JavaScript-Kataloge)                                     | JSON-Ressourcendateien (oder benutzerdefinierte Loader). ICU-Format optional über i18next-Plugin                    | `.content.[ts/js/tsx]` oder JSON-Deklarationen; kann Strings oder React-Komponenten enthalten                                                               |
| **Routing**                       | Extern behandelt (kein integriertes lokales Routing)                                     | Extern mit i18next-Plugins (Pfad-, Subdomainerkennung usw.)                                                         | Eingebaute Unterstützung für lokales Routing (z. B. `/de/about`, `/fr/about`), plus optionale Server-Middleware (für SSR/Vite)                              |
| **TypeScript Unterstützung**      | Gut (Typisierung für offizielle Pakete)                                                  | Gut, aber zusätzliche Konfiguration für typisierte Übersetzungen, wenn Sie strenge Überprüfungen wünschen           | Hervorragend (automatisch generierte Typdefinitionen für Inhaltsschlüssel und Übersetzungen)                                                                |
| **Pluralisierung & Formatierung** | Fortgeschritten: Eingebaute Daten-/Zahlenformatierung, Plural-/ Geschlechtsunterstützung | Konfigurierbare Pluralisierung. Datums-/Zeitformatierung in der Regel über externe Bibliotheken oder i18next-Plugin | Kann auf Standard-JavaScript-Intl angewiesen sein oder Logik in den Inhalten einbetten. Nicht so spezialisiert wie FormatJS, behandelt aber typische Fälle. |
| **Community & Ökosystem**         | Groß, Teil des FormatJS-Ökosystems                                                       | Sehr groß, sehr aktiv, viele Plugins (Erkennung, Caching, Frameworks)                                               | Kleiner, aber wachsend; Open Source, moderner Ansatz                                                                                                        |
| **Lernkurve**                     | Mäßig (Lernen der ICU-Nachrichtensyntax, FormatJS-Konventionen)                          | Niedrig bis mäßig (gerade Nutzung, aber fortschrittliche Konfiguration kann ausführlich werden)                     | Mäßig (Konzept der Inhaltsdeklarationen und spezialisierte Build-Schritte)                                                                                  |

---

## 6. Wann man jede wählen sollte

1. **React-Intl**

   - Sie benötigen **leistungsstarkes Formatieren** für Daten/Zeit/Zahlen und starke **ICU-Nachrichtensyntax**.
   - Sie bevorzugen einen „**standardsbasierten**“ Ansatz für Übersetzungen.
   - Sie benötigen kein lokales Routing oder stark typisierte Übersetzungsschlüssel.

2. **React-i18next**

   - Sie benötigen eine **flexible, etablierte** Lösung mit **dynamischer** und **on-demand** Übersetzungsbeladung.
   - Sie möchten **pluginbasierte** Sprachenerkennung (z. B. von URL, Cookies, lokalem Speicher) oder fortschrittliches Caching.
   - Sie benötigen das größte Ökosystem, mit vielen bestehenden Integrationen für verschiedene Frameworks (Next.js, React Native usw.).

3. **Intlayer**
   - Sie möchten eine **starke TypeScript**-Integration mit _automatisch generierten Typen_, um sicherzustellen, dass Sie in der Regel keinen Übersetzungsschlüssel übersehen.
   - Sie bevorzugen **deklarative Inhalte** nahe der Komponente, möglicherweise mit React-Knoten oder fortgeschrittener Logik in Übersetzungen.
   - Sie benötigen **eingebaute lokalisiertes Routing** oder möchten es einfach in Ihr SSR oder Vite-Setup integrieren.
   - Sie wünschen sich einen modernen Ansatz oder möchten einfach eine einzige Bibliothek, die sowohl **Inhaltsverwaltung** (i18n) als auch **Routing** auf eine typsichere Weise abdeckt.

---

## 7. Fazit

Jede Bibliothek bietet eine robuste Lösung zur Internationalisierung einer React-Anwendung:

- **React-Intl** ist hervorragend in der Nachrichtenformatierung und eine beliebte Wahl für Unternehmenslösungen, die auf ICU-Nachrichtensyntax fokussiert sind.
- **React-i18next** bietet eine hochflexible, plugin-gesteuerte Umgebung für fortschrittliche oder dynamische i18n-Bedürfnisse.
- **Intlayer** bietet einen **modernen, stark typisierten** Ansatz, der Inhaltsdeklarationen, fortgeschrittenes lokalisierte Routing und pluginbasierte (CRA, Vite) Integrationen vereint.

Ihre Wahl hängt weitgehend von den Projektanforderungen, dem gewünschten Entwicklererlebnis (DX) und der Bedeutung von typisierten Übersetzungen oder fortschrittlichem Routing ab. Wenn Sie eingebaute lokalisiertes Routing und TypeScript-Integration schätzen, ist **Intlayer** möglicherweise am ansprechendsten. Wenn Sie eine bewährte Lösung mit reichhaltigem Ökosystem wünschen, ist **React-i18next** eine großartige Wahl. Für straightforwarde Anforderungen an ICU-basiertes Formatieren ist **React-Intl** eine zuverlässige Option.

---

### Weiterführende Literatur

- [React-Intl Dokumentation](https://formatjs.io/docs/react-intl/)
- [React-i18next Dokumentation](https://react.i18next.com/)
- [Intlayer + CRA Erste Schritte](#) (aus Ihrem Dokument)
- [Intlayer + Vite & React Erste Schritte](#) (aus Ihrem Dokument)

Fühlen Sie sich frei, Ansätze zu kombinieren und anzupassen, um Ihren Anforderungen gerecht zu werden – es gibt keine „One-Size-Fits-All“-Lösung, und jede Bibliothek entwickelt sich weiter, um neue Anwendungsfälle im React-Ökosystem zu adressieren.
