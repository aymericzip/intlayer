---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Doküman İncelemesi
description: Farklı yerellerdeki dokümantasyon dosyalarını kalite, tutarlılık ve tamlık açısından nasıl inceleyeceğinizi öğrenin.
keywords:
  - İnceleme
  - Doküman
  - Dokümantasyon
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Doküman İncelemesi

`doc review` komutu, dokümantasyon dosyalarını farklı yerellerde kalite, tutarlılık ve tamlık açısından analiz eder.

```bash
npx intlayer doc review
```

Zaten çevrilmiş dosyaları incelemek ve çevirinin doğru olup olmadığını kontrol etmek için kullanılabilir.

Çoğu kullanım durumu için,

- bu dosyanın çevrilmiş versiyonu mevcut değilse `doc translate` kullanmayı tercih edin.
- bu dosyanın çevrilmiş versiyonu zaten mevcutsa `doc review` kullanmayı tercih edin.

> İnceleme sürecinin, aynı dosyayı tamamen incelemek için çeviri sürecinden daha fazla giriş tokeni tükettiğini unutmayın. Ancak, inceleme süreci incelenecek parçaları optimize edecek ve değişmeyen kısımları atlayacaktır.

## Argümanlar:

`doc review` komutu, belirli dokümantasyon dosyalarını incelemenize ve kalite kontrolleri uygulamanıza olanak tanıyan `doc translate` ile aynı argümanları kabul eder.

Eğer git seçeneklerinden birini etkinleştirdiyseniz, komut yalnızca değişen dosya kısımlarını inceleyecektir. Betik, dosyayı parçalara ayırarak işleyecek ve her parçayı inceleyecektir. Parçada değişiklik yoksa, betik inceleme sürecini hızlandırmak ve AI Sağlayıcı API maliyetini sınırlamak için o kısmı atlayacaktır.

Tam argüman listesi için, bkz. [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate.md) komut dokümantasyonu.
