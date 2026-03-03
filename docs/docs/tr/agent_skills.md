---
createdAt: 2026-02-09
updatedAt: 2026-03-03
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

## Kurulum

### CLI Kullanarak

`intlayer init skills` komutu, projenizde ajan becerilerini kurmanın en kolay yoludur. Ortamınızı tespit eder ve tercih ettiğiniz platformlar için gerekli yapılandırma dosyalarını yükler.

```bash
npx intlayer init skills
```

### Vercel Skill SDK Kullanarak

```bash
npx skills add aymericzip/intlayer-skills
```

### VS Code Uzantısını Kullanarak

1. Komut Paletini açın (Ctrl+Shift+P veya Cmd+Shift+P).
2. `Intlayer: Setup AI Agent Skills` yazın.
3. Kullandığınız platformu seçin (ör. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` vb.).
4. Yüklemek istediğiniz Becerileri seçin (ör. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Enter'a basın.

## Beceri Listesi

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

**intlayer-cms**

- Ajanın uzak içeriği entegre etmesine ve yönetmesine olanak tanıyarak Intlayer CMS aracılığıyla canlı senkronizasyon ve uzak çeviri iş akışlarını işlemesini sağlar.

**intlayer-usage**

- Ajanın proje yapısı ve içerik bildirimi konusundaki yaklaşımını standartlaştırarak i18n projeniz için en verimli iş akışlarını izlemesini sağlar.

**intlayer-vue**

- Ajana, modern yerelleştirilmiş web uygulamaları oluşturmak için Composables ve Nuxt desteği dahil olmak üzere Vue'ya özgü modeller sağlar.

**intlayer-compiler**

- Otomatik içerik çıkarmayı etkinleştirerek ajanın iş akışını basitleştirir ve manuel sözlük dosyaları olmadan doğrudan kodunuzda çevrilebilir dizeler yazmasına olanak tanır.
