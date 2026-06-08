---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: CI/CD Entegrasyonu
description: Otomatik içerik yönetimi ve dağıtım için Intlayer'ı CI/CD hattınıza nasıl entegre edeceğinizi öğrenin.
keywords:
  - CI/CD
  - Sürekli Entegrasyon
  - Sürekli Dağıtım
  - Otomasyon
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
---

# CI/CD Hattında Çevirileri Otomatik Oluştur

Intlayer, içerik bildirim dosyalarınız için çevirilerin otomatik olarak oluşturulmasına izin verir. İş akışınıza bağlı olarak bunu başarmanın birden fazla yolu vardır.

## CMS Kullanarak

Intlayer ile, sadece tek bir yerel ayar yerel olarak bildirilirken, tüm çevirilerin CMS aracılığıyla uzaktan yönetildiği bir iş akışı benimseyebilirsiniz. Bu, içerik ve çevirileri kod tabanından tamamen ayırmaya izin verir, içerik editörleri için daha fazla esneklik sunar ve sıcak içerik yeniden yüklemesini etkinleştirir (değişiklikleri uygulamak için uygulamayı yeniden oluşturmaya gerek yoktur).

### Örnek Konfigürasyon

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // İsteğe bağlı yerel ayarlar uzaktan yönetilecek
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Uzak içerik öncelikli

    applicationURL: process.env.APPLICATION_URL, // CMS tarafından kullanılan uygulama URL'si

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS kimlik bilgileri
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Tutarlı çeviri oluşturmayı sağlar
  },
};

export default config;
```

CMS hakkında daha fazla bilgi için [resmi dokümantasyona](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) bakın.

## Husky Kullanarak

[Husky](https://typicode.github.io/husky/) kullanarak çeviri oluşturmayı yerel Git iş akışınıza entegre edebilirsiniz.

### Örnek Konfigürasyon

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // İsteğe bağlı yerel ayarlar uzaktan yönetilir
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Kendi API anahtarınızı kullanın

    applicationContext: "This is a test application", // Tutarlı çeviri oluşturmayı sağlar
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Sözlüklerin güncel olduğundan emin olun
npx intlayer fill --unpushed --mode fill    # Sadece eksik içeriği doldurun, mevcut olanları güncellemez
```

> Intlayer CLI komutları ve kullanımları hakkında daha fazla bilgi için [CLI dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) bakın.

> Deponuzda ayrı intlayer örnekleri kullanan birden fazla uygulama varsa, `--base-dir` argümanını şu şekilde kullanabilirsiniz:

```bash fileName=".husky/pre-push"
# Uygulama 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Uygulama 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions Kullanarak

Intlayer, sözlük içeriğini otomatik doldurmak ve gözden geçirmek için bir CLI komutu sağlar. Bu, GitHub Actions kullanarak CI/CD iş akışınıza entegre edilebilir.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
# Bu iş akışı için tetikleme koşulları
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Adım 1: Depodan en son kodu alın
      - name: ⬇️ Depoyu kontrol et
        uses: actions/checkout@v4
        with:
          persist-credentials: true # PR oluşturmak için kimlik bilgilerini saklayın
          fetch-depth: 0 # Fark analizi için tam git geçmişini alın

      # Adım 2: Node.js ortamını ayarlayın
      - name: 🟢 Node.js'i ayarla
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Kararlılık için Node.js 20 LTS kullanın

      # Adım 3: Proje bağımlılıklarını yükleyin
      - name: 📦 Bağımlılıkları yükle
        run: npm install

      # Adım 4: Çeviri yönetimi için Intlayer CLI'yi global olarak yükleyin
      - name: 📦 Intlayer'ı yükle
        run: npm install -g intlayer-cli

      # Adım 5: Çeviri dosyalarını oluşturmak için Intlayer projesini oluşturun
      - name: ⚙️ Intlayer projesini oluştur
        run: npx intlayer build

      # Adım 6: Eksik çevirileri otomatik olarak doldurmak için AI kullanın
      - name: 🤖 Eksik çevirileri otomatik doldur
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Adım 7: Değişiklik olup olmadığını kontrol edin ve bunları commit edin
      - name: � Değişiklikleri kontrol et
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Adım 8: Varsa değişiklikleri commit edin ve pushlayın
      - name: 📤 Değişiklikleri commit et ve pushla
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Ortam değişkenlerini ayarlamak için GitHub → Settings → Secrets and variables → Actions'a gidin ve sırrı ekleyin.

> Husky ile aynı şekilde, monorepo durumunda her uygulamayı sırayla işlemek için `--base-dir` argümanını kullanabilirsiniz.

> Varsayılan olarak, `--git-diff` argümanı base'den (varsayılan `origin/main`) mevcut branch'e (varsayılan: `HEAD`) kadar olan değişiklikleri içeren sözlükleri filtreler.

> Intlayer CLI komutları ve kullanımları hakkında daha fazla bilgi için [CLI dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) bakın.
