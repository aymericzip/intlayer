---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Oficjalne rozszerzenie VS Code
description: Dowiedz się, jak korzystać z rozszerzenia Intlayer w VS Code, aby usprawnić swój proces tworzenia oprogramowania. Szybko nawiguj między zlokalizowanymi treściami i efektywnie zarządzaj swoimi słownikami.
keywords:
  - Rozszerzenie VS Code
  - Intlayer
  - Lokalizacja
  - Narzędzia programistyczne
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Dodano demo gif
  - version: 6.1.0
    date: 2025-09-24
    changes: Dodano sekcję wyboru środowiska
  - version: 6.0.0
    date: 2025-09-22
    changes: Karta Intlayer / Komendy Fill & Test
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Oficjalne rozszerzenie VS Code

## Przegląd

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) to oficjalne rozszerzenie Visual Studio Code dla **Intlayer**, zaprojektowane w celu poprawy doświadczenia programisty podczas pracy z zlokalizowanymi treściami w Twoich projektach.

![Rozszerzenie Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Link do rozszerzenia: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funkcje

![Wyodrębnij zawartość](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_extract_content.gif?raw=true)

- **Wyodrębnij Zawartość** – Wyodrębnij zawartość z komponentów React / Vue / Svelte

![Wypełnianie słowników](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Natychmiastowa Nawigacja** – Szybko przejdź do odpowiedniego pliku z treścią, klikając na klucz `useIntlayer`.
- **Wypełnianie Słowników** – Wypełnij słowniki treściami z Twojego projektu.

![Lista poleceń](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Łatwy dostęp do poleceń Intlayer** – Buduj, pushuj, pulluj, wypełniaj, testuj słowniki treści z łatwością.

![Tworzenie pliku z treścią](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Generator deklaracji treści** – Twórz pliki słowników treści w różnych formatach (`.ts`, `.esm`, `.cjs`, `.json`).

![Testowanie słowników](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Testowanie słowników** – Testuj słowniki pod kątem brakujących tłumaczeń.

![Odbudowa słownika](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Aktualizuj swoje słowniki** – Utrzymuj swoje słowniki na bieżąco z najnowszą zawartością z Twojego projektu.

![Zakładka Intlayer (pasek aktywności)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Zakładka Intlayer (pasek aktywności)** – Przeglądaj i wyszukuj słowniki z dedykowanej bocznej zakładki z paskiem narzędzi i akcjami kontekstowymi (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Użytkowanie

### Szybka nawigacja

1. Otwórz projekt korzystający z **react-intlayer**.
2. Znajdź wywołanie `useIntlayer()`, na przykład:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` na macOS) lub **Ctrl+Click** (na Windows/Linux) na klucz (np. `"app"`).
4. VS Code automatycznie otworzy odpowiadający plik słownika, np. `src/app.content.ts`.

### Zakładka Intlayer (pasek aktywności)

Użyj bocznej zakładki do przeglądania i zarządzania słownikami:

- Otwórz ikonę Intlayer na pasku aktywności.
- W **Search** wpisuj, aby filtrować słowniki i wpisy w czasie rzeczywistym.
- W **Słownikach** przeglądaj środowiska, słowniki i pliki. Użyj paska narzędzi do operacji Build, Pull, Push, Fill, Refresh, Test oraz Create Dictionary File. Kliknij prawym przyciskiem myszy, aby uzyskać akcje kontekstowe (Pull/Push dla słowników, Fill dla plików). Aktualnie otwarty plik w edytorze jest automatycznie podświetlany w drzewie, gdy jest to możliwe.

### Dostęp do poleceń

Do poleceń możesz uzyskać dostęp z **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Build Dictionaries**
- **Push Dictionaries**
- **Pull Dictionaries**
- **Fill Dictionaries**
- **Test Dictionaries**
- **Create Dictionary File**

### Ładowanie zmiennych środowiskowych

Intlayer zaleca przechowywanie kluczy API AI, a także identyfikatora klienta i sekretu Intlayer w zmiennych środowiskowych.

Rozszerzenie może ładować zmienne środowiskowe z twojego workspace, aby uruchamiać polecenia Intlayer z odpowiednim kontekstem.

- **Kolejność ładowania (wg priorytetu)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Bez destrukcji**: istniejące wartości `process.env` nie są nadpisywane.
- **Zakres**: pliki są rozwiązywane względem skonfigurowanego katalogu bazowego (domyślnie root workspace).

#### Wybór aktywnego środowiska

- **Command Palette**: otwórz paletę i uruchom `Intlayer: Select Environment`, następnie wybierz środowisko (np. `development`, `staging`, `production`). Rozszerzenie spróbuje załadować pierwszy dostępny plik z powyższej listy priorytetów i wyświetli powiadomienie takie jak „Załadowano env z .env.<env>.local”.
- **Ustawienia**: przejdź do `Settings → Extensions → Intlayer` i ustaw:
  - **Environment**: nazwa środowiska używana do rozwiązywania plików `.env.<env>*`.
  - (Opcjonalnie) **Plik Env**: jawna ścieżka do pliku `.env`. Jeśli jest podana, ma pierwszeństwo przed listą domyślną.

#### Monorepo i niestandardowe katalogi

Jeśli twoje pliki `.env` znajdują się poza rootem workspace, ustaw **Katalog Bazowy** w `Settings → Extensions → Intlayer`. Loader będzie szukał plików `.env` względem tego katalogu.
