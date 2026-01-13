---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Belgeyi Çevir
description: AI çeviri servislerini kullanarak dokümantasyon dosyalarının otomatik olarak nasıl çevrileceğini öğrenin.
keywords:
  - Çeviri
  - Belge
  - Dokümantasyon
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Belgeyi Çevir

`doc translate` komutu, dokümantasyon dosyalarını temel bir yerelden hedef yerellere AI çeviri servislerini kullanarak otomatik olarak çevirir.

## Önemli noktalar:

- Büyük markdown dosyalarını AI modelinin bağlam penceresi sınırları içinde kalmak için parçalara böler.
- Çıktı formatı yanlışsa çeviriyi yeniden dener.
- Çeviri doğruluğunu artırmak için uygulama ve dosya özel bağlamını dahil eder.
- Mevcut çevirileri üzerine yazmayarak korur.
- Hızı artırmak için bir kuyruk sistemi kullanarak dosyaları, parçaları ve yerel ayarları paralel olarak işler.

```bash
npx intlayer doc translate
```

## Argümanlar:

**Dosya listesi seçenekleri:**

- **`--doc-pattern [docPattern...]`**: Çevrilecek dokümantasyon dosyalarını eşleştirmek için glob desenleri.

  > Örnek: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Çeviriden hariç tutulacak dosyaları eşleştirmek için glob desenleri.

  > Örnek: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Dosya belirtilen zamandan önce değiştirilmişse atla.
  - Mutlak bir zaman olabilir, örneğin "2025-12-05" (string veya Date)
  - Göreceli bir zaman olabilir, ms cinsinden `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek, dosyanın güncelleme zamanını `fs.stat` yöntemi ile kontrol eder. Bu nedenle, dosyayı değiştiren Git veya diğer araçlardan etkilenebilir.

  > Örnek: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Dosya belirtilen zaman içinde değiştirilmişse atla.
  - Mutlak bir zaman olabilir, örneğin "2025-12-05" (string veya Date)
  - Göreceli bir zaman olabilir, ms cinsinden `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek, dosyanın güncelleme zamanını `fs.stat` yöntemi ile kontrol eder. Bu nedenle, dosyayı değiştiren Git veya diğer araçlardan etkilenebilir.

  > Örnek: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Dosya zaten varsa atla.

  > Örnek: `npx intlayer doc translate --skip-if-exists`

**Girdi çıktı seçenekleri:**

- **`--locales [locales...]`**: Dokümantasyonun çevrileceği hedef diller.

  > Örnek: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Çeviri yapılacak kaynak dil.

  > Örnek: `npx intlayer doc translate --base-locale en`

**Dosya işleme seçenekleri:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Çeviri için eşzamanlı işlenecek dosya sayısı.

  > Örnek: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Yapay Zeka seçenekleri:**

- **`--model [model]`**: Çeviri için kullanılacak yapay zeka modeli (örneğin, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Çeviri için kullanılacak yapay zeka sağlayıcısı.
- **`--temperature [temperature]`**: Yapay zeka modeli için sıcaklık ayarı.
- **`--api-key [apiKey]`**: Yapay zeka servisi için kendi API anahtarınızı sağlayın.
- **`--application-context [applicationContext]`**: Yapay zeka çevirisi için ek bağlam sağlayın.
- **`--custom-prompt [prompt]`**: Çeviri için kullanılan temel promptu özelleştirin. (Not: Çoğu kullanım durumu için, çeviri davranışı üzerinde daha iyi kontrol sağladığı için `--custom-instructions` seçeneği önerilir.)

  > Örnek: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--no-cache`**: Önbelleği devre dışı bırakın.

  > Örnek: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanıldığında varsayılan olarak true)

  > Örnek: `npx intlayer doc translate --verbose`

**Özel talimatlar seçenekleri:**

- **`--custom-instructions [customInstructions]`**: Prompt'a eklenen özel talimatlar. Biçimlendirme, URL çevirisi vb. konularda belirli kurallar uygulamak için kullanışlıdır.
  - "2025-12-05" gibi mutlak bir tarih olabilir (string veya Date)
  - ms cinsinden göreli bir zaman olabilir `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek, dosyanın güncelleme zamanını `fs.stat` yöntemi ile kontrol eder. Bu nedenle Git veya dosyayı değiştiren diğer araçlardan etkilenebilir.

  > Örnek: `npx intlayer doc translate --custom-instructions "URL çevirilerini yapmaktan kaçının ve markdown formatını koruyun"`

  > Örnek: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git seçenekleri:**

- **`--git-diff`**: Sadece temel (varsayılan `origin/main`) ile mevcut dal (varsayılan: `HEAD`) arasındaki değişiklikleri içeren sözlüklerde çalıştırır.
- **`--git-diff-base`**: git diff için temel referansı belirtir (varsayılan `origin/main`).
- **`--git-diff-current`**: git diff için mevcut referansı belirtir (varsayılan `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil eder.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil eder.
- **`--untracked`**: İzlenmeyen dosyaları dahil eder.

  > Örnek: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Çıktı dosya yolunun aşağıdaki kalıplar değiştirilerek belirleneceğini unutmayın
>
> - `/{{baseLocale}}/` yerine `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` yerine `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` yerine `_{{locale}}.`
> - `{{baseLocale}}_` yerine `{{locale}}_`
> - `.{{baseLocaleName}}.` yerine `.{{localeName}}.`
>
> Eğer kalıp bulunamazsa, çıktı dosyasının uzantısına `.{{locale}}` eklenecektir. Örneğin `./my/file.md` dosyası Fransızca için `./my/file.fr.md` olarak çevrilecektir.
