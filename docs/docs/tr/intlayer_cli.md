---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: CLI
description: Çok dilli web sitenizi yönetmek için Intlayer CLI'yi nasıl kullanacağınızı keşfedin. Bu çevrimiçi dokümantasyondaki adımları takip ederek projenizi birkaç dakikada kurun.
keywords:
  - CLI
  - Komut Satırı Arayüzü
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: CLI komut parametreleri dokümantasyonunu güncelle
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer CLI

## Paketi Yükleyin

Gerekli paketleri npm kullanarak yükleyin:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Eğer `intlayer` paketi zaten yüklüyse, cli otomatik olarak yüklenir. Bu adımı atlayabilirsiniz.

## intlayer-cli paketi

`intlayer-cli` paketi [intlayer bildirimlerinizi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) sözlüklere dönüştürmeyi amaçlar.

Bu paket tüm intlayer dosyalarını dönüştürecek, örneğin `src/**/*.content.{ts|js|mjs|cjs|json}`. [Intlayer bildirim dosyalarınızı nasıl bildireceğinizi görün](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Intlayer sözlüklerini yorumlamak için [react-intlayer](https://www.npmjs.com/package/react-intlayer) veya [next-intlayer](https://www.npmjs.com/package/next-intlayer) gibi yorumlayıcılar kullanabilirsiniz.

## Konfigürasyon Dosyası Desteği

Intlayer birden fazla konfigürasyon dosya formatını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Kullanılabilir yerel ayarları veya diğer parametreleri nasıl yapılandıracağınızı görmek için [buradaki konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Intlayer komutlarını çalıştırın

### Sözlükleri oluşturun

Sözlüklerinizi oluşturmak için komutları çalıştırabilirsiniz:

```bash
npx intlayer build
```

veya izleme modunda

```bash
npx intlayer build --watch
```

Bu komut bildirim içerik dosyalarınızı varsayılan olarak `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` olarak bulacak. Ve sözlükleri `.intlayer` dizininde oluşturacak.

##### Takma adlar:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Sözlükleri gönderin

```bash
npx intlayer dictionary push
```

Eğer [intlayer düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) yüklüyse, sözlükleri düzenleyiciye de gönderebilirsiniz. Bu komut sözlüklerinizi [düzenleyiciye](https://intlayer.org/dashboard) kullanılabilir hale getirecek. Bu şekilde, uygulamanızın kodunu düzenlemeden içeriğinizi düzenlemek için sözlüklerinizi ekibinizle paylaşabilirsiniz.

##### Takma adlar:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argümanlar:

**Sözlük seçenekleri:**

- **`-d`, `--dictionaries`**: Gönderilecek sözlüklerin kimlikleri. Belirtilmezse, tüm sözlükler gönderilecektir.

  > Örnek: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Konfigürasyon seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer konfigürasyonunu almak için, komut temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (ör. `development`, `production`). Intlayer konfigürasyon dosyanızda ortam değişkenleri kullanıyorsanız yararlıdır.
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın. Intlayer konfigürasyon dosyanızda ortam değişkenleri kullanıyorsanız yararlıdır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

  > Örnek: `npx intlayer dictionary push --env production`

**Çıktı seçenekleri:**

- **`-r`, `--delete-locale-dictionary`**: Sözlükler gönderildikten sonra yerel ayar dizinlerini silmek için soruyu atlayın ve bunları kaldırın. Varsayılan olarak, eğer sözlük yerel olarak tanımlanmışsa, uzak sözlüklerin içeriğini üzerine yazacaktır.

  > Örnek: `npx intlayer dictionary push -r`

  > Örnek: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Sözlükler gönderildikten sonra yerel ayar dizinlerini silmek için soruyu atlayın ve bunları saklayın. Varsayılan olarak, eğer sözlük yerel olarak tanımlanmışsa, uzak sözlüklerin içeriğini üzerine yazacaktır.

  > Örnek: `npx intlayer dictionary push -k`

  > Örnek: `npx intlayer dictionary push --keep-locale-dictionary`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

**Git seçenekleri:**

- **`--git-diff`**: Sadece base'den (varsayılan `origin/main`) mevcut branch'e (varsayılan: `HEAD`) kadar olan değişiklikleri içeren sözlüklerde çalıştırın.
- **`--git-diff-base`**: Git diff için temel referansı belirtin (varsayılan `origin/main`).
- **`--git-diff-current`**: Git diff için mevcut referansı belirtin (varsayılan: `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil edin.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil edin.
- **`--untracked`**: İzlenmeyen dosyaları dahil edin.

  > Örnek: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Uzak sözlükleri çekin

```bash
npx intlayer pull
```

Eğer [intlayer düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) yüklüyse, sözlükleri düzenleyiciden de çekebilirsiniz. Bu şekilde, uygulamanızın ihtiyaçları için sözlüklerinizin içeriğini üzerine yazabilirsiniz.

##### Takma adlar:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argümanlar:

**Sözlük seçenekleri:**

- **`-d, --dictionaries`**: Çekilecek sözlüklerin kimlikleri. Belirtilmezse, tüm sözlükler çekilecektir.

  > Örnek: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Konfigürasyon seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer konfigürasyonunu almak için, komut temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (ör. `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer konfigürasyonunu almak için, komut temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

  > Örnek: `npx intlayer dictionary push --env production`

**Çıktı seçenekleri:**

- **`--new-dictionaries-path`**: Yeni sözlüklerin kaydedileceği dizinin yolu. Belirtilmezse, yeni sözlükler projenin `./intlayer-dictionaries` dizinine kaydedilecektir. Eğer sözlük içeriğinizde bir `filePath` alanı belirtilmişse, sözlükler bu argümanı dikkate almayacak ve belirtilen `filePath` dizinine kaydedilecektir.

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

##### Örnek:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Sözlükleri doldur / denetle / çevir

```bash
npx intlayer fill
```

Bu komut içerik bildirim dosyalarınızı eksik çeviriler, yapısal tutarsızlıklar veya tür uyumsuzlukları gibi potansiyel sorunlar için analiz eder. Herhangi bir sorun bulursa, **intlayer fill** sözlüklerinizi tutarlı ve eksiksiz tutmak için güncellemeler önerecek veya uygulayacaktır.

##### Takma adlar:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argümanlar:

**Dosyalar listesi seçenekleri:**

- **`-f, --file [files...]`**: Denetlenecek belirli içerik bildirim dosyalarının listesi. Sağlanmazsa, konfigürasyon dosya kurulumunuza göre keşfedilen tüm `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` denetlenecektir.

  > Örnek: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Sözlükleri anahtarlara göre filtreleyin. Sağlanmazsa, tüm sözlükler denetlenecektir.

  > Örnek: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Sözlükleri anahtarlara göre hariç tutun. Sağlanmazsa, tüm sözlükler denetlenecektir.

  > Örnek: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Sözlükleri dosya yolları için glob desenine göre filtreleyin.

  > Örnek: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Giriş çıktısı seçenekleri:**

- **`--source-locale [sourceLocale]`**: Çevrilecek kaynak yerel ayar. Belirtilmezse, konfigürasyonunuzdan varsayılan yerel ayar kullanılacaktır.

- **`--output-locales [outputLocales...]`**: Çevrilecek hedef yerel ayarlar. Belirtilmezse, kaynak yerel ayar hariç konfigürasyonunuzdan tüm yerel ayarlar kullanılacaktır.

- **`--mode [mode]`**: Çeviri modu: 'complete', 'review' veya 'missing-only'. Varsayılan 'missing-only'.

**Git seçenekleri:**

- **`--git-diff`**: Sadece base'den (varsayılan `origin/main`) mevcut branch'e (varsayılan: `HEAD`) kadar olan değişiklikleri içeren sözlüklerde çalıştırın.
- **`--git-diff-base`**: Git diff için temel referansı belirtin (varsayılan `origin/main`).
- **`--git-diff-current`**: Git diff için mevcut referansı belirtin (varsayılan: `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil edin.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil edin.
- **`--untracked`**: İzlenmeyen dosyaları dahil edin.

  > Örnek: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI seçenekleri:**

- **`--model [model]`**: Çeviri için kullanılacak AI modeli (ör. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Çeviri için kullanılacak AI sağlayıcısı.
- **`--temperature [temperature]`**: AI modeli için sıcaklık ayarı.
- **`--api-key [apiKey]`**: AI servisi için kendi API anahtarınızı sağlayın.
- **`--custom-prompt [prompt]`**: Çeviri talimatlarınız için özel bir prompt sağlayın.
- **`--application-context [applicationContext]`**: AI çevirisi için ek bağlam sağlayın.

  > Örnek: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Uygulamam bir kedi mağazası"`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (ör. `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.

  > Örnek: `npx intlayer fill --env-file .env.production.local`

  > Örnek: `npx intlayer fill --env production`

**Konfigürasyon seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin.

  > Örnek: `npx intlayer fill --base-dir ./src`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

##### Örnek:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Bu komut `src/home/` dizinindeki tüm içerik bildirim dosyaları için içeriği İngilizce'den Fransızca ve İspanyolca'ya GPT-3.5 Turbo modeli kullanarak çevirecektir.

### Konfigürasyonu Yönetin

#### Konfigürasyonu Alın

`configuration get` komutu Intlayer için mevcut konfigürasyonu, özellikle yerel ayar ayarlarını alır. Kurulumunuzu doğrulamak için yararlıdır.

```bash
npx intlayer configuration get
```

##### Takma adlar:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argümanlar:

- **`--env`**: Ortamı belirtin (ör. `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

#### Konfigürasyonu Gönderin

`configuration push` komutu konfigürasyonunuzu Intlayer CMS ve düzenleyiciye yükler. Bu adım, Intlayer Görsel Düzenleyici'de uzak sözlüklerin kullanımını etkinleştirmek için gereklidir.

```bash
npx intlayer configuration push
```

##### Takma adlar:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argümanlar:

- **`--env`**: Ortamı belirtin (ör. `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

Konfigürasyonu göndererek, projeniz Intlayer CMS ile tamamen entegre olur ve ekipler arasında sorunsuz sözlük yönetimi etkinleştirilir.

### Dokümantasyon Yönetimi

`doc` komutları birden fazla yerel ayar arasında dokümantasyon dosyalarını yönetmek ve çevirmek için araçlar sağlar.

#### Dokümantasyonu Çevirin

`doc translate` komutu dokümantasyon dosyalarını temel bir yerel ayardan hedef yerel ayarlara AI çeviri servislerini kullanarak otomatik olarak çevirir.

```bash
npx intlayer doc translate
```

##### Argümanlar:

**Dosyalar listesi seçenekleri:**

- **`--doc-pattern [docPattern...]`**: Çevrilecek dokümantasyon dosyalarıyla eşleşecek glob desenleri.

  > Örnek: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Çeviriden hariç tutulacak glob desenleri.

  > Örnek: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Dosya verilen zamandan önce değiştirilmişse atlayın.
  - "2025-12-05" olarak mutlak zaman (dize veya Tarih)
  - ms cinsinden göreceli zaman `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek dosyanın güncelleme zamanını `fs.stat` yöntemini kullanarak kontrol eder. Bu yüzden Git veya dosyayı değiştiren diğer araçlar tarafından etkilenebilir.

  > Örnek: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Dosya verilen zaman içinde değiştirilmişse atlayın.
  - "2025-12-05" olarak mutlak zaman (dize veya Tarih)
  - ms cinsinden göreceli zaman `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek dosyanın güncelleme zamanını `fs.stat` yöntemini kullanarak kontrol eder. Bu yüzden Git veya dosyayı değiştiren diğer araçlar tarafından etkilenebilir.

  > Örnek: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Giriş çıktısı seçenekleri:**

- **`--locales [locales...]`**: Dokümantasyonun çevrileceği hedef yerel ayarlar.

  > Örnek: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Çevrilecek kaynak yerel ayar.

  > Örnek: `npx intlayer doc translate --base-locale en`

**Dosya işleme seçenekleri:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Çeviri için aynı anda işlenecek dosya sayısı.

  > Örnek: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AI seçenekleri:**

- **`--model [model]`**: Çeviri için kullanılacak AI modeli (ör. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Çeviri için kullanılacak AI sağlayıcısı.
- **`--temperature [temperature]`**: AI modeli için sıcaklık ayarı.
- **`--api-key [apiKey]`**: AI servisi için kendi API anahtarınızı sağlayın.
- **`--application-context [applicationContext]`**: AI çevirisi için ek bağlam sağlayın.
- **`--custom-prompt [prompt]`**: Çeviri için kullanılan temel prompt'u özelleştirin. (Not: Çoğu kullanım durumu için `--custom-instructions` seçeneği bunun yerine önerilir çünkü çeviri davranışı üzerinde daha iyi kontrol sağlar.)

  > Örnek: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Uygulamam bir kedi mağazası"`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (ör. `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.

  > Örnek: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlük kaydını etkinleştirin.

  > Örnek: `npx intlayer doc translate --verbose`

**Özel talimatlar seçenekleri:**

- **`--custom-instructions [customInstructions]`**: Prompt'a eklenen özel talimatlar. Biçimlendirme, url çevirisi vb. ile ilgili belirli kurallar uygulamak için yararlı.
  - "2025-12-05" olarak mutlak zaman (dize veya Tarih)
  - ms cinsinden göreceli zaman `1 * 60 * 60 * 1000` (1 saat)
  - Bu seçenek dosyanın güncelleme zamanını `fs.stat` yöntemini kullanarak kontrol eder. Bu yüzden Git veya dosyayı değiştiren diğer araçlar tarafından etkilenebilir.

  > Örnek: `npx intlayer doc translate --custom-instructions "Url'leri çevirmeyin ve markdown formatını koruyun"`

  > Örnek: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git seçenekleri:**

- **`--git-diff`**: Sadece base'den (varsayılan `origin/main`) mevcut branch'e (varsayılan: `HEAD`) kadar olan değişiklikleri içeren sözlüklerde çalıştırın.
- **`--git-diff-base`**: Git diff için temel referansı belirtin (varsayılan `origin/main`).
- **`--git-diff-current`**: Git diff için mevcut referansı belirtin (varsayılan: `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil edin.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil edin.
- **`--untracked`**: İzlenmeyen dosyaları dahil edin.

  > Örnek: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Çıktı dosya yolunun aşağıdaki desenleri değiştirerek belirleneceğini unutmayın
>
> - `/{{baseLocale}}/` ile `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` ile `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` ile `_{{locale}}.`
> - `{{baseLocale}}_` ile `{{locale}}_`
> - `.{{baseLocaleName}}.` ile `.{{localeName}}.`
>
> Desen bulunamazsa, çıktı dosyası dosyanın uzantısına `.{{locale}}` ekleyecektir. `./my/file.md` Fransızca yerel ayar için `./my/file.fr.md`'ye çevrilecektir.

#### Dokümantasyonu Gözden Geçirin

`doc review` komutu dokümantasyon dosyalarını farklı yerel ayarlar arasında kalite, tutarlılık ve eksiksizlik için analiz eder.

```bash
npx intlayer doc review
```

Zaten çevrilmiş dosyaları gözden geçirmek ve çevirinin doğru olup olmadığını kontrol etmek için kullanılabilir.

Çoğu kullanım durumu için,

- çevrilmiş sürümü mevcut değilse `doc translate` kullanın.
- çevrilmiş sürümü zaten mevcutsa `doc review` kullanın.

> Gözden geçirme süreci aynı dosyayı tamamen gözden geçirmek için çeviri sürecinden daha fazla giriş belirteci tüketir. Ancak, gözden geçirme süreci parçaları optimize edecek ve değişmeyen kısımları atlayacaktır.

##### Argümanlar:

`doc review` komutu `doc translate` ile aynı argümanları kabul eder ve belirli dokümantasyon dosyalarını gözden geçirmenize ve kalite kontrolleri uygulamanıza izin verir.

Git seçeneklerinden birini etkinleştirirseniz, komut dosyaların değişen kısımlarını sadece gözden geçirecektir. Komut dosyayı parçalara ayırarak ve her parçayı gözden geçirerek işleyecektir. Parçada değişiklik yoksa, gözden geçirme sürecini hızlandırmak ve AI Sağlayıcı API maliyetini sınırlamak için atlanacaktır.

## `package.json`'ınızda intlayer komutlarını kullanın

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## CLI SDK

CLI SDK, Intlayer CLI'yi kendi kodunuzda kullanmanıza izin veren bir kütüphanedir.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Kullanım örneği:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Intlayer komutunda hata ayıklayın

### 1. **En son sürümü kullandığınızdan emin olun**

Çalıştırın:

```bash
npx intlayer --version                  # mevcut yerel intlayer sürümü
npx intlayer@latest --version           # mevcut en son intlayer sürümü
```

### 2. **Komutun kayıtlı olup olmadığını kontrol edin**

Şununla kontrol edebilirsiniz:

```bash
npx intlayer --help                     # Kullanılabilir komutların listesini ve kullanım bilgilerini gösterir
npx intlayer dictionary build --help    # Bir komut için kullanılabilir seçeneklerin listesini gösterir
```

### 3. **Terminalinizi yeniden başlatın**

Bazen yeni komutları tanımak için terminal yeniden başlatması gerekir.

### 4. **Npx önbelleğini temizleyin (eski bir sürümde takılı kaldıysanız)**

```bash
npx clear-npx-cache
```
