---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP Sunucusu
description: Intlayer dil sunucusunun IDE’nize ve yapay zekâ ajanınıza tanıma gitme, referans arama, imleçle önizleme, anahtar otomatik tamamlama ve tanılama özelliklerini nasıl kazandırdığını öğrenin.
keywords:
  - LSP
  - Dil Sunucusu
  - Go to Definition
  - Otomatik tamamlama
  - Tanılama
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
    changes: "Referans arama, imleçle önizleme, otomatik tamamlama ve tanılama eklendi"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP Sunucusu

**Intlayer dil sunucusu**, IDE’nizi — ve yapay zekâ ajanınızı — Intlayer’dan haberdar kılan bir [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) uygulamasıdır. `useIntlayer("home")` gibi bir çağrıyı, onu bildiren `.content.ts` dosyasına iki yönlü olarak bağlar.

---

## Özellikler

| Özellik                  | Kısayol                | Ne yapar                                                                                                        |
| ------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Tanıma git**           | `F12` / `Cmd+Tık`      | Bir sözlük anahtarından veya alan kullanımından içerik dosyasındaki bildirimine atlar                           |
| **Tüm referansları bul** | `Shift+F12`            | Bir içerik dosyasından, o anahtarı veya alanı kullanan tüm çağrı noktalarını listeler                           |
| **İmleçle önizleme**     | imleci üzerine getirin | Bir sözlüğün alanlarını veya bir alanın çevrilmiş değerini dosyadan çıkmadan gösterir                           |
| **Otomatik tamamlama**   | `"` `'` `` ` `` `.`    | Bir getter içinde bildirilmiş sözlük anahtarlarını, `.` sonrasında veya yapı bozumunda içerik alanlarını önerir |
| **Tanılama**             | otomatik               | Bir anahtar hiçbir içerik dosyasında bildirilmemişse uyarır                                                     |

Bilinmeye değer iki ek davranış vardır:

- **Birleştirilmiş sözlükler** — birkaç içerik dosyasına bölünmüş bir anahtar, dosya başına bir sonuç döndürür; böylece her bildirime gidebilirsiniz.
- **Monorepo uyumlu** — sunucu her dosyaya _en yakın_ `intlayer.config.*` dosyasını çözer; böylece tek bir çalışma alanındaki birden çok proje kendi sözlüklerine sahip olur.

### Desteklenen çağrılar

Anahtar, konumsal bir dize argümanından ya da bir seçenekler nesnesinden (`{ namespace }`, `{ id }`) okunur.

| Kütüphane                   | Çağrılar                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Bu, tüm `*-intlayer` paketleri (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) ve mevcut i18n sözdiziminizi korumanızı sağlayan compat adaptör paketleri için çalışır.

> Sözlükler derleme çıktısından okunur; bu nedenle sunucunun çözecek bir şeyi olması için `npx intlayer build` çalıştırın veya geliştirme sunucunuzu açık tutun.

---

## Kurulum

Sunucu, `@intlayer/lsp` içinde `intlayer-lsp` ikili dosyası olarak dağıtılır:

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

Editörünüz `intlayer-lsp` komutunu `PATH` üzerinde arıyorsa bunun yerine küresel olarak kurun (`npm install -g @intlayer/lsp`) — Claude Code eklentisi ve aşağıdaki ikili dosyayı doğrudan çağıran her yapılandırma için durum budur.

---

## Kurulum ve yapılandırma

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

[Intlayer VS Code eklentisini](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) kurun. Dil sunucusu v8.12.0’dan beri paketin içindedir ve otomatik başlar — **yapılandırma gerekmez**.

Diğer özellikler için [VS Code eklentisi belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) ve [Windsurf](https://windsurf.com/), VS Code çatallarıdır ve aynı eklenti ekosistemini kullanır. [Intlayer VS Code eklentisini](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) bir kez kurun; sunucu otomatik olarak etkinleşir — **yapılandırma gerekmez**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer, Intlayer deposunda barındırılan bir **Claude Code eklentisi** sunar. Bu eklenti, Claude Code’a `grep`’e geri düşmek yerine sözlük anahtarlarınız için gerçek sembol çözümlemesi kazandırır.

İkili dosyayı `PATH`’inize ekleyin, ardından marketplace’i kaydedip eklentiyi kurun:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` eklentiyi aynı zamanda etkinleştirir. **Claude Code’u yeniden başlatın** — dil sunucuları başlangıçta yüklenir, bu nedenle eklenti o ana kadar etkili olmaz.

Claude Code ardından sunucuyu `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` ve `.svelte` dosyalarında başlatır ve kodunuzda gezinirken `goToDefinition`, `findReferences` ve `hover` kullanır.

