---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: خادم Intlayer LSP
description: تعرف على كيفية توفير خادم لغة Intlayer لميزة الانتقال إلى التعريف وميزات IDE الأخرى لاستدعاءات useIntlayer وgetIntlayer والاستدعاءات ذات الصلة عبر جميع المحررات المدعومة.
keywords:
  - LSP
  - خادم اللغة
  - الانتقال إلى التعريف
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# خادم Intlayer LSP

**خادم لغة Intlayer (LSP)** هو تطبيق لـ [بروتوكول خادم اللغة (LSP)](https://microsoft.github.io/language-server-protocol/) يعمل على تحسين بيئة التطوير المتكاملة (IDE) الخاصة بك بذكاء يدعم Intlayer. يوفر حاليًا ميزة **الانتقال إلى التعريف (Go to Definition)** لاستدعاءات مفاتيح القاموس، مما يتيح لك الانتقال مباشرة من `useIntlayer("my-key")` في مكونك إلى ملف `.content.ts` الذي يعلن عنه.

---

## لماذا تستخدم الـ LSP؟

عند استخدام Intlayer، يكون الاتصال بين استدعاء مثل `useIntlayer("homepage")` والإعلان عنه في `src/homepage.content.ts` ضمنيًا. بدون أدوات، يجب عليك البحث عن الملف يدويًا. يجعل الـ LSP هذا الرابط صريحًا:

**وعي وكيل الذكاء الاصطناعي**

تعتمد وكلاء البرمجة القائمون على الذكاء الاصطناعي (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) على خادم اللغة لحل الرموز وفهم العلاقات عبر الملفات. مع تشغيل خادم لغة Intlayer، يمكن للوكلاء تتبع `useIntlayer("key")` للعودة إلى إعلانه، مما يمنحهم سياقًا دقيقًا حول مفاتيح المحتوى المتاحة، وهيكل كل قاموس، والملفات التي يجب قراءتها أو تحريرها.

**الانتقال إلى التعريف**

ضع المؤشر على أي سلسلة مفاتيح قاموس داخل استدعاء جلب مدعوم واضغط على `F12` (أو `Cmd/Ctrl+Click`). يفتح المحرر ملف إعلان المحتوى ويضع المؤشر على سطر `:key`.

**دعم القواميس المدمجة**

يمكن تقسيم المفتاح عبر ملفات محتوى متعددة (يقوم Intlayer بدمجها). يعيد الخادم موقعًا واحدًا (`Location`) لكل ملف مصدر بحيث يمكنك التنقل إلى كل إعلان.

**يعمل في كل مكان**

يدعم جميع حزم `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### استدعاءات الجلب المدعومة

يكتشف الخادم استدعاءات الوظائف التالية ويستخرج الوسيط الأول لسلسلة الأحرف كمفتاح للقاموس:

| الوظيفة       | مثال                          |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

يتم تجاهل جينيريك TypeScript والوسائط الإضافية — فقط سلسلة المفاتيح هي ما يهم.

> تأخذ `useDictionary` و`getDictionary` كائن `Dictionary` مستورد بالفعل كوسيط أول لها بدلاً من مفتاح سلسلة أحرف، لذا فهي لا تستفيد من ميزة الانتقال إلى التعريف ولا يتم تتبعها بواسطة الخادم.

---

## التثبيت

يتم توزيع خادم LSP كجزء من حزمة `@intlayer/lsp`:

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

تكشف الحزمة عن الملف الثنائي `intlayer-lsp` الذي تستخدمه المحررات كملف تشغيلي للخادم.

---

## الإعداد كملحق لـ Claude Code

يتوفر خادم لغة Intlayer كـ **ملحق لـ Claude Code** يتم استضافته مباشرة في مستودع Intlayer على GitHub. يمنح تثبيته وعيًا أصيلاً لـ Claude Code بميزة الانتقال إلى التعريف لجميع استدعاءات `useIntlayer` / `getIntlayer` الخاصة بك.

### 1. تثبيت الملف الثنائي لخادم اللغة

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

يضع هذا الملف الثنائي `intlayer-lsp` في مسار PATH الخاص بك، وهو ما يستدعيه إدخال `lspServers` الخاص بالملحق.

### 2. تسجيل سوق Intlayer وتثبيت الملحق

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

سيضيف Claude Code القيمة `"intlayer-lsp@intlayer": true` إلى قائمة الـ `enabledPlugins` الخاصة بك ويبدأ خادم اللغة تلقائيًا في أنواع الملفات المدعومة (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. تمكين أداة LSP (إذا لم تكن نشطة بالفعل)

تتطلب بعض إصدارات Claude Code تعيين علامة ميزة LSP. أضف ما يلي إلى ملف `~/.claude/settings.json` إذا كانت ميزة الانتقال إلى التعريف لا تعمل بعد التثبيت:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

أعد تشغيل Claude Code — سيعتمد الآن على `goToDefinition` و`findReferences` وعمليات LSP الأخرى عند التنقل في قاعدة كود Intlayer بدلاً من الرجوع إلى `grep`.

---

## الإعداد في VS Code (عبر الملحق — موصى به)

إذا كان لديك [ملحق Intlayer لـ VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) مثبتًا، فسيبدأ خادم اللغة تلقائيًا. لا يلزم إعداد إضافي.

> راجع [وثائق ملحق VS Code](https://intlayer.org/doc/vs-code-extension) لمعرفة كيفية التثبيت والميزات الأخرى.

---

## الإعداد اليدوي في VS Code

إذا كنت لا تستخدم ملحق Intlayer، فيمكنك توصيل خادم اللغة يدويًا باستخدام ملحق عميل LSP عام مثل [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) أو عن طريق كتابة ملحق صغير خاص بك. الطريقة الموصى بها هي استخدام ملحق Intlayer.

كمرجع، يتم تشغيل الخادم عبر الملف الثنائي `intlayer-lsp` عبر stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

يقرأ ملحق Intlayer هذه الإعدادات لتشغيل الخادم. إذا كنت تعتمد فقط على الملحق، فلن تحتاج إلى أي إعدادات يدوية.

---

## الإعداد في Cursor

[Cursor](https://www.cursor.com/) هو نسخة مخصصة من VS Code تأتي بميزات ذكاء اصطناعي مدمجة. ويستخدم نفس نظام الملحقات البيئي، لذا فإن **ملحق Intlayer لـ VS Code** يعمل بدون أي إعداد إضافي — قم بتثبيته مرة واحدة وسيكتشفه Cursor تلقائيًا.

إذا كنت تفضل الإعداد اليدوي، يقرأ Cursor أيضًا ملف `.vscode/settings.json` من جذر مساحة العمل، لذا ينطبق رمز VS Code أعلاه مباشرة.

---

## الإعداد في Windsurf

[Windsurf](https://windsurf.com/) (من تطوير Codeium) هو محرر آخر يعتمد على VS Code. قم بتثبيت ملحق Intlayer من سوق VS Code وسينشط خادم اللغة تلقائيًا، تمامًا كما هو الحال في VS Code وCursor.

للإعداد اليدوي، أنشئ ملف `.vscode/settings.json` في جذر المشروع:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## الإعداد في Zed

يتميز [Zed](https://zed.dev/) بدعم LSP أصيل من خلال إعدادات اللغة. أضف إدخالاً في إعدادات مستخدم Zed الخاصة بك (`~/.config/zed/settings.json`):

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
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

يخبر العنصر النائب `"..."` محرر Zed بالاحتفاظ بخوادم اللغة الافتراضية جنبًا إلى جنب مع خادم Intlayer.

---

## الإعداد لواجهات خط أوامر وكلاء الذكاء الاصطناعي (Claude Code، Codex، إلخ)

يتمتع **Claude Code** بدعم من الدرجة الأولى لملحقات LSP — اتبع [إعداد ملحق Claude Code](#الإعداد-كملحق-لـ-claude-code) أعلاه للحصول على تجربة الانتقال إلى التعريف الكاملة مباشرة في جلسات الطرفية الخاصة بك.

لا تعمل **OpenAI Codex** وأدوات الطرفية الأخرى كعملاء LSP حتى الآن — فهي تقرأ وتكتب الملفات مباشرة بدلاً من الحفاظ على جلسة خادم لغة مستمرة. بالنسبة لهذه الأدوات، تأتي قيمة تشغيل خادم لغة LSP بشكل غير مباشر: عندما يكون الخادم نشطًا في محرر مصاحب (VS Code, Cursor, Windsurf, ...)، يتوفر فهرس المحرر المباشر لأي وكيل ذكاء اصطناعي يمكنه الاستعلام عنه من خلال السياق الذي يوفره المحرر (على سبيل المثال، Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

إذا كنت تعمل فقط في الطرفية دون فتح محرر، يمكنك بدء خادم اللغة في الخلفية حتى يكون جاهزًا لأي محرر يتصل لاحقًا بمساحة العمل نفسها:

```bash
# حافظ على تشغيل الخادم في الخلفية
npx @intlayer/lsp &
```

---

## الإعداد اليدوي في Neovim

باستخدام [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)، قم بتسجيل إعداد خادم مخصص:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- قم بتشغيل الخادم باستخدام npx حتى لا تحتاج إلى تثبيت عالمي
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

بعد إعادة تشغيل Neovim، سيؤدي الضغط على `gd` فوق مفتاح Intlayer إلى استدعاء ميزة الانتقال إلى التعريف.

---

## الإعداد اليدوي في المحررات الأخرى

يمكن لأي محرر يدعم بروتوكول خادم اللغة استخدام `@intlayer/lsp`. مواصفات الخادم:

- **النقل** – Node.js IPC / stdio (قياسي)
- **الملف التشغيلي** – `npx @intlayer/lsp` (أو الملف الثنائي `intlayer-lsp` المثبت محليًا)
- **القدرات** – `definitionProvider: true`, `textDocumentSync: Incremental`

استشر وثائق LSP الخاصة بمحررك لمعرفة تنسيق الإعداد الدقيق (على سبيل المثال، `languageserver.json` لـ [coc.nvim](https://github.com/neoclide/coc.nvim)، أو إعدادات عميل LSP في [Helix](https://helix-editor.com)).

### مثال: coc.nvim

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

### مثال: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## كيف يعمل؟

عندما يبدأ الخادم، فإنه يقوم بحل إعداد Intlayer من جذر مساحة العمل باستخدام `getConfiguration()`. يمنحه هذا مسارات `build` و`system` اللازمة للعثور على القواميس المترجمة.

عند كل طلب **انتقال إلى التعريف**:

1. يقرأ الخادم النص الكامل للمستند المفتوح.
2. يقوم بمسح استدعاءات الجلب (`useIntlayer`، `getIntlayer`، إلخ) باستخدام تعبير نمطي.
3. يتحقق مما إذا كان موضع المؤشر يقع داخل أحد تلك الاستدعاءات.
4. إذا كان الأمر كذلك، فإنه يستخرج مفتاح القاموس (مجموعة الالتقاط 3 من التعبير النمطي) ويستدعي `getUnmergedDictionaries()` لتحديد موقع كل ملف محتوى يعلن عن هذا المفتاح.
5. يقرأ كل ملف مطابق ويبحث عن السطر الدقيق الذي يحتوي على `"key: "<key"` لوضع المؤشر بدقة.
6. يعيد مصفوفة من كائنات `Location` — واحد لكل ملف مصدر.

يتم حل الإعداد بشكل كسول وتخزينه مؤقتًا لكل جلسة؛ ويتم إعادة تعيينه عند كل طلب `initialize` (على سبيل المثال، عند فتح مجلد مساحة عمل جديد).

---

## استكشاف الأخطاء وإصلاحها

| العرض                              | السبب المحتمل           | الحل                                                                               |
| ---------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| الانتقال إلى التعريف لا يفعل شيئًا | الخادم لا يعمل          | تحقق من تثبيت `@intlayer/lsp` وأن المحرر يقوم بتشغيله                              |
| تم اكتشاف جذر مساحة عمل خاطئ       | مجلدات مساحة عمل متعددة | تأكد من أن المجلد الذي يحتوي على `intlayer.config.ts` هو المجلد الأول لمساحة العمل |
| لم يتم العثور على تعريفات للمفتاح  | لم يتم حل الإعداد       | تحقق من وجود `intlayer.config.ts` (أو `.js`) في جذر مساحة العمل                    |
| الخادم يتعطل عند البدء             | إصدار Node.js قديم جدًا | يتطلب Node.js ≥ 14.18                                                              |
