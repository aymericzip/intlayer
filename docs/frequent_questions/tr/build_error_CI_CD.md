---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: CI/CD'de Derleme Hatası
description: CI/CD ortamlarında oluşan derleme hatalarını nasıl düzelteceğinizi öğrenin.
keywords:
  - derleme
  - hata
  - ci
  - cd
  - pipeline
  - intlayer
  - sözlük
  - next.js
  - ön-derleme
  - otomasyon
slugs:
  - doc
  - faq
  - build-error-ci-cd
---

# CI/CD'de Derleme Hatası

Eğer Next.js'de aşağıdaki gibi bir hata alırsanız:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

İşte bazı çözümler:

## 1. Eksik sözlükler

Derleme aşamasında sözlüklerin oluşturulduğundan emin olun.

Genellikle derleme yerelde çalışırken CI/CD'de çalışmaz. Bunun nedeni, yerelde `.intlayer` klasörünün mevcut olması, ancak CI/CD'de derlemeye dahil edilmemesidir.

Bunu, projenizin `package.json` dosyasına bir ön-derleme (prebuild) script'i ekleyerek çözebilirsiniz.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Derlemeden önce çalışır
    "build": "next build",
  },
}
```

> Eğer `withIntlayer` fonksiyonunu veya framework'ünüz için eşdeğer paketleyici eklentisini kullanıyorsanız, ön-derleme script'i derlemeden önce çalışacaktır.

## 2. Derleme/çalışma zamanında eksik ortam değişkenleri

Bir konteynerde veya otomatik dağıtım platformunda, `.env` dosyasını derlemeden hariç tutmanız önerilir.

```text fileName=".gitignore veya .dockerignore"
# Ortam değişkenleri
.env
**/.env
.env.*
**/.env.*
```

Ortam değişkenleriniz derleme sırasında mevcut değilse, hata alırsınız.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Bu muhtemelen Intlayer ile ilgili değildir. Bu yüzden CI/CD platformunuzda derleme sırasında ortam değişkenlerinizi kontrol edin.
