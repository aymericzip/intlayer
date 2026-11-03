---
createdAt: 2025-06-07
updatedAt: 2026-11-03
priority: 6
title: "שרת Intlayer MCP עבור עוזרי AI"
description: "חבר את שרת Intlayer MCP ל-Cursor, VS Code או Claude Desktop כדי שעוזר ה-AI שלך יוכל לקרוא את התיעוד ולעזור בהגדרת Intlayer."
keywords:
  - MCP Server
  - שרת MCP
  - Server Management
  - ניהול שרת
  - Optimization
  - אופטימיזציה
  - Intlayer
  - Documentation
  - תיעוד
  - Setup
  - הגדרה
  - Features
slugs:
  - doc
  - mcp-server
history:
  - version: 9.3.3
    date: 2026-08-21
    changes: "קיבוץ סעיפי הגדרת הפלטפורמות לתוך לשוניות (tabs)"
  - version: 5.5.12
    date: 2025-07-11
    changes: "הוספת הגדרה עבור ChatGPT"
  - version: 5.5.12
    date: 2025-07-10
    changes: "הוספת הגדרה עבור Claude Desktop"
  - version: 5.5.12
    date: 2025-07-10
    changes: "הוספת תעבורת Streamable HTTP ושרת מרוחק"
  - version: 5.5.10
    date: 2025-06-29
    changes: "אתחול היסטוריה"
author: aymericzip
---

# שרת Intlayer MCP

**שרת ה-MCP (Model Context Protocol) של Intlayer** מספק סיוע מבוסס AI בסביבת הפיתוח (IDE), המותאם במיוחד לאקוסיסטם של Intlayer.

## היכן ניתן להשתמש בו?

- בסביבות פיתוח מודרניות כגון **Cursor**, **VS Code** וכל IDE התומך בפרוטוקול MCP.
- בעוזרי ה-AI המועדפים עליך כגון **Claude Desktop**, **Gemini**, **ChatGPT** ועוד.

## מדוע להשתמש בשרת Intlayer MCP?

על ידי הפעלת שרת ה-Intlayer MCP ב-IDE שלך, תפתח:

- **תיעוד מודע-הקשר (Context-Aware Documentation)**
  שרת ה-MCP טוען וחושף את התיעוד של Intlayer, כדי להאיץ את ההגדרה שלך, תהליכי הגירה ועוד.
  זה מבטיח שהצעות הקוד, אפשרויות הפקודות וההסברים יהיו תמיד מעודכנים ורלוונטיים.

