---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP Sunucusu
description: Intlayer Dil Sunucusunun, desteklenen tüm editörlerde useIntlayer, getIntlayer ve ilgili çağrılar için Tanıma Git (Go-to-Definition) ve diğer IDE özelliklerini nasıl sağladığını öğrenin.
keywords:
  - LSP
  - Dil Sunucusu
  - Tanıma Git
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

# Intlayer LSP Sunucusu

**Intlayer Dil Sunucusu (LSP)**, IDE'nizi Intlayer farkındalığına sahip bir zeka ile geliştiren bir [Dil Sunucusu Protokolü (LSP)](https://microsoft.github.io/language-server-protocol/) uygulamasıdır. Şu anda sözlük anahtarı çağrıları için **Tanıma Git (Go to Definition)** özelliği sunarak, bileşeninizdeki `useIntlayer("my-key")` çağrısından onu tanımlayan `.content.ts` dosyasına doğrudan atlamanızı sağlar.

---

## Neden LSP Kullanmalısınız?

Intlayer kullandığınızda, `useIntlayer("homepage")` gibi bir çağrı ile bunun `src/homepage.content.ts` içindeki tanımı arasındaki bağlantı örtüktür. Araçlar olmadan, dosyayı manuel olarak aramanız gerekir. LSP bu bağlantıyı açık hale getirir:

**AI Ajanı Farkındalığı**

AI kodlama ajanları (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex), sembolleri çözmek ve dosyalar arası ilişkileri anlamak için dil sunucusuna güvenir. Intlayer LSP çalışırken, ajanlar `useIntlayer("key")` çağrısını tanımına kadar takip edebilir; bu da onlara mevcut içerik anahtarları, her bir sözlüğün yapısı ve hangi dosyaların okunması veya düzenlenmesi gerektiği konusunda doğru bağlam sağlar.

**Tanıma Git**

Desteklenen bir getter çağrısı içindeki herhangi bir sözlük anahtarı dizesinin üzerine imlecinizi getirin ve `F12` (veya `Cmd/Ctrl+Tıklama`) tuşuna basın. Editör, içerik tanımlama dosyasını açar ve imleci `key:` satırına yerleştirir.

**Birleştirilmiş Sözlük Desteği**

Bir anahtar birden fazla içerik dosyasına bölünmüş olabilir (Intlayer bunları birleştirir). Sunucu, her kaynak dosya için bir konum (`Location`) döndürür, böylece her tanıma gidebilirsiniz.

**Her Yerde Çalışır**

