---
createdAt: 2025-06-07
updatedAt: 2026-11-03
priority: 6
title: "שרת השפה של Intlayer (LSP) עבור סביבת הפיתוח שלך"
description: למד כיצד שרת השפה של Intlayer מביא מעבר להגדרה (Go-to-Definition), חיפוש הפניות, תצוגות מקדימות בריחוף, השלמה אוטומטית של מפתחות ואבחון לסביבת הפיתוח (IDE) ולסוכן ה-AI שלך.
keywords:
  - LSP
  - Language Server
  - שרת שפה
  - Go to Definition
  - מעבר להגדרה
  - Autocompletion
  - השלמה אוטומטית
  - Diagnostics
  - אבחון
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "הוספת חיפוש הפניות (Find References), ריחוף (hover), השלמה אוטומטית ואבחון"
  - version: 8.12.0
    date: 2026-06-01
    changes: "שחרור ראשוני של ה-LSP"
author: aymericzip
---

# שרת השפה Intlayer LSP

**שרת השפה של Intlayer** הוא מימוש של [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) שהופך את ה-IDE וסוכן ה-AI שלך למודעים ל-Intlayer. הוא מחבר קריאה כמו `useIntlayer("home")` לקובץ ה-`.content.ts` שמצהיר עליה, בשני הכיוונים.

## תכונות

| תכונה                                      | קיצור דרך           | מה היא עושה                                                                                        |
| ------------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------- |
| **מעבר להגדרה (Go to Definition)**         | `F12` / `Cmd+Click` | קפיצה ממפתח מילון או משימוש בשדה להצהרה שלו בקובץ התוכן                                            |
| **איתור כל ההפניות (Find All References)** | `Shift+F12`         | מתוך קובץ תוכן, הצגת רשימה של כל מקומות הקריאה המשתמשים במפתח או בשדה זה                           |
| **ריחוף (Hover)**                          | ריחוף הסמן          | תצוגה מקדימה של שדות המילון או הערך המתורגם של שדה מסוים, מבלי לעזוב את הקובץ                      |
| **השלמה אוטומטית (Autocompletion)**        | `"` `'` `` ` `` `.` | הצעת מפתחות מילון מוצהרים בתוך פונקציית getter, ושדות תוכן לאחר `.` או בפירוק מבנה (destructuring) |
| **אבחון (Diagnostics)**                    | אוטומטי             | התרעה כאשר מפתח אינו מוצהר באף קובץ תוכן                                                           |

כדאי להכיר שתי התנהגויות נוספות:

- **מילונים ממוזגים**: מפתח המפוצל על פני מספר קובצי תוכן מחזיר תוצאה אחת לכל קובץ, כך שתוכל לנווט לכל הצהרה.
- **מודעות למונוריפו**: השרת מאתר את קובץ ה-`intlayer.config.*` ה*קרוב ביותר* לכל קובץ, כך שמספר פרויקטים בסביבת עבודה אחת מקבלים כל אחד את המילונים שלו.

### קריאות נתמכות

המפתח נקרא מתוך ארגומנט מחרוזת מיקומי או מתוך אובייקט אפשרויות (`{ namespace }`, `{ id }`).

| ספרייה                      | פונקציות קוראות                                          |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

הדבר פועל עבור כל חבילת `*-intlayer` (כגון `next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), ועבור חבילות מתאמי התאימות (compat adapters) המאפשרות לך לשמור על תחביר ה-i18n הקיים שלך.

> מילונים נקראים מתוך תוצרי הבנייה, לכן הרץ את `npx intlayer build` או השאר את שרת הפיתוח שלך פעיל, כדי לספק לשרת נתונים לפענוח.

## התקנה

