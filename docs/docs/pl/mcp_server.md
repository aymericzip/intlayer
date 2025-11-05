---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Dokumentacja Serwera MCP
description: Poznaj funkcje i konfigurację Serwera MCP, aby zoptymalizować zarządzanie i działanie serwera.
keywords:
  - Serwer MCP
  - Zarządzanie Serwerem
  - Optymalizacja
  - Intlayer
  - Dokumentacja
  - Konfiguracja
  - Funkcje
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Dodano konfigurację ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Dodano konfigurację Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Dodano transport SSE i zdalny serwer
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Serwer Intlayer MCP

**Serwer Intlayer MCP (Model Context Protocol)** zapewnia wsparcie IDE oparte na AI, dostosowane do ekosystemu Intlayer.

## Gdzie mogę go używać?

- W nowoczesnych środowiskach programistycznych, takich jak **Cursor**, **VS Code** oraz w każdym IDE obsługującym protokół MCP.
- W Twoim ulubionym asystencie AI, takim jak **Claude Desktop**, **Gemini**, **ChatGPT** i inne.

## Dlaczego warto używać Serwera Intlayer MCP?

Włączając Serwer Intlayer MCP w swoim IDE, zyskujesz:

- **Dokumentację świadomą kontekstu**
  Serwer MCP ładuje i udostępnia dokumentację Intlayer. Przyspiesza to konfigurację, migracje i inne działania.
  Zapewnia to, że sugestie kodu, opcje poleceń oraz wyjaśnienia są zawsze aktualne i odpowiednie.

- **Inteligentną integrację CLI**
  Uzyskaj dostęp i uruchamiaj polecenia Intlayer CLI bezpośrednio z interfejsu swojego IDE. Korzystając z serwera MCP, możesz pozwolić swojemu asystentowi AI na wykonywanie poleceń takich jak `intlayer dictionaries build` w celu aktualizacji słowników lub `intlayer dictionaries fill` do uzupełniania brakujących tłumaczeń.

> Pełną listę poleceń i opcji znajdziesz w [dokumentacji Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

## Serwer lokalny (stdio) vs Serwer zdalny (SSE)

Serwer MCP można używać na dwa sposoby:

- Serwer lokalny (stdio)
- Serwer zdalny (SSE)

### Serwer lokalny (stdio) (zalecany)

Intlayer udostępnia pakiet NPM, który można zainstalować lokalnie na swoim komputerze. Może być on zainstalowany w Twoim ulubionym IDE, takim jak VS Code, Cursor, a także w lokalnej aplikacji asystenta, takiej jak ChatGPT, Claude Desktop itp.

Ten serwer jest zalecanym sposobem korzystania z serwera MCP, ponieważ integruje wszystkie funkcje serwera MCP, w tym narzędzia CLI.

### Serwer zdalny (SSE)

Serwer MCP może być również używany zdalnie, korzystając z metody transportu SSE. Serwer ten jest hostowany przez Intlayer i jest dostępny pod adresem https://mcp.intlayer.org. Do tego serwera można uzyskać dostęp publicznie, bez żadnej autoryzacji, i jest on bezpłatny w użyciu.

Należy zauważyć, że serwer zdalny nie integruje narzędzi CLI, autouzupełniania AI itp. Zdalny serwer służy wyłącznie do interakcji z dokumentacją, aby wspomóc Twojego asystenta AI w ekosystemie Intlayer.

> Ze względu na koszty hostingu serwera, dostępność serwera zdalnego nie może być gwarantowana. Ograniczamy liczbę jednoczesnych połączeń. Zalecamy korzystanie z lokalnego serwera (stdio) jako metody transportu dla najbardziej niezawodnego doświadczenia.

---

## Konfiguracja w Cursor

Postępuj zgodnie z [oficjalną dokumentacją](https://docs.cursor.com/context/mcp), aby skonfigurować serwer MCP w Cursor.

W katalogu głównym projektu dodaj następujący plik konfiguracyjny `.cursor/mcp.json`:

### Lokalny serwer (stdio) (zalecany)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Serwer zdalny (SSE)

Aby połączyć się ze zdalnym serwerem Intlayer MCP za pomocą Server-Sent Events (SSE), możesz skonfigurować swojego klienta MCP do łączenia się z usługą hostowaną.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

To polecenie informuje Twoje IDE, aby uruchomiło serwer Intlayer MCP za pomocą `npx`, zapewniając, że zawsze używana jest najnowsza dostępna wersja, chyba że ją przypniesz.

---

## Konfiguracja w VS Code

Postępuj zgodnie z [oficjalną dokumentacją](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), aby skonfigurować serwer MCP w VS Code.

Aby korzystać z serwera Intlayer MCP w VS Code, musisz go skonfigurować w ustawieniach workspace lub użytkownika.

### Lokalny serwer (stdio) (zalecane)

Utwórz plik `.vscode/mcp.json` w katalogu głównym projektu:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Serwer zdalny (SSE)

Aby połączyć się ze zdalnym serwerem Intlayer MCP za pomocą Server-Sent Events (SSE), możesz skonfigurować swojego klienta MCP do łączenia się z usługą hostowaną.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Konfiguracja w ChatGPT

### Serwer zdalny (SSE)

Postępuj zgodnie z [oficjalną dokumentacją](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server), aby skonfigurować serwer MCP w ChatGPT.

1. Przejdź do [panelu promptów](https://platform.openai.com/prompts)
2. Kliknij `+ Create`
3. Kliknij `Tools (Create or +)`
4. Wybierz `MCP Server`
5. Kliknij `Add new`
6. Wypełnij następujące pola:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Kliknij `Save`

---

## Konfiguracja w Claude Desktop

Postępuj zgodnie z [oficjalną dokumentacją](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server), aby skonfigurować serwer MCP w Claude Desktop.

Ścieżka do pliku konfiguracyjnego:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Lokalny serwer (stdio) (zalecane)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Korzystanie z serwera MCP przez CLI

Możesz również uruchomić serwer Intlayer MCP bezpośrednio z linii poleceń do testowania, debugowania lub integracji z innymi narzędziami.

```bash
# Instalacja globalna
npm install -g @intlayer/mcp

# Lub użycie bezpośrednio przez npx (zalecane)
npx @intlayer/mcp
```

---
