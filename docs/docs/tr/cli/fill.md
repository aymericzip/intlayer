---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Sözlükleri Doldurma
description: Sözlüklerinizi AI kullanarak nasıl dolduracağınızı, denetleyeceğinizi ve çevireceğinizi öğrenin.
keywords:
  - Doldurma
  - Denetleme
  - Çeviri
  - Sözlükler
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Sözlükleri doldurma / denetleme / çevirme

```bash
npx intlayer fill
```

Bu komut, içerik bildirim dosyalarınızı eksik çeviriler, yapısal tutarsızlıklar veya tür uyuşmazlıkları gibi potansiyel sorunlar açısından analiz eder. Herhangi bir problem bulursa, **intlayer fill** sözlüklerinizi tutarlı ve eksiksiz tutmak için güncellemeler önerir veya uygular.

Önemli noktalar:

- Büyük JSON dosyalarını AI modelinin bağlam penceresi sınırları içinde kalmak için parçalara böler.
- Çıktı formatı yanlışsa çeviriyi yeniden dener.
- Çeviri doğruluğunu artırmak için uygulama ve dosya özel bağlamını dahil eder.
- Mevcut çevirileri üzerine yazmayarak korur.
- Hızı artırmak için bir kuyruk sistemi kullanarak dosyaları, parçaları ve yerel ayarları paralel olarak işler.

## Takma İsimler:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Çıktı örnekleri:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Argümanlar:

**Dosya listesi seçenekleri:**

- **`-f, --file [files...]`**: Denetlenecek belirli içerik bildirim dosyalarının listesi. Sağlanmazsa, yapılandırma dosyanızın ayarlarına göre bulunan tüm `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` dosyaları denetlenecektir.

  > Örnek: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Anahtarlara göre sözlükleri filtreler. Sağlanmazsa, tüm sözlükler denetlenecektir.

  > Örnek: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Anahtarlara göre sözlükleri filtreler (--keys için takma isim).

  > Örnek: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Anahtarlara göre sözlükleri filtre dışı bırakır. Sağlanmazsa, tüm sözlükler denetlenecektir.

  > Örnek: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Anahtarlara göre sözlükleri hariç tutar (--excluded-keys için takma isim).

  > Örnek: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Dosya yolları için glob desenine göre sözlükleri filtreler.

  > Örnek: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Girdi çıktı seçenekleri:**

- **`--source-locale [sourceLocale]`**: Çeviri yapılacak kaynak yerel ayar. Belirtilmezse, yapılandırmanızdaki varsayılan yerel ayar kullanılacaktır.

- **`--output-locales [outputLocales...]`**: Çeviri yapılacak hedef yerel ayarlar. Belirtilmezse, kaynak yerel ayar hariç yapılandırmanızdaki tüm yerel ayarlar kullanılacaktır.

- **`--mode [mode]`**: Çeviri modu: `complete`, `review`. Varsayılan `complete`'dır. `complete` tüm eksik içeriği doldurur, `review` eksik içeriği doldurur ve mevcut anahtarları gözden geçirir.

**Git seçenekleri:**

- **`--git-diff`**: Sadece temel (varsayılan `origin/main`) ile mevcut dal (varsayılan: `HEAD`) arasındaki değişiklikleri içeren sözlüklerde çalıştırır.
- **`--git-diff-base`**: Git diff için temel referansı belirtir (varsayılan `origin/main`).
- **`--git-diff-current`**: Git diff için mevcut referansı belirtir (varsayılan `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil eder.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil eder.
- **`--untracked`**: Takip edilmeyen dosyaları dahil eder.

  > Örnek: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI seçenekleri:**

- **`--model [model]`**: Çeviri için kullanılacak AI modeli (örneğin, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Çeviri için kullanılacak AI sağlayıcısı.
- **`--temperature [temperature]`**: AI modelinin temperature ayarı.
- **`--api-key [apiKey]`**: AI servisi için kendi API anahtarınızı sağlayın.
- **`--custom-prompt [prompt]`**: Çeviri talimatlarınız için özel bir prompt sağlayın.
- **`--application-context [applicationContext]`**: AI çevirisi için ek bağlam sağlayın.

  > Örnek: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Uygulamam bir kedi mağazasıdır"`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.

  > Örnek: `npx intlayer fill --env-file .env.production.local`

  > Örnek: `npx intlayer fill --env production`

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin.

  > Örnek: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Önbelleği devre dışı bırakın.

  > Örnek: `npx intlayer build --no-cache`

**Hazırlık seçenekleri:**

- **`--build`**: İçeriğin güncel olmasını sağlamak için itmeden önce sözlükleri oluşturun. True yapı oluşturmayı zorlar, false yapı oluşturmayı atlar, undefined ise yapının önbelleğini kullanmaya izin verir.

- **`--skip-metadata`**: Sözlükler için eksik meta verilerin (açıklama, başlık, etiketler) doldurulmasını atlayın.

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanıldığında varsayılan olarak true)

## Örnek:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Bu komut, `src/home/` dizinindeki tüm içerik bildirim dosyaları için içeriği İngilizceden Fransızca ve İspanyolcaya GPT-3.5 Turbo modeli kullanarak çevirecektir.