- **שילוב חכם עם ה-CLI**
  גישה והרצה של פקודות Intlayer CLI ישירות מממשק ה-IDE שלך. באמצעות שרת ה-MCP, תוכל לאפשר לעוזר ה-AI שלך להריץ פקודות כגון `intlayer dictionaries build` כדי לעדכן את המילונים שלך, או `intlayer dictionaries fill` כדי למלא תרגומים חסרים.

  > צפה ברשימה המלאה של פקודות ואפשרויות ב[תיעוד של Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

## שרת מקומי (stdio) לעומת שרת מרוחק (Streamable HTTP)

ניתן להשתמש בשרת ה-MCP בשתי דרכים:

- שרת מקומי (stdio)
- שרת מרוחק (Streamable HTTP)

### שרת מקומי (stdio) (מומלץ)

Intlayer מספק חבילת NPM שניתן להתקין מקומית במחשב שלך. ניתן להתקין אותה ב-IDE המועדף עליך, כגון VS Code, Cursor, וכן באפליקציית העוזר המקומית שלך, כגון ChatGPT, Claude Desktop ועוד.

שרת זה הוא הדרך המומלצת לשימוש בשרת ה-MCP, שכן הוא משלב את כל התכונות של שרת ה-MCP, כולל כלי ה-CLI.

### שרת מרוחק (Streamable HTTP)

ניתן להשתמש בשרת ה-MCP גם מרחוק, באמצעות שיטת התעבורה Streamable HTTP. שרת זה מתארח על ידי Intlayer וזמין בכתובת https://mcp.intlayer.org. הגישה לשרת זה היא ציבורית, ללא צורך באימות, והוא חופשי לשימוש.

שים לב שהשרת המרוחק אינו כולל כלי CLI, השלמת קוד מבוססת AI וכדומה. השרת המרוחק מיועד רק לאינטראקציה עם התיעוד כדי לסייע לעוזר ה-AI שלך באקוסיסטם של Intlayer.

> עקב עלויות אירוח שרתים, זמינות השרת המרוחק אינה מובטחת בכל עת. אנו מגבילים את מספר החיבורים הבו-זמניים. אנו ממליצים להשתמש בשיטת התעבורה של שרת מקומי (stdio) לחוויה האמינה ביותר.

## הגדרה דרך Intlayer CLI (מומלץ)

Intlayer מספק פקודת CLI כדי להגדיר אוטומטית את שרת ה-MCP בפרויקט שלך.

```bash packageManager="npm"
npx intlayer init mcp
```

```bash packageManager="yarn"
yarn intlayer init mcp
```

```bash packageManager="pnpm"
pnpm intlayer init mcp
```

```bash packageManager="bun"
bun x intlayer init mcp
```

פקודה זו:

1. תשאל באיזו פלטפורמה אתה משתמש (Cursor, VS Code, Claude Desktop וכו').
2. תשאל באיזו שיטת תעבורה תרצה להשתמש (שרת מקומי (stdio) או שרת מרוחק (Streamable HTTP)).
3. תעדכן אוטומטית את קובץ התצורה שלך (למשל `.cursor/mcp.json`, `.vscode/mcp.json`, או תצורת Claude Desktop הגלובלית).

## הגדרה דרך הרחבת Intlayer ל-VS Code

1. פתח את לוח הפקודות (Ctrl+Shift+P או Cmd+Shift+P).
2. הקלד `Intlayer: Setup AI Agent Skills`
3. בחר בפלטפורמה שבה אתה משתמש (למשל `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` ועוד).
4. בחר את ה-MCP להתקנה (stdio, Streamable HTTP).
5. לחץ Enter.

## הגדרה ידנית

<Tabs defaultTab="cursor">
  <Tab label="Cursor" value="cursor">

### הגדרה ב-Cursor

עקוב אחר [התיעוד הרשמי](https://docs.cursor.com/context/mcp) להגדרת שרת MCP ב-Cursor.

בשורש הפרויקט שלך, הוסף את קובץ התצורה הבא `.cursor/mcp.json`:

#### שרת מקומי (stdio) (מומלץ)

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

#### שרת מרוחק (Streamable HTTP)

עבור חיבור לשרת Intlayer MCP מרוחק באמצעות Streamable HTTP, תוכל להגדיר את לקוח ה-MCP שלך להתחבר לשירות המאוחסן:

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

פעולה זו מורה ל-IDE שלך להפעיל את שרת ה-Intlayer MCP באמצעות `npx`, מה שמבטיח שימוש תמידי בגרסה העדכנית ביותר הזמינה אלא אם הצמדת גרסה מסוימת.

  </Tab>
  <Tab label="VS Code" value="vscode">

### הגדרה ב-VS Code

עקוב אחר [התיעוד הרשמי](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) להגדרת שרת MCP ב-VS Code.

כדי להשתמש בשרת Intlayer MCP עם VS Code, עליך להגדיר אותו בסביבת העבודה או בהגדרות המשתמש שלך.

#### שרת מקומי (stdio) (מומלץ)

צור קובץ `.vscode/mcp.json` בשורש הפרויקט שלך:

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

#### שרת מרוחק (Streamable HTTP)

עבור חיבור לשרת Intlayer MCP מרוחק באמצעות Streamable HTTP, תוכל להגדיר את לקוח ה-MCP שלך להתחבר לשירות המאוחסן:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

  </Tab>
  <Tab label="ChatGPT" value="chatgpt">

### הגדרה ב-ChatGPT

#### שרת מרוחק (Streamable HTTP)

עקוב אחר [התיעוד הרשמי](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) להגדרת שרת MCP ב-ChatGPT.

1. עבור אל [לוח הבקרה של הפרומפטים](https://platform.openai.com/prompts).
2. לחץ על `+ Create`.
3. לחץ על `Tools (Create or +)`.
4. בחר ב-`MCP Server`.
5. לחץ על `Add new`.
6. מלא את השדות הבאים:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. לחץ על `Save`.

  </Tab>
  <Tab label="Claude Desktop" value="claude-desktop">

### הגדרה ב-Claude Desktop

עקוב אחר [התיעוד הרשמי](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) להגדרת שרת MCP ב-Claude Desktop.

נתיב קובץ התצורה:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

#### שרת מקומי (stdio) (מומלץ)

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

#### שרת מרוחק (Streamable HTTP)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.intlayer.org"]
    }
  }
}
```

  </Tab>
  <Tab label="Claude Code (CLI)" value="claude-code">

### הגדרה ב-Claude Code (CLI)

עקוב אחר [התיעוד הרשמי](https://modelcontextprotocol.io/quickstart/user) להגדרת שרת MCP ב-Claude Code.

#### שרת מקומי (stdio) (מומלץ)

לחיבור שרת Intlayer MCP ל-Claude Code באמצעות stdio:

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

#### שרת מרוחק (Streamable HTTP)

לחיבור שרת Intlayer MCP ל-Claude Code באמצעות Streamable HTTP (SSE):

```bash
claude mcp add intlayer https://mcp.intlayer.org -t http
```

  </Tab>
</Tabs>

## שימוש בשרת MCP דרך ה-CLI

תוכל גם להריץ את שרת Intlayer MCP ישירות משורת הפקודה לצורך בדיקה, ניפוי שגיאות או שילוב עם כלים אחרים.

```bash
# התקנה גלובלית
npm install -g @intlayer/mcp

# או שימוש ישיר באמצעות npx (מומלץ)
npx @intlayer/mcp
```
