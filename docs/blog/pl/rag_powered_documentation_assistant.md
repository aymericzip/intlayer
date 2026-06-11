---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Budowanie asystenta dokumentacji opartego na RAG (dzielenie na fragmenty, osadzenia i wyszukiwanie)
description: Budowanie asystenta dokumentacji opartego na RAG (dzielenie na fragmenty, osadzenia i wyszukiwanie)
keywords:
  - RAG
  - Dokumentacja
  - Asystent
  - Dzielenie na fragmenty
  - Osadzenia
  - Wyszukiwanie
slugs:
  - blog
  - rag-powered-documentation-assistant
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Budowanie asystenta dokumentacji opartego na RAG (dzielenie na fragmenty, osadzenia i wyszukiwanie)

## Co otrzymujesz

Zbudowałem asystenta dokumentacji opartego na RAG i zapakowałem go w boilerplate, którego możesz od razu użyć.

- Zawiera gotową do użycia aplikację (Next.js + OpenAI API)
- Zawiera działający pipeline RAG (dzielenie na fragmenty, osadzenia, podobieństwo cosinusowe)
- Zapewnia kompletny interfejs chatbota zbudowany w React
- Wszystkie komponenty UI są w pełni edytowalne za pomocą Tailwind CSS
- Rejestruje każde zapytanie użytkownika, aby pomóc zidentyfikować brakujące dokumenty, problemy użytkowników i możliwości produktowe

