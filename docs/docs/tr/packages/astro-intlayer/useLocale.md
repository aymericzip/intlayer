---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale Hook Dokümantasyonu | astro-intlayer
description: Geçerli yerel ayara erişmek ve bunu yönetmek için Astro uygulamalarında useLocale hook'unun nasıl kullanılacağını görün.
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Başlangıç dokümantasyonu"
author: aymericzip
---

# useLocale Hook Dokümantasyonu

`astro-intlayer` paketindeki `useLocale` hook'u, geçerli istek yerel ayarına, yapılandırılmış varsayılan yerel ayara ve Astro uygulamalarındaki tüm kullanılabilir yerel ayarlara erişim sağlar.

Sunucu tarafından oluşturulan `.astro` frontmatter'ında ve istemci tarafı `<script>` bloklarında tutarlı davranır.

## Kullanım

### Bileşen Frontmatter'ında (Sunucu Tarafından Oluşturulan)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Geçerli: {locale}</span>
      <span>Varsayılan: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### İstemci `<script>` İçinde (Etkileşimli)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Dönüş Değerleri

Hook, `UseLocaleResult` türünde bir nesne döndürür:

| Özellik            | Tür                                    | Açıklama                                                                                      |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Etkin yerel ayar.                                                                             |
| `defaultLocale`    | `DeclaredLocales`                      | `intlayer.config.ts` dosyasında yapılandırılan varsayılan geri dönüş yerel ayarı.             |
| `availableLocales` | `DeclaredLocales[]`                    | Proje için yapılandırılmış tüm desteklenen yerel ayarlar dizisi.                              |
| `setLocale`        | `(locale: LocalesValues) => void`      | Yerel ayarı güncelleme işlevi. (İstemci `<script>` içinde etkileşimli, SSR sırasında uyarır). |
| `subscribe`        | `(callback: () => void) => () => void` | İstemci tarafı yerel ayar değişikliklerine abone olur.                                        |

## Sunucu ve İstemci Davranışı

- **SSR / Sunucu Tarafından Oluşturma Sırasında**: Bir istek sabit parametrelerle bir kez oluşturulur. Sunucu oluşturma sırasında `setLocale()` çağrısının hiçbir etkisi yoktur ve bir uyarı verir; yerel ayar değiştirme istemcide veya hedef yerel ayar URL'sine gidilerek gerçekleştirilmelidir.
- **İstemci Komut Dosyalarında**: `setLocale`, istemci deposunu günceller ve Intlayer yapılandırmanıza göre kalıcı çerezleri veya yerel depolamayı günceller.

## İlgili Dokümantasyon

- [`intlayer` Entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useDictionary.md)