השרת מופץ כקובץ בינארי בשם `intlayer-lsp` בתוך `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

התקן אותו באופן גלובלי במקום זאת (`npm install -g @intlayer/lsp`) אם העורך שלך דורש את `intlayer-lsp` ב-`PATH`. זהו המצב עבור תוסף Claude Code ועבור כל תצורה למטה שקוראת לקובץ הבינארי ישירות.

## הגדרה

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

התקן את [הרחבת Intlayer ל-VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). שרת השפה מובנה החל מגרסה v8.12.0 ומתחיל לפעול אוטומטית, **אין צורך בהגדרה נוספת**.

ראה את [תיעוד הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md) עבור שאר התכונות שלה.

- [תיעוד הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) ו-[Windsurf](https://windsurf.com/) הם פיצולים (forks) של VS Code ומשתמשים באותה מערכת הרחבות. התקן את [הרחבת Intlayer ל-VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) פעם אחת והשרת יופעל אוטומטית, **אין צורך בהגדרה נוספת**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer מציע **תוסף ל-Claude Code** המאוחסן במאגר Intlayer. הוא מעניק ל-Claude Code פענוח סמלים אמיתי עבור מפתחות המילון שלך במקום להסתמך על `grep`.

הצב את הקובץ הבינארי ב-`PATH` שלך, לאחר מכן רשום את ה-marketplace והתקן את התוסף:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

הפקודה `install` גם מפעילה את התוסף. **הפעל מחדש את Claude Code**, שרתי שפה נטענים בעת ההפעלה, ולכן לתוסף לא תהיה השפעה עד אז.

לאחר מכן Claude Code מפעיל את השרת על קובצי `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` ו-`.svelte`, ומשתמש ב-`goToDefinition`, `findReferences` ו-`hover` בעת ניווט בקוד שלך.

אם מעבר להגדרה (Go-to-Definition) עדיין אינו פועל, ייתכן שגרסת ה-Claude Code שלך חוסמת את כלי ה-LSP מאחורי דגל:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

ל-Zed יש תמיכה מובנית ב-LSP. הוסף את השרת להגדרות המשתמש שלך:

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

ממלא המקום `"..."` שומר על שרתי השפה המוגדרים כברירת מחדל ב-Zed לצד זה של Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

באמצעות [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), רשום תצורת שרת מותאמת אישית:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- הפעל את השרת באמצעות npx כך שלא תצטרך התקנה גלובלית
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

לאחר הפעלה מחדש של Neovim, לחיצה על `gd` מעל מפתח מילון תפעיל Go to Definition ו-`gr` תפעיל Find References.

  </Tab>
  <Tab label="coc.nvim" value="coc">

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="עורכים אחרים" value="other">

כל עורך התומך ב-LSP יכול להריץ את `@intlayer/lsp`. הפנה אותו אל:

- **קובץ הרצה (Executable)**: `npx @intlayer/lsp`, או הקובץ הבינארי `intlayer-lsp`
- **תעבורה (Transport)**: stdio (סטנדרטי)
- **יכולות (Capabilities)**: `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (תווים מפעילים `"` `'` `` ` `` `.`), push diagnostics, `textDocumentSync: Incremental`
- **תבניות שורש (Root patterns)**: `intlayer.config.ts`, `intlayer.config.js`, `package.json`

עיין בתיעוד ה-LSP של העורך שלך עבור פורמט התצורה המדויק.

  </Tab>
</Tabs>

## הערה לגבי סוכני AI בטרמינל

**Claude Code** פועל כלקוח LSP אמיתי. ראה את הלשונית למעלה.

**OpenAI Codex** ורוב כלי הטרמינל האחרים אינם לקוחות LSP: הם קוראים וכותבים קבצים ישירות. הרצת השרת בפני עצמה אינה עוזרת להם; הערך נובע מכך שהוא פעיל בעורך נלווה שהסוכן יכול לתשאל את האינדקס שלו (Cursor Composer, Windsurf Cascade, Copilot Chat).

## כיצד זה עובד

עבור כל קובץ, השרת מאתר את ה-`intlayer.config.*` הקרוב ביותר וטוען את תצורת הפרויקט כדי למצוא את המילונים המהודרים. התצורה, המילונים ורשימת קובצי המקור נשמרים במטמון עם זמני TTL קצרים, ומנוקים בכל פעם שקובץ תוכן מנוטר משתנה.

בעת בקשה, השרת מפענח את המסמך (באמצעות [oxc](https://oxc.rs/)) ובודק את מיקום הסמן:

1. **על מחרוזת מפתח** (`useIntlayer("home")`) ← מחזיר כל קובץ תוכן המצהיר על אותו מפתח, ממוקם בשורת ה-`key:`.
2. **על שימוש בשדה** (`content.title`, מאפיין מפורק, `t('path.to.field')`, `<Trans>`, …) ← מפענח את המשתנה בחזרה למילון שלו ומחזיר את השדה התואם בתוך קובצי התוכן.
3. **מתוך קובץ תוכן** ← מריץ חיפוש הפוך, סורק את מקורות הפרויקט עבור מקומות קריאה של אותו מפתח או שדה.

## פתרון בעיות

| תופעה                           | סיבה סבירה                | פתרון                                                            |
| ------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| דבר אינו קורה כלל               | השרת אינו פועל            | ודא ש-`@intlayer/lsp` מותקן ושהעורך שלך מפעיל אותו               |
| עובד בעורך, אך לא ב-Claude Code | התוסף הותקן באמצע הפעילות | הפעל מחדש את Claude Code, שרתי שפה נטענים בעת ההפעלה             |
| לא נמצאו הגדרות עבור מפתח       | המילונים לא נבנו          | הרץ `npx intlayer build`, או הפעל את שרת הפיתוח שלך              |
| כל מפתח מדווח כלא מוצהר         | התצורה לא פוענחה          | ודא שקובץ `intlayer.config.ts` (או `.js`) קיים בשורש הפרויקט שלך |
| פרויקט שגוי נבחר במונוריפו      | חסרה תצורה ייעודית לחבילה | הוסף `intlayer.config.*` לכל חבילה המצהירה על תוכן משלה          |
| השרת קורס בהפעלה                | גרסת ה-Node.js ישנה מדי   | נדרש Node.js בגרסה ≥ 14.18                                       |

ב-VS Code, השרת רושם ליומן ב-**View → Output → "Intlayer LSP"**, דבר שימושי לאימות התצורה שפוענחה וכמות המילונים שנמצאו.
