---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Aufbau eines RAG-basierten Dokumentationsassistenten (Chunking, Embeddings und Suche)
description: Aufbau eines RAG-basierten Dokumentationsassistenten (Chunking, Embeddings und Suche)
keywords:
  - RAG
  - Dokumentation
  - Assistent
  - Chunking
  - Embeddings
  - Suche
slugs:
  - blog
  - rag-powered-documentation-assistant
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Aufbau eines RAG-basierten Dokumentationsassistenten (Chunking, Embeddings und Suche)

## Was Sie erhalten

Ich habe einen RAG-basierten Dokumentationsassistenten entwickelt und als Boilerplate verpackt, die Sie sofort verwenden können.

- Wird mit einer einsatzbereiten Anwendung geliefert (Next.js + OpenAI API)
- Beinhaltet eine funktionierende RAG-Pipeline (Chunking, Embeddings, Kosinus-Ähnlichkeit)
- Bietet eine vollständige Chatbot-Benutzeroberfläche, die in React erstellt wurde
- Alle UI-Komponenten sind vollständig mit Tailwind CSS bearbeitbar
- Protokolliert jede Benutzeranfrage, um fehlende Dokumentationen, Benutzerprobleme und Produktchancen zu identifizieren

👉 [Live-Demo](https://intlayer.org/doc/why) 👉 [Code-Boilerplate](https://github.com/aymericzip/smart_doc_RAG)

## Einführung

Wenn Sie jemals in der Dokumentation verloren waren und endlos nach einer Antwort gesucht haben, wissen Sie, wie mühsam das sein kann. Dokumentationen sind nützlich, aber sie sind statisch, und die Suche fühlt sich oft umständlich an.

Hier kommt **RAG (Retrieval-Augmented Generation)** ins Spiel. Anstatt Benutzer dazu zu zwingen, sich durch den Text zu wühlen, können wir **Retrieval** (das Finden der richtigen Teile der Dokumentation) mit **Generation** (ein LLM erklärt es natürlich) kombinieren.

In diesem Beitrag zeige ich Ihnen, wie ich einen RAG-gestützten Dokumentations-Chatbot entwickelt habe und wie dieser nicht nur den Nutzern hilft, schneller Antworten zu finden, sondern auch Produktteams eine neue Möglichkeit bietet, Benutzerprobleme zu verstehen.

## Warum RAG für Dokumentationen verwenden?

RAG ist aus gutem Grund zu einem beliebten Ansatz geworden: Es ist eine der praktischsten Methoden, um große Sprachmodelle tatsächlich nützlich zu machen.

Für Dokumentationen sind die Vorteile klar:

- Sofortige Antworten: Benutzer stellen Fragen in natürlicher Sprache und erhalten relevante Antworten.
- Besserer Kontext: Das Modell sieht nur die relevantesten Dokumentationsabschnitte, was Halluzinationen reduziert.
- Suche, die sich menschlich anfühlt: eher wie Algolia + FAQ + Chatbot in einem.
- Feedback-Schleife: Durch das Speichern von Anfragen erkennen Sie, womit Benutzer wirklich Schwierigkeiten haben.

Dieser letzte Punkt ist entscheidend. Ein RAG-System beantwortet nicht nur Fragen, sondern zeigt Ihnen auch, was die Leute wirklich fragen. Das bedeutet:

- Sie entdecken fehlende Informationen in Ihren Dokumentationen.
- Sie sehen, wie Feature-Anfragen entstehen.
- Sie erkennen Muster, die sogar die Produktstrategie leiten können.

RAG ist also nicht nur ein Support-Tool. Es ist auch eine **Produktentdeckungsmaschine**.

## Wie die RAG-Pipeline funktioniert

Auf hoher Ebene sieht das Rezept, das ich verwendet habe, so aus:

1.  **Aufteilen der Dokumentation** Große Markdown-Dateien werden in Abschnitte (Chunks) aufgeteilt. Das Aufteilen ermöglicht es, nur die relevanten Teile der Dokumentation als Kontext bereitzustellen.
2.  **Erzeugen von Embeddings** Jeder Abschnitt wird mit der OpenAI-Embedding-API (text-embedding-3-large) oder einer Vektordatenbank (Chroma, Qdrant, Pinecone) in einen Vektor umgewandelt.
3.  **Indexierung & Speicherung** Embeddings werden in einer einfachen JSON-Datei gespeichert (für meine Demo), aber in der Produktion würden Sie wahrscheinlich eine Vektor-Datenbank verwenden.
4.  **Abruf (R in RAG)** Eine Benutzeranfrage wird eingebettet, die Kosinusähnlichkeit wird berechnet, und die am besten passenden Chunks werden abgerufen.
5.  **Erweiterung + Generierung (AG in RAG)** Diese Chunks werden in die Eingabeaufforderung für ChatGPT eingefügt, sodass das Modell mit tatsächlichem Dokumentationskontext antwortet.
6.  **Protokollierung von Anfragen für Feedback** Jede Benutzeranfrage wird gespeichert. Das ist Gold wert, um Schmerzpunkte, fehlende Dokumentationen oder neue Chancen zu verstehen.

## Schritt 1: Die Dokumentation lesen

Der erste Schritt war einfach: Ich brauchte eine Möglichkeit, einen docs/-Ordner nach allen .md-Dateien zu durchsuchen. Mit Node.js und glob habe ich den Inhalt jeder Markdown-Datei in den Speicher geladen.

Dies hält die Pipeline flexibel: Anstatt Markdown könnten Sie die Dokumentation auch aus einer Datenbank, einem CMS oder sogar einer API abrufen.

## Schritt 2: Aufteilen der Dokumentation

Warum aufteilen? Weil Sprachmodelle **Kontextgrenzen** haben. Ein ganzes Buch voller Dokumentation auf einmal zu füttern, funktioniert nicht.

Die Idee ist also, den Text in handhabbare Abschnitte (z. B. jeweils 500 Tokens) mit Überlappungen (z. B. 100 Tokens) zu zerlegen. Die Überlappung sorgt für Kontinuität, damit am Abschnittsrand keine Bedeutung verloren geht.

**Beispiel:**

- Abschnitt 1 → „…die alte Bibliothek, die viele vergessen hatten. Ihre hohen Regale waren mit Büchern gefüllt…“
- Abschnitt 2 → „…Regale waren mit Büchern aus allen erdenklichen Genres gefüllt, die alle Geschichten flüsterten…“

Die Überlappung stellt sicher, dass beide Abschnitte gemeinsamen Kontext enthalten, sodass die Suche kohärent bleibt.

Dieser Kompromiss (Chunk-Größe vs. Überlappung) ist entscheidend für die Effizienz von RAG:

- Zu klein → es entsteht Rauschen.
- Zu groß → der Kontext wird zu umfangreich.

## Schritt 3: Erzeugen von Embeddings

Sobald die Dokumente in Chunks aufgeteilt sind, erzeugen wir **Embeddings**, hochdimensionale Vektoren, die jeden Chunk repräsentieren.

Ich habe das OpenAI-Modell text-embedding-3-large verwendet, aber Sie können jedes moderne Embedding-Modell nutzen.

**Beispiel für ein Embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 Elemente
];
```

Jeder Vektor ist ein mathematischer Fingerabdruck des Textes und ermöglicht die Ähnlichkeitssuche.

## Schritt 4: Indexieren & Speichern der Embeddings

Um zu vermeiden, dass Embeddings mehrfach neu generiert werden, habe ich sie in embeddings.json gespeichert.

In der Produktion möchten Sie wahrscheinlich eine Vektordatenbank wie folgende verwenden:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, etc.

Vektor-DBs übernehmen Indexierung, Skalierbarkeit und schnelle Suche. Für meinen Prototyp hat jedoch eine lokale JSON-Datei gut funktioniert.

## Schritt 5: Abruf mit Kosinus-Ähnlichkeit

Wenn ein Benutzer eine Frage stellt:

1.  Erzeugen Sie ein Embedding für die Anfrage.
2.  Vergleichen Sie es mit allen Dokument-Embeddings mittels **Kosinus-Ähnlichkeit**.
3.  Behalten Sie nur die N ähnlichsten Chunks.

Die Kosinus-Ähnlichkeit misst den Winkel zwischen zwei Vektoren. Eine perfekte Übereinstimmung erzielt **1,0**.

So findet das System die dem Query am nächsten liegenden Dokumentabschnitte.

## Schritt 6: Erweiterung + Generierung

Jetzt kommt die Magie. Wir nehmen die besten Chunks und injizieren sie in den **System-Prompt** für ChatGPT.

Das bedeutet, dass das Modell so antwortet, als wären diese Abschnitte Teil des Gesprächs.

Das Ergebnis: präzise, **dokumentenbasierte Antworten**.

## Schritt 7: Protokollierung der Benutzeranfragen

Das ist die versteckte Superkraft.

Jede gestellte Frage wird gespeichert. Im Laufe der Zeit entsteht so ein Datensatz mit:

- Häufigsten Fragen (ideal für FAQs)
- Unbeantworteten Fragen (Dokumentation fehlt oder ist unklar)
- Funktionsanfragen, die als Fragen getarnt sind („Integriert es sich mit X?“)
- Aufkommenden Anwendungsfällen, die Sie nicht geplant hatten

Das verwandelt Ihren RAG-Assistenten in ein **kontinuierliches Nutzerforschungstool**.

## Was kostet das?

Ein häufiger Einwand gegen RAG sind die Kosten. In der Praxis ist es überraschend günstig:

- Die Erstellung von Embeddings für ca. 200 Dokumente dauert etwa **5 Minuten** und kostet **1–2 Euro**.
- Die Suchfunktion in den Dokumenten ist zu 100 % kostenlos.
- Für Anfragen verwenden wir gpt-4o-latest ohne den „Thinking“-Modus. Bei Intlayer sehen wir etwa **300 Chat-Anfragen pro Monat**, und die OpenAI-API-Rechnung übersteigt selten **10 $**.

Darüber hinaus können Sie die Hosting-Kosten einrechnen.

## Implementierungsdetails

Stack:

- Monorepo: pnpm Workspace
- Doc-Paket: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API-Route / OpenAI API

Das `@smart-doc/docs`-Paket ist ein TypeScript-Paket, das die Dokumentationsverarbeitung übernimmt. Wenn eine Markdown-Datei hinzugefügt oder geändert wird, enthält das Paket ein `build`-Skript, das die Dokumentationsliste in jeder Sprache neu erstellt, Embeddings generiert und diese in einer `embeddings.json`-Datei speichert.

Für das Frontend verwenden wir eine Next.js-Anwendung, die bietet:

- Markdown-zu-HTML-Rendering
- Eine Suchleiste, um relevante Dokumentation zu finden
- Eine Chatbot-Oberfläche, um Fragen zur Dokumentation zu stellen

Um eine Dokumentationssuche durchzuführen, enthält die Next.js-Anwendung eine API-Route, die eine Funktion im `@smart-doc/docs`-Paket aufruft, um Dokumentationsabschnitte abzurufen, die zur Anfrage passen. Mithilfe dieser Abschnitte können wir eine Liste von Dokumentationsseiten zurückgeben, die für die Suche des Benutzers relevant sind.

Für die Chatbot-Funktionalität folgen wir demselben Suchprozess, injizieren jedoch zusätzlich die abgerufenen Dokumentationsabschnitte in den Prompt, der an ChatGPT gesendet wird.

Hier ist ein Beispiel für einen an ChatGPT gesendeten Prompt:

System-Prompt:

```txt
You are a helpful assistant that can answer questions about the Intlayer documentation.

