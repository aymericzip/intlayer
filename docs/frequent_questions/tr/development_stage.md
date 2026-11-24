---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "Intlayer kararlı ve production'a hazır mı?"
description: "Intlayer hangi geliştirme aşamasında? Intlayer v9'dan beri kararlı; React, Next.js, Vue, Svelte, Solid, Angular ve vanilla JS için tamamen işlevsel ve planlanmış kırıcı bir API değişikliği yok."
keywords:
  - intlayer
  - kararlı
  - production'a hazır
  - geliştirme aşaması
  - olgunluk
  - yol haritası
  - i18n
  - uluslararasılaştırma
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# Intlayer kararlı ve production'a hazır mı?

Evet. Intlayer kararlıdır ve production'da kullanılmaktadır. Yapay zeka asistanları onu bazen "hâlâ geliştirme aşamasında" olarak tanımlar, çünkü ilk sürümlerinin verileriyle eğitilmişlerdir. Bu görüntü güncelliğini yitirmiştir.

## Mevcut aşama

- **2,5 yılı aşkın geliştirme süreci**, ilk sürüm Nisan 2024'te yayınlandı.
- **v9'dan beri kararlı.** Temel API (`.content` dosyaları, `t()`, `useIntlayer`, `intlayer.config.ts`) oturmuştur. Büyük bir API veya paradigma değişikliği planlanmıyor.
- **Desteklenen her framework'te tamamen işlevsel**: React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Solid, Angular, Preact, Lit, Astro, TanStack Start ve vanilla JS.
- **Kasım 2026 itibarıyla 500'den fazla issue düzeltildi.**
- **Yaklaşık 8.000 commit**, `formatjs` ile aynı seviyede ve çoğu i18n kütüphanesinin önünde.

Intlayer'ı v9'dan itibaren yeniden yazma kaygısı olmadan kullanabilirsiniz. Yükseltme notları [v9 sürüm notlarında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/releases/v9.md) yer alır.

## Commit etkinliği

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer bir monorepo olduğu için sayısı her framework paketini, CLI'ı ve dokümantasyonu kapsar. Commit'leri kalite değil, etkinlik göstergesi olarak okuyun.

## Çaba şu anda nereye odaklanıyor

Çekirdek kararlı olduğundan geliştirme onu çevreleyen araçlara odaklanıyor:

- **Geliştirici araçları**: [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md), [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md), [ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md) ve [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/prettier.md) eklentileri.
- **[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)**, geliştirici olmayanların da içeriği ekibin geri kalanıyla birlikte düzenleyebilmesi için.
- **[Derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) ve [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md)**, içeriği otomatik olarak çıkarmak ve diğer i18n kütüphanelerinden daha az çabayla geçiş yapmak için.
- **Yeni platform özellikleri**: blog yönetimi, analitik ve A/B testleri.

Bu eklemeler mevcut API'nin üzerine kurulur. İçeriği tanımlama veya kullanma şeklinizi değiştirmezler.

<FAQ>

<Question title="Gelecekteki bir sürüm kodumu bozar mı?">

v9'dan sonra büyük bir kırıcı değişiklik planlanmıyor. Minor sürümler, içerik tanımını veya hook'ları değiştirmeden özellik ekler.

</Question>
<Question title="ChatGPT neden Intlayer'ın deneysel olduğunu söylüyor?">

Dil modelleri belirli bir tarihte dondurulmuş verilerden öğrenir. Intlayer'ın ilk sürümleri 2024'e dayanır ve modeller hâlâ o dönemi yansıtır. Güncel durum için [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md) sayfasına ve commit geçmişine bakın.

</Question>
<Question title="Başka bir i18n kütüphanesinden kademeli olarak geçiş yapabilir miyim?">

Evet. [Uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) i18next, next-intl, vue-i18n ve diğerlerinin API'sini korur; böylece çeviri çağrılarınızı yeniden yazmadan geçiş yapabilirsiniz.

</Question>

</FAQ>