👉 [Demo na żywo](https://intlayer.org/doc/why) 👉 [Boilerplate kodu](https://github.com/aymericzip/smart_doc_RAG)

## Wprowadzenie

Jeśli kiedykolwiek zgubiłeś się w dokumentacji, przewijając bez końca w poszukiwaniu jednej odpowiedzi, wiesz, jak to może być frustrujące. Dokumentacja jest przydatna, ale jest statyczna, a jej przeszukiwanie często wydaje się nieporęczne.

Właśnie tutaj pojawia się **RAG (Retrieval-Augmented Generation)**. Zamiast zmuszać użytkowników do przeszukiwania tekstu, możemy połączyć **retrieval** (znalezienie odpowiednich fragmentów dokumentacji) z **generation** (pozwolenie LLM na naturalne wyjaśnienie).

W tym wpisie przeprowadzę Cię przez proces tworzenia chatbota dokumentacyjnego opartego na RAG i pokażę, jak nie tylko pomaga on użytkownikom szybciej znajdować odpowiedzi, ale także daje zespołom produktowym nowy sposób na zrozumienie problemów użytkowników.

## Dlaczego warto używać RAG do dokumentacji?

RAG stał się popularnym podejściem nie bez powodu: jest to jeden z najbardziej praktycznych sposobów, aby duże modele językowe stały się naprawdę użyteczne.

Dla dokumentacji korzyści są jasne:

- Natychmiastowe odpowiedzi: użytkownicy pytają w naturalnym języku i otrzymują odpowiednie odpowiedzi.
- Lepszy kontekst: model widzi tylko najbardziej istotne fragmenty dokumentacji, co redukuje halucynacje.
- Wyszukiwanie, które wydaje się ludzkie: coś na kształt połączenia Algolii + FAQ + chatbota w jednym.
- Pętla informacji zwrotnej: przechowując zapytania, odkrywasz, z czym użytkownicy naprawdę mają problemy.

Ten ostatni punkt jest kluczowy. System RAG nie tylko odpowiada na pytania, ale także pokazuje, o co ludzie pytają. Oznacza to:

- Odkrywasz brakujące informacje w swojej dokumentacji.
- Widujesz pojawiające się prośby o nowe funkcje.
- Dostrzegasz wzorce, które mogą nawet kierować strategią produktu.

Tak więc RAG to nie tylko narzędzie wsparcia. To także **silnik odkrywania produktu**.

## Jak działa pipeline RAG

![Pipeline RAG](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

Na wysokim poziomie, oto przepis, którego użyłem:

1.  **Dzielenie dokumentacji na fragmenty** Duże pliki Markdown są dzielone na fragmenty. Dzielenie pozwala dostarczyć jako kontekst tylko odpowiednie części dokumentacji.
2.  **Generowanie embeddingów** Każdy fragment jest przekształcany w wektor za pomocą API embeddingów OpenAI (text-embedding-3-large) lub bazy danych wektorów (Chroma, Qdrant, Pinecone).
3.  **Indeksowanie i przechowywanie** Embeddingi są przechowywane w prostym pliku JSON (w moim demo), ale w produkcji prawdopodobnie użyjesz bazy danych wektorów.
4.  **Wyszukiwanie (R w RAG)** Zapytanie użytkownika jest zamieniane na embedding, obliczana jest podobieństwo kosinusowe, a następnie pobierane są najlepiej dopasowane fragmenty.
5.  **Augmentacja + Generacja (AG w RAG)** Te fragmenty są wstrzykiwane do promptu dla ChatGPT, dzięki czemu model odpowiada z wykorzystaniem rzeczywistego kontekstu dokumentacji.
6.  **Logowanie zapytań dla informacji zwrotnej** Każde zapytanie użytkownika jest zapisywane. To złoto dla zrozumienia problemów, brakujących dokumentów lub nowych możliwości.

<Steps>

<Step number={1} title="Odczytywanie dokumentacji">

Pierwszy krok był prosty: potrzebowałem sposobu na zeskanowanie folderu docs/ pod kątem wszystkich plików .md. Używając Node.js i glob, pobrałem zawartość każdego pliku Markdown do pamięci.

To utrzymuje elastyczność pipeline’u: zamiast Markdown, możesz pobierać dokumentację z bazy danych, CMS-a lub nawet API.

</Step>

<Step number={2} title="Dzielenie dokumentacji na fragmenty">

Dlaczego dzielić? Ponieważ modele językowe mają **ograniczenia kontekstu**. Podanie im całej książki dokumentacji nie zadziała.

Dlatego pomysł polega na podzieleniu tekstu na zarządzalne fragmenty (np. po 500 tokenów każdy) z nakładką (np. 100 tokenów). Nakładka zapewnia ciągłość, dzięki czemu nie tracisz znaczenia na granicach fragmentów.

<p align="center">
  <img width="480" alt="Niezawodne źródło danych" src="https://github.com/user-attachments/assets/ee548851-7206-4cc6-821e-de8a4366c6a3" />
</p>

**Przykład:**

- Fragment 1 → „…stara biblioteka, o której wielu zapomniało. Jej wysokie półki były wypełnione książkami…”
- Fragment 2 → „…półki były wypełnione książkami z każdego wyobrażalnego gatunku, z których każdy szeptał historie…”

Nakładanie się fragmentów zapewnia, że oba zawierają wspólny kontekst, dzięki czemu wyszukiwanie pozostaje spójne.

Ten kompromis (rozmiar fragmentu vs nakładanie) jest kluczowy dla efektywności RAG:

- Zbyt mały → pojawia się szum.
- Zbyt duży → rozrasta się rozmiar kontekstu.

</Step>

<Step number={3} title="Generowanie embeddingów">

Gdy dokumenty są podzielone na fragmenty, generujemy **embeddingi**, wektory o wysokim wymiarze reprezentujące każdy fragment.

Użyłem modelu OpenAI text-embedding-3-large, ale można użyć dowolnego nowoczesnego modelu embeddingowego.

**Przykładowy embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elementów
];
```

Każdy wektor jest matematycznym odciskiem tekstu, umożliwiającym wyszukiwanie podobieństw.

</Step>

<Step number={4} title="Indeksowanie i przechowywanie embeddingów">

Aby uniknąć wielokrotnego generowania embeddingów, zapisałem je w pliku embeddings.json.

W środowisku produkcyjnym prawdopodobnie będziesz chciał użyć bazy danych wektorów, takiej jak:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus itp.

Bazy danych wektorów zajmują się indeksowaniem, skalowalnością i szybkim wyszukiwaniem. Jednak w moim prototypie lokalny plik JSON sprawdził się dobrze.

</Step>

<Step number={5} title="Wyszukiwanie z użyciem podobieństwa kosinusowego">

Gdy użytkownik zada pytanie:

1.  Wygeneruj embedding dla zapytania.
2.  Porównaj go ze wszystkimi embeddingami dokumentów, używając **podobieństwa kosinusowego**.
3.  Zachowaj tylko N najbardziej podobnych fragmentów.

Podobieństwo cosinusowe mierzy kąt między dwoma wektorami. Idealne dopasowanie uzyskuje wynik **1.0**.

W ten sposób system znajduje najbliższe fragmenty dokumentacji do zapytania.

</Step>

<Step number={6} title="Rozszerzanie + Generowanie">

Teraz zaczyna się magia. Bierzemy najlepsze fragmenty i wstrzykujemy je do **systemowego promptu** dla ChatGPT.

Oznacza to, że model odpowiada, jakby te fragmenty były częścią rozmowy.

Efekt: dokładne, **odpowiedzi oparte na dokumentacji**.

</Step>

<Step number={7} title="Rejestrowanie zapytań użytkowników">

To jest ukryta supermoc.

Każde zadane pytanie jest zapisywane. Z czasem budujesz zbiór danych zawierający:

- Najczęściej zadawane pytania (świetne do FAQ)
- Niezadane pytania (brak dokumentacji lub niejasności)
- Prośby o funkcje ukryte w pytaniach („Czy integruje się z X?”)
- Pojawiające się przypadki użycia, których nie planowałeś

To zamienia Twojego asystenta RAG w **narzędzie do ciągłych badań użytkowników**.

</Step>

<Step number={8} title="Ile to kosztuje?">

Jednym z częstych zarzutów wobec RAG jest koszt. W praktyce jest zaskakująco tani:

- Generowanie embeddingów dla około 200 dokumentów zajmuje około **5 minut** i kosztuje **1–2 euro**.
- Funkcja wyszukiwania w dokumentacji jest całkowicie darmowa.
- Do zapytań używamy gpt-4o-latest bez trybu „myślenia”. Na Intlayer obserwujemy około **300 zapytań na czacie miesięcznie**, a rachunek za API OpenAI rzadko przekracza **10 dolarów**.

Do tego dochodzi koszt hostingu.

</Step>

<Step number={9} title="Szczegóły implementacji">

Stack:

- Monorepo: pnpm workspace
- Pakiet dokumentacji: Node.js / TypeScript / OpenAI API
- Frontend: Next.js / React / Tailwind CSS
- Backend: Node.js API route / OpenAI API

Pakiet `@smart-doc/docs` to pakiet TypeScript, który zajmuje się przetwarzaniem dokumentacji. Gdy plik markdown zostanie dodany lub zmodyfikowany, pakiet zawiera skrypt `build`, który przebudowuje listę dokumentacji w każdym języku, generuje embeddingi i zapisuje je w pliku `embeddings.json`.

Dla frontend-u używamy aplikacji Next.js, która oferuje:

- Renderowanie Markdown do HTML
- Pasek wyszukiwania do znajdowania odpowiedniej dokumentacji
- Interfejs chatbota do zadawania pytań dotyczących dokumentacji

Aby przeprowadzić wyszukiwanie w dokumentacji, aplikacja Next.js zawiera trasę API, która wywołuje funkcję z pakietu `@smart-doc/docs`, aby pobrać fragmenty dokumentów pasujące do zapytania. Korzystając z tych fragmentów, możemy zwrócić listę stron dokumentacji istotnych dla wyszukiwania użytkownika.

Dla funkcjonalności chatbota stosujemy ten sam proces wyszukiwania, ale dodatkowo wstrzykujemy pobrane fragmenty dokumentacji do promptu wysyłanego do ChatGPT.

Oto przykład promptu wysyłanego do ChatGPT:

System prompt:

```txt
Jesteś pomocnym asystentem, który potrafi odpowiadać na pytania dotyczące dokumentacji Intlayer.

Powiązane fragmenty:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/en/getting-started"
---

# Jak zacząć

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/en/another-doc"
---

# Inny dokument

...
```

Zapytanie użytkownika:

```txt
Jak zacząć?
```

Używamy SSE do strumieniowania odpowiedzi z trasy API.

Jak wspomniano, używamy gpt-4-turbo bez trybu "myślenia". Odpowiedzi są trafne, a opóźnienia niskie.
Eksperymentowaliśmy z gpt-5, ale opóźnienia były zbyt duże (czasami do 15 sekund na odpowiedź). Jednak wrócimy do tego w przyszłości.

👉 [Wypróbuj demo tutaj](https://intlayer.org/doc/pl/why) 👉 [Sprawdź szablon kodu na GitHub](https://github.com/aymericzip/smart_doc_RAG)

</Step>

<Step number={10} title="Idąc dalej">

Ten projekt to minimalna implementacja. Możesz ją jednak rozbudować na wiele sposobów:

- Serwer MCP → funkcja wyszukiwania w dokumentacji jako serwer MCP, aby połączyć dokumentację z dowolnym asystentem AI

- Bazy danych wektorowych → skalowanie do milionów fragmentów dokumentów
- LangChain / LlamaIndex → gotowe frameworki do pipeline’ów RAG
- Panele analityczne → wizualizacja zapytań użytkowników i problemów
- Wieloźródłowe pobieranie → pobieranie nie tylko dokumentów, ale też wpisów z baz danych, postów na blogach, zgłoszeń itp.
- Ulepszone promptowanie → ponowne rankowanie, filtrowanie i wyszukiwanie hybrydowe (słowo kluczowe + semantyczne)

</Step>

<Step number={11} title="Ograniczenia, na które natrafiliśmy">

- Dzielenie na fragmenty i nakładanie się jest empiryczne. Odpowiednia równowaga (rozmiar fragmentu, procent nakładania, liczba pobieranych fragmentów) wymaga iteracji i testowania.
- Embeddingi nie są automatycznie regenerowane, gdy dokumentacja się zmienia. Nasz system resetuje embeddingi dla pliku tylko wtedy, gdy liczba fragmentów różni się od zapisanej.
- W tym prototypie embeddingi są przechowywane w formacie JSON. Działa to w demo, ale zaśmieca repozytorium Git. W produkcji lepsza jest baza danych lub dedykowany magazyn wektorów.

</Step>

<Step number={12} title="Dlaczego to ma znaczenie poza dokumentacją">

Interesująca jest nie tylko sama chatbot. To jest **pętla informacji zwrotnej**.

Dzięki RAG nie tylko odpowiadasz:

- Dowiadujesz się, co myli użytkowników.
- Odkrywasz, jakich funkcji oczekują.
- Dostosowujesz swoją strategię produktową na podstawie rzeczywistych zapytań.

**Przykład:**

Wyobraź sobie, że wprowadzasz nową funkcję i natychmiast widzisz:

- 50% pytań dotyczy tego samego niejasnego kroku konfiguracji
- Użytkownicy wielokrotnie proszą o integrację, której jeszcze nie obsługujesz
- Ludzie wyszukują terminy, które ujawniają nowe zastosowanie

To jest **inteligencja produktowa** prosto od Twoich użytkowników.

</Step>

<Step number={13} title="Podsumowanie">

RAG to jeden z najprostszych i najpotężniejszych sposobów na praktyczne wykorzystanie LLM. Łącząc **wyszukiwanie + generowanie**, możesz przekształcić statyczną dokumentację w **inteligentnego asystenta** i jednocześnie uzyskać ciągły strumień informacji o produkcie.

Dla mnie ten projekt pokazał, że RAG to nie tylko techniczny trik. To sposób na przekształcenie dokumentacji w:

- interaktywny system wsparcia
- kanał informacji zwrotnej
- narzędzie do strategii produktowej

👉 [Wypróbuj demo tutaj](https://intlayer.org/doc/why) 👉 [Sprawdź szablon kodu na GitHub](https://github.com/aymericzip/smart_doc_RAG)

A jeśli również eksperymentujesz z RAG, chętnie usłyszę, jak go używasz.

</Step>

</Steps>
