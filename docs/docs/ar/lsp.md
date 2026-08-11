---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: خادم LSP الخاص بـ Intlayer
description: تعرّف على كيفية إتاحة خادم اللغة الخاص بـ Intlayer للانتقال إلى التعريف، والبحث عن المراجع، والمعاينة عند التحويم، والإكمال التلقائي للمفاتيح، والتشخيصات داخل محرّرك ووكيل الذكاء الاصطناعي لديك.
keywords:
  - LSP
  - خادم اللغة
  - Go to Definition
  - الإكمال التلقائي
  - التشخيصات
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
    changes: "إضافة البحث عن المراجع والتحويم والإكمال التلقائي والتشخيصات"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# خادم LSP الخاص بـ Intlayer

**خادم اللغة الخاص بـ Intlayer** هو تنفيذ لـ [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) يجعل محرّرك — ووكيل الذكاء الاصطناعي لديك — على دراية بـ Intlayer. فهو يربط استدعاءً مثل `useIntlayer("home")` بملف `.content.ts` الذي يصرّح عنه، في الاتجاهين معًا.

---

## المزايا

| الميزة                   | الاختصار            | الوصف                                                                                |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------ |
| **الانتقال إلى التعريف** | `F12` / `Cmd+نقر`   | الانتقال من مفتاح قاموس أو موضع استخدام حقل إلى تصريحه في ملف المحتوى                |
| **البحث عن كل المراجع**  | `Shift+F12`         | من ملف محتوى، سرد كل مواضع الاستدعاء التي تستخدم ذلك المفتاح أو الحقل                |
| **التحويم**              | مرّر المؤشر فوقه    | معاينة حقول القاموس، أو القيمة المترجمة لحقل ما، دون مغادرة الملف                    |
| **الإكمال التلقائي**     | `"` `'` `` ` `` `.` | اقتراح مفاتيح القواميس المصرّح بها داخل الدالة، وحقول المحتوى بعد `.` أو عند التفكيك |
| **التشخيصات**            | تلقائي              | التحذير عندما لا يكون المفتاح مصرّحًا به في أي ملف محتوى                             |

هناك سلوكان إضافيان يستحقان المعرفة:

- **القواميس المدمجة** — المفتاح الموزّع على عدة ملفات محتوى يُعيد نتيجة واحدة لكل ملف، بحيث يمكنك الانتقال إلى كل تصريح.
- **متوافق مع المستودعات الأحادية** — يحدّد الخادم ملف `intlayer.config.*` _الأقرب_ إلى كل ملف، بحيث يحصل كل مشروع ضمن مساحة العمل نفسها على قواميسه الخاصة.

### الاستدعاءات المدعومة

يُقرأ المفتاح إمّا من وسيط نصّي موضعي أو من كائن خيارات (`{ namespace }`، `{ id }`).

| المكتبة                     | الاستدعاءات                                              |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

يعمل هذا مع كل حزم `*-intlayer` (`next-intlayer`، `react-intlayer`، `vue-intlayer`، `svelte-intlayer`، `solid-intlayer`، `preact-intlayer`، `angular-intlayer`، `lit-intlayer`، `express-intlayer`، `hono-intlayer`، `fastify-intlayer`، `intlayer`)، ومع حزم المحوّلات التوافقية التي تتيح لك الإبقاء على صياغة i18n الحالية لديك.

> تُقرأ القواميس من ناتج البناء، لذا شغّل `npx intlayer build` — أو أبقِ خادم التطوير قيد التشغيل — كي يجد الخادم ما يحلّه.

---

## التثبيت

يُوزَّع الخادم بوصفه الملف التنفيذي `intlayer-lsp` ضمن `@intlayer/lsp`:

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

ثبّته عالميًا بدلًا من ذلك (`npm install -g @intlayer/lsp`) إذا كان محرّرك يحتاج إلى `intlayer-lsp` ضمن `PATH` — وهذا ينطبق على إضافة Claude Code وعلى أي إعداد أدناه يستدعي الملف التنفيذي مباشرة.

---

## الإعداد

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

ثبّت [إضافة Intlayer لـ VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). خادم اللغة مُضمَّن منذ الإصدار v8.12.0 ويبدأ تلقائيًا — **لا حاجة إلى أي إعداد**.

راجع [توثيق إضافة VS Code](https://intlayer.org/doc/vs-code-extension) للاطلاع على بقية المزايا.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) و[Windsurf](https://windsurf.com/) نسختان مشتقتان من VS Code وتستخدمان منظومة الإضافات نفسها. ثبّت [إضافة Intlayer لـ VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) مرة واحدة ليُفعَّل الخادم تلقائيًا — **لا حاجة إلى أي إعداد**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

يوفّر Intlayer **إضافة لـ Claude Code** مستضافة في مستودع Intlayer. وهي تمنح Claude Code تحليلًا حقيقيًا للرموز الخاصة بمفاتيح قواميسك بدلًا من اللجوء إلى `grep`.

ضَع الملف التنفيذي ضمن `PATH`، ثم سجّل الـ marketplace وثبّت الإضافة:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

يقوم `install` بتفعيل الإضافة أيضًا. **أعد تشغيل Claude Code** — إذ تُحمَّل خوادم اللغة عند بدء التشغيل، فلا تأثير للإضافة قبل ذلك.

عندئذٍ يشغّل Claude Code الخادم على ملفات `.ts` و`.tsx` و`.js` و`.jsx` و`.vue` و`.astro` و`.svelte`، ويستخدم `goToDefinition` و`findReferences` و`hover` أثناء تنقّلك في الشيفرة.

إذا ظل الانتقال إلى التعريف بلا استجابة، فقد يكون إصدار Claude Code لديك يقيّد أداة LSP خلف راية:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

يدعم Zed بروتوكول LSP أصلًا. أضف الخادم إلى إعدادات المستخدم لديك:

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

يُبقي العنصر النائب `"..."` خوادم اللغة الافتراضية في Zed جنبًا إلى جنب مع خادم Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

باستخدام [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)، سجّل إعداد خادم مخصّصًا:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- شغّل الخادم عبر npx لتفادي الحاجة إلى تثبيت عالمي
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

بعد إعادة تشغيل Neovim، يؤدي `gd` فوق مفتاح قاموس إلى الانتقال إلى التعريف، ويؤدي `gr` إلى البحث عن المراجع.

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
  <Tab label="محرّرات أخرى" value="other">

يمكن لأي محرّر يدعم LSP تشغيل `@intlayer/lsp`. وجّهه إلى:

- **الملف التنفيذي** — `npx @intlayer/lsp`، أو الملف التنفيذي `intlayer-lsp`
- **النقل** — stdio (قياسي)
- **القدرات** — `definitionProvider`، `referencesProvider`، `hoverProvider`، `completionProvider` (محارف التفعيل `"` `'` `` ` `` `.`)، تشخيصات مدفوعة، `textDocumentSync: Incremental`
- **أنماط الجذر** — `intlayer.config.ts`، `intlayer.config.js`، `package.json`

