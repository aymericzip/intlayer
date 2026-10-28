---
createdAt: 2025-03-01
updatedAt: 2026-10-27
priority: 8
title: "Intlayer ile çevirilerinizi test edin"
description: "Intlayer içeriğinizi test edin: eksik çevirileri tespit edin, sözlükleri CI'da doğrulayın ve birim testlerinde bileşenleri locale başına render edin."
keywords:
  - Test Etme
  - Intlayer
  - Uluslararasılaştırma
  - CMS
  - İçerik Yönetim Sistemi
  - Görsel Editör
slugs:
  - doc
  - testing
history:
  - version: 6.1.0
    date: 2026-10-27
    changes: "Gerekli yerel ayarlar eksik olduğunda content test'in sıfır olmayan bir kodla çıktığının netleştirilmesi"
  - version: 6.0.0
    date: 2025-09-20
    changes: "Testlerin tanıtımı"
author: aymericzip
---

# İçeriğinizi test etme

Bu rehber, sözlüklerinizin eksiksiz olduğunu otomatik olarak nasıl doğrulayacağınızı, gönderim öncesi eksik çevirileri nasıl yakalayacağınızı ve uygulamanızda yerelleştirilmiş kullanıcı arayüzünü nasıl test edeceğinizi gösterir.

## Test edebilecekleriniz

- **Eksik çeviriler**: Herhangi bir sözlük için gerekli yerel ayarlardan herhangi biri eksikse CI başarısız olur.
- **Yerelleştirilmiş UI renderı**: Belirli bir yerel sağlayıcı ile bileşenleri render edin ve görünen metin/özellikler üzerinde doğrulama yapın.
- **Derleme zamanı denetimleri**: `npx intlayer content test` komutunu yerel olarak veya CI'da çalıştırın; gerekli çeviriler eksik olduğunda sıfır olmayan bir kodla çıkar.

## Hızlı başlangıç: CLI ile denetim

Denetimi proje kök dizininizden çalıştırın:

```bash packageManager="npm"
npx intlayer content test
```

```bash packageManager="yarn"
yarn intlayer content test
```

```bash packageManager="pnpm"
pnpm intlayer content test
```

```bash packageManager="bun"
bun x intlayer content test
```

Faydalı bayraklar:

- `--env-file [path]`: ortam değişkenlerini bir dosyadan yükler.
- `-e, --env [name]`: bir ortam profili seçer.
- `--base-dir [path]`: çözümleme için uygulama temel dizinini ayarlar.
- `--verbose`: ayrıntılı günlükleri gösterir.
- `--prefix [label]`: günlük satırlarına önek ekler.

Herhangi bir gerekli yerel ayar eksik olduğunda komut `1` koduyla, aksi halde `0` koduyla çıkar (yapılandırmanızdaki `requiredLocales` seçeneğine bakın). CI işlerini veya commit kancalarını başarısız kılmak için doğrudan kullanabilirsiniz. Aşağıdaki programatik test isteğe bağlı bir alternatiftir.

## Programatik test (Vitest/Jest)

Gerekli yerel ayarlarınız için eksik çeviri olmadığını doğrulamak için Intlayer CLI API'sini kullanın.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("çeviriler", () => {
  it("gerekli yerel ayarlarda eksik yok", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Test yerelde veya CI'da başarısız olduğunda faydalıdır
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest eşdeğeri:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("gerekli yerel ayarlarda eksik yok", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Nasıl çalışır:

- Intlayer, yapılandırmanızı (yerel ayarlar, requiredLocales) ve bildirilen sözlükleri okur, ardından raporlar:
  - `missingTranslations`: anahtar bazında, hangi yerel ayarların eksik olduğunu ve hangi dosyadan olduğunu.
  - `missingLocales`: tüm eksik yerel ayarların birleşimi.
  - `missingRequiredLocales`: `requiredLocales` ile sınırlı alt küme (veya `requiredLocales` ayarlanmadıysa tüm yerel ayarlar).

## Yerelleştirilmiş UI testi (React / Next.js)

Bileşenleri bir Intlayer sağlayıcısı altında render edin ve görünür içerik üzerinde doğrulama yapın.

React örneği (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("İngilizce yerelleştirilmiş başlığı render eder", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Beklenen İngilizce başlık")).toBeInTheDocument();
});
```

Next.js (App Router) örneği: framework sarmalayıcısını kullanın:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("Fransızca yerelleştirilmiş başlık render edilir", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Beklenen Başlık" })
  ).toBeInTheDocument();
});
```

İpuçları:

- Özellikler için ham string değerlerine ihtiyacınız olduğunda (örneğin, `aria-label`), React'te `useIntlayer` tarafından döndürülen `.value` alanına erişin.
- Daha kolay birim testi ve temizlik için sözlükleri bileşenlerle aynı yerde tutun.

## Sürekli Entegrasyon

CI'da CLI denetimini çalıştırın. Gerekli çeviriler eksik olduğunda işi başarısız kılar.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "npx intlayer content test"
  }
}
```

Alternatif: Vitest

```json
{
  "scripts": {
    "test:i18n": "vitest run"
  }
}
```

GitHub Actions örneği:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx intlayer content test
```

İsteğe bağlı: testlerle birlikte insan tarafından okunabilir bir özet için CLI denetimini çalıştırın:

```bash packageManager="npm"
npx intlayer content test --verbose
```

```bash packageManager="yarn"
yarn intlayer content test --verbose
```

```bash packageManager="pnpm"
pnpm intlayer content test --verbose
```

```bash packageManager="bun"
bun x intlayer content test --verbose
```

## Sorun Giderme

- Intlayer yapılandırmanızın `locales` ve (isteğe bağlı olarak) `requiredLocales` tanımladığından emin olun.
- Uygulamanız dinamik veya uzak sözlükler kullanıyorsa, testleri sözlüklerin mevcut olduğu bir ortamda çalıştırın.
- Karma monorepo yapıları için, CLI'yi doğru uygulama köküne yönlendirmek amacıyla `--base-dir` kullanın.

---
