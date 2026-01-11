---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Документація MCP Server
description: Дослідіть функції та налаштування MCP Server, щоб оптимізувати управління сервером і операції.
keywords:
  - MCP Server
  - Управління сервером
  - Оптимізація
  - Intlayer
  - Документація
  - Налаштування
  - Функції
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Додано налаштування ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Додано налаштування Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Додано SSE-транспорт і віддалений сервер
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Документація MCP Server

Сервер **Intlayer MCP (Model Context Protocol)** надає підтримку IDE на базі AI, адаптовану для екосистеми Intlayer.

## Де його можна використовувати?

- У сучасних середовищах розробки, таких як **Cursor**, **VS Code**, та будь-якому IDE, яке підтримує протокол MCP.
- У вашому улюбленому AI-асистенті, наприклад **Claude Desktop**, **Gemini**, **ChatGPT** тощо.

## Чому варто використовувати сервер Intlayer MCP?

Увімкнувши сервер Intlayer MCP у вашому IDE, ви отримуєте доступ до:

- **Контекстно-залежна документація**
  MCP-сервер завантажує й надає документацію Intlayer, щоб прискорити налаштування, міграції тощо.
  Це гарантує, що підказки коду, параметри команд та пояснення завжди актуальні та релевантні.

- **Розумна інтеграція CLI**
  Отримуйте доступ і запускайте команди Intlayer CLI безпосередньо з інтерфейсу вашого IDE. Використовуючи MCP server, ви можете дозволити своєму AI-помічнику виконувати команди, такі як `intlayer dictionaries build` для оновлення словників, або `intlayer dictionaries fill` для заповнення відсутніх перекладів.

> Перегляньте повний список команд та опцій у [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

## Локальний сервер (stdio) проти Віддаленого сервера (SSE)

MCP server можна використовувати двома способами:

- Локальний сервер (stdio)
- Віддалений сервер (SSE)

### Локальний сервер (stdio) (рекомендовано)

Intlayer надає пакет NPM, який можна встановити локально на вашому комп’ютері. Його можна інтегрувати в улюблене IDE, як-от VS Code або Cursor, а також у вашу локальну програму асистента, таку як ChatGPT, Claude Desktop тощо.

Цей сервер є рекомендованим способом використання MCP‑сервера, оскільки він інтегрує всі можливості MCP‑сервера, включно з CLI‑інструментами.

### Віддалений сервер (SSE)

MCP‑сервер також можна використовувати віддалено, використовуючи транспортний метод SSE. Цей сервер хоститься Intlayer і доступний за адресою https://mcp.intlayer.org. До сервера можна підключитися публічно, без автентифікації, і його використання безкоштовне.

Зверніть увагу, що віддалений сервер не інтегрує CLI-інструменти, AI-автозавершення тощо. Дистанційний сервер призначений лише для взаємодії з документацією, щоб допомогти вашому AI-асистентові з екосистемою Intlayer.

> Через витрати на хостинг доступність віддаленого сервера не може бути гарантована. Ми обмежуємо кількість одночасних підключень. Для найнадійнішої роботи ми рекомендуємо використовувати локальний сервер з транспортом stdio.

---

## Налаштування в Cursor

Дотримуйтесь [офіційної документації](https://docs.cursor.com/context/mcp), щоб налаштувати MCP-сервер у Cursor.

У корені вашого проєкту додайте наступний конфігураційний файл `.cursor/mcp.json`:

### Локальний сервер (stdio) (рекомендовано)

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

### Віддалений сервер (SSE)

Для підключення до віддаленого Intlayer MCP сервера за допомогою Server-Sent Events (SSE), ви можете налаштувати ваш MCP клієнт на підключення до хостингу.

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

Це вказує вашому IDE запускати Intlayer MCP server за допомогою `npx`, гарантує, що він завжди використовує останню доступну версію, якщо ви її не закріпите.

---

## Налаштування в VS Code

Дотримуйтесь [офіційної документації](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) для налаштування MCP сервера у VS Code.

Щоб використовувати Intlayer MCP Server у VS Code, потрібно налаштувати його в налаштуваннях робочого простору або у користувацьких налаштуваннях.

### Локальний сервер (stdio) (рекомендується)

Створіть файл `.vscode/mcp.json` у корені вашого проєкту:

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

### Віддалений сервер (SSE)

Щоб підключитися до віддаленого Intlayer MCP сервера через Server-Sent Events (SSE), ви можете налаштувати ваш MCP-клієнт на підключення до хостингованого сервісу.

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

## Налаштування в ChatGPT

### Віддалений сервер (SSE)

Дотримуйтесь [офіційної документації](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server), щоб налаштувати MCP сервер у ChatGPT.

1. Перейдіть на [панель підказок](https://platform.openai.com/prompts)
2. Натисніть `+ Create`
3. Натисніть `Tools (Create or +)`
4. Виберіть `MCP Server`
5. Натисніть `Add new`
6. Заповніть наступні поля:
   - URL: `https://mcp.intlayer.org`
   - Мітка: `Intlayer MCP Server`
   - Назва: `intlayer-mcp-server`
   - Аутентифікація: `None`

7. Натисніть `Save`

---

## Налаштування в Claude Desktop

Дотримуйтесь [офіційної документації](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) щоб налаштувати MCP-сервер у Claude Desktop.

Шлях до файлу конфігурації:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Локальний сервер (stdio) (рекомендовано)

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

## Використання MCP-сервера через CLI

Ви також можете запускати Intlayer MCP-сервер безпосередньо з командного рядка для тестування, налагодження або інтеграції з іншими інструментами.

```bash
# Встановити глобально
npm install -g @intlayer/mcp

# Або використовувати безпосередньо через npx (рекомендовано)
npx @intlayer/mcp
```

---
