---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Giriş
description: Intlayer CLI'nin login komutunu kullanarak Intlayer CMS ile nasıl kimlik doğrulaması yapacağınızı ve erişim kimlik bilgileri elde edeceğinizi öğrenin.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI Login Komutu

---

## Açıklama

Intlayer CLI'nin `login` komutu, Intlayer CMS ile kimlik doğrulaması yapmanıza olanak tanır. Bu komut, kimlik doğrulama işlemini tamamlamak ve Intlayer hizmetlerini kullanmak için gerekli kimlik bilgilerini (Client ID ve Client Secret) almak üzere varsayılan tarayıcınızı otomatik olarak açar.

## Kullanım

```bash
npx intlayer login [options]
```

veya

```bash
intlayer login [options]
```

## Seçenekler

### `--cms-url <url>`

Intlayer CMS ile kimlik doğrulaması için bağlanılacak URL'yi belirtin.

- **Type**: `string`
- **Default**: `intlayer.config.*` içinde yapılandırılmış değer veya `https://intlayer.org`
- **Example**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Yapılandırma Seçenekleri

Ayrıca ortak yapılandırma seçeneklerini de kullanabilirsiniz:

- `--env-file <path>`: Ortam dosyasının yolu
- `-e, --env <env>`: Çalışma ortamı
- `--base-dir <dir>`: Projenin temel dizini
- `--verbose`: Ayrıntılı çıktıyı etkinleştir (varsayılan: true)
- `--prefix <prefix>`: Loglar için ön ek

## Nasıl Çalışır

1. **Yerel Sunucu Başlatma**: Komut, CMS'den kimlik bilgilerini almak için rastgele bir portta yerel bir HTTP sunucusu başlatır
2. **Tarayıcı Açma**: Komut varsayılan tarayıcınızı CMS giriş URL'siyle otomatik olarak açar
3. **Kimlik Doğrulama**: Tarayıcıda Intlayer hesabınızı kullanarak kimlik doğrulamayı tamamlayın
4. **Kimlik Bilgilerinin Alınması**: Yerel sunucu, CMS'den Client ID ve Client Secret'i alır
5. **Talimatlar**: Komut, projenizde kimlik bilgilerini yapılandırmak için talimatlar gösterir

## Çıktı

Başarılı bir girişten sonra, komut şunları gösterecektir:

1. **Alınan kimlik bilgileri** (Client ID ve Client Secret)
2. **`.env` dosyası için talimatlar**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Intlayer yapılandırma dosyası için talimatlar**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Manuel Yapılandırma

Tarayıcı otomatik olarak açılmıyorsa, terminalde gösterilen URL'yi kopyalayarak tarayıcınızda manuel olarak ziyaret edebilirsiniz.

## Örnekler

### Özel CMS URL'si ile Giriş

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Belirli Bir Ortam Dosyası ile Giriş

```bash
npx intlayer login --env-file .env.production
```

### Ayrıntılı Modda Giriş

```bash
npx intlayer login --verbose
```

## Sorun Giderme

### Tarayıcı Açılmıyor

Tarayıcı otomatik olarak açılmıyorsa, terminalde gösterilen URL'yi kopyalayın ve tarayıcınızda manuel olarak açın.

### Bağlantı Sorunları

Bağlantı sorunlarıyla karşılaşırsanız, şunları doğrulayın:

1. CMS URL'sinin doğru olduğunu
2. İnternet bağlantınızın düzgün çalıştığını
3. Bağlantıyı engelleyen bir güvenlik duvarı olmadığını

### Kimlik Bilgileri Alınmadı

Kimlik bilgileri alınmadıysa:

1. Tarayıcıda kimlik doğrulama işlemini tamamladığınızdan emin olun
2. Yerel portun engellenmediğini doğrulayın
3. Komutu tekrar deneyin
4. İnternet bağlantınızın düzgün çalıştığından emin olun
5. Bağlantıyı engelleyen herhangi bir güvenlik duvarı olmadığından emin olun

### Kimlik Bilgileri Alınmadı

Kimlik bilgileri alınmadıysa:

1. Tarayıcıda kimlik doğrulama sürecini tamamladığınızdan emin olun
2. Yerel portun engellenmediğini doğrulayın
3. Komutu tekrar deneyin

## Sonraki Adımlar

Giriş işlemini tamamladıktan sonra:

1. Kimlik bilgilerini `.env` dosyanıza ekleyin
2. Kimlik bilgileri ile `intlayer.config.*` dosyanızı yapılandırın
3. Sözlüklerinizi yönetmek için CLI komutlarını kullanın:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/push.md) - Sözlükleri CMS'ye gönderir
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/pull.md) - CMS'den sözlükleri çeker
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) - Eksik çevirileri doldur

## Ayrıca Bakınız

- [CLI Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
- [Intlayer Yapılandırması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
