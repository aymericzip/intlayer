---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Документация MCP сервера
description: Изучите возможности и настройку MCP сервера для оптимизации управления и работы вашего сервера.
keywords:
  - MCP сервер
  - Управление сервером
  - Оптимизация
  - Intlayer
  - Документация
  - Настройка
  - Возможности
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Добавлена настройка ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Добавлена настройка Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Добавлен SSE транспорт и удалённый сервер
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# MCP сервер Intlayer

**MCP сервер Intlayer (Model Context Protocol)** предоставляет помощь в IDE с поддержкой ИИ, адаптированную для экосистемы Intlayer.

## Где можно использовать?

- В современных средах разработки, таких как **Cursor**, **VS Code** и любой IDE, поддерживающей протокол MCP.
- В вашем любимом AI-ассистенте, таком как **Claude Desktop**, **Gemini**, **ChatGPT** и др.

## Почему использовать MCP сервер Intlayer?

Включив MCP сервер Intlayer в вашей IDE, вы получаете:

- **Контекстно-зависимая документация**  
  MCP сервер загружает и предоставляет документацию Intlayer. Это ускоряет вашу настройку, миграции и прочее.  
  Это гарантирует, что предложения кода, параметры команд и объяснения всегда актуальны и релевантны.

- **Умная интеграция CLI**  
  Получайте доступ и запускайте команды Intlayer CLI прямо из интерфейса вашей IDE. Используя MCP сервер, вы можете позволить вашему AI-ассистенту выполнять команды, такие как `intlayer dictionaries build` для обновления словарей или `intlayer dictionaries fill` для заполнения отсутствующих переводов.

  > Полный список команд и опций смотрите в [документации Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## Локальный сервер (stdio) против удалённого сервера (SSE)

MCP сервер можно использовать двумя способами:

- Локальный сервер (stdio)
- Удалённый сервер (SSE)

### Локальный сервер (stdio) (рекомендуется)

Intlayer предоставляет пакет NPM, который можно установить локально на вашем компьютере. Его можно установить в вашей любимой IDE, такой как VS Code, Cursor, а также в вашем локальном помощнике, например ChatGPT, Claude Desktop и др.

Этот сервер является рекомендуемым способом использования MCP сервера, так как он интегрирует все функции MCP сервера, включая инструменты CLI.

### Удалённый сервер (SSE)

MCP сервер также можно использовать удалённо, используя транспортный метод SSE. Этот сервер размещён Intlayer и доступен по адресу https://mcp.intlayer.org. К этому серверу можно получить публичный доступ без аутентификации, и он бесплатен для использования.

Обратите внимание, что удалённый сервер не интегрирует инструменты CLI, автозаполнение AI и т.д. Удалённый сервер предназначен только для взаимодействия с документацией, чтобы помочь вашему AI помощнику с экосистемой Intlayer.

> Из-за затрат на хостинг сервера доступность удалённого сервера не гарантируется. Мы ограничиваем количество одновременных подключений. Рекомендуем использовать локальный сервер (stdio) для наиболее стабильной работы.

---

## Настройка в Cursor

Следуйте [официальной документации](https://docs.cursor.com/context/mcp) для настройки MCP сервера в Cursor.

В корне вашего проекта добавьте следующий конфигурационный файл `.cursor/mcp.json`:

### Локальный сервер (stdio) (рекомендуется)

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

### Удалённый сервер (SSE)

Для подключения к удалённому MCP серверу Intlayer с использованием Server-Sent Events (SSE) вы можете настроить ваш MCP клиент для подключения к размещённому сервису.

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

Это указывает вашей IDE запускать MCP сервер Intlayer с помощью `npx`, гарантируя, что всегда используется последняя доступная версия, если вы её не зафиксировали.

---

## Настройка в VS Code

Следуйте [официальной документации](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) для настройки MCP сервера в VS Code.

Чтобы использовать MCP сервер Intlayer с VS Code, необходимо настроить его в настройках рабочего пространства или пользователя.

### Локальный сервер (stdio) (рекомендуется)

Создайте файл `.vscode/mcp.json` в корне вашего проекта:

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

### Удалённый сервер (SSE)

Для подключения к удалённому MCP серверу Intlayer с использованием Server-Sent Events (SSE) вы можете настроить ваш MCP клиент для подключения к размещённому сервису.

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

## Настройка в ChatGPT

### Удалённый сервер (SSE)

Следуйте [официальной документации](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) для настройки MCP сервера в ChatGPT.

1. Перейдите в [панель промптов](https://platform.openai.com/prompts)
2. Нажмите `+ Create`
3. Нажмите `Tools (Create or +)`
4. Выберите `MCP Server`
5. Нажмите `Add new`
6. Заполните следующие поля:

   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Нажмите `Save`

---

## Настройка в Claude Desktop

Следуйте [официальной документации](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server), чтобы настроить MCP сервер в Claude Desktop.

Путь к файлу конфигурации:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Локальный сервер (stdio) (рекомендуется)

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

## Использование MCP Server через CLI

Вы также можете запустить сервер Intlayer MCP напрямую из командной строки для тестирования, отладки или интеграции с другими инструментами.

```bash
# Установить глобально
npm install -g @intlayer/mcp

# Или использовать напрямую через npx (рекомендуется)
npx @intlayer/mcp
```

---
