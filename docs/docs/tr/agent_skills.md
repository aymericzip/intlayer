---
createdAt: 2026-02-09
updatedAt: 2026-09-27
priority: 6
title: "Yapay zeka kodlama ajanları için Intlayer Agent Skills"
description: "Yapay zeka kodlama ajanınıza Intlayer yetenekleri verin: içerik, metadata, sitemap ve server actions için kurulum rehberleri."
keywords:
  - Intlayer
  - Agent Skills
  - AI Ajanı
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "İlk kayıt"
author: aymericzip
---

# Agent Skills

## Kurulum

### CLI Kullanarak

`intlayer init skills` komutu, projenizde Agent Skills kurmanın en kolay yoludur. Ortamınızı tespit eder ve tercih ettiğiniz platformlar için gerekli yapılandırma dosyalarını yükler.

```bash packageManager="npm"
npx intlayer init skills
```

```bash packageManager="yarn"
yarn intlayer init skills
```

```bash packageManager="pnpm"
pnpm intlayer init skills
```

```bash packageManager="bun"
bun x intlayer init skills
```

### Vercel Skill SDK Kullanarak

```bash
npx skills add aymericzip/intlayer-skills
```

### VS Code Uzantısını Kullanarak

1. Komut Paletini açın (Ctrl+Shift+P veya Cmd+Shift+P).
2. `Intlayer: Setup AI Agent Skills` yazın.
3. Kullandığınız platformu seçin (ör. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` vb.).
4. Yüklemek istediğiniz Agent Skills'i seçin (ör. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Enter'a basın.

## Agent Skills Listesi

**intlayer-config**

- Ajanın projenizin özel i18n ayarlarını anlamasını sağlayarak yerel ayarları, yönlendirme modellerini ve geri dönüş stratejilerini doğru bir şekilde yapılandırmasına olanak tanır.

**intlayer-cli**

- Ajanın, eksik çevirileri denetleme, sözlük oluşturma ve komut satırı üzerinden içerik senkronizasyonu dahil olmak üzere çeviri yaşam döngünüzü özerk bir şekilde yönetmesini sağlar.

**intlayer-angular**

- Angular en iyi uygulamalarına göre reaktif i18n modellerini ve sinyallerini doğru bir şekilde uygulamak için ajanı çerçeveye özgü uzmanlıkla donatır.

**intlayer-astro**

- Ajana, Astro ekosistemine özgü sunucu tarafı çevirilerini ve yerelleştirilmiş yönlendirme modellerini işlemek için gerekli bilgiyi sağlar.

**intlayer-content**

- Ajana, zengin, dinamik og yerelleştirilmiş sözlükler oluşturmak için çoğullaştırma, koşullar ve markdown gibi gelişmiş içerik düğümlerini nasıl kullanacağını öğretir.

**intlayer-next-js**

- Ajana, Next.js Sunucu ve İstemci bileşenlerinde i18n uygulama derinliği kazandırarak SEO optimizasyonu ve sorunsuz yerelleştirilmiş yönlendirme sağlar.

**intlayer-react**

- Ajanın herhangi bir React tabanlı ortamda bildirimsel i18n bileşenlerini ve kancalarını (hooks) verimli bir şekilde uygulaması için özel bilgi sağlar.

**intlayer-preact**

- Ajanın Preact için i18n uygulama yeteneğini optimize ederek sinyaller ve verimli reaktif modeller kullanarak hafif, yerelleştirilmiş bileşenler yazmasına olanak tanır.

**intlayer-solid**

- Ajanın yüksek performanslı, yerelleştirilmiş içerik yönetimi için SolidJS'nin ince taneli reaktifliğinden yararlanmasını sağlar.

**intlayer-svelte**

- Ajana, Svelte ve SvelteKit uygulamalarında reaktif ve tip güvenli yerelleştirilmiş içerik için Svelte store'larını ve deyimsel söz dizimini kullanmayı öğretir.

**intlayer-remote-content**

- Ajanın uzak içeriği entegre etmesine ve yönetmesine olanak tanıyarak Intlayer CMS aracılığıyla canlı senkronizasyon ve uzak çeviri iş akışlarını işlemesini sağlar.

**intlayer-usage**

- Ajanın proje yapısı ve içerik bildirimi konusundaki yaklaşımını standartlaştırarak i18n projeniz için en verimli iş akışlarını izlemesini sağlar.

**intlayer-vue**

- Ajana, modern yerelleştirilmiş web uygulamaları oluşturmak için Composables ve Nuxt desteği dahil olmak üzere Vue'ya özgü modeller sağlar.

**intlayer-compiler**

- Otomatik içerik çıkarmayı etkinleştirerek ajanın iş akışını basitleştirir ve manuel sözlük dosyaları olmadan doğrudan kodunuzda çevrilebilir dizeler yazmasına olanak tanır.

**intlayer-lit**

- Ajana, Lit web bileşenlerini `useIntlayer` ve `useLocale` ReactiveController'ları ile çevirmeyi öğretir.

**intlayer-vanilla**

- Ajanın, düz JavaScript / TypeScript sayfalarını bundler ile veya bundler olmadan `vanilla-intlayer` ile yerelleştirmesini sağlar.

**intlayer-remix**

- Ajana Remix 3 router middleware'ini ve istek kapsamlı `useIntlayer` / `useLocale` hook'larını sağlar.

**intlayer-backend**

- Ajanı, ortak bir middleware + `t` / `getIntlayer` kalıbı aracılığıyla Express, Fastify, Hono, NestJS, AdonisJS ve Elysia'da sunucu yanıtlarını çevirmek için donatır.

**intlayer-dev-tools**

- Ajanın kodunuz etrafında Intlayer araçlarını kurmasını sağlar: sabit kodlanmış dizeler için ESLint kuralları, Language Server, VS Code ve Chrome eklentileri, MCP sunucusu ve CI/CD çeviri kontrolleri.

**intlayer-markdown**

- Ajana Markdown içeriği (`md()`, `.content.md` dosyaları, harici dosyalar) tanımlamayı ve bunu MDX bileşenleri, global bir `MarkdownProvider`, Suspense ve sunucu tarafı ayrıştırma ile render etmeyi öğretir.

**intlayer-compat**

- Ajanı, orijinal API'yi koruyan uyumluluk adaptörleriyle i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n veya Lingui'den geçiş sürecinde yönlendirir; böylece çeviri çağrılarının yeniden yazılması gerekmez.
