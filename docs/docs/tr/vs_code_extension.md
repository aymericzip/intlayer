---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Resmi VS Code Uzantısı
description: Geliştirme iş akışınızı geliştirmek için VS Code'da Intlayer uzantısının nasıl kullanılacağını öğrenin. Yerelleştirilmiş içerik arasında hızlıca gezinin ve sözlüklerinizi verimli bir şekilde yönetin.
keywords:
  - VS Code Uzantısı
  - Intlayer
  - Yerelleştirme
  - Geliştirme Araçları
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Resmi VS Code Uzantısı

## Genel Bakış

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), projelerinizde yerelleştirilmiş içerikle çalışırken geliştirici deneyimini iyileştirmek için tasarlanmış **Intlayer** için resmi Visual Studio Code uzantısıdır.

![Intlayer VS Code Uzantısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Uzantı bağlantısı: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Özellikler

### Anında Gezinme

**Tanım Git Desteği** – Karşılık gelen içerik dosyasını anında açmak için bir `useIntlayer` anahtarında `Cmd+Click` (Mac) veya `Ctrl+Click` (Windows/Linux) kullanın.  
**Sorunsuz Entegrasyon** – **react-intlayer** ve **next-intlayer** projeleriyle zahmetsizce çalışır.  
**Çok Dilli Destek** – Farklı diller arasında yerelleştirilmiş içeriği destekler.  
**VS Code Entegrasyonu** – VS Code'un gezinme ve komut paletiyle sorunsuz entegre olur.

### Sözlük Yönetimi Komutları

İçerik sözlüklerinizi doğrudan VS Code'dan yönetin:

- **Sözlükleri Oluştur** (`extension.buildDictionaries`) – Proje yapınıza göre içerik dosyaları oluşturun.
- **Sözlükleri Gönder** (`extension.pushDictionaries`) – En son sözlük içeriğini deponuza yükleyin.
- **Sözlükleri Çek** (`extension.pullDictionaries`) – En son sözlük içeriğini deponuzdan yerel ortamınıza senkronize edin.

### İçerik Bildirim Oluşturucu

Farklı formatlarda yapılandırılmış sözlük dosyaları kolayca oluşturun:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Modülü (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Kurulum

**Intlayer**'ı doğrudan VS Code Marketplace'ten yükleyebilirsiniz:

1. **VS Code**'u açın.
2. **Uzantılar Marketplace**'e gidin.
3. **"Intlayer"** arayın.
4. **Yükle**'ye tıklayın.

Alternatif olarak, komut satırı aracılığıyla yükleyin:

```sh
code --install-extension intlayer
```

## Kullanım

### Hızlı Gezinme

1. **react-intlayer** kullanan bir proje açın.
2. Aşağıdaki gibi bir `useIntlayer()` çağrısı bulun:

   ```tsx
   const content = useIntlayer("app");
   ```

3. Anahtar üzerinde (ör. `"app"`) **Command-tıklayın** (`⌘+Click` macOS'ta) veya **Ctrl+Click** (Windows/Linux'ta).
4. VS Code otomatik olarak karşılık gelen sözlük dosyasını açacaktır, ör. `src/app.content.ts`.

### İçerik Sözlüklerini Yönetme

#### Sözlükleri Oluşturma

Tüm sözlük içerik dosyalarını oluşturmak için:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Sözlükleri Oluştur** arayın ve komutu çalıştırın.

#### Sözlükleri Gönderme

En son sözlük içeriğini yükleyin:

1. **Komut Paleti**'ni açın.
2. **Sözlükleri Gönder** arayın.
3. Gönderilecek sözlükleri seçin ve onaylayın.

#### Sözlükleri Çekme

En son sözlük içeriğini senkronize edin:

1. **Komut Paleti**'ni açın.
2. **Sözlükleri Çek** arayın.
3. Çekilecek sözlükleri seçin.

## Geliştirme & Katkı

Katkıda bulunmak mı istiyorsunuz? Topluluk katkılarını memnuniyetle karşılıyoruz!

Repo URL: https://github.com/aymericzip/intlayer-vs-code-extension

### Başlarken

Depoyu klonlayın ve bağımlılıkları yükleyin:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> `vsce` paketiyle uyumluluk için `npm` paket yöneticisini kullanın, uzantıyı oluşturmak ve yayınlamak için.

### Geliştirme Modunda Çalıştırın

1. Projeyi **VS Code**'da açın.
2. Yeni bir **Uzantı Geliştirme Ana Bilgisayarı** penceresi başlatmak için `F5`'e basın.

### Bir Pull Request Gönderin

Uzantıyı iyileştirirseniz, [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension)'da bir PR gönderin.

## Geri Bildirim & Sorunlar

Bir hata mı buldunuz veya özellik isteğiniz mi var? **GitHub deposumuzda** bir sorun açın:

[GitHub Sorunları](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Lisans

Intlayer **MIT Lisansı** altında yayınlanmıştır.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
