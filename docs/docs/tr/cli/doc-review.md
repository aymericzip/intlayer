---
createdAt: 2024-08-11
updatedAt: 2026-06-17
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
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "--log seçeneği eklendi"
author: aymericzip
---

# Doküman İncelemesi

`doc review` komutu, dokümantasyon dosyalarını farklı yerellerde kalite, tutarlılık ve tamlık açısından analiz eder.

## Önemli noktalar:

- Büyük markdown dosyalarını AI modelinin bağlam penceresi sınırları içinde kalmak için parçalara böler.
- İncelenecek parçaları optimize eder ve zaten çevrilmiş ve değiştirilmemiş kısımları atlar.
- Hızı artırmak için bir kuyruk sistemi kullanarak dosyaları, parçaları ve yerel ayarları paralel olarak işler.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Zaten çevrilmiş dosyaları incelemek ve çevirinin doğru olup olmadığını kontrol etmek için kullanılabilir.

Çoğu kullanım durumu için,

- bu dosyanın çevrilmiş versiyonu mevcut değilse `doc translate` kullanmayı tercih edin.
- bu dosyanın çevrilmiş versiyonu zaten mevcutsa `doc review` kullanmayı tercih edin.

> İnceleme sürecinin, aynı dosyayı tamamen incelemek için çeviri sürecinden daha fazla giriş tokeni tükettiğini unutmayın. Ancak, inceleme süreci incelenecek parçaları optimize edecek ve değişmeyen kısımları atlayacaktır.

## Argümanlar:

**Dosya listesi seçenekleri:**

- **`--doc-pattern [docPattern...]`**: İncelemek için dokümantasyon dosyalarını eşleştirmek üzere glob desenleri.

  > Örnek: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: İncelemeden hariç tutulacak dosyaları eşleştirmek için glob desenleri.

  > Örnek: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Dosya belirtilen zamandan önce değiştirilmişse atla.
  - Mutlak bir zaman olabilir, örneğin "2025-12-05" (string veya Date)
  - Göreceli bir zaman olabilir, ms cinsinden `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek, dosyanın güncelleme zamanını `fs.stat` yöntemi ile kontrol eder. Bu nedenle, dosyayı değiştiren Git veya diğer araçlardan etkilenebilir.

  > Örnek: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Dosya belirtilen zaman içinde değiştirilmişse atla.
  - Mutlak bir zaman olabilir, örneğin "2025-12-05" (string veya Date)
  - Göreceli bir zaman olabilir, ms cinsinden `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek, dosyanın güncelleme zamanını `fs.stat` yöntemi ile kontrol eder. Bu nedenle, dosyayı değiştiren Git veya diğer araçlardan etkilenebilir.

  > Örnek: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Dosya zaten varsa atla.

  > Örnek: `npx intlayer doc review --skip-if-exists`

**İnceleme modu seçenekleri:**

- **`--log`**: Yalnızca günlükleme modu. AI ile çeviri yapmaz; bunun yerine başka bir temsilcinin çevirileri oluşturmasına yardımcı olmak için temel ve hedef yerel ayarlar için dikkat gerektiren blokları (satır numaraları ve içerikleriyle birlikte) günlüğe kaydeder.

  > Örnek: `npx intlayer doc review --log`

**Girdi çıktı seçenekleri:**

- **`--locales [locales...]`**: Dokümantasyonun inceleneceği hedef diller.

  > Örnek: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Karşılaştırılacak kaynak dil (temel belge).

  > Örnek: `npx intlayer doc review --base-locale en`

**Dosya işleme seçenekleri:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: İnceleme için eşzamanlı işlenecek dosya sayısı.

  > Örnek: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Yapay Zeka seçenekleri:**

- **`--model [model]`**: İnceleme için kullanılacak yapay zeka modeli (örneğin, `gpt-3.5-turbo`).
- **`--provider [provider]`**: İnceleme için kullanılacak yapay zeka sağlayıcısı.
- **`--temperature [temperature]`**: Yapay zeka modeli için sıcaklık ayarı.
- **`--api-key [apiKey]`**: Yapay zeka servisi için kendi API anahtarınızı sağlayın.
- **`--application-context [applicationContext]`**: Yapay zeka incelemesi için ek bağlam sağlayın.
- **`--data-serialization [dataSerialization]`**: Intlayer'ın AI özellikleri için kullanılacak veri serileştirme formatı. Seçenekler: `json` (standart, güvenilir), `toon` (daha az jeton, daha az tutarlı).
- **`--custom-prompt [prompt]`**: İnceleme için kullanılan temel promptu özelleştirin. (Not: Çoğu durum için, davranış üzerinde daha iyi kontrol sağladığı için `--custom-instructions` seçeneği önerilir.)

  > Örnek: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--no-cache`**: Önbelleği devre dışı bırakın.

  > Örnek: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanıldığında varsayılan olarak true)

  > Örnek: `npx intlayer doc review --verbose`

**Özel talimatlar seçenekleri:**

- **`--custom-instructions [customInstructions]`**: Prompt'a eklenen özel talimatlar. Biçimlendirme, URL çevirisi vb. konularda belirli kurallar uygulamak için kullanışlıdır.

  > Örnek: `npx intlayer doc review --custom-instructions "URL çevirilerini yapmaktan kaçının ve markdown formatını koruyun"`

  > Örnek: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git seçenekleri:**

- **`--git-diff`**: Sadece temel (varsayılan `origin/main`) ile mevcut dal (varsayılan: `HEAD`) arasındaki değişiklikleri içeren dosyalarda çalıştırır.
- **`--git-diff-base`**: git diff için temel referansı belirtir (varsayılan `origin/main`).
- **`--git-diff-current`**: git diff için mevcut referansı belirtir (varsayılan `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil eder.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil eder.
- **`--untracked`**: İzlenmeyen dosyaları dahil eder.

  > Örnek: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Çıktı dosya yolunun aşağıdaki kalıplar değiştirilerek belirleneceğini unutmayın:
>
> - `/{{baseLocale}}/` yerine `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` yerine `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` yerine `_{{locale}}.`
> - `{{baseLocale}}_` yerine `{{locale}}_`
> - `.{{baseLocaleName}}.` yerine `.{{localeName}}.`
>
> Eğer kalıp bulunamazsa, çıktı dosyasının uzantısına `.{{locale}}` eklenecektir. Örneğin `./my/file.md` dosyası incelenecek ve Fransızca için `./my/file.fr.md` olarak güncellenecektir.
