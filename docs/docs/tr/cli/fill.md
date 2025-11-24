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

## Takma İsimler:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

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
