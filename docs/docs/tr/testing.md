---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: İçeriğinizi test etme
description: Intlayer ile içeriğinizi nasıl test edeceğinizi keşfedin.
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
---

# İçeriğinizi test etme

Bu rehber, sözlüklerinizin eksiksiz olduğunu otomatik olarak nasıl doğrulayacağınızı, gönderim öncesi eksik çevirileri nasıl yakalayacağınızı ve uygulamanızda yerelleştirilmiş kullanıcı arayüzünü nasıl test edeceğinizi gösterir.

---

## Test edebilecekleriniz

- **Eksik çeviriler**: Herhangi bir sözlük için gerekli yerel ayarlardan herhangi biri eksikse CI başarısız olur.
- **Yerelleştirilmiş UI renderı**: Belirli bir yerel sağlayıcı ile bileşenleri render edin ve görünen metin/özellikler üzerinde doğrulama yapın.
- **Derleme zamanı denetimleri**: CLI üzerinden yerel olarak hızlı bir denetim çalıştırın.

---

## Hızlı başlangıç: CLI ile denetim

Denetimi proje kök dizininizden çalıştırın:

```bash
npx intlayer content test
```

Faydalı bayraklar:

- `--env-file [path]`: ortam değişkenlerini bir dosyadan yükler.
- `-e, --env [name]`: bir ortam profili seçer.
- `--base-dir [path]`: çözümleme için uygulama temel dizinini ayarlar.
- `--verbose`: ayrıntılı günlükleri gösterir.
- `--prefix [label]`: günlük satırlarına önek ekler.

Not: CLI ayrıntılı bir rapor yazdırır ancak başarısızlıklarda sıfır olmayan bir çıkış kodu vermez. CI kontrolü için, eksik gerekli yerel ayarların sıfır olduğunu doğrulayan bir birim testi (aşağıda) ekleyin.

---

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

---

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

---

## Sürekli Entegrasyon

Gerekli çeviriler eksik olduğunda derlemeyi başarısız kılan bir test ekleyin.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
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
      - run: npm run test:i18n
```

İsteğe bağlı: testlerle birlikte insan tarafından okunabilir bir özet için CLI denetimini çalıştırın:

```bash
npx intlayer content test --verbose
```

---

## Sorun Giderme

- Intlayer yapılandırmanızın `locales` ve (isteğe bağlı olarak) `requiredLocales` tanımladığından emin olun.
- Uygulamanız dinamik veya uzak sözlükler kullanıyorsa, testleri sözlüklerin mevcut olduğu bir ortamda çalıştırın.
- Karma monorepo yapıları için, CLI'yi doğru uygulama köküne yönlendirmek amacıyla `--base-dir` kullanın.

---

## Doküman Geçmişi

| Sürüm | Tarih      | Değişiklikler      |
| ----- | ---------- | ------------------ |
| 6.0.0 | 2025-09-20 | Testlerin tanıtımı |
