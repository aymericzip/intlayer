---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Hatalı Metinler Göndermeden CI/CD'de Çevirileri Otomatikleştirmek"
description: i18n'i otomatikleştirebileceğiniz üç yer, pre-push, pull request ve çalışma zamanı. Bir derlemeyi kapsam üzerinden nasıl denetleyeceğinizi, güvenle otomatik dolduracağınızı ve sonsuz CI döngülerinden nasıl kaçınacağınızı öğrenin.
keywords:
  - çevirileri otomatikleştir ci
  - i18n ci cd
  - github actions çevirileri
  - husky pre-push
  - sürekli yerelleştirme
  - çeviri ardışık düzeni
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Hatalı Metinler Göndermeden CI/CD'de Çevirileri Otomatikleştirmek

Manuel çeviri, hızlı sürüm döngülerine ayak uyduramaz. Biri Cuma günü yeni bir metin ekler, dışa aktarma bir sonraki sprinte kalır ve o zamana kadar üç dil daha geride kalır. Çeviriyi otomatikleştirmek kolaydır. Ancak kontrol edilmemiş makine çıktılarını kullanıcılara sessizce sunmadan otomatikleştirmek asıl düşünülmesi gereken kısımdır.

## İçindekiler

<TOC/>

## Otomatikleştirmek için geçiş (migrasyon) yapmanıza gerek yok

Aşağıdaki ardışık düzen yapıları kütüphaneden bağımsızdır, araçlar da öyledir. Mesajlarınız i18next, next-intl, react-intl, vue-i18n veya next-translate için JSON kataloglarıysa, [Sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) bu dosyaları doğrudan yerinde okur ve yazar:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // veya next-intl / react-intl için "icu"
    }),
  ],
};

export default config;
```

Uygulamanız her zamanki gibi içe aktarmaya devam eder. Aşağıdaki CI işleri mevcut kataloglarınızı doldurur ve denetler; incelemecinin gördüğü fark, büyük bir kod taşıma işlemi değil, `locales/fr/checkout.json` dosyasındaki bir değişikliktir. gettext iş akışları için bir [Sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) ve çalışma zamanı API'nizin değişmeden kalmasını istiyorsanız [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md) de mevcuttur.

## Kapıyı (Gate) doldurmadan (Fill) ayırın

İki farklı görev sürekli olarak birbirine karıştırılır.

Bir **kapı (Gate)**, başarısız olan bir kontroldür. Gerekli diller eksik olduğu için bu derlemenin yayınlanmaması gerektiğini söyler. Hiçbir şey yazmaz.

Bir **doldurma (Fill)**, bir mutasyondur. Eksik çevirileri oluşturur ve bunları commit eder. Bir derlemeyi asla başarısız kılmaz.

Yalnızca doldurma çalıştırmak hiçbir şeyin engellenmediği ve gözden geçirilmemiş makine çıktısının doğrudan canlıya aktığı anlamına gelir. Yalnızca kapı çalıştırmak ise derlemenin kırmızıya dönmesi ve her seferinde bir insanın müdahale etmesi gerektiği anlamına gelir. Çoğu ekip, farklı tetikleyicilere bağlı her ikisini de ister: bir pull request üzerinde doldurma, sürüm dalına birleştirme sırasında kapı.

## Otomasyon nerede konumlanabilir

| Aşama            | Tetikleyici | Uygunluk                                      | Maliyet                                               |
| :--------------- | :---------- | :-------------------------------------------- | :---------------------------------------------------- |
| Pre-push kancası | Yerel git   | Hızlı geri bildirim, sıfır CI dakikası        | Geliştiricinin makinesinde ve API anahtarında çalışır |
| Pull request     | CI işi      | Birleştirmeden önce inceleme, güvenli sırlar  | CI dakikaları ve PR başına model çağrıları            |
| Sürüm dalı       | CI işi      | Kapsam üzerinde katı kapı denetimi            | Ucuz, model çağrısı yok                               |
| Çalışma zamanı   | CMS         | Yeniden derleme yapmadan metin değişiklikleri | Barındırılan hizmet bağımlılığı                       |

## Pre-push: En hızlı döngü

Husky, kod makineden çıkmadan önce doldurmayı çalıştırır, böylece çeviriler bunlara ihtiyaç duyan dizelerle aynı push içinde yer alır.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed`, çalışmayı henüz push edilmemiş içerikle sınırlar, bu da her push işleminde dakikalarca beklemeyi önler. `--mode complete`, zaten bir değere sahip olan girişleri yeniden yazmadan eksik olanları doldurur, böylece incelenmiş bir çeviri asla sessizce değiştirilmez.

Bir monorepo için her uygulamanın kapsamını belirleyin:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Dezavantaj gerçektir: her geliştiricinin bir API anahtarına ihtiyacı vardır ve maliyet push yapan kişiye biner. Bu yüzden ekipler büyüdükçe bu süreci CI ortamına taşır.

## Pull request: İncelemenin yapıldığı yerde doldurun

Aynı iş GitHub Actions içinde, yalnızca diff kapsamına alınmış olarak:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Burada dört ayrıntı hayati önem taşır:

