---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Yapılandırmayı Yönet
description: Intlayer yapılandırmanızı CMS'ye nasıl alıp göndereceğinizi öğrenin.
keywords:
  - Yapılandırma
  - Konfigürasyon
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Yapılandırmayı Yönet

## Yapılandırmayı Al

`configuration get` komutu, özellikle yerel ayarlar olmak üzere Intlayer için mevcut yapılandırmayı alır. Bu, kurulumunuzu doğrulamak için faydalıdır.

```bash
npx intlayer configuration get
```

## Takma İsimler:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argümanlar:

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirin. (CLI kullanılarak varsayılan olarak true)
- **`--no-cache`**: Önbelleği devre dışı bırakın.

## Yapılandırmayı Gönder

`configuration push` komutu, yapılandırmanızı Intlayer CMS ve editörüne yükler. Bu adım, Intlayer Görsel Editörü'nde uzak sözlüklerin kullanılabilmesini sağlamak için gereklidir.

```bash
npx intlayer configuration push
```

## Takma İsimler:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argümanlar:

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.
- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirin. (CLI kullanılarak varsayılan olarak true)
- **`--no-cache`**: Önbelleği devre dışı bırakın.

Yapılandırmayı göndererek, projeniz Intlayer CMS ile tamamen entegre olur ve ekipler arasında sorunsuz sözlük yönetimi sağlar.