Tüm `*-intlayer` paketlerini destekler (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Desteklenen Getter Çağrıları

Sunucu, aşağıdaki işlev çağrılarını algılar ve ilk dize değişmezi argümanını sözlük anahtarı olarak çıkarır:

| İşlev         | Örnek                         |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript jenerikleri ve ekstra argümanlar yoksayılır — yalnızca anahtar dizesi önemlidir.

> `useDictionary` ve `getDictionary`, bir dize anahtarı yerine zaten içe aktarılmış bir `Dictionary` nesnesini ilk argüman olarak alır, bu nedenle Tanıma Git özelliğinden yararlanmazlar ve sunucu tarafından izlenmezler.

---

## Kurulum

LSP sunucusu, `@intlayer/lsp` paketinin bir parçası olarak dağıtılır:

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

Paket, editörlerin sunucu yürütülebilir dosyası olarak kullandığı `intlayer-lsp` ikili dosyasını (binary) sunar.

---

## Claude Code Eklentisi Olarak Kurulum

Intlayer LSP, doğrudan Intlayer GitHub deposunda barındırılan bir **Claude Code eklentisi** olarak mevcuttur. Bunu yüklemek, Claude Code'a tüm `useIntlayer` / `getIntlayer` çağrılarınız için yerel Tanıma Git farkındalığı kazandırır.

### 1. Dil Sunucusu İkili Dosyasını Yükleyin

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Bu, eklentinin `lspServers` girişinin çağırdığı `intlayer-lsp` ikili dosyasını PATH'inize yerleştirir.

### 2. Intlayer Pazaryerini Kaydedin ve Eklentiyi Yükleyin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code, `enabledPlugins` ayarlarınıza `"intlayer-lsp@intlayer": true` ekleyecek ve desteklenen dosya türlerinde (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`) dil sunucusunu otomatik olarak başlatacaktır.

### 3. LSP Aracını Etkinleştirin (Henüz aktif değilse)

Bazı Claude Code sürümleri, LSP özellik bayrağının ayarlanmasını gerektirir. Kurulumdan sonra Tanıma Git çalışmıyorsa `~/.claude/settings.json` dosyanıza aşağıdakileri ekleyin:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Claude Code'u yeniden başlatın — Intlayer kod tabanınızda gezinirken artık `grep` yöntemine başvurmak yerine `goToDefinition`, `findReferences` ve diğer LSP işlemlerini kullanacaktır.

---

## VS Code'da Kurulum (Uzantı Aracılığıyla — Önerilen)

Eğer [Intlayer VS Code uzantısı](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) yüklüyse, dil sunucusu otomatik olarak başlar. Ek yapılandırma gerekmez.

> Kurulum ve diğer özellikler için [VS Code uzantısı belgelerine](https://intlayer.org/doc/vs-code-extension) bakın.

---

## VS Code'da Manuel Kurulum

Intlayer uzantısını kullanmıyorsanız, dil sunucusunu [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) gibi genel bir LSP istemci uzantısı kullanarak veya kendi küçük uzantınızı yazarak manuel olarak bağlayabilirsiniz. Önerilen yaklaşım Intlayer uzantısını kullanmaktır.

Referans için, sunucu stdio üzerinden `intlayer-lsp` ikili dosyası ile başlatılır:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Intlayer uzantısı, sunucuyu başlatmak için bu ayarları okur. Yalnızca uzantıya güveniyorsanız, manuel ayarlara gerek yoktur.

---

## Cursor'da Kurulum

[Cursor](https://www.cursor.com/), yerleşik AI özelliklerine sahip bir VS Code çatalıdır (fork). Aynı uzantı ekosistemini kullanır, bu nedenle **Intlayer VS Code uzantısı** herhangi bir ek yapılandırma olmadan çalışır — bir kez yükleyin ve Cursor bunu otomatik olarak algılar.

Manuel bir yapılandırmayı tercih ederseniz, Cursor da çalışma alanı kökünden `.vscode/settings.json` dosyasını okur, böylece yukarıdaki VS Code kod parçacığı doğrudan uygulanır.

---

## Windsurf'te Kurulum

[Windsurf](https://windsurf.com/) (Codeium tarafından geliştirilmiştir), VS Code tabanlı bir diğer editördür. VS Code Pazaryeri'nden Intlayer uzantısını yükleyin; dil sunucusu, VS Code ve Cursor'da olduğu gibi otomatik olarak etkinleşir.

Manuel yapılandırma için, proje kökünde `.vscode/settings.json` dosyası oluşturun:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Zed'de Kurulum

[Zed](https://zed.dev/), dil ayarları aracılığıyla yerel LSP desteğine sahiptir. Zed kullanıcı ayarlarınıza (`~/.config/zed/settings.json`) bir giriş ekleyin:

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

`"..."` yer tutucusu, Zed'e Intlayer sunucusunun yanında varsayılan dil sunucularını da tutmasını söyler.

---

## AI Ajanı CLI'ları (Claude Code, Codex vb.) İçin Kurulum

**Claude Code**, birinci sınıf LSP eklenti desteğine sahiptir — doğrudan terminal oturumlarınızda tam Tanıma Git deneyimini elde etmek için yukarıdaki [Claude Code Eklentisi kurulumunu](#claude-code-eklentisi-olarak-kurulum) takip edin.

**OpenAI Codex** ve diğer terminal tabanlı araçlar henüz LSP istemcileri olarak hareket etmemektedir — kalıcı bir dil sunucusu oturumu sürdürmek yerine dosyaları doğrudan okuyup yazarlar. Bu araçlar için, LSP'nin çalışıyor olmasının değeri dolaylı olarak ortaya çıkar: Sunucu bir yardımcı editörde (VS Code, Cursor, Windsurf, ...) aktif olduğunda, editörün canlı dizini, editör tarafından sağlanan bağlam (örneğin, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat) aracılığıyla sorgulayabilen herhangi bir AI ajanının kullanımına sunulur.

Açık bir editör olmadan yalnızca bir terminalde çalışıyorsanız, dil sunucusunu arka planda başlatabilirsiniz, böylece daha sonra aynı çalışma alanına bağlanan herhangi bir editör için hazır olur:

```bash
# Sunucuyu arka planda aktif tutun
npx @intlayer/lsp &
```

---

## Neovim'de Manuel Kurulum

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) kullanarak özel bir sunucu yapılandırması kaydedin:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Sunucuyu npx ile başlatın, böylece genel kuruluma gerek kalmaz
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

Neovim'i yeniden başlattıktan sonra, bir Intlayer anahtarı üzerinde `gd` tuşuna basmak Tanıma Git işlemini çağıracaktır.

---

## Diğer Editörlerde Manuel Kurulum

Dil Sunucusu Protokolünü destekleyen herhangi bir editör `@intlayer/lsp` kullanabilir. Sunucu:

- **Taşıma (Transport)** – Node.js IPC / stdio (standart)
- **Yürütülebilir Dosya** – `npx @intlayer/lsp` (veya yerel olarak yüklenmiş `intlayer-lsp` ikili dosyası)
- **Yetenekler** – `definitionProvider: true`, `textDocumentSync: Incremental`

Tam yapılandırma biçimi için editörünüzün LSP belgelerine başvurun (örneğin, [coc.nvim](https://github.com/neoclide/coc.nvim) için `languageserver.json` veya [Helix](https://helix-editor.com) içindeki LSP istemci ayarları).

### Örnek: coc.nvim

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

### Örnek: Helix

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

## Nasıl Çalışır?

Sunucu başlatıldığında, `getConfiguration()` kullanarak çalışma alanı kökünden Intlayer yapılandırmasını çözer. Bu, derlenmiş sözlükleri bulmak için gereken `build` ve `system` yollarını sunucuya sağlar.

Her **Tanıma Git** isteğinde:

1. Sunucu, açık olan belgenin tam metnini okur.
2. Düzenli bir ifade (regex) kullanarak getter çağrılarını (`useIntlayer`, `getIntlayer` vb.) tarar.
3. İmleç konumunun bu çağrılardan birinin içine düşüp düşmediğini kontrol eder.
4. Öyleyse, sözlük anahtarını (regex'in yakalama grubu 3) çıkarır ve bu anahtarı tanımlayan her bir içerik dosyasını bulmak için `getUnmergedDictionaries()` işlevini çağırır.
5. Eşleşen her dosyayı okur ve imleci tam olarak konumlandırmak için `key: "<key>"` içeren satırı bulur.
6. Kaynak dosya başına bir adet olmak üzere `Location` nesnelerinden oluşan bir dizi döndürür.

Yapılandırma tembelce (lazy) çözülür ve oturum başına önbelleğe alınır; her `initialize` isteğinde (örneğin yeni bir çalışma alanı klasörü açtığınızda) sıfırlanır.

---

## Sorun Giderme

| Belirti                              | Olası Neden                        | Çözüm                                                                                         |
| ------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------- |
| Tanıma Git hiçbir şey yapmıyor       | Sunucu çalışmıyor                  | `@intlayer/lsp` paketinin kurulu olduğunu ve editörün bunu başlattığını kontrol edin          |
| Yanlış çalışma alanı kökü algılandı  | Birden fazla çalışma alanı klasörü | `intlayer.config.ts` dosyasını içeren klasörün ilk çalışma alanı klasörü olduğundan emin olun |
| Bir anahtar için tanımlar bulunamadı | Yapılandırma çözülmedi             | `intlayer.config.ts` (veya `.js`) dosyasının çalışma alanı kökünde mevcut olduğunu doğrulayın |
| Sunucu başlangıçta çöküyor           | Node.js sürümü çok eski            | Node.js ≥ 14.18 gerektirir                                                                    |
