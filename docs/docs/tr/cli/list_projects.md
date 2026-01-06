---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Intlayer Projelerini Listele
description: Bir dizinde veya git deposunda bulunan tüm Intlayer projelerinin nasıl listeleneceğini öğrenin.
keywords:
  - Liste
  - Projeler
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: list projects komutuna mutlak çıktı seçeneği ekle
---

# Intlayer Projelerini Listele

```bash
npx intlayer projects list
```

Bu komut, Intlayer yapılandırma dosyalarını içeren dizinleri bularak tüm Intlayer projelerini arar ve listeler. Monorepo, workspace veya git deposundaki tüm Intlayer projelerini keşfetmek için faydalıdır.

## Kısaltmalar:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argümanlar:

- **`--base-dir [path]`**: Aramaya başlanacak temel dizini belirtin. Varsayılan olarak geçerli çalışma dizinidir.

  > Örnek: `npx intlayer projects list --base-dir /path/to/workspace`

  > Örnek: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Temel dizin yerine git kök dizininden arama yapar. Bu, monorepo veya git deposundaki tüm Intlayer projelerini bulmak için faydalıdır.

  > Örnek: `npx intlayer projects list --git-root`

- **`--json`**: Sonuçları biçimlendirilmiş metin yerine JSON olarak çıktılar. Betik oluşturma ve programatik erişim için yararlıdır.

  > Örnek: `npx intlayer projects list --json`

- **`--absolute`**: Sonuçları göreli yollar yerine mutlak yollar olarak çıktılar.

  > Örnek: `npx intlayer projects list --absolute`

## Nasıl çalışır:

Komut, belirtilen dizinde (veya `--git-root` kullanıldıysa git kökünde) Intlayer yapılandırma dosyalarını arar. Aşağıdaki yapılandırma dosyası desenlerini kontrol eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Bu dosyalardan birini içeren her dizin bir Intlayer projesi olarak kabul edilir ve çıktıda listelenecektir.

## Örnekler:

### Geçerli dizindeki projeleri listele:

```bash
npx intlayer projects list
```

### Belirli bir dizindeki projeleri listele:

```bash
npx intlayer projects list --base-dir ./packages
```

### Git deposundaki tüm projeleri listele:

```bash
npx intlayer projects list --git-root
```

### Kısayol alias'ı kullanma:

```bash
npx intlayer pl --git-root
```

### JSON olarak çıktı:

```bash
npx intlayer projects list --json
```

## Örnek çıktı:

### Biçimlendirilmiş çıktı:

```bash
$ npx intlayer projects list --git-root

3 Intlayer projesi bulundu:

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON çıktı:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Kullanım durumları:

- **Monorepo yönetimi**: Monorepo yapısındaki tüm Intlayer projelerini keşfetme
- **Proje keşfi**: Bir workspace içindeki Intlayer etkin projeleri bulma
- **CI/CD**: Otomatik iş akışlarında Intlayer projelerini doğrulama
- **Dokümantasyon**: Intlayer kullanan tüm projeleri listeleyen dokümantasyon oluşturma

Çıktı, her proje dizinine mutlak yollar sağlar; bu da bu dizinlere gitmeyi veya birden çok Intlayer projesi üzerinde betik tabanlı işlemler yapmayı kolaylaştırır.

- **Dokümantasyon**: Intlayer kullanan tüm projelerin listesini içeren dokümantasyon oluşturma

Çıktı, her proje dizinine mutlak yollar sağlar; bu da birden fazla Intlayer projesine kolayca erişmeyi veya bu projeler üzerinde betiklerle işlem yapmayı kolaylaştırır.
