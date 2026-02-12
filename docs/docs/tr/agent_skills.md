---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Agent Becerileri
description: Intlayer Agent Skills'i kullanarak AI ajanınızın projenizi anlamasını nasıl geliştireceğinizi öğrenin.
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
2.  Hangi platformlar için yetenekler yüklemek istediğinizi sorar (Cursor, VS Code, OpenCode, Claude Code vb.).
3.  Gerekli yapılandırma dosyalarını üretir (ör. `.cursor/mcp.json`, `.vscode/mcp.json`, veya `.intlayer/skills/*.md`).

## Desteklenen Platformlar

Intlayer aşağıdaki platformlarla entegrasyonu destekler:

### 1. Cursor

Cursor, MCP (Model Context Protocol) sunucularını destekler. `intlayer init skills` komutunu çalıştırmak, Cursor'ın Intlayer MCP sunucusuyla iletişim kurmasını sağlayan `.cursor/mcp.json` dosyasını oluşturacaktır.

### 2. VS Code

VS Code kullanıcıları için, özellikle GitHub Copilot veya diğer MCP-uyumlu eklentileri kullananlar için, bu komut `.vscode/mcp.json` yapılandırmasını oluşturur.

### 3. OpenCode

OpenCode, yazılım mühendisliği görevleri için tasarlanmış etkileşimli bir CLI ajanıdır. Intlayer, OpenCode'un uluslararasılaştırma görevlerinde size yardımcı olması için belirli skills sağlar.

### 4. Claude Code

Claude Code, oluşturulan yapılandırmaları masaüstü veya CLI ayarlarına ekleyerek Intlayer skills'lerini kullanacak şekilde yapılandırılabilir.
