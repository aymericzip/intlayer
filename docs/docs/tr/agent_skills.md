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
  - version: 8.1.0
    date: 2026-02-09
    changes: İlk kayıt
---

# Agent Becerileri

## `intlayer init skills` Komutu

`intlayer init skills` komutu, projenizde agent becerilerini kurmanın en kolay yoludur. Ortamınızı tespit eder ve tercih ettiğiniz platformlar için gerekli yapılandırma dosyalarını yükler.

```bash
npx intlayer init skills
```

Veya Vercel Skill SDK kullanarak

```bash
npx skills add aymericzip/intlayer-skills
```

Bu komutu çalıştırdığınızda şu işlemleri yapar:

1.  Kullandığınız framework'ü algılar (ör. Next.js, React, Vite).
2.  Hangi platformlar için yetenekler yüklemek istediğinizi sorar (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace vb.).
3.  Gerekli yapılandırma dosyalarını üretir (ör. `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json` vb.).

## Desteklenen Platformlar

Intlayer, AI ajanının özel projenizde Intlayer ile nasıl çalışacağını anlamasına yardımcı olmak için framework'e özel dokümantasyon (Kurulum, Kullanım, Metadata, Sitemap, Server Action'lar vb.) sağlar. Bu beceriler, ajanı uluslararasılaştırmanın karmaşıklıkları boyunca yönlendirmek, doğru kalıpları ve en iyi uygulamaları izlemesini sağlamak için tasarlanmıştır.
