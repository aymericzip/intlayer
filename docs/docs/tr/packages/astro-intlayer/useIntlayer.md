---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer Hook Dokümantasyonu | astro-intlayer
description: Yerelleştirilmiş içeriğe erişmek için Astro bileşenlerinde ve istemci komut dosyalarında useIntlayer hook'unun nasıl kullanılacağını görün.
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - uluslararasılaştırma
  - dokümantasyon
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Başlangıç dokümantasyonu"
author: aymericzip
---

# useIntlayer Hook Dokümantasyonu

`useIntlayer` hook'u, Astro uygulamalarında anahtara göre yerelleştirilmiş sözlük içeriğini almanızı sağlar.

Aynı içe aktarma yolu kullanılarak iki farklı bağlamda çağrılabilir:

1. **Sunucu / Frontmatter**: `.astro` dosyaları içinde, `Astro.locals.intlayer`'da depolanan istek yerel ayarını kullanarak içeriği otomatik olarak çözer.
2. **Tarayıcı / İstemci `<script>`**: İstemci komut dosyaları veya UI çerçeve bileşenleri içinde, istemci tarafı depo uygulamasına (`vanilla-intlayer`) çözümlenir.

## Kullanım

### Astro Bileşen Frontmatter'ında

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### İstemci `<script>` Bloklarında

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parametreler

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Sözlüğün benzersiz anahtarı (`.content.ts` bildirim dosyalarınızda tanımlandığı gibi).
2. **`localeOrSelector`** (isteğe bağlı): Belirli bir yerel ayar veya seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale`). Sağlandığında, istek bağlamından veya istemci deposundan algılanan yerel ayarı geçersiz kılar.

## Açıklama

Hook aşağıdaki görevleri yerine getirir:

1. **Yerel Ayar Çözümleme**:
   - Sunucuda, `astro-intlayer/middleware` tarafından başlatılan bir `AsyncLocalStorage` kapsamı aracılığıyla `Astro.locals.intlayer`'dan etkin yerel ayarı okur.
   - Tarayıcıda, etkin yerel ayarı istemci deposundan okur.
2. **Sözlük Alma**: Belirtilen anahtarla eşleşen sözlük içeriğini enjekte eder.
3. **Çeviri İşleme**: Çevirileri (`t()`), numaralandırmaları, koşulları ve markdown'ı oluşturulmaya hazır içeriğe dönüştürür.

## İlgili Dokümantasyon

- [`intlayer` Entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useLocale.md)
