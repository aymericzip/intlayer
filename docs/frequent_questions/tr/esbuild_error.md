---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: ESBuild Hatası
description: ESBuild hatalarını nasıl düzelteceğinizi öğrenin.
keywords:
  - esbuild
  - hata
  - intlayer
  - eklenti
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - doc
  - faq
  - esbuild-error
---

# ESBuild Hatası

Derleme sırasında bir ESBuild hatası ile karşılaşırsanız, muhtemelen Intlayer eklentisi doğru yapılandırılmamıştır.

ESBuild, içerik bildirim dosyalarını (`.content.{ts,js,mjs,cjs,json}`) okuyup ilgili sözlükleri `.intlayer/dictionary` klasöründe oluşturmakla sorumludur. Ayrıca yapılandırma dosyasını (`intlayer.config.ts`) da okur.

Intlayer, paketleyicilerinizle entegre olabilmeniz için eklentiler sağlar. Sunucu tarafında çalışması gereken bileşenleri ayırmak için tasarlanmıştır.

Next.js (Webpack / Turbopack), Vite veya React Native, Lynx gibi bir framework kullanıyorsanız, Intlayer uygulamanıza entegre etmek için bir eklenti sunar. Eklentiyi entegre etmek için kullandığınız framework'ün özel dokümantasyonuna bakın.