Tanıma gitme hâlâ çalışmıyorsa, Claude Code sürümünüz LSP aracını bir bayrağın arkasında tutuyor olabilir:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed yerleşik LSP desteğine sahiptir. Sunucuyu kullanıcı ayarlarınıza ekleyin:

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

`"..."` yer tutucusu, Zed’in varsayılan dil sunucularını Intlayer’ınkiyle birlikte korur.

  </Tab>
  <Tab label="Neovim" value="neovim">

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) ile özel bir sunucu yapılandırması kaydedin:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Küresel kuruluma gerek kalmaması için sunucuyu npx ile başlatın
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

Neovim’i yeniden başlattıktan sonra, bir sözlük anahtarı üzerinde `gd` Tanıma Git’i, `gr` ise Referansları Bul’u çalıştırır.

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
  <Tab label="Diğer editörler" value="other">

LSP destekleyen her editör `@intlayer/lsp` çalıştırabilir. Şunları belirtin:

- **Çalıştırılabilir dosya** — `npx @intlayer/lsp` veya `intlayer-lsp` ikili dosyası
- **Taşıma** — stdio (standart)
- **Yetenekler** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (tetikleyici karakterler `"` `'` `` ` `` `.`), push tanılama, `textDocumentSync: Incremental`
- **Kök desenleri** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Tam yapılandırma biçimi için editörünüzün LSP belgelerine bakın.

  </Tab>
</Tabs>

---

## Terminal yapay zekâ ajanları hakkında not

**Claude Code** gerçek bir LSP istemcisi gibi davranır — yukarıdaki sekmeye bakın.

**OpenAI Codex** ve diğer terminal araçlarının çoğu LSP istemcisi değildir: dosyaları doğrudan okur ve yazarlar. Sunucuyu tek başına çalıştırmak onlara yardımcı olmaz; asıl fayda, ajanın dizinini sorgulayabildiği bir yardımcı editörde (Cursor Composer, Windsurf Cascade, Copilot Chat) etkin olmasından gelir.

---

## Nasıl çalışır

Sunucu her dosya için en yakın `intlayer.config.*` dosyasını bulur ve derlenmiş sözlükleri bulmak üzere o projenin yapılandırmasını yükler. Yapılandırma, sözlükler ve kaynak dosya listesi kısa TTL’lerle önbelleğe alınır ve izlenen bir içerik dosyası değiştiğinde geçersiz kılınır.

Bir istek geldiğinde sunucu belgeyi ([oxc](https://oxc.rs/) ile) ayrıştırır ve imleç konumunu inceler:

1. **Bir anahtar dizesi üzerinde** (`useIntlayer("home")`) → o anahtarı bildiren her içerik dosyasını, `key:` satırına konumlanmış olarak döndürür.
2. **Bir alan kullanımı üzerinde** (`content.title`, yapı bozumuyla alınmış bir özellik, `t('path.to.field')`, `<Trans>`, …) → değişkeni sözlüğüne kadar çözer ve içerik dosyalarındaki eşleşen alanı döndürür.
3. **Bir içerik dosyasından** → ters aramayı çalıştırır ve proje kaynaklarını o anahtarın veya alanın çağrı noktaları için tarar.

---

## Sorun giderme

| Belirti                                       | Olası neden                      | Çözüm                                                                     |
| --------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| Hiçbir şey olmuyor                            | Sunucu çalışmıyor                | `@intlayer/lsp` kurulu mu ve editörünüz onu başlatıyor mu kontrol edin    |
| Editörde çalışıyor, Claude Code’da çalışmıyor | Eklenti oturum ortasında kuruldu | Claude Code’u yeniden başlatın — dil sunucuları başlangıçta yüklenir      |
| Bir anahtar için tanım bulunamıyor            | Sözlükler derlenmemiş            | `npx intlayer build` çalıştırın veya geliştirme sunucunuzu başlatın       |
| Her anahtar bildirilmemiş olarak raporlanıyor | Yapılandırma çözülemedi          | Proje kökünüzde bir `intlayer.config.ts` (veya `.js`) olduğunu doğrulayın |
| Monorepo’da yanlış proje kullanılıyor         | Paket başına yapılandırma eksik  | Kendi içeriğini bildiren her pakete bir `intlayer.config.*` ekleyin       |
| Sunucu başlangıçta çöküyor                    | Node.js sürümü çok eski          | Node.js ≥ 14.18 gerektirir                                                |

VS Code’da sunucu **Görünüm → Çıktı → “Intlayer LSP”** altına log yazar — hangi yapılandırmanın çözüldüğünü ve kaç sözlük bulunduğunu doğrulamak için kullanışlıdır.
