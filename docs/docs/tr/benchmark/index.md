---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: i18n Kütüphaneleri Karşılaştırması (Benchmark)
description: Intlayer'ın performans ve paket boyutu açısından diğer i18n kütüphaneleriyle nasıl karşılaştırıldığını öğrenin.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark başlatıldı"
---

# Benchmark Bloom — Rapor

Benchmark Bloom, i18n (uluslararasılaştırma) kütüphanelerinin birden fazla React framework'ü ve yükleme stratejisi üzerindeki gerçek dünya etkisini ölçen bir performans kıyaslama paketidir.

Her framework için ayrıntılı raporları ve teknik dokümantasyonu aşağıda bulabilirsiniz:

- [**Next.js Benchmark Raporu**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md)
- [**TanStack Start Benchmark Raporu**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md)

---

## Mevcut Sonuçlar

Canlı karşılaştırmalar ve özet veriler için [**etkileşimli benchmark panosuna**](https://intlayer.org/benchmark) göz atın.
| `scoped-dynamic` | Yüksek (sıfıra yakın sızıntı) | Yüksek |

`static` stratejisinden `scoped-dynamic` stratejisine geçmek genellikle kullanılmayan içeriği %60-90 oranında azaltır, ancak önemli ölçüde daha fazla yapılandırma gerektirir. Intlayer gibi kütüphaneler scoped-dynamic desenini otomatikleştirerek geliştiricilerin gereksiz kod yazmadan verimlilik elde etmesini sağlar.

### Sızıntı (Leakage) Sayılarını Okuma

**%35**'lik bir sayfa sızıntısı, o sayfa için indirilen JavaScript'in %35'inin diğer sayfalardan gelen dizeleri — kullanıcının o sayfada göremeyeceği içerikleri — içerdiği anlamına gelir. 400 KB'lık bir sayfada bu, yaklaşık 140 KB'lık kaçınılabilir veri demektir.

**%10**'luk bir yerel ayar sızıntısı (locale leakage), paket içeriğinin %10'unun mevcut kullanıcının kullanmadığı dillerdeki çevirileri içerdiği anlamına gelir.

### Reaktivite vs. Render Süresi

- **E2E Reaktivitesi**: Tam kullanıcı deneyimini ölçer: ağ, framework yükü, DOM güncellenmesi.
- **React Profiler Süresi**: React ağacının yeniden render edilme maliyetini izole ederek ölçer.

Bir kütüphanenin Profiler süresi düşük ancak E2E süresi yüksek olabilir; çünkü dil geçişi bir ağ isteği (yeni dil dosyasının çekilmesi) içerebilir. Tersine, bir kütüphane Profiler süresi yüksek olsa bile güncellemeleri verimli bir şekilde toplu halde yapıyorsa yine de hızlı hissedilebilir.