راجع توثيق LSP الخاص بمحرّرك لمعرفة صيغة الإعداد الدقيقة.

  </Tab>
</Tabs>

---

## ملاحظة حول وكلاء الذكاء الاصطناعي في الطرفية

**Claude Code** يعمل كعميل LSP حقيقي — انظر التبويب أعلاه.

**OpenAI Codex** ومعظم أدوات الطرفية الأخرى ليست عملاء LSP: فهي تقرأ الملفات وتكتبها مباشرة. تشغيل الخادم وحده لا يفيدها؛ إنما تأتي الفائدة من كونه نشطًا في محرّر مرافق يستطيع الوكيل الاستعلام عن فهرسه (Cursor Composer، Windsurf Cascade، Copilot Chat).

---

## آلية العمل

لكل ملف، يحدّد الخادم أقرب ملف `intlayer.config.*` ويحمّل إعدادات ذلك المشروع للعثور على القواميس المُصرَّفة. وتُخزَّن الإعدادات والقواميس وقائمة الملفات المصدرية مؤقتًا بمُدد صلاحية قصيرة، ويُبطَل التخزين كلما تغيّر ملف محتوى مُراقَب.

عند كل طلب، يحلّل الخادم المستند (عبر [oxc](https://oxc.rs/)) ويفحص موضع المؤشر:

1. **فوق نص المفتاح** (`useIntlayer("home")`) ← يُعيد كل ملف محتوى يصرّح بذلك المفتاح، مع التموضع عند سطر `key:` الخاص به.
2. **فوق موضع استخدام حقل** (`content.title`، أو خاصية مُفكَّكة، أو `t('path.to.field')`، أو `<Trans>`، …) ← يتتبّع المتغيّر رجوعًا إلى قاموسه ويُعيد الحقل المطابق داخل ملفات المحتوى.
3. **انطلاقًا من ملف محتوى** ← ينفّذ البحث العكسي، فيمسح مصادر المشروع بحثًا عن مواضع استدعاء ذلك المفتاح أو الحقل.

---

## استكشاف الأخطاء وإصلاحها

| العَرَض                                    | السبب المرجّح              | الحل                                                         |
| ------------------------------------------ | -------------------------- | ------------------------------------------------------------ |
| لا يحدث أي شيء إطلاقًا                     | الخادم غير مُشغَّل         | تحقّق من تثبيت `@intlayer/lsp` ومن أن محرّرك يشغّله          |
| يعمل في المحرّر ولا يعمل في Claude Code    | تثبيت الإضافة أثناء الجلسة | أعد تشغيل Claude Code — فخوادم اللغة تُحمَّل عند بدء التشغيل |
| لا يُعثر على تعريفات لمفتاح ما             | لم تُبنَ القواميس          | شغّل `npx intlayer build`، أو ابدأ خادم التطوير              |
| الإبلاغ عن كل المفاتيح بأنها غير مصرّح بها | تعذّر تحليل الإعدادات      | تأكّد من وجود `intlayer.config.ts` (أو `.js`) في جذر مشروعك  |
| استخدام مشروع خاطئ داخل مستودع أحادي       | غياب إعداد لكل حزمة        | أضف `intlayer.config.*` إلى كل حزمة تصرّح بمحتواها الخاص     |
| تعطّل الخادم عند البدء                     | إصدار Node.js قديم جدًا    | يتطلّب Node.js ‏≥ 14.18                                      |

في VS Code، يسجّل الخادم مخرجاته في **عرض ← الإخراج ← «Intlayer LSP»** — وهو مفيد لتأكيد أي إعداد جرى تحليله وكم قاموسًا عُثر عليه.
