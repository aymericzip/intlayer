---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 4
title: Çeviri üretirken Claude Code token tüketimi nasıl sınırlandırılır
description: Claude Code ile çeviri yapmanın neden aşırı token harcadığı, Intlayer'ın bunun yerine ne yaptığı (çevrilmiş anahtarları filtreler, JSON'u parçalar, markdown'ı blok blok çevirir) ve claude setup-token ile Claude aboneliğinizi nasıl yeniden kullanabileceğiniz.
keywords:
  - claude code
  - tokens
  - token tüketimi
  - setup-token
  - i18n
  - uluslararasılaştırma
  - çeviri
  - fill
  - mcp
  - ajan
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Çeviri üretirken Claude Code token tüketimi nasıl sınırlandırılır

## Sorun Açıklaması

Claude Code'dan (veya herhangi bir kodlama ajanından) içeriğinizi çevirmesini istemek, bu işi yapmanın en maliyetli yoludur. Her çalıştırmada ajanın şunları yapması gerekir:

- Zaten çevrilmiş anahtarlar dahil olmak üzere tüm JSON veya içerik dosyasını bağlamına yüklemek.
- İçeriğin nerede bulunduğunu ve nasıl yapılandırıldığını anlamak için ilgili dosyaları aramak.
- Hangi dillerin eksik olduğunu ve oluşturulması gerektiğini belirlemek.
- Özel talimatlarınızı her seferinde yeniden okumak ("URL'leri şu şekilde dönüştür", "marka adını İngilizce bırak", "samimi bir dil kullan").
- Değişmeyen kısımlar dahil olmak üzere tüm dosyayı baştan yazmak.

Tüm bunlar her turda yeniden gönderilir, bu nedenle maliyet `içerik boyutu × dil sayısı × tur sayısı` formülüyle katlanarak artar ve biçimlendirme veya anahtarlardaki herhangi bir kaymanın manuel olarak düzeltilmesi gerekir.

## Intlayer bunun yerine ne yapar

Intlayer'ın temel avantajı, bu işi ajanın dışında, çeviri için özel olarak oluşturulmuş bir işlem hattıyla (pipeline) gerçekleştirmesidir:

- **Mevcut çevirileri filtreler** ve token kullanımını sınırlar. JSON'unuzda zaten çevrilmiş olan anahtarlar ayıklanır ve modele yalnızca eksik olanlar gönderilir.
- **Markdown'ı blok blok çevirir.** Belgeler için [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate.md) ve [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-review.md) komutları, her bloğu temel belgeyle karşılaştırır ve zaten çevrilmiş veya değişmemiş blokları atlar.
- **JSON'unuz çok büyükse parçalara (chunk) ayırır**, böylece bağlam penceresinin en verimli aralığında kalınmasını sağlar.
- **JSON'unuzu düzleştirir ve yeniden yapılandırır**, bu sayede token tüketimini optimize eder.
- **Özel komut istemleri ekler**, böylece markanız ve terminolojinizle ilgili özel kuralları (`applicationContext`, `--custom-instructions`) her sohbette tekrarlamak yerine yalnızca bir kez tanımlarsınız.
- **Yapıyı doğrular**, tutarlılığı garanti altına alır, anahtar kaymalarını önler ve biçimlendirmeyi (markdown, HTML, eklemeler, çoğullar) korur.
- **Yeniden deneme (retry) yönetimi uygular**, böylece çıktı hatalı olduğunda süreci otomatik olarak toparlar.
- **İstekleri sıraya alır ve paralelleştirir**, dosyalar, parçalar ve diller arasında işlem hızını artırır.

Bunların hiçbiri ajanın bağlamından geçmez. Temel kural: neyin uluslararasılaştırılacağına ajanın karar vermesini sağlayın, tekrarlayan rutin işleri ise Intlayer'a bırakın.

## Çözüm

### 1. Ayıklama işlemini `intlayer extract` komutuna devredin

Ajanın her bileşeni elle yeniden yazmasını istemek yerine [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) komutunu çalıştırmasını sağlayın. Bu komut, tüm dosyayı ajanın bağlamına yüklemeden sabit kodlanmış metinleri bileşenin yanındaki bir `.content` dosyasına taşır.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Çeviri işlemini `intlayer fill` komutuna devredin

Ajanın doğrudan çeviri yapmasını asla istemeyin. [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) komutu yukarıdaki işlem hattını uygular: yalnızca eksik anahtarları gönderir, bunları parçalara ayırır, dilleri paralel olarak çalıştırır ve sonucu içerik dosyalarınıza geri yazar.

```bash
npx intlayer fill
```