Related chunks :

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/de/getting-started"
---

# Wie man anfängt

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/de/another-doc"
---

# Ein weiteres Dokument

...
```

Benutzeranfrage:

```txt
Wie fängt man an?
```

Wir verwenden SSE, um die Antwort von der API-Route zu streamen.

Wie bereits erwähnt, verwenden wir gpt-4-turbo ohne den "Denkmodus". Die Antworten sind relevant und die Latenz gering.
Wir haben mit gpt-5 experimentiert, aber die Latenz war zu hoch (manchmal bis zu 15 Sekunden für eine Antwort). Das werden wir in Zukunft erneut prüfen.

👉 [Hier die Demo ausprobieren](https://intlayer.org/doc/why) 👉 [Den Code-Template auf GitHub ansehen](https://github.com/aymericzip/smart_doc_RAG)

## Weiterführende Möglichkeiten

Dieses Projekt ist eine Minimalimplementierung. Aber Sie können es auf viele Arten erweitern:

- MCP-Server → die Dokumentationssuchfunktion zu einem MCP-Server machen, um die Dokumentation mit jedem KI-Assistenten zu verbinden

- Vektor-Datenbanken → Skalierung auf Millionen von Dokumentenabschnitten
- LangChain / LlamaIndex → fertige Frameworks für RAG-Pipelines
- Analyse-Dashboards → Visualisierung von Benutzeranfragen und Schmerzpunkten
- Multi-Source Retrieval → nicht nur Dokumente abrufen, sondern auch Datenbankeinträge, Blogbeiträge, Tickets usw.
- Verbesserte Eingabeaufforderungen → Neuranking, Filterung und hybride Suche (Schlüsselwort + semantisch)

## Begrenzungen, auf die wir gestoßen sind

- Chunking und Überlappung sind empirisch. Das richtige Gleichgewicht (Chunk-Größe, Überlappungsprozentsatz, Anzahl der abgerufenen Chunks) erfordert Iteration und Tests.
- Embeddings werden nicht automatisch neu generiert, wenn sich die Dokumente ändern. Unser System setzt Embeddings für eine Datei nur zurück, wenn sich die Anzahl der Chunks von der gespeicherten Anzahl unterscheidet.
- In diesem Prototyp werden Embeddings im JSON-Format gespeichert. Das funktioniert für Demos, verschmutzt aber das Git-Repository. In der Produktion ist eine Datenbank oder ein dedizierter Vektor-Speicher besser geeignet.

## Warum das über die Dokumentation hinaus wichtig ist

Der interessante Teil ist nicht nur der Chatbot. Es ist der **Feedback-Loop**.

Mit RAG beantwortest du nicht nur:

- Du lernst, was die Nutzer verwirrt.
- Du entdeckst, welche Funktionen sie erwarten.
- Du passt deine Produktstrategie basierend auf echten Anfragen an.

**Beispiel:**

Stell dir vor, du führst eine neue Funktion ein und siehst sofort:

- 50 % der Fragen betreffen denselben unklaren Einrichtungsschritt
- Nutzer fragen wiederholt nach einer Integration, die du noch nicht unterstützt
- Menschen suchen nach Begriffen, die einen neuen Anwendungsfall offenbaren

Das ist **Produktintelligenz** direkt von deinen Nutzern.

## Fazit

RAG ist eine der einfachsten und leistungsstärksten Methoden, um LLMs praktisch einsetzbar zu machen. Durch die Kombination von **Abruf + Generierung** können Sie statische Dokumentationen in einen **intelligenten Assistenten** verwandeln und gleichzeitig einen kontinuierlichen Strom von Produktinformationen gewinnen.

Für mich hat dieses Projekt gezeigt, dass RAG nicht nur ein technischer Trick ist. Es ist eine Möglichkeit, Dokumentationen in Folgendes zu verwandeln:

- ein interaktives Unterstützungssystem
- einen Feedback-Kanal
- ein Werkzeug für die Produktstrategie

👉 [Probieren Sie die Demo hier aus](https://intlayer.org/doc/why) 👉 [Sehen Sie sich die Code-Vorlage auf GitHub an](https://github.com/aymericzip/smart_doc_RAG)

Und wenn Sie auch mit RAG experimentieren, würde ich gerne hören, wie Sie es einsetzen.