- **`fetch-depth: 0`**, `--git-diff`'in çalışması için gereklidir. Sığ bir klonun (shallow clone) diff yapabileceği bir tabanı yoktur ve işlem sessizce hiçbir şeyi kapsamaz.
- **Commit mesajındaki `[skip ci]`**, iş akışının kendini sonsuz döngüde yeniden tetiklemesini engeller. Bu olmadan iş bir commit yapar, bu yeni bir çalıştırma açar, o da tekrar commit yapar ve CI bütçesini tüketir.
- **`cancel-in-progress` ile `concurrency`**, iki eşzamanlı push işleminin aynı dosyaları yazmak için yarışmasını durdurur.
- **`--git-diff`**, doldurmayı PR'da nelerin değiştiğiyle sınırlar. Bunu atlarsanız her çalıştırmada tüm kataloğu yeniden çevirirsiniz.

Çeviriler PR dalında bir commit olarak görünür, bu da bir incelemecinin bunları diff içinde görebileceği anlamına gelir. Bunu birleştirmeden sonra değil burada yapmanın temel nedeni budur.

## Sürüm dalı: Kapı (Gate)

Kapının model erişimine ihtiyacı yoktur ve hızlı olmalıdır.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

CLI raporundan ziyade kapsamı doğrulayan bir test ile desteklenir:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` bir rapor yazdırır ancak sıfır koduyla çıkar, bu nedenle bilgilendirir fakat derlemeyi engellemez. Yerel olarak bunu kullanın; CI ortamında ise assertion testini kullanın. [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) bölümünde daha fazlası bulunmaktadır.

## `requiredLocales`, kapıyı sürdürülebilir kılan unsurdur

On sekiz dilin tamamını talep eden bir kapı, en yavaş dil tamamlanana kadar her sürümü engeller ve bir ay içinde devre dışı bırakılır.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Hizmet verdiğiniz dilleri tanımlayın, bir sürümü engellemesi gerekenleri zorunlu tutun. Geri kalanı eşzamansız olarak doldurulur ve asla bir dağıtımı geciktirmez.

## Çevirileri tamamen depodan (repo) çıkarmak

Diğer model, kodda tek bir dil tanımlamak ve geri kalanını Live Sync özellikli CMS aracılığıyla uzaktan yönetmektir. İçerik değişiklikleri daha sonra hiçbir yeniden derleme gerektirmez, bu da metin düzenleme hızını kod dağıtım hızından ayırır.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Bu, geliştirici olmayan ekiplerin içeriğe sahip olduğu durumlar için uygundur. Bu bir ödünleşimdir: editör özerkliği kazanırsınız ve git checkout'un uygulamanın neyi render ettiğini tam olarak tanımlaması özelliğini kaybedersiniz. Ayrıntılar [CMS dokümantasyonunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md).

`clientSecret`'ın sunucu tarafı bir kimlik bilgisi olduğunu unutmayın. CI sırlarında ve sunucu ortamınızda bulunmalıdır, istemci paketine ulaşan hiçbir şeyde yer almamalıdır.

## Dürüst sınırlama

Yukarıdaki her şey _kapsamı_ otomatikleştirir, _kaliteyi_ değil. Bir makine doldurması görünür bir boşluğu görünmez bir boşluğa dönüştürür: anahtar artık bir değere sahip olduğu için denetim yeşile döner, ancak metni kimse okumamıştır.

Bu bir dahili araç, değişiklik günlüğü veya beta diller için kabul edilebilir. Fiyatlandırma, yasal metinler, ödeme hatası mesajları veya müşterinin karar vermeden önce okuduğu herhangi bir metin için kabul edilemez. Bunları bir insana yönlendirin ve incelenmiş bir dizenin sonraki bir çalıştırmayla asla üzerine yazılmaması için her yerde `--mode complete` kullanın.

Çıktısının en azından tutarlı olması için modele bağlam verin:

```ts
ai: {
  applicationContext: "B2B faturalandırma uygulaması. Resmi dil. Ürün adını asla çevirmeyin.",
}
```

## Sık yapılan hatalar

- **Otomatik commit'te `[skip ci]` olmaması.** İş akışı döngü içinde kendini sürekli tetikler.
- **`--git-diff` ile sığ klon (shallow clone).** Karşılaştırılacak taban olmadığından hiçbir şey doldurulmaz ve hata verilmez.
- **Her çalıştırmada tüm kataloğu doldurmak.** Faturaları kontrol altında tutmak için `--git-diff` veya `--unpushed` ile sınırlandırın.
- **CLI raporunu kapı olarak kullanmak.** Sıfır koduyla çıkar.
- **Her dili zorunlu kılmak.** Bir sürümü ilk engellediğinde kapı kaldırılır.
- **Hiçbir kapısı olmayan bir doldurma işi.** Hiçbir şey başarısız olmaz, böylece makine kopyası incelenmeden canlıya ulaşır.
- **Depoda model API anahtarları.** `clientSecret` gibi onlar da CI sırlarında yer almalıdır.

## İleri okuma

- [CI/CD: Husky, GitHub Actions ve CMS ile çevirileri otomatik oluşturma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md)
- [İçeriğinizi test etme ve kapsam üzerinden derlemeyi denetleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md)
- [autoFill: dil başına bildirim dosyaları oluşturma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/autoFill.md)
- [Yapılandırma referansı: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Frameworkler arası karşılaştırmalı değerlendirme raporları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md)
- [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md)
- [Kırılgan testler yazmadan çevirileri test etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_testing_strategies.md)
