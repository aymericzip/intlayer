---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 5
title: CLI - Intlayer Paketlerini Yükseltme
description: Projenizin veya monorepo'nuzun her Intlayer paketini listelemek ve bunları en son sürüme yükseltmek için Intlayer CLI upgrade komutunu nasıl kullanacağınızı öğrenin.
keywords:
  - CLI
  - Upgrade
  - Yükselt
  - Paketler
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade komutunu ekle"
author: aymericzip
---

# Intlayer Paketlerini Yükseltme

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

`upgrade` komutu, monorepo çalışma alanları da dahil olmak üzere projenizin her `package.json` dosyasında bildirilen Intlayer paketlerini listeler ve bunları yayınlanan en son sürüme yükseltir. `intlayer init` ile aynı paket yükseltme adımını bağımsız olarak çalıştırır.

## Argümanlar:

- `--project-root [projectRoot]` - İsteğe bağlı. Proje kök dizini. Varsayılan olarak komut, mevcut çalışma dizininin üzerindeki en yakın `package.json` dosyasından başlar.
- `--dry-run` - İsteğe bağlı. Herhangi bir dosyayı değiştirmeden paketleri ve hedef sürümlerini listeler.
- `--tag <tag>` - İsteğe bağlı. Yükseltilecek npm dist-tag (örneğin `canary`). Varsayılan olarak `latest` değeridir.

## Ne yapar:

1. **Intlayer paketlerini listeler** - `intlayer`, `@intlayer/*`, `*-intlayer` ve `intlayer-*` bağımlılıkları ve devDependencies için projenin her `package.json` dosyasını (`node_modules` ve derleme çıktılarını atlayarak) tarar.
2. **Hedef sürümü getirir** - Her paketin seçilen dist-tag (varsayılan olarak `latest`) sürümünü npm kayıt defterinden okur.
3. **Aralıkları yeniden yazar** - İşlecini (`^`, `~` veya hiçbiri) ve dosya girintisini koruyarak güncelliğini yitirmiş her aralığı doğrudan dosya içinde günceller.
4. **Tek seferde yükler** - Kilit dosyasına sahip paket yöneticisini kullanarak çalışma alanı kökünden (kilit dosyası olan en yakın dizin) tek bir yükleme çalıştırır:

| Kilit dosyası                      | Komut          |
| ---------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`           | `bun install`  |
| `pnpm-lock.yaml`                   | `pnpm install` |
| `yarn.lock`                        | `yarn install` |
| `package-lock.json` veya kilit yok | `npm install`  |

Kilit dosyası yoksa, npm'e geri dönmeden önce `package.json` dosyasının `packageManager` alanı (örneğin `"bun@1.2.0"`) kullanılır.

`workspace:*`, `file:`, `link:`, `catalog:` veya git URL'leri gibi kayıt defterini işaret etmeyen aralıklar asla değiştirilmez.

## Örnekler:

### Mevcut yükseltmeleri uygulamadan listeleme:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Canary sürümüne yükseltme:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Örnek çıktı:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Notlar:

- Her çalışma alanını yükseltmek için komutu deponuzun kökünden çalıştırın. Yalnızca ilgili çalışma alanını yükseltmek için o çalışma alanından çalıştırın.
- Sürümü alınamayan paketler (çevrimdışı, özel veya yayınlanmamış paket) listelenir ve değiştirilmeden bırakılır.
- Yükleme başarısız olursa, yükseltilen aralıklar `package.json` dosyasında tutulur. Paket yöneticinizin yükleme komutunu manuel olarak çalıştırın.
