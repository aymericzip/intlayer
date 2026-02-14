---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Agent Becerileri
description: Intlayer Agent Skills'i kullanarak, Metadata, Sitemap ve Server Action'lar için kapsamlı kurulum kılavuzları da dahil olmak üzere AI ajanınızın projenizi anlamasını nasıl geliştireceğinizi öğrenin.
keywords:
  - Intlayer
  - Agent Becerileri
  - AI Ajanı
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: İlk kayıt
---

## `intlayer init skills` Komutu

`intlayer init skills` komutu, projenizde agent becerilerini kurmanın en kolay yoludur. Ortamınızı tespit eder ve tercih ettiğiniz platformlar için gerekli yapılandırma dosyalarını yükler.

```bash
npx intlayer init skills
```

Bu komutu çalıştırdığınızda şu işlemleri yapar:

1.  Kullandığınız framework'ü algılar (ör. Next.js, React, Vite).
2.  Hangi platformlar için yetenekler yüklemek istediğinizi sorar (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace vb.).
3.  Gerekli yapılandırma dosyalarını üretir (ör. `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/intlayer_next_js/SKILL.md`, `.vscode/mcp.json` vb.).

## Desteklenen Platformlar

Intlayer, AI ajanının özel projenizde Intlayer ile nasıl çalışacağını anlamasına yardımcı olmak için framework'e özel dokümantasyon (Kurulum, Kullanım, Metadata, Sitemap, Server Action'lar vb.) sağlar. Bu beceriler, ajanı uluslararasılaştırmanın karmaşıklıkları boyunca yönlendirmek, doğru kalıpları ve en iyi uygulamaları izlemesini sağlamak için tasarlanmıştır.

Intlayer aşağıdaki platformlarla entegrasyonu destekler:

### 1. Cursor

Cursor, MCP (Model Context Protocol) sunucularını ve özel becerileri destekler. `intlayer init skills` komutunu çalıştırmak şunları yapacaktır:

- Intlayer MCP sunucusuyla iletişim kurmak için bir `.cursor/mcp.json` dosyası oluşturur.
- Framework'e özel becerileri `.cursor/skills` dizinine yükler.

### 2. Windsurf

Windsurf, yapay zeka destekli bir IDE'dir. `intlayer init skills` komutunu çalıştırmak, framework'e özel becerileri `.windsurf/skills` dizinine yükleyecektir.

### 3. VS Code

VS Code kullanıcıları için, özellikle GitHub Copilot veya diğer MCP uyumlu eklentileri kullananlar için komut:

- Bir `.vscode/mcp.json` yapılandırması oluşturur.
- Framework'e özel becerileri projenizin kök dizinindeki `skills/` dizinine yükler.

### 4. OpenCode

OpenCode, yazılım mühendisliği görevleri için tasarlanmış etkileşimli bir CLI ajanıdır. Intlayer, OpenCode'un uluslararasılaştırma görevlerinde size yardımcı olması için belirli beceriler sağlar. Bunlar `.opencode/skills` dizinine yüklenir.

### 5. Claude Code

Claude Code, Intlayer becerilerini kullanacak şekilde yapılandırılabilir. Komut, framework'e özel becerileri `.claude/skills` dizinine yükler.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace, özel beceriler tanımlamanıza olanak tanır. Komut, framework'e özel becerileri `.github/skills` dizinine yükler.
