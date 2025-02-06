# Intlayer Dokumentation

Willkommen zur offiziellen **Intlayer**-Dokumentation! Hier finden Sie alles, was Sie benötigen, um Intlayer für all Ihre Internationalisierungs- (i18n) Bedürfnisse zu integrieren, zu konfigurieren und zu meistern – egal, ob Sie mit **Next.js**, **React**, **Vite**, **Express** oder einer anderen JavaScript-Umgebung arbeiten.

Intlayer bietet einen flexiblen, modernen Ansatz zur Übersetzung Ihrer Anwendung. Unsere Dokumentation führt Sie von der Installation und Einrichtung bis zu fortgeschrittenen Funktionen wie **KI-gestützter Übersetzung**, **TypeScript**-Definitionen und **Serverkomponenten**-Unterstützung – damit Sie ein nahtloses, mehrsprachiges Erlebnis schaffen können.

---

## Erste Schritte

- **[Einführung](https://github.com/aymericzip/intlayer/blob/main/docs/de/introduction.md)**  
  Erhalten Sie einen Überblick darüber, wie Intlayer funktioniert, seine Kernfunktionen und warum es ein Wendepunkt für i18n ist.

- **[Wie Intlayer funktioniert](https://github.com/aymericzip/intlayer/blob/main/docs/de/how_works_intlayer.md)**  
  Tauchen Sie in das architektonische Design ein und lernen Sie, wie Intlayer alles von der Inhaltsdeklaration bis zur Übersetzungsbereitstellung behandelt.

- **[Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)**  
  Passen Sie Intlayer an die Bedürfnisse Ihres Projekts an. Erkunden Sie Middleware-Optionen, Verzeichnisstrukturen und erweiterte Einstellungen.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)**  
  Verwalten Sie Inhalte und Übersetzungen mit unserem Befehlszeilen-Tool. Entdecken Sie, wie Sie Inhalte pushen und pullen, Übersetzungen automatisieren und mehr.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md)**  
  Vereinfachen Sie die Zusammenarbeit mit Nicht-Entwicklern und optimieren Sie Ihre Übersetzungen mit KI – direkt in unserem kostenlosen, intuitiven CMS.

---

## Kernkonzepte

### Inhaltsdeklaration

Organisieren Sie Ihre mehrsprachigen Inhalte in der Nähe Ihres Codes, um alles konsistent und wartbar zu halten.

- **[Loslegen](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md)**  
  Lernen Sie die Grundlagen der Deklaration Ihrer Inhalte in Intlayer.

- **[Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/translation.md)**  
  Verstehen Sie, wie Übersetzungen generiert, gespeichert und in Ihrer Anwendung genutzt werden.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/enumeration.md)**  
  Verwalten Sie leicht wiederholte oder feste Datensätze in verschiedenen Sprachen.

- **[Funktion Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/function_fetching.md)**  
  Sehen Sie, wie Sie Inhalte dynamisch mit benutzerdefinierter Logik abrufen, um den Workflow Ihres Projekts anzupassen.

---

## Umgebungen & Integrationen

Wir haben Intlayer mit Flexibilität im Hinterkopf entwickelt und bieten nahtlose Integration in beliebte Frameworks und Build-Tools:

- **[Intlayer mit Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)**
- **[Intlayer mit Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md)**
- **[Intlayer mit Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md)**
- **[Intlayer mit React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)**
- **[Intlayer mit Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)**
- **[Intlayer mit Express](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_express.md)**

Jeder Integrationsleitfaden enthält Best Practices zur Nutzung der Funktionen von Intlayer – wie **Server-Side Rendering**, **dynamische Routen** oder **Client-Side Rendering** – damit Sie eine schnelle, SEO-freundliche und hoch skalierbare Anwendung aufrechterhalten können.

---

## Pakete

Intlayers modulares Design bietet dedizierte Pakete für spezifische Umgebungen und Bedürfnisse:

### `intlayer`

Kern-Dienstprogrammfunktionen zur Konfiguration und Verwaltung Ihrer i18n-Einrichtung.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Nutzen Sie Intlayer innerhalb von **Express**-basierten Apps:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/express-intlayer/t.md)**  
  Ein minimalistischer, unkomplizierter Übersetzungshelfer für Ihre Server-Routen und -Ansichten.

### `react-intlayer`

Verbessern Sie Ihre **React**-Anwendungen mit leistungsstarken Hooks:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Nahtlose Integration mit **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useLocale.md)**

---

## Weitere Ressourcen

- **[Blog: Intlayer und i18next](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_i18next.md)**  
  Erfahren Sie, wie Intlayer die beliebte **i18next**-Bibliothek ergänzt und vergleicht.

- **[Live-Tutorial auf YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Sehen Sie eine umfassende Demo und erfahren Sie, wie Sie Intlayer in Echtzeit integrieren.

---

## Mitwirken & Feedback

Wir schätzen die Kraft von Open Source und gemeinschaftlich getriebenem Entwickeln. Wenn Sie Verbesserungen vorschlagen, einen neuen Leitfaden hinzufügen oder Probleme in unseren Dokumenten korrigieren möchten, zögern Sie nicht, einen Pull-Request zu stellen oder ein Issue in unserem [GitHub-Repository](https://github.com/aymericzip/intlayer/blob/main/docs) zu eröffnen.

**Bereit, Ihre Anwendung schneller und effizienter zu übersetzen?** Tauchen Sie in unsere Dokumentation ein, um heute mit der Nutzung von Intlayer zu beginnen. Erleben Sie einen robusten, optimierten Ansatz zur Internationalisierung, der Ihre Inhalte organisiert und Ihr Team produktiver macht.

Viel Spaß beim Übersetzen!  
— Das Intlayer-Team
