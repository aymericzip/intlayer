---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Alt paketlerle ilgili @intlayer/* hatası alıyorum
description: Alt paketlerle ilgili @intlayer/* hatasını düzeltme.
keywords:
  - @intlayer/*
  - alt paketler
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Alt paketlerle ilgili `@intlayer/*` hatası alıyorum

Bu sorun genellikle Intlayer paketlerinin güncellenmesinden sonra ortaya çıkar.

Hata mesajı örneği:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  "node_modules/@intlayer/config/dist/esm/client.mjs" içinde "clearModuleCache" için eşleşen bir export bulunamadı

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ HATA  "node_modules/@intlayer/config/dist/esm/client.mjs" içinde "configESMxCJSRequire" için eşleşen bir export bulunamadı

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Sebep

`intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` gibi temel paketler, kod tekrarını önlemek için `@intlayer/config`, `@intlayer/core`, `@intlayer/types` gibi aynı alt paketleri yeniden kullanmaktadır.

İki sürüm arasında, alt paketlerin exportları aynı olacağı garanti edilmez. Bu sorunu sınırlamak için, intlayer alt paketlerin sürümünü ana paketin sürümüne sabitler.

> Örnek: `intlayer@1.0.0` `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0` kullanır

> (`@intlayer/swc` hariç), `@intlayer/*` alt paketleri doğrudan kullanılmak üzere tasarlanmamıştır. Bu yüzden doğrudan kurmamanızı öneririz.

## Çözüm

1. Ana paket ve alt paketlerin sürümlerinin aynı olduğundan emin olun.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Yanlış sürüm, 7.0.1 olmalı
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Kilit dosyasını (lockfile) ve node_modules klasörünü kaldırmayı ve bağımlılıkları yeniden yüklemeyi deneyin.

Bazen, paket yöneticisi alt paketlerin eski bir sürümünü kilit dosyasında (lockfile) önbellekte tutar. Bunu düzeltmek için, kilit dosyasını ve node_modules klasörünü kaldırıp bağımlılıkları yeniden yüklemeyi deneyebilirsiniz.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Global kurulumu kontrol edin

CLI komutlarına erişmek için `intlayer` veya `intlayer-cli` paketlerini global olarak kurmanızı öneririz. Eğer global sürüm yerel sürümle aynı değilse, paket yöneticisi yanlış sürümü kullanabilir.

**Bir paketin global olarak kurulu olup olmadığını kontrol edin**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Olası global bağımlılık çatışmalarını düzeltin**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Önbelleği temizlemeyi deneyin

Docker, GitHub Actions veya Vercel gibi web barındırma platformları gibi bazı ortamlarda önbellek bulunabilir. Önbelleği temizlemeyi ve kurulumu tekrar denemeyi deneyebilirsiniz.

Ayrıca, paket yöneticinizin önbelleğini aşağıdaki komutlarla temizlemeyi deneyebilirsiniz:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
