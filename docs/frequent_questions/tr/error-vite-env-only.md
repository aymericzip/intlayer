---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: "`vite-env-only` & Intlayer – yanlış pozitif `node:fs` reddedildi hatası"
description: "vite-env-only'nin Intlayer + React-Router + Vite ile `node:fs` importunu neden reddettiğini ve yapılması gerekenleri."
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import reddedildi
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only Intlayer ile `node:fs`'i reddediyor

Eğer **vite-env-only** eklentisini kullandıysanız (eski React-Router v7 önerilerinde belirtildiği gibi) ve şu hatayı görüyorsanız:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…istemci paketinizde **`node:fs` olmasa bile**, bu bir **yanlış pozitif**.

## Buna ne sebep oluyor

`vite-env-only`, Vite grafik çözümlemesinin **erken aşamasında** Babel tabanlı bir kontrol çalıştırır, _şundan önce_:

- aliasing (Intlayer’ın tarayıcı vs node eşlemeleri dahil),
- kullanılmayan kodun kaldırılması (dead-code elimination),
- SSR ile istemci çözümlemesi,
- React-Router gibi sanal modüller.

Intlayer paketleri hem Node hem tarayıcı üzerinde çalışabilecek kod içerir. Bir _ara_ aşamada, `node:fs` gibi bir Node yerleşiği grafikte Vite bunun istemci derlemesinden kaldırmasından **önce** görünebilir. `vite-env-only` bunu görür ve nihai paket bunu içermese bile hemen hata verir.

## React-Router ve Sunucu Modülleri

React-Router dokümantasyonunda **sunucu modülü konvansiyonları** ile ilgili olarak
(https://reactrouter.com/api/framework-conventions/server-modules), ekip, sunucuya özel importların istemci paketine sızmasını önlemek için **açıkça `vite-env-only` kullanmayı önerir**.

Ancak bu konvansiyonlar, sunucuya özel kodu kaldırmak için Vite’in aliasing’ine, conditional exports'ına ve tree-shaking’ine dayanır. Alias’lama ve conditional exports zaten uygulanmış olsa da, bazı Node tabanlı yardımcılar bu aşamada `@intlayer/core` gibi paketlerde hâlâ mevcut olabilir (istemcide hiç import edilmemiş olsalar bile). Çünkü tree-shaking henüz çalışmadığından, bu fonksiyonlar hâlâ Babel tarafından parse edilir ve `vite-env-only` onların `node:` importlarını tespit edip yanlış pozitif bir hata verir — oysa bunlar nihai istemci paketinden doğru şekilde temizlenir.

## Nasıl düzeltilecek / geçici çözümler

### Önerilen: `vite-env-only`'ı kaldırın

Eklentiyi basitçe kaldırın. Birçok durumda buna gerek yok — Vite kendi çözümlemesiyle istemci ve sunucu importlarını zaten yönetir.

Bu, Intlayer'da değişiklik yapmadan yanlış `node:fs` reddini düzeltir.

### Bunun yerine son yapıyı doğrulayın

İstemci paketlerinde Node yerleşiklerinin bulunmadığından hâlâ emin olmak istiyorsanız, bunu **build sonrası** yapın, örn:

```bash
pnpm build
grep -R "node:" dist/
```

Eğer sonuç yoksa, istemci bundle'larınız temizdir.

## Özet

- `vite-env-only` çok erken kontrol ettiği için `node:fs` üzerinde hata verebilir.
- Vite + Intlayer + React-Router'ın server modules konvansiyonları genellikle yalnızca sunucuya ait referansları doğru şekilde kaldırır.
- Eklentiyi kaldırmak veya _nihai çıktıyı_ doğrulamak genellikle en iyi çözümdür.
