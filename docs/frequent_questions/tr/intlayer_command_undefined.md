---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer komutu tanımsız
description: Intlayer komutu tanımsız hatasını nasıl düzelteceğinizi öğrenin.
keywords:
  - intlayer
  - komut
  - tanımsız
  - hata
  - vscode
  - eklenti
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Intlayer komutu tanımsız

## Genel Bakış

Intlayer CLI, intlayer içeriğinizi yönetmek için (sözlük oluşturma, çeviri gönderme vb.) kolay bir yol sunar. Ancak, projenizin çalışması için zorunlu değildir. Paketleyici eklentisini (ör. Next.js için `withIntlayer()`, Vite için `intlayer()`) kullanıyorsanız, Intlayer uygulamanızın derlemesi veya geliştirme sunucusu başlatılırken sözlükleri otomatik olarak oluşturur. Geliştirme modunda, içerik bildirim dosyalarındaki değişiklikleri izler ve otomatik olarak yeniden oluşturur.

Intlayer komutlarına şu şekillerde erişebilirsiniz:

- `intlayer` cli komutunu doğrudan kullanarak
- [VSCode eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md) ile
- `@intlayer/cli` SDK ile

## Sorun

`intlayer` komutunu kullanmaya çalışırken şu hatayla karşılaşabilirsiniz:

```bash
'intlayer' is not recognized as an internal or external command,
operable program or batch file.
```

## Çözümler

Şu adımları sırayla deneyin:

1. **Komutun kurulu olduğundan emin olun**

```bash
npx intlayer -h
```

Beklenen çıktı:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **intlayer-cli paketini global kurun**

```bash
npm install intlayer-cli -g
```

> Zaten `intlayer` paketini kurduysanız gerekli olmayabilir

3. **Paketi global kurun**

```bash
npm install intlayer -g
```

4. **Terminali yeniden başlatın**
   Bazen yeni komutların tanınması için terminali yeniden başlatmak gerekir.

5. **Temizleyip tekrar kurun**
   Yukarıdakiler işe yaramazsa:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Kurulum dosyalarını kontrol edin**
   Sorun devam ederse şu dosyaların varlığını kontrol edin:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (içinde `bin` alanı `./dist/cjs/cli.cjs`'i göstermeli)

7. **PATH ortam değişkenini kontrol edin**
   npm global bin dizininizin PATH'te olduğundan emin olun:

```bash
# macOS/Linux için
echo $PATH
# /usr/local/bin veya ~/.npm-global/bin gibi bir yol olmalı

# Windows için
echo %PATH%
# npm global bin dizini olmalı
```

8. **npx ile tam yolu kullanın**
   Komut hala bulunamıyorsa, npx ile tam yolu deneyin:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Çakışan kurulumları kontrol edin**

```bash
# Tüm global kurulu paketleri listele
npm list -g --depth=0

# Çakışan global kurulumları kaldır
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Sonra tekrar kur
npm install -g intlayer
```

10. **Node.js ve npm sürümlerini kontrol edin**
    Uyumlu sürümler kullandığınızdan emin olun:

```bash
node --version
npm --version
```

    Eski sürüm kullanıyorsanız Node.js ve npm'i güncelleyin.

11. **İzin sorunlarını kontrol edin**
    İzin hatası alıyorsanız:

    ```bash
    # macOS/Linux için
    sudo npm install -g intlayer

    # Veya npm'in varsayılan dizinini değiştirin
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # ~/.profile veya ~/.bashrc'ye ekleyin:
    export PATH=~/.npm-global/bin:$PATH
    ```
