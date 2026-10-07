---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: projenize Intlayer kurun"
description: "Mevcut bir projeye Intlayer eklemek için intlayer init çalıştırın: framework'ü algılar, paketleri kurar ve yapılandırmayı yazar."
keywords:
  - Başlatma
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init yalnızca paketleri kurar ve framework'ü ayarlar; her adım için ayrı bir alt komut; --interactive terminal olmadan başarısız olur"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra alt komutunu ekle"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore seçeneği eklendi"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu eklendi"
author: aymericzip
---

# Intlayer'ı Başlat

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` komutu Intlayer paketlerini kurar ve framework'ünüzü ayarlar (yapılandırma dosyası, TypeScript, bundler eklentisi, middleware/proxy, provider'lar). Intlayer'a başlamanın önerilen yolu budur.

Geri kalan her şey (CI iş akışları, AI skill'leri, MCP sunucusu, editör araçları, lint kuralları, CMS, altyapı) isteğe bağlıdır: `--interactive` kontrol listesinden seçin veya ilgili alt komutu çalıştırın (aşağıya bakın).

## Takma Adlar:

- `npx intlayer init`

## Argümanlar:

- `--project-root [projectRoot]` - İsteğe bağlı. Projenin kök dizinini belirtin. Sağlanmazsa, komut mevcut çalışma dizininden başlayarak proje kökünü arayacaktır.
- `--no-gitignore` - İsteğe bağlı. `.gitignore` dosyasının otomatik olarak güncellenmesini atlar. Bu bayrak ayarlanırsa, `.intlayer` dosyası `.gitignore` dosyasına eklenmez.
- `--no-framework-setup` - İsteğe bağlı. Proje dosyalarına dokunmadan yalnızca paketleri kurar.
- `--routing <routing>` - İsteğe bağlı. Yerel ayar yönlendirmesi: `prefix-no-default` (varsayılan), `prefix-all`, `no-prefix`, `search-params` veya `none`.
- `--content <layout>` - İsteğe bağlı. İçeriğin nasıl bildirildiği:
  - `multilingual` - `{fileName}.content.{ts,json}` bileşenin yanında, her yerel ayar tek bir dosyada (`compiler.output` ayarını yapar).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` bileşenin yanında (`compiler.output` ve `dictionary.locale` ayarlarını yapar).
  - `centralized` - yerel ayar başına bir `/locales/{locale}.{json,po}` kataloğu (`syncJSON` / `syncPO` eklentisini ekler).
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}` katalogları (`syncJSON` / `syncPO` eklentisini ekler).
- `--content-format <format>` - İsteğe bağlı, `--content` ile birlikte. `multilingual` / `per-locale` için `ts` veya `json`, `centralized` / `namespaces` için `json` veya `po`. Varsayılan ilki.
- `-i, --interactive` - İsteğe bağlı. Varsayılan set yerine kurulum adımlarını bir kontrol listesinden seçin (paketler, CI, skill'ler, MCP, VS Code, LSP, lint, CMS, altyapı, …). Terminal gerektirir: terminal yoksa (AI ajanı, CI) komut başarısız olur ve bunun yerine çalıştırılacak alt komutları listeler.
- `--no-github-actions` - İsteğe bağlı. `--interactive` ile, seçili olsalar bile GitHub Actions iş akışlarını asla oluşturmaz.

## Ne yapar:

`init` komutu aşağıdaki kurulum görevlerini gerçekleştirir:

1. **Proje yapısını doğrular** - Bir `package.json` dosyası olan geçerli bir proje dizininde olduğunuzdan emin olur.
2. **Paketleri kurar** - Stack'iniz için eksik Intlayer paketlerini kurar (ör. `react-intlayer`, `vite-intlayer`) ve eski olanları günceller.
3. **`.gitignore` dosyasını günceller** - Oluşturulan dosyaları sürüm kontrolünden hariç tutmak için `.gitignore` dosyanıza `.intlayer` ekler (`--no-gitignore` ile atlanabilir).
4. **TypeScript'i yapılandırır** - Intlayer tür tanımlarını (`.intlayer/**/*.ts`) içerecek şekilde tüm `tsconfig.json` dosyalarını günceller.
5. **Yapılandırma dosyası oluşturur** - Varsayılan ayarlarla `intlayer.config.ts` (TypeScript projeleri için) veya `intlayer.config.mjs` (JavaScript projeleri için) oluşturur.
6. **Bundler / framework yapılandırmasını günceller** - Intlayer eklentisini Vite, Next.js, Nuxt, Astro, … yapılandırmanıza ekler ve framework destekliyorsa middleware/proxy ile provider'ları oluşturur.

## Her seferinde bir adım kurun

`--interactive` kontrol listesindeki her adımın kendi alt komutu vardır. Değerler flag olarak verildiğinde soru sormazlar, bu yüzden bir AI ajanından veya CI işinden güvenle çalıştırılabilirler.

| Komut                                                                 | Ne kurar                                                                                            |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Eksik Intlayer paketlerini kurar ve eski olanları günceller                                         |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Yapılandırma dosyası, TypeScript, bundler eklentisi, middleware/proxy, provider'lar ve `.gitignore` |
| `intlayer init github-actions`                                        | `fill` ve `test` GitHub Actions iş akışları                                                         |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json` içinde Intlayer eklentisini önerir                                        |
| `intlayer init lsp`                                                   | `.vscode/settings.json` içinde Intlayer dil sunucusu                                                |
| `intlayer init eslint`                                                | Proje zaten lint kullanıyorsa Intlayer lint kuralları (ESLint / oxlint)                             |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI ajanları için skill olarak Intlayer dokümantasyonu                                               |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP sunucusu                                                                               |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer tarayıcı eklentisinin mağaza sayfasını açar                                                |
| `intlayer init cms`                                                   | Tarayıcınız üzerinden Intlayer CMS'e giriş yapar ve kimlik bilgilerini `.env` dosyasına kaydeder    |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Masaüstü uygulaması veya kendi sunucunuzda barındırılan bir stack                                   |

