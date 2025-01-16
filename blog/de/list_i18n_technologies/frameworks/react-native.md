# Erforschen von i18n-Lösungen zur Übersetzung Ihrer React Native-App

In einem zunehmend globalen Markt kann die Bereitstellung Ihrer React Native-App in mehreren Sprachen den Zugang erheblich verbessern und die Benutzerzufriedenheit erhöhen. Internationalisierung (i18n) ist zentral für das effektive Management von Übersetzungen - sie ermöglicht es Ihnen, sprachspezifischen Text, Datums- und Zeitformate, Währungen und mehr anzuzeigen, ohne Ihren Code zu komplizieren. In diesem Artikel werden wir verschiedene i18n-Ansätze untersuchen - von speziellen Bibliotheken bis hin zu allgemeineren Lösungen - und Ihnen helfen, diejenige zu finden, die am besten zu Ihrem React Native-Projekt passt.

---

![i18n illustration](https://github.com/aymericzip/intlayer/blob/main/blog/assets/i18n.webp)

## Was ist Internationalisierung (i18n)?

Internationalisierung oder i18n umfasst die Strukturierung einer Anwendung, damit sie sich leicht an verschiedene Sprachen, regionale Formate und kulturelle Normen anpassen kann. In React Native umfasst i18n die Verarbeitung von Zeichenfolgen für Schaltflächen und Beschriftungen sowie die Formatierung von Daten, Zeiten, Währungen und mehr gemäß der Spracheinstellungen eines Benutzers. Richtig vorbereitete React Native-Apps ermöglichen es Ihnen, zusätzliche Sprachen und sprachspezifisches Verhalten später nahtlos zu integrieren - ohne massive Refaktorierungen.

Für einen tieferen Einblick in die Konzepte der Internationalisierung lesen Sie unseren Artikel:  
[Was ist Internationalisierung (i18n)? Definition und Herausforderungen](https://github.com/aymericzip/intlayer/blob/main/blog/de/what_is_internationalization.md).

---

## Die Übersetzungsherausforderung für React Native-Anwendungen

Die Arbeit mit Übersetzungen in React Native bringt eigene spezifische Überlegungen mit sich:

- **Komponentenbasierte Architektur**  
  Genau wie im React für das Web kann das modulare Design von React Native den Text über zahlreiche Komponenten verstreuen. Es ist entscheidend, diese Übersetzungen auf robuste Weise zu zentralisieren.

- **Offline- und Fernzugriffsdaten**  
  Während einige Zeichenfolgen in die App eingebettet werden können, können andere Inhalte (z. B. Nachrichtenfeeds, Produktdaten) remote abgerufen werden. Die Handhabung von Übersetzungen für Daten, die asynchron eintreffen, kann auf Mobilgeräten komplexer sein.

- **Plattformspezifische Verhaltensweisen**  
  iOS und Android haben jeweils ihre eigenen Spracheinstellungen und Formatierungsbesonderheiten. Die Gewährleistung einer konsistenten Anzeige von Daten, Währungen und Zahlen auf beiden Plattformen erfordert gründliches Testen.

- **Zustands- und Navigationsmanagement**  
  Die Beibehaltung der vom Benutzer ausgewählten Sprache über Bildschirme, Deep Links oder tab-basierte Navigation hinweg bedeutet, i18n in Ihre Redux-, Context API- oder andere Zustandsmanagementlösungen zu integrieren.

- **App-Updates & Over-the-Air (OTA)**  
  Wenn Sie CodePush oder einen anderen OTA-Update-Mechanismus verwenden, müssen Sie planen, wie Übersetzungsupdates oder neue Sprachen bereitgestellt werden, ohne eine vollständige App-Store-Veröffentlichung anzufordern.

---

## Führende i18n-Lösungen für React Native

Im Folgenden sind mehrere beliebte Ansätze zur Verwaltung mehrsprachiger Inhalte in React Native aufgeführt. Jeder zielt darauf ab, Ihren Übersetzungsworkflow auf unterschiedliche Weise zu vereinfachen.

### 1. Intlayer

> Website: [https://intlayer.org/](https://intlayer.org/)

**Überblick**  
**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die mehrsprachige Unterstützung in modernen JavaScript-Apps, einschließlich React Native, zu optimieren. Sie bietet einen deklarativen Ansatz zur Übersetzung, mit dem Sie Wörterbücher direkt neben Komponenten definieren können.

**Wesentliche Merkmale**

- **Übersetzungsdeklaration**  
  Speichern Sie Übersetzungen in einer einzigen Datei oder auf Komponentenebene, sodass es einfach ist, Text zu finden und zu ändern.

- **TypeScript & Autovervollständigung**  
  Generiert automatisch Typspezifikationen für Übersetzungsschlüssel, die sowohl autovervollständigungsfreundlich als auch robust in der Fehlerprüfung sind.

- **Leichtgewichtig & Flexibel**  
  Funktioniert reibungslos in React Native-Umgebungen, ohne unnötige Overheadkosten. Lässt sich einfach integrieren und effizient auf mobilen Geräten halten.

- **Plattformspezifische Überlegungen**  
  Sie können plattformspezifische Zeichenfolgen für iOS vs. Android anpassen oder trennen, falls erforderlich.

- **Asynchrones Laden**  
  Laden Sie Übersetzungswörterbücher dynamisch, was nützlich sein kann für große Apps oder inkrementelle Sprachveröffentlichungen.

**Überlegungen**

- **Gemeinschaft & Ökosystem**  
  Immer noch eine relativ neue Lösung, sodass Sie möglicherweise weniger community-getriebene Beispiele oder vorgefertigte Plugins im Vergleich zu etablierten Bibliotheken finden.

---

### 2. React-i18next

> Website: [https://react.i18next.com/](https://react.i18next.com/)

**Überblick**  
**React-i18next** baut auf dem beliebten **i18next**-Framework auf und bietet eine flexible, pluginbasierte Architektur sowie ein robustes Funktionsset. Es wird auch in React Native-Apps häufig verwendet, dank eines gut dokumentierten Einrichtungsprozesses.

**Wesentliche Merkmale**

- **Reibungslose React Native-Integration**  
  Bietet Hooks (`useTranslation`), höhere Komponenten (HOCs) und mehr, um i18n nahtlos in Ihre Komponenten zu integrieren.

- **Asynchrones Laden**  
  Laden Sie Übersetzungen bei Bedarf - vorteilhaft für große Apps oder beim Hinzufügen neuer Sprachpakete über die Zeit.

- **Reiche Übersetzungsfähigkeiten**  
  Verarbeiten Sie geschachtelte Übersetzungen, Interpolationen, Pluralisierungen und Variablenersetzungen direkt out of the box.

- **TypeScript & Autovervollständigung**  
  React-i18next unterstützt typisierte Übersetzungsschlüssel, obwohl die initiale Einrichtung im Vergleich zu Lösungen, die Typen automatisch generieren, manuell sein kann.

- **Plattformunabhängig**  
  i18next ist nicht speziell an Web oder Mobil gebunden, sodass dieselbe Bibliothek in verschiedenen Projekttypen verwendet werden kann (z. B. wenn Sie Code zwischen Web und Native teilen).

**Überlegungen**

- **Komplexität der Konfiguration**  
  Die Einrichtung von i18n mit erweiterten Funktionen (Pluralformen, Fallback-Lokale usw.) kann eine sorgfältige Konfiguration erfordern.

- **Leistung**  
  Während React-i18next im Allgemeinen gut funktioniert, sollten Sie darauf achten, wie Sie Übersetzungsressourcen organisieren und laden, um Overhead auf mobilen Geräten zu vermeiden.

---

### 3. React Intl (von FormatJS)

> Website: [https://formatjs.io/docs/react-intl/](https://formatjs.io/docs/react-intl/)

**Überblick**  
**React Intl**, Teil des **FormatJS**-Ökosystems, konzentriert sich auf die Standardisierung der Nachrichtenformatierung für verschiedene Landschaften. Es betont einen Arbeitsablauf zur Extraktion von Nachrichten und ist besonders stark in der korrekten Formatierung von Daten, Zahlen und Zeiten für eine breite Palette von Landschaften.

**Wesentliche Merkmale**

- **Formatfokussierte Komponenten**  
  `<FormattedMessage>`, `<FormattedDate>`, `<FormattedTime>` und andere erleichtern Formatierungsaufgaben auf iOS und Android.

- **Leichtgewichtig & Erweiterbar**  
  Sie können nur die Teile von FormatJS importieren, die Sie benötigen, sodass Ihr gesamtes Bundle schlank bleibt - entscheidend für mobile Geräte.

- **Polyfills für nicht unterstützte Locale**  
  Gewährleistet eine konsistente Daten-/Zahlenformatierung auf älteren Android- oder iOS-Versionen.

- **TypeScript-Kompatibilität**  
  Integriert sich mit TypeScript, obwohl möglicherweise zusätzliche Werkzeuge erforderlich sind, um vollständig typisierte Nachrichten-IDs zu erreichen.

**Überlegungen**

- **Nachrichtenextraktion**  
  Erfordert einen Extraktionsworkflow, der den Build-Prozess komplexer machen kann. Es ist jedoch leistungsstark für große Teams, die viele Übersetzungen verwalten.

- **App-Größe & Bereitstellungen**  
  Wenn Sie von mehreren Polyfills oder großen Übersetzungsdateien abhängen, achten Sie auf die Gesamtgröße Ihrer App - besonders wichtig im mobilen Kontext.

- **Gemeinschaftsbeispiele**  
  Auch wenn sie weit verbreitet sind, können spezifische Beispiele für die Verwendung in React Native weniger häufig sein als für React web. Sie werden wahrscheinlich vorhandene Dokumentationen und Muster an eine native Umgebung anpassen müssen.

---

### 4. LinguiJS

> Website: [https://lingui.js.org/](https://lingui.js.org/)

**Überblick**  
**LinguiJS** bietet einen modernen, entwicklerfreundlichen Ansatz zur i18n für JavaScript und React (einschließlich React Native). Mit seiner CLI-basierten Nachrichtenextraktion und -kompilierung konzentriert es sich darauf, Laufzeitkosten zu minimieren.

**Wesentliche Merkmale**

- **Automatische Nachrichtenextraktion**  
  Durchsucht Ihren Code nach Übersetzungszeichenfolgen, reduziert das Risiko von übersehenen oder ungenutzten Nachrichten.

- **Minimale Laufzeitkosten**  
  Kompilierte Übersetzungen halten Ihre App leistungsfähig und gut optimiert für mobile Geräte.

- **TypeScript & Autovervollständigung**  
  Richtig konfiguriert, erhalten Sie typisierte IDs für Übersetzungen, was die Entwickler-Workflows sicherer und intuitiver gestaltet.

- **Integration mit React Native**  
  Einfach zu installieren und zu verknüpfen in einer React Native-Umgebung; Sie können auch plattformspezifische Übersetzungen bearbeiten, falls erforderlich.

**Überlegungen**

- **Erste CLI-Einrichtung**  
  Einige zusätzliche Schritte sind erforderlich, um die Extraktions- und Kompilierungspipeline für React Native-Projekte einzurichten.

- **Gemeinschaft & Plugins**  
  Das Ökosystem der Bibliothek ist kleiner als das von i18next, wächst jedoch schnell, und die Kern-CLI-Tools sind robust.

- **Codeorganisation**  
  Die Entscheidung, wie Sie Ihre Nachrichtenkataloge (nach Bildschirm, Funktion oder Sprache) aufteilen, ist entscheidend, um Klarheit in größeren Apps zu bewahren.

---

## Schlussfolgerungen

Bei der Auswahl einer i18n-Lösung für Ihre React Native-Anwendung:

1. **Bewerten Sie Ihre Anforderungen**

   - Wie viele Sprachen sind jetzt und in Zukunft erforderlich?
   - Benötigen Sie On-Demand-Ladungen für große Apps?

2. **Berücksichtigen Sie plattformspezifische Unterschiede**

   - Stellen Sie sicher, dass jede Bibliothek die Unterschiede der iOS- und Android-Lokale unterstützt, insbesondere bei Daten-/Zahlen-/Währungsbesonderheiten.
   - Berücksichtigen Sie den Offline-Einsatz - einige Übersetzungen müssen möglicherweise mit der App gebündelt werden, während andere remote abgerufen werden können.

3. **Wählen Sie eine Struktur für Skalierbarkeit**

   - Wenn Sie eine große oder langfristige Anwendung planen, kann ein starker Extraktionsworkflow oder typisierte Schlüssel helfen, Übersetzungen gut organisiert zu halten.

4. **Leistung & Bündelgröße**

   - Mobile Datenbeschränkungen bedeuten, dass Sie die Größe Ihrer Übersetzungsdateien und aller Polyfills genau im Auge behalten sollten.

5. **Entwicklererfahrung (DX)**
   - Suchen Sie nach Bibliotheken, die mit den Fähigkeiten Ihres Teams übereinstimmen - einige Lösungen sind ausführlicher, aber unkompliziert, während andere mehr Automatisierung auf Kosten der Einrichtungskomplexität bieten.

Jede Lösung - Intlayer, React-i18next, React Intl und LinguiJS - hat sich in React Native-Umgebungen als effektiv erwiesen, wenn auch mit leicht unterschiedlichen Prioritäten. Die Bewertung des Fahrplans Ihres Projekts, der Vorlieben der Entwickler und der Lokalisierungsbedürfnisse wird Ihnen helfen, das ideale Angebot für die Bereitstellung einer wirklich globalen React Native-App zu finden.
