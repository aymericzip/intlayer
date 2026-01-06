---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI Komutu
description: CI/CD pipeline'ları ve monorepo'larda otomatik olarak enjekte edilen kimlik bilgileriyle Intlayer komutlarını çalıştırmak için Intlayer CI komutunu nasıl kullanacağınızı öğrenin.
keywords:
  - CI
  - CI/CD
  - Otomasyon
  - Monorepo
  - Kimlik Bilgileri
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: CI komutu ekle
---

# CI Komutu

```bash
npx intlayer ci <command...>
```

CI komutu otomasyon ve CI/CD pipeline'ları için tasarlanmıştır. `INTLAYER_PROJECT_CREDENTIALS` ortam değişkeninden kimlik bilgilerini otomatik olarak enjekte eder ve bir monorepo'daki birden fazla projede Intlayer komutlarını çalıştırabilir.

## Nasıl çalışır

CI komutu iki modda çalışır:

1. **Tek Proje Modu**: Mevcut çalışma dizini `INTLAYER_PROJECT_CREDENTIALS` içindeki proje yollarından biriyle eşleşiyorsa, komutu yalnızca o belirli proje için çalıştırır.

2. **Yineleme Modu**: Belirli bir proje bağlamı algılanmazsa, yapılandırılmış tüm projeler üzerinde yineler ve her biri için komutu çalıştırır.

## Ortam Değişkeni

Komut, `INTLAYER_PROJECT_CREDENTIALS` ortam değişkeninin ayarlanmış olmasını gerektirir. Bu değişken, proje yollarını kimlik bilgilerine eşleyen bir JSON nesnesi içermelidir:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Paket Yöneticisi Algılama

CI komutu, `npm_config_user_agent` ortam değişkenine dayalı olarak hangi paket yöneticisinin kullanıldığını (npm, yarn, pnpm veya bun) otomatik olarak algılar ve Intlayer'ı çalıştırmak için uygun komutu kullanır.

## Argümanlar

- **`<command...>`**: Çalıştırılacak Intlayer komutu (örneğin, `fill`, `push`, `build`). Herhangi bir Intlayer komutunu ve argümanlarını iletebilirsiniz.

  > Örnek: `npx intlayer ci fill --verbose`
  >
  > Örnek: `npx intlayer ci push`
  >
  > Örnek: `npx intlayer ci build`

## Örnekler

### Tek proje modunda komut çalıştırma

`INTLAYER_PROJECT_CREDENTIALS` içindeki yollardan biriyle eşleşen bir proje dizinindeyken:

```bash
cd packages/app
npx intlayer ci fill
```

Bu, `packages/app` projesi için kimlik bilgileri otomatik olarak enjekte edilerek `fill` komutunu çalıştıracaktır.

### Tüm projelerde komut çalıştırma

Herhangi bir proje yoluyla eşleşmeyen bir dizindeyken, komut yapılandırılmış tüm projeler üzerinde yineleyecektir:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Bu, `INTLAYER_PROJECT_CREDENTIALS` içinde yapılandırılmış her proje için `push` komutunu çalıştıracaktır.

### Ek bayraklar iletme

Temel Intlayer komutuna herhangi bir bayrak iletebilirsiniz:

```bash
npx intlayer ci fill --verbose --mode complete
```

### CI/CD pipeline'larında kullanma

CI/CD yapılandırmanızda (örneğin, GitHub Actions, GitLab CI), `INTLAYER_PROJECT_CREDENTIALS`'i bir sır olarak ayarlayın:

```yaml
# GitHub Actions örneği
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Sözlükleri doldur
    run: npx intlayer ci fill
```

## Hata İşleme

- `INTLAYER_PROJECT_CREDENTIALS` ayarlanmamışsa, komut bir hata ile çıkacaktır.
- `INTLAYER_PROJECT_CREDENTIALS` geçerli bir JSON değilse, komut bir hata ile çıkacaktır.
- Bir proje yolu mevcut değilse, bir uyarı ile atlanacaktır.
- Herhangi bir proje başarısız olursa, komut sıfır olmayan bir durum kodu ile çıkacaktır.

## Kullanım Durumları

- **Monorepo otomasyonu**: Bir monorepo'daki birden fazla projede Intlayer komutlarını çalıştırma
- **CI/CD pipeline'ları**: Sürekli entegrasyon iş akışlarında sözlük yönetimini otomatikleştirme
- **Toplu işlemler**: Birden fazla Intlayer projesinde aynı işlemi aynı anda gerçekleştirme
- **Gizli yönetimi**: Ortam değişkenlerini kullanarak birden fazla proje için kimlik bilgilerini güvenli bir şekilde yönetme

## Güvenlik En İyi Uygulamaları

- `INTLAYER_PROJECT_CREDENTIALS`'i CI/CD platformunuzda şifrelenmiş sırlar olarak saklayın
- Kimlik bilgilerini asla sürüm kontrolüne commit etmeyin
- Farklı dağıtım ortamları için ortama özel kimlik bilgileri kullanın
- Kimlik bilgilerini düzenli olarak döndürün