### Bir AI ajanından veya CI işinden

Bir AI ajanının shell'inde terminal yoktur, bu yüzden bir soru yanıtlanamaz. Varsayılan komutu, ardından ihtiyacınız olan alt komutları kullanın:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Terminal olmadan:

- `init skills`, `--skills` ayarlanmadıkça stack'inize uyan skill'leri kurar (ör. `--skills Usage Content React`).
- `init skills` ve `init mcp`, `--platform` ayarlanmadıkça algılanan AI platformunu (Claude Code, Cursor, VS Code, Windsurf, …) kullanır ve hiçbiri algılanmazsa platform listesiyle başarısız olur.
- `init mcp`, `--transport` ayarlanmadıkça `stdio` taşımasını kullanır.
- `init infra` için `--mode` gerekir, `init extension` ise `--browser` ayarlanmadıkça yalnızca mağaza bağlantılarını yazdırır.

MCP sunucusu her zaman proje içinde yapılandırılır (Claude Code için `.mcp.json` içinde).

## Örnekler:

### Temel başlatma:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Bu, proje kökünü otomatik olarak algılayarak Intlayer'ı mevcut dizinde başlatır.

### Özel proje kökü ile başlatma:

```bash packageManager="npm"
npx intlayer init --project-root ./projem
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./projem
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./projem
```

```bash packageManager="bun"
bun x intlayer init --project-root ./projem
```

Bu, Intlayer'ı belirtilen dizinde başlatır.

### .gitignore'u güncellemeden başlatma:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Bu, tüm yapılandırma dosyalarını kurar ancak `.gitignore` dosyanızı değiştirmez.

### Altyapıyı kurun (masaüstü uygulaması veya kendi sunucunuzda barındırma):

```bash
npx intlayer init infra
```

Barındırılan yükleyiciyi (`https://intlayer.org/install.sh` veya Windows'ta `install.ps1`) indirir ve çalıştırır; Intlayer'ı nasıl çalıştırmak istediğinizi sorar:

- **Masaüstü uygulaması** - makinenize Intlayer Cloud'a bağlı yerel gösterge panelini yükler.
- **Hepsi bir arada Docker** - tek bir kapsayıcıda gösterge paneli + API + MongoDB + Redis + MinIO.
- **Docker Compose** - ölçeklenebilir kendi sunucunuzda barındırma için hizmet başına bir kapsayıcı.

`--mode` ile menüyü atlayın:

```bash
npx intlayer init infra --mode compose
```

Aynı adım `npx intlayer init --interactive` tarafından da sunulur. Yükleyici ayarları için [`init infra` referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/infra.md) ve her modun neleri kurduğu hakkında bilgi edinmek için [kendi sunucunuzda barındırma kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md) bakın.

- [`init infra` referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/infra.md)
- [kendi sunucunuzda barındırma kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)

## Örnek çıktı:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notlar:

- Komut idempotenttir; yani birden çok kez güvenli bir şekilde çalıştırabilirsiniz. Halihazırda yapılandırılmış adımlar atlanacaktır.
- Bir yapılandırma dosyası zaten mevcutsa, üzerine yazılmaz.
- `include` dizisi olmayan TypeScript yapılandırmaları (örneğin başvuruları olan çözüm stili yapılandırmalar) atlanır.
- Proje kökünde `package.json` bulunamazsa komut hata vererek durur.