Birkaç bayrak işlemi sınırlandırmanızı sağlar:

- `--git-diff` (veya `--uncommitted`) yalnızca geçerli daldaki değiştirilmiş sözlükleri işler.
- `--file` veya `--keys` belirli içerik dosyalarını hedefler.
- `--output-locales fr es` çalışmayı yalnızca şu anda gerçekten ihtiyacınız olan dillerle sınırlandırır.
- `--skip-metadata` başlık, açıklama ve etiket oluşturmayı atlar.
- `--data-serialization toon` modele daha kompakt bir veri yükü gönderir (daha az token, biraz daha az öngörülebilir çıktı).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Markdown'ı `doc translate` ve `doc review` ile çevirin

Bir ajandan `.md` dosyasını çevirmesini istemek, her değişiklikte ve her dil için tüm belgenin yapıştırılması anlamına gelir. Buna karşılık [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-translate.md) ve [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/doc-review.md) komutları blok blok çalışır.

Çevrilmiş dosya henüz mevcut olmadığında `doc translate` kullanın. Markdown'ı parçalara böler, paralel olarak çevirir ve hedef dosyaları yazar:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Çevrilmiş dosya zaten mevcut olduğunda `doc review` kullanın. Her bloğu temel belgeyle karşılaştırır, zaten çevrilmiş veya değişmemiş blokları atlar ve yalnızca farklılık gösteren blokları gönderir:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Her iki komut da kurallarınızı her istemde tekrarlamak yerine tek bir seferde kabul eder:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Intlayer tarafında herhangi bir yapay zeka çağrısı olmadan ajanın döngüde kalması gerektiğinde `doc review` komutunun iki modu oldukça kullanışlıdır:

- `--mode report` müdahale gerektiren blokları satır numaralarıyla birlikte günlüğe kaydeder, böylece ajan yalnızca bu blokları düzenler.
- `--mode synthesis` yalnızca hangi belgelerin güncel olduğunu ve hangilerinde düzenlenecek blok kaldığını raporlar.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Ajanın CLI'ı MCP sunucusu üzerinden çağırmasını sağlayın

[Intlayer MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) sayesinde ajan güncel belgelere dayanarak yanıt verir ve konuşma içinde mantığı yeniden üretmek yerine `intlayer fill` veya `intlayer doc review` komutlarını doğrudan kendisi çalıştırır.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

`npx intlayer init skills` ile [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) kurulumunu yapmak, ajanın Intlayer API'sini tahmin etmesini ve her görevde belgeleri tekrar okumasını da engeller.

### 5. Claude aboneliğinizi `claude setup-token` ile yeniden kullanın

Etkileşimli Claude Code oturumunuzda i18n kurulumunu çalıştırmak, tüm konuşma geçmişini bağlamda tutar. Bunun yerine yoğun iş yükünü kısa ve gözetimsiz (headless) bir oturuma taşıyın.

Claude aboneliğinizden uzun ömürlü bir token oluşturun:

```bash
claude setup-token
```

Bunu `CLAUDE_CODE_OAUTH_TOKEN` olarak kaydedin (bir `.env` dosyasında veya CI sırlarınızda), ardından Intlayer komutlarını çalıştıran tek seferlik bir oturum için yeniden kullanın:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

Oturum, önceki konuşma geçmişinizi taşımadan yalnızca bu komut istemini ve komut çıktısını barındırır. Aynı token, her çekme isteğinde (Pull Request) `intlayer fill` çalıştırmak için [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) içinde de çalışır.

> `claude setup-token` tarafından verilen token yalnızca Claude Code kimliğini doğrular. `ai.apiKey` içinde bir Anthropic API anahtarı olarak kullanılamaz. Çevirinin kendisi için `intlayer fill`, [Intlayer hesabınızı](https://app.intlayer.org) (ücretsiz plan dahildir) veya [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md#ai-configuration) içinde yapılandırılan kendi sağlayıcı anahtarınızı kullanır.

## Özet

| Görev                                   | Kim yapar                | Ajan bağlamındaki tokenlar |
| --------------------------------------- | ------------------------ | -------------------------- |
| Neyin yerelleştirileceğine karar vermek | Claude Code              | Düşük                      |
| Dizeleri ayıklamak                      | `intlayer extract`       | Yok                        |
| İçeriği çevirmek                        | `intlayer fill`          | Yok                        |
| Belgeleri çevirmek                      | `intlayer doc translate` | Yok                        |
| Belgeleri güncellemek                   | `intlayer doc review`    | Yok                        |
| Komutları çalıştırmak                   | Headless Claude Code     | İstem + komut çıktısı      |
