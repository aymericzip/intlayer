---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Sözlükler nasıl oluşturulur?
description: Sözlüklerin nasıl oluşturulacağını öğrenin.
keywords:
  - oluştur
  - sözlük
  - intlayer
  - komut
  - izleme
  - vscode
  - eklenti
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# Sözlükleri Oluşturma

## Sözlükler Nasıl Oluşturulur

Intlayer, sözlükleri oluşturmak için bir komut satırı aracı sağlar.

```bash
npx intlayer dictionaries build
```

Bu komut:

- Projenizdeki tüm içerik bildirim dosyalarını (`.content.{ts,tsx,js,mjs,cjs,json,...}`) tarar.
- Sözlükleri oluşturur ve `.intlayer/dictionary` klasörüne kaydeder.

### İzleme Modu

İçerik bildirim dosyalarında değişiklik yapıldığında sözlüklerin otomatik olarak güncellenmesini istiyorsanız, aşağıdaki komutu çalıştırın:

```bash
npx intlayer dictionaries build --watch
```

Bu modda, Intlayer içerik bildirim dosyalarında değişiklik olduğunda sözlükleri tarar ve `.intlayer/dictionary` klasörünü otomatik olarak günceller.

### VSCode eklentisini kullanma

[Intlayer VSCode eklentisini](https://github.com/aymericzip/intlayer/tree/main/docs/en/vs_code_extension.md) kullanarak Intlayer deneyiminizi VSCode'da geliştirebilirsiniz.

### Favori uygulama framework'ünüz için eklenti kullanma

Next.js (Webpack / Turbopack), Vite veya React Native, Lynx gibi bir framework kullanıyorsanız, Intlayer uygulamanıza entegre etmek için bir eklenti sunar.

Intlayer, uygulamanızın derlemesinden önce sözlükleri oluşturur.
Aynı şekilde, geliştirme modunda içerik bildirim dosyalarındaki değişiklikleri izler ve sözlükleri otomatik olarak yeniden oluşturur.

Eklentiyi entegre etmek için kullandığınız framework'ün özel dokümantasyonuna bakın.
